import copy
import typing
from collections import OrderedDict


def _flatten_dict(
    d: dict[str, typing.Any], sep: str = ".", prefix: str = ""
) -> dict[str, typing.Any]:
    """
    Flatten a nested dict to a single-level dict, with keys in flattened notation.

    input: {"a": {"b": {"c": "d"}}}
    output: {"a.b.c": "d"}
    """
    if len(d) == 0 and prefix:
        return {prefix.removesuffix(sep): {}}

    flat = {}
    for key, val in d.items():
        if isinstance(val, dict):
            sub_dict = _flatten_dict(val, sep, f"{prefix}{key}{sep}")
            flat.update(sub_dict)
        else:
            flat[f"{prefix}{key}"] = val
    return flat


def _unflatten_dict(d: dict[str, typing.Any], sep: str = ".") -> dict[str, typing.Any]:
    """
    Unflatten a single-level dict to a nested dict.

    input: {"output.val.a": "a", "output.val.b": "b"}
    output: {"output": {"val": {"a": "a", "b": "b"}}}
    """
    out: typing.Dict[str, typing.Any] = {}
    for col, val in d.items():
        keys = col.split(sep)
        curr = out
        for key in keys[:-1]:
            curr = curr.setdefault(key, {})
        curr[keys[-1]] = copy.deepcopy(val)
    return out


def get_nested_key(d: dict[str, typing.Any], col: str) -> typing.Any:
    """
    Get a nested key from a dict.

    Example:
    get_nested_key({"a": {"b": {"c": "d"}}}, "a.b.c") -> "d"
    get_nested_key({"a": {"b": {"c": "d"}}}, "a.b.c.e") -> None
    """
    keys = col.split(".")
    curr = d
    for key in keys[:-1]:
        curr = curr.get(key, {})
    return curr.get(keys[-1], None)


def set_nested_key(d: dict[str, typing.Any], col: str, val: typing.Any) -> None:
    """
    Set a nested key in a dict.
    """
    keys = col.split(".")
    curr = d
    for key in keys[:-1]:
        curr = curr.setdefault(key, {})
    curr[keys[-1]] = copy.deepcopy(val)


class LRUCache(OrderedDict):
    def __init__(self, maxsize=1000, *args, **kwargs):
        self.maxsize = maxsize
        super().__init__(*args, **kwargs)

    def __setitem__(self, key, value):
        if len(self) >= self.maxsize:
            self.popitem(last=False)
        super().__setitem__(key, value)
