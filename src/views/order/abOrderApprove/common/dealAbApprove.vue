<template>
  <div>
    <Modal v-model="openAbApproveDeal" title="办理审批" width="100%">
      <Form ref="formValidateDetail" :model="formValidateDetail" :label-width="100">
        <Row :gutter="16">
          <Col span="8">
            <FormItem label="企业名称" prop="companyname">
              <Input size="small" v-model="formValidateDetail.companyname" readonly/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系人" prop="name">
              <Input size="small" v-model="formValidateDetail.name" readonly/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="联系电话" prop="tel">
              <Input size="small" v-model="formValidateDetail.tel" readonly/>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="8">
            <FormItem label="异常类别" prop="unusual_type">
              <Input size="small" v-model="formValidateDetail.unusual_type" readonly/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="销售人员" prop="realname">
              <Input size="small" v-model="formValidateDetail.realname" readonly/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label="产品内容" prop="product_content">
            <Input
              size="small"
              type="textarea"
              :rows="2"
              v-model="formValidateDetail.product_content"
              readonly
            />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="审批事由" prop="apply_memo">
            <Input
              size="small"
              type="textarea"
              :rows="4"
              v-model="formValidateDetail.apply_memo"
              readonly
            />
          </FormItem>
        </Row>
        <Row :gutter="12" v-if="formValidateDetail.imgs.length">
          <FormItem label="图片">
            <a
              :key="index"
              v-for="(item, index) in formValidateDetail.imgs"
              target="_blank"
              :href="item"
            >
              <img style="width:200px;height:200px;border-radius:20px" :src="item">
            </a>
          </FormItem>
        </Row>
      </Form>
      <Tabs>
        <TabPane label="任务处理" icon="clipboard">
          <Form ref="banlishenpi" :model="banlishenpi" :label-width="120" style="margin-top: 5px">
            <FormItem label="审批备注" prop="desc">
              <Input v-model="banlishenpi.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </FormItem>
            <FormItem label="是否同意审批" prop="agree">
              <RadioGroup v-model="banlishenpi.agree">
                <Radio label="Agree">同意</Radio>
                <Radio label="Reject">驳回</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>
      <div slot="footer">
        <Button type="primary" @click="submit" :loading="submitLoading" :disabled="disabled">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: false,
      openAbApproveDeal: false,
      formValidateDetail: {},
      banlishenpi: {
        agree: "Agree",
        desc: ""
      },
      submitLoading: false
    };
  },
  methods: {
    get_data(e) {
      this.formValidateDetail = e;
      if (e.urls.length) {
        this.formValidateDetail.imgs = e.urls.split(",").map(v => {
          return "/api/assets/" + v;
        });
      }

      console.log(this.formValidateDetail);
    },

    //办理审批
    submit() {
      let _self = this;
      _self.disabled = true;
      _self.submitLoading = true;
      let url = `api/order/unusual/workorder/audit`;
      let config = {
        applyId: _self.formValidateDetail.applyId,
        auditStatus: _self.banlishenpi.agree,
        memo: _self.banlishenpi.desc
      };

      function success(res) {
        _self.banlishenpi.agree = "Agree";
        _self.banlishenpi.desc = "";
        _self.submitLoading = false;
        _self.openAbApproveDeal = false;
        _self.$bus.emit("UPDATE_AB_ORDER_DATA", true);
      }

      function fail() {}

      this.$Post(url, config, success, fail);
    }
  },
  created() {
    let _self = this;
    this.$bus.on("AB_ORDER_APPROVE_DEAL", e => {
      _self.disabled = false;
      _self.get_data(e);
      _self.openAbApproveDeal = true;
    });
  }
};
</script>


