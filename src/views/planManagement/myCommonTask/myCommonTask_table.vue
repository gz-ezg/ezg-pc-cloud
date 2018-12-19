<template>
    <div>
        <Tabs value="name1">
            <TabPane label="未开始" name="name1">
                <notbegin :managestatus="managestatus"></notbegin>
            </TabPane>
            <TabPane label="服务中" name="name2">
                <serving :managestatus="managestatus"></serving>
            </TabPane> 
            <TabPane label="已完结" name="name3">
                <finished :managestatus="managestatus"></finished>
            </TabPane>
            <TabPane label="全部" name="name4">
                <all :managestatus="managestatus"></all>
            </TabPane>
        </Tabs>
        <income-detail :id="id" v-if="openIncomeDetail" @close="close"></income-detail>
    </div>
</template>

<script>
import incomeDetail from './incomeDetail'
import Flow from './myCommonTaskIndex/flow'

import Serving from './myCommonTaskIndex/serving'
import All from './myCommonTaskIndex/all'
import Finished from './myCommonTaskIndex/finished'
import Notbegin from './myCommonTaskIndex/notbegin'

    export default {
        name:'plantaskmanagement',
        components:{
            Serving,
            All,
            Finished,
            Notbegin,
            Flow,
            incomeDetail
        },
        data(){
            return{
                managestatus:[],
                hash:new Map(),
                id: "",
                openIncomeDetail: false
            }
        },
        methods:{
            close(e){
                this.openIncomeDetail = false
            }
        },
        created(){
            let _self = this
            this.$bus.on("PLAN_WORKORDER_INCOME_DETAIL", (e)=>{
                _self.id = e
                _self.openIncomeDetail = true
            })
        }

    }
</script>