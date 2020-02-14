<template>
  <div>
    <filtra v-if="config" @search="list.search($event)" @reset="list.reset()" :config="config"></filtra>
    <slot></slot>
    <Row style="margin-top: 10px;">
      <Table
        ref="xTable"
        highlight-row
        border
        size="small"
        @on-row-click="selectRow"
        :loading="list.loading"
        :columns="header"
        :data="list.data"
        @on-selection-change="selectionChange"
      ></Table>

      <Page
        :current="list.page"
        size="small"
        :total="list.total"
        :page-size="list.pageSize"
        show-total
        show-sizer
        show-elevator
        @on-change="list.handleSizeChange($event)"
        @on-page-size-change="list.handlePageSizeChange($event)"
        style="margin-top: 10px"
      ></Page>
    </Row>
  </div>
</template>
<script>
import listManage from "@U/listManage";
import filtra from "@C/filtra";
export default {
  props: {
    header: Array,
    handler: Function,
    url: String,
    config: Array,
    listQuery: Object
  },
  components: {
    filtra
  },
  data() {
    return {
      list: new listManage({ pageSize: 10 }, this.url, this.handler)
    };
  },
  methods: {
    selectRow(e) {
      this.$emit("select", e);
    },
    selectionChange(e) {
      this.$emit("selectionChange", e);
    }
  },
  mounted() {},
  created() {
    this.list.setDefaultConfig(this.listQuery);
    this.list.fetchList();
  }
};
</script>