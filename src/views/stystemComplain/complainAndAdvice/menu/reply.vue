<template>
  <div>
    <Modal title="回复" v-model="modal" width="600" @on-cancel="close">
      <Form :label-width="100">
        <Row :gutter="16">
          <Col span="24">
            <FormItem prop="realname" label="评价人：">
              <Input type="text" v-model="row.realname" readonly />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem prop="suggestion" label="反馈与意见：">
              <Input type="textarea" v-model="row.suggestion" readonly />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem prop="replycontent" label="回复内容：">
              <Input type="textarea" v-model="replycontent" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleSumbit" :loading="loading">提交</Button>
        <Button type="ghost" @click="close">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'complainAndAdvice_index',
  data() {
    return {
      modal: true
    };
  },
  methods: {
    async handleSumbit() {
      let config = {
        feedback: this.current_row.id,
        feedbackby: this.current_row.createby,
        replycontent: this.replycontent
      };
      try {
        this.loading = true;
        await replySystemFeedback(config);
        this.$emit('ok');
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    close() {
      this.$emit('cancel');
    }
  }
};
</script>
