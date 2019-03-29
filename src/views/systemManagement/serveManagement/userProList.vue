<template>
	<div>
		<Table
		    
		    highlight-row 
		    border
		    size="small"
		    :columns="pro_header"
		    @on-current-change="pro_select_row"
		    :data="pro_data"></Table>
		<Page
		    size="small"
		    :total="pro_total"
		    show-total
		    show-sizer
		    show-elevator
		    :current.sync="pro_page"
		    @on-change="pro_page_change"
		    @on-page-size-change="pro_page_size_change"
		    style="margin-top: 10px"></Page>
	</div>
</template>

<script>
export default{
	props:["userId"],
	data(){
		return{
			pro_row:"",
			productList:[],
			pro_header:[
				{
					title:"产品名称",
					key:"product"
				}
			],
			pro_data:[],
			pro_total:0,
			pro_page_size:10,
			pro_page:1,
		}
	},
	methods:{
		get_product_data(){
			let _self = this
			let url = `api/product/list`
			
			let config = {
			    params:{
			        page: _self.pro_page,
			        pageSize: _self.pro_page_size,
					userId:_self.userId
			    }
			}
			function success(res){
				_self.pro_data = res.data.data.rows
				_self.pro_total = res.data.data.total
				console.log(res)
			}
			this.$Get(url, config, success)
		},
		pro_page_change(e){
		    this.pro_page = e
		    this.get_product_data()
		},
		pro_page_size_change(e){
		    this.pro_page = 1
		    this.pro_page_size = e
		    this.get_product_data()
		},
		pro_select_row(e){
			this.pro_row = e
			this.$bus.emit("PRO_CHANGE",{productId:this.pro_row.id,userId:this.userId})
		}
	},
	created(){
		this.get_product_data()//获取产品列表
	}
}
</script>

<style>
</style>
