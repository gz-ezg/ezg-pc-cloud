<template>
    <Modal
            title="重要提醒列表"
            v-model="openimportList"
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
            <Page
                    size="small"
                    :total="pageTotal"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="pageChange"
                    @on-page-size-change="pageSizeChange"
                    :current.sync="page"
                    placement="top"
                    style="margin-top: 10px"
            ></Page>
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
                openimportList:false,
                pageTotal: 0,
                page: 1,
                pageSize: 10,
                companyId:"",
                data:[],
                header: [
                    {
                        title: '任务名称',
                        key: 'taskName',
                        minWidth: 200
                    },
                    {
                        title: '是否完结',
                        key: 'taskStage',
                        minWidth: 140
                    },
                    {
                        title: '完成时间',
                        key: 'planDate',
                        minWidth: 230
                    },
                    {
                        title: '创建人',
                        key: 'creatorName',
                        minWidth: 140
                    },
                    {
                        title: '创建时间',
                        key: 'create_date',
                        minWidth: 230
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.show_flag == 1){
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
                                                    this.hide(params.row);
                                                }
                                            }
                                        },
                                        '[取消列表展示]'
                                    )
                                ]);
                            } else {
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
                                                    this.show(params.row);
                                                }
                                            }
                                        },
                                        '[显示列表展示]'
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
            pageChange(a) {
                let _self = this;
                _self.page = a;
                _self.get_data()
            },
            pageSizeChange(a) {
                let _self = this;
                _self.pageSize = a;
                _self.get_data()
            },
            show(e){
                let _self = this;
                _self.loading = true;
                let url = `api/order/cycle/service/dljz/showTask`;
                let config = {
                    params: {
                        taskId:e.taskId
                    }
                }
                function success(res){
                    _self.get_data()
                    _self.$bus.emit("UPDATE_INDEX",true)
                    _self.loading = false
                }

                function fail(err){

                }
                this.$Get(url, config, success, fail)
            },
            hide(e){
                let _self = this;
                _self.loading = true;
                let url = `api/order/cycle/service/dljz/hideTask`;
                let config = {
                    params: {
                        taskId:e.taskId
                    }
                }
                function success(res){
                    _self.get_data()
                    _self.$bus.emit("UPDATE_INDEX",true)
                    _self.loading = false
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
                        taskKind:"tkRemImport",
                        companyId:_self.companyId
                    }
                }
                function success(res){
                    _self.data = res.data.data.rows
                    _self.data = res.data.data.rows.map(item => {
                        //     item.service_status = _self.cservicest_map.get(item.service_status);
                        //     item.tax_status = _self.TaxCompleteStatus_map.get(item.tax_status)
                        //     item.tax_result = _self.TaxDeclareStatus_map.get(item.tax_result);
                        item.taskStage = item.taskStage == 'tesUnstarted' ? '否': '是';
                        //     // item.managestatusName = this.managestatus_map.get(item.managestatus);
                        //     // item.note_kj_flag = item.note_kj_flag == 'Y' ? '完成' : '未完成';
                            return item;
                    });
                    _self.pageTotal = res.data.data.total
                    _self.loading = false
                }

                function fail(err){

                }
                this.$Get(url, config, success, fail)
            }
        },
        created() {
            this.$bus.on("OPEN_IMPORT_LIST",(e)=>{
                this.openimportList = true
                this.companyId = e.company_id
                this.get_data()
            })
        }
    }
</script>

<style>

</style>