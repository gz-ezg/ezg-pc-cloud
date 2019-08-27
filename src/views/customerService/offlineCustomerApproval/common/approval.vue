<template>
  <div>
    <Modal v-model="isOpenApproval" title="办理审批" width="800">
      <Form ref="task_message" :model="task_message" :label-width="120">
        <Row :gutter="16">
          <Col span="1" style="visibility:hidden">1</Col>
          <Col span="10">
            <FormItem prop="company" label="公司名称">
              <Input size="small" v-model="task_message.company" readonly />
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem prop="product" label="产品名称">
              <Input size="small" v-model="task_message.product" readonly />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="1" style="visibility:hidden">1</Col>
          <Col span="10">
            <FormItem prop="customer" label="客户名称">
              <Input size="small" v-model="task_message.customer" readonly />
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem prop="tel" label="客户手机">
              <Input size="small" v-model="task_message.tel" readonly />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="1" style="visibility:hidden">1</Col>
          <Col span="10">
            <FormItem prop="servicername" label="服务人员">
              <Input size="small" v-model="task_message.servicername" readonly />
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem prop="marketername" label="市场人员">
              <Input size="small" v-model="task_message.marketername" readonly />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="1" style="visibility:hidden">1</Col>
          <Col span="10">
            <FormItem label="订单开始税期">
              <DatePicker
                type="month"
                v-model="task_message.servicestartdate"
                style="width:100%"
                size="small"
                readonly
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="服务总月份">
              <Input size="small" :value="task_message.productnumber * 1 + task_message.give_the_number * 1 || ''" readonly />
            </FormItem>
          </Col>
          <Col v-if="task_message.unitPrice" span="5">
            <p style="padding-top:8px">
              月单价: <span style="color:red">{{ task_message.unitPrice }}</span>
            </p>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="1" style="visibility:hidden">1</Col>
          <Col span="10">
            <FormItem label="工单开始税期">
              <DatePicker type="month" v-model="task_message.begin_period" style="width:100%" size="small" readonly></DatePicker>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem label="工单结束税期">
              <DatePicker type="month" v-model="task_message.end_period" style="width: 100%" size="small" readonly></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="1" style="visibility:hidden">1</Col>
          <Col span="10">
            <FormItem label="服务开始时间">
              <DatePicker
                type="date"
                v-model="task_message.account_begin_time"
                style="width:100%"
                size="small"
                readonly
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row v-if="task_message.money" :gutter="16">
          <Col span="1" style="visibility:hidden">1</Col>
          <Col span="10">
            <FormItem label="欠费金额">
              <Input size="small" v-model="task_message.money" readonly />
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem label="欠费补缴方式">
              <Select v-model="task_message.pay_type" style="width:100%" size="small" disabled>
                <Option value="gszr">公司转让</Option>
                <Option value="qysj">企业升级</Option>
                <Option value="kjb">会计部</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="1" style="visibility:hidden">1</Col>
          <Col span="10">
            <FormItem prop="taxperiod" label="下线税期">
              <DatePicker type="month" v-model="task_message.taxperiod" style="width: 100%" size="small" readonly></DatePicker>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem prop="endreason" label="下线类型">
              <Select v-model="task_message.endreason" style="width:100%" size="small" readonly>
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
          <Col span="1" style="visibility:hidden">1</Col>
          <Col span="20">
            <FormItem prop="reasonformarketer" label="通知下线原因">
              <Input
                size="small"
                v-model="task_message.reasonformarketer"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                readonly
              />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="1" style="visibility:hidden">1</Col>
          <Col span="20">
            <FormItem prop="reasonforcallback" label="客户实际下线原因">
              <Input
                size="small"
                v-model="task_message.reasonforcallback"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                readonly
              />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="1" style="visibility:hidden">1</Col>
          <Col span="20">
            <FormItem prop="followbusiness" label="跟进中的业务">
              <Input size="small" v-model="task_message.followbusiness" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" />
            </FormItem>
          </Col>
        </Row>
      </Form>

      <Table border :columns="header" :data="data" size="small"></Table>
      <!-- model等参数还没写 -->
      <Tabs>
        <TabPane label="任务处理" icon="clipboard">
          <Col span="22">
            <Form ref="banlishenpi" :model="banlishenpi" :label-width="120" style="margin-top: 5px">
              <FormItem label="审批备注" prop="desc">
                <Input v-model="banlishenpi.desc" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }"></Input>
              </FormItem>
            </Form>
          </Col>
        </TabPane>
      </Tabs>
      <div slot="footer">
        <Button type="primary" @click="submit('Agree')" :loading="loading">提交</Button>
        <Button @click="submit('Reject')" :loading="loading">驳回</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      banlishenpi: {
        agree: 'Agree',
        desc: ''
      },
      header: [
        {
          title: '审批情况',
          key: 'auditStatus',
          minWidth: 100
        },
        {
          title: '审批备注',
          key: 'audit_memo',
          minWidth: 200
        },
        {
          title: '审批时间',
          key: 'audit_date',
          minWidth: 150
        },
        {
          title: '审批人',
          key: 'audit_user',
          minWidth: 120
        }
      ],
      data: [],
      isOpenApproval: false,
      task_message: {
        companyid: '',
        taxperiod: '',
        marketername: '',
        marketer: '',
        company: '',
        product: '',
        customer: '',
        id: '',
        servicebegindate: '',
        enddate: '',
        callbackdate: '',
        endreason: '',
        reasonformarketer: '',
        reasonforcallback: '',
        tel: '',
        followbusiness: '',
        has_returned: '',
        has_arrears: '',
        applyId: ''
      }
    };
  },
  methods: {
    getData(e) {
      let _self = this;
      let url = `api/customer/getAuditList`;
      let config = {
        params: {
          applyId: e
        }
      };
      function success(res) {
        _self.data = res.data.data;
        for (let i = 0; i < res.data.data.length; i++) {
          _self.data[i].auditStatus = _self.data[i].auditStatus == 'Agree' ? '同意' : '驳回';
        }
      }
      this.$Get(url, config, success);
    },
    submit(type) {
      let _self = this;
      _self.loading = true;
      let url = `api/customer/audit`;
      let config = {
        applyId: _self.task_message.applyId,
        auditStatus: type,
        memo: _self.banlishenpi.desc
      };
      function success(res) {
        _self.banlishenpi.desc = '';
        _self.isOpenApproval = false;
        _self.$bus.emit('UPDATE_DATA', true);
        console.log(res);
        _self.loading = false;
      }
      function fail() {
        _self.loading = false;
      }
      this.$Post(url, config, success, fail);
    }
  },
  created() {
    let _self = this;
    this.$bus.on('OPEN_OFFLINE_APPROVAL', e => {
      _self.$refs['task_message'].resetFields();
      _self.isOpenApproval = true;
      _self.task_message = e;
      _self.task_message.company = e.CompanyName;
      if (e.product == null || e.product == '') {
        _self.task_message.product = '.';
      } else {
        _self.task_message.product = e.product;
      }
      _self.task_message.customer = e.name;
      _self.task_message.servicebegindate = e.servicebegindate;
      _self.task_message.enddate = e.enddate;
      _self.task_message.callbackdate = e.callbackdate;
      _self.task_message.endreason = e.endreason;
      _self.task_message.reasonformarketer = e.reasonformarketer;
      _self.task_message.reasonforcallback = e.reasonforcallback;
      _self.task_message.marketername = e.marketer;
      _self.task_message.servicername = e.servicer;
      _self.task_message.taxperiod = e.taxperiod;
      _self.task_message.tel = e.TEL;
      _self.task_message.followbusiness = e.followbusiness;
      _self.task_message.has_returned = e.has_returned;
      _self.task_message.has_arrears = e.has_arrears;
      _self.task_message.applyId = e.applyId;
      _self.getData(e.applyId);
    });
  }
};
</script>