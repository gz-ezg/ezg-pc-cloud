 <template>
    <div>
        <Row>
            <Col :span="showwidth">
                <Card v-if="groupDataCenter">
                    <Row style="margin-bottom:10px">
                        <Collapse v-model="search_model">
                            <Panel name="1">
                                <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                                筛选
                                <div slot="content" @keydown.enter="search">
                                    <Form ref="searchModel" :model="searchModel" :label-width="100">
                                        <Row :gutter="16">
                                            <Col span="4">
                                                <FormItem prop="templateName" label="模版名称：">
                                                    <Input size="small" type="text" v-model="searchModel.templateName" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="6">
                                                <FormItem prop="sendDate" label="发送时间：">
                                                    <DatePicker format="yyyy-MM-dd" type="daterange" style="width: 100%" size="small" v-model="searchModel.sendDate"></DatePicker>
                                                </FormItem>
                                            </Col>
                                            <Col span="4">
                                                <FormItem prop="sender" label="发送人：">
                                                    <Input size="small" type="text" v-model="searchModel.sender" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="4">
                                                <FormItem prop="mobile" label="手机号：">
                                                    <Input size="small" type="text" v-model="searchModel.mobile" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="4">
                                                <FormItem prop="customer" label="客户：">
                                                    <Input size="small" type="text" v-model="searchModel.customer" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row :gutter="16">
                                            <Col span="4">
                                                <FormItem prop="salesman" label="销售人员：">
                                                    <Input size="small" type="text" v-model="searchModel.salesman" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="4">
                                                <FormItem prop="state" label="是否成功：">
                                                    <Select transfer v-model="searchModel.state" placeholder="请选择">
                                                        <Option value="500">成功</Option>
                                                        <Option value="0">失败</Option> 
                                                    </Select>  
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
                    <Row>
                        <Button type="primary" icon="search" @click="dataCheck">查看</Button> 
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table
                                :loading="loading"
                                highlight-row 
                                border
                                size="small"
                                :columns="fatherDataHeader"
                                @on-current-change="selectFatherRow"
                                :data="fatherData"></Table>
                        <Page
                                size="small"
                                :total="pageTotal"
                                :page-size = "pageSize"
                                show-total
                                show-sizer
                                show-elevator
                                :current.sync="page"
                                @on-change="pageChange"
                                @on-page-size-change="pageSizeChange"
                                style="margin-top: 10px"></Page>
                    </Row>
                </Card>
            </Col>
        </Row>
        <!-- 查看模态框 -->
        <Modal
            title="查看"
            width="600"
            v-model="open_father_data"
            @on-cancel="close_father_data">
            <Form :label-width="100">
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="电话号码：">
                            <Input readonly size="small" type="text" v-model="currentRowData.mobile" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="发送人：">
                            <Input readonly size="small" type="text" v-model="currentRowData.realname" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="是否成功：">
                            <!-- <Input readonly size="small" type="text" v-model="currentRowData.isSuccess" placeholder="">
                            </Input> -->
                            <Select  transfer v-model="currentRowData.isSuccess" placeholder="请选择">
                                <Option value="Y">成功</Option>
                                <Option value="N">失败</Option> 
                            </Select>  
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="返回信息：">
                            <Input readonly size="small" type="text" v-model="currentRowData.resultMsg" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem label="短信内容：">
                            <Input  size="small" type="textarea" :autosize="{maxRows: 8}"  v-model="currentRowData.id" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                    <Button size="small" type="ghost" style="margin-left:20px" @click="close">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      showwidth: 24,
      groupDataCenter: true,
      //  筛选相关
      search_model: "",
      searchModel: {
        templateName: "",
        sendDate: "",
        sender: "",
        mobile: "",
        customer: "",
        salesman: "",
        state: ""
      },
      fatherDataHeader: [
        {
          title: "模版名称",
          key: "templateName",
          minWidth: 180,
        },
        {
          title: "发送时间",
          key: "sendDate",
          minWidth: 150,
        },
        {
          title: "发送人",
          key: "realname",
          minWidth: 90,
        },
        {
          title: "手机号",
          key: "mobile",
          minWidth: 120
        },
        {
          title: "客户",
          key: "name",
          minWidth: 90
        },
        // {
        //   title: "销售人员",
        //   key: "rname",
        //   minWidth: 90
        // },
        {
          title: "是否成功",
          key: "isSuccess",
          minWidth: 90
        },
        {
          title: "返回信息",
          key: "resultMsg",
          minWidth: 130,
        },
        // {
        //   title: "详情",
        //   key: "id",
        //   width: 130,
        //   ellipsis: true
        // }
      ],

      fatherData: [],
      current_father_row: [],
      pageTotal: new Number(),
      page: 1,
      pageSize: 10,
      //   模态框
      open_father_data: false,
      currentRowData: {
        phone: "",
        msgID: "",
        info: "",
        return_code: "",
        msg_content: "",
        send_date: "",
        msg_type: ""
      }
    };
  },
  methods: {
    getData() {
      let _self = this;
      let url = "api/system/log/queryWechatTemplatelog/list"
      _self.loading = true
      let config = {
        params: {
          page: _self.page,
          pageSize: _self.pageSize,
          templateName: _self.searchModel.templateName,
          sendDate: _self.searchModel.sendDate,
          realname: _self.searchModel.sender,
          mobile: _self.searchModel.mobile,
          name: _self.searchModel.customer,
          rname: _self.searchModel.salesman,
          isSuccess: _self.searchModel.state
        }
      };
      function doSuccess(res) {
          _self.loading = false
        _self.fatherData = res.data.data.rows;
        // _self.fatherData = res.data.data;
        
        _self.pageTotal = res.data.data.total;
      }
      _self.$Get(url, config, doSuccess);
    },
    pageChange(e) {
      this.page = e;
      this.getData();
    },
    pageSizeChange(e) {
      this.pageSize = e;
      this.getData();
    },
    //  获取当前点击行
    selectFatherRow(e) {
      this.current_father_row = e;
    },
    reset() {
      this.$refs["searchModel"].resetFields();
      this.page = 1;
      this.pageSize = 10;
      this.getData();
    },
    search() {
      this.page = 1;
      this.getData();
    },

    // 模态框
    dataCheck() {
      let _self = this;
      if (_self.current_father_row == "" || _self.current_father_row == null) {
        _self.$Message.warning("请选择一行进行查看！");
      } else {
        _self.open_father_data = true;
        _self.currentRowData = _self.current_father_row;
      }
    },
    close_father_data() {
      this.open_father_data = false;
    },
    close() {
      this.open_father_data = false;
    }
  },
  created() {
    let _self = this;
    _self.getData();
    _self.$bus.on("open_groups_data", e => {
      _self.groupDataCenter = true;
    });
  }
};
</script>
