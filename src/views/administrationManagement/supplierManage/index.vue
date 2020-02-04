<template>
  <div>
    <Tabs value="name1">
      <!-- 合作供应商 -->
      <TabPane label="合作供应商" name="name1">
        <Card style="min-width:800px">
          <Row style="margin-bottom:10px">
            <Collapse v-model="search_model">
              <Panel name="1">
                <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>筛选
                <div slot="content" @keydown.enter="Search">
                  <Form
                    ref="formValidateSearch"
                    :model="formValidateSearch"
                    :label-width="100"
                    style="margin-top: -10px"
                  >
                    <Row>
                      <Col span="6">
                        <FormItem label="供应商" prop="supplierName">
                          <Input v-model="formValidateSearch.supplierName" size="small"></Input>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem label="产品" prop="product">
                          <Input v-model="formValidateSearch.product" size="small"></Input>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem>
                          <Button size="small" type="primary" @click="Search">搜索</Button>
                        </FormItem>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Panel>
            </Collapse>
          </Row>
          <Row>
            <ButtonGroup>
              <Button
                v-permission="['orderL.add']"
                type="primary"
                icon="plus"
                @click="open_add"
                name="order_add"
              >新增</Button>
              <Button
                v-permission="['orderL.edit']"
                type="primary"
                icon="edit"
                @click="open_edit"
                name="order_edit"
              >编辑</Button>
              <Button
                v-permission="['orderL.detail']"
                type="primary"
                icon="information-circled"
                @click="order_show"
                name="order_show"
              >查看</Button>
              <Button
                v-permission="['orderL.export']"
                type="primary"
                icon="ios-color-filter-outline"
                @click="downloadExcel"
              >导出Excel</Button>
            </ButtonGroup>
          </Row>
          <Row style="margin-top: 10px;">
            <Table
              :loading="loading"
              highlight-row
              size="small"
              border
              :row-class-name="rowClassName"
              @on-row-click="select_row"
              @on-row-dblclick="open_order_detail"
              @on-sort-change="sort"
              :columns="header"
              :data="data"
            ></Table>
            <Page
              size="small"
              :total="total"
              show-total
              show-sizer
              show-elevator
              :current.sync="page"
              @on-change="pageChange"
              @on-page-size-change="pageSizeChange"
              style="margin-top: 10px"
            ></Page>
          </Row>
        </Card>
      </TabPane>
      <!-- 历史供应商 -->
      <TabPane label="历史供应商" name="name2">
        <Card style="min-width:800px">
          <Row style="margin-bottom:10px">
            <Collapse v-model="search_model">
              <Panel name="1">
                <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>筛选
                <div slot="content" @keydown.enter="Search2">
                  <Form
                    ref="formValidateSearch2"
                    :model="formValidateSearch2"
                    :label-width="100"
                    style="margin-top: -10px"
                  >
                    <Row>
                      <Col span="6">
                        <FormItem label="供应商" prop="supplierName">
                          <Input v-model="formValidateSearch2.supplierName" size="small"></Input>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem label="产品" prop="product">
                          <Input v-model="formValidateSearch2.product" size="small"></Input>
                        </FormItem>
                      </Col>
                      <Col span="6">
                        <FormItem>
                          <Button size="small" type="primary" @click="Search2">搜索</Button>
                        </FormItem>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Panel>
            </Collapse>
          </Row>
          <Row>
            <ButtonGroup>
              <Button
                v-permission="['orderL.add']"
                type="primary"
                icon="plus"
                @click="open_add"
                name="order_add"
              >新增</Button>
              <Button
                v-permission="['orderL.edit']"
                type="primary"
                icon="edit"
                @click="open_edit"
                name="order_edit"
              >编辑</Button>
              <Button
                v-permission="['orderL.detail']"
                type="primary"
                icon="information-circled"
                @click="order_show"
                name="order_show"
              >查看</Button>
              <Button
                v-permission="['orderL.export']"
                type="primary"
                icon="ios-color-filter-outline"
                @click="downloadExcel2"
              >导出Excel</Button>
            </ButtonGroup>
          </Row>
          <Row style="margin-top: 10px;">
            <Table
              :loading="loading"
              highlight-row
              size="small"
              border
              :row-class-name="rowClassName"
              @on-row-click="select_row"
              @on-row-dblclick="open_order_detail"
              @on-sort-change="sort"
              :columns="header2"
              :data="data2"
            ></Table>
            <Page
              size="small"
              :total="total2"
              show-total
              show-sizer
              show-elevator
              :current.sync="page2"
              @on-change="pageChange2"
              @on-page-size-change="pageSizeChange2"
              style="margin-top: 10px"
            ></Page>
          </Row>
        </Card>
      </TabPane>
    </Tabs>

    <show-order :payDirs="payDirs"></show-order>
    <create-order :payDirs="payDirs" @get_data="get_data"></create-order>
    <amend-order :payDirs="payDirs"></amend-order>
    <edit-order :payDirs="payDirs" @get_data="get_data"></edit-order>
    <show-contarct></show-contarct>
    <product-select></product-select>
  </div>
