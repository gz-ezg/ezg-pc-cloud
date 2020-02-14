<template>
  <div>
    <Tabs value="name1">
      <!-- 合作供应商 -->
      <TabPane icon="logo-tux" label="合作供应商" name="name1">
        <Card style="min-width:800px">
          <x-table
            ref="nowTable"
            :url="url"
            :handler="nowDataHandle"
            :header="tableHeader"
            :config="filtraConfig"
            :listQuery="nowQuery"
            @select="selectRow"
          >
            <Row>
              <ButtonGroup>
                <Button type="primary" icon="plus" @click="handleAdd">新增</Button>
                <Button type="primary" icon="plus" @click="handleEdit">编辑</Button>
                <Button type="primary" icon="search" @click="handleShow">查看</Button>
                <Button type="primary" icon="search" @click="downloadExcel('nowTable')">导出Excel</Button>
              </ButtonGroup>
            </Row>
          </x-table>
        </Card>
      </TabPane>
      <!-- 历史供应商 -->
      <TabPane icon="logo-windows" label="历史供应商" name="name2">
        <Card style="min-width:800px">
          <x-table
            ref="historyTable"
            :url="url"
            :listQuery="historyQuery"
            :handler="histroyDataHandle"
            :header="tableHeader"
            :config="filtraConfig"
            @select="selectRow"
          >
            <Row>
              <ButtonGroup>
                <Button type="primary" icon="plus" @click="handleEdit">编辑</Button>
                <Button type="primary" icon="search" @click="handleShow">查看</Button>
                <Button type="primary" icon="search" @click="downloadExcel('historyTable')">导出Excel</Button>
              </ButtonGroup>
            </Row>
          </x-table>
        </Card>
      </TabPane>
    </Tabs>
    <!-- 增加组件 -->
    <add @ok="handleAdd" @cancel="isAdd=false" v-if="isAdd" />
    <!-- 修改组件 -->
    <edit
      v-if="isEdit||isShow"
      :initForm="currentRow"
      :type="isEdit?'edit':'show'"
      @ok="isEdit = false;isShow = false"
      @cancel="isEdit = false;isShow = false"
    />
  </div>
</template>

<script>
import xTable from "@C/xTable";
import Add from "./Menu/add.vue";
import edit from "./Menu/edit.vue";
import show from "./Menu/show.vue";
export default {
  name: "supplyManage",
  components: { xTable, Add, edit, show },
  data() {
    return {
      url: "/product/supplier/list",
      tableHeader: [
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
      filtraConfig: [
        { type: "input", key: "supplierName", label: "供应商名称：" },
        { type: "input", key: "product", label: "产品名称：" }
      ],
      excelField: [
        { field: "supplier_name", title: "供应商" },
        { field: "product", title: "产品" },
        { field: "settlement_price", title: "结算价" },
        { field: "sales_price", title: "销售价" }
      ],
      nowQuery: {
        status: "Y"
      },
      historyQuery: {
        status: "N"
      },
      currentRow: null,
      nowDataHandle: data => data,
      histroyDataHandle: data => data,
      isAdd: false,
      isEdit: false,
      isShow: false
    };
  },
  methods: {
    //  获取当前点击行
    selectRow(e) {
      this.currentRow = e;
    },

    downloadExcel(name) {
      this.$refs[name].list.downloadExcel(this.excelField);
    },
    // 新增
    handleAdd() {
      this.isAdd = !this.isAdd;
      this.$refs.nowTable.list.fetchList();
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
      this.$refs.nowTable.list.fetchList();
      this.$refs.historyTable.list.fetchList();
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


