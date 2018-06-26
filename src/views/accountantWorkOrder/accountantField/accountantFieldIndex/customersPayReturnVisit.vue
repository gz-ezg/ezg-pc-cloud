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
                        ddh: '东莞市南邦货运代理有限公司',
                        sf: '0申报代理记账',
                        cpmc: '',
                        fwkssj: '',
                        dqlc: '',
                        fwbm: '',
                        fwry: '未读',
                    },
                    {
                        ddh: '深圳市极速名车投资发展有限公司',
                        sf: '小规模代理记账',
                        cpmc: '',
                        fwkssj: '',
                        dqlc: '',
                        fwbm: '',
                        fwry: '未读',
                    },
                ],
                header: [
                    {
                        title: '公司名称',
                        key: 'ddh',
                    },
                    {
                        title: '产品名称 ',
                        key: 'sf',
                        width: 200
                    },
                    {
                        title: '回访时间 ',
                        key: 'cpmc',
                        width: 120
                    },
                    {
                        title: '服务评分 ',
                        key: 'fwkssj',
                        width: 120
                    },
                    {
                        title: '问题反馈或建议 ',
                        key: 'dqlc',
                        width: 120
                    },
                    {
                        title: '原因分享及预防措施',
                        key: 'fwbm',
                        width: 150
                    },
                    {
                        title: '已读/未读',
                        key: 'fwry',
                        width: 120
                    },
                ]
            }
        },
        methods: {}
    }
</script>

