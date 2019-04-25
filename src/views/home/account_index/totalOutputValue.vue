<template>
    <div>
        <Row>
            <ve-pie :data="chartData"></ve-pie>
        </Row>
    </div>
</template>

<script>

import VePie from 'v-charts/lib/pie.common'

export default {
        name: "totalOutputValue",
        components:{
            VePie
        },
        data(){
            return{
                chartData:{
                    columns:["departname","money","allMoney","persent"],
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
                    console.log(res.data.data.totalValue)
                    _self.chartData.rows = res.data.data.totalValue
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