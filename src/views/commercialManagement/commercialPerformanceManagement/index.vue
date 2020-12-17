<template>
  <div>
    <Card>
      <Tabs value="name1">
        <TabPane label="调整面板" name="name1">
          <Row>
            <Col span="11">
              <Card bordered>
                <div class="ivu-date-picker-header">
                  <span
                    @click="last"
                    class="ivu-picker-panel-icon-btn ivu-date-picker-prev-btn ivu-date-picker-prev-btn-arrow-double"
                    ><i class="ivu-icon ivu-icon-ios-arrow-back"></i
                  ></span>

                  <span
                    ><span class="ivu-date-picker-header-label">{{
                      this.month
                    }}</span>
                  </span>
                  <span
                    @click="next"
                    class="ivu-picker-panel-icon-btn ivu-date-picker-next-btn ivu-date-picker-next-btn-arrow-double"
                    ><i class="ivu-icon ivu-icon-ios-arrow-forward"></i
                  ></span>
                </div>

                <Row class="item">
                  <Col class="flex" span="10"> 工作日：</Col>
                  <Col span="8">
                    <InputNumber :max="30" :min="1" v-model="value" />
                  </Col>
                  <Col span="6">
                    <Button @click="updateBusinessPerformanceWorkday"
                      >调整</Button
                    >
                  </Col>
                </Row>
                <Card title="绩效评比">
                  <Row
                    :key="index"
                    v-for="(item, index) in userList"
                    class="item"
                  >
                    <Col class="flex blue" span="10">
                      <div @click="handleDetail(item)">{{ item.realname }}</div>
                    </Col>
                    <Col span="8">
                      <InputNumber :max="20" :min="0" v-model="item.score" />
                    </Col>
                    <Col span="6">
                      <Button @click="hanldeEditScore(item)">调整</Button>
                    </Col>
                  </Row>
                </Card>
              </Card>
            </Col>
            <Col style="text-align: center" span="3">
              <Button @click="show = false" v-if="show" type="primary"
                >收起</Button
              >
              <Button @click="show = true" v-else type="primary">展开</Button>
            </Col>
            <Col v-if="show" span="10">
              <Card :title="month" bordered>
                基础信息
                <Row class="item">
                  <Col span="8">
                    员工：<span class="red">{{ list.business_employ }}</span>
                  </Col>
                  <Col span="8">岗位：{{ list.position }} </Col>
                  <Col span="8">级别：{{ list.level }} </Col>
                </Row>
                绩效信息
                <Row class="item">
                  <Col span="8">
                    工单产值：{{ list.performance.workorder_money }}
                  </Col>
                  <Col span="8"
                    >外勤总数：{{ list.performance.legwork_total }}
                  </Col>
                </Row>

                工单提成
                <Row class="item">
                  <Col span="8">
                    提成比例：{{ list.workorder_commission.commission_percent }}
                  </Col>
                  <Col span="8"
                    >工单提成：
                    <span class="red">{{
                      list.workorder_commission.commission
                    }}</span>
                  </Col>
                </Row>
                绩效占比
                <Row class="item">
                  <Col span="8">
                    绩效基础薪资：{{ list.performance_ratio.performance_base }}
                  </Col>
                  <Col span="8"
                    >外勤比例：{{ list.performance_ratio.legwork_ratio }}
                  </Col>
                  <Col span="8"
                    >工单比例：{{ list.performance_ratio.workorder_ratio }}
                  </Col>
                </Row>
                外勤绩效
                <Row class="item">
                  <Col span="8">
                    外勤占比(Base*GDP)：{{
                      list.performance_legwork.legwork_base
                    }}
                  </Col>
                  <Col span="8"
                    >总外勤数(A)：{{ list.performance_legwork.legwork_total }}
                  </Col>
                  <Col span="8"
                    >工作日(B)天：{{ list.performance_legwork.work_day }}
                  </Col>

                  <Col span="8">
                    有效命中外勤(C=A/B)：{{
                      list.performance_legwork.legwork_base
                    }}
                  </Col>
                  <Col span="8"
                    >适用范围：{{ list.performance_legwork.legwork_scope }}
                  </Col>
                  <Col span="8"
                    >适用公式：{{ list.performance_legwork.legwork_formula }}
                  </Col>
                  <Col span="8"
                    >外勤绩效：
                    <span class="red">{{
                      list.performance_legwork.legwork_performance
                    }}</span>
                  </Col>
                </Row>
                工单绩效
                <Row class="item">
                  <Col span="8">
                    工单占比(Base*GDP)：{{
                      list.performance_workorder.workorder_base
                    }}
                  </Col>
                  <Col span="8"
                    >工单产值：{{ list.performance_workorder.workorder_money }}
                  </Col>
                  <Col span="8"
                    >适用范围：{{ list.performance_workorder.workorder_scope }}
                  </Col>
                  <Col span="8">
                    适用比例：{{
                      list.performance_workorder.workorder_valid_percent
                    }}
                  </Col>
                  <Col span="8"
                    >工单绩效：
                    <span class="red">{{
                      list.performance_workorder.workorder_performance
                    }}</span>
                  </Col>
                </Row>
                绩效合计
                <Row class="item">
                  <Col span="8">
                    绩效合计：{{
                      list.performance_total.performance_total_money
                    }}
                  </Col>
                  <Col span="8"
                    >绩效评分：
                    <span class="red">{{
                      list.performance_total.performance_score
                    }}</span>
                  </Col>
                  <Col span="8"
                    >额外奖励绩效：{{
                      list.performance_total.extra_performance
                    }}
                  </Col>
                  <Col span="8">
                    本月绩效：
                    <span class="red">{{
                      list.performance_total.current_performance
                    }}</span>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import {
  queryBusinessPerformanceScore,
  updateBusinessPerformanceScore,
  businessPerformanceSingle,
  updateBusinessPerformanceWorkday,
  queryBusinessPerformanceWorkday,
} from "@/api/stystemComplain";
import moment from "moment";
export default {
  name: "commercialPerformanceManagement",
  data() {
    return {
      value: 20,
      month: "2020-10",
      userList: [],
      show: false,
      list: {
        level: "",
        performance: {},
        workorder_commission: {},
        performance_ratio: {},
        performance_legwork: {},
        performance_workorder: {},
        performance_total: {},
      },
    };
  },
  created() {
    this.month = this.dateFormat();
    this.queryBusinessPerformanceScore();
  },
  methods: {
    last() {
      this.month = moment(this.month).subtract(1, "months").format("YYYY-MM");
      this.queryBusinessPerformanceScore();
    },
    async getDate() {
      const resp = await queryBusinessPerformanceWorkday({ month: this.month });
      this.value = resp.workDay;
    },
    next() {
      this.month = moment(this.month).subtract(-1, "months").format("YYYY-MM");
      this.queryBusinessPerformanceScore();
    },
    async queryBusinessPerformanceScore() {
      const msg = this.$Message.loading({
        content: "Loading...",
        duration: 0,
      });
      this.getDate();
      this.userList = await queryBusinessPerformanceScore({
        month: this.month,
      });
      msg();

      if (this.userid) {
        const index = this.userList.findIndex((v) => v.userid == this.userid);
        index >= 0 && this.handleDetail();
      }
    },
    async handleDetail(item) {
      if (item) {
        this.userid = item.userid;
      }

      const resp = await businessPerformanceSingle({
        userid: this.userid,
        month: this.month,
      });
      if (resp) {
        this.list = resp;
        this.show = true;
      }
    },
    async updateBusinessPerformanceWorkday(item) {
      this.list = await updateBusinessPerformanceWorkday({
        workDay: this.value,
        month: this.month,
      });
      this.$Message.info("调整成功");
    },
    async hanldeEditScore(item) {
      await updateBusinessPerformanceScore({
        month: this.month,
        userId: item.userid,
        score: item.score,
      });
      this.$Message.info("调整成功");
    },
    dateFormat() {
      let d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;

      return [year, month].join("-");
    },
  },
};
</script>

<style  scoped>
.flex {
  display: flex;

  align-items: center;
  height: 34px;
}
.blue {
  cursor: pointer;
  color: hsl(210, 71%, 32%);
}
.item {
  position: relative;
  padding: 8px 16px 8px 16px;
  border-radius: 6px;
  color: #495060;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 10px;
  border: 1px solid #d5e8fc;
  background-color: #eaf4fe;
}
.red {
  color: red;
}
</style>