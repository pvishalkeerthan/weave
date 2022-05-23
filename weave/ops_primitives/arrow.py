import numpy as np
import pyarrow as pa
import pyarrow.compute as pc
import pyarrow.parquet as pq
from .. import weave_internal

from ..api import op, weave_class
from .. import weave_types as types
from .. import graph
from .. import errors


def mapped_fn_to_arrow(arrow_table, node):
    if isinstance(node, graph.ConstNode):
        return node.val
    elif isinstance(node, graph.OutputNode):
        op_name = graph.opname_without_version(node.from_op)
        if op_name == "number-add":
            return pc.add(
                mapped_fn_to_arrow(arrow_table, node.from_op.inputs["lhs"]),
                mapped_fn_to_arrow(arrow_table, node.from_op.inputs["rhs"]),
            )
        if op_name == "number-greater":
            return mapped_fn_to_arrow(
                arrow_table, node.from_op.inputs["lhs"]
            ) > mapped_fn_to_arrow(arrow_table, node.from_op.inputs["rhs"])
        elif op_name == "pick":
            return mapped_fn_to_arrow(arrow_table, node.from_op.inputs["obj"])[
                mapped_fn_to_arrow(arrow_table, node.from_op.inputs["key"])
            ]
        elif op_name == "typedDict-pick":
            return mapped_fn_to_arrow(arrow_table, node.from_op.inputs["self"])[
                mapped_fn_to_arrow(arrow_table, node.from_op.inputs["key"])
            ]
        elif op_name == "dict":
            dict_args = node.from_op.inputs
            table_cols = {}
            for k, node in dict_args.items():
                table_cols[k] = mapped_fn_to_arrow(arrow_table, node)
            return pa.table(table_cols)
        elif op_name == "merge":
            lhs = mapped_fn_to_arrow(arrow_table, node.from_op.inputs["lhs"])
            rhs = mapped_fn_to_arrow(arrow_table, node.from_op.inputs["rhs"])
            t = rhs
            for col_name, column in zip(lhs.column_names, lhs.columns):
                t.append_column(col_name, column)
            return t
        raise Exception("unhandled op name", op_name)
    elif isinstance(node, graph.VarNode):
        if node.name == "row":
            return arrow_table
        elif node.name == "index":
            return np.arange(len(arrow_table))
        raise Exception("unhandled var name", node.name)


class ArrowArrayType(types.Type):
    instance_classes = pa.ChunkedArray
    name = "ArrowArray"

    object_type: types.Type

    def __init__(self, object_type):
        self.object_type = object_type

    def __str__(self):
        return "<ArrowArrowType %s>" % self.object_type

    def _to_dict(self):
        return {"objectType": self.object_type.to_dict()}

    @classmethod
    def from_dict(cls, d):
        return cls(types.TypeRegistry.type_from_dict(d["objectType"]))

    @classmethod
    def type_of_instance(cls, obj: pa.Array):
        weave_type: types.Type
        if obj.type == pa.string():
            weave_type = types.String()
        elif obj.type == pa.int64():
            weave_type = types.Int()
        elif obj.type == pa.float64():
            weave_type = types.Float()
        else:
            raise errors.WeaveTypeError(
                "Type conversion not implemented for arrow type: %s" % obj.type
            )
        return cls(weave_type)

    def save_instance(self, obj, artifact, name):
        # Could use the arrow format instead. I think it supports memory
        # mapped random access, but is probably larger.
        # See here: https://arrow.apache.org/cookbook/py/io.html#saving-arrow-arrays-to-disk
        # TODO: what do we want?
        table = pa.table({"arr": obj})
        with artifact.new_file(f"{name}.parquet", binary=True) as f:
            pq.write_table(table, f)

    def load_instance(self, artifact, name, extra=None):
        with artifact.open(f"{name}.parquet", binary=True) as f:
            return pq.read_table(f)["arr"]


class ArrowTableType(types.Type):
    instance_classes = pa.Table
    name = "ArrowTable"

    object_type: types.Type

    def __init__(self, object_type):
        self.object_type = object_type

    def __str__(self):
        return "<ArrowTableType %s>" % self.object_type

    def _to_dict(self):
        return {"objectType": self.object_type.to_dict()}

    @classmethod
    def from_dict(cls, d):
        return cls(types.TypeRegistry.type_from_dict(d["objectType"]))

    @classmethod
    def type_of_instance(cls, obj: pa.Table):
        obj_prop_types = {}
        for field in obj.schema:
            weave_type: types.Type
            if field.type == pa.string():
                weave_type = types.String()
            elif field.type == pa.int64():
                weave_type = types.Int()
            elif field.type == pa.float64():
                weave_type = types.Float()
            else:
                raise errors.WeaveTypeError(
                    "Type conversion not implemented for arrow type: %s" % field.type
                )
            obj_prop_types[field.name] = weave_type
        return cls(types.TypedDict(obj_prop_types))

    def save_instance(self, obj, artifact, name):
        with artifact.new_file(f"{name}.parquet", binary=True) as f:
            pq.write_table(obj, f)

    def load_instance(self, artifact, name, extra=None):
        with artifact.open(f"{name}.parquet", binary=True) as f:
            return pq.read_table(f)


