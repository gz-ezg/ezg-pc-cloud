<template>
	<div>
		<Card>
		<Modal
			style="margin-bottom:10px"
			v-model="expire_remark_modal"
			title="添加到期备注"
			@on-cancel="close_expire_remark"
		>
			<Form ref="formInline" :model="formInline" :rules="ruleInline">
				<FormItem prop="remark">
					<Input type="textarea" v-model="formInline.remark" placeholder="请输入备注"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
			    <Button type="ghost" @click="close_expire_remark">关闭</Button>
				<Button type="primary" @click="submit('formInline')">添加</Button>
			</div>
		</Modal>
		
		<Row  style="margin-bottom:10px">
			<Collapse v-model="search_model">
			    <Panel name="1">
			        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
			        筛选
			        <div  slot="content" @keydown.enter="search">
			            <Form ref="formInline" :model="searchForm" :label-width="100">
			                <Row :gutter="16">
			                    <Col span="8">
			                        <FormItem prop="companyName" label="公司名称：">
			                            <Input size="small" type="text"  v-model="searchForm.companyname" placeholder="">
			                            </Input>
			                        </FormItem>
			                    </Col>
			                    <Col span="8">
			                        <FormItem prop="name" label="客户名：">
			                            <Input size="small" type="text"  v-model="searchForm.name" placeholder="">
			                            </Input>
			                        </FormItem>
			                    </Col>
			                </Row>
							<Row :gutter="16">
							    <Col span="8">
							        <FormItem prop="tel" label="电话：">
							            <Input size="small" type="text"  v-model="searchForm.tel" placeholder="">
							            </Input>
							        </FormItem>
							    </Col>
							    <Col span="8">
							        <FormItem prop="followby_realname" label="市场：">
							            <Input size="small" type="text"  v-model="searchForm.followby_realname" placeholder="">
							            </Input>
							        </FormItem>
							    </Col>
							</Row>
			                <FormItem>
			                    <Button type="primary" @click="search">搜索</Button>
			                    <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
			                </FormItem>
			            </Form>
			        </div>
			    </Panel>
			</Collapse>
		</Row>
		
		<Row style="margin-bottom:10px">
		    <ButtonGroup>
		        <Button type="primary" icon="ios-color-wand-outline" @click="open_expire_remark">添加到期备注</Button>
		    </ButtonGroup>
		</Row>
		<Table highlight-row :loading="loading" :columns="header" :data="data" @on-row-click="selectRow"></Table>
		<company-detail v-if="company_detail_modal"></company-detail>
		<Page
		        size="small"
		        :total="pageTotal"
		        show-total
		        show-sizer
		        show-elevator
		        @on-change="pageChange"
		        @on-page-size-change="pageSizeChange"
		        style="margin-top: 10px"></Page>
		</Card>
	</div>
</template>

<script>
	import CompanyDetail from './CompanyDetail'
	export default {
		components:{
			CompanyDetail
		},
		computed:{
			company_detail_modal(){
				return this.$store.state.expireCustomer.company_detail_modal
			}
		},
		data() {
			return {
				searchForm:{
					companyname:"",
					name:"",
					tel:"",
					followby_realname:""
				},
				search_model:"",
				pageTotal:new Number(),
				page:1,
				pageSize:10,
				loading:false,
				formInline:{
					remark:""
				},
				expire_remark_modal:false,
				ruleInline:{
					remark:[{required: true, message: '请填写备注', trigger: 'blur'}]
				},
				header: [{
						title: "公司",
						key: "companyname",
					},
					{
						title: "客户",
						key: "name",
					},
					{
						title: "电话",
						key: "tel",
					},
					{
						title: "产品名称",
						key: "skuname",
					},
					{
						title: "剩余时长",
						key: "balance_count",
					},
					{
						title: "剩余外勤",
						key: "work_done",
					},
					{
						title: "结束税期",
						key: "end_period",
					},
					{
						title: "服务会计",
						key: "server_realname",
					},
					{
						title: "市场",
						key: "followby_realname",
					},
					{
						title: "到期备注",
						key: "expire_remark",
					}/*,
					{
						title: '操作',
						key: 'action',
						fixed: 'right',
						width: 120,
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'text',
									size: 'small'
								},
								on: {
								    click:()=>{
								        this.$store.commit("expireCustomer/open_company_detail_modal")
								    }
								}
							}, '[客户详情]')
						}
					}*/
				],
				data: [],
				id:""
			}
		},
		methods: {
			submit(name){
				let _self = this
				_self.loading = true
				let url = "api/order/cycle/service/record/addCycleServiceRecordExpiredRemark"
				let config = {
					id: _self.id,
					remark: _self.formInline.remark
				}
				function success(res){
					_self.getExpiredCustomerList()
					_self.close_expire_remark()
					_self.loading = false
				}
				this.$refs[name].validate((valid)=>{
					if(valid){
						this.$Post(url,config,success)
					}
				})
			},
			getExpiredCustomerList() {
				let _self = this
				_self.loading = true
				let url = "api/order/cycle/service/record/getExpiredCustomerList"
				
				console.log("_self.searchForm")
				console.log(_self.searchForm)
				
				let config = {
					params: {
						page: _self.page,
						pageSize: _self.pageSize,
						companyname:_self.searchForm.companyname,
						name:_self.searchForm.name,
						tel:_self.searchForm.tel,
						followby_realname:_self.searchForm.followby_realname
					}
				}

				function success(res) {
					let {
						rows,
						total
					} = res.data.data
					_self.data = rows
					_self.pageTotal = total
					_self.loading = false
					// console.log(_self.data)
				}
				this.$Get(url, config, success)
			},
			open_expire_remark(){
				if(!this.id){
					this.$Message.warning('请选择一行添加')
				}else{
					this.expire_remark_modal = true
				}
			},
			close_expire_remark(){
				this.expire_remark_modal = false
			},
			selectRow(currentRow){
				this.id = currentRow.id
				this.$store.commit("expireCustomer/add_company_id",currentRow.company_id)
			},
			pageChange(a){
				let _self = this
				_self.page = a 
				_self.getExpiredCustomerList()
			},
			pageSizeChange(a){
				let _self = this
				_self.pageSize = a 
				_self.getExpiredCustomerList()
			},
			search(){
				this.page = 1
				this.getExpiredCustomerList()
			},
			reset(){
				this.searchForm = {}
				this.page = 1
				this.getExpiredCustomerList()
			}
		},
		created() {
			this.getExpiredCustomerList()
		}
	}
</script>

<style>
</style>
