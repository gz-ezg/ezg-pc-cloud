<template>
  <div>
    <Card>
      <tables ref="tables" editable v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">生成上传格式</Button>
    </Card>
  </div>
</template>

<script>
import Tables from './tables/tables'
// import { getTableData } from '@/api/data'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        {title: '姓名', key: 'realname',width:120},
        {title: '业绩汇总（元）', key: 'year_realnummber', width:150 },
        {title: '一月', key: 'targetAmount_1', editable: true ,width:120},
        {title: '二月', key: 'targetAmount_2', editable: true ,width:120},
        {title: '三月', key: 'targetAmount_3', editable: true ,width:120},
        {title: '四月', key: 'targetAmount_4', editable: true ,width:120},
        {title: '五月', key: 'targetAmount_5', editable: true ,width:120},
        {title: '六月', key: 'targetAmount_6', editable: true ,width:120},
        {title: '七月', key: 'targetAmount_7', editable: true ,width:120},
        {title: '八月', key: 'targetAmount_8', editable: true ,width:120},
        {title: '九月', key: 'targetAmount_9', editable: true ,width:120},
        {title: '十月', key: 'targetAmount_10', editable: true ,width:120},
        {title: '十一月', key: 'targetAmount_11', editable: true ,width:120},
        {title: '十二月', key: 'targetAmount_12', editable: true ,width:120},
        // {
        //   title: 'Handle',
        //   key: 'handle',
        //   options: ['delete'],
        //   button: [
        //     (h, params, vm) => {
        //       return h('Poptip', {
        //         props: {
        //           confirm: true,
        //           title: '你确定要删除吗?'
        //         },
        //         on: {
        //           'on-ok': () => {
        //             vm.$emit('on-delete', params)
        //             vm.$emit('input', params.tableData.filter((item, index.vue) => index.vue !== params.row.initRowIndex))
        //           }
        //         }
        //       }, [
        //         h('Button', '自定义删除')
        //       ])
        //     }
        //   ]
        // }
      ],
      tableData: []
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },

    //  数据格式转换，烦人
    exportExcel () {
      let _self = this
      // this.$refs.tables.exportCsv({
      //   filename: `table-${(new Date()).valueOf()}.csv`
      // })
      let obj_data = []
      let length = _self.tableData.length
      for(let i = 0;i<_self.tableData.length;i++){
        let temp = {}
        temp.userId = _self.tableData[i].id
        let month_temp = []
        if(_self.tableData[i].id_1){
          let temp_1 = {}
          temp_1.month = 1
          temp_1.id = _self.tableData[i].id_1
          temp_1.targetAmount = _self.tableData[i].targetAmount_1
          month_temp.push(temp_1)
        }
        if(_self.tableData[i].id_2){
          let temp_1 = {}
          temp_1.month = 2
          temp_1.id = _self.tableData[i].id_2
          temp_1.targetAmount = _self.tableData[i].targetAmount_2
          month_temp.push(temp_1)
        }
        if(_self.tableData[i].id_3){
          let temp_1 = {}
          temp_1.month = 3
          temp_1.id = _self.tableData[i].id_3
          temp_1.targetAmount = _self.tableData[i].targetAmount_3
          month_temp.push(temp_1)
        }
        if(_self.tableData[i].id_4){
          let temp_1 = {}
          temp_1.month = 4
          temp_1.id = _self.tableData[i].id_4
          temp_1.targetAmount = _self.tableData[i].targetAmount_4
          month_temp.push(temp_1)
        }
        if(_self.tableData[i].id_5){
          let temp_1 = {}
          temp_1.month = 5
          temp_1.id = _self.tableData[i].id_5
          temp_1.targetAmount = _self.tableData[i].targetAmount_5
          month_temp.push(temp_1)
        }
        if(_self.tableData[i].id_6){
          let temp_1 = {}
          temp_1.month = 6
          temp_1.id = _self.tableData[i].id_6
          temp_1.targetAmount = _self.tableData[i].targetAmount_6
          month_temp.push(temp_1)
        }
        if(_self.tableData[i].id_7){
          let temp_1 = {}
          temp_1.month = 7
          temp_1.id = _self.tableData[i].id_7
          temp_1.targetAmount = _self.tableData[i].targetAmount_7
          month_temp.push(temp_1)
        }
        if(_self.tableData[i].id_8){
          let temp_1 = {}
          temp_1.month = 8
          temp_1.id = _self.tableData[i].id_8
          temp_1.targetAmount = _self.tableData[i].targetAmount_8
          month_temp.push(temp_1)
        }
        if(_self.tableData[i].id_9){
          let temp_1 = {}
          temp_1.month = 9
          temp_1.id = _self.tableData[i].id_9
          temp_1.targetAmount = _self.tableData[i].targetAmount_9
          month_temp.push(temp_1)
        }
        if(_self.tableData[i].id_10){
          let temp_1 = {}
          temp_1.month = 10
          temp_1.id = _self.tableData[i].id_10
          temp_1.targetAmount = _self.tableData[i].targetAmount_10
          month_temp.push(temp_1)
        }
        if(_self.tableData[i].id_11){
          let temp_1 = {}
          temp_1.month = 11
          temp_1.id = _self.tableData[i].id_11
          temp_1.targetAmount = _self.tableData[i].targetAmount_11
          month_temp.push(temp_1)
        }
        if(_self.tableData[i].id_12){
          let temp_1 = {}
          temp_1.month = 12
          temp_1.id = _self.tableData[i].id_12
          temp_1.targetAmount = _self.tableData[i].targetAmount_12
          month_temp.push(temp_1)
        }
        if(!_self.tableData[i].id_1 && _self.tableData[i].targetAmount_1){
          let temp_1 = {}
          temp_1.month = 1
          temp_1.targetAmount = _self.tableData[i].targetAmount_1
          month_temp.push(temp_1)
        }
        if(!_self.tableData[i].id_2 && _self.tableData[i].targetAmount_2){
          let temp_1 = {}
          temp_1.month = 2
          temp_1.targetAmount = _self.tableData[i].targetAmount_2
          month_temp.push(temp_1)
        }
        if(!_self.tableData[i].id_3 && _self.tableData[i].targetAmount_3){
          let temp_1 = {}
          temp_1.month = 3
          temp_1.targetAmount = _self.tableData[i].targetAmount_3
          month_temp.push(temp_1)
        }
        if(!_self.tableData[i].id_4 && _self.tableData[i].targetAmount_4){
          let temp_1 = {}
          temp_1.month = 4
          temp_1.targetAmount = _self.tableData[i].targetAmount_4
          month_temp.push(temp_1)
        }
        if(!_self.tableData[i].id_5 && _self.tableData[i].targetAmount_5){
          let temp_1 = {}
          temp_1.month = 5
          temp_1.targetAmount = _self.tableData[i].targetAmount_5
          month_temp.push(temp_1)
        }
        if(!_self.tableData[i].id_6 && _self.tableData[i].targetAmount_6){
          let temp_1 = {}
          temp_1.month = 6
          temp_1.targetAmount = _self.tableData[i].targetAmount_6
          month_temp.push(temp_1)
        }
        if(!_self.tableData[i].id_7 && _self.tableData[i].targetAmount_7){
          let temp_1 = {}
          temp_1.month = 7
          temp_1.targetAmount = _self.tableData[i].targetAmount_7
          month_temp.push(temp_1)
        }
        if(!_self.tableData[i].id_8 && _self.tableData[i].targetAmount_8){
          let temp_1 = {}
          temp_1.month = 8
          temp_1.targetAmount = _self.tableData[i].targetAmount_8
          month_temp.push(temp_1)
        }
        if(!_self.tableData[i].id_9 && _self.tableData[i].targetAmount_9){
          let temp_1 = {}
          temp_1.month = 9
          temp_1.targetAmount = _self.tableData[i].targetAmount_9
          month_temp.push(temp_1)
        }
        if(!_self.tableData[i].id_10 && _self.tableData[i].targetAmount_10){
          let temp_1 = {}
          temp_1.month = 10
          temp_1.targetAmount = _self.tableData[i].targetAmount_10
          month_temp.push(temp_1)
        }
        if(!_self.tableData[i].id_11 && _self.tableData[i].targetAmount_11){
          let temp_1 = {}
          temp_1.month = 11
          temp_1.targetAmount = _self.tableData[i].targetAmount_11
          month_temp.push(temp_1)
        }
        if(!_self.tableData[i].id_12 && _self.tableData[i].targetAmount_12){
          let temp_1 = {}
          temp_1.month = 12
          temp_1.targetAmount = _self.tableData[i].targetAmount_12
          month_temp.push(temp_1)
        }
        temp.detail = month_temp
        console.log(temp)
        obj_data.push(temp)
      }
      // let temp = JSON.stringify(_self.tableData)
      console.log(obj_data)
      let temp_data = JSON.stringify(obj_data)
      let url = `api/crm/sale/target/createOrUpdate`
      let config = {
        year:2018,
        dataJson:temp_data
      }

      function success(res){

      }

      function fail(err){

      }

      this.$Post(url, config, success, fail)
      // console.log(JSON.parse(temp))

    },
    getTableData(){
      let _self = this
      let url = `api/crm/sale/taget/list`
      let config = {
        params: {
          departId:"",
          year:"2018",
          month:"3",
          page:"1",
          pageSize:"10"
        }
      }
      function success(res){
        console.log(res.data.data.rows)
        let temp = res.data.data.rows
        for(let i = 0;i<temp.length;i++){
          let _temp = {}
          _temp.id = temp[i].id
          _temp.realname = temp[i].realname
          _temp.year_realnummber = temp[i].year_realnummber
          //  数据处理成所需要的格式
          if(temp[i].detailJson != null){
            // let json_temp = `[{"month":"8","targetAmount":"125522.00","id":"12"},{"month":"6","targetAmount":"1800.00","id":"13"}]`
            let json_temp = temp[i].detailJson
            let temp2 = JSON.parse(json_temp)
            // console.log(temp2)
            // console.log(temp2.length)
              _temp.targetAmount_1 = 0
              _temp.targetAmount_2 = 0
              _temp.targetAmount_3 = 0
              _temp.targetAmount_4 = 0
              _temp.targetAmount_5 = 0
              _temp.targetAmount_6 = 0
              _temp.targetAmount_7 = 0
              _temp.targetAmount_8 = 0  
              _temp.targetAmount_9 = 0
              _temp.targetAmount_10 = 0
              _temp.targetAmount_11 = 0
              _temp.targetAmount_12 = 0
            for(let j = 0;j<temp2.length;j++){
              switch(temp2[j].month.toString()){
                case "1":
                  _temp.id_1 = temp2[j].id
                  _temp.targetAmount_1 = temp2[j].targetAmount
                  _temp.month_1 = "1"
                  break;
                case "2":
                  _temp.id_2 = temp2[j].id
                  _temp.targetAmount_2 = temp2[j].targetAmount
                  _temp.month_2 = "2"
                  break;
                case "3":
                  _temp.id_3 = temp2[j].id
                  _temp.targetAmount_3 = temp2[j].targetAmount
                  _temp.month_3 = "3"
                  break;
                case "4":
                  _temp.id_4 = temp2[j].id
                  _temp.targetAmount_4 = temp2[j].targetAmount
                  _temp.month_4 = "4"
                  break;
                case "5":
                  _temp.id_5 = temp2[j].id
                  _temp.targetAmount_5 = temp2[j].targetAmount
                  _temp.month_5 = "5"
                  break;
                case "6":
                  _temp.id_6 = temp2[j].id
                  _temp.targetAmount_6 = temp2[j].targetAmount
                  _temp.month_6 = "6"
                  break;
                case "7":
                  _temp.id_7 = temp2[j].id
                  _temp.targetAmount_7 = temp2[j].targetAmount
                  _temp.month_7 = "7"
                  break;
                case "8":
                  _temp.id_8 = temp2[j].id
                  _temp.targetAmount_8 = temp2[j].targetAmount
                  _temp.month_8 = "8"
                  break;
                case "9":
                  _temp.id_9 = temp2[j].id
                  _temp.targetAmount_9 = temp2[j].targetAmount
                  _temp.month_9 = "9"
                  break;
                case "10":
                  _temp.id_10 = temp2[j].id
                  _temp.targetAmount_10 = temp2[j].targetAmount
                  _temp.month_10 = "10"
                  break;
                case "11":
                  _temp.id_11 = temp2[j].id
                  _temp.targetAmount_11 = temp2[j].targetAmount
                  _temp.month_11 = "11"
                  break;
                case "12":
                  _temp.id_12 = temp2[j].id
                  _temp.targetAmount_12 = temp2[j].targetAmount
                  _temp.month_12 = "12"
                  break;
              }
            }
          }else{
              _temp.targetAmount_1 = 0
              _temp.targetAmount_2 = 0
              _temp.targetAmount_3 = 0
              _temp.targetAmount_4 = 0
              _temp.targetAmount_5 = 0
              _temp.targetAmount_6 = 0
              _temp.targetAmount_7 = 0
              _temp.targetAmount_8 = 0  
              _temp.targetAmount_9 = 0
              _temp.targetAmount_10 = 0
              _temp.targetAmount_11 = 0
              _temp.targetAmount_12 = 0
          }
          _self.tableData.push(_temp)
        }
        console.log(_self.tableData)
      }

      this.$Get(url, config, success)
    }
  },
  mounted () {
    this.getTableData()
    // getTableData().then(res => {
    //   this.tableData = res.data
    // })
  }
}
</script>

<style>

</style>
