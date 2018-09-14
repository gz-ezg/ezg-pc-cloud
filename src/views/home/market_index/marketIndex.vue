<template>
    <div style="min-width:1100px">
        <Row style="border-bottom:1px solid #F5F5F5">
            <Col span="16" style="background-color:#FFFFFF;padding:10px">
                <div>
                    <Col span="24" style="padding:20px"><center><h2>本月个人业绩统计</h2></center> 
                        <div style="position:absolute;width:150px;height:150px;z-index:100;right:0px;top:0px;" ></div>               
                    </Col>
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
                    <Col span="24" style="padding:13px"><center><Button type="text" @click="openTeamTotal"><h2>本月团队业绩统计</h2></Button></center></Col>            
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
                    <Col span="24" style="margin-top:-15px"><center><Button size="small" type="text" @click="showHistory">查看历史计划</Button></center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5;background-color:#F5F5F5"><center style="padding:10px">本日销售目标</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5;background-color:#F5F5F5"><center style="padding:10px">本日完成</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5;background-color:#F5F5F5"><center style="padding:10px">本日计划新增客户</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5;background-color:#F5F5F5"><center style="padding:10px">本人新增客户</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5;background-color:#F5F5F5"><center style="padding:10px">本日计划拜访</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5;background-color:#F5F5F5"><center style="padding:10px">本日拜访</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.day.saleroom}}</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.day.finish_saleroom}}</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.day.new_customer_num}}</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.day.finish_new_customer_num}}</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.day.visit_num}}</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.day.finish_visit_num}}</center></Col>

                    <Col span="4" style="border:1px solid #F5F5F5;background-color:#F5F5F5"><center style="padding:10px">本周销售目标</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5;background-color:#F5F5F5"><center style="padding:10px">本周完成</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5;background-color:#F5F5F5"><center style="padding:10px">本周计划新增客户</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5;background-color:#F5F5F5"><center style="padding:10px">本周新增客户</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5;background-color:#F5F5F5"><center style="padding:10px">本周计划拜访</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5;background-color:#F5F5F5"><center style="padding:10px">本周拜访</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.week.saleroom}}</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.week.finish_saleroom}}</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.week.new_customer_num}}</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.week.finish_new_customer_num}}</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.week.visit_num}}</center></Col>
                    <Col span="4" style="border:1px solid #F5F5F5"><center style="padding:10px">{{UserPlanData.week.finish_visit_num}}</center></Col>
                </div>                
            </Col>
            <Col span="8" style="background-color:#FFFFFF;padding:10px;border-left:1px solid #F5F5F5">
                <div style="height:236px">
                    <Col span="24" style="padding:20px"><center><h1>本年销售目标</h1></center></Col>            
                    <Col span="11" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="person" style="margin-right:10px"></Icon>本年销售目标
                            <Row style="padding-top:10px;"><center><h2>{{UserPlanData.year.year_target_num}}</h2></center></Row>                            
                        </Card>
                    </Col>         
                    <Col span="11" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="checkmark-circled" style="margin-right:10px"></Icon>本年已完成
                            <Row style="padding-top:10px;"><center><h2>{{UserPlanData.year.year_realnumber}}</h2></center></Row>                            
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
        <div class="market_hover" v-if="hoverShow">
            <Card style="width:60px;height:250px;">
                <div @click="open_clue" style="margi-bottom:10px">
                    <Row>
                        <Col span="24">
                            <Badge :count="clueNumber">
                                <Icon type="android-share-alt" size="32"></Icon>
                            </Badge>
                            <p style="font-size:10px" >线索</p>
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
                <!-- <div @click="openCal">
                    <Row>
                        <Col span="24">
                            <Icon type="edit" size="28"></Icon><p style="font-size:10px" >测评</p>
                        </Col>
                    </Row>
                </div> -->
                <div @click="open_pay_code">
                    <Row>
                        <Col span="24">
                            <Icon type="social-yen" size="32"></Icon><p style="font-size:10px" >支付</p>
                        </Col>
                    </Row>
                </div>
                <div @click="open_fangan_code">
                    <Row>
                        <Col span="24">
                            <Icon type="android-contacts" size="28" ></Icon><p style="font-size:10px" >方案</p>
                        </Col>
                    </Row>
                </div>
            </Card>
        </div>
        <Modal
            v-model="baojia"
            title="报价工具"
            width="500"
        >
            <baojia></baojia>
            <div slot="footer"></div>
        </Modal>
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
                        <Col span="8">
                            <FormItem prop="saleroom" style="margin-bottom:12px">
                                <Input v-model="weekTotal.saleroom" placeholder="本周销售额" size="small"/>
                            </FormItem>
                        </Col>
                        <Col span="8">
                             <FormItem prop="new_customer_num" style="margin-bottom:12px">
                                <Input v-model="weekTotal.new_customer_num" placeholder="本周新增客户" size="small"/>
                            </FormItem>
                        </Col>
                        <Col span="8">
                             <FormItem prop="visit_num" style="margin-bottom:12px">
                                <Input v-model="weekTotal.visit_num" placeholder="本周拜访数量" size="small"/>
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
            <Modal
                title="微信支付码"
                v-model="openPayCode"
                width="300"
            >
                <Row>
                    <center>
                        <img src="../../../images/weixincode.png" alt="">
                    </center>
                </Row>
                <div slot="footer"></div>
            </Modal>
            <Modal
                title="方案工具二维码"
                v-model="openFangAnCode"
                width="300"
            >
                <Row>
                    <center>
                        <img src="../../../images/saomahuoqufangan.jpg" alt="">
                    </center>
                </Row>
                <div slot="footer"></div>
            </Modal>
            <team-total-sum></team-total-sum>
            <person-history></person-history>
    </div>
