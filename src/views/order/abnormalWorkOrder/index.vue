<template>
   <div>
    <Card>  
        <Form ref="abnormalOrderDetail" :model="abnormalOrderDetail" :rules="ruleInline" :label-width="100">
            <Row :gutter="16">
                <Col span="8">
                    <FormItem label="企业名称" prop="companyName">
                        <Input size="small" v-model="abnormalOrderDetail.companyName" @on-focus="open_company" readonly/>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="联系人" prop="linkname">
                        <Input size="small" v-model="abnormalOrderDetail.linkname" @on-focus="open_company" readonly/>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="联系电话" prop="linkTel">
                        <Input size="small" v-model="abnormalOrderDetail.linkTel" @on-focus="open_company" readonly/>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter='16'>
                <Col>
                    <FormItem label="异常类别" prop="type">
                        <RadioGroup v-model="abnormalOrderDetail.type">
                            <Radio label="优惠价格"></Radio>
                            <Radio label="产品折扣"></Radio>
                            <Radio label="赠送"></Radio>
                            <Radio label="注销"></Radio>
                            <Radio label="其它"></Radio>
                        </RadioGroup>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter='16'>
                <Col>
                    <FormItem label="产品名称" prop="productName">
                        <Input type="textarea" :rows="2" size="small" v-model="abnormalOrderDetail.productName"  />
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter='16'>
                <Col>
                    <FormItem label="审批事由" prop="reason">
                        <Input type="textarea" :rows="4" size="small" v-model="abnormalOrderDetail.reason"  />
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter='16'>
                <Col span="2" offset="22">
                    <Button type="info" @click="submit('abnormalOrderDetail')">确定提交</Button>
                </Col>
            </Row>
        </Form>   
    </Card>
    <company-select @company-change="setting_company"></company-select>
  </div>
</template>

<script>
import companySelect from './companySelect'

export default {
    name: "abnormalWorkOrder_index",
    components: {
        companySelect
    },
    data(){
        return{
            abnormalOrderDetail: {
                companyName: '',
                linkname: '',
                linkTel: '',
                type: '',
                productName: '',
                reason: ''
            },
            ruleInline: {
                companyName: [
                    { required: true, message: '请选择！', trigger: 'change' }
                ],
                linkname: [
                    { required: true, message: '请选择！', trigger: 'change' }
                ],
                linkTel: [
                    { required: true, message: '请选择！', trigger: 'change' }
                ]
            }
        }
    },
    methods:{
        //选择公司
        open_company(){
            this.$bus.emit("AB_ORDER_OPEN_SELECT_COMPANY", true)
        },
        //选择公司后回调
        setting_company(e){
            console.log(e)
            this.abnormalOrderDetail.companyName = e.companyname
            this.abnormalOrderDetail.linkname = e.customerName
            this.abnormalOrderDetail.linkTel = e.customerTel
        },
        //提交
        submit(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('提交成功!');
                    console.log(this.abnormalOrderDetail)
                } else {
                    this.$Message.error('请先补全相关信息!');
                }
            })
        }
    }
}
</script>