def index_output_type(input_types):
    # THIS IS NO GOOD
    # TODO: need to fix Const type so we don't need this.
    self_type = input_types["self"]
    if isinstance(self_type, types.Const):
        return self_type.val_type.object_type
    else:
        return self_type.object_type


def pick_output_type(input_types):
    if not isinstance(input_types["key"], types.Const):
        return types.UnknownType()
    key = input_types["key"].val
    prop_type = input_types["self"]._df.object_type.property_types.get(key)
    if prop_type is None:
        return types.Invalid()
    return prop_type


def map_output_type(input_types):
    object_type = input_types["map_fn"].output_type
    if isinstance(object_type, types.TypedDict):
        return ArrowTableListType(ArrowTableType(object_type))
    else:
        return ArrowArrayListType(ArrowArrayType(object_type))


class ArrowTableGroupByType(types.ObjectType):
    name = "ArrowTableGroupBy"

    type_vars = {"object_type": types.Any(), "key": types.Any()}

    def __init__(self, object_type=types.Any(), key=types.Any()):
        self.object_type = object_type
        self.key = key

    @classmethod
    def type_of_instance(cls, obj):
        table_object_type = types.TypeRegistry.type_of(obj._table).object_type
        key_prop_types = {}
        group_prop_types = {}
        for k, t in table_object_type.property_types.items():
            if k in obj._group_keys:
                key_prop_types[k] = t
            else:
                group_prop_types[k] = t
        return cls(types.TypedDict(group_prop_types), types.TypedDict(key_prop_types))

    def property_types(self):
        return {
            "_table": ArrowTableType(self.object_type),
            "_group_keys": types.List(types.String()),
        }


@weave_class(weave_type=ArrowTableGroupByType)
class ArrowTableGroupBy:
    def __init__(self, _table, _group_keys):
        self._table = _table
        self._group_keys = _group_keys

    @op()
    def count(self) -> int:
        return len(self._table)

    @op(
        output_type=lambda input_types: ArrowTableGroupResultType(
            input_types["self"].object_type, input_types["self"].key
        )
    )
    def __getitem__(self, index: int):
        try:
            row = self._table.slice(index, 1)
        except pa.ArrowIndexError:
            return None

        if self._group_keys == ["group_key"]:
            group_key = row["group_key"][0]
        else:
            row_key = row.select(self._group_keys)
            key = {}
            for col_name, column in zip(row_key.column_names, row_key.columns):
                key[col_name.removeprefix("group_key_")] = column.combine_chunks()
            group_key = pa.StructArray.from_arrays(key.values(), key.keys())[0]
        # key_struct = pa.scalar(key)  # , pa.struct(key_type))

        row_group = row.drop(self._group_keys)
        group = {}
        for col_name, column in zip(row_group.column_names, row_group.columns):
            group[col_name.removesuffix("_list")] = column[0].values
        group_table = pa.table(group)

        return ArrowTableGroupResult(group_table, group_key)

    @op(
        input_type={
            "self": ArrowTableGroupByType(),
            "map_fn": lambda input_types: types.Function(
                {
                    "row": ArrowTableGroupResultType(
                        input_types["self"].object_type, input_types["self"].key
                    )
                },
                types.Any(),
            ),
        },
        output_type=lambda input_types: types.List(input_types["map_fn"].output_type),
    )
    def map(self, map_fn):
        calls = []
        for i in range(self.count.resolve_fn(self)):
            row = self.__getitem__.resolve_fn(self, i)
            calls.append(
                weave_internal.call_fn(
                    map_fn,
                    {
                        "row": graph.ConstNode(types.Any(), row),
                        "index": graph.ConstNode(types.Number(), i),
                    },
                )
            )
        result = weave_internal.use_internal(calls)
        return result


ArrowTableGroupByType.instance_classes = ArrowTableGroupBy
ArrowTableGroupByType.instance_class = ArrowTableGroupBy


