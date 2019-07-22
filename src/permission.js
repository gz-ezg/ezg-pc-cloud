import Vue from 'vue'
import iView from 'iview'
import Util from './utils/utils'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'
import { routers, otherRouter, appRouter } from './router/router'
import { addGather } from './api/systemManage'

Vue.use(VueRouter)

// 路由配置
const RouterConfig = {
  scrollBehavior: () => ({ y: 0 }),
  routes: routers
}

export const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
  // start progress bar
  iView.LoadingBar.start()
  // set page title
  Util.title(to.meta.title)

  if (!Cookies.get('user') && to.name !== 'login') {
    // 判断是否已经登录且前往的页面不是登录页
    next({
      name: 'login'
    })
  } else if (Cookies.get('user') && to.name === 'login') {
    // 判断是否已经登录且前往的是登录页
    Util.title()
    next({
      name: 'home_index'
    })
  } else {
    const curRouterObj = Util.getRouterObjByName(
      [otherRouter, ...appRouter],
      to.name
    )
    if (curRouterObj && curRouterObj.access !== undefined) {
      // 需要判断权限的路由
      Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next)
    } else {
      // 没有配置权限的路由, 直接通过
      Util.toDefaultPage([...routers], to.name, router, next)
    }
  }

  if (
    to.name !== 'login' ||
    to.name !== 'home_index' ||
    JSON.stringify(to.meta) !== '{}'
  ) {
    addGather({
      code: to.name
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

router.afterEach(to => {
  Util.openNewPage(router.app, to.name, to.params, to.query)
  // finish progress bar
  iView.LoadingBar.finish()
})
