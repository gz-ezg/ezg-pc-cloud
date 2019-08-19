 <template>
  <div>
    <Card>
      <x-table ref="table" :url="url" :handler="dataHandle" :header="tableHeader" :config="filtraConfig" @select="selectRow">
        <Row>
          <ButtonGroup>
            <Button type="primary" icon="search" @click="handleAdd">新增</Button>
            <Button type="primary" icon="search" @click="handleEdit">编辑</Button>
            <Button type="primary" icon="search" @click="handleShow">查看</Button>
          </ButtonGroup>
        </Row>
      </x-table>
    </Card>

    <add
      @ok="
        () => {
          this.handleAdd();
          this.list.fetchList();
        }
      "
      @cancel="handleAdd"
      v-if="isAdd"
    />

    <edit v-if="isEdit" :id="currentId" @ok="isEdit = false" @cancel="isEdit = false" />
    <show v-if="isShow" :id="currentId" @cancel="isShow = false" />
  </div>
</template>

<script>
import xTable from '@C/xTable';
import Add from './Menu/add.vue';
import edit from './Menu/edit.vue';
import show from './Menu/show.vue';
import { marketingList, marketingDel } from '@A/logManagement';

export default {
  components: {
    Add,
    edit,
    show,
    xTable
  },
  data() {
    return {
      url: '/system/marketing/template/list',
      filtraConfig: [
        { type: 'input', key: 'template_name', label: '模板名称：' },
        { type: 'date', key: 'createdate', label: '创建时间：' }
      ],
      currentId: '',
      tableHeader: [
        {
          title: '模版名称',
          key: 'template_name',
          minWidth: 250
        },
        {
          title: '创建时间',
          key: 'createdate',
          minWidth: 180
        },
        {
          title: '更新时间',
          width: 180,
          key: 'updatedate',
          minWidth: 90
        },
        {
          title: '操作',
          width: 90,
          render: (h, params) => {
            return h(
              'Button',
              {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deleteTemplate(params);
                  }
                }
              },
              '删除'
            );
          }
        }
      ],
      isAdd: false,
      isEdit: false,
      isShow: false
    };
  },

  methods: {
    handleAdd() {
      this.isAdd = !this.isAdd;
    },

    handleEdit() {
      if (!this.currentId) {
        return this.$Message.info('请选择一行进行查看');
      }
      this.isEdit = !this.isEdit;
    },
    handleShow() {
      if (!this.currentId) {
        return this.$Message.info('请选择一行进行查看');
      }
      this.isShow = !this.isShow;
    },
    async deleteTemplate({ row: { id = '' } }) {
      this.$Modal.confirm({
        title: '提示',
        content: '是否删除该模板',
        onOk: async () => {
          await marketingDel({ id });
          this.$refs.table.list.fetchList();
        },
        onCancel: () => {}
      });
    },
    selectRow({ id }) {
      this.currentId = id;
    }
  },
  created() {}
};
</script>
