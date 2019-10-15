<template>
  <div class="test">
    <div v-for="(item, index) of productList" :key="index">
      <div>
        <h3
          style="display: flex; justify-content: space-between;align-items: center; padding: 5px; margin-top: 10px; background: #f8f8f9;border: 1px solid #dddee1;border-bottom: none"
        >
          <span>{{ item.product }}</span>
          <Button  type="error" size="small" @click="removeItem(index)"
          >删除</Button
          >
        </h3>
        <Card>
          <Form label-position="left" ref="formValidate" :rules="ruleValidate">
            <Row>
              <Col span="8">
                <div class="d1">
                  <div v-html="item.propertys"></div>
                  <div>
                    产品价格:
                    <span>{{ item.oaprice }}</span>
                  </div>
                  <div v-if="item.iscycle != 'N'">
                    月单价:
                    <span>{{ item.unitprice }}</span>
                  </div>
                  <div>
                    <FormItem label="销售金额￥" prop="paynumber">
                      <Input
                        class="input-call"
                        @on-change="computerPaynumber(item)"
                        v-model="item.paynumber"
                        :value="item.paynumber"
                        size="small"
                        style="width:100px"
                      ></Input>
                    </FormItem>
                  </div>
                </div>
              </Col>
              <Col span="16">
                <div class="d2">
                  <Row>
                    <Col span="8">
                      <FormItem label="购买数量" prop="productnumber">
                        <InputNumber
                          class="input-me"
                          :precision="0"
                          :min="1"
                          @on-change="changeProductNumber(item)"
                          v-model="item.productnumber"
                          number
                          size="small"
                          style="width:60px"
                        ></InputNumber>
                      </FormItem>
                    </Col>
                    <Col span="16">
                      <div style="line-height: 32px;">
                        服务部门:
                        <span>{{ item.departname }}</span>
                        服务人员:
                        <span>{{ item.realname }}</span>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="10" v-if="item.iscycle != 'N'">
                      <FormItem label="赠送数量" style="margin-left: 10px">
                        <InputNumber
                          class="input-me"
                          :precision="0"
                          :min="0"
                          v-model="item.givethenumber"
                          value="0"
                          size="small"
                          style="width:80px"
                        ></InputNumber
                        >月
                      </FormItem>
                    </Col>
                    <Col v-if="item.iscycle != 'N'" span="12">
                      <FormItem label="开始税期" prop="servicestartdate">
                        <DatePicker
                          class="input-me"
                          disabled
                          readonly
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
                          v-model="item.type_a_count"
                          size="small"
                          style="width:80px"
                        ></InputNumber
                        >次
                      </FormItem>
                    </Col>
                    <Col span="10" v-if="item.iscycle === 'Y' && item.product != '会计到家'">
                      <FormItem label="B 类外勤" prop="type_b_count">
                        <InputNumber
                          class="input-me"
                          :precision="0"
                          :min="0"
                          v-model="item.type_b_count"
                          size="small"
                          style="width:80px"
                        ></InputNumber
                        >次
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormItem label="服务说明：" style="margin-left: 10px">
                        <Input
                          class="input-me"
                          :disabled="isDisabled"
                          v-model="item.memo"
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
  import {deepCopy} from "../../../libs/utils";

  export default {
  props: ['productList'],
  data() {
    return {
      copyList:[],
      ruleValidate: {
        productnumber: [
          {
            required: true,
            message: '请输入整数',
            trigger: 'blur',
            type: 'integer'
          }
        ],
        declare_year: [
          {
            required: true,
            message: '.',
            trigger: 'change',
            type: 'date'
          }
        ]
      }
    };
  },
  methods: {
    changeProductNumber(item) {
      if (!item.unitprice) {
        item.unitprice = item.oaprice;
      }
      item.paynumber = item.productnumber * item.oaprice;
      this.computerPaynumber(item);
    },
    computerPaynumber(item) {
      let temp = 0;
      for (let i = 0; i < this.productList.length; i++) {
        temp = parseFloat(temp) + parseFloat(this.productList[i].paynumber);
      }

      item.unitprice = parseFloat(item.paynumber) / parseFloat(item.productnumber);
      let paynumber = parseFloat(temp);
      let realnumber = parseFloat(temp);
      this.$emit('payNumChange', {
        paynumber: paynumber,
        realnumber: realnumber
      });
    },
    removeItem(index) {
      let _self = this;
      _self.copyList =deepCopy( _self.productList)
      _self.productList.splice(index, 1);
      // for (let i=0;i<_self.productList.length;i++) {
      //   this.changeServerPerson('',i)
      // }
    },
  },
  created() {
    this.$bus.off('ADD_PRODUCT_DETAIL_LIST', true);
    this.$bus.on('ADD_PRODUCT_DETAIL_LIST', e=> {
      console.log(e)
      console.log(this.copyList)
      let b = this.copyList[0]
      let a = {}
      a.areaid = e.areaid
      a.baseprice = e.baseprice
      a.declare_year = b.declare_year
      a.defaultdepartalias = e.defaultdepartalias
      a.deleteflag = b.deleteflag
      a.departid = e.departid
      a.departname = e.departname
      a.givethenumber = b.givethenumber
      a.iscycle = e.iscycle
      a.itemid = b.itemid
      a.memo = ""
      a.oaprice = e.oaprice
      a.paynumber = e.paynumber
      a.plusdeduct = e.plusdeduct
      a.product = e.product
      a.productid = e.productid
      a.productnumber = e.productnumber
      a.propertys = e.propertys
      a.realname = b.realname
      a.receipt_proportion = b.receipt_proportion
      a.receipt_type = b.receipt_type
      a.serverid = b.serverid
      a.servicedeparts = b.servicedeparts
      a.servicestartdate = e.servicestartdate
      a.skuid = e.skuid
      a.type_a_count = e.type_a_count
      a.type_b_count = e.type_b_count
      a.unitprice = e.unitprice
      console.log(a)
      this.productList.push(a)
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
