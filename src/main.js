/* eslint-disable */
import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import 'iview/dist/styles/iview.css';
import store from './store';
import App from './app.vue';
import permission from './directive/permission'
import VueBus from './directive/vue-bus'
import '@/locale';
import VueI18n from 'vue-i18n';
import util from '@/libs/util'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import VCharts from 'v-charts';
//  引入自定义主题文件
// import './my-theme/index.less';
// import "@babel/polyfill";
// import echarts from 'echarts';
// import VueScroller from 'vue-scroller'

import iviewArea from 'iview-area';

import datagrid from './libs/easyUI/jquery.easyui.min'
import combobox from './libs/easyUI/jquery.easyui.min'

// Vue.use(VueScroller)
Vue.use(VCharts)
Vue.use(VueI18n);
Vue.use(iView);
Vue.use(VueBus);
Vue.use(iviewArea)



//  axios 拦截器
axios.interceptors.response.use(
    (response) => {
        // let _self = this
        // console.log(response.data.msgCode)
        // console.log("这是拦截器弹出的！")
        if(response.data.msgCode == "50003" && Cookies.get('user')!=""){
            // Cookies.set('user', '');
            // Cookies.set('password', '');
            let _self = this
            let user = Cookies.get('user')
            let password = Cookies.get('password')
            if(user == undefined || user == "" || password == undefined || password == ""){
                iView.Message.warning('对不起，您还未登陆！即将回到登陆页面！')
                router.push({
                    name:'login'
                })
            }else{
                let url = `api/user/login/`

                let config = {
                    username: user,
                    password: password
                }

                axios.post(url, config).then(function(res){
                    if(res.data.msgCode == "40000"){
                        iView.$Message.success('重新登录成功！')
                    }else{
                        Cookies.set('user', '');
                        Cookies.set('password', '');
                        router.push({
                            name:'login'
                        })
                    }
                }).catch(function(err){
                    Cookies.set('user', '');
                    Cookies.set('password', '');
                    router.push({
                        name:'login'
                    })
                })
            }
        }
        if(response.data.msgCode == '60000'){
            iView.Message.warning('对不起，您没有权限访问该页面！')
            router.push({
                name:'home_index'
            })
        }
        return response;
    },
    (error) => {
        return Promise.reject(error)
    }
)

//  异常监控及上传
//  上传待接口完成后实现
Vue.config.errorHandler = function (err, vm, info, a) {
    // handle error
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    // 只在 2.2.0+ 可用
    // console.log("errorHandler - start")
    // console.log(router.history.current.name)
    // console.log(info)
    console.log(err)

    let _self = this
    let url = 'api/system/saveFontErrMsg'
    let config = {
        name: router.history.current.name,
        hook: info,
        page: "",
        err: err.toString()
    }
    // console.log(config)

    axios.post(url, config).then(function(res){
        if(res.data.msgCode == "40000"){
            console.log("上报成功")
        }else{
            console.log(res)
        }
    }).catch(function(err){
        console.log(err)
    })

  }


// 按钮采集
Vue.prototype.$ButtonCollect = function(name){
    let _self = this;
    let url = 'api/system/addGather';
    let config = {
        params:{
            code : name
        }
    }
    this.$http.get(url,config).then(function(res){
        if(res.data.msgCode == "40000"){
            if(res.data.msg){
                // _self.$Message.success(res.data.msg)
                console.log("采集成功");
            }
        }else{
            // _self.$Message.error(res.data.msg)
            console.warn(res.data.msg)
        }
    }).catch(function(err){
        console.error(err)
    })
}

//  查询某个值是否在其中
Vue.prototype.$indexOfArray = function(data, array){
    let flag = false
    for(let i = 0; i < array.length; i++){
        if(data == array[i]){
            flag = true
        }
    }
    return flag
}

