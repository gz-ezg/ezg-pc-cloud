<template>
    <div>
        <Tabs value="name2">
            <TabPane label="服务中" name="name2">
                <in-the-service></in-the-service>
            </TabPane>
            <TabPane label="未开始" name="name1">
                <notbegin></notbegin>
            </TabPane>
            <TabPane label="已终止" name="name4">
                <stop></stop>
            </TabPane>
            <TabPane label="欠费" name="name3">
                <arrears></arrears>
            </TabPane>
            <TabPane label="全部" name="name5">
                <all2></all2>
            </TabPane>
        </Tabs>
        <change-the-length></change-the-length>
        <product-changes></product-changes>
        <distribution-of-accounting></distribution-of-accounting>
        <change-log></change-log>
        <company-cancellation></company-cancellation>
        <CampayIndex></CampayIndex>
        <account-service></account-service>
        <service-plan></service-plan>
        <monthly-summary></monthly-summary>
        <service-tracking></service-tracking>
        <business-tracking></business-tracking>
        <!-- <company-detail></company-detail> -->
        <service-item></service-item>
        <service-tracking2></service-tracking2>
        <detail></detail>
    </div>
</template>

<script>
    import ChangeTheLength from './accountantOrderIndex/changeTheLength.vue'
    import Notbegin from './accountantOrderIndex/notbegin'
    import Arrears from './accountantOrderIndex/arrears'
    import All2 from './accountantOrderIndex/all'
    import Stop from './accountantOrderIndex/stop'
    import InTheService from './accountantOrderIndex/inTheService'
    import ProductChanges from './accountantOrderIndex/productChanges'
    import distributionOfAccounting from '../BookkeepingAgency/BookkeepingAgencyIndex/DistributionOfAccounting'
    import changeLog from '../BookkeepingAgency/BookkeepingAgencyIndex/ChangeLog'
    import companyCancellation from '../BookkeepingAgency/BookkeepingAgencyIndex/CompanyCancellation'
    import CampayIndex from '../accountantField/accountantFieldIndex/campay'
    import AccountService from './accountantOrderIndex/accountService'
    import ServicePlan from './accountantOrderIndex/servicePlan'
    import MonthlySummary from './accountantOrderIndex/monthlySummary'
    import ServiceTracking from './accountantOrderIndex/serviceTracking'
    import ServiceTracking2 from './accountantOrderIndex/serviceTracking2'
    import BusinessTracking from './accountantOrderIndex/businessTracking'
    // import companyDetail from '../BookkeepingAgency/BookkeepingAgencyIndex/CompanyDetail'
    import ServiceItem from './accountantOrderIndex/serviceItems'
    import detail from '../detail.vue'
    import All from "../../accounterManager/proxyAccounterManger/all/all";

    export default {
        name:'accountantOrder_index',
        components:{
            All,
            All2,
            detail,
            ServiceItem,
            // companyDetail,
            Stop,
            Arrears,
            Notbegin,
            InTheService,
            ChangeTheLength,
            CampayIndex,
            ProductChanges,
            changeLog,
            distributionOfAccounting,
            companyCancellation,
            AccountService,
            ServicePlan,
            MonthlySummary,
            ServiceTracking,
            ServiceTracking2,
            BusinessTracking,
        },
    }
</script>