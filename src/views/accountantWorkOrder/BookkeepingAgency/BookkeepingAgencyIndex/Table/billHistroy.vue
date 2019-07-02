<template>
	<div>
		<Modal width="400" v-model="status" title="历史票据内容" @on-cancel="close">
			<Form ref="formHistoryBill" :model="formHistoryBill" :rules="ruleHistoryBill">
				<Row>
					<FormItem>
						<DatePicker @on-change="dateChange" v-model="period" format="yyyyMM" type="month" placeholder="选择月份" style="width: 200px; display: block; margin: 0 auto;"></DatePicker>
					</FormItem>
				</Row>
				<Row>
					<Col span="12">
						<FormItem label="成本票" label-width=60>
							<Input disabled  v-model="formHistoryBill.cost_amount"></Input>
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="总金额" label-width=60>
							<Input disabled  v-model="formHistoryBill.cost_money"></Input>
						</FormItem>
					</Col>
				</Row>
				
				<Row>
					<Col span="12">
						<FormItem label="费用票" label-width=60>
							<Input disabled  v-model="formHistoryBill.exes_amount"></Input>
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="总金额" label-width=60>
							<Input disabled  v-model="formHistoryBill.exes_money"></Input>
						</FormItem>
					</Col>
				</Row>
				
				<Row>
					<Col span="12">
						<FormItem label="收入" label-width=60>
							<Input disabled  v-model="formHistoryBill.income_amount"></Input>
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="总金额" label-width=60>
							<Input disabled  v-model="formHistoryBill.income_money"></Input>
						</FormItem>
					</Col>
				</Row>
				
				<Row>
					<Col span="12">
						<FormItem label="银行回单" label-width=60>
							<Input disabled  v-model="formHistoryBill.bank_receipt"></Input>
						</FormItem>
					</Col>
				</Row>
			</Form>
			<div slot="footer">
			    <Button type="ghost" @click="close">关闭</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
import {DateFormatYearMonth2} from "../../../../../libs/utils";
export default{
	props:["status"],
	data(){
		return{
			companyId:"",
			period:"",
			formHistoryBill:{
				cost_amount:0,
				cost_money:0,
				exes_amount:0,
				exes_money:0,
				income_amount:0,
				income_money:0,
				bank_receipt:0
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
					_self.formHistoryBill = res.data.data.rows[0]
				}else{
					_self.formHistoryBill.cost_amount = 0
					_self.formHistoryBill.cost_money = 0
					_self.formHistoryBill.exes_amount = 0
					_self.formHistoryBill.exes_money = 0
					_self.formHistoryBill.income_amount = 0
					_self.formHistoryBill.income_money = 0
					_self.formHistoryBill.bank_receipt = 0
				}
			}
			
			_self.$Get(url,config,success)
		},
		close(){
			this.status = false
		},
		dateChange(date){
			this.period = date
			this.getData()
			// console.log(this.period)
			// this.getData()
		}
	},
	created(){
		let _self = this
		this.$bus.on("OPEN_bill_History",(e)=>{
			_self.status = true
			_self.companyId = e.company_id
			let date = new Date()
			_self.period = DateFormatYearMonth2(date)
			// console.log(_self.period)
			_self.getData()
		})
	}
}
</script>

<style>
</style>