class ArrowTableGroupResultType(types.ObjectType):
    name = "ArrowTableGroupResult"

    type_vars = {"object_type": types.Any(), "key": types.Any()}

    def __init__(self, object_type=types.Any(), key=types.Any()):
        self.object_type = object_type
        self.key = key

    @classmethod
    def type_of_instance(cls, obj):
        return cls(
            types.TypeRegistry.type_of(obj._table).object_type,
            types.TypeRegistry.type_of(obj._key),
        )

    def property_types(self):
        return {"_table": ArrowTableListType(self.object_type), "key": self.key}


@weave_class(weave_type=ArrowTableGroupResultType)
class ArrowTableGroupResult:
    def __init__(self, _table, _key):
        self._table = _table
        self._key = _key

    @op()
    def count(self) -> int:
        return len(self._table)

    @op(output_type=lambda input_types: input_types["self"].key)
    def key(self):
        return self._key.as_py()

    @op(
        output_type=lambda input_types: ArrowArrayListType(
            ArrowArrayType(
                input_types["self"].object_type.property_types[input_types["key"].val]
            )
        )
    )
    def pick(self, key: str):
        # TODO: Don't do to_pylist() here! Stay in arrow til as late
        #     as possible
        return ArrowArrayList(self._table[key])

    @op(
        input_type={
            "self": ArrowTableGroupResultType(),
            "group_by_fn": lambda input_types: types.Function(
                {"row": input_types["self"].object_type}, types.Any()
            ),
        },
        output_type=lambda input_types: ArrowTableGroupByType(
            input_types["self"].object_type, input_types["group_by_fn"].output_type
        ),
    )
    def groupby(self, group_by_fn):
        # replace_schema_metadata does a shallow copy
        table = self._table
        mapped = mapped_fn_to_arrow(table, group_by_fn)
        group_cols = []
        if isinstance(mapped, pa.Table):
            for name, column in zip(mapped.column_names, mapped.columns):
                group_col_name = "group_key_" + name
                table = table.append_column(group_col_name, column)
                group_cols.append(group_col_name)
        elif isinstance(mapped, pa.ChunkedArray):
            group_col_name = "group_key"
            table = table.append_column(group_col_name, mapped)
            group_cols.append(group_col_name)
        else:
            raise errors.WeaveInternalError(
                "Arrow groupby not yet support for map result: %s" % type(mapped)
            )
        grouped = table.group_by(group_cols)
        aggs = []
        for column_name in self._table.column_names:
            aggs.append((column_name, "list"))
        agged = grouped.aggregate(aggs)
        return ArrowTableGroupBy(agged, group_cols)


ArrowTableGroupResultType.instance_classes = ArrowTableGroupResult
ArrowTableGroupResultType.instance_class = ArrowTableGroupResult


class ArrowArrayListType(types.ObjectType):
    name = "ArrowArrayList"

    type_vars = {"_array": ArrowArrayType(types.Any())}

    def __init__(self, _array=ArrowArrayType(types.Any())):
        self._array = _array

    def property_types(self):
        return {"_array": self._array}

    @property
    def object_type(self):
        return self._array.object_type


@weave_class(weave_type=ArrowArrayListType)
class ArrowArrayList:
    _array: pa.ChunkedArray

    def to_pylist(self):
        return self._array.to_pylist()

    def __init__(self, _array):
        self._array = _array

    @op()
    def count(self) -> int:
        return len(self._array)

    def _index(self, index):
        try:
            return self._array[index]
        except IndexError:
            return None

    @op(output_type=index_output_type)
    def __getitem__(self, index: int):
        return self._index(index)

    @op(
        input_type={
            "self": types.List(types.Any()),
            "filter_fn": lambda input_types: types.Function(
                {"row": input_types["self"].object_type}, types.Any()
            ),
        },
        output_type=lambda input_types: input_types["self"],
    )
    def filter(self, filter_fn):
        return ArrowArrayList(self._df[filter_fn_to_pandas_filter(self._df, filter_fn)])

    @op(
        input_type={
            "self": types.List(types.Any()),
            "map_fn": lambda input_types: types.Function(
                {"row": input_types["self"].object_type}, types.Any()
            ),
        },
        output_type=map_output_type,
    )
    def map(self, map_fn):
        res = mapped_fn_to_arrow(self._array, map_fn)
        if isinstance(res, pa.Table):
            return ArrowTableList(res)
        elif isinstance(res, pa.ChunkedArray):
            return ArrowArrayList(res)
        else:
            raise errors.WeaveInternalError("Unexpected type: %s" % res)

    @op(
        input_type={
            "self": ArrowArrayListType(ArrowArrayType(types.Any())),
            "group_by_fn": lambda input_types: types.Function(
                {"row": input_types["self"]}, types.Any()
            ),
        },
        output_type=lambda input_types: ArrowTableGroupByType(
            input_types["self"], input_types["group_by_fn"].output_type
        ),
    )
    def groupby(self, group_by_fn):
        # replace_schema_metadata does a shallow copy
        array = self._array
        mapped = mapped_fn_to_arrow(array, group_by_fn)
        print("MAPPED", mapped)
        group_cols = []
        table = pa.table({"array": array})
        if isinstance(mapped, pa.Table):
            for name, column in zip(mapped.column_names, mapped.columns):
                group_col_name = "group_key_" + name
                table = table.append_column(group_col_name, column)
                group_cols.append(group_col_name)
        else:
            raise errors.WeaveInternalError("not supported")
        grouped = table.group_by(group_cols)
        aggs = (("array", "list"),)
        agged = grouped.aggregate(aggs)
        return ArrowTableGroupBy(agged, group_cols)


