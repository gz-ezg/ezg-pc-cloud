import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import gobal from './modules/gobal';
import serveManagement from './modules/serveManagement';
import productListNew from './modules/productManagement/productListNew';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {

    },
    modules: {
        app,
        user,
        gobal,
		serveManagement,
		productListNew
    }
});

export default store;
