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
              size="small"
              :total="list.total"
              :page-size="list.pageSize"
              show-total
              show-sizer
              show-elevator
              :current="list.page"
              @on-change="list.handleSizeChange($event)"
              @on-page-size-change="list.handlePageSizeChange($event)"
              style="margin-top: 10px"
            ></Page>
          </Row>
        </Card>
      </Col>
    </Row>

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
import filtra from '@C/filtra';
import Add from './menu/add.vue';
import edit from './menu/edit.vue';
import show from './menu/show.vue';
import { marketingList, marketingDel } from '@A/logManagement';
import listManage from '@U/listManage';

const url = '/system/marketing/template/list';
export default {
  components: {
    Add,
    edit,
    show,
    filtra
  },
  data() {
    return {
      filtraConfig: [
        { type: 'input', key: 'template_name', label: '模板名称：' },
        { type: 'date', key: 'createdate', label: '创建时间：' }
      ],
      list: new listManage({ pageSize: 10 }, url),
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
          this.list.fetchList();
        },
        onCancel: () => {}
      });
    },
    selectRow({ id }) {
      this.currentId = id;
    }
  },
  created() {
    this.list.fetchList();
  }
};
</script>
