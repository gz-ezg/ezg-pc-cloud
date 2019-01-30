<template>
    <div>
        <Card style="min-width:800px">
            <Row style="margin-bottom:10px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                            筛选
                        <div slot="content" @keydown.enter="Search">
                            <Form ref="formValidateSearch" :model="formValidateSearch" :label-width="100">
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
                                    <FormItem label="缴费渠道：" prop="customername">
                                        <Select transfer v-model="formValidateSearch.payDir" size="small">
                                            <Option v-for="(item, index) in payDirs" :key=index :value="item.typecode">{{item.typename}}</Option>                            
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="创建时间：" prop="date">
                                        <DatePicker transfer type="daterange" placement="bottom-end" v-model="formValidateSearch.date" style="width:100%" size="small"></DatePicker>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="16">
                                <Col span="8">
                                    <FormItem label="创建人：" prop="crealname">
                                        <Input v-model="formValidateSearch.crealname" size="small"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="跟进人：" prop="frealname">
                                        <Input v-model="formValidateSearch.frealname" size="small"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="缴费时间：" prop="paytime">
                                        <DatePicker transfer type="daterange" placement="bottom-end" v-model="formValidateSearch.paytime" style="width:100%" size="small"></DatePicker>
                                    </FormItem>
                                </Col>
                            </Row>
                            <center>
                                <FormItem>
                                    <Button type="primary" @click="Search">搜索</Button>
                                    <Button type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
                                </FormItem>
                            </center>
                        </Form>
                    </div>
                </Panel>
            </Collapse>
        </Row>
        <Row>
            <ButtonGroup>
                <Button v-permission="['orderL.add']" type="primary" icon="plus" @click="open_add" name="order_add">录入</Button>
                <Button v-permission="['orderL.edit']" type="primary" icon="edit" @click="open_edit" name="order_edit">编辑</Button>
                <Button v-permission="['orderL.detail']" type="primary" icon="information-circled" @click="order_show" name="order_show">查看</Button>
                <Button v-permission="['orderL.flowChart']" type="primary" icon="ios-crop" @click="open_flowChart">查看流程图</Button>
                <Button v-permission="['orderL.resubmit']" type="primary" icon="refresh" @click="reapply_process" name="order_re_submit">重新提交</Button>
                <Button v-permission="['orderL.amend']" type="primary" icon="edit" @click="xiugai_open" name="order_amend">修改</Button>
                <Button v-permission="['orderL.delOrder']" type="primary" icon="trash-b" @click="del_order" name="order_amend">删除</Button>
                <Button v-permission="['orderL.amend']" type="primary" icon="ios-color-filter-outline" @click="get_data">刷新</Button>
                <!--  ↓ ↓ 该功能暂定，代码勿删  -->
                <!--<Button type="primary" icon="ios-color-filter-outline" @click="qihuaOpen()">企划(修改)</Button>-->
                <!--<Button v-permission="['orderL.invalid']" type="primary" icon="ios-color-filter-outline" @click="deleteOrder = true">订单作废</Button>-->
                <Button v-permission="['orderL.export']" type="primary" icon="ios-color-filter-outline" @click="downloadExcel">导出Excel</Button>
                <Button v-permission="['orderL.export']" type="primary" icon="ios-color-filter-outline" @click="account_downloadExcel">结算导出</Button>
            </ButtonGroup>
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                :loading="loading"
                highlight-row
                size="small"
                border
			    :row-class-name="rowClassName"
                @on-row-click="select_row"
                @on-row-dblclick="open_order_detail"
                @on-sort-change="sort"
                :columns="header"
                :data="data"></Table>
            <Page
                size="small"
                :total="total"
                show-total
                show-sizer
                show-elevator
                :current.sync="page"
                @on-change="pageChange"
                @on-page-size-change="pageSizeChange"
                style="margin-top: 10px"></Page>
        </Row>
        </Card>
        <Modal
            v-model="flowImgOpen"
            title="查看流程图"
            width="80%">
            <Spin size="large" fix v-if="imgLoading"></Spin>
            <center>
                <img :src='flowChartImg' width="100%"/>
            </center>
            <div slot="footer"></div>
        </Modal>
        <show-order :payDirs="payDirs"></show-order>
        <create-order :payDirs="payDirs"></create-order>
        <amend-order :payDirs="payDirs"></amend-order>
        <edit-order :payDirs="payDirs"></edit-order>
        <show-contarct></show-contarct>
        <product-select></product-select>
        <!-- <invoice></invoice> -->
    </div>
