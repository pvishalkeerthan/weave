"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[374],{7274:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>d});var i=t(5893),s=t(1151);const a={sidebar_position:3,hide_table_of_contents:!0},o="Tutorial: Model-Based Evaluation of RAG applications",r={id:"tutorial-rag",title:"Tutorial: Model-Based Evaluation of RAG applications",description:"Retrieval Augmented Generation (RAG) is a common way of building Generative AI applications that have access to custom knowledge bases.",source:"@site/docs/tutorial-rag.md",sourceDirName:".",slug:"/tutorial-rag",permalink:"/weave/tutorial-rag",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/tutorial-rag.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,hide_table_of_contents:!0},sidebar:"documentationSidebar",previous:{title:"Tutorial: Build an Evaluation pipeline",permalink:"/weave/tutorial-eval"},next:{title:"Weave Core Types",permalink:"/weave/guides/core-types/"}},l={},d=[{value:"1. Build a knowledge base",id:"1-build-a-knowledge-base",level:2},{value:"2. Create a RAG app",id:"2-create-a-rag-app",level:2},{value:"3. Evaluating with an LLM Judge",id:"3-evaluating-with-an-llm-judge",level:2},{value:"Defining a scoring function",id:"defining-a-scoring-function",level:3},{value:"Optional: Defining a <code>Scorer</code> class",id:"optional-defining-a-scorer-class",level:3},{value:"4. Pulling it all together",id:"4-pulling-it-all-together",level:2},{value:"Conclusion",id:"conclusion",level:2},{value:"What&#39;s next?",id:"whats-next",level:2}];function c(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"tutorial-model-based-evaluation-of-rag-applications",children:"Tutorial: Model-Based Evaluation of RAG applications"}),"\n",(0,i.jsx)(n.p,{children:"Retrieval Augmented Generation (RAG) is a common way of building Generative AI applications that have access to custom knowledge bases."}),"\n",(0,i.jsx)(n.p,{children:"In this example, we'll show an example that has a retrieval step to get documents. By tracking this, you can debug your app and see what documents were pulled into the LLM context.\nWe'll also show how to evaluate it using an LLM judge."}),"\n",(0,i.jsx)(n.h2,{id:"1-build-a-knowledge-base",children:"1. Build a knowledge base"}),"\n",(0,i.jsx)(n.p,{children:"First, we compute the embeddings for our articles. You would typically do this once with your articles and put the embeddings & metadata in a database, but here we're doing it every time we run our script for simplicity."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'from openai import OpenAI\nimport weave\nfrom weave import Model\nimport numpy as np\nimport json\nimport asyncio \n\narticles = [\n    "Novo Nordisk and Eli Lilly rival soars 32 percent after promising weight loss drug results Shares of Denmarks Zealand Pharma shot 32 percent higher in morning trade, after results showed success in its liver disease treatment survodutide, which is also on trial as a drug to treat obesity. The trial \u201ctells us that the 6mg dose is safe, which is the top dose used in the ongoing [Phase 3] obesity trial too,\u201d one analyst said in a note. The results come amid feverish investor interest in drugs that can be used for weight loss.",\n    "Berkshire shares jump after big profit gain as Buffetts conglomerate nears $1 trillion valuation Berkshire Hathaway shares rose on Monday after Warren Buffetts conglomerate posted strong earnings for the fourth quarter over the weekend. Berkshires Class A and B shares jumped more than 1.5%, each. Class A shares are higher by more than 17% this year, while Class B have gained more than 18%. Berkshire was last valued at $930.1 billion, up from $905.5 billion where it closed on Friday, according to FactSet. Berkshire on Saturday posted fourth-quarter operating earnings of $8.481 billion, about 28 percent higher than the $6.625 billion from the year-ago period, driven by big gains in its insurance business. Operating earnings refers to profits from businesses across insurance, railroads and utilities. Meanwhile, Berkshires cash levels also swelled to record levels. The conglomerate held $167.6 billion in cash in the fourth quarter, surpassing the $157.2 billion record the conglomerate held in the prior quarter.",\n    "Highmark Health says its combining tech from Google and Epic to give doctors easier access to information Highmark Health announced it is integrating technology from Google Cloud and the health-care software company Epic Systems. The integration aims to make it easier for both payers and providers to access key information they need, even if its stored across multiple points and formats, the company said. Highmark is the parent company of a health plan with 7 million members, a provider network of 14 hospitals and other entities",\n    "Rivian and Lucid shares plunge after weak EV earnings reports Shares of electric vehicle makers Rivian and Lucid fell Thursday after the companies reported stagnant production in their fourth-quarter earnings after the bell Wednesday. Rivian shares sank about 25 percent, and Lucids stock dropped around 17 percent. Rivian forecast it will make 57,000 vehicles in 2024, slightly less than the 57,232 vehicles it produced in 2023. Lucid said it expects to make 9,000 vehicles in 2024, more than the 8,428 vehicles it made in 2023.",\n    "Mauritius blocks Norwegian cruise ship over fears of a potential cholera outbreak Local authorities on Sunday denied permission for the Norwegian Dawn ship, which has 2,184 passengers and 1,026 crew on board, to access the Mauritius capital of Port Louis, citing \u201cpotential health risks.\u201d The Mauritius Ports Authority said Sunday that samples were taken from at least 15 passengers on board the cruise ship. A spokesperson for the U.S.-headquartered Norwegian Cruise Line Holdings said Sunday that \'a small number of guests experienced mild symptoms of a stomach-related illness\' during Norwegian Dawns South Africa voyage.",\n    "Intuitive Machines lands on the moon in historic first for a U.S. company Intuitive Machines Nova-C cargo lander, named Odysseus after the mythological Greek hero, is the first U.S. spacecraft to soft land on the lunar surface since 1972. Intuitive Machines is the first company to pull off a moon landing \u2014 government agencies have carried out all previously successful missions. The companys stock surged in extended trading Thursday, after falling 11 percent in regular trading.",\n    "Lunar landing photos: Intuitive Machines Odysseus sends back first images from the moon Intuitive Machines cargo moon lander Odysseus returned its first images from the surface. Company executives believe the lander caught its landing gear sideways in the moons surface while touching down and tipped over. Despite resting on its side, the companys historic IM-1 mission is still operating on the moon.",\n]\n\ndef docs_to_embeddings(docs: list) -> list:\n    openai = OpenAI()\n    document_embeddings = []\n    for doc in docs:\n        response = (\n            openai.embeddings.create(input=doc, model="text-embedding-3-small")\n            .data[0]\n            .embedding\n        )\n        document_embeddings.append(response)\n    return document_embeddings\n\narticle_embeddings = docs_to_embeddings(articles) # Note: you would typically do this once with your articles and put the embeddings & metadata in a database\n'})}),"\n",(0,i.jsx)(n.h2,{id:"2-create-a-rag-app",children:"2. Create a RAG app"}),"\n",(0,i.jsxs)(n.p,{children:["Next, we wrap our retrieval function ",(0,i.jsx)(n.code,{children:"get_most_relevant_document"})," with a ",(0,i.jsx)(n.code,{children:"weave.op()"})," decorator and we create our ",(0,i.jsx)(n.code,{children:"Model"})," class. We call ",(0,i.jsx)(n.code,{children:"weave.init('rag-qa')"})," to begin tracking all the inputs and outputs of our functions for later inspection."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'from openai import OpenAI\nimport weave\nfrom weave import Model\nimport numpy as np\nimport asyncio\n\n# highlight-next-line\n@weave.op()\ndef get_most_relevant_document(query):\n    openai = OpenAI()\n    query_embedding = (\n        openai.embeddings.create(input=query, model="text-embedding-3-small")\n        .data[0]\n        .embedding\n    )\n    similarities = [\n        np.dot(query_embedding, doc_emb)\n        / (np.linalg.norm(query_embedding) * np.linalg.norm(doc_emb))\n        for doc_emb in article_embeddings\n    ]\n    # Get the index of the most similar document\n    most_relevant_doc_index = np.argmax(similarities)\n    return articles[most_relevant_doc_index]\n\n# highlight-next-line\nclass RAGModel(Model):\n    system_message: str\n    model_name: str = "gpt-3.5-turbo-1106"\n\n# highlight-next-line\n    @weave.op()\n    def predict(self, question: str) -> dict: # note: `question` will be used later to select data from our evaluation rows\n        from openai import OpenAI\n        context = get_most_relevant_document(question)\n        client = OpenAI()\n        query = f"""Use the following information to answer the subsequent question. If the answer cannot be found, write "I don\'t know."\n        Context:\n        \\"\\"\\"\n        {context}\n        \\"\\"\\"\n        Question: {question}"""\n        response = client.chat.completions.create(\n            model=self.model_name,\n            messages=[\n                {"role": "system", "content": self.system_message},\n                {"role": "user", "content": query},\n            ],\n            temperature=0.0,\n            response_format={"type": "text"},\n        )\n        answer = response.choices[0].message.content\n        return {\'answer\': answer, \'context\': context}\n\n# highlight-next-line\nweave.init(\'rag-qa\')\nmodel = RAGModel(\n    system_message="You are an expert in finance and answer questions related to finance, financial services, and financial markets. When responding based on provided information, be sure to cite the source."\n)\nmodel.predict("What significant result was reported about Zealand Pharma\'s obesity trial?")\n'})}),"\n",(0,i.jsx)(n.h2,{id:"3-evaluating-with-an-llm-judge",children:"3. Evaluating with an LLM Judge"}),"\n",(0,i.jsxs)(n.p,{children:["When there aren't simple ways to evaluate your application, one approach is to use an LLM to evaluate aspects of it. Here is an example of using an LLM judge to try to measure the context precision by prompting it to verify if the context was useful in arriving at the given answer. This prompt was augmented from the popular ",(0,i.jsx)(n.a,{href:"https://docs.ragas.io/",children:"RAGAS framework"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"defining-a-scoring-function",children:"Defining a scoring function"}),"\n",(0,i.jsxs)(n.p,{children:["As we did in the ",(0,i.jsx)(n.a,{href:"/tutorial-eval",children:"Build an Evaluation pipeline tutorial"}),", we'll define a set of example rows to test our app against and a scoring function. Our scoring function will take one row and evaluate it. The input arguments should match with the corresponding keys in our row, so ",(0,i.jsx)(n.code,{children:"question"})," here will be taken from the row dictionary. ",(0,i.jsx)(n.code,{children:"model_output"})," is the output of the model. The input to the model will be taken from the example based on its input argument, so ",(0,i.jsx)(n.code,{children:"question"})," here too. We're using ",(0,i.jsx)(n.code,{children:"async"})," functions so they run fast in parallel. If you need a quick introduction to async, you can find one ",(0,i.jsx)(n.a,{href:"https://docs.python.org/3/library/asyncio.html",children:"here"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'from openai import OpenAI\nimport weave\nimport asyncio\n\n# highlight-next-line\n@weave.op()\nasync def context_precision_score(question, model_output):\n    context_precision_prompt = """Given question, answer and context verify if the context was useful in arriving at the given answer. Give verdict as "1" if useful and "0" if not with json output. \n    Output in only valid JSON format.\n\n    question: {question}\n    context: {context}\n    answer: {answer}\n    verdict: """\n    client = OpenAI()\n\n    prompt = context_precision_prompt.format(\n        question=question,\n        context=model_output[\'context\'],\n        answer=model_output[\'answer\'],\n    )\n\n    response = client.chat.completions.create(\n        model="gpt-4-turbo-preview",\n        messages=[{"role": "user", "content": prompt}],\n        response_format={ "type": "json_object" }\n    )\n    response_message = response.choices[0].message\n    response = json.loads(response_message.content)\n    return {\n        "verdict": int(response["verdict"]) == 1,\n    }\n\nquestions = [\n    {"question": "What significant result was reported about Zealand Pharma\'s obesity trial?"},\n    {"question": "How much did Berkshire Hathaway\'s cash levels increase in the fourth quarter?"},\n    {"question": "What is the goal of Highmark Health\'s integration of Google Cloud and Epic Systems technology?"},\n    {"question": "What were Rivian and Lucid\'s vehicle production forecasts for 2024?"},\n    {"question": "Why was the Norwegian Dawn cruise ship denied access to Mauritius?"},\n    {"question": "Which company achieved the first U.S. moon landing since 1972?"},\n    {"question": "What issue did Intuitive Machines\' lunar lander encounter upon landing on the moon?"}\n]\n# highlight-next-line\nevaluation = weave.Evaluation(dataset=questions, scorers=[context_precision_score])\n# highlight-next-line\nasyncio.run(evaluation.evaluate(model)) # note: you\'ll need to define a model to evaluate\n'})}),"\n",(0,i.jsxs)(n.h3,{id:"optional-defining-a-scorer-class",children:["Optional: Defining a ",(0,i.jsx)(n.code,{children:"Scorer"})," class"]}),"\n",(0,i.jsxs)(n.p,{children:["In some applications we want to create custom evaluation classes - where for example a standardized ",(0,i.jsx)(n.code,{children:"LLMJudge"})," class should be created with specific parameters (e.g. chat model, prompt), specific scoring of each row, and specific calculation of an aggregate score. In order to do that Weave defines a list of ready-to-use ",(0,i.jsx)(n.code,{children:"Scorer"})," classes and also makes it easy to create a custom ",(0,i.jsx)(n.code,{children:"Scorer"})," - in the following we'll see how to create a custom ",(0,i.jsx)(n.code,{children:"class CorrectnessLLMJudge(Scorer)"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"On a high-level the steps to create custom Scorer are quite simple:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Define a custom class that inherits from ",(0,i.jsx)(n.code,{children:"weave.flow.scorer.Scorer"})]}),"\n",(0,i.jsxs)(n.li,{children:["Overwrite the ",(0,i.jsx)(n.code,{children:"score"})," function and add a ",(0,i.jsx)(n.code,{children:"@weave.op()"})," if you want to track each call of the function","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["this function has to define a ",(0,i.jsx)(n.code,{children:"model_output"})," argument where the prediction of the model will be passed to. We define it as type ",(0,i.jsx)(n.code,{children:"Optional[dict]"}),' in case the mode might return "None".']}),"\n",(0,i.jsxs)(n.li,{children:["the rest of the arguments can either be a general ",(0,i.jsx)(n.code,{children:"Any"})," or ",(0,i.jsx)(n.code,{children:"dict"})," or can select specific columns from the dataset that is used to evaluate the model using the ",(0,i.jsx)(n.code,{children:"weave.Evaluate"})," class - they have to have the exact same names as the column names or keys of a single row after being passed to ",(0,i.jsx)(n.code,{children:"preprocess_model_input"})," if that is used."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.em,{children:"Optional:"})," Overwrite the ",(0,i.jsx)(n.code,{children:"summarize"})," function to customize the calculation of the aggregate score. By default Weave uses the ",(0,i.jsx)(n.code,{children:"weave.flow.scorer.auto_summarize"})," function if you don't define a custom function.","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["this function has to have a ",(0,i.jsx)(n.code,{children:"@weave.op()"})," decorator."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'from weave.flow.scorer import Scorer\nfrom weave import WeaveList\n\nclass CorrectnessLLMJudge(Scorer):\n    prompt: str\n    model_name: str\n    device: str\n\n    @weave.op()\n    async def score(self, model_output: Optional[dict], query: str, answer: str) -> Any:\n        """Score the correctness of the predictions by comparing the pred, query, target.\n           Args:\n            - model_output: the dict that will be provided by the model that is evaluated\n            - query: the question asked - as defined in the dataset\n            - answer: the target answer - as defined in the dataset\n           Returns:\n            - single dict {metric name: single evaluation value}"""\n\n        # get_model is defined as general model getter based on provided params (OpenAI,HF...)\n        eval_model = get_model(\n            model_name = self.model_name,\n            prompt = self.prompt\n            device = self.device,\n        )\n        # async evaluation to speed up evaluation - this doesn\'t have to be async\n        grade = await eval_model.async_predict(\n            {\n                "query": query,\n                "answer": answer,\n                "result": model_output.get("result"),\n            }\n        )\n        # output parsing - could be done more reobustly with pydantic\n        evaluation = "incorrect" not in grade["text"].strip().lower()\n\n        # the column name displayed in Weave\n        return {"correct": evaluation}\n\n    @weave.op()\n    def summarize(self, score_rows: WeaveList) -> Optional[dict]:\n        """Aggregate all the scores that are calculated for each row by the scoring function.\n           Args:\n            - score_rows: a WeaveList object, nested dict of metrics and scores\n           Returns:\n            - nested dict with the same structure as the input"""\n        \n        # if nothing is provided the weave.flow.scorer.auto_summarize function is used\n        # return auto_summarize(score_rows)\n\n        valid_data = [x.get("correct") for x in score_rows if x.get("correct") is not None]\n        count_true = list(valid_data).count(True)\n        int_data = [int(x) for x in valid_data]\n\n        sample_mean = np.mean(int_data) if int_data else 0\n        sample_variance = np.var(int_data) if int_data else 0\n        sample_error = np.sqrt(sample_variance / len(int_data)) if int_data else 0\n\n        # the extra "correct" layer is not necessary but adds structure in the UI\n        return {\n            "correct": {\n                "true_count": count_true,\n                "true_fraction": sample_mean,\n                "stderr": sample_error,\n            }\n        }\n'})}),"\n",(0,i.jsxs)(n.p,{children:["To use this as a scorer, you would initialize it and pass it to ",(0,i.jsx)(n.code,{children:"scorers"})," argument in your `Evaluation like this:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:"evaluation = weave.Evaluation(dataset=questions, scorers=[CorrectnessLLMJudge()])\n"})}),"\n",(0,i.jsx)(n.h2,{id:"4-pulling-it-all-together",children:"4. Pulling it all together"}),"\n",(0,i.jsx)(n.p,{children:"To get the same result for your RAG apps:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Wrap LLM calls & retrieval step functions with ",(0,i.jsx)(n.code,{children:"weave.op()"})]}),"\n",(0,i.jsxs)(n.li,{children:["(optional) Create a ",(0,i.jsx)(n.code,{children:"Model"})," subclass with ",(0,i.jsx)(n.code,{children:"predict"})," function and app details"]}),"\n",(0,i.jsx)(n.li,{children:"Collect examples to evaluate"}),"\n",(0,i.jsx)(n.li,{children:"Create scoring functions that score one example"}),"\n",(0,i.jsxs)(n.li,{children:["Use ",(0,i.jsx)(n.code,{children:"Evaluation"})," class to run evaluations on your examples"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"NOTE:"})," Sometimes the async execution of Evaluations will trigger a rate limit on the models of OpenAI, Anthropic, etc. To prevent that you can set an environment variable to limit the amount of parallel workers e.g. ",(0,i.jsx)(n.code,{children:"WEAVE_PARALLELISM=3"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"Here, we show the code in it's entirety."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'from openai import OpenAI\nimport weave\nfrom weave import Model\nimport numpy as np\nimport json\nimport asyncio \n\n# Examples we\'ve gathered that we want to use for evaluations\narticles = [\n    "Novo Nordisk and Eli Lilly rival soars 32 percent after promising weight loss drug results Shares of Denmarks Zealand Pharma shot 32 percent higher in morning trade, after results showed success in its liver disease treatment survodutide, which is also on trial as a drug to treat obesity. The trial \u201ctells us that the 6mg dose is safe, which is the top dose used in the ongoing [Phase 3] obesity trial too,\u201d one analyst said in a note. The results come amid feverish investor interest in drugs that can be used for weight loss.",\n    "Berkshire shares jump after big profit gain as Buffetts conglomerate nears $1 trillion valuation Berkshire Hathaway shares rose on Monday after Warren Buffetts conglomerate posted strong earnings for the fourth quarter over the weekend. Berkshires Class A and B shares jumped more than 1.5%, each. Class A shares are higher by more than 17% this year, while Class B have gained more than 18%. Berkshire was last valued at $930.1 billion, up from $905.5 billion where it closed on Friday, according to FactSet. Berkshire on Saturday posted fourth-quarter operating earnings of $8.481 billion, about 28 percent higher than the $6.625 billion from the year-ago period, driven by big gains in its insurance business. Operating earnings refers to profits from businesses across insurance, railroads and utilities. Meanwhile, Berkshires cash levels also swelled to record levels. The conglomerate held $167.6 billion in cash in the fourth quarter, surpassing the $157.2 billion record the conglomerate held in the prior quarter.",\n    "Highmark Health says its combining tech from Google and Epic to give doctors easier access to information Highmark Health announced it is integrating technology from Google Cloud and the health-care software company Epic Systems. The integration aims to make it easier for both payers and providers to access key information they need, even if its stored across multiple points and formats, the company said. Highmark is the parent company of a health plan with 7 million members, a provider network of 14 hospitals and other entities",\n    "Rivian and Lucid shares plunge after weak EV earnings reports Shares of electric vehicle makers Rivian and Lucid fell Thursday after the companies reported stagnant production in their fourth-quarter earnings after the bell Wednesday. Rivian shares sank about 25 percent, and Lucids stock dropped around 17 percent. Rivian forecast it will make 57,000 vehicles in 2024, slightly less than the 57,232 vehicles it produced in 2023. Lucid said it expects to make 9,000 vehicles in 2024, more than the 8,428 vehicles it made in 2023.",\n    "Mauritius blocks Norwegian cruise ship over fears of a potential cholera outbreak Local authorities on Sunday denied permission for the Norwegian Dawn ship, which has 2,184 passengers and 1,026 crew on board, to access the Mauritius capital of Port Louis, citing \u201cpotential health risks.\u201d The Mauritius Ports Authority said Sunday that samples were taken from at least 15 passengers on board the cruise ship. A spokesperson for the U.S.-headquartered Norwegian Cruise Line Holdings said Sunday that \'a small number of guests experienced mild symptoms of a stomach-related illness\' during Norwegian Dawns South Africa voyage.",\n    "Intuitive Machines lands on the moon in historic first for a U.S. company Intuitive Machines Nova-C cargo lander, named Odysseus after the mythological Greek hero, is the first U.S. spacecraft to soft land on the lunar surface since 1972. Intuitive Machines is the first company to pull off a moon landing \u2014 government agencies have carried out all previously successful missions. The companys stock surged in extended trading Thursday, after falling 11 percent in regular trading.",\n    "Lunar landing photos: Intuitive Machines Odysseus sends back first images from the moon Intuitive Machines cargo moon lander Odysseus returned its first images from the surface. Company executives believe the lander caught its landing gear sideways in the moons surface while touching down and tipped over. Despite resting on its side, the companys historic IM-1 mission is still operating on the moon.",\n]\n\ndef docs_to_embeddings(docs: list) -> list:\n    openai = OpenAI()\n    document_embeddings = []\n    for doc in docs:\n        response = (\n            openai.embeddings.create(input=doc, model="text-embedding-3-small")\n            .data[0]\n            .embedding\n        )\n        document_embeddings.append(response)\n    return document_embeddings\n\narticle_embeddings = docs_to_embeddings(articles) # Note: you would typically do this once with your articles and put the embeddings & metadata in a database\n\n# We\'ve added a decorator to our retrieval step\n# highlight-next-line\n@weave.op()\ndef get_most_relevant_document(query):\n    openai = OpenAI()\n    query_embedding = (\n        openai.embeddings.create(input=query, model="text-embedding-3-small")\n        .data[0]\n        .embedding\n    )\n    similarities = [\n        np.dot(query_embedding, doc_emb)\n        / (np.linalg.norm(query_embedding) * np.linalg.norm(doc_emb))\n        for doc_emb in article_embeddings\n    ]\n    # Get the index of the most similar document\n    most_relevant_doc_index = np.argmax(similarities)\n    return articles[most_relevant_doc_index]\n\n# We create a Model subclass with some details about our app, along with a predict function that produces a response\n# highlight-next-line\nclass RAGModel(Model):\n    system_message: str\n    model_name: str = "gpt-3.5-turbo-1106"\n\n# highlight-next-line\n    @weave.op()\n# highlight-next-line\n    def predict(self, question: str) -> dict: # note: `question` will be used later to select data from our evaluation rows\n        from openai import OpenAI\n        context = get_most_relevant_document(question)\n        client = OpenAI()\n        query = f"""Use the following information to answer the subsequent question. If the answer cannot be found, write "I don\'t know."\n        Context:\n        \\"\\"\\"\n        {context}\n        \\"\\"\\"\n        Question: {question}"""\n        response = client.chat.completions.create(\n            model=self.model_name,\n            messages=[\n                {"role": "system", "content": self.system_message},\n                {"role": "user", "content": query},\n            ],\n            temperature=0.0,\n            response_format={"type": "text"},\n        )\n        answer = response.choices[0].message.content\n        return {\'answer\': answer, \'context\': context}\n\n# highlight-next-line\nweave.init(\'rag-qa\')\n# highlight-next-line\nmodel = RAGModel(\n    system_message="You are an expert in finance and answer questions related to finance, financial services, and financial markets. When responding based on provided information, be sure to cite the source."\n)\n\n# Here is our scoring function uses our question and model_output to product a score\n# highlight-next-line\n@weave.op()\n# highlight-next-line\nasync def context_precision_score(question, model_output):\n    context_precision_prompt = """Given question, answer and context verify if the context was useful in arriving at the given answer. Give verdict as "1" if useful and "0" if not with json output. \n    Output in only valid JSON format.\n\n    question: {question}\n    context: {context}\n    answer: {answer}\n    verdict: """\n    client = OpenAI()\n\n    prompt = context_precision_prompt.format(\n        question=question,\n        context=model_output[\'context\'],\n        answer=model_output[\'answer\'],\n    )\n\n    response = client.chat.completions.create(\n        model="gpt-4-turbo-preview",\n        messages=[{"role": "user", "content": prompt}],\n        response_format={ "type": "json_object" }\n    )\n    response_message = response.choices[0].message\n    response = json.loads(response_message.content)\n    return {\n        "verdict": int(response["verdict"]) == 1,\n    }\n\nquestions = [\n    {"question": "What significant result was reported about Zealand Pharma\'s obesity trial?"},\n    {"question": "How much did Berkshire Hathaway\'s cash levels increase in the fourth quarter?"},\n    {"question": "What is the goal of Highmark Health\'s integration of Google Cloud and Epic Systems technology?"},\n    {"question": "What were Rivian and Lucid\'s vehicle production forecasts for 2024?"},\n    {"question": "Why was the Norwegian Dawn cruise ship denied access to Mauritius?"},\n    {"question": "Which company achieved the first U.S. moon landing since 1972?"},\n    {"question": "What issue did Intuitive Machines\' lunar lander encounter upon landing on the moon?"}\n]\n\n# We define an Evaluation object and pass our example questions along with scoring functions\n# highlight-next-line\nevaluation = weave.Evaluation(dataset=questions, scorers=[context_precision_score])\n# highlight-next-line\nasyncio.run(evaluation.evaluate(model))\n'})}),"\n",(0,i.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,i.jsx)(n.p,{children:"We've learned how to build observability into different steps of our applications, like the retrieval step in this example.\nWe've also learned how to build more complex scoring functions, like an LLM judge, for doing automatic evaluation of application responses."}),"\n",(0,i.jsx)(n.h2,{id:"whats-next",children:"What's next?"}),"\n",(0,i.jsxs)(n.p,{children:["Learn more about Weave's core types ",(0,i.jsx)(n.a,{href:"/guides/core-types",children:"Quickstart"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>r,a:()=>o});var i=t(7294);const s={},a=i.createContext(s);function o(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);