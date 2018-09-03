<template>
    <div>
        <Modal
            title="客户外勤日志"
            v-model="open_customer_field_log"
            width = "80%"
        >

            <Row style="margin-bottom:10px;" :gutter="10">
                <Collapse v-model="search_model">
                        <Panel name="1" >
                            <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                            筛选
                            
                                <div slot="content" @keydown.enter="Search">
                                <Form ref="formValidate" :model="formValidate" :label-width="120" style="margin-top: 15px">
                                    <Row :gutter="16" style="height:56px">
                                        <Col span="8">
                                        <FormItem label="外勤部门：" prop="name">
                                            <RadioGroup v-model="formValidate.depart" @on-change="Search">
                                                <Radio label="N">全部</Radio>
                                                <Radio label="Y">会计部</Radio>
                                            </RadioGroup>
                                        </FormItem>
                                        </Col>
                                        <Col span="8">
                                        <FormItem label="外勤类型：" prop="fieldtype">
                                            <Select v-model="formValidate.fieldtype" size="small" @on-change="Search">
                                                <Option value="">全部</Option>
                                                <Option v-for="item in allTypes" :value="item.typecode" :key="item.id">{{item.typename}}</Option>
                                                <!-- <Option value="valid">有效</Option>
                                                <Option value="invalid">无效</Option> -->
                                            </Select>
                                        </FormItem>
                                        </Col>
                                        <Col span="8">
                                            <FormItem label="外勤时间：" prop="clocktime" >
                                                <DatePicker type="daterange" @on-change="Search" transfer v-model="formValidate.clocktime" placement="bottom-end" size="small" style="width:100%"></DatePicker>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <center>
                                        <FormItem style="margin-top:10px">
                                            <Button type="primary" @click="Search">搜索</Button>
                                            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">
                                                重置
                                            </Button>
                                        </FormItem>
                                    </center>
                                </Form>
                            </div>
                        </Panel>
                    </Collapse>
            </Row>
            <Row :gutter="10">
                <Col span="8"><h3>客户名称：</h3></Col>
                <Col span="16"><h2>{{customerName}}</h2></Col>
            </Row>
            <Row :gutter="10">
                <Table
                    highlight-row
                    size="small"
                    :columns="columns"
                    :data="data"
                    :loading = "loading"
                ></Table>
                <Page
                    size="small"
                    :total="pageTotal"
                    :current.sync="page"
                    show-total
                    show-elevator
                    @on-change="pageChange"
                    style="margin-top: 10px"></Page>
            </Row>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import {DateFormat} from '../../../libs/utils.js'

export default {
    data(){
        return{
            allTypes:[],
            search_model:"",
            formValidate:{
                depart: "N",
                fieldtype: "",
                clocktime: []
            },
            loading:false,
            open_customer_field_log: false,
            id: "",
            page: 1,
            pageSize: 10,
            customerName:"",
            pageTotal: new Number(),
            data:[],
            columns:[
                {
                    title: '服务企业',
                    key: 'CompanyName',
                    width: 250
                },
                {
                    title: '打卡人',
                    key: 'realname',
                    width: 120
                },
                {
                    title: '打卡类型',
                    key: 'typename',
                    width: 150
                },
                {
                    title: '打卡时间',
                    key: 'clocktime',
                    width: 200
                },
                {
                    title: '离开时间',
                    key: 'endtime',
                    width: 200
                },
                {
                    title: '打卡时长',
                    key: 'fieldlength',
                    width: 120
                },
                {
                    title: '外勤结果',
                    key: 'resulttype',
                    width: 120
                }
            ]
        }
    },
    methods:{
        getData(){
            let _self = this

            let url = `api/legwork/showLegworkInfoByCusId`

            let config = {
                params: {
                    page: _self.page,
                    pageSize: _self.pageSize,
                    customerId: _self.id,
                    isNeed: _self.formValidate.depart,
                    fieldtype: _self.formValidate.fieldtype,
                    bclocktime: DateFormat(_self.formValidate.clocktime[0]),
                    eclocktime: DateFormat(_self.formValidate.clocktime[1]),
                    sortField: "clocktime",
                    order: "desc",
                    sumField: "fieldlength"
                }
            }

            function success(res){
                _self.data = res.data.data.rows
                _self.pageTotal = res.data.data.total
                _self.data.push({
                    endtime:"外勤时间总计：",
                    fieldlength: res.data.data.sum.fieldlength
                })
            }

            this.$Get(url, config, success)
        },
        pageChange(e){
            this.page = e
            this.getData()
        },
        Search(){
            this.page = 1
            this.getData()
        },
        handleReset(name){
            this.$refs[name].resetFields();
            this.Search()
        },
        get_all_field_type(){

            let _self = this
            let params = "fieldClockType"

            function success(res){
                _self.allTypes = res.data.data.fieldClockType
            }

            this.$GetDataCenter(params, success)
        }
    },
    created(){
        let _self = this
        this.get_all_field_type()
        this.$bus.on('OPEN_CUSTOMER_FIELD_LOG',(e)=>{
            _self.open_customer_field_log = true
            _self.id = e[0]
            _self.customerName = e[1]
            _self.getData()
        })
    },
   
}
</script>

