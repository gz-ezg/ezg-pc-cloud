<template>
  <div>
    <filtra v-if="config" @search="list.search($event)" @reset="list.reset()" :config="config"></filtra>
    <slot></slot>
    <Row style="margin-top: 10px;">
      <Table
        highlight-row
        border
        size="small"
        @on-row-click="selectRow"
        :loading="list.loading"
        :columns="header"
        :data="list.data"
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
import listManage from '@U/listManage';
import filtra from '@C/filtra';
export default {
  props: {
    header: Object,
    handler: Function,
    url: String,
    config: Object,
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
      this.$emit('select', e);
    }
  },
  mounted() {},
  created() {
    this.list.setDefaultConfig(this.listQuery);
    this.list.fetchList();
  }
};
</script>