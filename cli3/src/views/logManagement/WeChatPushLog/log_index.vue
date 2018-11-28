<template>
    <div>
        <Tabs value="name1">
            <TabPane icon="search" label="微信推送日志" name="name1">
                <sendLog></sendLog>
            </TabPane>
            <!-- <TabPane icon="search" label="客户绑定信息" name="name2">
                <processed></processed>
            </TabPane> -->
        </Tabs>
        <!-- <customer-detail></customer-detail> -->
        <!-- <company-detail></company-detail> -->
        <!-- <Add></Add> -->
    </div>   
</template>

<script>
    import sendLog from "./sendLog.vue";
    // import Processed from './processed.vue'
    // import customerDetail from '../../../woa-components/customerDetail/channelCustomer'
    // import companyDetail from '../../../woa-components/companyDetail/CompanyDetail'
    // import companyDetail from '../../../accountantWorkOrder/BookkeepingAgency/BookkeepingAgencyIndex/CompanyDetail'
    // import Add from '../add'

    export default {
        name: "WeChatPushLog",
        components:{
            sendLog,
            // Processed,
            // customerDetail,
            // companyDetail,
            // // companyDetail,
            // Add
        }
    }
</script>

