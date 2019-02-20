<template>
    <div>
        <Tabs value="name1">
            <TabPane label="下线客户审批" name="name1">
                <Untreated></Untreated>
            </TabPane>
            <TabPane label="查看已审批" name="name2">
                <Processed></Processed>
            </TabPane>
        </Tabs>
        <Approval></Approval>
        <Detail></Detail>
        <Aduit-log></Aduit-log>
    </div>
</template>

<script>
    import Processed from './processed'
    import Untreated from './untreated'
    import Approval from './common/approval'
    import Detail from './common/detail'
    import AduitLog from './common/aduitLog'

    export default {
        name:'offlineCustomerApproval_index',
        components:{
            Processed,
            Untreated,
            Approval,
            Detail,
            AduitLog
        },
        data() {
            return {

            }
        }
    }
</script>