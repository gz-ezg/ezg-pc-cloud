 <template>
  <div>
    <Modal @on-cancel="onCancel" footer-hide="true" title="查看" width="540" :label-width="120" v-model="show">
      <Form>
        <FormItem label="模板名称：">
          {{ detail.template_name }}
        </FormItem>
        <FormItem label="模板内容：">
          <div>
            {{ detail.template_content }}
          </div>
        </FormItem>
        <FormItem v-if="detail.cron_expression" label="执行周期cron 表达式：">
          {{ detail.cron_expression }}
        </FormItem>
        <FormItem v-if="detail.job_class_name" label="job任务类：">
          <div style="word-wrap: break-word;">{{ detail.job_class_name }}</div>
        </FormItem>
        <FormItem v-if="detail.job_state" label="任务状态">
          {{ detail.job_state }}
        </FormItem>

        <FormItem label="创建时间：">
          {{ detail.createdate }}
        </FormItem>
        <FormItem label="修改时间：">
          {{ detail.updatedate }}
        </FormItem>
        <FormItem label="关联客户：">
          <span v-for="(item, index) in detail.linked_users" :key="index">
            {{ item.realname || '空' }}
          </span>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { marketingDetail } from '@A/logManagement';
export default {
  props: ['id'],
  data() {
    return {
      show: true,
      loading: false,
      userList: '',
      detail: {}
    };
  },
  methods: {
    async getDetail() {
      try {
        this.detail = await marketingDetail({ id: this.id });
      } catch (error) {}
    },
    onCancel() {
      this.$emit('cancel');
    }
  },
  created() {
    this.getDetail();
  }
};
</script>
