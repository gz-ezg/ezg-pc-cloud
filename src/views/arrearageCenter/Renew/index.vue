<template>
  <div>
    <Modal title="新增续费订单" :value="true" width="100" @on-cancel="onClose">
      <Row>
        <Col span="10">
          <Form ref="orderDetail" :model="orderDetail" :label-width="100" :rules="orderDetailRule">
            <Row :gutter="16">
              <Col span="12">
                <FormItem label="归属公司" prop="CompanyName">
                  <Input size="small" v-model="order.CompanyName" readonly />
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="归属客户" prop="name">
                  <Input size="small" v-model="order.name" readonly />
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
                    <Input size="small" v-model="orderCode" @on-focus="openAbOrder" readonly style="width:60%" />
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
                    <Button type="info" size="small" @click="getBalance()" :disabled="checkBalance">查询</Button>
                    <span style="line-height:24px;height:24px;display:inline-block;margin-left:10px">可用余额：</span>
                    <span style="line-height:24px;height:24px;display:inline-block">{{ allUseBalance }}</span>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <!-- 合同 -->
            <Row :gutter="16">
              <Col span="24">
                <FormItem style="margin-bottom:10px">
                  <div slot="label">合同</div>
                  <Upload ref="upload" multiple :before-upload="handleUpload" action>
                    <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
                  </Upload>
                  <span v-for="(item, index) in show_file" :key="index">
                    {{ item.name }}
                    <Button type="text" @click="fileRemove(index)">移除</Button>
                  </span>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span="14">
          <h3 style="margin-bottom: 10px;">产品详情</h3>
          <product-detail-list
            v-if="openCreateOrderDetail"
            :productList="orderItem"
            :productListOne="orderItemOne"
            :isDisabled="isDisabled"
            :pageFlag="pageFlag"
          ></product-detail-list>
        </Col>
      </Row>
      <div slot="footer">
        <Button type="primary" @click="create" :loading="loading">创建</Button>
        <Button type="ghost" @click="closeCreateDetail">关闭</Button>
      </div>
    </Modal>
    <!-- <ab-order-select @aborder-change="setting_aborder" :id="order.company_id"></ab-order-select> -->
  </div>
</template>

<script>
// import productDetailList from './productDetailList';
import { getAccount } from '@A/customer';
export default {
  components: {
    // abOrderSelect
    // productDetailList
  },
  props: {
    order: Object
  },

  data() {
    return {
      orderDetail: {},
      allUseBalance: '待查询'
    };
  },
  methods: {
    openAbOrder() {},
    openProductList() {},
    async getBalance() {
      try {
        let data = await getAccount(config);
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {}
};
</script>
