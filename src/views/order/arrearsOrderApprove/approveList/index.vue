 <template>
  <div>
    <Card>
      <x-table ref="table" :url="url" :list-query="query" :header="tableHeader" :config="filtraConfig">
        <Row>
          <ButtonGroup>
            <Button type="primary" icon="search" @click="onExport">导出Excel</Button>
            <Button type="primary" icon="search" @click="onRefresh">刷新</Button>
          </ButtonGroup>
        </Row>
      </x-table>
    </Card>
    <aduit-log :id="currentId" v-if="showHistoryPopup" @cancel="showHistoryPopup = false"></aduit-log>
  </div>
</template>

<script>
import xTable from '@C/xTable';
import AduitLog from './Menu/aduitLog.vue';

export default {
  components: {
    xTable,
    AduitLog
  },
  data() {
    return {
      currentId: '',
      url: '/order/oweOrder/auditList',
      showHistoryPopup: false,
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
                    this.currentId = params.row.id;
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
        { type: 'input', key: 'conpanyName', label: '公司' },
        { type: 'input', key: 'customerName', label: '客户' },
        { type: 'input', key: 'tel', label: '联系方式' },
        { type: 'input', key: 'realname', label: '创建人' },
        { type: 'date', key: 'createdate', label: '创建时间' }
      ],
      execlConfig: [
        { field: 'owe_code', title: '欠费单号' },
        { field: 'companyname', title: '公司名称' },
        { field: 'customer', title: '客户名称' },
        { field: 'TEL', title: '客户电话' },
        { field: 'alisname', title: '产品内容' },
        { field: 'apply_memo', title: '申请备注' },
        { field: 'createName', title: '创建人' },
        { field: 'createdate', title: '创建时间' }
      ],
      query: {
        isAudit: 'Y'
      }
    };
  },

  methods: {
    handleShow() {
      this.showHistoryPopup = true;
    },
    onExport() {
      this.$refs.table.list.downloadExcel(this.execlConfig);
    },
    onRefresh() {
      this.$refs.table.list.fetchList();
    }
  }
};
</script>
