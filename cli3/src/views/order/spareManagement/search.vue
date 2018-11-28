<!--  -->
<template>
	<div @keydown.enter="search">
    	<Form ref="formInline" :model="formInline" :label-width="80">
            <Row :gutter="16">
				<Col span="8">
					<FormItem prop="companyName" label="公司名称：">
						<Input type="text" v-model="formInline.companyName" placeholder="" size="small">
						</Input>
					</FormItem>
				</Col>
				<Col span="8">				
					<FormItem prop="orderId" label="订单编号：">
						<Input type="text" v-model="formInline.ordercode" placeholder="" size="small">
						</Input>
					</FormItem>
				</Col>
				<Col span="8">
					<FormItem prop="createbyname" label="销售人员：">
						<Input type="text" v-model="formInline.createbyname" placeholder="" size="small">
						</Input>
					</FormItem>
				</Col>
            </Row>
            <Row :gutter="16">
				<Col span="8">
					<FormItem prop="approval" label="审批状况：">
						<Select transfer type="text" v-model="formInline.approval" placeholder="" size="small">
						<Option  value="Y" >待审批</Option>
						<Option  value="N" >无审批</Option>
						</Select>
					</FormItem>
				</Col>
            </Row>
            <FormItem>
				<Button type="primary" @click="search">搜索</Button>
				<Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
			</FormItem>
          </Form>
  </div>
</template>

<script>
import Bus from './bus'

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
			this.$bus.emit('search',this.formInline)
      // Bus.$emit('search',this.formInline)			
    },
    reset(){
      this.formInline.companyName = ''
      this.formInline.ordercode = ''
      this.formInline.createbyname = ''
      this.formInline.approval = ''
      this.$bus.emit('reset',true)
      // Bus.$emit('reset',true)
    }
  }

}

</script>
