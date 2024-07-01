import os
import pytest
from typing import Any

import weave
from weave.weave_client import WeaveClient
from weave.trace_server import trace_server_interface as tsi


def _get_call_output(call: tsi.CallSchema) -> Any:
    """This is a hack and should not be needed. We should be able to auto-resolve this for the user.
    Keeping this here for now, but it should be removed in the future once we have a better solution.
    """
    call_output = call.output
    if isinstance(call_output, str) and call_output.startswith("weave://"):
        return weave.ref(call_output).get()
    return call_output


def op_name_from_ref(ref: str) -> str:
    return ref.split("/")[-1].split(":")[0]


@pytest.mark.skip_clickhouse_client
@pytest.mark.vcr(
    filter_headers=["authorization"],
    allowed_hosts=["api.wandb.ai", "localhost", "trace.wandb.ai"],
)
def test_dspy_language_models(client: WeaveClient) -> None:
    import dspy

    gpt3_turbo = dspy.OpenAI(
        model="gpt-3.5-turbo-1106",
        max_tokens=300,
        api_key=os.environ.get("OPENAI_API_KEY", "DUMMY_API_KEY"),
    )
    dspy.configure(lm=gpt3_turbo)
    prediction = gpt3_turbo("hello! this is a raw prompt to GPT-3.5")
    expected_prediction = "Hello! How can I assist you today?"
    assert prediction == [expected_prediction]
    weave_server_respose = client.server.calls_query(
        tsi.CallsQueryReq(project_id=client._project_id())
    )
    assert len(weave_server_respose.calls) == 3

    call_1 = weave_server_respose.calls[0]
    assert call_1.exception is None and call_1.ended_at is not None
    output_1 = _get_call_output(call_1)
    assert output_1[0] == expected_prediction

    call_2 = weave_server_respose.calls[1]
    assert call_2.exception is None and call_2.ended_at is not None
    output_2 = _get_call_output(call_2)
    assert output_2["choices"][0]["finish_reason"] == "stop"
    assert output_2["choices"][0]["message"]["content"] == expected_prediction
    assert output_2["choices"][0]["message"]["role"] == "assistant"
    assert output_2["model"] == "gpt-3.5-turbo-1106"
    assert output_2["usage"]["completion_tokens"] == 9
    assert output_2["usage"]["prompt_tokens"] == 21
    assert output_2["usage"]["total_tokens"] == 30

    call_3 = weave_server_respose.calls[2]
    assert call_3.exception is None and call_3.ended_at is not None
    output_3 = _get_call_output(call_3)
    assert output_3["choices"][0]["finish_reason"] == "stop"
    assert output_3["choices"][0]["message"]["content"] == expected_prediction
    assert output_3["choices"][0]["message"]["role"] == "assistant"
    assert output_3["model"] == "gpt-3.5-turbo-1106"
    assert output_3["usage"]["completion_tokens"] == 9
    assert output_3["usage"]["prompt_tokens"] == 21
    assert output_3["usage"]["total_tokens"] == 30
    assert output_2["id"] == output_3["id"]
    assert output_2["created"] == output_3["created"]
