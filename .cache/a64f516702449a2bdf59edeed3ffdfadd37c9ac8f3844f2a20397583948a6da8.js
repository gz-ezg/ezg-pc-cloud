{"source":"(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{450:function(e,t,a){\"use strict\";a.r(t);var o={name:\"tool_product_index\",data:function(){var e=this;return{currentRow:{productname:\"\",concessions:\"\",declaredate:\"\",id:\"\"},submitLoading:!1,editLoading:!1,loading:!1,openCreateProduct:!1,openEditProduct:!1,header:[{title:\"项目名称\",key:\"productname\",minWidth:200},{title:\"优惠补贴\",key:\"concessions\",minWidth:150},{title:\"预计申报时间\",key:\"declaredate\",minWidth:200},{title:\"操作\",key:\"productname\",minWidth:120,render:function(t,a){return t(\"Button\",{props:{type:\"primary\",size:\"small\"},on:{click:function(){e.currentRow.id=a.row.id,e.currentRow.productname=a.row.productname,e.currentRow.concessions=a.row.concessions,e.currentRow.declaredate=a.row.declaredate,e.openEditProduct=!0}}},\"编辑\")}}],total:0,data:[],page:1,openCompanyForm:!0,formValidate:{productname:\"\",concessions:\"\",declaredate:\"\"},ruleValidate:{productname:[{required:!0,message:\"请补全！\",trigger:\"change\"}],concessions:[{required:!0,message:\"请补全！\",trigger:\"change\"}],declaredate:[{required:!0,message:\"请补全！\",trigger:\"change\"}]}}},methods:{get_data:function(){var e=this;e.loading=!0;var t={params:{page:e.page,pageSize:10}};this.$Get(\"api/customer/program/ProgramProductList\",t,function(t){e.total=t.data.data.total,e.data=t.data.data.rows,e.loading=!1})},pageChange:function(e){this.page=e,this.get_data()},submit:function(){var e=this;e.submitLoading=!0;var t={productname:e.formValidate.productname,concessions:e.formValidate.concessions,declaredate:e.formValidate.declaredate};this.$Post(\"api/customer/program/saveProgramProduct\",t,function(t){e.submitLoading=!1,e.get_data(),e.openCreateProduct=!1,e.$refs.formValidate.resetFields()},function(t){e.submitLoading=!1})},edit:function(){var e=this;e.editLoading=!0;var t={id:e.currentRow.id,productname:e.currentRow.productname,concessions:e.currentRow.concessions,declaredate:e.currentRow.declaredate};this.$Post(\"api/customer/program/updateProgramProduct\",t,function(t){e.editLoading=!1,e.get_data(),e.openEditProduct=!1},function(t){e.editLoading=!1})}},created:function(){this.get_data()}},r=a(2),n=Object(r.a)(o,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a(\"div\",[a(\"Card\",[a(\"ButtonGroup\",[a(\"Button\",{attrs:{type:\"primary\",icon:\"ios-color-filter-outline\"},on:{click:function(t){e.openCreateProduct=!0}}},[e._v(\"新增\")])],1),e._v(\" \"),a(\"Row\",{staticStyle:{\"margin-top\":\"10px\"}},[a(\"Table\",{attrs:{\"highlight-row\":\"\",size:\"small\",columns:e.header,data:e.data,loading:e.loading}}),e._v(\" \"),a(\"Page\",{staticStyle:{\"margin-top\":\"10px\"},attrs:{size:\"small\",total:e.total,\"show-total\":\"\",\"show-elevator\":\"\",placement:\"top\"},on:{\"on-change\":e.pageChange}})],1)],1),e._v(\" \"),a(\"Modal\",{attrs:{title:\"新增\",width:\"500\"},model:{value:e.openCreateProduct,callback:function(t){e.openCreateProduct=t},expression:\"openCreateProduct\"}},[a(\"Form\",{ref:\"formValidate\",attrs:{model:e.formValidate,rules:e.ruleValidate,\"label-width\":120}},[a(\"FormItem\",{attrs:{label:\"项目名称：\",prop:\"productname\"}},[a(\"Input\",{attrs:{size:\"small\"},model:{value:e.formValidate.productname,callback:function(t){e.$set(e.formValidate,\"productname\",t)},expression:\"formValidate.productname\"}})],1),e._v(\" \"),a(\"FormItem\",{attrs:{label:\"优惠补贴：\",prop:\"concessions\"}},[a(\"Input\",{attrs:{size:\"small\"},model:{value:e.formValidate.concessions,callback:function(t){e.$set(e.formValidate,\"concessions\",t)},expression:\"formValidate.concessions\"}})],1),e._v(\" \"),a(\"FormItem\",{attrs:{label:\"预计申报时间：\",prop:\"declaredate\"}},[a(\"Input\",{attrs:{size:\"small\"},model:{value:e.formValidate.declaredate,callback:function(t){e.$set(e.formValidate,\"declaredate\",t)},expression:\"formValidate.declaredate\"}})],1)],1),e._v(\" \"),a(\"div\",{attrs:{slot:\"footer\"},slot:\"footer\"},[a(\"Button\",{attrs:{type:\"primary\",loading:e.submitLoading},on:{click:e.submit}},[e._v(\"新增\")])],1)],1),e._v(\" \"),a(\"Modal\",{attrs:{title:\"编辑\",width:\"500\"},model:{value:e.openEditProduct,callback:function(t){e.openEditProduct=t},expression:\"openEditProduct\"}},[a(\"Form\",{ref:\"currentRow\",attrs:{model:e.currentRow,rules:e.ruleValidate,\"label-width\":120}},[a(\"FormItem\",{attrs:{label:\"项目名称：\",prop:\"productname\"}},[a(\"Input\",{attrs:{size:\"small\"},model:{value:e.currentRow.productname,callback:function(t){e.$set(e.currentRow,\"productname\",t)},expression:\"currentRow.productname\"}})],1),e._v(\" \"),a(\"FormItem\",{attrs:{label:\"优惠补贴：\",prop:\"concessions\"}},[a(\"Input\",{attrs:{size:\"small\"},model:{value:e.currentRow.concessions,callback:function(t){e.$set(e.currentRow,\"concessions\",t)},expression:\"currentRow.concessions\"}})],1),e._v(\" \"),a(\"FormItem\",{attrs:{label:\"预计申报时间：\",prop:\"declaredate\"}},[a(\"Input\",{attrs:{size:\"small\"},model:{value:e.currentRow.declaredate,callback:function(t){e.$set(e.currentRow,\"declaredate\",t)},expression:\"currentRow.declaredate\"}})],1)],1),e._v(\" \"),a(\"div\",{attrs:{slot:\"footer\"},slot:\"footer\"},[a(\"Button\",{attrs:{type:\"primary\",loading:e.editLoading},on:{click:e.edit}},[e._v(\"修改\")])],1)],1)],1)},[],!1,null,null,null);n.options.__file=\"index.vue\";t.default=n.exports}}]);"}