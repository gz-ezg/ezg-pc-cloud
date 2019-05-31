<template>
  <div class="test">
    <div v-for="(item,index) of productList" :key="index">
      <div>
        <h3
          style="display: flex; justify-content: space-between;align-items: center; padding: 5px; margin-top: 10px; background: #f8f8f9;border: 1px solid #dddee1;border-bottom: none"
        >
          <span>{{item.product}}</span>
          <Button
            v-if="pageFlag =='createOrder' || pageFlag =='editOrder'"
            type="error"
            size="small"
            @click="removeItem(index)"
          >删除</Button>
          <Button
            type="error"
            v-if="pageFlag =='showOrder' && (operatorId ==10059 || operatorId == 10182) && item.deleteflag !=5 && orderDetail.orderstatus == 'approval_finish'"
            size="small"
            @click="refundItem(index)"
          >退款</Button>
        </h3>
        <Card>
          <Form label-position="left" ref="formValidate" :rules="ruleValidate">
            <Row>
              <Col span="8">
                <div class="d1">
                  <div v-html="item.propertys"></div>
                  <div>
                    产品价格:
                    <span>{{item.oaprice}}</span>
                  </div>
                  <div v-if="item.iscycle != 'N'">
                    月单价:
                    <span>{{item.unitprice}}</span>
                  </div>

                  <div v-if="!isDisabled && item.defaultdepartalias=='PLAN'">
                    <Button
                      :type="!isPlan[index]?'error':''"
                      size="small"
                      @click="changePayMethod(index)"
                    >定额</Button>
                    <Button
                      :type="isPlan[index]?'error':''"
                      size="small"
                      @click="changePayMethod(index)"
                    >比例</Button>
                  </div>
                  <div v-if="!isDisabled&&!isPlan[index]">
                    <FormItem label="销售金额￥" prop="paynumber">
                      <Input
                        class="input-call"
                        @on-change="computer_paynumber(index)"
                        v-model="item.paynumber"
                        :value="item.paynumber"
                        size="small"
                        style="width:100px"
                        :disabled="isDisabled"
                      ></Input>
                    </FormItem>
                  </div>
                  <div v-if="isDisabled && item.receipt_type !== 'proportion'">
                    <FormItem label="销售金额￥" prop="paynumber">
                      <Input
                        class="input-call"
                        @on-change="computer_paynumber(index)"
                        v-model="item.paynumber"
                        :value="item.paynumber"
                        size="small"
                        style="width:100px"
                        :disabled="isDisabled"
                      ></Input>
                    </FormItem>
                  </div>

                  <div v-if="!isDisabled&&isPlan[index]">
                    <FormItem label="销售比例 " prop="receipt_proportion">
                      <Input
                        class="input-call"
                        @on-change="computer_paynumber(item)"
                        v-model="item.receipt_proportion"
                        :value="item.receipt_proportion"
                        size="small"
                        style="width:100px"
                        :disabled="isDisabled"
                      ></Input>%
                    </FormItem>
                  </div>
                  <div v-if="isDisabled&&item.receipt_type == 'proportion'">
                    <FormItem label="销售比例 " prop="receipt_proportion">
                      <Input
                        class="input-call"
                        @on-change="computer_paynumber(item)"
                        v-model="item.receipt_proportion"
                        :value="item.receipt_proportion"
                        size="small"
                        style="width:100px"
                        :disabled="isDisabled"
                      ></Input>%
                    </FormItem>
                  </div>
                </div>
              </Col>
              <Col span="16">
                <div class="d2">
                  <Row>
                    <Col span="12">
                      <FormItem label="购买数量" prop="productnumber">
                        <!-- 手动处理修改数量后，业务逻辑 其他参照此-->
                        <InputNumber
                          class="input-me"
                          :precision="0"
                          :min="1"
                          @on-change="changeProductNumber(productList[index])"
                          v-model="item.productnumber"
                          number
                          size="small"
                          :disabled="isDisabled"
                          style="width:60px"
                        ></InputNumber>
                      </FormItem>
                    </Col>

                    <Col span="12">
                      <FormItem label="服务部门" prop="departid">
                        <Select
                          v-if="pageFlag =='createOrder' || pageFlag =='editOrder'"
                          style="width:120px"
                          size="small"
                          @on-change="departChange($event, index)"
                          v-model="item.departid"
                          label-in-value
                        >
                          <Option
                            :value="parseInt(departItem.type)"
                            v-for="departItem of JSON.parse(item.servicedeparts)"
                            :key="departItem.departCode"
                          >{{departItem.text}}</Option>
                        </Select>
                        <Input
                          v-if="pageFlag =='showOrder' || pageFlag =='amendOrder'"
                          :disabled="isDisabled"
                          v-model="item.departname"
                          style="width:120px"
                          type="text"
                          size="small"
                        />
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="9">
                      <FormItem
                        
                        style="margin-left: 10px"
                        label=" 服务人员："
                      >
                        <div v-if="pageFlag =='createOrder' || pageFlag =='editOrder'" style="display:inline-block">
                          <Select v-model="item.selectServer">
                            <Option
                              v-for="item in serverList[index]"
                              :key="item.userId"
                              :value="item"
                            >{{item.realname +"【"+item.flag+"】"}}</Option>
                          </Select>
                        </div>
                        <Input
                          v-if="pageFlag =='showOrder' || pageFlag =='amendOrder'"
                          :disabled="isDisabled"
                          v-model="item.realname"
                          style="width:120px"
                          type="text"
                          size="small"
                        />
                      </FormItem>
                    </Col>
                    <Col v-if="item.defaultdepartalias=='PLAN'" span="15">
                      <FormItem label="申报年份" prop="declare_year">
                        <DatePicker
                          type="year"
                          format="yyyy"
                          @on-change="item.declare_year=$event"
                          v-model="item.declare_year"
                          :disabled="isDisabled"
                          placeholder="选择年份"
                          style="margin-left: 10px;display:inline-block;width:200px"
                        ></DatePicker>
                      </FormItem>
                    </Col>
                    <!-- </div> -->
                  </Row>
                  <Row>
                    <Col span="10" v-if="item.iscycle != 'N'">
                      <FormItem label="赠送数量" style="margin-left: 10px">
                        <InputNumber
                          class="input-me"
                          :precision="0"
                          :min="0"
                          :disabled="isDisabled"
                          v-model="item.givethenumber"
                          value="0"
                          size="small"
                          style="width:80px"
                        ></InputNumber>月
                      </FormItem>
                    </Col>
                    <Col v-if="item.iscycle !='N'" span="12">
                      <FormItem label="开始税期" prop="servicestartdate">
                        <DatePicker
                          class="input-me"
                          :disabled="isDisabled"
                          type="month"
                          v-model="item.servicestartdate"
                          placeholder="选择月份"
                          style="width:120px"
                          size="small"
                        ></DatePicker>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="10" v-if="item.iscycle === 'Y' && item.product != '会计到家'">
                      <FormItem label="A 类外勤" prop="type_a_count" style="margin-left: 10px">
                        <InputNumber
                          class="input-me"
                          :precision="0"
                          :min="0"
                          :disabled="isDisabled"
                          v-model="item.type_a_count"
                          size="small"
                          style="width:80px"
                        ></InputNumber>次
                      </FormItem>
                    </Col>
                    <Col span="10" v-if="item.iscycle === 'Y' && item.product != '会计到家'">
                      <FormItem label="B 类外勤" prop="type_b_count">
                        <InputNumber
                          class="input-me"
                          :precision="0"
                          :min="0"
                          :disabled="isDisabled"
                          v-model="item.type_b_count"
                          size="small"
                          style="width:80px"
                        ></InputNumber>次
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormItem label="服务说明：" style="margin-left: 10px">
                        <Input
                          class="input-me"
                          :disabled="isDisabled"
                          v-model="productList[index].memo"
                          type="textarea"
                          size="small"
                          :rows="2"
                          style="width:80%"
                        ></Input>
                      </FormItem>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import * as orderApi from "../../api";
