{"source":"(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{201:function(e,t,a){\"use strict\";var s=a(97);a.n(s).a},203:function(e,t,a){\"use strict\";var s=a(98);a.n(s).a},448:function(e,t,a){\"use strict\";a.r(t);var s=a(0),o=a.n(s),r={data:function(){return{sso:!0,isSave:!1,form:{userName:\"\",password:\"\",code:\"\",count:\"\"},rules:{userName:[{required:!0,message:\"账号不能为空\",trigger:\"blur\"}],password:[{required:!0,message:\"密码不能为空\",trigger:\"blur\"}]},yzm_url:\"/api/user/createImg\",yzmShow:!1,loading:!1}},methods:{handleSubmit:function(){var e=this,t=this,a={};this.loading=!0,a.username=t.form.userName,a.password=t.form.password,t.count>2&&(a.randomCode=t.form.code),this.$refs.loginForm.validate(function(s){if(s){e.$Post(\"api/user/login/\",a,function(e){t.loading=!0,1==t.isSave?(o.a.set(\"7user\",t.form.userName,{expires:7}),o.a.set(\"7password\",t.form.password,{expires:7}),o.a.set(\"7issave\",t.isSave,{expires:7})):(o.a.set(\"7user\",\"\"),o.a.set(\"7password\",\"\"),o.a.set(\"7issave\",\"\")),o.a.set(\"user\",t.form.userName),o.a.set(\"password\",t.form.password),localStorage.setItem(\"realname\",e.data.data.user.realname),localStorage.setItem(\"id\",e.data.data.user.id),localStorage.setItem(\"companyname\",\"\"),t.getUserRole(e.data.data.user.id)},function(e){t.loading=!1,t.count=e.data.errCount,t.count>2?(t.yzmShow=!0,t.getImg()):t.count<3?(t.yzmShow=!1,t.getImg()):t.getImg()})}})},getInterfaceItem:function(e){var t=this,a={params:{userId:e}};this.$Get(\"api/menu/getInterfaceItemByUserId\",a,function(e){o.a.set(\"access\",e.data.data.interfaces.join()),localStorage.setItem(\"access_array\",JSON.stringify(e.data.data.interfaces)),o.a.set(\"operations\",e.data.data.operations.join()),setTimeout(function(){t.$router.push({name:\"home_index\"})},0)})},getImg:function(){var e=new Date;this.yzm_url=\"/api/user/createImg?a=\"+e.getTime()},keyDown:function(e){\"Enter\"==e.code&&this.handleSubmit()},getUserRole:function(e){var t=this,a={params:{userId:e}};this.$Get(\"api/user/checkUserRoleByUserId\",a,function(a){t.getInterfaceItem(e);for(var s=[],o=0;o<a.data.data.length;o++)s.push(a.data.data[o].rolecode);for(var r=new Map([[\"salers\",\"salers\"],[\"kj\",\"kuaiji\"],[\"kjbgd\",\"kuaiji\"],[\"jzkj\",\"kuaiji\"],[\"servicer\",\"shangshi\"],[\"ssbgd\",\"shangshi\"],[\"planner\",\"qihua\"],[\"qhbgd\",\"qihua\"],[\"auditing\",\"shenji\"],[\"sjbgd\",\"shenji\"],[\"jianzhi\",\"qudao\"]]),n=0;n<s.length;n++){if(r.get(s[n])){localStorage.setItem(\"Main_Role\",r.get(s[n]));break}n==s.length-1&&localStorage.setItem(\"Main_Role\",\"other\")}var i=JSON.stringify(s);localStorage.setItem(\"Role\",i)})},sso_login:function(e,t,a){var s=this;config={params:{userName:e,timeStamp:t,token:a}},this.$Get(\"api/user/ssoLogin\",config,function(t){o.a.set(\"user\",e),o.a.set(\"password\",\"123456\"),localStorage.setItem(\"realname\",t.data.data.user.realname),localStorage.setItem(\"id\",t.data.data.user.id),localStorage.setItem(\"companyname\",\"\"),s.getInterfaceItem(t.data.data.user.id),s.getUserRole(t.data.data.user.id)},function(e){s.$Message.error(\"请输入账号密码登录！\"),s.sso=!0})},get_sso_params:function(e){if(3==e.length)return new Promise(function(t,a){for(var s=[],o=0;o<e.length;o++)s[o]=e[o].split(\"=\")[1];t(s)})},change_yzm:function(){this.getImg()}},mounted:function(){o.a.get(\"7issave\")&&(this.isSave=JSON.parse(o.a.get(\"7issave\")),o.a.get(\"7user\")&&this.isSave&&(this.form.userName=o.a.get(\"7user\"),this.form.password=o.a.get(\"7password\"),this.handleSubmit()))},created:function(){}},n=(a(201),a(203),a(2)),i=Object(n.a)(r,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a(\"div\",{staticClass:\"login\",on:{keydown:function(t){return\"button\"in t||!e._k(t.keyCode,\"enter\",13,t.key,\"Enter\")?e.handleSubmit(t):null}}},[e.sso?e._e():a(\"Spin\",{attrs:{size:\"large\",fix:\"\"}},[a(\"Icon\",{staticClass:\"demo-spin-icon-load\",attrs:{type:\"load-c\",size:\"18\"}}),e._v(\" \"),a(\"div\",[e._v(\"正在登录中...\")])],1),e._v(\" \"),a(\"div\",{staticClass:\"login-con\"},[a(\"Card\",{attrs:{bordered:!1}},[a(\"p\",{attrs:{slot:\"title\"},slot:\"title\"},[a(\"Icon\",{attrs:{type:\"log-in\"}}),e._v(\"\\n                亿账柜信息管理平台\\n            \")],1),e._v(\" \"),a(\"div\",{staticClass:\"form-con\",on:{\"on-keydown\":e.keyDown}},[a(\"Form\",{ref:\"loginForm\",attrs:{model:e.form,rules:e.rules}},[a(\"FormItem\",{staticStyle:{\"margin-bottom\":\"24px\"},attrs:{prop:\"userName\"}},[a(\"Input\",{attrs:{placeholder:\"用户名\"},model:{value:e.form.userName,callback:function(t){e.$set(e.form,\"userName\",t)},expression:\"form.userName\"}}),e._v(\" \"),a(\"span\",{attrs:{slot:\"prepend\"},slot:\"prepend\"},[a(\"Icon\",{attrs:{size:16,type:\"person\"}})],1)],1),e._v(\" \"),a(\"FormItem\",{staticStyle:{\"margin-bottom\":\"24px\"},attrs:{prop:\"password\"}},[a(\"Input\",{attrs:{type:\"password\",placeholder:\"密码\"},model:{value:e.form.password,callback:function(t){e.$set(e.form,\"password\",t)},expression:\"form.password\"}}),e._v(\" \"),a(\"span\",{attrs:{slot:\"prepend\"},slot:\"prepend\"},[a(\"Icon\",{attrs:{size:14,type:\"locked\"}})],1)],1),e._v(\" \"),e.yzmShow?a(\"FormItem\",{attrs:{prop:\"code\",id:\"code\"}},[a(\"Input\",{staticStyle:{width:\"60%\"},attrs:{placeholder:\"验证码\"},model:{value:e.form.code,callback:function(t){e.$set(e.form,\"code\",t)},expression:\"form.code\"}}),e._v(\" \"),a(\"Img\",{staticStyle:{float:\"right\",height:\"32px\"},attrs:{id:\"randCodeImage\",src:e.yzm_url},on:{click:e.change_yzm}})],1):e._e(),e._v(\" \"),a(\"FormItem\",{staticStyle:{\"margin-bottom\":\"6px\"},attrs:{prop:\"isSave\"}},[a(\"Checkbox\",{model:{value:e.isSave,callback:function(t){e.isSave=t},expression:\"isSave\"}},[e._v(\"七天免登陆\")])],1),e._v(\" \"),a(\"FormItem\",[a(\"Button\",{attrs:{type:\"primary\",long:\"\",loading:e.loading},on:{click:e.handleSubmit}},[e._v(\"登录\")])],1)],1),e._v(\" \"),a(\"p\",{staticClass:\"login-tip\"},[e._v(\"© 亿账柜版权所有woa3.0\")])],1)])],1)],1)},[],!1,null,null,null);i.options.__file=\"login.vue\";t.default=i.exports},97:function(e,t,a){},98:function(e,t,a){}}]);"}