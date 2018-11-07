const gobal = {
    state: {
        gobalCustomerDetailShow: false,
        gobalCustomer: {
            ID: ""
        }
    },
    mutations: {
        open_gobal_customer_detail_modal(state, customer){
            state.gobalCustomerDetailShow = true
            state.gobalCustomer = customer
        },
        close_gobal_customer_detail_modal(state){
            state.gobalCustomerDetailShow = false
        }
    }
};

export default gobal;