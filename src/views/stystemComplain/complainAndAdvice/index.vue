<template>
  <div>
    <Card>
      <Row>
        <ButtonGroup style="float:left">
          <Button type="primary" icon="information-circled" @click="showdetail">查看</Button>
          <Button type="primary" icon="ios-color-wand-outline" @click="reply">回复</Button>
        </ButtonGroup>
      </Row>
      <Row style="margin-top: 10px;">
        <Table
          ref="selection"
          highlight-row
          size="small"
          :columns="header"
          :data="list.data"
          @on-current-change="save_current_row"
          @on-row-dblclick="showdetail"
        ></Table>
        <Page
          placement="top"
          size="small"
          :total="list.total"
          show-total
          show-sizer
          show-elevator
          @on-change="list.handleSizeChange"
          style="margin-top: 10px"
        ></Page>
      </Row>

      <Show v-if="isShow" />
      <Reply v-if="Reply" />
    </Card>
  </div>
</template>

<script>
import listManage from '../../../utils/listManage';
const url = 'api/system/systemFeedbackList';
import Reply from './menu/reply.vue';
import Show from './menu/show.vue';
export default {
  components: {
    Show,
    Reply
  },
  data() {
    return {
      list: listManage({ pageSize: 10 }, url),
      header: [
        {
          title: '系统评价得分',
          key: 'score',
          minWidth: 150
        },
        {
          title: '意见或建议',
          key: 'suggestion',
          minWidth: 300
        },
        {
          title: '评价时间',
          key: 'createdate',
          minWidth: 150
        },
        {
          title: '评价人',
          key: 'realname',
          minWidth: 150
        }
      ],
      currentRow: null,
      isShow: false,
      isReply: false
    };
  },
  methods: {
    handleReply() {
      if (!this.currentRow) {
        return this.$Message.warning('请选择一行进行查看！');
      }
      this.isReply = !this.isReply;
    },
    handleShow() {
      if (!this.currentRow) {
        return this.$Message.warning('请选择一行进行查看！');
        this.isShow = !this.isShow;
      }
    }
  },
  created() {
    this.list.setDefaultConfig({ sortField: 'createdate' });
    this.list.fetchList();
  }
};
</script>
