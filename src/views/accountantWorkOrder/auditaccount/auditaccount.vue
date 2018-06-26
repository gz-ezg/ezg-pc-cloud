<template>
    <div style="min-width:800px" ref="main">
        <Card>
            <Row :gutter="20" style="margin-top:10px"><center><h3>异常企业统计</h3></center></Row>
            <Row :gutter="20" style="margin-top:10px">
                <center>
                    <DatePicker type="month" placeholder="请选择账期" style="width: 200px" v-model="select_month" @on-change="show_date"></DatePicker>
                </center>
            </Row>
        </Card>
        <Card>
            <Tabs v-model="showtab">
                <TabPane label="统计" name="name1">
                    <Row :gutter="20" style="margin-top:20px" @click.native="show_main">
                        <Col span="12"><Card><accoutsupsects :account="account_rule" @updateaccount="open_account_list" :loading="tableloading"></accoutsupsects></Card></Col>
                        <Col span="12"><Card><companysuspects :company="company_rule" @updatecompany="open_company_list" :loading="tableloading"></companysuspects></Card></Col>            
                    </Row>
                    <!-- 饼状图暂时不做 -->
                    <!-- <Row :gutter="20" style="margin-top:20px">
                        <Col span="12" ><Card style="height:400px;">
                            <p slot="title" class="card-title">
                                    <Icon type="android-map"></Icon>
                                    审账统计报表
                            </p>
                            <accoutsupsects-chart></accoutsupsects-chart></Card></Col>
                        <Col span="12" >
                            <p slot="title" class="card-title">
                                    <Icon type="android-map"></Icon>
                                    企业问题统计报表
                            </p>
                            <Card style="height:400px;"><companysupects-chart></companysupects-chart></Card></Col>             
                    </Row> -->
                </TabPane>
                <TabPane label="企业疑点" name="name2">
                    <Row :gutter="20" style="margin-top:20px" >
                        <Col><Card><companylist  :date="auditdate" :disposes="disposes_map" :id="companyId" @OPENDEATAIL="open_detail"></companylist></Card></Col>
                    </Row>
                </TabPane>
                <TabPane label="会计疑点" name="name3">
                    <Row :gutter="20" style="margin-top:20px" >
                        <Col><Card><auditlist :date="auditdate"  :id="accountId" @OPENDEATAIL="open_detail" :disposes="disposes_map"></auditlist></Card></Col>
                    </Row>
                </TabPane>
            </Tabs>
        </Card>     
        <detail :disposes="disposes"></detail>
    </div>
</template>

<script>
import accoutsupsects from './auditcomponent/accountsuspects'
import accoutsupsectsChart from './auditcomponent/accountsuspects_chart'
import allcompany from './auditcomponent/allcompany'
import auditlist from './auditcomponent/auditlist'
import companylist from './auditcomponent/companylist'
import companysupectsChart from './auditcomponent/companysupects_chart'
import companysuspects from './auditcomponent/companysuspects'
import detail from './auditcomponent/detail'

import Bus from '../../../components/bus.js'
import {arrayToMap} from '../../../libs/utils.js'

export default {
    data(){
        return{
            auditdate:"",
            select_month:"",
            showtab:"name1",
            tableloading:true,
            disposes:[],
            disposes_map:new Map(),
            accountId:'',
            companyId:'',
            show:true,
            rule:[],
            account_rule:[],
            company_rule:[],
            company_chart:[],
            account_chart:[]
        }
    },
    components: {
        accoutsupsects,
        accoutsupsectsChart,
        allcompany,
        auditlist,
        companylist,
        companysupectsChart,
        companysuspects,
        detail
    },
    methods:{
        show_main(){
            // console.log(this.$refs.main.scrollTop)
            this.$refs.main.scrollTop = "600px"
        },
        init(){
            //  获取规则表格的值
            let _self = this
            _self.tableloading = true
            let tempdate = this.select_month.split('-')
            let temp = tempdate[0]+tempdate[1]
            _self.auditdate = temp
            let url = `/api/order/cycle/finance/analysis/log/percentage?period=` + _self.auditdate
            // _self.company_rule = []
            // _self.account_rule = []
            this.$http(url).then(function(res){
                _self.$backToLogin(res)
                // console.log(res.data.data)
                _self.rule = []
                _self.company_rule = []
                _self.account_rule = []

                _self.rule = res.data.data

                for(let i = 0;i<_self.rule.length;i++){
                    let temp = _self.rule[i].exceptionCount / _self.rule[i].allAmount
                    temp = temp.toFixed(2)
                    _self.rule[i].percentage = (temp * 100).toFixed(2) + '%'
                    // console.log(_self.rule[i].percentage)
                    if(_self.rule[i].type == 1){
                        _self.company_rule.push(_self.rule[i])
                    }else{
                        _self.account_rule.push(_self.rule[i])
                    }
                }
                _self.tableloading = false   
            })
            //  获取chart的值
            // let url2 = `api/order/cycle/finance/analysis/record/report`
            // _self.company_chart = []
            // _self.account_chart = []
            // this.$http(url2).then(function(res){
            //     let temp = res.data.data
            //     for(let i = 0;i<temp.length;i++){
            //         if(temp[i].type == 2){
            //             _self.company_chart.push(temp[i])
            //         }else{
            //             _self.account_chart.push(temp[i])
            //         }
            //     }
            // })
            
        },
        open_account_list(e){
            // console.log(e.id)
            this.show = true
            this.accountId = e.id
            this.showtab = "name3"
        },
        open_company_list(e){
            // console.log(e)
            this.show = false
            this.companyId = e.id
            // window.scrollTo(0,0)
            // document.body.scrollTop = "300px"
            this.$nextTick(()=>{
                this.showtab = "name2"
                
            })          
        },
        open_detail(e){
            // console.log(e)
            Bus.$emit('open_audit_detail',e)
        },
        show_date(e){
            // console.log(e)
            this.select_month = e
            this.init()
            this.showtab = "name1"
        }
    },
    created(){
        let temp = new Date()
        let month1 = temp.getMonth() + 1
        if(month1<9){
            month1 = '0'+month1
        }
        let year1 = temp.getFullYear()
        this.select_month = year1 + '-' + month1
        let _self =this
        this.init()
        
        let url = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=disposes`
        this.$http.get(url).then(function(res){
            // console.log(res.data.data)
            _self.$backToLogin(res)  
            _self.disposes = res.data.data.disposes
            _self.disposes_map = arrayToMap(_self.disposes)
            // console.log( _self.disposes_map) 
        })
    }
}
</script>

