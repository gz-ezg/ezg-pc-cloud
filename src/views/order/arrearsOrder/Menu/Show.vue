<template>
  <div>
    <Modal title="查看" :value="true" width="80" @on-cancel="onClose">
      <Form ref="abnormalOrderDetail" :model="detail" :rules="ruleInline" :label-width="100">
        <Row :gutter="16">
          <Col span="8">
            <FormItem label="企业名称">
              <Input size="small" v-model="detail.companyname" readonly />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系人">
              <Input size="small" readonly v-model="detail.customer" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系电话">
              <Input size="small" v-model="detail.TEL" readonly />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <FormItem label="产品选择" prop="product">
             <Input size="small" v-model="detail.alisname" readonly />
          </FormItem>
        </Row>
        <Row :gutter="16">
          <Col span="12">
            <FormItem label="结束税期" prop="productContent">
              <Input type="text" readonly size="small" style="width: 200px" v-model="detail.end_period" />
            </FormItem>
          </Col>
          <Col span="12"
            <FormItem label="剩余时长" prop="productContent">
              <Input type="text" readonly size="small" style="width: 50px" v-model="detail.diff" />个月
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <FormItem label="延后税期">
            <Input type="text" size="small" readonly style="width: 200px" v-model="detail.late_period" />
          </FormItem>
        </Row>
        <Row :gutter="16">
          <FormItem label="服务会计">
            <Input type="text" size="small" readonly style="width: 200px" v-model="detail.serverName" />
          </FormItem>
        </Row>
        <Row :gutter="16">
          <FormItem label="跟进销售">
            <Input type="text" size="small" readonly style="width: 200px" v-model="detail.followby" />
          </FormItem>
        </Row>
        <Row :gutter="16">
          <FormItem label="服务备注">
            <Input type="textarea" :rows="4" readonly size="small" v-model="detail.memo" />
          </FormItem>
        </Row>
        <Row :gutter="16">
          <Col>
            <FormItem label="欠费申请备注" prop="reason">
              <Input type="textarea" :rows="4" readonly size="small" v-model="detail.apply_memo" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="onClose">关闭</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
export default {
  props: { detail: { type: Object, default: () => ({ companyName: '' }) } },
  data() {
    return {};
  },
  methods: {
    onClose() {
      this.$emit('cancel');
    }
  },
  created() {
    console.log(this.detail);
  }
};
</script>
