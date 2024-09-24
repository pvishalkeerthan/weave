"""Settings for Weave.

## `disabled`

* Environment Variable: `WEAVE_DISABLED`
* Settings Key: `disabled`
* Default: `False`
* Type: `bool`

If True, all weave ops will behave like regular functions and no network requests will be made.

## `print_call_link`

* Environment Variable: `WEAVE_PRINT_CALL_LINK`
* Settings Key: `print_call_link`
* Default: `True`
* Type: `bool`

If True, prints a link to the Weave UI when calling a weave op.
"""

import os
from contextvars import ContextVar
from typing import Any, Optional, Union

from pydantic import BaseModel, ConfigDict, PrivateAttr

SETTINGS_PREFIX = "WEAVE_"

# Attention Devs:
# To add new settings:
# 1. Add a new field to `UserSettings`
# 2. Add a new `should_{xyz}` function


class UserSettings(BaseModel):
    """User configuration for Weave.

    All configs can be overrided with environment variables.  The precedence is
    environment variables > `weave.trace.settings.UserSettings`."""

    disabled: bool = False
    """Toggles Weave tracing.

    If True, all weave ops will behave like regular functions.
    Can be overrided with the environment variable `WEAVE_DISABLED`"""

    print_call_link: bool = True
    """Toggles link printing to the terminal.

    If True, prints a link to the Weave UI when calling a weave op.
    Can be overrided with the environment variable `WEAVE_PRINT_CALL_LINK`"""

    capture_code: bool = True
    """Toggles code capture for ops.

    If True, saves code for ops so they can be reloaded for later use.
    Can be overrided with the environment variable `WEAVE_CAPTURE_CODE`

    WARNING: Switching between `save_code=True` and `save_code=False` mid-script
    may lead to unexpected behaviour.  Make sure this is only set once at the start!
    """

    convert_paths_to_images: bool = True
    """Toggles conversion of image file paths to PathImage objects.

    If True, image file paths will be converted to PathImage objects.
    Can be overrided with the environment variable `WEAVE_CONVERT_PATHS_TO_IMAGES`

    Example:
        @weave.op
        def generate_image(prompt: str):
            text, url = generate_text_and_image(prompt)
            return {"text": text, "image": url}

        If WEAVE_CONVERT_PATHS_TO_IMAGES=false, `image` will be remain as a string.
        Otherwise, it will automatically be converted to a PathImage object.
    """

    model_config = ConfigDict(extra="forbid")
    _is_first_apply: bool = PrivateAttr(True)

    def _reset(self) -> None:
        for name, field in self.model_fields.items():
            setattr(self, name, field.default)

    def apply(self) -> None:
        if self._is_first_apply:
            self._is_first_apply = False
        else:
            self._reset()

        for name in self.model_fields:
            context_var = _context_vars[name]
            context_var.set(getattr(self, name))


def should_disable_weave() -> bool:
    return _should("disabled")


def should_print_call_link() -> bool:
    return _should("print_call_link")


def should_capture_code() -> bool:
    return _should("capture_code")


def should_convert_paths_to_images() -> bool:
    return _should("convert_paths_to_images")


def parse_and_apply_settings(
    settings: Optional[Union[UserSettings, dict[str, Any]]] = None,
) -> None:
    if settings is None:
        user_settings = UserSettings()
    if isinstance(settings, dict):
        user_settings = UserSettings.model_validate(settings)
    if isinstance(settings, UserSettings):
        user_settings = settings

    user_settings.apply()


_context_vars = {
    name: ContextVar(name, default=field.default)
    for name, field in UserSettings.model_fields.items()
}


def _str2bool_truthy(v: str) -> bool:
    return v.lower() in ("yes", "true", "1", "on")


def _should(name: str) -> bool:
    if env := os.getenv(f"{SETTINGS_PREFIX}{name.upper()}"):
        return _str2bool_truthy(env)
    return _context_vars[name].get()


__doc_spec__ = [UserSettings]
