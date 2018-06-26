<template>
    <div>
        <Modal
                v-model="biangeng"
                title="变更产品"
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
                biangeng: false,
                pageTotal: 2,
                data:[

                ],
                header: [
                    {
                        title: '产品名称',
                        key: 'bglx',
                    },
                    {
                        title: '公司id',
                        key: 'bgr',
                        width: 140
                    },
                    {
                        title: '产品单价',
                        key: 'bgq',
                        width: 120
                    },
                    {
                        title: '销售输入单价',
                        key: 'bgh',
                        width: 120
                    },
                    {
                        title: '服务人员',
                        key: 'bgsj',
                        width: 120
                    },
                    {
                        title: '会计经理',
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
        created(){
            var _self = this
            Bus.$on('biangeng',(e)=>{
                _self.biangeng = true
            })
        },
        methods: {
            pageChange(){},
            pageSizeChange(){}
        }
    }
</script>