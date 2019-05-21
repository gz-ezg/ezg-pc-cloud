<template>
    <div>
        <Modal
            title="变更市场人员"
            v-model="openChangeMarket"
            width="600"
        >
            <Form :label-width="100">
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem prop="NAME" label="客户名称：">
                            <Input type="text" v-model="customerDetail.NAME" readonly size="small">
                            </Input>
                        </FormItem> 
                    </Col>
                    <Col span="12">
                        <FormItem prop="followbyname" label="原市场人员：">
                            <Input type="text" v-model="customerDetail.followbyname" readonly size="small"></Input>                      
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem prop="newFollowName" label="新市场人员：">
                            <Input type="text" v-model="newFollowName" readonly size="small"></Input>                      
                        </FormItem> 
                    </Col>
                </Row>
                <Row>
                    <Row :gutter="16">
                        <Col span="10">
                            <Input v-model="realname" placeholder="输入市场人员名称搜索" @on-enter="get_data" >
                                <Button name="marketingManagement_index_change_search" slot="append" icon="ios-search" @click="get_data">搜索</Button>
                            </Input>
                        </Col>
                        <Col span="14" style="line-height:32px"><span>温馨提示：双击下方列表选择需要变更的市场人员</span></Col>
                    </Row>
                    <Table
                        style="margin-top: 10px"
                        highlight-row
                        :columns="header"
                        @on-row-dblclick="row_select_market"
                        :loading="loading"
                        :data="data"></Table>
                    <Page
                        size="small"
                        :total="total"
                        show-total
                        show-elevator
                        :current.sync = "page"
                        @on-change="page_change"
                        style="margin-top: 10px">
                    </Page>
                </Row>
            </Form>
            <div slot="footer">
                <Button name="marketingManagement_index_change_change" type="primary" @click="change_submit" :loading="submit_loading">变更</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
      // 组件控制相关
      openChangeMarket: false,
      // 变更人员具体相关
      customerDetail: {
          NAME: "",
          ID: "",
          followbyname: ""
      },
        newFollowName: "",
        newFollowId: "",
      submit_loading: false,
      // 选择市场人员相关
      loading: false,
      realname: "",
      page: 1,
      total: 0,
      header: [
        {
          title: "市场人员",
          key: "realname",
          minWidth: 200
        },
        {
          title: "所属部门",
          key: "GROUP_CONCAT(td.departname)",
          minWidth: 250
        }
      ],
      data: []
    };
  },
  methods: {
    change_submit() {
      let _self = this;
      _self.submit_loading = true;
      let url = `api/customer/shift`;
      let config = {
        customerId: _self.customerDetail.ID,
        userId: _self.newFollowId
      };

      function success(res) {
        _self.submit_loading = false;
        _self.open_change_market = false;
        _self.newFollowByName = "";
        _self.newFollowById = "";
        _self.$bus.emit("UPDATE_CUSTOMER", true);
          _self.openChangeMarket = false
      }

      function fail(res) {
        _self.submit_loading = false;
      }

      this.$Post(url, config, success, fail);
    },
    get_data() {
      let _self = this;
      _self.loading = true;
      let url = `api/user/saler/list`;
      let config = {
        params: {
          page: _self.page,
          pageSize: 10,
          realname: _self.realname
        }
      };

      function success(res) {
        _self.data = res.data.data.rows;
        _self.total = res.data.data.total;
        _self.loading = false;
      }

      function fail(res) {
        _self.loading = false;
      }

      this.$Get(url, config, success, fail);
    },
    page_change(e) {
      this.page = e;
      this.get_data();
    },
    row_select_market(e) {
      this.newFollowId = e.id;
      this.newFollowName = e.realname;
    }
  },
  created() {
    let _self = this;
    this.$bus.off("CUSTOMER_CHANGE_MARKETER", true)
    this.$bus.on("CUSTOMER_CHANGE_MARKETER", e => {
      _self.customerDetail = e
      _self.get_data();
      _self.openChangeMarket = true
    });
  }
};
</script>
