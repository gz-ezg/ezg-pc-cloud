<template>
    <div>
        <Tabs value="name1">
            <!-- <TabPane label="未开始" name="name1">
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
            </TabPane> -->
            <TabPane label="未开始" name="name1">
                <notbegin @open-flow-chart="open_flow_chart"></notbegin>
            </TabPane>
            <TabPane label="服务中" name="name2">
                <serving @open-flow-chart="open_flow_chart"></serving>
            </TabPane>
            <TabPane label="已完结" name="name3">
                <finished @open-flow-chart="open_flow_chart"></finished>
            </TabPane>
            <TabPane label="全部" name="name4">
                <all @open-flow-chart="open_flow_chart"></all>
            </TabPane>
        </Tabs>
        <income-detail :id="id" v-if="openIncomeDetail" @close="close"></income-detail>
        <Modal
            v-model="flowChartShow"
            title="查看流程图"
            width="80%">
            <center>
                <img :src='flowChartImg' witdh="100%"/>
            </center>
            <div slot="footer"></div>
        </Modal>
		<stop-work-order v-if="gobalWorkorderStopWorkOrder"></stop-work-order>
		<work-order-log v-if="gobalWorkorderStopWorkOrderList"></work-order-log>
    </div>
</template>

<script>
import incomeDetail from './incomeDetail'

import all from './myCommonTaskIndex/tabpanes/all'
import finished from './myCommonTaskIndex/tabpanes/finished'
import serving from './myCommonTaskIndex/tabpanes/servicing'
import notbegin from './myCommonTaskIndex/tabpanes/notbegin'
import StopWorkOrder from "@/views/commercialManagement/myCommonTask/StopWorkOrder";
import workOrderLog from "@/views/commercialManagement/myCommonTask/workOrderLog";

    export default {
        name:'plantaskmanagement',
        components:{
            incomeDetail,
            all,
            finished,
            serving,
            notbegin
        },
        data(){
            return{
                managestatus:[],
                id: "",
                openIncomeDetail: false,
                flowChartShow: false,
                flowChartImg: ""
            }
        },
        methods:{
            close(e){
                this.openIncomeDetail = false
            },
            open_flow_chart(e){
                let _self = this
                _self.flowChartShow = true
                _self.flowChartImg = '/api/dataCenter/activiti/getResourceInputStreamObj?bussinessKey=' + e +'&bussinessType=20&time='+new Date()
            }
        },
        created(){
            let _self = this
            this.$bus.on("PLAN_WORKORDER_INCOME_DETAIL", (e)=>{
                _self.id = e
                _self.openIncomeDetail = true
            })
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