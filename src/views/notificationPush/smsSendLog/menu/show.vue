 <template>
  <div>
    <Modal title="查看" width="600" v-model="model" @on-cancel="close">
      <Form :label-width="100">
        <Row :gutter="16">
          <Col span="12">
            <FormItem label="电话号码：">
              <Input readonly size="small" type="text" v-model="row.phone" placeholder=""> </Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="12">
            <FormItem label="短信模板：">
              <Input readonly size="small" type="text" v-model="row.msgtname" placeholder=""> </Input>
            </FormItem>
          </Col>
        </Row>

        <Row :gutter="16">
          <Col span="12">
            <FormItem label="结果">
              <Input readonly size="small" type="textarea" :autosize="{ maxRows: 8 }" v-model="row.info" placeholder=""> </Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="24">
            <FormItem label="短信内容：">
              <Input size="small" type="textarea" :autosize="{ maxRows: 8 }" v-model="row.msg_content" placeholder="" readonly>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="12">
            <FormItem label="发送日期：">
              <Input readonly size="small" type="text" v-model="row.send_date" placeholder=""> </Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button size="small" type="ghost" style="margin-left:20px" @click="close">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: ['row'],
  data() {
    return {
      model: true
    };
  },
  methods: {
    close() {
      this.$emit('cancel');
    }
  },
  created() {}
};
</script>
