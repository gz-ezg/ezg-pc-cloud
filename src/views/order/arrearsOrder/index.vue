 <template>
  <div>
    <Row>
      <Col>
        <Card>
          <filtra @search="list.search($event)" @reset="list.reset()" :config="filtraConfig"></filtra>
          <Row>
            <ButtonGroup>
              <Button type="primary" icon="search" @click="handleAdd">新增</Button>
              <Button type="primary" icon="search" @click="handleEdit">编辑</Button>
              <Button type="primary" icon="search" @click="handleShow">查看</Button>
              <Button type="primary" icon="search" @click="handleDelete">删除</Button>
            </ButtonGroup>
          </Row>
          <Row style="margin-top: 10px;">
            <Table
              highlight-row
              border
              size="small"
              @on-row-click="selectRow"
              :loading="list.loading"
              :columns="tableHeader"
              :data="list.data"
            ></Table>

            <Page
              :current="list.page"
              size="small"
              :total="list.total"
              :page-size="list.pageSize"
              show-total
              show-sizer
              show-elevator
              @on-change="list.handleSizeChange($event)"
              @on-page-size-change="list.handlePageSizeChange($event)"
              style="margin-top: 10px"
            ></Page>
          </Row>
        </Card>
      </Col>
    </Row>
    <add-template @ok="handleAddOk" @cancel="handleAdd" v-if="isAdd" />
    <edit-template :type-list="dataDict" :row="currentRow" v-if="isEdit" @ok="handleEditOk" @cancel="isEdit = false" />
    <show-template :row="currentRow" v-if="isShow" @ok="isShow = false" @cancel="isShow = false" />
  </div>
</template>

<script>
import AddTemplate from './Menu/Add.vue';
// import editTemplate from './menu/edit.vue';
// import showTemplate from './menu/show.vue';
import filtra from '@/components/filtra';
// import { listNotify, sendNotify, queryCodes } from '@/api/logManagement';
import { oweOrderList, deleteOweOrder } from '../../../api/order';
import listManage from '../../../utils/listManage';
export default {
  components: {
    AddTemplate,
    // editTemplate,
    // showTemplate,
    filtra
  },
  data() {
    return {
      currentRow: null,
      list: new listManage({ pageSize: 10 }, oweOrderList, this.dataHandle),
      tableHeader: [
        {
          title: '欠费单号',
          key: 'owe_code',
          minWidth: 180
        },
        {
          title: '公司名称',
          width: 180,
          key: 'companyname',
          minWidth: 90
        },
        {
          title: '客户名称',
          width: 180,
          key: 'customer',
          minWidth: 90
        },
        {
          title: '客户电话',
          width: 180,
          key: 'TEL',
          minWidth: 90
        },
        {
          title: '代账产品',
          width: 180,
          key: 'skuname',
          minWidth: 90
        },
        {
          title: '剩余时长',
          width: 180,
          key: 'diff',
          minWidth: 90
        },
        {
          title: '结束税期',
          width: 180,
          key: 'late_period',
          minWidth: 90
        },
        {
          title: '流程状态',
          width: 180,
          key: 'process_type',
          minWidth: 90
        },
        {
          title: '申请备注',
          width: 180,
          key: 'apply_memo',
          minWidth: 90
        },
        {
          title: '创建人',
          width: 180,
          key: 'createName',
          minWidth: 90
        }
      ],
      filtraConfig: [
        { type: 'input', key: 'createby_realname', label: '创建人' },
        { type: 'input', key: 'updateby_realname', label: '修改人' },
        { type: 'date', key: 'createdate', label: '创建时间' }
      ],
      dataDict: [],
      isAtimed: false,
      isEdit: false,
      isShow: false,
      isAdd: false
    };
  },

  methods: {
    handleAddOk() {
      this.handleAdd();
      this.list.reset();
    },
    handleAdd() {
      this.isAdd = !this.isAdd;
    },
    handleEdit() {
      if (!this.currentRow) {
        return this.$Message.info('请选择一行进行查看');
      }
      if (this.currentRow.notify_status == 'sent') {
        return this.$Message.info('该消息不能编辑');
      }
      this.isEdit = !this.isEdit;
    },
    handleEditOk() {
      this.isEdit = !this.isEdit;
      this.list.reset();
    },
    handleShow() {
      this.isShow = !this.isShow;
    },
    dataHandle(data) {
      return data;
    },
    selectRow(row) {

      this.currentRow = row;
    },
    handleDelete() {
      if (!this.currentRow) {
        return this.$Message.info('请选择一行进行查看');
      }
      this.$Modal.confirm({
        title: '提示',
        content: '是否删除',
        onOk: async () => {
          await deleteOweOrder({ applyId: this.currentRow.id });
          this.list.fetchList();
        },
        onCancel: () => {}
      });
    }
  },
  async created() {
    try {
      this.list.fetchList();
    } catch (error) {}
  }
};
</script>
