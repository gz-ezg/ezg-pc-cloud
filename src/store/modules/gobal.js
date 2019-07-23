const gobal = {
    state: {
        gobalCustomerDetailShow: false,
        gobalCustomer: {
            ID: ""
        },
        gobalworkOrderId: "",
        gobalWorkorderDetailShow: false,
		gobalWorkorderStopWorkOrder: false,
		gobalWorkorderStopWorkOrderList:false,
		gobalWorkOrderStatus:"",
        gobalCompanyId: "",
        gobalCompanyDetailShow: false,
        gobalWorkorderDetail: {
            companyname: "",
            product: "",
            id: ""
        },
        gobalSetFinishTime: false,
        gobalReloginShow: false,
        gobalCompanyPageId: ''

    },
    mutations: {
        open_gobal_relogin_modal(state){
            state.gobalReloginShow = true
        },

        setPageId(state,id){
            state.gobalCompanyPageId = id;
        },
        close_gobal_relogin_modal(state){
            state.gobalReloginShow = false
        },
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
        open_gobal_company_detail_modal(state,companyId){
            state.gobalCompanyDetailShow = true
            state.gobalCompanyId = companyId
        },
        close_gobal_company_detail_modal(state){
            state.gobalCompanyDetailShow = false
        },
        open_gobal_set_finish_time_modal(state, workOrderDetail){
            state.gobalSetFinishTime = true
            state.gobalWorkorderDetail = workOrderDetail
        },
        close_gobal_set_finish_time_modal(state){
            console.log("123")
            state.gobalSetFinishTime = false
        },
		open_gobal_stop_work_order(state,workOrderID){
			state.gobalWorkorderStopWorkOrder = true
			state.gobalworkOrderId = workOrderID
		},
		close_gobal_stop_work_order(state){
			state.gobalWorkorderStopWorkOrder = false
		},
		open_gobal_stop_work_order_list(state,workOrderID){
			state.gobalWorkorderStopWorkOrderList = true
			state.gobalworkOrderId = workOrderID
		},
		close_gobal_stop_work_order_list(state){
			state.gobalWorkorderStopWorkOrderList = false
		},
		get_gobal_work_order_status(state,gobalWorkOrderStatus){
			state.gobalWorkOrderStatus = gobalWorkOrderStatus
		},
		remove_gobal_work_order_status(state){
			state.gobalWorkOrderStatus
		}
    }
};

export default gobal;