</template>

<script>
import attitude from './attitude'
import classic from './classic'
import baojia from './baojia'
import teamTotalSum from './TeamTotalSum';
import personHistory from './showHistory';

export default {
    data(){
        const Re = (rule, value, callback) => {
                let re = /^[0-9]\d*$/
                if (value == '' || value == null) {
                    callback();
                } else {
                    if (re.test(value)) {
                        callback();
                    } else {
                        callback(new Error('请输入数字！'));
                    }
                }
            };
        return{
            //  线索数量
            clueNumber: 0,
            openFangAnCode:false,
            openPayCode:false,
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
                saleroom:[ {required: true, message: '请输入数字！', trigger: 'blur', validator: Re} ],
                new_customer_num:[ {required: true, message: '请输入数字！', trigger: 'blur',validator: Re} ],
                visit_num:[{required: true, message: '请输入数字！', trigger: 'blur', validator: Re}],
                Dsaleroom:[ {required: true, message: '请输入数字！', trigger: 'blur', validator: Re} ],
                Dnew_customer_num:[ {required: true, message: '请输入数字！', trigger: 'blur', validator: Re} ],
                Dvisit_num:[ {required: true, message: '请输入数字！', trigger: 'blur', validator: Re} ],
            },
            DayTotal:{
                saleroom:"",
                new_customer_num:"",
                visit_num:""
            },
            DayTotalRule:{
                saleroom:[ {required: true, message: '请输入数字！', trigger: 'blur', validator: Re} ],
                new_customer_num:[ {required: true, message: '请输入数字！', trigger: 'blur', validator: Re} ],
                visit_num:[ {required: true, message: '请输入数字！', trigger: 'blur', validator: Re} ],
            },
            week_open:false,
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
                    year_target_num:0,
                    year_realnumber:0
                }
            },
            saler:""
        }
    },
    components: {
        attitude,
        classic,
        baojia,
        teamTotalSum,
        personHistory
    },
    computed:{
        //  浮动栏是否显示
        hoverShow(){
            console.log(this.$route)
            if(this.$route.path == "/allindex/marketIndex"){
                return false
            }else{
                return true
            }
        }
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
                    saler: _self.saler
                }
            }

            function success(res){
                if(res.data.data.person){
                    _self.userTableData = res.data.data
                }else{
                    _self.userTableData.team = res.data.data.team
                }
                
            }

            this.$Get(url, config, success)
        },
        getUserPlanData(){
            let _self = this
            let url = `api/crm/sale/index/person/plan/detail`

            let config = {
                params:{
                    saler: _self.saler
                }
            }

            function success(res){
                _self.UserPlanData.year = res.data.data.year
                if(_self.$route.path == "/allindex/marketIndex"){

                }else{
                    if(!res.data.data.week){
                        _self.week_open = true
                    }else{
                        if(!res.data.data.day){
                            _self.UserPlanData.week = res.data.data.week
                            _self.day_open = true
                        }else{
                            _self.UserPlanData.week = res.data.data.week
                            _self.UserPlanData.day = res.data.data.day
                        }
                    }
                }
            }

            this.$Get(url, config, success)
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
                        visit_num: _self.weekTotal.visit_num,
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
                            _self.getUserPlanData()
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
                        _self.getUserPlanData()
                    }

                    function fail2(err){
                        _self.day_loading = false
                    }

                    _self.$Post(url2, config2, success2, fail2)
                } else {
                    this.$Message.error('请完善信息！');
                }
            })
        },
        //  打开团队统计
        openTeamTotal(){
            this.$bus.emit('OPEN_TEAM_RANK_FUNCTION', true)
        },

        //  打开个人历史计划
        showHistory(){
            this.$bus.emit('OPEN_HISTORY_FUNCTION', this.saler)
        },
        open_pay_code(){
            this.openPayCode = true
        },
        open_fangan_code(){
            this.openFangAnCode = true
        },
        open_clue(){
            setTimeout(() => {
                this.$router.push({
                    name: 'cluesLibrary_index'
                });
            }, 500)
        },
        get_clue_number(){
            let url = 'api/clue/list'

            let _self = this

            let config = {
                params:{
                    receipt:"N",
                    page: 1,
                    pageSize: 1
                }
            }

            function success(res){
                _self.clueNumber = res.data.data.total
            }

            function fail(err){
                _self.clueNumber = 0
            }

            this.$Get(url, config, success, fail)
        }
    },
    created(){
        let _self = this
        // console.log(this.$route.path)
        _self.get_clue_number()
        // if(this.$route.path == "/allindex/marketIndex"){
        //     // console.log("111")
        // }else{
            _self.getUserPlanData()
            _self.getUserTableData()
        // }

        _self.$bus.on("UPDATE_MARKET_INDEX",(e)=>{
            _self.saler = e
            _self.getUserPlanData()
            _self.getUserTableData()
        })
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
    // #personPlan::after{
    //     content:"查看历史目标";
    //     font-size: 10px;
    // }
</style>