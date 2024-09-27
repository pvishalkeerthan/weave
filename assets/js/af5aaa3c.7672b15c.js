"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6035],{84161:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>d,contentTitle:()=>i,default:()=>h,frontMatter:()=>l,metadata:()=>r,toc:()=>a});var c=n(85893),t=n(11151);const l={sidebar_label:"weave_client"},i="weave.trace.weave_client",r={id:"reference/python-sdk/weave/trace/weave.trace.weave_client",title:"weave.trace.weave_client",description:"---",source:"@site/docs/reference/python-sdk/weave/trace/weave.trace.weave_client.md",sourceDirName:"reference/python-sdk/weave/trace",slug:"/reference/python-sdk/weave/trace/weave.trace.weave_client",permalink:"/reference/python-sdk/weave/trace/weave.trace.weave_client",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/reference/python-sdk/weave/trace/weave.trace.weave_client.md",tags:[],version:"current",lastUpdatedAt:1727449268e3,frontMatter:{sidebar_label:"weave_client"},sidebar:"pythonSdkSidebar",previous:{title:"util",permalink:"/reference/python-sdk/weave/trace/weave.trace.util"},next:{title:"query",permalink:"/reference/python-sdk/weave/trace_server/interface/weave.trace_server.interface.query"}},d={},a=[{value:"Classes",id:"classes",level:2},{value:"<kbd>class</kbd> <code>WeaveClient</code>",id:"class-weaveclient",level:2},{value:"<kbd>method</kbd> <code>__init__</code>",id:"method-__init__",level:3},{value:"<kbd>method</kbd> <code>add_cost</code>",id:"method-add_cost",level:3},{value:"<kbd>method</kbd> <code>call</code>",id:"method-call",level:3},{value:"<kbd>method</kbd> <code>calls</code>",id:"method-calls",level:3},{value:"<kbd>method</kbd> <code>create_call</code>",id:"method-create_call",level:3},{value:"<kbd>method</kbd> <code>delete_call</code>",id:"method-delete_call",level:3},{value:"<kbd>method</kbd> <code>fail_call</code>",id:"method-fail_call",level:3},{value:"<kbd>method</kbd> <code>feedback</code>",id:"method-feedback",level:3},{value:"<kbd>method</kbd> <code>finish_call</code>",id:"method-finish_call",level:3},{value:"<kbd>method</kbd> <code>get</code>",id:"method-get",level:3},{value:"<kbd>method</kbd> <code>get_call</code>",id:"method-get_call",level:3},{value:"<kbd>method</kbd> <code>get_calls</code>",id:"method-get_calls",level:3},{value:"<kbd>method</kbd> <code>get_feedback</code>",id:"method-get_feedback",level:3},{value:"<kbd>method</kbd> <code>purge_costs</code>",id:"method-purge_costs",level:3},{value:"<kbd>method</kbd> <code>query_costs</code>",id:"method-query_costs",level:3},{value:"<kbd>method</kbd> <code>save</code>",id:"method-save",level:3},{value:"<kbd>class</kbd> <code>Call</code>",id:"class-call",level:2},{value:"<kbd>method</kbd> <code>__init__</code>",id:"method-__init__-1",level:3},{value:"<kbd>property</kbd> feedback",id:"property-feedback",level:4},{value:"<kbd>property</kbd> func_name",id:"property-func_name",level:4},{value:"<kbd>property</kbd> ui_url",id:"property-ui_url",level:4},{value:"<kbd>method</kbd> <code>children</code>",id:"method-children",level:3},{value:"<kbd>method</kbd> <code>delete</code>",id:"method-delete",level:3},{value:"<kbd>method</kbd> <code>remove_display_name</code>",id:"method-remove_display_name",level:3},{value:"<kbd>method</kbd> <code>set_display_name</code>",id:"method-set_display_name",level:3},{value:"<kbd>class</kbd> <code>CallsIter</code>",id:"class-callsiter",level:2},{value:"<kbd>method</kbd> <code>__init__</code>",id:"method-__init__-2",level:3}];function o(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(s.h1,{id:"weavetraceweave_client",children:"weave.trace.weave_client"}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)(s.h1,{id:"api-overview",children:"API Overview"}),"\n",(0,c.jsx)(s.h2,{id:"classes",children:"Classes"}),"\n",(0,c.jsxs)(s.ul,{children:["\n",(0,c.jsx)(s.li,{children:(0,c.jsx)(s.a,{href:"#class-weaveclient",children:(0,c.jsx)(s.code,{children:"weave_client.WeaveClient"})})}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)(s.a,{href:"#class-call",children:(0,c.jsx)(s.code,{children:"weave_client.Call"})}),": A Call represents a single operation that was executed as part of a trace."]}),"\n",(0,c.jsx)(s.li,{children:(0,c.jsx)(s.a,{href:"#class-callsiter",children:(0,c.jsx)(s.code,{children:"weave_client.CallsIter"})})}),"\n"]}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/weave_client.py#L420",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h2,{id:"class-weaveclient",children:[(0,c.jsx)("kbd",{children:"class"})," ",(0,c.jsx)(s.code,{children:"WeaveClient"})]}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/weave_client.py#L434",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-__init__",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"__init__"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"__init__(\n    entity: str,\n    project: str,\n    server: TraceServerInterface,\n    ensure_project_exists: bool = True\n)\n"})}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/weave_client.py#L862",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-add_cost",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"add_cost"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"add_cost(\n    llm_id: str,\n    prompt_token_cost: float,\n    completion_token_cost: float,\n    effective_date: Optional[datetime] = datetime.datetime(2024, 9, 20, 16, 16, 13, 77269, tzinfo=datetime.timezone.utc),\n    prompt_token_cost_unit: Optional[str] = 'USD',\n    completion_token_cost_unit: Optional[str] = 'USD',\n    provider_id: Optional[str] = 'default'\n) \u2192 CostCreateRes\n"})}),"\n",(0,c.jsx)(s.p,{children:"Add a cost to the current project."}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.strong,{children:"Examples:"})}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:'     client.add_cost(llm_id="my_expensive_custom_model", prompt_token_cost=1, completion_token_cost=2)\n     client.add_cost(llm_id="my_expensive_custom_model", prompt_token_cost=500, completion_token_cost=1000, effective_date=datetime(1998, 10, 3))\n'})}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.strong,{children:"Args:"})}),"\n",(0,c.jsxs)(s.ul,{children:["\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"llm_id"})}),':  The ID of the LLM. eg "gpt-4o-mini-2024-07-18"']}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"prompt_token_cost"})}),":  The cost of the prompt tokens. eg .0005"]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"completion_token_cost"})}),":  The cost of the completion tokens. eg .0015"]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"effective_date"})}),":  Defaults to the current date. A datetime.datetime object."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"provider_id"})}),':  The provider of the LLM. Defaults to "default". eg "openai"']}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"prompt_token_cost_unit"})}),':  The unit of the cost for the prompt tokens. Defaults to "USD". (Currently unused, will be used in the future to specify the currency type for the cost eg "tokens" or "time")']}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"completion_token_cost_unit"})}),':  The unit of the cost for the completion tokens. Defaults to "USD". (Currently unused, will be used in the future to specify the currency type for the cost eg "tokens" or "time")']}),"\n"]}),"\n",(0,c.jsxs)(s.p,{children:[(0,c.jsx)(s.strong,{children:"Returns:"}),"\nA CostCreateRes object. Which has one field called a list of tuples called ids. Each tuple contains the llm_id and the id of the created cost object."]}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/util.py#L574",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-call",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"call"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"call(call_id: str, include_costs: Optional[bool] = False) \u2192 WeaveObject\n"})}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/util.py#L550",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-calls",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"calls"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"calls(\n    filter: Optional[CallsFilter] = None,\n    include_costs: Optional[bool] = False\n) \u2192 CallsIter\n"})}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/trace_sentry.py#L578",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-create_call",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"create_call"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"create_call(\n    op: Union[str, Op],\n    inputs: dict,\n    parent: Optional[Call] = None,\n    attributes: Optional[dict] = None,\n    display_name: Optional[str, Callable[[Call], str]] = None,\n    use_stack: bool = True\n) \u2192 Call\n"})}),"\n",(0,c.jsx)(s.p,{children:"Create, log, and push a call onto the runtime stack."}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.strong,{children:"Args:"})}),"\n",(0,c.jsxs)(s.ul,{children:["\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"op"})}),":  The operation producing the call, or the name of an anonymous operation."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"inputs"})}),":  The inputs to the operation."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"parent"})}),":  The parent call. If parent is not provided, the current run is used as the parent."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"display_name"})}),":  The display name for the call. Defaults to None."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"attributes"})}),":  The attributes for the call. Defaults to None."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"use_stack"})}),":  Whether to push the call onto the runtime stack. Defaults to True."]}),"\n"]}),"\n",(0,c.jsxs)(s.p,{children:[(0,c.jsx)(s.strong,{children:"Returns:"}),"\nThe created Call object."]}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/trace_sentry.py#L765",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-delete_call",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"delete_call"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"delete_call(call: Call) \u2192 None\n"})}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/trace_sentry.py#L760",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-fail_call",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"fail_call"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"fail_call(call: Call, exception: BaseException) \u2192 None\n"})}),"\n",(0,c.jsx)(s.p,{children:"Fail a call with an exception. This is a convenience method for finish_call."}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/util.py#L849",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-feedback",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"feedback"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"feedback(\n    query: Optional[Query, str] = None,\n    reaction: Optional[str] = None,\n    offset: int = 0,\n    limit: int = 100\n) \u2192 FeedbackQuery\n"})}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/trace_sentry.py#L687",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-finish_call",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"finish_call"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"finish_call(\n    call: Call,\n    output: Any = None,\n    exception: Optional[BaseException] = None,\n    postprocess_output: Optional[Callable[, Any]] = None\n) \u2192 None\n"})}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/trace_sentry.py#L488",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-get",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"get"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"get(ref: ObjectRef) \u2192 Any\n"})}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/trace_sentry.py#L558",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-get_call",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"get_call"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"get_call(call_id: str, include_costs: Optional[bool] = False) \u2192 WeaveObject\n"})}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/trace_sentry.py#L537",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-get_calls",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"get_calls"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"get_calls(\n    filter: Optional[CallsFilter] = None,\n    include_costs: Optional[bool] = False\n) \u2192 CallsIter\n"})}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/weave_client.py#L774",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-get_feedback",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"get_feedback"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"get_feedback(\n    query: Optional[Query, str] = None,\n    reaction: Optional[str] = None,\n    offset: int = 0,\n    limit: int = 100\n) \u2192 FeedbackQuery\n"})}),"\n",(0,c.jsx)(s.p,{children:"Query project for feedback."}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.strong,{children:"Examples:"})}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:'    # Fetch a specific feedback object.\n    # Note that this still returns a collection, which is expected\n    # to contain zero or one item(s).\n    client.get_feedback("1B4082A3-4EDA-4BEB-BFEB-2D16ED59AA07")\n\n    # Find all feedback objects with a specific reaction.\n    client.get_feedback(reaction="\ud83d\udc4d", limit=10)\n'})}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.strong,{children:"Args:"})}),"\n",(0,c.jsxs)(s.ul,{children:["\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"query"})}),":  A mongo-style query expression. For convenience, also accepts a feedback UUID string."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"reaction"})}),":  For convenience, filter by a particular reaction emoji."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"offset"})}),":  The offset to start fetching feedback objects from."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"limit"})}),":  The maximum number of feedback objects to fetch."]}),"\n"]}),"\n",(0,c.jsxs)(s.p,{children:[(0,c.jsx)(s.strong,{children:"Returns:"}),"\nA FeedbackQuery object."]}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/weave_client.py#L909",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-purge_costs",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"purge_costs"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"purge_costs(ids: Union[list[str], str]) \u2192 None\n"})}),"\n",(0,c.jsx)(s.p,{children:"Purge costs from the current project."}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.strong,{children:"Examples:"})}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"     client.purge_costs([ids])\n     client.purge_costs(ids)\n"})}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.strong,{children:"Args:"})}),"\n",(0,c.jsxs)(s.ul,{children:["\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"ids"})}),":  The cost IDs to purge. Can be a single ID or a list of IDs."]}),"\n"]}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/weave_client.py#L934",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-query_costs",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"query_costs"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"query_costs(\n    query: Optional[Query, str] = None,\n    llm_ids: Optional[list[str]] = None,\n    offset: int = 0,\n    limit: int = 100\n) \u2192 list[CostQueryOutput]\n"})}),"\n",(0,c.jsx)(s.p,{children:"Query project for costs."}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.strong,{children:"Examples:"})}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:'     # Fetch a specific cost object.\n     # Note that this still returns a collection, which is expected\n     # to contain zero or one item(s).\n     client.query_costs("1B4082A3-4EDA-4BEB-BFEB-2D16ED59AA07")\n\n     # Find all cost objects with a specific reaction.\n     client.query_costs(llm_ids=["gpt-4o-mini-2024-07-18"], limit=10)\n'})}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.strong,{children:"Args:"})}),"\n",(0,c.jsxs)(s.ul,{children:["\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"query"})}),":  A mongo-style query expression. For convenience, also accepts a cost UUID string."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"llm_ids"})}),":  For convenience, filter for a set of llm_ids."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"offset"})}),":  The offset to start fetching cost objects from."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"limit"})}),":  The maximum number of cost objects to fetch."]}),"\n"]}),"\n",(0,c.jsxs)(s.p,{children:[(0,c.jsx)(s.strong,{children:"Returns:"}),"\nA CostQuery object."]}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/trace_sentry.py#L459",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-save",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"save"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"save(val: Any, name: str, branch: str = 'latest') \u2192 Any\n"})}),"\n",(0,c.jsx)(s.p,{children:"Do not call directly, use weave.publish() instead."}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.strong,{children:"Args:"})}),"\n",(0,c.jsxs)(s.ul,{children:["\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"val"})}),":  The object to save."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"name"})}),":  The name to save the object under."]}),"\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"branch"})}),':  The branch to save the object under. Defaults to "latest".']}),"\n"]}),"\n",(0,c.jsxs)(s.p,{children:[(0,c.jsx)(s.strong,{children:"Returns:"}),"\nA deserialized version of the saved object."]}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/weave_client.py#L162",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h2,{id:"class-call",children:[(0,c.jsx)("kbd",{children:"class"})," ",(0,c.jsx)(s.code,{children:"Call"})]}),"\n",(0,c.jsx)(s.p,{children:"A Call represents a single operation that was executed as part of a trace."}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/docs/<string>",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-__init__-1",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"__init__"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"__init__(\n    op_name: str,\n    trace_id: str,\n    project_id: str,\n    parent_id: Optional[str],\n    inputs: dict,\n    id: Optional[str] = None,\n    output: Any = None,\n    exception: Optional[str] = None,\n    summary: Optional[dict] = None,\n    display_name: Optional[str, Callable[[ForwardRef('Call')], str]] = None,\n    attributes: Optional[dict] = None,\n    started_at: Optional[datetime] = None,\n    ended_at: Optional[datetime] = None,\n    deleted_at: Optional[datetime] = None,\n    _children: list['Call'] = &lt;factory&gt;,\n    _feedback: Optional[RefFeedbackQuery] = None\n) \u2192 None\n"})}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsxs)(s.h4,{id:"property-feedback",children:[(0,c.jsx)("kbd",{children:"property"})," feedback"]}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsxs)(s.h4,{id:"property-func_name",children:[(0,c.jsx)("kbd",{children:"property"})," func_name"]}),"\n",(0,c.jsx)(s.p,{children:"The decorated function's name that produced this call."}),"\n",(0,c.jsxs)(s.p,{children:["This is different from ",(0,c.jsx)(s.code,{children:"op_name"})," which is usually the ref of the op."]}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsxs)(s.h4,{id:"property-ui_url",children:[(0,c.jsx)("kbd",{children:"property"})," ui_url"]}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/weave_client.py#L222",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-children",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"children"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"children() \u2192 CallsIter\n"})}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/weave_client.py#L232",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-delete",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"delete"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"delete() \u2192 bool\n"})}),"\n",(0,c.jsx)(s.p,{children:"Delete the call."}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/weave_client.py#L261",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-remove_display_name",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"remove_display_name"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"remove_display_name() \u2192 None\n"})}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/weave_client.py#L237",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-set_display_name",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"set_display_name"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"set_display_name(name: Optional[str]) \u2192 None\n"})}),"\n",(0,c.jsx)(s.p,{children:"Set the display name for the call."}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.strong,{children:"Args:"})}),"\n",(0,c.jsxs)(s.ul,{children:["\n",(0,c.jsxs)(s.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(s.code,{children:"name"})}),":  The display name to set for the call."]}),"\n"]}),"\n",(0,c.jsx)(s.p,{children:(0,c.jsx)(s.strong,{children:"Example:"})}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:'result, call = my_function.call("World")\ncall.set_display_name("My Custom Display Name")\n'})}),"\n",(0,c.jsx)(s.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/weave_client.py#L265",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h2,{id:"class-callsiter",children:[(0,c.jsx)("kbd",{children:"class"})," ",(0,c.jsx)(s.code,{children:"CallsIter"})]}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/weave_client.py#L270",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(s.h3,{id:"method-__init__-2",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(s.code,{children:"__init__"})]}),"\n",(0,c.jsx)(s.pre,{children:(0,c.jsx)(s.code,{className:"language-python",children:"__init__(\n    server: TraceServerInterface,\n    project_id: str,\n    filter: CallsFilter,\n    include_costs: bool = False\n) \u2192 None\n"})})]})}function h(e={}){const{wrapper:s}={...(0,t.a)(),...e.components};return s?(0,c.jsx)(s,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}},11151:(e,s,n)=>{n.d(s,{Z:()=>r,a:()=>i});var c=n(67294);const t={},l=c.createContext(t);function i(e){const s=c.useContext(l);return c.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function r(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),c.createElement(l.Provider,{value:s},e.children)}}}]);