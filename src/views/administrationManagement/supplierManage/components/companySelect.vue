<template>
  <div>
    <Modal v-model="openSelectCompany" title="选择产品" width="80%">
      <Row :gutter="16">
        <Col span="8">
          <Input v-model="product" placeholder="输入产品名称搜索" @on-enter="get_data">
            <Button slot="append" icon="ios-search" @click="get_data"></Button>
          </Input>
        </Col>
      </Row>
      <Table
        style="margin-top: 10px"
        border
        highlight-row
        :loading="loading"
        size="small"
        ref="selection"
        :columns="header"
        :data="productData"
        @on-row-dblclick="row_select"
      ></Table>
      <Page
        size="small"
        :total="total"
        :current.sync="page"
        show-total
        show-elevator
        @on-change="pageChange"
        style="margin-top: 10px"
      ></Page>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "selectName",
  data() {
    return {
      openSelectCompany: false,
      searchCompany: "",
      productData: [],
      header: [
        {
          type: "index"
        },
        {
          title: "产品名称",
          key: "product",
          minWidth: 150
        }
      ],
      total: 0,
      page: 1,
      pageSize: 10,
      loading: false,
      gds_map: new Map([
        ["wbd", "未报道"],
        ["ybd", "已报道"],
        ["bybd", "不用报道"]
      ])
    };
  },
  methods: {
    get_data() {
      let _self = this;
      let url = `api/product/list`;
      _self.loading = true;
      let config = {
        params: {
          page: _self.page,
          pageSize: _self.pageSize,
          product: _self.product,
          productType: "gyscp"
        }
      };

      function success(res) {
        _self.productData = res.data.data.rows;
        _self.total = res.data.data.total;
        _self.loading = false;
      }

      this.$Get(url, config, success);
    },
    pageChange(e) {
      this.page = e;
      this.get_data();
    },
    row_select(e) {
      // console.log(e)
      this.$emit("company-change", e);
      this.openSelectCompany = false;
    //   this.$store.commit("orderList/getCompanyId", e.id);
    }
  },
  created() {
    let _self = this;
    this.$bus.off("ORDER_OPEN_SELECT_COMPANY", true);
    this.$bus.on("ORDER_OPEN_SELECT_COMPANY", e => {
      _self.get_data();
      _self.openSelectCompany = true;
    });
    this.$bus.off("ORDER_EDIE_SELECT_COMPANY", true);
    this.$bus.on("ORDER_EDIE_SELECT_COMPANY", e => {
      console.log(555)
      _self.get_data();
      _self.openSelectCompany = true;
    });
  }
};
</script>
