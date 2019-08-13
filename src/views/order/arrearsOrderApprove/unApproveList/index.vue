 <template>
  <div>
    <Card>
      <x-table ref="table" :url="url" :list-query="query" :header="tableHeader" :config="filtraConfig">
        <Row>
          <ButtonGroup>
            <Button type="primary" icon="search" @click="onApprove">办理审批</Button>
            <Button type="primary" icon="search" @click="onRefresh">刷新</Button>
          </ButtonGroup>
        </Row>
      </x-table>
    </Card>

    <show-template :row="currentRow" v-if="showDetailPopups" @ok="showDetailPopups = false" @cancel="showDetailPopups = false" />
    <approve v-if="dealApprovePopups" :row="currentRow" />
  </div>
</template>

<script>
import xTable from '@C/xTable';
import DetailTemplate from './Menu/Detail.vue';
import Approve from './Menu/Approve.vue';
export default {
  components: {
    Approve,
    DetailTemplate,
    xTable
  },
  data() {
    return {
      url: '/order/oweOrder/auditList',
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
        },
        {
          title: '创建时间',
          width: 180,
          key: 'createdate',
          minWidth: 90
        },
        {
          title: '操作',
          fixed: 'right',
          width: 90,
          render: (h, params) => {
            return h(
              'Button',
              {
                props: {
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.currentRow = params.row;
                    this.handleShow();
                  }
                }
              },
              '查看详情'
            );
          }
        }
      ],
      filtraConfig: [
        { type: 'input', key: 'createby_realname', label: '创建人' },
        { type: 'input', key: 'updateby_realname', label: '修改人' },
        { type: 'date', key: 'createdate', label: '创建时间' }
      ],
      showDetailPopups: false,
      dealApprovePopups: false,
      list: null,
      query: {
        isAudit: 'N'
      }
    };
  },

  methods: {
    handleAddOk() {
      this.handleAdd();
      this.list.reset();
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
      this.showDetailPopups = !this.showDetailPopups;
    },
    selectRow(row) {
      this.currentRow = row;
    },
    onApprove() {
      if (!this.currentRow) {
        return this.$Message.info('请选择一行进行审批');
      }
      console.log(this.currentRow);
      this.dealApprovePopups = !this.dealApprovePopups;
      console.log(this.dealApprovePopups);
    },
    onRefresh() {
      this.$refs.table.list.fetchList();
    }
  },
  async created() {}
};
</script>
