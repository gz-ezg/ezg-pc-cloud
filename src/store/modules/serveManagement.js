const serveManagement = {
	namespaced: true,
    state: {
        userId:"",
		productId:"",
		productSkuIds:[],
		// data:[]
    },
    mutations: {
        addUserId(state,userId){
			state.userId = userId
		},
		addProductId(state,productId){
			state.productId = productId
		},
		addProductSkuIds(state,productSkuIds){
			state.productSkuIds = productSkuIds
		},
		clearAll(state){
// 			state.userId = ""
// 			state.productId = ""
// 			state.productSkuIds = []
// 			state.data = []
		}
    }
};

export default serveManagement;