<template>
  <div>
    <Modal :value="true" title="选择公司" width="80%">
      <Row :gutter="16">
        <Col span="8">
          <Input v-model="searchCompany" placeholder="输入公司名称搜索" @on-enter="get_data">
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
        :data="data"
        @on-row-dblclick="rowSelect"
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
  data() {
    return {
      searchCompany: '',
      header: [
        {
          title: '企业名称',
          key: 'companyname',
          minWidth: 300
        },
        {
          title: '联系人',
          key: 'customerName',
          minWidth: 150
        },
        {
          title: '联系电话',
          key: 'customerTel',
          minWidth: 150
        }
      ],
      data: [],
      total: 0,
      page: 1,
      pageSize: 10,
      loading: false
    };
  },
  methods: {
    getData() {
      let _self = this;
      let url = `api/customer/company/list`;
      _self.loading = true;
      let config = {
        params: {
          page: _self.page,
          pageSize: 10,
          companyname: _self.searchCompany
        }
      };

      function success(res) {
        _self.data = res.data.data.rows;
        _self.total = res.data.data.total;
        _self.loading = false;
      }

      this.$Get(url, config, success);
    },
    pageChange(e) {
      this.page = e;
      this.get_data();
    },
    rowSelect(e) {
      this.$emit('company-change', e);
      this.$emit('close');
    }
  },
  created() {
    this.getData();
  }
};
</script>
