<template>
    <Card>
        <Row style="margin-bottom:20px;">
            <Collapse v-model="search_model">
                <Panel name="1">
                    <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                    筛选
                    <div slot="content" @keydown.enter="Search" style="padding-bottom:30px;">
                        <Form ref="SearchValidate" :model="SearchValidate" :label-width="130" style="margin-top: 15px">
                            <Row :gutter="8" style="height:56px">
                                <Col span="8">
                                    <FormItem label="企业名称：" prop="CompanyName">
                                        <Input v-model="SearchValidate.CompanyName" size="small"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="服务人员：" prop="server_realname">
                                        <Input v-model="SearchValidate.server_realname" size="small"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="8">
                                    <FormItem label="工作量月份：" prop="work_month">
                                        <DatePicker type="month" size="small" v-model="SearchValidate.work_month"/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <center style="float:right">
                                <FormItem>
                                    <Button type="primary" @click="Search">搜索</Button>
                                    <ButtonGroup>
                <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
            </ButtonGroup>
                                </FormItem>
                            </center>
                        </Form>
                    </div>
                </Panel>
            </Collapse>
        </Row>
        <Row>
           
        </Row>
        <Row style="margin-top: 10px;">
            <Table
                    @on-current-change="selectRow"
                    :loading="loading"
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="data"
            ></Table>
            <Page
                    size="small"
                    :total="pageTotal"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="pageChange"
                    @on-page-size-change="pageSizeChange"
                    :current.sync="page"
                    placement="top"
                    style="margin-top: 10px"
            ></Page>
        </Row>
    </Card>
</template>

<script>
    import {DateFormatYearMonth,DateFormatYearMonth3} from "../../../../libs/utils";

    export default {
        name: "index",
        data(){
            return{
                search_model: '1',
                loading: false,
                pageTotal: 0,
                page: 1,
                pageSize: 10,
                current_row:"",
                period:"",
                cservicest:[],
                cservicest_map:new Map(),
                SearchValidate: {
                    CompanyName: '',
                    server_realname: '',
                    work_month: ''
                },
                data:[],
                header: [
                    {
                        title: '服务状态',
                        key: 'service_status',
                        minWidth: 40,
                        render:(h,params)=>{
                            let _self = this
                            return h('div',{},_self.cservicest_map.get(params.row.service_status))
                        }
                    },
                    {
                        title: '企业',
                        key: 'companyname',
                        minWidth: 200
                    },
                    {
                        title: '产品名称',
                        key: 'product',
                        minWidth: 80
                    },
                    {
                        title: '产品详情',
                        key: 'skuname',
                        minWidth: 120
                    },
                    {
                        title: '开始税期',
                        key: 'begin_period',
                        minWidth: 40
                    },
                    {
                        title: '结束税期',
                        key: 'end_period',
                        minWidth: 40
                    },
                    {
                        title: '会计',
                        key: 'cmsServername',
                        minWidth: 40
                    },
                    {
                        title: '单价',
                        key: 'unit_price',
                        minWidth: 40
                    },
                ]
            }
        },
        methods:{
            selectRow(e) {
                this.current_row = e;
            },
            pageChange(a) {
                let _self = this;
                _self.page = a;
                _self.get_data()
            },
            pageSizeChange(a) {
                let _self = this;
                _self.pageSize = a;
                _self.get_data()
            },
            Search() {
                this.page = 1;
                this.get_data()
            },
            handleReset() {
                this.SearchValidate.CompanyName = '';
                this.SearchValidate.server_realname = '';
                this.SearchValidate.work_month = '';
                this.Search();
            },
            get_data(){
                let _self = this;
                let url = 'api/order/accountPerformanceList';
                _self.loading = true
                let config = {
                    params:{
                        page:_self.page,
                        pageSize:_self.pageSize,
                        companyName:_self.SearchValidate.CompanyName,
                        serverName:_self.SearchValidate.server_realname,
                        perforanceMonth:DateFormatYearMonth(_self.SearchValidate.work_month),
                        serviceType:'dljz',
                        period:'',
                    }
                }
                function success(res) {
                    _self.pageTotal = res.data.data.total
                    _self.data = res.data.data.rows
                    _self.loading = false
                }

                this.$Get(url, config, success);
            },
            get_data_center() {
                let _self = this
                return new Promise((resolve, reject) => {
                    let _self = this
                    let params =
                        'cservicest'

                    function success(res) {
                        _self.cservicest = res.data.data.cservicest
                        _self.cservicest_map = _self.$array2map(_self.cservicest)
                        resolve()
                    }
                    this.$GetDataCenter(params, success)
                })
            },
            downloadExcel(){
                let field = [
                    {
                        field: 'service_status',
                        title: '服务状态',
                        format:'cservicest'
                    },
                    {
                        field: 'companyname',
                        title: '企业'
                    },
                    {
                        field: 'product',
                        title: '产品名称'
                    },
                    {
                        field: 'skuname',
                        title: '产品详情'
                    },
                    {
                        field: 'begin_period',
                        title: '开始税期'
                    },
                    {
                        field: 'end_period',
                        title: '结束税期'
                    },
                    {
                        field: 'cmsServername',
                        title: '会计'
                    },
                    {
                        field: 'unit_price',
                        title: '单价'
                    }
                ];
                let _self = this;
                let url = `api/order/accountPerformanceList`;
                let config = {
                    page: '1',
                    pageSize: '100000',
                    companyName:_self.SearchValidate.CompanyName,
                    serverName:_self.SearchValidate.server_realname,
                    perforanceMonth:DateFormatYearMonth(_self.SearchValidate.work_month),
                    serviceType:'dljz',
                    period:'',
                    export: 'Y',
                    exportField: encodeURI(JSON.stringify(field))
                };
                let toExcel = this.$MergeURL(url, config);
                window.open(toExcel);
            },
        },
        created() {
            let a = new Date()
            this.SearchValidate.work_month = DateFormatYearMonth3(a)
            this.get_data()
            this.get_data_center()
        }
    }
</script>

<style>

</style>