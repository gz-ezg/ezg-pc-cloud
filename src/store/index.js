import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import gobal from './modules/gobal';
import serveManagement from './modules/serveManagement';
import productListNew from './modules/productManagement/productListNew';
import expireCustomer from './modules/accountantWorkOrder/expireCustomer';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //
        status:1
    },
    mutations: {
        //
    },
    getters:{
        
    },
    actions: {
        
    },
    modules: {
        app,
        user,
        gobal,
		serveManagement,
		productListNew,
		expireCustomer
    }
});

export default store;
