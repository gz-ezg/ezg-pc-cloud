<template>
  <div>
    <Modal title="新增续费订单" :value="true" width="100" @on-cancel="onClose">
      <Row>
        <Col span="10">
          <Form ref="orderDetail" :model="orderDetail" :label-width="100" :rules="orderDetailRule">
            <Row :gutter="16">
              <Col span="12">
                <FormItem label="归属公司" prop="CompanyName">
                  <Input size="small" v-model="orderDetail.CompanyName" @on-focus="open_company" readonly />
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="归属客户" prop="name">
                  <Input size="small" v-model="orderDetail.name" @on-focus="open_company" readonly />
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="16">
              <Col span="12">
                <FormItem label="缴费时间" prop="payTime">
                  <DatePicker size="small" type="date" style="width: 100%" v-model="orderDetail.payTime"></DatePicker>
                </FormItem>
              </Col>

              <Col span="11">
                <FormItem label="缴费渠道" prop="paydir">
                  <Select transfer v-model="orderDetail.paydir" style="width:100%" size="small">
                    <Option v-for="(item, index) in payDirs" :key="index" :value="item.typecode">{{ item.typename }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>

            <Row :gutter="16">
              <Col span="12">
                <FormItem label="订单总价" prop="paynumber">
                  <Input size="small" v-model="orderDetail.paynumber" number readonly />
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="已付款" prop="realnumber">
                  <Input size="small" v-model="orderDetail.realnumber" number />
                </FormItem>
              </Col>
            </Row>

            <Row :gutter="16">
              <Col span="12">
                <FormItem label="是否提供发票" prop="isornotkp">
                  <Select transfer v-model="orderDetail.isornotkp" size="small" style="width:100%">
                    <Option value="Y">是</Option>
                    <Option value="N">否</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="国地税报道" prop="gdsreport">
                  <Select transfer v-model="orderDetail.gdsreport" size="small">
                    <Option value="ybd">已报道</Option>
                    <Option value="wbd">未报道</Option>
                    <Option value="bybd">不用报道</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>

            <Row :gutter="16">
              <Col span="24">
                <FormItem label="异常工单号">
                  <div style="display:inline-block">
                    <Input size="small" @on-focus="openAbOrder" v-model="unusualCode" readonly style="width:60%" />
                    <Button type="info" size="small" @click="openAbOrder">选择</Button>
                  </div>
                </FormItem>
              </Col>
            </Row>

            <Row :gutter="16">
              <Col span="24">
                <FormItem label="使用余额" prop="usebalance">
                  <div style="display:inline-block">
                    <Input size="small" v-model="orderDetail.usebalance" style="width:40%" number />
                    <Button type="info" size="small" @click="getBalance(orderDetail.customerid)" :disabled="checkBalance"
                      >查询</Button
                    >
                    <span style="line-height:24px;height:24px;display:inline-block;margin-left:10px">可用余额：</span>
                    <span style="line-height:24px;height:24px;display:inline-block">{{ allUseBalance }}</span>
                  </div>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span="14">
          <h3 style="margin-bottom: 10px;">产品详情</h3>
          <product-detail-list @payNumChange="onNumChange" :productList="orderDetail.items"></product-detail-list>
        </Col>
      </Row>
      <Row> </Row>
      <div slot="footer">
        <Button type="primary" @click="onSumbit" name="order_edit" :loading="loading">确定</Button>
        <Button type="ghost">关闭</Button>
      </div>
    </Modal>
    <ab-order-select @aborder-change="settingAborder" :id="orderDetail.companyid"></ab-order-select>
  </div>
</template>

<script>
import { orderDetail, accountDetail, orderCreate } from '@A/order';
import productDetailList from './productDetailList';
import { DateFormat } from '@U/utils';
import abOrderSelect from './abOrderSelect';

export default {
  props: ['order'],
  components: {
    productDetailList,
    abOrderSelect
  },

  data() {
    return {
      detail: {},
      orderDetail: {},
      payDirs: [],
      allUseBalance: '',
      unusualCode: '',
      orderDetailRule: {
        isornotkp: [{ required: true, message: '请补全！', trigger: 'change' }],
        CompanyName: [{ required: true, message: '请补全！', trigger: 'change' }],
        name: [{ required: true, message: '请补全！', trigger: 'change' }],
        payTime: [{ required: true, message: '请补全！', trigger: 'change', type: 'date' }],
        paynumber: [{ required: true, message: '请补全！', trigger: 'change', type: 'number' }],
        realnumber: [{ required: true, message: '请补全！', trigger: 'change', type: 'number' }],
        paydir: [{ required: true, message: '请补全！', trigger: 'change' }]
      }
    };
  },
  methods: {
    onClose() {
      this.$emit('cancel');
    },
    async onSumbit() {
      this.$refs['orderDetail'].validate(async valid => {
        const { orderDetail } = this;
        let config = {
          id: orderDetail.id,
          payDir: orderDetail.paydir,
          payTime: DateFormat(orderDetail.payTime),
          GDSreport: orderDetail.gdsreport,
          companyId: orderDetail.companyid,
          isornotkp: orderDetail.isornotkp,
          orderPayNumber: orderDetail.realnumber,
          orderitems: JSON.stringify(orderDetail.items),
          usebalance: orderDetail.usebalance,
          serviceStartDate: ''
        };
        try {
          await orderCreate(config);
          this.$emit('ok');
        } catch (error) {}
      });
    },
    async getData() {
      const { id, sku_id } = this.order;
      this.orderDetail = await orderDetail(id);
      this.orderDetail.items = this.orderDetail.items.filter(v => v.skuid == sku_id);
      this.payDirs = await this.$queryCodes('payDirs', true);
    },
    async getBalance(id) {
      const data = await accountDetail({ customerId: id });
      this.allUseBalance = (data.accountAmount - data.lockAmount).toFixed(2);
    },
    onNumChange(e) {
      this.orderDetail.paynumber = e.paynumber;
      this.orderDetail.realnumber = e.realnumber;
    },
    openAbOrder() {
      this.$bus.emit('SELECT_ABORDER', true);
    },
    settingAborder(e) {
      this.applyId = e.id;
      this.unusualCode = e.unusual_code;
    }
  },

  created() {
    console.log(this.order);
    this.getData();
  }
};
</script>

<style>
#orderItem .ivu-input {
  border: 0px solid #dddee1;
}
#orderItem .ivu-select-selection {
  border: 0px solid #dddee1;
}
</style>
