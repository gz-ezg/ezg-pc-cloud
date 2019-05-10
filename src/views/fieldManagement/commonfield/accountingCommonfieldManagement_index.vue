<template>
	<div>
		<Card>
			<Row style="margin-bottom:10px">
				<Collapse v-model="search_model">
					<Panel name="1">
						<Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
						筛选
						<!-- <div slot="content">
			                    111111
			                </div> -->
						<!-- <Search slot="content"></Search> -->
						<div slot="content" @keydown.enter="search">
							<Form ref="formInline" :model="formInline" :label-width="100">
								<Row :gutter="16">
									<Col span="8">
										<FormItem prop="legwork_name" label="名称：">
											<Input size="small" type="text" v-model="formInline.legwork_name" placeholder="">
											</Input>
										</FormItem>
									</Col>
									<Col span="8">
										<FormItem prop="legwork_address" label="地点：">
											<Input size="small" type="text" v-model="formInline.legwork_address" placeholder="">
											</Input>
										</FormItem>
									</Col>
									<Col span="8">
									<!-- <FormItem prop="type" label="类型：">
									        <Input size="small" type="text"  v-model="formInline.type" placeholder="">
									        </Input>
									    </FormItem> -->
										<Select v-model="formInline.type" style="width:200px" placeholder="请选择外勤类型">
											<Option v-for="item in selectList" :value="item" :key="item">{{ item }}</Option>
										</Select>
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
			<Row>
				<ButtonGroup>
					<Button type="primary" icon="ios-color-wand-outline" @click="isAdd=true">录入</Button>
					<Button type="primary" icon="ios-color-wand-outline" @click="edit">编辑</Button>
					<Button type="primary" icon="ios-color-wand-outline" @click="show">查看</Button>
				</ButtonGroup>
			</Row>
			<Row>
				<Table 
					highlight-row 
					:columns="header" 
					:data="data" 
					size="small" 
					style="margin-top: 10px" 
					@on-current-change="save_current_row"
				>
				</Table>
				<Page 
					size="small" 
					:total="pageTotal" 
					show-total 
					show-elevator 
					@on-change="pageChange"
					style="margin-top: 10px"
				></Page>
			</Row>
		</Card>
		<Modal
		    v-model="isAdd"
		    title="录入"
		    width="800"
		>
		    <Form ref="addParams" :model="addParams" :label-width="150" :rules="ruleValidate">
		        <FormItem label="外勤名称：" prop="legworkName">
		            <Input v-model="addParams.legworkName" style="width:500px"></Input>
		        </FormItem>
		        <FormItem label="外勤地点：" prop="legworkAddress">
		            <Input v-model="addParams.legworkAddress" style="width:500px"></Input>
		        </FormItem>
		        <FormItem label="外勤类型：" prop="type">
		            <Select v-model="addParams.type" style="width:500px">
		            	<Option v-for="item in selectList" :value="item" :key="item">{{ item }}</Option>
		            </Select>                       
		        </FormItem>
				<FormItem label="占用外勤数量：" prop="weight">
					<InputNumber :min="1" v-model="addParams.weight" style="width:500px"></InputNumber>						
				</FormItem>
		    </Form>
		<div slot="footer">
		    <Button type="ghost" @click="cancel">取消</Button>
		    <Button type="primary" @click="submitAdd('addParams')">提交</Button>
		</div>
		</Modal>
		
		<Modal
		    v-model="isEdit"
		    title="编辑"
		    width="800"
		>
		    <Form ref="editParams" :model="editParams" :label-width="150">
		        <FormItem label="外勤名称：" prop="legworkName">
		            <Input v-model="editParams.legworkName" style="width:500px"></Input>
		        </FormItem>
		        <FormItem label="外勤地点：" prop="legworkAddress">
		            <Input v-model="editParams.legworkAddress" style="width:500px"></Input>
		        </FormItem>
		        <FormItem label="外勤类型：" prop="type">
		            <Select v-model="editParams.type" style="width:500px">
		            	<Option v-for="item in selectList" :value="item" :key="item">{{ item }}</Option>
		            </Select>                       
		        </FormItem>
				<FormItem label="占用外勤数量：" prop="weight">
					<InputNumber :min="1" v-model="editParams.weight" style="width:500px"></InputNumber>						
				</FormItem>
		    </Form>
		<div slot="footer">
		    <Button type="ghost" @click="cancel">取消</Button>
		    <Button type="primary" @click="submitEdit('editParams')">提交</Button>
		</div>
		</Modal>
		
		<Modal
		    v-model="isShow"
		    title="查看"
		    width="800"
		>
		    <Form ref="editParams" :model="editParams" :label-width="150">
		        <FormItem label="外勤名称：" prop="legworkName">
		            <Input v-model="editParams.legworkName" style="width:500px" disabled></Input>
		        </FormItem>
		        <FormItem label="外勤地点：" prop="legworkAddress">
		            <Input v-model="editParams.legworkAddress" style="width:500px" disabled></Input>
		        </FormItem>
		        <FormItem label="外勤类型：" prop="type">
		            <Select v-model="editParams.type" style="width:500px">
		            	<Option v-for="item in selectList" :value="item" :key="item" disabled>{{ item }}</Option>
		            </Select>                       
		        </FormItem>
				<FormItem label="占用外勤数量：" prop="weight">
					<InputNumber :min="1" v-model="editParams.weight" style="width:500px" disabled></InputNumber>						
				</FormItem>
		    </Form>
		<div slot="footer">
		    <Button type="ghost" @click="cancel">取消</Button>
		</div>
		</Modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isAdd:false,
				isEdit:false,
				isShow:false,
				isSearh:false,
				addParams:{
					legworkAddress:"",
					type:"",
					legworkName:"",
					weight:1
				},
				editParams:{
					legworkAddress:"",
					type:"",
					legworkName:"",
					weight:""
				},
				search_model: "",
				formInline: {
					legwork_name: '',
					legwork_address: '',
					type: ''
				},
				selectList:["A","B"],
				header: [{
					title: "外勤名称",
					key: 'legwork_name'
				}, {
					title: "外勤地点",
					key: 'legwork_address'
				}, {
					title: "占用外勤数量",
					key: 'weight'
				}, {
					title: "外勤类型",
					key: 'type'
				}],
				data: [],
				current_row:'',
				page: 1,
				pageTotal: new Number(),
				ruleValidate:{
					legworkName:[{required: true, message: '请填写外勤名称', trigger: 'blur'}],
					legworkAddress:[{required: true, message: '请填写外勤地址', trigger: 'blur'}],
					type:[{required: true, message: '请填写外勤类型', trigger: 'change'}],
					weight:[{required: true, message: '请填写占用外勤数量'}]
				}
			}
		},
		methods: {
			cancel(){
			    this.isAdd=false
			    this.isShow=false
			    this.isEdit=false
				
			    this.addParams.legworkAddress = ''
			    this.addParams.type = ''
			    this.addParams.legworkName = ''
				this.addParams.weight = ''
			    
				this.editParams.legworkAddress = ''
				this.editParams.type = ''
				this.editParams.legworkName = ''
				this.editParams.weight = ''
			},
			save_current_row(e){
			    this.current_row = e
				console.log("this.current_row")
				console.log(this.current_row)
			},
			edit(){
			    let _self = this
			    if(_self.current_row != ""){
			        _self.isEdit = true
			        _self.editParams = _self.current_row
					_self.editParams.legworkAddress = _self.current_row.legwork_address
					_self.editParams.legworkName = _self.current_row.legwork_name
			    }else{
			        _self.$Message.warning('请选择一行进行编辑！')
			    }
			},
			show(){
			    let _self = this
			    if(_self.current_row != ""){
			        _self.isShow = true
			        _self.editParams = _self.current_row                
			    }else{
			        _self.$Message.warning('请选择一行进行查看！')
			    }
			},
			submitAdd(name){
			    let _self = this
			    let url = `api/user/legwork/cycle/type/create`
			    let config = {
			        legworkAddress: _self.addParams.legworkAddress,
			        type: _self.addParams.type,
			        legworkName: _self.addParams.legworkName,
					weight: _self.addParams.weight
			    }
				
				function success(res){
					// _self.$Message.success(res.data.msg)
					_self.isAdd = false
					_self.getData()
					_self.addParams = {}
					_self.current_row = ''
				}
				function fail(err){
					_self.$Message.error(res.data.msg)
				}
				this.$refs[name].validate((valid)=>{
					if(valid){
						_self.$Post(url,config,success,fail)
					}
				})
				
				
			},
			submitEdit(name){
				let _self = this
				let url = `api/user/legwork/cycle/type/update`
				let config = {
					id:_self.current_row.id,
				    legworkAddress: _self.editParams.legworkAddress,
				    type: _self.editParams.type,
				    legworkName: _self.editParams.legworkName,
					weight: _self.editParams.weight
				}
				
				function success(res){
					_self.$Message.success(res.data.msg)
					_self.isEdit = false
					_self.getData()
					_self.editParams = {}
					_self.current_row = ''
				}
				function fail(err){
					_self.$Message.error(res.data.msg)
				}
				
				_self.$refs[name].validate((valid)=>{
					if(valid){
						_self.$Post(url,config,success,fail)
					}
				})
			},
			search(){
			    this.page = 1
			    this.isSearh = true
			    this.getData()
			},
			reset(){
			    this.isSearh = false
			    this.page = 1
			    this.formInline.legwork_name = ""
			    this.formInline.legwork_address = ""
				this.formInline.type = ""
			    this.getData()
			},
			getData() {
				let _self = this
				let url = `api/user/legwork/cycle/type/list`
				let config = {
					params: {
						page: _self.page,
						pageSize: 10,
						legwork_name:_self.formInline.legwork_name,
						legwork_address:_self.formInline.legwork_address,
						type:_self.formInline.type,
					}
				}
				function success(res){         
					_self.data = res.data.data.rows
					_self.pageTotal = res.data.data.total
					_self.formInline = {}
				}
				function fail(err){
					console.log("err")
					console.log(err)
				}
				this.$Get(url, config,success,fail)
			},
			pageChange(e){
			    this.page = e
			    this.getData()
			}
		},
		created() {
			this.getData()
		}
	}
</script>

<style>
</style>
