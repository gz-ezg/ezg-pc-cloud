<template>
    <div>
        <Card title="产品数据分析">
            <Row :gutter="16" type="flex" justify="space-around">
                <Col span="3">
                    <Select v-model="customersource" size="small" @on-change="customersourceChange" placeholder="客户来源" >
                        <Option v-for="item in allCustomersource"  :key="item.id" :value=item.typecode>{{item.typename}}</Option>
                    </Select>
                </Col>
                <Col span="6">
                    <DatePicker type="daterange"  v-model="dateRange" placement="bottom" placeholder="订单创建开始时间-订单创建结束时间" style="width:100%" size="small" @on-change="date_change" transfer></DatePicker>
                </Col>
                <Col span="6">
                    <DatePicker type="daterange" v-model="dateRange1" placement="bottom" placeholder="缴费开始时间-缴费结束时间" style="width:100%" size="small" @on-change="date_change1" transfer></DatePicker>
                </Col>

                <Col span="3">
                    <Select v-model="deff" size="small" @on-change="getAnalysisDataMethod()" placeholder="是否优惠">
                        <Option value="0">是</Option>
                        <Option value="1">否</Option>
                    </Select>
                </Col>
            </Row>
            <Row :gutter="16" style = "margin-top:10px">
                <Table
                        :columns = "historyHeader"
                        :data = "historyData"
                        :loading = "tableLoading"
                >
                </Table>
                <Page
                        size="small"
                        :total="pageTotal"
                        show-total
                        show-elevator
                        show-sizer
                        :current.sync = "page"
                        @on-change = "pageChange"
                        @on-page-size-change="page_size_change"
                        style="margin-top: 10px"></Page>
            </Row>
            <Row>
                <div style="text-align: center;margin-top: 20px">
                <span style="display: inline-block;margin-left: 15px"><h3>客户总数：{{customerCount}}个</h3></span>
                <span style="display: inline-block;margin-left: 15px"><h3>企业总数：{{companycount}}个</h3></span>
                <span style="display: inline-block;margin-left: 15px"><h3>总金额：{{totalamount}}元</h3></span>
                </div>
            </Row>
        </Card>
    </div>
</template>

