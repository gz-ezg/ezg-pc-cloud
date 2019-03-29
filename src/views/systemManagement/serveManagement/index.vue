<template>
	<div>
		<Modal
			v-model="showModal"
			title="编辑"
			width="1000"
			@on-cancel="close"
		>
			<Form ref="formInline" :model="formInline" :rules="rules" label-width=80>
				<Row>
					<Col span="8">
						<FormItem label="人员名称:" style="width:300px">
							<Input type="text" v-model="formInline.realname" disabled></Input> 	
						</FormItem>
						
						<FormItem label="部门:" style="width:300px">
							<Input type="text" v-model="formInline.departname" disabled></Input> 	
						</FormItem>
						
						<FormItem label="星级:" style="width:300px">
							<Cascader :data="company_post" v-model="formInline.post"></Cascader>
						</FormItem>
						
						<FormItem label="是否接单:">
							<RadioGroup v-model="formInline.order_receiving">
								<Radio label="是"></Radio>
								<Radio label="否"></Radio>
							</RadioGroup>  	
						</FormItem>
					</Col>
					<Col span="8">
						<user-pro-list :userId="formInline.id"></user-pro-list>
					</Col>
					<Col span="8">
						<product-attr style="margin-left:5px"></product-attr>
					</Col>
				</Row>
			</Form> 	
			
			<div slot="footer">
			    <Button type="primary" @click="change_accout" :loading="button_loading">保存</Button>
				<Button type="ghost" @click="close">取消</Button>
			</div>
		</Modal>
		
		
		<Collapse v-model="search_model">
			<Panel name="1" >
				<Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
				筛选
				<div slot="content" @keydown.enter="search">
					<Form ref="formValidate" :model="formValidate" :label-width="120" style="margin-top: 15px">
						<Row :gutter="16" style="height:56px">
							<FormItem label="用户名称：" prop="realname" style="width: 300px;">
								<Input v-model="formValidate.realname" size="small"></Input>
							</FormItem>
						</Row>
						<center>
							<FormItem style="margin-top:10px">
								<Button type="primary" name="marketingManagement_index_edit_search" @click="search">搜索</Button>
								<Button type="ghost" name="marketingManagement_index_edit_reset" @click="handleReset" style="margin-left: 8px">重置</Button>
							</FormItem>
						</center>
					</Form>
				</div>
			</Panel>
		</Collapse>
		
		
		<Table
			:loading="userTableLoading"
			highlight-row
			:columns="header" 
			:data="data" 
			@on-row-click="selectRow"></Table>
		<Page
		    size="small"
		    :total="total"
		    show-total
		    show-sizer
		    show-elevator
		    :current.sync="page"
		    @on-change="page_change"
		    @on-page-size-change="page_size_change"
		    style="margin-top: 10px"></Page>
	</div>
</template>

<script>
import * as userApi from '../api/user.js'
import userProList from './userProList'
import productAttr from './productAttr'
export default{
	components:{
		userProList,
		productAttr
	},
	data(){
		return{
			search_model: "",
			page: 1,
			pageSize: 10,
			total: 0,
			company_post:[],
			showModal:false,
			formValidate: {
			    realname: "",
			},
			formInline:{
				id:"",
				realname:"",
				departname:"",
				post:[],
				order_receiving:"",
				check_list:[]
			},
			header:[
				{
					title:"人员名称",
					key:"realname"
				},
				{
					title:"部门",
					key:"departname"
				},
				{
					title:"星级",
					key:"post"
				},
				{
					title:"是否接单",
					key:"order_receiving"
				},
				{
					title:"接单内容",
					key:"order_content"
				},
				{
					title:"操作",
					key:"editor",
					width:150,
					align:'center',
					render:(h,params)=>{
						return h('Button',{
							props:{
								type:'primary',
								size: 'small'
							},
							on: {
								click: () => {
									this.selectRow(params.index)
								}
							}
						},'编辑')
					}
				}
			],
			data:[],
			SearchValidate:{},
			userTableLoading:false
		}
	},
	methods:{
		selectRow(e){
			this.showModal = true
			this.formInline = e
		},
		page_change(e){
		    this.page = e
		    this.get_data()
		},
		page_size_change(e){
		    this.page = 1
		    this.pageSize = e
		    this.get_data()
		},
		search(e){
			Object.assign(this.SearchValidate, e)
		    this.page = 1
		    this.get_data()
		},
		handleReset(){
		    this.page = 1
		    this.$refs["formValidate"].resetFields()
		    this.get_data()
		},
		change_accout(){
			let url = ``
			let _self = this
			let config = {
				id:_self.formInline.id,
				name:_self.formInline.name,
				department:_self.formInline.department,
				start:_self.formInline.start,
				order_taking:_self.formInline.order_taking,
				check_list:_self.formInline.check_list
			}
			
			function success(res){
				console.log(res)
			}
			
			this.$Post(url,config,success)
		},
		async get_data(){
			let _self = this
			this.userTableLoading = true
			let config = {
				params:{
				    page: _self.page,
				    pageSize: _self.pageSize,
					realname: _self.formValidate.realname
// 					productCode: _self.formValidate.productCode
				}
			}
			Object.assign(config.params, this.SearchValidate)
			let {rows , total} = await userApi.getUserList(config)
			
			// 星级
			for(let i=0;i<rows.length;i++){
				if(!rows[i].post){
					rows[i].post = "无"
				}else{
					let arr = rows[i].post.split("-")
					let postName = ""
					let postA = ""
					let postB = ""
					_self.company_post.forEach(function(item,i){
						if(Number(arr[0])===item.value){
							postA = item.label
							item.children.forEach(function(item,i){
								if(Number(arr[1])===item.value){
									postB = item.label
								}
							})
						}	
					})
					postName = postA + "/" + postB
					rows[i].post = postName
				}
			}
			//是否接单
			for(let i=0;i<rows.length;i++){
				if(rows[i].order_receiving === "Y"){
					rows[i].order_receiving = "是"
				}else{
					rows[i].order_receiving = "否"
				}
			} 
			
			_self.data = rows
			_self.total = total
			this.userTableLoading = false
// 			console.log("rows")
// 			console.log(rows)
		},
		//数据字典
		async get_data_center(){
		    let _self = this
		    let params = "company_post"
		    let {company_post} = await userApi.getDictionary(params)
			
		    this.company_post = this.$changeCars(company_post)
		}
	},
	created(){
		this.get_data_center()//数据字典
		this.get_data()//获取用户列表
	}
}
</script>

<style>
</style>
