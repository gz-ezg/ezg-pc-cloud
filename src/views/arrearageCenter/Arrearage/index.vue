<template>
  <div>
    <Modal title="创建欠费单" :value="true" width="80" @on-cancel="onClose">
      <Form :label-width="100">
        <Row :gutter="16">
          <Col span="8">
            <FormItem label="企业名称">
              <Input size="small" v-model="order.CompanyName"  readonly />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系人">
              <Input size="small" readonly v-model="order.Name"  />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系电话">
              <Input size="small" v-model="order.TEL"  readonly />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="14">
          <FormItem label="产品选择" prop="product">
              <Input size="small" v-model="order.alisname" readonly />
          </FormItem>
        </Row>
        <Row :gutter="16">
          <Col span="12">
            <FormItem label="结束税期" prop="productContent">
              <Input type="text" readonly size="small" style="width: 200px" v-model="order.end_period" />
            </FormItem>
          </Col>
          <Col span="12"
            <FormItem label="剩余时长" prop="productContent">
              <Input type="text" readonly size="small" style="width: 50px" v-model="order.diff" />个月
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <FormItem label="服务会计">
            <Input type="text" size="small" readonly style="width: 200px" v-model="order.serverName" />
          </FormItem>
        </Row>
        <Row :gutter="16">
          <FormItem label="跟进销售">
            <Input type="text" size="small" readonly style="width: 200px" v-model="order.followby" />
          </FormItem>
        </Row>
        <Row :gutter="16">
          <FormItem label="服务备注">
            <Input type="textarea" :rows="4" readonly size="small" v-model="order.service_memo" />
          </FormItem>
        </Row>
        <Row :gutter="16">
          <Col>
            <FormItem label="延后税期" prop="reason">
              <DatePicker @on-change="latePeriodChange" type="month" :options="dateOptions" placeholder="选择延后税期" style="width: 200px"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col>
            <FormItem label="欠费申请备注" prop="reason">
              <Input type="textarea" :rows="4" size="small" v-model="applyMemo" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button :loading="loading" type="primary" @click="hanldeSubmit">创建</Button>
        <Button type="ghost" @click="onClose">关闭</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
import { oweOrderListByCompanyId, createOweOrder } from '@A/order';
import { customerDetail } from '@A/customer';
export default {
  name: 'arrearsOrder_index',
  props: {
    order: Object
  },
  data() {
    return {
      loading: false,
      selectCompanyPopus: false,
      applyMemo: '',
      latePeriod: '',
      customerTel: '',
      customerName: '',
      productList: [],
      dateOptions: {
        disabledDate: this.checkMonth
      }
    };
  },
  methods: {
    async hanldeSubmit() {
      try {
        this.loading = true;
        const { company_id, cycle_record_id } = this.order;
        await createOweOrder({
          companyId: company_id,
          cycleServiceRecordId: cycle_record_id,
          latePeriod: this.latePeriod,
          applyMemo: this.applyMemo
        });
        this.$emit('ok');
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    latePeriodChange(e) {
      this.latePeriod = e.replace(/-/, '');
    },
    onClose(e) {
      this.$emit('cancel');
    },
    checkMonth(data) {
      let period = this.order.end_period.toString();
      let between = data.getFullYear() * 12 + data.getMonth() - period.substr(0, 4) * 12 - period.substr(4) * 1;
      return !(0 <= between && between < 3);
    }
  },
  async created() {}
};
</script>
