<template>
  <div>
    <Card style="min-width:800px">
      <x-table
        ref="table"
        :url="url"
        :handler="dataHandle"
        :header="tableHeader"
        :config="filtraConfig"
        :listQuery="listQuery"
        @select="selectRow"
      >
        <Row>
          <ButtonGroup>
            <Button type="primary" icon="plus" @click="handlePopus">调整价格</Button>
            <Button type="primary" icon="plus" @click="handleCancel">退回至未结算</Button>
            <Button type="primary" icon="search" @click="handleExcel">导出Excel</Button>
          </ButtonGroup>
        </Row>
      </x-table>
    </Card>
    <Modal
      v-model="priceModal"
      title="调整价格"
      @on-ok="hanldePriceEdit"
      @on-cancel="priceModal = false"
    >
      <Form
        style="padding-rigth:20px"
        ref="form"
        :model="forms"
        :rules="ruleValidate"
        label-position="right"
        :label-width="100"
      >
        <FormItem label="供应商" prop="supplierName">
          <Input v-model="forms.supplierName" readonly />
        </FormItem>
        <FormItem label="结算价格" prop="settlementPrice">
          <Input type="number" v-model="forms.settlementPrice" />
        </FormItem>
      </Form>
    </Modal>
    <Modal title="查看凭证" v-model="visible">
      <img :src="imgUrl" v-if="visible" style="width: 100%" />
    </Modal>
  </div>
</template>

<script>
import xTable from "@C/xTable";
import {
  cancelSettlementByWorkorderId,
  updateSettlementPrice
} from "@A/supplierManage";

export default {
  name: "settle",
  components: { xTable },
  data() {
    return {
      visible: false,
      imgUrl: "",
      priceModal: false,
      url: "/order/workOrderList",
      listQuery: { 
        yesJs: "Y", 
        iscycle: "N", 
        workOrderStatus: "60",
        serviceDept: "'EXECUTIVE'" 
      },
      tableHeader: [
        {
          title: "归属企业",
          key: "companyname",
          minWidth: 140
        },
        // {
        //   title: "跟进销售",
        //   key: "servername",
        //   minWidth: 300
        // },
        {
          title: "产品全称",
          key: "product",
          minWidth: 120
        },
        {
          title: "供应商",
          key: "supplier_name",
          minWidth: 120
        },
        {
          title: "结算价",
          key: "settlement_price",
          minWidth: 120
        },
        // {
        //   title: "销售价格",
        //   key: "paynumber",
        //   minWidth: 120
        // },

        // {
        //   title: "结算时间",
        //   key: "settlement_time",
        //   width: 150
        // },
        {
          title: "凭证",
          render: (h, params) => {
            return h("div", [
              h("img", {
                style: {
                  "margin-top": "2px",
                  "border-radius": "4px",
                  width: "80px",
                  height: "40px",
                  cursor: "pointer"
                },
                attrs: {
                  src: "/api/assets/" + params.row.credential
                },
                on: {
                  click: e => {
                    this.handleView(e.srcElement.currentSrc);
                  }
                }
              })
            ]);
          },
          width: 120
        },
        {
          title: "备注",
          key: "remark",
          width: 180
        },
        {
          title: "结算时间",
          key: "settlement_time",
          width: 180
        },
        {
          title: "服务人员",
          key: "servername",
          width: 120,
          sortable: true
        },
        {
          title: "跟进人",
          key: "followname",
          width: 120,
          sortable: true
        }
      ],
      filtraConfig: [
        { type: "input", key: "supplierName", label: "供应商名称：" },
        { type: "date", key: "settlementTime", label: "完结时间" }
      ],
      excelField: [
        { field: "supplier_name", title: "供应商" },
        { field: "product", title: "产品" },
        { field: "settlement_price", title: "结算价" },
        { field: "sales_price", title: "销售价" }
      ],
      forms: { workOrderId: "", settlementPrice: "", supplier_name: "" },
      currentRow: null,
      dataHandle: data => data,
      ruleValidate: {
        settlementPrice: [
          {
            required: true,
            message: "请填写销售价",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    //  获取当前点击行
    selectRow(e) {
      this.currentRow = e;
      this.forms = {
        workOrderId: e.id,
        settlementPrice: e.settlement_price,
        supplierName: e.supplier_name
      };
    },
    hanldePriceEdit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          await updateSettlementPrice(this.forms);
          this.$refs.table.list.fetchList();
        } else {
          this.$Message.error("请完善信息");
        }
      });
    },
    handleView(url) {
      this.imgUrl = url;
      this.visible = true;
    },
    handleExcel() {
      this.$refs.table.list.setSearchConfig(this.listQuery);
      this.$refs.table.list.downloadExcel(this.excelField);
    },
    // 弹出调整价格
    handlePopus() {
      this.priceModal = true;
    },
    // 编辑
    handleEdit() {
      if (!this.currentRow) {
        return this.$Message.info("请选择一行进行编辑");
      }
      // if (this.currentRow.notify_status == "sent") {
      //   return this.$Message.info("该消息不能编辑");
      // }
      this.isEdit = !this.isEdit;
    },
    handleCancel() {
      this.$Modal.confirm({
        title: "是否退回至未结算",
        content: "<p>请不要误操作</p>",
        onOk: async () => {
          await cancelSettlementByWorkorderId({
            workOrderIds: this.currentRow.id
          });
          this.$refs.table.list.fetchList();
        }
      });
    }
  },
  created() {}
};
</script>


