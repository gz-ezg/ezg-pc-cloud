<template>
  <div>
    <Modal v-model="model" @on-ok="$emit('ok')" @on-cancel="$emit('ok')" title="服务日志" width="80">
      <Card>
        <Collapse v-model="Collapse">
          <Panel name="1">
            代账情况
            <Table
              :loading="loading"
              max-height="200"
              slot="content"
              :columns="columns1"
              :data="info"
            ></Table>
          </Panel>
          <Panel name="2">
            代账工单
            <Row slot="content">
              <ButtonGroup style="margin-bottom:6px">
                <Button
                  size="small"
                  type="primary"
                  icon="information-circled"
                  @click="handleAdd"
                  v-if="isAdmin"
                >新增税期记录</Button>
              </ButtonGroup>
              <Table
                highlight-row
                @on-row-click="selectWorkRow"
                :loading="loading"
                max-height="240"
                :columns="columns2"
                :data="workOrder"
              ></Table>
            </Row>
          </Panel>
          <Panel name="3">
            代账月服务记录
            <Row slot="content">
              <ButtonGroup style="margin-bottom:6px">
                <Button
                  size="small"
                  type="primary"
                  icon="information-circled"
                  v-if="isAdmin"
                  @click="handleEdit"
                >编辑</Button>
                <Button
                  size="small"
                  type="primary"
                  icon="information-circled"
                  @click="handleDelete"
                  v-if="isAdmin"
                >删除</Button>
              </ButtonGroup>
              <Table
                highlight-row
                @on-row-click="selectRow"
                height="240"
                :loading="loading"
                :columns="columns3"
                :data="monthRecordList"
              ></Table>
            </Row>
          </Panel>
        </Collapse>
      </Card>
      <div slot="footer"></div>
    </Modal>

    <Modal v-model="formModel" @on-ok="handleSubmit" title="服务日志" width="400">
      <Form ref="formValidate" :model="form" :rules="ruleValidate" :label-width="80">
        <FormItem v-if="form.cycleServiceTotalId" label="记录ID">
          <Input v-model="form.cycleServiceTotalId" placeholder="请输入" />
        </FormItem>
        <FormItem v-if="form.baseWorkOrderId" label="工单ID">
          <Input v-model="form.baseWorkOrderId" placeholder="请输入" />
        </FormItem>

        <FormItem label="税期" prop="period ">
          <DatePicker
            @on-change="dateChange"
            format="yyyyMM"
            v-model="period"
            type="month"
            placeholder="选择税期"
          ></DatePicker>
        </FormItem>
        <FormItem label="结算状态" prop="settlementStatus">
          <Select v-model="form.settlementStatus" placeholder="请选择">
            <Option value="Y">已结算</Option>
            <Option value="N">未结算</Option>
          </Select>
        </FormItem>
         <FormItem label="服务人员" prop="serverId">
          <Select v-model="form.serverId" placeholder="请选择">
            <Option
              v-for="item in serverList"
              :key="item.serverId"
              :value="item.serverId"
            >{{item.serverName}}</Option>
          </Select>
        </FormItem> 
         
        <FormItem label="提成" prop="name">
          <Input type="number" v-model="form.percentage" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="单价" prop="name">
          <Input v-model="form.price" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="备注" prop="memo">
          <Input
            v-model="form.memo"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入备注"
          />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {
  getMonthServiceInfo,
  deleteMonthServiceInfo,
  updateMonthServiceInfo,
  addMonthServiceInfo,
  getAccounterList,
} from "@/api/missionCenter";
export default {
  props: {
    row: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
      model: true,
      info: [],
      workOrder: [],
      monthRecordList: [],
      currentRow: null,
      currentWorkRow: null,
      Collapse: ["2", "3"],
      form: { serverId: "" },
      formModel: false,
      ruleValidate: {},
      serverList: [],
      period: "",
      isAdmin: false,
      columns1: [
        {
          title: "服务状态",
          key: "serviceStatus",
          render(h, { row }) {
            const inserviceMap = {
              inservice: "服务中",
            };
            return h("span", inserviceMap[row.serviceStatus]);
          },
        },
        {
          title: "对应企业",
          key: "companyName",
        },
        {
          title: "产品",
          minWidth: 120,
          key: "product",
        },
        {
          title: "开始税期",
          key: "beginPeriod",
        },
        {
          title: "结束税期",
          key: "endPeriod",
        },
      ],
      columns2: [
        {
          title: "记录ID",
          key: "cycleServiceTotalId",
        },
        {
          title: "工单ID",
          key: "baseWorkOrderId",
        },
        {
          title: "产品",
          key: "alisName",
          minWidth: 120,
        },
        {
          title: "开始税期",
          key: "beginPeriod",
        },
        {
          title: "结束税期",
          key: "endPeriod",
        },
      ],
      columns3: [
        {
          title: "当前税期",
          key: "period",
        },
        {
          title: "产品",
          key: "alisName",
          minWidth: 120,
        },
        {
          title: "结算状态",
          key: "settlementStatus",
          render(h, { row }) {
            return h("span", row.settlementStatus == "N" ? "未结算" : "已结算");
          },
        },
        {
          title: "单价",
          key: "price",
        },
        {
          title: "提成",
          key: "percentage",
        },
        {
          title: "会计",
          key: "serverName",
        },
        {
          title: "备注",
          key: "memo",
        },
      ],
    };
  },
  created() {
    let temp = localStorage.getItem("Role");  
    this.isAdmin = localStorage.getItem("id") == 10059 || temp.indexOf('cwsp') > -1;
    this.getList();
  },
  methods: {
    async handleAdd() {
      if (!this.currentWorkRow) return this.$Message.warning("请选择一行新增");

      this.formModel = true;
      this.form = {};
      this.form.cycleServiceTotalId = this.currentWorkRow.cycleServiceTotalId;
      this.form.baseWorkOrderId = this.currentWorkRow.baseWorkOrderId;
      this.form.price = this.currentWorkRow.price;
      this.form.serverId = this.currentWorkRow.serverId;
      this.serverList = await getAccounterList();
    },
    async handleSubmit() {
      if (this.form.monthServiceId) {
        await updateMonthServiceInfo(this.form);
      } else {
        await addMonthServiceInfo(this.form);
      }
      this.getList();
      this.formModel = false;
    },
    dateChange(date) {
      this.form.period = date;
    },
    async handleEdit() {
      if (!this.currentRow) return this.$Message.warning("请选择一行");
      this.form = { ...this.currentRow };
      console.log(this.form);

      //this.$set(this.form, "serverId", Number(this.currentRow.serverId));
      this.period = this.currentRow.period;
      delete this.form.serverName;
      this.formModel = true;
      this.serverList = await getAccounterList();
    },

    handleDelete() {
      if (!this.currentRow) return this.$Message.warning("请选择一行");
      this.$Modal.confirm({
        title: "提示信息",
        content: "<p>您确定删除吗</p>",
        onOk: async () => {
          await deleteMonthServiceInfo({
            monthServiceId: this.currentRow.monthServiceId,
          });

          this.getList();
        },
        onCancel: () => {},
      });
    },
    handleExcel() {},
    selectRow(a) {
      this.currentRow = a;
    },
    selectWorkRow(a) {
      this.currentWorkRow = a;
    },
    async getList() {
      this.loading = true;
      const resp = await getMonthServiceInfo({
        companyId: this.row.company_id,
      });
      this.loading = false;
      this.info = resp.info;
      this.workOrder = resp.workOrder;
      this.monthRecordList = resp.monthRecordList;
    },
  },
};
</script>