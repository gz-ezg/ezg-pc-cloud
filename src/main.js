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
import proto from './utils/prototype'
//  引入自定义主题文件
// import './my-theme/index.vue.less';
// 最低可以兼容IE11,启用此行并将babelrc配置修改即可
// import "@babel/polyfill";

import iviewArea from 'iview-area'
if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true
}
Vue.use(VueI18n)
Vue.use(iView)
Vue.use(VueBus)
Vue.use(vueBus)
Vue.use(iviewArea)
Vue.use(proto)

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
    return Promise.reject(error)
  }
)


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
