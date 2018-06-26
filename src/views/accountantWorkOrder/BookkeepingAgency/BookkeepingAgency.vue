<template>
    <div>
        <Tabs value="name1">
            <TabPane label="服务中" name="name1">
                <servicing></servicing>
            </TabPane>
            <TabPane label="未开始" name="name2">
                <notbegin></notbegin>
            </TabPane>
            <TabPane label="欠费" name="name3">
                <arrears></arrears>
            </TabPane>
            <TabPane label="已终止" name="name4">
                <stop></stop>
            </TabPane>
            <TabPane label="全部" name="name5">
                <all></all>
            </TabPane>
        </Tabs>
        <change-the-length></change-the-length>
        <cheek-error></cheek-error>
        <product-changes></product-changes>
        <distribution-of-accounting></distribution-of-accounting>
        <change-log></change-log>
        <company-detail></company-detail>
        <order-detail></order-detail>
        <company-cancellation></company-cancellation>
        <detailx></detailx>
    </div>
</template>

<script>
    import Bus from '../../../components/bus'
    import CheekError from './BookkeepingAgencyIndex/cheekError'
    import ProductChanges from '../accountantOrder/accountantOrderIndex/productChanges'
    import ChangeTheLength from '../accountantOrder/accountantOrderIndex/changeTheLength'
    import distributionOfAccounting from './BookkeepingAgencyIndex/DistributionOfAccounting'
    import changeLog from './BookkeepingAgencyIndex/ChangeLog'
    // import companyDetail from './BookkeepingAgencyIndex/CompanyDetail'
    import companyDetail from '../../woa-components/companyDetail/CompanyDetail.vue'
    import orderDetail from './BookkeepingAgencyIndex/OrderDetail'
    import companyCancellation from './BookkeepingAgencyIndex/CompanyCancellation'
    import Notbegin from './BookkeepingAgencyIndex/Table/notbegin'
    import Servicing from './BookkeepingAgencyIndex/Table/servicing'
    import All from './BookkeepingAgencyIndex/Table/all'
    import Arrears from './BookkeepingAgencyIndex/Table/arrears'
    import Stop from './BookkeepingAgencyIndex/Table/stop'
    import Detailx from '../detail.vue'
    export default {
        components:{
            Detailx,
            Stop,
            Arrears,
            All,
            Notbegin,
            Servicing,
            companyDetail,
            changeLog,
            orderDetail,
            companyCancellation,
            distributionOfAccounting,
            ChangeTheLength,
            ProductChanges,
            CheekError,
        },
    }
</script>