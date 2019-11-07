<template>
    <Modal
            title="外勤详情"
            v-model="openFieldMission"
            width="1000"
            :mask-closable="false"
    >
        <div>
            <Tabs value="name1">
                <TabPane label="本服务期间" name="name1">
                    <Card>
                        <Row style="margin-bottom:20px">
                            <Collapse v-model="search_model">
                                <Panel name="1">
                                    <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                                    筛选
                                    <div slot="content" @keydown.enter="Search">
                                        <Form ref="SearchValidate" :model="SearchValidate" :label-width="130" style="margin-top: 15px">
                                            <Row :gutter="8" style="height:56px">
                                                <Col span="8">
                                                    <FormItem label="外勤结果：" prop="field_result">
                                                        <Select v-model="SearchValidate.status" size="small" style="width:100%" @on-change="get_data()">
                                                            <Option value="youxiao">有效</Option>
                                                            <Option value="wuxiao">无效</Option>
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                                <Col span="8">
                                                    <FormItem label="外勤类型：" prop="type">
                                                        <Select v-model="SearchValidate.type" size="small" style="width:100%" @on-change="get_data()">
                                                            <Option value="A">A类</Option>
                                                            <Option value="B">B类</Option>
                                                            <Option value="其他">其他</Option>
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                                <Col span="8">
                                                        <FormItem label="创建时间：" prop="paytime">
                                                            <DatePicker transfer type="daterange" placement="bottom-end" v-model="SearchValidate.paytime" style="width:100%" size="small"></DatePicker>
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
                        <Row v-if="show">
                            <div style="margin-bottom: 15px;font-size: 20px;font-weight: bold;">当前服务期间：{{beginPeriod}}税期---{{endPeriod}}税期</div>
                        </Row>
                        <Row>
                            <ButtonGroup>
                                <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
                            </ButtonGroup>
                        </Row>
                        <Row style="margin-top: 10px;">
                            <Table
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
                </TabPane>
                <TabPane label="全部" name="name2">
                    <Card>
                        <Row style="margin-bottom:20px">
                            <Collapse v-model="search_model">
                                <Panel name="1">
                                    <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                                    筛选
                                    <div slot="content" @keydown.enter="Search2">
                                        <Form ref="SearchValidate" :model="SearchValidate2" :label-width="130" style="margin-top: 15px">
                                            <Row :gutter="8" style="height:56px">
                                                <Col span="8">
                                                    <FormItem label="外勤结果：" prop="field_result">
                                                        <Select v-model="SearchValidate2.status" size="small" style="width:100%" @on-change="get_data2()">
                                                            <Option value="youxiao">有效</Option>
                                                            <Option value="wuxiao">无效</Option>
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                                <Col span="8">
                                                    <FormItem label="外勤类型：" prop="type">
                                                        <Select v-model="SearchValidate2.type" size="small" style="width:100%" @on-change="get_data2()">
                                                            <Option value="A">A类</Option>
                                                            <Option value="B">B类</Option>
                                                            <Option value="其他">其他</Option>
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                                <Col span="8">
                                                    <FormItem label="创建时间：" prop="paytime">
                                                        <DatePicker transfer type="daterange" placement="bottom-end" v-model="SearchValidate2.paytime" style="width:100%" size="small"></DatePicker>
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                            <center>
                                                <FormItem>
                                                    <Button type="primary" @click="Search2">搜索</Button>
                                                    <Button type="ghost" @click="handleReset2" style="margin-left: 8px">重置</Button>
                                                </FormItem>
                                            </center>
                                        </Form>
                                    </div>
                                </Panel>
                            </Collapse>
                        </Row>
                        <Row>
                            <ButtonGroup>
                                <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel2">导出Excel</Button>
                            </ButtonGroup>
                        </Row>
                        <Row style="margin-top: 10px;">
                            <Table
                                    :loading="loading2"
                                    ref="selection"
                                    highlight-row
                                    size="small"
                                    :columns="header2"
                                    :data="data2"
                            ></Table>
                            <Page
                                    size="small"
                                    :total="pageTotal2"
                                    show-total
                                    show-sizer
                                    show-elevator
                                    @on-change="pageChange2"
                                    @on-page-size-change="pageSizeChange2"
                                    :current.sync="page2"
                                    placement="top"
                                    style="margin-top: 10px"
                            ></Page>
                        </Row>
                    </Card>
                </TabPane>
            </Tabs>
        </div>
    </Modal>
</template>

