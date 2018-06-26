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
                        gsmc: '待定',
                        xfze: '潘书泉',
                        ksqj: '',
                        yjjsqj: '肖选娇',
                    },
                    {
                        gsmc: '广州四碗面餐饮有限公司',
                        xfze: '潘书泉',
                        ksqj: '',
                        yjjsqj: '肖选娇',
                    },
                ],
                header: [
                    {
                        title: '公司名称',
                        key: 'gsmc',
                    },
                    {
                        title: '法人',
                        key: 'xfze',
                        width: 200
                    },
                    {
                        title: '重要等级',
                        key: 'ksqj',
                        width: 120
                    },
                    {
                        title: '创建人',
                        key: 'yjjsqj',
                        width: 120
                    },
                ]
            }
        },
        methods: {}
    }
</script>

