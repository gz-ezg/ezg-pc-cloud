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
                                                <FormItem prop="customer" label="客户：">
                                                    <Input size="small" type="text" v-model="searchModel.customer" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="4">
                                                <FormItem prop="phone" label="电话号码：">
                                                    <Input size="small" type="text" v-model="searchModel.phone" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="4">
                                                <FormItem prop="fllowMan" label="跟进人：">
                                                    <Input size="small" type="text" v-model="searchModel.fllowMan" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="4">
                                                <FormItem prop="serviceMan" label="服务人员：">
                                                    <Input size="small" type="text" v-model="searchModel.serviceMan" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="4">
                                                <FormItem prop="state" label="返回状态：">
                                                    <Select transfer v-model="searchModel.state" placeholder="请选择">
                                                        <Option value="500">成功</Option>
                                                        <Option value="0">失败</Option> 
                                                    </Select>  
                                                </FormItem>
                                            </Col>
                                            <Col span="4">
                                                <FormItem prop="companyName" label="公司：">
                                                    <Input size="small" type="text" v-model="searchModel.companyName" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                        </Row>    
                                        <Row :gutter="16">
                                            <Col span="4">
                                                <FormItem prop="msg_content" label="短信内容：">
                                                    <Input size="small" type="text" v-model="searchModel.msg_content" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="4">
                                                <FormItem prop="startdate" label="发送日期：">
                                                    <DatePicker format="yyyy-MM-dd" type="date" style="width: 100%" size="small" v-model="searchModel.startdate"></DatePicker>
                                                </FormItem>
                                                <FormItem prop="enddate" label="发送日期：">
                                                    <DatePicker format="yyyy-MM-dd" type="date" style="width: 100%" size="small" v-model="searchModel.enddate"></DatePicker>
                                                </FormItem>
                                            </Col>
                                            <Col span="4">
                                                <FormItem prop="sendMSMMan" label="短信发送人：">
                                                    <Input size="small" type="text" v-model="searchModel.sendMSMMan" placeholder="">
                                                    </Input>
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
                            <Input readonly size="small" type="text" v-model="currentRowData.phone" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="短信id：">
                            <Input readonly size="small" type="text" v-model="currentRowData.msgID" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>

                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="描述">
                            <Input readonly size="small" type="text" v-model="currentRowData.info" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="返回码：">
                            <Input readonly size="small" type="text" v-model="currentRowData.return_code" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem label="短信内容：">
                            <Input  size="small" type="textarea" :autosize="{maxRows: 8}"  v-model="currentRowData.msg_content" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="发送日期：">
                            <Input readonly size="small" type="text" v-model="currentRowData.send_date" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="短信类型：">
                            <Input readonly size="small" type="text" v-model="currentRowData.msg_type" placeholder="">
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
      showwidth: 24,
      groupDataCenter: true,
      //  筛选相关
      search_model: "",
      searchModel: {
        customer: "",
        phone: "",
        fllowMan: "",
        phone: "",
        serviceMan: "",
        state: "",
        companyName: "",
        msg_content: "",
        startdate: "",
        enddate: "",
        sendMSMMan: ""
      },
      fatherDataHeader: [
        {
          title: "客户",
          key: "customer"
        },
        {
          title: "电话号码",
          key: "phone"
        },
        {
          title: "跟进人",
          key: "fllowMan"
        },
        {
          title: "服务人员",
          key: "serviceMan"
        },
        {
          title: "模版名称",
          key: "msgtname",
          width: 130,
          ellipsis: true
        },
        {
          title: "描述",
          key: "info",
          width: 130,
          ellipsis: true
        },
        {
          title: "返回状态",
          key: "return_code"
        },
        {
          title: "公司",
          key: "CompanyName",
          width: 130,
          ellipsis: true
        },
        {
          title: "短信内容",
          key: "msg_content",
          width: 130,
          ellipsis: true
        },
        {
          title: "发送日期",
          key: "send_date",
          width: 130,
          ellipsis: true
        },
        {
          title: "短信发送人",
          key: "sendMSMMan"
        }
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
      let url = "api/system/log/querySMSRquestLog/list"
      let config= {
        params: {
          page: _self.page,
          pageSize: _self.pageSize,
          customer: _self.searchModel.customer,
          phone: _self.searchModel.phone,
          fllowMan: _self.searchModel.fllowMan,
          serviceMan: _self.searchModel.serviceMan,
          retrunCode: _self.searchModel.state,
          company: _self.searchModel.companyName,
          msgContent: _self.searchModel.msg_content,
          sendDate: _self.searchModel.startdate,
          sendMan: _self.searchModel.sendMan
        }
      };
      function doSuccess(res) {
        _self.fatherData = res.data.data.rows;
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
