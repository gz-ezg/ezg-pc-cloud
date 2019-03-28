<template>
	<div>
		<Modal
			v-model="showModal"
			title="编辑"
			width="600"
			@on-cancel="close"
		>
			<Form ref="formInline" :model="formInline" :rules="rules" label-width=80>
				<Row>
					<Col span="18">
						<FormItem label="人员名称:" style="width:300px">
							<Input type="text" v-model="formInline.name" disabled></Input> 	
						</FormItem>
						
						<FormItem label="部门:" style="width:300px">
							<Input type="text" v-model="formInline.department" disabled></Input> 	
						</FormItem>
						
						<FormItem label="星级:">
							<Select v-model="formInline.start" style="width:200px">
								<Option v-for="item in list" :value="item.value" :key="item.value">{{ item.name }}</Option>
							</Select> 	
						</FormItem>
						
						<FormItem label="是否接单:">
							<RadioGroup v-model="formInline.order_taking">
								<Radio label="是"></Radio>
								<Radio label="否"></Radio>
							</RadioGroup>  	
						</FormItem>
					</Col>
					<Col span="6">
						<CheckboxGroup v-model="formInline.check_list">
							<h4>产品列表</h4>
							<Checkbox style="display: block;" v-for="(item,i) of checkboxList" :label="item.name" :key="i"></Checkbox>
						</CheckboxGroup>
					</Col>
				</Row>
			</Form> 	
			
			<div slot="footer">
			    <Button type="primary" @click="change_accout" :loading="button_loading">保存</Button>
				<Button type="ghost" @click="close">取消</Button>
			</div>
		</Modal>
		
		<Table :columns="header" :data="data" @on-row-click="selectRow"></Table>
	</div>
</template>

<script>
export default{
	data(){
		return{
			showModal:false,
			row:{},
			list:[{name:"一星",value:1},{name:"二星",value:2},{name:"三星",value:3}],
			checkboxList:[{name:"a产品"},{name:"b产品"},{name:"c产品"}],
			formInline:{
				name:"",
				department:"",
				start:"",
				order_taking:"",
				check_list:[]
			},
			header:[
				{
					title:"人员名称",
					key:"name"
				},
				{
					title:"部门",
					key:"department"
				},
				{
					title:"星级",
					key:"start"
				},
				{
					title:"是否接单",
					key:"order_taking"
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
			data:[
				{
					name:"1",
					department:"111",
					start:1,
					order_taking:"是",
					order_content:"11111111"
				},
				{
					name:"2",
					department:"222",
					start:2,
					order_taking:"否",
					order_content:"22222222222"
				},
				{
					name:"3",
					department:"333",
					start:3,
					order_taking:"是",
					order_content:"33333333333333"
				}
			]
		}
	},
	methods:{
		selectRow(e){
			this.row = e
			this.showModal = true
			this.formInline = this.row
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
			console.log(config)
			
			function success(res){
				console.log(res)
			}
			
			this.$Post(url,config,success)
		}
	}
}
</script>

<style>
</style>
