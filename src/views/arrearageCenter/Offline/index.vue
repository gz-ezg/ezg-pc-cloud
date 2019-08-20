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
              <Input size="small" v-model="order.serverName" readonly />
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem prop="marketername" label="市场人员">
              <Input size="small" v-model="order.followby" readonly />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="10">
            <FormItem prop="servicebegindate" label="服务开始时间">
              <Input size="small" v-model="service_begin_time" readonly />
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem prop="enddate" label="下线时间">
              <DatePicker type="date" v-model="form.enddate" style="width: 100%" size="small"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="10">
            <FormItem prop="taxperiod" label="下线税期">
              <DatePicker type="month" v-model="form.taxperiod" style="width: 100%" size="small"></DatePicker>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem prop="endreason" label="客户类别">
              <Select v-model="form.endreason" style="width:100%" size="small">
                <Option value="gszr">公司转让</Option>
                <Option value="qysj">企业升级</Option>
                <Option value="kjb">会计部</Option>
                <Option value="scb">市场部</Option>
                <Option value="hth">换同行</Option>
                <Option value="zx">注销</Option>
                <Option value="qt">其他</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="10">
            <FormItem prop="" label="是否需退款">
              <RadioGroup v-model="form.has_returned">
                <Radio label="Y">是</Radio>
                <Radio label="N">否</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem prop="" label="是否有欠费">
              <RadioGroup v-model="form.has_arrears">
                <Radio label="Y">是</Radio>
                <Radio label="N">否</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="20">
            <FormItem prop="reasonformarketer" label="市场通知下线原因">
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

export default {
  props: {
    order: Object
  },
  data() {
    return {
      loading: false,
      form: {
        reasonformarketer: '',
        reasonforcallback: '',
        memo: '',
        has_returned: 'N',
        has_arrears: 'N'
      },
      rule: {
        taxperiod: [{ required: true, message: '必选项！', trigger: 'change', type: 'date' }],
        enddate: [{ required: true, message: '必选项！', trigger: 'change', type: 'date' }],
        reasonformarketer: [{ required: true, message: '必选项！', trigger: 'blur' }]
      },
      service_begin_time: ''
    };
  },

  async created() {
    const { company_id: companyId = '' } = this.order;
    if (companyId) {
      const resp = await getCycleMonthInfoBycompanyId({ companyId });
      this.service_begin_time = resp[0].service_begin_time;
    }
  },
  methods: {
    handleSubmit() {
      this.$refs['form'].validate(async valid => {
        if (valid) {
          const { order, form, service_begin_time } = this;
          let config = {
            companyid: order.company_id,
            productid: order.productid,
            servicer: order.servicer,
            marketer: order.marketer,
            enddate: DateFormat(form.enddate),
            servicebegindate: service_begin_time && service_begin_time.substr(0, 10),
            endreason: form.endreason,
            taxperiod: DateFormat(form.taxperiod),
            reasonformarketer: form.reasonformarketer,
            hasReturned: form.has_returned,
            hasArrears: form.has_arrears,
            cycleServiceRecordId: order.cycle_record_id
          };
          await createCustomerEnd(config);
          this.$emit('ok');
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