<template>
	<div class="test">
		
		
		<div v-for="(item,index) of productList" :key="index">
			<!-- 代理记账 -->
			<div v-if="item.iscycle === 'Y' && item.product != '会计到家'">
				<h6 style="display: flex; justify-content: space-between; padding: 0 5px; background: #DDDDDD;">
					<span>小规模代理记账</span>
					<Button size="small" @click="removeItem(index)">删除</Button>
				</h6>
				<Card>
					<Form label-position="left" :rules="ruleValidate">
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
										<FormItem label="销售金额￥" prop="paynumber">
											<Input
												@on-change="computer_paynumber(item.paynumber, index)"
												v-model="item.paynumber"
												:value="item.paynumber" 
												size="small" 
												style="width:80px"
												:disabled="isDisabled"
												></Input>
										</FormItem>
									</div>
								</div>
							</Col>
							<Col span="19">
								<div>
									<Row>
										<Col span="6">
											<FormItem label="购买数量" prop="productnumber">
												<!-- 手动处理修改数量后，业务逻辑 其他参照此-->
												<InputNumber
													:precision="0"
													@on-change="changeProductNumber(item.productnumber, index)"
													v-model="item.productnumber"
													number
													size="small"
													:disabled="isDisabled"
													style="width:80px"></InputNumber>月
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="赠送数量">
												<InputNumber
													:precision="0"
													:disabled="isDisabled"
													v-model="item.givethenumber" 
													value = "0" 
													size="small" 
													style="width:80px"></InputNumber>月
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="A类外勤" prop="type_a_count">
												<InputNumber
													:precision="0"
													:disabled="isDisabled"
													v-model="item.type_a_count" 
													size="small" 
													style="width:80px"></InputNumber>次
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="B类外勤" prop="type_b_count">
												<InputNumber
													:precision="0"
													:disabled="isDisabled"
													v-model="item.type_b_count" 
													size="small" 
													style="width:80px"></InputNumber>次
											</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="6">
											<FormItem label="开始税期" prop="servicestartdate">
												<DatePicker
													:disabled="isDisabled"
													type="month" 
													v-model="item.servicestartdate" 
													placeholder="选择月份" 
													style="width:100px" 
													size="small"></DatePicker>
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="服务部门" prop="departid">
												<Select
													:disabled="isDisabled"
													style="width:120px" 
													size="small" 
													@on-change="select($event, index)" 
													v-model="item.departType" 
													label-in-value>
													<Option
														:value="departItem.type"
														v-for="departItem of JSON.parse(item.servicedeparts)" 
														:key="departItem.departCode">{{departItem.text}}</Option>
												</Select>
											</FormItem>
										</Col>
									</Row>
									<Row>
										<Col>
											<FormItem label="服务说明">
												<Input
													:disabled="isDisabled"
													v-model="productList[index].memo"
													type="textarea" 
													size="small" 
													:rows="2" 
													style="width:80%"></Input>
											</FormItem>
										</Col>
									</Row>
								</div>
							</Col>
						</Row>
					</Form>
				</Card>
			</div>
			
			<!-- 会计到家 -->
			<div v-else-if="item.product === '会计到家'">
				<h6 style="display: flex; justify-content: space-between; padding: 0 5px; background: #DDDDDD;">
					<span>会计到家</span>
					<Button size="small" @click="removeItem(index)">删除</Button>
				</h6>
				<Card>
					<Form label-position="left" ref="formValidate" :rules="ruleValidate">
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
										<FormItem label="销售金额￥" prop="paynumber">
											<Input
												@on-change="computer_paynumber(item.paynumber, index)"
												v-model="item.paynumber"
												:value="item.paynumber" 
												size="small" 
												style="width:80px"
												:disabled="isDisabled"
												></Input>
										</FormItem>
									</div>
								</div>
							</Col>
							<Col span="19">
								<div>
									<Row>
										<Col span="6">
											<FormItem label="购买数量" prop="productnumber">
												<!-- 手动处理修改数量后，业务逻辑 其他参照此-->
												<InputNumber
													:precision="0"
													@on-change="changeProductNumber(item.productnumber, index)"
													v-model="item.productnumber"
													number
													size="small"
													:disabled="isDisabled"
													style="width:80px"></InputNumber>月
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="赠送数量">
												<InputNumber
													:precision="0"
													:disabled="isDisabled"
													v-model="item.givethenumber" 
													value = "0" 
													size="small" 
													style="width:80px"></InputNumber>月
											</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="6">
											<FormItem label="开始税期" prop="servicestartdate">
												<DatePicker
													:disabled="isDisabled"
													type="month" 
													v-model="item.servicestartdate" 
													placeholder="选择月份" 
													style="width:100px" 
													size="small"></DatePicker>
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="服务部门" prop="departid">
												<Select
													:disabled="isDisabled"
													style="width:120px" 
													size="small" 
													@on-change="select($event, index)" 
													v-model="item.departType" 
													label-in-value>
													<Option
														:value="departItem.type"
														v-for="departItem of JSON.parse(item.servicedeparts)" 
														:key="departItem.departCode">{{departItem.text}}</Option>
												</Select>
											</FormItem>
										</Col>
									</Row>
									<Row>
										<Col>
											<FormItem label="服务说明">
												<Input
													:disabled="isDisabled"
													v-model="productList[index].memo"
													type="textarea" 
													size="small" 
													:rows="2" 
													style="width:80%"></Input>
											</FormItem>
										</Col>
									</Row>
								</div>
							</Col>
						</Row>
					</Form>
				</Card>
			</div>
			
			<!-- 其他 -->
			<div v-else>
				<h6 style="display: flex; justify-content: space-between; padding: 0 5px; background: #DDDDDD;">
					<span>{{item.product}}</span>
					<Button size="small" @click="removeItem(index)">删除</Button>
				</h6>
				<Card>
					<Form label-position="left" ref="formValidate" :rules="ruleValidate">
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
										<FormItem label="销售金额￥" prop="paynumber">
											<Input
												@on-change="computer_paynumber(item.paynumber, index)"
												v-model="item.paynumber"
												:value="item.paynumber" 
												size="small" 
												style="width:80px"
												:disabled="isDisabled"
												></Input>
										</FormItem>
									</div>
								</div>
							</Col>
							<Col span="19">
								<div>
									<Row>
										<Col span="6">
											<FormItem label="购买数量" prop="productnumber">
												<!-- 手动处理修改数量后，业务逻辑 其他参照此-->
												<InputNumber
													:precision="0"
													@on-change="changeProductNumber(item.productnumber, index)"
													v-model="item.productnumber"
													number
													size="small"
													:disabled="isDisabled"
													style="width:80px"></InputNumber>
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="服务部门" prop="departid">
												<Select
													:disabled="isDisabled"
													style="width:120px" 
													size="small" 
													@on-change="select($event, index)" 
													v-model="item.departType" 
													label-in-value>
													<Option
														:value="departItem.type"
														v-for="departItem of JSON.parse(item.servicedeparts)" 
														:key="departItem.departCode">{{departItem.text}}</Option>
												</Select>
											</FormItem>
										</Col>
									</Row>
									<Row>
										<Col>
											<FormItem label="服务说明">
												<Input
													:disabled="isDisabled"
													v-model="productList[index].memo"
													type="textarea" 
													size="small" 
													:rows="2" 
													style="width:80%"></Input>
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
import * as orderApi from '../../api'
export default{
	props:["productList","isDisabled"],
	watch:{
		productList:{
			handler(newVal,oldVal){
// 				console.log("newVal")
// 				console.log(newVal)
				this.$bus.emit("SET_ORDER_DETAIL",newVal)
				this.computer_paynumber()
				
			},
			// immediate: true
			deep:true
		}
	},
	data(){
		return{
			productList:[],
			companyId:"",
			ruleValidate:{
				productnumber:[
					{required: true,message: '请输入整数',trigger: 'blur',type:'integer'}
				]
			}
		}
	},
	methods:{
		//	处理部门逻辑
		select(item, index){
			// 第一个参数为选项值{value： ,label: }
			// 第二个值为序号
			//	修改对应的值
			console.log("item.value")
			console.log(item.value)
			console.log("index")
			console.log(index)
			let _self = this
			this.productList[index].departid = item.value
			this.productList[index].departname = item.label
			_self.getRealName(index)
		},
		removeItem(index){
			this.productList.splice(index,1)
		},
		async getRealName(index){
			let _self = this
			// let url = 'api/product/server/list'
			let config = {
				params:{
					productSkuId: _self.productList[index].skuid,
					serviceDepartId: _self.productList[index].departid,
					companyId: _self.companyId,
				}
			}

			let res = await orderApi.getRealName(config)
			_self.productList[index].serviceList = res
			// _self.$set(_self.productList[index],'serviceList',res)
			
// 			console.log("_self.productList[index].serviceList")
// 			console.log(_self.productList[index].serviceList)
			_self.$bus.emit("DEFAULT_REALNAME",{id:_self.productList[index].serviceList[0].userId,index:index})
		},
		
		//	改变产品数量后自动执行该函数，可以在此函数处理其他值的相关逻辑
		changeProductNumber(value, index) {
			//	value指当前赋值，index产品序号
// 			console.log(index)
// 			console.log(value)
			this.productList[index].paynumber = this.productList[index].unitprice * value
			this.computer_paynumber()
		},
		//  计算总金额
		computer_paynumber(){
		    let _self = this
		    let temp = 0
		    for(let i = 0; i < _self.productList.length; i++){
		        temp = parseInt(temp) + parseInt(_self.productList[i].paynumber)
		    }
			let paynumber = parseInt(temp)
		    let realnumber = parseInt(temp)
			
			this.$bus.emit("SET_PAYNUMBER",{paynumber:paynumber,realnumber:realnumber})
		}
	},
	created(){
		let _self = this
		this.$bus.on("ADD_PRODUCT_DETAIL_LIST",(e)=>{
			e.givethenumber = 0
			_self.productList.push(e)
			
			for(let i=0;i<_self.productList.length;i++){
				_self.productList[i].departType = JSON.parse(_self.productList[i].servicedeparts)[0].type
				_self.productList[i].departname = JSON.parse(_self.productList[i].servicedeparts)[0].text
				_self.productList[i].serviceList = []
				_self.getRealName(i)
			}
			
		})
		this.$bus.on("OPEN_ORDER_PRODUCT_LIST",(e)=>{
			_self.companyId = e
		})
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
