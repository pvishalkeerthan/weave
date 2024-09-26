"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[805],{20748:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>d});var t=n(85893),s=n(11151);const a={sidebar_position:2,hide_table_of_contents:!0},i="Integrating with Weave: Case Study - Custom Dashboard for Production Monitoring",r={id:"guides/cookbooks/prod_dashboard",title:"Integrating with Weave: Case Study - Custom Dashboard for Production Monitoring",description:"When we consider how well Weave can be intergated in existing processes and AI Apps we consider data input and data output as the two fundemantal characteristics:",source:"@site/docs/guides/cookbooks/prod_dashboard.md",sourceDirName:"guides/cookbooks",slug:"/guides/cookbooks/prod_dashboard",permalink:"/guides/cookbooks/prod_dashboard",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/guides/cookbooks/prod_dashboard.md",tags:[],version:"current",lastUpdatedAt:172731962e4,sidebarPosition:2,frontMatter:{sidebar_position:2,hide_table_of_contents:!0}},c={},d=[];function l(e){const o={code:"code",h1:"h1",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.h1,{id:"integrating-with-weave-case-study---custom-dashboard-for-production-monitoring",children:"Integrating with Weave: Case Study - Custom Dashboard for Production Monitoring"}),"\n",(0,t.jsx)(o.p,{children:"When we consider how well Weave can be intergated in existing processes and AI Apps we consider data input and data output as the two fundemantal characteristics:"}),"\n",(0,t.jsxs)(o.ol,{children:["\n",(0,t.jsxs)(o.li,{children:["\n",(0,t.jsx)(o.p,{children:(0,t.jsx)(o.strong,{children:"Data Input:"})}),"\n",(0,t.jsxs)(o.ul,{children:["\n",(0,t.jsxs)(o.li,{children:[(0,t.jsx)(o.strong,{children:"Framework Agnostic Tracing:"})," Many different tools, packages, frameworks are used to create LLM apps (LangChain, LangGraph, LlamaIndex, AutoGen, CrewAI). Weave's single ",(0,t.jsx)(o.code,{children:"@weave-op()"})," decorator makes it very easy to integrate with any framework and custom objects (THERE SHOULD BE A COOKBOOK FOR HOW TO INTEGRATE AND HOW TO DEAL WITH CUSTOM OBJECTS INCL. SERIALIZATION). For most common frameworks our team already did that making the tracking of apps as easy as initializing Weave before the start of the application. For how feedback can be flexibly integrated into Weave check out the Cookbook Series on Feedback (ADD LINK TO OTHER COOKBOOK HERE)."]}),"\n",(0,t.jsxs)(o.li,{children:[(0,t.jsx)(o.strong,{children:"Openning API endpoints (soon):"})," LLM applications are very diverse (webpage in typescript, python scripts, java backends, on-device apps) but should still be trckable and traceable from anywhere. For most use-cases Weave is already proving native support (python and typescript coming soon), for the rest Weave makes it very easy to log traces or connect with existing tools (ONE AVAILABLE A COOKBOOK SHOULD BE LAUNCHED ONCE THE NEW APIs ARE EXPOSED)."]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(o.li,{children:["\n",(0,t.jsxs)(o.p,{children:[(0,t.jsx)(o.strong,{children:"Data Output"}),": Weave focuses on a) online monitoring (tracing generations, tracking governance metrics such as cost, latency, tokens) and b) offline evaluations (systematic benchmarking on eval datasets, human feedback loops, LLM judges, side-by-side comparisons). For both parts Weave provides strong visulalization capabiltities through the Weave UI. Sometimes, creating a visual extension based on the specific business or monitoring requirements makes sense - this is what we'll discover in this cookbook (SEEMS LIKE IN THE FUTURE WE'LL HAVE WEAVE BOARDS BACK FOR THAT)."]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(o.p,{children:"The introduction, specific use-case that we consider in this cookbook:"}),"\n",(0,t.jsxs)(o.ul,{children:["\n",(0,t.jsx)(o.li,{children:"In  this cookbook we show how Weave's exposed APIs and functions make it very easy to create a custom dashboard for production monitoring as an extension to the Traces view in Weave."}),"\n",(0,t.jsx)(o.li,{children:"We will focus on creating aggregate views of the cost, latency, tokens, and provided user-feedback"}),"\n",(0,t.jsx)(o.li,{children:"We will focus on providing aggregation functions across models, calls, and projects"}),"\n",(0,t.jsx)(o.li,{children:"We will take a look at how to add alerts and guardrailes (GOOD FOR OTHER COOKBOOKS)"}),"\n"]})]})}function h(e={}){const{wrapper:o}={...(0,s.a)(),...e.components};return o?(0,t.jsx)(o,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},11151:(e,o,n)=>{n.d(o,{Z:()=>r,a:()=>i});var t=n(67294);const s={},a=t.createContext(s);function i(e){const o=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function r(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),t.createElement(a.Provider,{value:o},e.children)}}}]);