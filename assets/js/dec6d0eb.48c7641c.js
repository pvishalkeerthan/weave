"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5582],{44098:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>d,contentTitle:()=>s,default:()=>u,frontMatter:()=>r,metadata:()=>a,toc:()=>l});var n=o(85893),i=o(11151);const r={},s="Models",a={id:"guides/core-types/models",title:"Models",description:"A Model is a combination of data (which can include configuration, trained model weights, or other information) and code that defines how the model operates. By structuring your code to be compatible with this API, you benefit from a structured way to version your application so you can more systematically keep track of your experiments.",source:"@site/docs/guides/core-types/models.md",sourceDirName:"guides/core-types",slug:"/guides/core-types/models",permalink:"/guides/core-types/models",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/guides/core-types/models.md",tags:[],version:"current",lastUpdatedAt:172731962e4,frontMatter:{},sidebar:"documentationSidebar",previous:{title:"Objects",permalink:"/guides/tracking/objects"},next:{title:"Datasets",permalink:"/guides/core-types/datasets"}},d={},l=[{value:"Automatic versioning of models",id:"automatic-versioning-of-models",level:2},{value:"Serve models",id:"serve-models",level:2},{value:"Track production calls",id:"track-production-calls",level:2}];function c(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"models",children:"Models"}),"\n",(0,n.jsxs)(t.p,{children:["A ",(0,n.jsx)(t.code,{children:"Model"})," is a combination of data (which can include configuration, trained model weights, or other information) and code that defines how the model operates. By structuring your code to be compatible with this API, you benefit from a structured way to version your application so you can more systematically keep track of your experiments."]}),"\n",(0,n.jsx)(t.p,{children:"To create a model in Weave, you need the following:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["a class that inherits from ",(0,n.jsx)(t.code,{children:"weave.Model"})]}),"\n",(0,n.jsx)(t.li,{children:"type definitions on all attributes"}),"\n",(0,n.jsxs)(t.li,{children:["a typed ",(0,n.jsx)(t.code,{children:"predict"})," function with ",(0,n.jsx)(t.code,{children:"@weave.op()"})," decorator"]}),"\n"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:"from weave import Model\nimport weave\n\nclass YourModel(Model):\n    attribute1: str\n    attribute2: int\n\n    @weave.op()\n    def predict(self, input_data: str) -> dict:\n        # Model logic goes here\n        prediction = self.attribute1 + ' ' + input_data\n        return {'pred': prediction}\n"})}),"\n",(0,n.jsx)(t.p,{children:"You can call the model as usual with:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:"import weave\nweave.init('intro-example')\n\nmodel = YourModel(attribute1='hello', attribute2=5)\nmodel.predict('world')\n"})}),"\n",(0,n.jsxs)(t.p,{children:["This will track the model settings along with the inputs and outputs anytime you call ",(0,n.jsx)(t.code,{children:"predict"}),"."]}),"\n",(0,n.jsx)(t.h2,{id:"automatic-versioning-of-models",children:"Automatic versioning of models"}),"\n",(0,n.jsx)(t.p,{children:"When you change the attributes or the code that defines your model, these changes will be logged and the version will be updated.\nThis ensures that you can compare the predictions across different versions of your model. Use this to iterate on prompts or to try the latest LLM and compare predictions across different settings."}),"\n",(0,n.jsx)(t.p,{children:"For example, here we create a new model:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:"import weave\nweave.init('intro-example')\n\nmodel = YourModel(attribute1='howdy', attribute2=10)\nmodel.predict('world')\n"})}),"\n",(0,n.jsx)(t.p,{children:"After calling this, you will see that you now have two versions of this Model in the UI, each with different tracked calls."}),"\n",(0,n.jsx)(t.h2,{id:"serve-models",children:"Serve models"}),"\n",(0,n.jsx)(t.p,{children:"To serve a model, you can easily spin up a FastAPI server by calling:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"weave serve <your model ref>\n"})}),"\n",(0,n.jsxs)(t.p,{children:["For additional instructions, see ",(0,n.jsx)(t.a,{href:"/guides/tools/serve",children:"serve"}),"."]}),"\n",(0,n.jsx)(t.h2,{id:"track-production-calls",children:"Track production calls"}),"\n",(0,n.jsx)(t.p,{children:"To separate production calls, you can add an additional attribute to the predictions for easy filtering in the UI or API."}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:"with weave.attributes({'env': 'production'}):\n    model.predict('world')\n"})})]})}function u(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},11151:(e,t,o)=>{o.d(t,{Z:()=>a,a:()=>s});var n=o(67294);const i={},r=n.createContext(i);function s(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);