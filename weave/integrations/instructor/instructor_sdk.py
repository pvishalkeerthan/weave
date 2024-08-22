import importlib

from weave.trace.patcher import MultiPatcher, SymbolPatcher

from .instructor_iterable_utils import instructor_wrapper_async, instructor_wrapper_sync

instructor_patcher = MultiPatcher(
    [
        SymbolPatcher(
            lambda: importlib.import_module("instructor.client"),
            "Instructor.create",
            instructor_wrapper_sync(name="Instructor.create"),
        ),
        SymbolPatcher(
            lambda: importlib.import_module("instructor.client"),
            "AsyncInstructor.create",
            instructor_wrapper_async(name="AsyncInstructor.create"),
        ),
    ]
)
