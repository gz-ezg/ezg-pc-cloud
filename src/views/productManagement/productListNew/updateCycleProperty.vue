<template>
	<div>
		<Modal title="修改周期性属性" :value="true" width="600" @on-cancel="close">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
				<FormItem label="A类外勤数量" prop="typeACount">
					<InputNumber :min="0" v-model="formValidate.typeACount"></InputNumber>
					<!-- <Input v-model="formValidate.typeACount" placeholder="Enter your name"></Input> -->
				</FormItem>
				<FormItem label="B类外勤数量" prop="typeBCount">
					<InputNumber :min="0" v-model="formValidate.typeBCount"></InputNumber>
					<!-- <Input v-model="formValidate.typeBCount" placeholder="Enter your name"></Input> -->
				</FormItem>
				<FormItem label="产品份数" prop="portionNum">
					<InputNumber :min="0" v-model="formValidate.portionNum"></InputNumber>
					<!-- <Input v-model="formValidate.portionNum" placeholder="Enter your name"></Input> -->
				</FormItem>
				<FormItem label="产品默认展示份数" prop="showPortionNum">
					<InputNumber :min="0" v-model="formValidate.showPortionNum"></InputNumber>
					<!-- <Input v-model="formValidate.showPortionNum" placeholder="Enter your name"></Input> -->
				</FormItem>
				<FormItem label="最大票据数" prop="voucherMaxNum">
					<InputNumber :min="0" v-model="formValidate.voucherMaxNum"></InputNumber>
					<!-- <Input v-model="formValidate.showPortionNum" placeholder="Enter your name"></Input> -->
				</FormItem>
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
		props: {
			skuId: {
				type: [String, Number]
			}
		},
		data() {
			return {
				formValidate: {
					id: "",
					typeACount: "",
					typeBCount: "",
					portionNum: "",
					showPortionNum: "",
					voucherMaxNum:""
				},
				ruleValidate: {
					typeACount: [{
						required: true,
						message: '请填写A类外勤数量'
					}],
					typeBCount: [{
						required: true,
						message: '请填写B类外勤数量'
					}],
					portionNum: [{
						required: true,
						message: '请填写产品份数'
					}],
					showPortionNum: [{
						required: true,
						message: '请填写产品默认展示份数'
					}],
					voucherMaxNum: [{
						required: true,
						message: '请填写最大票据数'
					}]
				},
				submitLoading:false
			}
		},
		methods: {
			close() {
				this.$emit("update")
			},
			submit(name) {
				let _self = this
				let url = `api/product/sku/cycle/save`
				let config = {
					id: _self.formValidate.id,
					typeACount: _self.formValidate.typeACount,
					typeBCount: _self.formValidate.typeBCount,
					portionNum: _self.formValidate.portionNum,
					showPortionNum: _self.formValidate.showPortionNum,
					voucherMaxNum: _self.formValidate.voucherMaxNum
				}
				this.submitLoading = true

				function success(res) {
					console.log("res")
					console.log(res)
					_self.close()
				}
				this.$refs[name].validate((vaild) => {
					if (vaild) {
						this.$Message.success('修改成功!');
						_self.$Post(url, config, success)
					}
					this.submitLoading = false
				})	
			},
			getList(){
				let _self = this
				let url = `api/product/sku/cycle/detail`
				let config = {
					params:{
						skuId:_self.skuId
					}
				}
				function success(res){
					// _self.formValidate = res.data.data
					let data = res.data.data
		
					if(data.voucherMaxNum === null){
						data.voucherMaxNum = 0
					}
					_self.formValidate = data
					
				}
				this.$Get(url,config,success)
			}
		},
		mounted() {
			if (!this.skuId) {
				this.$Message.warning("无效的skuId")
				this.close()
				return false
			}

			this.formValidate.id = this.skuId

		},
		created(){
			this.getList()
		}
	}
</script>

<style>
</style>
