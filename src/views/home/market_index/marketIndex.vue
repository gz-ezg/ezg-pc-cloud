<template>
    <div style="min-width:1100px">
        <Row>
            <Col span="16" style="background-color:#FFFFFF;padding:10px">
                <div>
                    <Col span="24" style="padding:20px"><center><h2>本月个人业绩统计</h2></center></Col>
                    <Col span="5" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="connection-bars" style="margin-right:10px"></Icon>全国销售排名
                            <Row style="padding-top:10px;"><center>{{index}}</center></Row>
                        </Card>
                    </Col>
                    <Col span="5" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="person" style="margin-right:10px"></Icon>新增客户数
                            <Row style="padding-top:10px;"><center>{{count}}</center></Row>
                        </Card>
                    </Col>        
                    <Col span="5" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="checkmark-circled" style="margin-right:10px"></Icon>交易总额
                            <Row style="padding-top:10px;"><center>{{validTimes}}</center></Row>                        
                        </Card>
                    </Col>         
                    <Col span="5" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="ios-pie" style="margin-right:10px"></Icon>剩余业绩
                            <Row style="padding-top:10px;"><center>{{avagPersonValid}}</center></Row>                            
                        </Card>
                    </Col>    
                </div>                
            </Col>
            <Col span="8" style="background-color:#FFFFFF;padding:10px;border-left:1px solid #F5F5F5">
                <div>
                    <Col span="24" style="padding:20px"><center><h2>本月团队业绩统计</h2></center></Col>            
                    <Col span="11" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="person" style="margin-right:10px"></Icon>新增客户数
                            <Row style="padding-top:10px;"><center>{{teamCount}}</center></Row>                            
                        </Card>
                    </Col>         
                    <Col span="11" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="checkmark-circled" style="margin-right:10px"></Icon>交易总额
                            <Row style="padding-top:10px;"><center>{{avagTeamValid}}</center></Row>                            
                        </Card>
                    </Col> 
                </div>
            </Col>            
        </Row>
        <Row :gutter="10" class="margin-top-10">
            <Col span="8" :style="{marginBottom: '10px'}">
                <Card style="height:400px">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        销售分类
                    </p>
                    <div class="data-source-row">
                        <!-- <classic></classic> -->
                    </div>
                </Card>
            </Col>
            <Col span="8" :style="{marginBottom: '10px'}">
                <Card style="height:400px">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        客户状态
                    </p>
                    <div class="data-source-row">
                        <!-- <attitude></attitude> -->
                    </div>
                </Card>
            </Col>
            <Col span="8" :style="{marginBottom: '10px'}">
                <Card style="height:400px">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        客户来源占比
                    </p>
                    <div class="data-source-row">
                        <!-- <account></account> -->
                    </div>
                </Card>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10" style="height:600px">
            <Col span="24" :style="{marginBottom: '10px'}">
                <Card style="height:600px">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        业务分析
                    </p>
                    <Tabs value="name1" class="data-source-row">
                        <TabPane label="本月" name="name1">
                            <!-- <sum></sum> -->
                        </TabPane>
                        <TabPane label="半年" name="name2">
                            <!-- <sum></sum> -->
                        </TabPane>
                        <TabPane label="全年" name="name3">
                            <!-- <sum></sum> -->
                        </TabPane>
                    </Tabs>
                    <!-- <div > -->
                        <!-- <c-statistical></c-statistical> -->
                        <!-- <person-sum-table></person-sum-table> -->
                    <!-- </div> -->
                </Card>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10" style="height:600px">
            <Col span="24" :style="{marginBottom: '10px'}">
                <Card style="height:600px">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        业务明细
                    </p>
                    <div class="data-source-row">
                        <!-- <workdetail></workdetail> -->
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
            Cal:false,
            baojia:false,
            shoukuan:false
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
        }
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