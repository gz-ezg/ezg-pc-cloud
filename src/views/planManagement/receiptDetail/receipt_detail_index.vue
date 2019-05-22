<template>
    <div>
        <div style="min-width:900px;">
            <Tabs value="name1">
                <TabPane label="欠款明细" name="name1">
                    <arrears-receipt-detail-list></arrears-receipt-detail-list>
                </TabPane>
                <TabPane label="全部明细" name="name2">
                    <all-receipt-detail-list></all-receipt-detail-list>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
    import arrearsReceiptDetailList from './arrears_receipt_detail_list.vue'
    import allReceiptDetailList from './all_receipt_detail_list.vue'

    export default {
        components: {
            arrearsReceiptDetailList,
            allReceiptDetailList
        },
        data(){

            return{
                loading: false,
                //  新增数据
                formItem:{},
                openUpdateOrderItemPlan:false
            }
        },
        methods:{
        },
        created(){
            let _self =this;
            this.$bus.on("update_order_item_plan",(e)=>{
                _self.openUpdateOrderItemPlan = true
        })
        }
    }
</script>