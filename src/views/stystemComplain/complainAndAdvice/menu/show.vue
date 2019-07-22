<template>
  <div>
    <Modal title="查看详情" v-model="modal" width="600">
      <Form :label-width="100">
        <Row :gutter="16">
          <Col span="24">
            <FormItem prop="companyName" label="评价人：">
              <Input type="text" v-model="row.realname" readonly />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem prop="companyName" label="反馈与意见：">
              <Input type="textarea" v-model="row.suggestion" readonly />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  props: ['row'],
  data() {
    return {
      modal: true
    };
  },
  methods: {}
};
</script>
