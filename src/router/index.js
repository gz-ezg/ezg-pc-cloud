import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import {routers, otherRouter, appRouter} from './router';
import axios from 'axios';


Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    // mode: process.env.OWN_SPACE != "build:history"?"hash":"history",
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    //  prerender时，此处需要删除配置
    if(to.name == "/" || to.name == "login" || to.name == "home_index"){

    }else{
        iView.LoadingBar.start();
    }
    
    Util.title(to.meta.title);
    // console.log("======= to =======")
    // console.log(to)
    // console.log("======= from =======")
    // console.log(from)
    // console.log("======= next =======")
    // console.log(next)

    if (Cookies.get('locking') === '1' && to.name !== 'locking') { // 判断当前是否是锁定状态
        next({
            replace: true,
            name: 'locking'
        });
    } else if (Cookies.get('locking') === '0' && to.name === 'locking') {
        next(false);
    } else {
        if (!Cookies.get('user') && to.name !== 'login') {
            // 判断是否已经登录且前往的页面不是登录页
            next({
                name: 'login'
            });
        } else if (Cookies.get('user') && to.name === 'login') { // 判断是否已经登录且前往的是登录页
            Util.title();
            next({
                name: 'home_index'
            });
        } else {
            const curRouterObj = Util.getRouterObjByName([otherRouter, ...appRouter], to.name);
            if (curRouterObj && curRouterObj.access !== undefined) { // 需要判断权限的路由
                Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next);
               /* if (curRouterObj.access === parseInt(Cookies.get('access'))) {
                    Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
                } else {
                    next({
                        replace: true,
                        name: 'error-403'
                    });
                }*/
            } else { // 没有配置权限的路由, 直接通过
                Util.toDefaultPage([...routers], to.name, router, next);
            }
        }
    }

    // 百度统计引入
    // setTimeout(()=>{
    //     let _hmt = _hmt || [];
    //     (function() {
    //         //每次执行前，先移除上次插入的代码
    //         document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
    //         let hm = document.createElement("script");
    //         hm.src = "https://hm.baidu.com/hm.js?xxxx";
    //         hm.id = "baidu_tj"
    //         let s = document.getElementsByTagName("script")[0];
    //         s.parentNode.insertBefore(hm, s);
    //     })();
    // },0);
});

router.afterEach((to) => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    if(to.name == "/" || to.name == "login"){

    }else{
        iView.LoadingBar.finish();
    }
    window.scrollTo(0, 0);
});
