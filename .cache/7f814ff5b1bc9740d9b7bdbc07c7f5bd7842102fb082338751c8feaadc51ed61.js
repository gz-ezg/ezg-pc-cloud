{"source":"(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{114:function(e,t,a){},227:function(e,t,a){\"use strict\";var r=a(114);a.n(r).a},421:function(e,t,a){\"use strict\";a.r(t);var r=a(25),o={data:function(){return{tabshow:\"name11\",value1:[1,2],current_row:\"\",huashu:!1,show_allot_detail:!1,task_message:{id:\"\",companyname:\"\",name:\"\",tel:\"\",product:\"\",departname:\"\",servername:\"\",servertel:\"\",followbyrealname:\"\",followbytel:\"\",backup:\"\"},process:{companyName:\"1111111111\"},correlation:{}}},created:function(){var e=this;this.$bus.on(\"openAllotTask\",function(t){e.show_allot_detail=!0,e.current_row=t,e.tabshow=\"name11\",e.getData()})},methods:{getData:function(){var e=this,t=\"api/order/workOrderDetail?workOrderId=\".concat(e.current_row.row.id);this.$http.get(t).then(function(t){e.task_message=t.data.data.taskInfo[0],e.process=t.data.data.process,e.correlation=t.data.data.correlation})}}},n=(a(227),a(2)),s=Object(n.a)(o,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a(\"div\",[a(\"Modal\",{attrs:{title:\"查看详情\",width:\"70%\"},model:{value:e.show_allot_detail,callback:function(t){e.show_allot_detail=t},expression:\"show_allot_detail\"}},[a(\"Tabs\",{model:{value:e.tabshow,callback:function(t){e.tabshow=t},expression:\"tabshow\"}},[a(\"TabPane\",{attrs:{label:\"任务信息\",name:\"name11\"}},[a(\"Collapse\",{model:{value:e.value1,callback:function(t){e.value1=t},expression:\"value1\"}},[a(\"Panel\",{attrs:{name:\"1\"}},[e._v(\"\\n                        基本信息\\n                        \"),a(\"div\",{attrs:{slot:\"content\"},slot:\"content\"},[a(\"Form\",{ref:\"task_message\",attrs:{model:e.task_message,\"label-width\":90}},[a(\"Row\",[a(\"Col\",{attrs:{span:\"12\"}},[a(\"FormItem\",{attrs:{label:\"公司名称：\",prop:\"Input\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:e.task_message.companyname,callback:function(t){e.$set(e.task_message,\"companyname\",t)},expression:\"task_message.companyname\"}})],1)],1)],1),e._v(\" \"),a(\"Row\",[a(\"Col\",{attrs:{span:\"12\"}},[a(\"FormItem\",{attrs:{label:\"客户名称：\",prop:\"Input\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:e.task_message.name,callback:function(t){e.$set(e.task_message,\"name\",t)},expression:\"task_message.name\"}})],1)],1),e._v(\" \"),a(\"Col\",{attrs:{span:\"12\"}},[a(\"FormItem\",{attrs:{label:\"客户电话：\",prop:\"Input\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:e.task_message.tel,callback:function(t){e.$set(e.task_message,\"tel\",t)},expression:\"task_message.tel\"}})],1)],1)],1),e._v(\" \"),a(\"Row\",[a(\"Col\",{attrs:{span:\"12\"}},[a(\"FormItem\",{attrs:{label:\"产品名称：\",prop:\"Input\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:e.task_message.product,callback:function(t){e.$set(e.task_message,\"product\",t)},expression:\"task_message.product\"}})],1)],1),e._v(\" \"),a(\"Col\",{attrs:{span:\"12\"}},[a(\"FormItem\",{attrs:{label:\"服务部门：\",prop:\"Input\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:e.task_message.departname,callback:function(t){e.$set(e.task_message,\"departname\",t)},expression:\"task_message.departname\"}})],1)],1)],1),e._v(\" \"),a(\"Row\",[a(\"Col\",{attrs:{span:\"24\"}},[a(\"FormItem\",{attrs:{label:\"服务备注：\",prop:\"customerMemo\"}},[a(\"Input\",{attrs:{size:\"small\",type:\"textarea\"},model:{value:e.task_message.backup,callback:function(t){e.$set(e.task_message,\"backup\",t)},expression:\"task_message.backup\"}})],1)],1)],1)],1)],1)]),e._v(\" \"),a(\"Panel\",{attrs:{name:\"2\"}},[e._v(\"\\n                        相关联系人\\n                        \"),a(\"div\",{attrs:{slot:\"content\"},slot:\"content\"},[a(\"Form\",{ref:\"task_message\",attrs:{model:e.task_message,\"label-width\":90}},[a(\"Row\",[a(\"Col\",{attrs:{span:\"12\"}},[a(\"FormItem\",{attrs:{label:\"服务人员：\",prop:\"Input\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:e.task_message.servername,callback:function(t){e.$set(e.task_message,\"servername\",t)},expression:\"task_message.servername\"}})],1)],1),e._v(\" \"),a(\"Col\",{attrs:{span:\"12\"}},[a(\"FormItem\",{attrs:{label:\"联系方式：\",prop:\"Input\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:e.task_message.servertel,callback:function(t){e.$set(e.task_message,\"servertel\",t)},expression:\"task_message.servertel\"}})],1)],1)],1),e._v(\" \"),a(\"Row\",[a(\"Col\",{attrs:{span:\"12\"}},[a(\"FormItem\",{attrs:{label:\"销售人员：\",prop:\"Input\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:e.task_message.followbyrealname,callback:function(t){e.$set(e.task_message,\"followbyrealname\",t)},expression:\"task_message.followbyrealname\"}})],1)],1),e._v(\" \"),a(\"Col\",{attrs:{span:\"12\"}},[a(\"FormItem\",{attrs:{label:\"联系方式：\",prop:\"Input\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:e.task_message.followbytel,callback:function(t){e.$set(e.task_message,\"followbytel\",t)},expression:\"task_message.followbytel\"}})],1)],1)],1)],1)],1)])],1)],1),e._v(\" \"),a(\"TabPane\",{attrs:{label:\"相关在服工单\",name:\"name44\"}},[a(\"Row\",[a(\"Scroll\",{attrs:{height:\"500\"}},[e.correlation.length?e._e():a(\"div\",[a(\"center\",[e._v(\"暂无数据\")])],1),e._v(\" \"),e._l(e.correlation,function(t,r){return a(\"div\",{key:r},[a(\"Form\",{ref:\"item\",refInFor:!0,staticStyle:{margin:\"10px\",padding:\"5px\",\"padding-top\":\"10px\",border:\"1px solid #EEE9E9\"},attrs:{model:t,\"label-width\":100}},[a(\"Row\",[a(\"Col\",{staticStyle:{visibility:\"hidden\"},attrs:{span:\"1\"}}),e._v(\" \"),a(\"Col\",{attrs:{span:\"10\"}},[a(\"FormItem\",{attrs:{label:\"公司名称：\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:t.companyname,callback:function(a){e.$set(t,\"companyname\",a)},expression:\"item.companyname\"}})],1)],1),e._v(\" \"),a(\"Col\",{attrs:{span:\"10\"}},[a(\"FormItem\",{attrs:{label:\"所办服务：\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:t.product,callback:function(a){e.$set(t,\"product\",a)},expression:\"item.product\"}})],1)],1)],1),e._v(\" \"),a(\"Row\",[a(\"Col\",{staticStyle:{visibility:\"hidden\"},attrs:{span:\"1\"}}),e._v(\" \"),a(\"Col\",{attrs:{span:\"10\"}},[a(\"FormItem\",{attrs:{label:\"目前进度：\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:t.CurrentProcess,callback:function(a){e.$set(t,\"CurrentProcess\",a)},expression:\"item.CurrentProcess\"}})],1)],1),e._v(\" \"),a(\"Col\",{attrs:{span:\"10\"}},[a(\"FormItem\",{attrs:{label:\"服务部门：\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:t.departname,callback:function(a){e.$set(t,\"departname\",a)},expression:\"item.departname\"}})],1)],1)],1),e._v(\" \"),a(\"Row\",[a(\"Col\",{staticStyle:{visibility:\"hidden\"},attrs:{span:\"1\"}}),e._v(\" \"),a(\"Col\",{attrs:{span:\"10\"}},[a(\"FormItem\",{attrs:{label:\"服务人员：\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:t.servername,callback:function(a){e.$set(t,\"servername\",a)},expression:\"item.servername\"}})],1)],1),e._v(\" \"),a(\"Col\",{attrs:{span:\"10\"}},[a(\"FormItem\",{attrs:{label:\"联系方式：\"}},[a(\"Input\",{attrs:{readonly:\"\"},model:{value:t.servertel,callback:function(a){e.$set(t,\"servertel\",a)},expression:\"item.servertel\"}})],1)],1)],1)],1)],1)})],2)],1)],1)],1),e._v(\" \"),a(\"div\",{attrs:{slot:\"footer\"},slot:\"footer\"},[a(\"Button\",{attrs:{type:\"ghost\"},on:{click:function(t){e.show_allot_detail=!1}}},[e._v(\"关闭\")])],1)],1)],1)},[],!1,null,null,null);s.options.__file=\"detail.vue\";var l=s.exports,i={data:function(){return{show:!0,common_allot_open:!1,workorderIds:\"\",departName:\"\",ServiceDeptID:\"\",allDepartUser:[],loading:!1,servicerID:\"\"}},methods:{getAllUserList:function(){var e=\"api/user/getUserListByDepartId?departId=\"+this.ServiceDeptID,t=this;this.$http.get(e).then(function(e){t.allDepartUser=e.data.data})},allot:function(){var e=this;e.loading=!0;var t={workOrderIds:e.workorderIds,userId:e.servicerID};this.$Post(\"api/order/batchUpdateServicer\",t,function(t){e.show=!1,e.workorderIds=\"\",e.departName=\"\",e.ServiceDeptID=\"\",e.servicerID=\"\",e.common_allot_open=!1,e.$bus.emit(\"update_allot_index\",!0),e.loading=!1},function(t){e.loading=!1})}},created:function(){var e=this;this.$bus.on(\"global_allot_commonorder\",function(t){e.show=!0,e.ServiceDeptID=t[0],e.departName=t[1],e.workorderIds=t[2],e.getAllUserList(),e.common_allot_open=!0})}},c=Object(n.a)(i,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a(\"Modal\",{attrs:{title:\"一键分配工单\",width:\"300\"},model:{value:e.common_allot_open,callback:function(t){e.common_allot_open=t},expression:\"common_allot_open\"}},[a(\"Form\",{attrs:{\"label-width\":90}},[a(\"Row\",{attrs:{gutter:16}},[a(\"Col\",{staticStyle:{visibility:\"hidden\"},attrs:{span:\"1\"}},[e._v(\"1\")]),e._v(\" \"),a(\"Col\",{attrs:{span:\"20\"}},[a(\"FormItem\",{attrs:{prop:\"departName\",label:\"服务部门：\"}},[a(\"Input\",{attrs:{type:\"text\",readonly:\"\"},model:{value:e.departName,callback:function(t){e.departName=t},expression:\"departName\"}})],1)],1)],1),e._v(\" \"),e.show?a(\"Row\",{attrs:{gutter:16}},[a(\"Col\",{staticStyle:{visibility:\"hidden\"},attrs:{span:\"1\"}},[e._v(\"1\")]),e._v(\" \"),a(\"Col\",{attrs:{span:\"20\"}},[a(\"FormItem\",{attrs:{label:\"服务人员：\"}},[a(\"Select\",{attrs:{transfer:\"\",filterable:\"\"},model:{value:e.servicerID,callback:function(t){e.servicerID=t},expression:\"servicerID\"}},e._l(e.allDepartUser,function(t,r){return a(\"Option\",{key:r,attrs:{value:t.id}},[e._v(e._s(t.realname))])}),1)],1)],1)],1):e._e()],1),e._v(\" \"),a(\"div\",{attrs:{slot:\"footer\"},slot:\"footer\"},[a(\"Button\",{attrs:{type:\"ghost\"},on:{click:function(t){e.common_allot_open=!1}}},[e._v(\"关闭\")]),e._v(\" \"),a(\"Button\",{attrs:{type:\"primary\",loading:e.loading},on:{click:e.allot}},[e._v(\"分配\")])],1)],1)},[],!1,null,null,null);c.options.__file=\"allot_service.vue\";var p=c.exports,m={data:function(){return{show:!0,workorderIds:\"\",departName:\"\",ServiceDeptID:\"\",allDepartUser:\"\",allot_account_open:!1,loading:!1,servicerID:\"\"}},methods:{getAllUserList:function(){var e=\"api/user/getAllUserListByDepartId?departId=\"+this.ServiceDeptID,t=this;this.$http.get(e).then(function(e){t.allDepartUser=e.data.data})},allotAccount:function(){var e=this;e.loading=!0;var t={workOrderIds:e.workorderIds,userId:e.servicerID,managerId:e.servicerID};this.$Post(\"api/order/work/order/share\",t,function(){e.show=!1,e.workorderIds=\"\",e.servicerID=\"\",e.ServiceDeptID=\"\",e.departName=\"\",e.allot_account_open=!1,e.$bus.emit(\"update_allot_index\",!0),e.loading=!1},function(){e.loading=!1})}},created:function(){var e=this;this.$bus.on(\"global_allot_accountorder\",function(t){e.show=!0,e.ServiceDeptID=t[0],e.departName=t[1],e.workorderIds=t[2],e.getAllUserList(),e.allot_account_open=!0})}},d=Object(n.a)(m,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a(\"Modal\",{attrs:{title:\"分配会计\",width:\"300\"},model:{value:e.allot_account_open,callback:function(t){e.allot_account_open=t},expression:\"allot_account_open\"}},[a(\"Form\",{attrs:{\"label-width\":90}},[a(\"Row\",{attrs:{gutter:16}},[a(\"Col\",{staticStyle:{visibility:\"hidden\"},attrs:{span:\"1\"}},[e._v(\"1\")]),e._v(\" \"),a(\"Col\",{attrs:{span:\"20\"}},[a(\"FormItem\",{attrs:{prop:\"departName\",label:\"服务部门：\"}},[a(\"Input\",{attrs:{type:\"text\",readonly:\"\"},model:{value:e.departName,callback:function(t){e.departName=t},expression:\"departName\"}})],1)],1)],1),e._v(\" \"),e.show?a(\"Row\",{attrs:{gutter:16}},[a(\"Col\",{staticStyle:{visibility:\"hidden\"},attrs:{span:\"1\"}},[e._v(\"1\")]),e._v(\" \"),a(\"Col\",{attrs:{span:\"20\"}},[a(\"FormItem\",{attrs:{prop:\"companyName\",label:\"服务人员\"}},[a(\"Select\",{attrs:{transfer:\"\",filterable:\"\"},model:{value:e.servicerID,callback:function(t){e.servicerID=t},expression:\"servicerID\"}},e._l(e.allDepartUser,function(t){return a(\"Option\",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.realname))])}),1)],1)],1)],1):e._e()],1),e._v(\" \"),a(\"div\",{attrs:{slot:\"footer\"},slot:\"footer\"},[a(\"Button\",{attrs:{type:\"ghost\"},on:{click:function(t){e.allot_account_open=!1}}},[e._v(\"关闭\")]),e._v(\" \"),a(\"Button\",{attrs:{type:\"primary\",loading:e.loading},on:{click:e.allotAccount}},[e._v(\"分配\")])],1)],1)},[],!1,null,null,null);d.options.__file=\"allot_accout_service.vue\";var u={components:{AllotDetail:l,allotAccountService:d.exports,allotService:p},data:function(){var e=this;return{companyarea:\"\",search_model:\"\",local_router_name:\"\",Nloading:!1,Yloading:!1,isSearhN:!1,isSearhY:!1,change_rowN:[],change_rowY:[],detailModal:!1,formInlineN:{companyname:\"\",servicename:\"\",departname:\"\"},formInlineY:{companyname:\"\",servicename:\"\",departname:\"\",allottime:[]},columns:[{type:\"selection\",width:60,align:\"center\"},{title:\"归属公司\",key:\"companyname\",width:220,render:function(e,t){return\"\"==t.row.companyname||null==t.row.companyname?\"\":t.row.companyname.length>12?e(\"Poptip\",{props:{trigger:\"hover\",placement:\"bottom\"}},[e(\"span\",t.row.companyname.slice(0,12)+\"...\"),e(\"Icon\",{props:{type:\"arrow-down-b\"}}),e(\"div\",{slot:\"content\"},[e(\"span\",t.row.companyname)])]):e(\"span\",t.row.companyname)}},{title:\"公司注册地\",key:\"companyarea\",width:120},{title:\"归属客户\",key:\"name\",width:120},{title:\"产品全称\",key:\"product\",width:200,render:function(e,t){return\"\"==t.row.product||null==t.row.product?\"\":t.row.product.length>10?e(\"Poptip\",{props:{trigger:\"hover\",placement:\"bottom\"}},[e(\"span\",t.row.product.slice(0,10)+\"...\"),e(\"Icon\",{props:{type:\"arrow-down-b\"}}),e(\"div\",{slot:\"content\"},[e(\"span\",t.row.product)])]):e(\"span\",t.row.product)}},{title:\"产品数量\",key:\"productnumber\",width:120},{title:\"订单号\",key:\"ordercode\",width:150},{title:\"服务部门\",key:\"departname\",width:120},{title:\"更新时间\",key:\"UpdateDate\",width:120},{title:\"创建时间\",key:\"CreateDate\",width:120},{title:\"跟进人\",key:\"followname\",width:120},{title:\"操作\",key:\"action\",fixed:\"right\",width:70,align:\"center\",render:function(t,a){return t(\"div\",[t(\"Button\",{props:{type:\"text\",size:\"small\"},style:{marginRight:\"5px\"},on:{click:function(){e.$store.commit(\"open_gobal_work_order_detail_modal\",a.row.id)}}},\"详情\")])}}],Ycolumns:[{type:\"selection\",width:60,align:\"center\"},{title:\"归属公司\",key:\"companyname\",width:220,render:function(e,t){return\"\"==t.row.companyname||null==t.row.companyname?\"\":t.row.companyname.length>12?e(\"Poptip\",{props:{trigger:\"hover\",placement:\"bottom\"}},[e(\"span\",t.row.companyname.slice(0,12)+\"...\"),e(\"Icon\",{props:{type:\"arrow-down-b\"}}),e(\"div\",{slot:\"content\"},[e(\"span\",t.row.companyname)])]):e(\"span\",t.row.companyname)}},{title:\"公司注册地\",key:\"companyarea\",width:120},{title:\"归属客户\",key:\"name\",width:120},{title:\"产品全称\",key:\"product\",width:200,render:function(e,t){return\"\"==t.row.product||null==t.row.product?\"\":t.row.product.length>10?e(\"Poptip\",{props:{trigger:\"hover\",placement:\"bottom\"}},[e(\"span\",t.row.product.slice(0,10)+\"...\"),e(\"Icon\",{props:{type:\"arrow-down-b\"}}),e(\"div\",{slot:\"content\"},[e(\"span\",t.row.product)])]):e(\"span\",t.row.product)}},{title:\"订单号\",key:\"ordercode\",width:150},{title:\"服务人员\",key:\"servername\",width:120},{title:\"当前流程\",key:\"CurrentProcess\",width:120},{title:\"服务起始时间\",key:\"ServiceStart\",width:120},{title:\"服务终止时间\",key:\"ServiceEnd\",width:120},{title:\"是否开始执行\",key:\"IsWork\",width:120},{title:\"分配时间\",key:\"allotTime\",width:120},{title:\"服务部门\",key:\"departname\",width:120},{title:\"服务是否完成\",key:\"IsOver\",width:120},{title:\"更新时间\",key:\"UpdateDate\",width:120},{title:\"创建时间\",key:\"CreateDate\",width:120},{title:\"跟进人\",key:\"followname\",width:120},{title:\"操作\",key:\"action\",fixed:\"right\",width:70,align:\"center\",render:function(t,a){return t(\"div\",[t(\"Button\",{props:{type:\"text\",size:\"small\"},style:{marginRight:\"5px\"},on:{click:function(){e.$store.commit(\"open_gobal_work_order_detail_modal\",a.row.id)}}},\"详情\")])}}],NpageTotal:new Number,Npage:1,NpageSize:10,Ndata:[],YpageTotal:new Number,Ypage:1,YpageSize:10,Ydata:[]}},methods:{getDataN:function(){var e=this;e.Nloading=!0;var t={params:{page:e.Npage,pageSize:e.NpageSize,workOrderStatus:\"10\",companyName:e.formInlineN.companyname,serviceName:e.formInlineN.servicename,departname:e.formInlineN.departname,serviceDept:\"\".concat(e.local_router_name)}};e.$http.get(\"api/order/workOrderList?&sortField=UpdateDate\",t).then(function(t){e.$backToLogin(t),e.Ndata=t.data.data.rows,e.NpageTotal=t.data.data.total;for(var a=0;a<t.data.data.rows.length;a++)if(null==e.Ndata[a].UpdateDate||\"\"==e.Ndata[a].UpdateDate||(e.Ndata[a].UpdateDate=e.Ndata[a].UpdateDate.slice(0,10)),null==e.Ndata[a].CreateDate||\"\"==e.Ndata[a].CreateDate||(e.Ndata[a].CreateDate=e.Ndata[a].CreateDate.slice(0,10)),e.Ndata[a].companyarea){for(var r=e.Ndata[a].companyarea.split(\"-\"),o=0;o<e.companyarea.length;o++)if(r[0]==e.companyarea[o].id)for(var n=0;n<e.companyarea[o].children.length;n++)r[1]==e.companyarea[o].children[n].id&&(e.Ndata[a].companyarea=e.companyarea[o].typename+\" - \"+e.companyarea[o].children[n].typename)}else e.Ndata[a].companyarea=\"\";e.Nloading=!1})},NpageChange:function(e){this.Npage=e,this.getDataN()},NpageSizeChange:function(e){this.NpageSize=e,this.getDataN()},searchN:function(){this.Npage=1,this.isSearhN=!0,this.getDataN()},resetN:function(){this.isSearhN=!1,this.Npage=1,this.formInlineN.companyname=\"\",this.formInlineN.servicename=\"\",this.formInlineN.departname=\"\",this.getDataN()},getDataY:function(){var e=this;e.Yloading=!0;var t={params:{page:e.Ypage,pageSize:e.YpageSize,nonWorkOrderStatus:\"10\",companyName:e.formInlineY.companyname,serviceName:e.formInlineY.servicename,departname:e.formInlineY.departname,serviceDept:\"\".concat(e.local_router_name),ballottime:Object(r.a)(e.formInlineY.allottime[0]),eallottime:Object(r.a)(e.formInlineY.allottime[1])}};e.$http.get(\"api/order/workOrderList?&sortField=UpdateDate\",t).then(function(t){e.$backToLogin(t),e.Ydata=t.data.data.rows,e.YpageTotal=t.data.data.total;for(var a=0;a<t.data.data.rows.length;a++)if(null==e.Ydata[a].UpdateDate||\"\"==e.Ydata[a].UpdateDate||(e.Ydata[a].UpdateDate=e.Ydata[a].UpdateDate.slice(0,10)),null==e.Ydata[a].CreateDate||\"\"==e.Ydata[a].CreateDate||(e.Ydata[a].CreateDate=e.Ydata[a].CreateDate.slice(0,10)),null==e.Ydata[a].ServiceStart||\"\"==e.Ydata[a].ServiceStart||(e.Ydata[a].ServiceStart=e.Ydata[a].ServiceStart.slice(0,10)),null==e.Ydata[a].allotTime||\"\"==e.Ydata[a].allotTime||(e.Ydata[a].allotTime=e.Ydata[a].allotTime.slice(0,10)),null==e.Ydata[a].ServiceEnd||\"\"==e.Ydata[a].ServiceEnd||(e.Ydata[a].ServiceEnd=e.Ydata[a].ServiceEnd.slice(0,10)),e.Ydata[a].companyarea){for(var r=e.Ydata[a].companyarea.split(\"-\"),o=0;o<e.companyarea.length;o++)if(r[0]==e.companyarea[o].id)for(var n=0;n<e.companyarea[o].children.length;n++)r[1]==e.companyarea[o].children[n].id&&(e.Ydata[a].companyarea=e.companyarea[o].typename+\" - \"+e.companyarea[o].children[n].typename)}else e.Ydata[a].companyarea=\"\";e.Yloading=!1})},YpageChange:function(e){this.Ypage=e,this.getDataY()},YpageSizeChange:function(e){this.YpageSize=e,this.getDataY()},searchY:function(){this.Ypage=1,this.isSearhY=!0,this.getDataY()},resetY:function(){this.isSearhN=!1,this.Npage=1,this.formInlineY.companyname=\"\",this.formInlineY.servicename=\"\",this.formInlineY.departname=\"\",this.formInlineY.allottime=[],this.getDataY()},select_change:function(e){this.change_rowN=[],this.change_rowN=e},select_change2:function(e){this.change_rowY=[],this.change_rowY=e},Distribution_task:function(){var e=!1;if(\"\"!=this.change_rowN){for(var t=this.change_rowN[0].ServiceDeptID,a=0;a<this.change_rowN.length;a++)t==this.change_rowN[a].ServiceDeptID&&a==this.change_rowN.length-1&&(e=!0);if(1==e){for(var r=[],o=0;o<this.change_rowN.length;o++)r.push(this.change_rowN[o].id);var n=r.join(\",\");\"'ACCOUNT'\"==this.local_router_name?this.$bus.emit(\"global_allot_accountorder\",[this.change_rowN[0].ServiceDeptID,this.change_rowN[0].departname,n]):this.$bus.emit(\"global_allot_commonorder\",[this.change_rowN[0].ServiceDeptID,this.change_rowN[0].departname,n])}else this.$Message.warning(\"请选择相同的服务部门！\")}else this.$Message.warning(\"请选择需要分配的工单！\")},transfer_task:function(){var e=!1;if(\"\"!=this.change_rowY){for(var t=this.change_rowY[0].ServiceDeptID,a=0;a<this.change_rowY.length;a++)t==this.change_rowY[a].ServiceDeptID&&a==this.change_rowY.length-1&&(e=!0);if(1==e){for(var r=[],o=0;o<this.change_rowY.length;o++)r.push(this.change_rowY[o].id);var n=r.join(\",\");\"'ACCOUNT'\"==this.local_router_name?this.$bus.emit(\"global_allot_accountorder\",[this.change_rowY[0].ServiceDeptID,this.change_rowY[0].departname,n]):this.$bus.emit(\"global_allot_commonorder\",[this.change_rowY[0].ServiceDeptID,this.change_rowY[0].departname,n])}else this.$Message.warning(\"请选择相同的服务部门！\")}else this.$Message.warning(\"请选择需要分配的工单！\")},allot:function(){for(var e=this,t=[],a=0;a<e.change_rowN.length;a++)t.push(e.change_rowN[a].id);e.workOrderIds=t.join(\",\");var r={workOrderIds:e.workOrderIds,userId:e.userId};this.$http.post(\"api/order/batchUpdateServicer\",r).then(function(t){4e4==t.data.msgCode?(e.$Message.success(t.data.msg),e.Distribution=!1,e.getDataN(),e.getDataY(),e.userId=\"\"):e.$Message.error(t.data.msg)})},allot2:function(){for(var e=this,t=[],a=0;a<e.change_rowY.length;a++)t.push(e.change_rowY[a].id);e.workOrderIds=t.join(\",\");var r={workOrderIds:e.workOrderIds,userId:e.userId};this.$http.post(\"api/order/batchUpdateServicer\",r).then(function(t){4e4==t.data.msgCode?(e.$Message.success(t.data.msg),e.transfer=!1,e.getDataN(),e.getDataY(),e.userId=\"\"):e.$Message.error(t.data.msg)})},init:function(){this.local_router_name=\"'\".concat(this.$route.params.depart,\"'\"),this.Npage=1,this.Ypage=1,this.getDataY(),this.getDataN(),this.change_rowN=[],this.change_rowY=[]},getDataCenter:function(){var e=this;this.$GetDataCenter(\"companyarea\",function(t){e.companyarea=t.data.data.companyarea})}},watch:{$route:\"init\"},mounted:function(){this.init()},created:function(){var e=this;e.getDataCenter(),e.$bus.on(\"update_allot_index\",function(t){e.init(),e.Ypage=1,e.Npage=1})}},h=Object(n.a)(u,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a(\"div\",{staticStyle:{\"min-width\":\"900px\"}},[a(\"Tabs\",{staticStyle:{\"padding-bottom\":\"150px\"},attrs:{value:\"name1\"}},[a(\"TabPane\",{attrs:{label:\"待分配\",name:\"name1\"}},[a(\"Card\",[a(\"Row\",{staticStyle:{\"margin-bottom\":\"10px\"}},[a(\"Collapse\",{model:{value:e.search_model,callback:function(t){e.search_model=t},expression:\"search_model\"}},[a(\"Panel\",{attrs:{name:\"1\"}},[a(\"Icon\",{staticStyle:{\"margin-left\":\"20px\",\"margin-right\":\"5px\"},attrs:{type:\"search\"}}),e._v(\"\\n                            筛选\\n                            \"),a(\"div\",{attrs:{slot:\"content\"},on:{keydown:function(t){return\"button\"in t||!e._k(t.keyCode,\"enter\",13,t.key,\"Enter\")?e.searchN(t):null}},slot:\"content\"},[a(\"Form\",{ref:\"formInlineN\",attrs:{model:e.formInlineN,\"label-width\":100}},[a(\"Row\",{attrs:{gutter:16}},[a(\"Col\",{attrs:{span:\"8\"}},[a(\"FormItem\",{attrs:{prop:\"companyName\",label:\"公司名称：\"}},[a(\"Input\",{attrs:{type:\"text\",placeholder:\"\",size:\"small\"},model:{value:e.formInlineN.companyname,callback:function(t){e.$set(e.formInlineN,\"companyname\",t)},expression:\"formInlineN.companyname\"}})],1)],1),e._v(\" \"),a(\"Col\",{attrs:{span:\"8\"}},[a(\"FormItem\",{attrs:{prop:\"departname\",label:\"服务部门：\"}},[a(\"Input\",{attrs:{type:\"text\",placeholder:\"\",size:\"small\"},model:{value:e.formInlineN.departname,callback:function(t){e.$set(e.formInlineN,\"departname\",t)},expression:\"formInlineN.departname\"}})],1)],1)],1),e._v(\" \"),a(\"FormItem\",[a(\"Button\",{attrs:{type:\"primary\"},on:{click:e.searchN}},[e._v(\"搜索\")]),e._v(\" \"),a(\"Button\",{staticStyle:{\"margin-left\":\"20px\"},attrs:{type:\"ghost\"},on:{click:e.resetN}},[e._v(\"重置\")])],1)],1)],1)],1)],1)],1),e._v(\" \"),a(\"Row\",[a(\"ButtonGroup\",[a(\"Button\",{directives:[{name:\"permission\",rawName:\"v-permission\",value:[\"workorder.allot\"],expression:\"['workorder.allot']\"}],attrs:{type:\"primary\",icon:\"ios-color-wand-outline\"},on:{click:e.Distribution_task}},[e._v(\"一键分配\")])],1)],1),e._v(\" \"),a(\"Row\",{staticStyle:{\"margin-top\":\"10px\"}},[a(\"Table\",{ref:\"selection\",attrs:{\"highlight-row\":\"\",size:\"small\",columns:e.columns,data:e.Ndata,loading:e.Nloading},on:{\"on-selection-change\":e.select_change}}),e._v(\" \"),a(\"Page\",{staticStyle:{\"margin-top\":\"10px\"},attrs:{size:\"small\",total:e.NpageTotal,placement:\"top\",current:e.Npage,\"show-total\":\"\",\"show-sizer\":\"\",\"show-elevator\":\"\"},on:{\"update:current\":function(t){e.Npage=t},\"on-change\":e.NpageChange,\"on-page-size-change\":e.NpageSizeChange}})],1)],1)],1),e._v(\" \"),a(\"TabPane\",{attrs:{label:\"已分配\",name:\"name2\"}},[a(\"Card\",[a(\"Row\",{staticStyle:{\"margin-bottom\":\"10px\"}},[a(\"Collapse\",{model:{value:e.search_model,callback:function(t){e.search_model=t},expression:\"search_model\"}},[a(\"Panel\",{attrs:{name:\"1\"}},[a(\"Icon\",{staticStyle:{\"margin-left\":\"20px\",\"margin-right\":\"5px\"},attrs:{type:\"search\"}}),e._v(\"\\n                            筛选\\n                            \"),a(\"div\",{attrs:{slot:\"content\"},on:{keydown:function(t){return\"button\"in t||!e._k(t.keyCode,\"enter\",13,t.key,\"Enter\")?e.searchY(t):null}},slot:\"content\"},[a(\"Form\",{ref:\"formInlineY\",attrs:{model:e.formInlineY,\"label-width\":100}},[a(\"Row\",{attrs:{gutter:16}},[a(\"Col\",{attrs:{span:\"8\"}},[a(\"FormItem\",{attrs:{prop:\"companyName\",label:\"公司名称：\"}},[a(\"Input\",{attrs:{type:\"text\",placeholder:\"\",size:\"small\"},model:{value:e.formInlineY.companyname,callback:function(t){e.$set(e.formInlineY,\"companyname\",t)},expression:\"formInlineY.companyname\"}})],1)],1),e._v(\" \"),a(\"Col\",{attrs:{span:\"8\"}},[a(\"FormItem\",{attrs:{prop:\"servicename\",label:\"服务人员名称：\"}},[a(\"Input\",{attrs:{type:\"text\",placeholder:\"\",size:\"small\"},model:{value:e.formInlineY.servicename,callback:function(t){e.$set(e.formInlineY,\"servicename\",t)},expression:\"formInlineY.servicename\"}})],1)],1),e._v(\" \"),a(\"Col\",{attrs:{span:\"8\"}},[a(\"FormItem\",{attrs:{prop:\"departname\",label:\"服务部门：\"}},[a(\"Input\",{attrs:{type:\"text\",placeholder:\"\",size:\"small\"},model:{value:e.formInlineY.departname,callback:function(t){e.$set(e.formInlineY,\"departname\",t)},expression:\"formInlineY.departname\"}})],1)],1)],1),e._v(\" \"),a(\"Row\",{attrs:{gutter:16}},[a(\"Col\",{attrs:{span:\"8\"}},[a(\"FormItem\",{attrs:{prop:\"allottime\",label:\"分配时间：\"}},[a(\"DatePicker\",{attrs:{type:\"daterange\",placeholder:\"\",size:\"small\"},model:{value:e.formInlineY.allottime,callback:function(t){e.$set(e.formInlineY,\"allottime\",t)},expression:\"formInlineY.allottime\"}})],1)],1)],1),e._v(\" \"),a(\"FormItem\",[a(\"Button\",{attrs:{type:\"primary\"},on:{click:e.searchY}},[e._v(\"搜索\")]),e._v(\" \"),a(\"Button\",{staticStyle:{\"margin-left\":\"20px\"},attrs:{type:\"ghost\"},on:{click:e.resetY}},[e._v(\"重置\")])],1)],1)],1)],1)],1)],1),e._v(\" \"),a(\"Row\",[a(\"ButtonGroup\",[a(\"Button\",{attrs:{type:\"primary\",icon:\"ios-color-wand-outline\"},on:{click:e.transfer_task}},[e._v(\"批量转移\")])],1)],1),e._v(\" \"),a(\"Row\",{staticStyle:{\"margin-top\":\"10px\"}},[a(\"Table\",{ref:\"selection\",attrs:{\"highlight-row\":\"\",size:\"small\",columns:e.Ycolumns,data:e.Ydata,loading:e.Yloading},on:{\"on-selection-change\":e.select_change2}}),e._v(\" \"),a(\"Page\",{staticStyle:{\"margin-top\":\"10px\"},attrs:{size:\"small\",total:e.YpageTotal,current:e.Ypage,placement:\"top\",\"show-total\":\"\",\"show-sizer\":\"\",\"show-elevator\":\"\"},on:{\"update:current\":function(t){e.Ypage=t},\"on-change\":e.YpageChange,\"on-page-size-change\":e.YpageSizeChange}})],1)],1)],1)],1),e._v(\" \"),a(\"AllotDetail\"),e._v(\" \"),a(\"allot-account-service\"),e._v(\" \"),a(\"allot-service\")],1)},[],!1,null,null,null);h.options.__file=\"index.vue\";t.default=h.exports}}]);"}