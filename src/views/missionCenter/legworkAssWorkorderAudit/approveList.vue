<template>
    <div>
        <Card style="min-width:800px">
            <Row style="margin-bottom:10px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <div slot="content" @keydown.enter="Search">
                            <Form ref="formValidateSearch" :model="formValidateSearch" :label-width="100">
                                <Row :gutter="24">
                                    <Col span="8">
                                        <FormItem label="公司名称：" prop="companyname">
                                            <Input v-model="formValidateSearch.companyName" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="会计名称：" prop="customername">
                                            <Input v-model="formValidateSearch.creatorName" size="small"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="24">
                                    <Col span="8">
                                        <FormItem label="核实时间：" prop="date">
                                            <DatePicker transfer type="daterange" placement="bottom-end" v-model="formValidateSearch.date" style="width:100%" size="small"></DatePicker>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="创建时间：" prop="paytime">
                                            <DatePicker transfer type="daterange" placement="bottom-end" v-model="formValidateSearch.paytime" style="width:100%" size="small"></DatePicker>
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
            <Row style="margin-top: 10px;">
                <Table
                        :loading="loading"
                        highlight-row
                        size="small"
                        border
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
    </div>
</template>

<script>
    import {DateFormat} from "../../../libs/utils";

    export default {
        name: "unApproveList",
        data(){
            return{
                loading:false,
                total:0,
                page:1,
                data:[],
                selectRow:"",
                taskArea:[],
                taskPlace:[],
                taskArea_map:new Map(),
                taskPlace_map:new Map(),
                search_model: "0",
                formValidateSearch: {
                    ordercode: "",
                    companyName: "",
                    creatorName: "",
                    customertel: "",
                    payDir: "",
                    date: [],
                    crealname: "",
                    frealname: "",
                    paytime: [],
                    customerCreateTime: []
                },
                header:[
                    {
                        title: '企业',
                        key: 'companyname',
                        minWidth: 240,
                    },
                    {
                        title: '工单',
                        key: 'productname',
                        minWidth: 140,
                    },
                    {
                        title: '事由',
                        key: 'apply_content',
                        minWidth: 140,
                    },
                    {
                        title: '区域',
                        key: 'task_area',
                        minWidth: 140,
                    },
                    {
                        title: '地点',
                        key: 'task_place',
                        minWidth: 140,
                    },
                    {
                        title: '会计',
                        key: 'creatorName',
                        minWidth: 140,
                    },
                    {
                        title: '商事',
                        key: 'final_executor_name',
                        minWidth: 140,
                    },
                    {
                        title: '确认',
                        key: 'check_name',
                        minWidth: 140,
                    },
                    {
                        title: '核实备注',
                        key: 'check_memo',
                        minWidth: 140,
                    },
                    {
                        title: '核实状态',
                        key: 'apply_status',
                        minWidth: 140,
                    },
                    {
                        title: '核实时间',
                        key: 'check_date',
                        minWidth: 140,
                    },
                    {
                        title: '预计截止时间',
                        key: 'expect_date',
                        minWidth: 140,
                    },
                    {
                        title: '安排时间',
                        key: 'plan_date',
                        minWidth: 140,
                    },
                ],
            }
        },
        methods:{
            pageChange(e){
                this.page = e
                this.get_data()
            },
            pageSizeChange(e){
                this.pageSize = e
                this.get_data()
            },
            Search(){
                this.page = 1
                this.get_data()
            },
            handleReset(){
                this.$refs["formValidateSearch"].resetFields()
                this.formValidateSearch.date = []
                this.formValidateSearch.companyName=null
                this.formValidateSearch.creatorName = null
                this.formValidateSearch.paytime=[]
                this.get_data()
            },
            get_data(){
                let _self = this
                let url =`api/task/getBusAssApplyList`
                _self.loading = true
                let config = {
                    params: {
                        Audited:"Audited",
                        page:_self.page,
                        pageSize:_self.pageSize,
                        companyName:_self.formValidateSearch.companyName,
                        creatorName:_self.formValidateSearch.creatorName,
                        bcheckDate:DateFormat(_self.formValidateSearch.date[0]),
                        echeckDate:DateFormat(_self.formValidateSearch.date[1]),
                        bcreateDate:DateFormat(_self.formValidateSearch.paytime[0]),
                        ecreateDate:DateFormat(_self.formValidateSearch.paytime[1])
                    }
                }
                function success(res){
                    console.log(res.data.data.rows)
                    _self.data = res.data.data.rows
                    _self.total = res.data.data.total
                    for(let i = 0; i < _self.data.length; i++){
                        _self.data[i].expect_date = DateFormat(_self.data[i].expect_date)
                        _self.data[i].task_area = _self.taskArea_map.get(_self.data[i].task_area)
                        _self.data[i].task_place = _self.taskPlace_map.get(_self.data[i].task_place)
                        if (_self.data[i].apply_status==="tesFinished") {
                            _self.data[i].apply_status="同意"
                        }
                        if (_self.data[i].apply_status==="tesReturned") {
                            _self.data[i].apply_status="驳回"
                        }
                        if (_self.data[i].apply_status==="tesReady") {
                            _self.data[i].apply_status="待审核"
                        }
                        _self.data[i].create_date = DateFormat(_self.data[i].create_date)
                        _self.data[i].expect_date = DateFormat(_self.data[i].expect_date)
                        _self.data[i].check_date = DateFormat(_self.data[i].check_date)
                        _self.data[i].plan_date =  DateFormat(_self.data[i].plan_date)
                    }
                    _self.loading = false
                }
                this.$Get(url, config, success)
            },
            get_data_center(){
                let _self = this
                return new Promise((resolve,reject) => {
                    let params ="gzbusinessarea,gzbusinessplace"

                    function success(res){
                        _self.taskArea = res.data.data.gzbusinessarea
                        _self.taskPlace = res.data.data.gzbusinessplace
                        _self.taskArea_map = _self.$array2map(_self.taskArea)
                        _self.taskPlace_map = _self.$array2map(_self.taskPlace)
                        resolve()
                    }
                    this.$GetDataCenter(params, success)
                })
            }
        },
        created() {
            this.loading = true
            this.get_data_center()
                this.get_data()
            this.$bus.on("UPDATE_APPROVE_LIST",()=>{
                this.get_data()
            })
        }
    }
</script>

<style>

</style>