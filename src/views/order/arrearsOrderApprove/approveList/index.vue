 <template>
  <div>
    <Row>
      <Col>
        <Card>
          <filtra @search="list.search($event)" @reset="list.reset()" :config="filtraConfig"></filtra>
          <Row>
            <ButtonGroup>
              <Button type="primary" icon="search" @click="handleExport">导出Excel</Button>
              <Button type="primary" icon="search" @click="list.fetchList()">刷新</Button>
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

    <aduit-log v-if="showHistoryPopup"></aduit-log>
  </div>
</template>

<script>
import filtra from '@/components/filtra';
import AduitLog from './Menu/aduitLog.vue';
import { auditList } from '../../../../api/order';
import listManage from '../../../../utils/listManage';
export default {
  components: {
    filtra,
    AduitLog
  },
  data() {
    return {
      currentRow: null,
      showHistoryPopup: false,
      list: new listManage({ pageSize: 10 }, auditList),
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
          key: 'createby_realname',
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
      ]
    };
  },

  methods: {
    handleShow() {
      this.showHistoryPopup = !this.showHistoryPopup;
    }
  },
  async created() {
    try {
      this.list.setDefaultConfig({ isAudit: 'Y' });
      this.list.fetchList();
    } catch (error) {}
  }
};
</script>
