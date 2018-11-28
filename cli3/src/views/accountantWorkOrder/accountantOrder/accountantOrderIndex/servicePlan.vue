<template>
    <div>
        <Modal
                v-model="yuefw"
                title="月服务计划"
                width="80%"
        >
            <Card>
                <Row :gutter="16" style="margin-top: 10px;">
                    <Col span="12">
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
                        </Col>
                        <Col span="12">
                            <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="header2"
                                :data="data2"></Table>
                            <Page
                                size="small"
                                :total="pageTotal2"
                                show-total
                                show-sizer
                                show-elevator
                                @on-change="pageChange2"
                                @on-page-size-change="pageSizeChange2"
                                style="margin-top: 10px"></Page>
                        </Col>
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
                yuefw: false,
                id: {},
                page: 1,
                pageSize: 10,
                pageTotal: new Number(),
                page2: 1,
                pageSize2: 10,
                pageTotal2: new Number(),
                data:[],
                data2: [],
                header: [
                    {
                        title: '服务公司',
                        key: 'companyname',
                        width: 300
                    },
                    {
                        title: '服务期间',
                        key: 'period',
                        width: 140
                    },
                    {
                        title: '服务人员',
                        key: 'server_realname',
                        width: 120
                    },
                    {
                        title: '创建人',
                        key: 'createby_realname',
                        width: 120
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 100,
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
                                            this.getfw(params)
                                        }
                                    }
                                }, '[服务计划]'),
                            ]);
                        }
                    }
                ],
                header2: [
                    {
                        title: '服务项目名称',
                        key: 'serviceitemname',
                        width: 300
                    },
                    {
                        title: '是否完成',
                        key: 'period',
                        width: 140
                    },
                    {
                        title: '计划完成时间',
                        key: 'confirm_date',
                        width: 120
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 100,
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
                                            Bus.$emit('detail', params)
                                        }
                                    }
                                }, '[删除]'),
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            getData() {
                let _self = this
                let url = '/order/cycle/month/service/account/door/list?page=' + _self.page + '&pageSize=' + _self.pageSize + '&cycleServiceRecordId=' + _self.id.id

                function doSuccess(res) {
                    let _data = res.data.data
                    _self.pageTotal = _data.total
                    _self.data = []
                    _self.data2 = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        _self.data.push(_data.rows[i])
                    }
                }

                this.GetData(url, doSuccess)
            },

            pageChange(a) {
                let _self = this
                _self.page = a
                _self.getData()
            },

            pageSizeChange(a) {
                let _self = this
                _self.pageSize = a
                _self.getData()
            },

            pageChange2(a) {
                let _self = this
                _self.page2 = a
                _self.getfw()
            },

            pageSizeChange2(a) {
                let _self = this
                _self.pageSize2 = a
                _self.getfw()
            },

            getfw(a) {
                let _self = this
                let url = '/order/cycle/month/service/item/list?page=' + _self.page2 + '&pageSize=' + _self.pageSize2 + '&monthServiceId=' + _self.id.month_service_id

                function doSuccess(res) {
                    let _data = res.data.data
                    _self.pageTotal2 = _data.total
                    _self.data2 = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        _self.data2.push(_data.rows[i])
                    }
                }

                this.GetData(url, doSuccess)
            }
        },
        created(){
            var _self = this
            Bus.$on('yuefw',(e)=>{
                _self.yuefw = true
                _self.id = e
                _self.getData()
            })
        },
    }
</script>