<template>
  <div>
    <Modal title="新增欠费单" :value="true" width="80" @on-cancel="onClose">
      <Form ref="abnormalOrderDetail" :model="form" :rules="ruleInline" :label-width="100">
        <Row :gutter="16">
          <Col span="8">
            <FormItem label="企业名称">
              <Input size="small" v-model="form.companyName" @on-focus="onSelectCompany" readonly />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系人">
              <Input size="small" readonly v-model="form.linkname" @on-focus="onSelectCompany" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系电话">
              <Input size="small" v-model="form.linkTel" @on-focus="onSelectCompany" readonly />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <FormItem label="产品选择" prop="product">
            <Select @on-change="onProductChange" v-model="form.product" style="width:200px">
              <Option v-for="item in productList" :value="item.id" :key="item.id">{{ item.skuname }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row :gutter="16">
          <Col span="12">
            <FormItem label="结束税期" prop="productContent">
              <Input type="text" readonly size="small" style="width: 200px" v-model="form.end_period" />
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
              <DatePicker @on-change="onDatePickerChange" type="month" :options="dateOptions" placeholder="选择延后税期" style="width: 200px"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col>
            <FormItem label="欠费申请备注" prop="reason">
              <Input type="textarea" :rows="4" size="small" v-model="form.applyMemo" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading" @click="hanldeSubmit">创建</Button>
        <Button type="ghost" @click="onClose">关闭</Button>
      </div>
    </Modal>

    <company-select v-if="selectCompanyPopus" @company-change="settingCompany"></company-select>
  </div>
</template>

<script>
import companySelect from '@C/companySelect';
import { oweOrderListByCompanyId, createOweOrder } from '@A/order';

export default {
  name: 'arrearsOrder_index',
  components: {
    companySelect
  },
  data() {
    return {
      selectCompanyPopus: false,
      loading: false,
      form: {
        companyName: '',
        linkname: '',
        linkTel: '',
        end_period: '',
        diff: '',
        followby: '',
        serverName: ''
      },
      productList: [],
      dateOptions: {
        disabledDate: this.checkMonth
      }
    };
  },
  methods: {
    onSelectCompany() {
      this.selectCompanyPopus = !this.selectCompanyPopus;
    },
    onDatePickerChange(e) {
      this.end_period = e.replace(/-/, '');
    },
    onProductChange(e) {
      this.from = Object.assign(
        {},
        this.form,
        this.productList.find(v => {
          return v.id == e;
        })
      );
    },
    settingCompany({ companyname, customerName, customerTel, id }) {
      this.form.companyName = companyname;
      this.form.linkname = customerName;
      this.form.linkTel = customerTel;

      this.onSelectCompany();
      this.getOweOrderList(id);
    },
    async hanldeSubmit() {
      const { company_id, applyMemo, id, end_period } = this.form;
      if (!applyMemo || !end_period) {
        return this.$Message.info('请完善信息');
      }
      try {
        this.loading = true;
        await createOweOrder({ companyId: company_id, cycleServiceRecordId: id, latePeriod: end_period, applyMemo });
        this.$emit('ok');
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    async getOweOrderList(companyId) {
      try {
        let resp = await oweOrderListByCompanyId({ companyId: 34247 });
        this.productList = resp;
        this.form = Object.assign(this.form, resp[0]);
        this.form.product = resp[0].id;
        console.log(this.form);
      } catch (error) {}
    },
    checkMonth(data) {
      let period = this.form.end_period.toString();
      let between = data.getFullYear() * 12 + data.getMonth() - period.substr(0, 4) * 12 - period.substr(4) * 1;
      return !(0 <= between && between < 3);
    },
    onClose(e) {
      this.$emit('cancel');
    }
  },
  created() {}
};
</script>
