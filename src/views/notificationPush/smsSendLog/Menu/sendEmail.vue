 <template>
  <div>
    <Modal title="发送短信" width="300" v-model="model" @on-cancel="close">
      <Form ref="formEmail" :model="formEmail" :rules="ruleValidate">
        <FormItem prop="phone">
          <Input type="input" v-model="formEmail.phone" placeholder="请输入手机号" />
        </FormItem>
        <FormItem prop="msg_content">
          <Input type="textarea" :rows="6" v-model="formEmail.msg_content" placeholder="请输入短信内容" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleSendEmail" :loading="loading">发送</Button>
        <Button type="ghost" @click="close">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { sendMessage } from '@A/logManagement';
export default {
  data() {
    return {
      model: true,
      formEmail: {
        phone: '',
        msg_content: ''
      },
      ruleValidate: {
        phone: [{ required: true, message: '请填写手机号', trigger: 'blur' }],
        msg_content: [{ required: true, message: '请填写内容', trigger: 'blur' }]
      },
      loading: false
    };
  },
  methods: {
    close() {
      this.$emit('cancel');
    },
    handleSendEmail() {
      this.$refs['formEmail'].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            let params = {
              phone: this.formEmail.phone,
              content: this.formEmail.msg_content
            };
            const formData = new FormData();
            Object.keys(params).forEach(key => {
              formData.append(key, params[key]);
            });
            await sendMessage(formData);
            this.$emit('ok');
          } catch (error) {
            console.log(error);
            this.$emit('close');
          } finally {
            this.loading = false;
          }
        }
      });
    }
  },
  created() {}
};
</script>