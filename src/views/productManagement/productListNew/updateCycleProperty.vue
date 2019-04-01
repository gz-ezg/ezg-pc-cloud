<template>
	<div>
		<Modal title="修改周期性属性" :value="true" width="600" @on-cancel="close">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
				<FormItem label="A类外勤数量" prop="typeACount">
					<InputNumber :min="1" v-model="formValidate.typeACount"></InputNumber>
					<!-- <Input v-model="formValidate.typeACount" placeholder="Enter your name"></Input> -->
				</FormItem>
				<FormItem label="B类外勤数量" prop="typeBCount">
					<InputNumber :min="1" v-model="formValidate.typeBCount"></InputNumber>
					<!-- <Input v-model="formValidate.typeBCount" placeholder="Enter your name"></Input> -->
				</FormItem>
				<FormItem label="产品份数" prop="portionNum">
					<InputNumber :min="1" v-model="formValidate.portionNum"></InputNumber>
					<!-- <Input v-model="formValidate.portionNum" placeholder="Enter your name"></Input> -->
				</FormItem>
				<FormItem label="产品默认展示份数" prop="showPortionNum">
					<InputNumber :min="1" v-model="formValidate.showPortionNum"></InputNumber>
					<!-- <Input v-model="formValidate.showPortionNum" placeholder="Enter your name"></Input> -->
				</FormItem>
				<FormItem label="最大票据数" prop="maxBillNum">
					<InputNumber :min="1" v-model="formValidate.maxBillNum"></InputNumber>
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
					typeACount: 1,
					typeBCount: 1,
					portionNum: 1,
					showPortionNum: 1,
					maxBillNum:1
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
					maxBillNum: [{
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
					maxBillNum: _self.formValidate.maxBillNum
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
				
			}
		},
		mounted() {
			if (!this.skuId) {
				this.$Message.warning("无效的skuId")
				this.close()
				return false
			}

			this.formValidate.id = this.skuId

		}
	}
</script>

<style>
</style>
