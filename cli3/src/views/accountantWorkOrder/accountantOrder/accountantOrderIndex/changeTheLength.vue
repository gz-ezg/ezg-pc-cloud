<template>
    <div>
        <Modal
                v-model="shic"
                title="时长变动日志"
                width="80%"
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
                shic: false,
                id: '',
                pageTotal: 2,
                data:[
                    {
                        bglx: '2017-09-13 09:57:46',
                        bgr: 'lwh20170912003',
                        bgq: 'add',
                        bgh: '1.00',
                        bgsj: '0.00',
                    },
                ],
                header: [
                    {
                        title: '创建时间',
                        key: 'bglx',
                    },
                    {
                        title: '订单号',
                        key: 'bgr',
                        width: 140
                    },
                    {
                        title: '日志类型',
                        key: 'bgq',
                        width: 120
                    },
                    {
                        title: '改变数量',
                        key: 'bgh',
                        width: 120
                    },
                    {
                        title: '改变前的数量',
                        key: 'bgsj',
                        width: 120
                    },
                    {
                        title: '改变后的数量',
                        key: 'bgsj',
                        width: 120
                    },
                    {
                        title: '操作人',
                        key: 'bgsj',
                        width: 120
                    },
                    {
                        title: '备注',
                        key: 'bgsj',
                        width: 120
                    },
                ]
            }
        },
        methods: {
            getData() {
                let _self = this
                let url = '/order/cycleservice/serviceChangeLogList?'
            },
            pageChange(){},
            pageSizeChange(){}
        },
        created(){
            var _self = this
            Bus.$on('shic',(e)=>{
                _self.shic = true
                _self.id = e
                _self.getData()
            })
        },
    }
</script>