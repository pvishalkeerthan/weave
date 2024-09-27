"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3669],{75559:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>s,metadata:()=>r,toc:()=>l});var o=t(85893),a=t(11151);const s={},i="OpenAI",r={id:"guides/integrations/openai",title:"OpenAI",description:"Tracing",source:"@site/docs/guides/integrations/openai.md",sourceDirName:"guides/integrations",slug:"/guides/integrations/openai",permalink:"/guides/integrations/openai",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/guides/integrations/openai.md",tags:[],version:"current",lastUpdatedAt:1727449268e3,frontMatter:{},sidebar:"documentationSidebar",previous:{title:"Integrations",permalink:"/guides/integrations/"},next:{title:"Anthropic",permalink:"/guides/integrations/anthropic"}},c={},l=[{value:"Tracing",id:"tracing",level:2},{value:"Track your own ops",id:"track-your-own-ops",level:2},{value:"Create a <code>Model</code> for easier experimentation",id:"create-a-model-for-easier-experimentation",level:2},{value:"Usage Info",id:"usage-info",level:2},{value:"Support for deprecated function calling",id:"support-for-deprecated-function-calling",level:2}];function p(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",img:"img",p:"p",pre:"pre",...(0,a.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"openai",children:"OpenAI"}),"\n",(0,o.jsx)(n.h2,{id:"tracing",children:"Tracing"}),"\n",(0,o.jsx)(n.p,{children:"It\u2019s important to store traces of LLM applications in a central database, both during development and in production. You\u2019ll use these traces for debugging and to help build a dataset of tricky examples to evaluate against while improving your application."}),"\n",(0,o.jsxs)(n.p,{children:["Weave can automatically capture traces for the ",(0,o.jsx)(n.a,{href:"https://platform.openai.com/docs/reference/python-sdk?lang=python",children:"openai python library"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:["Start capturing by calling ",(0,o.jsx)(n.code,{children:"weave.init(<project-name>)"})," with a project name your choice."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:'from openai import OpenAI\nimport weave\nclient = OpenAI()\n# highlight-next-line\nweave.init(\'emoji-bot\')\n\nresponse = client.chat.completions.create(\n  model="gpt-4",\n  messages=[\n    {\n      "role": "system",\n      "content": "You are AGI. You will be provided with a message, and your task is to respond using emojis only."\n    },\n    {\n      "role": "user",\n      "content": "How are you?"\n    }\n  ],\n  temperature=0.8,\n  max_tokens=64,\n  top_p=1\n)\n'})}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.a,{href:"https://wandb.ai/_scott/emoji-bot/weave/calls",children:(0,o.jsx)(n.img,{alt:"openai.png",src:t(38681).Z+"",width:"2702",height:"1210"})})}),"\n",(0,o.jsx)(n.h2,{id:"track-your-own-ops",children:"Track your own ops"}),"\n",(0,o.jsxs)(n.p,{children:["Wrapping a function with ",(0,o.jsx)(n.code,{children:"@weave.op"})," starts capturing inputs, outputs and app logic so you can debug how data flows through your app. You can deeply nest ops and build a tree of functions that you want to track. This also starts automatically versioning code as you experiment to capture ad-hoc details that haven't been committed to git."]}),"\n",(0,o.jsxs)(n.p,{children:["Simply create a function decorated with ",(0,o.jsx)(n.a,{href:"/guides/tracking/ops",children:(0,o.jsx)(n.code,{children:"@weave.op"})})," that calls into ",(0,o.jsx)(n.a,{href:"https://platform.openai.com/docs/reference/python-sdk?lang=python",children:"openai python library"}),"."]}),"\n",(0,o.jsx)(n.p,{children:"In the example below, we have 2 functions wrapped with op. This helps us see how intermediate steps, like the retrieval step in a RAG app, are affecting how our app behaves."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:'# highlight-next-line\nimport weave\nfrom openai import OpenAI\nimport requests, random\nPROMPT="""Emulate the Pokedex from early Pok\xe9mon episodes. State the name of the Pokemon and then describe it.\n        Your tone is informative yet sassy, blending factual details with a touch of dry humor. Be concise, no more than 3 sentences. """\nPOKEMON = [\'pikachu\', \'charmander\', \'squirtle\', \'bulbasaur\', \'jigglypuff\', \'meowth\', \'eevee\']\nclient = OpenAI()\n\n# highlight-next-line\n@weave.op\ndef get_pokemon_data(pokemon_name):\n    # highlight-next-line\n    # This is a step within your application, like the retrieval step within a RAG app\n    url = f"https://pokeapi.co/api/v2/pokemon/{pokemon_name}"\n    response = requests.get(url)\n    if response.status_code == 200:\n        data = response.json()\n        name = data["name"]\n        types = [t["type"]["name"] for t in data["types"]]\n        species_url = data["species"]["url"]\n        species_response = requests.get(species_url)\n        evolved_from = "Unknown"\n        if species_response.status_code == 200:\n            species_data = species_response.json()\n            if species_data["evolves_from_species"]:\n                evolved_from = species_data["evolves_from_species"]["name"]\n        return {"name": name, "types": types, "evolved_from": evolved_from}\n    else:\n        return None\n\n# highlight-next-line\n@weave.op\ndef pokedex(name: str, prompt: str) -> str:\n    # highlight-next-line\n    # This is your root op that calls out to other ops\n    # highlight-next-line\n    data = get_pokemon_data(name) \n    if not data: return "Error: Unable to fetch data"\n    response = client.chat.completions.create(\n        model="gpt-3.5-turbo",\n        messages=[\n            {"role": "system","content": prompt},\n            {"role": "user", "content": str(data)}\n        ],\n        temperature=0.7,\n        max_tokens=100,\n        top_p=1\n    )\n    return response.choices[0].message.content\n\n# highlight-next-line\nweave.init(\'pokedex-openai\')\n# Get data for a specific Pok\xe9mon\npokemon_data = pokedex(random.choice(POKEMON), PROMPT)\n'})}),"\n",(0,o.jsxs)(n.p,{children:["Navigate to Weave and you can click ",(0,o.jsx)(n.code,{children:"get_pokemon_data"})," in the UI to see the inputs & outputs of that step."]}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.a,{href:"https://wandb.ai/_scott/pokedex-openai/weave",children:(0,o.jsx)(n.img,{alt:"openai-pokedex.png",src:t(13610).Z+"",width:"2704",height:"1562"})})}),"\n",(0,o.jsxs)(n.h2,{id:"create-a-model-for-easier-experimentation",children:["Create a ",(0,o.jsx)(n.code,{children:"Model"})," for easier experimentation"]}),"\n",(0,o.jsxs)(n.p,{children:["Organizing experimentation is difficult when there are many moving pieces. By using the ",(0,o.jsx)(n.a,{href:"/guides/core-types/models",children:(0,o.jsx)(n.code,{children:"Model"})})," class, you can capture and organize the experimental details of your app like your system prompt or the model you're using. This helps organize and compare different iterations of your app."]}),"\n",(0,o.jsxs)(n.p,{children:["In addition to versioning code and capturing inputs/outputs, ",(0,o.jsx)(n.a,{href:"/guides/core-types/models",children:(0,o.jsx)(n.code,{children:"Model"})}),"s capture structured parameters that control your application\u2019s behavior, making it easy to find what parameters worked best. You can also use Weave Models with ",(0,o.jsx)(n.code,{children:"serve"}),", and ",(0,o.jsx)(n.a,{href:"/guides/core-types/evaluations",children:(0,o.jsx)(n.code,{children:"Evaluation"})}),"s."]}),"\n",(0,o.jsxs)(n.p,{children:["In the example below, you can experiment with ",(0,o.jsx)(n.code,{children:"model"})," and ",(0,o.jsx)(n.code,{children:"system_message"}),". Every time you change one of these, you'll get a new ",(0,o.jsx)(n.em,{children:"version"})," of ",(0,o.jsx)(n.code,{children:"GrammarCorrectorModel"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-python",children:'import weave\nfrom openai import OpenAI\n\nweave.init(\'grammar-openai\')\n\nclass GrammarCorrectorModel(weave.Model): # Change to `weave.Model`\n  model: str\n  system_message: str\n\n  @weave.op()\n  def predict(self, user_input): # Change to `predict`\n    client = OpenAI()\n    response = client.chat.completions.create(\n      model=self.model,\n      messages=[\n          {\n              "role": "system",\n              "content": self.system_message\n          },\n          {\n              "role": "user",\n              "content": user_input\n          }\n          ],\n          temperature=0,\n    )\n    return response.choices[0].message.content\n\n\ncorrector = GrammarCorrectorModel(\n    model="gpt-3.5-turbo-1106",\n    system_message = "You are a grammar checker, correct the following user input.")\nresult = corrector.predict("That was so easy, it was a piece of pie!")\nprint(result)\n'})}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.a,{href:"https://wandb.ai/_scott/grammar-openai/weave/calls",children:(0,o.jsx)(n.img,{alt:"openai-model.png",src:t(60043).Z+"",width:"3146",height:"904"})})}),"\n",(0,o.jsx)(n.h2,{id:"usage-info",children:"Usage Info"}),"\n",(0,o.jsxs)(n.p,{children:["The OpenAI calls return usage info as a default when ",(0,o.jsx)(n.code,{children:"stream=False"}),". Weave will track this usage info and log it to weave to render token counts and cost of the call."]}),"\n",(0,o.jsxs)(n.p,{children:["In case you set ",(0,o.jsx)(n.code,{children:"stream=True"}),", we will automatically patch the call execution with ",(0,o.jsx)(n.code,{children:'stream_options={"include_usage": True}'})," argument. This will return the usage info in the last chunk to be rendered in the UI. As a user, the stream iterator will not contain this info."]}),"\n",(0,o.jsxs)(n.p,{children:["If you explicitly set ",(0,o.jsx)(n.code,{children:"stream=True"})," and ",(0,o.jsx)(n.code,{children:'stream_options={"include_usage": True}'}),", the returned stream object will contain the usage info. If you don't want to track the usage info you need to explicitly set ",(0,o.jsx)(n.code,{children:'stream_options={"include_usage": False}'}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"support-for-deprecated-function-calling",children:"Support for deprecated function calling"}),"\n",(0,o.jsxs)(n.p,{children:["OpenAI deprecated the ",(0,o.jsx)(n.code,{children:"functions"})," argument in favor of ",(0,o.jsx)(n.code,{children:"tool_calls"}),". Since frameworks like Langchain, LlamaIndex, etc., still support this argument our OpenAI weave integration will trace if you pass list of function schemas to ",(0,o.jsx)(n.code,{children:"functions"})," argument."]})]})}function d(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},60043:(e,n,t)=>{t.d(n,{Z:()=>o});const o=t.p+"assets/images/openai-model-e4e99d2e70c70dc0ca90a1a1239ca362.png"},13610:(e,n,t)=>{t.d(n,{Z:()=>o});const o=t.p+"assets/images/openai-pokedex-1341c61785bb9741747674bb972f4cf2.png"},38681:(e,n,t)=>{t.d(n,{Z:()=>o});const o=t.p+"assets/images/openai-e0ee7c2556e31b5be214811ee97caa7d.png"},11151:(e,n,t)=>{t.d(n,{Z:()=>r,a:()=>i});var o=t(67294);const a={},s=o.createContext(a);function i(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);