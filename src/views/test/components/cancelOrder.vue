<template>
    <div>
        <Card style="min-width:800px">
        <Row style="margin-bottom:10px">
                <Collapse >
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
                    <Button v-permission="['orderL.detail']" type="primary" icon="information-circled" @click="order_show" name="order_show">查看</Button>
                    <Button v-permission="['orderL.amend']" type="primary" icon="ios-color-filter-outline" @click="refresh" >刷新</Button>
                    <Button v-permission="['orderL.export']" type="primary" icon="ios-color-filter-outline" @click="exportExcel" >导出Excel</Button>
                </ButtonGroup>
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                    :loading="loading"
                    highlight-row
                    size="small"
                    border
                    :columns="header"
                    :data="data"
                    @on-row-click="select_row"
                    @on-row-dblclick="open_order_detail"
                    @on-sort-change="sort"
                ></Table>
                <Page
                    :total='total'
                    size='small'
                    show-total
                    show-sizer
                    show-elevator
                    :current.sync="page"
                    @on-change="pageChange"
                    @on-page-size-change="pageSizeChange"
                    style='margin-top: 10px'
                ></Page>
            </Row>
        </Card>
        <show-cancel-order :payDirs="payDirs"></show-cancel-order>
    </div>
</template>

<script>
import { DateFormat } from '../../../libs/utils.js'
import showCancelOrder from './cancelOrder-detail'

export default {
    name:'cancelOrder_index',
    components:{
        showCancelOrder
    },
    data(){
        return{
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
                frealname: ""
            },
            //列表相关
            loading: false,
            total: 0,
            page: 1,
            pageSize: 10,
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
                }
            ],
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
        //  搜索相关
        Search(){
            this.page = 1
            this.get_data()
        },
        //重置条件
        handleReset(){
            this.$refs["formValidateSearch"].resetFields()
            this.formValidateSearch.date = []
            this.get_data()
        },

        //获取数据字典
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

        //获取订单数据
        get_data(){
            let _self = this
            _self.loading = true
            let url = 'api/order/list'
            let config = {
                params:{
                    page:_self.page,
                    pageSize:_self.pageSize,
                    sortField:_self.sortField,
                    order:_self.order,
                    ordercode:_self.formValidateSearch.ordercode,
                    companyname:_self.formValidateSearch.companyname,
                    customername:_self.formValidateSearch.customername,
                    customertel:_self.formValidateSearch.customertel,
                    crealname:_self.formValidateSearch.crealname,
                    frealname:_self.formValidateSearch.frealname,
                    payDir:_self.formValidateSearch.payDir,
                    bcreatedate:DateFormat(_self.formValidateSearch.date[0]),
                    ecreatedate:DateFormat(_self.formValidateSearch.date[1]),
                    sumField:'paynumber,realnumber,neednumber'
                }
            }

            function success(res){
                console.log(res)
                _self.loading = false
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
            }

            this.$Get(url, config, success)
        },
        
        //改变页码
        pageChange(e){
            this.page = e
            this.get_data()
        },
        //改变每页条数
        pageSizeChange(e){
            this.pageSize = e
            this.get_data()
        },

        //选择某行
        select_row(e){
            console.log(e)
            if(e.id){
                this.selectRow = e
            }else{
                this.selectRow = ""
            }
        },

        //查看订单详情
        order_show(){
            if(this.selectRow){
                this.open_order_detail(this.selectRow)
            }else{
                this.$Message.warning('请先选择一行再进行操作！')
            }
        },

        //双击查看订单
        open_order_detail(e){
            this.$bus.emit("OPEN_ORDERLIST_DETAIL", e.id)
        },

        //刷新
        refresh(){
            this.selectRow =""
            this.get_data()
        },

        //  导出Excel
        exportExcel(){
            let _self = this
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
                {field:'frealname',title:'跟进人'}   
            ]
            let url = 'api/order/list'
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
                export: 'Y',
                exportField: encodeURI(JSON.stringify(field))
            }
            let toExcel = this.$MergeURL(url, config)
            window.open(toExcel)
        },

        //  排序
        sort(e){
            console.log(e)
            this.sortField = e.key
            if(e.order=='normal'){
                this.order = 'desc'
                this.sortField = 'id'
            }else{
                this.order = e.order
            }
            this.get_data()
        }
        
    },
    created(){
        this.get_data_center().then(
            this.get_data()
        )
    }
}
</script>

