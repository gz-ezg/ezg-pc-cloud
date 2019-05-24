<template>
    <Modal
            v-model="openCompanyReceiptItem"
            title="企业流水"
            width="400"

    >
        <div>
            <Card style="min-width:370px">
                <Row style="margin-top: 10px;">
                    <Table
                            :loading="loading"
                            highlight-row
                            size="small"
                            border
                            @on-row-click="select_row"
                            :columns="header"
                            :data="data"></Table>
                </Row>
            </Card>

        </div>
    </Modal>

</template>

<script>

    export default {

        components:{

        },
        data(){
            return {
                openCompanyReceiptItem:false,
                loading: true,
                data:[],
                currentRow:{},
                header: [
                    {
                        title: "时间",
                        key: 'receipt_period',
                        width: 120

                    },
                    {
                        title: "金额",
                        key: 'amount',
                        minWidth: 120
                    }
                ]
            }
        },
        methods:{
            get_data(){
                var _self = this

                var url = 'api/order/work/order/plan/receipt/detail/list'
                var config = {
                    params:{
                        order:_self.order,
                        page:_self.page,
                        pageSize:_self.pageSize,
                        workOrderId:_self.currentRow.work_order_id

                    }
                }

                _self.$http.get(url,config).then(function(res){

                    _self.data = res.data.data
                    _self.loading = false;
                    for(let i = 0; i < _self.data.length; i++){
                        if(_self.data[i].receipt_period){
                            _self.data[i].receipt_period = _self.data[i].receipt_period.slice(0,10)
                        }
                    }
                })

            }
        },
        created(){
            this.$bus.off("openCompanyReceiptItem",false)
            this.$bus.on("openCompanyReceiptItem",(e)=>{

                this.currentRow = e.currentRow
            console.log(this.currentRow)
            this.openCompanyReceiptItem = true
            this.get_data()
        })

        }
    }
</script>
