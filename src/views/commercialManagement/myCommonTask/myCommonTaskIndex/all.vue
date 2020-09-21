<template>
  <Card>
    <Row style="margin-bottom:10px">
      <Collapse v-model="search_model">
        <Panel name="1">
          <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>筛选
          <!-- <div slot="content">
                            111111
          </div>-->
          <!-- <Search slot="content"></Search> -->
          <div slot="content" @keydown.enter="search">
            <Form ref="formInline" :model="formInline" :label-width="100">
              <Row>
                <Col span="6">
                  <FormItem prop="companyName" label="公司名称：">
                    <Input size="small" type="text" v-model="formInline.companyname" placeholder></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem prop="servicename" label="服务人员名称：">
                    <Input size="small" type="text" v-model="formInline.servicename" placeholder></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem prop="product" label="产品：">
                    <Input size="small" type="text" v-model="formInline.product" placeholder></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem prop="departname" label="服务部门：">
                    <Input size="small" type="text" v-model="formInline.departname" placeholder></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                  <FormItem prop="createdate" label="工单创建时间：">
                    <DatePicker
                      type="daterange"
                      size="small"
                      transfer
                      v-model="formInline.createdate"
                    ></DatePicker>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem prop="updatedate" label="实际完成时间：">
                    <DatePicker
                      type="daterange"
                      size="small"
                      transfer
                      v-model="formInline.updatedate"
                    ></DatePicker>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem prop="customerName" label="客户名称：">
                    <Input size="small" type="text" v-model="formInline.customerName" placeholder></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem prop="tel" label="客户电话：">
                    <Input size="small" type="text" v-model="formInline.tel" placeholder></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                  <FormItem prop="workserverstatus" label="工单服务状态：">
                    <Input
                      size="small"
                      type="text"
                      v-model="formInline.workserverstatus"
                      placeholder
                    ></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem>
                    <Button size="small" type="primary" @click="search">搜索</Button>
                    <Button size="small" type="ghost" style="margin-left:20px" @click="reset">重置</Button>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </Panel>
      </Collapse>
    </Row>
    <Row>
      <ButtonGroup style="float:left">
        <!-- <Button type="primary" icon="information-circled" @click="showdetail">查看跟进记录</Button> -->
        <Button type="primary" icon="information-circled" @click="showdetail">查询详情</Button>
        <Button type="primary" icon="ios-color-wand-outline" @click="company">查看公司</Button>
        <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
        <Button
          type="primary"
          icon="ios-color-wand-outline"
          @click="reset_wordorder_process"
          v-if="isAdmin"
        >重新工单流程</Button>
        <Button
          type="primary"
          name="marketingManagement_index_field_log"
          icon="edit"
          @click="showHeaderCheckBox = true"
        >自定义表头</Button>
        <!-- <Button type="primary" icon="ios-color-wand-outline" @click="product_error">产品异常</Button> -->
        <!-- <Button type="primary" icon="ios-color-wand-outline">批量已读</Button>
        <Button type="primary" icon="ios-color-wand-outline">批量未读</Button>-->
        <!-- <Button type="primary" icon="ios-color-wand-outline" @click="foundClues">发现线索</Button>                -->
      </ButtonGroup>
      <!-- <Poptip 
                title="筛选" 
                placement="bottom-end" 
                width="350" 
                style="float:right;margin-right:20px" 
            >
                <Button type="text" size="small" icon="funnel">筛选</Button>
                
      </Poptip>-->
    </Row>
    <Row style="margin-top: 10px;">
      <Table
        :loading="Sloading"
        ref="selection"
        highlight-row
        size="small"
        :columns="header"
        :data="data"
        @on-current-change="save_current_row"
        @on-row-dblclick="showdetail"
        @on-sort-change="sort"
      ></Table>
      <Page
        placement="top"
        size="small"
        :total="pageTotal"
        show-total
        show-sizer
        show-elevator
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"
        style="margin-top: 10px"
      ></Page>
    </Row>
    <Modal v-model="flowChart1" title="查看流程图" width="80%">
      <center>
        <img :src="flowChartImg" />
      </center>
    </Modal>

    <Modal v-model="showHeaderCheckBox" width="600" title="自定义表头">
      <template v-for="(item, index) in headerTemp">
        <div style="display:inline-block;margin:10px;width:100px" :key="index">
          <Checkbox v-model="headerCheckBox[index]" :label="item.title">{{ item.title }}</Checkbox>
        </div>
      </template>
      <div slot="footer">
        <Button type="primary" @click="onChangeHeaderCheckBox">确定</Button>
        <Button type="primary" @click="showHeaderCheckBox = false">关闭</Button>
      </div>
    </Modal>
    <!-- <Modal
            v-model="pause"
            title="提示信息"
        >
            <div style="font-size:20px;"><Icon type="alert-circled"></Icon>是否暂停/解锁</div>
            <div slot="footer">
                <Button type="primary" @click="pausetask">确定</Button>
                <Button type="ghost" style="margin-left:20px" @click="pause=!pause">取消</Button>
            </div>
        </Modal>
        <Modal
            v-model="endlife"
            title="提示信息"
        >
            <div style="font-size:20px;"><Icon type="alert-circled"></Icon>是否退款终止</div>
            <div slot="footer">
                <Button type="primary" @click="endlifetask">确定</Button>
                <Button type="ghost" style="margin-left:20px" @click="endlife=!endlife">取消</Button>
            </div>
    </Modal>-->
  </Card>
