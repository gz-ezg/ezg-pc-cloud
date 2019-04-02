<template>
	<div>
		<Modal title="修改SKU权重" :value="true" width="600" @on-cancel="close">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
				<FormItem prop="weight" label="请输入权重">
					<InputNumber :min="1" v-model="formValidate.weight"></InputNumber>
				</FormItem> 	
				<Table 
					height="400" 
					border 
					ref="selection" 
					:columns="header" 
					:data="data"
					:loading="loading"
					@on-selection-change="select"></Table>
			</Form>
			<div slot="footer">
				<Button type="primary" @click="submit('formValidate')" :loading="submitLoading">修改</Button>
				<Button @click="close" style="margin-left: 8px">取消</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading:false,
				formValidate:{
					weight:1
				},
				ruleValidate:{
					weight:[{ required: true, message: '请输入权重'}]
				},
				header: [{
					type: 'selection',
					width: 60,
					align: 'center'
				}, {
					title: 'SKU',
					key: 'alisname'
				},{
					title: '权重',
					key: 'weight'
				}],
				data:[],
				arr:[]
			}
		},
		computed: {
			productId() {
				return this.$store.state.productListNew.productId
			}
		},
		methods: {
			select(selection){
				let _self = this
				_self.arr = []
				selection.forEach(function(item,i){
// 					let {id:id} = item
// 					_self.arr.push({id:id})
					_self.arr.push({id:String(item.id)})
				})
			},
			submit(name){
				let _self = this
				let url = 'api/product/sku/weight/save'
				let weight = _self.formValidate.weight
				let arr = _self.arr
				for(let i=0;i<arr.length;i++){
					arr[i].weight = String(weight)
				}
				
				let config = {
					weightJson:JSON.stringify(arr)
				}
				function success(res){
					if(res){
						_self.getSKU()
					}
				}
				this.$refs[name].validate((valid)=>{
					if(valid){
						_self.$Post(url,config,success)
					}
				})
			},
			getSKU() {
				let _self = this
				_self.loading = true
				let url = 'api/product/sku/list'
				let config = {
					params: {
						productId: _self.productId
					}
				}
				function success(res) {
					let data = res.data.data
					for(let i=0;i<data.length;i++){
						if(data[i].weight === null){
							data[i].weight = "无"
						}
					}
					_self.data = data
					_self.loading = false
				}
				this.$Get(url, config, success)
			},
			close() {
				this.$store.commit("productListNew/changeEditSKU_model")
			}
		},
		created() {
			this.getSKU()
		}
	}
</script>

<style>
</style>
