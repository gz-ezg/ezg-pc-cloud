<template>
	<div>
		<Modal width="350" v-model="status" title="当月票据" @on-cancel="close">
			<Form ref="formBill" :model="formBill" :rules="rule" label-position="left">
				<FormItem label="成本票" style="margin-bottom: 5px;" label-width=80>
					<Row>
						<Col span="8" style="margin-right: 5px;">
							数量:<InputNumber style="width:100%;" :min="0" v-model="formBill.costAmount" placeholder="数量"></InputNumber>
						</Col>
						<Col span="8">
							金额:<InputNumber style="width:100%;" :min="0" v-model="formBill.costMoney" placeholder="金额"></InputNumber>
						</Col>
					</Row>
				</FormItem>
				
				<FormItem label="费用票" style="margin-bottom: 5px;" label-width=80>
					<Row>
						<Col span="8" style="margin-right: 5px;">
							数量:<InputNumber style="width:100%;" :min="0" v-model="formBill.exesAmount" placeholder="数量"></InputNumber>
						</Col>
						<Col span="8">
							金额:<InputNumber style="width:100%;" :min="0" v-model="formBill.exesMoney" placeholder="金额"></InputNumber>
						</Col>
					</Row>
				</FormItem>
				
				<FormItem label="收入" style="margin-bottom: 5px;" label-width=80>
					<Row>
						<Col span="8" style="margin-right: 5px;">
							数量:<InputNumber style="width:100%;" :min="0" v-model="formBill.incomeAmount" placeholder="数量"></InputNumber>
						</Col>
						<Col span="8">
							金额:<InputNumber style="width:100%;" :min="0" v-model="formBill.incomeMoney" placeholder="金额"></InputNumber>
						</Col>
					</Row>
				</FormItem>
				
				<FormItem label="银行回单" style="margin-bottom: 5px;" label-width=80>
					<Row>
						<Col span="8">
						数量:<InputNumber style="width:100%;" :min="0" v-model="formBill.bankReceipt" placeholder="数量"></InputNumber>
						</Col>
					</Row>
				</FormItem>
			</Form>
			<div slot="footer">
				<!-- <Button type="primary" @click="update" :disabled="!isDisabled">编辑</Button> -->
				<Button type="primary" @click="save('formBill')">保存</Button>
			    <Button type="ghost" @click="close">关闭</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	export default {
		props:["status"],
		data(){
			return{
				// isDisabled:false,
				id:"",
				companyId:"",
				period:"",
				formBill:{
					costAmount:0,
					costMoney:0,
					exesAmount:0,
					exesMoney:0,
					incomeAmount:0,
					incomeMoney:0,
					bankReceipt:0
				}
			}
		},
		methods:{
			getData(){
				let _self = this
				let url = "api/customer/company/bill/companyBillList"
				let config = {
					params:{
						page:1,
						pageSize:10,
						companyId:_self.companyId,
						period:_self.period
					}
				}
				function success(res){
					if(res.data.data.rows.length != 0){
						_self.id = res.data.data.rows[0].id
						// _self.isDisabled = true
						_self.formBill.costAmount = res.data.data.rows[0].cost_amount
						_self.formBill.costMoney = res.data.data.rows[0].cost_money
						_self.formBill.exesAmount = res.data.data.rows[0].exes_amount
						_self.formBill.exesMoney = res.data.data.rows[0].exes_money
						_self.formBill.incomeAmount = res.data.data.rows[0].income_amount
						_self.formBill.incomeMoney = res.data.data.rows[0].income_money
						_self.formBill.bankReceipt = res.data.data.rows[0].bank_receipt
					}else{
						_self.formBill.costAmount = 0
						_self.formBill.costMoney = 0
						_self.formBill.exesAmount = 0
						_self.formBill.exesMoney = 0
						_self.formBill.incomeAmount = 0
						_self.formBill.incomeMoney = 0
						_self.formBill.bankReceipt = 0
					}
					
				}
				
				_self.$Get(url,config,success)
			},
			close(){
				this.status = false
// 				this.id = ""
// 				this.formBill = {}
			},
			add(){
				let _self = this
				let url = 'api/customer/company/bill/createCompanyBill'
				let config = {
					companyId:_self.companyId,
					costAmount:_self.formBill.costAmount,
					costMoney:_self.formBill.costMoney,
					exesAmount:_self.formBill.exesAmount,
					exesMoney:_self.formBill.exesMoney,
					incomeAmount:_self.formBill.incomeAmount,
					incomeMoney:_self.formBill.incomeMoney,
					bankReceipt:_self.formBill.bankReceipt,
					period:_self.period,
				}
				function success(res){
					_self.id = res.id
					_self.close()
				}
				_self.$Post(url,config,success)
			},
			update(){
				let _self = this
				let url = 'api/customer/company/bill/updateCompanyBill'
				let config = {
					id:_self.id,
					companyId:_self.companyId,
					costAmount:_self.formBill.costAmount,
					costMoney:_self.formBill.costMoney,
					exesAmount:_self.formBill.exesAmount,
					exesMoney:_self.formBill.exesMoney,
					incomeAmount:_self.formBill.incomeAmount,
					incomeMoney:_self.formBill.incomeMoney,
					bankReceipt:_self.formBill.bankReceipt,
					period:_self.period
				}
				console.log("config")
				console.log(config)
				function success(res){
					_self.close()
				}
				_self.$Post(url,config,success)
			},
			save(){
				if(this.id){
					this.update()
				}else{
					this.add()
				}
			}
		},
		created(){
			let _self = this
			this.$bus.on("OPEN_bill",(e)=>{
				_self.status = true
				_self.companyId = e.company_id
				_self.period = e.period
				_self.getData()
			})
		}
	}
</script>

<style>
</style>
