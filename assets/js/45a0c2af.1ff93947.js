"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7839],{8091:(e,s,a)=>{a.r(s),a.d(s,{assets:()=>N,contentTitle:()=>f,default:()=>B,frontMatter:()=>b,metadata:()=>_,toc:()=>v});var i=a(85893),l=a(11151),n=a(58219),c=a.n(n),r=(a(62316),a(51039)),t=a.n(r),d=(a(82723),a(9487)),o=a.n(d),m=(a(41429),a(5397)),p=a.n(m),h=a(4667),j=a.n(h),x=a(9472),u=a.n(x),y=(a(1176),a(92503)),g=(a(12005),a(85162));const b={id:"call-start-batch-call-upsert-batch-post",title:"Call Start Batch",description:"Call Start Batch",sidebar_label:"Call Start Batch",hide_title:!0,hide_table_of_contents:!0,api:"eJydVt9P20AM/leqey5t6GCa8gaMaUhDVLTbw6qqcpOjPZbkbveDUlX532ffpU1SSmG80Itj+z5//uywYRYWhsUTdgVZZti0y6TiGqyQxU3KYpageWYsaDubg02WM29wyvCdRUljWZdp/tdxYy9lumbxhiWysLywdASlMpH4nP1HIwuymWTJc6CT0nSjFdzQk09JB2F57i1QrO8eEOGG2bXiCEnOH3myvVFonhJ8PBN4K2xGPlTNJaUaEfRbmXJWdj+W4bpIQ/y07G4TgNawZrWzd2Rl7XDwhlDb3h1XmoPlPsE9IigpSR1ktePeYJQsTKBoEEX0k3KTaKGIVUw1cknCjXlwWee+csbbP9gEHX7+swUiJUY0JHyGx70yfR8Q2cE2NB2Rbu92hG3//g2uqYRjTFMGynE2GLwk8xdkIvVUda61lvrjTKbcgshaZLYdMpkcp9pYLYpFkzaBSBZcH6XohwwAMY7lZkGZ2/lq11uUDSxoPiqX1109GZ0xvX2Lf6orXF35NZpR0xvYfb2Mr4G+Q5dtXb6Px8MXCUNvDU+cFnbt6SS/SzAC6Z5MS0TTbjkJpONF2gnDjOC5XUragdWCU2BxM7E+bcB+cwMyuko/cW38TU5jw9nSWmXift8PRG8FRTrvgWB08xbXiEQTZNBAt6OfMlBq74XPc/+eCiPV3dfr9voZcpXxxvpEFDntLOohlhR643XqH4MKiUia1Eaj209SzQrIW0pIhVEZrF/Yd2PfsCnQODF7Rg+ApzNAFLjJBmcn0ZeT02gcRfH5eRx96kXnn3+jH1iMmDvr6cGSRaGcrc6r+cwh4XuZ0apd0TKSCnZM8CKteaCHd7KAru/Ay58TvtVSTaCziDqANi7PQdOnkcQ59SU9SN/uSsnfwNiL4Q3GkZRCqqh32otoQEiDOfhdU3F/QLEtSe90ZPmz7WPXhN8GXp2bSswT/33HyJacUaJLkjy+3mxQdfynzsqSzCg5KmGCxyfQAuYEfELFLDmkuJNIeX/4muCFhXnitwW5Z85P+P7ypA6FiIuEKDzqO21M5fBuNEbnefX/RtVlDSvqMv6NmZcwRYePGtlw4UKxcLTvYhZy0kCBs8sGY2HSutVvYxnjdm7g8+SI5AKDfyJ91BekqVuV4ypTc3W/Gj8EY1ZSp414VZloz5flP3dDR1Y=",sidebar_class_name:"post api-method",info_path:"reference/service-api/fastapi",custom_edit_url:null},f=void 0,_={id:"reference/service-api/call-start-batch-call-upsert-batch-post",title:"Call Start Batch",description:"Call Start Batch",source:"@site/docs/reference/service-api/call-start-batch-call-upsert-batch-post.api.mdx",sourceDirName:"reference/service-api",slug:"/reference/service-api/call-start-batch-call-upsert-batch-post",permalink:"/weave/reference/service-api/call-start-batch-call-upsert-batch-post",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"call-start-batch-call-upsert-batch-post",title:"Call Start Batch",description:"Call Start Batch",sidebar_label:"Call Start Batch",hide_title:!0,hide_table_of_contents:!0,api:"eJydVt9P20AM/leqey5t6GCa8gaMaUhDVLTbw6qqcpOjPZbkbveDUlX532ffpU1SSmG80Itj+z5//uywYRYWhsUTdgVZZti0y6TiGqyQxU3KYpageWYsaDubg02WM29wyvCdRUljWZdp/tdxYy9lumbxhiWysLywdASlMpH4nP1HIwuymWTJc6CT0nSjFdzQk09JB2F57i1QrO8eEOGG2bXiCEnOH3myvVFonhJ8PBN4K2xGPlTNJaUaEfRbmXJWdj+W4bpIQ/y07G4TgNawZrWzd2Rl7XDwhlDb3h1XmoPlPsE9IigpSR1ktePeYJQsTKBoEEX0k3KTaKGIVUw1cknCjXlwWee+csbbP9gEHX7+swUiJUY0JHyGx70yfR8Q2cE2NB2Rbu92hG3//g2uqYRjTFMGynE2GLwk8xdkIvVUda61lvrjTKbcgshaZLYdMpkcp9pYLYpFkzaBSBZcH6XohwwAMY7lZkGZ2/lq11uUDSxoPiqX1109GZ0xvX2Lf6orXF35NZpR0xvYfb2Mr4G+Q5dtXb6Px8MXCUNvDU+cFnbt6SS/SzAC6Z5MS0TTbjkJpONF2gnDjOC5XUragdWCU2BxM7E+bcB+cwMyuko/cW38TU5jw9nSWmXift8PRG8FRTrvgWB08xbXiEQTZNBAt6OfMlBq74XPc/+eCiPV3dfr9voZcpXxxvpEFDntLOohlhR643XqH4MKiUia1Eaj209SzQrIW0pIhVEZrF/Yd2PfsCnQODF7Rg+ApzNAFLjJBmcn0ZeT02gcRfH5eRx96kXnn3+jH1iMmDvr6cGSRaGcrc6r+cwh4XuZ0apd0TKSCnZM8CKteaCHd7KAru/Ay58TvtVSTaCziDqANi7PQdOnkcQ59SU9SN/uSsnfwNiL4Q3GkZRCqqh32otoQEiDOfhdU3F/QLEtSe90ZPmz7WPXhN8GXp2bSswT/33HyJacUaJLkjy+3mxQdfynzsqSzCg5KmGCxyfQAuYEfELFLDmkuJNIeX/4muCFhXnitwW5Z85P+P7ypA6FiIuEKDzqO21M5fBuNEbnefX/RtVlDSvqMv6NmZcwRYePGtlw4UKxcLTvYhZy0kCBs8sGY2HSutVvYxnjdm7g8+SI5AKDfyJ91BekqVuV4ypTc3W/Gj8EY1ZSp414VZloz5flP3dDR1Y=",sidebar_class_name:"post api-method",info_path:"reference/service-api/fastapi",custom_edit_url:null},sidebar:"serviceApiSidebar",previous:{title:"Call End",permalink:"/weave/reference/service-api/call-end-call-end-post"},next:{title:"Calls Delete",permalink:"/weave/reference/service-api/calls-delete-calls-delete-post"}},N={},v=[];function k(e){const s={p:"p",...(0,l.a)(),...e.components},{Details:a}=s;return a||function(e,s){throw new Error("Expected "+(s?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(y.default,{as:"h1",className:"openapi__heading",children:"Call Start Batch"}),"\n",(0,i.jsx)(t(),{method:"post",path:"/call/upsert_batch"}),"\n",(0,i.jsx)(s.p,{children:"Call Start Batch"}),"\n",(0,i.jsx)(y.default,{id:"request",as:"h2",className:"openapi-tabs__heading",children:"Request"}),"\n",(0,i.jsx)(o(),{className:"openapi-tabs__mime",children:(0,i.jsx)(g.default,{label:"application/json",value:"application/json-schema",children:(0,i.jsxs)(a,{style:{},className:"openapi-markdown__details mime","data-collapsed":!1,open:!0,children:[(0,i.jsxs)("summary",{style:{},className:"openapi-markdown__details-summary-mime",children:[(0,i.jsx)("h3",{className:"openapi-markdown__details-summary-header-body",children:(0,i.jsx)(s.p,{children:"Body"})}),(0,i.jsx)("strong",{className:"openapi-schema__required",children:(0,i.jsx)(s.p,{children:"required"})})]}),(0,i.jsx)("div",{style:{textAlign:"left",marginLeft:"1rem"}}),(0,i.jsx)("ul",{style:{marginLeft:"1rem"},children:(0,i.jsx)(j(),{collapsible:!0,className:"schemaItem",children:(0,i.jsxs)(a,{style:{},className:"openapi-markdown__details",children:[(0,i.jsx)("summary",{style:{},children:(0,i.jsxs)("span",{className:"openapi-schema__container",children:[(0,i.jsx)("strong",{className:"openapi-schema__property",children:(0,i.jsx)(s.p,{children:"batch"})}),(0,i.jsx)("span",{className:"openapi-schema__name",children:(0,i.jsx)(s.p,{children:"object[]"})}),(0,i.jsx)("span",{className:"openapi-schema__divider"}),(0,i.jsx)("span",{className:"openapi-schema__required",children:(0,i.jsx)(s.p,{children:"required"})})]})}),(0,i.jsxs)("div",{style:{marginLeft:"1rem"},children:[(0,i.jsx)("li",{children:(0,i.jsx)("div",{style:{fontSize:"var(--ifm-code-font-size)",opacity:"0.6",marginLeft:"-.5rem",paddingBottom:".5rem"},children:(0,i.jsx)(s.p,{children:"Array ["})})}),(0,i.jsxs)("div",{children:[(0,i.jsx)("span",{className:"badge badge--info",children:(0,i.jsx)(s.p,{children:"anyOf"})}),(0,i.jsxs)(u(),{children:[(0,i.jsxs)(g.default,{label:"CallBatchStartMode",value:"0-item-properties",children:[(0,i.jsx)(j(),{collapsible:!1,name:"mode",required:!1,schemaName:"Mode (string)",qualifierMessage:void 0,schema:{type:"string",title:"Mode",default:"start"}}),(0,i.jsx)(j(),{collapsible:!0,className:"schemaItem",children:(0,i.jsxs)(a,{style:{},className:"openapi-markdown__details",children:[(0,i.jsx)("summary",{style:{},children:(0,i.jsxs)("span",{className:"openapi-schema__container",children:[(0,i.jsx)("strong",{className:"openapi-schema__property",children:(0,i.jsx)(s.p,{children:"req"})}),(0,i.jsx)("span",{className:"openapi-schema__name",children:(0,i.jsx)(s.p,{children:"object"})}),(0,i.jsx)("span",{className:"openapi-schema__divider"}),(0,i.jsx)("span",{className:"openapi-schema__required",children:(0,i.jsx)(s.p,{children:"required"})})]})}),(0,i.jsx)("div",{style:{marginLeft:"1rem"},children:(0,i.jsx)(j(),{collapsible:!0,className:"schemaItem",children:(0,i.jsxs)(a,{style:{},className:"openapi-markdown__details",children:[(0,i.jsx)("summary",{style:{},children:(0,i.jsxs)("span",{className:"openapi-schema__container",children:[(0,i.jsx)("strong",{className:"openapi-schema__property",children:(0,i.jsx)(s.p,{children:"start"})}),(0,i.jsx)("span",{className:"openapi-schema__name",children:(0,i.jsx)(s.p,{children:"object"})}),(0,i.jsx)("span",{className:"openapi-schema__divider"}),(0,i.jsx)("span",{className:"openapi-schema__required",children:(0,i.jsx)(s.p,{children:"required"})})]})}),(0,i.jsxs)("div",{style:{marginLeft:"1rem"},children:[(0,i.jsx)(j(),{collapsible:!1,name:"project_id",required:!0,schemaName:"Project Id (string)",qualifierMessage:void 0,schema:{type:"string",title:"Project Id"}}),(0,i.jsx)(j(),{collapsible:!0,className:"schemaItem",children:(0,i.jsxs)(a,{style:{},className:"openapi-markdown__details",children:[(0,i.jsxs)("summary",{style:{},children:[(0,i.jsx)("strong",{children:(0,i.jsx)(s.p,{children:"id"})}),(0,i.jsx)("span",{style:{opacity:"0.6"},children:(0,i.jsx)(s.p,{children:"object"})})]}),(0,i.jsx)("div",{style:{marginLeft:"1rem"}}),(0,i.jsxs)("div",{children:[(0,i.jsx)("span",{className:"badge badge--info",children:(0,i.jsx)(s.p,{children:"anyOf"})}),(0,i.jsx)(u(),{children:(0,i.jsx)(g.default,{label:"MOD1",value:"0-item-properties",children:(0,i.jsx)("div",{style:{marginTop:".5rem",marginBottom:".5rem"},children:(0,i.jsx)(s.p,{children:"string"})})})})]})]})}),(0,i.jsx)(j(),{collapsible:!1,name:"op_name",required:!0,schemaName:"Op Name (string)",qualifierMessage:void 0,schema:{type:"string",title:"Op Name"}}),(0,i.jsx)(j(),{collapsible:!0,className:"schemaItem",children:(0,i.jsxs)(a,{style:{},className:"openapi-markdown__details",children:[(0,i.jsxs)("summary",{style:{},children:[(0,i.jsx)("strong",{children:(0,i.jsx)(s.p,{children:"display_name"})}),(0,i.jsx)("span",{style:{opacity:"0.6"},children:(0,i.jsx)(s.p,{children:"object"})})]}),(0,i.jsx)("div",{style:{marginLeft:"1rem"}}),(0,i.jsxs)("div",{children:[(0,i.jsx)("span",{className:"badge badge--info",children:(0,i.jsx)(s.p,{children:"anyOf"})}),(0,i.jsx)(u(),{children:(0,i.jsx)(g.default,{label:"MOD1",value:"0-item-properties",children:(0,i.jsx)("div",{style:{marginTop:".5rem",marginBottom:".5rem"},children:(0,i.jsx)(s.p,{children:"string"})})})})]})]})}),(0,i.jsx)(j(),{collapsible:!0,className:"schemaItem",children:(0,i.jsxs)(a,{style:{},className:"openapi-markdown__details",children:[(0,i.jsxs)("summary",{style:{},children:[(0,i.jsx)("strong",{children:(0,i.jsx)(s.p,{children:"trace_id"})}),(0,i.jsx)("span",{style:{opacity:"0.6"},children:(0,i.jsx)(s.p,{children:"object"})})]}),(0,i.jsx)("div",{style:{marginLeft:"1rem"}}),(0,i.jsxs)("div",{children:[(0,i.jsx)("span",{className:"badge badge--info",children:(0,i.jsx)(s.p,{children:"anyOf"})}),(0,i.jsx)(u(),{children:(0,i.jsx)(g.default,{label:"MOD1",value:"0-item-properties",children:(0,i.jsx)("div",{style:{marginTop:".5rem",marginBottom:".5rem"},children:(0,i.jsx)(s.p,{children:"string"})})})})]})]})}),(0,i.jsx)(j(),{collapsible:!0,className:"schemaItem",children:(0,i.jsxs)(a,{style:{},className:"openapi-markdown__details",children:[(0,i.jsxs)("summary",{style:{},children:[(0,i.jsx)("strong",{children:(0,i.jsx)(s.p,{children:"parent_id"})}),(0,i.jsx)("span",{style:{opacity:"0.6"},children:(0,i.jsx)(s.p,{children:"object"})})]}),(0,i.jsx)("div",{style:{marginLeft:"1rem"}}),(0,i.jsxs)("div",{children:[(0,i.jsx)("span",{className:"badge badge--info",children:(0,i.jsx)(s.p,{children:"anyOf"})}),(0,i.jsx)(u(),{children:(0,i.jsx)(g.default,{label:"MOD1",value:"0-item-properties",children:(0,i.jsx)("div",{style:{marginTop:".5rem",marginBottom:".5rem"},children:(0,i.jsx)(s.p,{children:"string"})})})})]})]})}),(0,i.jsx)(j(),{collapsible:!1,name:"started_at",required:!0,schemaName:"date-time",qualifierMessage:void 0,schema:{type:"string",format:"date-time",title:"Started At"}}),(0,i.jsx)(j(),{collapsible:!1,name:"attributes",required:!0,schemaName:"object",qualifierMessage:void 0,schema:{type:"object",title:"Attributes"}}),(0,i.jsx)(j(),{collapsible:!1,name:"inputs",required:!0,schemaName:"object",qualifierMessage:void 0,schema:{type:"object",title:"Inputs"}}),(0,i.jsx)(j(),{collapsible:!0,className:"schemaItem",children:(0,i.jsxs)(a,{style:{},className:"openapi-markdown__details",children:[(0,i.jsxs)("summary",{style:{},children:[(0,i.jsx)("strong",{children:(0,i.jsx)(s.p,{children:"wb_user_id"})}),(0,i.jsx)("span",{style:{opacity:"0.6"},children:(0,i.jsx)(s.p,{children:"object"})})]}),(0,i.jsx)("div",{style:{marginLeft:"1rem"},children:(0,i.jsx)("div",{style:{marginTop:".5rem",marginBottom:".5rem"},children:(0,i.jsx)(s.p,{children:"Do not set directly. Server will automatically populate this field."})})}),(0,i.jsxs)("div",{children:[(0,i.jsx)("span",{className:"badge badge--info",children:(0,i.jsx)(s.p,{children:"anyOf"})}),(0,i.jsx)(u(),{children:(0,i.jsx)(g.default,{label:"MOD1",value:"0-item-properties",children:(0,i.jsx)("div",{style:{marginTop:".5rem",marginBottom:".5rem"},children:(0,i.jsx)(s.p,{children:"string"})})})})]})]})}),(0,i.jsx)(j(),{collapsible:!0,className:"schemaItem",children:(0,i.jsxs)(a,{style:{},className:"openapi-markdown__details",children:[(0,i.jsxs)("summary",{style:{},children:[(0,i.jsx)("strong",{children:(0,i.jsx)(s.p,{children:"wb_run_id"})}),(0,i.jsx)("span",{style:{opacity:"0.6"},children:(0,i.jsx)(s.p,{children:"object"})})]}),(0,i.jsx)("div",{style:{marginLeft:"1rem"}}),(0,i.jsxs)("div",{children:[(0,i.jsx)("span",{className:"badge badge--info",children:(0,i.jsx)(s.p,{children:"anyOf"})}),(0,i.jsx)(u(),{children:(0,i.jsx)(g.default,{label:"MOD1",value:"0-item-properties",children:(0,i.jsx)("div",{style:{marginTop:".5rem",marginBottom:".5rem"},children:(0,i.jsx)(s.p,{children:"string"})})})})]})]})})]})]})})})]})})]}),(0,i.jsxs)(g.default,{label:"CallBatchEndMode",value:"1-item-properties",children:[(0,i.jsx)(j(),{collapsible:!1,name:"mode",required:!1,schemaName:"Mode (string)",qualifierMessage:void 0,schema:{type:"string",title:"Mode",default:"end"}}),(0,i.jsx)(j(),{collapsible:!0,className:"schemaItem",children:(0,i.jsxs)(a,{style:{},className:"openapi-markdown__details",children:[(0,i.jsx)("summary",{style:{},children:(0,i.jsxs)("span",{className:"openapi-schema__container",children:[(0,i.jsx)("strong",{className:"openapi-schema__property",children:(0,i.jsx)(s.p,{children:"req"})}),(0,i.jsx)("span",{className:"openapi-schema__name",children:(0,i.jsx)(s.p,{children:"object"})}),(0,i.jsx)("span",{className:"openapi-schema__divider"}),(0,i.jsx)("span",{className:"openapi-schema__required",children:(0,i.jsx)(s.p,{children:"required"})})]})}),(0,i.jsx)("div",{style:{marginLeft:"1rem"},children:(0,i.jsx)(j(),{collapsible:!0,className:"schemaItem",children:(0,i.jsxs)(a,{style:{},className:"openapi-markdown__details",children:[(0,i.jsx)("summary",{style:{},children:(0,i.jsxs)("span",{className:"openapi-schema__container",children:[(0,i.jsx)("strong",{className:"openapi-schema__property",children:(0,i.jsx)(s.p,{children:"end"})}),(0,i.jsx)("span",{className:"openapi-schema__name",children:(0,i.jsx)(s.p,{children:"object"})}),(0,i.jsx)("span",{className:"openapi-schema__divider"}),(0,i.jsx)("span",{className:"openapi-schema__required",children:(0,i.jsx)(s.p,{children:"required"})})]})}),(0,i.jsxs)("div",{style:{marginLeft:"1rem"},children:[(0,i.jsx)(j(),{collapsible:!1,name:"project_id",required:!0,schemaName:"Project Id (string)",qualifierMessage:void 0,schema:{type:"string",title:"Project Id"}}),(0,i.jsx)(j(),{collapsible:!1,name:"id",required:!0,schemaName:"Id (string)",qualifierMessage:void 0,schema:{type:"string",title:"Id"}}),(0,i.jsx)(j(),{collapsible:!1,name:"ended_at",required:!0,schemaName:"date-time",qualifierMessage:void 0,schema:{type:"string",format:"date-time",title:"Ended At"}}),(0,i.jsx)(j(),{collapsible:!0,className:"schemaItem",children:(0,i.jsxs)(a,{style:{},className:"openapi-markdown__details",children:[(0,i.jsxs)("summary",{style:{},children:[(0,i.jsx)("strong",{children:(0,i.jsx)(s.p,{children:"exception"})}),(0,i.jsx)("span",{style:{opacity:"0.6"},children:(0,i.jsx)(s.p,{children:"object"})})]}),(0,i.jsx)("div",{style:{marginLeft:"1rem"}}),(0,i.jsxs)("div",{children:[(0,i.jsx)("span",{className:"badge badge--info",children:(0,i.jsx)(s.p,{children:"anyOf"})}),(0,i.jsx)(u(),{children:(0,i.jsx)(g.default,{label:"MOD1",value:"0-item-properties",children:(0,i.jsx)("div",{style:{marginTop:".5rem",marginBottom:".5rem"},children:(0,i.jsx)(s.p,{children:"string"})})})})]})]})}),(0,i.jsx)(j(),{collapsible:!1,name:"output",required:!1,schemaName:"object",qualifierMessage:void 0,schema:{title:"Output",type:"object"}}),(0,i.jsx)(j(),{collapsible:!1,name:"summary",required:!0,schemaName:"object",qualifierMessage:void 0,schema:{type:"object",title:"Summary"}})]})]})})})]})})]})]})]}),(0,i.jsx)("li",{children:(0,i.jsx)("div",{style:{fontSize:"var(--ifm-code-font-size)",opacity:"0.6",marginLeft:"-.5rem"},children:(0,i.jsx)(s.p,{children:"]"})})})]})]})})})]})})}),"\n",(0,i.jsx)("div",{children:(0,i.jsx)("div",{children:(0,i.jsxs)(c(),{label:void 0,id:void 0,children:[(0,i.jsxs)(g.default,{label:"200",value:"200",children:[(0,i.jsx)("div",{children:(0,i.jsx)(s.p,{children:"Successful Response"})}),(0,i.jsx)("div",{children:(0,i.jsx)(o(),{className:"openapi-tabs__mime",schemaType:"response",children:(0,i.jsx)(g.default,{label:"application/json",value:"application/json",children:(0,i.jsxs)(u(),{className:"openapi-tabs__schema",children:[(0,i.jsx)(g.default,{label:"Schema",value:"Schema",children:(0,i.jsxs)(a,{style:{},className:"openapi-markdown__details response","data-collapsed":!1,open:!0,children:[(0,i.jsx)("summary",{style:{},className:"openapi-markdown__details-summary-response",children:(0,i.jsx)("strong",{children:(0,i.jsx)(s.p,{children:"Schema"})})}),(0,i.jsx)("div",{style:{textAlign:"left",marginLeft:"1rem"}}),(0,i.jsx)("ul",{style:{marginLeft:"1rem"},children:(0,i.jsx)(j(),{collapsible:!0,className:"schemaItem",children:(0,i.jsxs)(a,{style:{},className:"openapi-markdown__details",children:[(0,i.jsx)("summary",{style:{},children:(0,i.jsxs)("span",{className:"openapi-schema__container",children:[(0,i.jsx)("strong",{className:"openapi-schema__property",children:(0,i.jsx)(s.p,{children:"res"})}),(0,i.jsx)("span",{className:"openapi-schema__name",children:(0,i.jsx)(s.p,{children:"object[]"})}),(0,i.jsx)("span",{className:"openapi-schema__divider"}),(0,i.jsx)("span",{className:"openapi-schema__required",children:(0,i.jsx)(s.p,{children:"required"})})]})}),(0,i.jsxs)("div",{style:{marginLeft:"1rem"},children:[(0,i.jsx)("li",{children:(0,i.jsx)("div",{style:{fontSize:"var(--ifm-code-font-size)",opacity:"0.6",marginLeft:"-.5rem",paddingBottom:".5rem"},children:(0,i.jsx)(s.p,{children:"Array ["})})}),(0,i.jsxs)("div",{children:[(0,i.jsx)("span",{className:"badge badge--info",children:(0,i.jsx)(s.p,{children:"anyOf"})}),(0,i.jsxs)(u(),{children:[(0,i.jsxs)(g.default,{label:"CallStartRes",value:"0-item-properties",children:[(0,i.jsx)(j(),{collapsible:!1,name:"id",required:!0,schemaName:"Id (string)",qualifierMessage:void 0,schema:{type:"string",title:"Id"}}),(0,i.jsx)(j(),{collapsible:!1,name:"trace_id",required:!0,schemaName:"Trace Id (string)",qualifierMessage:void 0,schema:{type:"string",title:"Trace Id"}})]}),(0,i.jsx)(g.default,{label:"CallEndRes",value:"1-item-properties",children:(0,i.jsx)(j(),{collapsible:!1,name:"",required:!1,schemaName:"object",qualifierMessage:void 0,schema:{}})})]})]}),(0,i.jsx)("li",{children:(0,i.jsx)("div",{style:{fontSize:"var(--ifm-code-font-size)",opacity:"0.6",marginLeft:"-.5rem"},children:(0,i.jsx)(s.p,{children:"]"})})})]})]})})})]})}),(0,i.jsx)(g.default,{label:"Example (from schema)",value:"Example (from schema)",children:(0,i.jsx)(p(),{responseExample:'{\n  "res": [\n    {},\n    {}\n  ]\n}',language:"json"})})]})})})})]}),(0,i.jsxs)(g.default,{label:"422",value:"422",children:[(0,i.jsx)("div",{children:(0,i.jsx)(s.p,{children:"Validation Error"})}),(0,i.jsx)("div",{children:(0,i.jsx)(o(),{className:"openapi-tabs__mime",schemaType:"response",children:(0,i.jsx)(g.default,{label:"application/json",value:"application/json",children:(0,i.jsxs)(u(),{className:"openapi-tabs__schema",children:[(0,i.jsx)(g.default,{label:"Schema",value:"Schema",children:(0,i.jsxs)(a,{style:{},className:"openapi-markdown__details response","data-collapsed":!1,open:!0,children:[(0,i.jsx)("summary",{style:{},className:"openapi-markdown__details-summary-response",children:(0,i.jsx)("strong",{children:(0,i.jsx)(s.p,{children:"Schema"})})}),(0,i.jsx)("div",{style:{textAlign:"left",marginLeft:"1rem"}}),(0,i.jsx)("ul",{style:{marginLeft:"1rem"},children:(0,i.jsx)(j(),{collapsible:!0,className:"schemaItem",children:(0,i.jsxs)(a,{style:{},className:"openapi-markdown__details",children:[(0,i.jsx)("summary",{style:{},children:(0,i.jsxs)("span",{className:"openapi-schema__container",children:[(0,i.jsx)("strong",{className:"openapi-schema__property",children:(0,i.jsx)(s.p,{children:"detail"})}),(0,i.jsx)("span",{className:"openapi-schema__name",children:(0,i.jsx)(s.p,{children:"object[]"})})]})}),(0,i.jsxs)("div",{style:{marginLeft:"1rem"},children:[(0,i.jsx)("li",{children:(0,i.jsx)("div",{style:{fontSize:"var(--ifm-code-font-size)",opacity:"0.6",marginLeft:"-.5rem",paddingBottom:".5rem"},children:(0,i.jsx)(s.p,{children:"Array ["})})}),(0,i.jsx)(j(),{collapsible:!0,className:"schemaItem",children:(0,i.jsxs)(a,{style:{},className:"openapi-markdown__details",children:[(0,i.jsx)("summary",{style:{},children:(0,i.jsxs)("span",{className:"openapi-schema__container",children:[(0,i.jsx)("strong",{className:"openapi-schema__property",children:(0,i.jsx)(s.p,{children:"loc"})}),(0,i.jsx)("span",{className:"openapi-schema__name",children:(0,i.jsx)(s.p,{children:"object[]"})}),(0,i.jsx)("span",{className:"openapi-schema__divider"}),(0,i.jsx)("span",{className:"openapi-schema__required",children:(0,i.jsx)(s.p,{children:"required"})})]})}),(0,i.jsxs)("div",{style:{marginLeft:"1rem"},children:[(0,i.jsx)("li",{children:(0,i.jsx)("div",{style:{fontSize:"var(--ifm-code-font-size)",opacity:"0.6",marginLeft:"-.5rem",paddingBottom:".5rem"},children:(0,i.jsx)(s.p,{children:"Array ["})})}),(0,i.jsxs)("div",{children:[(0,i.jsx)("span",{className:"badge badge--info",children:(0,i.jsx)(s.p,{children:"anyOf"})}),(0,i.jsxs)(u(),{children:[(0,i.jsx)(g.default,{label:"MOD1",value:"0-item-properties",children:(0,i.jsx)("div",{style:{marginTop:".5rem",marginBottom:".5rem"},children:(0,i.jsx)(s.p,{children:"string"})})}),(0,i.jsx)(g.default,{label:"MOD2",value:"1-item-properties",children:(0,i.jsx)("div",{style:{marginTop:".5rem",marginBottom:".5rem"},children:(0,i.jsx)(s.p,{children:"integer"})})})]})]}),(0,i.jsx)("li",{children:(0,i.jsx)("div",{style:{fontSize:"var(--ifm-code-font-size)",opacity:"0.6",marginLeft:"-.5rem"},children:(0,i.jsx)(s.p,{children:"]"})})})]})]})}),(0,i.jsx)(j(),{collapsible:!1,name:"msg",required:!0,schemaName:"Message (string)",qualifierMessage:void 0,schema:{type:"string",title:"Message"}}),(0,i.jsx)(j(),{collapsible:!1,name:"type",required:!0,schemaName:"Error Type (string)",qualifierMessage:void 0,schema:{type:"string",title:"Error Type"}}),(0,i.jsx)("li",{children:(0,i.jsx)("div",{style:{fontSize:"var(--ifm-code-font-size)",opacity:"0.6",marginLeft:"-.5rem"},children:(0,i.jsx)(s.p,{children:"]"})})})]})]})})})]})}),(0,i.jsx)(g.default,{label:"Example (from schema)",value:"Example (from schema)",children:(0,i.jsx)(p(),{responseExample:'{\n  "detail": [\n    {\n      "loc": [\n        "string",\n        0\n      ],\n      "msg": "string",\n      "type": "string"\n    }\n  ]\n}',language:"json"})})]})})})})]})]})})})]})}function B(e={}){const{wrapper:s}={...(0,l.a)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(k,{...e})}):k(e)}},13155:(e,s,a)=>{a.r(s),a.d(s,{default:()=>q});var i=a(67294),l=a(72389),n=a(90512),c=a(66412),r=a(35281),t=a(37016);const d={codeBlockContainer:"codeBlockContainer_APcc"};var o=a(85893);function m(e){let{as:s,...a}=e;const i=(0,c.p)(),l=(0,t.QC)(i);return(0,o.jsx)(s,{...a,style:l,className:(0,n.Z)(a.className,d.codeBlockContainer,r.k.common.codeBlock)})}const p={codeBlockContent:"codeBlockContent_m3Ux",codeBlockTitle:"codeBlockTitle_P25_",codeBlock:"codeBlock_qGQc",codeBlockStandalone:"codeBlockStandalone_zC50",codeBlockLines:"codeBlockLines_p187",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_OFgW",buttonGroup:"buttonGroup_6DOT"};function h(e){let{children:s,className:a}=e;return(0,o.jsx)(m,{as:"pre",tabIndex:0,className:(0,n.Z)(p.codeBlockStandalone,"thin-scrollbar",a),children:(0,o.jsx)("code",{className:p.codeBlockLines,children:s})})}var j=a(86668),x=a(85448),u=a(42573);const y={codeLine:"codeLine_iPqp",codeLineNumber:"codeLineNumber_F4P7",codeLineContent:"codeLineContent_pOih"};function g(e){let{line:s,classNames:a,showLineNumbers:i,getLineProps:l,getTokenProps:c}=e;1===s.length&&"\n"===s[0].content&&(s[0].content="");const r=l({line:s,className:(0,n.Z)(a,i&&y.codeLine)}),t=s.map(((e,s)=>(0,o.jsx)("span",{...c({token:e,key:s})},s)));return(0,o.jsxs)("span",{...r,children:[i?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("span",{className:y.codeLineNumber}),(0,o.jsx)("span",{className:y.codeLineContent,children:t})]}):t,(0,o.jsx)("br",{})]})}var b=a(10195),f=a(95999),_=a(30345),N=a(37666);const v={copyButtonCopied:"copyButtonCopied__QnY",copyButtonIcons:"copyButtonIcons_FhaS",copyButtonIcon:"copyButtonIcon_phi_",copyButtonSuccessIcon:"copyButtonSuccessIcon_FfTR"};function k(e){let{code:s,className:a}=e;const[l,c]=(0,i.useState)(!1),r=(0,i.useRef)(void 0),t=(0,i.useCallback)((()=>{window.analytics?.track("Weave Docs: Code copied",{code:"string"==typeof s?s.slice(0,100):"code is not string"}),(0,b.default)(s),c(!0),r.current=window.setTimeout((()=>{c(!1)}),1e3)}),[s]);return(0,i.useEffect)((()=>()=>window.clearTimeout(r.current)),[]),(0,o.jsx)("button",{type:"button","aria-label":l?(0,f.translate)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,f.translate)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,f.translate)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,n.Z)("clean-btn",a,v.copyButton,l&&v.copyButtonCopied),onClick:t,children:(0,o.jsxs)("span",{className:v.copyButtonIcons,"aria-hidden":"true",children:[(0,o.jsx)(_.Z,{className:v.copyButtonIcon}),(0,o.jsx)(N.Z,{className:v.copyButtonSuccessIcon})]})})}var B=a(96043);const w={wordWrapButtonIcon:"wordWrapButtonIcon_iowe",wordWrapButtonEnabled:"wordWrapButtonEnabled_gY8A"};function S(e){let{className:s,onClick:a,isEnabled:i}=e;const l=(0,f.translate)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return(0,o.jsx)("button",{type:"button",onClick:a,className:(0,n.Z)("clean-btn",s,i&&w.wordWrapButtonEnabled),"aria-label":l,title:l,children:(0,o.jsx)(B.Z,{className:w.wordWrapButtonIcon,"aria-hidden":"true"})})}function C(e){let{children:s,className:a="",metastring:i,title:l,showLineNumbers:r,language:d}=e;const{prism:{defaultLanguage:h,magicComments:y}}=(0,j.L)(),b=function(e){return e?.toLowerCase()}(d??(0,t.Vo)(a)??h),f=(0,c.p)(),_=(0,x.F)(),N=(0,t.bc)(i)||l,{lineClassNames:v,code:B}=(0,t.nZ)(s,{metastring:i,language:b,magicComments:y}),w=r??(0,t.nt)(i);return(0,o.jsxs)(m,{as:"div",className:(0,n.Z)(a,b&&!a.includes(`language-${b}`)&&`language-${b}`),children:[N&&(0,o.jsx)("div",{className:p.codeBlockTitle,children:N}),(0,o.jsxs)("div",{className:p.codeBlockContent,children:[(0,o.jsx)(u.Highlight,{theme:f,code:B,language:b??"text",children:e=>{let{className:s,style:a,tokens:i,getLineProps:l,getTokenProps:c}=e;return(0,o.jsx)("pre",{tabIndex:0,ref:_.codeBlockRef,className:(0,n.Z)(s,p.codeBlock,"thin-scrollbar"),style:a,children:(0,o.jsx)("code",{className:(0,n.Z)(p.codeBlockLines,w&&p.codeBlockLinesWithNumbering),children:i.map(((e,s)=>(0,o.jsx)(g,{line:e,getLineProps:l,getTokenProps:c,classNames:v[s],showLineNumbers:w},s)))})})}}),(0,o.jsxs)("div",{className:p.buttonGroup,children:[(_.isEnabled||_.isCodeScrollable)&&(0,o.jsx)(S,{className:p.codeButton,onClick:()=>_.toggle(),isEnabled:_.isEnabled}),(0,o.jsx)(k,{className:p.codeButton,code:B})]})]})]})}function q(e){let{children:s,...a}=e;const n=(0,l.default)(),c=function(e){return i.Children.toArray(e).some((e=>(0,i.isValidElement)(e)))?e:Array.isArray(e)?e.join(""):e}(s),r="string"==typeof c?C:h;return(0,o.jsx)(r,{...a,children:c},String(n))}}}]);