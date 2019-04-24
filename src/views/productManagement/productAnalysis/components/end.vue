<template>
    <div>
        <Card title="产品销售分析">
            <Row :gutter="16" type="flex" justify="space-around">
                <div class="proa">
                    <span>销售总额占比</span>
                    <span><h3>{{this.arr.allSale}}</h3></span>
                </div>
                <div class="proa">
                    <span>全年销售额占比</span>
                    <span><h3>{{this.arr.yearSale}}</h3></span>
                </div>
                <div class="proa">
                    <span>产品销售数量排行</span>
                    <span><h3>{{this.arr.numberRank}}</h3></span>
                </div>
                <div class="proa">
                    <span>产品销售金额排行</span>
                    <span><h3>{{this.arr.saleRank}}</h3></span>
                </div>
            </Row>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "end",
        data(){
            return{
                arr:[]
            }
        },
        methods:{
            getProductSalesAnalysis(to){
                if (to.query.id || to.query.skuid) {
                    let _self = this
                    _self.tableLoading = true
                    let url = `api/product/analysis/productSalesAnalysis`

                    let config = {
                        params: {
                            productId: _self.$route.query.id,
                            skuId : _self.$route.query.skuid
                        }
                    }

                    function success(res) {
                        _self.arr = res.data.data
                        console.log(_self.arr)
                        _self.tableLoading = false
                    }

                    this.$Get(url, config, success)
                } else {

                }

            }
        },
        watch: {
            '$route'(to, from) {
                if (to) {
                    this.getProductSalesAnalysis(to)
                }
            }
        },
        created() {
            this.getProductSalesAnalysis(this.$route)
        }

    }
</script>

<style scoped>
    .proa{
        width: 175px;
        height: 75px;
        color: black;
        background: #fff;
        border: 1px solid #dddee1;
        text-align: center;
        vertical-align: center;
        line-height: 37.5px;
    }
    .proa:hover{
        border-color: #57a3f3;
    }
</style>