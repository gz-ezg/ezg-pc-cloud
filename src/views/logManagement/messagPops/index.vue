 <template>
  <div>
    <Row>
      <Col>
        <Card>
          <filtra @search="list.search($event)" @reset="list.reset()" :config="filtraConfig"></filtra>
          <Row>
            <ButtonGroup>
              <Button type="primary" icon="search" @click="handleAdd">录入</Button>
              <Button type="primary" icon="search" @click="handleEdit">编辑</Button>
              <!-- <Button type="primary" icon="search" @click="handleShow">查看</Button> -->
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
    <add-template :type-list="dataDict" @ok="handleAddOk" @cancel="handleAdd" v-if="isAdd" />
    <edit-template :type-list="dataDict" :row="currentRow" v-if="isEdit" @ok="handleEditOk" @cancel="isEdit = false" />
    <show-template :row="currentRow" v-if="isShow" @ok="isShow = false" @cancel="isShow = false" />
  </div>
</template>

<script>
import AddTemplate from './menu/add.vue';
import editTemplate from './menu/edit.vue';
import showTemplate from './menu/show.vue';
import filtra from '@/components/filtra';
import { listNotify, sendNotify, queryCodes } from '@/api/logManagement';
import listManage from '../../../utils/listManage';
export default {
  components: {
    AddTemplate,
    editTemplate,
    showTemplate,
    filtra
  },
  data() {
    return {
      currentRow: null,
      list: new listManage({ pageSize: 10 }, listNotify, this.dataHandle),
      tableHeader: [
        {
          title: '类型',
          key: 'notify_type_name',
          minWidth: 180
        },
        {
          title: '通知部门',
          width: 180,
          key: 'notify_depart_name',
          minWidth: 90
        },
        {
          title: '创建时间',
          width: 180,
          key: 'createdate',
          minWidth: 90
        },
        {
          title: '创建人',
          width: 180,
          key: 'createby_realname',
          minWidth: 90
        },
        {
          title: '发送状态',
          width: 180,
          key: 'notify_status',
          minWidth: 90,
          render: (h, params) => {
            let type = params.row.notify_status == 'sent' ? '已发送' : '待发送';
            return h('div', type);
          }
        },
        {
          title: '操作',
          fixed: 'right',
          width: 90,
          render: (h, params) => {
            let isSent = params.row.notify_status == 'sent';
            return isSent
              ? h(
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
                  '查看'
                )
              : h(
                  'Button',
                  {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.sendMessage(params);
                      }
                    }
                  },
                  '发送'
                );
          }
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
      return data.map(v => {
        v.notify_type_name = this.MAP[v.notify_type];
        return v;
      });
    },
    async sendMessage({ row: { id = '' } }) {
      this.$Modal.confirm({
        title: '提示',
        content: '是否发送通知',
        onOk: async () => {
          await sendNotify({ id });
          this.list.fetchList();
        },
        onCancel: () => {}
      });
    },
    selectRow(row) {
      this.currentRow = row;
    }
  },
  async created() {
    try {
      let [dataDict, MAP] = await queryCodes('notify_template_type');
      this.MAP = MAP;
      this.dataDict = dataDict;
      this.list.setDefaultConfig({ sortField: 'nt.updatedate' });
      this.list.fetchList();
    } catch (error) {}
  }
};
</script>
