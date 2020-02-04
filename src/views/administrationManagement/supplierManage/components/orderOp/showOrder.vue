<template>
  <div>
    <Modal
      v-model="openShowOrderDetail"
      title="查看供应商"
      :mask-closable="false"
      width="50"
      @on-visible-change="modal_status_change"
    >
      <Row>
        <Col span="10">
          <Form ref="orderDetail" :model="orderDetail" :label-width="100" :rules="orderDetailRule">
            <Row span="12">
              <Col>
                <FormItem label="供应商" prop="supplierName">
                  <Input
                    size="small"
                    v-model="orderDetail.supplierName"
                    readonly
                    value="orderDetail.supplierName"
                  />
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="联系人" prop="contactName">
                  <Input size="small" v-model="orderDetail.contactName" readonly />
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="电话" prop="tel">
                  <Input size="small" v-model="orderDetail.tel" readonly />
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="结算账号" prop="settlementAccount">
                  <Input size="small" v-model="orderDetail.settlementAccount" readonly />
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="产品" prop="product">
                  <Input size="small" v-model="orderDetail.product" readonly />
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="结算价" prop="settlementPrice">
                  <Input size="small" v-model="orderDetail.settlementPrice" readonly />
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="销售价" prop="salesPrice">
                  <Input size="small" v-model="orderDetail.salesPrice" readonly />
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="说明" prop="remark">
                  <Input
                    v-model="orderDetail.remark"
                    type="textarea"
                    :autosize="{minRows: 2,maxRows: 5}"
                    size="small"
                    readonly
                  >></Input>
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="状态" prop="status">
                  <RadioGroup v-model="orderDetail.status" size="large">
                    <Radio label="Y" disabled>启用</Radio>
                    <Radio label="N" disabled>禁用</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <div slot="footer">
        <Button @click="openShowOrderDetail = false">关闭</Button>
      </div>
    </Modal>
    <service-item
      @close="close_item"
      v-if="openServiceItem"
      :id="orderDetail.companyid"
      :readonly="false"
    ></service-item>
    <relate-order :id="orderId" :pageFlag="pageFlag"></relate-order>
  </div>
</template>


<script>
import relateOrder from "../relateOrder";
import serviceItem from "../accountHomeTree";
import commonSetting from "./comonSetting.js";
import * as orderApi from "../../api";
import productDetailList from "./productDetailList";
import { simpleCodeToText } from "../../../../../libs/utils.js";

export default {
  mixins: [commonSetting],
  inject: ["simpleCodeToText"],
  components: {
    serviceItem,
    relateOrder,
    productDetailList
  },
  watch: {},
  data() {
    return {
      pageFlag: "showOrder",
      isDisabled: true,
      unusualCode: "",
      orderId: "",
      openServiceItem: false,
      openShowOrderDetail: false
    };
  },
  methods: {

  },
  created() {
    let _self = this;
    this.$bus.off("OPEN_ORDERLIST_DETAIL", true);
    this.$bus.on("OPEN_ORDERLIST_DETAIL", e => {
      console.log(e);
      this.orderDetail.supplierName = e.supplier_name;
      this.orderDetail.contactName = e.contact_name;
      this.orderDetail.tel = e.tel;
      this.orderDetail.settlementAccount = e.settlement_account;
      this.orderDetail.product = e.product;
      this.orderDetail.settlementPrice = e.settlement_price;
      this.orderDetail.salesPrice = e.sales_price;
      this.orderDetail.remark = e.remark;
      this.orderDetail.status = e.status;
      this.openShowOrderDetail = true;
    });

    // this.$bus.on("CANCEL_ORDER", e => {
    //   console.log(e);
    //   _self.cancel_order(e.id, e.itemid);
    // });
  }
};
</script>

<style>
#show-order-item textarea.ivu-input {
  border: 0px;
  overflow-y: hidden;
  background-color: rgba(0, 0, 0, 0);
}

.demo-table-refund-row {
  color: red;
}
.all {
  overflow-y: true;
  overflow: auto;
  height: 400px;
}
</style>
