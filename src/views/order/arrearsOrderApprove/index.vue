<template>
  <div>
    <div style="min-width:900px;">
      <Tabs value="name1">
        <TabPane label="欠费单审批" name="name1">
          <un-approve-list></un-approve-list>
        </TabPane>
        <TabPane label="查看已审批" name="name2">
          <approve-list></approve-list>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import unApproveList from './unApproveList/index.vue';
import approveList from './approveList/index.vue';

export default {
  name: 'arrearsOrderApprove',
  components: {
    unApproveList,
    approveList
  }
};
</script>
