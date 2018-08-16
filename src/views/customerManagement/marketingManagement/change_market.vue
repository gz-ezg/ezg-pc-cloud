<template>
    <div>
        <Modal
            title="变更市场人员"
            v-model="open_change_market"
            width="600"
        >
            <Form ref="changeModel" :model="changeModel" :label-width="100">
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem prop="name" label="客户名称：">
                            <Input type="text" v-model="name" readonly size="small">
                            </Input>
                        </FormItem> 
                    </Col>
                    <Col span="12">
                        <FormItem prop="oldFollowByName" label="原市场人员：">
                            <Input type="text" v-model="oldFollowByName" readonly size="small"></Input>                      
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem prop="newFollowByName" label="新市场人员：">
                            <Input type="text" v-model="changeModel.newFollowByName" readonly size="small"></Input>                      
                        </FormItem> 
                    </Col>
                </Row>
                <Row>
                    <Row :gutter="16">
                        <Col span="10">
                            <Input v-model="realname" placeholder="输入市场人员名称搜索" @on-enter="getData" >
                                <Button name="marketingManagement_index_change_search" slot="append" icon="ios-search" @click="getData">搜索</Button>
                            </Input>
                        </Col>
                        <Col span="14" style="line-height:32px"><span>温馨提示：双击下方列表选择需要变更的市场人员</span></Col>
                    </Row>
                    <Table
                        style="margin-top: 10px"
                        highlight-row
                        :columns="market_header"
                        @on-row-dblclick="rowSelectMarket"
                        :loading="Loading"
                        :data="market_data"></Table>
                    <Page
                        size="small"
                        :total="total"
                        show-total
                        show-elevator
                        @on-change="pageChange"
                        style="margin-top: 10px">
                    </Page>
                </Row>
            </Form>
            <div slot="footer">
                <Button name="marketingManagement_index_change_change" type="primary" @click="change_submit" :loading="submit_loading">变更</Button>
                <!-- <Button type="ghost" @click="deal_complaint=false">关闭</Button> -->
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
      // 组件控制相关
      open_change_market: false,
      // 变更人员具体相关
      customerId: "",
      name: "",
      oldFollowByName: "",
      changeModel: {
        newFollowByName: "",
        newFollowById: ""
      },
      submit_loading: false,
      // 选择市场人员相关
      Loading: false,
      realname: "",
      page: 1,
      total: new Number(),
      market_header: [
        {
          title: "市场人员",
          key: "realname",
          width: 200
        },
        {
          title: "所属部门",
          key: "GROUP_CONCAT(td.departname)",
          width: 250
        }
      ],
      market_data: []
    };
  },
  methods: {
    change_submit() {
      let _self = this;
      _self.$ButtonCollect("marketingManagement_index_change_change");
      _self.submit_loading = true;
      let url = `api/customer/shift`;
      let config = {
        customerId: _self.customerId,
        userId: _self.changeModel.newFollowById
      };

      function success(res) {
        _self.submit_loading = false;
        _self.open_change_market = false;
        _self.changeModel.newFollowByName = "";
        _self.changeModel.newFollowById = "";
        _self.$emit("update", true);
      }

      function fail(res) {
        _self.submit_loading = false;
      }

      this.$Post(url, config, success, fail);
    },
    getData() {
      let _self = this;
      _self.$ButtonCollect("marketingManagement_index_change_search");
      _self.Loading = true;
      let url = `api/user/saler/list`;
      let config = {
        params: {
          page: _self.page,
          pageSize: 10,
          realname: _self.realname
        }
      };

      function success(res) {
        _self.market_data = res.data.data.rows;
        _self.total = res.data.data.total;
        _self.Loading = false;
      }

      function fail(res) {
        _self.Loading = false;
      }

      this.$Get(url, config, success, fail);
    },
    pageChange(e) {
      this.page = e;
      this.getData();
    },
    rowSelectMarket(e) {
      this.changeModel.newFollowById = e.id;
      this.changeModel.newFollowByName = e.realname;
    }
  },
  created() {
    let _self = this;
    this.$bus.on("customerM_change_market", e => {
      // console.log(e)
      _self.customerId = e[0];
      _self.name = e[1];
      _self.oldFollowByName = e[2];
      _self.open_change_market = true;
      _self.getData();
    });
  }
};
</script>
