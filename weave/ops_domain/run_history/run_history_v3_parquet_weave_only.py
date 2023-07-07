import dataclasses
import datetime
import typing
import pyarrow.compute as pc
import pyarrow as pa

from weave import io_service
from ...ops_arrow.list_ import PathType, weave_arrow_type_check

from ...ref_base import Ref
from ...compile_domain import wb_gql_op_plugin
from ...api import op
from ... import weave_types as types
from .. import wb_domain_types as wdt
from ... import artifact_mem
from .. import wb_util
from ...ops_arrow.list_ops import concat
from ...ops_arrow import ArrowWeaveList, ArrowWeaveListType, convert
from ... import engine_trace
from ... import util
from ... import errors

from ...api import use

import pyarrow as pa
from ...wandb_interface import wandb_stream_table

from . import history_op_common


tracer = engine_trace.tracer()


@op(
    render_info={"type": "function"},
    plugins=wb_gql_op_plugin(lambda inputs, inner: "historyKeys"),
    hidden=True,
)
def refine_history_stream_type(run: wdt.Run) -> types.Type:
    return ArrowWeaveListType(_refine_history_type(run).weave_type)


@op(
    render_info={"type": "function"},
    plugins=wb_gql_op_plugin(lambda inputs, inner: "historyKeys"),
    hidden=True,
)
def refine_history_stream_with_columns_type(
    run: wdt.Run, history_cols: list[str]
) -> types.Type:
    return ArrowWeaveListType(
        _refine_history_type(run, columns=history_cols).weave_type
    )


@op(
    name="run-history_stream_with_columns",
    refine_output_type=refine_history_stream_with_columns_type,
    plugins=wb_gql_op_plugin(history_op_common.make_run_history_gql_field),
    output_type=ArrowWeaveListType(types.TypedDict({})),
    hidden=True,
)
def history_stream_with_columns(run: wdt.Run, history_cols: list[str]):
    return _get_history_stream(run, history_cols)


@op(
    name="run-history_stream",
    refine_output_type=refine_history_stream_type,
    plugins=wb_gql_op_plugin(history_op_common.make_run_history_gql_field),
    output_type=ArrowWeaveListType(types.TypedDict({})),
    hidden=True,
)
def history_stream(run: wdt.Run):
    # We return mock data here since we will be replaced with the `_with_columns`
    # version in a compile pass if specific columns are needed
    return history_op_common.mock_history_rows(run)


@dataclasses.dataclass
class HistoryToWeaveResult:
    weave_type: types.Type
    encoded_paths: list[list[str]] = dataclasses.field(default_factory=list)


@dataclasses.dataclass
class HistoryToWeaveFinalResult:
    weave_type: types.TypedDict
    encoded_paths: list[list[str]] = dataclasses.field(default_factory=list)


def _history_key_type_count_to_weave_type(
    tc: history_op_common.TypeCount,
    keyname: str,
) -> HistoryToWeaveResult:
    tc_type = tc["type"]
    if tc_type == "string":
        return HistoryToWeaveResult(types.String())
    elif tc_type == "number":
        return HistoryToWeaveResult(types.Number())
    elif tc_type == "nil":
        return HistoryToWeaveResult(types.NoneType())
    elif tc_type == "bool":
        return HistoryToWeaveResult(types.Boolean())
    elif tc_type == "map":
        props = {}
        paths = []
        for key, val in tc["keys"].items():
            key_type_members = []
            for member in val:
                res = _history_key_type_count_to_weave_type(member, key)
                key_type_members.append(res.weave_type)
                for p in res.encoded_paths:
                    paths.append([keyname, *p])
            props[key] = types.union(*key_type_members)

        return HistoryToWeaveResult(types.TypedDict(props), paths)
    elif tc_type == "list":
        if "items" not in tc:
            return HistoryToWeaveResult(types.List(types.UnknownType()))
        paths = []
        key_type_members = []
        for member in tc["items"]:
            res = _history_key_type_count_to_weave_type(member, "*")
            key_type_members.append(res.weave_type)
            for p in res.encoded_paths:
                paths.append([keyname, *p])

        return HistoryToWeaveResult(types.List(types.union(*key_type_members)), paths)
    elif isinstance(tc_type, str):
        possible_type = wandb_stream_table.maybe_history_type_to_weave_type(tc_type)
        if possible_type is not None:
            return HistoryToWeaveResult(possible_type, [[keyname]])
    return HistoryToWeaveResult(types.UnknownType())


