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
												<Input
													@on-change="changeProductNumber(item.productnumber, index)"
													v-model="item.productnumber"
													number
													size="small" 
													style="width:80px"></Input>月
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="赠送数量">
												<Input
													
													v-model="item.givethenumber" 
													value = "0" 
													size="small" 
													style="width:80px"></Input>月
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="A类外勤" prop="type_a_count">
												<Input
													
													v-model="item.type_a_count" 
													size="small" 
													style="width:80px"></Input>次
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="B类外勤" prop="type_b_count">
												<Input
													
													v-model="item.type_b_count" 
													size="small" 
													style="width:80px"></Input>次
											</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="6">
											<FormItem label="开始税期" prop="servicestartdate">
												<DatePicker
													
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
													style="width:120px" 
													size="small" 
													@on-change="select($event, index)" 
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
											<FormItem label="服务人员" prop="serverUserId">
												<!-- 如果需要手动添加服务人员名称而不只是id，请实例化selectService函数，否则无需处理 -->
												<Select 
													style="width:120px" 
													size="small" 
													v-model="item.serverUserId"
													@on-change="selectService($event, index)" 
													label-in-value>
													<Option 
														v-for="(serverItem, index) in item.serviceList" 
														:key="index" 
														:value="serverItem.userId">{{serverItem.realname+"("+serverItem.flag+")"}}</Option>
												</Select>
											</FormItem>
										</Col>
									</Row>
									<Row>
										<Col>
											<FormItem label="服务说明">
												<Input
													
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
												v-model="item.paynumber"
												:value="item.paynumber" 
												size="small" 
												style="width:80px"
												@on-blur="computer_paynumber"></Input>
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
												<Input
													@on-blur="changeProductNumber(item.productnumber, index)"
													v-model="item.productnumber"
													number
													size="small" 
													style="width:80px"></Input>月
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="赠送数量">
												<Input
													
													v-model="item.givethenumber" 
													value = "0" 
													size="small" 
													style="width:80px"></Input>月
											</FormItem>
										</Col>
									</Row>
									<Row>
										<Col span="6">
											<FormItem label="开始税期" prop="servicestartdate">
												<DatePicker
													
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
													style="width:120px" 
													size="small" 
													@on-change="select($event, index)" 
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
											<FormItem label="服务人员" prop="serverUserId">
												<!-- 如果需要手动添加服务人员名称而不只是id，请实例化selectService函数，否则无需处理 -->
												<Select 
													style="width:120px" 
													size="small" 
													v-model="item.serverUserId"
													@on-change="selectService($event, index)" 
													label-in-value>
													<Option 
														v-for="(serverItem, index) in item.serviceList" 
														:key="index" 
														:value="serverItem.userId">{{serverItem.realname+"("+serverItem.flag+")"}}</Option>
												</Select>
											</FormItem>
										</Col>
									</Row>
									<Row>
										<Col>
											<FormItem label="服务说明">
												<Input
													
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
												v-model="item.paynumber"
												:value="item.paynumber" 
												size="small" 
												style="width:80px"
												@on-blur="computer_paynumber"></Input>
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
												<Input
													@on-blur="changeProductNumber(item.productnumber, index)"
													v-model="item.productnumber"
													number
													size="small" 
													style="width:80px"></Input>
											</FormItem>
										</Col>
										<Col span="6">
											<FormItem label="服务部门" prop="departid">
												<Select 
													style="width:120px" 
													size="small" 
													@on-change="select($event, index)" 
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
											<FormItem label="服务人员" prop="serverUserId">
												<!-- 如果需要手动添加服务人员名称而不只是id，请实例化selectService函数，否则无需处理 -->
												<Select 
													style="width:120px" 
													size="small" 
													v-model="item.serverUserId"
													@on-change="selectService($event, index)" 
													label-in-value>
													<Option 
														v-for="(serverItem, index) in item.serviceList" 
														:key="index" 
														:value="serverItem.userId">{{serverItem.realname+"("+serverItem.flag+")"}}</Option>
												</Select>
											</FormItem>
										</Col>
									</Row>
									<Row>
										<Col>
											<FormItem label="服务说明">
												<Input
													
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
		
		
		<!-- <Select v-model="cityList[0].value" style="width:200px">
			<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
		</Select> -->
		
	</div>
