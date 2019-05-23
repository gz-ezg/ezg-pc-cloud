<template>
    <div>
        <div style="min-width:900px;">
            <Tabs value="name1">
                <TabPane label="欠款明细" name="name1">
                    <receipt-detail-list :finish_flag="finish_flag" ></receipt-detail-list>
                </TabPane>
                <TabPane label="全部明细" name="name2">
                    <receipt-detail-list ></receipt-detail-list>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>

    import receiptDetailList from './receipt_detail_list.vue'

    export default {
        components: {
            receiptDetailList
        },
        data(){

            return{
                finish_flag:'Y',
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