<script>
    import {DateFormat} from "../../../../../libs/utils";
    export default {
        name: "index",
        data(){
            return{
                openFieldMission:false,
                loading:false,
                page:1,
                pageSize:10,
                pageTotal:"",
                companyId:"",
                beginPeriod:"",
                endPeriod:"",
                show:"",
                finishStatus:[],
                finish_status_map:new Map(),
                SearchValidate: {
                    CompanyName: '',
                    server_realname: '',
                    followby_realname: '',
                    paytime:'',
                    status: '',
                    type: ''
                },
                data:[],
                header: [
                    {
                        title: '公司名称',
                        key: 'CompanyName',
                        minWidth: 250
                    },
                    {
                        title: '客户名称',
                        key: 'ctName',
                        minWidth: 250
                    },
                    {
                        title: '联系方式',
                        key: 'TEL',
                        minWidth: 250
                    },
                    {
                        title: '部门',
                        key: 'departname',
                        minWidth: 250
                    },
                    {
                        title: '打卡类型',
                        key: 'type',
                        minWidth: 250
                    },
                    {
                        title: '外勤结果',
                        key: 'finish_status',
                        minWidth: 250,
                    },
                    {
                        title: '打卡地址',
                        key: 'end_address',
                        minWidth: 250
                    },
                    {
                        title: '开始打卡时间',
                        key: 'begin_time',
                        minWidth: 250
                    },
                    {
                        title: '离开打卡时间',
                        key: 'end_time',
                        minWidth: 250
                    },
                    {
                        title: '外勤时长',
                        key: 'diff',
                        minWidth: 250
                    },
                    {
                        title: '打卡人',
                        key: 'realname',
                        minWidth: 250
                    },
                ],
                loading2:false,
                page2:1,
                pageSize2:10,
                pageTotal2:"",
                companyId2:"",
                beginPeriod2:"",
                endPeriod2:"",
                show2:"",
                SearchValidate2: {
                    CompanyName: '',
                    server_realname: '',
                    followby_realname: '',
                    paytime:'',
                    status: '',
                    type: ''
                },
                data2:[],
                header2: [
                    {
                        title: '公司名称',
                        key: 'CompanyName',
                        minWidth: 250
                    },
                    {
                        title: '客户名称',
                        key: 'ctName',
                        minWidth: 250
                    },
                    {
                        title: '联系方式',
                        key: 'TEL',
                        minWidth: 250
                    },
                    {
                        title: '部门',
                        key: 'departname',
                        minWidth: 250
                    },
                    {
                        title: '打卡类型',
                        key: 'type',
                        minWidth: 250
                    },
                    {
                        title: '外勤结果',
                        key: 'finish_status',
                        minWidth: 250,
                    },
                    {
                        title: '打卡地址',
                        key: 'end_address',
                        minWidth: 250
                    },
                    {
                        title: '开始打卡时间',
                        key: 'begin_time',
                        minWidth: 250
                    },
                    {
                        title: '离开打卡时间',
                        key: 'end_time',
                        minWidth: 250
                    },
                    {
                        title: '外勤时长',
                        key: 'diff',
                        minWidth: 250
                    },
                    {
                        title: '打卡人',
                        key: 'realname',
                        minWidth: 250
                    },
                ]
            }
        },
        methods:{
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
            Search(){
                this.get_data()
            },
            handleReset(){
                this.SearchValidate.status = ""
                this.SearchValidate.type = ""
                this.SearchValidate.paytime = ""
                this.get_data()
            },
            downloadExcel(){
                let field = [
                    {
                        field: 'CompanyName',
                        title: '公司名称',
                    },
                    {
                        field: 'ctName',
                        title: '客户名称'
                    },
                    {
                        field: 'TEL',
                        title: '联系方式'
                    },
                    {
                        field: 'departname',
                        title: '部门'
                    },
                    {
                        field: 'type',
                        title: '打卡类型'
                    },
                    {
                        field: 'finish_status',
                        title: '外勤结果',
                        format:"finishStatus"
                    },
                    {
                        field: 'end_address',
                        title: '打卡地址'
                    },
                    {
                        field: 'begin_time',
                        title: '开始打卡时间'
                    },
                    {
                        field: 'end_time',
                        title: '离开打卡时间'
                    },
                    {
                        field: 'diff',
                        title: '外勤时长'
                    },
                    {
                        field: 'realname',
                        title: '打卡人'
                    }
                ];
                let _self = this;
                let url = `api/order/cycle/service/dljz/legworkPeriodDetailByCompanyId`;
                let config = {
                    page: '1',
                    pageSize: '100000',
                    sortField: 'begin_time',
                    companyId:_self.companyId,
                    type:_self.SearchValidate.type,
                    status:_self.SearchValidate.status,
                    beginDate:DateFormat(_self.SearchValidate.paytime[0]),
                    endDate:DateFormat(_self.SearchValidate.paytime[1]),
                    export: 'Y',
                    exportField: encodeURI(JSON.stringify(field))
                };
                let toExcel = this.$MergeURL(url, config);
                window.open(toExcel);
            },
            get_data(){
                let _self = this;
                _self.loading = true;
                let url = `api/order/cycle/service/dljz/legworkPeriodDetailByCompanyId`;
                let config = {
                    params:{
                        companyId:_self.companyId,
                        page:_self.page,
                        pageSize:_self.pageSize,
                        type:_self.SearchValidate.type,
                        status:_self.SearchValidate.status,
                        beginDate:DateFormat(_self.SearchValidate.paytime[0]),
                        endDate:DateFormat(_self.SearchValidate.paytime[1])
                    }
                }
                function success(res){
                    if (res.data.data==null || res.data.data==""){
                        _self.data = []
                        _self.show =false
                        _self.loading = false
                    } else {
                        _self.pageTotal = res.data.data.total
                        _self.data = res.data.data.rows
                        _self.beginPeriod = res.data.data.beginPeriod
                        _self.endPeriod = res.data.data.endPeriod
                        _self.show = true

                        _self.loading = false
                    }

                }

                function fail(err){

                }
                this.$Get(url, config, success, fail)
            },
            pageChange2(a) {
                let _self = this;
                _self.page2 = a;
                _self.get_data2()
            },
            pageSizeChange2(a) {
                let _self = this;
                _self.pageSize2 = a;
                _self.get_data2()
            },
            Search2(){
                this.get_data2()
            },
            handleReset2(){
                this.SearchValidate2.status = ""
                this.SearchValidate2.type = ""
                this.SearchValidate2.paytime = ""
                this.get_data2()
            },
            downloadExcel2(){
                let field = [
                    {
                        field: 'CompanyName',
                        title: '公司名称',
                    },
                    {
                        field: 'ctName',
                        title: '客户名称'
                    },
                    {
                        field: 'TEL',
                        title: '联系方式'
                    },
                    {
                        field: 'departname',
                        title: '部门'
                    },
                    {
                        field: 'type',
                        title: '打卡类型'
                    },
                    {
                        field: 'finish_status',
                        title: '外勤结果',
                        format:'finishStatus'
                    },
                    {
                        field: 'end_address',
                        title: '打卡地址'
                    },
                    {
                        field: 'begin_time',
                        title: '开始打卡时间'
                    },
                    {
                        field: 'end_time',
                        title: '离开打卡时间'
                    },
                    {
                        field: 'diff',
                        title: '外勤时长'
                    },
                    {
                        field: 'realname',
                        title: '打卡人'
                    }
                ];
                let _self = this;
                let url = `api/order/cycle/service/dljz/legworkAllDetailByCompanyId`;
                let config = {
                    page: '1',
                    pageSize: '100000',
                    sortField: 'begin_time',
                    companyId:_self.companyId2,
                    type:_self.SearchValidate2.type,
                    status:_self.SearchValidate2.status,
                    beginDate:DateFormat(_self.SearchValidate2.paytime[0]),
                    endDate:DateFormat(_self.SearchValidate2.paytime[1]),
                    export: 'Y',
                    exportField: encodeURI(JSON.stringify(field))
                };
                let toExcel = this.$MergeURL(url, config);
                window.open(toExcel);
            },
            get_data2(){
                let _self = this;
                _self.loading2 = true;
                let url = `api/order/cycle/service/dljz/legworkAllDetailByCompanyId`;
                let config = {
                    params:{
                        companyId:_self.companyId2,
                        page:_self.page2,
                        pageSize:_self.pageSize2,
                        type:_self.SearchValidate2.type,
                        status:_self.SearchValidate2.status,
                        beginDate:DateFormat(_self.SearchValidate2.paytime[0]),
                        endDate:DateFormat(_self.SearchValidate2.paytime[1])
                    }
                }
                function success(res){
                    if (res.data.data==null || res.data.data==""){
                        _self.data2 = []
                        _self.show2 =false
                        _self.loading2 = false
                    } else {
                        _self.pageTotal2 = res.data.data.total
                        _self.data2 = res.data.data.rows
                        for (let i=0;i<_self.data2.length;i++){
                            _self.data2[i].finish_status = _self.finish_status_map.get(_self.data2[i].finish_status)
                        }
                        _self.loading2 = false
                    }

                }

                function fail(err){

                }
                this.$Get(url, config, success, fail)
            },
            get_data_center() {
                let params = "legwork_finish_status"

                let _self = this

                function success(res) {
                    _self.finishStatus = res.data.data.legwork_finish_status
                    _self.finish_status_map = _self.$array2map(_self.finishStatus)
                }

                this.$GetDataCenter(params, success)
            }
        },
        created() {
            this.$bus.off("OPEN_FIELD_DETAIL",true)
            this.$bus.on("OPEN_FIELD_DETAIL",(e)=>{
                this.openFieldMission=true
                this.companyId = e.company_id
                this.companyId2 = e.company_id
                this.get_data()
                this.get_data2()
                this.get_data_center()
            })
        }
    }
</script>

<style>

</style>