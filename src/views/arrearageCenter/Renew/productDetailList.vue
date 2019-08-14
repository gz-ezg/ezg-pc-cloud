<template>
  <div class="test">
    <div>
      <h3
        style="display: flex; justify-content: space-between;align-items: center; padding: 5px; margin-top: 10px; background: #f8f8f9;border: 1px solid #dddee1;border-bottom: none"
      >
        <span>{{ product.product }}</span>
        <Button type="error" size="small" @click="onGreat(index)">升级</Button>
      </h3>
      <Card>
        <Form label-position="left" ref="formValidate" :rules="ruleValidate">
          <Row>
            <Col span="8">
              <div class="d1">
                <div v-html="product.propertys"></div>
                <div>
                  产品价格:
                  <span>{{ product.oaprice }}</span>
                </div>
                <div v-if="product.iscycle != 'N'">
                  月单价:
                  <span>{{ product.unitprice }}</span>
                </div>

                <div v-if="product.defaultdepartalias == 'PLAN'">
                  <Button :type="isPlan ? 'error' : ''" size="small" @click="changePayMethod(index)">定额</Button>
                  <Button :type="isPlan ? 'error' : ''" size="small" @click="changePayMethod(index)">比例</Button>
                </div>
                <div v-if="!isPlan">
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

                <div v-if="!isDisabled && isPlan[index]">
                  <FormItem label="销售比例 " prop="receipt_proportion">
                    <Input
                      class="input-call"
                      @on-change="computer_paynumber(item)"
                      v-model="item.receipt_proportion"
                      :value="item.receipt_proportion"
                      size="small"
                      style="width:100px"
                      :disabled="isDisabled"
                    ></Input
                    >%
                  </FormItem>
                </div>
                <div v-if="isDisabled && item.receipt_type == 'proportion'">
                  <FormItem label="销售比例 " prop="receipt_proportion">
                    <Input
                      class="input-call"
                      @on-change="computer_paynumber(item)"
                      v-model="item.receipt_proportion"
                      :value="item.receipt_proportion"
                      size="small"
                      style="width:100px"
                      :disabled="isDisabled"
                    ></Input
                    >%
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
                        v-if="pageFlag == 'createOrder' || pageFlag == 'editOrder'"
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
                          >{{ departItem.text }}</Option
                        >
                      </Select>
                      <Input
                        v-if="pageFlag == 'showOrder' || pageFlag == 'amendOrder'"
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
                  <Col span="12">
                    <FormItem style="margin-left: 10px" label=" 服务人员：">
                      <div v-if="pageFlag == 'createOrder' || pageFlag == 'editOrder'" style="display:inline-block">
                        <Select v-model="item.selectServer">
                          <Option v-for="item in serverList[index]" :key="item.userId" :value="item">{{
                            item.realname + '【' + item.flag + '】'
                          }}</Option>
                        </Select>
                      </div>
                      <Input v-model="item.realname" style="width:140px" type="text" size="small" />
                    </FormItem>
                  </Col>
                  <Col v-if="item.defaultdepartalias == 'PLAN'" span="12">
                    <FormItem label="申报年份" prop="declare_year">
                      <DatePicker
                        type="year"
                        format="yyyy"
                        @on-change="item.declare_year = $event"
                        v-model="item.declare_year"
                        :disabled="isDisabled"
                        placeholder="选择年份"
                        style="margin-left: 10px;display:inline-block;width:200px"
                      ></DatePicker>
                    </FormItem>
                  </Col>
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
                      ></InputNumber
                      >月
                    </FormItem>
                  </Col>
                  <Col v-if="item.iscycle != 'N'" span="12">
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
                        :disabled="isDisabled"
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
</template>

<script>
export default {
  data() {
    return {
      isPlan: false
    };
  },
  methods: {
    onGreat() {}
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
