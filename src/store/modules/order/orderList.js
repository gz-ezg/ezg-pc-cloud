const orderList = {
	namespaced: true,
    state: {
		productItem:"",
		productList:[]
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
		}
	}
};

export default orderList;