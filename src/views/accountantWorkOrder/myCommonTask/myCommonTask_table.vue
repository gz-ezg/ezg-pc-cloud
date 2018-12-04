<template>
    <div>
        <Tabs value="name1" v-if="loading">
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
    </div>
</template>

<script>
import Flow from './myCommonTaskIndex/flow'

import Serving from './myCommonTaskIndex/serving'
import All from './myCommonTaskIndex/all'
import Finished from './myCommonTaskIndex/finished'
import Notbegin from './myCommonTaskIndex/notbegin'

    export default {
        name:'accounttaskmanagement_index',
        components:{
            Serving,
            All,
            Finished,
            Notbegin,
            Flow,
        },
        data(){
            return{
                managestatus:[],
                loading: false
            }
        },

        methods:{
            getGlobalDataCenter(){
                let _self = this
                // let temp = JSON.parse(localStorage.getItem("global_datacenter"))
                let params = "managestatus"

                function success(res){
                    console.log(res)
                    _self.managestatus = res.data.data.managestatus
                    _self.loading = true
                }
                
                this.$GetDataCenter(params, success)
            }
        },
        created() {
            this.getGlobalDataCenter()  
        },
    }
</script>