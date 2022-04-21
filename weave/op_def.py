from imp import is_builtin
import importlib
import textwrap
import contextlib
import contextvars
import inspect
import os
import typing
import sys
from pathlib import Path

from weave.uris import WeaveObjectLocation

from . import errors
from . import op_args
from . import weave_types as types


# Set to the op version if we're in the process of loading
# an op from an artifact.
_loading_op_location: contextvars.ContextVar[
    typing.Optional[WeaveObjectLocation]
] = contextvars.ContextVar("loading_op_location", default=None)

# Set to the op version if we're in the process of loading
# an op from an artifact.
_loading_built_ins: contextvars.ContextVar[
    typing.Optional[bool]
] = contextvars.ContextVar("loading_builtins", default=None)


@contextlib.contextmanager
def loading_op_location(location):
    token = _loading_op_location.set(location)
    yield _loading_op_location.get()
    _loading_op_location.reset(token)


def get_loading_op_location():
    return _loading_op_location.get()


def set_loading_built_ins(currently: bool):
    _loading_built_ins.set(currently)


def get_loading_built_ins():
    return _loading_built_ins.get()


class OpDef:
    """An Op Definition.

    Must be immediately passed to Register.register_op() after construction.
    """

    name: str
    input_type: op_args.OpArgs
    output_type: typing.Union[
        types.Type,
        typing.Callable[[typing.Dict[str, types.Type]], types.Type],
    ]
    setter = str
    call_fn: typing.Any
    version: typing.Optional[str]
    is_builtin: bool = False

    def __init__(
        self,
        name: str,
        input_type: op_args.OpArgs,
        output_type: typing.Union[
            types.Type,
            typing.Callable[[typing.Dict[str, types.Type]], types.Type],
        ],
        resolve_fn,
        setter=None,
        render_info=None,
        pure=True,
        is_builtin: typing.Optional[bool] = None,
    ):
        self.name = name
        self.input_type = input_type
        self.output_type = output_type
        self.resolve_fn = resolve_fn
        self.setter = setter
        self.render_info = render_info
        self.pure = pure
        self.is_builtin = (
            is_builtin if is_builtin is not None else get_loading_built_ins()
        )
        self.version = None
        self.call_fn = None

    # @property
    # def fullname(self):
    #     return self.name + ":" + self.version

    # @property
    def simple_name(self):
        # We need this to get around the run job_type 64 char limit, and artifact name limitations.
        # TODO: This function will need to be stable! Let's make sure we like what we're doing here.
        if self.name.startswith("file://"):
            # Shorten because local file paths tend to blow out the 64 char job_type limit (we need
            # to fix that probably)
            return self.name.rsplit("/", 1)[1]
        elif self.name.startswith("wandb-artifact://"):
            return (
                self.name[len("wandb-artifact://") :]
                .replace(":", ".")
                .replace("/", "_")
            )
        else:
            # This is for builtins, which I think we may just want to get rid
            # of?
            return self.name

    def uri_name(self):
        if hasattr(self, "_ref") and hasattr(self._ref, "uri"):
            return self._ref.uri()
        if self.version is not None:
            return self.name + ":" + self.version
        return self.name

    def to_dict(self):
        if callable(self.output_type):
            raise errors.WeaveSerializeError(
                "serializing op with callable output_type not yet implemented"
            )
        if self.input_type.kind != op_args.OpArgs.NAMED_ARGS:
            raise errors.WeaveSerializeError(
                "serializing op with non-named-args input_type not yet implemented"
            )

        input_types = {
            name: arg_type.to_dict()
            for name, arg_type in self.input_type.arg_types.items()
        }

        output_type = self.output_type.to_dict()

        serialized = {
            "name": self.uri_name(),
            "input_types": input_types,
            "output_type": output_type,
        }
        if self.render_info is not None:
            serialized["render_info"] = self.render_info

        return serialized

    def __str__(self):
        return "<OpDef: %s>" % self.name


class OpDefType(types.Type):
    name = "op-def"
    instance_class = OpDef
    instance_classes = OpDef

    def __init__(self):
        # TODO: actually this should maybe be the function's type?
        pass

    def assign_type(self, other):
        return types.InvalidType()

    def save_instance(self, obj: OpDef, artifact, name):
        code = "import weave\n" "\n"
        code += textwrap.dedent(inspect.getsource(obj.resolve_fn))
        with artifact.new_file(f"{name}.py") as f:
            f.write(code)

    def load_instance(cls, artifact, name, extra=None):
        loaded = artifact.load(f"{name}.py")
        if loaded is None:
            raise Exception(f"cannot load {name} from artifact")
        path = Path(loaded)
        sys_mod = path.parts[0]
        if path.is_file():
            parts = list(path.parts[1:-1])
            parts.append(path.stem)
        else:
            parts = path.parts[1:]

        module_path = ".".join(parts)
        # This has a side effect of registering the op
        sys.path.insert(0, sys_mod)
        with loading_op_location(artifact.location):
            mod = importlib.import_module(module_path)
        sys.path.pop(0)
        # We justed imported e.g. 'op-number-add.xaybjaa._obj'. Navigate from
        # mod down to _obj.
        module_functions = inspect.getmembers(mod, inspect.isfunction)
        if len(module_functions) != 1:
            raise errors.WeaveInternalError(
                "Unexpected Weave module saved in: %s" % path
            )
        _, op_call_fn = module_functions[0]
        return op_call_fn.op_def


def fully_qualified_opname(wrap_fn):
    op_module_file = os.path.abspath(inspect.getfile(wrap_fn))
    if op_module_file.endswith(".py"):
        op_module_file = op_module_file[:-3]
    elif op_module_file.endswith(".pyc"):
        op_module_file = op_module_file[:-4]
    return "file://" + op_module_file + "." + wrap_fn.__name__
