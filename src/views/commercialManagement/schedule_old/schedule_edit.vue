<template>
    <div>
        <Modal
            width="700"
            title="修改排程"
            v-model="EditSchedule"
        >
            <Form ref="schedule" :model="schedule" :label-width="100" style="width:600px;margin:auto">
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem prop="workerId" label="服务人员：">
                            <Select transfer v-model="schedule.workerId" placeholder="Select your " transfer>
                                <Option v-for="(item,index) in user" :value="item.id" :key="index">{{item.realname}}</Option>
                            </Select>
                        </FormItem> 
                    </Col>
                    <Col span="12">
                        <FormItem prop="companyName" label="公司：">
                            <Input type="text" v-model="schedule.companyName" placeholder="" @on-focus="getCompany" readonly>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem prop="area" label="区域：">
                            <Select transfer v-model="schedule.area" placeholder="Select your " transfer>
                                <Option v-for="(item,index) in area" :key = index :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="address" label="地点：">
                            <Select transfer v-model="schedule.address" placeholder="Select your " transfer>
                                <Option v-for="(item,index) in addr" :key=index :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem prop="event" label="事件：">
                            <Input type="text" v-model="schedule.event" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="workOrderId" label="工单：">
                            <Input type="text" v-model="schedule.workOrderId" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem prop="beginTime" label="开始时间：">
                            <Select transfer v-model="schedule.beginTime" placeholder="Select your " transfer>
                                <Option value="beijing">9</Option>
                                <Option value="shanghai">12</Option>
                                <Option value="shenzhen">18</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="endTime" label="结束时间：">
                            <Select transfer v-model="schedule.endTime" placeholder="Select your " transfer>
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem prop="scheduleStatus" label="外勤状态：">
                            <Select transfer v-model="schedule.scheduleStatus" placeholder="Select your " transfer>
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="statusMemo" label="无效备注：">
                            <Input type="text" v-model="schedule.statusMemo" placeholder="" >
                            </Input>
                        </FormItem>
                    </Col>
                </Row>   
            </Form>
            <div slot="footer">
                <Button type="primary" @click="add_schedule">新增</Button>
                <Button type="ghost" @click="EditSchedule=false">关闭</Button>
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
    </div>
</template>

<script>
import Bus from '../../../components/bus'

export default {
    props:['user','area','addr'],
    data(){
        return{
            EditSchedule:false,
            //  公司相关
            selectCompany:false,
            isSearch:false,
            currentPage:1,
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
                companyName:''
            },
            
        }
    },
    methods:{
            add_schedule(){
                let _self = this
                let url = 'api/order/workschedule/update'
                let config={
                    scheduleDate:"",
                    // workerId:"10074",
                    beginTime:"",
                    endTime:"",
                    area:"",
                    address:"",
                    event:"",
                    companyId:"",
                    workOrderId:"",
                    scheduleStatus:"",
                    statusMemo:""
                }
                this.$http.post(url,config).then(function(res){
                    // console.log(res) 
                    _self.$Message.error(res.data.msg)
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
                console.log('11111111111')
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
                _self.schedule.companyid = a.cpid
                _self.schedule.NAME = a.NAME
                _self.schedule.CompanyName = a.CompanyName
            },
    },
    created(){
        var _self = this
        Bus.$on('EDIT_COMMER_SCHEDULE',(e)=>{
            _self.EditSchedule = true
            _self.schedule = e
            console.log(e)
        })
    }
}
</script>
