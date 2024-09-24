"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8847],{83330:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>c,metadata:()=>r,toc:()=>o});var i=t(85893),s=t(11151);const c={},a="Objects",r={id:"guides/tracking/objects",title:"Objects",description:"Weave's serialization layer saves and versions Python objects.",source:"@site/docs/guides/tracking/objects.md",sourceDirName:"guides/tracking",slug:"/guides/tracking/objects",permalink:"/guides/tracking/objects",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/guides/tracking/objects.md",tags:[],version:"current",lastUpdatedAt:1727194842e3,frontMatter:{},sidebar:"documentationSidebar",previous:{title:"Ops",permalink:"/guides/tracking/ops"},next:{title:"Models",permalink:"/guides/core-types/models"}},l={},o=[{value:"Publishing an object",id:"publishing-an-object",level:2},{value:"Getting an object back",id:"getting-an-object-back",level:2},{value:"Ref styles",id:"ref-styles",level:2}];function d(e){const n={code:"code",em:"em",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"objects",children:"Objects"}),"\n",(0,i.jsx)(n.p,{children:"Weave's serialization layer saves and versions Python objects."}),"\n",(0,i.jsx)(n.h2,{id:"publishing-an-object",children:"Publishing an object"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:"import weave\n# Initialize tracking to the project 'intro-example'\nweave.init('intro-example')\n# Save a list, giving it the name 'cat-names'\nweave.publish(['felix', 'jimbo', 'billie'], 'cat-names')\n"})}),"\n",(0,i.jsx)(n.p,{children:"Saving an object with a name will create the first version of that object if it doesn't exist."}),"\n",(0,i.jsx)(n.h2,{id:"getting-an-object-back",children:"Getting an object back"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"weave.publish"})," returns a Ref. You can call ",(0,i.jsx)(n.code,{children:".get()"})," on any Ref to get the object back."]}),"\n",(0,i.jsx)(n.p,{children:"You can construct a ref and then fetch the object back."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:"weave.init('intro-example')\ncat_names = weave.ref('cat-names').get()\n"})}),"\n",(0,i.jsx)(n.h2,{id:"ref-styles",children:"Ref styles"}),"\n",(0,i.jsx)(n.p,{children:"A fully qualified weave object ref uri looks like this:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"weave:///<entity>/<project>/object/<object_name>:<object_version>\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.em,{children:"entity"}),": wandb entity (username or team)"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.em,{children:"project"}),": wandb project"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.em,{children:"object_name"}),": object name"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.em,{children:"object_version"}),': either a version hash, a string like v0, v1..., or an alias like "',":latest",'". All objects have the "',":latest",'" alias.']}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Refs can be constructed with a few different styles"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"weave.ref(<name>)"}),": requires ",(0,i.jsx)(n.code,{children:"weave.init(<project>)"}),' to have been called. Refers to the "',":latest",'" version']}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"weave.ref(<name>:<version>)"}),": requires ",(0,i.jsx)(n.code,{children:"weave.init(<project>)"})," to have been called."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"weave.ref(<fully_qualified_ref_uri>)"}),": can be constructed without calling weave.init"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>r,a:()=>a});var i=t(67294);const s={},c=i.createContext(s);function a(e){const n=i.useContext(c);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(c.Provider,{value:n},e.children)}}}]);