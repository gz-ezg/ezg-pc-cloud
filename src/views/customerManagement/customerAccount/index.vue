<template>
    <div>
        <Table 
            size="small"
            highlight-row
            :columns="columns1" 
            :data="tableData"
            :loading="loading">
        </Table>
        <Page
            size="small"
            show-total
            show-sizer
            show-elevator
            :total="pageTotal"
            :current.sync = "page"
            @on-change="pageChange"
            @on-page-size-change="pageSizeChange"
        >
        </Page>

        <Modal
            v-model="modal1"
            title="账户流水"
            width='850'
            @on-ok="ok"
            @on-cancel="cancel">
            <Table
                size="small"
                :columns="columns2"
                :data="tableData2"
                :loading="loading2"
            ></Table>
            <Page
                size="small"
                show-total
                show-elevator
                :total="pageTotal2"
                :current.sync = "page2"
                @on-change="pageChange2"
            ></Page>
        </Modal>
    </div>
</template>

<script>
import {DateFormat} from '../../../libs/utils'

export default {
    data () {
        return {
            params: {},
            modal1: false,
            loading: false,
            page: 1,
            pageSize: 10,
            pageTotal: new Number(),
            currnetRow:{},
            columns1: [
                {
                    title: '序号',
                    key: 'serialNum'
                },
                {
                    title: '客户',
                    key: 'customer'
                },
                {
                    title: '联系方式',
                    key: 'tel'
                },
                {
                    title: '账户余额',
                    key: 'account_amount'
                },
                {
                    title: '冻结余额',
                    key: 'lock_amount'
                },
                {
                    title: '操作',
                    key: 'action',
                    aligin: 'center',
                    render: (h,params)=> {
                        return h('div',[
                            h('Button',{
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {
                                    
                                },
                                on: {
                                    click: () => {
                                        this.params = params.row
                                        this.flow(params.row)
                                    }
                                }
                            },'流水')
                        ]);
                    }
                }
            ],
            tableData: [],
            searchId: new Number(),
            //流水相关
            loading2: false,
            columns2: [
                {
                    title: '序号',
                    key: 'id',
                    minWidth: 100
                },
                {
                    title: '流水类型',
                    key: 'record_type',
                    minWidth: 100
                },
                {
                    title: '金额',
                    key: 'actual_amount',
                    minWidth: 100
                },
                {
                    title: '归属公司',
                    key: 'companyname',
                    minWidth: 200
                },
                {
                    title: '缴费时间',
                    key: 'actual_date',
                    minWidth: 100
                },
                {
                    title: '流水生成时间',
                    key: 'createdate',
                    minWidth: 100
                },
            ],
            tableData2: [],
            page2: 1,
            pageSize2: 10,
            pageTotal2: new Number()
        }
    },
    methods: {
        // 表格数据请求
        getTableData() {
            let _self = this
            let url = 'api/customer/account/list'
            _self.loading = true
            let config = {
                params:{
                    page:_self.page,
                    pageSize:_self.pageSize
                }
            }

            function success(res){
                console.log(res.data.data)
                _self.pageTotal = res.data.data.total
                for(let i=0;i<res.data.data.rows.length;i++){
                    _self.tableData.push({
                        serialNum: res.data.data.rows[i].id,
                        customer: res.data.data.rows[i].name,
                        tel: res.data.data.rows[i].tel,
                        account_amount: res.data.data.rows[i].account_amount,
                        lock_amount: res.data.data.rows[i].lock_amount
                    })
                }
                _self.loading = false
            }

            this.$Get(url,config,success);
        },

        //改变页码
        pageChange(p){
            this.page = p;
            this.getTableData()
        },

        // 改变每页显示的数据条数
        pageSizeChange(a) {
            let _self = this
            _self.tableData = []
            _self.pageSize = a
            _self.getTableData()
        },

        //查看流水
        flow(a) {
            let _self = this
            _self.currnetRow = a
            _self.searchId = a.serialNum
            _self.modal1 = true
            let url = 'api/customer/account/record/list'
            _self.loading2 = true
            let config = {
                params: {
                    page:_self.page2,
                    pageSize:_self.pageSize2,
                    customer_account_id: a.serialNum?a.serialNum:_self.searchId
                }
            }

            function success(res){
                console.log(res.data.data)
                _self.pageTotal2 = res.data.data.total
                for(let i =0;i<res.data.data.rows.length;i++){
                    _self.tableData2.push({
                        id:res.data.data.rows[i].id,
                        record_type:_self.flowType(res.data.data.rows[i].record_type),
                        actual_amount:res.data.data.rows[i].actual_amount,
                        companyname:res.data.data.rows[i].companyname,
                        actual_date:DateFormat(res.data.data.rows[i].actual_date),
                        createdate:DateFormat(res.data.data.rows[i].createdate)
                    })
                }
                _self.loading2 = false
            }

            this.$Get(url,config,success)
        },

        //流水表单改变页码
        pageChange2(p){
            this.page2 = p;
            this.tableData2 = []
            this.flow(this.params)
        },

        //流水类型判断
        flowType(t) {
            let _self = this
            if(t=='order_add'){
                return '订单下单'
            } else if(t=='order_refund'){
                return '订单退款'
            } else if(t=='use_balance'){
                return '余额使用'
            } else{
                return
            }
        },

        ok () {
            this.tableData2 =[];
            this.page2 =1;
        },
        cancel () {
            this.tableData2 =[];
            this.page2 =1;
        }
    },
    mounted() {
        this.getTableData()
    }
}
</script>

<style>

</style>