def _refine_history_type(
    run: wdt.Run,
    columns: typing.Optional[list[str]] = None,
) -> HistoryToWeaveFinalResult:
    if "historyKeys" not in run.gql:
        raise ValueError("historyKeys not in run gql")

    historyKeys = run.gql["historyKeys"]["keys"]
    return _refine_history_type_inner(historyKeys, columns=columns)


class TopLevelTypeCount(typing.TypedDict):
    typeCounts: list[history_op_common.TypeCount]


# split out for testing
def _refine_history_type_inner(
    historyKeys: dict[str, TopLevelTypeCount],
    columns: typing.Optional[list[str]] = None,
) -> HistoryToWeaveFinalResult:
    prop_types: dict[str, types.Type] = {}
    encoded_paths: list[list[str]] = []

    for key, key_details in historyKeys.items():
        if key.startswith("system/") or (columns is not None and key not in columns):
            # skip system metrics for now
            continue

        type_counts: list[history_op_common.TypeCount] = key_details["typeCounts"]
        type_members = []
        for tc in type_counts:
            res = _history_key_type_count_to_weave_type(tc, key)
            type_members.append(res.weave_type)
            encoded_paths.extend(res.encoded_paths)
        wt = types.union(*type_members)

        if wt == types.UnknownType():
            util.capture_exception_with_sentry_if_available(
                errors.WeaveTypeWarning(
                    f"Unable to determine history key type for key {key} with types {type_counts}"
                ),
                (str([tc["type"] for tc in type_counts]),),
            )
            wt = types.NoneType()

        # _step is a special key that is always guaranteed to be a nonnull number.
        # other keys may be undefined at particular steps so we make them optional.
        if key in ["_step", "_runtime", "_timestamp"]:
            prop_types[key] = wt
        else:
            prop_types[key] = types.optional(wt)

    # Need to combine top-level maps. Note: this is not a recursive function
    # since the flattening only happens top level in gorilla.
    dict_keys: dict[str, types.Type] = {}
    for key, val in prop_types.items():
        path_parts = key.split(".")
        prop_types = dict_keys

        for part in path_parts[:-1]:
            found = False
            prop_types_inner: dict[str, types.Type] = {}
            default_dict = types.TypedDict(prop_types_inner)
            if part not in prop_types:
                prop_types[part] = default_dict
                prop_types = prop_types_inner
            elif part in prop_types:
                prop_type = prop_types[part]
                if isinstance(prop_type, types.TypedDict):
                    prop_types = prop_type.property_types
                    found = True
                elif isinstance(prop_type, types.UnionType):
                    for member in prop_type.members:
                        if isinstance(member, types.TypedDict):
                            prop_types = member.property_types
                            found = True
                            break

                if not found:
                    prop_types[part] = types.union(prop_type, default_dict)
                    prop_types = prop_types_inner

        final_part = path_parts[-1]
        if final_part not in prop_types:
            prop_types[final_part] = val
        else:
            prop_types[final_part] = types.union(val, prop_types[final_part])

    encoded_paths_final = []
    for path in encoded_paths:
        if len(encoded_paths) > 0:
            if "." in path[0]:
                new_path = [*path[0].split("."), *path[1:]]
                encoded_paths_final.append(new_path)
            else:
                encoded_paths_final.append(path)

    return HistoryToWeaveFinalResult(types.TypedDict(dict_keys), encoded_paths_final)


