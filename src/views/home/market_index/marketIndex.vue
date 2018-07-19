<template>
    <div style="min-width:1100px">
        <Row style="border-bottom:1px solid #F5F5F5">
            <Col span="16" style="background-color:#FFFFFF;padding:10px">
                <div>
                    <Col span="24" style="padding:20px"><center><h2>本月个人业绩统计</h2></center></Col>
                    <Col span="5" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="connection-bars" style="margin-right:10px"></Icon>全国销售排名
                            <Row style="padding-top:10px;"><center><h2>{{userTableData.person.rowNo}}</h2></center></Row>
                        </Card>
                    </Col>
                    <Col span="5" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="person" style="margin-right:10px"></Icon>新增客户
                            <Row style="padding-top:10px;"><center><h2>{{userTableData.person.new_customer}}</h2></center></Row>
                        </Card>
                    </Col>        
                    <Col span="5" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="checkmark-circled" style="margin-right:10px"></Icon>交易总额
                            <Row style="padding-top:10px;"><center><h2>{{userTableData.person.sumrealnumber}}</h2></center></Row>                        
                        </Card>
                    </Col>         
                    <Col span="5" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="ios-pie" style="margin-right:10px"></Icon>剩余业绩
                            <Row style="padding-top:10px;"><center><h2>{{userTableData.person.target_amount}}</h2></center></Row>                            
                        </Card>
                    </Col>    
                </div>                
            </Col>
            <Col span="8" style="background-color:#FFFFFF;padding:10px;border-left:1px solid #F5F5F5">
                <div>
                    <Col span="24" style="padding:20px"><center><h2>本月团队业绩统计</h2></center></Col>            
                    <Col span="11" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="person" style="margin-right:10px"></Icon>新增客户数
                            <Row style="padding-top:10px;"><center><h2>{{userTableData.team.new_customer}}</h2></center></Row>                            
                        </Card>
                    </Col>         
                    <Col span="11" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="checkmark-circled" style="margin-right:10px"></Icon>交易总额
                            <Row style="padding-top:10px;"><center><h2>{{userTableData.team.sumrealnumber}}</h2></center></Row>                            
                        </Card>
                    </Col> 
                </div>
            </Col>            
        </Row>
        <Row>
            <Col span="16" style="background-color:#FFFFFF;padding:10px;">
                <div>
                    <Col span="24" style="padding:20px"><center><h2>个人销售计划</h2></center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">本日销售目标</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">本日完成</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">本日计划新增客户</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">本人新增客户</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">本日计划拜访</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">本日拜访</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.day.saleroom}}</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.day.finish_saleroom}}</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.day.new_customer_num}}</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.day.finish_new_customer_num}}</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.day.visit_num}}</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.day.finish_visit_num}}</center></Col>

                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">本周销售目标</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">本周完成</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">本周计划新增客户</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">本周新增客户</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">本周计划拜访</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">本周拜访</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.day.saleroom}}</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.day.finish_saleroom}}</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.day.new_customer_num}}</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.day.finish_new_customer_num}}</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.day.visit_num}}</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.day.finish_visit_num}}</center></Col>
                </div>                
            </Col>
            <Col span="8" style="background-color:#FFFFFF;padding:10px;border-left:1px solid #F5F5F5">
                <div style="height:227px">
                    <Col span="24" style="padding:20px"><center><h1>本年销售目标</h1></center></Col>            
                    <Col span="11" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="person" style="margin-right:10px"></Icon>本年销售目标
                            <Row style="padding-top:10px;"><center><h2>{{UserPlanData.year.saleroom}}</h2></center></Row>                            
                        </Card>
                    </Col>         
                    <Col span="11" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="checkmark-circled" style="margin-right:10px"></Icon>本年已完成
                            <Row style="padding-top:10px;"><center><h2>{{UserPlanData.year.finish_saleroom}}</h2></center></Row>                            
                        </Card>
                    </Col> 
                </div>
            </Col>            
        </Row>
        <Row :gutter="10" class="margin-top-10">
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card style="height:500px">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        客户来源分析
                    </p>
                    <div class="data-source-row">
                        <classic></classic>
                    </div>
                </Card>
            </Col>
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card style="height:500px">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        渠道价值分析
                    </p>
                    <div class="data-source-row">
                        <attitude></attitude>
                    </div>
                </Card>
            </Col>
        </Row>
        <div class="market_hover">
            <Card style="width:60px;height:310px;">
                <div @click="openCal">
                    <Row>
                        <Col span="24">
                            <Icon type="clipboard" size="36"></Icon><p style="font-size:10px" >方案</p>
                        </Col>
                    </Row>
                </div>
                <div @click="openCal">
                    <Row>
                        <Col span="24">
                            <Icon type="calculator" size="38" ></Icon><p style="font-size:10px" >报价</p>
                        </Col>
                    </Row>
                </div>
                <div @click="openCal">
                    <Row>
                        <Col span="24">
                            <Icon type="edit" size="28"></Icon><p style="font-size:10px" >测评</p>
                        </Col>
                    </Row>
                </div>
                <div @click="openCal">
                    <Row>
                        <Col span="24">
                            <Icon type="social-yen" size="32"></Icon><p style="font-size:10px" >支付</p>
                        </Col>
                    </Row>
                </div>
                <div @click="openCal">
                    <Row>
                        <Col span="24">
                            <Icon type="android-contacts" size="28" ></Icon><p style="font-size:10px" >公司交易</p>
                        </Col>
                    </Row>
                </div>
            </Card>
        </div>
        <Modal
            v-model="baojia"
            title="报价工具"
            width="400"
        >
            <baojia></baojia>
            <div slot="footer"></div>
        </Modal>
        <!-- <Row :gutter="10" class="margin-top-10">
                <Col span="8" :style="{marginBottom: '10px'}" v-if="Cal">
                    <Card style="height:400px">
                        <p slot="title" class="card-title">
                            <Icon type="android-map"></Icon>
                            方案工具
                        </p>
                        <div class="data-source-row">
                            <person-sum></person-sum>
                        </div>
                    </Card>
                </Col>
                <Col span="8" :style="{marginBottom: '10px'}" v-if="baojia">
                    <Card style="height:400px">
                        <p slot="title" class="card-title">
                            <Icon type="android-map"></Icon>
                            报价
                        </p>
                        <div class="data-source-row">
                            <baojia></baojia>
                        </div>
                    </Card>
                </Col>
                <Col span="8" :style="{marginBottom: '10px'}" v-if="shoukuan">
                    <Card style="height:400px">
                        <p slot="title" class="card-title">
                            <Icon type="android-map"></Icon>
                            收款
                        </p>
                        <div class="data-source-row">
                            
                        </div>
                    </Card>
                </Col>
            </Row> -->
            <Modal
                title="新增周销售计划"
                width=400
                v-model="week_open"
                :closable="false"
                :mask-closable="false"
                transfer
            >
                <Form ref="weekTotal" :model="weekTotal" :rules="weekTotalRule">
                    <Row :gutter="12">
                        <Col span="12">
                            <FormItem prop="saleroom" style="margin-bottom:12px">
                                <Input v-model="weekTotal.saleroom" placeholder="本周销售额" size="small"/>
                            </FormItem>
                        </Col>
                        <Col span="12">
                             <FormItem prop="new_customer_num" style="margin-bottom:12px">
                                <Input v-model="weekTotal.new_customer_num" placeholder="本周新增客户" size="small"/>
                            </FormItem>
                        </Col>
                    </Row>

                    <Row :gutter="12">
                        <Col span="8">
                            <FormItem prop="Dsaleroom" style="margin-bottom:12px">
                                <Input v-model="weekTotal.Dsaleroom" placeholder="今日销售额" size="small"/>
                            </FormItem>
                        </Col>
                        <Col span="8">
                             <FormItem prop="Dnew_customer_num" style="margin-bottom:12px">
                                <Input v-model="weekTotal.Dnew_customer_num" placeholder="今日新增客户" size="small"/>
                            </FormItem>
                        </Col>
                        <Col span="8">
                             <FormItem prop="Dvisit_num" style="margin-bottom:12px">
                                <Input v-model="weekTotal.Dvisit_num" placeholder="今日拜访数量" size="small"/>
                            </FormItem>
                        </Col>
                    </Row>
                        
                    </Form>
                    <div slot="footer">
                        <Button @click="handleSubmit" type="primary" long :loading="week_loading">提交</Button>
                    </div>
            </Modal>
            <Modal
                title="新增每日销售计划"
                width=400
                v-model="day_open"
                :closable="false"
                :mask-closable="false"
                transfer
            >
                <Form ref="DayTotal" :model="DayTotal" :rules="DayTotalRule">
                    <Row :gutter="12">
                        <Col span="8">
                            <FormItem prop="saleroom" style="margin-bottom:12px">
                                <Input v-model="DayTotal.saleroom" placeholder="今日销售额" size="small"/>
                            </FormItem>
                        </Col>
                        <Col span="8">
                             <FormItem prop="new_customer_num" style="margin-bottom:12px">
                                <Input v-model="DayTotal.new_customer_num" placeholder="今日新增客户" size="small"/>
                            </FormItem>
                        </Col>
                        <Col span="8">
                             <FormItem prop="visit_num" style="margin-bottom:12px">
                                <Input v-model="DayTotal.visit_num" placeholder="今日拜访数量" size="small"/>
                            </FormItem>
                        </Col>
                    </Row>
                        
                    </Form>
                    <div slot="footer">
                        <Button @click="submit" type="primary" long :loading="day_loading">提交</Button>
                    </div>
            </Modal>
    </div>
