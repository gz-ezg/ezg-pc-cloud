const gobal = {
    state: {
        gobalCustomerDetailShow: false,
        gobalCustomer: {
            ID: ""
        },
        gobalworkOrderId: "",
        gobalWorkorderDetailShow: false,
        gobalCompanyId: "",
        gobalCompanyDetailShow: false

    },
    mutations: {
        open_gobal_customer_detail_modal(state, customer){
            state.gobalCustomerDetailShow = true
            state.gobalCustomer = customer
        },
        close_gobal_customer_detail_modal(state){
            state.gobalCustomerDetailShow = false
        },
        open_gobal_work_order_detail_modal(state, workOrderID){
            state.gobalWorkorderDetailShow = true
            state.gobalworkOrderId = workOrderID
        },
        close_gobal_work_order_detail_modal(state){
            state.gobalWorkorderDetailShow = false
        },
        open_gobal_work_order_detail_modal(state, companyId){
            state.gobalCompanyDetailShow = true
            state.gobalCompanyId = companyId
        },
        close_gobal_work_order_detail_modal(state){
            state.gobalCompanyDetailShow = false
        },
    }
};

export default gobal;