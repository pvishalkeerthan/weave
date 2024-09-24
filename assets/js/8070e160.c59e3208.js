"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2651],{35768:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var a=n(85893),r=n(11151);const i={},o="Track LLM inputs & outputs",s={id:"quickstart",title:"Track LLM inputs & outputs",description:"Follow these steps to track your first call or",source:"@site/docs/quickstart.md",sourceDirName:".",slug:"/quickstart",permalink:"/quickstart",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/quickstart.md",tags:[],version:"current",lastUpdatedAt:1727194842e3,frontMatter:{},sidebar:"documentationSidebar",previous:{title:"Introduction",permalink:"/"},next:{title:"Trace Applications",permalink:"/tutorial-tracing_2"}},c={},l=[{value:"1. Install Weave and create an API Key",id:"1-install-weave-and-create-an-api-key",level:2},{value:"2. Log a trace to a new project",id:"2-log-a-trace-to-a-new-project",level:2},{value:"3. Automated LLM library logging",id:"3-automated-llm-library-logging",level:2},{value:"4. See traces of your application in your project",id:"4-see-traces-of-your-application-in-your-project",level:2},{value:"What&#39;s next?",id:"whats-next",level:2}];function d(e){const t={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"track-llm-inputs--outputs",children:"Track LLM inputs & outputs"}),"\n",(0,a.jsxs)(t.p,{children:["Follow these steps to track your first call or ",(0,a.jsx)("a",{class:"vertical-align-colab-button",target:"_blank",href:"http://wandb.me/weave_colab",children:(0,a.jsx)("img",{src:"https://colab.research.google.com/assets/colab-badge.svg",alt:"Open In Colab"})})]}),"\n",(0,a.jsx)(t.h2,{id:"1-install-weave-and-create-an-api-key",children:"1. Install Weave and create an API Key"}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:"Install weave"})}),"\n",(0,a.jsx)(t.p,{children:"First install the weave python library:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-python",children:"pip install weave\n"})}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:"Get your API key"})}),"\n",(0,a.jsxs)(t.p,{children:["Then, create a Weights & Biases (W&B) account here ",(0,a.jsx)(t.a,{href:"https://wandb.ai/site",children:"https://wandb.ai/site"})," and copy your API key from ",(0,a.jsx)(t.a,{href:"https://wandb.ai/authorize",children:"https://wandb.ai/authorize"})]}),"\n",(0,a.jsx)(t.h2,{id:"2-log-a-trace-to-a-new-project",children:"2. Log a trace to a new project"}),"\n",(0,a.jsx)(t.p,{children:"To get started with tracking your first project with Weave:"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:["Import the ",(0,a.jsx)(t.code,{children:"weave"})," library"]}),"\n",(0,a.jsxs)(t.li,{children:["Call ",(0,a.jsx)(t.code,{children:"weave.init('project-name')"})," to start tracking","\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:"You will be prompted to log in with your API key if you are not yet logged in on your machine."}),"\n",(0,a.jsxs)(t.li,{children:["To log to a specific W&B Team name, replace ",(0,a.jsx)(t.code,{children:"project-name"})," with ",(0,a.jsx)(t.code,{children:"team-name/project-name"})]}),"\n",(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:"NOTE:"})," In automated environments, you can define the environment variable ",(0,a.jsx)(t.code,{children:"WANDB_API_KEY"})," with your API key to login without prompting."]}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(t.li,{children:["Add the ",(0,a.jsx)(t.code,{children:"@weave.op()"})," decorator to the python functions you want to track"]}),"\n"]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsxs)(t.em,{children:["In this example, we're using openai so you will need to add an OpenAI ",(0,a.jsx)(t.a,{href:"https://platform.openai.com/docs/quickstart/step-2-setup-your-api-key",children:"API key"}),"."]})}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-python",children:'# highlight-next-line\nimport weave\nfrom openai import OpenAI\n\nclient = OpenAI(api_key="...")\n\n# Weave will track the inputs, outputs and code of this function\n# highlight-next-line\n@weave.op()\ndef extract_dinos(sentence: str) -> dict:\n    response = client.chat.completions.create(\n        model="gpt-4o",\n        messages=[\n            {\n                "role": "system",\n                "content": """In JSON format extract a list of `dinosaurs`, with their `name`, \ntheir `common_name`, and whether its `diet` is a herbivore or carnivore"""\n            },\n            {\n                "role": "user",\n                "content": sentence\n            }\n            ],\n            response_format={ "type": "json_object" }\n        )\n    return response.choices[0].message.content\n\n\n# Initialise the weave project\n# highlight-next-line\nweave.init(\'jurassic-park\')\n\nsentence = """I watched as a Tyrannosaurus rex (T. rex) chased after a Triceratops (Trike), \\\nboth carnivore and herbivore locked in an ancient dance. Meanwhile, a gentle giant \\\nBrachiosaurus (Brachi) calmly munched on treetops, blissfully unaware of the chaos below."""\n\nresult = extract_dinos(sentence)\nprint(result)\n'})}),"\n",(0,a.jsxs)(t.p,{children:["When you call the ",(0,a.jsx)(t.code,{children:"extract_dinos"})," function Weave will output a link to view your trace."]}),"\n",(0,a.jsx)(t.h2,{id:"3-automated-llm-library-logging",children:"3. Automated LLM library logging"}),"\n",(0,a.jsxs)(t.p,{children:["Calls made to OpenAI, Anthropic and ",(0,a.jsx)(t.a,{href:"guides/integrations/",children:"many more LLM libraries"})," are automatically tracked with Weave, with ",(0,a.jsx)(t.strong,{children:"LLM metadata"}),", ",(0,a.jsx)(t.strong,{children:"token usage"})," and ",(0,a.jsx)(t.strong,{children:"cost"})," being logged automatically. If your LLM library isn't currently one of our integrations you can track calls to other LLMs libraries or frameworks easily by wrapping them with ",(0,a.jsx)(t.code,{children:"@weave.op()"}),"."]}),"\n",(0,a.jsx)(t.h2,{id:"4-see-traces-of-your-application-in-your-project",children:"4. See traces of your application in your project"}),"\n",(0,a.jsx)(t.p,{children:"\ud83c\udf89 Congrats! Now, every time you call this function, weave will automatically capture the input & output data and log any changes made to the code."}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{alt:"Weave Trace Outputs 1",src:n(21407).Z+"",width:"1614",height:"1342"})}),"\n",(0,a.jsx)(t.h2,{id:"whats-next",children:"What's next?"}),"\n",(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsxs)(t.li,{children:["Follow the ",(0,a.jsx)(t.a,{href:"/tutorial-tracing_2",children:"Tracking flows and app metadata"})," to start tracking and the data flowing through your app."]}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},21407:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/tutorial_trace_1-f04f1e82c98bbaf572a60dca4f10d6c5.png"},11151:(e,t,n)=>{n.d(t,{Z:()=>s,a:()=>o});var a=n(67294);const r={},i=a.createContext(r);function o(e){const t=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),a.createElement(i.Provider,{value:t},e.children)}}}]);