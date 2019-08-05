/* eslint-disable */
import Vue from 'vue'
import iView from 'iview'
import { router } from './router/index'
import { appRouter } from './router/router'
import 'iview/dist/styles/iview.css'
import store from './store'
import App from './app.vue'
import permission from './directive/permission'
import VueBus from './plugins/vue-bus'
import vueBus from './libs/bus'
import '@/locale'
import VueI18n from 'vue-i18n'
import util from '@/libs/util'
import axios from 'axios'
import Cookies from 'js-cookie'
//  引入自定义主题文件
// import './my-theme/index.vue.less';
// 最低可以兼容IE11,启用此行并将babelrc配置修改即可
// import "@babel/polyfill";

import iviewArea from 'iview-area'
if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true
}

//  异常上报机制(废弃)
// import Raven from 'raven-js';
// import RavenVue from 'raven-js/plugins/vue';

//  测试库版
// console.log(process)
// if(process.env.NODE_ENV == 'jenkins' ){
//     Raven
//         .config('http://f2091129504342718fd23e9de52bdd84@sentry.roderickt1an.cn/1')
//         .addPlugin(RavenVue, Vue)
//         .install();
//     }

Vue.use(VueI18n)
Vue.use(iView)
Vue.use(VueBus)
Vue.use(vueBus)
Vue.use(iviewArea)

//  全局混入
// Vue.mixin({
//     data(){
//         return {
//             globalRefresh: true
//         }
//     },
//     method:{
//         global_refresh(){

//         }
//     },
//     created(){
//         // console.log(this.$options.name)
//     }
//   })

axios.defaults.baseURL = '/'
//  axios 拦截器
axios.interceptors.response.use(
  response => {
    if (
      response.data.msgCode == 50000 &&
      response.config.url != 'api/legwork/apiLoginByWechatCode'
    ) {
      if (process.env.NODE_ENV != 'development') {
        let url = 'api/system/saveFontErrMsg'
        let config = {
          name: 'cloud',
          page: response.config.url,
          err: JSON.stringify(response)
        }
        axios
          .post(url, config)
          .then(function(res) {})
          .catch(err => {})
      }
    }
    if (response.data.msgCode == '50003' && Cookies.get('user') != '') {
      console.log(response)
      iView.Message.warning('对不起，您还未登陆！')
      iView.Message.destroy()
      //  只有post求情失败才打开重新登录窗口
      Cookies.set('user', '')
      Cookies.set('password', '')
      let backLoginIndex = setTimeout(() => {
        router.push({
          name: 'login'
        })
      }, 800)
      if (response.config.method == 'post') {
        store.commit('open_gobal_relogin_modal')
        //  如果遇到post请求，就取消定时器
        clearTimeout(backLoginIndex)
        return false
      }
    }
    if (response.data.msgCode == '60000') {
      iView.Message.warning('对不起，您没有权限访问该页面！')
      // iView.Message.destroy()
      setTimeout(() => {
        router.push({
          name: 'home_index'
        })
      }, 500)
      // return false
    }
    return response
  },
  error => {
    // if(process.env.NODE_ENV == 'jenkins' ){
    //     Raven.captureException(error);
    // }
    return Promise.reject(error)
  }
)
// console.log(process.env)
//  异常监控及上传 （废弃）
//  上传待接口完成后实现
// console.log(process.env)
// if(process.env.NODE_ENV == 'jenkins' ){
//     Vue.config.errorHandler = function(err, vm, info) {
//         Raven.captureException(err)
//     }
//   }
//     // handle error
//     // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
//     // 只在 2.2.0+ 可用
//     // console.log("errorHandler - start")
//     // console.log(router.history.current.name)
//     // console.log(info)
//     console.log(err)

//     let _self = this
//     let url = 'api/system/saveFontErrMsg'
//     let config = {
//         name: router.history.current.name,
//         hook: info,
//         page: "",
//         err: err.toString()
//     }
//     // console.log(config)

//     axios.post(url, config).then(function(res){
//         if(res.data.msgCode == "40000"){
//             console.log("上报成功")
//         }else{
//             console.log(res)
//         }
//     }).catch(function(err){
//         console.log(err)
//     })

//   }

