<template>
    <div>
        <Card title="增长比例">
            <Row :gutter="16" type="flex" justify="space-around">
                <div class="proa">
                    <span>新增绝对增长比例</span>
                    <span><h3>{{this.arr.absoluteAmount}}</h3></span>
                </div>
                <div class="proa">
                    <span>新增相对增长比例</span>
                    <span><h3>{{this.arr.relativelyAmount}}</h3></span>
                </div>
                <div class="proa">
                    <span>交易额绝对增长比例</span>
                    <span><h3>{{this.arr.absoluteSale}}</h3></span>
                </div>
                <div class="proa">
                    <span>交易额相对增长比例</span>
                    <span><h3>{{this.arr.relativelySale}}</h3></span>
                </div>
            </Row>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "irate",
        data(){
            return{
                arr:[]
            }
        },
        methods:{
            getProductGrowthRatio(to){
                if (to.query.id || to.query.skuid) {
                    let _self = this
                    _self.tableLoading = true
                    let url = `api/product/analysis/productGrowthRatio`

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
                    this.getProductGrowthRatio(to)
                }
            }
        },
        created() {
            this.getProductGrowthRatio(this.$route)
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