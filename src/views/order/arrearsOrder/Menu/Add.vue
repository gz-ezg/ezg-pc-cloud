<template>
  <div>
    <Modal title="新增异常工单" :value="true" width="80" @on-cancel="close">
      <Form ref="abnormalOrderDetail" :model="detail" :rules="ruleInline" :label-width="100">
        <Row :gutter="16">
          <Col span="8">
            <FormItem label="企业名称" prop="companyName">
              <Input size="small" v-model="detail.companyName" @on-focus="onSelectCompany" readonly />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系人" prop="linkname">
              <Input size="small" readonly v-model="detail.linkname" @on-focus="onSelectCompany" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系电话" prop="linkTel">
              <Input size="small" v-model="detail.linkTel" @on-focus="onSelectCompany" readonly />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col>
            <FormItem label="产品选择" prop="product">
              <Select v-model="detail.product" style="width:200px">
                <Option v-for="item in productList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="12">
            <FormItem label="结束税期" prop="productContent">
              <Input type="text" size="small" style="width: 200px" v-model="detail.end_period" />
            </FormItem>
          </Col>
          <Col span="12"
            >剩余时长 <span style="margin:0 10px;color:red">{{ detail.diff }}</span
            >个月
          </Col>
        </Row>
        <Row :gutter="16">
          <Col>
            <FormItem label="服务会计" prop="reason">
              <Input type="text" size="small" style="width: 200px" v-model="detail.serverName" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col>
            <FormItem label="跟进销售" prop="reason">
              <Input type="text" size="small" style="width: 200px" v-model="detail.followby" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col>
            <FormItem label="服务备注" prop="reason">
              <Input type="textarea" :rows="4" size="small" v-model="detail.reason" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col>
            <FormItem label="延后税期" prop="reason">
              <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col>
            <FormItem label="欠费申请备注" prop="reason">
              <Input type="textarea" :rows="4" size="small" v-model="detail.reason" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="hanldeSubmit">创建</Button>
        <Button type="ghost" @click="close">关闭</Button>
      </div>
    </Modal>

    <company-select v-if="selectCompanyPopus" @company-change="settingCompany"></company-select>
  </div>
</template>

<script>
import companySelect from '@/components/companySelect';
import { oweOrderListByCompanyId, createOweOrder } from '../../../../api/order';

export default {
  name: 'arrearsOrder_index',
  components: {
    companySelect
  },
  data() {
    return {
      selectCompanyPopus: false,
      detail: {
        companyId: '',
        companyName: '',
        linkname: '',
        linkTel: '',
        end_period: '',
        diff: '',
        followby: '',
        serverName: ''
      }
      // ruleInline: {
      //   companyName: [{ required: true, message: '请选择！', trigger: 'change' }],
      //   linkname: [{ required: true, message: '请选择！', trigger: 'change' }],
      //   linkTel: [{ required: true, message: '请选择！', trigger: 'change' }],
      //   type: [{ required: true, message: '请选择！', trigger: 'change' }],
      //   productContent: [{ required: true, message: '不能为空！', trigger: 'change' }],
      //   reason: [{ required: true, message: '不能为空！', trigger: 'change' }]
      // }
    };
  },
  methods: {
    onSelectCompany() {
      this.selectCompanyPopus = !this.selectCompanyPopus;
    },

    settingCompany({ companyname, customerName, customerTel, id }) {
      this.detail.companyName = companyname;
      this.detail.linkname = customerName;
      this.detail.linkTel = customerTel;

      this.onSelectCompany();
      this.getOweOrderList(id);
    },
    async hanldeSubmit() {
      await createOweOrder({ companyId: '35581', cycleServiceRecordId: '194', latePeriod: '201907', applyMemo: '测试' });
    },
    async getOweOrderList(companyId) {
      try {
        let resp = await oweOrderListByCompanyId({ companyId: 34247 });
        this.detail.serverName = resp[0].serverName;
        this.detail.followby = resp[0].followby;
        this.detail.end_period = resp[0].end_period;
        this.detail.diff = resp[0].diff;
        console.log(resp);
      } catch (error) {}
    },
    close(e) {
      this.selectCompanyPopus = false;
    }
  },
  created() {}
};
</script>
