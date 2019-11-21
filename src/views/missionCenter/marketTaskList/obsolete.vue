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
                                <Row>
                                    <Col span="6">
                                        <FormItem label="公司名称：" prop="companyname">
                                            <Input v-model="formValidateSearch.companyName" size="small" style="width:158px"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="客户联系方式：" prop="customername">
                                            <Input v-model="formValidateSearch.customertel" size="small" style="width:158px"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="执行人：" prop="date">
                                            <Input v-model="formValidateSearch.creatorName" s size="small" style="width:158px"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="执行时间期间：" prop="paytime">
                                            <DatePicker transfer type="daterange" placement="bottom-end" v-model="formValidateSearch.date" style="width:158px" size="small"></DatePicker>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <center>
                                    <FormItem style="margin-top:0;margin-bottom:0">
                                        <Button size="small" type="primary" @click="Search">搜索</Button>
                                        <Button size="small" type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
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
        name: "obsolete",
        data(){
            return{
                loading:false,
                total:0,
                page:1,
                data:[],
                taskKind:[],
                taskKind_map:new Map(),
                search_model: 1,
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
                        title: '客户名称',
                        key: 'customerName',
                        minWidth: 180,
                    },
                    {
                        title: '公司名称',
                        key: 'companyName',
                        minWidth: 240,
                    },
                    {
                        title: '任务',
                        key: 'taskName',
                        minWidth: 140,
                    },
                    {
                        title: '执行人',
                        key: 'executorName',
                        minWidth: 140,
                    },
                    {
                        title: '执行时间',
                        key: 'planDate',
                        minWidth: 160,
                    },
                    {
                        title: '任务类型',
                        key: 'taskKind',
                        minWidth: 180,
                    },
                    {
                        title: '操作',
                        key: 'expect_date',
                        fixed: 'right',
                        width: 140,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            // console.log(params)
                                            this.show(params)
                                        }
                                    }
                                }, '[查看]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.delete_return(params)
                                        }
                                    }
                                }, '[还原]')
                            ]);
                        }
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
            show(p){
                this.$bus.emit("SHOW_OBSOLETE_DETAILS",p)
            },
            handleReset(){
                this.$refs["formValidateSearch"].resetFields()
                this.formValidateSearch.date = []
                this.formValidateSearch.companyName=null
                this.formValidateSearch.creatorName=null
                this.formValidateSearch.customertel=null
                this.get_data()
            },
            delete_return(p){
                let _self = this
                let url = `api/task/deleteReturnTask`
                let config = {
                    params: {
                        taskId: p.row.taskId
                    }
                }
                function success(res){
                    // _self.$Message.success(res.data.msg)
                    setTimeout(()=>{
                        _self.get_data()
                        _self.$bus.emit("UPDATE_EXECUTING_DATA",true)
                    }, 500)
                }
                function fail(err){

                }
                _self.$Get(url, config, success, fail)
            },
            get_data(){
                let _self = this
                let url =`api/task/getLegWorklist`
                _self.loading = true
                let config = {
                    params: {
                        task_stage:"tesCanceled",
                        marketKind:"marketKind",
                        page:_self.page,
                        pageSize:_self.pageSize,
                        companyName:_self.formValidateSearch.companyName,
                        executor_name:_self.formValidateSearch.creatorName,
                        customerTel:_self.formValidateSearch.customertel,
                        bplan_date:DateFormat(_self.formValidateSearch.date[0]),
                        eplan_date:DateFormat(_self.formValidateSearch.date[1]),
                    }
                }
                function success(res){
                    console.log(res.data.data.rows)
                    _self.data = res.data.data.rows
                    _self.total = res.data.data.total
                    for(let i = 0; i < _self.data.length; i++){
                        //     _self.data[i].expect_date = DateFormat(_self.data[i].expect_date)
                        _self.data[i].taskKind = _self.taskKind_map.get(_self.data[i].taskKind)
                        //     _self.data[i].task_place = _self.taskPlace_map.get(_self.data[i].task_place)
                        //     if (_self.data[i].apply_status==="tesFinished") {
                        //         _self.data[i].apply_status="同意"
                        //     }
                        //     if (_self.data[i].apply_status==="tesReturned") {
                        //         _self.data[i].apply_status="驳回"
                        //     }
                        //     if (_self.data[i].apply_status==="tesReady") {
                        //         _self.data[i].apply_status="待审核"
                        //     }
                        //     _self.data[i].create_date = DateFormat(_self.data[i].create_date)
                        //     _self.data[i].expect_date = DateFormat(_self.data[i].expect_date)
                        //     _self.data[i].check_date = DateFormat(_self.data[i].check_date)
                        //     _self.data[i].plan_date =  DateFormat(_self.data[i].plan_date)
                    }
                    _self.loading = false
                }
                this.$Get(url, config, success)
            },
            get_data_center(){
                let _self = this
                return new Promise((resolve,reject) => {
                    let params ="taskKind"

                    function success(res){
                        _self.taskKind = res.data.data.taskKind
                        _self.taskKind_map = _self.$array2map(_self.taskKind)
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
            this.$bus.on("UPDATE_DATA",(e)=>{
                this.get_data()
            })
        }
    }
</script>

<style>

</style>