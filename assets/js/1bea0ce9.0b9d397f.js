"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4110],{15063:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>s,contentTitle:()=>o,default:()=>h,frontMatter:()=>l,metadata:()=>r,toc:()=>c});var i=a(85893),t=a(11151);const l={},o="LangChain",r={id:"guides/integrations/langchain",title:"LangChain",description:"Weave is designed to make tracking and logging all calls made through the LangChain Python library effortless.",source:"@site/docs/guides/integrations/langchain.md",sourceDirName:"guides/integrations",slug:"/guides/integrations/langchain",permalink:"/guides/integrations/langchain",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/guides/integrations/langchain.md",tags:[],version:"current",lastUpdatedAt:1727449268e3,frontMatter:{},sidebar:"documentationSidebar",previous:{title:"Local Models",permalink:"/guides/integrations/local_models"},next:{title:"LlamaIndex",permalink:"/guides/integrations/llamaindex"}},s={},c=[{value:"Getting Started",id:"getting-started",level:2},{value:"Traces",id:"traces",level:2},{value:"Manually Tracing Calls",id:"manually-tracing-calls",level:2},{value:"Using <code>WeaveTracer</code>",id:"using-weavetracer",level:3},{value:"Using <code>weave_tracing_enabled</code> Context Manager",id:"using-weave_tracing_enabled-context-manager",level:3},{value:"Configuration",id:"configuration",level:2},{value:"Relation to LangChain Callbacks",id:"relation-to-langchain-callbacks",level:2},{value:"Auto Logging",id:"auto-logging",level:3},{value:"Manual Logging",id:"manual-logging",level:3},{value:"Models and Evaluations",id:"models-and-evaluations",level:2},{value:"Evaluations",id:"evaluations",level:3},{value:"Known Issues",id:"known-issues",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"langchain",children:"LangChain"}),"\n",(0,i.jsxs)(n.p,{children:["Weave is designed to make tracking and logging all calls made through the ",(0,i.jsx)(n.a,{href:"https://github.com/langchain-ai/langchain",children:"LangChain Python library"})," effortless."]}),"\n",(0,i.jsx)(n.p,{children:"When working with LLMs, debugging is inevitable. Whether a model call fails, an output is misformatted, or nested model calls create confusion, pinpointing issues can be challenging. LangChain applications often consist of multiple steps and LLM call invocations, making it crucial to understand the inner workings of your chains and agents."}),"\n",(0,i.jsxs)(n.p,{children:["Weave simplifies this process by automatically capturing traces for your ",(0,i.jsx)(n.a,{href:"https://python.langchain.com/v0.2/docs/introduction/",children:"LangChain"})," applications. This enables you to monitor and analyze your application's performance, making it easier to debug and optimize your LLM workflows."]}),"\n",(0,i.jsx)(n.h2,{id:"getting-started",children:"Getting Started"}),"\n",(0,i.jsxs)(n.p,{children:["To get started, simply call ",(0,i.jsx)(n.code,{children:"weave.init()"})," at the beginning of your script. The argument in weave.init() is a project name that will help you organize your traces."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'import weave\nfrom langchain_core.prompts import PromptTemplate\nfrom langchain_openai import ChatOpenAI\n\n# Initialize Weave with your project name\n# highlight-next-line\nweave.init("langchain_demo")\n\nllm = ChatOpenAI()\nprompt = PromptTemplate.from_template("1 + {number} = ")\n\nllm_chain = prompt | llm\n\noutput = llm_chain.invoke({"number": 2})\n\nprint(output)\n'})}),"\n",(0,i.jsx)(n.h2,{id:"traces",children:"Traces"}),"\n",(0,i.jsx)(n.p,{children:"Storing traces of LLM applications in a central database is crucial during both development and production. These traces are essential for debugging and improving your application by providing a valuable dataset."}),"\n",(0,i.jsx)(n.p,{children:"Weave automatically captures traces for your LangChain applications. It will track and log all calls made through the LangChain library, including prompt templates, chains, LLM calls, tools, and agent steps. You can view the traces in the Weave web interface."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://wandb.ai/parambharat/langchain_demo/weave/calls",children:(0,i.jsx)(n.img,{alt:"langchain_trace.png",src:a(61883).Z+"",width:"1918",height:"608"})})}),"\n",(0,i.jsx)(n.h2,{id:"manually-tracing-calls",children:"Manually Tracing Calls"}),"\n",(0,i.jsxs)(n.p,{children:["In addition to automatic tracing, you can manually trace calls using the ",(0,i.jsx)(n.code,{children:"WeaveTracer"})," callback or the ",(0,i.jsx)(n.code,{children:"weave_tracing_enabled"})," context manager. These methods are akin to using request callbacks in individual parts of a LangChain application."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Note:"})," Weave traces Langchain Runnables by default and this is enabled when you call ",(0,i.jsx)(n.code,{children:"weave.init()"}),". You can disable this behaviour by setting the environment variable ",(0,i.jsx)(n.code,{children:"WEAVE_TRACE_LANGCHAIN"})," to ",(0,i.jsx)(n.code,{children:'"false"'})," before calling ",(0,i.jsx)(n.code,{children:"weave.init()"}),". This allows you to control the tracing behaviour of specific chains or even individual requests in your application."]}),"\n",(0,i.jsxs)(n.h3,{id:"using-weavetracer",children:["Using ",(0,i.jsx)(n.code,{children:"WeaveTracer"})]}),"\n",(0,i.jsxs)(n.p,{children:["You can pass the ",(0,i.jsx)(n.code,{children:"WeaveTracer"})," callback to individual LangChain components to trace specific requests."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'import os\n\nos.environ["WEAVE_TRACE_LANGCHAIN"] = "false" # <- explicitly disable global tracing.\n\nfrom weave.integrations.langchain import WeaveTracer\nfrom langchain_core.prompts import PromptTemplate\nfrom langchain_openai import ChatOpenAI\nimport weave\n\n# Initialize Weave with your project name\n# highlight-next-line\nweave.init("langchain_demo")  # <-- we don\'t enable tracing here because the env var is explicitly set to `false`\n\n# highlight-next-line\nweave_tracer = WeaveTracer()\n\n# highlight-next-line\nconfig = {"callbacks": [weave_tracer]}\n\nllm = ChatOpenAI()\nprompt = PromptTemplate.from_template("1 + {number} = ")\n\nllm_chain = prompt | llm\n\n# highlight-next-line\noutput = llm_chain.invoke({"number": 2}, config=config) # <-- this enables tracing only for this chain invoke.\n\nllm_chain.invoke({"number": 4})  # <-- this will not have tracing enabled for langchain calls but openai calls will still be traced\n'})}),"\n",(0,i.jsxs)(n.h3,{id:"using-weave_tracing_enabled-context-manager",children:["Using ",(0,i.jsx)(n.code,{children:"weave_tracing_enabled"})," Context Manager"]}),"\n",(0,i.jsxs)(n.p,{children:["Alternatively, you can use the ",(0,i.jsx)(n.code,{children:"weave_tracing_enabled"})," context manager to enable tracing for specific blocks of code."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'import os\n\nos.environ["WEAVE_TRACE_LANGCHAIN"] = "false" # <- explicitly disable global tracing.\n\nfrom weave.integrations.langchain import weave_tracing_enabled\nfrom langchain_core.prompts import PromptTemplate\nfrom langchain_openai import ChatOpenAI\nimport weave\n\n# Initialize Weave with your project name\n# highlight-next-line\nweave.init("langchain_demo")  # <-- we don\'t enable tracing here because the env var is explicitly set to `false`\n\nllm = ChatOpenAI()\nprompt = PromptTemplate.from_template("1 + {number} = ")\n\nllm_chain = prompt | llm\n\n# highlight-next-line\nwith weave_tracing_enabled():  # <-- this enables tracing only for this chain invoke.\n    output = llm_chain.invoke({"number": 2})\n\n\nllm_chain.invoke({"number": 4})  # <-- this will not have tracing enabled for langchain calls but openai calls will still be traced\n'})}),"\n",(0,i.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,i.jsxs)(n.p,{children:["Upon calling ",(0,i.jsx)(n.code,{children:"weave.init"}),", tracing is enabled by setting the environment variable ",(0,i.jsx)(n.code,{children:"WEAVE_TRACE_LANGCHAIN"})," to ",(0,i.jsx)(n.code,{children:'"true"'}),". This allows Weave to automatically capture traces for your LangChain applications. If you wish to disable this behavior, set the environment variable to ",(0,i.jsx)(n.code,{children:'"false"'}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"relation-to-langchain-callbacks",children:"Relation to LangChain Callbacks"}),"\n",(0,i.jsx)(n.h3,{id:"auto-logging",children:"Auto Logging"}),"\n",(0,i.jsxs)(n.p,{children:["The automatic logging provided by ",(0,i.jsx)(n.code,{children:"weave.init()"})," is similar to passing a constructor callback to every component in a LangChain application. This means that all interactions, including prompt templates, chains, LLM calls, tools, and agent steps, are tracked globally across your entire application."]}),"\n",(0,i.jsx)(n.h3,{id:"manual-logging",children:"Manual Logging"}),"\n",(0,i.jsxs)(n.p,{children:["The manual logging methods (",(0,i.jsx)(n.code,{children:"WeaveTracer"})," and ",(0,i.jsx)(n.code,{children:"weave_tracing_enabled"}),") are similar to using request callbacks in individual parts of a LangChain application. These methods provide finer control over which parts of your application are traced:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Constructor Callbacks:"})," Applied to the entire chain or component, logging all interactions consistently."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Request Callbacks:"})," Applied to specific requests, allowing detailed tracing of particular invocations."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"By integrating Weave with LangChain, you can ensure comprehensive logging and monitoring of your LLM applications, facilitating easier debugging and performance optimization."}),"\n",(0,i.jsxs)(n.p,{children:["For more detailed information, refer to the ",(0,i.jsx)(n.a,{href:"https://python.langchain.com/v0.2/docs/how_to/debugging/#tracing",children:"LangChain documentation"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"models-and-evaluations",children:"Models and Evaluations"}),"\n",(0,i.jsxs)(n.p,{children:["Organizing and evaluating LLMs in applications for various use cases is challenging with multiple components, such as prompts, model configurations, and inference parameters. Using the ",(0,i.jsx)(n.a,{href:"/guides/core-types/models",children:(0,i.jsx)(n.code,{children:"weave.Model"})}),", you can capture and organize experimental details like system prompts or the models you use, making it easier to compare different iterations."]}),"\n",(0,i.jsxs)(n.p,{children:["The following example demonstrates wrapping a Langchain chain in a ",(0,i.jsx)(n.code,{children:"WeaveModel"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'import json\nimport asyncio\n\nimport weave\n\nfrom langchain_core.prompts import PromptTemplate\nfrom langchain_openai import ChatOpenAI\n\n# Initialize Weave with your project name\n# highlight-next-line\nweave.init("langchain_demo")\n\n# highlight-next-line\nclass ExtractFruitsModel(weave.Model):\n    model_name: str\n    prompt_template: str\n\n# highlight-next-line\n    @weave.op()\n    async def predict(self, sentence: str) -> dict:\n        llm = ChatOpenAI(model=self.model_name, temperature=0.0)\n        prompt = PromptTemplate.from_template(self.prompt_template)\n\n        llm_chain = prompt | llm\n        response = llm_chain.invoke({"sentence": sentence})\n        result = response.content\n\n        if result is None:\n            raise ValueError("No response from model")\n        parsed = json.loads(result)\n        return parsed\n\nmodel = ExtractFruitsModel(\n    model_name="gpt-3.5-turbo-1106",\n    prompt_template=\'Extract fields ("fruit": <str>, "color": <str>, "flavor": <str>) from the following text, as json: {sentence}\',\n)\nsentence = "There are many fruits that were found on the recently discovered planet Goocrux. There are neoskizzles that grow there, which are purple and taste like candy."\n\nprediction = asyncio.run(model.predict(sentence))\n\n# if you\'re in a Jupyter Notebook, run:\n# prediction = await model.predict(sentence)\n\nprint(prediction)\n'})}),"\n",(0,i.jsx)(n.p,{children:"This code creates a model that can be visualized in the Weave UI:"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://wandb.ai/parambharat/langchain_demo/weave/object-versions?filter=%7B%22baseObjectClass%22%3A%22Model%22%7D&peekPath=%2Fparambharat%2Flangchain_demo%2Fobjects%2FExtractFruitsModel%2Fversions%2FBeoL6WuCH8wgjy6HfmuBMyKzArETg1oAFpYaXZSq1hw%3F%26",children:(0,i.jsx)(n.img,{alt:"langchain_model.png",src:a(66767).Z+"",width:"1915",height:"837"})})}),"\n",(0,i.jsxs)(n.p,{children:["You can also use Weave Models with ",(0,i.jsx)(n.code,{children:"serve"}),", and ",(0,i.jsx)(n.a,{href:"/guides/core-types/evaluations",children:(0,i.jsx)(n.code,{children:"Evaluations"})}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"evaluations",children:"Evaluations"}),"\n",(0,i.jsxs)(n.p,{children:["Evaluations help you measure the performance of your models. By using the ",(0,i.jsx)(n.a,{href:"/guides/core-types/evaluations",children:(0,i.jsx)(n.code,{children:"weave.Evaluation"})})," class, you can capture how well your model performs on specific tasks or datasets, making it easier to compare different models and iterations of your application. The following example demonstrates how to evaluate the model we created:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'\nfrom weave.flow.scorer import MultiTaskBinaryClassificationF1\n\nsentences = [\n    "There are many fruits that were found on the recently discovered planet Goocrux. There are neoskizzles that grow there, which are purple and taste like candy.",\n    "Pounits are a bright green color and are more savory than sweet.",\n    "Finally, there are fruits called glowls, which have a very sour and bitter taste which is acidic and caustic, and a pale orange tinge to them.",\n]\nlabels = [\n    {"fruit": "neoskizzles", "color": "purple", "flavor": "candy"},\n    {"fruit": "pounits", "color": "bright green", "flavor": "savory"},\n    {"fruit": "glowls", "color": "pale orange", "flavor": "sour and bitter"},\n]\nexamples = [\n    {"id": "0", "sentence": sentences[0], "target": labels[0]},\n    {"id": "1", "sentence": sentences[1], "target": labels[1]},\n    {"id": "2", "sentence": sentences[2], "target": labels[2]},\n]\n\n@weave.op()\ndef fruit_name_score(target: dict, model_output: dict) -> dict:\n    return {"correct": target["fruit"] == model_output["fruit"]}\n\n\nevaluation = weave.Evaluation(\n    dataset=examples,\n    scorers=[\n        MultiTaskBinaryClassificationF1(class_names=["fruit", "color", "flavor"]),\n        fruit_name_score,\n    ],\n)\nscores = asyncio.run(evaluation.evaluate(model)))\n# if you\'re in a Jupyter Notebook, run:\n# scores = await evaluation.evaluate(model)\n\nprint(scores)\n'})}),"\n",(0,i.jsx)(n.p,{children:"This code generates an evaluation trace that can be visualized in the Weave UI:"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://wandb.ai/parambharat/langchain_demo/weave/calls?filter=%7B%22traceRootsOnly%22%3Atrue%7D&peekPath=%2Fparambharat%2Flangchain_demo%2Fcalls%2F44c3f26c-d9d3-423e-b434-651ea5174be3",children:(0,i.jsx)(n.img,{alt:"langchain_evaluation.png",src:a(98956).Z+"",width:"1915",height:"837"})})}),"\n",(0,i.jsx)(n.p,{children:"By integrating Weave with Langchain, you can ensure comprehensive logging and monitoring of your LLM applications, facilitating easier debugging and performance optimization."}),"\n",(0,i.jsx)(n.h2,{id:"known-issues",children:"Known Issues"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Tracing Async Calls"})," - A bug in the implementation of the ",(0,i.jsx)(n.code,{children:"AsyncCallbackManager"})," in Langchain results in async calls not being traced in the correct order. We have filed a ",(0,i.jsx)(n.a,{href:"https://github.com/langchain-ai/langchain/pull/23909",children:"PR"})," to fix this. Therefore, the order of calls in the trace may not be accurate when using ",(0,i.jsx)(n.code,{children:"ainvoke"}),", ",(0,i.jsx)(n.code,{children:"astream"})," and ",(0,i.jsx)(n.code,{children:"abatch"})," methods in Langchain Runnables."]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},98956:(e,n,a)=>{a.d(n,{Z:()=>i});const i=a.p+"assets/images/langchain_eval-59b62a719896a5277d9ea397cfb49fd6.png"},66767:(e,n,a)=>{a.d(n,{Z:()=>i});const i=a.p+"assets/images/langchain_model-aa69f5a21ecde2d30be53e3f1b43c601.png"},61883:(e,n,a)=>{a.d(n,{Z:()=>i});const i=a.p+"assets/images/langchain_trace-8a5aac7070df8635840cfb6fbb43996f.png"},11151:(e,n,a)=>{a.d(n,{Z:()=>r,a:()=>o});var i=a(67294);const t={},l=i.createContext(t);function o(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);