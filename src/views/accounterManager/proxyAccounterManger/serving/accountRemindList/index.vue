<template>
    <Modal
            title="做账备注列表"
            v-model="openAccountList"
            width="850"
            :mask-closable="false"
    >
        <Card>
            <Row style="margin-top: 10px;">
                <Table
                        @on-current-change="selectRow"
                        :loading="loading"
                        ref="selection"
                        highlight-row
                        size="small"
                        :columns="header"
                        :data="data"
                ></Table>
            </Row>
        </Card>
    </Modal>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                loading: false,
                openAccountList:false,
                page: 1,
                pageSize: 100,
                current_row:"",
                companyId:"",
                data:[],
                header: [
                    {
                        title: '备注内容',
                        key: 'taskName',
                        minWidth: 200
                    },
                    {
                        title: '完成时间',
                        key: 'planDate',
                        minWidth: 230
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.taskStage == 'tesUnstarted'){
                                return h('div', [
                                    h(
                                        'Button',
                                        {
                                            props: {
                                                type: 'text',
                                                size: 'small'
                                            },
                                            on: {
                                                click: () => {
                                                    this.completed(params.row.taskId);
                                                }
                                            }
                                        },
                                        '[完成]'
                                    )
                                ]);
                            } else {
                                return h('div', [
                                    h(
                                        'div',
                                        {
                                            style: {
                                                color:'rgb(160 191 124)'
                                            }
                                        },
                                        '已完成'
                                    )
                                ]);
                            }

                        }
                    }
                ]
            }
        },
        methods:{
            selectRow(e) {
                this.current_row = e;
            },
            completed(id){
                let _self = this;
                _self.comLoading = true;
                let url = `api/order/cycle/service/dljz/fininshTask`;
                let config = {
                    params:{
                        taskId:id,
                        taskSummary:_self.taskSummary,
                        mission:"Completed"
                    }
                }
                function success(res){
                    _self.comLoading = false
                    _self.get_data()
                    _self.$bus.emit("UPDATE_INDEX",true)
                }

                function fail(err){

                }
                this.$Get(url, config, success, fail)
            },
            get_data(){
                let _self = this;
                _self.loading = true;
                let url = `api/order/cycle/service/dljz/findAccountRemindTaskList`;
                let config = {
                    params: {
                        page: _self.page,
                        pageSize: _self.pageSize,
                        taskKind:"tkremaccmemo",
                        companyId:_self.companyId,
                        sortField:'taskStage desc,create_date'
                    }
                }
                function success(res){
                    _self.data = res.data.data.rows
                    _self.loading = false
                }

                function fail(err){

                }
                this.$Get(url, config, success, fail)
            }
        },
        created() {
            this.$bus.off("OPEN_ACCOUNT_LIST",true)
            this.$bus.on("OPEN_ACCOUNT_LIST",(e)=>{
                this.header = [
                    {
                        title: '备注内容',
                        key: 'taskName',
                        minWidth: 200
                    },
                    {
                        title: '完成时间',
                        key: 'planDate',
                        minWidth: 230
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.taskStage == 'tesUnstarted'){
                                return h('div', [
                                    h(
                                        'Button',
                                        {
                                            props: {
                                                type: 'text',
                                                size: 'small'
                                            },
                                            on: {
                                                click: () => {
                                                    this.completed(params.row.taskId);
                                                }
                                            }
                                        },
                                        '[完成]'
                                    )
                                ]);
                            } else {
                                return h('div', [
                                    h(
                                        'div',
                                        {
                                            style: {
                                                color:'rgb(160 191 124)'
                                            }
                                        },
                                        '已完成'
                                    )
                                ]);
                            }

                        }
                    }
                ]
                this.openAccountList = true
                this.companyId = e.company_id
                this.get_data()
            })
            this.$bus.off("OPEN_ACCOUNT_ALL_LIST",true)
            this.$bus.on("OPEN_ACCOUNT_ALL_LIST",(e)=>{
                this.header = [
                    {
                        title: '备注内容',
                        key: 'taskName',
                        minWidth: 200
                    },
                    {
                        title: '完成时间',
                        key: 'planDate',
                        minWidth: 230
                    }
                ]
                this.openAccountList = true
                this.companyId = e.company_id
                this.get_data()
            })
        }
    }
</script>

<style>

</style>