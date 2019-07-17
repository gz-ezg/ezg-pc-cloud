<template>
  <div>
    <Modal closable width="800px" v-model="show" title="消息中心" footer-hide @on-cancel="handleCancel">
      <ButtonGroup>
        <Button :type="type == 'N' ? 'primary' : ''" @click="changeType('N')">
          查看未读
        </Button>
        <Button :type="type == 'Y' ? 'primary' : ''" @click="changeType('Y')">
          查看已读
        </Button>
      </ButtonGroup>

      <Row style="margin-top:5px;">
        <Button :loading="list.loading" @click="handleUpdateStatus" v-if="type == 'N'" type="success">
          读取
        </Button></Row
      >
      <Row style="margin-top: 10px;">
        <Table
          @on-row-dblclick="handleShowDetail"
          @on-select-all="handleSelect"
          highlight-row
          border
          @on-select="handleSelect"
          size="small"
          :loading="list.loading"
          :columns="tableHeader"
          :data="list.data"
        ></Table>
        <Page
          size="small"
          :current="list.page"
          :total="list.total"
          :page-size="list.pageSize"
          show-total
          show-elevator
          @on-change="list.handleSizeChange($event)"
          @on-page-size-change="list.handlePageSizeChange($event)"
          style="margin-top: 10px"
        ></Page>
      </Row>
    </Modal>
  </div>
</template>

<script>
import listManage from '../../utils/listManage';
import { listPersonLog, getUnreadNum, updateLogStatus } from '@/api/logManagement';
export default {
  props: ['parent'],
  data() {
    return {
      show: true,
      list: new listManage({ pageSize: 5 }, listPersonLog, this.listDataHander),
      tableHeader: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '内容',
          width: 180,
          key: 'msg',
          minWidth: 90
        },
        {
          title: '类型',
          width: 180,
          key: 'notify_type_name',
          minWidth: 90
        },
        {
          title: '发送时间',
          width: 180,
          key: 'senddate',
          minWidth: 90
        },
        {
          title: '创建人',
          width: 180,
          key: 'create_realname',
          minWidth: 90
        }
      ],
      type: 'N',
      selectData: []
    };
  },
  methods: {
    listDataHander(e) {
      return e.map(v => {
        v.notify_type_name = this.MAP[v.notify_type];
        return v;
      });
    },
    changeType(type) {
      this.type = type;
      this.list.fetchList(1, { read_flag: this.type });
    },

    handleSelect(value) {
      this.selectData = value;
    },

    handleShowDetail(e) {
      this.$emit('on-dlclick', e);
    },
    handleCancel() {
      this.$emit('cancel');
    },
    async handleUpdateStatus() {
      if (!this.selectData.length) {
        return this.$Message.info('请选择消息');
      }
      try {
        this.list.loading = true;
        let config = this.selectData.map(v => v.id).join(',');
        let resp = await updateLogStatus({ ids: config, read_flag: 'Y' });
        this.list.fetchList(1, { read_flag: 'N' });
        setTimeout(async () => {
          this.parent.unreadNum = await getUnreadNum();
        }, 500);
      } catch (error) {
        console.log(error);
      } finally {
        this.list.loading = false;
        this.selectData = [];
      }
    }
  },
  async created() {
    let [, MAP] = await this.$queryCodes('notify_template_type');
    this.MAP = MAP;
    this.list.setDefaultConfig({ sortField: 'senddate' });
    this.list.fetchList(1, { read_flag: this.type });
  }
};
</script>
