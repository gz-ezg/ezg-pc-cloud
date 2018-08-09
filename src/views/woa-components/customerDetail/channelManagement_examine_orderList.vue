<style>
    /* @import '../../../libs/easyUI/easyui.css';
    @import '../../../libs/easyUI/icon.css'; */
    @import '../../order/css/productDetail.min.css';

    .ivu-table .demo-table-error-row td {
    }
    .datagrid-row {
        height: 42px;
    }

    .datagrid-cell {
        line-height: 34px;
    }
</style>
<template>
    <div>
        <Button type="ghost" shape="circle" icon="ios-search-strong" @click="detailCustomers">查看</Button>
        <Table
                border
                highlight-row
                @on-row-click="selectRow"
                :row-class-name="rowClassName"
                :columns="columns7"
                :data="data6"
                style="margin-top: 15px"
        ></Table>
        <Row>
            <Col style="margin:10px">
                <div style="float:left">总计：</div>
                <div style="float:right">消费总额：{{total_paynumber}}&nbsp;&nbsp;&nbsp;&nbsp;已付款总额：{{total_realnumber}}&nbsp;&nbsp;&nbsp;&nbsp;欠款总额：{{total_neednumber}}</div>
            </Col>
        </Row>
        <Modal
                v-model="detailCustomer"
                title="查看"
                :width="1300">
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
                        <FormItem label="缴费时间" prop="date">
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
                        <FormItem label="已付款" prop="orderPayNumber">
                            <Input size="small" v-model="formValidateDetail.orderPayNumber" disabled/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="缴费渠道" prop="payDir">
                            <Select transfer v-model="formValidateDetail.payDir" disabled >
                                <Option value="gszfb">公司支付宝</Option>
                                <Option value="gh">工行</Option>
                                <Option value="zh">招行</Option>
                                <Option value="wx">微信公众号</Option>
                                <Option value="gw">官网</Option>
                                <Option value="other">其他</Option>
                                <Option value="cash">现金</Option>
                                <Option value="jhang">建行</Option>
                                <Option value="nsh">农商行</Option>
                                <Option value="tb">淘宝</Option>
                                <Option value="zht">中衡通</Option>
                                <Option value="jt">锦涛</Option>
                                <Option value="wjw">魏建伟</Option>
                                <Option value="zgrzh">转个人账户</Option>
                                <Option value="dgzfb">东莞支付宝</Option>
                                <Option value="szgh">深圳工行</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="国地税报道" prop="GDSreport">
                            <Select transfer v-model="formValidateDetail.GDSreport" disabled transfer>
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
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    // import datagrid from '../../../libs/easyUI/jquery.easyui.min'

    export default {
        props: ['customerid'],
        data() {
            return {
                kjdj:false,
                length:0,
                total_neednumber:0,
                total_paynumber:0,
                total_realnumber:0,
                detailCustomer: false,
                customerId: '',
                payDirData: [],
                data6: [],
                formValidateDetail: {
                    ticheng: 0,
                    zongjia: 0,
                    orderPayNumber: 0,
                    performanceMoney: 0,
                    CompanyName: '',
                    customername: '',
                    GDSreport: '',
                    payDir: '',
                    date: '',
                    serviceBeginDate: ''
                },
                columns7: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '公司名称',
                        key: 'companyname',
                        width: 300
                    },
                    {
                        title: '流程状态',
                        key: 'processtype',
                        width: 100,
                    },
                    {
                        title: '欠款',
                        key: 'neednumber',
                        width: 100,
                    },
                    {
                        title: '订单价格',
                        key: 'paynumber',
                        width: 100,
                    },
                    {
                        title: '已付款',
                        key: 'realnumber',
                        width: 100,
                    },
                    {
                        title: '缴费渠道',
                        key: 'paydirText',
                        width: 100,
                    },
                ],
            }
        },
        methods: {
            getCompanyData() {
                var _self = this
                let url = '/order/list?customerId=' + _self.customerid + '&page=1&pageSize=1000&sortField=id&order=desc'
                function doSuccess(response) {
                    var _customerData = response.data.data
                    let _paydir
                    for (var i = 0; i < _customerData.rows.length; i++) {
                        for (let j = 0; j < _self.payDirData.length; j++) {
                            if (_self.payDirData[j].typecode == _customerData.rows[i].base_paydir) {
                                _paydir = _self.payDirData[j].typename
                            }
                        }
                        var _responseArray = {}
                        _responseArray.id = _customerData.rows[i].id
                        _responseArray.ordercode = _customerData.rows[i].ordercode
                        _responseArray.companyname = _customerData.rows[i].companyname
                        _responseArray.processtype = _customerData.rows[i].ProcessType
                        _responseArray.neednumber = _customerData.rows[i].neednumber
                        _responseArray.paynumber = _customerData.rows[i].paynumber
                        _responseArray.realnumber = _customerData.rows[i].realnumber
                        _responseArray.paydirText = _paydir
                        _responseArray.createDate = _customerData.rows[i].createDate
                        _responseArray.updatedate = _customerData.rows[i].updatedate
                        _self.data6.push(_responseArray)
                        _self.total_neednumber += _customerData.rows[i].neednumber
                        _self.total_paynumber += _customerData.rows[i].paynumber
                        _self.total_realnumber += _customerData.rows[i].realnumber
                        
                    }
                }

                this.GetData(url, doSuccess)
            },

            typeGroupId() {
                let _self = this
                // let url = '/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=payDirs'

                // function doSuccess(re) {
                //     _self.payDirData = re.data.data.payDirs
                // }

                // this.GetData(url, doSuccess)

                let parmas = "payDirs"

                function finish(res){
                    _self.payDirData = res.data.data.payDirs
                }

                this.$GetDataCenter(parmas, finish)
            },

            rowClassName(row, index) {
                if (row.neednumber != 0) {
                    return 'demo-table-error-row';
                }
            },

            // 行选中事件（存储选中行的订单id）
            selectRow(a) {
                let _self = this
                _self.customerId = a.id
            },

            // 点击【查看】按钮
            detailCustomers(a) {
                let _self = this

                if (_self.customerId == '') {
                    _self.$Message.warning('请选择要查看的订单');
                } else {
                    let url = '/order/detail/' + _self.customerId
                    _self.detailCustomer = true
                    _self.isCheck = true

                    function doSuccess(response) {
                        let _data = response.data.data
                        let _date = ''
                        if (_data.serviceStartDate != '' && _data.serviceStartDate != null) {
                            _date = _data.serviceStartDate.slice(0,7)
                        } else {
                            _date = ''
                        }
                        _self.orderItemList3 = _data.items
                        _self.formValidateDetail.CompanyName = _data.CompanyName,
                            _self.formValidateDetail.companyid = _data.companyid,
                            _self.formValidateDetail.NAME = _data.name,
                            _self.formValidateDetail.date = _data.payTime,
                            _self.StartTime5= _data.payTime,
                            _self.formValidateDetail.zongjia = _data.paynumber,
                            _self.formValidateDetail.orderPayNumber = _data.realnumber,
                            _self.formValidateDetail.payDir = _data.paydir,
                            _self.formValidateDetail.serviceBeginDate = _date
                        _self.StartTime6 = _date
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
                                    {field: 'memo', title: '备注 ', width: 220,}
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
        },
        mounted() {
            this.typeGroupId()
            this.getCompanyData()
            // this.count()
        }
    }
</script>