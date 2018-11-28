<template>
    <div>
        <div style="min-width:900px;">
            <Tabs value="name1">
                <TabPane label="订单审批" name="name1">
                    <un-approve-list></un-approve-list>
                </TabPane>
                <TabPane label="查看已审批" name="name2">
                    <approve-list></approve-list>
                </TabPane>
            </Tabs>
        </div>
        <!-- <aduit-log></aduit-log> -->
        <deal-with-approve :payDirs="payDirs"></deal-with-approve>
        <order-detail :payDirs="payDirs"></order-detail>
    </div>
</template>

<script>
import unApproveList from './unApproveList'
import approveList from './approveList';

// import aduitLog from './common/aduitLog'
import dealWithApprove from './common/dealWithApprove'
import orderDetail from './common/orderDetail'

export default {
    name: "orderApprove_index",
    components:{
        unApproveList,
        approveList,
        // aduitLog,
        dealWithApprove,
        orderDetail
    },
    data(){
        return{
            payDirs: []
        }
    },
    methods: {
        get_data_center(){
            let _self = this
            let params = "payDirs"

            function success(res){
                _self.payDirs = res.data.data.payDirs
            }

            this.$GetDataCenter(params, success)
        },
    },
    created() {
        this.get_data_center()
    },
}
</script>
