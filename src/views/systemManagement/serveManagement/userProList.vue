<template>
	<div>
		<Table
			height="400"
		    :loading="loading"
		    highlight-row 
		    border
		    :columns="pro_header"
		    @on-current-change="select_row"
		    :data="pro_data"></Table>
	</div>
</template>

<script>
import * as userApi from '../api/user.js'
export default{
	data(){
		return{
			productList:[],
			pro_header:[
				{
					title:"产品名称",
					key:"product"
				}
			],
			pro_data:[],
			loading:false
		}
	},
	computed:{
		userId(){
			return this.$store.state.serveManagement.userId
		}
	},
	methods:{
		async get_product_data(){
			let _self = this
			_self.loading = true
			let config = {
			    params:{
					userId:_self.userId
			    }
			}
			let rows = await userApi.getProList(config)

			_self.pro_data = rows
			_self.loading = false
		},
		select_row(e){
			this.$store.commit("serveManagement/addProductId",e.id)
		}
	},
	created(){
		let _self = this
		this.$bus.on("OPEN_USERPROLIST",(e)=>{
			_self.get_product_data()
		})
	}
}
</script>

<style>
</style>
