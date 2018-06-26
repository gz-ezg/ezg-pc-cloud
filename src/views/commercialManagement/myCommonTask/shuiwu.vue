<template>
    <div>
        <Card>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">录入</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">编辑</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">查看</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
                </ButtonGroup>
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                        ref="selection"
                        highlight-row
                        size="small"
                        :columns="columns"
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
    </div>
</template>

<script>

    export default {
        data() {
            //
            return {
                columns: [
                    {
                        title: '会计',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '归属公司',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '归属客户',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '客户电话',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '产品名称',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '利润总额',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '今年累计收入',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '本期收入',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '本期净利润',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '应交建设税',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '应交印花税',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '教育附加税',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '地方教育附加税',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '应交个人所得税',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '应交增值税',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '期间',
                        key: 'baseorderid',
                        width: 120
                    },
                ],
                data: []
            }
        }
    }
</script>