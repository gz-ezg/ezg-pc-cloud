<template>
    <div>
        <div style="min-width:900px;">
            <Tabs value="name1">
                <TabPane label="异常工单审批" name="name1">
                    <un-approve-ab-list></un-approve-ab-list>
                </TabPane>
                <TabPane label="查看已审批" name="name2">
                    <approve-ab-list></approve-ab-list>
                </TabPane>
            </Tabs>
        </div>
        <ab-order-detail></ab-order-detail>
        <aduit-log></aduit-log>
        <deal-ab-approve></deal-ab-approve>
    </div>
</template>

<script>
import unApproveAbList from './unApproveAbList'
import ApproveAbList from './ApproveAbList'

import dealAbApprove from './common/dealAbApprove'
import abOrderDetail from './common/abOrderDetail'
import aduitLog from './common/aduitLog'

export default {
    name: 'abOrderApprove_index',
    components:{
        unApproveAbList,
        ApproveAbList,
        abOrderDetail,
        aduitLog,
        dealAbApprove
    },
    data() {
        return {

        }
    }
}
</script>