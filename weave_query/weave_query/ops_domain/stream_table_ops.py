from weave_query.weave_query import compile, op_def, weave_types
from weave_query.weave_query.api import op
from weave_query.weave_query.arrow.arrow import ArrowWeaveListType
from weave_query.weave_query.core_types import StreamTableType
from weave_query.weave_query.ops_domain.project_ops import project


def _get_history_node(stream_table: StreamTableType):
    with op_def.no_refine():
        return (
            project(stream_table.entity_name, stream_table.project_name)
            .run(stream_table.table_name)
            .history3()
            .dropTags()
        )


@op()
def _rows_type(stream_table: StreamTableType) -> weave_types.Type:
    with compile.enable_compile():
        return compile.compile([_get_history_node(stream_table)])[0].type


@op(
    name="stream_table-rows",
    output_type=ArrowWeaveListType(weave_types.TypedDict({})),
    refine_output_type=_rows_type,
)
def rows(stream_table: StreamTableType):
    return _get_history_node(stream_table)
