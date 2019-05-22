<template>
    <div>
        <Card style="min-width:800px">
        <!--    <Row style="margin-bottom:10px">
                <search-model :data="searchData" @search="search"></search-model>
            </Row>-->
            <Row>

                <ButtonGroup>
                    <Button  type="primary"  icon="ios-color-filter-outline" @click="download_excel">导出Excel</Button>
                    <Button  type="primary"  icon="ios-color-filter-outline" @click="openCompanyReceiptItem">企业流水</Button>
                    <Button   type="primary"  icon="ios-color-filter-outline" @click="openPlanReceiptItem">收款流水</Button>
                </ButtonGroup>

            </Row>
            <Row style="margin-top: 10px;">
                <Table
                        :loading="loading"
                        highlight-row
                        size="small"
                        border
                        @on-row-click="select_row"
                        :columns="header"
                        :data="data"></Table>
                <Page
                        size="small"
                        :total="total"
                        show-total
                        show-sizer
                        show-elevator
                        :current.sync="page"
                        @on-change="page_change"
                        @on-page-size-change="page_size_change"
                        style="margin-top: 10px"></Page>
            </Row>
            <company-receipt-item currentRow:="currentRow"></company-receipt-item>
            <plan-receipt-item currentRow:="currentRow"></plan-receipt-item>
        </Card>

    </div>
</template>

<script>
import companyReceiptItem from  './company_receipt_item.vue'
import planReceiptItem from  './plan_receipt_item.vue'
    export default {

        components:{
            companyReceiptItem,
            planReceiptItem
        },
        data(){
            return {
                order:'finish_date',
                currentRow: {},
                loading: true,
                page: 1,
                pageSize: 10,
                total: 0,
                data:[],
                header: [
                    {
                        title: "企业名称",
                        key: 'companyname',
                        width: 90
                    },
                    {
                        title: "项目名称",
                        key: 'alisname',
                        minWidth: 180
                    },
                    {
                        title: "申报时间",
                        key: "finish_date",
                        minWidth: 180
                    },
                    {
                        title: "定额金额",
                        key: 'paynumber',
                        minWidth: 120
                    },
                    {
                        title: "收款比例",
                        key: "receipt_proportion",
                        minWidth: 250
                    },
                    {
                        title: '申报结果',
                        key: 'finish_status',
                        minWidth: 90
                    },{
                        title: '预估企业金额',
                        key: 'predict_receipt',
                        minWidth: 90
                    },{
                        title: '回款分期',
                        key: 'period_num',
                        minWidth: 90
                    },{
                        title: '总金额',
                        key: 'predict_receipt',
                        minWidth: 90
                    },{
                        title: '总已收款',
                        key: 'realnumber',
                        minWidth: 90
                    },{
                        title: '截止档期应收款',
                        key: 'current_receipt',
                        minWidth: 90
                    },{
                        title: '总待收款',
                        key: 'neednumber',
                        minWidth: 90
                    }
                ]
            }
        },
        methods:{
            get_data(){
                var _self = this

                var url = 'api/order/work/order/plan/receipt/list'
                var config = {
                    params:{
                        order:_self.order,
                        page:_self.page,
                        pageSize:_self.pageSize

                    }
                }

                _self.$http.get(url,config).then(function(res){

                    _self.data = res.data.data.rows
                    _self.total = res.data.data.total
                    _self.loading = false;

                })

            },
            page_size_change(e){
                this.pageSize = e
                this.get_data()
            },
            page_change(e){
                this.page = e
                this.get_data()
            },
            select_row(e){
                this.currentRow = e;
            },
            openCompanyReceiptItem(){
                var _self = this
                if(!this.currentRow.work_order_id){
                    this.$Message.warning("请选中一行后操作");
                    return;
                }

                this.$bus.emit("openCompanyReceiptItem",{"currentRow":_self.currentRow});
            },
            openPlanReceiptItem(){
                var _self = this
                if(!this.currentRow.work_order_id){
                    this.$Message.warning("请选中一行后操作");
                    return;
                }

                if(!this.currentRow.balance_id){
                    this.$Message.warning("未发现余款数据");
                    return;
                }

                this.$bus.emit("openPlanReceiptItem",{"currentRow":_self.currentRow});
            },
            download_excel(){
                let field = [
                    {field:'companyname',title:'企业名称'},
                    {field:'alisname',title:'项目名称'},
                    {field:'finish_date',title:'申报时间'},
                    {field:'paynumber',title:'定额金额'},
                    {field:'receipt_proportion',title:'收款比例'},
                    {field:'finish_status',title:'申报结果'},
                    {field:'predict_receipt',title:'预估企业金额'},
                    {field:'period_num',title:'回款分期'},
                    {field:'predict_receipt',title:'总金额'},
                    {field:'realnumber',title:'总已收款'},
                    {field:'current_receipt',title:'截止档期应收款'},
                    {field:'neednumber',title:'总待收款'}
                ]
                let _self = this
                let url = 'api/order/work/order/plan/receipt/list'
                let config = {

                        order:_self.order,
                        page:'1',
                        pageSize:'1000000' ,
                        export: 'Y',
                        exportField: encodeURI(JSON.stringify(field))

                }
                let toExcel = this.$MergeURL(url, config)
                window.open(toExcel)
            }
        },
        created(){
            this.get_data()

        }
    }
</script>