// 按钮采集
Vue.prototype.$ButtonCollect = function(name) {
  let _self = this
  let url = 'api/system/addGather'
  let config = {
    params: {
      code: name
    }
  }
  this.$http
    .get(url, config)
    .then(function(res) {
      if (res.data.msgCode == '40000') {
        if (res.data.msg) {
          console.log('采集成功')
        }
      } else {
        console.warn(res.data.msg)
      }
    })
    .catch(function(err) {
      console.error(err)
    })
}

//  查询某个值是否在其中
Vue.prototype.$indexOfArray = function(data, array) {
  let flag = false
  for (let i = 0; i < array.length; i++) {
    if (data == array[i]) {
      flag = true
    }
  }
  return flag
}

//  2级联表转一级
Vue.prototype.$Data2Casr = function(data) {
  let Casr = []
  for (let i = 0; i < data.length; i++) {
    let temp = {}
    if (data[i].children != null) {
      for (let j = 0; j < data[i].children.length; j++) {
        temp = {}
        temp.id = data[i].children[j].id
        temp.typecode = data[i].children[j].typecode
        temp.typename = data[i].children[j].typename
        temp.pid = data[i].children[j].pid
        temp.ptypename = data[i].typename
        temp.ptypecode = data[i].typecode
        Casr.push(temp)
      }
    } else {
      temp = {}
      temp.id = data[i].id
      temp.typecode = data[i].typecode
      temp.ptypename = data[i].typename
      temp.typename = ''
      temp.pid = 0
      Casr.push(temp)
    }
  }

  return Casr
}
//  数据字典转换成规定的格式=>二级联表
Vue.prototype.$changeCars = function(data) {
  let data2 = []
  for (let i = 0; i < data.length; i++) {
    let temp = {}
    temp.value = data[i].id
    temp.label = data[i].typename
    temp.children = []
    if (data[i].children != null) {
      let temp3 = {}
      temp3.value = ''
      temp3.label = '无'
      temp.children.push(temp3)
      for (let j = 0; j < data[i].children.length; j++) {
        let temp2 = {}
        temp2.value = data[i].children[j].id
        temp2.label = data[i].children[j].typename
        temp.children.push(temp2)
      }
    }
    data2.push(temp)
  }
  return data2
}

//  方法废弃
Vue.prototype.$Get = function(
  url,
  config,
  success,
  fail = function(err) {
    console.log(err)
    _self.$Message.error(err)
  }
) {
  let _self = this
  this.$http
    .get(url, config)
    .then(function(res) {
      if (res.data.msgCode == '40000') {
        success(res)
      } else {
        if (res.data.msg) {
          _self.$Message.error(res.data.msg)
          fail(res.data.msg)
        } else {
          console.error(res)
        }
      }
    })
    .catch(function(err) {
      fail(err)
      console.error(err)
    })
}

//  方法废弃
Vue.prototype.$Post = function(url, config, success, fail) {
  let _self = this
  this.$http
    .post(url, config)
    .then(function(res) {
      if (res.data.msgCode == '40000') {
        if (res.data.msg) {
          _self.$Message.success(res.data.msg)
        }
        success(res)
      } else {
        _self.$Message.error(res.data.msg)
        fail(res)
        console.warn(res)
      }
    })
    .catch(function(err) {
      fail(err)
      _self.$Message.error('数据异常！')
      console.error(err)
    })
}

//没有提示的请求
Vue.prototype.$post = function(url, config, success, fail) {
  let _self = this
  this.$http
      .post(url, config)
      .then(function(res) {
        if (res.data.msgCode == '40000') {
          success(res)
        } else {
          _self.$Message.error(res.data.msg)
          fail(res)
          console.warn(res)
        }
      })
      .catch(function(err) {
        fail(err)
        _self.$Message.error('数据异常！')
        console.error(err)
      })
}

//  获取数据字典
Vue.prototype.$GetDataCenter = function(params, finish) {
  let _self = this
  let config = {
    params: {
      groupCodes: params
    }
  }
  let url = `api/system/tsType/queryTsTypeByGroupCodes`

  this.$http
    .get(url, config)
    .then(function(res) {
      if (res.data.msgCode == '40000') {
        finish(res)
      } else {
        _self.$Message.error('请求异常！')
      }
    })
    .catch(function(err) {
      console.log(err)
      _self.$Message.error('网络异常！')
    })
}

