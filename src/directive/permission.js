import Vue from 'vue';
import Cookies from 'js-cookie';
import Util from '@/libs/util';

//  按钮权限
Vue.directive('permission', {
    bind: function (el, binding, vnode) {
        let _data = (Cookies.get('operations')).split(',')
        // console.log(el)
        console.log(binding.value)
        // console.log(vnode)
        for (let i = 0; i < _data.length; i++) {
            if (Util.showThisRoute(binding.value, _data[i])) {
                el.style.display="none";
                // console.log("1111")
            }
        }
    }
})