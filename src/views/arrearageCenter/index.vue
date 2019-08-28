<template>
  <div class="page">
    <Card style="width:520px;margin-bottom:100px">
      <p slot="title">请选择</p>
      <Button :class="isCloseButton ? 'hide ' : ''" type="primary" slot="extra" @click.prevent="onExit">
        <Icon type="ios-loop-strong"></Icon>
        关闭
      </Button>
      <Row>
        <Col :span="14">
          <Select @on-change="onSelectChange" v-model="companyId">
            <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.CompanyName }}</Option>
          </Select>
        </Col>
        <Col :span="8">
          <span style="height:30px;line-height:30px;margin-left:20px"
            >共 <span style="color:red">{{ companyList.length }} </span>条</span
          >
        </Col>
      </Row>
      <p @click="onOffline" class="item">创建下线单</p>
      <p @click="onArrearage" class="item">创建欠费单</p>
      <p @click="onRenew" class="item">新增续费订单</p>
      <div class="ivu-divider"></div>
      <div style="margin:10px;">
        温馨提示：<span style="color:red">所有欠费客户必须操作一项完成，才可以进系统！</span>
        <p>1，如已续费请录下线单。</p>
        <p>2，税期服务月期间强制提醒，不允许其他操作！</p>
        <p>3，税期服务月结束后该客户没有单据或者单据未完成则强制下线。</p>
        <p>4，单据被删除，被驳回等视为无效。</p>
        <p>以系统最终数据为准，最终解释权归技术部所有。</p>
      </div>
    </Card>
    <Arrearage :order="currentCompany" v-if="arrearagePopup" @ok="onCreateOk" @cancel="arrearagePopup = false"></Arrearage>
    <Offline :order="currentCompany" v-if="offlinePopup" @ok="onCreateOk" @cancel="offlinePopup = false" />
    <Renew :order="currentCompany" v-if="renewPopup" @ok="onCreateOk" @cancel="renewPopup = false" />
  </div>
</template>



<script>
import { oweOrderListByFollowby, getSystemParamByKey } from '@A/order';
import Arrearage from './Arrearage';
import Offline from './Offline';
import Renew from './Renew';
export default {
  components: {
    Arrearage,
    Offline,
    Renew
  },
  data() {
    return {
      companyList: [],
      companyId: '',
      currentCompany: null,
      arrearagePopup: false,
      offlinePopup: false,
      renewPopup: false,
      clickExit: false,
      isCloseButton: false
    };
  },
  methods: {
    onOffline() {
      this.offlinePopup = true;
    },
    onArrearage() {
      this.arrearagePopup = true;
    },
    onRenew() {
      this.renewPopup = true;
    },
    onExit() {
      this.clickExit = true;
      this.$router.push('/');
    },
    onCreateOk() {
      // 判断是否还有公司，没有则跳转到首页
      this.arrearagePopup = false;
      this.offlinePopup = false;
      this.renewPopup = false;
      this.handleGetList();
    },
    onSelectChange(e) {
      this.currentCompany = this.companyList.find(v => v.id == e);
    },
    // 判断关闭按钮是否关闭
    async handleClickButton() {
      const resp = await getSystemParamByKey({ paramKey: 'force_popup_window' });
      this.isCloseButton = resp == 'Y' ? true : false;
      console.log(this.isCloseButton);
    },
    async handleGetList() {
      try {
        let id = localStorage.getItem('id');
        const resp = await oweOrderListByFollowby({ id });
        if (!resp.length) {
          this.$store.commit('closeForePopus');
          return this.$router.push({ name: 'home_index' });
        }
        this.companyList = resp;
        this.currentCompany = resp[0];
        this.companyId = resp[0].id;
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.handleClickButton();
    this.handleGetList();
  },
  beforeRouteLeave(to, from, next) {
    if (this.clickExit) {
      this.$store.commit('closeForePopus');
      next();
    } else if (this.companyList.length) {
      next(false);
    } else {
      next();
    }
  }
};
</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
  background-image: url('~@/images/arrearBg.jpg');
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
