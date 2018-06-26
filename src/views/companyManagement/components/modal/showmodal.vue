<template>
  <div>
        <modal
            v-model="show"
            title="查看"
            width="800px"
        >
        <Tabs type="card">
          <TabPane label="基本信息">
            <BasicTab :id="companyId"></BasicTab>
          </TabPane>
          <TabPane label="主体信息">标签二的内容</TabPane>
          <TabPane label="工    单">标签三的内容</TabPane>
          <TabPane label="企业动态">
            <DynamicTab></DynamicTab>
          </TabPane>
          <TabPane label="相关人员">
            <ReferenceTab></ReferenceTab>
          </TabPane>
          <TabPane label="变更明细">
            <Alteration></Alteration>
          </TabPane>
        </Tabs>           
        </modal>
  </div>
</template>

<script>
import Bus from '../bus'
import BasicTab from '../tab/basic_tab'
import DynamicTab from '../tab/dynamic_tab'
import ReferenceTab from '../tab/reference_tab'
import Alteration from '../tab/alteration_tab'

export default {
  data(){
    return {
      show:false,
      show_data:[],
      basic:[],
      main:[],
      workOrder:[],
      dynamic:[],
      reference:[],
      alteration:[],
      companyId:''
    }
  },
  created:function(){
    Bus.$on('show',e =>{
      this.show = true
    })
    Bus.$on('current_data',this.save)
  },
  methods:{
    save(e){
      this.show_data = e
      this.companyId = e.cpid
      // 33021写死
    }
  },
  components:{
    BasicTab,
    DynamicTab,
    ReferenceTab,
    Alteration
  }
}
</script>

