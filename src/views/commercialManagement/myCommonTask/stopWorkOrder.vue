<template>
	<div>
		<Modal
		        v-model="fenpei"
		        title="暂停/解锁"
		        width="800"
				@on-cancel="close"
		>
		    <Form ref="task_message" :model="task_message" :label-width="120" :rules="ruleValidate">
		        <Row :gutter="16">
		            <Col span="1" style="visibility:hidden">1</Col>
					<RadioGroup v-model="task_message.radio" prop="choose">
						<Radio label="2">暂停</Radio>
						<Radio label="3">解锁</Radio>
					</RadioGroup>
		        </Row>
		        <Row :gutter="16">
		            <Col span="1" style="visibility:hidden">1</Col>
		            <Col span="10">
		                <FormItem prop="remark" label="变更原因">
		                    <Input type="text" size="small" v-model="task_message.remark"></Input>
		                </FormItem>
		            </Col>
		        </Row>
		    </Form>
		    <div slot="footer">
		        <Button type="primary" @click="change_accout" :loading="button_loading">变更</Button>
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
				task_message:{
					radio:"2"
				},
				ruleValidate:{
					remark:[
						{ required: true, message: '请写上变更原因！', trigger: 'blur' }
					],
					choose: [
                        { required: true, message: '请选择暂停或解锁', trigger: 'change' }
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
		},
		methods:{
			change_accout(){
				let _self = this
				let url = 'api/order/serviceResume'
				let _data = {
					workOrderId:_self.workOrderId,  //工单ID
					resumeFlag:_self.task_message.radio,   //当前工单状态(2，暂停 3，解锁)
					resumeMemo:_self.task_message.remark    //备注必填
				}
				
				function doSuccess(res) {
				    // Bus.$emit('UPDATE_ALL_ACCOUNT_PAGE',true)
				    // _self.button_loading = false
				    _self.fenpei = false
				}
				
				_self.$Post(url, _data, doSuccess)
			},
			close(){
				this.$store.commit("close_gobal_stop_work_order")
			}
		}
	}
</script>

<style>
</style>
