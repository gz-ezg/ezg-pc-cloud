<template>
  <Modal
    v-model="model"
    :mask-closable="false"
    :loading="gysModelLoading"
    title="供应商产品流转"
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
import { listByProductId, goNextExecutiveWorkOrder } from "@A/supplierManage";
export default {
  props: {
    current_row: { type: Object, default: {} },
    show: { type: Boolean, default: false }
  },
  watch: {
    show(value) {
      this.model = value;
    }
  },
  data() {
    return {
      model: false,
      gysModelLoading: false,
      forms: { file: null, remark: "" },
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
      formData.append("remark", this.forms.remark);
      this.gysModelLoading = true;
      try {
        await goNextExecutiveWorkOrder(formData);
        this.gysModelLoading = false;
      } catch (error) {
        this.gysModelLoading = false;
      } finally {
        this.forms = { file: null, remark: "" };
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
    }
  }
};
</script>

<style>
</style>