<template>
    <div>
        <Row style="margin-bottom:40px">
          <center>
              <Select v-model="type" size="small" style="width:150px" @on-change="getTableData">
              </Select>
          </center>
        </Row>
        <Row>
            <ve-pie :data="chartData"></ve-pie>
        </Row>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        departId:"",
            chartData: {
            columns: ['name', 'value'],
            rows: [],
            }
        }
    },
    methods:{
        getTableData(){
            let _self = this
            let url = `api/crm/sale/index/customer/source/report`

            let config = {
                params: {
                    departId: _self.departId
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