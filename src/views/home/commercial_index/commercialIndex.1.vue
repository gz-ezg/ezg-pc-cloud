<template>
    <div style="min-width:1100px">
        <Row>
            <Col span="16" style="background-color:#FFFFFF;padding:10px">
                <div>
                    <Col span="24" style="padding:20px"><center><h2>本月个人业绩统计</h2></center></Col>
                    <Col span="5" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="connection-bars" style="margin-right:10px"></Icon>全国商事排名
                            <Row style="padding-top:10px;"><center>{{index}}</center></Row>
                        </Card>
                    </Col>
                    <Col span="5" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="ios-pie" style="margin-right:10px"></Icon>完成工单数
                            <Row style="padding-top:10px;"><center>{{count}}</center></Row>
                        </Card>
                    </Col>        
                    <Col span="5" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="person" style="margin-right:10px"></Icon>有效外勤数
                            <Row style="padding-top:10px;"><center>{{validTimes}}</center></Row>                        
                        </Card>
                    </Col>         
                    <Col span="5" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="checkmark-circled" style="margin-right:10px"></Icon>平均有效外勤
                            <Row style="padding-top:10px;"><center>{{avagPersonValid}}</center></Row>                            
                        </Card>
                    </Col>    
                </div>                
            </Col>
            <Col span="8" style="background-color:#FFFFFF;padding:10px;border-left:1px solid #F5F5F5">
                <div>
                    <Col span="24" style="padding:20px"><center><h2>本月团队业绩统计</h2></center></Col>            
                    <Col span="11" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="ios-pie" style="margin-right:10px"></Icon>完成工单数
                            <Row style="padding-top:10px;"><center>{{teamCount}}</center></Row>                            
                        </Card>
                    </Col>         
                    <Col span="11" style="margin:10px 2% 10px 2%;text-align:center">
                        <Card><Icon type="checkmark-circled" style="margin-right:10px"></Icon>平均有效外企
                            <Row style="padding-top:10px;"><center>{{avagTeamValid}}</center></Row>                            
                        </Card>
                    </Col> 
                </div>
            </Col>            
        </Row>
        <Row :gutter="10" class="margin-top-10">
            <Col span="24" :style="{marginBottom: '10px'}">
                <Card style="height:400px">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        团队完成工单统计
                    </p>
                    <div class="data-source-row">
                        <person-sum></person-sum>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10" style="height:600px">
            <Col span="24" :style="{marginBottom: '10px'}">
                <Card style="height:600px">
                    <div class="data-source-row">
                        <!-- <c-statistical></c-statistical> -->
                        <person-sum-table></person-sum-table>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import personSum from './personSum'
import personSumTable from './personSumTable'

export default {
    components:{
        personSum,
        personSumTable
    },
    data(){
        return{
            count:"",
            teamCount:"",
            index:"",
            operatorId:"",
            validTimes:"",
            avagPersonValid:"",
            avagTeamValid:"",
            details:""
        }
    },
    methods: {
        init(){
            let _self = this
            let url = `api/workorder/getFininshWorkOrderSortInfo`
            let config = {
                params:{
                    beginTime:"2018-5-1",
                    endTime:"2018-6-1",
                    departId:"11572"
                }
            }
            this.$http.get(url,config).then(function(res){
                console.log(res.data.data)
                _self.count = res.data.data.count
                _self.teamCount = res.data.data.teamCount
                _self.index = res.data.data.index
                _self.operatorId = res.data.data.operatorId
                _self.validTimes = res.data.data.validTimes
                _self.avagPersonValid = res.data.data.avagPersonValid
                _self.avagTeamValid = res.data.data.avagTeamValid
                _self.detail = res.data.data.detail
            })
            
        }
    },
    created () {
        this.init()
    }
}
</script>

<style lang="less">
    @import "../home.less";
    @import "../../../styles/common.less";
</style>