# Copy from common - need to merge back
def _read_history_parquet(run: wdt.Run, object_type, columns=None):
    io = io_service.get_sync_client()
    tables = []
    # FIXME: according to MinYoung, the tables MAY have different schemas before
    # compaction. Need to move _convert_gorilla_parquet_to_weave_arrow  to this
    # loop. This will require modifying tests too
    for url in run.gql["sampledParquetHistory"]["parquetUrls"]:
        local_path = io.ensure_file_downloaded(url)
        if local_path is not None:
            path = io.fs.path(local_path)
            awl = history_op_common.local_path_to_parquet_table(
                path, None, columns=columns
            )
            tables.append(awl)
    return history_op_common.process_history_awl_tables(tables)


def _get_history_stream(run: wdt.Run, columns=None):
    final_object_type = _refine_history_type(run, columns=columns)
    parquet_history = _read_history_parquet(
        run, final_object_type.weave_type, columns=columns
    )
    live_data = run.gql["sampledParquetHistory"]["liveData"]
    return _get_history_stream_inner(final_object_type, live_data, parquet_history)


def _get_history_stream_inner(
    final_type: HistoryToWeaveFinalResult,
    live_data: list[dict],
    parquet_history: typing.Any,
):
    with tracer.trace("get_history") as span:
        span.set_tag("history_version", 3)
    """Dont read binary columns. Keep everything in arrow. Faster, but not as full featured as get_history"""
    object_type = final_type.weave_type
    live_data = _reconstruct_original_live_data(live_data)

    artifact = artifact_mem.MemArtifact()
    # turn live data into arrow
    if live_data is not None and len(live_data) > 0:
        with tracer.trace("live_data_to_arrow"):
            live_data_processed = convert.to_arrow(
                live_data,
                types.List(object_type),
                artifact=artifact,
                py_objs_already_mapped=True,
            )
    else:
        live_data_processed = []

    # THIS IS THE HARD PART: HAVE TO WRITE A TRANSLATION BETWEEN GORILLA AND WEAVE!
    # get binary fields from history schema - these are serialized json

    # if parquet_history is not None:
    #     fields = [field.name for field in parquet_history.schema]
    #     binary_fields = {
    #         field.name
    #         for field in parquet_history.schema
    #         if pa.types.is_binary(field.type)
    #     }

    #     # deserialize json if any is present
    #     with tracer.trace("process_non_basic_fields"):
    #         for field in columns:
    #             if field in binary_fields or not (
    #                 types.optional(types.BasicType()).assign_type(
    #                     object_type.property_types[field]  # type: ignore
    #                 )
    #                 or wbmedia.ImageArtifactFileRefType().assign_type(
    #                     object_type.property_types[field]  # type: ignore
    #                 )
    #             ):
    #                 pq_col = parquet_history[field].to_pylist()
    #                 for i, item in enumerate(pq_col):
    #                     if item is not None:
    #                         pq_col[i] = wb_util._process_run_dict_item(
    #                             json.loads(item) if field in binary_fields else item,
    #                             run_path,
    #                         )

    #                 awl = convert.to_arrow(
    #                     pq_col,
    #                     types.List(object_type.property_types[field]),
    #                     artifact=artifact,
    #                 )
    #                 new_col = pa.chunked_array([awl._arrow_data])
    #                 parquet_history = parquet_history.set_column(
    #                     fields.index(field), field, new_col
    #                 )

    if parquet_history is not None and len(parquet_history) > 0:
        with tracer.trace("parquet_history_to_arrow"):
            parquet_history = _convert_gorilla_parquet_to_weave_arrow(
                parquet_history, object_type, artifact
            )
    else:
        parquet_history = []

    if len(live_data_processed) == 0 and len(parquet_history) == 0:
        return ArrowWeaveList(pa.array([]), object_type, artifact=artifact)
    elif len(live_data_processed) == 0:
        return parquet_history
    elif len(parquet_history) == 0:
        return live_data_processed
    return use(concat([parquet_history, live_data_processed]))


