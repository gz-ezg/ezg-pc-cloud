<template>
  <div>
    <Modal :value="true" title="创建下线单" width="800" @on-cancel="onClose">
      <Form ref="form" :model="form" :rules="rule" :label-width="120">
        <Row :gutter="16">
          <Col span="10">
            <FormItem prop="company" label="公司名称">
              <Input size="small" v-model="order.CompanyName" />
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem prop="productid" label="产品名称">
              <Input size="small" v-model="order.skuname" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="10">
            <FormItem prop="customer" label="客户名称">
              <Input size="small" v-model="order.Name" />
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem prop="tel" label="客户手机">
              <Input size="small" v-model="order.TEL" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="10">
            <FormItem prop="servicername" label="服务人员">
              <Input size="small" v-model="detail.server_name" readonly />
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem prop="marketername" label="市场人员">
              <Input size="small" v-model="detail.marketer" readonly />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="10">
            <FormItem prop="servicestartdate" label="订单开始税期">
              <DatePicker type="month" v-model="detail.servicestartdate" style="width:100%" size="small" readonly></DatePicker>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="服务总月份">
              <Input size="small" :value="detail.productnumber * 1 + detail.give_the_number * 1 || ''" readonly />
            </FormItem>
          </Col>
          <Col v-if="detail.unitPrice" span="6">
            <p style="padding-top:8px">
              月单价: <span style="color:red">{{ detail.unitPrice }}</span>
            </p>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="10">
            <FormItem prop="begin_period" label="工单开始税期">
              <DatePicker type="month" v-model="detail.begin_period" style="width:100%" size="small" readonly></DatePicker>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem prop="end_period" label="工单结束税期">
              <DatePicker type="month" v-model="detail.end_period" style="width: 100%" size="small" readonly></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="10">
            <FormItem prop="account_begin_time" label="服务开始时间">
              <DatePicker type="date" v-model="detail.account_begin_time" style="width:100%" size="small" readonly></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Divider type="vertical" />
        <Row :gutter="16">
          <Col span="10">
            <FormItem prop="taxperiod" label="下线税期">
              <DatePicker
                :options="dateOptions"
                type="month"
                v-model="form.taxperiod"
                style="width: 100%"
                size="small"
                @on-change="onTaxperiodChange"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="10">
            <FormItem prop="endreason" label="下线类型">
              <Select v-model="form.endreason" style="width:100%" size="small">
                <template v-for="(item, index) in codemap">
                  <Option :key="index" :value="item.typecode">{{ item.typename }}</Option>
                </template>
              </Select>
            </FormItem>
          </Col></Row
        >
        <Row v-if="money" :gutter="16">
          <Col span="10">
            <FormItem label="欠费金额">
              <Input size="small" :value="money" readonly />
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem label="欠费补缴方式">
              <Select v-model="detail.payType" style="width:100%" size="small">
                <Option value="payForSelf">自费</Option>
                <Option value="payForSalary">薪资扣除</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="20">
            <FormItem prop="reasonformarketer" label="通知下线原因">
              <Input size="small" v-model="form.reasonformarketer" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="20">
            <FormItem prop="reasonforcallback" label="客户实际下线原因">
              <Input size="small" v-model="form.reasonforcallback" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="20">
            <FormItem prop="followbusiness" label="跟进中的业务">
              <Input size="small" v-model="form.followbusiness" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleSubmit" :loading="loading">新增</Button>
        <Button type="ghost" @click="onClose">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getCycleMonthInfoBycompanyId } from '@A/order';
import { createCustomerEnd } from '@A/customer';
import { DateFormat } from '@U/utils';
import { nowDateFormatYearMonth } from '../../../libs/utils';

export default {
  props: {
    order: Object
  },
  data() {
    return {
      codemap: [],
      loading: false,
      detail: { money: '' },
      form: {
        reasonformarketer: '',
        reasonforcallback: '',
        memo: ''
      },
      dateOptions: {
        disabledDate: this.checkMonth
      },
      money: '',
      rule: {
        taxperiod: [{ required: true, message: '必选项！', trigger: 'change', type: 'date' }],
        enddate: [{ required: true, message: '必选项！', trigger: 'change', type: 'date' }],
        reasonformarketer: [{ required: true, message: '必选项！', trigger: 'blur' }]
      }
    };
  },

  async created() {
    const { company_id: companyId = '' } = this.order;
    if (companyId) {
      const resp = await getCycleMonthInfoBycompanyId({ companyId });
      this.detail = resp[0];
      this.codemap = await this.$queryCodes('endreason', true);
    }
  },
  methods: {
    checkMonth(data) {
      let period = nowDateFormatYearMonth();
      let between = data.getFullYear() * 12 + data.getMonth() - period.substr(0, 4) * 12 - period.substr(4) * 1;
      return -3 >= between;
    },
    onTaxperiodChange(e) {
      const { end_period, unitPrice } = this.detail;
      if (!end_period) {
        return;
      }
      let period = nowDateFormatYearMonth(end_period);

      let between = e.substr(0, 4) * 12 + e.substr(5) * 1 - period.substr(0, 4) * 12 - period.substr(4) * 1;

      if (between > 0) {
        this.money = unitPrice ? unitPrice * between : '';
      } else {
        this.money = 0;
      }
      console.log(this.money);
    },
    handleSubmit() {
      this.$refs['form'].validate(async valid => {
        if (valid) {
          const { order, form, detail } = this;

          let config = {
            companyid: order.company_id,
            productid: detail.product_id,
            servicer: detail.serviceId,
            marketer: detail.marketerId,
            reasonformarketer: form.reasonformarketer,
            reasonforcallback: form.reasonforcallback,
            endreason: form.endreason,
            money: this.money,
            payType: detail.payType,
            taxperiod: DateFormat(form.taxperiod),
            followbusiness: form.followbusiness,
            cycleServiceRecordId: detail.cycleServiceRecordId
          };
          try {
            this.loading = true;
            await createCustomerEnd(config);
            this.$emit('ok');
          } catch (error) {
          } finally {
            this.loading = false;
          }
        } else {
        }
      });
    },
    onClose() {
      this.$emit('cancel');
    }
  }
};
</script>