</template>

<script>
import Search from "./search";
import Bus from "../../../../components/bus";
import { DateFormat } from "../../../../libs/utils";

export default {
  components: {
    Search
  },
  props: ["companyarea"],
  data() {
    return {
      isAdmin: false,
      managestatus: [],
      search_model: 1,
      //  触发搜索
      isSearh: false,
      //  筛选数据
      formInline: {
        companyname: "",
        servicename: "",
        product: "",
        updatedate: [],
        createdate: [],
        departname: "",
        customerName: "",
        tel: "",
        workserverstatus: ""
      },
      headerCheckBox: [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true
      ],
      headerTemp: [],
      showHeaderCheckBox: false,
      //  加载中
      Sloading: false,
      //  当前选中行
      current_row: "",
      //  流程图相关,1.弹出框2.流程图地址
      flowChart1: false,
      flowChartImg: "",
      //  暂停/重启
      pause: false,
      //  终止订单
      endlife: false,
      //  表格相关data
      pageTotal: new Number(),
      page: "1",
      pageSize: "10",
      data: [],
      workOrderStatus: [],
      workOrderStatus_map: new Map(),
      sortField: "updatedate",
      order: "desc",
      header: [
        {
          title: "工单状态",
          key: "workOrderStatus",
          width: 120,
          sortable: true,
          render: (h, params) => {
            // console.log(params.row.workOrderStatus)
            if (params.row.workOrderStatus == "10") {
              return h("div", "未分配");
            } else if (params.row.workOrderStatus == "20") {
              return h("div", "未开始");
            } else if (params.row.workOrderStatus == "30") {
              return h("div", "服务中");
            } else if (params.row.workOrderStatus == "40") {
              return h("div", "暂停");
            } else if (params.row.workOrderStatus == "50") {
              return h("div", "退款终止");
            } else if (params.row.workOrderStatus == "60") {
              return h("div", "已完结");
            } else {
              return h("div", "无状态");
            }
          }
        },
        {
          title: "归属公司",
          key: "companyname",
          width: 220,
          sortable: true,
          render: (h, params) => {
            // console.log(params)
            if (
              params.row.companyname == "" ||
              params.row.companyname == null
            ) {
              return "";
            } else if (params.row.companyname.length > 12) {
              return h(
                "Poptip",
                {
                  props: {
                    trigger: "hover",
                    placement: "bottom"
                  }
                },
                [
                  h("span", params.row.companyname.slice(0, 12) + "..."),
                  h("Icon", {
                    props: {
                      type: "arrow-down-b"
                    }
                  }),
                  h(
                    "div",
                    {
                      slot: "content"
                    },
                    [h("span", params.row.companyname)]
                  )
                ]
              );
            } else {
              return h("span", params.row.companyname);
            }
          }
        },
        {
          title: "公司注册地",
          key: "companyarea",
          width: 120
        },
        // {
        //     title: '经营状态',
        //     key:'managestatusName',
        //     width:120
        // },
        // {
        //     title: '提示',
        //     key: 'baseorderid',
        //     width: 120,
        // },
        // {
        //     title: '订单',
        //     key: 'ordercode',
        //     width: 150
        // },
        {
          title: "服务部门",
          key: "departname",
          width: 120,
          sortable: true
        },
        {
          title: "产品全称",
          key: "product",
          width: 200,
          sortable: true,
          render: (h, params) => {
            // console.log(params)
            if (params.row.product == "" || params.row.product == null) {
              return "";
            } else if (params.row.product.length > 10) {
              return h(
                "Poptip",
                {
                  props: {
                    trigger: "hover",
                    placement: "bottom"
                  }
                },
                [
                  h("span", params.row.product.slice(0, 10) + "..."),
                  h("Icon", {
                    props: {
                      type: "arrow-down-b"
                    }
                  }),
                  h(
                    "div",
                    {
                      slot: "content"
                    },
                    [h("span", params.row.product)]
                  )
                ]
              );
            } else {
              return h("span", params.row.product);
            }
          }
        },
        {
          title: "销售金额",
          key: "paynumber",
          width: 120
        },
        {
          title: "目前进度",
          key: "CurrentProcess",
          width: 120,
          sortable: true
        },
        {
          title: "下个进度",
          key: "nextprocess",
          width: 120,
          sortable: true
        },
        {
          title: "服务开始时间",
          key: "ServiceStart",
          width: 140,
          sortable: true
        },
        // {
        //     title: '创建时间',
        //     key: 'CreateDate',
        //     width: 140,
        //     sortable: true

        // },
        // {
        //     title: '预计完成时间',
        //     key: 'baseorderid',
        //     width: 120
        // },
        {
          title: "实际完成时间",
          key: "UpdateDate",
          width: 140,
          sortable: true
        },
        {
          title: "服务人员",
          key: "servername",
          width: 120,
          sortable: true
        },
        {
          title: "逾期原因",
          key: "overdue_cause",
          width: 150,
          render: (h, params) => {
            // console.log(params)
            if (
              params.row.overdue_cause == "" ||
              params.row.overdue_cause == null
            ) {
              return "";
            } else if (params.row.overdue_cause.length > 10) {
              return h(
                "Poptip",
                {
                  props: {
                    trigger: "hover",
                    placement: "bottom"
                  }
                },
                [
                  h("span", params.row.overdue_cause.slice(0, 10) + "..."),
                  h("Icon", {
                    props: {
                      type: "arrow-down-b"
                    }
                  }),
                  h(
                    "div",
                    {
                      slot: "content",
                      style: {
                        width: "200px",
                        whiteSpace: "normal"
                      }
                    },
                    [h("span", params.row.overdue_cause)]
                  )
                ]
              );
            } else {
              return h("span", params.row.overdue_cause);
            }
          }
        },
        {
          title: "跟进人",
          key: "followname",
          width: 120,
          sortable: true
        },
        {
          title: "备注",
          key: "memo",
          width: 150,
          render: (h, params) => {
            // console.log(params)
            if (params.row.memo == "" || params.row.memo == null) {
              return "";
            } else if (params.row.memo.length > 10) {
              return h(
                "Poptip",
                {
                  props: {
                    trigger: "hover",
                    placement: "bottom"
                  }
                },
                [
                  h("span", params.row.memo.slice(0, 10) + "..."),
                  h("Icon", {
                    props: {
                      type: "arrow-down-b"
                    }
                  }),
                  h(
                    "div",
                    {
                      slot: "content",
                      style: {
                        width: "200px",
                        whiteSpace: "normal"
                      }
                    },
                    [h("span", params.row.memo)]
                  )
                ]
              );
            } else {
              return h("span", params.row.memo);
            }
          }
        },
        {
          title: "工单服务状态",
          key: "workserverstatus",
          width: 120,
          render: (h, params) => {
            let map = {
              serverity_overdue: "严重逾期",
              overdue: "逾期",
              normal: "正常"
            };
            return h("div", map[params.row.workserverstatus]);
          }
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          width: 180,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.flowChart(params);
                    }
                  }
                },
                "[流程图]"
              )
              // h('Button', {
              //     props: {
              //         type: 'text',
              //         size: 'small'
              //     },
              //     on: {
              //         click: () => {
              //             var _self = this
              //             console.log(params)
              //             //  暂停
              //             if(params.row.resumeFlag == null || params.row.resumeFlag == 3){
              //                 let url = `api/order/serviceResume?workOrderId=${params.row.id}&resumeFlag=3`
              //                 this.$http.get(url).then(function(res){
              //                     _self.$backToLogin(res)
              //                     if(res.data.msgCode == 40000){
              //                         _self.$Message.success(res.data.msg)
              //                     }else{
              //                         _self.$Message.error(res.data.msg)
              //                     }
              //                     _self.getData()
              //                 })
              //             }else if(params.row.resumeFlag == 2){
              //                 let url = `api/order/serviceResume?workOrderId=${params.row.id}&resumeFlag=2`
              //                 this.$http.get(url).then(function(res){
              //                     _self.$backToLogin(res)
              //                     if(res.data.msgCode == 40000){
              //                         _self.$Message.success(res.data.msg)
              //                     }else{
              //                         _self.$Message.error(res.data.msg)
              //                     }
              //                     _self.getData()
              //                 })
              //             }else{}
              //         }
              //     }
              // }, '[暂停/解锁]'),
            ]);
          }
        }
      ]
    };
  },
  methods: {
    sort(e) {
      this.sortField = e.key;
      if (e.order == "normal") {
        this.order = "desc";
        this.sortField = "updatedate";
      } else {
        this.order = e.order;
      }
      this.getData();
    },
    downloadExcel() {
      let field = [
        {
          field: "workOrderStatus",
          title: "工单状态",
          format: "workOrderStatus"
        },
        { field: "companyname", title: "公司名称" },
        { field: "companyarea", title: "公司注册地", format: "companyarea" },
        { field: "baseorderid", title: "提示" },
        { field: "departname", title: "服务部门" },
        { field: "product", title: "产品全称" },
        { field: "paynumber", title: "销售金额" },
        { field: "CurrentProcess", title: "目前进度" },
        { field: "nextprocess", title: "下个进度" },
        { field: "ServiceStart", title: "服务开始时间" },
        { field: "CreateDate", title: "创建时间" },
        { field: "UpdateDate", title: "实际完成时间" },
        { field: "servername", title: "服务人员" },
        { field: "followname", title: "跟进人" }
      ];
      let _self = this;
      let url = `api/order/workOrderList`;
      let config = {
        page: "1",
        pageSize: "1000000",
        companyName: _self.formInline.companyname,
        serviceName: _self.formInline.servicename,
        product: _self.formInline.product,
        bupdatedate: DateFormat(_self.formInline.updatedate[0]),
        eupdatedate: DateFormat(_self.formInline.updatedate[1]),
        bcreatedate: DateFormat(_self.formInline.createdate[0]),
        ecreatedate: DateFormat(_self.formInline.createdate[1]),
        customerName: _self.formInline.customerName,
        tel: _self.formInline.tel,
        departname: _self.formInline.departname,
        serviceDept: "'BUSSINESS'",
        export: "Y",
        sortField: _self.sortField,
        order: _self.order,
        exportField: encodeURI(JSON.stringify(field))
      };
      let toExcel = this.$MergeURL(url, config);
      window.open(toExcel);
      console.log(toExcel);
    },
    getData() {
      var _self = this;
      _self.Sloading = true;
      var url = "api/order/workOrderList";
      var config = {
        params: {
          sortField: _self.sortField,
          order: _self.order,
          page: _self.page,
          pageSize: _self.pageSize,
          companyName: _self.formInline.companyname,
          serviceName: _self.formInline.servicename,
          product: _self.formInline.product,
          bupdatedate: DateFormat(_self.formInline.updatedate[0]),
          eupdatedate: DateFormat(_self.formInline.updatedate[1]),
          bcreatedate: DateFormat(_self.formInline.createdate[0]),
          ecreatedate: DateFormat(_self.formInline.createdate[1]),
          departname: _self.formInline.departname,
          customerName: _self.formInline.customerName,
          workserverstatus: _self.formInline.workserverstatus,
          tel: _self.formInline.tel,
          serviceDept: "'BUSSINESS'"
          // workOrderStatus:'20'
        }
      };

      _self.$http.get(url, config).then(function(res) {
        // console.log(res.data.data.rows)
        _self.data = res.data.data.rows;
        _self.pageTotal = res.data.data.total;
        for (let i = 0; i < res.data.data.rows.length; i++) {
          // console.log(_self.data[i])
          if (
            _self.data[i].CreateDate != "" &&
            _self.data[i].CreateDate != null
          ) {
            _self.data[i].CreateDate = _self.data[i].CreateDate.slice(0, 10);
          }
          if (
            _self.data[i].ServiceStart != "" &&
            _self.data[i].ServiceStart != null
          ) {
            _self.data[i].ServiceStart = _self.data[i].ServiceStart.slice(
              0,
              10
            );
          }
          if (
            _self.data[i].UpdateDate != "" &&
            _self.data[i].UpdateDate != null
          ) {
            _self.data[i].UpdateDate = _self.data[i].UpdateDate.slice(0, 10);
          }
          // console.log(_self.companyarea)
          if (
            _self.data[i].companyarea == null ||
            _self.data[i].companyarea == ""
          ) {
            _self.data[i].companyarea = "";
          } else {
            let temp = _self.data[i].companyarea.split("-");
            // console.log(temp)
            for (let j = 0; j < _self.companyarea.length; j++) {
              if (temp[0] == _self.companyarea[j].id) {
                for (let k = 0; k < _self.companyarea[j].children.length; k++) {
                  if (temp[1] == _self.companyarea[j].children[k].id) {
                    _self.data[i].companyarea =
                      _self.companyarea[j].typename +
                      " - " +
                      _self.companyarea[j].children[k].typename;
                  }
                }
              }
            }
          }
        }
        _self.Sloading = false;
      });
    },
    search() {
      this.page = 1;
      this.isSearh = true;
      this.getData();
    },
    reset() {
      this.isSearh = false;
      this.page = 1;
      this.formInline.companyname = "";
      this.formInline.servicename = "";
      this.formInline.product = "";
      this.formInline.updatedate = [];
      this.formInline.createdate = [];
      this.formInline.departname = "";
      this.formInline.tel = "";
      this.formInline.customerName = "";
      this.getData();
    },
    pageChange(e) {
      this.page = e;
      this.getData();
    },
    pageSizeChange(e) {
      this.pageSize = e;
      this.getData();
    },
    //  保存当前选中行
    save_current_row(e) {
      // console.log(e)
      this.current_row = e;
    },
    showdetail() {
      if (this.current_row != "") {
        // Bus.$emit('myCommonTask',this.current_row)
        this.$store.commit(
          "open_gobal_work_order_detail_modal",
          this.current_row.id
        );
      } else {
        this.$Message.warning("请选择一行查看详情！");
      }
    },
    showflow() {
      // console.log('111111111')
      if (this.current_row != "") {
        Bus.$emit("myflow", this.current_row);
      } else {
        this.$Message.warning("请选择一行进行流转！");
      }
    },
    onChangeHeaderCheckBox() {
      let headerValue = [];
      this.headerCheckBox.forEach((value, i) => {
        headerValue[i] = value ? this.headerTemp[i] : "";
      });
      this.header = headerValue.filter(v => !!v);
      this.showHeaderCheckBox = false;
    },
    reset_wordorder_process() {
      console.log(this.current_row);
      let _self = this;
      if (this.current_row != "") {
        let url = `api/order/resetWorkOrderProcess`;
        let _self = this;

        let config = {
          params: {
            workOrderId: _self.current_row.id
          }
        };

        function success(res) {
          console.log(res);
          _self.$Message.success(res.data.msg);
        }

        this.$Get(url, config, success);
      } else {
        this.$Message.warning("请选择一行进行流转！");
      }
    },
    //  流程图
    flowChart(a) {
      let _self = this;
      _self.flowChart1 = true;
      _self.flowChartImg =
        "/api/dataCenter/activiti/getResourceInputStreamObj?bussinessKey=" +
        a.row.id +
        "&bussinessType=20&time=" +
        new Date();
    },
    // foundClues(){
    //     Bus.$emit('workOrderClues',true)
    // }
    company() {
      if (this.current_row != "") {
        // Bus.$emit('openCompanyDetail',this.current_row.company_id)
        this.$store.commit(
          "open_gobal_company_detail_modal",
          this.current_row.company_id
        );
      } else {
        this.$Message.warning("请选择一行查看！");
      }
    },
    getDataCenter() {
      let _self = this;

      let params = "workOrderStatus";

      function finish(res) {
        _self.workOrderStatus = res.data.workOrderStatus;
        _self.workOrderStatus_map = _self.$array2map(_self.workOrderStatus);
      }

      this.$GetDataCenter(params, finish);
    }
  },
  created() {
    var _self = this;
    this.headerTemp = this.header;
    this.getDataCenter();
    this.getData();
    Bus.$on("flowsuccess", e => {
      _self.getData();
    });
    if (
      localStorage.getItem("id") == 10059
    || localStorage.getItem("id") == 10228 ) {
      _self.isAdmin = true;
    } else {
      _self.isAdmin = false;
    }
  }
};
</script>

<style>
.ivu-col-span-6 {
  height: 28px;
}
</style>

