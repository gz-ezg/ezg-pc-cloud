
/**
 * Bus方法
 * @param {*} Vue 
 */
const install = function(Vue){
    const Bus = new Vue({
        methods: {
            emit(event, ...args){
                this.$emit(event, ...args)
            },
            on(event, ...args){
                this.$on(event, ...args)
            },
            off(event, ...args){
                this.$off(event, ...args)
            },
        }
    });
    Vue.prototype.$bus = Bus;
}

export default install;