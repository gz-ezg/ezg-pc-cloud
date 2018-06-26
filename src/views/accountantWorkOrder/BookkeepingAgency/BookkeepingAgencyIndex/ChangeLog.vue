<template>
    <div>
        <Modal
                v-model="rizhi"
                title="查看变更日志"
                width="800"
        >
            <Card>
                <Row style="margin-top: 10px;">
                    <Table
                            ref="selection"
                            highlight-row
                            size="small"
                            :columns="header"
                            :data="data"></Table>
                    <Page
                            size="small"
                            :total="pageTotal"
                            show-total
                            show-sizer
                            show-elevator
                            @on-change="pageChange"
                            @on-page-size-change="pageSizeChange"
                            style="margin-top: 10px"></Page>
                </Row>
            </Card>
        </Modal>
    </div>
</template>

<script>
    import Bus from '../../../../components/bus'

    export default {
        data() {
            return{
                rizhi: false,
                pageTotal: 2,
                data:[
                    {
                        bglx: 'serviceOrderChange',
                        bgr: '李小银',
                        bgq: '未分配',
                        bgh: '未开始',
                        bgsj: '2018-01-30',
                    },
                    {
                        bglx: 'serverChange',
                        bgr: '李小银',
                        bgq: '',
                        bgh: '陈春菊',
                        bgsj: '2018-01-30',
                    },
                ],
                header: [
                    {
                        title: '变更类型',
                        key: 'bglx',
                    },
                    {
                        title: '变更人',
                        key: 'bgr',
                        width: 120
                    },
                    {
                        title: '变更前',
                        key: 'bgq',
                        width: 120
                    },
                    {
                        title: '变更后',
                        key: 'bgh',
                        width: 120
                    },
                    {
                        title: '变更时间',
                        key: 'bgsj',
                        width: 120
                    },
                ]
            }
        },
        created(){
            var _self = this
            Bus.$on('rizhi',(e)=>{
                _self.rizhi = true
            })
        },
        methods: {
            pageChange(){},
            pageSizeChange(){}
        }
    }
</script>