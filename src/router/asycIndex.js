import Vue from 'vue';
import iView from 'iview/dist/iview.min';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import {routers, otherRouter, appRouter} from './router';
import axios from 'axios';
import Main from '@/views/Main.vue';
import { rejects } from 'assert';

Vue.use(VueRouter);

const lazyRouter = {
    path: '/test',
    icon: 'alert-circled',
    name: 'test',
    title: 'Test',
    component: Main,
    children: [
        {
            path: 'test',
            title: '测试页面',
            name: '富文本编辑器测试',
            component: resolve => {
                require(['@/views/test/components/main.vue'], resolve);
                // require(['@/views/woa-components/filePreview/index.vue'], resolve);

            }
        },
    ]
}

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

/**
 * 
 * @param {请访问的路由} to 
 * @param {何处跳转} from 
 * @param {执行方法} next 
 * 
 * by:Roderickt1an
 * 
 * 动态加载路由
 * 获取路由后可存至vuex或者localStorage中做缓存
 * 然后在每次跳转之前做判断，是否存在路由
 * 如果是使用localStorage，登出之后需要清空localStorage
 * 路由请求未写，使用一个settimeout模拟，可以直接使用axios
 * 注意：路由格式一定要符合router.js的格式，否则会失败
 */
function routerSyncAdd(to, from, next){
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            appRouter.push(lazyRouter)
            router.addRoutes(appRouter)
            resolve()
        },1000)
    })
}

/**
 * 
 * @param {*} to 
 * @param {*} from 
 * @param {*} next 
 * 
 * 参数名称同上
 * 路由逻辑处理，可访问权限，生成菜单
 */
function commonNext(to, from, next){

    if(to.name == "login" || to.name == "home_index"){
        
    }else{
        let url = 'api/system/addGather'
    
        let config = {
            params:{
                code: to.name
            }
        }

        axios.get(url,config).then(function(res){

        }).catch(function(err){
            console.log(err)
        })
    }

    if (Cookies.get('locking') === '1' && to.name !== 'locking') { // 判断当前是否是锁定状态
        next({
            replace: true,
            name: 'locking'
        });
    } else if (Cookies.get('locking') === '0' && to.name === 'locking') {
        next(false);
    } else {
        if (!Cookies.get('user') && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
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

    setTimeout(()=>{
        let _hmt = _hmt || [];
        (function() {
            //每次执行前，先移除上次插入的代码
            document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
            let hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?xxxx";
            hm.id = "baidu_tj"
            let s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    },0);
}

router.beforeEach((to, from, next) => {
    if(appRouter.length == 0){
        routerSyncAdd(to, from, next).then(()=>{
            commonNext(to, from, next)
        })
    }else{
        commonNext(to, from, next)
    }
});

router.afterEach((to) => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
