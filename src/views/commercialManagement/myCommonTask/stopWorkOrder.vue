<template>
	<div>
		<Modal
		        v-model="fenpei"
		        :title="showStatus"
		        width="400"
				@on-cancel="close"
		>
		    <Form ref="task_message" :model="task_message" :label-width="80" :rules="ruleValidate">
				<!-- <Col span="1" style="visibility:hidden">1</Col> -->
				<!-- <Col span="10"> -->
				<Col id="orderItem">
				    <FormItem prop="remark" label="变更原因">
				        <Input type="textarea" size="small" v-model="task_message.remark"></Input>
				    </FormItem>
				</Col>
				<!-- </Col> -->
		        
		    </Form>
		    <div slot="footer">
		        <Button type="primary" @click="change_accout('task_message')" :loading="button_loading" :disabled="isdisabled">变更</Button>
		    </div>
		</Modal>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				fenpei:true,
				button_loading:false,
				workOrderStatus:"",
				showStatus:'',
				resumeFlag:Number,
				isdisabled:false,
				task_message:{
					remark:''
				},
				ruleValidate:{
					remark:[
						{ required: true, message: '请写上变更原因！', trigger: 'blur' }
					]
				},
				workOrderId:""
			}
		},
		created(){
			var _self = this
// 			this.$bus.on('fenpei',(e)=>{
// 				console.log("e")
// 				console.log(e)
// 			})
			this.workOrderId = this.$store.state.gobal.gobalworkOrderId
			this.workOrderStatus = this.$store.state.gobal.gobalWorkOrderStatus
			if(this.workOrderStatus === '40'){
				this.showStatus = '解锁'
				this.resumeFlag = 3
			}else if(this.workOrderStatus === '10' || this.workOrderStatus === '20' || this.workOrderStatus === '30'){
				this.showStatus = '暂停'
				this.resumeFlag = 2
			}else{
				this.showStatus = '不可操作'
				this.isdisabled = true
			}
		},
		methods:{
			change_accout(name){
				let _self = this
				let url = 'api/order/serviceResume'
				let _data = {
					workOrderId:_self.workOrderId,  //工单ID
					resumeFlag:_self.resumeFlag,   //当前工单状态(2，暂停 3，解锁)
					resumeMemo:_self.task_message.remark    //备注必填
				}
				
				
				this.$refs[name].validate((valid)=>{
					if(valid){
						_self.$Post(url, _data)
						_self.$bus.emit('reflash')
						_self.close()
					}
				})
			},
			close(){
				this.$store.commit("close_gobal_stop_work_order")
			}
		}
	}
</script>

<style>
#orderItem .ivu-form-item{
	margin-bottom: 0;
}
</style>
