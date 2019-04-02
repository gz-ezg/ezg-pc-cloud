const productListNew = {
	namespaced: true,
    state: {
		editSKU_model:false,
        productId:""
    },
    mutations: {
		changeEditSKU_model(state){
			state.editSKU_model = !state.editSKU_model
		},
		addProductId(state,productId){
			state.productId = productId
		}
	}
};

export default productListNew;