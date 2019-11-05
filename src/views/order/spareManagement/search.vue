<!--  -->
<template>
  <div @keydown.enter="search">
    <Form ref="formInline" :model="formInline" :label-width="80">
      <Row>
        <Col span="6">
          <FormItem prop="companyName" label="公司名称：">
            <Input type="text" v-model="formInline.companyName" placeholder="" size="small"> </Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="orderId" label="订单编号：">
            <Input type="text" v-model="formInline.ordercode" placeholder="" size="small"> </Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="createbyname" label="销售人员：">
            <Input type="text" v-model="formInline.createbyname" placeholder="" size="small"> </Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="approval" label="审批状况：">
            <Select transfer type="text" v-model="formInline.approval" placeholder="" size="small">
              <Option value="Y">待审批</Option>
              <Option value="N">无审批</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem prop="product" label="产品名称">
            <Input type="text" v-model="formInline.product" placeholder="" size="small"/>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem>
            <Button size="small" type="primary" @click="search">搜索</Button>
            <Button size="small" type="ghost" style="margin-left:20px" @click="reset">重置</Button>
          </FormItem>
        </Col>
      </Row>
      <FormItem>

      </FormItem>
    </Form>
  </div>
</template>

<script>
import Bus from './bus';

export default {
  data() {
    return {
      formInline: {
        companyName: '',
        ordercode: '',
        createbyname: '',
        approval: '',
        product: '',
      }
    };
  },
  methods: {
    search() {
      this.$bus.emit('search', this.formInline);
      // Bus.$emit('search',this.formInline)
    },
    reset() {
      this.formInline.companyName = '';
      this.formInline.ordercode = '';
      this.formInline.createbyname = '';
      this.formInline.approval = '';
      this.$bus.emit('reset', true);
      // Bus.$emit('reset',true)
    }
  }
};
</script>

<style>
  .ivu-col-span-6 {
    height: 28px;
  }
</style>