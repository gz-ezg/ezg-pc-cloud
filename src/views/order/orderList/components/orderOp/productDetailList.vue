<template>
	<div class="test">
		<!-- <Collapse v-model="value">
			<Panel :name="index" v-for="(item,index) of productList" :key="index">
				<div v-if="item.product === '小规模代理记账'">
					<p>小规模代理记账</p>
					<Form label-position="left" slot="content">
						<Row>
							<Col span="5">
								<div>
									<FormItem label="公司类型:" label-width="80">
										<Input disabled placeholder="内资公司" size="small" style="width: 100px;"></Input>
									</FormItem>
									<FormItem label="小规模类型:" label-width="80">
										<Input disabled placeholder="小规模特定2000" size="small" style="width: 100px;"></Input>
									</FormItem>
									<FormItem label="产品价格:" label-width="80">
										<Input disabled placeholder="2000元" size="small" style="width: 100px;"></Input>
									</FormItem>
									<FormItem label="月单价:" label-width="80">
										<Input disabled placeholder="166元" size="small" style="width: 100px;"></Input>
									</FormItem>
									<FormItem label="销售金额" label-width="80">
										<Input placeholder="2000" size="small" style="width: 100px;"></Input>￥
									</FormItem>
								</div>
							</Col>
							<Col span="19">
								<div>
									<Row>
										<Col span="6">
											<FormItem label="购买数量" label-width="60">
												<InputNumber :min="0" v-model="value1" size="small" style="width:80px"></InputNumber>月
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="赠送数量" label-width="60">
												<InputNumber :min="0" v-model="value1" size="small" style="width:80px"></InputNumber>月
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="A类外勤" label-width="60">
												<InputNumber :min="0" v-model="value1" size="small" style="width:80px"></InputNumber>次
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="B类外勤" label-width="60">
												<InputNumber :min="0" v-model="value1" size="small" style="width:80px"></InputNumber>次
												
											</FormItem>
										</Col>
									</Row>
									
									<Row>
										<Col span="6">
											<FormItem label="开始税期" label-width="60">
												<DatePicker type="month" placeholder="选择月份" style="width:80px" size="small"></DatePicker>
												
											</FormItem>
											
										</Col>
										<Col span="6">
											<FormItem label="服务部门" label-width="60">
												<Select style="width:80px" size="small">
													<Option></Option>
												</Select>
											</FormItem>
											
										</Col>
										<Col span="6">
											<FormItem label="服务人员">
												<Select style="width:80px" size="small">
													<Option></Option>
												</Select>
												
											</FormItem>
											
										</Col>
										<Col span="6">
											<FormItem label="国地税报到">
												<Select style="width:80px" size="small">
													<Option></Option>
												</Select>
												
											</FormItem>
											
										</Col>
									</Row>
									<Row>
										<Col>
											<FormItem label="服务说明">
												<Input type="textarea" size="small" :rows="4"></Input>
											</FormItem>
										</Col>
									</Row>
								</div>
							</Col>
						</Row>
					</Form>
				</div>
				
				<div v-if="item.product === '会计到家'">
					<p>会计到家</p>
					<Form label-position="left" slot="content">
						<Row>
							<Col span="5">
								<div>
									<FormItem label="公司类型:" label-width="80">
										<Input disabled placeholder="内资公司" size="small" style="width: 100px;"></Input>
									</FormItem>
									<FormItem label="小规模类型:" label-width="80">
										<Input disabled placeholder="小规模特定2000" size="small" style="width: 100px;"></Input>
									</FormItem>
									<FormItem label="产品价格:" label-width="80">
										<Input disabled placeholder="2000元" size="small" style="width: 100px;"></Input>
									</FormItem>
									<FormItem label="月单价:" label-width="80">
										<Input disabled placeholder="166元" size="small" style="width: 100px;"></Input>
									</FormItem>
									<FormItem label="销售金额" label-width="80">
										<Input placeholder="2000" size="small" style="width: 100px;"></Input>￥
									</FormItem>
								</div>
							</Col>
							<Col span="19">
								<div>
									<Row>
										<Col span="6">
											<FormItem label="购买数量" label-width="60">
												<InputNumber :min="0" v-model="value1" size="small" style="width:80px"></InputNumber>月
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="赠送数量" label-width="60">
												<InputNumber :min="0" v-model="value1" size="small" style="width:80px"></InputNumber>月
											</FormItem>
										</Col>
										
									</Row>
									
									<Row>
										<Col span="6">
											<FormItem label="开始税期" label-width="60">
												<DatePicker type="month" placeholder="选择月份" style="width:80px" size="small"></DatePicker>
												
											</FormItem>
											
										</Col>
										<Col span="6">
											<FormItem label="服务部门" label-width="60">
												<Select style="width:80px" size="small">
													<Option></Option>
												</Select>
												
											</FormItem>
											
										</Col>
										<Col span="6">
											<FormItem label="服务人员">
												<Select style="width:80px" size="small">
													<Option></Option>
												</Select>
												
											</FormItem>
											
										</Col>
										<Col span="6">
											<FormItem label="国地税报到">
												<Select style="width:80px" size="small">
													<Option></Option>
												</Select>
												
											</FormItem>
											
										</Col>
									</Row>
									<Row>
										<Col>
											<FormItem label="服务说明">
												<Input type="textarea" size="small" :rows="4"></Input>
											</FormItem>
										</Col>
									</Row>
								</div>
							</Col>
						</Row>
					</Form>
				</div>
				
				<div v-if="item.product === '其他'">
					<p>其他</p>
					<Form label-position="left" slot="content">
						<Row>
							<Col span="5">
								<div>
									<FormItem label="软著工作日:" label-width="80">
										<Input disabled placeholder="3(加急件)" size="small" style="width: 100px;"></Input>
									</FormItem>
									<FormItem label="软著代码:" label-width="80">
										<Input disabled placeholder="需编写" size="small" style="width: 100px;"></Input>
									</FormItem>
									<FormItem label="产品价格:" label-width="80">
										<Input disabled placeholder="8600元" size="small" style="width: 100px;"></Input>
									</FormItem>
									<FormItem label="销售金额" label-width="80">
										<Input placeholder="2000" size="small" style="width: 100px;"></Input>￥
									</FormItem>
								</div>
							</Col>
							<Col span="19">
								<div>
									<Row>
										<Col span="6">
											<FormItem label="购买数量" label-width="60">
												<InputNumber :min="0" v-model="value1" size="small" style="width:80px"></InputNumber>
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="服务部门" label-width="60">
												<Select style="width:80px" size="small">
													<Option></Option>
												</Select>
												
											</FormItem>
											
										</Col>
										<Col span="6">
											<FormItem label="服务人员">
												<Select style="width:80px" size="small">
													<Option></Option>
												</Select>
												
											</FormItem>
											
										</Col>
										
									</Row>
									
									
									<Row>
										<Col>
											<FormItem label="服务说明">
												<Input type="textarea" size="small" :rows="4"></Input>
											</FormItem>
										</Col>
									</Row>
								</div>
							</Col>
						</Row>
					</Form>
				</div>
			</Panel>
		</Collapse> -->
		
		<div v-for="(item,index) of productList" :key="index">
			<div v-if="item.product === '小规模代理记账'">
				<h6 style="display: flex; justify-content: space-between; padding: 0 5px; background: #DDDDDD;">
					<span>小规模代理记账</span>
					<Button size="small" @click="removeItem(index)">删除</Button>
				</h6>
				<Card>
					<Form label-position="left">
						<Row>
							<Col span="5">
								<div>
									<div v-html="item.propertys"></div>
									<div>
										产品价格:
										<span>{{item.paynumber}}</span>
									</div>
									<div>
										月单价:
										<span>{{item.unitprice}}</span>
									</div>
									<div>
										<FormItem label="销售金额￥">
											<InputNumber :min="0" :value="item.paynumber" size="small" style="width:80px"></InputNumber>
										</FormItem>
									</div>
								</div>
							</Col>
							<Col span="19">
								<div>
									<Row>
										<Col span="6">
											<FormItem label="购买数量">
												<InputNumber :min="0" v-model="item.productnumber" size="small" style="width:80px"></InputNumber>月
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="赠送数量">
												<InputNumber :min="0" value = "0" size="small" style="width:80px"></InputNumber>月
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="A类外勤">
												<InputNumber :min="0" v-model="item.type_a_count" size="small" style="width:80px"></InputNumber>次
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="B类外勤">
												<InputNumber :min="0" v-model="item.type_b_count" size="small" style="width:80px"></InputNumber>次
												
											</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="6">
											<FormItem label="开始税期">
												<DatePicker type="month" placeholder="选择月份" style="width:100px" size="small"></DatePicker>
												
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="服务部门">
												<Select style="width:120px" size="small">
													<Option 
														v-for="departItem of JSON.parse(item.servicedeparts)" 
														:key="departItem.departCode">{{departItem.text}}</Option>
												</Select>
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="服务人员">
												<Select style="width:120px" size="small">
													<Option></Option>
												</Select>
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="国地税报到">
												<Select style="width:80px" size="small">
													<Option 
														v-for="(landTaxItem,i) of landTax"
														:key="i">{{landTaxItem.name}}</Option>
												</Select>
											</FormItem>
										</Col>
									</Row>
									<Row>
										<Col>
											<FormItem label="服务说明">
												<Input type="textarea" size="small" :rows="2" style="width:80%"></Input>
											</FormItem>
										</Col>
									</Row>
								</div>
							</Col>
						</Row>
					</Form>
				</Card>
			</div>
			
			
			<div v-else-if="item.product === '会计到家'">
				<h6 style="display: flex; justify-content: space-between; padding: 0 5px; background: #DDDDDD;">
					<span>会计到家</span>
					<Button size="small" @click="removeItem(index)">删除</Button>
				</h6>
				<Card>
					<Form label-position="left">
						<Row>
							<Col span="5">
								<div>
									<div v-html="item.propertys"></div>
									<div>
										产品价格:
										<span>{{item.paynumber}}</span>
									</div>
									<div>
										月单价:
										<span>{{item.unitprice}}</span>
									</div>
									<div>
										<FormItem label="销售金额￥">
											<InputNumber :min="0" :value="item.paynumber" size="small" style="width:80px"></InputNumber>
										</FormItem>
									</div>
								</div>
							</Col>
							<Col span="19">
								<div>
									<Row>
										<Col span="6">
											<FormItem label="购买数量">
												<InputNumber :min="0" v-model="value1" size="small" style="width:80px"></InputNumber>月
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="赠送数量">
												<InputNumber :min="0" v-model="value1" size="small" style="width:80px"></InputNumber>月
											</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="6">
											<FormItem label="开始税期">
												<DatePicker type="month" placeholder="选择月份" style="width:80px" size="small"></DatePicker>
												
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="服务部门">
												<Select style="width:80px" size="small">
													<Option 
														v-for="departItem of item.servicedeparts" 
														:key="departItem.departCode">{{departItem.text}}</Option>
												</Select>
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="服务人员">
												<Select style="width:80px" size="small">
													<Option></Option>
												</Select>
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="国地税报到">
												<Select style="width:80px" size="small">
													<Option></Option>
												</Select>
											</FormItem>
										</Col>
									</Row>
									<Row>
										<Col>
											<FormItem label="服务说明">
												<Input type="textarea" size="small" :rows="2" style="width:80%"></Input>
											</FormItem>
										</Col>
									</Row>
								</div>
							</Col>
						</Row>
					</Form>
				</Card>
			</div>
			
			
			<div v-else>
				<h6 style="display: flex; justify-content: space-between; padding: 0 5px; background: #DDDDDD;">
					<span>其他</span>
					<Button size="small" @click="removeItem(index)">删除</Button>
				</h6>
				<Card>
					<Form label-position="left">
						<Row>
							<Col span="5">
								<div>
									<div v-html="item.propertys"></div>
									<div>
										产品价格:
										<span>{{item.paynumber}}</span>
									</div>
									<div>
										<FormItem label="销售金额￥">
											<InputNumber :min="0" :value="item.paynumber" size="small" style="width:80px"></InputNumber>
										</FormItem>
									</div>
								</div>
							</Col>
							<Col span="19">
								<div>
									<Row>
										<Col span="6">
											<FormItem label="购买数量">
												<InputNumber :min="0" v-model="value1" size="small" style="width:80px"></InputNumber>
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="服务部门">
												<Select style="width:80px" size="small">
													<Option 
														v-for="departItem of JSON.parse(item.servicedeparts)" 
														:key="departItem.departCode">{{departItem.text}}</Option>
												</Select>
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="服务人员">
												<Select style="width:80px" size="small">
													<Option></Option>
												</Select>
											</FormItem>
										</Col>
										
									</Row>
									<Row>
										<Col>
											<FormItem label="服务说明">
												<Input type="textarea" size="small" :rows="2" style="width:80%"></Input>
											</FormItem>
										</Col>
									</Row>
								</div>
							</Col>
						</Row>
					</Form>
				</Card>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	computed:{
		productItem(){
			return this.$store.state.orderList.productItem
		},
		productList(){
			return this.$store.state.orderList.productList
		}
	},
	data(){
		return{
			landTax:[{name:"是"},{name:"否"}],
		}
	},
	methods:{
		removeItem(item){
			this.$store.commit("orderList/removeProductListItem",item)
		},
		getDay(){
			let _self = this
			let url = 'api/order/cycle/service/record/budget/period'
			let config = {
				params:{
					productId:_self.productList.productid,
					companyId:,
				}
			}
			function success(res){
				console.log(res)
			}
			this.$Get(url,config,success)
		}
	},
	created(){
		this.getDay()
	}
}
</script>

<style>
.test .ivu-form-item{
	margin-bottom: 2px;
}
.test .ivu-form-item-label{
	padding: 10px 2px;
}
</style>