//  此项作废，改由axios拦截器负责
//  代码仍存留，需要清除
//  判断是否登录及权限值
Vue.prototype.$backToLogin = function(res) {
  if (res.data.msgCode == '50003') {
    this.$Message.warning('对不起，您还未登陆！即将回到登陆页面！')
    this.$router.push({
      name: 'login'
    })
  }
  if (res.data.msgCode == '60000') {
    this.$Message.warning('对不起，您没有权限访问该页面！')
  }
}

//  axios继承给VUE，当做一个实例，可以使用vue-axios，可以使用vue.use
//  废弃
Vue.prototype.$http = axios

//  url参数附加,用于excel导出
Vue.prototype.$MergeURL = function(url, config) {
  let temp = `${url}?`
  for (let i in config) {
    if (config[i]) {
      let params = `${i}=${config[i]}&`
      temp = temp + params
    }
  }
  return temp
}

//  数组转map
Vue.prototype.$array2map = function(array) {
  if (array == '' || array == null) {
    return
  } else {
    let tempMap = new Map()
    for (let i = 0; i < array.length; i++) {
      tempMap.set(array[i].typecode, array[i].typename)
    }
    return tempMap
  }
}

//  获取数据GetData方法
//  方法废弃
Vue.prototype.GetData = function(
  url,
  doSuccess,
  otherConditions = function(err) {
    console.log(err)
  }
) {
  let _self = this

  this.$http.get('/api' + url).then(function(response) {
    if (response.data.msgCode == '40000') {
      doSuccess(response)
    } else if (response.data.msgCode == '50003') {
      _self.$Message.error('抱歉，您还未登录，即将前往登录页面')
      Cookies.set('user', '')
      Cookies.set('password', '')
      setTimeout(() => {
        _self.$store.commit('logout', this)
        _self.$store.commit('clearOpenedSubmenu')
        _self.$store.commit('clearAllTags')
        _self.$http.get('/api/user/logOut').then(function(response) {
          if (response.data.msgCode == '40000') {
            _self.$router.push({
              name: 'login'
            })
          }
        })
      }, 2000)
    } else if (response.data.msgCode == '60000') {
      _self.$Message.error('抱歉，您没有权限')
    } else {
      otherConditions(response)
    }
  })
}

//  方法废弃
Vue.prototype.PostData = function(url, data, doSuccess, otherConditions) {
  let _self = this

  this.$http({
    method: 'post',
    url: '/api' + url,
    data: data,
    headers: { 'Content-Type': 'application/json' }
  }).then(function(response) {
    if (response.data.msgCode == '40000') {
      doSuccess(response)
    } else if (response.data.msgCode == '50003') {
    } else if (response.data.msgCode == '60000') {
      _self.$Message.error('抱歉，您没有权限')
    } else {
      otherConditions(response)
    }
  })
}

//  路由跳转之前检查是否有权限访问该页面
router.beforeEach((to, from, next) => {
  // console.log()
  if (
    to.name == 'login' ||
    to.name == 'home_index' ||
    JSON.stringify(to.meta) == '{}'
  ) {
  } else {
    let url = 'api/system/addGather'

    let config = {
      params: {
        code: to.name
      }
    }

    axios
      .get(url, config)
      .then(function(res) {})
      .catch(function(err) {
        console.log(err)
      })
  }
  let temp = JSON.parse(localStorage.getItem('access_array'))

  if (JSON.stringify(to.meta) == '{}') {
    next()
  } else {
    let flag = false
    for (let i = 0; i < temp.length; i++) {
      if (to.meta == temp[i]) {
        next()
        flag = true
      }
    }
    if (flag == false) {
      router.push({
        name: 'error-403'
      })
    }
  }
})

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  data: {
    currentPageName: ''
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'))
    this.currentPageName = this.$route.name
    // 显示打开的页面的列表
    this.$store.commit('setOpenedList')
    this.$store.commit('initCachepage')
    // 权限菜单过滤相关
    //  记录，在这里为什么要调一次获取菜单的请求呢？？
    /**
     * ???
     * ???
     * 2018年9月22日21:44:11
     */
    // this.$store.commit('updateMenulist');
    // iview-admin检查更新
    // util.checkUpdate(this); // util中未配置
  },
  created() {
    let tagsList = []
    appRouter.map(item => {
      if (item.children.length <= 1) {
        tagsList.push(item.children[0])
      } else {
        tagsList.push(...item.children)
      }
    })
    this.$store.commit('setTagsList', tagsList)
  }
})
