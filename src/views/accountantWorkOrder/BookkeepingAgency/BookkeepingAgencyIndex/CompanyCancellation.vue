<template>
    <div>
        <Modal
                v-model="zhuxiao"
                title="公司注销详情"
                width="90%"
        >
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
        </Modal>
    </div>
</template>

<script>
    import Bus from '../../../../components/bus'

    export default {
        data() {
            return{
                zhuxiao: false,
                pageTotal: 1,
                data:[
                    {
                        gsgs: '广州天生我才职业技能培训有限公司',
                        gskh: '范超峰',
                        dd: 'fhc20180424001',
                        cpqc: '公司注销[内资公司,不包含(税控缴销)]',
                        cjsj: '2018-04-24',
                        fwry: '符东',
                        cjr: '方宏城',
                    },
                ],
                header: [
                    {
                        title: '归属公司',
                        key: 'gsgs',
                    },
                    {
                        title: '归属客户',
                        key: 'gskh',
                        width: 120
                    },
                    {
                        title: '订单',
                        key: 'dd',
                        width: 130
                    },
                    {
                        title: '产品全称',
                        key: 'cpqc',
                    },
                    {
                        title: '创建时间',
                        key: 'cjsj',
                        width: 120
                    },
                    {
                        title: '服务人员',
                        key: 'fwry',
                        width: 120
                    },
                    {
                        title: '创建人',
                        key: 'cjr',
                        width: 120
                    },
                ]
            }
        },
        created(){
            var _self = this
            Bus.$on('zhuxiao',(e)=>{
                _self.zhuxiao = true
            })
        },
        methods: {
            pageChange(){},
            pageSizeChange(){}
        }
    }
</script>