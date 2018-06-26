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
                        ddh: '东莞市华瑞教育咨询有限公司',
                        sf: '代理记账（东莞小规模0申报一个月）',
                        cpmc: '',
                        fwkssj: '陈梓君',
                        dqlc: '2017-04-01',
                        fwbm: '2017-10-01',
                        fwry: 'fgsdf ',
                        a: 'dfghj',
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
                        title: '服务人员 ',
                        key: 'fwkssj',
                        width: 120
                    },
                    {
                        title: '服务开始时间 ',
                        key: 'dqlc',
                        width: 120
                    },
                    {
                        title: '下线时间',
                        key: 'fwbm',
                        width: 150
                    },
                    {
                        title: '市场通知下线原因',
                        key: 'fwry',
                        width: 140
                    },
                    {
                        title: '客户实际下线原因',
                        key: 'a',
                        width: 140
                    },
                ]
            }
        },
        methods: {}
    }
</script>

