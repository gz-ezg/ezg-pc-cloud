import { runInThisContext } from "vm";

<template>
    <div>
        <Card>
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
        </Card>

        <Modal
            v-model="itemModalStatus"
            title="账户流水"
            width='850'
            @on-cancel="cancel">
            <Table
                size="small"
                highlight-row
                :columns="columns2"
                :data="tableData2"
                :loading="loading2"
                ref="currentRowTable"
                @on-expand="test"
            ></Table>
            <Page
                size="small"
                show-total
                show-elevator
                :total="pageTotal2"
                :current.sync = "page2"
                @on-change="pageChange2"
            ></Page>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>

<script>
import {DateFormat} from '../../../libs/utils'
import expandRow from './flow-detail.vue'

export default {
    components: { expandRow },
    data () {
        return {
            params: {},
            itemModalStatus: false,
            loading: false,
            page: 1,
            pageSize: 10,
            pageTotal: new Number(),
            currnetRow:{},
            columns1: [
                {
                    title: '序号',
                    key: 'serialNum',
                    minWidth: 100
                },
                {
                    title: '客户',
                    key: 'customer',
                    minWidth: 100
                },
                {
                    title: '联系方式',
                    key: 'tel',
                    minWidth: 150
                },
                {
                    title: '账户余额',
                    key: 'account_amount',
                    minWidth: 100
                },
                {
                    title: '冻结余额',
                    key: 'lock_amount',
                    minWidth: 100
                },
                {
                    title: '操作',
                    key: 'action',
                    aligin: 'center',
                    minWidth: 150,
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
                    type: 'expand',
                    render: (h, params) => {
                        console.log(this.tableData2[0].detailData)
                        return h(expandRow, {
                            props: {
                                row: params.row
                                // row: this.tableData2.detailData
                            }
                        })
                    }
                },
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
            pageTotal2: new Number(),
            detailData:[],
            recordId:''
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
            _self.itemModalStatus = true
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
                        createdate:DateFormat(res.data.data.rows[i].createdate),
                        detailData:[]
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
        },

        
        getFlowDetail() {
            let _self = this
            let url = 'api/customer/account/record/items'
            let config ={
                params: {
                    recordId :_self.recordId
                }
            }

            function success(res){
                console.log(res.data.data.length)
                for(var i=0;i<_self.tableData2.length;i++){
                    _self.tableData2[i].detailData = []
                    if(_self.tableData2[i].id ==_self.recordId){
                        for(var j=0;j<res.data.data.length;j++){
                            _self.tableData2[i].detailData.push({
                                customer_account_record_id:res.data.data[j].customer_account_record_id,
                                id:res.data.data[j].id,
                                item_amount:res.data.data[j].item_amount,
                                item_type:res.data.data[j].item_type,
                                order_id:res.data.data[j].order_id,
                                ordercode:res.data.data[j].ordercode
                            })
                        }
                        return
                    }
                }
                // for(var i=0;i<res.data.data.length;i++){
                //     _self.detailData.push({
                //         customer_account_record_id:res.data.data.customer_account_record_id,
                //         id:res.data.data.id,
                //         item_amount:res.data.data.item_amount,
                //         item_type:res.data.data.item_type,
                //         order_id:res.data.data.order_id,
                //         ordercode:res.data.data
                //     })
                // }
            }

            this.$Get(url,config,success)
        },
        test(a){
            // console.log(a)
            let _self = this
            _self.recordId = a.id
            this.getFlowDetail()
            console.log(this.tableData2)
        }

    },
    mounted() {
        this.getTableData()
    }
}
</script>

<style>

</style>

// table:[
//     {
//         tableDetail:[
//             {
//                 one
//             },
//             {
//                 two
//             }
//         ],
//         id:,

//     },
//     {

//     }
// ]