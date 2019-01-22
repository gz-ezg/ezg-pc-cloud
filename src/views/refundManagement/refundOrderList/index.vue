<template>
    <div>
        <Card style="min-width:800px">
            <Row style="margin-bottom:10px">
            <search-model :data="searchData" @search="search"></search-model>
        </Row>
        <Row>
            <ButtonGroup>
                <Button v-permission="['orderL.detail']" type="primary" icon="information-circled" @click="order_show" name="order_show">查看</Button>
                <Button v-permission="['orderL.amend']" type="primary" icon="ios-color-filter-outline" @click="get_data">刷新</Button>
                <Button v-permission="['orderL.export']" type="primary" icon="ios-color-filter-outline" @click="downloadExcel">导出Excel</Button>
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
        <!-- <Modal
            v-model="flowImgOpen"
            title="查看流程图"
            width="80%">
            <Spin size="large" fix v-if="imgLoading"></Spin>
            <center>
                <img :src='flowChartImg' width="100%"/>
            </center>
            <div slot="footer"></div>
        </Modal> -->
        <show-order :payDirs="payDirs"></show-order>
    </div>
</template>

<script>
//  查看订单详情
import showOrder from './detail'
import { DateFormat } from '../../../libs/utils.js'
import * as refundApi from './api.js'
import searchModel from '../../woa-components/searchModel/index'

export default {
    name: "refundOrderList_index",
    components:{
        showOrder,
        searchModel
    },
    data(){
        return {
            //  搜索条件
            searchData: [
                {
                    label: "订单号码：",
                    key: "ordercode",
                    type: "input"
                },
                {
                    label: "公司名称：",
                    key: "companyname",
                    type: "input"
                },
                {
                    label: "客户名称：",
                    key: "customername",
                    type: "input"
                },
                {
                    label: "客户电话：",
                    key: "customertel",
                    type: "input"
                },
                {
                    label: "客户类型：",
                    key: "payDir",
                    type: "select",
                    data: []
                },
                {
                    label: "创建时间",
                    key: "createdate",
                    type: "datePicker"
                },
                {
                    label: "创建人：",
                    key: "crealname",
                    type: "input"
                },
                {
                    label: "跟进人：",
                    key: "frealname",
                    type: "input"
                }
            ],
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
                frealname: ""
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
                // ordercode: _self.formValidateSearch.ordercode,
                // companyname:_self.formValidateSearch.companyname,
                // customername:_self.formValidateSearch.customername,
                // customertel:    _self.formValidateSearch.customertel,
                // crealname:    _self.formValidateSearch.crealname,
                // frealname:    _self.formValidateSearch.frealname,
                // payDir:    _self.formValidateSearch.payDir,
                bcreatedate:DateFormat(_self.formValidateSearch.date[0]),
                ecreatedate:DateFormat(_self.formValidateSearch.date[1]),
                export: 'Y',
                deleteflag: 5,
                exportField: encodeURI(JSON.stringify(field))
            }
            Object.assign(config, this.formValidateSearch)
            let toExcel = this.$MergeURL(url, config)
            window.open(toExcel)
        },
        //  搜索相关
        search(e){
            // console.log(e)
            delete e.createdate
            Object.assign(this.formValidateSearch, e)
            this.page = 1
            this.get_data()
        },
        // handleReset(){
        //     this.$refs["formValidateSearch"].resetFields()
        //     this.formValidateSearch.date = []
        //     this.get_data()
        // },
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
        async get_data(){
            let _self = this
            this.loading = true
            let config = {
                params: {
                    sortField:_self.sortField,
                    order:_self.order,
                    page:_self.page,
                    pageSize:_self.pageSize,
                    // ordercode:_self.formValidateSearch.ordercode,
                    // companyname:_self.formValidateSearch.companyname,
                    // customername:_self.formValidateSearch.customername,
                    // customertel:_self.formValidateSearch.customertel,
                    // crealname:_self.formValidateSearch.crealname,
                    // frealname:_self.formValidateSearch.frealname,
                    // payDir:_self.formValidateSearch.payDir,
                    sumField:'paynumber,realnumber,neednumber',
                    bcreatedate:DateFormat(_self.formValidateSearch.date[0]),
                    ecreatedate:DateFormat(_self.formValidateSearch.date[1]),
                    deleteflag:  5
                }
            }

            Object.assign(config.params, this.formValidateSearch)

            try {
                let { rows, total, sum} = await refundApi.orderList(config)
                this.total = total
                this.data = rows.map((item)=>{
                    item.base_paydir = this.payDirs_map.get(item.base_paydir)
                    item.customersource = this.cluesources_map.get(item.customersource)
                    item.contract_flag = this.order_contract_flag_map.get(item.contract_flag)
                    if(item.base_createdate){
                        item.base_createdate = item.base_createdate.slice(0,10)
                    }

                    return item
                })

                this.data.push({
                    base_paydir: '合计',
                    paynumber: sum.paynumber,
                    realnumber: sum.realnumber,
                    neednumber: sum.neednumber,
                })
            } catch (error) {
                console.log(error)
            }

            this.loading = false
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
            if(e.id){
                this.selectRow = e
            }else{
                this.selectRow = ""
            }
        },
        async get_data_center(){
            let _self = this
            let params = "payDirs,cluesources,order_contract_flag"

            try {
                let { payDirs,cluesources,order_contract_flag } = await refundApi.getDictionary(params)
                this.payDirs = payDirs
                //  只能这样赋值给动态数组
                this.searchData[4].data = payDirs
                this.cluesources = cluesources
                this.order_contract_flag = order_contract_flag
                this.payDirs_map = this.$array2map(this.payDirs)
                this.cluesources_map = this.$array2map(this.cluesources)
                this.order_contract_flag_map = this.$array2map(this.order_contract_flag)
            } catch (error) {
                console.log(error)
            }
        },
        //  【双击查看订单】
        open_order_detail(e){
            this.$bus.emit("OPEN_REFUNDED_DETAIL", e.id)
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
        // open_flowChart(){
        //     let _self = this
        //     if(this.selectRow){
        //         this.imgLoading = true
        //         this.flowImgOpen = true
        //         this.flowChartImg = '/api/dataCenter/activiti/getResourceInputStreamObj?bussinessKey=' + this.selectRow.id
        //         setTimeout(()=>{
        //             _self.imgLoading = false
        //         }, 1000)
        //     }else{
        //         this.$Message.warning("请选择一行进行操作！")
        //     }
        // }
    },
    async created() {
        this.loading = true
        await this.get_data_center()
        await this.get_data()
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
