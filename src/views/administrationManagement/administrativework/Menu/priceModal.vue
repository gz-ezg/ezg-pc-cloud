<template>
  <Modal v-model="priceModal" title="调整价格" @on-ok="hanldePriceEdit" @on-cancel="cancel">
    <Form
      style="padding-rigth:20px"
      ref="form"
      :model="forms"
      :rules="ruleValidate"
      label-position="right"
      :label-width="100"
    >
      <FormItem label="供应商" prop="supplierName">
        <Select @on-change="gycSelectChange" v-model="forms.suppilerId" style="width:200px">
          <Option
            v-for="(item,index) in gycList"
            :key="index"
            :value="item.id"
          >{{item.supplier_name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="结算价格" prop="settlementPrice">
        <Input type="number" v-model="forms.settlementPrice" />
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import { listByProductId, addSuppilerByWorkorderId } from "@A/supplierManage";
export default {
  props: { current_row: Object },
  data() {
    return {
      isGysModel: true,
      gysModelLoading: false,
      forms: { settlementPrice: "", suppilerId: "" },
      ruleValidate: {
        settlementPrice: [
          {
            required: true,
            message: "请填写销售价",
            trigger: "change"
          }
        ]
      },
      picUrl: "",
      gycList: []
    };
  },
  created() {
    this.finsihWorkerorder();
  },
  methods: {
    hanldePriceEdit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          await updateSettlementPrice(this.forms);
          this.$emit("ok");
        } else {
          this.$Message.error("请完善信息");
        }
      });
    },

    onCancel() {
      this.isGysModel = false;
      this.$emit("cancel");
    },

    gycSelectChange(id) {
      const values = this.gycList.find(v => id == v.id);
      this.forms.salesPrice = values.sales_price;
      this.forms.settlementPrice = values.settlement_price;
      this.forms.suppilerId = values.id;
    },

    async finsihWorkerorder() {
      this.gycList = await listByProductId({
        productId: this.current_row.productId
      });
      if (this.gycList.length) {
        this.forms.salesPrice = this.gycList[0].sales_price;
        this.forms.settlementPrice = this.gycList[0].settlement_price;
        this.forms.suppilerId = this.gycList[0].id;
      }
      this.isGysModel = true;
    }
  }
};
</script>

<style>
</style>