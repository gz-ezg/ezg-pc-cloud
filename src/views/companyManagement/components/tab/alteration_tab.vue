<template>
  <div>
    <Table :columns="header" stripe style="margin:10px"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float:left;">
            <Page :total="100" :current="1"></Page>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      header:[
        {
          title:'旧公司名称',
          key:'name'
        },
        {
          title:'新公司名称',
          key:'add'
        },
        {
          title:'操作人',
          key:'create'
        },
        {
          title:'变更时间',
          key:'create_date'
        }
      ]
    }
  }
}
</script>
