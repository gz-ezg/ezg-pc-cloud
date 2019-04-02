<template>
	<div>
		<Modal
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
				<Button type="ghost" @click="submit">添加</Button>
			</div>
		</Modal>
		<Row>
		    <ButtonGroup>
		        <Button type="primary" icon="ios-color-wand-outline" @click="open_expire_remark">添加到期备注</Button>
		    </ButtonGroup>
		</Row>
		<Table :columns="header" :data="data" @on-current-change="select_row()"></Table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formInline:{
					remark:""
				},
				expire_remark_modal:false,
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
					},
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
								}
							}, '[客户详情]')
						}
					}
				],
				data: []
			}
		},
		methods: {
			getExpiredCustomerList() {
				let _self = this
				let url = "api/order/cycle/service/record/getExpiredCustomerList"
				let config = {
					params: {
						page: 1,
						pageSize: 10
					}
				}

				function success(res) {
					let {
						rows,
						total
					} = res.data.data
					_self.data = rows
					console.log(_self.data)
				}
				this.$Get(url, config, success)
			},
			open_expire_remark(){
				this.expire_remark_modal = true
			},
			close_expire_remark(){
				this.expire_remark_modal = false
			},
			select_row(currentRow){
				console.log("currentRow")
				console.log(currentRow)
			}
		},
		created() {
			this.getExpiredCustomerList()
		}
	}
</script>

<style>
</style>
