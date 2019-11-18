<template>
    <div>
        <Card style="min-width:800px">
            <Row style="margin-bottom:10px">
                <Collapse v-model="search_model" >
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <div slot="content" @keydown.enter="Search" >
                            <Form ref="formValidateSearch" :model="formValidateSearch" :label-width="100" style="display:block">
                                <Row :gutter="24">
                                    <Col span="6">
                                        <FormItem label="公司名称11：" prop="companyname">
                                            <Input v-model="formValidateSearch.companyName" size="small" style="width:158px;"></Input>
                                        </FormItem>
                                    </Col>
                                    <!--<Col span="8">-->
                                        <!--<FormItem label="客户联系方式：" prop="customername">-->
                                            <!--<Input v-model="formValidateSearch.customertel" size="small"></Input>-->
                                        <!--</FormItem>-->
                                    <!--</Col>-->
                                    <Col span="6">
                                        <FormItem label="执行人：" prop="date">
                                            <Input v-model="formValidateSearch.creatorName" s size="small" style="width:158px;"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="执行时间期间：" prop="paytime">
                                            <DatePicker transfer type="daterange" placement="bottom-end" v-model="formValidateSearch.date" style="width:158px" size="small"></DatePicker>
                                        </FormItem>
                                    </Col>
                                     <center>
                                    <FormItem>
                                        <Button type="primary" @click="Search">搜索</Button>
                                        <Button type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
                                    </FormItem>
                                </center>
                                </Row>
                               
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
        <detail></detail>
    </div>
</template>

<script>
    import {FULLDateFormat} from "../../../libs/utils";
    import {DateFormat} from "../../../libs/utils";
    import detail from './detail'

    export default {
        name: "Executing",
        components: {detail},
        data(){
            return{
                loading:false,
                total:0,
                page:1,
                idTmr:"",
                tableHeader:["公司名称","任务","服务内容","执行人","任务类型","执行时间"],
                data:[],
                taskKind:[],
                taskKind_map:new Map(),
                search_model: "1",
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
                        title: '服务内容',
                        minWidth: 295,
                        render: (h, params) => {
                            if(params.row.taskKindName==='会计外勤' || params.row.taskKindName==='会计到家') {
                                return h('div', [
                                    h('div', {},params.row.productName)
                                ])
                            } else {
                                return h('div', [
                                    h('div', {},params.row.legName)
                                ])
                            }
                        }
                    },
                    {
                        title: '执行人',
                        key: 'executorName',
                        minWidth: 130,
                    },
                    {
                        title: '任务类型',
                        minWidth: 100,
                        render: (h, params) => {
                            if(params.row.taskKindName==='会计外勤' || params.row.taskKindName==='会计到家') {
                                return h('div', [
                                    h('div', {},params.row.taskKindName)
                                ])
                            } else {
                                return h('div', [
                                    h('div', {},params.row.legType)
                                ])
                            }
                        }
                    },
                    {
                        title: '执行时间',
                        key: 'planDate',
                        minWidth: 160,
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
                                                this.show(params)
                                            }
                                        }
                                    }, '[查看]'),
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small',
                                        },
                                        on: {
                                            click: () => {
                                                this.delete(params)
                                            }
                                        }
                                    }, '[作废]')
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
            handleReset(){
                this.$refs["formValidateSearch"].resetFields()
                this.formValidateSearch.date = []
                this.formValidateSearch.companyName=null
                this.formValidateSearch.creatorName=null
                this.formValidateSearch.customertel=null
                this.get_data()
            },
            show(p){
                this.$bus.emit("SHOW_DETAILS",p)
            },
            delete(p){
                let _self = this

                let url = `api/task/deleteTask`
                let config = {
                    params: {
                        taskId: p.row.taskId
                    }
                }
                function success(res){
                    // _self.$Message.success(res.data.msg)
                    setTimeout(()=>{
                        _self.get_data()
                        _self.$bus.emit("UPDATE_DATA",true)
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
                        task_stage:"tesUnstarted",
                        accountKind :"accountKind",
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
                        _self.data[i].planDate = FULLDateFormat(_self.data[i].planDate)
                        if (_self.data[i].legType=='A'){
                            _self.data[i].legType = 'A类外勤'
                        }
                        if (_self.data[i].legType=='B'){
                            _self.data[i].legType = 'B类外勤'
                        }
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
            this.$bus.on("UPDATE_EXECUTING_DATA",(e)=>{
                this.get_data()
            })
        }
    }
</script>

<style>
.ivu-form-item{
  margin-bottom: 0;
}
</style>