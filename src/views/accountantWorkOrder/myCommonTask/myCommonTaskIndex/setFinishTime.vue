<template>
    <Modal
        v-model="openSetFinishTime"
        width="400"
        title="设置计划完成时间"
    >
        <Row :gutter="10" style="margin-bottom:20px">
            <Col span="8"><h3>服务公司：</h3></Col>
            <Col span="16"><h3>{{selectRow.companyname}}</h3></Col>
        </Row>
        <Row :gutter="10" style="margin-bottom:20px">
            <Col span="8"><h3>产品名称：</h3></Col>
            <Col span="16"><h3>{{selectRow.product}}</h3></Col>
        </Row>
        <Row :gutter="10" style="margin-bottom:20px">
            <Col span="8"><h3>请选择完成时间：</h3></Col>
            <Col span="16"><DatePicker type="date" placeholder="" style="width: 100%" size="small" v-model="personPlanFinishTime"></DatePicker></Col>
        </Row>
        <div slot="footer">
            <Button long type="primary" @click="submit" :loading="loading">设置</Button>
        </div>
    </Modal>
</template>

<script>
import {DateFormat} from '../../../../libs/utils.js'

export default {
    data(){
        return{
            openSetFinishTime: false,
            loading: false,
            selectRow:{

            },
            personPlanFinishTime:new Date()
        }
    },
    methods:{
        submit(){
            let _self = this
            
            _self.loading = true
            let url = `api/order/work/order/set/person/finish/date`

            let config = {
                id: _self.selectRow.id,
                person_plan_finish_date: DateFormat(_self.personPlanFinishTime)
            }

            // console.log(config)

            function success(res){
                _self.openSetFinishTime = false
                _self.loading = false
                _self.selectRow = {}
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        }
    },
    created(){
        let _self = this
        _self.$bus.on("OPEN_SET_FINISH_TIME",(e)=>{
            _self.selectRow = {}
            _self.openSetFinishTime = true
            _self.selectRow = e
            // console.log(e)
        })
    }
}
</script>
