from __future__ import annotations

from typing import TYPE_CHECKING, Any, List, Optional, Union

from weave.trace.autopatch import autopatch

autopatch()  # ensure both weave patching and instructor patching are applied

# TODO: Gemini

OPENAI_DEFAULT_MODEL = "gpt-4o"
OPENAI_DEFAULT_EMBEDDING_MODEL = "text-embedding-3-small"

ANTHROPIC_DEFAULT_MODEL = "claude-3-5-sonnet"

MISTRAL_DEFAULT_MODEL = "mistral-large-latest"
MISTRAL_DEFAULT_EMBEDDING_MODEL = "mistral-embed"

DEFAULT_MAX_TOKENS = 4096

if TYPE_CHECKING:
    import instructor
    from anthropic import Anthropic, AsyncAnthropic
    from mistralai import Mistral
    from openai import AsyncOpenAI, OpenAI
    from google.generativeai import GenerativeModel

    _LLM_CLIENTS = Union[OpenAI, AsyncOpenAI, Anthropic, AsyncAnthropic, Mistral, GenerativeModel]
else:
    _LLM_CLIENTS = object

_LLM_CLIENTS_NAMES = (
    "OpenAI",
    "AsyncOpenAI",
    "Anthropic",
    "AsyncAnthropic",
    "Mistral",
    "GenerativeModel",
)


def instructor_client(client: _LLM_CLIENTS) -> "instructor.client":  # type: ignore
    try:
        import instructor
    except ImportError:
        raise ImportError(
            "The `instructor` package is required to use LLM-powered scorers, please run `pip install instructor`"
        )

    client_type = type(client).__name__.lower()

    if "openai" in client_type:
        return instructor.from_openai(client)
    elif "anthropic" in client_type:
        return instructor.from_anthropic(client)
    elif "mistral" in client_type:
        return instructor.from_mistral(client)
    elif "generativemodel" in client_type:
        return instructor.from_gemini(
            client=client,
            mode=instructor.Mode.GEMINI_JSON,
        )
    else:
        raise ValueError(f"Unsupported client type: {client_type}")


def create(client: instructor.client, *args, **kwargs) -> Any:  # type: ignore
    return client.chat.completions.create(*args, **kwargs)


def embed(
    client: _LLM_CLIENTS, model_id: str, texts: Union[str, List[str]], **kwargs: Any
) -> List[List[float]]:  # type: ignore
    client_type = type(client).__name__.lower()
    if "openai" in client_type:
        response = client.embeddings.create(model=model_id, input=texts, **kwargs)  # type: ignore
        return [embedding.embedding for embedding in response.data]
    elif "mistral" in client_type:
        response = client.embeddings.create(model=model_id, inputs=texts, **kwargs)  # type: ignore
        return [embedding.embedding for embedding in response.data]
    else:
        raise ValueError(f"Unsupported client type: {type(client).__name__.lower()}")


# Helper function for dynamic imports
def import_client(provider: str) -> Optional[_LLM_CLIENTS]:  # type: ignore
    try:
        if provider == "openai":
            from openai import OpenAI

            return OpenAI
        elif provider == "anthropic":
            import anthropic

            return anthropic.Anthropic
        elif provider == "mistral":
            from mistralai import Mistral

            return Mistral
        elif provider == "gemini":
            from google.generativeai import GenerativeModel

            return GenerativeModel
    except ImportError:
        return None
