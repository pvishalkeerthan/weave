"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[863],{29099:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>i,metadata:()=>r,toc:()=>c});var a=n(85893),o=n(11151);const i={},s="Evaluations",r={id:"guides/core-types/evaluations",title:"Evaluations",description:"Evaluation-driven development helps you reliably iterate on an application. The Evaluation class is designed to assess the performance of a Model on a given Dataset or set of examples using scoring functions.",source:"@site/docs/guides/core-types/evaluations.md",sourceDirName:"guides/core-types",slug:"/guides/core-types/evaluations",permalink:"/guides/core-types/evaluations",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/guides/core-types/evaluations.md",tags:[],version:"current",lastUpdatedAt:1727194842e3,frontMatter:{},sidebar:"documentationSidebar",previous:{title:"Datasets",permalink:"/guides/core-types/datasets"},next:{title:"Feedback",permalink:"/guides/tracking/feedback"}},l={},c=[{value:"Create an Evaluation",id:"create-an-evaluation",level:2},{value:"Define an evaluation dataset",id:"define-an-evaluation-dataset",level:3},{value:"Defining scoring functions",id:"defining-scoring-functions",level:3},{value:"Optional: Define a custom <code>Scorer</code> class",id:"optional-define-a-custom-scorer-class",level:3},{value:"Define a Model to evaluate",id:"define-a-model-to-evaluate",level:3},{value:"Define a function to evaluate",id:"define-a-function-to-evaluate",level:3},{value:"Pulling it all together",id:"pulling-it-all-together",level:3}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",p:"p",pre:"pre",...(0,o.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"evaluations",children:"Evaluations"}),"\n",(0,a.jsxs)(t.p,{children:["Evaluation-driven development helps you reliably iterate on an application. The ",(0,a.jsx)(t.code,{children:"Evaluation"})," class is designed to assess the performance of a ",(0,a.jsx)(t.code,{children:"Model"})," on a given ",(0,a.jsx)(t.code,{children:"Dataset"})," or set of examples using scoring functions."]}),"\n",(0,a.jsx)(t.p,{children:(0,a.jsx)(t.img,{alt:"Evals hero",src:n(65259).Z+"",width:"4100",height:"2160"})}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-python",children:'import weave\nfrom weave import Evaluation\nimport asyncio\n\n# Collect your examples\nexamples = [\n    {"question": "What is the capital of France?", "expected": "Paris"},\n    {"question": "Who wrote \'To Kill a Mockingbird\'?", "expected": "Harper Lee"},\n    {"question": "What is the square root of 64?", "expected": "8"},\n]\n\n# Define any custom scoring function\n@weave.op()\ndef match_score1(expected: str, model_output: dict) -> dict:\n    # Here is where you\'d define the logic to score the model output\n    return {\'match\': expected == model_output[\'generated_text\']}\n\n@weave.op()\ndef function_to_evaluate(question: str):\n    # here\'s where you would add your LLM call and return the output\n    return  {\'generated_text\': \'Paris\'}\n\n# Score your examples using scoring functions\nevaluation = Evaluation(\n    dataset=examples, scorers=[match_score1]\n)\n\n# Start tracking the evaluation\nweave.init(\'intro-example\')\n# Run the evaluation\nasyncio.run(evaluation.evaluate(function_to_evaluate))\n'})}),"\n",(0,a.jsx)(t.h2,{id:"create-an-evaluation",children:"Create an Evaluation"}),"\n",(0,a.jsxs)(t.p,{children:["To systematically improve your application, it's helpful to test your changes against a consistent dataset of potential inputs so that you catch regressions and can inspect your apps behaviour under different conditions. Using the ",(0,a.jsx)(t.code,{children:"Evaluation"})," class, you can be sure you're comparing apples-to-apples by keeping track of all of the details that you're experimenting and evaluating with."]}),"\n",(0,a.jsx)(t.p,{children:"Weave will take each example, pass it through your application and score the output on multiple custom scoring functions. By doing this, you'll have a view of the performance of your application, and a rich UI to drill into individual outputs and scores."}),"\n",(0,a.jsx)(t.h3,{id:"define-an-evaluation-dataset",children:"Define an evaluation dataset"}),"\n",(0,a.jsxs)(t.p,{children:["First, define a ",(0,a.jsx)(t.a,{href:"/guides/core-types/datasets",children:"Dataset"})," or list of dictionaries with a collection of examples to be evaluated. These examples are often failure cases that you want to test for, these are similar to unit tests in Test-Driven Development (TDD)."]}),"\n",(0,a.jsx)(t.h3,{id:"defining-scoring-functions",children:"Defining scoring functions"}),"\n",(0,a.jsxs)(t.p,{children:["Then, create a list of scoring functions. These are used to score each example. Each function should have a ",(0,a.jsx)(t.code,{children:"model_output"})," and optionally, other inputs from your examples, and return a dictionary with the scores."]}),"\n",(0,a.jsxs)(t.p,{children:["Scoring functions need to have a ",(0,a.jsx)(t.code,{children:"model_output"})," keyword argument, but the other arguments are user defined and are taken from the dataset examples. It will only take the necessary keys by using a dictionary key based on the argument name."]}),"\n",(0,a.jsxs)(t.p,{children:["This will take ",(0,a.jsx)(t.code,{children:"expected"})," from the dictionary for scoring."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-python",children:'import weave\n\n# Collect your examples\nexamples = [\n    {"question": "What is the capital of France?", "expected": "Paris"},\n    {"question": "Who wrote \'To Kill a Mockingbird\'?", "expected": "Harper Lee"},\n    {"question": "What is the square root of 64?", "expected": "8"},\n]\n\n# Define any custom scoring function\n@weave.op()\ndef match_score1(expected: str, model_output: dict) -> dict:\n    # Here is where you\'d define the logic to score the model output\n    return {\'match\': expected == model_output[\'generated_text\']}\n'})}),"\n",(0,a.jsxs)(t.h3,{id:"optional-define-a-custom-scorer-class",children:["Optional: Define a custom ",(0,a.jsx)(t.code,{children:"Scorer"})," class"]}),"\n",(0,a.jsxs)(t.p,{children:["In some applications we want to create custom ",(0,a.jsx)(t.code,{children:"Scorer"})," classes - where for example a standardized ",(0,a.jsx)(t.code,{children:"LLMJudge"})," class should be created with specific parameters (e.g. chat model, prompt), specific scoring of each row, and specific calculation of an aggregate score."]}),"\n",(0,a.jsxs)(t.p,{children:["See the tutorial on defining a ",(0,a.jsx)(t.code,{children:"Scorer"})," class in the next chapter on ",(0,a.jsx)(t.a,{href:"/tutorial-rag#optional-defining-a-scorer-class",children:"Model-Based Evaluation of RAG applications"})," for more information."]}),"\n",(0,a.jsx)(t.h3,{id:"define-a-model-to-evaluate",children:"Define a Model to evaluate"}),"\n",(0,a.jsxs)(t.p,{children:["To evaluate a ",(0,a.jsx)(t.code,{children:"Model"}),", call ",(0,a.jsx)(t.code,{children:"evaluate"})," on it using an ",(0,a.jsx)(t.code,{children:"Evaluation"}),". ",(0,a.jsx)(t.code,{children:"Models"})," are used when you have attributes that you want to experiment with and capture in weave."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-python",children:"from weave import Model, Evaluation\nimport asyncio\n\nclass MyModel(Model):\n    prompt: str\n\n    @weave.op()\n    def predict(self, question: str):\n        # here's where you would add your LLM call and return the output\n        return {'generated_text': 'Hello, ' + self.prompt}\n\nmodel = MyModel(prompt='World')\n\nevaluation = Evaluation(\n    dataset=examples, scorers=[match_score1]\n)\nweave.init('intro-example') # begin tracking results with weave\nasyncio.run(evaluation.evaluate(model))\n"})}),"\n",(0,a.jsxs)(t.p,{children:["This will run ",(0,a.jsx)(t.code,{children:"predict"})," on each example and score the output with each scoring functions."]}),"\n",(0,a.jsx)(t.h3,{id:"define-a-function-to-evaluate",children:"Define a function to evaluate"}),"\n",(0,a.jsxs)(t.p,{children:["Alternatively, you can also evaluate a function that is wrapped in a ",(0,a.jsx)(t.code,{children:"@weave.op()"}),"."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-python",children:"@weave.op()\ndef function_to_evaluate(question: str):\n    # here's where you would add your LLM call and return the output\n    return  {'generated_text': 'some response'}\n\nasyncio.run(evaluation.evaluate(function_to_evaluate))\n"})}),"\n",(0,a.jsx)(t.h3,{id:"pulling-it-all-together",children:"Pulling it all together"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-python",children:"from weave import Evaluation, Model\nimport weave\nimport asyncio\nweave.init('intro-example')\nexamples = [\n    {\"question\": \"What is the capital of France?\", \"expected\": \"Paris\"},\n    {\"question\": \"Who wrote 'To Kill a Mockingbird'?\", \"expected\": \"Harper Lee\"},\n    {\"question\": \"What is the square root of 64?\", \"expected\": \"8\"},\n]\n\n@weave.op()\ndef match_score1(expected: str, model_output: dict) -> dict:\n    return {'match': expected == model_output['generated_text']}\n\n@weave.op()\ndef match_score2(expected: dict, model_output: dict) -> dict:\n    return {'match': expected == model_output['generated_text']}\n\nclass MyModel(Model):\n    prompt: str\n\n    @weave.op()\n    def predict(self, question: str):\n        # here's where you would add your LLM call and return the output\n        return {'generated_text': 'Hello, ' + question + self.prompt}\n\nmodel = MyModel(prompt='World')\nevaluation = Evaluation(dataset=examples, scorers=[match_score1, match_score2])\n\nasyncio.run(evaluation.evaluate(model))\n\n@weave.op()\ndef function_to_evaluate(question: str):\n    # here's where you would add your LLM call and return the output\n    return  {'generated_text': 'some response' + question}\n\nasyncio.run(evaluation.evaluate(function_to_evaluate))\n"})})]})}function u(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},65259:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/evals-hero-eaaf7b203721d2a352cb2facba3dcd92.png"},11151:(e,t,n)=>{n.d(t,{Z:()=>r,a:()=>s});var a=n(67294);const o={},i=a.createContext(o);function s(e){const t=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),a.createElement(i.Provider,{value:t},e.children)}}}]);