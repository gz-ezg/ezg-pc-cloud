<template>
    <Modal
            v-model="openPlanReceiptItem"
            title="收款流水"
            width="600"

    >
        <div>
            <Card style="min-width:570px">
                <!--<Row style="margin-bottom:10px">
                    <search-model :data="searchData" @search="search"></search-model>
                </Row>
    -->
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
                currentRow: {},
                loading: true,
                total: 0,
                data:[],
                openPlanReceiptItem:false,
                header: [
                    {
                        title: "缴费时间",
                        key: 'transcationtime',
                        width: 120
                    },
                    {
                        title: "缴费渠道",
                        key: 'paydir',
                        minWidth: 140
                    },
                    {
                        title: "缴费金额",
                        key: "transcationamount",
                        minWidth: 140
                    },
                    {
                        title: "状态",
                        key: 'processtype',
                        minWidth: 120
                    }
                ]
            }
        },
        methods:{
            get_data(){
                var _self = this

                var url = 'api/order/balance/detail'
                var config = {
                    params:{
                        balanceId:_self.currentRow.balance_id
                    }
                }

                _self.$http.get(url,config).then(function(res){

                    _self.data = res.data.data.balanceItem
                    _self.loading = false;
                    for(let i = 0; i < _self.data.length; i++){
                        if(_self.data[i].transcationtime){
                            _self.data[i].transcationtime = _self.data[i].transcationtime.slice(0,10)
                        }
                    }
                })

            },
            search(){

            }
        },
        created(){

            this.$bus.on("openPlanReceiptItem",(e)=>{
                this.currentRow = e.currentRow;
                this.openPlanReceiptItem = true
                this.get_data()
            })
            this.$bus.on("openCompanyReceiptItem_arreas",(e)=>{

                this.currentRow = e.currentRow
            console.log(this.currentRow)
            this.openCompanyReceiptItem = true
            this.get_data()
              })
        }
    }
</script>
