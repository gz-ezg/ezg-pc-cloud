<template>
  <div>
    <Modal v-model="fenpei" title="变更会计" width="900">
      <Form ref="task_message" :model="task_message" :label-width="120">
        <Row :gutter="16">
          <Col span="1" style="visibility:hidden">1</Col>
          <Col span="10">
            <FormItem prop="CompanyName" label="归属公司">
              <Input type="text" size="small" v-model="task_message.CompanyName" disabled></Input>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem prop="companyName" label="产品">
              <Input type="text" size="small" v-model="task_message.product" disabled></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="1" style="visibility:hidden">1</Col>
          <Col span="10">
            <FormItem prop="customername" label="归属客户">
              <Input type="text" size="small" v-model="task_message.customername" disabled></Input>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem prop="companyName" label="服务会计">
              <Row>
                <Col span="12" style="padding-right:10px">
                  <Select
                    @on-change="handleSelectDepart"
                    transfer
                    v-model="departId"
                    prefix="ios-home"
                    size="small"
                  >
                    <Option
                      v-for="item in allAreaList"
                      :value="item.departId"
                      :key="item.departId"
                    >{{ item.departName }}</Option>
                  </Select>
                </Col>
                <Col span="12">
                  <Select transfer v-model="accMagid" size="small">
                    <Option
                      v-for="item in accMag"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="1" style="visibility:hidden">1</Col>
          <Col span="10">
            <FormItem prop="c" label="服务备注">
              <Input type="text" size="small" v-model="task_message.workordermemo" disabled></Input>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem prop="remark" label="变更原因">
              <Input type="text" size="small" v-model="remark"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="1" style="visibility:hidden">1</Col>
          <Col span="10">
            <FormItem prop="monthServerChangeFlag">
              <div slot="label">
                <span style="color: red">原会计</span>本月是否服务
              </div>
              <RadioGroup v-model="monthServerChangeFlag" v-on>
                <Radio label="Y">是</Radio>
                <Radio label="N">否</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem prop="remark" label="是否同步变更资料">
              <RadioGroup v-model="isChange" v-on>
                <Radio label="Y">是</Radio>
                <Radio label="N">否</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="change_accout" :loading="button_loading">变更</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Bus from "../../../../components/bus";

export default {
  data() {
    return {
      button_loading: false,
      fenpei: false,
      task_message: {},
      accMagid: "",
      jzAccid: "",
      accMag: [],
      departId: "",
      allAreaList: [],
      jzAcc: [],
      remark: "",
      monthServerChangeFlag: "N",
      isChange: "Y"
    };
  },
  methods: {
    getData() {
      let _self = this;
      let url = "/user/getUserListByDepartId?departId=" + _self.departId;

      function doSuccess(res) {
        _self.accMagid = "";
        let _data = res.data.data;
        _self.accMag = [];

        for (let i = 0; i < _data.length; i++) {
          _self.accMag.push({
            value: _data[i].id,
            label: _data[i].realname,
            link: _data[i].links
          });
        }
      }

      this.GetData(url, doSuccess);
    },
    handleSelectDepart(e) {
      this.getData();
    },
    getAreaList() {
      let url = "api/user/getAllDepartmentListByCode?departCode=ACCOUNT";
      let _self = this;
      this.$http.get(url).then(function(res) {
        _self.allAreaList = res.data.data;
      });
    },
    change_accout() {
      let _self = this;
      if (!_self.remark) {
        _self.$Message.warning("请填写变更原因！");
      } else {
        _self.button_loading = true;
        // let url = '/order/batchUpdateServicer'
        let url = "api/order/work/order/cycle/share";
        let _data = {
          workOrderIds: _self.task_message.cycle_work_order_id,
          userId: _self.jzAccid,
          managerId: _self.accMagid,
          remark: _self.remark,
          monthServerChangeFlag: _self.monthServerChangeFlag,
          isChange: _self.isChange
        };

        if (_self.jzAccid != "" && _self.jzAccid != 0) {
          _data.userId = _self.jzAccid;
        } else {
          _data.userId = _self.accMagid;
        }

        function doSuccess(res) {
          Bus.$emit("UPDATE_ALL_ACCOUNT_PAGE", true);
          _self.button_loading = false;
          _self.fenpei = false;
        }

        function fail(err) {
          _self.button_loading = false;
        }

        _self.$Post(url, _data, doSuccess);
        // this.PostData(url, _data, doSuccess)
      }
    }
  },
  created() {
    var _self = this;
    Bus.$on("fenpei", e => {
      _self.jzAccid = "";
      _self.accMagid = "";
      _self.remark = "";
      console.log(e);
      _self.fenpei = true;
      _self.task_message = e;
      _self.departId = _self.task_message.service_depart_id;
      // _self.task_message.workordermemo = e.memo
      // _self.task_message.followby_realname = e.followbyrealname
      if (Array.isArray(_self.task_message.CompanyName)) {
        _self.task_message.CompanyName = _self.task_message.CompanyName[0].name;
      }
      // if(e.companyname !=""){
      //     _self.task_message.CompanyName = e.companyname
      // }
      // _self.task_message.CompanyName = _self.task_message.CompanyName[0]
      _self.getAreaList();
      _self.getData();
    });
  }
};
</script>
