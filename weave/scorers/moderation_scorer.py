from typing import Any

from pydantic import field_validator

import weave
from weave.scorers.llm_scorer import LLMScorer


class OpenAIModerationScorer(LLMScorer):
    """Use OpenAI moderation API to check if the model output is safe"""

    @field_validator("client")
    def validate_openai_client(cls, v):  # type: ignore
        try:
            from openai import (  # Ensure these are the correct imports
                AsyncOpenAI,
                OpenAI,
            )
        except ImportError:
            raise ValueError("Install openai to use this scorer")

        if not isinstance(v, (OpenAI, AsyncOpenAI)):
            raise ValueError("Moderation scoring only works with OpenAI or AsyncOpenAI")
        return v

    @weave.op
    def score(self, output: Any) -> Any:
        response = self.client.moderations.create(
            model=self.model_id,
            input=output,
        ).results[0]
        categories = {k: v for k, v in response.categories.dict().items() if v}
        return {"flagged": response.flagged, "categories": categories}
