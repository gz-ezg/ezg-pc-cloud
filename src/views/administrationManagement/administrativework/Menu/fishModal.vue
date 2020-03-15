<template>
  <Modal
    v-model="model"
    :mask-closable="false"
    :loading="gysModelLoading"
    title="供应商产品一键完结"
    @on-ok="hanldeProductFinish"
    @on-cancel="onCancel"
  >
    <Form
      style="padding-rigth:20px"
      ref="form"
      :model="forms"
      :rules="ruleValidate"
      label-position="right"
      :label-width="100"
    >
      <FormItem prop="servicename" label="供应商">
        <Select @on-change="gycSelectChange" v-model="forms.suppilerId" style="width:200px">
          <Option
            v-for="(item,index) in gycList"
            :key="index"
            :value="item.id"
          >{{item.supplier_name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="结算价" prop="settlementPrice">
        <Input v-model="forms.settlementPrice" />
      </FormItem>
      <FormItem label="销售价" prop="sales_price">
        <Input v-model="forms.salesPrice" />
      </FormItem>
      <FormItem label="凭证" prop="file">
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          type="drag"
          :before-upload="handleUpload"
        >
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>上传</p>
          </div>
        </Upload>
        <img v-if="picUrl" :src="picUrl" style="width:375px;height:200px" />
      </FormItem>
      <FormItem label="备注" prop="remark">
        <Input v-model="forms.remark" />
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import {
  listByProductId,
  addSuppilerByWorkorderId,
  doneExecutiveWorkOrder
} from "@A/supplierManage";
export default {
  props: {
    current_row: { type: Object, default: {} },
    show: { type: Boolean, default: false }
  },
  watch: {
    show(value) {
      this.model = value;
      if (value) {
        this.picUrl = "";
        this.forms = { salesPrice: "", settlementPrice: "", file: null };
        this.finsihWorkerorder();
      }
    }
  },
  data() {
    return {
      model: false,
      gysModelLoading: false,
      forms: { salesPrice: "", settlementPrice: "", file: null },
      ruleValidate: {},
      picUrl: "",
      gycList: []
    };
  },

  methods: {
    async hanldeProductFinish() {
      let formData = new FormData();
      formData.append("file", this.forms.file);
      formData.append("workorderId", this.current_row.id);
      formData.append("salesPrice", this.forms.salesPrice);
      formData.append("settlementPrice", this.forms.settlementPrice);
      formData.append("remark", this.forms.remark);
      this.gysModelLoading = true;
      try {
        await doneExecutiveWorkOrder(formData);
        this.gysModelLoading = false;
      } catch (error) {
        this.gysModelLoading = false;
      } finally {
        this.$emit("ok");
      }
    },
    onCancel() {
      this.$emit("cancel");
    },
    handleUpload(file) {
      this.forms.file = file;
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = e => {
        this.picUrl = e.target.result;
      };
      return false;
    },
    gycSelectChange(id) {
      const values = this.gycList.find(v => id == v.id);
      this.forms.salesPrice = values.sales_price;
      this.forms.settlementPrice = values.settlement_price;
      this.forms.suppilerId = values.id;
    },
    handleFinish() {
      let url = `api/order/goFinshWorkOrderProcess`;
      let config = {
        params: {
          workOrderId: this.current_row.id
        }
      };
      const success = res => {
        this.$Message.success(res.data.msg);
      };
      this.$Get(url, config, success);
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