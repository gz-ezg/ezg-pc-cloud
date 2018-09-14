<template>
    <div>
        <Tabs value="name1">
            <TabPane label="未处理" name="name1">
                <Untreated></Untreated>
            </TabPane>
            <TabPane label="已处理" name="name2">
                <processed></processed>
            </TabPane>
        </Tabs>
        <customer-detail></customer-detail>
        <company-detail></company-detail>
        <Add></Add>
        <update></update>
        <show></show>
    </div>
</template>

<script>
    import Untreated from './untreated.vue'
    import Processed from './processed.vue'
    import customerDetail from '../../../woa-components/customerDetail/channelCustomer'
    import companyDetail from '../../../woa-components/companyDetail/CompanyDetail'
    import Add from '../add'
    import update from '../update.vue'
    import show from '../show.vue'
    import Bus from '../../../../components/bus.js'

    export default {
        name:'offlineCustomer_index',
        components:{
            Untreated,
            Processed,
            customerDetail,
            companyDetail,
            Add,
            show,
            update
        },
        data(){
            return{
                isOpen:false
            }
        },
        created(){
        }
    }
</script>

