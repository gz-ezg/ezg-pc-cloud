<template>
  <div>
    <Modal title="异常详情" width="1000" v-model="opendetail">
      <Form ref="detail" :model="detail" :label-width="120" style="width:900px;margin:auto">
        <Row :gutter="16">
          <Col span="12">
            <FormItem prop="companyname" label="公司：">
              <Input type="text" size="small" v-model="detail.companyname" readonly></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem prop="product" label="服务内容：">
              <Input type="text" size="small" v-model="detail.product" readonly></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="12">
            <FormItem prop="serverrealname" label="服务人员：">
              <Input type="text" size="small" v-model="detail.serverrealname" readonly></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem prop="followrealname" label="市场人员：">
              <Input type="text" size="small" v-model="detail.followrealname" readonly></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="12">
            <FormItem prop="companyfname" label="异常情况（企业）：">
              <Input type="textarea" v-html="detail.companyfname" readonly></Input>
              <!-- <div v-html="detail.companyfname" style="border:#D3D3D3 solid 1px；padding:5px"></div> -->
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem prop="acconterfname" label="异常情况（财务）：">
              <Input type="textarea" v-html="detail.acconterfname" readonly></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="12">
            <FormItem prop="detail" label="是否处理：">
              <Select transfer v-model="detail.batch_book_status" placeholder>
                <Option
                  v-for="(item,index) in disposes"
                  :key="index"
                  :value="item.typecode"
                >{{item.typename}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>

      <div slot="footer">
        <Button type="primary" @click="update" :disabled="updateButton">更新数据</Button>
        <Button type="primary" @click="save">保存</Button>
        <Button type="ghost" @click="opendetail=false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "testPackage_index",
  data() {
    return {
      detail: {},
      opendetail: true
    };
  },
  methods: {
    update() {}
  },   
  created(){
      this.update();
  },
};
</script>
<style scoped>
</style>