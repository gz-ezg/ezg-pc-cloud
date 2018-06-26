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
                ],
                header: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '业务员名称',
                        key: 'gsmc',
                    },
                    {
                        title: '电话',
                        key: 'xfze',
                        width: 200
                    },
                    {
                        title: 'QQ',
                        key: 'ksqj',
                        width: 120
                    },
                    {
                        title: '微信',
                        key: 'yjjsqj',
                        width: 120
                    },
                    {
                        title: '邮箱',
                        key: 'yjjsqj',
                        width: 120
                    },
                    {
                        title: '职位',
                        key: 'yjjsqj',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'yjjsqj',
                        width: 120
                    },
                    {
                        title: '备注',
                        key: 'yjjsqj',
                        width: 120
                    },
                ]
            }
        },
        methods: {}
    }
</script>

