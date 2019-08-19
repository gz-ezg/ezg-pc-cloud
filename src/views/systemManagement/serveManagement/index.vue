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
						
						<FormItem prop="post" label="岗位:" style="width:300px">

                             <Cascader trigger="hover" :data="company_post"  @on-change="userProChange" v-model="formInline.post_code"></Cascader>

						</FormItem>
						
						<FormItem label="是否接单:" >
							<RadioGroup v-model="formInline.order_receiving" v-on @on-change="userProChange">
								<Radio label="是"></Radio>
								<Radio label="否"></Radio>
							</RadioGroup>  	
						</FormItem>
					</Col>
					<Col span="8">
						<user-pro-list></user-pro-list>
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

		<Card>
			<Row style="margin-bottom:10px">
		<Collapse v-model="search_model">
			<Panel name="1" >
				<Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
				筛选
				<div slot="content" @keydown.enter="search">
					<Form ref="formValidate" :model="formValidate" :label-width="120" style="margin-top: 15px">
						<Row style="height:56px">
						    <Col span="8">
								<FormItem label="用户名称：" prop="realname" style="width: 300px;">
								<Input v-model="formValidate.realname" size="small"></Input>
							</FormItem>
							</Col>
                            <Col span="8">
                            <FormItem label="部门名称：" prop="departname" style="width: 300px;">
                                <Input v-model="formValidate.departname" size="small"></Input>
                            </FormItem>
                            </Col>
							<Col span="8">
							<FormItem label="岗位：" prop="post" style="width: 300px;">
									<Cascader trigger="hover" :data="company_post" v-model="formValidate.post" size="small" style="margin-top:5px;width:100%"></Cascader>
							</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span="8">
								<FormItem label="是否接单：" prop="order_receiving" style="width: 300px;">
									<Select transfer v-model="formValidate.order_receiving" size="small" @on-change="search" style="width:100%">
										<Option value="Y">是</Option>
										<Option value="N">否</Option>
									</Select>
								</FormItem>
							</Col>
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

			</Row>
		
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

	</Card>
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
				}
			],
			data:[],
			SearchValidate:{},
			userTableLoading:false
		}
	},
	computed:{
		userId(){
			return this.$store.state.serveManagement.userId
		},
		productId(){
			return this.$store.state.serveManagement.productId
		},
		productSkuIds(){
			return this.$store.state.serveManagement.productSkuIds
		}
	},
	methods:{
		selectRow(e){
			let _self = this
			this.showModal = true
			this.formInline = e
			// console.log(this.formInline.id)
			
// 			console.log(this.$store.state.serveManagement.userId)
			this.$store.commit("serveManagement/addUserId",_self.formInline.id)
			this.$bus.emit("OPEN_USERPROLIST",true)
			//给表单设值
			if(this.formInline.post){
			   console.log(_self.formInline.post_code)
			     _self.formInline.post_code[0] = parseInt(_self.formInline.post_code[0])
			     _self.formInline.post_code[1] = parseInt(_self.formInline.post_code[1])
			} else{
			    this.formInline.post = []
			}
		},
		close(){
			this.showModal = false
			this.$bus.emit("CLEAR_DATA",true)
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
		    this.page = 1
		    this.get_data()
		},
		handleReset(){
		    this.page = 1
		    this.$refs["formValidate"].resetFields()
			this.formValidate.post=[];
		    this.get_data()
		},
		async change_accout(){
			let _self = this
			let config = {
				userId:_self.userId,
				productId:_self.productId,
				productSkuIds:_self.productSkuIds
			}

			let res = await userApi.saveUserProduct(config)
			if(res){
				_self.get_data()
			}
		},
		async get_data(){
			let _self = this
			this.userTableLoading = true
			let post = "";
			if(_self.formValidate.post){
				if(_self.formValidate.post.length>1){
					post = _self.formValidate.post[0]+"-"+_self.formValidate.post[1]
				}else{
					post = _self.formValidate.post[0]
				}
			}
			let config = {
				params:{
				    page: _self.page,
				    pageSize: _self.pageSize,
					realname: _self.formValidate.realname,
					departname: _self.formValidate.departname,
					order_receiving: _self.formValidate.order_receiving,
					post:post,
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
					postName = postA + "-" + postB
					rows[i].post_code = rows[i].post.split("-");
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
		},

		//用户星级或者接单发生变化事件
		userProChange(value, selectedOptions){
		        let _self = this
                console.log(value)
                let order_receiving
                let post
                //如果是数组则表示星级选了
                if((typeof value=='object')&&value.constructor==Array){
                    if(value.length>1){
                        post = value[0]+"-"+value[1];
                    }else{
                        post = value[0];
                    }
                }else{//表示是否接单选了
                    order_receiving =  value=="是"?"Y":"N"
                }

             //修改用户
            let url = `api/user/update/detail`
            let config = {
                id: this.formInline.id,
                post: post,
                orderReceiving: order_receiving
            }
            function success(res){
                //console.log(res)
                _self.get_data()//获取用户列表
            }
            function fail(){

            }
            this.$Post(url,config,success,fail)

		}
	},
	created(){
		let _self = this
		this.get_data_center()//数据字典
		this.get_data()//获取用户列表
	}
}
</script>

<style>
</style>
