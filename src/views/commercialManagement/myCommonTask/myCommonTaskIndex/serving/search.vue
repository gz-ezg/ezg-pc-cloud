<template>
  <div @keydown.enter="search">
    <Poptip title="筛选" placement="bottom-end" width="700" style="float:right;margin-right:20px">
        <Button type="text" size="large" icon="funnel">筛选</Button>
        <div  slot="content">
          <Form ref="formInline" :model="formInline" :label-width="100">
             <Row :gutter="16">
                <Col span="12">
                    <FormItem prop="companyName" label="公司名称：">
                        <Input type="text" v-model="formInline.companyName" placeholder="">
                        </Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem prop="companyName" label="客户名称：">
                        <Input type="text" v-model="formInline.companyName" placeholder="">
                        </Input>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col span="12">
                    <FormItem prop="companyName" label="部门名称：">
                        <Input type="text" v-model="formInline.companyName" placeholder="">
                        </Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem prop="companyName" label="订单编号：">
                        <Input type="text" v-model="formInline.companyName" placeholder="">
                        </Input>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col span="12">
                    <FormItem prop="companyName" label="产品名称：">
                        <Input type="text" v-model="formInline.companyName" placeholder="">
                        </Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem prop="companyName" label="目前进度：">
                        <Input type="text" v-model="formInline.companyName" placeholder="">
                        </Input>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col span="12">
                    <FormItem prop="companyName" label="下个进度：">
                        <Input type="text" v-model="formInline.companyName" placeholder="">
                        </Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem prop="companyName" label="服务开始时间：">
                        <Input type="text" v-model="formInline.companyName" placeholder="">
                        </Input>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col span="12">
                    <FormItem prop="companyName" label="创建时间：">
                        <Input type="text" v-model="formInline.companyName" placeholder="">
                        </Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem prop="companyName" label="实际完成时间：">
                        <Input type="text" v-model="formInline.companyName" placeholder="">
                        </Input>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col span="12">
                    <FormItem prop="companyName" label="服务人员：">
                        <Input type="text" v-model="formInline.companyName" placeholder="">
                        </Input>
                    </FormItem>
                </Col>
                <!-- <Col span="12">
                    <FormItem prop="companyName" label="服务部门：">
                        <Input type="text" v-model="formInline.companyName" placeholder="">
                        </Input>
                    </FormItem>
                </Col> -->
                <Col span="12">
                    <FormItem prop="companyName" label="创建人：">
                        <Input type="text" v-model="formInline.companyName" placeholder="">
                        </Input>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
            </Row>
            <FormItem>
              <Button type="primary" @click="search">搜索</Button>
              <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
            </FormItem>
          </Form>
        </div>
    </Poptip>
  </div>
</template>

<script>
import Bus from '../../../../../components/bus'

export default {
  data () {
    return {
      formInline:{
        companyName:'',
        ordercode:'',
        createbyname:'',
        approval:''
      }
    }
  },
  methods:{
    search(){
      Bus.$emit('search',this.formInline)
    },
    reset(){
      this.formInline.companyName = ''
      this.formInline.ordercode = ''
      this.formInline.createbyname = ''
      this.formInline.approval = ''
      Bus.$emit('reset',true)
    }
  }

}

</script>
