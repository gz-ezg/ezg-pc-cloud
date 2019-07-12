 <template>
  <div>
    <Row>
      <Col>
        <Card>
          <Row style="margin-bottom:10px">
            <Collapse>
              <Panel name="1">
                <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                筛选
                <div slot="content" @keydown.enter="search">
                  <Form ref="searchModel" :model="searchModel" :label-width="100">
                    <Row :gutter="16">
                      <Col span="8">
                        <FormItem label="模板名称：">
                          <Input size="small" type="text" v-model="searchModel.template_name" placeholder="" />
                        </FormItem>
                      </Col>
                    </Row>
                    <FormItem>
                      <Button type="primary" @click="search">查询</Button>
                      <Button type="ghost" style="margin-left:20px" @click="reset">清空</Button>
                    </FormItem>
                  </Form>
                </div>
              </Panel>
            </Collapse>
          </Row>
          <com :parent="this" :search-conf="config"></com>
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
              :loading="loading"
              :columns="tableHeader"
              :data="tableData"
            ></Table>

            <Page
              size="small"
              :total="getListConfig.pageTotal"
              :page-size="getListConfig.pageSize"
              show-total
              show-sizer
              show-elevator
              @on-change="pageChange"
              @on-page-size-change="pageSizeChange"
              style="margin-top: 10px"
            ></Page>
          </Row>
        </Card>
      </Col>
    </Row>

    <add-template
      @ok="
        () => {
          this.handleAdd();
          this.getTableData();
        }
      "
      @cancel="handleAdd"
      v-if="isAdd"
    />

    <edit-template v-if="isEdit" :id="currentId" @ok="isEdit = false" @cancel="isEdit = false" />
    <show-template v-if="isShow" :id="currentId" @cancel="isShow = false" />
  </div>
</template>

<script>
import serviceApi from '../service';
import AddTemplate from './menu/add.vue';
import editTemplate from './menu/edit.vue';
import showTemplate from './menu/show.vue';
import com from './components/index.vue';

export default {
  components: {
    AddTemplate,
    editTemplate,
    showTemplate,
    com
  },
  data() {
    return {
      config: [
        { type: 'input', key: 'template', label: '测试：' },
        { type: 'time', key: 'cheshi', label: '看一看：' },
        { type: 'input', key: 'template1', label: '测试：' },
        { type: 'select', key: 'select', label: '选择器：', option: [{ value: 'key', label: '测试' }] }
      ],
      loading: false,
      searchModel: { template_name: '' },
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
      tableData: [],
      getListConfig: {
        page: 1,
        pageSize: 10
      },
      pageTotal: '',
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

    reset() {
      this.$refs['searchModel'].resetFields();
      this.page = 1;
      this.pageSize = 10;
      this.searchModel.template_name = '';
      this.getTableData();
    },
    async getTableData() {
      this.loading = true;
      const resp = await serviceApi.getList(this.getListConfig);
      this.tableData = resp.rows;
      this.pageTotal = resp.total;
      this.loading = false;
    },

    async deleteTemplate({ row: { id = '' } }) {
      this.$Modal.confirm({
        title: '提示',
        content: '是否删除该模板',
        onOk: async () => {
          await serviceApi.del({ id });
          this.page = 1;
          this.getTableData();
        },
        onCancel: () => {}
      });
    },
    selectRow({ id }) {
      this.currentId = id;
    },
    search() {
      this.getTableData();
    },
    pageChange(page) {
      this.getListConfig.page = page;
      this.getTableData();
    },
    pageSizeChange(pageSize) {
      this.getListConfig.pageSize = pageSize;
      this.getTableData();
    }
  },
  created() {
    this.getTableData();
  }
};
</script>
