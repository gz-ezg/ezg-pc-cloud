<template>
  <div class="page">
    <Card style="width:900px;">
      <p slot="title">请选择</p>
      <Button type="primary" slot="extra" @click.prevent="onExit">
        <Icon type="ios-loop-strong"></Icon>关闭
      </Button>
      <Tabs value="name1">
        <TabPane :label="'未开始('+notbeginTotal+')'" name="name1">
          <notbegin @change="setTotal"></notbegin>
        </TabPane>
        <TabPane :label="'服务中('+servingTotal+')'" name="name2">
          <Serving @change="setTotal"></Serving>
        </TabPane>
      </Tabs>

      <company-detail
        v-if="gobalCompanyDetailShow"
        :pageId="gobalCompanyPageId"
        :companyId="gobalCompanyId"
        :hideRecord="gobalHideRecord"
        :ifMatch="gobalCompanyIfMatch"
        :serviceDemo="gobalCompanyServiceDemo"
      ></company-detail>
    </Card>
  </div>
</template>



<script>
const companyDetail = () =>
  import(
    /* webpackChunkName: "CompanyDetail" */ "@views/woa-components/companyDetail/CompanyDetail.vue"
  );
import { oweOrderListByFollowby, getSystemParamByKey } from "@A/order";
import Notbegin from "./homeModules/notbegin";
import Serving from "./homeModules/serving/serving";
import Cookies from "js-cookie";
export default {
  name: "accountantCenter",
  components: {
    Notbegin,
    Serving,
    companyDetail
  },
  computed: {
    gobalCompanyDetailShow() {
      return this.$store.state.gobal.gobalCompanyDetailShow;
    },
    gobalCompanyPageId() {
      return this.$store.state.gobal.gobalCompanyPageId;
    },
    gobalCompanyId() {
      return this.$store.state.gobal.gobalCompanyId;
    },
    gobalHideRecord() {
      return this.$store.state.gobal.hideRecord;
    },
    gobalCompanyIfMatch() {
      return this.$store.state.gobal.gobalCompanyIfMatch;
    },
    gobalCompanyServiceDemo() {
      return this.$store.state.gobal.gobalCompanyServiceDemo;
    }
  },
  data() {
    return {
      notbeginTotal: 0,
      servingTotal: 0,
      companyList: [],
      companyId: "",
      currentCompany: null,
      arrearagePopup: false,
      offlinePopup: false,
      renewPopup: false,
      clickExit: false,
      isCloseButton: true
    };
  },
  methods: {
    setTotal(type, total) {
      this[type] = total;
    },
    onExit() {
      this.$router.push({
        name: "home_index"
      });
    }
  },
  created() {}
};
</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
  background-image: url("~@/images/arrearBg.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.item {
  margin-top: 20px;
  margin-left: 20px;
  text-decoration: underline;
  cursor: pointer;
}
.ivu-divider {
  display: block;
  height: 1px;
  width: 100%;
  min-width: 100%;
  margin: 24px 0;
  clear: both;
  background: #e8eaec;
}
.hide {
  display: none;
}
</style>
