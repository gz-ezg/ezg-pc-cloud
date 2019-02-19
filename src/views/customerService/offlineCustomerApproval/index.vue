<template>
    <div>
        <Tabs value="name1">
            <TabPane label="下线客户审批" name="name1">
                <Untreated></Untreated>
            </TabPane>
            <TabPane label="查看已审批" name="name2">
                
            </TabPane>
        </Tabs>
        <Approval></Approval>
    </div>
</template>

<script>
    import Untreated from './untreated'
    import Approval from './approval'

    export default {
        name:'offlineCustomerApproval_index',
        components:{
            Untreated,
            Approval
        },
        data() {
            return {

            }
        }
    }
</script>