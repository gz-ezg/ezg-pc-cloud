<style lang="less">
@import '../home.less';
@import '../../../styles/common.less';
</style>
<template>
  <div class="home-main">
    <Row :gutter="10" class="margin-top-10" style="height:450px">
      <Col :span="12" :style="{ marginBottom: '10px' }">
        <Card style="height:450px">
          <p slot="title" class="card-title">
            <Icon type="android-map"></Icon>
            上周每日来访量统计
          </p>
          <div class="data-source-row">
            <visite-volume></visite-volume>
          </div>
        </Card>
      </Col>
      <Col :span="12" :style="{ marginBottom: '10px' }">
        <Card style="height:450px">
          <p slot="title" class="card-title">
            <Icon type="ios-pulse-strong"></Icon>
            平台访问数量
          </p>
          <div class="data-source-row">
            <data-source-pie></data-source-pie>
          </div>
        </Card>
      </Col>
    </Row>
    <Row class="margin-top-10" style="height:450px">
      <Card style="height:450px">
        <p slot="title" class="card-title">
          <Icon type="ios-shuffle-strong"></Icon>
          上周每日核心业务调用量
        </p>
        <div class="line-chart-con">
          <service-requests></service-requests>
        </div>
      </Card>
    </Row>
  </div>
</template>

<script>
import dataSourcePie from './dataSourcePie.vue';
import visiteVolume from './visiteVolume.vue';
import serviceRequests from './serviceRequests.vue';
import { oweOrderListByFollowby } from '@A/order';
export default {
  name: 'home',
  components: {
    dataSourcePie,
    visiteVolume,
    serviceRequests
  },
  created() {
    // 跳转各个部门首页
    let _self = this;
    let temp = localStorage.getItem('Main_Role');
    switch (temp) {
      case 'kuaiji':
        this.$router.push({
          name: 'accountIndex_index'
        });
        break;
      case 'shangshi':
        this.$router.push({
          name: 'commercialIndex_index'
        });
        break;
      // case "qihua":
      //     this.$router.push({
      //         name:'planIndex_index'
      //     })
      //     break
      // case "shenji":
      //     this.$router.push({
      //         name:'auditIndex_index'
      //     })
      //     break
      case 'salers':
        this.$router.push({
          name: 'marketIndex_index'
        });
        break;
      case 'qudao':
        this.$router.push({
          name: 'cannelIndex_index'
        });
      default:
    }
  },
  async beforeRouteEnter(to, from, next) {
    // 判断有没有存在下线客户
    try {
      let id = localStorage.getItem('id');
      const resp = await oweOrderListByFollowby({ id });
      if (resp.length) {
        next('/arrearageCenter');
      }
    } catch (error) {
      console.log(error);
    } finally {
      next();
    }
  }
};
</script>
