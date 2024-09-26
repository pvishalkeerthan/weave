"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7992],{35833:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var o=t(85893),r=t(11151);const i={},s="Open Router",a={id:"guides/integrations/openrouter",title:"Open Router",description:"Openrouter.ai is a unified interface for many LLMs, supporting both foundational models like OpenAI GPT-4, Anthropic Claude, Google Gemini but also open source models like LLama-3, Mixtral and many more, some models are even offered for free.",source:"@site/docs/guides/integrations/openrouter.md",sourceDirName:"guides/integrations",slug:"/guides/integrations/openrouter",permalink:"/guides/integrations/openrouter",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/guides/integrations/openrouter.md",tags:[],version:"current",lastUpdatedAt:172731962e4,frontMatter:{},sidebar:"documentationSidebar",previous:{title:"Groq",permalink:"/guides/integrations/groq"},next:{title:"LiteLLM",permalink:"/guides/integrations/litellm"}},l={},c=[];function p(e){const n={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"open-router",children:"Open Router"}),"\n",(0,o.jsxs)(n.p,{children:["Openrouter.ai is a unified interface for many LLMs, supporting both foundational models like OpenAI GPT-4, Anthropic Claude, Google Gemini but also open source models like LLama-3, Mixtral and ",(0,o.jsx)(n.a,{href:"https://openrouter.ai/models",children:"many more"}),", some models are even offered for free."]}),"\n",(0,o.jsxs)(n.p,{children:["Open Router offers a Rest API and an OpenAI SDK compatibility (",(0,o.jsx)(n.a,{href:"https://docs.together.ai/docs/openai-api-compatibility",children:"docs"}),") which Weave automatically detects and integrates with (see Open Router ",(0,o.jsx)(n.a,{href:"https://openrouter.ai/docs/quick-start",children:"quick start"})," for more details)."]}),"\n",(0,o.jsxs)(n.p,{children:["To get switch your OpenAI SDK code to Open Router, simply switch out the API key to your ",(0,o.jsx)(n.a,{href:"https://openrouter.ai/docs/api-keys",children:"Open Router API"})," key, ",(0,o.jsx)(n.code,{children:"base_url"})," to ",(0,o.jsx)(n.code,{children:"https://openrouter.ai/api/v1"}),", and model to one of their many ",(0,o.jsx)(n.a,{href:"https://openrouter.ai/docs/models",children:"chat models"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:'import os\nimport openai\nimport weave\n\n# highlight-next-line\nweave.init(\'together-weave\')\n\nsystem_content = "You are a travel agent. Be descriptive and helpful."\nuser_content = "Tell me about San Francisco"\n\n# highlight-next-line\nclient = openai.OpenAI(\n# highlight-next-line\n    api_key=os.environ.get("OPENROUTER_API_KEY"),\n# highlight-next-line\n    base_url="https://openrouter.ai/api/v1",\n# highlight-next-line\n)\nchat_completion = client.chat.completions.create(\n    extra_headers={\n    "HTTP-Referer": $YOUR_SITE_URL, # Optional, for including your app on openrouter.ai rankings.\n    "X-Title": $YOUR_APP_NAME, # Optional. Shows in rankings on openrouter.ai.\n    },\n    model="meta-llama/llama-3.1-8b-instruct:free",\n    messages=[\n        {"role": "system", "content": system_content},\n        {"role": "user", "content": user_content},\n    ],\n    temperature=0.7,\n    max_tokens=1024,\n)\nresponse = chat_completion.choices[0].message.content\nprint("Model response:\\n", response)\n'})}),"\n",(0,o.jsxs)(n.p,{children:["While this is a simple example to get started, see our ",(0,o.jsx)(n.a,{href:"/guides/integrations/openai#track-your-own-ops",children:"OpenAI"})," guide for more details on how to integrate Weave with your own functions for more complex use cases."]})]})}function d(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>s});var o=t(67294);const r={},i=o.createContext(r);function s(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);