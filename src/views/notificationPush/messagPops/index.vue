 <template>
  <div>
    <Card>
      <x-table
        ref="table"
        :url="url"
        list-query="query"
        :handler="dataHandle"
        :header="tableHeader"
        :config="filtraConfig"
        @select="selectRow"
      >
        <Row>
          <ButtonGroup>
            <Button type="primary" icon="search" @click="handleAdd">录入</Button>
            <Button type="primary" icon="search" @click="handleEdit">编辑</Button>
          </ButtonGroup>
        </Row>
      </x-table>
    </Card>

    <add v-if="isAdd" :type-list="DDIC_notify_template_type" @ok="handleAddOk" @cancel="handleAdd" />
    <edit v-if="isEdit" :type-list="DDIC_notify_template_type" :row="currentRow" @ok="handleEditOk" @cancel="isEdit = false" />
    <show v-if="isShow" :row="DDIC_notify_template_type" @ok="isShow = false" @cancel="isShow = false" />
  </div>
</template>

<script>
import Add from './Menu/add.vue';
import Edit from './Menu/edit.vue';
import Show from './Menu/show.vue';
import { sendNotify } from '@A/logManagement';
import xTable from '@C/xTable';

export default {
  components: {
    Add,
    Edit,
    Show,
    xTable
  },
  data() {
    return {
      url: '/system/notify/template/list',
      currentRow: null,
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
      query: { sortField: 'nt.updatedate' },
      DDIC_notify_template_type: [],
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
        v.notify_type_name = this.MAP_notify_template_type[v.notify_type];
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
      let [dataDict, MAP] = await this.$queryCodes('notify_template_type');
      this.MAP_notify_template_type = MAP;
      this.DDIC_notify_template_type = dataDict;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
