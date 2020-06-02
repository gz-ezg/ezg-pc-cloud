<template>
    <div>
        <Modal
                v-model="rizhi"
                title="查看变更日志"
                width="870"
        >
            <Card>
                <Row style="margin-top: 10px;">
                    <Table
                            ref="selection"
                            highlight-row
                            size="small"
                            :columns="header"
                            :loading="loading"
                            :data="data"></Table>
                    <Page
                            size="small"
                            :total="pageTotal"
                            :current.sync="page"
                            show-total
                            show-elevator
                            @on-change="page_change"
                            style="margin-top: 10px"></Page>
                </Row>
            </Card>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return{
                loading:false,
                rizhi: false,
                page: 1,
                pageTotal: new Number(),
                data:[],
                cycleid:"",
                header: [
                    {
                        title: '变更前服务人员',
                        key: 'oldname',
                        width: 160
                    },
                    {
                        title: '变更后服务人员',
                        key: 'newname',
                        width: 160
                    },
                    {
                        title: '变更原因',
                        key: 'remark',
                        width: 160
                    },
                    {
                        title: '变更时间',
                        key: 'createdate',
                        width: 160
                    },
                    {
                        title: '变更操作人',
                        key: 'createby',
                        width: 160
                    },
                ]
            }
        },
        created(){
            var _self = this
            _self.$bus.on('OPEN_ACC_CHANGE_LOG',(e)=>{
                _self.cycleid = e
                _self.get_data()
                _self.rizhi = true
            })
        },
        methods: {
            page_change(e){
                this.page = e
                this.get_data()
            },
            get_data(){
                let _self = this
                _self.loading = true
                let url = `api/order/work/cycleChangeLogList`
                let config = {
                    params: {
                        cycleid:_self.cycleid,
                        page: _self.page,
                        pageSize: 10,
                        sortField:"createdate"
                    }
                }

                function success(res){
                    _self.data = res.data.data.rows
                    _self.pageTotal = res.data.data.total
                    _self.loading = false
                }

                this.$Get(url, config ,success)
            }
        }
    }
</script>

<style>

</style>