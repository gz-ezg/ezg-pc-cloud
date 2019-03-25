<template>
	<div>
		<Modal v-model="rizhi" title="查看查看解锁/暂停日志" width="870" @on-cancel="close">
			<Form ref="task_message" :model="task_message" :label-width="120" inline>
				<Row :gutter="16">
					<Select v-model="selectOption" style="width:200px" placeholder="请选择日志类型">
						<Option v-for="item in selectOptionList" :value="item.value" :key="item.value">{{ item.name }}</Option>
					</Select>
			
					<DatePicker @on-change="change" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="选择起始和结束日期"
					 style="width: 200px"></DatePicker>

					<Button type="primary" @click="get_data">查询</Button>
				</Row>
			</Form>


			<Card>
				<Row style="margin-top: 10px;">
					<Table ref="selection" highlight-row size="small" :columns="header" :loading="loading" :data="data"></Table>
					<Page size="small" :total="pageTotal" :current.sync="page" show-total show-elevator @on-change="page_change" style="margin-top: 10px"></Page>
				</Row>
			</Card>
			<div slot="footer"></div>
		</Modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				workOrderId: "",
				rizhi: true,
				page: 1,
				loading: false,
				pageTotal: new Number(),
				workOrderStatus: '',
				selectOption:'',
				selectOptionList:[{name:"暂停",value:2},{name:"解锁",value:3}],
				task_message: {
					radio: "2",
					pauseTime: "",
					unlockedTime: ""
				},
				header: [{
						title: '备注',
						key: 'memo'
					},
					{
						title: '类型',
						key: 'type'
					},
					{
						title: '时间',
						key: 'createdate'
					},
					{
						title: '操作人',
						key: 'realname'
					}
				],
				data: []
			}
		},
		methods: {
			change(timeArray) {
				this.task_message.pauseTime = timeArray[0]
				this.task_message.unlockedTime = timeArray[1]
			},
			page_change(e) {
				this.page = e
				this.get_data()
			},
			get_data() {
				let _self = this
				_self.loading = true
				let url = `api/order/work/order/pause/list`
				let config = {
					params: {
						workOrderId: _self.workOrderId,
						page: _self.page,
						pageSize: 10,
						type: _self.selectOption,
						begin_createdate: _self.task_message.pauseTime,
						end_createdate: _self.task_message.unlockedTime,
						time: _self.task_message.time
					}
				}

				function success(res) {
					let rows = res.data.data.rows
					// _self.data = res.data.data.rows
					
					for(let i=0;i<rows.length;i++){
						if(rows[i].type === '2'){
							rows[i].type = '暂停'
						}else{
							rows[i].type = '解锁'
						}	
					}
					
					_self.data = rows
				}

				this.$Get(url, config, success)
				this.loading = false
			},
			close() {
				this.$store.commit("close_gobal_stop_work_order_list")
			}
		},
		created() {
			this.workOrderId = this.$store.state.gobal.gobalworkOrderId
			this.get_data()
		}
	}
</script>

<style>
</style>
