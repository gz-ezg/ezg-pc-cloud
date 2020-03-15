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
          :before-upload="handleUpload"
        >
          <!-- <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>上传</p>
          </div> -->
          <Button icon="ios-cloud-upload-outline">上传</Button>
        </Upload>
        <template v-for="(item,index) in picUrl" ><img :key="index" :src="item" style="width:100px;height:100px" /></template>
      </FormItem>
      <FormItem label="备注" prop="remark">
        <Input type="textarea" v-model="forms.remark" />
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
      this.forms.remark = this.current_row.remark;
    }
  },
  data() {
    return {
      model: false,
      gysModelLoading: false,
      forms: { files: [] , remark: "" },
      ruleValidate: {},
      picUrl: [],
      gycList: []
    };
  },

  methods: {
    async hanldeProductFinish() {
      let formData = new FormData();
      this.forms.files.forEach(v=>{
        formData.append("files",v);
      })
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
      this.forms.files.push(file);
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = e => {
        this.picUrl.push(e.target.result);
      };
      return false;
    }
  }
};
</script>

<style>
</style>