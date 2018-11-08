<template>
    <div>
        <Row style="margin-bottom:40px">
          <center>
              <Select v-model="departId" size="small" style="width:150px" @on-change="getTableData">
                  <Option v-for="item in optionData" :key="item.ID" :value="item.ID">{{item.departname}}</Option>
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
        departId:"11",
        chartData: {
            columns: ['name', 'value'],
            rows: [],
        },
        optionData:[]
        }
    },
    methods:{
        getTableData(){
            let _self = this
            let url = `api/crm/sale/index/customer/source/report`
            let config
            if(_self.departId == "11"){
                config = {
                    params: {
                        departId: ""
                    }
                }
            }else{
                config = {
                    params: {
                        departId: _self.departId
                    }
                }
            }
            

            function success(res){
                _self.chartData.rows = res.data.data
            }

            this.$Get(url, config, success)
        },
        getOption(){
            let _self = this
            let url = `api/system/depart/list`

            let config = {
                params: {
                    terminal_flag: "1",
                    alias_code: "MARKET"
                }
            }

            function success(res){
                _self.optionData = res.data.data
                _self.optionData.push({
                    ID:"11",
                    departname:"全部"
                })
            }

            this.$Get(url, config, success)
        }
    },
    created(){
        this.getOption()
        this.getTableData()
    }
  }
</script>