</template>

<script>
import attitude from './attitude'
import classic from './classic'
import account from './account'
import sum from './sum'
import workdetail from './workdetail'
import baojia from './baojia'

export default {
    data(){
        return{
            week_loading:false,
            day_loading:false,
            weekTotal:{
                saleroom:"",
                new_customer_num:"",
                Dsaleroom:"",
                Dnew_customer_num:"",
                Dvisit_num:""
            },
            weekTotalRule:{
                saleroom:[ {required: true, message: '请完善信息！', trigger: 'blur'} ],
                new_customer_num:[ {required: true, message: '请完善信息！', trigger: 'blur'} ],
                Dsaleroom:[ {required: true, message: '请完善信息！', trigger: 'blur'} ],
                Dnew_customer_num:[ {required: true, message: '请完善信息！', trigger: 'blur'} ],
                Dvisit_num:[ {required: true, message: '请完善信息！', trigger: 'blur'} ],
            },
            DayTotal:{
                saleroom:"",
                new_customer_num:"",
                visit_num:""
            },
            DayTotalRule:{
                saleroom:[ {required: true, message: '请完善信息！', trigger: 'blur'} ],
                new_customer_num:[ {required: true, message: '请完善信息！', trigger: 'blur'} ],
                visit_num:[ {required: true, message: '请完善信息！', trigger: 'blur'} ],
            },
            week_open:true,
            day_open:false,
            Cal:false,
            baojia:false,
            shoukuan:false,
            userTableData:{
                person:{
                    new_customer: 0,
                    rowNo: 0,
                    sumrealnumber: 0,
                    target_amount: 0
                },
                team:{
                    new_customer: 0,
                    sumrealnumber: 0
                }
            },
            UserPlanData:{
                week:{
                    saleroom: 0,
                    finish_saleroom:0,
                    new_customer_num:0,
                    finish_new_customer_num:0,
                    visit_num:0,
                    finish_visit_num:0,
                },
                day:{
                    saleroom:0,
                    finish_saleroom:0,
                    new_customer_num:0,
                    finish_new_customer_num:0,
                    visit_num:0,
                    finish_visit_num:0,
                },
                year:{
                    saleroom:0,
                    finish_saleroom:0
                }
            }
        }
    },
    components: {
        attitude,
        classic,
        account,
        sum,
        workdetail,
        baojia
    },
    methods: {
        openCal(){
            this.baojia = true
        },
        getUserTableData(){
            let _self = this
            let url = `api/crm/sale/index/performance/detail`

            let config = {
                params: {
                    // saler: "10051"
                }
            }

            function success(res){
                _self.userTableData = res.data.data
            }

            this.$Get(url, config, success)
        },
        getUserPlanData(){
            let _self = this
            let url = `api/crm/sale/index/person/plan/detail`

            let config = {
                params:{

                }
            }

            function success(res){
                if(res.data.data.week){
                    _self.week_open = true
                }else{
                    if(res.data.data.day){
                        _self.day_open = true
                    }
                }
            }
        },
        handleSubmit(){
            let _self = this
            
            this.$refs["weekTotal"].validate((valid) => {
                if (valid) {
                    _self.week_loading = true
                    let url = `api/crm/sale/index/person/plan/create`

                    let config = {
                        saleroom: _self.weekTotal.saleroom,
                        new_customer_num: _self.weekTotal.new_customer_num,
                        type: "week"
                    }

                    function success(res){
                        let url2 = `api/crm/sale/index/person/plan/create`

                        let config2 = {
                            saleroom: _self.weekTotal.Dsaleroom,
                            new_customer_num: _self.weekTotal.Dnew_customer_num,
                            type: "day",
                            visit_num: _self.weekTotal.Dvisit_num
                        }

                        function success2(res){
                            _self.week_open = false
                            _self.week_loading = false
                            _self.getUserTableData()
                        }

                        function fail2(err){
                            _self.week_loading = false
                        }

                        _self.$Post(url2, config2, success2, fail2)
                    }

                    function fail(err){
                        _self.week_loading = false
                    }

                    _self.$Post(url, config, success, fail)
                } else {
                    this.$Message.error('请完善信息！');
                }
            })
        },
        submit(){
            let _self = this
            
            this.$refs["DayTotal"].validate((valid) => {
                if (valid) {
                    _self.day_loading = true
                    let url2 = `api/crm/sale/index/person/plan/create`

                    let config2 = {
                        saleroom: _self.DayTotal.saleroom,
                        new_customer_num: _self.DayTotal.new_customer_num,
                        type: "day",
                        visit_num: _self.DayTotal.visit_num
                    }

                    function success2(res){
                        _self.day_open = false
                        _self.day_loading = false
                        _self.getUserTableData()

                    }

                    function fail2(err){
                        _self.day_loading = false
                    }

                    _self.$Post(url2, config2, success2, fail2)
                } else {
                    this.$Message.error('请完善信息！');
                }
            })
        }
    },
    created(){
        let _self = this
        _self.getUserTableData()
    }
}
</script>

<style lang="less">
    @import "../home.less";
    @import "../../../styles/common.less";
    .market_hover{
        position: fixed;
        bottom:30px;
        right:30px
    }
</style>