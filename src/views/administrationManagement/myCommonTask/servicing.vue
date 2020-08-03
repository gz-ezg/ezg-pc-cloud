<template>
  <Card>
    <Row style="margin-bottom:10px">
      <Collapse v-model="search_model">
        <Panel name="1">
          <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>筛选
          <div slot="content" @keydown.enter="search">
            <Form ref="formInline" :model="formInline" :label-width="100">
              <Row :gutter="16">
                <Col span="8">
                  <FormItem prop="companyName" label="公司名称：">
                    <Input type="text" size="small" v-model="formInline.companyname" placeholder></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem prop="servicename" label="服务人员名称：">
                    <Input type="text" size="small" v-model="formInline.servicename" placeholder></Input>
                  </FormItem>
                </Col>
                <!-- <Col span="8">
                  <FormItem prop="servicename" label="产品类型">
                    <Select v-model="formInline.productType" style="width:200px">
                      <Option value>全部</Option>
                      <Option
                        v-for="(item,index) in productTypeDict"
                        :key="index"
                        :value="item.typecode"
                      >{{item.typename}}</Option>
                    </Select>
                  </FormItem>
                </Col>-->
              </Row>
              <FormItem>
                <Button type="primary" @click="search">搜索</Button>
                <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
              </FormItem>
            </Form>
          </div>
        </Panel>
      </Collapse>
    </Row>
    <Row>
      <ButtonGroup style="float:left">
        <Button type="primary" icon="ios-color-wand-outline" @click="handleServeModal">变更服务商</Button>

        <Button
          type="primary"
          icon="ios-color-wand-outline"
          @click="stopRemark=current_row.remark;stopModal = true"
        >流程终止</Button>
        <Button type="primary" icon="ios-color-wand-outline" @click="showflow">流转</Button>
        <!-- <Button type="primary" icon="ios-color-wand-outline" @click="flow_all">批量流转</Button> -->
        <Button type="primary" icon="information-circled" @click="showdetail">查询详情</Button>
        <Button type="primary" icon="ios-color-wand-outline" @click="company">查看公司</Button>
        <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
        <!-- <Button type="primary" icon="ios-color-wand-outline" @click="finsih_workerorder">一键完结</Button> -->
        <!-- <Button type="primary" icon="ios-color-wand-outline" @click="reCreate" v-permission="['administration.rebuild']">重新生成流程</Button> -->
      </ButtonGroup>
    </Row>
    <Row style="margin-top: 10px;">
      <Table
        ref="selection"
        highlight-row
        size="small"
        :columns="header"
        :data="data"
        @on-current-change="save_current_row"
        @on-row-dblclick="showdetail"
        @on-sort-change="sort"
        @on-selection-change="get_all_selection"
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

    <fishModal
      :current_row="current_row"
      @ok="handleFishModal"
      @cancel="isFishModal=false"
      :show="isFishModal"
    ></fishModal>

    <flowModal
      :show="isFlowModal"
      :current_row="current_row"
      @ok="handleFlowModal"
      @cancel="handleFlowModalCancel"
    ></flowModal>

    <Modal v-model="stopModal" title="终止流程" @on-ok="stopModal=false" @on-cancel="stopModal = false">
      <Form style="padding-rigth:20px" ref="form" label-position="right" :label-width="100">
        <FormItem label="备注">
          <Input type="textarea" v-model="stopRemark" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleSupplyStop">终止流程</Button>
        <Button type="ghost" style="margin-left:20px" @click="stopModal=false">取消</Button>
      </div>
    </Modal>

    <Modal
      v-model="changeModal"
      title="变更服务商"
      @on-ok="changeModal=false"
      @on-cancel="changeModal = false"
    >
      <Form
        style="padding-rigth:20px"
        ref="form"
        :model="forms"
        :rules="ruleValidate"
        label-position="right"
        :label-width="100"
      >
        <FormItem prop="servicename" label="供应商">
          <Select @on-change="gycSelectChange" v-model="forms.supplierId" style="width:200px">
            <Option
              v-for="(item,index) in gycList"
              :key="index"
              :value="item.supplierId"
            >{{item.supplierName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="联系人">{{forms.contactName}}</FormItem>
        <FormItem label="联系电话">{{forms.tel}}</FormItem>
        <FormItem label="开户行">{{forms.settlementOpenBank}}</FormItem>
        <FormItem label="开户支行">{{forms.settlementOpenBankItem}}</FormItem>
        <FormItem label="结算账号">{{forms.settlementAccount}}</FormItem>
        <FormItem label="产品">{{current_row.product}}</FormItem>
        <FormItem label="销售价">
          <Input type="number" v-model="forms.settlementPrice" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleSupplyChange">变更</Button>
        <Button type="ghost" style="margin-left:20px" @click="changeModal=false">取消</Button>
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
    -->
  </Card>
</template>

<script>
import fishModal from "./Menu/fishModal";
import flowModal from "./Menu/flowModal";
import {
  terminateExecutiveWorkOrder,
  listByProductId,
  goNextExecutiveWorkOrder,
  changeWorkorderSuppiler,
} from "@A/supplierManage";
export default {
  components: { fishModal, flowModal },
  data() {
    return {
      forms: { salesPrice: "", settlementPrice: "", file: null },
      ruleValidate: {},
      gycList: [],
      changeModal: false,
      stopRemark: "", //终止流程备注
      search_model: "",
      sortField: "updatedate",
      order: "desc",
      //  触发搜索
      isSearh: false,
      //  筛选数据
      formInline: {
        companyname: "",
        servicename: "",
        productType: "gyscp",
      },

      isFishModal: false,
      isFlowModal: false,
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
      stopModal: false,
      productTypeDict: [],
      workOrderStatus: [],
      workOrderStatus_map: new Map(),
      header: [
        // {
        //     type: 'selection',
        //     width: 60,
        //     align: 'center'
        // },
        // {
        //     title: '工单状态',
        //     key: 'workOrderStatus',
        //     width:100,
        //     sortable: true,
        //     render:(h, params) => {
        //         // console.log(params.row.workOrderStatus.toString())

        //         // let temp = this.workOrderStatus_map.get(params.row.workOrderStatus.toString())
        //         // return h('div',temp)
        //         if(params.row.workOrderStatus == '10'){
        //             return h('div','未分配')
        //         }else if(params.row.workOrderStatus == '20'){
        //             return h('div','未开始')
        //         }else if(params.row.workOrderStatus == '30'){
        //             return h('div','服务中')
        //         }else if(params.row.workOrderStatus == '40'){
        //             return h('div','暂停')
        //         }else if(params.row.workOrderStatus == '50'){
        //             return h('div','退款终止')
        //         }else if(params.row.workOrderStatus == '60'){
        //             return h('div','已完结')
        //         }else{
        //             return h('div','无状态')
        //         }
        //     }
        // },
        {
          title: "归属公司",
          key: "companyname",
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
                    placement: "bottom",
                  },
                },
                [
                  h("span", params.row.companyname.slice(0, 12) + "..."),
                  h("Icon", {
                    props: {
                      type: "arrow-down-b",
                    },
                  }),
                  h(
                    "div",
                    {
                      slot: "content",
                    },
                    [h("span", params.row.companyname)]
                  ),
                ]
              );
            } else {
              return h("span", params.row.companyname);
            }
          },
        },
        // {
        //   title: "提示",
        //   key: "baseorderid",
        //   width: 120
        // },
        // {
        //     title: '订单',
        //     key: 'ordercode',
        //     width: 150
        // },
        // {
        //   title: "服务部门",
        //   key: "departname",
        //   width: 120,
        //   sortable: true
        // },
        {
          title: "产品全称",
          key: "product",
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
                    placement: "bottom",
                  },
                },
                [
                  h("span", params.row.product.slice(0, 10) + "..."),
                  h("Icon", {
                    props: {
                      type: "arrow-down-b",
                    },
                  }),
                  h(
                    "div",
                    {
                      slot: "content",
                    },
                    [h("span", params.row.product)]
                  ),
                ]
              );
            } else {
              return h("span", params.row.product);
            }
          },
        },
        // {
        //   title: "产品数量",
        //   key: "productnumber",
        //   width: 120
        // },
        // {
        //   title: "产品类型",
        //   key: "productType",
        //   width: 120
        // },
        // {
        //   title: "目前进度",
        //   key: "CurrentProcess",
        //   width: 120,
        //   sortable: true
        // },
        // {
        //   title: "下个进度",
        //   key: "nextprocess",
        //   width: 120,
        //   sortable: true
        // },
        // {
        //   title: "服务开始时间",
        //   key: "ServiceStart",
        //   width: 140,
        //   sortable: true
        // },
        {
          title: "创建时间",
          key: "CreateDate",
          sortable: true,
        },
        // {
        //     title: '预计完成时间',
        //     key: 'baseorderid',
        //     width: 120
        // },
        // {
        //   title: "实际完成时间",
        //   key: "UpdateDate",
        //   width: 140,
        //   sortable: true
        // },
        {
          title: "供应商",
          key: "supplier_name",
        },
        {
          title: "结算价",
          key: "settlement_price",
        },
        {
          title: "服务人员",
          key: "servername",

          sortable: true,
        },
        {
          title: "跟进人",
          key: "followname",

          sortable: true,
        },
        {
          title: "备注",
          key: "remark",
        },
        // {
        //   title: "操作",
        //   key: "action",
        //   fixed: "right",
        //   width: 120,
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       // h('Button', {
        //       //     props: {
        //       //         type: 'text',
        //       //         size: 'small'
        //       //     },
        //       //     on: {
        //       //         click: () => {
        //       //             // console.log(params)
        //       //             Bus.$emit('showcompanydetail',params)
        //       //         }
        //       //     }
        //       // }, '[查看公司]'),
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "text",
        //             size: "small"
        //           },
        //           on: {
        //             click: () => {
        //               this.flowChart(params);
        //             }
        //           }
        //         },
        //         "[流程图]"
        //       )
        //       // h('Button', {
        //       //     props: {
        //       //         type: 'text',
        //       //         size: 'small'
        //       //     },
        //       //     on: {
        //       //         click: () => {
        //       //             var _self = this
        //       //             console.log(params)
        //       //             //  暂停
        //       //             if(params.row.resumeFlag == null || params.row.resumeFlag == 3){
        //       //                 let url = `api/order/serviceResume?workOrderId=${params.row.id}&resumeFlag=3`
        //       //                 this.$http.get(url).then(function(res){
        //       //                 _self.$backToLogin(res)
        //       //                     if(res.data.msgCode == 40000){
        //       //                         _self.$Message.success(res.data.msg)
        //       //                     }else{
        //       //                         _self.$Message.error(res.data.msg)
        //       //                     }
        //       //                     _self.getData()
        //       //                 })
        //       //             }else if(params.row.resumeFlag == 2){
        //       //                 let url = `api/order/serviceResume?workOrderId=${params.row.id}&resumeFlag=2`
        //       //                 this.$http.get(url).then(function(res){
        //       //                 _self.$backToLogin(res)
        //       //                     if(res.data.msgCode == 40000){
        //       //                         _self.$Message.success(res.data.msg)
        //       //                     }else{
        //       //                         _self.$Message.error(res.data.msg)
        //       //                     }
        //       //                     _self.getData()
        //       //                 })
        //       //             }else{}
        //       //         }
        //       //     }
        //       // }, '[暂停/解锁]'),
        //       // h('Button', {
        //       //     props: {
        //       //         type: 'text',
        //       //         size: 'small'
        //       //     },
        //       //     on: {
        //       //         click: () => {
        //       //             this.endlife = true
        //       //         }
        //       //     }
        //       // }, '[退款终止]'),
        //     ]);
        //   }
        // }
      ],
      tempArray: [],
    };
  },
  methods: {
    // 供应商改变
    async handleServeModal() {
      this.gycList = await listByProductId({
        productId: this.current_row.productId,
      });
      if (this.gycList.length) {
        this.forms = this.gycList[0];
      }
      this.changeModal = true;
    },
    get_all_selection(e) {
      console.log(e);
      this.tempArray = e;
    },
    flow_all() {
      let _self = this;
      if (this.tempArray.length == 0) {
        _self.$Message.warning("请选择需要流转的工单！");
      } else {
        for (let i = 0; i < this.tempArray.length; i++) {
          let url = `api/order/next`;
          let config = {
            workOrderId: _self.tempArray[i].id,
            backup: "批量流转",
          };
          function success(res) {
            console.log(
              "流转成功：" +
                _self.tempArray[i].id +
                " - " +
                _self.tempArray[i].companyname +
                " - " +
                _self.tempArray[i].product
            );
            if (_self.tempArray.length == i + 1) {
              // _self.getData()
              _self.$bus.emit("flowsuccess", true);
            }
          }

          function fail(err) {
            console.log(
              "流转失败：" +
                _self.tempArray[i].id +
                " - " +
                _self.tempArray[i].companyname +
                " - " +
                _self.tempArray[i].product
            );
            if (_self.tempArray.length == i + 1) {
              // _self.getData()
              _self.$bus.emit("flowsuccess", true);
            }
          }
          _self.$Post(url, config, success, fail);
        }
      }
    },
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
          format: "workOrderStatus",
        },
        { field: "companyname", title: "公司名称" },
        { field: "baseorderid", title: "提示" },
        { field: "departname", title: "服务部门" },
        { field: "product", title: "产品全称" },
        { field: "CurrentProcess", title: "目前进度" },
        { field: "nextprocess", title: "下个进度" },
        { field: "ServiceStart", title: "服务开始时间" },
        { field: "CreateDate", title: "创建时间" },
        { field: "ServiceEnd", title: "实际完成时间" },
        { field: "servername", title: "服务人员" },
        { field: "followname", title: "跟进人" },
      ];
      let _self = this;
      let url = `api/order/workOrderList`;
      let config = {
        page: "1",
        pageSize: "1000000",
        workOrderStatus: "30",
        iscycle: "N",
        companyName: _self.formInline.companyname,
        serviceName: _self.formInline.servicename,
        productType: _self.formInline.productType,
        // serviceDept:"'ACCOUNT','AUDIT'",
        serviceDept: "'EXECUTIVE'",
        export: "Y",
        exportField: encodeURI(JSON.stringify(field)),
      };
      let toExcel = this.$MergeURL(url, config);
      window.open(toExcel);
    },
    getData() {
      var _self = this;
      _self.Sloading = true;
      var url = "api/order/workOrderList";
      var config = {
        params: {
          workOrderStatus: "30",
          sortField: _self.sortField,
          order: _self.order,
          page: _self.page,
          pageSize: _self.pageSize,
          companyName: _self.formInline.companyname,
          serviceName: _self.formInline.servicename,
          productType: _self.formInline.productType,
          // serviceDept:"'ACCOUNT','AUDIT'",
          serviceDept: "'EXECUTIVE'",
          iscycle: "N",
        },
      };

      _self.$http.get(url, config).then(function (res) {
        _self.$backToLogin(res);
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
        }
        _self.Sloading = false;
        _self.getDataCenter();
        //  测试块，测试map()
      });
    },
    search() {
      this.page = 1;
      this.isSearh = true;
      this.getData();
    },
    // 流程终止
    async handleSupplyStop() {
      await terminateExecutiveWorkOrder({
        workorderId: this.current_row.id,
        remark: this.stopRemark,
      });
      this.stopModal = false;
      this.getData();
    },

    gycSelectChange(id) {
      const values = this.gycList.find((v) => id == v.supplierId);
      this.forms = { ...values };
    },
    reset() {
      this.isSearh = false;
      this.page = 1;
      this.formInline.companyname = "";
      this.formInline.servicename = "";
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
    handleFlowModalCancel() {
      this.isFlowModal = false;
      console.log("ahhahah", this.isFlowModal);
    },
    //  保存当前选中行
    save_current_row(e) {
      // console.log(e)
      this.current_row = e;
    },
    handleFishModal() {
      this.isFishModal = false;
      this.getData();
    },
    handleFlowModal() {
      this.isFlowModal = false;
      this.getData();
    },
    async handleSupplyChange() {
      await changeWorkorderSuppiler({
        workorderId: this.current_row.id,
        suppilerId: this.forms.supplierId,
        settlementPrice: this.forms.settlementPrice,
      });
      this.changeModal = false;
      this.getData();
    },
    showdetail() {
      if (this.current_row != "") {
        // this.$bus.emit('myCommonTask',this.current_row)
        this.$store.commit(
          "open_gobal_work_order_detail_modal",
          this.current_row.id
        );
      } else {
        this.$Message.warning("请选择一行查看详情！");
      }
    },

    reCreate() {
      let _self = this;
      if (this.current_row != "") {
        let url = `api/workorder/reCreateWorkOrderProcess`;
        let config = {
          params: {
            workOrderId: _self.current_row.id,
          },
        };
        function success(res) {
          _self.$Message.success(res.data.msg);
        }
        _self.$Get(url, config, success);
      } else {
        this.$Message.warning("请选择一行！");
      }
    },
    showflow() {
      console.log("111111111");
      if (this.current_row != "") {
        if (this.current_row.product_type == "gyscp") {
          this.isFlowModal = true;
        } else {
          this.$bus.emit("myflow", this.current_row);
        }
      } else {
        this.$Message.warning("请选择一行进行流转！");
      }
    },
    finsih_workerorder() {
      let _self = this;
      if (this.current_row != "") {
        if (
          this.current_row.productType == "供应商产品" &&
          this.current_row.CurrentProcess !== "完结"
        ) {
          this.isFishModal = true;
        } else {
          let url = `api/order/goFinshWorkOrderProcess`;
          let config = {
            params: {
              workOrderId: _self.current_row.id,
            },
          };
          function success(res) {
            _self.$Message.success(res.data.msg);
          }
          _self.$Get(url, config, success);
        }
      } else {
        this.$Message.warning("请选择一行！");
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
        // this.$bus.emit('openCompanyDetail',this.current_row.company_id)
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

      let params = "product_type";
      let map = new Map();

      function finish(res) {
        _self.productTypeDict = res.data.data.product_type;
        res.data.data.product_type.forEach((e) => {
          map.set(e.typecode, e.typename);
        });

        _self.data = _self.data.map((v) => {
          v.productType = map.get(v.product_type);
          return v;
        });
      }
      _self.$GetDataCenter(params, finish);
    },
  },
  created() {
    var _self = this;
    this.getData();
    this.$bus.on("flowsuccess", (e) => {
      _self.getData();
    });
  },
};
</script>



