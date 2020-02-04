<template>
  <div>
    <Modal v-model="modal1" width="1000">
    <p slot="header" style="color:#f60;text-align:center"></p>
    <div style="text-align:center;display:flex;">
      <Table :columns="columns1" :data="data1" style="width:50%;"></Table>
      <Table :columns="columns1" :data="data1" style="width:50%;"></Table>
    </div>
    <div slot="footer">
      <Button type="primary" :loading="loading" @click="model2 = true">不需要装订</Button>
      <Button type="primary" :loading="loading" @click="model3 = true">装订</Button>
    </div>
  </Modal>
 
    <Nozhuangding :model2="model2" @model="model"></Nozhuangding>
    <zhuangding :model3="model3" @model2="model2"></zhuangding>
  </div>
</template>

<script>
import Nozhuangding from './Nozhuangding'
import zhuangding from './zhuangding'
export default {
  props:["modal1"],
  name: "operation",
  components:{
    Nozhuangding,
    zhuangding
  },
  data() {
    return {
      columns1: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ],
      modal1: false,
      model2: false,
      model3:false
    };
  },
  methods: {
     model(){
       this.model2 = false
       this.modal1= false
      //  this.$emit("modal1",false)
     },
     model2(){
       this.modal1 = false,
       this.model3 = false
     }
  }
};
</script>


<style>
  .ivu-table{
    width: 100%;
  }
</style>