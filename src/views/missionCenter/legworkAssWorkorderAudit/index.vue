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
            <Row>
                <ButtonGroup>
                    <Button  type="primary" icon="plus"  name="order_add" @click="open_add">审核</Button>
                    <!--<Button  type="primary" icon="edit"  name="order_edit" @click="open_edit">编辑</Button>-->
                    <!--<Button  type="primary" icon="information-circled" name="order_show" @click="order_show">查看</Button>-->
                    <!--<Button v-permission="['orderL.flowChart']" type="primary" icon="ios-crop" @click="open_flowChart">查看流程图</Button>-->
                    <!--<Button v-permission="['orderL.resubmit']" type="primary" icon="refresh" @click="reapply_process" name="order_re_submit">重新提交</Button>-->
                    <!--<Button v-permission="['orderL.amend']" type="primary" icon="edit" @click="xiugai_open" name="order_amend">修改</Button>-->
                    <!--<Button  type="primary" icon="trash-b"  name="order_amend" @click="del_order">删除</Button>-->
                    <Button  type="primary" icon="ios-color-filter-outline" @click="get_data">刷新</Button>
                    <!--  ↓ ↓ 该功能暂定，代码勿删  -->
                    <!--<Button type="primary" icon="ios-color-filter-outline" @click="qihuaOpen()">企划(修改)</Button>-->
                    <!--<Button v-permission="['orderL.invalid']" type="primary" icon="ios-color-filter-outline" @click="deleteOrder = true">订单作废</Button>-->
                    <!--<Button v-permission="['orderL.export']" type="primary" icon="ios-color-filter-outline" @click="downloadExcel">导出Excel</Button>-->
                    <!--<Button v-permission="['orderL.export']" type="primary" icon="ios-color-filter-outline" @click="account_downloadExcel">结算导出</Button>-->
                </ButtonGroup>
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                        :loading="loading"
                        highlight-row
                        size="small"
                        border
                        @on-row-click="select_row"
                        @on-row-dblclick="open_order_detail"
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
        <create-order></create-order>
    </div>
</template>

<script>
    import {DateFormat} from "../../../libs/utils";
    import createOrder from './createOrder'
    export default {
        name: "index",
        components:{
            createOrder
        },
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
                        title: '协助工单号',
                        key: 'apply_code',
                        minWidth: 140,
                    },
                    {
                        title: '预计截止时间',
                        key: 'expect_date',
                        minWidth: 140,
                    },
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
                        title: '待分配',
                        key: 'excutor_name',
                        minWidth: 140,
                    },
                ],
            }
        },
        methods:{
            select_row(e){
                console.log(e)
                if(e.id){
                    this.selectRow = e
                }else{
                    this.selectRow = ""
                }
            },
            pageChange(e){
                this.page = e
                this.get_data()
            },
            pageSizeChange(e){
                this.pageSize = e
                this.get_data()
            },
            open_add(){
                if(this.selectRow){
                    this.$bus.emit("OPEN_LIST_EDIT", this.selectRow.id)
                }else{
                    this.$Message.warning("请选择一行进行操作！")
                }
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
                        page:_self.page,
                        pageSize:_self.pageSize,
                        preAudit:"preAudit",
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
            this.get_data_center().then(
                this.get_data()
            )
            this.$bus.on("UPDATE_ORDER_LIST", (e)=>{
                this.get_data()
                this.selectRow =""
            })
        }
    }
</script>

<style>

</style>