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
			<TabPane label="暂停" name="name4">
			    <stop :managestatus="managestatus"></stop>
			</TabPane>
            <TabPane label="全部" name="name5">
                <all :managestatus="managestatus"></all>
            </TabPane>
        </Tabs>
		<stop-work-order v-if="gobalWorkorderStopWorkOrder"></stop-work-order>
		<work-order-log v-if="gobalWorkorderStopWorkOrderList"></work-order-log>
    </div>
</template>

<script>
import Flow from './myCommonTaskIndex/flow'

import Serving from './myCommonTaskIndex/serving'
import All from './myCommonTaskIndex/all'
import Finished from './myCommonTaskIndex/finished'
import Notbegin from './myCommonTaskIndex/notbegin'
import Stop from './myCommonTaskIndex/stop'

    export default {
        name:'accounttaskmanagement_index',
        components:{
            Serving,
            All,
            Finished,
            Notbegin,
            Flow,
			Stop
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
		computed:{
			gobalWorkorderStopWorkOrder(){
				return this.$store.state.gobal.gobalWorkorderStopWorkOrder
			},
			gobalWorkorderStopWorkOrderList(){
				return this.$store.state.gobal.gobalWorkorderStopWorkOrderList
			}
		}
    }
</script>