</template>

<script>
//  查看订单详情
import showOrder from './components/orderOp/showOrder'
import createOrder from './components/orderOp/createOrder'
import amendOrder from './components/orderOp/amendOrder'
import editOrder from './components/orderOp/editOrderDetail'
import showContarct from './show_contarct'
import productSelect from './components/productSelect'
// import invoice from './components//invoice/index'

import { DateFormat } from '../../../libs/utils.js'

export default {
    name: "orderList_index",
    components:{
        showOrder,
        createOrder,
        amendOrder,
        editOrder,
        showContarct,
        productSelect,
        // invoice
    },
    data(){
        return {
            //  流程图相关
            imgLoading: true,
            flowImgOpen: false,
            flowChartImg: "",
            payDirType: [],
            search_model: "0",
            //  列表查询相关
            selectRow: "",
            formValidateSearch: {
                ordercode: "",
                companyname: "",
                customername: "",
                customertel: "",
                payDir: "",
                date: [],
                crealname: "",
                frealname: "",
                paytime: []
            },
            total: 0,
            page: 1,
            pageSize: 10,
            loading: false,
            order: "desc",
            sortField: "id",
            header: [
                {
                    title: '订单号码',
                    key: 'ordercode',
                    minWidth: 140,                                      
                },
                {
                    title: '公司名称',
                    key: 'companyname',
                    // render: (h, params) => {
                    //     if (params.row.companyname == '' || params.row.companyname == null) {
                    //         return ''
                    //     } else {
                    //         return h('Poptip', {
                    //             props: {
                    //                 trigger: 'hover',
                    //                 title: '公司名称',
                    //                 placement: 'bottom'
                    //             }
                    //         }, [
                    //             h('span', this.data[params.index].companyname[0] + ''),
                    //             h('Icon', {
                    //                 props: {
                    //                     type: 'arrow-down-b'
                    //                 }
                    //             }),
                    //             h('div', {
                    //                 slot: 'content'
                    //             }, [
                    //                 h('ul', this.data[params.index].companyname.map(item => [
                    //                     h('li', {
                    //                         style: {
                    //                             padding: '4px'
                    //                         }
                    //                     }, '公司名：' + item),
                    //                 ]))
                    //             ])
                    //         ])
                    //     }
                    // },
                    minWidth: 300,                                              
                },
                {
                    title: '客户名称',
                    key: 'name',
                    minWidth: 120,                                               
                },
                {
                    title: '客户电话',
                    key: 'tel',
                    minWidth: 120
                },
                {
                    title: '产品名称',
                    key: 'productname',
                    minWidth: 180,
                    render:(h, params) => {
                        if(params.row.productname == ''||params.row.productname == null){
                            return ''
                        }else if(params.row.productname.length>10){
                            return h('Poptip',{
                                props:{
                                    trigger:'hover',
                                    placement:'bottom'
                                }
                            },[
                                h('span',params.row.productname.slice(0,10)+'...'),
                                h('Icon', {
                                    props: {
                                        type: 'arrow-down-b',
                                    }
                                }),
                                h('div',{
                                    slot:'content',
                                },[
                                    h('span',params.row.productname)
                                ])
                            ])
                        }else{
                            return h('span',params.row.productname)
                        }
                    }
                },
                {
                    title: '流程状态',
                    key: 'ProcessType',
                    minWidth: 120,
                    sortable: "custom"                                                
                },
                {
                    title: '缴费渠道',
                    key: 'base_paydir',
                    minWidth: 140,
                    sortable: "custom"                                                
                },
                {
                    title: '订单价格',
                    key: 'paynumber',
                    minWidth: 120,  
                    sortable: "custom"                                            
                },
                {
                    title: '已付款',
                    key: 'realnumber',
                    minWidth: 100,
                    sortable: "custom"                                                                                            
                },
                {
                    title: '创建时间',
                    key: 'base_createdate',
                    minWidth: 120,
                    sortable: "custom"                                                                
                },
                {
                    title: '缴费日期',
                    key:'payTime',
                    minWidth: 120,
                    sortable: "custom"
                },
                {
                    title: '余款',
                    key: 'neednumber',
                    minWidth: 100,
                    sortable: "custom"                                                
                },
                {
                    title: '客户来源',
                    key: 'customersource',
                    minWidth: 120
                },
                {
                    title: '创建人',
                    key: 'crealname',
                    minWidth: 100
                },
                {
                    title: '跟进人',
                    key: 'frealname',
                    minWidth: 100
                },
                {
                    title: "上传合同",
                    key: "contract_flag",
                    minWidth: 120,
                    sortable: "custom"
                },
                {
                    title: '操作',
                    key: 'action',
                    fixed: 'right',
                    minWidth: 120,
                    render: (h, params) => {
                        let _self = this
                        // if(params.index != this.pageSize){
                        if(params.index != this.data.length-1){
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                    },
                                    directives: [
                                        {
                                            name: "permission",
                                            value: "orderL.record"
                                        }
                                    ],
                                    on: {
                                        click: () => {
                                            _self.$bus.emit("ORDER_APPROVELIST_LOG", params.row.id)
                                        }
                                    }
                                }, '审批记录'),
                            ]);
                        }
                    }
                },
                {
                    title: '退款',
                    key: 'action',
                    minWidth: 75,
                    render: (h, params)=>{
                        let _self = this
                        if(params.index != this.pageSize){
                            return h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                        },
                                        directives: [
                                            {
                                                name: "permission",
                                                value: "orderL.cancelOrder"
                                            }
                                        ],
                                    },[
                                    h('Poptip', {
                                        props: {
                                            transfer: true,
                                            confirm: true,
                                            title: '您确定要退款此订单吗！',
                                        },
                                        on: {
                                            'on-ok': ()=>{
                                                // console.log(params.row)
                                                let url = `api/order/refund`

                                                let config = {
                                                    id: params.row.id
                                                }

                                                function success(res){
                                                    // _self.$Message.success(res.data.msg)
                                                    _self.get_data()
                                                    _self.$bus.emit("UPDATE_ORDER_LIST")
                                                }

                                                function fail(err){

                                                }

                                                this.$Post(url, config, success, fail)
                                            },
                                        }
                                    }, '退款')
                                ])
                        }
                    }
                }
            ],
            //  以下两项操作只开放给管理员
            amdinOpertionCol: {
                title: '订单操作',
                    key: 'action',
                    minWidth: 180,
                    render: (h, params)=>{
                        let _self =  this
                        if(params.index != this.pageSize){
                            return h('div',[
                                h("Button",{
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                    },
                                    // style:{
                                    //         marginLeft: "10px"
                                    // },
                                    on: {
                                        click: () => {
                                            _self.$ButtonCollect("order_rebuild_orderflow")
                                            let url = `api/order/resetOrderProcess`
                                            let config = {
                                                params:{
                                                    orderId: params.row.id
                                                }
                                            }

                                            function success(res){
                                                _self.$Message.success(res.data.msg)
                                                _self.get_data()
                                            }

                                            _self.$Get(url, config, success)
                                        }
                                    }
                                },"重置流程"),
                                h("Button",{
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                    },
                                    style:{
                                            marginLeft: "10px"
                                    },
                                    on: {
                                        click: () => {
                                            _self.$ButtonCollect("order_rebuild_worderorder")
                                            let url = `api/order/orderApprovalFinish`
                                            let config = {
                                                params:{
                                                    orderId: params.row.id
                                                }
                                            }

                                            function success(res){
                                                _self.$Message.success(res.data.msg)
                                            }

                                            _self.$Get(url, config, success)
                                        }
                                    }
                                },"生成工单"),
                            ])
                        }
                    }
            },
            data: [],
            //  数据字典
            payDirs: [],
            cluesources: [],
            order_contract_flag: [], 
            payDirs_map: new Map(),
            cluesources_map: new Map(),
            order_contract_flag_map: new Map()
        }
    },
    methods: {
        //  财务结算
        account_downloadExcel(){
            let field = [
                {field:'payTime',title:'到账时间'},
                {field:'affiliation_area',title:'地区',format:"affiliation_area"},
                {field:'departname',title:'部门'},
                {field:'frealname',title:'业务员'},
                {field:'name',title:'联系人'},
                {field:'',title:'是否交回'},
                {field:'',title:'360搜索'},
                {field:'companyname',title:'企业名称'},
                {field:'tel',title:'联系电话'},
                {field:'realnumber',title:'客户小计'},
                {field:'base_paydir',title:'入款账户', format:'payDirs'},
            ]
            let _self = this
            let url = `api/order/list`
            let config = {
                page: '1',
                pageSize: '1000000',
                ordercode: _self.formValidateSearch.ordercode,
                companyname:_self.formValidateSearch.companyname,
                customername:_self.formValidateSearch.customername,
                customertel:    _self.formValidateSearch.customertel,
                crealname:    _self.formValidateSearch.crealname,
                frealname:    _self.formValidateSearch.frealname,
                payDir:    _self.formValidateSearch.payDir,
                bcreatedate:DateFormat(_self.formValidateSearch.date[0]),
                ecreatedate:DateFormat(_self.formValidateSearch.date[1]),
                bpaytime: DateFormat(_self.formValidateSearch.paytime[0]),
                epaytime: DateFormat(_self.formValidateSearch.paytime[1]),
                export: 'Y',
                exportField: encodeURI(JSON.stringify(field))
            }
            let toExcel = this.$MergeURL(url, config)
            window.open(toExcel)
        },
        //  下载文件
        downloadExcel(){
            let field = [
                {field:'ordercode',title:'订单号码'},
                {field:'companyname',title:'公司名称'},
                {field:'name',title:'客户名称'},
                {field:'productname',title:'产品名称'},
                {field:'ProcessType',title:'流程状态'},
                {field:'base_paydir',title:'缴费渠道',format:'payDirs'},
                {field:'paynumber',title:'订单价格'},
                {field:'realnumber',title:'已付款'},                    
                {field:'neednumber',title:'余款'},                    
                {field:'base_createdate',title:'创建时间'},
                {field:'crealname',title:'创建人'},
                {field:'frealname',title:'跟进人'},                    
            ]
            let _self = this
            let url = `api/order/list`
            let config = {
                page: '1',
                pageSize: '1000000',
                ordercode: _self.formValidateSearch.ordercode,
                companyname:_self.formValidateSearch.companyname,
                customername:_self.formValidateSearch.customername,
                customertel:    _self.formValidateSearch.customertel,
                crealname:    _self.formValidateSearch.crealname,
                frealname:    _self.formValidateSearch.frealname,
                payDir:    _self.formValidateSearch.payDir,
                bcreatedate:DateFormat(_self.formValidateSearch.date[0]),
                ecreatedate:DateFormat(_self.formValidateSearch.date[1]),
                bpaytime: DateFormat(_self.formValidateSearch.paytime[0]),
                epaytime: DateFormat(_self.formValidateSearch.paytime[1]),
                export: 'Y',
                exportField: encodeURI(JSON.stringify(field))
            }
            let toExcel = this.$MergeURL(url, config)
            window.open(toExcel)
        },
        //  搜索相关
        Search(){
            this.page = 1
            this.get_data()
        },
        handleReset(){
            this.$refs["formValidateSearch"].resetFields()
            this.formValidateSearch.date = []
            this.get_data()
        },
        //  自定义排序
        sort(e){
            this.sortField = e.key
            if(e.order=='normal'){
                this.order = 'desc'
                this.sortField = 'id'
            }else{
                this.order = e.order
            }
            this.get_data()
        },
        //  获取列表
        get_data(){
            let _self = this
            let url = `api/order/list`
            _self.loading = true
            let config = {
                params: {
                    sortField:_self.sortField,
                    order:_self.order,
                    page:_self.page,
                    pageSize:_self.pageSize,
                    ordercode:_self.formValidateSearch.ordercode,
                    companyname:_self.formValidateSearch.companyname,
                    customername:_self.formValidateSearch.customername,
                    customertel:_self.formValidateSearch.customertel,
                    crealname:_self.formValidateSearch.crealname,
                    frealname:_self.formValidateSearch.frealname,
                    payDir:_self.formValidateSearch.payDir,
                    bpaytime: DateFormat(_self.formValidateSearch.paytime[0]),
                    epaytime: DateFormat(_self.formValidateSearch.paytime[1]),
                    sumField:'paynumber,realnumber,neednumber',
                    bcreatedate:DateFormat(_self.formValidateSearch.date[0]),
                    ecreatedate:DateFormat(_self.formValidateSearch.date[1])
                }
            }

            function success(res){
                _self.data = res.data.data.rows
                _self.total = res.data.data.total
                for(let i = 0; i < _self.data.length; i++){
                    _self.data[i].base_paydir = _self.payDirs_map.get(_self.data[i].base_paydir)
                    _self.data[i].customersource = _self.cluesources_map.get(_self.data[i].customersource)
                    _self.data[i].contract_flag = _self.order_contract_flag_map.get(_self.data[i].contract_flag)
                    if(_self.data[i].base_createdate){
                        _self.data[i].base_createdate = _self.data[i].base_createdate.slice(0,10)
                    }
                }
                _self.data.push({
                    base_paydir: '合计',
                    paynumber: res.data.data.sum.paynumber,
                    realnumber: res.data.data.sum.realnumber,
                    neednumber: res.data.data.sum.neednumber,
                })
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        pageChange(e){
            this.page = e
            this.get_data()
        },
        pageSizeChange(e){
            this.pageSize = e
            this.get_data()
        },
        //  列表分类处理
        rowClassName(row, index) {
            let _self = this
            if (row.ProcessType == "调整订单" && row.id != _self.selectRow.id) {
                return 'demo-table-error-row';
            }
        },
        select_row(e){
            console.log(e)
            if(e.id){
                this.selectRow = e
            }else{
                this.selectRow = ""
            }
        },
        get_data_center(){
            let _self = this
            return new Promise((resolve,reject) => {
                let params = "payDirs,cluesources,order_contract_flag"

                function success(res){
                    _self.payDirs = res.data.data.payDirs
                    _self.cluesources = res.data.data.cluesources
                    _self.order_contract_flag = res.data.data.order_contract_flag
                    _self.payDirs_map = _self.$array2map(_self.payDirs)
                    _self.cluesources_map = _self.$array2map(_self.cluesources)
                    _self.order_contract_flag_map = _self.$array2map(_self.order_contract_flag)
                    resolve()
                }

                this.$GetDataCenter(params, success)
                
            })
        },
        //  【双击查看订单】
        open_order_detail(e){
            this.$bus.emit("OPEN_ORDERLIST_DETAIL", e.id)
        },

        //  【查看订单】
        order_show(){
            if(this.selectRow){
                this.open_order_detail(this.selectRow)
            }else{
                this.$Message.warning("请选择一行进行操作！")
            }
        },

        //  【查看流程图】
        open_flowChart(){
            let _self = this
            if(this.selectRow){
                this.imgLoading = true
                this.flowImgOpen = true
                this.flowChartImg = '/api/dataCenter/activiti/getResourceInputStreamObj?bussinessKey=' + this.selectRow.id
                setTimeout(()=>{
                    _self.imgLoading = false
                }, 1000)
            }else{
                this.$Message.warning("请选择一行进行操作！")
            }
        },

        //  【重新提交】
        reapply_process(){
            let _self = this
            if(this.selectRow){
                console.log(this.selectRow)
                if (_self.selectRow.CurrentProcess == "Returned") {
                    _self.$Modal.confirm({
                        loading: true,
                        title: '重新提交审批',
                        content: '<p>是否重新提交审批</p>',
                        onOk: () => {
                            let url = 'api/activiti/reApplyProcessByOrderId'
                            let config = {
                                params: {
                                    orderId: _self.selectRow.id,
                                    auditFlag: 1
                                }
                            }
                            function success(res) {
                                _self.$Modal.remove();
                                _self.$Message.success('重新提交成功');
                                setTimeout(()=>{
                                    _self.get_data()
                                }, 1000)
                            }
                            
                            function fail(err){
                                _self.$Modal.remove();
                                _self.$Message.error("提交失败！")
                                setTimeout(()=>{
                                    _self.get_data()
                                }, 1000)
                            }

                            _self.$Get(url, config, success, fail)
                        },
                    });
                }else{
                    _self.$Message.warning('该订单状态不允许重新提交');
                }
            }else{
                this.$Message.warning("请选择一行进行操作！")
            }
        },
        //  【作废】
        del_order(){
            let _self = this
            if(this.selectRow){
                _self.$ButtonCollect("order_rebuild_orderflow")
                let url = `api/order/del`
                _self.$ButtonCollect("order_del")
                let config = {
                    id: _self.selectRow.id
                }

                function success(res){
                    // _self.$Message.success(res.data.msg)
                    setTimeout(()=>{
                        _self.get_data()
                    }, 500)
                }
                function fail(err){

                }
                _self.$Post(url, config, success, fail)
            }else{
                this.$Message.warning("请选择一行进行操作！")
            }
        },
        //  【修改订单】
        xiugai_open(){
            if(this.selectRow){
                if(this.selectRow.CurrentProcess != 'Finished'){
                    this.$Message.warning("未完结订单不予许进行修改！")
                }else{
                    this.$bus.emit("OPEN_ORDERLIST_AMEND", this.selectRow.id)
                }
            }else{
                this.$Message.warning("请选择一行进行操作！")
            }
        },
        //  【编辑订单】
        open_edit(){
            if(this.selectRow){
                if(this.selectRow.CurrentProcess != 'Ready' && this.selectRow.CurrentProcess != 'Returned' && this.selectRow.CurrentProcess != 'ReturnedToReady'){
                    this.$Message.warning("当前订单状态不允许编辑！")
                }else{
                    this.$bus.emit("OPEN_ORDERLIST_EDIT", this.selectRow.id)
                }
            }else{
                this.$Message.warning("请选择一行进行操作！")
            }
        },
        //  【新增订单】
        open_add(){
            this.$bus.emit("OPEN_ORDERLIST_ADD", true)
        },
        //  【撤回】
        order_cancelOrder(){

        }

    },
    created() {
        this.loading = true
        this.get_data_center().then(
            this.get_data()
        )
        if(localStorage.getItem('id')==10059){
            this.header.push(this.amdinOpertionCol)
        }
        this.$bus.on("UPDATE_ORDER_LIST", (e)=>{
            this.get_data()
        })
    },
}
</script>

<style>
.ivu-table .demo-table-error-row td {
    background-color: #ff6600;
    color:#000;
}
</style>
