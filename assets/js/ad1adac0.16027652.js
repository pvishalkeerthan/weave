"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1022],{5287:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>l});var s=t(85893),o=t(11151);const a={title:"Log Feedback from Production"},i=void 0,r={id:"reference/gen_notebooks/feedback_prod",title:"Log Feedback from Production",description:"Open in Colab",source:"@site/docs/reference/gen_notebooks/feedback_prod.md",sourceDirName:"reference/gen_notebooks",slug:"/reference/gen_notebooks/feedback_prod",permalink:"/reference/gen_notebooks/feedback_prod",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/reference/gen_notebooks/feedback_prod.md",tags:[],version:"current",lastUpdatedAt:1727449268e3,frontMatter:{title:"Log Feedback from Production"},sidebar:"notebookSidebar",previous:{title:"Prompt Optimization",permalink:"/reference/gen_notebooks/dspy_prompt_optimization"},next:{title:"Log Calls from Existing CSV",permalink:"/reference/gen_notebooks/import_from_csv"}},c={},l=[{value:"Setup",id:"setup",level:2},{value:"Explanation",id:"explanation",level:2},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",p:"p",pre:"pre",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.admonition,{title:"This is a notebook",type:"tip",children:[(0,s.jsx)("a",{href:"https://colab.research.google.com/github/wandb/weave/blob/master/docs/./notebooks/feedback_prod.ipynb",target:"_blank",rel:"noopener noreferrer",class:"navbar__item navbar__link button button--secondary button--med margin-right--sm notebook-cta-button",children:(0,s.jsxs)("div",{children:[(0,s.jsx)("img",{src:"https://upload.wikimedia.org/wikipedia/commons/archive/d/d0/20221103151430%21Google_Colaboratory_SVG_Logo.svg",alt:"Open In Colab",height:"20px"}),(0,s.jsx)("div",{children:"Open in Colab"})]})}),(0,s.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/docs/./notebooks/feedback_prod.ipynb",target:"_blank",rel:"noopener noreferrer",class:"navbar__item navbar__link button button--secondary button--med margin-right--sm notebook-cta-button",children:(0,s.jsxs)("div",{children:[(0,s.jsx)("img",{src:"https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",alt:"View in Github",height:"15px"}),(0,s.jsx)("div",{children:"View in Github"})]})})]}),"\n",(0,s.jsx)("img",{src:"http://wandb.me/logo-im-png",width:"400",alt:"Weights & Biases"}),"\n",(0,s.jsx)(n.p,{children:"It is often hard to automatically evaluate a generated LLM response so, depending on your risk tolerance, you can gather direct user feedback to find areas to improve."}),"\n",(0,s.jsx)(n.p,{children:"In this tutorial, we'll use a custom RAG chatbot as an example app with which the users can interact and which allows us to collect user feedback.\nWe'll use Streamlit to build the interface and we'll capture the LLM interactions and feedback in Weave."}),"\n",(0,s.jsx)(n.h2,{id:"setup",children:"Setup"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:"!pip install weave openai streamlit\n"})}),"\n",(0,s.jsxs)(n.p,{children:["First, create a file called ",(0,s.jsx)(n.code,{children:"secrets.toml"})," and add an OpenAI key so it works with ",(0,s.jsx)(n.a,{href:"https://docs.streamlit.io/develop/api-reference/connections/st.secrets",children:"st.secrets"}),". You can ",(0,s.jsx)(n.a,{href:"https://platform.openai.com/signup",children:"sign up"})," on the OpenAI platform to get your own API key."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:'# secrets.toml\nOPENAI_API_KEY = "your OpenAI key"\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Next, create a file called ",(0,s.jsx)(n.code,{children:"chatbot.py"})," with the following contents:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:'# chatbot.py\n\nimport streamlit as st\nfrom openai import OpenAI\n\nimport weave\n\nst.title("Add feedback")\n\n\n# highlight-next-line\n@weave.op\ndef chat_response(prompt):\n    stream = client.chat.completions.create(\n        model="gpt-4o",\n        messages=[\n            {"role": "user", "content": prompt},\n            *[\n                {"role": m["role"], "content": m["content"]}\n                for m in st.session_state.messages\n            ],\n        ],\n        stream=True,\n    )\n    response = st.write_stream(stream)\n    return {"response": response}\n\n\nclient = OpenAI(api_key=st.secrets["OPENAI_API_KEY"])\n# highlight-next-line\nweave_client = weave.init("feedback-example")\n\n\ndef display_chat_messages():\n    for message in st.session_state.messages:\n        with st.chat_message(message["role"]):\n            st.markdown(message["content"])\n\n\ndef get_and_process_prompt():\n    if prompt := st.chat_input("What is up?"):\n        st.session_state.messages.append({"role": "user", "content": prompt})\n\n        with st.chat_message("user"):\n            st.markdown(prompt)\n\n        with st.chat_message("assistant"):\n            # highlight-next-line\n            with weave.attributes(\n                {"session": st.session_state["session_id"], "env": "prod"}\n            ):\n                # This could also be weave model.predict.call if you\'re using a weave.Model subclass\n                result, call = chat_response.call(\n                    prompt\n                )  # call the function with `.call`, this returns a tuple with a new Call object\n                # highlight-next-line\n                st.button(\n                    ":thumbsup:",\n                    on_click=lambda: call.feedback.add_reaction("\ud83d\udc4d"),\n                    key="up",\n                )\n                # highlight-next-line\n                st.button(\n                    ":thumbsdown:",\n                    on_click=lambda: call.feedback.add_reaction("\ud83d\udc4e"),\n                    key="down",\n                )\n                st.session_state.messages.append(\n                    {"role": "assistant", "content": result["response"]}\n                )\n\n\ndef init_chat_history():\n    if "messages" not in st.session_state:\n        st.session_state.messages = st.session_state.messages = []\n\n\ndef main():\n    st.session_state["session_id"] = "123abc"\n    init_chat_history()\n    display_chat_messages()\n    get_and_process_prompt()\n\n\nif __name__ == "__main__":\n    main()\n'})}),"\n",(0,s.jsxs)(n.p,{children:["You can run this with ",(0,s.jsx)(n.code,{children:"streamlit run chatbot.py"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"Now, you can interact with this application and click the feedback buttons after each response.\nVisit the Weave UI to see the attached feedback."}),"\n",(0,s.jsx)(n.h2,{id:"explanation",children:"Explanation"}),"\n",(0,s.jsx)(n.p,{children:"If we consider our decorated prediction function as:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:'import weave\n\nweave.init("feedback-example")\n\n\n# highlight-next-line\n@weave.op\ndef predict(input_data):\n    # Your prediction logic here\n    some_result = "hello world"\n    return some_result\n'})}),"\n",(0,s.jsx)(n.p,{children:"We can use it as usual to deliver some model response to the user:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:'with weave.attributes(\n    {"session": "123abc", "env": "prod"}\n):  # attach arbitrary attributes to the call alongside inputs & outputs\n    result = predict(input_data="your data here")  # user question through the App UI\n'})}),"\n",(0,s.jsxs)(n.p,{children:["To attach feedback, you need the ",(0,s.jsx)(n.code,{children:"call"})," object, which is obtained by using the ",(0,s.jsx)(n.code,{children:".call()"})," method ",(0,s.jsx)(n.em,{children:"instead of calling the function as normal"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:'result, call = predict.call(input_data="your data here")\n'})}),"\n",(0,s.jsxs)(n.p,{children:["This call object is needed for attaching feedback to the specific response.\nAfter making the call, the output of the operation is available using ",(0,s.jsx)(n.code,{children:"result"})," above."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-python",children:'call.feedback.add_reaction("\ud83d\udc4d")  # user reaction through the App UI\n'})}),"\n",(0,s.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,s.jsx)(n.p,{children:"In this tutorial, we built a chat UI with Streamlit which had inputs & outputs captured in Weave, alongside \ud83d\udc4d\ud83d\udc4e buttons to capture user feedback."})]})}function h(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>r,a:()=>i});var s=t(67294);const o={},a=s.createContext(o);function i(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);