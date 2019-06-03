<template>
  <div>
    <Modal
      title="编辑异常工单"
      v-model="openEditAbOrder"
      width="100"
      :mask-closable="false"
      @on-cancel="cancel"
    >
      <Form
        ref="abnormalOrderDetail"
        :model="abnormalOrderDetail"
        :rules="ruleInline"
        :label-width="100"
      >
        <Row :gutter="16">
          <Col span="8">
            <FormItem label="企业名称" prop="companyName">
              <Input size="small" v-model="abnormalOrderDetail.companyName" readonly/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系人" prop="linkname">
              <Input size="small" v-model="abnormalOrderDetail.linkname" readonly/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系电话" prop="linkTel">
              <Input size="small" v-model="abnormalOrderDetail.linkTel" readonly/>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col>
            <FormItem label="异常类别" prop="type">
              <RadioGroup v-model="abnormalOrderDetail.type">
                <Radio label="LowPrice">优惠价格</Radio>
                <Radio label="Discount">产品折扣</Radio>
                <Radio label="Gift">赠送</Radio>
                <Radio label="Cancel">注销</Radio>
                <Radio label="Project">项目</Radio>
                <Radio label="Other">其他</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col>
            <FormItem label="产品内容" prop="productContent">
              <Input
                type="textarea"
                :rows="2"
                size="small"
                v-model="abnormalOrderDetail.productContent"
              />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col>
            <FormItem label="审批事由" prop="reason">
              <Input type="textarea" :rows="4" size="small" v-model="abnormalOrderDetail.reason"/>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="12" v-if="abnormalOrderDetail.imgs.length">
          <FormItem label="图片">
            <img
              :key="index"
              v-for="(item, index) in abnormalOrderDetail.imgs"
              style="width:200px;height:200px"
              :src="item"
            >
          </FormItem>
        </Row>
        <Row :gutter="16">
          <Col>
            <FormItem label="上传图片">
              <center>
                <Upload
                  multiple
                  ref="upload"
                  :before-upload="handleUpload"
                  action="/api/customer/addCustomerContentImg"
                >
                  <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
                </Upload>
                <div v-for="(item,index) in file" :key="index">
                  {{ item.name }}
                  <Button type="text" @click="fileRemove(item)">移除</Button>
                </div>
              </center>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="submit">编辑</Button>
        <Button type="ghost" @click="openEditAbOrder = false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openEditAbOrder: false,
      file: [],
      abnormalOrderDetail: {
        applyId: "",
        companyId: "",
        companyName: "",
        linkname: "",
        linkTel: "",
        type: "",
        productContent: "",
        reason: "",
        attIds: "",
        imgs: []
      }
    };
  },
  methods: {
    handleUpload(file) {
      this.file.push(file);
      return false;
    },
    fileRemove(e) {
      this.file.splice(this.file.indexOf(e), 1);
    },
    submit() {
      if (valid) {
        if (this.file.length) {
          this.uploadImg();
        } else {
          this.edit();
        }
      }
    },

    //编辑异常工单
    edit() {
      let _self = this;
      let url = `api/order/unusual/workorder/editWorkOrder`;
      let config = {
        applyId: _self.abnormalOrderDetail.applyId,
        companyId: _self.abnormalOrderDetail.companyId,
        unusualType: _self.abnormalOrderDetail.type,
        productContent: _self.abnormalOrderDetail.productContent,
        applyMemo: _self.abnormalOrderDetail.reason,
        attIds: _self.abnormalOrderDetail.attIds
      };

      function success(res) {
        setTimeout(() => {
          _self.$Message.success("编辑成功！");
          _self.$bus.emit("UPDATE_AB_ORDERLIST", true);
          _self.openEditAbOrder = false;
        }, 500);
      }
      function fail() {}

      this.$Post(url, config, success, fail);
    },
    get_data(e) {
      let _self = this;
      let url = `api/order/unusual/workorder/searchWordOrderById`;
      let config = {
        params: {
          applyId: e.applyId
        }
      };
      function success(res) {
        console.log(res.data.data);
        _self.abnormalOrderDetail.applyId = e.applyId;
        _self.abnormalOrderDetail.companyId = res.data.data.company_id;
        _self.abnormalOrderDetail.productContent =
          res.data.data.product_content;
        _self.abnormalOrderDetail.reason = res.data.data.apply_memo;
        _self.abnormalOrderDetail.type = res.data.data.unusual_type;
        _self.abnormalOrderDetail.companyName = e.companyname;
        _self.abnormalOrderDetail.linkname = e.name;
        _self.abnormalOrderDetail.linkTel = e.tel;
        if (res.data.data.urls) {
          _self.abnormalOrderDetail.imgs = res.data.data.urls
            .split(",")
            .map(v => {
              return "/api/assets/" + v;
            });
        }
      }
      this.$Get(url, config, success);
    },
    submit() {
      if (this.file.length) {
        this.uploadImg();
      } else {
        this.edit();
      }
    },
    uploadImg() {
      let _self = this;
      _self.loading = true;
      //   _self.$ButtonCollect("marketingManagement_index_followUp_submit");
      let url = "/api/customer/addCustomerContentImg";

      let formdata = new FormData();

      for (let i = 0; i < _self.file.length; i++) {
        // formdata.append('files', _self.fileArray[i],"file_"+Date.parse(new Date())+".jpg")
        formdata.append("files", _self.file[i]);
      }

      function success(res) {
        let imgCode = [];
        for (let j = 0; j < res.data.data.length; j++) {
          imgCode.push(res.data.data[j].id);
        }
        _self.abnormalOrderDetail.attIds = imgCode.toString();
        _self.edit();
      }

      function fail(err) {
        _self.loading = false;
      }

      this.$Post(url, formdata, success, fail);
    }
  },
  created() {
    let _self = this;
    this.$bus.off("OPEN_AB_ORDERLIST_EDIT", true);
    this.$bus.on("OPEN_AB_ORDERLIST_EDIT", e => {
      this.get_data(e);
      console.log("this", this);
      _self.openEditAbOrder = true;
    });
  }
};
</script>