import { DateFormat, DateFormatYearMonth } from "../../../../../libs/utils.js";
export default {
  props: ["productList", "isDisabled", "orderDetail", "pageFlag"],
  inject: ["cancel_order"],
  data() {
    return {
      isPlan: {},
      companyId: "",
      departServerObj: [],
      serverList: [],
      operatorId: localStorage.getItem("id"),
      ruleValidate: {
        productnumber: [
          {
            required: true,
            message: "请输入整数",
            trigger: "blur",
            type: "integer"
          }
        ],
        declare_year: [
          {
            required: true,
            message: ".",
            trigger: "change",
            type: "date"
          }
        ]
      }
    };
  },

  methods: {
    changePayMethod(i) {
      this.isPlan = Object.assign({}, this.isPlan, {
        [i]: !this.isPlan[i]
      });
      if (this.isPlan[i]) {
        this.productList[i].receipt_type = "proportion";
        this.productList[i].paynumber = 0;
      } else {
        this.productList[i].receipt_type = "quota";
        this.productList[i].receipt_proportion = 0;
      }
      this.computer_paynumber();
    },
    //	改变产品数量后自动执行该函数，可以在此函数处理其他值的相关逻辑
    changeProductNumber(item) {
      let _self = this;
      if (!item.unitprice) {
        item.unitprice = item.oaprice;
      }
      item.paynumber = item.productnumber * item.unitprice;
      _self.computer_paynumber();
    },
    //  计算总金额
    computer_paynumber() {
      let _self = this;
      let temp = 0;
      for (let i = 0; i < _self.productList.length; i++) {
        temp = parseFloat(temp) + parseFloat(_self.productList[i].paynumber);
      }
      let paynumber = parseFloat(temp);
      let realnumber = parseFloat(temp);
      this.$bus.emit("SET_PAYNUMBER", {
        paynumber: paynumber,
        realnumber: realnumber
      });
    },
    removeItem(index) {
      this.productList.splice(index, 1);
      this.departChange();
      this.computer_paynumber();
    },
    //针对部门发生改变的回调
    departChange(item, index) {
      let idObj = {};
      let _self = this;

      for (let i = 0; i < _self.productList.length; i++) {
        let param = {};
        let row = _self.productList[i];

        let departs = JSON.parse(row.servicedeparts);

        for (let k = 0; k < departs.length; k++) {
          if (departs[k].type == row.departid) {
            row.departname = departs[k].text;
          }
        }
        param.departId = row.departid;
        param.departName = row.departname;
        param.productSkuId = row.skuid;
        if (idObj[row.departid]) {
          var skuFlag = true;
          var skuArray = (idObj[row.departid].productSkuId + "").split(",");
          for (var j = 0; j < skuArray.length; j++) {
            if (skuArray[j] == row.skuid) {
              skuFlag = false;
            }
          }
          if (skuFlag) {
            idObj[row.departid].productSkuId =
              idObj[row.departid].productSkuId + "," + row.skuid;
          }
        } else {
          idObj[row.departid] = param;
        }
      }
      if (item) {
        this.changeServerPerson(item, index);
      }
      // this.$bus.emit("DEPART_CHANGE_" + this.pageFlag, idObj);
    },
    changeServerPerson(item, index) {
      let url = `api/product/server/list`;
      let config;
      if (!item) {
        let product = this.productList[index];
        config = {
          params: {
            productSkuId: product.skuid,
            serviceDepartId: product.departid,
            companyId: this.companyId
          }
        };
      } else {
        config = {
          params: {
            productSkuId: this.productList[index].skuid,
            serviceDepartId: item.value,
            companyId: this.companyId
          }
        };
      }
      let success = res => {
        this.serverList.splice(index, 1, res.data.data);
      };
      function fail() {}
      this.$Get(url, config, success);
    },
    refundItem(index) {
      let _self = this;
      this.$Modal.confirm({
        title: "您确定要对该订单项退款吗",
        content: _self.productList[index].propertys,
        onOk: () => {
          _self.$bus.$emit("CANCEL_ORDER", {
            id: _self.orderDetail.id,
            itemid: _self.productList[index].itemid
          });
        },
        onCancel: () => {}
      });
    }
  },
  created() {
    let _self = this;
    this.productList.forEach(e => {
      if (e.defaultdepartalias == "PLAN") {
        e.receipt_type = "quota";
      }
    });
    console.log(_self.productList);

    this.$bus.off("ADD_PRODUCT_DETAIL_LIST", true);
    this.$bus.on("ADD_PRODUCT_DETAIL_LIST", e => {
      e.givethenumber = 0;
      if (e.departid) {
        e.departid = parseInt(e.departid);
      }
      if (e.defaultdepartalias == "PLAN") {
        e.receipt_type = "quota";
      }
      _self.productList.push(e);
      _self.departChange();
      _self.computer_paynumber();
      _self.changeServerPerson("", _self.productList.length - 1);
    });
    this.$bus.on("OPEN_ORDER_PRODUCT_LIST", e => {
      _self.companyId = e;
    });
  }
};
</script>

<style>
.test .ivu-form-item {
  margin-bottom: 2px;
}
.test .ivu-form-item-label {
  padding: 10px 2px;
}
.d1 {
  border-right: 1px solid #dddee1;
}
.d2 {
  margin-left: 10px;
}
.input-call :nth-last-child(1) {
  color: red !important;
  font-weight: 700;
  font-size: 14px;
}
.ivu-input[disabled],
fieldset[disabled] .ivu-input {
  background-color: white;
  opacity: 1;
  cursor: not-allowed;
  color: #666;
}
.ivu-input-number-disabled .ivu-input-number-input {
  opacity: 1;
  cursor: not-allowed;
  background-color: white;
}
.ivu-input-number-input[disabled] {
  color: #666;
}
</style>