<script>

    import {DateFormat2} from "../../../../libs/utils";

    export default {
        name: "historyData",
        data(){
            return{
                dateRange:[],
                dateRange1:[],
                tableLoading:false,
                historyHeader: [
                    {
                        title: "订单号",
                        key: "ordercode",
                        width: 130,
                        align: 'center'
                    },
                    {
                        title: "公司名称",
                        key: "CompanyName",
                        width: 220,
                        align: 'center'
                    },
                    {
                        title: "客户名称",
                        key: "NAME",
                        width: 120,
                        align: 'center'
                    },
                    {
                        title: "客户来源",
                        key: "customersourceName",
                        width: 120,
                        align: 'center'
                    },
                    {
                        title: "产品名称",
                        key: "skuname",
                        width: 180,
                        align: 'center'
                    },
                    {
                        title: "订单金额",
                        key: "realnumber",
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: "订单创建时间",
                        key: "createdate",
                        width: 150,
                        align: 'center'
                    },
                    {
                        title: "缴费时间",
                        key: "payTime",
                        width: 150,
                        align: 'center'
                    },
                    {
                        title: "是否优惠",
                        key: "changeDeff",
                        width: 80,
                        align: 'center'
                    },
            ],
                historyData:[],
                pageTotal : new Number(),
                page : 1,
                pageSize : 10,
                productId : 0,
                deff :  null,
                customersource : null,
                allCustomersource:[],
                customerCount : 0,
                companycount : 0,
                totalamount : 0
            }
        },
        methods:{
            date_change(e){
                this.dateRange[0]=e[0]
                this.dateRange[1]=e[1]
                this.getAnalysisData(this.$route)
                this.getAnalysisDataCount(this.$route)
            },
            date_change1(e){
                console.log(e)
                this.dateRange1[0]=e[0]
                this.dateRange1[1]=e[1]
                this.getAnalysisData(this.$route)
                this.getAnalysisDataCount(this.$route)
            },
            customersourceChange(){
                this.getAnalysisData(this.$route)
                this.getAnalysisDataCount(this.$route)
            },
            pageChange(e){
                this.page = e
                this.getAnalysisData(this.$route)
            },
            page_size_change(e){
                this.pageSize = e
                this.page = 1
                this.getAnalysisData(this.$route)
            },
            getAnalysisDataMethod(){
                this.getAnalysisData(this.$route)
            },
            getAnalysisData(to){
                if (to.query.id || to.query.skuid) {
                    let _self = this
                    _self.tableLoading = true
                    let url = `api/product/analysis/productAnalysisList`

                    let config = {
                        params: {
                            productId: _self.$route.query.id,
                            skuId:_self.$route.query.skuid,
                            customersource : _self.customersource,
                            createBegin: DateFormat2(_self.dateRange[0]),
                            createEnd: DateFormat2(_self.dateRange[1]),
                            deff: _self.deff,
                            page: _self.page,
                            pageSize: _self.pageSize,
                            payBegin: DateFormat2(_self.dateRange1[0]),
                            payEnd: DateFormat2(_self.dateRange1[1])
                        }
                    }

                    function success(res) {
                        _self.pageTotal = res.data.data.total
                        _self.historyData = res.data.data.rows
                        for(let i = 0;i<_self.historyData.length;i++){
                            if(_self.historyData[i].customersource){
                                _self.historyData[i].customersourceName = _self.customersource_Map.get(_self.historyData[i].customersource)
                            }

                            if(_self.historyData[i].deff){
                                if (_self.historyData[i].deff===0) {
                                    _self.historyData[i].changeDeff ="是"
                                } else if (_self.historyData[i].deff===1){
                                    _self.historyData[i].changeDeff = "否"
                                }
                            }

                        }
                        _self.tableLoading = false
                    }

                    this.$Get(url, config, success)
                } else {

                }
            },
            getDataCenter(){
                let _self = this
                let config = "cluesources"

                function success(res){
                    _self.customersource = res.data.data.cluesources
                    _self.customersource_Map = _self.$array2map(_self.customersource)
                }

                this.$GetDataCenter(config, success)
            },
            get_all_customersource(){
                let _self = this
                let url = `api/system/tsType/queryTsTypeByGroupCodes`
                let config = {
                    params:{
                        groupCodes:"cluesources"
                    }
                }

                function success(res){
                    _self.allCustomersource = res.data.data.cluesources
                    console.log(_self.allCustomersource)
                    // console.log(_self.allSaler)
                }

                this.$Get(url, config, success)
            },
            getAnalysisDataCount(to){
                if (to.query.id || to.query.skuid) {
                    let _self = this
                    _self.tableLoading = true
                    let url = `api/product/analysis/productAnalysisCount`

                    let config = {
                        params: {
                            skuId : _self.$route.query.skuid,
                            productId: _self.$route.query.id,
                            customersource:_self.customersource,
                            createBegin: DateFormat2(_self.dateRange[0]),
                            createEnd: DateFormat2(_self.dateRange[1]),
                            deff: _self.deff,
                            payBegin: DateFormat2(_self.dateRange1[0]),
                            payEnd: DateFormat2(_self.dateRange1[1])
                        }
                    }

                    function success(res) {
                        _self.customerCount = res.data.data.customer
                        _self.companycount = res.data.data.company
                        _self.totalamount = res.data.data.money
                        // console.log(_self.totalamount)
                        _self.tableLoading = false
                    }

                    this.$Get(url, config, success)
                } else {

                }
            }
        },
        watch:{
            '$route'(to, from){
                if(to){
                    this.getDataCenter()
                    this.get_all_customersource()
                    this.getAnalysisData(to)
                    this.getAnalysisDataCount(to)
                }
            }
        },
        created() {
            this.getDataCenter()
            this.get_all_customersource()
            this.getAnalysisData(this.$route)
            this.getAnalysisDataCount(this.$route)
        }
    }
</script>

<style>

</style>