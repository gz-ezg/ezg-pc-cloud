const orderList = {
	namespaced: true,
    state: {
		productItem:"",
		productList:[],
		companyId:"",
		pskuId:""
    },
    mutations: {
		getProductListItem(state,item){
			state.productItem = item
		},
		addProductListItem(state){
			state.productList.push(state.productItem)
		},
		removeProductListItem(state,item){
			state.productList.splice(item,1)
		},
		getCompanyId(state,item){
			state.companyId = item
		},
		getPskuId(state,item){
			state.pskuId = item
		}
	}
};

export default orderList;