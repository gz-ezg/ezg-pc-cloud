<template>
    <Card>
        <Row>
            <ButtonGroup>
                <Button type="primary" icon="information-circled" @click="fpkj">添加</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="ckbgrz">删除</Button>
            </ButtonGroup>
        </Row>
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
                        gsmc: '已生成订单！订单号为xxj20180428001',
                        xfze: '2018-04-28 18:30:33.0',
                        ksqj: '肖选娇',
                        yjjsqj: '',
                    },
                    {
                        gsmc: '四碗面从会计到家改成小规模记账，已经付款了',
                        xfze: '2018-04-27 18:20:58.0',
                        ksqj: '肖选娇',
                        yjjsqj: '',
                    },
                ],
                header: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '内容',
                        key: 'gsmc',
                    },
                    {
                        title: '创建时间',
                        key: 'xfze',
                        width: 200
                    },
                    {
                        title: '录入人',
                        key: 'ksqj',
                        width: 120
                    },
                    {
                        title: '提醒时间',
                        key: 'yjjsqj',
                        width: 120
                    },
                ]
            }
        },
        methods: {}
    }
</script>

