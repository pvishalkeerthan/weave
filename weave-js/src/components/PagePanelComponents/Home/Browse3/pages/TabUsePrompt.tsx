import {Box} from '@mui/material';
import React from 'react';

import {isValidVarName} from '../../../../../core/util/var';
import {parseRef} from '../../../../../react';
import {abbreviateRef} from '../../../../../util/refs';
import {Alert} from '../../../../Alert';
import {CopyableText} from '../../../../CopyableText';
import {DocLink} from './common/Links';
// import {usePrompt} from './PromptPage/hooks';
// import {Data, Placeholder} from './PromptPage/types';

type TabUsePromptProps = {
  name: string;
  uri: string;
  entityName: string;
  projectName: string;
  //   data: Data;
};

// const getDefaultValue = (placeholder: Placeholder): string => {
//   if (placeholder.default != null) {
//     return placeholder.default;
//   }
//   if (placeholder.type === 'string') {
//     return '';
//   }
//   if (placeholder.type === 'number') {
//     return '0';
//   }
//   return '';
// };

// const getParams = (placeholders: Placeholder[]): Record<string, any> => {
//   const params: Record<string, string> = {};
//   for (const placeholder of placeholders) {
//     params[placeholder.name] = getDefaultValue(placeholder);
//   }
//   return params;
// };

export const TabUsePrompt = ({
  name,
  uri,
  entityName,
  projectName,
  data,
}: TabUsePromptProps) => {
  // We'll load the actual prompt object to get placeholder information
  // const {loading, prompt} = usePrompt(entityName, projectName, data);
  // if (loading) {
  //   // TODO: Maybe show a loading indicator here
  //   return null;
  // }

  // if (!prompt) {
  //   return null;
  // }

  //   const params = getParams(prompt.placeholders);

  const pythonName = isValidVarName(name) ? name : 'prompt';
  const ref = parseRef(uri);
  const isParentObject = !ref.artifactRefExtra;
  const label = isParentObject ? 'prompt version' : 'prompt';

  // TODO: Simplify if no params.
  const longExample = `import weave
from openai import OpenAI

weave.init("${projectName}")

${pythonName} = weave.ref("${uri}").get()

class MyModel(weave.Model):
  model_name: str
  prompt: weave.Prompt

  @weave.op
  def predict(self, params: dict) -> dict:
      client = OpenAI()
      response = client.chat.completions.create(
          model=self.model_name,
          messages=self.prompt.bind(params),
      )
      result = response.choices[0].message.content
      if result is None:
          raise ValueError("No response from model")
      return result

mymodel = MyModel(model_name="gpt-3.5-turbo", prompt=${pythonName})

# Replace with desired parameter values
params = ${JSON.stringify({}, null, 2)}
print(mymodel.predict(params))
`;

  return (
    <Box m={2} className="text-sm">
      <Alert icon="lightbulb-info">
        See{' '}
        <DocLink
          path="guides/tracking/objects#getting-an-object-back"
          text="Weave docs on refs"
        />{' '}
        and <DocLink path="guides/core-types/prompts" text="prompts" /> for more
        information.
      </Alert>

      <Box mt={2}>
        The ref for this {label} is:
        <CopyableText text={uri} />
      </Box>
      <Box mt={2}>
        Use the following code to retrieve this {label}:
        <CopyableText
          text={`${pythonName} = weave.ref("${abbreviateRef(uri)}").get()`}
          copyText={`${pythonName} = weave.ref("${uri}").get()`}
          tooltipText="Click to copy unabridged string"
        />
      </Box>

      <Box mt={2}>A more complete example:</Box>
      <Box mt={2}>
        <CopyableText
          text={longExample}
          copyText={longExample}
          tooltipText="Click to copy unabridged string"
        />
      </Box>
    </Box>
  );
};
