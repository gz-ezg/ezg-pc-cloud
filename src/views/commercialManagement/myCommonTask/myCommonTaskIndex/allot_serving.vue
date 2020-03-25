<template>
  <Modal title="一键分配工单" width="300" v-model="common_allot_open">
    <Form :label-width="90">
      <Row :gutter="16">
        <Col span="1" style="visibility:hidden">1</Col>
        <Col span="20">
          <FormItem prop="departName" label="服务部门：">
            <Select @on-change="handleSelectDepart" transfer v-model="departId" filterable>
              <Option
                v-for="item in allAreaList"
                :value="item.departId"
                :key="item.departId"
              >{{ item.departName }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="16" v-if="show">
        <Col span="1" style="visibility:hidden">1</Col>
        <Col span="20">
          <FormItem label="服务人员：">
            <Select transfer v-model="servicerID" filterable>
              <Option
                v-for="(item,index) in allDepartUser"
                :key="index"
                :value="item.id"
              >{{item.realname}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="ghost" @click="common_allot_open=false">关闭</Button>
      <Button type="primary" @click="allot" :loading="loading">分配</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      common_allot_open: false,
      workorderIds: "",
      departName: "",
      ServiceDeptID: "",
      allDepartUser: [],
      loading: false,
      servicerID: "",
      allAreaList: [],
      departId: ""
    };
  },
  methods: {
    getAllUserList() {
      let url = "api/user/getUserListByDepartId?departId=" + this.departId;
      this.$http.get(url).then(res => {
        this.allDepartUser = res.data.data;
      });
    },
    getAreaList() {
      let url = "api/user/getAllDepartmentListByCode?departCode=BUSSINESS";
      this.$http.get(url).then(res => {
        this.allAreaList = res.data.data;
      });
    },
    handleSelectDepart(e) {
      this.getAllUserList();
    },
    allot() {
      let _self = this;
      _self.loading = true;
      let url = "api/order/batchUpdateServicer";
      let config = {
        workOrderIds: _self.workorderIds,
        userId: _self.servicerID
      };

      function success(res) {
        _self.show = false;
        _self.workorderIds = "";
        _self.departName = "";
        _self.ServiceDeptID = "";
        _self.servicerID = "";
        _self.common_allot_open = false;
        _self.$bus.emit("update_allot_index1", true);
        _self.loading = false;
      }

      function fail(err) {
        _self.loading = false;
      }

      this.$Post(url, config, success, fail);
    }
  },
  created() {
    let _self = this;
    // this.$bus.on('global_allot_commonorder',(e)=>{
    //     console.log("123")
    //     _self.show = true
    //     _self.ServiceDeptID = e[0]
    //     _self.departName = e[1]
    //     _self.workorderIds = e[2]
    //     _self.getAllUserList()
    //     _self.common_allot_open = true
    // })
    this.$bus.on("global_allot_commonorder1", e => {
      console.log("123");
      _self.show = true;
      _self.ServiceDeptID = e[0];
      _self.departId = e[0];
      _self.departName = e[1];
      _self.workorderIds = e[2];
      _self.getAreaList();
      _self.getAllUserList();
      _self.common_allot_open = true;
    });
  }
};
</script>
