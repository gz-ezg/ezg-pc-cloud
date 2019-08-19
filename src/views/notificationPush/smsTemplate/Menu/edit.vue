 <template>
  <div>
    <Modal v-model="show" title="编辑" width="500" @on-cancel="onCancel">
      <Form ref="formValidate" :model="formValidate" label-position="right" :label-width="130">
        <FormItem label="模版名称：">
          <Input v-model="formValidate.template_name" type="text" placeholder="" />
        </FormItem>

        <FormItem label="模版内容：">
          <Input v-model="formValidate.template_content" type="textarea" :rows="4" placeholder="Enter something..." />
        </FormItem>

        <FormItem v-if="formValidate.job_class_name" label="job任务类：">
          <Input :value="formValidate.job_class_name" readonly type="text" placeholder="" />
        </FormItem>

        <FormItem v-if="formValidate.cron_expression" label="执行周期cron 表达式">
          <Input :value="formValidate.cron_expression" readonly type="text" placeholder="" />
        </FormItem>

        <FormItem label="关联用户">
          <Select
            v-model="formValidate.linked_user_json"
            placeholder="关联用户"
            filterable
            multiple
            remote
            :remote-method="getUser"
            :loading="loading"
          >
            <Option v-for="item in userList" :key="item.id" :value="item.id" :label="item.realname">
              <span>{{ item.realname }}</span>
              <span style="float:right;color:#ccc">{{ item.departname }}</span>
            </Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading" style="margin-left:20px" @click="handleEditTemplate">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { listUser } from '@A/userApi';
import { markingUpdate, marketingDetail } from '@A/logManagement';
export default {
  props: ['id'],
  data() {
    return {
      show: true,
      loading: false,
      userList: '',
      formValidate: {
        template_name: '',
        template_content: '',
        job_class_name: '',
        cron_expression: '',
        linked_user_json: ''
      }
    };
  },
  methods: {
    async getUser(query) {
      let config = query ? { page: 1, pageSize: 10, realname: query } : { page: 1, pageSize: 10 };
      const resp = await listUser(config);
      this.userList = resp.rows;
    },
    async handleEditTemplate() {
      try {
        this.loading = true;
        this.formValidate.linked_user_json = JSON.stringify(this.formValidate.linked_user_json);
        this.formValidate.id = this.id;
        await markingUpdate(this.formValidate);
        this.$emit('ok');
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    onCancel() {
      this.$emit('cancel');
    },
    async getDetail() {
      const resp = await marketingDetail({ id: this.id });
      this.formValidate.template_name = resp.template_name;
      this.formValidate.template_content = resp.template_content;
      this.formValidate.job_class_name = resp.job_class_name;
      this.formValidate.cron_expression = resp.cron_expression;
      this.userList = resp.linked_users.map(v => {
        return { id: v.user_id, realname: v.realname };
      });
      this.formValidate.linked_user_json = this.userList.map(v => v.id);
    }
  },
  created() {
    this.getDetail();
  }
};
</script>
