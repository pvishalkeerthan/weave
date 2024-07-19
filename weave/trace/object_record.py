import dataclasses
import types
from inspect import getmro, isclass
from typing import Any, Callable, Union

import pydantic

from weave.trace.op import Op


class ObjectRecord:
    _class_name: str
    _bases: list[str]

    def __init__(self, attrs: dict[str, Any]) -> None:
        for k, v in attrs.items():
            setattr(self, k, v)

    def __repr__(self) -> str:
        return f"ObjectRecord({self.__dict__})"

    def __rich_repr__(self):
        for k, v in self.__dict__.items():
            if not k.startswith("__"):
                yield k, v

    def __eq__(self, other: Any) -> bool:
        if isinstance(other, ObjectRecord):
            if self._class_name != other._class_name:
                return False
        else:
            if other.__class__.__name__ != getattr(self, "_class_name"):
                return False
        for k, v in self.__dict__.items():
            if k == "_class_name" or k == "_bases":
                continue
            if getattr(other, k) != v:
                return False
        return True

    def map_values(self, fn: Callable) -> "ObjectRecord":
        return ObjectRecord({k: fn(v) for k, v in self.__dict__.items()})


PydanticBaseModelGeneral = Union[pydantic.BaseModel, pydantic.v1.BaseModel]


def pydantic_model_fields(obj: PydanticBaseModelGeneral) -> list[str]:
    if isinstance(obj, pydantic.BaseModel):
        return obj.model_fields
    elif isinstance(obj, pydantic.v1.BaseModel):
        return obj.__fields__
    else:
        raise ValueError(f"{obj} is not a pydantic model")


def pydantic_asdict_one_level(obj: PydanticBaseModelGeneral) -> dict[str, Any]:
    return {k: getattr(obj, k) for k in pydantic_model_fields(obj)}


def class_all_bases_names(cls: type) -> list[str]:
    # Don't include cls and don't include object
    return [c.__name__ for c in cls.mro()[1:-1]]


def pydantic_object_record(obj: PydanticBaseModelGeneral) -> ObjectRecord:
    attrs = pydantic_asdict_one_level(obj)
    for k, v in getmembers(obj, lambda x: isinstance(x, Op), lambda e: None):
        attrs[k] = types.MethodType(v, obj)
    attrs["_class_name"] = obj.__class__.__name__
    attrs["_bases"] = class_all_bases_names(obj.__class__)
    return ObjectRecord(attrs)


def dataclass_asdict_one_level(obj: Any) -> dict[str, Any]:
    if not dataclasses.is_dataclass(obj):
        raise ValueError(f"{obj} is not a dataclass")
    return {k: getattr(obj, k) for k in obj.__dataclass_fields__}


def dataclass_object_record(obj: Any) -> ObjectRecord:
    if not dataclasses.is_dataclass(obj):
        raise ValueError(f"{obj} is not a dataclass")
    attrs = dataclass_asdict_one_level(obj)
    for k, v in getmembers(obj, lambda x: isinstance(x, Op), lambda e: None):
        attrs[k] = types.MethodType(v, obj)
    attrs["_class_name"] = obj.__class__.__name__
    attrs["_bases"] = class_all_bases_names(obj.__class__)
    return ObjectRecord(attrs)


# This is an exact copy of the getmembers function from the inspect module
# with the addition of handling exceptions when calling getattr, with an on_error handler
def getmembers(
    object: Any, predicate: Any = None, on_error: Any = None
) -> list[tuple[str, Any]]:
    """Return all members of an object as (name, value) pairs sorted by name.
    Optionally, only return members that satisfy a given predicate."""
    if isclass(object):
        mro = (object,) + getmro(object)
    else:
        mro = ()
    results = []
    processed = set()
    names = dir(object)
    # :dd any DynamicClassAttributes to the list of names if object is a class;
    # this may result in duplicate entries if, for example, a virtual
    # attribute with the same name as a DynamicClassAttribute exists
    try:
        for base in object.__bases__:
            for k, v in base.__dict__.items():
                if isinstance(v, types.DynamicClassAttribute):
                    names.append(k)
    except AttributeError:
        pass
    for key in names:
        # First try to get the value via getattr.  Some descriptors don't
        # like calling their __get__ (see bug #1785), so fall back to
        # looking in the __dict__.
        try:
            value = getattr(object, key)
            # handle the duplicate key
            if key in processed:
                raise AttributeError
        except AttributeError:
            for base in mro:
                if key in base.__dict__:
                    value = base.__dict__[key]
                    break
            else:
                # could be a (currently) missing slot member, or a buggy
                # __dir__; discard and move on
                continue

        # This is where the modified code begins
        except Exception as e:
            if on_error:
                on_error(e)
            else:
                raise e
        # This is where the modified code ends

        if not predicate or predicate(value):
            results.append((key, value))
        processed.add(key)
    results.sort(key=lambda pair: pair[0])
    return results
