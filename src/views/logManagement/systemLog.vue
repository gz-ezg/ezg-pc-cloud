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
                                            <Col span="6">
                                                <FormItem prop="logtype" label="日志类型：">
                                                    <Select transfer v-model="searchModel.logtype" placeholder="选择日志类型">
                                                        <!-- <Option v-for="(item,index.vue) in accountdrrt" :value="item.typecode" :key=index.vue>{{item.typename}}</Option>                                -->
                                                        <Option value="登录">登录</Option>
                                                        <Option value="注销">注销</Option> 
                                                    </Select>  
                                                </FormItem>
                                            </Col>
                                            <Col span="6">
                                                <FormItem prop="startdate" label="操作时间：">
                                                    <!-- <DatePicker format="yyyy-MM-dd" type="date" style="width: 100%" size="small" @on-change="getStartTime5" v-model="formValidatexiugai.date"></DatePicker> -->
                                                    <DatePicker format="yyyy-MM-dd" type="date" style="width: 100%" size="small" v-model="searchModel.startdate"></DatePicker>
                                                    <DatePicker format="yyyy-MM-dd" type="date" style="width: 100%" size="small" v-model="searchModel.enddate"></DatePicker>
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
                    <Col span="24">
                        <FormItem label="电话号码：">
                            <Input size="small" type="text" value="11111" placeholder="">
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
  name: "systemLog2",
  data() {
    return {
      showwidth: 24,
      groupDataCenter: true,
      //  筛选相关
      search_model: "",
      searchModel: {
        logtype: "",
        startdate: "",
        enddate: ""
      },
      typeselected: "",
      fatherDataHeader: [
        {
          title: "日志类型",
          key: "logType",
          minWidth: 90
        },
        {
          title: "日志内容",
          key: "logcontent",
          minWidth: 400
        },
        {
          title: "操作IP",
          key: "ip",
          minWidth: 90
        },
        {
          title: "操作人ID",
          key: "userid",
          minWidth: 90
        },
        {
          title: "操作人名",
          key: "update_name",
          minWidth: 90
        },
        {
          title: "操作浏览器",
          key: "broswer",
          minWidth: 90
        },
        {
          title: "操作时间",
          key: "operatetime",
          minWidth: 150
        }
      ],
      fatherData: [],
      current_father_row: [],
      pageTotal: new Number(),
      page: 1,
      pageSize: 10,
      // 查看模态框
      open_father_data: false,
      loading: false
    };
  },
  methods: {
    getData() {
      let _self = this; 
      let url = "api/system/log/queryTSLog/list"
      _self.loading = true
      let config = {
        params: {
          page: _self.page,
          pageSize: _self.pageSize,
          logType: _self.searchModel.logtype,
          operateTime: _self.searchModel.startdate
        }
      };
      function doSuccess(res) {
        _self.fatherData = res.data.data.rows;
        _self.pageTotal = res.data.data.total;
        _self.loading = false

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
    dataCheck(){
      this.open_father_data = true;
    },
    close_father_data() {
      this.open_father_data = false;
    },
    close(){
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
