<template>
    <div style="min-width:1100px">
        <Row>
            <Col span="24" style="background-color:#FFFFFF;padding:10px">
                <div>
                    <Col span="24" style="padding:20px"><center><h2>外勤及工单分析</h2></center></Col>
                    <Col span="24" style="padding-bottom:20px">
                        <center>
                            <Select v-model="type" size="small" style="width:150px;margin-right:20px" placeholder="所有">
                                <Option value="">所有</Option>
                                <Option value="invalid">无效</Option>
                                <Option value="valid">有效</Option>
                                <Option value="hit">命中</Option>
                            </Select>
                            <DatePicker  size="small" type="daterange" placeholder="选择日期" style="width: 200px" v-model="dataRange" @on-change="date_change" placement="bottom" />
                        </center>
                    </Col>    
                </div>                
            </Col>     
        </Row>
        <Row :gutter="10" class="margin-top-10">
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card style="height:500px">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        外勤分析
                    </p>
                    <div class="data-source-row">
                        <field-anaylist :date="dateTemp" :type="type"></field-anaylist>
                    </div>
                </Card>
            </Col>
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card style="height:500px">
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        工单分析
                    </p>
                    <div class="data-source-row">
                        <workorder-anaylist  :date="dateTemp" :type="type"></workorder-anaylist>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10" style="height:600px">
            <Col span="24" :style="{marginBottom: '10px'}">
                <Card style="height:600px">
                    <div class="data-source-row">
                        <person-sum-table  :date="dateTemp" :type="type"></person-sum-table>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import fieldAnaylist from './field_anaylist';
import workorderAnaylist from './workorder_anaylist';
import personSumTable from './personSumTable';

export default {
    components:{
        fieldAnaylist,
        workorderAnaylist,
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
            details:"",
            type:"",
            dataRange:[],
            dateTemp:[]
        }
    },
    methods: {
        date_change(e){
            this.dateTemp = []
            this.dateTemp.push(e[0])
            this.dateTemp.push(e[1])
        }
    },
    created () {
    }
}
</script>

<style lang="less">
    @import "../home.less";
    @import "../../../styles/common.less";
</style>

