<template>
  <div>
    <Modal :value="true" title="查看详情" width="100%" @on-cancel="onClose">
      <Form ref="formValidateDetail" :model="detail" :label-width="100">
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
            <FormItem label="联系电话" prop="tel">
              <Input size="small" v-model="detail.TEL" readonly />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="8">
            <FormItem label="产品名称" prop="unusual_type">
              <Input size="small" v-model="detail.alisname" readonly />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="销售人员" prop="realname">
              <Input size="small" v-model="detail.followby" readonly />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label="当前进度" prop="product_content">
            <Input size="small" v-model="detail.process_type" readonly />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="审批事由" prop="apply_memo">
            <Input size="small" type="textarea" :rows="4" v-model="detail.apply_memo" readonly />
          </FormItem>
        </Row>
      </Form>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: { detail: Object },
  data() {
    return {};
  },

  methods: {
    onClose() {
      this.$emit('cancel');
    }
  },
  created: {}
};
</script>

<style>
#show-order-item textarea.ivu-input {
  border: 0px;
  overflow-y: hidden;
  background-color: rgba(0, 0, 0, 0);
}
</style>
