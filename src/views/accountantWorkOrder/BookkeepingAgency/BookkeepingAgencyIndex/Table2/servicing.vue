<template>
    <Card>
        <Row>
            <ButtonGroup>
                <Button type="primary" icon="information-circled" @click="scbd">时长变动日志</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="ksfw">开始服务</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="cpbg">产品变更</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="tiaozheng = true">调整服务余额</Button>
                <Button type="primary" icon="information-circled" @click="fpkj">变更会计</Button>
                <!-- <Button type="primary" icon="ios-color-wand-outline" @click="ckbgrz">查看变更日志</Button> -->
                <!-- <Button type="primary" icon="ios-color-wand-outline" @click="gsxq">公司详情</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="gszx">公司注销详情</Button> -->
                <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="">资料完成</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="">做账完成</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="">报税完成</Button>
                <!-- <Button type="primary" icon="ios-color-wand-outline" @click="tzfw">停止服务</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="ddxq">订单详情</Button> -->
                <!--<Button type="primary" icon="ios-color-wand-outline" @click="yijianfp = true">一键分配</Button>-->
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
        <Modal
                v-model="tiaozheng"
                title="调整服务余额"
                width="800"
        >
            <Form ref="task_message" :model="task_message" :label-width="120">
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="服务余额：">
                            <Input type="text" size="small" v-model="task_message.companyName" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="单价/月：">
                            <Input type="text" size="small" v-model="task_message.companyName">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
        <change-the-length></change-the-length>
        <cheek-error></cheek-error>
        <product-changes></product-changes>
        <distribution-of-accounting></distribution-of-accounting>
        <change-log></change-log>
        <company-detail></company-detail>
        <order-detail></order-detail>
        <company-cancellation></company-cancellation>
    </Card>
</template>

<script>
    import Bus from '../../../../../components/bus'
    import CheekError from '../cheekError'
    import ProductChanges from '../../../accountantOrder/accountantOrderIndex/productChanges'
    import ChangeTheLength from '../../../accountantOrder/accountantOrderIndex/changeTheLength'
    import distributionOfAccounting from '../DistributionOfAccounting'
    import changeLog from '../ChangeLog'
    import companyDetail from '../CompanyDetail'
    import orderDetail from '../OrderDetail'
    import companyCancellation from '../CompanyCancellation'

    export default {
        components:{
            companyDetail,
            changeLog,
            orderDetail,
            companyCancellation,
            distributionOfAccounting,
            ChangeTheLength,
            ProductChanges,
            CheekError,
        },
        data() {
            return {
                page: 1,
                pageSize: 10,
                tiaozheng: false,
                pageTotal: '',
                task_message:{
                    companyName:'1111111111'
                },
                data:[],
                header: [
                    {
                        title: '服务动态',
                        key: 'xfze',
                        width: 120
                    },
                    {
                        title: '对应企业',
                        key: 'CompanyName',
                        width: 250
                    },
                    {
                        title: '产品名称',
                        key: 'xfze',
                        width: 120
                    },
                    {
                        title: '服务人员',
                        key: 'begin_period',
                        width: 120
                    },
                    {
                        title: '市场',
                        key: 'end_period',
                        width: 120
                    },
                    {
                        title: '剩余时长',
                        key: 'cpmc',
                        width: 120
                    },
                    {
                        title: '收资料',
                        key: 'server_realname',
                        width: 120
                    },
                    {
                        title: '做账',
                        key: 'gdsbd',
                        width: 120
                    },
                    {
                        title: '报税',
                        key: 'followby_realname',
                        width: 120
                    },
                    {
                        title: '警戒值',
                        key: 'xfze',
                        width: 120
                    },
                    {
                        title: '备注',
                        key: 'xfze',
                        width: 120
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 200,
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
                                            Bus.$emit('detail',true)
                                        }
                                    }
                                }, '[查看公司]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            Bus.$emit('yichang',true)
                                        }
                                    }
                                }, '[查看异常]'),
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            getData() {
                let _self = this
                let url = '/order/cycle/service/record/list?page=' + _self.page + '&pageSize=' + _self.pageSize + '&service_status=notStarted'

                function doSuccess(res) {
                    alert(1)
                    let _data = res.data.data
                    _self.pageTotal = _data.total
                    _self.data = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        _self.data.push({
                            CompanyName: _data.rows[i].CompanyName,
                            begin_period:_data.rows[i].begin_period,
                            end_period:_data.rows[i].end_period,
                            server_realname:_data.rows[i].server_realname,
                            followby_realname:_data.rows[i].followby_realname,
                        })
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

            // 分配会计  
            fpkj() {
                Bus.$emit('fenpei',true)
            },

            // 查看变更日志
            ckbgrz() {
                Bus.$emit('rizhi',true)
            },

            gsxq() {
                Bus.$emit('detail',true)
            },

            gszx() {
                Bus.$emit('zhuxiao',true)
            },

            ddxq() {
                Bus.$emit('orderdetail',true)
            },

            ksfw() {
                this.$Modal.confirm({
                    title: '提示信息',
                    content: '<p>您确定开始服务吗</p>',
                    onOk: () => {},
                    onCancel: () => {}
                });
            },

            tzfw() {
                this.$Modal.confirm({
                    title: '提示信息',
                    content: '<p>您确定停止服务吗</p>',
                    onOk: () => {},
                    onCancel: () => {},
                });
            },
            
            scbd() {
                Bus.$emit('shic',true)
            },

            cpbg() {
                Bus.$emit('biangeng',true)
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>

