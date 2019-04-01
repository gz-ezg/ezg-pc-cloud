<template>
	<div>
		<Modal title="修改SKU权重" :value="true" width="600" @on-cancel="close">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
				
			</Form>
			<div slot="footer">
				<Button type="primary" @click="submit('formValidate')" :loading="submitLoading">修改</Button>
				<Button @click="close" style="margin-left: 8px">取消</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
export default{
	methods:{
		getSKU(){
			let url = 'api/user/list'
			let config = {
				// productId:
			}
			
			this.$Get(url,config)
		}
	},
	created(){
		// this.getSKU()
		this.$bus.on("GET_PRODUCT_ID",(e)=>{
			console.log("2222")
		})
	}
}
</script>

<style>
</style>
