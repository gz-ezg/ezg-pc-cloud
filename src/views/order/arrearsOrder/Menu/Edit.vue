<template>
  <div>
    <Modal title="新增异常工单" :value="true" width="80" @on-cancel="onClose">
      <Form ref="abnormalOrderDetail" :model="form" :rules="ruleInline" :label-width="100">
        <Row :gutter="16">
          <Col span="8">
            <FormItem label="企业名称">
              <Input size="small" v-model="form.companyname" @on-focus="onSelectCompany" readonly />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系人">
              <Input size="small" readonly v-model="form.customer" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系电话">
              <Input size="small" v-model="form.TEL" readonly />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <FormItem label="产品选择" prop="product">
             <Input size="small" v-model="form.alisname" readonly />
          </FormItem>
        </Row>
        <Row :gutter="16">
          <Col span="12">
            <FormItem label="结束税期" prop="productContent">
              <Input type="text" readonly size="small" style="width: 200px" v-model="form.late_period" />
            </FormItem>
          </Col>
          <Col span="12"
            <FormItem label="剩余时长" prop="productContent">
              <Input type="text" readonly size="small" style="width: 50px" v-model="form.diff" />个月
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <FormItem label="服务会计">
            <Input type="text" size="small" readonly style="width: 200px" v-model="form.serverName" />
          </FormItem>
        </Row>
        <Row :gutter="16">
          <FormItem label="跟进销售">
            <Input type="text" size="small" readonly style="width: 200px" v-model="form.followby" />
          </FormItem>
        </Row>
        <Row :gutter="16">
          <FormItem label="服务备注">
            <Input type="textarea" :rows="4" readonly size="small" v-model="form.service_memo" />
          </FormItem>
        </Row>
        <Row :gutter="16">
          <Col>
            <FormItem label="延后税期" prop="reason">
              <DatePicker @on-change="onDateChange" type="month" :options="dateOptions" placeholder="选择延后税期" style="width: 200px"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col>
            <FormItem label="欠费申请备注" prop="reason">
              <Input type="textarea" :rows="4" size="small" v-model="form.apply_memo" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading" @click="hanldeSubmit">创建</Button>
        <Button type="ghost" @click="onClose">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { updateOweOrder } from '../../../../api/order';

export default {
  props: { detail: Object },
  data() {
    return {
      form: {
        apply_memo: '',
        period: ''
      },
      loading: false,
      dateOptions: {
        disabledDate: this.checkMonth
      }
    };
  },
  methods: {
    async hanldeSubmit() {
      try {
        this.loading = true;
        const { company_id, apply_memo, period, cycle_service_record_id } = this.form;
        if (!period || !apply_memo) {
          this.$Message.info('请完善信息');
        }
        await updateOweOrder({
          companyId: company_id,
          cycleServiceRecordId: cycle_service_record_id,
          latePeriod: period,
          applyMemo: apply_memo
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    checkMonth(data) {
      let period = this.form.late_period.toString();
      let between = data.getFullYear() * 12 + data.getMonth() - period.substr(0, 4) * 12 - period.substr(4) * 1;
      return !(0 <= between && between < 3);
    },
    onDateChange(e) {
      this.form.period = e.replace(/-/, '');
    },
    onClose(e) {
      this.$emit('cancel');
    }
  },
  created() {
    this.form = { ...this.detail };
  }
};
</script>
