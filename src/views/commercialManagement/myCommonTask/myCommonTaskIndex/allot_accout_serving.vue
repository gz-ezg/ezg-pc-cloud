<!--
    页面需要进行改版，
    其实allot的两个页面可以抽成一个，但是因为接口传参的问题，不建议，但是页面的基本逻辑是一致的，抽象出来也是没问题的
    部门人员分配从下拉菜单更改为输入框筛选，双击点击确认
-->
<template>
  <Modal v-model="allot_account_open" title="分配会计" width="300">
    <Form :label-width="90">
      <Row :gutter="16">
        <Col span="1" style="visibility:hidden">1</Col>
        <Col span="20">
          <FormItem prop="departName" label="服务部门：">
            <Select transfer v-model="departId" filterable>
              <Option
                v-for="item in allAreaList"
                :value="item.id"
                :key="item.id"
              >{{ item.realname }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="16" v-if="show">
        <Col span="1" style="visibility:hidden">1</Col>
        <Col span="20">
          <FormItem prop="companyName" label="服务人员">
            <Select transfer v-model="servicerID" filterable>
              <Option
                v-for="item in allDepartUser"
                :value="item.id"
                :key="item.id"
              >{{ item.realname }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <!-- <Row :gutter="16"> 
                    <Col span="1" style="visibility:hidden">1</Col>                                   
                    <Col span="20">
                        <FormItem prop="companyName" label="兼职会计">
                            <Select transfer v-model="jzAccid">
                                <Option value="0">无</Option>
                                <Option v-for="item in jzAcc" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
      </Row>-->
    </Form>
    <div slot="footer">
      <Button type="ghost" @click="allot_account_open=false">关闭</Button>
      <Button type="primary" @click="allotAccount" :loading="loading">分配</Button>
    </div>
  </Modal>
  <!-- 分配会计end -->
</template>

<script>
export default {
  data() {
    return {
      show: true,
      workorderIds: "",
      departName: "",
      ServiceDeptID: "",
      allDepartUser: "",
      allot_account_open: false,
      loading: false,
      servicerID: "",
      allAreaList: []
    };
  },
  methods: {
    getAllUserList() {
      // let url = 'api/user/getUserListByDepartId?departId='+ this.ServiceDeptID
      let url =
        "api/user/getAllUserListByDepartId?departId=" + this.ServiceDeptID;
      // 11572
      let _self = this;
      this.$http.get(url).then(function(res) {
        _self.allDepartUser = res.data.data;
      });
    },
    getAreaList() {
      let url = "api/user/getAllDepartmentListByCode?departCode=ACCOUNT";
      let _self = this;
      this.$http.get(url).then(function(res) {
        _self.allAreaList = res.data.data;
      });
    },
    allotAccount() {
      let _self = this;
      let url = "api/order/work/order/share";
      _self.loading = true;
      let _data = {
        workOrderIds: _self.workorderIds,
        userId: _self.servicerID,
        managerId: _self.servicerID
      };

      function success() {
        _self.show = false;
        _self.workorderIds = "";
        _self.servicerID = "";
        _self.ServiceDeptID = "";
        _self.departName = "";
        _self.allot_account_open = false;
        _self.$bus.emit("update_allot_index1", true);
        _self.loading = false;
      }

      function fail() {
        _self.loading = false;
      }

      this.$Post(url, _data, success, fail);
    }
  },
  created() {
    let _self = this;
    this.$bus.on("global_allot_accountorder", e => {
      _self.show = true;
      _self.ServiceDeptID = e[0];
      _self.departName = e[1];
      _self.workorderIds = e[2];
      _self.getAreaList();
    //   _self.getAllUserList();
      _self.allot_account_open = true;
    });
  }
};
</script>

