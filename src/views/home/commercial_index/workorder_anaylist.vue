<template>
    <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
</template>

<script>
  export default {
    props:{
        date:{
            type:Array
        },
        type:{
            type:String
        }
    },
    data () {
      this.chartSettings = {
            legendName: {
            },
            opacity:0.5
      }
      return {
        chartData: {
          columns: ['name', 'value'],
          rows: []
        }
      }
    },
    methods:{
        get_pie_chart(){
            let _self = this
            let url = `api/order/bussiness/index/work/order/analysis/report`
            let config = {
                params: {
                    begin_date: _self.date[0],
                    end_date: _self.date[1],
                    resulttype: _self.type
                }
            }

            function success(res){
                _self.chartData.rows = res.data.data
            }

            this.$Get(url, config, success)
        }
    },
    created(){
        this.get_pie_chart()
    },
    watch:{
        'date':'get_pie_chart',
        'type':'get_pie_chart'
    }
  }
</script>