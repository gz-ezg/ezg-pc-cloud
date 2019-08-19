 <template>
  <div>
    <Modal v-model="model" title="发送excel短信" footer-hide width="200" @on-cancel="close">
      <Row :gutter="20">
        <Col span="24">
          <center>
            <Upload ref="upload" :before-upload="handleUpload" action="/">
              <Button type="ghost" icon="ios-cloud-upload-outline" style="margin-top:20px">选择文件</Button>
              <Button type="info" icon="ios-cloud-download-outline" style="margin-top:20px;" @click="open">导入模板</Button>
            </Upload>
          </center>
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
import { sendMessageByExcel } from '@A/logManagement';
export default {
  data() {
    return {
      model: true
    };
  },
  methods: {
    close() {
      this.$emit('cancel');
    },
    open() {
      window.open('http://upload.zgcfo.com/woafiles/sms_template.xlsx');
      this.$emit('ok');
    },
    async handleUpload(file) {
      let formdata = new FormData();
      formdata.append('file', file);
      try {
        await sendMessageByExcel(formdata);
        this.$emit('ok');
      } catch (error) {
        this.close();
      }
      return false;
    }
  },
  created() {}
};
</script>
