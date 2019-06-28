 <template>
  <div>
    <Row>
      <Col :span="showwidth">
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
                        <FormItem prop="msgtname" label="模板名称：">
                          <Input size="small" type="text" v-model="searchModel.template_name" placeholder="" />
                        </FormItem>
                      </Col>
                    </Row>
                    <FormItem>
                      <Button type="primary" @click="search">查询</Button>
                      <!-- <Button type="ghost" style="margin-left:20px" @click="reset">清空</Button> -->
                    </FormItem>
                  </Form>
                </div>
              </Panel>
            </Collapse>
          </Row>
          <Row>
            <ButtonGroup>
              <Button type="primary" icon="search" @click="showNewPopus">新增</Button>
              <Button type="primary" icon="search" @click="showEditPopus">编辑</Button>
              <Button type="primary" icon="search" @click="showLookPopus">查看</Button>
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
    <!-- 查看模态框 -->
    <Modal footer-hide="true" title="查看" width="500" :label-width="120" v-model="showLook">
      <Form>
        <FormItem label="模板名称：">
          {{ detail.template_name }}
        </FormItem>
        <FormItem label="模板内容：">
          <div>
            {{ detail.template_content }}
          </div>
        </FormItem>
        <FormItem v-if="detail.cron_expression" label="执行周期cron 表达式：">
          {{ detail.cron_expression }}
        </FormItem>
        <FormItem v-if="detail.job_class_name" label="job任务类：">
          {{ detail.job_class_name }}
        </FormItem>
        <FormItem v-if="detail.job_state" label="任务状态">
          {{ detail.job_state }}
        </FormItem>

        <FormItem label="创建时间：">
          {{ detail.createdate }}
        </FormItem>
        <FormItem label="修改时间：">
          {{ detail.updatedate }}
        </FormItem>
        <FormItem label="关联客户：">
          <span v-for="(item, index) in detail.linked_users" :key="index">
            {{ item.realname || '空' }}
          </span>
        </FormItem>
      </Form>
    </Modal>

    <Modal title="新增" width="500" v-model="showEdit">
      <Form ref="formValidate" :model="formValidate" label-position="right" :label-width="130">
        <FormItem label="模版名称：">
          <Input v-model="formValidate.template_name" type="text" placeholder="" />
        </FormItem>

        <FormItem label="模板类型：">
          <RadioGroup v-model="formValidate.template_type">
            <Radio label="timing">定时</Radio>
            <Radio label="event">事件</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem v-if="formValidate.template_type == 'timing'" label="job任务类：">
          <Input v-model="formValidate.job_class_name" type="text" placeholder="" />
        </FormItem>

        <FormItem v-if="formValidate.template_type == 'timing'" label="执行周期cron 表达式">
          <Input v-model="formValidate.cron_expression" type="text" placeholder="" />
        </FormItem>

        <FormItem label="模版内容：">
          <Input v-model="formValidate.template_content" type="textarea" :rows="4" placeholder="Enter something..." />
        </FormItem>

        <FormItem label="关联用户">
          <Select
            v-model="formValidate.linked_user_json"
            placeholder="关联用户"
            filterable
            multiple
            remote
            :remote-method="get_user"
            :loading="userLoading"
          >
            <Option v-for="item in userList" :key="item.id" :value="item.id" :label="item.realname">
              <span>{{ item.realname }}</span>
              <span style="float:right;color:#ccc">{{ item.departname }}</span>
            </Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="createLoading" style="margin-left:20px" @click="handleNewTemplate">确定</Button>
      </div>
    </Modal>

    <Modal title="编辑" width="500" v-model="isEdit">
      <Form :model="formValidate" label-position="right" :label-width="130">
        <FormItem label="模版名称：">
          <Input v-model="formValidate.template_name" type="text" placeholder="" />
        </FormItem>

        <FormItem label="模版内容：">
          <Input v-model="formValidate.template_content" type="textarea" :rows="4" placeholder="Enter something..." />
        </FormItem>

        <FormItem v-if="formValidate.job_class_name" label="job任务类：">
          <Input :value="formValidate.job_class_name" readonly type="text" placeholder="" />
        </FormItem>

        <FormItem v-if="formValidate.cron_expression" label="执行周期cron 表达式">
          <Input :value="formValidate.cron_expression" readonly type="text" placeholder="" />
        </FormItem>

        <FormItem label="关联用户">
          <Select
            v-model="formValidate.linked_user_json"
            placeholder="关联用户"
            filterable
            multiple
            remote
            :remote-method="get_user"
            :loading="userLoading"
          >
            <Option v-for="item in userList" :key="item.id" :value="item.id" :label="item.realname">
              <span>{{ item.realname }}</span>
              <span style="float:right;color:#ccc">{{ item.departname }}</span>
            </Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="createLoading" style="margin-left:20px" @click="handleEditTemplate">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'smsSendLog',
  data() {
    return {
      loading: false,
      search_model: '',
      showLook: false,
      showEdit: false,
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
      isEdit: false,
      tableData: [],
      searchModel: {
        template_name: ''
      },
      currentId: '',
      page: 1,
      pageTotal: '',
      pageSize: 10,
      userLoading: false,
      formValidate: {
        template_name: '',
        job_class_name: '',
        cron_expression: '',
        template_content: '',
        linked_user_json: [],
        template_type: 'timing'
      },
      userList: [],
      detail: {},
      createLoading: false
    };
  },
  methods: {
    selectRow({ id }) {
      this.currentId = id;
    },
    showNewPopus() {
      this.showEdit = !this.showEdit;
      this.formValidate = {
        template_name: '',
        job_class_name: '',
        cron_expression: '',
        template_content: '',
        linked_user_json: [],
        template_type: 'timing'
      };
      this.showEdit && this.get_user();
    },
    async showEditPopus() {
      if (!this.currentId) {
        return this.$Message.info('请选择一行进行查看');
      }
      this.handleTemplateDetail();
      this.isEdit = !this.isEdit;
    },

    showLookPopus() {
      if (!this.currentId) {
        return this.$Message.info('请选择一行进行查看');
      }
      this.showLook = !this.showLook;
      this.showLook && this.handleTemplateDetail();
    },

    async handleTemplateDetail() {
      this.Loading = true;
      let url = `api/system/marketing/template/detail`;
      let config = {
        params: {
          id: this.currentId
        }
      };
      let success = res => {
        this.detail = res.data.data;
        this.formValidate = res.data.data;
        this.formValidate.linked_user_json = res.data.data.linked_users.map(v => v.user_id);
        this.userList = res.data.data.linked_users.map(v => ({ id: v.user_id, realname: v.realname }));
        this.Loading = false;
      };
      await this.$Get(url, config, success);
    },
    search() {},
    pageChange(e) {
      this.page = e;
      this.getTableData();
    },
    pageSizeChange(e) {
      this.pageSize = e;
      this.getTableData();
    },
    handleEditTemplate() {
      this.editLoading = true;
      let url = `api/system/marketing/template/update`;
      let { linked_user_json, template_name, template_content } = this.formValidate;
      let config = {
        id: this.currentId,
        template_content,
        template_name,
        linked_user_json: JSON.stringify(linked_user_json)
      };
      let success = res => {
        this.editLoading = false;
        this.showEditPopus();
        this.getTableData();
      };
      let fail = err => {
        this.showEditPopus();
        this.editLoading = false;
      };
      this.$Post(url, config, success, fail);
    },
    handleNewTemplate() {
      this.createLoading = true;
      let url = `api/system/marketing/template/create`;
      let config = this.formValidate;
      config.linked_user_json = JSON.stringify(this.formValidate.linked_user_json);
      let success = res => {
        this.createLoading = false;
        this.showNewPopus();
        this.getTableData();
      };
      let fail = err => {
        this.showNewPopus();
      };
      this.$Post(url, config, success, fail);
    },

    get_user(query) {
      let url = `api/user/list`;
      this.userLoading = true;
      let config = {
        params: {
          page: 1,
          pageSize: 100
        }
      };
      if (query) {
        config.params = {
          page: 1,
          pageSize: 8,
          realname: query
        };
      }
      let success = res => {
        this.userLoading = false;
        this.userList = res.data.data.rows;
      };

      this.$Get(url, config, success);
    },
    deleteTemplate({ row: { id } }) {
      let url = `api/system/marketing/template/del`;
      let config = {
        id
      };
      let success = res => {
        this.getTableData();
        this.currentId = '';
      };
      this.$Modal.confirm({
        title: '提示',
        content: '是否删除该模板',
        onOk: () => {
          this.$Post(url, config, success);
        },
        onCancel: () => {}
      });
    },
    getTableData() {
      let url = `api/system/marketing/template/list`;
      this.loading = true;
      let config = {
        params: {
          page: this.page,
          pageSize: this.pageSize
        }
      };
      let success = res => {
        this.loading = false;
        this.tableData = res.data.data.rows;
      };

      this.$Get(url, config, success);
    }
  },
  created() {
    this.getTableData();
  }
};
</script>
