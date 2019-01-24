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
    </div>
</template>

<script>
import unApproveAbList from './unApproveAbList'
import ApproveAbList from './ApproveAbList'

export default {
    components:{
        unApproveAbList,
        ApproveAbList
    },
    data() {
        return {

        }
    }
}
</script>