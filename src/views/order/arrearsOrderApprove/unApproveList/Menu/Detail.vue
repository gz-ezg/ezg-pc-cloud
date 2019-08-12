<template>
  <div>
    <Modal :value="true" title="查看详情" width="100%">
      <Form ref="formValidateDetail" :model="row" :label-width="100">
        <Row :gutter="16">
          <Col span="8">
            <FormItem label="企业名称">
              <Input size="small" v-model="row.companyname" readonly />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系人">
              <Input size="small" v-model="row.name" readonly />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系电话" prop="tel">
              <Input size="small" v-model="formValidateDetail.tel" readonly />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="8">
            <FormItem label="异常类别" prop="unusual_type">
              <Input size="small" v-model="formValidateDetail.unusual_type" readonly />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="销售人员" prop="realname">
              <Input size="small" v-model="formValidateDetail.realname" readonly />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label="产品内容" prop="product_content">
            <Input size="small" type="textarea" :rows="2" v-model="formValidateDetail.product_content" readonly />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="审批事由" prop="apply_memo">
            <Input size="small" type="textarea" :rows="4" v-model="formValidateDetail.apply_memo" readonly />
          </FormItem>
        </Row>

        <Row v-if="formValidateDetail.imgs && formValidateDetail.imgs.length">
          <FormItem label="图片">
            <a :key="index" v-for="(item, index) in formValidateDetail.imgs" target="_blank" :href="item">
              <img style="width:200px;height:200px;border-radius:20px" :src="item" />
            </a>
          </FormItem>
        </Row>
      </Form>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: 'row',
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
#show-order-item textarea.ivu-input {
  border: 0px;
  overflow-y: hidden;
  background-color: rgba(0, 0, 0, 0);
}
</style>
