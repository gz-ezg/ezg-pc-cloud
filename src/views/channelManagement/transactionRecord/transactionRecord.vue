<style lang="less">
    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: 0;
        }
    }
</style>
<style>
    /*@import '../../../libs/easyUI/demo.css';*/
    /* @import '../../../libs/easyUI/easyui.css';
    @import '../../../libs/easyUI/icon.css'; */
    .datagrid-row {
        height: 42px;
    }
    .datagrid-cell {
        line-height: 34px;
    }
</style>
<template>
    <div>
        <Card>

                <Row style="margin-bottom:10px;">
                    <Collapse v-model="search_model">
                            <Panel name="1" >
                                <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                                筛选
                                <div slot="content" @keydown.enter="Search">
                                    <Form ref="SearchValidate" :model="SearchValidate" :label-width="80">
                                        <Row :gutter="16">
                                            <Col span="8">
                                            <FormItem label="客户名称：" prop="customername">
                                                <Input v-model="SearchValidate.customername" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                            <Col span="8">
                                            <FormItem label="联系方式：" prop="customertel">
                                                <Input v-model="SearchValidate.customertel" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                            <Col span="8">
                                            <FormItem label="创建时间：" prop="date">
                                                <DatePicker transfer type="daterange" size="small" v-model="SearchValidate.date" style="width:100%" placement="bottom-end"></DatePicker>
                                            </FormItem>
                                            </Col>
                                        </Row>
                                        <center>
                                            <FormItem>
                                                <Button type="primary" @click="Search">搜索</Button>
                                                <Button type="ghost" @click="handleReset('SearchValidate')" style="margin-left: 8px">
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
                    <Button v-permission="['transactionR.export']" type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
                </ButtonGroup>
                <!-- <Poptip
                        style="float: right"
                        placement="bottom-end"
                        width="600">
                    <Button type="text" icon="funnel">筛选</Button>

                </Poptip> -->
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                        highlight-row
                        size="small"
                        :columns="columns"
                        :data="data"
                        @on-row-dblclick="detail"
                    >
                    </Table>
                <Page
                        size="small"
                        :total="pageTotal"
                        show-total
                        :current.sync="page"
                        show-sizer
                        show-elevator
                        @on-change="pageChange"
                        @on-page-size-change="pageSizeChange"
                        style="margin-top: 10px"></Page>
            </Row>
        </Card>
        <Modal
                v-model="modal2"
                title="详情"
                :width="1300"
                class-name="vertical-center-modal">
            <Form ref="formValidate" :model="formValidate" :label-width="70">
                <Row>
                    <Col span="12">
                    <FormItem label="公司名" prop="companyname">
                        <Input v-model="formValidate.companyname" disabled></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="客户名" prop="name">
                        <Input v-model="formValidate.name" disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="已付款" prop="realnumber">
                        <Input v-model="formValidate.realnumber" disabled></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="电话" prop="tel">
                        <Input v-model="formValidate.tel" disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="创建时间" prop="updatedate">
                        <Input v-model="formValidate.updatedate" disabled></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="创建人" prop="createby">
                        <Input v-model="formValidate.createby" disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
            <table width="100%" id="orderItemList3"></table>
        </Modal>
    </div>
</template>