ArrowArrayListType.instance_classes = ArrowArrayList
ArrowArrayListType.instance_class = ArrowArrayList


class ArrowTableListType(types.ObjectType):
    name = "ArrowTableList"

    type_vars = {"_table": ArrowTableType(types.Any())}

    def __init__(self, _table=ArrowTableType(types.Any())):
        self._table = _table

    def _to_dict(self):
        return {
            "objectType": self.object_type.to_dict(),
            "_table": self._table.to_dict(),
        }

    @classmethod
    def from_dict(cls, d):
        return cls(types.TypeRegistry.type_from_dict(d["_table"]))

    def property_types(self):
        return {"_table": self._table}

    @property
    def object_type(self):
        return self._table.object_type


@weave_class(weave_type=ArrowTableListType)
class ArrowTableList:
    _table: pa.Table

    def to_pylist(self):
        return self._table.to_pylist()

    def __init__(self, _table):
        self._table = _table

    def _count(self):
        return len(self._table)

    @op()
    def count(self) -> int:
        print("SELF", self)
        return self._count()

    def _index(self, index):
        try:
            row = self._table.slice(index, 1)
        except IndexError:
            return None
        return row.to_pylist()[0]

    @op(output_type=index_output_type)
    def __getitem__(self, index: int):
        return self._index(index)

    @op(output_type=pick_output_type)
    def pick(self, key: str):
        return self._table[key]

    @op(
        input_type={
            "self": types.List(types.Any()),
            "filter_fn": lambda input_types: types.Function(
                {"row": input_types["self"].object_type}, types.Any()
            ),
        },
        output_type=lambda input_types: input_types["self"],
    )
    def filter(self, filter_fn):
        return ArrowTableList(self._df[filter_fn_to_pandas_filter(self._df, filter_fn)])

    @op(
        input_type={
            "self": types.List(types.Any()),
            "map_fn": lambda input_types: types.Function(
                {"row": input_types["self"].object_type}, types.Any()
            ),
        },
        output_type=map_output_type,
    )
    def map(self, map_fn):
        res = mapped_fn_to_arrow(self._table, map_fn)
        if isinstance(res, pa.Table):
            return ArrowTableList(res)
        elif isinstance(res, pa.ChunkedArray):
            return ArrowArrayList(res)
        else:
            raise errors.WeaveInternalError("Unexpected type: %s" % res)

    @op(
        input_type={
            "self": ArrowTableListType(ArrowTableType(types.Any())),
            "group_by_fn": lambda input_types: types.Function(
                {"row": input_types["self"].object_type}, types.Any()
            ),
        },
        output_type=lambda input_types: ArrowTableGroupByType(
            input_types["self"].object_type, input_types["group_by_fn"].output_type
        ),
    )
    def groupby(self, group_by_fn):
        # replace_schema_metadata does a shallow copy
        table = self._table
        mapped = mapped_fn_to_arrow(table, group_by_fn)
        group_cols = []
        if isinstance(mapped, pa.Table):
            for name, column in zip(mapped.column_names, mapped.columns):
                group_col_name = "group_key_" + name
                table = table.append_column(group_col_name, column)
                group_cols.append(group_col_name)
        else:
            raise errors.WeaveInternalError("not supported")
        grouped = table.group_by(group_cols)
        aggs = []
        for column_name in self._table.column_names:
            aggs.append((column_name, "list"))
        agged = grouped.aggregate(aggs)
        return ArrowTableGroupBy(agged, group_cols)


ArrowTableListType.instance_classes = ArrowTableList
ArrowTableListType.instance_class = ArrowTableList
