<template>
    <div>
        <!-- <Spin v-if="loading" fix></Spin> -->
        <Tabs v-model="openTabPane" v-if="!loading">
            <TabPane label="会计服务进度" name="account">
                <cycle-service :customer="customer" style="margin-bottom:20px"></cycle-service>
                <one-off-service :workOrderStatus="workOrderStatus_map" departname="'ACCOUNT'" :customer="customer"></one-off-service>
            </TabPane>
            <TabPane label="商事服务进度" name="commercial" >
                <one-off-service :workOrderStatus="workOrderStatus_map" departname="'BUSSINESS'" :customer="customer"></one-off-service>
            </TabPane>
            <TabPane label="企划服务进度" name="plan">
                <one-off-service :workOrderStatus="workOrderStatus_map" departname="'PLAN'" :customer="customer"></one-off-service>
            </TabPane>
            <TabPane label="审计服务进度" name="aduit">
                <one-off-service :workOrderStatus="workOrderStatus_map" departname="'ADUIT'" :customer="customer"></one-off-service>
            </TabPane>
            <TabPane label="行政服务进度" name="administration">
                <one-off-service :workOrderStatus="workOrderStatus_map" departname="'EXECUTIVE'" :customer="customer"></one-off-service>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import oneOffService from './model/oneOffService'
import cycleService from './model/cycleService'

export default {
    props: {
        customer:{
            type: [String, Object, Array]
        }
    },
    components:{
        oneOffService,
        cycleService
    },
    data(){
        return {
            loading: true,
            openTabPane: "account",
            workOrderStatus_map: new Map(),
        }
    },
    methods: {
        getDataCenter(){
            let _self = this
            let params = "workOrderStatus"

            function finish(res){
                _self.workOrderStatus_map = _self.$array2map(res.data.data.workOrderStatus)
                _self.loading = false
            }

            this.$GetDataCenter(params, finish)
        }
    },
    created(){
        this.getDataCenter()
    }
}
</script>
