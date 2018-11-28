import Cookies from 'js-cookie';

const user = {
    state: {
        typegroup:{
            
        }
    },
    mutations: {
        logout (state, vm) {
            Cookies.remove('user');
            Cookies.remove('password');
            Cookies.remove('access');
            // 恢复默认样式
            let themeLink = document.querySelector('link[name="theme"]');
            // themeLink.setAttribute('href', '');
            // 清空打开的页面等数据，但是保存主题数据
            let theme = '';
            if (localStorage.theme) {
                theme = localStorage.theme;
            }
            // localStorage.clear();
            if (theme) {
                localStorage.theme = theme;
            }
        },
        set_typegroup(state, type){
            state.typegroup = Object.assign(state.typegroup,type);
            // console.log(state.typegroup.area)
            
        }
    }
};

export default user;
