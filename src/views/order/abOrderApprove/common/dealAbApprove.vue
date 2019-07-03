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
        <Row>
          <FormItem label="历史审批：" prop="apply_memo">
            <div class="s">
              <div v-for="item in historyData" v-if="historyData" class="s1">
                <div>{{item.realname}}：{{item.audit_memo}}</div>
                <div class="s2">{{item.audit_date}}</div>
              </div>
            </div>
          </FormItem>
        </Row>
        <Row :gutter="12" v-if="formValidateDetail.imgs && formValidateDetail.imgs.length">
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
      historyData:[],
      nameData:[],
      memoData:[],
      id:"",
      banlishenpi: {
        agree: "Agree",
        desc: ""
      },
      submitLoading: false,
      data:[]
    };
  },
  methods: {
    get_data(e) {
      this.formValidateDetail = e;
      if (e.urls && e.urls.length) {
        this.formValidateDetail.imgs = e.urls.split(",").map(v => {
          return "/api/assets/" + v;
        });
      }

      console.log(this.formValidateDetail);
    },
    get_history_data(){
      let _self = this
      let url = `api/order/unusual/workorder/searchWordOrderById`
      let config = {
        params: {
          applyId:_self.id
        }
      }

      function success(res){
        _self.data = res.data.data
        _self.historyData = res.data.data.items
        for (let i=0;i<_self.historyData.length;i++){
          if (_self.historyData[i].audit_memo =="" || _self.historyData[i].audit_memo==null){
            _self.historyData[i].audit_memo = "审批备注为空"
          }
        }
        console.log(_self.historyData )
        _self.tableLoading = false
      }

      this.$Get(url,config,success)
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
      _self.nameData = []
      _self.memoData = []
      _self.get_data(e);
      _self.id = e.applyId
      _self.get_history_data()
      _self.openAbApproveDeal = true;
    });
  }
};
</script>

<style>
  .s{
    min-height: 32px;
    vertical-align: bottom;
    font-size: 12px;
    border: 1px solid #dddee1;
    padding: 4px 7px;
    border-radius: 4px;
    color: #495060;
    background-color: #fff;
    position: relative;
    cursor: text;
    font-family: inherit;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .s1{
    display: flex;
    justify-content: space-between;
  }
  .s2{
    flex: 0 0 120px;
    margin-left: 50px;
  }
</style>
