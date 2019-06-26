<template>
  <div>
    <Modal v-model="openTag" width="600" title="选择客户" id="top">
      <div style="display:flex; width:300px;margin-top:10px">
        <Input placeholder="请输入客户名" v-model="customerName" size="small" />
        <Button icon="search" style="margin-left:10px;" size="small" @click="search">搜索</Button>
      </div>

      <Table border ref="selection" :columns="header" :data="data" @on-row-dblclick="select_change"></Table>
      <Page
        size="small"
        :total="total"
        :current.sync="page"
        show-total
        show-elevator
        @on-change="page_change"
        style="margin-top: 10px"
      ></Page>
      <div slot="footer">
        <Button type="primary" @click="openTag = false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openTag: false,
      header: [
        {
          title: '客户名',
          key: 'NAME'
        },
        {
          title: '公司名',
          key: 'companynames'
        }
      ],
      data: [],
      total: 0,
      page: 1,
      pageSize: 5,
      point: null,
      customerName: ''
    };
  },
  methods: {
    search() {
      this.page = 1;
      this.get_data();
    },
    select_change(all, row) {
      this.form.recCustomer = all.NAME;
      this.form.recCustomerId = all.ID;
      this.openTag = false;
    },
    page_change(e) {
      this.page = e;
      this.get_data();
    },
    get_data() {
      let _self = this;
      let url = `api/customer/list`;

      let config = {
        params: {
          page: _self.page,
          pageSize: 5,
          name: _self.customerName
        }
      };

      function success(res) {
        _self.total = res.data.data.total;
        _self.data = res.data.data.rows;
      }
      this.$Get(url, config, success);
    }
  },
  created() {
    let _self = this;
    this.$bus.on('OPEN_CUSTOMER', e => {
      _self.page = 1;
      _self.form = e;
      console.log(e);
      _self.get_data();
      _self.openTag = true;
    });
  }
};
</script>

<style>
#top .ivu-modal-mask {
  z-index: 9999;
}
#top .ivu-modal-wrap {
  z-index: 9999;
}
</style>


