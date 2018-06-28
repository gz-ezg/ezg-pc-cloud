<style>
    @import '../../libs/easyUI/easyui.css';
    @import '../../libs/easyUI/icon.css';
    .datagrid-row {
        height: 42px;
    }
    .datagrid-cell {
        line-height: 34px;
    }
</style>
<template>
    <div style="min-width:900px;">
        <Tabs value="name1">
            <TabPane label="订单审批" name="name1">
                <Card >
                    <Row style="margin-bottom:10px">
                        <Collapse v-model="search_model">
                            <Panel name="1" >
                                <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                                筛选
                                <div slot="content" @keydown.enter="Search">
                                    <Form ref="formValidateSearch" :model="formValidateSearch" :label-width="80" style="margin-top: 15px">
                                        <Row :gutter="16">
                                            <Col span="8">
                                            <FormItem label="订单号码：" prop="ordercode">
                                                <Input v-model="formValidateSearch.ordercode" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                            <Col span="8">
                                            <FormItem label="公司名称：" prop="companyname">
                                                <Input v-model="formValidateSearch.companyname" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                            <Col span="8">
                                            <FormItem label="客户名称：" prop="customername">
                                                <Input v-model="formValidateSearch.customername" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                            </Row>
                                        <Row :gutter="16">
                                            <Col span="8">
                                            <FormItem label="客户电话：" prop="customertel">
                                                <Input v-model="formValidateSearch.customertel" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                            <Col span="8">
                                            <FormItem label="创建人：" prop="crealname">
                                                <Input v-model="formValidateSearch.crealname" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                        </Row>
                                        <center>
                                            <FormItem>
                                                <Button type="primary" @click="Search">搜索</Button>
                                                <Button type="ghost" @click="handleReset" style="margin-left: 8px">
                                                    重置
                                                </Button>
                                            </FormItem>
                                        </center>
                                    </Form>
                                </div>
                            </Panel>
                        </Collapse>
                    </Row>
                    <Row>
                        <ButtonGroup>
                            <!--<Button type="primary" icon="ios-crop" @click="detailCustomers">查看</Button>-->
                            <Button v-permission="['orderA.transaction']" type="primary" icon="ios-crop" @click="toDoWorkFlow">办理审批</Button>
                            <Button v-permission="['orderA.exportN']" type="primary" icon="ios-color-filter-outline" @click="downloadExcelN">导出Excel</Button>
                            <Button type="primary" icon="ios-color-filter-outline" @click="getTableDataN">刷新</Button>                            
                        </ButtonGroup>
                        <!-- <Poptip
                        style="float: right"
                        placement="bottom-end"
                        width="600">
                    <Button type="text" icon="funnel">筛选</Button>

                </Poptip> -->
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table highlight-row border :columns="columns2" :data="data3" size="small" @on-row-click="selectRow" @on-row-dblclick="toDoWorkFlow" :loading="loadingN"></Table>
                        <Page
                                size="small"
                                :total="pageTotalN"
                                show-total
                                show-sizer
                                show-elevator
                                @on-change="pageChangeN"
                                @on-page-size-change="pageSizeChangeN"
                                style="margin-top: 10px"></Page>
                    </Row>
                </Card>
                <Modal
                        v-model="shenpi"
                        title="办理审批"
                        width="100%"
                        :styles="{height: '100%', top: '0px'}">
                    <Form ref="formValidateDetail" :model="formValidateDetail" :label-width="100">
                        <Row :gutter="16">
                            <Col span="8">
                                <FormItem label="归属公司" prop="CompanyName">
                                    <Input size="small" v-model="formValidateDetail.CompanyName" disabled/>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="归属客户" prop="NAME">
                                    <Input size="small" v-model="formValidateDetail.NAME" disabled/>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="缴费时间" prop="customername">
                                    <Input size="small" v-model="formValidateDetail.date" disabled/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="8">
                                <FormItem label="订单总价" prop="zongjia">
                                    <Input size="small" v-model="formValidateDetail.zongjia" disabled/>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="已付款" prop="realnumber">
                                    <Input size="small" v-model="formValidateDetail.realnumber" disabled/>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="缴费渠道" prop="payDir">
                                    <Select transfer v-model="formValidateDetail.payDir" disabled>
                                        <Option v-for="(item, index) in payDirType" :key=index :value="item.typecode">{{item.typename}}</Option>                            
                                        
                                        
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <!-- <Row :gutter="16">
                            <Col span="8">
                                <FormItem label="提成总额" prop="performanceMoney">
                                    <Input size="small" v-model="formValidateDetail.performanceMoney" disabled/>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="业绩" prop="performanceMoney">
                                    <Input size="small" v-model="formValidateDetail.performanceMoney" disabled/>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="附加流水账" prop="customername">
                                    <Input size="small" v-model="formValidateDetail.customername" disabled/>
                                </FormItem>
                            </Col>
                        </Row> -->
                        <Row :gutter="16">
                            <!-- <Col span="8">
                                <FormItem label="服务开始税期" prop="serviceBeginDate">
                                    <Input size="small" v-model="formValidateDetail.serviceBeginDate" disabled/>
                                </FormItem>
                            </Col> -->
                            <Col span="8">
                                <FormItem label="国地税报道" prop="GDSreport">
                                    <Select transfer v-model="formValidateDetail.GDSreport" disabled>
                                        <Option value="ybd">已报道</Option>
                                        <Option value="wbd">未报道</Option>
                                        <Option value="bybd">不用报道</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <FormItem>
                                <Button type="primary" icon="plus" @click="kuaiji()" v-show="kjdj">查看会计到家服务项</Button>
                            </FormItem>
                        </Row>
                        <table width="100%" id="orderItemList3"></table>
                    </Form>
                    <Tabs style="margin-top: 5px">
                        <TabPane label="任务处理" icon="clipboard">
                            <Steps style="margin-top: 3%" size="small">
                                <Step v-if="item.activityType == 'userTask'" :title="item.activityName" :content="item.assignee" :key=index v-for="(item,index) in ApproveFlow" ></Step>
                            </Steps>
                            <Form ref="banlishenpi" :model="banlishenpi" :label-width="120" style="margin-top: 5%">
                                <FormItem label="审批备注" prop="desc">
                                    <Input v-model="banlishenpi.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                                </FormItem>
                                <FormItem label="是否同意审批" prop="agree">
                                    <RadioGroup v-model="banlishenpi.agree">
                                        <Radio label="1">同意</Radio>
                                        <Radio label="0">驳回</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="blsp" :loading="submit_loading">提交</Button>
                                </FormItem>
                            </Form>
                        </TabPane>
                    </Tabs>
                    <div slot="footer"></div>
                </Modal>
                <Modal
                        v-model="checkMemo"
                        title="查看审批备注"
                        @on-ok="checkMemos"
                        width="70%">
                    <Table border :columns="checkMemocolumns" :data="checkMemodata" size="small"></Table>
       <!--             <Page
                            size="small"
                            :total="pageTotalN"
                            show-total
                            show-sizer
                            show-elevator
                            @on-change="pageChangeN"
                            @on-page-size-change="pageSizeChangeN"
                            style="margin-top: 10px"></Page>-->
                </Modal>
            </TabPane>
            <TabPane label="查看已审批" name="name2">
                <Card>
                    <Row style="margin-bottom:10px">
                        <Collapse v-model="search_model1">
                            <Panel name="1" >
                                <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                                筛选
                                <div slot="content" @keydown.enter="Search1">
                                    <Form ref="formValidateSearch1" :model="formValidateSearch1" :label-width="80" style="margin-top: 15px">
                                        <Row :gutter="16">
                                            <Col span="8">
                                            <FormItem label="订单号码：" prop="ordercode">
                                                <Input v-model="formValidateSearch1.ordercode" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                            <Col span="8">
                                            <FormItem label="公司名称：" prop="companyname">
                                                <Input v-model="formValidateSearch1.companyname" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                            <Col span="8">
                                            <FormItem label="客户名称：" prop="customername">
                                                <Input v-model="formValidateSearch1.customername" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                        </Row>
                                        <Row :gutter="16">
                                            <Col span="8">
                                            <FormItem label="客户电话：" prop="customertel">
                                                <Input v-model="formValidateSearch1.customertel" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                            <Col span="8">
                                            <FormItem label="创建人：" prop="crealname">
                                                <Input v-model="formValidateSearch1.crealname" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                        </Row>
                                        <center>
                                            <FormItem>
                                                <Button type="primary" @click="Search1">搜索</Button>
                                                <Button type="ghost" @click="handleReset1" style="margin-left: 8px">
                                                    重置
                                                </Button>
                                            </FormItem>
                                        </center>
                                    </Form>
                                </div>
                            </Panel>
                        </Collapse>
                    </Row>
                    <Row>
                        <ButtonGroup>
                            <Button v-permission="['orderA.exportY']" type="primary" icon="ios-color-filter-outline" @click="downloadExcelY">导出Excel</Button>
                        </ButtonGroup>
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table highlight-row border :columns="columns" :data="data" size="small"></Table>
                        <Page
                                size="small"
                                :total="pageTotalY"
                                show-total
                                show-sizer
                                show-elevator
                                @on-change="pageChangeY"
                                @on-page-size-change="pageSizeChangeY"
                                style="margin-top: 10px"></Page>
                    </Row>
                </Card>
                <Modal
                        v-model="detailCustomer"
                        title="查看"
                        :width="1300"
                        @on-ok="cancel('formValidateDetail')"
                        @on-cancel="cancel('formValidateDetail')">
                    <Form ref="formValidateDetail" :model="formValidateDetail" :label-width="100">
                        <Row :gutter="16">
                            <Col span="8">
                            <FormItem label="归属公司" prop="CompanyName">
                                <Input size="small" v-model="formValidateDetail.CompanyName" disabled/>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="归属客户" prop="NAME">
                                <Input size="small" v-model="formValidateDetail.NAME" disabled/>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="缴费时间" prop="customername">
                                <Input size="small" v-model="formValidateDetail.date" disabled/>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="8">
                            <FormItem label="订单总价" prop="zongjia">
                                <Input size="small" v-model="formValidateDetail.zongjia" disabled/>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="已付款" prop="realnumber">
                                <Input size="small" v-model="formValidateDetail.realnumber" disabled/>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="缴费渠道" prop="payDir">
                                <Select transfer v-model="formValidateDetail.payDir" disabled>
                                    <Option v-for="(item, index) in payDirType" :key=index :value="item.typecode">{{item.typename}}</Option>                            
                                </Select>
                            </FormItem>
                            </Col>
                        </Row>
                        <!-- <Row :gutter="16">
                            <Col span="8">
                            <FormItem label="提成总额" prop="performanceMoney">
                                <Input size="small" v-model="formValidateDetail.performanceMoney" disabled/>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="业绩" prop="performanceMoney">
                                <Input size="small" v-model="formValidateDetail.performanceMoney" disabled/>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="附加流水账" prop="customername">
                                <Input size="small" v-model="formValidateDetail.customername" disabled/>
                            </FormItem>
                            </Col>
                        </Row> -->
                        <Row :gutter="16">
                            <!-- <Col span="8">
                            <FormItem label="服务开始税期" prop="serviceBeginDate">
                                <Input size="small" v-model="formValidateDetail.serviceBeginDate" disabled/>
                            </FormItem>
                            </Col> -->
                            <Col span="8">
                            <FormItem label="国地税报道" prop="GDSreport">
                                <Select transfer v-model="formValidateDetail.GDSreport" disabled>
                                    <Option value="ybd">已报道</Option>
                                    <Option value="wbd">未报道</Option>
                                    <Option value="bybd">不用报道</Option>
                                </Select>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <FormItem>
                                <Button type="primary" icon="plus" @click="kuaiji()" v-show="kjdj">查看会计到家服务项</Button>
                            </FormItem>
                        </Row>
                        <table width="100%" id="orderItemList4"></table>
                    </Form>
                    <div slot="footer"></div>
                </Modal>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import datagrid from '../../libs/easyUI/jquery.easyui.min'
    import combobox from '../../libs/easyUI/jquery.easyui.min'
    import Vue from 'vue';

    export default {
        data() {
            return{
                payDirType:"",
                loadingN:false,
                kjdj:"",
                search_model1:"",
                search_model:"",
                submit_loading:false,
                ishandleSubmit1:false,
                formValidateSearch1:{
                    ordercode:'',
                    companyname:'',
                    customername:'',
                    customertel:'',
                    crealname:''
                },
                //  未审批检索
                ishandleSubmit:false,
                formValidateSearch:{
                    ordercode:'',
                    companyname:'',
                    customername:'',
                    customertel:'',
                    crealname:''
                },
                detailCustomer: false,
                checkMemo: false,
                pageY: 1,
                pageSizeY: 10,
                pageTotalY: new Number(),
                pageN: 1,
                pageSizeN: 10,
                pageTotalN: new Number(),
                customerId: '',
                ApproveFlow: [],
                shenpi: false,
                banlishenpi: {
                    desc: '',
                    agree: '1'
                },
                data: [],
                data3: [],
                orderItemList3: [],
                payDirData: [],
                checkMemodata: [],
                formValidateDetail: {
                    zongjia: 0,
                    realnumber: '',
                    CompanyName: '',
                    customername: '',
                    GDSreport: '',
                    payDir: '',
                    performanceMoney: '',
                    date: new Date(),
                    serviceBeginDate: ''
                },
                checkMemocolumns: [
                    {
                        title: '审批备注',
                        key: 'message',
                    },
                    {
                        title: '审批时间',
                        key: 'time'
                    },
                    {
                        title: '创建人',
                        key: 'userId'
                    },
                ],
                columns2: [
                    {
                        title: '订单号码',
                        key: 'ordercode',
                        width: 160
                    },
                    {
                        title: '归属公司',
                        key: 'companyname',
                        render: (h, params) => {
                            if (params.row.companyname == '' || params.row.companyname == null) {
                                return ''
                            } else {
                                return h('Poptip', {
                                    props: {
                                        trigger: 'hover',
                                        title: '公司名称',
                                        placement: 'bottom'
                                    }
                                }, [
                                    h('span', this.data3[params.index].companyname[0].name + ''),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b'
                                        }
                                    }),
                                    h('div', {
                                        slot: 'content'
                                    }, [
                                        h('ul', this.data3[params.index].companyname.map(item => [
                                            h('li', {
                                                style: {
                                                    padding: '4px'
                                                }
                                            }, '公司名：' + item.name),
                                        ]))
                                    ])
                                ])
                            }
                        },
                        ellipsis: true,
                        width: 300
                    },
                    {
                        title: '客户名称',
                        key: 'name',
                        width: 120
                    },
                    {
                        title: '客户电话',
                        key: 'tel',
                        width: 120
                    },
                    {
                        title: '创建人',
                        key: 'crealname',
                        width: 100
                    },
                    {
                        title: '跟进人',
                        key: 'frealname',
                        width: 100
                    },
                    {
                        title: '创建时间',
                        key: 'createdate',
                        width: 100
                    },
                    {
                        title: '缴费时间',
                        key: 'payTime',
                        width: 100
                    },
                    {
                        title: '缴费渠道',
                        key: 'paydir',
                        width: 100
                    },
                    {
                        title: '订单价格',
                        key: 'paynumber',
                        width: 100
                    },
                    {
                        title: '已付款',
                        key: 'realnumber',
                        width: 100
                    },
                    {
                        title: '余款',
                        key: 'neednumber',
                        width: 100
                    },
                    {
                        title: '当前流程',
                        key: 'ProcessType',
                        width: 100
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 80,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                        permission: "['orderA.recordN']"
                                    },
                                    style: {
                                        marginRight: '2px'
                                    },
                                    on: {
                                        click: () => {
                                            this.cksp(params)
                                        }
                                    }
                                }, '审批记录')
                            ]);
                        }
                    }
                ],
                columns: [
                    {
                        title: '订单号码',
                        key: 'ordercode',
                        width: 160
                    },
                    {
                        title: '归属公司',
                        key: 'companyname',
                        render: (h, params) => {
                            if (params.row.companyname == '' || params.row.companyname == null) {
                                return ''
                            } else {
                                return h('Poptip', {
                                    props: {
                                        trigger: 'hover',
                                        title: '公司名称',
                                        placement: 'bottom'
                                    }
                                }, [
                                    h('span', this.data[params.index].companyname[0].name + ''),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b'
                                        }
                                    }),
                                    h('div', {
                                        slot: 'content'
                                    }, [
                                        h('ul', this.data[params.index].companyname.map(item => [
                                            h('li', {
                                                style: {
                                                    padding: '4px'
                                                }
                                            }, '公司名：' + item.name),
                                        ]))
                                    ])
                                ])
                            }
                        },
                        ellipsis: true,
                        width: 300
                    },
                    {
                        title: '客户名称',
                        key: 'name',
                        width: 120
                    },
                    {
                        title: '客户电话',
                        key: 'tel',
                        width: 120
                    },
                    {
                        title: '创建人',
                        key: 'crealname',
                        width: 100
                    },
                    {
                        title: '跟进人',
                        key: 'frealname',
                        width: 100
                    },
                    {
                        title: '创建时间',
                        key: 'createdate',
                        width: 100
                    },
                    {
                        title: '缴费时间',
                        key: 'payTime',
                        width: 100
                    },
                    {
                        title: '缴费渠道',
                        key: 'paydir',
                        width: 100
                    },
                    {
                        title: '订单价格',
                        key: 'paynumber',
                        width: 100
                    },
                    {
                        title: '已付款',
                        key: 'realnumber',
                        width: 100
                    },
                    {
                        title: '余款',
                        key: 'neednumber',
                        width: 100
                    },
                    {
                        title: '当前流程',
                        key: 'ProcessType',
                        width: 100
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 170,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        permission: "['orderA.detail']"
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click:  () => {
                                            this.orderDetail(params)
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                        permission: "['orderA.recordY']"
                                    },
                                    on: {
                                        click: () => {
                                            this.cksp(params)
                                        }
                                    }
                                }, '审批记录')
                            ]);
                        }
                    }
                ],
            }
        },
        methods: {
            checkMemos(){},
            downloadExcelN(){
                let field = [
                    {field:'ordercode',title:'订单号码'},
                    {field:'companyname',title:'公司名称'},
                    {field:'name',title:'客户名称'},
                    // {field:'tel',title:'客户电话'},
                    {field:'crealname',title:'创建人'},
                    {field:'frealname',title:'跟进人'},
                    {field:'base_createdate',title:'创建时间'},
                    {field:'payTime',title:'缴费时间'},                                      
                    {field:'base_paydir',title:'缴费渠道',format:'payDirs'},
                    {field:'paynumber',title:'订单总价'},
                    {field:'realnumber',title:'已付款'},
                    {field:'neednumber',title:'余款'},
                    {field:'ProcessType',title:'当前流程'}                               
                                                          
                    ]
                let _self = this
                let url = `api/order/auditList`
                let config = {
                        page: '1',
                        pageSize: '1000000',
                        isAudit:'N',
                        sortField:'id',
                        order:'desc',
                        ordercode:_self.formValidateSearch.ordercode,
                        companyname:_self.formValidateSearch.companyname,
                        customername:_self.formValidateSearch.customername,
                        customertel:_self.formValidateSearch.customertel,
                        crealname:_self.formValidateSearch.crealname,
                        export: 'Y',
                        exportField: encodeURI(JSON.stringify(field))
                }
                let toExcel = this.$MergeURL(url, config)
                window.open(toExcel)
            },
            handleReset1(){
                var _self = this
                _self.formValidateSearch1.ordercode = ''
                _self.formValidateSearch1.companyname = ''
                _self.formValidateSearch1.customername = ''
                _self.formValidateSearch1.customertel = ''
                _self.formValidateSearch1.crealname = ''
                _self.formValidateSearch1.frealname = ''            
                _self.pageY = 1
                _self.getTableDataY()
            },

            Search1() {
                var _self = this;
                if (_self.ishandleSubmit1 == false) {                                 
                _self.pageY = 1;
                }
                _self.ishandleSubmit1 = true;
                _self.getTableDataY();
            },
            downloadExcelY(){
                let field = [
                    {field:'ordercode',title:'订单号码'},
                    {field:'companyname',title:'公司名称'},
                    {field:'name',title:'客户名称'},
                    // {field:'tel',title:'客户电话'},
                    {field:'crealname',title:'创建人'},
                    {field:'frealname',title:'跟进人'},
                    {field:'base_createdate',title:'创建时间'},
                    {field:'payTime',title:'缴费时间'},                                      
                    {field:'base_paydir',title:'缴费渠道',format:'payDirs'},
                    {field:'paynumber',title:'订单总价'},
                    {field:'realnumber',title:'已付款'},
                    {field:'neednumber',title:'余款'},
                    {field:'ProcessType',title:'当前流程'}                               
                                                          
                    ]
                let _self = this
                let url = `api/order/auditList`
                let config = {
                        page: '1',
                        pageSize: '1000000',
                        isAudit:'Y',
                        sortField:'id',
                        order:'desc',
                        ordercode:_self.formValidateSearch1.ordercode,
                        companyname:_self.formValidateSearch1.companyname,
                        customername:_self.formValidateSearch1.customername,
                        customertel:_self.formValidateSearch1.customertel,
                        crealname:_self.formValidateSearch1.crealname,
                        export: 'Y',
                        exportField: encodeURI(JSON.stringify(field))
                }
                let toExcel = this.$MergeURL(url, config)
                window.open(toExcel)
            },
            getTableDataY() {
                let _self = this
                let url = 'api/order/auditList'

                var keys =[]
                    var config = {
                        params:{
                            isAudit:'Y',
                            sortField:'id',
                            order:'desc',
                            page:_self.pageY,
                            pageSize:_self.pageSizeY,
                            ordercode:_self.formValidateSearch1.ordercode,
                            companyname:_self.formValidateSearch1.companyname,
                            customername:_self.formValidateSearch1.customername,
                            customertel:_self.formValidateSearch1.customertel,
                            crealname:_self.formValidateSearch1.crealname,
                            sumField:'paynumber,realnumber,neednumber',
                        }
                    }
                    for (var key in _self.formValidateSearch1) {
                    if (_self.formValidateSearch1[key] == "" || _self.formValidateSearch1[key] == null) {
                        delete config.params[key];
                    }
                }
                function doSuccess(response) {
                    let _data = response.data.data
                    let _paydir
                    _self.pageTotalY = _data.total
                    _self.data = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        for (let j = 0; j < _self.payDirData.length; j++) {
                            if (_self.payDirData[j].typecode == _data.rows[i].base_paydir) {
                                _paydir = _self.payDirData[j].typename
                            }
                        }
                        let _company = [{
                            name: _data.rows[i].companyname
                        }]
                        _self.data.push({
                            paydir: _paydir,
                            ProcessType: _data.rows[i].ProcessType,
                            companyname: _company,
                            crealname: _data.rows[i].crealname,
                            createdate: (_data.rows[i].base_createdate).substr(0,10),
                            frealname: _data.rows[i].frealname,
                            id: _data.rows[i].id,
                            ordercode: _data.rows[i].ordercode,
                            name: _data.rows[i].name,
                            payTime: _data.rows[i].payTime,
                            paynumber: _data.rows[i].paynumber,
                            neednumber: _data.rows[i].neednumber,
                            payamount: _data.rows[i].payamount,
                            tel: _data.rows[i].tel,
                            realnumber: _data.rows[i].realnumber,
                        })
                    }
                }

                this.$http.get(url,config).then(function(res){
                    _self.$backToLogin(res)                    
                    doSuccess(res)
                })
            },
            handleReset(){
                var _self = this
                _self.formValidateSearch.ordercode = ''
                _self.formValidateSearch.companyname = ''
                _self.formValidateSearch.customername = ''
                _self.formValidateSearch.customertel = ''
                _self.formValidateSearch.crealname = ''
                _self.formValidateSearch.frealname = ''            
                _self.pageN = 1
                _self.getTableDataN()
            },

            Search() {
                var _self = this;
                if (_self.ishandleSubmit == false) {                                 
                _self.pageN = 1;
                }
                _self.ishandleSubmit = true;
                _self.getTableDataN();
            },
            getTableDataN() {                
                let _self = this
                let url = 'api/order/auditList'
                _self.loadingN = true
                var keys =[]
                    var config = {
                        params:{
                            isAudit:'N',
                            sortField:'id',
                            order:'desc',
                            page:_self.pageN,
                            pageSize:_self.pageSizeN,
                            ordercode:_self.formValidateSearch.ordercode,
                            companyname:_self.formValidateSearch.companyname,
                            customername:_self.formValidateSearch.customername,
                            customertel:_self.formValidateSearch.customertel,
                            crealname:_self.formValidateSearch.crealname,
                            sumField:'paynumber,realnumber,neednumber',
                        }
                    }
                    for (var key in _self.formValidateSearch) {
                    if (_self.formValidateSearch[key] == "" || _self.formValidateSearch[key] == null) {
                        delete config.params[key];
                    }
                }

                function doSuccess(response) {
                    let _data = response.data.data
                    let _paydir
                    _self.pageTotalN = _data.total
                    _self.data3 = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        for (let j = 0; j < _self.payDirData.length; j++) {
                            if (_self.payDirData[j].typecode == _data.rows[i].base_paydir) {
                                _paydir = _self.payDirData[j].typename
                            }
                        }
                        let _company = [{
                            name: _data.rows[i].companyname
                        }]
                        _self.data3.push({
                            paydir: _paydir,
                            ProcessType: _data.rows[i].ProcessType,
                            companyname: _company,
                            createdate: (_data.rows[i].base_createdate).substr(0,10),
                            crealname: _data.rows[i].crealname,
                            frealname: _data.rows[i].frealname,
                            id: _data.rows[i].id,
                            ordercode: _data.rows[i].ordercode,
                            name: _data.rows[i].name,
                            payTime: _data.rows[i].payTime,
                            paynumber: _data.rows[i].paynumber,
                            neednumber: _data.rows[i].neednumber,
                            payamount: _data.rows[i].payamount,
                            tel: _data.rows[i].tel,
                            realnumber: _data.rows[i].realnumber,
                        })
                    }
                    _self.loadingN = false
                }

                this.$http.get(url, config).then(function(res){
                   _self.$backToLogin(res)
                    doSuccess(res)
                })
            },

            // 已审批列表改变页码
            pageChangeY(a) {
                let _self = this
                _self.pageY = a
                _self.getTableDataY()
            },

            // 待审批列表改变页码
            pageChangeN(a) {
                let _self = this
                _self.pageN = a
                _self.getTableDataN()
            },

            // 已审批列表改变显示条数
            pageSizeChangeY(a) {
                let _self = this
                _self.pageSizeY = a
                _self.getTableDataY()
            },

            // 待审批列表改变显示条数
            pageSizeChangeN(a) {
                let _self = this
                _self.pageSizeN = a
                _self.getTableDataN()
            },

            // 查看订单详情
            orderDetail(a) {
                let _self = this
                let url = '/order/detail/' + a.row.id
                _self.detailCustomer = true

                function doSuccess(response) {
                    let _data = response.data.data
                    _self.orderItemList3 = _data.items
                    _self.formValidateDetail.CompanyName = _data.CompanyName,
                        _self.formValidateDetail.companyid = _data.companyid,
                        _self.formValidateDetail.NAME = _data.name,
                        _self.formValidateDetail.date = _data.payTime,
                        _self.formValidateDetail.zongjia = _data.paynumber,
                        _self.formValidateDetail.realnumber = _data.realnumber,
                        _self.formValidateDetail.payDir = _data.paydir,
                        _self.formValidateDetail.serviceBeginDate = _data.serviceStartDate,
                        _self.formValidateDetail.GDSreport = _data.gdsreport
                        _self.formValidateDetail.performanceMoney = _data.performanceMoney

                    $('#orderItemList4').datagrid({
                        idField: 'id',
                        title: '',
                        data: _self.orderItemList3,
                        rownumbers: true,
                        singleSelect: true,
                        columns: [[
                            {field: 'skuid', title: '编号', hidden: true, sortable: true},
                            {field: 'iscycle', title: 'iscycle', hidden: true, sortable: true},
                            {field: 'productid', title: '产品名', hidden: true, sortable: true},
                            {field: 'product', title: '产品名', width: 150},
                            {field: 'propertys', title: '产品属性', width: 250},
                            {field: 'oaprice', title: '产品价格', width: 100},
                            {field: 'productnumber', title: '产品数量', width: 80,},
                            {
                                field: 'paynumber',
                                title: '销售价格',
                                width: 80,
                            },
                            {field: 'givethenumber', title: '赠送数量', width: 100},
                            {field:'servicestartdate',title:'服务开始税期',width:90,
                                    formatter: function(val, row, a) {
                                        return row.servicestartdate
                                    }
                                }, 
                             {
                                field: 'departname',
                                title: '服务部门',
                                width: 140,
                            }, {field: 'departid', title: '服务部门id', hidden: true}, {
                                field: 'servicedeparts',
                                title: '服务部门id',
                                hidden: true
                            }, {
                                field: 'unitprice',
                                title: '单价/月',
                                width: 140,
                            },
                            {field: 'memo', title: '备注 ', width: 300,}
                        ]],
                    })

                    for (let i = 0; i < _data.items.length; i++) {
                        if (_data.items[i].product == '会计到家') {
                            _self.kjdj = true
                            break
                        }
                    }
                }

                this.GetData(url, doSuccess)
            },

            // 【办理审批】按钮 点击事件
            toDoWorkFlow() {
                let _self = this
                if (_self.customerId == '') {
                    _self.$Message.warning('请选择订单项');
                } else {
                    _self.shenpi = true
                    _self.ApproveFlow = []
                    let url = '/activiti/getProcessInstanceComments?bussinessKey=' + _self.customerId
                    // let url = '/order/approveRecord?orderId=' + re.row.id
                    
                    function doSuccess(re) {
                        _self.ApproveFlow = re.data.data.processInsts
                        console.log(_self.ApproveFlow)
                    }

                    this.GetData(url, doSuccess)

                    let url2 = '/order/detail/' + _self.customerId
                    _self.isCheck = true

                    function doSuccess2(response) {
                        let _data = response.data.data
                        _self.orderItemList3 = _data.items
                        _self.formValidateDetail.CompanyName = _data.CompanyName,
                            _self.formValidateDetail.companyid = _data.companyid,
                            _self.formValidateDetail.NAME = _data.name,
                            _self.formValidateDetail.date = _data.payTime,
                            _self.formValidateDetail.zongjia = _data.paynumber,
                            _self.formValidateDetail.realnumber = _data.realnumber,
                            _self.formValidateDetail.payDir = _data.paydir,
                            _self.formValidateDetail.serviceBeginDate = _data.serviceStartDate,
                            _self.formValidateDetail.GDSreport = _data.gdsreport,
                            _self.formValidateDetail.performanceMoney = _data.performanceMoney,
                            _self.formValidateDetail.ticheng = _data.performanceMoney,

                            $('#orderItemList3').datagrid({
                                idField: 'id',
                                title: '',
                                data: _self.orderItemList3,
                                rownumbers: true,
                                singleSelect: true,
                                columns: [[
                                    {field: 'skuid', title: '编号', hidden: true, sortable: true},
                                    {field: 'iscycle', title: 'iscycle', hidden: true, sortable: true},
                                    {field: 'productid', title: '产品名', hidden: true, sortable: true},
                                    {field: 'product', title: '产品名', width: 150},
                                    {field: 'propertys', title: '产品属性', width: 250},
                                    {field: 'oaprice', title: '产品价格', width: 100},
                                    {field: 'productnumber', title: '产品数量', width: 80,},
                                    {
                                        field: 'paynumber',
                                        title: '销售价格',
                                        width: 80,
                                    },
                                    {field: 'givethenumber', title: '赠送数量', width: 100},
                                    {field:'servicestartdate',title:'服务开始税期',width:90,
                                    formatter: function(val, row, a) {
                                        return row.servicestartdate
                                    }
                                }, 
                                     {
                                        field: 'departname',
                                        title: '服务部门',
                                        width: 140,
                                    }, {field: 'departid', title: '服务部门id', hidden: true}, {
                                        field: 'servicedeparts',
                                        title: '服务部门id',
                                        hidden: true
                                    }, {
                                        field: 'unitprice',
                                        title: '单价/月',
                                        width: 140,
                                    },
                                    {field: 'memo', title: '备注 ', width: 300,}
                                ]],
                            })

                        for (let i = 0; i < _data.items.length; i++) {
                            if (_data.items[i].product == '会计到家') {
                                _self.kjdj = true
                                break
                            }
                        }
                    }

                    this.GetData(url2, doSuccess2)
                }
            },

            // 【办理审批】 提交数据
            blsp() {
                let _self = this
                _self.submit_loading = true
                let url = '/activiti/toDoWorkFlowByBid?bId=' + _self.customerId + '&bType=10&auditFlag=' + _self.banlishenpi.agree + '&auditMemo=' + _self.banlishenpi.desc

                function doSuccess() {
                    _self.shenpi = false
                    _self.$Message.success('提交成功');
                    _self.getTableDataY()
                    _self.getTableDataN()
                    _self.typeGroupId()
		            _self.banlishenpi.agree = '1'
                    _self.banlishenpi.desc = ''
                    _self.submit_loading = false
                }

                function otherThings() {
                    _self.$Message.error('提交失败');
                    _self.submit_loading = false
                }

                this.GetData(url, doSuccess, otherThings)
            },

            // 行选中事件（存储选中行的订单id）
            selectRow(a) {
                let _self = this
                _self.customerId = a.id
                _self.currentProcess = a.CurrentProcess
            },

            // 查看审批备注
            cksp(a) {
                let _self = this

                    // let url = '/activiti/getProcessInstanceComments?bussinessKey=' + a.row.id
                    let url = '/order/approveRecord?orderId=' + a.row.id
                    
                    _self.checkMemo = true
                    _self.checkMemodata = []

                       function doSuccess(re) {
                        //    console.log(re)
                        //    for (let i = re.data.data.length; i > 0; i--) {
                           for (let i = 0; i < re.data.data.length; i++) {
                                _self.checkMemodata.push({
                                    message: re.data.data[i].record,
                                    time: re.data.data[i].createDate,
                                    userId: re.data.data[i].auditName,
                                })
                            }
                       }

                    this.GetData(url, doSuccess)
            },

            typeGroupId() {
                let _self = this
                let url = '/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=payDirs'

                function doSuccess(re) {
                    _self.payDirData = re.data.data.payDirs
                }

                this.GetData(url, doSuccess)
            },

            detailCustomers() {
                let _self = this

                if (_self.customerId == '') {
                    _self.$Message.warning('请选择要查看的订单');
                } else {
                    let url = '/order/detail/' + _self.customerId
                    _self.detailCustomer = true
                    _self.isCheck = true

                    function doSuccess(response) {
                        let _data = response.data.data
                        _self.orderItemList3 = _data.items
                        _self.formValidateDetail.CompanyName = _data.CompanyName,
                            _self.formValidateDetail.companyid = _data.companyid,
                            _self.formValidateDetail.NAME = _data.name,
                            _self.formValidateDetail.date = _data.payTime,
                            _self.formValidateDetail.zongjia = _data.paynumber,
                            _self.formValidateDetail.orderPayNumber = _data.realnumber,
                            _self.formValidateDetail.payDir = _data.paydir,
                            _self.formValidateDetail.serviceBeginDate = _data.serviceStartDate,
                            _self.formValidateDetail.GDSreport = _data.gdsreport,
                            _self.formValidateDetail.performanceMoney = _data.performanceMoney,
                            _self.formValidateDetail.ticheng = _data.performanceMoney,

                            $('#orderItemList3').datagrid({
                                idField: 'id',
                                title: '',
                                data: _self.orderItemList3,
                                rownumbers: true,
                                singleSelect: true,
                                columns: [[
                                    {field: 'skuid', title: '编号', hidden: true, sortable: true},
                                    {field: 'iscycle', title: 'iscycle', hidden: true, sortable: true},
                                    {field: 'productid', title: '产品名', hidden: true, sortable: true},
                                    {field: 'product', title: '产品名', width: 150},
                                    {field: 'propertys', title: '产品属性', width: 250},
                                    {field: 'oaprice', title: '产品价格', width: 100},
                                    {field: 'productnumber', title: '产品数量', width: 80,},
                                    {
                                        field: 'paynumber',
                                        title: '销售价格',
                                        width: 80,
                                    },
                                    {field: 'givethenumber', title: '赠送数量', width: 100},
                                    {field:'servicestartdate',title:'服务开始税期',width:90,
                                    formatter: function(val, row, a) {
                                        return row.servicestartdate
                                    }
                                }, 
                                    {
                                        field: 'departname',
                                        title: '服务部门',
                                        width: 140,
                                    }, {field: 'departid', title: '服务部门id', hidden: true}, {
                                        field: 'servicedeparts',
                                        title: '服务部门id',
                                        hidden: true
                                    }, {
                                        field: 'unitprice',
                                        title: '单价/月',
                                        width: 140,
                                    },
                                    {field: 'memo', title: '备注 ', width: 300,}
                                ]],
                            })

                        for (let i = 0; i < _data.items.length; i++) {
                            if (_data.items[i].product == '会计到家') {
                                _self.kjdj = true
                                break
                            }
                        }
                    }

                    this.GetData(url, doSuccess)
                }
            },
            getPayDirs(){
                let _self = this
                function finsih(res){
                    // console.log(res)
                    _self.payDirType = res.data.data.payDirs
                    // console.log(_self.payDirType)
                }
                this.$GetDataCenter("payDirs",finsih)
                }

        },
        mounted() {
            this.getPayDirs()
            this.getTableDataY()
            this.getTableDataN()
            this.typeGroupId()
        }
    }
</script>