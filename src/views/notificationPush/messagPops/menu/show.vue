 <template>
  <div>
    <Modal v-model="show" title="查看" width="800" footer-hide @on-cancel="onCancel">
      <Card>
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          {{ msg.notify_type_name }}
        </p>
        <a href="#" slot="extra">
          <Icon type="ios-loop-strong"></Icon>
          创建人：{{ msg.createby_realname }} {{ msg.createdate }}
        </a>
        <p>通知部门：{{ msg.notify_depart_name }}</p>
        <p>内容：</p>
        <div class="edit_container" v-html="msg.notify_content"></div>
      </Card>
    </Modal>
  </div>
</template>

<script>
export default {
  props: ['row'],
  data() {
    return {
      show: true,
      content: ''
    };
  },
  methods: {
    onCancel() {
      this.$emit('cancel');
    }
  },
  created() {
    let { row } = this;
    console.log(row);
    this.msg = row;
  }
};
</script>


<style lang="less">
.edit_container {
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>