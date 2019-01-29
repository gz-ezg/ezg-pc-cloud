<template>
   <div>
       <Modal
            title="新增异常工单"
            :value="true"
            width="100"
            @on-cancel="close"
       >
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
                                <Radio label="LowPrice">优惠价格</Radio>
                                <Radio label="Discount">产品折扣</Radio>
                                <Radio label="Gift">赠送</Radio>
                                <Radio label="Cancel">注销</Radio>
                                <Radio label="Other">其他</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter='16'>
                    <Col>
                        <FormItem label="产品内容" prop="productContent">
                            <Input type="textarea" :rows="2" size="small" v-model="abnormalOrderDetail.productContent"  />
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
            </Form>
            <div slot="footer">
                <Button type="primary" @click="create('abnormalOrderDetail')" >创建</Button>
                <Button type="ghost" @click="close">关闭</Button>
            </div> 
       </Modal>
          
    <company-select @company-change="setting_company"></company-select>
  </div>
</template>

<script>
import companySelect from '../companySelect'

export default {
    name: "abnormalWorkOrder_index",
    components: {
        companySelect
    },
    data(){
        return{
            openAddAbOrderDetail: false,
            abnormalOrderDetail: {
                companyId: '',
                companyName: '',
                linkname: '',
                linkTel: '',
                type: '',
                productContent: '',
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
                ],
                type: [
                    { required: true, message: '请选择！', trigger: 'change' }
                ],
                productContent: [
                    { required: true, message: '不能为空！', trigger: 'change' }
                ],
                reason: [
                    { required: true, message: '不能为空！', trigger: 'change' }
                ],
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
            this.abnormalOrderDetail.companyId = e.id
            this.abnormalOrderDetail.companyName = e.companyname
            this.abnormalOrderDetail.linkname = e.customerName
            this.abnormalOrderDetail.linkTel = e.customerTel
        },
        //提交
        create(name){
            let _self = this
            this.$refs[name].validate((valid) => {
                if (valid) {
                    _self.add_ab_order()
                    _self.close()
                } else {
                    _self.$Message.error('请先补全相关信息!');
                }
            })
        },
        //确定增加
        add_ab_order(){
            let _self = this
            let url = `api/order/unusual/workorder/addWorkOrder`
            let config = {
                companyId: _self.abnormalOrderDetail.companyId,
                unusualType: _self.abnormalOrderDetail.type,
                productContent: _self.abnormalOrderDetail.productContent,
                applyMemo: _self.abnormalOrderDetail.reason
            }

            function success(res){
                console.log(res)
                _self.$Message.success('提交成功!');
                _self.$bus.emit('OPEN_AB_ORDER_LIST',true)
                _self.openAddAbOrderDetail = false
            }

            function fail(){

            }

            this.$Post(url,config,success,fail)
        },
        //关闭新增弹窗
        close(e){
            this.$emit("close", e)
        },
    },
    created() {
        
    }
}
</script>
