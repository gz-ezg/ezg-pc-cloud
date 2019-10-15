 <template>
  <div>
    <Card>
      <x-table ref="table" :url="url" @select="selectRow" :header="tableHeader" :config="filtraConfig">
        <Row>
          <ButtonGroup>
            <Button type="primary" icon="search" @click="onAdd">新增</Button>
            <Button type="primary" icon="search" @click="onEdit">编辑</Button>
            <Button type="primary" icon="search" @click="onShow">查看</Button>
            <Button v-permission="['arrearsOrder_index.del']" type="primary" icon="search" @click="onDelete">删除</Button>
          </ButtonGroup>
        </Row>
      </x-table>
    </Card>
    <!-- 新增 -->
    <add-template @ok="onAddOk" @cancel="addPopup = false" v-if="addPopup" />
    <!--编辑 -->
    <edit-template :detail="currentRow" v-if="editPopup" @ok="onEditOk" @cancel="editPopup = false" />
    <show-template :detail="currentRow" v-if="showPopup" @ok="showPopup = false" @cancel="showPopup = false" />
  </div>
</template>

<script>
import xTable from '@C/xTable';
import AddTemplate from './Menu/Add.vue';
import ShowTemplate from './Menu/Show.vue';
import EditTemplate from './Menu/Edit.vue';
import { deleteOweOrder } from '@A/order';
export default {
  components: {
    AddTemplate,
    ShowTemplate,
    EditTemplate,
    xTable
  },
  data() {
    return {
      url: '/order/oweOrder/list',
      currentRow: null,
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
        { type: 'input', key: 'conpanyName', label: '公司' },
        { type: 'input', key: 'customerName', label: '客户' },
        { type: 'input', key: 'tel', label: '联系方式' },
        { type: 'input', key: 'realname', label: '创建人' },
        { type: 'date', key: 'createdate', label: '创建时间' }
      ],
      addPopup: false,
      showPopup: false,
      editPopup: false
    };
  },

  methods: {
    onAdd() {
      this.addPopup = true;
    },
    onAddOk() {
      this.addPopup = false;
      this.$refs.table.list.fetchList();
    },

    onEdit() {
      if (!this.currentRow) {
        return this.$Message.info('请选择一行进行查看');
      }
      if (this.currentRow.current_process == 'zg') {
        this.editPopup = true;
      } else {
        return this.$Message.warning('当前订单状态不允许编辑！');
      }
    },
    onEditOk() {
      this.editPopup = false;
      this.$refs.table.list.fetchList();
    },
    onShow() {
      if (!this.currentRow) {
        return this.$Message.info('请选择一行进行查看');
      }
      this.showPopup = true;
    },

    selectRow(row) {
      this.currentRow = row;
    },
    onDelete() {
      if (!this.currentRow) {
        return this.$Message.info('请选择一行进行查看');
      }

      if (this.currentRow.current_process === 'zg') {
        this.$Modal.confirm({
          title: '提示',
          content: '是否删除',
          onOk: async () => {
            await deleteOweOrder({ applyId: this.currentRow.id });
            this.$refs.table.list.fetchList();
          },
          onCancel: () => {}
        });
      } else {
        return this.$Message.warning('当前订单状态不允许删除！');
      }
    }
  },
  async created() {}
};
</script>
