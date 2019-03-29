<template>
	<div>ssss</div>
</template>

<script>
export default{
	data(){
		return{
			productId:"",
			userId:""
		}
	},
	watch:{
		productId: {
		  handler() {
		    this.select_product();
		  },
		  deep: true
		}
	},
	methods:{
		select_product(){
			this.get_product_sku()
		},
		get_product_sku(){
			let _self = this
			let url = 'api/product/sku/list'
			let config = {
				params:{
					productId:_self.productId,
					userId:_self.userId
				}
			}
			function success(res){
				console.log("res")
				console.log(res)
			}
			console.log("config")
			console.log(config)
			this.$Get(url,config,success)
		}
	},
	created(){
		let _self = this
		this.$bus.on("PRO_CHANGE",(e)=>{
// 			console.log("e")
// 			console.log(e)
			_self.productId = e.productId
			_self.userId = e.userId
		})
	}
	
}
</script>

<style>
</style>
