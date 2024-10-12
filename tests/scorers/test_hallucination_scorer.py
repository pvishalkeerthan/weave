import pytest
from openai import OpenAI

from weave.flow.scorer.hallucination_scorer import (
    HallucinationResponse,
    HallucinationScorer,
)

# mock the create function
@pytest.fixture
def mock_create(monkeypatch):
    def _mock_create(*args, **kwargs):
        return HallucinationResponse(
            chain_of_thought="The output is consistent with the input data.",
            is_hallucination=False
        )
    monkeypatch.setattr('weave.flow.scorer.hallucination_scorer.create', _mock_create)

@pytest.fixture
def hallucination_scorer(mock_create):
    return HallucinationScorer(client=OpenAI(api_key="DUMMY_API_KEY"), model_id="gpt-4o", temperature=0.7, max_tokens=4096)

def test_hallucination_scorer_initialization(hallucination_scorer):
    assert isinstance(hallucination_scorer, HallucinationScorer)
    assert hallucination_scorer.model_id == "gpt-4o"
    assert hallucination_scorer.temperature == 0.7
    assert hallucination_scorer.max_tokens == 4096

def test_hallucination_scorer_score(hallucination_scorer, mock_create):
    output = "John's favorite cheese is cheddar."
    context = "John likes various types of cheese."
    result = hallucination_scorer.score(output, context)
    assert isinstance(result, HallucinationResponse)
    assert not result.is_hallucination
    assert "The output is consistent with the input data."  == result.chain_of_thought

# Add more tests as needed
