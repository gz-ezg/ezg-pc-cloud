<template>
    <div>
            <Row :gutter="10" class="margin-top-10">
                <Col span="24" :style="{marginBottom: '10px'}">
                    <Card>
                        <center class="card-title">
                            <Select transfer v-model="year" style="width:100px;margin-right:20px" transfer>
                                <Option value="2017">2017</Option>
                                <Option value="2018">2018</Option>
                                <Option value="2019">2019</Option>
                                <Option value="2020">2020</Option>                                
                            </Select>
                            年
                            <Select transfer v-model="month" style="width:100px;margin-left:20px;margin-right:20px" transfer>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                                <Option value="6">6</Option>
                                <Option value="7">7</Option>
                                <Option value="8">8</Option>
                                <Option value="9">9</Option>
                                <Option value="10">10</Option>
                                <Option value="11">11</Option>
                                <Option value="12">12</Option>
                            </Select>
                            月
                        </center>
                    </Card>               
                </Col>
            </Row>
            <Row :gutter="10" class="margin-top-10">
                <Col span="12" :style="{marginBottom: '10px'}">
                    <Card>
                        <p slot="title" class="card-title">
                            <Icon type="android-map"></Icon>
                            生产总值统计
                        </p>
                        <div class="data-source-row">
                            <GDPStatistics :time="temp"></GDPStatistics>
                        </div>
                    </Card>
                    
                </Col>
                <Col span="12" :style="{marginBottom: '10px'}">
                    <Card>
                        <p slot="title" class="card-title">
                            <Icon type="android-map"></Icon>
                            线索价值总额
                        </p>
                        <div class="data-source-row">
                            <TotalClueValue :time="temp"></TotalClueValue>
                        </div>
                    </Card>
                </Col>                
            </Row>
            <Row>
                <Col span="8" :style="{marginBottom: '10px'}">
                    <Card>
                        <p slot="title" class="card-title">
                            <Icon type="android-map"></Icon>
                            节点总值统计
                        </p>
                        <div class="data-source-row">
                            <NodeValue :time="temp"></NodeValue>
                        </div>
                    </Card>
                </Col>
                <Col span="8" :style="{marginBottom: '10px'}">
                    <Card>
                        <p slot="title" class="card-title">
                            <Icon type="android-map"></Icon>
                            完成情况统计
                        </p>
                        <div class="data-source-row">
                            <Completion :time="temp"></Completion>
                        </div>
                    </Card>
                </Col>               
                <Col span="8" :style="{marginBottom: '10px'}">
                    <Card>
                        <p slot="title" class="card-title">
                            <Icon type="android-map"></Icon>
                            订单产值统计
                        </p>
                        <div class="data-source-row">
                            <OrderTotal :time="temp"></OrderTotal>
                        </div>
                    </Card>
                </Col>               
            </Row>
            <Row class="margin-top-10">
                <Col span="24" :style="{marginBottom: '10px'}">
                    <Card>
                        <p slot="title" class="card-title">
                            <Icon type="android-map"></Icon>
                            外勤产值分析
                        </p>
                        <div class="data-source-row">
                            <FieldProduction :time="temp"></FieldProduction>
                        </div>
                    </Card>
                </Col>        
            </Row>
            <Row class="margin-top-10">
                <Col span="24" :style="{marginBottom: '10px'}">
                    <Card>
                        <p slot="title" class="card-title">
                            <Icon type="android-map"></Icon>
                            人员工作统计总汇表
                        </p>
                        <div class="data-source-row">
                            <WorkSummary :time="temp"></WorkSummary>
                        </div>
                    </Card>
                </Col>        
            </Row>
            <Row class="margin-top-10">
                <Col span="24" :style="{marginBottom: '10px'}">
                    <Card>
                        <p slot="title" class="card-title">
                            <Icon type="android-map"></Icon>
                            外勤明细表
                        </p>
                        <div class="data-source-row">
                            <FieldSubsidiary :time="temp"></FieldSubsidiary>
                        </div>
                    </Card>
                </Col>        
            </Row>
            <Row class="margin-top-10">
                <Col span="24" :style="{marginBottom: '10px'}">
                    <Card>
                        <p slot="title" class="card-title">
                            <Icon type="android-map"></Icon>
                            外勤有效性分析
                        </p>
                        <div class="data-source-row">
                            <Analysis :time="temp"></Analysis>
                        </div>
                    </Card>
                </Col>        
            </Row>                   
    </div>
</template>

<script>
import  Analysis from './Analysis'
import  Completion from './Completion'
import  FieldProduction from './FieldProduction'
import  FieldSubsidiary from './FieldSubsidiary'
import  GDPStatistics from './GDPStatistics'
import  OrderTotal from './OrderTotal'
import  NodeValue from './NodeValue'
import  TotalClueValue from './TotalClueValue'
import  WorkSummary from './WorkSummary'

export default {
    name:'statistical',
    components:{
        Analysis,
        Completion, 
        FieldProduction, 
        FieldSubsidiary, 
        GDPStatistics, 
        OrderTotal, 
        NodeValue, 
        TotalClueValue, 
        WorkSummary 
    },
    data(){
        return{
            year:"",
            month:""
        }
    },
    computed:{
        temp(){
            if(this.month<10){
                return this.year + '0' + this.month
            }else{
                return this.year + this.month
            }           
        }
    },
    methods:{
        init(){
            let date = new Date()
            let year1 = date.getFullYear()
            let month1 = date.getMonth()+1
            this.year = year1.toString()
            this.month = month1.toString()
        }
    },
    created(){
        this.init()
    }
}
</script>

<style>
    .card-title{
        color: #abafbd;
    }
    .data-source-row{
        height: 300px;
    }
    margin-top-10{
        margin-top:10px;
    }
</style>

