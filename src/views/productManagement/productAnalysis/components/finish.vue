<template>
    <div>
        <Card title="关联产品分析">
            <Row :gutter="16" type="flex" justify="flex-star">
                <div v-for="(item,index) in this.arr">
                    <div class="proa" :class="{'backred': item.persent>=0.4?true:false}">
                        <span class="text">{{index+1}}:{{item.skuname}}</span>
                        <span class="rate">{{item.persent}}</span>
                    </div>
                </div>
            </Row>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "finish",
        data(){
            return{
                arr:[]
            }
        },
        methods:{
            getRelatedProductAnalysis(to){
                if (to.query.id || to.query.skuid) {
                    let _self = this
                    _self.tableLoading = true
                    let url = `api/product/analysis/relatedProductAnalysis`

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
                    this.getRelatedProductAnalysis(to)
                }
            }
        },
        created() {
            this.getRelatedProductAnalysis(this.$route)
        }
    }
</script>

<style scoped>
    .proa{
        width: 273px;
        height: 50px;
        color: black;
        background: #fff;
        border: 1px solid #dddee1;
        text-align: center;
        vertical-align: top;
        font-size: 0;
    }
    .proa.backred{
        background: red;
        color: #fff;
    }
    .proa:hover{
        border-color: #57a3f3;
    }
    .text{

        font-size: 10px;
        font-weight: 700;
        line-height: 50px;
    }
    .rate{
        font-size: 1px;
        margin-left: 30px;

    }
</style>