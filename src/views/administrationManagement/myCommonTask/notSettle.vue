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
        @selectionChange="selectionChange"
      >
        <Row>
          <ButtonGroup>
            <Button
              type="primary"
              icon="plus"
              @click="hanldeSelectMore"
            >{{ canSelectMore ? '取消多选' : '多选' }}</Button>
            <Button type="primary" icon="search" @click="handleSettle">结算</Button>
            <Button type="primary" icon="search" @click="handleExcel">导出Excel</Button>
          </ButtonGroup>
        </Row>
      </x-table>
    </Card>
    <Modal width="70%" title="查看凭证" v-model="visible">
      <template v-for="(item,index) in imgUrl">
        <img :key="index" :src="item" v-if="visible" style="width: 100%" />
      </template>
    </Modal>
  </div>
</template>

<script>
import xTable from "@C/xTable";
import { settlementByWorkorderId } from "@A/supplierManage";
export default {
  name: "settle",
  components: { xTable },
  data() {
    return {
      imgUrl: [],
      visible: false,
      url: "/order/workOrderList",
      listQuery: {
        notJs: "Y",
        iscycle: "N",
        serviceDept: "'EXECUTIVE'",
        sortField: "updatedate",
        order: "desc"
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

        {
          title: "结算时间",
          key: "settlement_time",
          width: 150
        },
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
                  src: "/api/assets/" + params.row.credential.split(",")[0]
                },
                on: {
                  click: e => {
                    this.handleView(params.row.credential);
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
        { type: "date", key: "settlementTime", label: "完结时间" },
        { type: "date", key: "servicebegintime", label: "服务开始时间" }
      ],
      excelField: [
        { field: "supplier_name", title: "供应商" },
        { field: "product", title: "产品" },
        { field: "settlement_price", title: "结算价" },
        { field: "sales_price", title: "销售价" }
      ],

      currentRow: null,
      dataHandle: data => data,
      canSelectMore: false,
      selectRows: []
    };
  },
  methods: {
    //  获取当前点击行
    selectRow(e) {
      this.currentRow = e;
    },
    selectionChange(e) {
      this.selectRows = e;
    },
    hanldeSelectMore() {
      if (this.canSelectMore) {
        this.tableHeader.shift();
        this.$refs["table"].$refs.xTable.selectAll(false);

        this.selectRows = [];
      } else {
        this.tableHeader.unshift({
          title: "#",
          type: "selection",
          width: 60
        });
      }
      this.canSelectMore = !this.canSelectMore;
    },
    downloadExcel(name) {
      this.$refs[name].list.downloadExcel(this.excelField);
    },
    handleView(url) {
      this.imgUrl = url.split(",").map(v => "/api/assets/" + v);
      this.visible = true;
    },
    // 结算
    async handleSettle() {
      this.$Modal.confirm({
        title: "是否确定结算",
        content: "<p>请不要误操作</p>",
        onOk: async () => {
          await settlementByWorkorderId({
            workOrderIds: this.canSelectMore
              ? this.selectRows.map(v => v.id).join(",")
              : this.currentRow.id
          });
          this.$refs.table.list.fetchList();
          if (this.canSelectMore) {
            this.tableHeader.shift();
            this.$refs["table"].$refs.xTable.selectAll(false);

            this.selectRows = [];
          }
        }
      });
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
    handleExcel() {
      this.$refs.table.list.setSearchConfig(this.listQuery);
      this.$refs.table.list.downloadExcel(this.excelField);
    },
    handleShow() {
      if (!this.currentRow) {
        return this.$Message.info("请选择一行进行查看");
      }
      // if (this.currentRow.notify_status == "sent") {
      //   return this.$Message.info("该消息不能编辑");
      // }
      this.isShow = !this.isShow;
    }
  },
  created() {}
};
</script>