<script>
    // import datagrid from '../../../libs/easyUI/jquery.easyui.min'
    // import combobox from '../../../libs/easyUI/jquery.easyui.min'
    import { DateFormat } from './utils'

    export default {
        name:'transactionRecord_index',
        data() {
            return {
                search_model:'',
                ishandleSubmit:false,
                SearchValidate:{
                    customername:'',
                    customertel:'',
                    date:[]
                },
                isEidt: false,
                modal1: false,
                modal2: false,
                issendValue: [],
                orderItemList3: [],
                formValidate: {
                    companyname: '',
                    name: '',
                    realnumber: '',
                    tel: '',
                    updatedate: '',
                    createby: '',
                },
                columns: [{
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                    {
                        title: '订单号码',
                        key: 'ordercode',
                        width: 150
                    },
                    {
                        title: '公司名称',
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
                        width: 100
                    },
                    {
                        title: '客户电话',
                        key: 'tel',
                        width: 120
                    },
                    {
                        title: '已付款',
                        key: 'realnumber',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'updatedate',
                        width: 150
                    },
                    {
                        title: '创建人',
                        key: 'crealname',
                        width: 120
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 70,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                        permission: "['transactionR.cheek']"
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.detail(params.row)
                                        }
                                    }
                                }, '详情')
                            ]);
                        }
                    }
                ],
                columns1: [
                    {
                        title: '产品名称',
                        key: 'product'
                    },
                    {
                        title: '产品属性',
                        key: 'propertys'
                    },
                    {
                        title: '产品数量',
                        key: 'productnumber'
                    },
                    {
                        title: '销售价格',
                        key: 'paynumber'
                    }
                ],
                data: [],
                pageTotal: new Number(),
                page:1,
                pageSize: 10,
                customerid: ''
            }
        },
        methods: {
            selectRow(){},
            handleReset(){
                var _self = this
                _self.SearchValidate.customername = ''
                _self.SearchValidate.customertel = ''
                _self.SearchValidate.date = ''
                _self.getTableData()
            },
            Search() {
                var _self = this;
                if (_self.ishandleSubmit == false) {
                    _self.page = 1;
                    // console.log("1111s");
                }
                _self.ishandleSubmit = true;
                _self.getTableData();
            },
            downloadExcel(){
                let field = [
                    {field:'ordercode',title:'订单号码'},
                    {field:'companyname',title:'公司名称'},
                    {field:'name',title:'客户名称'},
                    // {field:'tel',title:'客户电话'},
                    {field:'paynumber',title:'已付款'},
                    {field:'base_createdate',title:'创建时间'},
                    {field:'crealname',title:'创建人'}
                    ]
                let _self = this
                let url = `api/order/queryListByChannel`
                let config = {
                        page: '1',
                        pageSize: '1000000',
                        customername:_self.SearchValidate.customername,
                        customertel:_self.SearchValidate.customertel,
                        bcreatedate:DateFormat(_self.SearchValidate.date[0]),
                        bUpdatedate:DateFormat(_self.SearchValidate.date[1]),
                        export: 'Y',
                        exportField: encodeURI(JSON.stringify(field))
                }
                let toExcel = this.$MergeURL(url, config)
                window.open(toExcel)
            },
            // 表格数据请求
            getTableData() {
                let _self = this
                let url = 'api/order/queryListByChannel'

                _self.data = []
                var keys =[]
                    var config = {
                        params:{
                            sortField:'id',
                            order:'desc',
                            page:_self.page,
                            pageSize:_self.pageSize,
                            customername:_self.SearchValidate.customername,
                            customertel:_self.SearchValidate.customertel,
                            bcreatedate:DateFormat(_self.SearchValidate.date[0]),
                            bUpdatedate:DateFormat(_self.SearchValidate.date[1]),
                        }
                    }
                    for (var key in _self.SearchValidate) {
                    if (_self.SearchValidate[key] == "" || _self.SearchValidate[key] == null) {
                    delete config.params[key];
                    }
                    if(_self.SearchValidate.date == "" || _self.SearchValidate.date == null ){
                            delete config.params.eUpdatedate
                            delete config.params.eUpdatedate
                        }
                }
                function doSuccess(response) {
                    _self.pageTotal = response.data.data.total

                    for (let i = 0; i < response.data.data.rows.length; i++) {
                        let _company = [{
                            name: response.data.data.rows[i].companyname
                        }]
                        let _updatedate = ""
                        if(response.data.data.rows[i].updatedate==null||response.data.data.rows[i].updatedate==""){

                        }else{
                            _updatedate = (response.data.data.rows[i].updatedate).substr(0,10)
                        }
                        _self.data.push({
                            ordercode: response.data.data.rows[i].ordercode,
                            companyname: _company,
                            name: response.data.data.rows[i].name,
                            tel: response.data.data.rows[i].tel,
                            updatedate: _updatedate,
                            crealname: response.data.data.rows[i].crealname,
                            realnumber: response.data.data.rows[i].realnumber,
                            id: response.data.data.rows[i].id,
                        })
                    }
                }

                _self.$http.get(url,config).then(function(res){
                    _self.$backToLogin(res)                    
                    doSuccess(res)
                })
            },
            // 改变页码
            pageChange(a) {
                let _self = this
                _self.page = a
                _self.getTableData()
                // let url = '/order/queryListByChannel?page=' + a + '&pageSize=' + _self.pageSize + '&sortField=id&order=desc'

                // _self.data = []

                // function doSuccess(response) {
                //     _self.pageTotal = response.data.data.total

                //     for (let i = 0; i < response.data.data.rows.length; i++) {
                //         _self.data.push({
                //             ordercode: response.data.data.rows[i].ordercode,
                //             companyname: response.data.data.rows[i].companyname,
                //             name: response.data.data.rows[i].name,
                //             tel: response.data.data.rows[i].tel,
                //             updatedate: (response.data.data.rows[i].updatedate).substr(0,10),
                //             createby: response.data.data.rows[i].createby,
                //             realnumber: response.data.data.rows[i].realnumber,
                //             id: response.data.data.rows[i].id,
                //         })
                //     }
                // }

                // this.GetData(url, doSuccess)
            },

            // 改变每页显示的数据条数
            pageSizeChange(a) {
                let _self = this
                _self.pageSize = a
                _self.getTableData()
                // let url = '/order/queryListByChannel?page=1&pageSize=' + a + '&sortField=id&order=desc'
                // _self.pageSize = a
                // _self.data = []

                // function doSuccess(response) {
                //     _self.pageTotal = response.data.data.total

                //     for (let i = 0; i < response.data.data.rows.length; i++) {
                //         _self.data.push({
                //             ordercode: response.data.data.rows[i].ordercode,
                //             companyname: response.data.data.rows[i].companyname,
                //             name: response.data.data.rows[i].name,
                //             tel: response.data.data.rows[i].tel,
                //             updatedate: (response.data.data.rows[i].updatedate).substr(0,10),
                //             createby: response.data.data.rows[i].createby,
                //             realnumber: response.data.data.rows[i].realnumber,
                //             id: response.data.data.rows[i].id,
                //         })
                //     }
                // }

                // this.GetData(url, doSuccess)
            },

            detail(e) {
                let _self = this
                let url = '/order/detail/' + e.id

                _self.modal2 = true
                _self.formValidate.companyname = e.companyname[0].name
                _self.formValidate.name = e.name
                _self.formValidate.tel = e.tel
                _self.formValidate.updatedate = e.updatedate
                _self.formValidate.createby = e.crealname
                _self.formValidate.realnumber = e.realnumber

                function doSuccess(response) {
                    let _data = response.data.data
                    _self.orderItemList3 = _data.items

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
                }

                this.GetData(url, doSuccess)
            },

            // downloadExcel() {
            //     let url = '/channel/customer/channel/1/9999999/list'
            //     let arrdata = [
            //         {
            //             field: 'ordercode',title: '订单号码'
            //         },
            //         {
            //             field: 'companyname',title: '公司名称'
            //         },
            //         {
            //             field: 'name',title: '客户名称'
            //         },
            //         {
            //             field: 'realnumber',title: '订单价格'
            //         },
            //         {
            //             field: 'updatedate',title: '创建时间'
            //         },
            //         {
            //             field: 'createby',title: '创建人'
            //         },
            //     ]

            //     this.DownloadExcel(url, JSON.stringify(arrdata))
            // },
        },
        mounted() {
            this.getTableData()
        }
    }
</script>