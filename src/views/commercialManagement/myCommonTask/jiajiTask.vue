<template>
    <div>
        <Card>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">查看详情</Button>
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
            return {
                columns: [
                    {
                        title: '订单号',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '是否开始服务',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '开始服务时间',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '当前流程',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '产品全称',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '服务起始时间',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '服务终止时间',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '归属公司',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '服务部门',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '服务人员',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '归属客户',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '是否加急',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '服务是否完结',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '更新时间',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '创建人',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 330,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.detailModal = true
                                        }
                                    }
                                }, '[查看公司]'),
                            ]);
                        }
                    }
                ],
                data: []
            }
        }
    }
</script>