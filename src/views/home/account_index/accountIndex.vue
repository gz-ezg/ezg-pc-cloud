<template>
    <div style="min-width:1500px">
        <Row :gutter="10" class="margin-top-10">
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card style="height:1200px">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        工作进度分析
                    </p>
                    <div class="data-source-row">
                        <work-progress :month="month"></work-progress>
                    </div>
                </Card>
            </Col>
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card style="height:1200px">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        工作量分析
                    </p>
                    <div class="data-source-row">
                        <workload :month="month"></workload>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10">
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card style="height:1000px">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        业务分析图
                    </p>
                    <div class="data-source-row">
                        <bussiness-type :year="year"></bussiness-type>
                    </div>
                </Card>
            </Col>
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card style="height:1000px">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        新增/下线客户统计
                    </p>
                    <div class="data-source-row">
                        <offline-statistical :month="month"></offline-statistical>
                    </div>
                </Card>
            </Col>
        </Row>
        <common-module></common-module>
    </div>
</template>

<script>
import bussinessType from './bussinessType'
import offlineStatistical from './offlineStatistical'
import workProgress from './progress'
import workload from './workload'
import commonModule from './common_module';

export default {
    components:{
        bussinessType,
        offlineStatistical,
        workProgress,
        workload,
        commonModule
    },
    data(){
        return {
            year:"",
            month:"",
            day:""
        }
    },
    methods:{
        get_local_day(){
            let _self = this
            let date = new Date()
            _self.year = date.getFullYear()
            if(date.getMonth()<8){
                _self.month = _self.year + "-0" + (date.getMonth() + 1)
            }else{
                _self.month = _self.year + "-" + (date.getMonth() + 1)
            }
            _self.day = date.getDate() + 1
        }
    },
    created(){
        this.get_local_day()
    }
}
</script>

