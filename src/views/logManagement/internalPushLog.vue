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
                                            <Col span="8">
                                                <FormItem prop="date" label="发送时间：">
                                                    <DatePicker format="yyyy-MM-dd" type="daterange" style="width: 100%" size="small" v-model="searchModel.date"></DatePicker>
                                                </FormItem>
                                            </Col>
                                            <Col span="8">
                                                <FormItem prop="msgtname" label="消息模板：">
                                                    <Input size="small" type="text" v-model="searchModel.msgtname" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="8">
                                                <FormItem prop="wechatname" label="接收人：">
                                                    <Input size="small" type="text" v-model="searchModel.wechatname" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="8">
                                                <FormItem prop="mobile" label="手机：">
                                                    <Input size="small" type="text" v-model="searchModel.mobile" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="8">
                                                <FormItem prop="issuccess" label="是否成功：">
                                                    <Select transfer v-model="searchModel.issuccess" placeholder="请选择" size="small">
                                                        <Option value="Y">成功</Option>
                                                        <Option value="N">失败</Option> 
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
                        <!-- <Button type="primary" icon="search" @click="dataCheck">查看</Button>  -->
                        <Button type="primary" icon="search" @click="downloadExcel">下载</Button>
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
                        <FormItem label="模版名称：">
                            <Input readonly size="small" type="text" v-model="currentRowData.msgtname" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="是否成功：">
                            <Select  transfer v-model="currentRowData.issuccess" placeholder="请选择">
                                <Option value="Y">成功</Option>
                                <Option value="N">失败</Option> 
                            </Select>  
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="接收人：">
                            <Input readonly size="small" type="text" v-model="currentRowData.receiveMan" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="接收人手机号：">
                            <Input readonly size="small" type="text" v-model="currentRowData.phone" placeholder="">
                            </Input>
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
                        <FormItem label="消息内容：">
                            <Input readonly size="small" type="textarea" :autosize="{maxRows: 8}" v-model="currentRowData.msg" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="发送日期：">
                            <Input readonly size="small" type="text" v-model="currentRowData.sendDate" placeholder="">
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
import { DateFormat } from '../../libs/utils.js'

export default {
    name: "internalPushLog",
  data() {
    return {
      loading: false,
      showwidth: 24,
      groupDataCenter: true,
      //  筛选相关
      search_model: "",
      searchModel: {
        wechatname: "",
        sendDate: "",
        wechatname: "",
        mobile: "",
        issuccess: "",
        date: []
      },
      fatherDataHeader: [
        {
          title: "模版名称",
          key: "msgtname",
          minWidth: 250,
        },
        {
          title: "消息",
          key: "msg",
          minWidth: 300,
        //   ellipsis: true
        },
        // {
        //   title: "企业应用Id",
        //   width: 100,
        //   key: "agentId"
        // },
        {
          title: "发送时间",
          key: "sendDate",
          minWidth: 180
        },
        {
          title: "接收人",
          width: 80,
          key: "wechatname",
          minWidth: 90
        },
        {
          title: "接收人手机号",
          minWidth: 120,
          key: "mobile"
        },
        {
          title: "是否成功",
          minWidth: 90,
          key: "issuccess"
        },
        {
          title: "返回信息",
          key: "resultMsg",
          minWidth: 180
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
        msgtname: "",
        msg: "",
        receiveMan: "",
        phone: "",
        issuccess: ""
      }
    };
  },
  methods: {
      downloadExcel(){
            let field = [
                {field:'msgtname',title:'模版名称'},
                {field:'msg',title:'消息'},
                {field:'sendDate',title:'发送时间'},
                {field:'wechatname',title:'接收人'},
                {field:'issuccess',title:'是否成功'},
                {field:'resultMsg',title:'返回信息'},               
            ]
            let _self = this
            let url = `api/system/log/queryWechatCompanyLog/list`
            let config = {
                page: '1',
                pageSize: '1000000',
                bcreatedate: DateFormat(_self.searchModel.date[0]),
                ecreatedate: DateFormat(_self.searchModel.date[1]),
                msgtname: _self.searchModel.msgtname,
                wechatname: _self.searchModel.wechatname,
                mobile: _self.searchModel.mobile,
                issuccess: _self.searchModel.issuccess,
                export: 'Y',
                exportField: encodeURI(JSON.stringify(field))
            }
            let toExcel = this.$MergeURL(url, config)
            window.open(toExcel)
        },
    getData() {
      let _self = this;
      let url = "api/system/log/queryWechatCompanyLog/list";
      _self.loading = true
      let config = {
        params: {
            page: _self.page,
            pageSize: _self.pageSize,
            bcreatedate: DateFormat(_self.searchModel.date[0]),
            ecreatedate: DateFormat(_self.searchModel.date[1]),
            msgtname: _self.searchModel.msgtname,
            wechatname: _self.searchModel.wechatname,
            mobile: _self.searchModel.mobile,
            issuccess: _self.searchModel.issuccess,
        }
      };
      function doSuccess(res) {
        _self.loading = false
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
      this.searchModel.date = []
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
