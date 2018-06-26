<template>
    <ButtonGroup style="float:left;padding-bottom:10px">
        <Button type="primary" @click="add_sql">添加SQL模板</Button>
        <Button type="primary" @click="edit_sql">修改SQL模板</Button>
        <Button type="primary" @click="connect_sql_user">添加映射</Button>        
    </ButtonGroup>
</template>

<script>
import Bus from './bus.js'

export default {
  data(){
      return{
          select_row_id:''
      }
  },
  methods:{
      add_sql(){
            Bus.$emit("add_sql",true)
      },
      edit_sql(){
            var _that = this
            if(_that.select_row_id == ''){
                _that.$Message.warning('请选择一行进行编辑');
            }else{
                Bus.$emit("edit_sql",_that.select_row_id)
            }
      },
      connect_sql_user(){
          var _that = this
            if(_that.select_row_id == ''){
                _that.$Message.warning('请选择一行进行关联');
            }else{
                Bus.$emit("connect_sql_user",_that.select_row_id)
            }
      },
      init(){
          var _that = this
          Bus.$on('select_row',(e)=>{
              _that.select_row_id = e
          })
      }
  },
  created () {
      this.init()
  }
}
</script>
