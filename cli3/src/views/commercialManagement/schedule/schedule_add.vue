<template>
    <div>
        <Modal
            width="700"
            title="新增排程"
            v-model="AddSchedule"
        >
            <Form ref="schedule" :model="schedule" :label-width="100" :rules="ruleValidate" style="width:600px;margin:auto">
                <Row :gutter="16" style="height:56px">
                    <Col span="12">
                        <FormItem prop="scheduleDate" label="排程日期：">
                            <!-- <Input type="text" v-model="schedule.scheduleDate" placeholder="">
                            </Input> -->
                            <DatePicker type="date" v-model="schedule.scheduleDate" style="width: 192px" @on-change="show"></DatePicker>
                        </FormItem> 
                    </Col>
                    <Col span="12">
                        <FormItem prop="workerId" label="服务人员：">
                            <Select transfer v-model="schedule.workerId" placeholder="" >
                                <Option v-for="(item,index) in user" :value="item.id" :key="index" >{{item.realname}}</Option>
                            </Select>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16" style="height:56px">
                    <Col span="12">
                        <FormItem prop="companyName" label="公司：">
                            <Input type="text" v-model="schedule.companyName" @on-focus="getCompany" readonly>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="area" label="区域：">
                            <Select transfer v-model="schedule.area" placeholder="" >
                                <Option v-for="(item,index) in area" :key = index :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" style="height:56px">
                    <Col span="12">
                        <FormItem prop="address" label="地点：">
                            <Select transfer v-model="schedule.address" placeholder="" >
                                <Option v-for="(item,index) in addr" :key = index :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="event" label="事件：">
                            <Input type="text" v-model="schedule.event" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" style="height:56px">  
                    <Col span="12">
                        <FormItem prop="productname" label="产品名：">
                            <Input type="text" v-model="schedule.productname" @on-focus="getWorkOrder" readonly>
                            <!-- <Input type="text" v-model="schedule.workOrderId" placeholder=""> -->
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="beginTime" label="时间：">
                            <TimePicker type="timerange" style="width: 192px" :steps="[1, 10]" value="schedule.Time" format="HH:mm" @on-change="changetime" hide-disabled-options :disabled-hours="[0,1,2,3,4,5,6,7,19,20,21,22,23]" ref="date"></TimePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <!-- <Col span="12">
                        <FormItem prop="endTime" label="结束时间：">
                            <TimePicker type="time" style="width: 192px" v-model="schedule.endTime" format="HH:mm"></TimePicker>
                        </FormItem>
                    </Col> -->
                    <!-- <Col span="12">
                        <FormItem prop="scheduleStatus" label="外勤状态：">
                            <Select transfer v-model="schedule.scheduleStatus" placeholder="" transfer>
                                <Option v-for="(item,index) in fieldStatus" :key = index :value="item.typecode">{{item.typename}}</Option>                                
                            </Select>
                        </FormItem>
                    </Col> -->
                    <!-- <Col span="12">
                        <FormItem prop="statusMemo" label="无效备注：">
                            <Input type="text" v-model="schedule.statusMemo" placeholder="">
                            </Input>
                        </FormItem>
                    </Col> -->
                </Row>
                <!-- <Row :gutter="16">
                    
                </Row>    -->
            </Form>
            <div slot="footer">
                <Button type="primary" @click="handleSubmit">新增</Button>
                <Button type="ghost" @click="AddSchedule=false">关闭</Button>
            </div>
        </Modal>
        <Modal
                v-model="selectCompany"
                title="选择公司"
                width="80%">
            <Row :gutter="16">
                <Col span="8">
                <Input v-model="searchCompany" placeholder="输入公司名称搜索" @on-keydown="keyDown">
                <Button slot="append" icon="ios-search" @click="searchCompanyData"></Button>
                </Input>
                </Col>
            </Row>
            <Table
                    style="margin-top: 10px"
                    border
                    highlight-row
                    size="small"
                    ref="selection"
                    :columns="columns44"
                    :data="company_data"
                    @on-row-dblclick="rowSelect"></Table>
            <Page
                    size="small"
                    :total="company_data_total"
                    :current.sync="currentPage"
                    show-total
                    show-elevator
                    @on-change="company_page_change"
                    style="margin-top: 10px"></Page>
            <div slot="footer"></div>
        </Modal>
        <Modal
                v-model="selectWorkOrder"
                title="产品名"
                width="500">
            <Row :gutter="16">
                <!-- <Col span="8">
                    <Input v-model="searchWorkOrder" placeholder="输入工单搜索" @on-keydown="keyDown1">
                        <Button slot="append" icon="ios-search" @click="searchWorkOrderData"></Button>
                    </Input>
                </Col> -->
            </Row>
            <Table
                    style="margin-top: 10px"
                    border
                    highlight-row
                    size="small"
                    ref="selection"
                    :columns="header_work"
                    :data="workorder_data"
                    @on-row-dblclick="workOrderrowSelect"></Table>
            <!-- <Page
                    size="small"
                    :total="company_data_total"
                    :current.sync="currentPage"
                    show-total
                    show-elevator
                    @on-change="company_page_change"
                    style="margin-top: 10px"></Page> -->
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import Bus from '../../../components/bus'
import {DateFormat2,DateFormat} from '../../../libs/utils.js'

