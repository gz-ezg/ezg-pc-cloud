<template>
    <div>
        <Card style="min-width:800px">
        <!--    <Row style="margin-bottom:10px">
                <search-model :data="searchData" @search="search"></search-model>
            </Row>-->
        <Row style="margin-bottom:10px">
            <Collapse v-model="search_model">
                <Panel name="1">
                    <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>筛选
                    <div slot="content" @keydown.enter="search">
                    <Form ref="formInline" :model="formInline" :label-width="100">
                        <Row :gutter="16">
                            <Col span="8">
                                <FormItem prop="companyname" label="企业名称：">
                                    <Input size="small"  type="text" v-model="formInline.companyname" placeholder="">
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem prop="alisname" label="项目名称：">
                                    <Input size="small"  type="text" v-model="formInline.alisname" placeholder="">
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="8">  
                                <FormItem prop="date" label="申报时间：">
                                    <DatePicker transfer type="daterange" placement="bottom-end" v-model="formInline.date" style="width:100%" size="small"></DatePicker>
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem>
                        <Button type="primary" @click="search">搜索</Button>
                        <Button type="ghost" style="margin-left:20px" @click="handleReset">重置</Button>
                        </FormItem>
                    </Form>
                    </div>
                </Panel>
            </Collapse>
      </Row>
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
import { DateFormat } from '../../../libs/utils.js'
    export default {
        props:["finish_flag"],
        components:{
            companyReceiptItem,
            planReceiptItem
        },
        data(){
            return {
                search_model: '',
                order:'finish_date',
                currentRow: {},
                formInline:{
                    companyname:'',
                    alisname:'',
                    date: '',
                },
                loading: true,
                page: 1,
                pageSize: 10,
                total: 0,
                data:[],
                header: [
                    {
                        title: "企业名称",
                        key: 'companyname',
                        width: 180
                    },
                    {
                        title: "项目名称",
                        key: 'alisname',
                        minWidth: 140
                    },
                    {
                        title: "申报时间",
                        key: "finish_date",
                        minWidth: 140
                    },
                    {
                        title: "定额金额",
                        key: 'paynumber',
                        minWidth: 100
                    },
                    {
                        title: "收款比例",
                        key: "receipt_proportion",
                        minWidth: 100
                    },
                    {
                        title: '申报结果',
                        key: 'finish_status',
                        minWidth: 90
                    },{
                        title: '预估企业金额',
                        key: 'predicet_receipt',
                        minWidth: 90
                    },{
                        title: '回款分期',
                        key: 'period_num',
                        minWidth: 90
                    },{
                        title: '总金额',
                        key: 'all_amount',
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
                _self.loading = true;
                var url = 'api/order/work/order/plan/receipt/list'
                var config = {
                    params:{
                        order:_self.order,
                        page:_self.page,
                        pageSize:_self.pageSize,
                        finish_flag:_self.finish_flag,
                        companyname:_self.formInline.companyname,
                        alisname:_self.formInline.alisname,
                        startDate:DateFormat(_self.formInline.date[0]),
                        endDate:DateFormat(_self.formInline.date[1]),
                    }
                }

                _self.$http.get(url,config).then(function(res){

                    _self.data = res.data.data.rows
                    _self.total = res.data.data.total
                    _self.loading = false;
                    for(let i = 0; i < _self.data.length; i++){
                        if(_self.data[i].finish_status =="Y"){
                            _self.data[i].finish_status = "通过"
                        }else{
                            _self.data[i].finish_status = "未通过"
                        }
                    }

                })

            },
            search(){
                this.page = 1
                this.get_data()
            },
            handleReset(){
                this.$refs["formInline"].resetFields()
                this.get_data()
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
                    {field:'predicet_receipt',title:'预估企业金额'},
                    {field:'period_num',title:'回款分期'},
                    {field:'all_amount',title:'总金额'},
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
