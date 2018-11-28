<template>
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
</template>

<script>
    import Bus from '../../../../components/bus'

    export default {
        data() {
            return {
                pageTotal: 2,
                data:[
                    {
                        ddh: 'xxj20170308003',
                        sf: 'N',
                        cpmc: '特殊核名',
                        fwkssj: '',
                        dqlc: '联系客户',
                        fwbm: '广州市场部',
                        fwry: '',
                        cjr: '肖选娇',
                    },
                    {
                        ddh: 'wzh20170419001',
                        sf: 'N',
                        cpmc: '注册地址费用',
                        fwkssj: '',
                        dqlc: '',
                        fwbm: '广州市场二部',
                        fwry: '',
                        cjr: '王志辉',
                    },
                ],
                header: [
                    {
                        title: '订单号',
                        key: 'ddh',
                    },
                    {
                        title: '是否开始服务',
                        key: 'sf',
                        width: 200
                    },
                    {
                        title: '产品名称',
                        key: 'cpmc',
                        width: 120
                    },
                    {
                        title: '服务开始时间',
                        key: 'fwkssj',
                        width: 120
                    },
                    {
                        title: '当前流程',
                        key: 'dqlc',
                        width: 120
                    },
                    {
                        title: '服务部门',
                        key: 'fwbm',
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
        methods: {}
    }
</script>