</template>

<script>
export default{
	props:["productList"],
	watch:{
		productList:{
			handler(val){
				this.$bus.emit("SET_ORDER_DETAIL",val)
				this.computer_paynumber()
			},
			immediate: true
		}
	},
	data(){
		return{
			productList:[],
			companyId:"",
// 			cityList: [
//                     {
//                         value: 'New York',
//                         label: 'New York'
//                     },
//                     {
//                         value: 'London',
//                         label: 'London'
//                     }],
// 			ruleValidate:{
// 				paynumber:[
// 					{required: true, message: '请填写销售金额', trigger: 'blur',type: "number"}
// 				],
// 				productnumber:[
// 					{required: true, message: '请填写购买数量', trigger: 'blur',type: "number"}
// 				],
// 				type_a_count:[
// 					{required: true, message: '请填写a类外勤数量', trigger: 'blur',type: "number"}
// 				],
// 				type_b_count:[
// 					{required: true, message: '请填写b类外勤数量', trigger: 'blur',type: "number"}
// 				],
// 				departid:[
// 					{required: true, message: '请填写服务部门', trigger: 'change'}
// 				],
// 				serverUserId:[
// 					{required: true, message: '请填写服务人员', trigger: 'change'}
// 				]
// 			}
		}
	},
	methods:{
		//	处理部门逻辑
		select(item, index){
			// 第一个参数为选项值{value： ,label: }
			// 第二个值为序号
			//	修改对应的值
			let _self = this
			
			
			this.productList[index].departid = item.value
			this.productList[index].departName = item.label
			
			if(_self.productList.length === 1){
				_self.getRealName(item.value, index)
			}else{
				for(let i=0;i<=_self.productList.length;i++){
					let list = _self.productList[i]
					let myself = _self.productList[index]
					
					if(list.serviceList && list.departid === myself.departid){
						if(list.weight >= myself.weight){
							myself.serviceList = list.serviceList
						}else{
							list.serviceList = myself.serviceList
						}
					}else{
						_self.getRealName(item.value, index)
					}
				}
				
			}	
		},
		removeItem(index){
			this.productList.splice(index,1)
		},
		getRealName(departId, index){
			let _self = this
			let url = 'api/product/server/list'
			let config = {
				params:{
					productSkuId: _self.productList[index].skuid,
					serviceDepartId: _self.productList[index].departid,
					companyId: _self.companyId,
				}
			}
			function success(res){
				
				_self.$set(_self.productList[index],'serviceList',res.data.data)
				
			}
			this.$Get(url,config,success)
		},
		//	改变产品数量后自动执行该函数，可以在此函数处理其他值的相关逻辑
		changeProductNumber(value, index) {
			//	value指当前赋值，index产品序号
// 			console.log(index)
// 			console.log(value)
			this.productList[index].paynumber = this.productList[index].unitprice * value
			this.computer_paynumber()
		},
		
		//	处理人员逻辑
		selectService(item,index) {
			this.productList[index].serverUserId = item.userId
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
			console.log("_self.productList")
			console.log(_self.productList)
		})
		this.$bus.on("OPEN_ORDER_PRODUCT_LIST",(e)=>{
			_self.companyId = e
		})
	}
}
// givethenumber 赠送数量
// plusdeduct
// memo 备注
// propertys
</script>

<style>
.test .ivu-form-item{
	margin-bottom: 2px;
}
.test .ivu-form-item-label{
	padding: 10px 2px;
}
</style>



<!-- 周期性产品 名称不包含会计到家的就是代理记账 -->
<!-- 服务人员 名字+(flag) 默认选第一个 -->