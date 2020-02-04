<template>
  <div>
    <Modal
      title="编辑"
      v-model="openEditOrderDetail"
      width="50"
      @on-visible-change="modal_status_change"
    >
      <Row>
        <Col span="10">
          <Form ref="orderDetail" :model="orderDetail" :label-width="100" :rules="orderDetailRule">
            <Row span="12">
              <Col>
                <FormItem label="供应商" prop="supplierName">
                  <Input size="small" v-model="orderDetail.supplierName" />
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="联系人" prop="contactName">
                  <Input size="small" v-model="orderDetail.contactName" />
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="电话" prop="tel">
                  <Input size="small" v-model="orderDetail.tel" />
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="结算账号" prop="settlementAccount">
                  <Input size="small" v-model="orderDetail.settlementAccount" />
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="产品" prop="product">
                  <Input size="small" v-model="orderDetail.product" readonly />
                   <!-- @on-focus="open_company" -->
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="结算价" prop="settlementPrice">
                  <Input size="small" v-model="orderDetail.settlementPrice" />
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="销售价" prop="salesPrice">
                  <Input size="small" v-model="orderDetail.salesPrice" />
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
                  >></Input>
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="状态" prop="status">
                  <RadioGroup v-model="orderDetail.status" size="large">
                    <Radio label="Y">启用</Radio>
                    <Radio label="N">禁用</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row></Row>
      <div slot="footer">
        <Button type="primary" @click="edit" name="order_edit">编辑</Button>
        <Button type="ghost" @click="openEditOrderDetail = false">关闭</Button>
      </div>
    </Modal>
    <service-item @close="close_item" v-if="openServiceItem" :id="orderDetail.companyid"></service-item>
    <ab-order-change @aborder-change="setting_aborder" :id="orderDetail.companyid"></ab-order-change>
    <relate-order :id="orderId" :pageFlag="pageFlag"></relate-order>
  </div>
</template>

<script>
import relateOrder from '../relateOrder';
import abOrderChange from '../abOrderChange';
import serviceItem from '../accountHomeTree';
import commonSetting from './comonSetting.js';
import companySelect from "../companySelect";

import { DateFormat } from '../../../../../libs/utils.js';
import * as orderApi from '../../api';
import productDetailList from './productDetailList';
import { constants } from 'crypto';

export default {
  mixins: [commonSetting],
  components: {
    serviceItem,
    abOrderChange,
    productDetailList,
    relateOrder
  },

  data() {
    return {
       orderDetailRule: {
        supplierName: [
          { required: true, message: "请填写供应商", trigger: "change" }
        ],
        productId: [
          { required: true, message: "请填写产品", trigger: "change" }
        ],
        settlementPrice: [
          { required: true, message: "请填写结算价", trigger: "change" }
        ],
        salesPrice: [
          { required: true, message: "请填写销售价", trigger: "change" }
        ]
      },
      isDisabled: false,
      applyId: '',
      orderId: '',
      unusualCode: '',
      openEditOrderDetail: false,
      loading: false,
      openServiceItem: false,
      pageFlag: 'editOrder',
      departServerObj: [],
      id:'',
      departChangeCountFlag: 0,
      product_id:'',
    };
  },
  methods: {
    //  选择公司后回调
    setting_company(e) {
      console.log(e.id);
      this.id = e.id
      this.orderDetail.product = e.product;
      console.log(this.orderDetail.product)
      // this.orderDetail.name = e.customerName;
      // this.orderDetail.tel = e.customerTel;
      // this.orderDetail.gdsreport = e.gdsreport;
      // this.orderDetail.companyid = e.id;
      // this.orderDetail.customerid = e.customerId;
    },
     //  打开公司选择
    open_company() {
      this.$bus.emit("ORDER_EDIE_SELECT_COMPANY", true);
    },
    //关联异常工单
    relate() {
      let _self = this;
      let url = `api/order/unusual/workorder/linkUnusualWorkOrder`;
      let config = {
        applyId: _self.applyId,
        orderId: _self.orderId
      };
      function success(res) {
        console.log(res);
      }
      function fail() {}
      _self.$Post(url, config, success, fail);
      _self.orderId = '';
      _self.applyId = '';
      _self.orderCode = '';
    },
    //打开对应的异常工单列表
    open_abOrder() {
      this.$bus.emit('CHANGE_ABORDER', true);
    },
    open_relateOrder() {
      this.$bus.emit('RELATE_ABORDER_' + this.pageFlag);
    },
    //  选择对应异常工单后回调
    setting_aborder(e) {
      this.applyId = e.id;
      // this.orderCode = e.unusual_code
      this.unusualCode = e.unusual_code;
    },
    //获取异常工单号
    get_ab_worker_id() {
      let _self = this;
      let url = `api/order/unusual/workorder/findUnusualWorkOrderByOrderId`;
      let config = {
        params: {
          orderId: this.orderId
        }
      };
      function success(res) {
        console.log(res.data.data);
        _self.unusualCode = '';
        if (res.data.data) {
          if (res.data.data.unusual_code) {
            _self.unusualCode = res.data.data.unusual_code;
          }
          if (res.data.data.id) {
            _self.applyId = res.data.data.id;
          }
        }
      }
      this.$Get(url, config, success);
    },
    open_service_item() {
      this.openServiceItem = true;
    },
    close_item() {
      this.openServiceItem = false;
      this.departServerObj = [];
    },
    edit() {
      let _self = this
            let url = `api/product/supplier/update`
            _self.loading = true
            let config = {
                    id:_self.id,
                    supplierName : _self.orderDetail.supplierName,
                    contactName : _self.orderDetail.contactName,
                    tel : _self.orderDetail.tel,
                    settlementAccount : _self.orderDetail.settlementAccount,
                    productId:_self.product_id,
                    settlementPrice : _self.orderDetail.settlementPrice,
                    salesPrice :_self.orderDetail.salesPrice,
                    remark : _self.orderDetail.remark,
                    status : _self.orderDetail.status
            }
            function success(res){
              console.log(res)
                _self.loading = false
                _self.orderDetail = []
                _self.openEditOrderDetail = false;
                _self.$emit("get_data")
            }

            this.$Post(url, config, success)
  }
},
  created() {
    // let _self = this;
    this.$bus.off('OPEN_ORDERLIST_EDIT', true);
    this.$bus.on('OPEN_ORDERLIST_EDIT', e => {
      console.log(e)
      this.id = e.id;
      this.product_id = e.product_id
      this.orderDetail.supplierName = e.supplier_name;
      this.orderDetail.contactName = e.contact_name;
      this.orderDetail.tel = e.tel;
      this.orderDetail.settlementAccount = e.settlement_account;
      this.orderDetail.product = e.product;
      this.orderDetail.settlementPrice = e.settlement_price;
      this.orderDetail.salesPrice = e.sales_price;
      this.orderDetail.remark = e.remark;
      this.orderDetail.status = e.status;
      this.openEditOrderDetail = true;
    });
  }
}
</script>

<style>
#orderItem .ivu-input {
  border: 0px solid #dddee1;
}
#orderItem .ivu-select-selection {
  border: 0px solid #dddee1;
}
</style>
