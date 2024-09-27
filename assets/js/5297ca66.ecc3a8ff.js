"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4726],{98183:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>d});var r=t(85893),a=t(11151);const o={},i="Groq",s={id:"guides/integrations/groq",title:"Groq",description:"Groq is the AI infrastructure company that delivers fast AI inference. The LPU\u2122 Inference Engine by Groq is a hardware and software platform that delivers exceptional compute speed, quality, and energy efficiency. Weave automatically tracks and logs calls made using Groq chat completion calls.",source:"@site/docs/guides/integrations/groq.md",sourceDirName:"guides/integrations",slug:"/guides/integrations/groq",permalink:"/guides/integrations/groq",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/guides/integrations/groq.md",tags:[],version:"current",lastUpdatedAt:1727449268e3,frontMatter:{},sidebar:"documentationSidebar",previous:{title:"Together AI",permalink:"/guides/integrations/together_ai"},next:{title:"Open Router",permalink:"/guides/integrations/openrouter"}},c={},d=[{value:"Tracing",id:"tracing",level:2},{value:"Track your own ops",id:"track-your-own-ops",level:2},{value:"Create a <code>Model</code> for easier experimentation",id:"create-a-model-for-easier-experimentation",level:2},{value:"Serving a Weave Model",id:"serving-a-weave-model",level:3}];function l(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",img:"img",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,a.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"groq",children:"Groq"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"https://groq.com/",children:"Groq"})," is the AI infrastructure company that delivers fast AI inference. The LPU\u2122 Inference Engine by Groq is a hardware and software platform that delivers exceptional compute speed, quality, and energy efficiency. Weave automatically tracks and logs calls made using Groq chat completion calls."]}),"\n",(0,r.jsx)(n.h2,{id:"tracing",children:"Tracing"}),"\n",(0,r.jsx)(n.p,{children:"It\u2019s important to store traces of language model applications in a central location, both during development and in production. These traces can be useful for debugging, and as a dataset that will help you improve your application."}),"\n",(0,r.jsxs)(n.p,{children:["Weave will automatically capture traces for ",(0,r.jsx)(n.a,{href:"https://groq.com/",children:"Groq"}),". To start tracking, calling ",(0,r.jsx)(n.code,{children:'weave.init(project_name="<YOUR-WANDB-PROJECT-NAME>")'})," and use the library as normal."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'import os\nimport weave\nfrom groq import Groq\n\nweave.init(project_name="groq-project")\n\nclient = Groq(\n    api_key=os.environ.get("GROQ_API_KEY"),\n)\nchat_completion = client.chat.completions.create(\n    messages=[\n        {\n            "role": "user",\n            "content": "Explain the importance of fast language models",\n        }\n    ],\n    model="llama3-8b-8192",\n)\n'})}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsx)(n.tr,{children:(0,r.jsx)(n.th,{children:(0,r.jsx)(n.img,{src:t(65241).Z+"",width:"2880",height:"1800"})})})}),(0,r.jsx)(n.tbody,{children:(0,r.jsx)(n.tr,{children:(0,r.jsx)(n.td,{children:"Weave will now track and log all LLM calls made through the Groq library. You can view the traces in the Weave web interface."})})})]}),"\n",(0,r.jsx)(n.h2,{id:"track-your-own-ops",children:"Track your own ops"}),"\n",(0,r.jsxs)(n.p,{children:["Wrapping a function with ",(0,r.jsx)(n.code,{children:"@weave.op"})," starts capturing inputs, outputs and app logic so you can debug how data flows through your app. You can deeply nest ops and build a tree of functions that you want to track. This also starts automatically versioning code as you experiment to capture ad-hoc details that haven't been committed to git."]}),"\n",(0,r.jsxs)(n.p,{children:["Simply create a function decorated with ",(0,r.jsx)(n.a,{href:"/guides/tracking/ops",children:(0,r.jsx)(n.code,{children:"@weave.op"})}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["In the example below, we have the function ",(0,r.jsx)(n.code,{children:"recommend_places_to_visit"})," which is a function wrapped with ",(0,r.jsx)(n.code,{children:"@weave.op"})," that recommends places to visit in a city."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'import os\nimport weave\nfrom groq import Groq\n\n\nweave.init(project_name="groq-test")\n\nclient = Groq(\n    api_key=os.environ.get("GROQ_API_KEY"),\n)\n\n@weave.op()\ndef recommend_places_to_visit(city: str, model: str="llama3-8b-8192"):\n    chat_completion = client.chat.completions.create(\n        messages=[\n            {\n                "role": "system",\n                "content": "You are a helpful assistant meant to suggest places to visit in a city",\n            },\n            {\n                "role": "user",\n                "content": city,\n            }\n        ],\n        model="llama3-8b-8192",\n    )\n    return chat_completion.choices[0].message.content\n\n\nrecommend_places_to_visit("New York")\nrecommend_places_to_visit("Paris")\nrecommend_places_to_visit("Kolkata")\n'})}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsx)(n.tr,{children:(0,r.jsx)(n.th,{children:(0,r.jsx)(n.img,{src:t(45461).Z+"",width:"2880",height:"1800"})})})}),(0,r.jsx)(n.tbody,{children:(0,r.jsx)(n.tr,{children:(0,r.jsxs)(n.td,{children:["Decorating the ",(0,r.jsx)(n.code,{children:"recommend_places_to_visit"})," function with ",(0,r.jsx)(n.code,{children:"@weave.op"})," traces its inputs, outputs, and all internal LM calls made inside the function."]})})})]}),"\n",(0,r.jsxs)(n.h2,{id:"create-a-model-for-easier-experimentation",children:["Create a ",(0,r.jsx)(n.code,{children:"Model"})," for easier experimentation"]}),"\n",(0,r.jsxs)(n.p,{children:["Organizing experimentation is difficult when there are many moving pieces. By using the ",(0,r.jsx)(n.a,{href:"../core-types/models",children:(0,r.jsx)(n.code,{children:"Model"})})," class, you can capture and organize the experimental details of your app like your system prompt or the model you're using. This helps organize and compare different iterations of your app."]}),"\n",(0,r.jsxs)(n.p,{children:["In addition to versioning code and capturing inputs/outputs, ",(0,r.jsx)(n.a,{href:"../core-types/models",children:(0,r.jsx)(n.code,{children:"Model"})}),"s capture structured parameters that control your application\u2019s behavior, making it easy to find what parameters worked best. You can also use Weave Models with ",(0,r.jsx)(n.code,{children:"serve"}),", and ",(0,r.jsx)(n.a,{href:"/guides/core-types/evaluations",children:(0,r.jsx)(n.code,{children:"Evaluation"})}),"s."]}),"\n",(0,r.jsxs)(n.p,{children:["In the example below, you can experiment with ",(0,r.jsx)(n.code,{children:"WeaveModel"}),". Every time you change one of these, you'll get a new ",(0,r.jsx)(n.em,{children:"version"})," of ",(0,r.jsx)(n.code,{children:"WeaveModel"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:'import os\nfrom groq import Groq\nimport weave\n\n\nclass GroqCityVisitRecommender(weave.Model):\n    model: str\n    groq_client: Groq\n\n    @weave.op()\n    def predict(self, city: str) -> str:\n        system_message = {\n            "role": "system",\n            "content": """\nYou are a helpful assistant meant to suggest places to visit in a city\n""",\n        }\n        user_message = {"role": "user", "content": city}\n        chat_completion = self.groq_client.chat.completions.create(\n            messages=[system_message, user_message],\n            model=self.model,\n        )\n        return chat_completion.choices[0].message.content\n\n\nweave.init(project_name="groq-test")\ncity_recommender = GroqCityVisitRecommender(\n    model="llama3-8b-8192", groq_client=Groq(api_key=os.environ.get("GROQ_API_KEY"))\n)\nprint(city_recommender.predict("New York"))\nprint(city_recommender.predict("San Francisco"))\nprint(city_recommender.predict("Los Angeles"))\n'})}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsx)(n.tr,{children:(0,r.jsx)(n.th,{children:(0,r.jsx)(n.img,{src:t(7211).Z+"",width:"2880",height:"1800"})})})}),(0,r.jsx)(n.tbody,{children:(0,r.jsx)(n.tr,{children:(0,r.jsxs)(n.td,{children:["Tracing and versioning your calls using a ",(0,r.jsx)(n.a,{href:"../core-types/models",children:(0,r.jsx)(n.code,{children:"Model"})})]})})})]}),"\n",(0,r.jsx)(n.h3,{id:"serving-a-weave-model",children:"Serving a Weave Model"}),"\n",(0,r.jsxs)(n.p,{children:["Given a weave reference any WeaveModel object, you can spin up a fastapi server and ",(0,r.jsx)(n.a,{href:"https://wandb.github.io/weave/guides/tools/serve",children:"serve"})," it."]}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsx)(n.tr,{children:(0,r.jsx)(n.th,{children:(0,r.jsx)(n.a,{href:"https://wandb.ai/geekyrakshit/groq-test/weave/objects/GroqCityVisitRecommender/versions/6O1xPTJ9yFx8uuCjJAlI7KgcVYxXKn7JxfmVD9AQT5Q",children:(0,r.jsx)(n.img,{alt:"dspy_weave_model_serve.png",src:t(83648).Z+"",width:"2880",height:"1800"})})})})}),(0,r.jsx)(n.tbody,{children:(0,r.jsx)(n.tr,{children:(0,r.jsx)(n.td,{children:"You can find the weave reference of any WeaveModel by navigating to the model and copying it from the UI."})})})]}),"\n",(0,r.jsx)(n.p,{children:"You can serve your model by using the following command in the terminal:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"weave serve weave:///your_entity/project-name/YourModel:<hash>\n"})})]})}function h(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},65241:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"assets/images/groq_weave_dasboard-065803671602c45dcc469f2ead27d5d0.png"},7211:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"assets/images/groq_weave_model-708a9ec3d8eecb3e4de8a46659f9e353.png"},83648:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"assets/images/groq_weave_model_version-1a6779fdfaa82ba0538a8cae398a0c3d.png"},45461:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"assets/images/groq_weave_tracing-e4eee11098d49a0c2b0ce369f5017e99.png"},11151:(e,n,t)=>{t.d(n,{Z:()=>s,a:()=>i});var r=t(67294);const a={},o=r.createContext(a);function i(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);