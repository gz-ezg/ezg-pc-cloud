{"source":"(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{415:function(e,t,a){},416:function(e,t,a){},634:function(e,t,a){\"use strict\";var s=a(415);a.n(s).a},636:function(e,t,a){\"use strict\";var s=a(416);a.n(s).a},869:function(e,t,a){\"use strict\";a.r(t);var s=a(1),o=a.n(s),r={data:function(){return{sso:!0,isSave:!1,form:{userName:\"\",password:\"\",code:\"\",count:\"\"},rules:{userName:[{required:!0,message:\"账号不能为空\",trigger:\"blur\"}],password:[{required:!0,message:\"密码不能为空\",trigger:\"blur\"}]},yzm_url:\"/api/user/createImg\",yzmShow:!1,loading:!1}},methods:{handleSubmit:function(){var t=this,a=this,s={};this.loading=!0,s.username=a.form.userName,s.password=a.form.password,2<a.count&&(s.randomCode=a.form.code),this.$refs.loginForm.validate(function(e){if(e){t.$Post(\"api/user/login/\",s,function(e){a.loading=!0,1==a.isSave?(o.a.set(\"7user\",a.form.userName,{expires:7}),o.a.set(\"7password\",a.form.password,{expires:7}),o.a.set(\"7issave\",a.isSave,{expires:7})):(o.a.set(\"7user\",\"\"),o.a.set(\"7password\",\"\"),o.a.set(\"7issave\",\"\")),o.a.set(\"user\",a.form.userName),o.a.set(\"password\",a.form.password),localStorage.setItem(\"realname\",e.data.data.user.realname),localStorage.setItem(\"id\",e.data.data.user.id),localStorage.setItem(\"companyname\",\"\"),a.getUserRole(e.data.data.user.id)},function(e){a.loading=!1,a.count=e.data.errCount,2<a.count?a.yzmShow=!0:a.count<3&&(a.yzmShow=!1),a.getImg()})}})},getInterfaceItem:function(e){var t=this,a={params:{userId:e}};this.$Get(\"api/menu/getInterfaceItemByUserId\",a,function(e){o.a.set(\"access\",e.data.data.interfaces.join()),localStorage.setItem(\"access_array\",JSON.stringify(e.data.data.interfaces)),o.a.set(\"operations\",e.data.data.operations.join()),window.location.reload(),setTimeout(function(){t.$router.push({name:\"home_index\"})},300)})},getImg:function(){var e=new Date;this.yzm_url=\"/api/user/createImg?a=\"+e.getTime()},keyDown:function(e){\"Enter\"==e.code&&this.handleSubmit()},getUserRole:function(n){var i=this,e={params:{userId:n}};this.$Get(\"api/user/checkUserRoleByUserId\",e,function(e){i.getInterfaceItem(n);for(var t=[],a=0;a<e.data.data.length;a++)t.push(e.data.data[a].rolecode);for(var s=new Map([[\"salers\",\"salers\"],[\"kj\",\"kuaiji\"],[\"kjbgd\",\"kuaiji\"],[\"jzkj\",\"kuaiji\"],[\"servicer\",\"shangshi\"],[\"ssbgd\",\"shangshi\"],[\"planner\",\"qihua\"],[\"qhbgd\",\"qihua\"],[\"auditing\",\"shenji\"],[\"sjbgd\",\"shenji\"],[\"jianzhi\",\"qudao\"]]),o=0;o<t.length;o++){if(s.get(t[o])){localStorage.setItem(\"Main_Role\",s.get(t[o]));break}o==t.length-1&&localStorage.setItem(\"Main_Role\",\"other\")}var r=JSON.stringify(t);localStorage.setItem(\"Role\",r)})},sso_login:function(t,e,a){var s=this;config={params:{userName:t,timeStamp:e,token:a}},this.$Get(\"api/user/ssoLogin\",config,function(e){o.a.set(\"user\",t),o.a.set(\"password\",\"123456\"),localStorage.setItem(\"realname\",e.data.data.user.realname),localStorage.setItem(\"id\",e.data.data.user.id),localStorage.setItem(\"companyname\",\"\"),s.getInterfaceItem(e.data.data.user.id),s.getUserRole(e.data.data.user.id)},function(e){s.$Message.error(\"请输入账号密码登录！\"),s.sso=!0})},get_sso_params:function(o){if(3==o.length)return new Promise(function(e,t){for(var a=[],s=0;s<o.length;s++)a[s]=o[s].split(\"=\")[1];e(a)})},change_yzm:function(){this.getImg()}},mounted:function(){o.a.get(\"7issave\")&&(this.isSave=JSON.parse(o.a.get(\"7issave\")),o.a.get(\"7user\")&&this.isSave&&(this.form.userName=o.a.get(\"7user\"),this.form.password=o.a.get(\"7password\"),this.handleSubmit()))},created:function(){}},n=(a(634),a(636),a(4)),i=Object(n.a)(r,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(\"div\",{staticClass:\"login\",on:{keydown:function(e){return\"button\"in e||!t._k(e.keyCode,\"enter\",13,e.key,\"Enter\")?t.handleSubmit(e):null}}},[t.sso?t._e():a(\"Spin\",{attrs:{size:\"large\",fix:\"\"}},[a(\"Icon\",{staticClass:\"demo-spin-icon-load\",attrs:{type:\"load-c\",size:\"18\"}}),t._v(\" \"),a(\"div\",[t._v(\"正在登录中...\")])],1),t._v(\" \"),a(\"div\",{staticClass:\"login-con\"},[a(\"Card\",{attrs:{bordered:!1}},[a(\"p\",{attrs:{slot:\"title\"},slot:\"title\"},[a(\"Icon\",{attrs:{type:\"log-in\"}}),t._v(\"\\n                亿账柜信息管理平台\\n            \")],1),t._v(\" \"),a(\"div\",{staticClass:\"form-con\",on:{\"on-keydown\":t.keyDown}},[a(\"Form\",{ref:\"loginForm\",attrs:{model:t.form,rules:t.rules}},[a(\"FormItem\",{staticStyle:{\"margin-bottom\":\"24px\"},attrs:{prop:\"userName\"}},[a(\"Input\",{attrs:{placeholder:\"用户名\"},model:{value:t.form.userName,callback:function(e){t.$set(t.form,\"userName\",e)},expression:\"form.userName\"}}),t._v(\" \"),a(\"span\",{attrs:{slot:\"prepend\"},slot:\"prepend\"},[a(\"Icon\",{attrs:{size:16,type:\"person\"}})],1)],1),t._v(\" \"),a(\"FormItem\",{staticStyle:{\"margin-bottom\":\"24px\"},attrs:{prop:\"password\"}},[a(\"Input\",{attrs:{type:\"password\",placeholder:\"密码\"},model:{value:t.form.password,callback:function(e){t.$set(t.form,\"password\",e)},expression:\"form.password\"}}),t._v(\" \"),a(\"span\",{attrs:{slot:\"prepend\"},slot:\"prepend\"},[a(\"Icon\",{attrs:{size:14,type:\"locked\"}})],1)],1),t._v(\" \"),t.yzmShow?a(\"FormItem\",{attrs:{prop:\"code\",id:\"code\"}},[a(\"Input\",{staticStyle:{width:\"60%\"},attrs:{placeholder:\"验证码\"},model:{value:t.form.code,callback:function(e){t.$set(t.form,\"code\",e)},expression:\"form.code\"}}),t._v(\" \"),a(\"Img\",{staticStyle:{float:\"right\",height:\"32px\"},attrs:{id:\"randCodeImage\",src:t.yzm_url},on:{click:t.change_yzm}})],1):t._e(),t._v(\" \"),a(\"FormItem\",{staticStyle:{\"margin-bottom\":\"6px\"},attrs:{prop:\"isSave\"}},[a(\"Checkbox\",{model:{value:t.isSave,callback:function(e){t.isSave=e},expression:\"isSave\"}},[t._v(\"七天免登陆\")])],1),t._v(\" \"),a(\"FormItem\",[a(\"Button\",{attrs:{type:\"primary\",long:\"\",loading:t.loading},on:{click:t.handleSubmit}},[t._v(\"登录\")])],1)],1),t._v(\" \"),a(\"p\",{staticClass:\"login-tip\"},[t._v(\"© 亿账柜版权所有woa3.0\")])],1)])],1)],1)},[],!1,null,null,null);i.options.__file=\"login.vue\";t.default=i.exports}}]);"}