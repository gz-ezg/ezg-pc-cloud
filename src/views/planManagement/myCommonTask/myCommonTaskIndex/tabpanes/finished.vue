<template>
  <div>
    <Card>
      <Row style="margin-bottom:10px">
        <Collapse v-model="search_model">
          <Panel name="1">
            <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>筛选
            <div slot="content" @keydown.enter="search">
              <Form ref="formInline" :model="formInline" :label-width="100">
                <Row :gutter="16">
                  <Col span="8">
                    <FormItem prop="companyname" label="公司名称：">
                      <Input size="small" type="text" v-model="formInline.companyname" placeholder></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem prop="servicename" label="服务人员名称：">
                      <Input size="small" type="text" v-model="formInline.servicename" placeholder></Input>
                    </FormItem>
                  </Col>
                </Row>
                <FormItem>
                  <Button type="primary" @click="search">搜索</Button>
                  <Button type="ghost" style="margin-left:20px" @click="finishReset">重置</Button>
                </FormItem>
              </Form>
            </div>
          </Panel>
        </Collapse>
      </Row>
      <Row>
        <ButtonGroup style="float:left">
          <Button type="primary" icon="information-circled" @click="show_detail">查询详情</Button>
          <Button type="primary" icon="ios-color-wand-outline" @click="company">查看公司</Button>
          <Button type="primary" icon="ios-color-wand-outline" @click="download_excel">导出Excel</Button>
          <Button type="primary" icon="ios-color-wand-outline" @click="declareResult">申报结果</Button>
          <Button type="primary" icon="ios-color-wand-outline" @click="companyCollectionFlow">企业收款流水</Button>
        </ButtonGroup>
      </Row>
      <Row style="margin-top: 10px;">
        <Table
          :loading="loading"
          ref="selection"
          highlight-row
          size="small"
          :columns="header"
          :data="data"
          @on-current-change="save_current_row"
          @on-row-dblclick="show_detail"
          @on-sort-change="sort"
        ></Table>
        <Page
          placement="top"
          size="small"
          :total="total"
          show-total
          show-sizer
          show-elevator
          @on-change="page_change_plan"
          @on-page-size-change="page_size_change_plan"
          :current.sync="page"
          style="margin-top: 10px"
        ></Page>
      </Row>
      <declare-result></declare-result>
      <update-order-item-plan></update-order-item-plan>
      <company-collection-flow></company-collection-flow>
    </Card>
  </div>
</template>

<script>
import mixin from "./mixin.js";
import declareResult from "./declareResult.vue";
import companyCollectionFlow from './companyCollectionFlow.vue'
import updateOrderItemPlan from "./updateOrderItemPlan.vue";
export default {
  mixins: [mixin],
  components: {
    declareResult,
    updateOrderItemPlan,
    companyCollectionFlow
  },
  data() {
    return {
      workStatusId: 60,
      workOrderStatus: [],
      workOrderStatus_map: new Map(),
      header: [
        {
          title: "公司名称",
          key: "CompanyName",
          minWidth: 220,
          sortable: true,
          render: (h, params) => {
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
          title: "服务部门",
          key: "departname",
          minWidth: 120,
          sortable: true
        },
        {
          title: "产品全称",
          key: "alisname",
          minWidth: 200,
          sortable: true,
          render: (h, params) => {
            if (params.row.alisname == "" || params.row.alisname == null) {
              return "";
            } else if (params.row.alisname.length > 10) {
              return h(
                "Poptip",
                {
                  props: {
                    trigger: "hover",
                    placement: "bottom"
                  }
                },
                [
                  h("span", params.row.alisname.slice(0, 10) + "..."),
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
                    [h("span", params.row.alisname)]
                  )
                ]
              );
            } else {
              return h("span", params.row.alisname);
            }
          }
        },

        {
          title: "目前进度",
          key: "CurrentProcess",
          minWidth: 120,
          sortable: true
        },
        {
          title: "下个进度",
          key: "nextprocess",
          minWidth: 120,
          sortable: true
        },
        {
          title: "服务开始时间",
          key: "service_begin_time",
          minWidth: 140,
          sortable: true
        },
        {
          title: "创建时间",
          key: "createdate",
          minWidth: 120,
          sortable: true
        },
        {
          title: "实际完成时间",
          key: "service_end_time",
          minWidth: 140,
          sortable: true
        },
        {
          title: "服务人员",
          key: "server_realname",
          minWidth: 120,
          sortable: true
        },
        {
          title: "跟进人",
          key: "followby_realname",
          minWidth: 120,
          sortable: true
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
                      this.open_flow_chart(params);
                    }
                  }
                },
                "[流程图]"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
      companyCollectionFlow(e) {
      if(!this.currentRow){
          this.$Message.warning("请选中一行重试");
          return;
        }
        this.$bus.emit("open_company_Collection_flow",this.currentRow);
      },
    declareResult() {
      let _self = this;
      console.log(_self.currentRow);
      if (!_self.currentRow) {
        _self.$Message.warning("请选中一行重试");
        return;
      }
      if (!_self.currentRow.order_item_plan_id) {
        _self.$Message.warning("请先补全订单数据");
        _self.$bus.emit("update_order_item_plan", _self.currentRow);
        return;
      }
      this.$bus.emit("open_declare_result", _self.currentRow);
    },
    getPlanFinishedData() {
      var _self = this;
      _self.loading = true;
      var url = "api/order/work/order/plan/list";
      var config = {
        params: {
          workOrderStatus: "60",
          sortField: _self.sortField,
          order: _self.order,
          page: _self.page,
          pageSize: _self.pageSize,
          serviceDept: "'PLAN'"
        }
      };

      function success(res) {
        // _self.data = res.data.data.rows
        _self.total = res.data.data.total;
        _self.data = res.data.data.rows.map(item => {
          if (item.CreateDate) {
            item.CreateDate = item.CreateDate.slice(0, 10);
          }
          if (item.ServiceStart) {
            item.ServiceStart = item.ServiceStart.slice(0, 10);
          }
          if (item.UpdateDate) {
            item.UpdateDate = item.UpdateDate.slice(0, 10);
          }
          return item;
        });
        _self.loading = false;
      }

      this.$Get(url, config, success);
    },
    finishReset() {
      this.page = 1;
      this.$refs.formInline.resetFields();
      this.getPlanFinishedData();
    },
    page_change_plan(e) {
      this.page = e;
      this.getPlanFinishedData();
    },
    page_size_change_plan(e) {
      this.page = 1;
      this.pageSize = e;
      this.getPlanFinishedData();
    }
  },
  created() {
    var _self = this;
    this.getPlanFinishedData();
    if (localStorage.getItem("id") == 10059) {
      _self.isAdmin = true;
    } else {
      _self.isAdmin = false;
    }
  }
};
</script>
