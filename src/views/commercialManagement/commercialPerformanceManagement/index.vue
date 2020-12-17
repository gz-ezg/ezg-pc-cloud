<template>
  <div>
    <Card>
      <Tabs value="name1">
        <TabPane label="规则" name="name1">
          <Card style="width: 400px" bordered>
            <div class="ivu-date-picker-header">
              <span
                class="ivu-picker-panel-icon-btn ivu-date-picker-prev-btn ivu-date-picker-prev-btn-arrow-double"
                ><i class="ivu-icon ivu-icon-ios-arrow-back"></i
              ></span>
              <span
                class="ivu-picker-panel-icon-btn ivu-date-picker-prev-btn ivu-date-picker-prev-btn-arrow"
                ><i class="ivu-icon ivu-icon-ios-arrow-back"></i
              ></span>
              <span
                ><span class="ivu-date-picker-header-label">2020年</span>
                <span class="ivu-date-picker-header-label">12月</span></span
              >
              <span
                class="ivu-picker-panel-icon-btn ivu-date-picker-next-btn ivu-date-picker-next-btn-arrow-double"
                ><i class="ivu-icon ivu-icon-ios-arrow-forward"></i
              ></span>
              <span
                class="ivu-picker-panel-icon-btn ivu-date-picker-next-btn ivu-date-picker-next-btn-arrow"
                ><i class="ivu-icon ivu-icon-ios-arrow-forward"></i
              ></span>
            </div>

            <Row class="item">
              <Col class="flex" span="12"> 工作日：</Col>
              <Col span="6">
                <InputNumber :max="30" :min="1" v-model="value1" />
              </Col>
              <Col span="6">
                <Button>调整</Button>
              </Col>
            </Row>
            <Card title="绩效评比">
              <Row class="item">
                <Col class="flex" span="12"> 府东</Col>
                <Col span="6">
                  <InputNumber :max="20" :min="0" v-model="value1" />
                </Col>
                <Col span="6">
                  <Button>调整</Button>
                </Col>
              </Row>
            </Card>
          </Card>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import { queryBusinessPerformanceScore } from "@/api/stystemComplain";
export default {
  name: "commercialRulemanagement",
  data() {
    return {
      value1: 20,
    };
  },
  created() {
    this.queryBusinessPerformanceScore();
  },
  methods: {
    async queryBusinessPerformanceScore() {
      await queryBusinessPerformanceScore({ month: "2020-10" });
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
</style>