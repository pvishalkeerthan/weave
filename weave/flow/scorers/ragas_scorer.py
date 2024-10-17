# implementing metrics from ragas: https://github.com/explodinggradients/ragas

from textwrap import dedent

from pydantic import BaseModel, Field

import weave
from weave.flow.scorers.llm_scorer import InstructorLLMScorer
from weave.flow.scorers.llm_utils import create


class EntityExtractionResponse(BaseModel):
    entities: list[str] = Field(
        description="A list of unique entities extracted from the text"
    )


class ContextEntityRecallScorer(InstructorLLMScorer):
    """
    Estimates context recall by extracting entities from the model output
    and the context, then computes the recall.
    """

    extraction_prompt: str = dedent("""
    Extract unique entities from the following text without repetition.

    Text: {text}
    Entities:
    """)

    def extract_entities(self, text: str) -> list[str]:
        # Use LLM to extract entities
        prompt = self.extraction_prompt.format(text=text)
        response = create(
            self.client,
            messages=[{"role": "user", "content": prompt}],
            response_model=EntityExtractionResponse,
            model=self.model_id,
        )
        # Assume entities are returned as a comma-separated list
        entities = [e.strip() for e in response.entities]
        return entities

    @weave.op
    def score(self, output: str, context: str) -> dict:
        expected_entities = self.extract_entities(output)
        context_entities = self.extract_entities(context)
        # Calculate recall
        if not expected_entities:
            return {"recall": 0.0}
        matches = set(expected_entities) & set(context_entities)
        recall = len(matches) / len(expected_entities)
        return {"recall": recall}


class RelevancyResponse(BaseModel):
    reasoning: str = Field(
        description="Think step by step about whether the context is relevant to the question"
    )
    relevancy_score: int = Field(
        ge=0,
        le=1,
        description="The relevancy score of the context to the question (0 for not relevant, 1 for relevant)",
    )


class ContextRelevancyScorer(InstructorLLMScorer):
    """Evaluates the relevancy of the provided context to the model output."""

    relevancy_prompt: str = dedent("""
    Given the following question and context, rate the relevancy of the context to the question on a scale from 0 to 1.

    Question: {question}
    Context: {context}
    Relevancy Score (0-1):
    """)

    @weave.op
    def score(self, output: str, context: str) -> dict:
        prompt = self.relevancy_prompt.format(question=output, context=context)
        response = create(
            self.client,
            messages=[{"role": "user", "content": prompt}],
            response_model=RelevancyResponse,
            model=self.model_id,
        )
        return {"relevancy_score": response.relevancy_score}