export default {
    props:['user','area','addr','fieldStatus'],
    data(){
        return{
            AddSchedule:false,
            //  公司相关
            searchCompany:'',
            company_data_total:new Number(),
            selectWorkOrder:false,
            selectCompany:false,
            isSearch:false,
            currentPage:1,
            workorder_data:[],
            header_work:[
                {
                    title: '产品名称',
                    key:'productname'
                },
                {
                    title:'服务人员',
                    key:'servicename'
                }
            ],
            company_data:[],
            columns44: [
                    {
                        title: '公司名称',
                        key: 'CompanyName',
                        width:300
                    },
                    {
                        title: '归属客户',
                        key: 'NAME'
                    },
                    {
                        title: '客户电话',
                        key: 'TEL'
                    }
                ],
            schedule:{
                companyName:'',
                Time:[],
                companyId:'',
                event:'',
                address:'',
                scheduleDate:'',
                tempdate:"",
                workerId:""
            },
            ruleValidate:{
                companyName:{ required: true, message: '服务公司必填！', trigger: 'change' },
                event:{ required: true, message: '服务事件必填！', trigger: 'blur' },
                address:{ required: true, message: '服务地点必填！', trigger: 'change' },
                workerId:{ required:true, message: '服务人员必填！', trigger: 'change',type: 'number'}
            }
        
            
        }
    },
    methods:{
            handleSubmit () {
                let _self = this
                if(this.schedule.Time[0]==""||this.schedule.Time[0]==null){
                    this.$Message.warning('请输入外勤时间！')
                }else{
                    this.$refs['schedule'].validate((valid) => {
                        if (valid) {
                            _self.add_schedule()
                        } else {
                            this.$Message.error('请填写内容!');
                        }
                    })
                }
                
            },
            add_schedule(){
                var _self = this
                let url = 'api/order/workschedule/create'
                // console.log(DateFormat(_self.schedule.scheduleDate))
                _self.schedule.tempdate = DateFormat(_self.schedule.scheduleDate)
                // console.log(_self.schedule.Time[0].toString())
                // console.log(_self.schedule)
                // console.log(_self.schedule.endTime)
                let config={
                    scheduleDate:DateFormat2(_self.schedule.scheduleDate),
                    workerId:_self.schedule.workerId,
                    // beginTime:DateFormat(_self.schedule.scheduleDate)+' '+ _self.schedule.Time[0] + ':00',
                    // endTime:DateFormat(_self.schedule.scheduleDate)+' '+ _self.schedule.Time[1] + ':00',
                    beginTime:_self.schedule.tempdate +' '+ _self.schedule.Time[0] + ':00',
                    endTime:_self.schedule.tempdate +' '+ _self.schedule.Time[1] + ':00',
                    area:_self.schedule.area,
                    address:_self.schedule.address,
                    event:_self.schedule.event,
                    companyId:_self.schedule.companyId,
                    workOrderId:_self.schedule.workOrderId,
                    scheduleStatus:'fieldOther',
                    statusMemo:""
                }
                console.log(config)
                this.$http.post(url,config).then(function(res){
                    if(res.data.msgCode == 40000){
                        _self.$Message.success(res.data.msg)
                        _self.AddSchedule = false
                        _self.$refs['schedule'].resetFields();
                        _self.schedule.Time[0] = "",
                        _self.schedule.Time[1] = ""
                        _self.$refs.date.currentValue = ""
                        _self.$emit('UPDATESCHEDULE', true)
                    }else{
                        _self.$Message.error('新增失败！')
                    }
                })
            },
            getCompany() {
                let _self = this
                let url = ''
                _self.currentPage = 1

                if (_self.isSearch == false) {
                    url = '/customer/company/list?page=1&pageSize=10'
                } else {
                    url = '/customer/company/list?page=1&pageSize=10&companyname=' + _self.searchCompany
                }

                _self.selectCompany = true

                function doSuccess(response) {
                    let _res = response.data.data

                    _self.company_data = []
                    // _self.company_data_total = parseInt(_res.total)
                    _self.company_data_total = _res.total                
                        for(let i=0;i<10;i++){
                            _self.company_data.push({
                            CompanyName: _res.rows[i].companyname,
                            TEL: _res.rows[i].customerTel,
                            NAME: _res.rows[i].customerName,
                            cpid: _res.rows[i].id,
                            balance: _res.rows[i].balance,
                        })
                        }
                    }

                this.GetData(url, doSuccess)
            },

            keyDown(e) {
                let _self = this

                if (e.code == 'Enter') {
                    _self.searchCompanyData()
                }
            },

            searchCompanyData() {
                let _self = this
                if (_self.searchCompany != '') {
                    _self.isSearch = true
                    _self.getCompany()
                } else {
                    _self.isSearch = false
                    _self.getCompany()
                }
            },

            // 公司列表 页码改变
            company_page_change(a) {
                let _self = this
                let url = ''
                if (_self.isSearch == false) {
                    url = '/customer/company/list?page=' + a + '&pageSize=10'
                } else {
                    url = '/customer/company/list?page=' + a + '&pageSize=10' + '&companyname=' + _self.searchCompany
                }

                function doSuccess(response) {
                    let _res = response.data.data

                    _self.company_data = []
                    // _self.company_data_total = parseInt(_res.total)
                    _self.company_data_total = _res.total                                    
                        for(let i=0;i<10;i++){
                            _self.company_data.push({
                                CompanyName: _res.rows[i].companyname,
                                TEL: _res.rows[i].customerTel,
                                NAME: _res.rows[i].customerName,
                                cpid: _res.rows[i].id,
                                balance: _res.rows[i].balance,
                        })
                        }
                    }

                this.GetData(url, doSuccess)
            },
            rowSelect(a) {
                let _self = this
                _self.selectCompany = false
                _self.schedule.companyId = a.cpid
                _self.schedule.NAME = a.NAME
                _self.schedule.companyName = a.CompanyName
                _self.schedule.productname = ''
                _self.schedule.workOrderId = ''
                _self.schedule.workerId = ''
                _self.searchCompany = ''
            },
            getWorkOrder(){
                let _self = this
                if(_self.schedule.companyId == ""){
                    _self.$Message.warning('请先选择服务公司！')
                }else{
                    let url2 = 'api/order/workschedule/getServicingWorkOrderInfoByCompanyId?companyId=' + _self.schedule.companyId
                    _self.$http.get(url2).then(function(res){
                        _self.selectWorkOrder = true
                        // console.log(res)
                        _self.workorder_data = res.data.data
                    })
                }
            },
            keyDown1(e){
                let _self = this

                if (e.code == 'Enter') {
                    _self.searchWorkOrderData()
                }
            },
            workOrderrowSelect(e){
                let _self = this
                _self.selectWorkOrder = false
                _self.schedule.workOrderId = e.workorderid
                _self.schedule.productname = e.productname
                // _self.schedule.workerId = parseInt(e.serviceid)
                // console.log(_self.schedule.workOrderId)
            },
            show(e){
                // console.log(e)
                // this.schedule.scheduleDate = e
                // this.schedule.tempdate = e
                // console.log(DateFormat2(this.schedule.tempdate))
            },
            changetime(e){
                this.schedule.Time = e
                console.log(this.$refs.date)
            }
    },
    created(){
        var _self = this
        Bus.$on('ADD_COMMER_SCHEDULE',(e)=>{
            _self.AddSchedule = true
        })
        // console.log(this.user)查看是否获取到工作人员数据
        let date = new Date()
        this.schedule.scheduleDate = DateFormat2(date)
    }
}
</script>
