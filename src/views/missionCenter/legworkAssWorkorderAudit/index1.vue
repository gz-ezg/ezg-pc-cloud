<template>
    <div>
        <div style="min-width:900px;">
            <Tabs value="name1">
                <TabPane label="工单审批" name="name1">
                    <un-approve-list></un-approve-list>
                </TabPane>
                <TabPane label="查看已审批" name="name2">
                    <approve-list></approve-list>
                </TabPane>
            </Tabs>
        </div>
        <!-- <aduit-log></aduit-log> -->
    </div>
</template>

<script>
    import unApproveList from './index'
    import approveList from './approveList'
    export default {
        name: "index1",
        components:{
            unApproveList,
            approveList
        }
    }
</script>

<style>

</style>