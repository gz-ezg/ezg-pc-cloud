<template>
    <div>
        <Card title="产品销售分析">
            <Row :gutter="16" type="flex" justify="space-around">
                <div v-for="item in this.arr">
                    <div class="proa">
                        <span>{{item.affiliation_area===null?'其他':item.areaName}}</span>
                        <span><h3>{{item.al}}单</h3></span>
                    </div>
                </div>
            </Row>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "placeAnalysis",
        data(){
            return{
                arr:[]
            }
        },
        methods:{
            getProductAereaAnalysis(to){
                if (to.query.id || to.query.skuid) {
                    let _self = this
                    _self.tableLoading = true
                    let url = `api/product/analysis/productAereaAnalysis`

                    let config = {
                        params: {
                            productId: _self.$route.query.id,
                            skuId : _self.$route.query.skuid
                        }
                    }

                    function success(res) {
                        _self.arr = res.data.data
                        console.log(_self.arr)
                        for(let i = 0;i<_self.arr.length;i++){
                            if(_self.arr[i].affiliation_area){
                                _self.arr[i].areaName = _self.affiliation_area_Map.get(_self.arr[i].affiliation_area)
                            }
                        }
                        _self.tableLoading = false
                    }

                    this.$Get(url, config, success)
                } else {

                }

            },
            getDataCenter(){
                let _self = this
                let config = "affiliation_area"

                function success(res){
                    _self.affiliation_area = res.data.data.affiliation_area

                    _self.affiliation_area_Map = _self.$array2map(_self.affiliation_area)
                }

                this.$GetDataCenter(config, success)
            },
        },
        watch: {
            '$route'(to, from) {
                if (to) {
                    this.getDataCenter()
                    this.getProductAereaAnalysis(to)
                }
            }
        },
        created() {
            this.getDataCenter()
            this.getProductAereaAnalysis(this.$route)
        }

    }
</script>

<style scoped>
    .proa{
        width: 175px;
        height: 75px;
        margin-bottom: 20px;
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