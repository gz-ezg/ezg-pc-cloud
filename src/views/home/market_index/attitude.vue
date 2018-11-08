<template>

  <div>
      <Row style="margin-bottom:40px">
          <center>
              <Select v-model="type" size="small" style="width:150px" @on-change="getTableData">
                  <Option value="volume">累计销售额</Option>
                  <Option value="customer_num">累计新增客户</Option>
              </Select>
          </center>
      </Row>
        <Row>
            <ve-pie :data="chartData"></ve-pie>
        </Row>
  </div>
</template>

<script>
import VePie from 'v-charts/lib/pie.common'
  export default {
      components: {
        VePie
      },
    data () {
      return {
            type:"volume",
            chartData: {
                columns: ['name', 'value'],
                rows: [],
            }
        }
    },
    methods:{
        getTableData(){
            let _self = this
            let url = `api/crm/sale/index/channel/type/report`

            let config = {
                params: {
                    type: _self.type
                }
            }

            function success(res){
                _self.chartData.rows = res.data.data
            }

            this.$Get(url, config, success)
        }
    },
    created(){
        this.getTableData()
    }
  }
</script>