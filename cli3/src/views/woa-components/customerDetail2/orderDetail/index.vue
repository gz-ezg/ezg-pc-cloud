<template>
    <div>
        <!-- <Button name="marketingManagement_index_orderlist_add" type="ghost" shape="circle" icon="plus" @click="setVal()" v-permission="['marketingM.order.add']">新增</Button> -->
        <Button name="marketingManagement_index_orderlist_check" type="primary" shape="circle" icon="ios-search-strong" @click="open_show_order">查看</Button>
        <!-- <Button name="marketingManagement_index_orderlist_edit" type="ghost" shape="circle" icon="edit" @click="orderEdit" v-permission="['marketingM.order.edit']">编辑</Button> -->
        <!-- <Button name="marketingManagement_index_orderlist_money" type="ghost" shape="circle" icon="trash-b" @click="add_money()" v-permission="['marketingM.order.pay']">补款</Button> -->
        <!-- <Button type="ghost" shape="circle" icon="trash-b" @click="money_detail()">补款明细</Button> -->
        <!-- <Button name="marketingManagement_index_orderlist_resubmit" type="ghost" shape="circle" icon="ios-redo" @click="reApplyProcess()" v-permission="['marketingM.order.re']">重新提交</Button> -->
        <Table
            border
            highlight-row
            size="small"
		    :loading="loading"
            :row-class-name="rowClassName"
            @on-row-dblclick="db_click"
            @on-row-click="select_row"
            :columns="header"
            :data="data"
            style="margin-top: 15px"
        ></Table>
        <Page
            :current.sync="page"
            size="small"
            :total="total"
            show-total
            show-elevator
            @on-change="pageChange"
            style="margin-top: 10px"></Page>
        <order-detail :payDirs="payDirs"></order-detail>
    </div>
</template>

<script>
import orderDetail from './orderDetail'
export default {
    components:{
        orderDetail
    },
    props: {
        customer: {
            type: [Array, Object, String]
        },
        cluesources: {
            type: Array
        }
    },
    data(){
        return {
            loading: false,
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
                    // sortable: "custom"                                                
                },
                {
                    title: '缴费渠道',
                    key: 'base_paydir',
                    minWidth: 140,
                    // sortable: "custom"                                                
                },
                {
                    title: '订单价格',
                    key: 'paynumber',
                    minWidth: 120,  
                    // sortable: "custom"                                            
                },
                {
                    title: '已付款',
                    key: 'realnumber',
                    minWidth: 100,
                    // sortable: "custom"                                                                                            
                },
                {
                    title: '创建时间',
                    key: 'base_createdate',
                    minWidth: 120,
                    // sortable: "custom"                                                                
                },
                {
                    title: '缴费日期',
                    key:'payTime',
                    minWidth: 120,
                    // sortable: "custom"
                },
                {
                    title: "上传合同",
                    key: "contract_flag",
                    minWidth: 120,
                    // sortable: "custom"
                },
                {
                    title: '操作',
                    key: 'action',
                    fixed: 'right',
                    minWidth: 120,
                    render: (h, params) => {
                        let _self = this
                        if(params.index != this.pageSize){
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
                }
            ],
            data: [],
            total: 0,
            page: 1,
            pageSize: 10,
            payDirs: [],
            payDirs_map: new Map(),
            order_contract_flag: [],
            order_contract_flag_map: new Map(),
            selectRow: ""
        }
    },
    methods: {
        get_data(e){
            let _self = this
            let url = `api/order/list`
            _self.loading = true
            let config = {
                params: {
                    sortField:_self.sortField,
                    order:_self.order,
                    page:_self.page,
                    pageSize:_self.pageSize,
                    customerId: _self.customer.ID,
                    sortField: "id",
                    order: "desc"
                }
            }

            function success(res){
                _self.data = res.data.data.rows
                _self.total = res.data.data.total
                for(let i = 0; i < _self.data.length; i++){
                    _self.data[i].base_paydir = _self.payDirs_map.get(_self.data[i].base_paydir)
                    // _self.data[i].customersource = _self.cluesources_map.get(_self.data[i].customersource)
                    _self.data[i].contract_flag = _self.order_contract_flag_map.get(_self.data[i].contract_flag)
                    if(_self.data[i].base_createdate){
                        _self.data[i].base_createdate = _self.data[i].base_createdate.slice(0,10)
                    }
                }
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        pageChange(e){
            this.page = e
            this.get_data()
        },
        rowClassName(row, index) {
            let _self = this
            if (row.ProcessType == "调整订单" && row.id != _self.selectRow.id) {
                return 'demo-table-error-row';
            }
        },
        get_data_center(){
            let _self = this
            return new Promise((resolve, reject)=>{
                let params = "payDirs,order_contract_flag"

                function success(res){
                    _self.payDirs = res.data.data.payDirs
                    _self.order_contract_flag = res.data.data.order_contract_flag
                    _self.payDirs_map = _self.$array2map(_self.payDirs)
                    _self.order_contract_flag_map = _self.$array2map(_self.order_contract_flag)
                    resolve()
                }

                this.$GetDataCenter(params, success)
            })
        },
        select_row(e){
            if(e.id){
                this.selectRow = e
            }else{
                this.selectRow = ""
            }
        },
        open_show_order(){
            if(this.selectRow){
                this.$bus.emit("SHOW_CUSTOMER_ORDER_DETAIL", this.selectRow)
            }else{
                this.$Message.warning("请选择需要查看的订单！")
            }
        },
        db_click(e){
            this.$bus.emit("SHOW_CUSTOMER_ORDER_DETAIL", e)
        }
    },
    created(){
        let _self = this
        this.get_data_center().then(()=>{
            _self.get_data(_self.customer.ID)
        })
    }
}
</script>

<style>
.ivu-table .demo-table-error-row td {
    background-color: #ff6600;
    color:#000;
}
</style>
