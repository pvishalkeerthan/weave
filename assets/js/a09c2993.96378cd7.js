"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4128],{58152:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>t,metadata:()=>o,toc:()=>c});var s=i(85893),r=i(11151);const t={slug:"/"},a="Introduction",o={id:"introduction",title:"Introduction",description:"Weave is a lightweight toolkit for tracking and evaluating LLM applications, built by Weights & Biases.",source:"@site/docs/introduction.md",sourceDirName:".",slug:"/",permalink:"/",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/introduction.md",tags:[],version:"current",frontMatter:{slug:"/"},sidebar:"documentationSidebar",next:{title:"Trace LLMs",permalink:"/quickstart"}},l={},c=[{value:"Key concepts",id:"key-concepts",level:2},{value:"What&#39;s next?",id:"whats-next",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"introduction",children:"Introduction"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Weave"})," is a lightweight toolkit for tracking and evaluating LLM applications, built by Weights & Biases."]}),"\n",(0,s.jsx)(n.p,{children:"Our goal is to bring rigor, best-practices, and composability to the inherently experimental process of developing AI applications, without introducing cognitive overhead."}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/quickstart",children:"Get started"})})," by decorating Python functions with ",(0,s.jsx)(n.code,{children:"@weave.op()"}),"."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{alt:"Weave Hero",src:i(59832).Z+"",width:"1073",height:"507"})}),"\n",(0,s.jsxs)(n.p,{children:["Seriously, try the \ud83c\udf6a ",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/quickstart",children:"quickstart"})})," \ud83c\udf6a or ",(0,s.jsx)("a",{class:"vertical-align-colab-button",target:"\\_blank",href:"http://wandb.me/weave_colab",onClick:()=>{window.analytics?.track("Weave Docs: Quickstart colab clicked")},children:(0,s.jsx)("img",{src:"https://colab.research.google.com/assets/colab-badge.svg",alt:"Open In Colab"})})]}),"\n",(0,s.jsx)(n.p,{children:"You can use Weave to:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Log and debug language model inputs, outputs, and traces"}),"\n",(0,s.jsx)(n.li,{children:"Build rigorous, apples-to-apples evaluations for language model use cases"}),"\n",(0,s.jsx)(n.li,{children:"Organize all the information generated across the LLM workflow, from experimentation to evaluations to production"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"key-concepts",children:"Key concepts"}),"\n",(0,s.jsxs)(n.p,{children:["Weave's ",(0,s.jsx)(n.strong,{children:"core types"})," layer contains everything you need for organizing Generative AI projects, with built-in lineage, tracking, and reproducibility."]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/core-types/datasets",children:"Datasets"})}),": Version, store, and share rich tabular data."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/core-types/models",children:"Models"})}),": Version, store, and share parameterized functions."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/core-types/evaluations",children:"Evaluations"})}),": Test suites for AI models."]}),"\n",(0,s.jsx)(n.li,{children:"[soon] Agents: ..."}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Weave's ",(0,s.jsx)(n.strong,{children:"tracking"})," layer brings immutable tracing and versioning to your programs and experiments."]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/tracking/objects",children:"Objects"})}),": Weave's extensible serialization lets you easily version, track, and share Python objects."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/tracking/ops",children:"Ops"})}),": Versioned, reproducible functions, with automatic tracing."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/tracking/tracing",children:"Tracing"})}),": Automatic organization of function calls and data lineage."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/tracking/feedback",children:"Feedback"})}),": Simple utilities to capture user feedback and attach them to the underlying tracked call."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Weave offers ",(0,s.jsx)(n.strong,{children:"integrations"})," with many language model APIs and LLM frameworks to streamline tracking and evaluation:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/integrations/openai",children:"OpenAI"})}),": automatic tracking for openai api calls"]}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/integrations/anthropic",children:"Anthropic"})})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/integrations/cohere",children:"Cohere"})})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/integrations/mistral",children:"MistralAI"})})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/integrations/langchain",children:"LangChain"})})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/integrations/llamaindex",children:"LlamaIndex"})})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/integrations/dspy",children:"DSPy"})})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/integrations/google-gemini",children:"Google Gemini"})})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/integrations/together_ai",children:"Together AI"})})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/integrations/openrouter",children:"Open Router"})})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/integrations/local_models",children:"Local Models"})})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/integrations/litellm",children:"LiteLLM"})})}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Weave's ",(0,s.jsx)(n.strong,{children:"tools"})," layer contains utilities for making use of Weave objects."]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/tools/serve",children:"Serve"})}),": FastAPI server for Weave Ops and Models"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.a,{href:"/guides/tools/deploy",children:"Deploy"})}),": Deploy Weave Ops and Models to various targets"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"whats-next",children:"What's next?"}),"\n",(0,s.jsxs)(n.p,{children:["Try the ",(0,s.jsx)(n.a,{href:"/quickstart",children:"Quickstart"})," to see Weave in action."]})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},59832:(e,n,i)=>{i.d(n,{Z:()=>s});const s=i.p+"assets/images/weave-hero-188bbbbfcac1809f2529c62110d1553a.png"},11151:(e,n,i)=>{i.d(n,{Z:()=>o,a:()=>a});var s=i(67294);const r={},t=s.createContext(r);function a(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);