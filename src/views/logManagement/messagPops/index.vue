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
                        <FormItem label="类型：">
                          <Input size="small" type="text" v-model="searchModel.template_name" placeholder="" />
                        </FormItem>
                      </Col>
                      <Col span="8">
                        <FormItem label="创建人：">
                          <Input size="small" type="text" v-model="searchModel.template_name" placeholder="" />
                        </FormItem>
                      </Col>
                      <Col span="8">
                        <FormItem label="创建时间：">
                          <Input size="small" type="text" v-model="searchModel.template_name" placeholder="" />
                        </FormItem>
                      </Col>
                    </Row>
                    <FormItem>
                      <Button type="primary" @click="search">查询</Button>
                    </FormItem>
                  </Form>
                </div>
              </Panel>
            </Collapse>
          </Row>
          <Row>
            <ButtonGroup>
              <Button type="primary" icon="search" @click="handleAdd">录入</Button>
              <Button type="primary" icon="search" @click="handleEdit">编辑</Button>
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
              :total="pageTotal"
              :page-size="pageSize"
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
  </div>
</template>

<script>
import serviceApi from '../service';
import AddTemplate from './menu/add.vue';
import editTemplate from './menu/edit.vue';

export default {
  components: {
    AddTemplate,
    editTemplate,
  },
  data() {
    return {
      loading: false,
      searchModel: { template_name: '' },
      currentId: '',
      tableHeader: [
        {
          title: '内容',
          key: 'template_name',
          minWidth: 250
        },
        {
          title: '类型',
          key: 'createdate',
          minWidth: 180
        },
        {
          title: '通知部门',
          width: 180,
          key: 'updatedate',
          minWidth: 90
        },
        {
          title: '创建时间',
          width: 180,
          key: 'updatedate',
          minWidth: 90
        },
        {
          title: '创建人',
          width: 180,
          key: 'updatedate',
          minWidth: 90
        },
        {
          title: '发送状态',
          width: 180,
          key: 'updatedate',
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
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deleteTemplate(params);
                  }
                }
              },
              '发送'
            );
          }
        }
      ],
      tableData: [],
      page: 1,
      pageTotal: '',
      pageSize: 10,
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
    async getTableData() {
      this.loading = true;
      let { template_name, page, pageSize } = this;
      let config = {
        template_name,
        page,
        pageSize
      };
      const resp = await serviceApi.getList(config);
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
    search() {},
    pageChange(page) {
      this.page = page;
      this.getTableData();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getTableData();
    }
  },
  created() {
    this.getTableData();
  }
};
</script>
