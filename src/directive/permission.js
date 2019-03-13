import Vue from 'vue';
import Cookies from 'js-cookie';
import Util from '@/libs/util';

//  按钮权限
Vue.directive('permission', {
    inserted: function (el, binding, vnode) {
        let _data = (Cookies.get('operations')).split(',')
        for (let i = 0; i < _data.length; i++) {
            if (Util.showThisRoute(binding.value, _data[i])) {
                // 修改权限指令形式；直接从dom中删除而不是隐藏
                // el.style.display="none";
                el.parentNode.removeChild(el);
            }
        }
    }
})