def _convert_gorilla_parquet_to_weave_arrow(
    gorilla_parquet_history, target_object_type, artifact
):
    # Note: this arrow Weave List is NOT properly constructed. We blindly create it from the gorilla parquet
    gorilla_awl = ArrowWeaveList(
        gorilla_parquet_history,
        artifact=artifact,
    )

    prototype_awl = convert.to_arrow(
        [],
        types.List(target_object_type),
        artifact=artifact,
    )

    target_path_types = {}

    def path_accumulator(
        awl: ArrowWeaveList, path: PathType
    ) -> typing.Optional["ArrowWeaveList"]:
        nonlocal target_path_types
        target_path_types[path] = awl.object_type
        return None

    prototype_awl.map_column(path_accumulator)

    def pre_mapper(
        awl: ArrowWeaveList, path: PathType
    ) -> typing.Optional["ArrowWeaveList"]:
        if path == ():  # root
            return None

        # Here we want to:
        # a) unflatten the top-level dictionaries (i believe gorilla will have them dot-separated)
        # b) reduce the encoded cells to their vals (this should only be Object and Custom Types)
        # c) Modify non-simple unions to our union structure
        if path not in target_path_types:
            raise ValueError(f"Path {path} not found in target path types")

        target_type = target_path_types[path]
        if types.is_optional(target_type):
            target_type = types.non_none(target_type)
        current_type = awl.object_type
        if types.is_optional(current_type):
            current_type = types.non_none(current_type)

        # If the types are the same, we don't need to do anything! That is the happy state
        if types.optional(target_type).assign_type(current_type):
            return None

        # If both types are list-like, then we can handle the differences on the next loop
        base_list_type = types.optional(types.List())
        if base_list_type.assign_type(target_type) and base_list_type.assign_type(
            current_type
        ):
            return None

        # If both types are unions, we are in trouble. Have to somehow map the union types from gorilla
        # to the union types in weave. This is a hard problem.
        # if isinstance(target_type, types.UnionType) and isinstance(current_type, types.UnionType):

        # TODO: Unions...
        # TODO: Generalize this to not blindly assume _val
        # TODO: This double val goes away
        data = awl._arrow_data.field("_val").field("_val")

        if target_type.assign_type(types.Timestamp()):
            data = (
                pc.floor(data)
                .cast("int64")
                .cast(pa.timestamp("ms", tz=datetime.timezone.utc))
            )

        return ArrowWeaveList(
            data,
            target_type,
            awl._artifact,
        )
        return None

    def post_mapper(
        awl: ArrowWeaveList, path: PathType
    ) -> typing.Optional["ArrowWeaveList"]:
        return None

    corrected_awl = gorilla_awl.map_column(post_mapper, pre_mapper)

    reason = weave_arrow_type_check(target_object_type, corrected_awl._arrow_data)

    if reason != None:
        raise ValueError(
            f"Failed to effectively convert Gorilla Parquet History to expected history type: {reason}"
        )

    return corrected_awl


def _reconstruct_original_live_data(live_data: list[dict]):
    # in this function we want to:
    # a) unflatted top-level dictionaries
    # b) reduce the encoded cells to their vals

    return [_reconstruct_original_live_data_row(row) for row in live_data]


def _reconstruct_original_live_data_row(row: dict):
    # Handles unflattening the top-level dictionaries
    new_row: dict[str, typing.Any] = {}
    for col, cell in row.items():
        new_cell = _reconstruct_original_live_data_cell(cell)
        target = new_row
        path_parts = col.split(".")
        final_part = path_parts[-1]
        for path in path_parts[:-1]:
            if path not in target:
                target[path] = {}
            target = target[path]
        target[final_part] = new_cell
    return new_row


def _reconstruct_original_live_data_cell(live_data: typing.Any) -> typing.Any:
    if isinstance(live_data, list):
        return [_reconstruct_original_live_data_cell(cell) for cell in live_data]
    if isinstance(live_data, dict):
        if wandb_stream_table.is_weave_encoded_history_cell(live_data):
            return live_data["_val"]
        return {
            key: _reconstruct_original_live_data_cell(val)
            for key, val in live_data.items()
        }
    return live_data
