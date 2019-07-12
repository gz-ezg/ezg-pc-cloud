 <template>
  <div>
    <Modal v-model="show" title="新增" width="500" @on-cancel="onCancel">
      <Form ref="formValidate" :model="formValidate" label-position="right" :label-width="130">
        <FormItem label="模版名称：">
          <Input v-model="formValidate.template_name" type="text" placeholder="" />
        </FormItem>

        <FormItem label="模板类型：">
          <RadioGroup v-model="formValidate.template_type">
            <Radio label="timing">定时</Radio>
            <Radio label="event">事件</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem v-if="formValidate.template_type == 'timing'" label="job任务类：">
          <Input v-model="formValidate.job_class_name" type="text" placeholder="" />
        </FormItem>

        <FormItem v-if="formValidate.template_type == 'timing'" label="执行周期cron 表达式">
          <Input v-model="formValidate.cron_expression" type="text" placeholder="" />
        </FormItem>

        <FormItem label="模版内容：">
          <Input v-model="formValidate.template_content" type="textarea" :rows="4" placeholder="Enter something..." />
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
        <Button type="primary" :loading="loading" style="margin-left:20px" @click="handleNewTemplate">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import serviceApi, { userApi } from '../../service';
export default {
  data() {
    return {
      show: true,
      loading: false,
      userList: '',
      formValidate: {
        template_name: '',
        template_type: 'timing',
        job_class_name: '',
        cron_expression: '',
        template_content: '',
        linked_user_json: ''
      }
    };
  },
  methods: {
    async getUser(query) {
      let config = query ? { page: 1, pageSize: 10, realname: query } : { page: 1, pageSize: 10 };
      const resp = await userApi.getList(config);
      this.userList = resp.rows;
    },
    async handleNewTemplate() {
      try {
        this.loading = true;
        this.formValidate.linked_user_json = JSON.stringify(this.formValidate.linked_user_json);
        await serviceApi.create(this.formValidate);
      } catch (error) {
      } finally {
        this.$emit('ok');
        this.loading = false;
      }
    },
    onCancel() {
      this.$emit('cancel');
    }
  },
  created() {
    this.getUser();
  }
};
</script>
