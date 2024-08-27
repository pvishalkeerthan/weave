"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9625],{39209:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>l,frontMatter:()=>a,metadata:()=>i,toc:()=>h});var o=t(85893),r=t(11151);const a={},s="Cohere",i={id:"guides/integrations/cohere",title:"Cohere",description:"Weave automatically tracks and logs LLM calls made via the Cohere Python library after weave.init() is called.",source:"@site/docs/guides/integrations/cohere.md",sourceDirName:"guides/integrations",slug:"/guides/integrations/cohere",permalink:"/guides/integrations/cohere",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/guides/integrations/cohere.md",tags:[],version:"current",frontMatter:{},sidebar:"documentationSidebar",previous:{title:"Cerebras",permalink:"/guides/integrations/cerebras"},next:{title:"MistralAI",permalink:"/guides/integrations/mistral"}},c={},h=[{value:"Traces",id:"traces",level:2},{value:"Wrapping with your own ops",id:"wrapping-with-your-own-ops",level:2},{value:"Create a <code>Model</code> for easier experimentation",id:"create-a-model-for-easier-experimentation",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",img:"img",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"cohere",children:"Cohere"}),"\n",(0,o.jsxs)(n.p,{children:["Weave automatically tracks and logs LLM calls made via the ",(0,o.jsx)(n.a,{href:"https://github.com/cohere-ai/cohere-python",children:"Cohere Python library"})," after ",(0,o.jsx)(n.code,{children:"weave.init()"})," is called."]}),"\n",(0,o.jsx)(n.h2,{id:"traces",children:"Traces"}),"\n",(0,o.jsx)(n.p,{children:"It's important to store traces of LLM applications in a central database, both during development and in production. You'll use these traces for debugging, and as a dataset that will help you improve your application."}),"\n",(0,o.jsxs)(n.p,{children:["Weave will automatically capture traces for ",(0,o.jsx)(n.a,{href:"https://github.com/cohere-ai/cohere-python",children:"cohere-python"}),". You can use the library as usual, start by calling ",(0,o.jsx)(n.code,{children:"weave.init()"}),":"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:'import cohere\nimport os\nimport weave\nfrom weave.integrations.cohere import cohere_patcher\n\n# we need to patch before we create the client\ncohere_patcher.attempt_patch()\n\n# Use the Cohere library as usual\nco = cohere.Client(api_key=os.environ["COHERE_API_KEY"])\n\n# highlight-next-line\nweave.init("cohere_project")\n\n\nresponse = co.chat(\n    message="How is the weather in Boston?",\n    # perform web search before answering the question. You can also use your own custom connector.\n    connectors=[{"id": "web-search"}],\n)\nprint(response.text)\n'})}),"\n",(0,o.jsxs)(n.p,{children:["A powerful feature of cohere models is using ",(0,o.jsx)(n.a,{href:"https://docs.cohere.com/docs/overview-rag-connectors#using-connectors-to-create-grounded-generations",children:"connectors"})," enabling you to make requests to other API on the endpoint side. The response will then contain the generated text with citation elements that link to the documents returned from the connector."]}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.a,{href:"https://wandb.ai/capecape/cohere_dev/weave/calls",children:(0,o.jsx)(n.img,{alt:"cohere_trace.png",src:t(74029).Z+"",width:"2156",height:"1174"})})}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsxs)(n.p,{children:["We patch the Cohere ",(0,o.jsx)(n.code,{children:"Client.chat"}),", ",(0,o.jsx)(n.code,{children:"AsyncClient.chat"}),", ",(0,o.jsx)(n.code,{children:"Client.chat_stream"}),", and ",(0,o.jsx)(n.code,{children:"AsyncClient.chat_stream"})," methods for you to keep track of your LLM calls."]})}),"\n",(0,o.jsx)(n.h2,{id:"wrapping-with-your-own-ops",children:"Wrapping with your own ops"}),"\n",(0,o.jsxs)(n.p,{children:["Weave ops make results ",(0,o.jsx)(n.em,{children:"reproducible"})," by automatically versioning code as you experiment, and they capture their inputs and outputs. Simply create a function decorated with ",(0,o.jsx)(n.a,{href:"/guides/tracking/ops",children:(0,o.jsx)(n.code,{children:"@weave.op()"})})," that calls into Cohere's chat methods, and Weave will track the inputs and outputs for you. Here's an example:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:'import cohere\nimport os\nimport weave\nfrom weave.integrations.cohere import cohere_patcher\n\n# we need to patch before we create the client\ncohere_patcher.attempt_patch()\n\nco = cohere.Client(api_key=os.environ["COHERE_API_KEY"])\n\nweave.init("cohere_project")\n\n\n# highlight-next-line\n@weave.op()\ndef weather(location: str, model: str) -> str:\n    response = co.chat(\n        model=model,\n        message=f"How is the weather in {location}?",\n        # perform web search before answering the question. You can also use your own custom connector.\n        connectors=[{"id": "web-search"}],\n    )\n    return response.text\n\n\nprint(weather("Boston", "command"))\n'})}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.a,{href:"https://wandb.ai/capecape/cohere_dev/weave/calls",children:(0,o.jsx)(n.img,{alt:"cohere_ops.png",src:t(17568).Z+"",width:"2170",height:"844"})})}),"\n",(0,o.jsxs)(n.h2,{id:"create-a-model-for-easier-experimentation",children:["Create a ",(0,o.jsx)(n.code,{children:"Model"})," for easier experimentation"]}),"\n",(0,o.jsxs)(n.p,{children:["Organizing experimentation is difficult when there are many moving pieces. By using the ",(0,o.jsx)(n.a,{href:"/guides/core-types/models",children:(0,o.jsx)(n.code,{children:"Model"})})," class, you can capture and organize the experimental details of your app like your system prompt or the model you're using. This helps organize and compare different iterations of your app."]}),"\n",(0,o.jsxs)(n.p,{children:["In addition to versioning code and capturing inputs/outputs, ",(0,o.jsx)(n.a,{href:"/guides/core-types/models",children:(0,o.jsx)(n.code,{children:"Model"})}),"s capture structured parameters that control your application's behavior, making it easy to find what parameters worked best. You can also use Weave Models with ",(0,o.jsx)(n.code,{children:"serve"}),", and ",(0,o.jsx)(n.a,{href:"/guides/core-types/evaluations",children:(0,o.jsx)(n.code,{children:"Evaluation"})}),"s."]}),"\n",(0,o.jsxs)(n.p,{children:["In the example below, you can experiment with ",(0,o.jsx)(n.code,{children:"model"})," and ",(0,o.jsx)(n.code,{children:"temperature"}),". Every time you change one of these, you'll get a new ",(0,o.jsx)(n.em,{children:"version"})," of ",(0,o.jsx)(n.code,{children:"WeatherModel"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:'import weave\nimport cohere\nimport os\n# we need to patch before we create the client\ncohere_patcher.attempt_patch()\n\nweave.init(\'weather-cohere\')\n\nclass WeatherModel(weave.Model):\n    model: str\n    temperature: float\n  \n    @weave.op()\n    def predict(self, location: str) -> str:\n        co = cohere.Client(api_key=os.environ["COHERE_API_KEY"])\n        response = co.chat(\n            message=f"How is the weather in {location}?",\n            model=self.model,\n            temperature=self.temperature,\n            connectors=[{"id": "web-search"}]\n        )\n        return response.text\n\nweather_model = WeatherModel(\n    model="command",\n    temperature=0.7\n)\nresult = weather_model.predict("Boston")\nprint(result)\n'})}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.a,{href:"https://wandb.ai/capecape/cohere_dev/weave/models",children:(0,o.jsx)(n.img,{alt:"cohere_model.png",src:t(45183).Z+"",width:"2906",height:"994"})})})]})}function l(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},45183:(e,n,t)=>{t.d(n,{Z:()=>o});const o=t.p+"assets/images/cohere_model-6ab7485ac70b624f7bbc5e1b9e83d439.png"},17568:(e,n,t)=>{t.d(n,{Z:()=>o});const o=t.p+"assets/images/cohere_ops-cb40be1ef29872fdd341fcbfcd6993b0.png"},74029:(e,n,t)=>{t.d(n,{Z:()=>o});const o=t.p+"assets/images/cohere_trace-0b390f5c24a42a6a398b302b25f0273a.png"},11151:(e,n,t)=>{t.d(n,{Z:()=>i,a:()=>s});var o=t(67294);const r={},a=o.createContext(r);function s(e){const n=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),o.createElement(a.Provider,{value:n},e.children)}}}]);