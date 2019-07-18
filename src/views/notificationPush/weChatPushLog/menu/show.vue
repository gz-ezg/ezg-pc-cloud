 <template>
  <div>
    <Modal title="查看" width="600" v-model="model" @on-cancel="close">
      <Form :label-width="100">
        <Row :gutter="16">
          <Col span="12">
            <FormItem label="电话号码：">
              <Input readonly size="small" type="text" v-model="row.mobile" placeholder="" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="12">
            <FormItem label="发送人：">
              <Input readonly size="small" type="text" v-model="row.realname" placeholder="" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="12">
            <FormItem label="是否成功：">
              <Select transfer v-model="row.isSuccess" placeholder="请选择">
                <Option value="Y">成功</Option>
                <Option value="N">失败</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="12">
            <FormItem label="返回信息：">
              <Input readonly size="small" type="text" v-model="row.resultMsg" placeholder="" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="24">
            <FormItem label="短信内容：">
              <Input size="small" type="textarea" :autosize="{ maxRows: 12 }" v-model="row.first" placeholder=""> </Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="24">
            <FormItem label="关键词：">
              <Input size="small" type="textarea" :autosize="{ maxRows: 12 }" v-model="row.keyword" placeholder=""> </Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="24">
            <FormItem label="链接标题：">
              <Input size="small" type="textarea" :autosize="{ maxRows: 12 }" v-model="row.remark" placeholder=""> </Input>
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
