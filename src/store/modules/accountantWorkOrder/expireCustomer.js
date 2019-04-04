const expireCustomer = {
	namespaced: true,
    state: {
		company_detail_modal:false,
		company_id:""
    },
    mutations: {
		open_company_detail_modal(state){
			state.company_detail_modal = !state.company_detail_modal
		},
		add_company_id(state,company_id){
			state.company_id = company_id
			console.log("state.company_id")
			console.log(state.company_id)
		}
	}
};

export default expireCustomer;