<template>
    <div>
        <Row>
            <ve-line :data="chartData" :extend="extend" :settings="chartSettings"></ve-line>
        </Row>
    </div>
</template>

<script>
  import VeLine from 'v-charts/lib/line.common'
  export default {
    components: {
      VeLine
    },
    data: function () {
      this.extend = {
        series: {
          label: {
            normal: {
              show: true
            }
          }
        }
      },
      this.chartSettings = {
        labelMap: {
          'new_customer_num': '新增客户',
          'end_customer_num': '下线用户'
        },
        legendName: {
          'new_customer_num': '新增客户',
          'end_customer_num': '下线用户'
        }
      }
      return {
        chartData: {
          columns: ['month', 'new_customer_num', 'end_customer_num'],
          rows: []
        }
      }
    },
    methods:{
      get_data(){
        let url = 'api/order/accounter/index.vue/offline/customer/detail'
        let _self = this

        let config = {
          params:{
            // num: 5
          }
        }

        function success(res){
          _self.chartData.rows = res.data.data
        }
        this.$Get(url, config, success)
      }
    },
    created() {
      this.get_data()
    },
  }
</script>