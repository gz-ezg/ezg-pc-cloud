<template>
    <div>
        <Row>
            <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
        </Row>
    </div>
</template>

<script>
    import VeHistogram from 'v-charts/lib/histogram.common'
    export default {
        name: "completion",
        components:{
            VeHistogram
        },
        data(){
            this.chartSettings={
                labelMap: {
                    'companyCount': '企业总数',
                    'bsCount': '报税完成情况',
                    'zcCount': '做账完成情况'
                },
            }
            return{
                chartData:{
                    columns:["departname","companyCount","bsCount","zcCount"],
                    rows:[],
                }
            }
        },
        methods:{
            getTableData(){
                let _self = this
                let url = `api/order/accounter/honorOfAccountantList`
                let config={
                    params: {
                        date:'201903'
                    }
                }

                function success(res){
                    console.log(res.data.data.completion)
                    _self.chartData.rows = res.data.data.completion
                    console.log(_self.chartData.rows)
                }

                this.$Get(url, config, success)
            },
        },
        created() {
            this.getTableData()
        }
    }
</script>

<style>

</style>