//  2级联表转一级
Vue.prototype.$Data2Casr = function(data){
    let Casr = []
    for(let i = 0;i< data.length;i++){
        let temp ={}
        if(data[i].children != null){
            for(let j = 0;j<data[i].children.length;j++){
                temp = {}
                temp.id = data[i].children[j].id
                temp.typecode = data[i].children[j].typecode
                temp.typename = data[i].children[j].typename
                temp.pid = data[i].children[j].pid
                temp.ptypename = data[i].typename
                temp.ptypecode = data[i].typecode
                Casr.push(temp)
            }
        }else{
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
Vue.prototype.$changeCars = function(data){
        let data2 = []
        for(let i = 0;i<data.length;i++){
            let temp = {}
            temp.value = data[i].id
            temp.label = data[i].typename
            temp.children = []
            if(data[i].children != null){
                let temp3 = {}
                temp3.value = ""
                temp3.label = "无"
                temp.children.push(temp3)
                for(let j = 0;j<data[i].children.length; j++ ){
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

//  this.$http.get()
Vue.prototype.$Get = function(url, config, success, fail=function(err){console.log(err);_self.$Message.error(err)}){
    let _self = this
    this.$http.get(url,config).then(function(res){
        // _self.$backToLogin(res)
        if(res.data.msgCode == "40000"){
            success(res)
        }else{
            if(res.data.msg){
                fail(res.data.msg)
            }else{
                console.error(res)
            }
        }
    }).catch(function(err){
        // _self.$Message.error('数据异常！')
        fail(err)
        console.error(err)
    })
}

//  this.$http.post()
Vue.prototype.$Post = function(url, config, success, fail){
    let _self = this
    this.$http.post(url,config).then(function(res){
        // _self.$backToLogin(res)
        if(res.data.msgCode == "40000"){
            if(res.data.msg){
                _self.$Message.success(res.data.msg)
            }
            success(res)
        }else{
            _self.$Message.error(res.data.msg)
            fail(res)
            console.warn(res)
        }
    }).catch(function(err){
        fail(err)
        _self.$Message.error('数据异常！')
        console.error(err)
    })
}

// this.$http.getDataCenter()
//  获取数据字典
Vue.prototype.$GetDataCenter = function(params, finish){
    let _self = this
    // let result = {}
    // let temp_params = params.split(",")
    // for(let i = 0; i<temp_params.length;i++){
    //     if(_self.$store.state.user.typegroup.hasOwnProperty(temp_params[i])){
    //         let temp = {}
    //         temp[temp_params[i]]= _self.$store.state.user.typegroup[temp_params[i]]
    //         result = Object.assign(result, temp);
    //         temp_params.splice(i,1)
    //         i = i - 1
    //     }
    // }
    // let config = {
    //     params:{
    //         groupCodes: temp_params.join(",")
    //     }
    // }
    let config = {
        params:{
            groupCodes: params
        }
    }
    let url = `api/system/tsType/queryTsTypeByGroupCodes`
    
    // if(temp_params.length){
        this.$http.get(url, config).then(function(res){
            if(res.data.msgCode == "40000"){
                // _self.$store.commit('set_typegroup', res.data.data);
                // res.data.data = Object.assign(result, res.data.data);
                finish(res)
            }else{
                _self.$Message.error("请求异常！")
            }
        }).catch(function(err){
            console.log(err)
            _self.$Message.error("网络异常！")
        })
    // }else{
        // let res = {
        //     data:{
        //         data:[]
        //     }
        // }
        // res.data.data = result
        // finish(res)
        // console.log(res)
    // }
}

//  此项作废，改由axios拦截器负责
//  判断是否登录及权限值
Vue.prototype.$backToLogin = function(res){
    // 待测试
    // if(res.data.msgCode == '50003'||res == ""){
    if(res.data.msgCode == '50003'){
        this.$Message.warning('对不起，您还未登陆！即将回到登陆页面！')
        // Cookies.set('user', '');
        // Cookies.set('password', '');
        this.$router.push({
            name:'login'
        })
    }
    if(res.data.msgCode == '60000'){
        this.$Message.warning('对不起，您没有权限访问该页面！')
        // this.$router.push({
        //     name:'home_index'
        // })
    }
}

//  axios继承给VUE，当做一个实例，可以使用vue-axios，可以使用vue.use
Vue.prototype.$http = axios

//  url参数附加,用于excel导出
Vue.prototype.$MergeURL = function(url, config){
    let temp = `${url}?`
    for(let i in config){
        let params = `${i}=${config[i]}&`
        temp = temp + params
    }
    // console.log(temp)
    return temp
}

//  数组转map
Vue.prototype.$array2map = function (array){
    if(array==""||array==null){
        return ;
    }else{
        let tempMap = new Map()
        for(let i = 0;i<array.length;i++){
            tempMap.set(array[i].typecode,array[i].typename)
        }
        return tempMap
    }
    
}

//  数据字典检索，获得单独的一个
Vue.prototype.searchTypegroup = function (code){
    let _typegroupArray = JSON.parse(localStorage.getItem('AllTSTypeGroups'))
    let _typegroupid
    let url

    for (let i = 0; i < _typegroupArray.length; i++) {
        if (_typegroupArray[i].typegroupcode == code) {
            _typegroupid = _typegroupArray[i].typegroupid
        }
    }

    url = (code == 'customerType') ? ('/api/dataCenter/system/queryForSubTSTypeByGroupId/' + _typegroupid) : ('/api/dataCenter/system/queryForTSTypeByGroupId/' + _typegroupid)

    this.$http.get(url)
        .then(function (response) {
            let str = JSON.stringify(response.data)
            localStorage.setItem(code,str)
        })

}

//  获取数据GetData方法
Vue.prototype.GetData = function (url, doSuccess, otherConditions=function(err){console.log(err)}){

    let _self = this

    this.$http.get('/api' + url)
        .then(function (response) {
            if (response.data.msgCode == '40000') {
                doSuccess(response)
            } else if (response.data.msgCode == '50003') {
                _self.$Message.error('抱歉，您还未登录，即将前往登录页面');
                Cookies.set('user', '');
                Cookies.set('password', '');
                setTimeout(() => {
                    _self.$store.commit('logout', this);
                    _self.$store.commit('clearOpenedSubmenu');
                    _self.$store.commit('clearAllTags')
                    _self.$http.get('/api/user/logOut')
                        .then(function (response) {
                            if (response.data.msgCode == '40000') {
                                // _self.winReload()                                                       
                                _self.$router.push({
                                    name: 'login'
                                });
                                
                            }
                        })
                }, 2000);
            } else if (response.data.msgCode == '60000') {
                _self.$Message.error('抱歉，您没有权限');
            } else {
                otherConditions(response)
            }
        })
}

Vue.prototype.PostData = function (url, data, doSuccess, otherConditions){

    let _self = this

    this.$http({
        method: 'post',
        url: '/api' + url,
        data: data,
        headers: {'Content-Type': 'application/json'},
    })
        .then(function (response) {
            if (response.data.msgCode == '40000') {
                doSuccess(response)
            } else if (response.data.msgCode == '50003') {
                // _self.$Message.error('抱歉，您还未登录，即将前往登录页面');
                // setTimeout(() => {
                //     _self.$router.push({
                //         name: 'login'
                //     });
                // }, 2000);
            } else if (response.data.msgCode == '60000') {
                _self.$Message.error('抱歉，您没有权限');
            } else {
                otherConditions(response)
            }
        })
}

Vue.prototype.DownloadExcel = function (url, objdata) {
    let _url = url + '?isExportExcel=Y&filedKeyValues=' + encodeURIComponent(objdata)

    window.location.href = '/api' + _url

/*    this.$http({
        method: 'get',
        async: false,
        responseType: 'arraybuffer',
        url: '/api' + _url,
    })
        .then(function (response) {
            let blob = new Blob([response.data], {type: "application/vnd.ms-excel"});

            let objectUrl = URL.createObjectURL(blob);

            window.location.href = objectUrl;
        })*/
}

Vue.prototype.PostFiles = function (url, data, doSuccess, otherConditions){

    let _self = this

    this.$http({
        method: 'post',
        url: '/api' + url,
        data: data,
        dataType: 'json',
        processData: false,
        contentType: false,
    })
        .then(function (response) {
            if (response.data.msgCode == '40000') {
                doSuccess(response)
            } else if (response.data.msgCode == '50003') {
                // _self.$Message.error('抱歉，您还未登录，即将前往登录页面');
                // setTimeout(() => {
                //     Cookies.set('user', '');
                //     Cookies.set('password', '');
                //     localStorage.clear()
                //     _self.$router.push({
                //         name: 'login'
                //     });
                // }, 1000);
            } else if (response.data.msgCode == '60000') {
                _self.$Message.error('抱歉，您没有权限');
            } else {
                otherConditions(response)
            }
        })
}

Vue.prototype.matchingFields = function (a){

    let _self = this

    _self.searchTypegroup('customerType')

    let _customerTypeArr = JSON.parse(localStorage.getItem('customerType'))

    // 级联下拉框-客户状态
    let mapdata = new Map()  //用作临时转换
    let subIdToParentMap = new Map()
    let sourceData = _customerTypeArr  //结果集
    let finalArrayData = new Array()   //vue要求的数据格式

    for (let i = 0; i < sourceData.length; i++) {
        let _sub = new Object()

        _sub.value = sourceData[i].subid.toString()
        _sub.label = sourceData[i].subtypename

        subIdToParentMap.set(_sub.value, sourceData[i].id)

        let _value = mapdata.get(sourceData[i].id)

        if (_value) {
            let _valueArray = _value.children

            _valueArray.push(_sub)

            let _valueObject = new Object()

            _valueObject.value = _value.value.toString()
            _valueObject.label = _value.label
            _valueObject.children = _valueArray

            mapdata.set(sourceData[i].id, _valueObject)
        } else {
            let _child = new Array()

            _child.push(_sub)

            let _main = new Object()

            _main.value = sourceData[i].id.toString()
            _main.label = sourceData[i].typename
            _main.children = _child

            mapdata.set(sourceData[i].id, _main)
        }
    }

    mapdata.forEach((value, key) => {
        finalArrayData.push(value)
    });

    for (let i = 0; i < finalArrayData.length; i++) {

        for (let j = 0; j < finalArrayData[i].children.length; j++) {

            if ((finalArrayData[i].children[j].value) == (a)) {

            }
        }
    }
}


//  路由跳转之前检查是否有权限访问该页面
router.beforeEach((to, from, next)=>{
    
    // Vue.$bus.emit("SPIN_START",true)
    let temp = JSON.parse(localStorage.getItem("access_array"))
    
    if(JSON.stringify(to.meta) == "{}"){
        next()
    }else{
        let flag = false
        for(let i = 0;i<temp.length;i++){
            if(to.meta == temp[i]){
                next()
                flag = true
            }
        }
        if(flag == false){
            router.push({
                name:'error-403'
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
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
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
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
