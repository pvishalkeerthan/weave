from typing import List

from pydantic import BaseModel, Field

import weave
from weave.flow.scorers.llm_scorer import InstructorLLMScorer
from weave.flow.scorers.llm_utils import OPENAI_DEFAULT_MODEL, create
from weave.flow.scorers.utils import stringify

DEFAULT_HALLUCINATION_SYSTEM_PROMPT = """
Given some <input_data> from a user and an <output> generated by an AI system, \
determine if the <output> contains any hallucinations.

A "hallucination" is defined as information in the <output> that is not supported by \
the <input_data> or is not factually or logically consistent with the <input_data>.

# Steps
1. Carefully read and understand the input data.
2. Examine the model output.
3. Compare the output to the input data, identifying any inconsistencies or additions.
4. Evaluate the logical connection between input and output.
5. Determine if any information in the output is not supported by or conflicts with the input.

# Guidelines
- Focus on factual accuracy and logical consistency
- Consider both explicit and implicit information in the input data
- Be aware of potential misinterpretations or over-generalizations in the output
- Identify any information in the output that goes beyond the scope of the input

# Examples
## Data to analyze

<input_data_example>
The cat is black and white.
</input_data_example>

<output_example>
The cat has orange stripes.
</output_example>

## Analysis:
{
  "think_step_by_step": "The cat is black and white. The cat has orange stripes. \
The output contradicts the input data because the input specifies black and white, \
while the output mentions orange. The output also introduces a pattern not present in \
the input.",
  "reasoning": [
    {
      "hallucination_type": "Color comparison",
      "observation": "Input specifies black and white, output mentions orange"
    },
    {
      "hallucination_type": "Pattern analysis",
      "observation": "Input doesn't mention any pattern, output introduces stripes"
    }
  ],
  "conclusion": "The output contains two hallucinations: it contradicts the color information \
and introduces a pattern not present in the input."
  "is_hallucination": true,
}

# Notes
- Ensure each step in the reasoning process is clearly articulated
- Be objective and avoid assumptions not supported by the input data
- If the output contains factual information not present in the input, it may be a \
hallucination even if it doesn't directly contradict the input
"""

DEFAULT_HALLUCINATION_USER_PROMPT = """
Analyze the following <input_data> and <output> and determine if the <output> contains any hallucinations.
# Data to analyze

<input_data>
{input_data}
</input_data>

<output>
{output}
</output>
"""


class HallucinationReasoning(BaseModel):
    hallucination_type: str = Field(
        description="A short name for the type of hallucination."
    )
    observation: str = Field(
        description="An observation from the <input_data> and <output> that supports the hallucination."
    )


class HallucinationResponse(BaseModel):
    chain_of_thought: str = Field(
        description="Think step by step about whether the <output> contains hallucinations \
based on the <input_data>."
    )
    reasonings: List[HallucinationReasoning] = Field(
        description="A list of reasoning steps that lead to the conclusion about whether or not\
the <output> contains hallucinations."
    )
    conclusion: str = Field(description="The conclusion of the analysis.")
    hallucination_free: bool = Field(
        description="Whether the <output> is free of hallucinations based on the <input_data>. True means it is NOT a hallucination."
    )


class HallucinationFreeScorer(InstructorLLMScorer):
    """
    A Scorer that uses an LLM to determine if the model output contains any hallucinations
    based on the input data.

    Note:
        - The meaning of "hallucination" can vary from person to person, you will likely want to
        customize the `system_prompt` and `user_prompt` to fit your specific needs.
        - This Scorer uses the `InstructorLLMScorer` class to generate structured outputs from the LLM
        provider's response; you will have to install the `instructor` python package to use it.
        - The `score` method expects the input column from the dataset to be named "context". It will use
        this data as the ground-truth to check hallucinations against. If your dataset column has a
        different name, you can specify a different mapping using the `column_map` argument in the init
        of HallucinationFreeScorer by passing `column_map={"context": "context"}`.

    Attributes:
        system_prompt (str): The prompt describing the task, defines what a "hallucination" is.
        user_prompt (str): The string template to pass the input and output data. The template must
        contain placeholders for both `{input_data}` and `{output}`.
        model_id (str): The LLM model name, depends on the LLM's providers to be used `client` being used.
        temperature (float): LLM temperature setting.
        max_tokens (int): Maximum number of tokens in the LLM's response.

    Methods:
        score(output: str, context: str) -> HallucinationResponse:
            Analyzes the output to detect hallucinations based on the given context.
    """

    system_prompt: str = DEFAULT_HALLUCINATION_SYSTEM_PROMPT
    user_prompt: str = DEFAULT_HALLUCINATION_USER_PROMPT
    model_id: str = OPENAI_DEFAULT_MODEL
    temperature: float = 0.7
    max_tokens: int = 4096

    @weave.op
    def score(self, output: str, context: str) -> HallucinationResponse:
        output = stringify(output)
        response = create(
            self.client,
            messages=[
                {"role": "system", "content": self.system_prompt},
                {
                    "role": "user",
                    "content": self.user_prompt.format(
                        input_data=context, output=output
                    ),
                },
            ],
            model=self.model_id,
            response_model=HallucinationResponse,
            temperature=self.temperature,
            max_tokens=self.max_tokens,
        )
        return response.model_dump()  # Morgan wants this to be a dict
