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
            <FormItem>
              <Button type="primary" @click="search">搜索</Button>
              <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
            </FormItem>
        </Form>
  	</div>
</template>

<script>
import Bus from '../bus'

export default {
  data () {
    return {
      formInline:{
        companyName:'',
        ordercode:'',
        createbyname:''
      }
    }
  },
  methods:{
    search(){
      Bus.$emit('search1',this.formInline)
    },
    reset(){
      this.formInline.companyName = ''
      this.formInline.ordercode = ''
      this.formInline.createbyname = ''
      Bus.$emit('reset1',true)
    }
  }

}

</script>
