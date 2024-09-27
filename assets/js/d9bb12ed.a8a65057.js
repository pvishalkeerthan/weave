"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8822],{90079:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var a=t(85893),i=t(11151);const o={},r="Anthropic",s={id:"guides/integrations/anthropic",title:"Anthropic",description:"Weave automatically tracks and logs LLM calls made via the Anthropic Python library, after weave.init() is called.",source:"@site/docs/guides/integrations/anthropic.md",sourceDirName:"guides/integrations",slug:"/guides/integrations/anthropic",permalink:"/guides/integrations/anthropic",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/guides/integrations/anthropic.md",tags:[],version:"current",lastUpdatedAt:1727449268e3,frontMatter:{},sidebar:"documentationSidebar",previous:{title:"OpenAI",permalink:"/guides/integrations/openai"},next:{title:"Cerebras",permalink:"/guides/integrations/cerebras"}},c={},l=[{value:"Traces",id:"traces",level:2},{value:"Wrapping with your own ops",id:"wrapping-with-your-own-ops",level:2},{value:"Create a <code>Model</code> for easier experimentation",id:"create-a-model-for-easier-experimentation",level:2},{value:"Tools (function calling)",id:"tools-function-calling",level:2}];function p(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",img:"img",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"anthropic",children:"Anthropic"}),"\n",(0,a.jsxs)(n.p,{children:["Weave automatically tracks and logs LLM calls made via the ",(0,a.jsx)(n.a,{href:"https://github.com/anthropics/anthropic-sdk-python",children:"Anthropic Python library"}),", after ",(0,a.jsx)(n.code,{children:"weave.init()"})," is called."]}),"\n",(0,a.jsx)(n.h2,{id:"traces",children:"Traces"}),"\n",(0,a.jsx)(n.p,{children:"It\u2019s important to store traces of LLM applications in a central database, both during development and in production. You\u2019ll use these traces for debugging, and as a dataset that will help you improve your application."}),"\n",(0,a.jsxs)(n.p,{children:["Weave will automatically capture traces for ",(0,a.jsx)(n.a,{href:"https://github.com/anthropics/anthropic-sdk-python",children:"anthropic-sdk-python"}),". You can use the library as usual, start by calling ",(0,a.jsx)(n.code,{children:"weave.init()"}),":"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-python",children:'import weave    \n# use the anthropic library as usual\nimport os\nfrom anthropic import Anthropic\n\n# highlight-next-line\nweave.init("anthropic_project")\n\nclient = Anthropic(\n    api_key=os.environ.get("ANTHROPIC_API_KEY"),\n)\n\nmessage = client.messages.create(\n    max_tokens=1024,\n    messages=[\n        {\n            "role": "user",\n            "content": "Tell me a joke about a dog",\n        }\n    ],\n    model="claude-3-opus-20240229",\n)\nprint(message.content)\n'})}),"\n",(0,a.jsx)(n.p,{children:"Weave will now track and log all LLM calls made through the Anthropic library. You can view the traces in the Weave web interface."}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{href:"https://wandb.ai/capecape/anthropic_project/weave/calls",children:(0,a.jsx)(n.img,{alt:"anthropic_trace.png",src:t(24393).Z+"",width:"3024",height:"1594"})})}),"\n",(0,a.jsx)(n.admonition,{type:"note",children:(0,a.jsxs)(n.p,{children:["We patch the anthropic ",(0,a.jsx)(n.code,{children:"Messages.create"})," method for you to keep track of your LLM calls."]})}),"\n",(0,a.jsx)(n.p,{children:"Weave will now track and log all LLM calls made through Anthropic. You can view the logs and insights in the Weave web interface."}),"\n",(0,a.jsx)(n.h2,{id:"wrapping-with-your-own-ops",children:"Wrapping with your own ops"}),"\n",(0,a.jsxs)(n.p,{children:["Weave ops make results ",(0,a.jsx)(n.em,{children:"reproducible"})," by automatically versioning code as you experiment, and they capture their inputs and outputs. Simply create a function decorated with ",(0,a.jsx)(n.a,{href:"https://wandb.github.io/weave/guides/tracking/ops",children:(0,a.jsx)(n.code,{children:"@weave.op()"})})," that calls into ",(0,a.jsx)(n.a,{href:"https://docs.anthropic.com/en/api/messages-examples",children:(0,a.jsx)(n.code,{children:"Anthropic.messages.create"})})," and Weave will track the inputs and outputs for you. Let's see how we can do this in nested example:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-python",children:'import weave\nimport os\nfrom anthropic import Anthropic\n\n# highlight-next-line\nweave.init("anthropic_project")\nclient = Anthropic(\n    api_key=os.environ.get("ANTHROPIC_API_KEY"),\n)\n\n# highlight-next-line\n@weave.op()\ndef call_anthropic(user_input:str, model:str) -> str:\n    message = client.messages.create(\n    max_tokens=1024,\n    messages=[\n        {\n            "role": "user",\n            "content": user_input,\n        }\n        ],\n        model=model,\n    )\n    return message.content[0].text\n\n# highlight-next-line\n@weave.op()\ndef generate_joke(topic: str) -> str:\n    return call_anthropic(f"Tell me a joke about {topic}", model="claude-3-haiku-20240307")\n\nprint(generate_joke("chickens"))\nprint(generate_joke("cars"))\n'})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{href:"https://wandb.github.io/weave/guides/tracking/ops",children:(0,a.jsx)(n.img,{alt:"anthropic_ops.png",src:t(47330).Z+"",width:"2682",height:"1282"})})}),"\n",(0,a.jsxs)(n.h2,{id:"create-a-model-for-easier-experimentation",children:["Create a ",(0,a.jsx)(n.code,{children:"Model"})," for easier experimentation"]}),"\n",(0,a.jsxs)(n.p,{children:["Organizing experimentation is difficult when there are many moving pieces. By using the ",(0,a.jsx)(n.a,{href:"/guides/core-types/models",children:(0,a.jsx)(n.code,{children:"Model"})})," class, you can capture and organize the experimental details of your app like your system prompt or the model you're using. This helps organize and compare different iterations of your app."]}),"\n",(0,a.jsxs)(n.p,{children:["In addition to versioning code and capturing inputs/outputs, ",(0,a.jsx)(n.a,{href:"/guides/core-types/models",children:(0,a.jsx)(n.code,{children:"Model"})}),"s capture structured parameters that control your application\u2019s behavior, making it easy to find what parameters worked best. You can also use Weave Models with ",(0,a.jsx)(n.code,{children:"serve"}),", and ",(0,a.jsx)(n.a,{href:"/guides/core-types/evaluations",children:(0,a.jsx)(n.code,{children:"Evaluation"})}),"s."]}),"\n",(0,a.jsxs)(n.p,{children:["In the example below, you can experiment with ",(0,a.jsx)(n.code,{children:"model"})," and ",(0,a.jsx)(n.code,{children:"temperature"}),". Every time you change one of these, you'll get a new ",(0,a.jsx)(n.em,{children:"version"})," of ",(0,a.jsx)(n.code,{children:"JokerModel"}),"."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-python",children:'import weave    \n# use the anthropic library as usual\nimport os\nfrom anthropic import Anthropic\nweave.init(\'joker-anthropic\')\n\nclass JokerModel(weave.Model): # Change to `weave.Model`\n  model: str\n  temperature: float\n  \n  @weave.op()\n  def predict(self, topic): # Change to `predict`\n    client = Anthropic()\n    message = client.messages.create(\n    max_tokens=1024,\n    messages=[\n        {\n            "role": "user",\n            "content": f"Tell me a joke about {topic}",\n        }\n        ],\n        model=self.model,\n        temperature=self.temperature\n    )\n    return message.content[0].text\n\n\njoker = JokerModel(\n    model="claude-3-haiku-20240307",\n    temperature = 0.1)\nresult = joker.predict("Chickens and Robots")\nprint(result)\n'})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{href:"https://wandb.ai/capecape/anthropic_project/weave/calls",children:(0,a.jsx)(n.img,{alt:"anthropic_model.png",src:t(41442).Z+"",width:"3008",height:"1464"})})}),"\n",(0,a.jsx)(n.h2,{id:"tools-function-calling",children:"Tools (function calling)"}),"\n",(0,a.jsxs)(n.p,{children:["Anthropic provides ",(0,a.jsx)(n.a,{href:"https://docs.anthropic.com/en/docs/tool-use",children:"tools"})," interface for calling functions. Weave will automatically track those functions calls."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-python",children:'message = client.messages.create(\n    max_tokens=1024,\n    messages=[\n        {\n            "role": "user",\n            "content": "What\'s the weather like in San Francisco?",\n        }\n    ],\n    tools=[\n        {\n            "name": "get_weather",\n            "description": "Get the current weather in a given location",\n            "input_schema": {\n                "type": "object",\n                "properties": {\n                    "location": {\n                        "type": "string",\n                        "description": "The city and state, e.g. San Francisco, CA",\n                    }\n                },\n                "required": ["location"],\n            },\n        },\n    ],\n    model=model,\n)\n\nprint(message)\n'})}),"\n",(0,a.jsx)(n.p,{children:"We automatically capture the tools you used on the prompt and keep them versioned."}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{href:"https://wandb.ai/capecape/anthropic_project/weave/calls",children:(0,a.jsx)(n.img,{alt:"anthropic_tool.png",src:t(76809).Z+"",width:"2628",height:"1218"})})})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},41442:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/images/anthropic_model-95f1c4bf26b62e57d3f3070e4d2c17a5.png"},47330:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/images/anthropic_ops-7a2fe04148355e7694ef372bc97ca924.png"},76809:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/images/anthropic_tool-dbfeac791940fac454d135b83e5808e5.png"},24393:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/images/anthropic_trace-e6ec5135135f63a21b403895e79adfcc.png"},11151:(e,n,t)=>{t.d(n,{Z:()=>s,a:()=>r});var a=t(67294);const i={},o=a.createContext(i);function r(e){const n=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),a.createElement(o.Provider,{value:n},e.children)}}}]);