<template>
    <div>
        <ButtonGroup style="float:left;margin-bottom:10px">
            <Button type="primary" @click="change_create" icon="plus">录入</Button>
            <Button type="primary" @click="change_edit" icon="edit">编辑</Button>
            <Button type="primary" @click.prevent="change_show" icon="ios-search">查看</Button>
            <Button type="primary" icon="ios-cloud-upload-outline">excel导入数据</Button>
            <Button type="primary" icon="ios-color-filter-outline">记账</Button>
            <Button type="primary" icon="ios-color-filter-outline">扫码图片</Button>
            <Button type="primary" icon="ios-color-filter-outline">交接资料详情</Button>
            <Button type="primary" icon="ios-cloud-download-outline">导出excel</Button>            
        </ButtonGroup>
        <Search></Search>
        <Created></Created>
        <Edit></Edit>
        <Show></Show>
    </div>
</template>

<script>
import Created from './modal/createmodal'
import Edit from './modal/editmodal'
import Show from './modal/showmodal'
import Bus from './bus'
import Search from './search'

export default {
  data(){
      return{
        create:false,
        edit:false,
        show:false,
        current_data:[],
        issearch: false
    }
  },
  mounted:function(){
      Bus.$on('current_data',this.update)
  },
  methods:{
    change_create(){
        Bus.$emit('create',true)
    },
    change_edit(){
        if(this.current_data == ""){
            this.$Message.warning('请选择需要编辑的客户');
        }else{
            Bus.$emit('edit',true)
            Bus.$emit('current_data',this.current_data)
        }

    },
    change_show(){
        if(this.current_data == ""){
            this.$Message.warning('请选择需要查看的客户');
        }else{
            Bus.$emit('show',true)
            Bus.$emit('current_data',this.current_data)
        }
        
    },
    search(){

    },
    update(e,v){
        this.current_data = e
    }
  },
  components:{
      Created,
      Edit,
      Show,
      Search
  }
}
</script>
