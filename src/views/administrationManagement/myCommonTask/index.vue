<template>
  <div>
    <Tabs value="name1">
      <TabPane label="全部" name="name1">
        <all></all>
      </TabPane>
      <TabPane label="未开始" name="name2">
        <unbegin></unbegin>
      </TabPane>
      <TabPane label="服务中" name="name3">
        <servicing></servicing>
      </TabPane>
      <TabPane label="已完结" name="name4">
        <finish></finish>
      </TabPane>
      <TabPane label="未结算" name="name5">
        <notSettle />
      </TabPane>
      <TabPane label="已结算" name="name6">
        <settle />
      </TabPane>
    </Tabs>
    <!-- <flow></flow> -->
    <!-- <detail></detail> -->
    <!-- <company-detail></company-detail> -->
  </div>
</template>

<script>
import unbegin from "./unbegin";
import servicing from "./servicing";
import finish from "./finish";
import all from "./all";
import flow from "./flow";
import settle from "./settle.vue";
import notSettle from "./notSettle.vue";
// import detail from './detail'
// import CompanyDetail from './myCommonTaskIndex/companydetail'
// import CompanyDetail from '../../woa-components/companyDetail/CompanyDetail'

export default {
  name: "administratiotaskmanagement",
  components: {
    unbegin,
    servicing,
    finish,
    all,
    // detail,
    // CompanyDetail,
    flow,
    settle,
    notSettle
  }
};
</script>
