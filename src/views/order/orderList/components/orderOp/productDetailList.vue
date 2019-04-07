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
											<InputNumber 
												:min="0" 
												:value="productList[index].paynumber" 
												size="small" 
												style="width:80px"
												@on-blur="computer_paynumber"></InputNumber>
										</FormItem>
									</div>
								</div>
							</Col>
							<Col span="19">
								<div>
									<Row>
										<Col span="6">
											<FormItem label="购买数量">
												<!-- 手动处理修改数量后，业务逻辑 其他参照此-->
												<InputNumber
													@on-blur="changeProductNumber(item.productnumber, index)"
													:min="0" 
													v-model="item.productnumber"
													number
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
											<FormItem label="服务人员">
												<!-- 如果需要手动添加服务人员名称而不只是id，请实例化selectService函数，否则无需处理 -->
												<Select 
													style="width:120px" 
													size="small" 
													v-model="productList[index].serverUserId"
													@on-change="selectService($event, index)" 
													label-in-value>
													<Option 
														v-for="(serverItem, index) in productList[index].serviceList" 
														:key="index" 
														:value="serverItem.userId">{{serverItem.realname}}</Option>
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
			
			
		</div>
	</div>
</template>

<script>
export default{
	//	不要使用vuex，无法直接修改数值，如果要修改，会搞死人的，要写一堆的action
	//	直接使用props传值，再watch productItem 属性即可
	data(){
		return{
			landTax:[{name:"是"},{name:"否"}],
			productList:[],
			companyId:"",
			orderDetail: {
			    paynumber: "",
			    realnumber: "",
			}
		}
	},
	methods:{
		//	处理部门逻辑
		select(item, index){
			// 第一个参数为选项值{value： ,label: }
			// 第二个值为序号
			//	修改对应的值
			let _self = this
			_self.productList.serviceList = [] //每次选择都先清空服务人员列表
			
			this.productList[index].departid = item.value
			this.productList[index].departName = item.label
			
			for(let i=0;i<_self.productList.length;i++){
				if(_self.productList[i].departid === _self.productList[index].departid){
					if(_self.productList[i].weight >= _self.productList[index].weight){
						_self.productList[index].serviceList = _self.productList[i].serviceList
					}else{
						_self.getRealName(item.value, index)
						_self.productList[i].serviceList = _self.productList[index].serviceList
					}
				}else{
					_self.getRealName(item.value, index)
				}
			}
			
			
		},
		removeItem(item){
			this.$store.commit("orderList/removeProductListItem",item)
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
		    this.orderDetail.paynumber = parseInt(temp)
		    this.orderDetail.realnumber = parseInt(temp)
			this.$bus.emit("SET_ORDER_DETAIL",{paynumber:_self.orderDetail.paynumber,realnumber:_self.orderDetail.realnumber})
		}
	},
	created(){
		let _self = this
		this.$bus.on("ADD_PRODUCT_DETAIL_LIST",(e)=>{
			_self.productList.push(e)
			console.log("_self.productList")
			console.log(_self.productList)
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
