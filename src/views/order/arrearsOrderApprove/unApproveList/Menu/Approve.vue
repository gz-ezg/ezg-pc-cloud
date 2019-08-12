<template>
  <div>
    <Modal :value="true" title="办理审批" width="100%">
      <Form :model="detail" :label-width="100">
        <Row :gutter="16">
          <Col span="8">
            <FormItem label="企业名称">
              <Input size="small" v-model="detail.companyname" readonly />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系人">
              <Input size="small" v-model="detail.customer" readonly />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系电话">
              <Input size="small" v-model="detail.TEL" readonly />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="8">
            <FormItem label="产品选择" prop="unusual_type">
              <Input size="small" v-model="detail.skuname" readonly />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="结束税期" prop="realname">
              <Input size="small" v-model="detail.late_period" readonly />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label="产品内容" prop="product_content">
            <Input size="small" type="textarea" :rows="2" v-model="detail.alisname" readonly />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="审批事由" prop="apply_memo">
            <Input size="small" type="textarea" :rows="4" v-model="detail.apply_memo" readonly />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="历史审批：">
            <div v-if="historyData" class="s">
              <div v-for="(item, index) in historyData" :key="index" class="s1">
                <div>{{ item.realname }}：{{ item.audit_memo }}</div>
                <div class="s2">{{ item.audit_date }}</div>
              </div>
            </div>
            <div>
              无
            </div>
          </FormItem>
        </Row>
      </Form>
      <Tabs>
        <TabPane label="任务处理" icon="clipboard">
          <FormItem label="审批备注">
            <Input v-model="detail.memo" type="textarea" />
          </FormItem>
        </TabPane>
      </Tabs>
      <div slot="footer">
        <Button type="primary" @click="handleAgree" :loading="loading">同意</Button>
        <Button type="primary" @click="handleReject" :loading="loading">驳回</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { auditListByApplyId, audit } from '../../../../../api/order';
export default {
  props: ['row'],
  data() {
    return {
      historyData: [],
      applyId: '',
      // auditStatus: '',Agree或Reject
      loading: false,
      detail: {
        companyname: '',
        customer: '',
        TEL: '',
        memo: ''
      }
    };
  },
  methods: {
    async getHistoryData() {
      await auditListByApplyId({ applyId: this.detail.id });
    },
    //办理审批
    handleAgree() {
      const { id: applyId } = this.detail;
      audit({ applyId, auditStatus: 'Agree', memo: '测试' });
    },

    handleReject() {}
  },
  created() {
    this.detail = JSON.parse(JSON.stringify(this.row));
    this.getHistoryData();
  }
};
</script>

<style>
.s {
  min-height: 32px;
  vertical-align: bottom;
  font-size: 12px;
  border: 1px solid #dddee1;
  padding: 4px 7px;
  border-radius: 4px;
  color: #495060;
  background-color: #fff;
  position: relative;
  cursor: text;
  font-family: inherit;
  word-wrap: break-word;
  white-space: pre-wrap;
}
.s1 {
  display: flex;
  justify-content: space-between;
}
.s2 {
  flex: 0 0 120px;
  margin-left: 50px;
}
</style>