</template>

<script>
//  查看订单详情
import showOrder from "./components/orderOp/showOrder";
import createOrder from "./components/orderOp/createOrder";
import amendOrder from "./components/orderOp/amendOrder";
import editOrder from "./components/orderOp/editOrderDetail";
import showContarct from "./show_contarct";
import productSelect from "./components/productSelect";
import { getSupplier } from "@/api/supplierManage";

import { DateFormat, simpleCodeToText } from "../../../libs/utils.js";

export default {
  name: "orderList_index",
  components: {
    showOrder,
    createOrder,
    amendOrder,
    editOrder,
    showContarct,
    productSelect
  },
  data() {
    return {
      //  列表查询相关
      selectRow: "",
      formValidateSearch: {
        supplierName: "",
        product: ""
      },
      formValidateSearch2: {
        supplierName: "",
        product: ""
      },
      total: 0,
      page: 1,
      pageSize: 10,
      total2: 0,
      page2: 1,
      pageSize2: 10,
      loading: false,
      order: "desc",
      sortField: "id",
      header: [
        {
          title: "供应商",
          key: "supplier_name",
          minWidth: 140
        },
        {
          title: "产品",
          key: "product",
          minWidth: 300
        },
        {
          title: "结算价",
          key: "settlement_price",
          minWidth: 120
        },
        {
          title: "销售价",
          key: "sales_price",
          minWidth: 120
        }
      ],
       header2: [
        {
          title: "供应商",
          key: "supplier_name",
          minWidth: 140
        },
        {
          title: "产品",
          key: "product",
          minWidth: 300
        },
        {
          title: "结算价",
          key: "settlement_price",
          minWidth: 120
        },
        {
          title: "销售价",
          key: "sales_price",
          minWidth: 120
        }
      ],
      data: [],
      data2: [],
      //  数据字典
      payDirs: [],
      cluesources: [],
      order_contract_flag: [],
      payDirs_map: new Map(),
      cluesources_map: new Map(),
      order_contract_flag_map: new Map()
    };
  },
  methods: {
    //  下载文件
    downloadExcel() {
      let field = [
        { field: "supplier_name", title: "供应商" },
        { field: "product", title: "产品" },
        { field: "settlement_price", title: "结算价" },
        { field: "sales_price", title: "销售价" }
      ];
      let _self = this;
      let url = `api/product/supplier/list`;
      let config = {
        page: _self.page,
        pageSize: _self.pageSize,
        supplierName: _self.formValidateSearch.supplier_name,
        status: _self.formValidateSearch.status,
        product: _self.formValidateSearch.product,
        export: "Y",
        exportField: encodeURI(JSON.stringify(field))
      };
      let toExcel = this.$MergeURL(url, config);
      window.open(toExcel);
    },
    // 历史下载文件
     downloadExcel2() {
     let field = [
        { field: "supplier_name", title: "供应商" },
        { field: "product", title: "产品" },
        { field: "settlement_price", title: "结算价" },
        { field: "sales_price", title: "销售价" }
      ];
      let _self = this;
      let url = `api/product/supplier/list`;
      let config = {
        page: _self.page,
        pageSize: _self.pageSize,
        supplierName: _self.formValidateSearch.supplier_name,
        status: 'N',
        product: _self.formValidateSearch.product,
        export: "Y",
        exportField: encodeURI(JSON.stringify(field))
      };
      let toExcel = this.$MergeURL(url, config);
      window.open(toExcel);
    },
    //  搜索相关
    Search() {
      this.page = 1;
      this.get_data();
    },
    Search2() {
      this.page2 = 1;
      this.get_data2();
    },
    // handleReset() {
    //   this.$refs["formValidateSearch"].resetFields();
    //   this.formValidateSearch.date = [];
    //   this.get_data();
    // },
    //  自定义排序
    sort(e) {
      this.sortField = e.key;
      if (e.order == "normal") {
        this.order = "desc";
        this.sortField = "id";
      } else {
        this.order = e.order;
      }
      this.get_data();
    },
    //  获取列表
    get_data() {
      let _self = this;
      let url = `api/product/supplier/list`;
      _self.loading = true;
      let config = {
        params: {
          page: _self.page,
          pageSize: _self.pageSize,
          supplierName: _self.formValidateSearch.supplierName,
          status: "Y",
          product: _self.formValidateSearch.product
        }
      };
      function success(res) {
        // console.log(res)
        _self.data = res.data.data.rows;
        _self.total = res.data.data.total;
        _self.loading = false;
      }

      this.$Get(url, config, success);
    },
    // 获取列表2
    get_data2() {
      let _self = this;
      let url = `api/product/supplier/list`;
      _self.loading = true;
      let config = {
        params: {
          page: _self.page2,
          pageSize: _self.pageSize2,
          supplierName: _self.formValidateSearch2.supplierName,
          status: "N",
          product: _self.formValidateSearch2.product
        }
      };
      function success(res) {
        // console.log(res.data.data)
        _self.data2 = res.data.data.rows;
        _self.total2 = res.data.data.total;
        _self.loading = false;
      }

      this.$Get(url, config, success);
    },
    pageChange(e) {
      this.page = e;
      this.get_data();
    },
    pageSizeChange(e) {
      this.pageSize = e;
      this.get_data();
    },
    // 历史
    pageChange2(e) {
      this.page2 = e;
      this.get_data2();
    },
    pageSizeChange2(e) {
      this.pageSize2 = e;
      this.get_data2();
    },
    //  列表分类处理
    rowClassName(row, index) {
      let _self = this;
      if (row.ProcessType == "调整订单" && row.id != _self.selectRow.id) {
        return "demo-table-error-row";
      }
    },
    select_row(e) {
      // console.log(e)
      if (e.id) {
        this.selectRow = e;
      } else {
        this.selectRow = "";
      }
    },
    get_data_center() {
      let _self = this;
      return new Promise((resolve, reject) => {
        let params = "payDirs,cluesources,order_contract_flag";

        function success(res) {
          _self.payDirs = res.data.data.payDirs;
          _self.cluesources = res.data.data.cluesources;
          _self.order_contract_flag = res.data.data.order_contract_flag;
          _self.payDirs_map = _self.$array2map(_self.payDirs);
          _self.cluesources_map = _self.$array2map(_self.cluesources);
          _self.order_contract_flag_map = _self.$array2map(
            _self.order_contract_flag
          );
          resolve();
        }

        this.$GetDataCenter(params, success);
      });
    },
    //  【双击查看订单】
    open_order_detail(e) {
      console.log(e);
      this.$bus.emit("OPEN_ORDERLIST_DETAIL", e);
    },

    //  【查看订单】
    order_show() {
      if (this.selectRow) {
        this.open_order_detail(this.selectRow);
      } else {
        this.$Message.warning("请选择一行进行操作！");
      }
    },

    //  【修改订单】
    xiugai_open() {
      if (this.selectRow) {
        if (this.selectRow.CurrentProcess != "Finished") {
          this.$Message.warning("未完结订单不予许进行修改！");
        } else {
          this.$bus.emit("OPEN_ORDERLIST_AMEND", this.selectRow.id);
        }
      } else {
        this.$Message.warning("请选择一行进行操作！");
      }
    },
    //  【编辑订单】
    open_edit() {
      if (this.selectRow) {
        // console.log(this.selectRow)
        this.$bus.emit("OPEN_ORDERLIST_EDIT", this.selectRow);
      } else {
        this.$Message.warning("请选择一行进行操作！");
      }
    },
    //  【新增订单】
    open_add() {
      this.$bus.emit("OPEN_ORDERLIST_ADD", true);
    }
  },
  created() {
    this.loading = true;
    this.get_data_center().then(this.get_data());
    this.get_data_center().then(this.get_data2());
    // if(localStorage.getItem('id')==10059){
    //     this.header.push(this.amdinOpertionCol)
    // }
    this.$bus.on("UPDATE_ORDER_LIST", e => {
      this.get_data();
      this.get_data2();
    });
  }
};
</script>

<style>
.ivu-table .demo-table-error-row td {
  background-color: #ff6600;
  color: #000;
}
.ivu-col-span-6 {
  height: 28px;
}
</style>
