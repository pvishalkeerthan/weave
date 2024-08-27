"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5496],{67909:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var i=t(85893),a=t(11151);const r={title:"Chain of Density Summarization"},s="Summarization using Chain of Density",o={id:"reference/gen_notebooks/chain_of_density",title:"Chain of Density Summarization",description:"Open in Colab",source:"@site/docs/reference/gen_notebooks/chain_of_density.md",sourceDirName:"reference/gen_notebooks",slug:"/reference/gen_notebooks/chain_of_density",permalink:"/reference/gen_notebooks/chain_of_density",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/reference/gen_notebooks/chain_of_density.md",tags:[],version:"current",frontMatter:{title:"Chain of Density Summarization"},sidebar:"notebookSidebar",previous:{title:"Introduction Notebook",permalink:"/reference/gen_notebooks/intro_notebook"},next:{title:"Prompt Optimization",permalink:"/reference/gen_notebooks/dspy_prompt_optimization"}},l={},c=[{value:"What is Chain of Density Summarization?",id:"what-is-chain-of-density-summarization",level:2},{value:"Why use Weave?",id:"why-use-weave",level:2},{value:"Set up the environment",id:"set-up-the-environment",level:2},{value:"Define the ArxivPaper model",id:"define-the-arxivpaper-model",level:2},{value:"Load PDF content",id:"load-pdf-content",level:2},{value:"Implement Chain of Density summarization",id:"implement-chain-of-density-summarization",level:2},{value:"Create a Weave Model",id:"create-a-weave-model",level:2},{value:"Implement evaluation metrics",id:"implement-evaluation-metrics",level:2},{value:"Create a Weave Dataset and run evaluation",id:"create-a-weave-dataset-and-run-evaluation",level:2},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.admonition,{title:"This is a notebook",type:"tip",children:[(0,i.jsx)("a",{href:"https://colab.research.google.com/github/wandb/weave/blob/master/docs/./notebooks/chain_of_density.ipynb",target:"_blank",rel:"noopener noreferrer",class:"navbar__item navbar__link button button--secondary button--med margin-right--sm notebook-cta-button",children:(0,i.jsxs)("div",{children:[(0,i.jsx)("img",{src:"https://upload.wikimedia.org/wikipedia/commons/archive/d/d0/20221103151430%21Google_Colaboratory_SVG_Logo.svg",alt:"Open In Colab",height:"20px"}),(0,i.jsx)("div",{children:"Open in Colab"})]})}),(0,i.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/docs/./notebooks/chain_of_density.ipynb",target:"_blank",rel:"noopener noreferrer",class:"navbar__item navbar__link button button--secondary button--med margin-right--sm notebook-cta-button",children:(0,i.jsxs)("div",{children:[(0,i.jsx)("img",{src:"https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",alt:"View in Github",height:"15px"}),(0,i.jsx)("div",{children:"View in Github"})]})})]}),"\n",(0,i.jsx)("img",{src:"http://wandb.me/logo-im-png",width:"400",alt:"Weights & Biases"}),"\n",(0,i.jsx)(n.h1,{id:"summarization-using-chain-of-density",children:"Summarization using Chain of Density"}),"\n",(0,i.jsx)(n.p,{children:"Summarizing complex technical documents while preserving crucial details is a challenging task. The Chain of Density (CoD) summarization technique offers a solution by iteratively refining summaries to be more concise and information-dense. This guide demonstrates how to implement CoD using Weave for tracking and evaluating the application."}),"\n",(0,i.jsx)(n.h2,{id:"what-is-chain-of-density-summarization",children:"What is Chain of Density Summarization?"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://arxiv.org/abs/2309.04269",children:(0,i.jsx)(n.img,{src:"https://img.shields.io/badge/arXiv-2309.04269-b31b1b.svg",alt:"arXiv"})})}),"\n",(0,i.jsx)(n.p,{children:"Chain of Density (CoD) is an iterative summarization technique that produces increasingly concise and information-dense summaries. It works by:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Starting with an initial summary"}),"\n",(0,i.jsx)(n.li,{children:"Iteratively refining the summary, making it more concise while preserving key information"}),"\n",(0,i.jsx)(n.li,{children:"Increasing the density of entities and technical details with each iteration"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"This approach is particularly useful for summarizing scientific papers or technical documents where preserving detailed information is crucial."}),"\n",(0,i.jsx)(n.h2,{id:"why-use-weave",children:"Why use Weave?"}),"\n",(0,i.jsx)(n.p,{children:"In this tutorial, we'll use Weave to implement and evaluate a Chain of Density summarization pipeline for ArXiv papers. You'll learn how to:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Track your LLM pipeline"}),": Use Weave to automatically log inputs, outputs, and intermediate steps of your summarization process."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Evaluate LLM outputs"}),": Create rigorous, apples-to-apples evaluations of your summaries using Weave's built-in tools."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Build composable operations"}),": Combine and reuse Weave operations across different parts of your summarization pipeline."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Integrate seamlessly"}),": Add Weave to your existing Python code with minimal overhead."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"By the end of this tutorial, you'll have created a CoD summarization pipeline that leverages Weave's capabilities for model serving, evaluation, and result tracking."}),"\n",(0,i.jsx)(n.h2,{id:"set-up-the-environment",children:"Set up the environment"}),"\n",(0,i.jsx)(n.p,{children:"First, let's set up our environment and import the necessary libraries:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:"!pip install -qU anthropic weave pydantic requests PyPDF2 set-env-colab-kaggle-dotenv\n"})}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:"To get an Anthropic API key:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Sign up for an account at ",(0,i.jsx)(n.a,{href:"https://www.anthropic.com",children:"https://www.anthropic.com"})]}),"\n",(0,i.jsx)(n.li,{children:"Navigate to the API section in your account settings"}),"\n",(0,i.jsx)(n.li,{children:"Generate a new API key"}),"\n",(0,i.jsx)(n.li,{children:"Store the API key securely in your .env file"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'import io\nimport os\nfrom datetime import datetime, timezone\n\nimport anthropic\nimport requests\nfrom pydantic import BaseModel\nfrom PyPDF2 import PdfReader\nfrom set_env import set_env\n\nimport weave\n\nset_env("WANDB_API_KEY")\nset_env("ANTHROPIC_API_KEY")\n\nweave.init("summarization-chain-of-density-cookbook")\nanthropic_client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))\n'})}),"\n",(0,i.jsxs)(n.p,{children:["We're using Weave to track our experiment and Anthropic's Claude model for text generation. The ",(0,i.jsx)(n.code,{children:"weave.init(<project name>)"})," call sets up a new Weave project for our summarization task."]}),"\n",(0,i.jsx)(n.h2,{id:"define-the-arxivpaper-model",children:"Define the ArxivPaper model"}),"\n",(0,i.jsxs)(n.p,{children:["We'll create a simple ",(0,i.jsx)(n.code,{children:"ArxivPaper"})," class to represent our data:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'# Define ArxivPaper model\nclass ArxivPaper(BaseModel):\n    entry_id: str\n    updated: datetime\n    published: datetime\n    title: str\n    authors: list[str]\n    summary: str\n    pdf_url: str\n\n\n# Create sample ArxivPaper\narxiv_paper = ArxivPaper(\n    entry_id="http://arxiv.org/abs/2406.04744v1",\n    updated=datetime(2024, 6, 7, 8, 43, 7, tzinfo=timezone.utc),\n    published=datetime(2024, 6, 7, 8, 43, 7, tzinfo=timezone.utc),\n    title="CRAG -- Comprehensive RAG Benchmark",\n    authors=["Xiao Yang", "Kai Sun", "Hao Xin"],  # Truncated for brevity\n    summary="Retrieval-Augmented Generation (RAG) has recently emerged as a promising solution...",  # Truncated\n    pdf_url="https://arxiv.org/pdf/2406.04744",\n)\n'})}),"\n",(0,i.jsx)(n.p,{children:"This class encapsulates the metadata and content of an ArXiv paper, which will be the input to our summarization pipeline."}),"\n",(0,i.jsx)(n.h2,{id:"load-pdf-content",children:"Load PDF content"}),"\n",(0,i.jsx)(n.p,{children:"To work with the full paper content, we'll add a function to load and extract text from PDFs:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'@weave.op()\ndef load_pdf(pdf_url: str) -> str:\n    # Download the PDF\n    response = requests.get(pdf_url)\n    pdf_file = io.BytesIO(response.content)\n\n    # Read the PDF\n    pdf_reader = PdfReader(pdf_file)\n\n    # Extract text from all pages\n    text = ""\n    for page in pdf_reader.pages:\n        text += page.extract_text()\n\n    return text\n'})}),"\n",(0,i.jsx)(n.h2,{id:"implement-chain-of-density-summarization",children:"Implement Chain of Density summarization"}),"\n",(0,i.jsx)(n.p,{children:"Now, let's implement the core CoD summarization logic using Weave operations:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'# Chain of Density Summarization\n@weave.op()\ndef summarize_current_summary(\n    document: str,\n    instruction: str,\n    current_summary: str = "",\n    iteration: int = 1,\n    model: str = "claude-3-sonnet-20240229",\n):\n    prompt = f"""\n    Document: {document}\n    Current summary: {current_summary}\n    Instruction to focus on: {instruction}\n    Iteration: {iteration}\n\n    Generate an increasingly concise, entity-dense, and highly technical summary from the provided document that specifically addresses the given instruction.\n    """\n    response = anthropic_client.messages.create(\n        model=model, max_tokens=4096, messages=[{"role": "user", "content": prompt}]\n    )\n    return response.content[0].text\n\n\n@weave.op()\ndef iterative_density_summarization(\n    document: str,\n    instruction: str,\n    current_summary: str,\n    density_iterations: int,\n    model: str = "claude-3-sonnet-20240229",\n):\n    iteration_summaries = []\n    for iteration in range(1, density_iterations + 1):\n        current_summary = summarize_current_summary(\n            document, instruction, current_summary, iteration, model\n        )\n        iteration_summaries.append(current_summary)\n    return current_summary, iteration_summaries\n\n\n@weave.op()\ndef final_summary(\n    instruction: str, current_summary: str, model: str = "claude-3-sonnet-20240229"\n):\n    prompt = f"""\n    Given this summary: {current_summary}\n    And this instruction to focus on: {instruction}\n    Create an extremely dense, final summary that captures all key technical information in the most concise form possible, while specifically addressing the given instruction.\n    """\n    return (\n        anthropic_client.messages.create(\n            model=model, max_tokens=4096, messages=[{"role": "user", "content": prompt}]\n        )\n        .content[0]\n        .text\n    )\n\n\n@weave.op()\ndef chain_of_density_summarization(\n    document: str,\n    instruction: str,\n    current_summary: str = "",\n    model: str = "claude-3-sonnet-20240229",\n    density_iterations: int = 2,\n):\n    current_summary, iteration_summaries = iterative_density_summarization(\n        document, instruction, current_summary, density_iterations, model\n    )\n    final_summary_text = final_summary(instruction, current_summary, model)\n    return {\n        "final_summary": final_summary_text,\n        "accumulated_summary": current_summary,\n        "iteration_summaries": iteration_summaries,\n    }\n'})}),"\n",(0,i.jsx)(n.p,{children:"Here's what each function does:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"summarize_current_summary"}),": Generates a single summary iteration based on the current state."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"iterative_density_summarization"}),": Applies the CoD technique by calling ",(0,i.jsx)(n.code,{children:"summarize_current_summary"})," multiple times."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"chain_of_density_summarization"}),": Orchestrates the entire summarization process and returns the results."]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["By using ",(0,i.jsx)(n.code,{children:"@weave.op()"})," decorators, we ensure that Weave tracks the inputs, outputs, and execution of these functions."]}),"\n",(0,i.jsx)(n.h2,{id:"create-a-weave-model",children:"Create a Weave Model"}),"\n",(0,i.jsx)(n.p,{children:"Now, let's wrap our summarization pipeline in a Weave Model:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'# Weave Model\nclass ArxivChainOfDensityPipeline(weave.Model):\n    model: str = "claude-3-sonnet-20240229"\n    density_iterations: int = 3\n\n    @weave.op()\n    def predict(self, paper: ArxivPaper, instruction: str) -> dict:\n        text = load_pdf(paper["pdf_url"])\n        result = chain_of_density_summarization(\n            text,\n            instruction,\n            model=self.model,\n            density_iterations=self.density_iterations,\n        )\n        return result\n'})}),"\n",(0,i.jsxs)(n.p,{children:["This ",(0,i.jsx)(n.code,{children:"ArxivChainOfDensityPipeline"})," class encapsulates our summarization logic as a Weave Model, providing several key benefits:"]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Automatic experiment tracking: Weave captures inputs, outputs, and parameters for each run of the model."}),"\n",(0,i.jsx)(n.li,{children:"Versioning: Changes to the model's attributes or code are automatically versioned, creating a clear history of how your summarization pipeline evolves over time."}),"\n",(0,i.jsx)(n.li,{children:"Reproducibility: The versioning and tracking make it easy to reproduce any previous result or configuration of your summarization pipeline."}),"\n",(0,i.jsxs)(n.li,{children:["Hyperparameter management: Model attributes (like ",(0,i.jsx)(n.code,{children:"model"})," and ",(0,i.jsx)(n.code,{children:"density_iterations"}),") are clearly defined and tracked across different runs, facilitating experimentation."]}),"\n",(0,i.jsxs)(n.li,{children:["Integration with Weave ecosystem: Using ",(0,i.jsx)(n.code,{children:"weave.Model"})," allows seamless integration with other Weave tools, such as evaluations and serving capabilities."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"implement-evaluation-metrics",children:"Implement evaluation metrics"}),"\n",(0,i.jsx)(n.p,{children:"To assess the quality of our summaries, we'll implement simple evaluation metrics:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'import json\n\n\n@weave.op()\ndef evaluate_summary(\n    summary: str, instruction: str, model: str = "claude-3-sonnet-20240229"\n) -> dict:\n    prompt = f"""\n    Summary: {summary}\n    Instruction: {instruction}\n\n    Evaluate the summary based on the following criteria:\n    1. Relevance (1-5): How well does the summary address the given instruction?\n    2. Conciseness (1-5): How concise is the summary while retaining key information?\n    3. Technical Accuracy (1-5): How accurately does the summary convey technical details?\n\n    Your response MUST be in the following JSON format:\n    {{\n        "relevance": {{\n            "score": <int>,\n            "explanation": "<string>"\n        }},\n        "conciseness": {{\n            "score": <int>,\n            "explanation": "<string>"\n        }},\n        "technical_accuracy": {{\n            "score": <int>,\n            "explanation": "<string>"\n        }}\n    }}\n\n    Ensure that the scores are integers between 1 and 5, and that the explanations are concise.\n    """\n    response = anthropic_client.messages.create(\n        model=model, max_tokens=1000, messages=[{"role": "user", "content": prompt}]\n    )\n    print(response.content[0].text)\n\n    eval_dict = json.loads(response.content[0].text)\n\n    return {\n        "relevance": eval_dict["relevance"]["score"],\n        "conciseness": eval_dict["conciseness"]["score"],\n        "technical_accuracy": eval_dict["technical_accuracy"]["score"],\n        "average_score": sum(eval_dict[k]["score"] for k in eval_dict) / 3,\n        "evaluation_text": response.content[0].text,\n    }\n'})}),"\n",(0,i.jsx)(n.p,{children:"These evaluation functions use the Claude model to assess the quality of the generated summaries based on relevance, conciseness, and technical accuracy."}),"\n",(0,i.jsx)(n.h2,{id:"create-a-weave-dataset-and-run-evaluation",children:"Create a Weave Dataset and run evaluation"}),"\n",(0,i.jsx)(n.p,{children:"To evaluate our pipeline, we'll create a Weave Dataset and run an evaluation:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'# Create a Weave Dataset\ndataset = weave.Dataset(\n    name="arxiv_papers",\n    rows=[\n        {\n            "paper": arxiv_paper,\n            "instruction": "What was the approach to experimenting with different data mixtures?",\n        },\n    ],\n)\n\nweave.publish(dataset)\n'})}),"\n",(0,i.jsx)(n.p,{children:"For our evaluation, we'll use an LLM-as-a-judge approach. This technique involves using a language model to assess the quality of outputs generated by another model or system. It leverages the LLM's understanding and reasoning capabilities to provide nuanced evaluations, especially for tasks where traditional metrics may fall short."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://arxiv.org/abs/2306.05685",children:(0,i.jsx)(n.img,{src:"https://img.shields.io/badge/arXiv-2306.05685-b31b1b.svg",alt:"arXiv"})})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'# Define the scorer function\n@weave.op()\ndef quality_scorer(instruction: str, model_output: dict) -> dict:\n    result = evaluate_summary(model_output["final_summary"], instruction)\n    return result\n'})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:"# Run evaluation\nevaluation = weave.Evaluation(dataset=dataset, scorers=[quality_scorer])\narxiv_chain_of_density_pipeline = ArxivChainOfDensityPipeline()\nresults = await evaluation.evaluate(arxiv_chain_of_density_pipeline)\n"})}),"\n",(0,i.jsx)(n.p,{children:"This code creates a dataset with our sample ArXiv paper, defines a quality scorer, and runs an evaluation of our summarization pipeline."}),"\n",(0,i.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,i.jsx)(n.p,{children:"In this example, we've demonstrated how to implement a Chain of Density summarization pipeline for ArXiv papers using Weave. We've shown how to:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Create Weave operations for each step of the summarization process"}),"\n",(0,i.jsx)(n.li,{children:"Wrap the pipeline in a Weave Model for easy tracking and evaluation"}),"\n",(0,i.jsx)(n.li,{children:"Implement custom evaluation metrics using Weave operations"}),"\n",(0,i.jsx)(n.li,{children:"Create a dataset and run an evaluation of the pipeline"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Weave's seamless integration allows us to track inputs, outputs, and intermediate steps throughout the summarization process, making it easier to debug, optimize, and evaluate our LLM application.\nYou can extend this example to handle larger datasets, implement more sophisticated evaluation metrics, or integrate with other LLM workflows."}),"\n",(0,i.jsx)("a",{href:"https://wandb.ai/wandb_fc/arxiv-reader/reports/Building-a-bot-to-summarize-arXiv-papers-as-PDFs-using-Anthrophic-and-W-B-Weave--Vmlldzo4Nzg0ODI4",target:"_blank",rel:"noopener noreferrer",className:"button button--primary button--lg",children:(0,i.jsx)(n.p,{children:"View Full Report on W&B"})})]})}function u(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>o,a:()=>s});var i=t(67294);const a={},r=i.createContext(a);function s(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);