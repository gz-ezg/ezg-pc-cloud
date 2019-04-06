<template>
	<div class="test">
		
		
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
										<span>{{productList[index].unitprice}}</span>
									</div>
									<div>
										<FormItem label="销售金额￥">
											<InputNumber :min="0" :value="productList[index].paynumber" size="small" style="width:80px"></InputNumber>
										</FormItem>
									</div>
								</div>
							</Col>
							<Col span="19">
								<div>
									<Row>
										<Col span="6">
											<FormItem label="购买数量">
												<InputNumber
													@on-change=""
													:min="0" 
													v-model="productList[index].productnumber" 
													size="small" 
													style="width:80px"></InputNumber>月
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
												<DatePicker type="month" v-model="item.servicestartdate" placeholder="选择月份" style="width:100px" size="small"></DatePicker>
												
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="服务部门">
												<Select 
													style="width:120px" 
													size="small" 
													@on-change="select" 
													v-model="item.departid"
													label-in-value>
													<Option
														:value="departItem.type"
														v-for="departItem of JSON.parse(item.servicedeparts)" 
														:key="departItem.departCode">{{departItem.text}}</Option>
												</Select>
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="服务人员">
												<Select style="width:120px" size="small" v-model="productList[index].realname">
													<Option :value="productList[index].realname">{{productList[index].realname}}</Option>
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
		},
		companyId(){
			return this.$store.state.orderList.companyId
		},
		pskuId(){
			return this.$store.state.orderList.pskuId
		}
	},
	data(){
		return{
			landTax:[{name:"是"},{name:"否"}],
			serviceDepartId:""
		}
	},
	methods:{
		select(item){
// 			console.log("value")
// 			console.log(value)
			this.serviceDepartId = item.value
			this.getRealName(item.value)
		},
		removeItem(item){
			this.$store.commit("orderList/removeProductListItem",item)
		},
		getRealName(index){
			let _self = this
			let url = 'api/product/server/list'
			let config = {
				params:{
					productSkuId:_self.pskuId,
					serviceDepartId:_self.serviceDepartId,
					companyId:_self.companyId,
				}
			}
			function success(res){
// 				console.log("resres")
// 				console.log(res)
// 				console.log("res.data.data")
// 				console.log(res.data.data[0].realname)
				_self.productList[index].realname = res.data.data[0].realname
				
				// _self.realname = res.data.data[0].realname
				// console.log(_self.realname)
			}
			this.$Get(url,config,success)
		}
	},
	created(){
		// this.getDay()
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
