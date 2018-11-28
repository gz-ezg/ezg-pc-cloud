<template>
    <div>
        <Modal
            title="编辑"
            width="800"
            v-model="open_edit_rule"
        >
            <Form ref="add" :model="add" :label-width="100" style="width:650px;margin:auto" :rules="addrule">
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="name" label="规则名称：">
                            <Input type="text" size="small" v-model="add.name">
                            </Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="equation" label="公式：">
                            <Input type="textarea" v-model="add.equation">
                            </Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="security_line" label="警戒值：">
                            <Input type="textarea" v-model="add.security_line">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="base_message" label="基础信息：">
                            <Input type="textarea" v-model="add.base_message"></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="sms_message" label="短信信息：">
                            <Input type="textarea" v-model="add.sms_message"></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="check_period" label="检查期间：">
                            <Input type="text" size="small" v-model="add.check_period"></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="tax_type" label="做账类型：">
                            <Select transfer v-model="add.tax_type" placeholder="" >
                                <Option value="all">全部</Option>
                                <Option value="tax3">小规模</Option>
                                <Option value="tax17">一般纳税人</Option>
                            </Select>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="send_msg" label="发送短信：">
                            <Select transfer v-model="add.send_msg" placeholder="" >
                                <Option value="Y">是</Option>
                                <Option value="N">否</Option>
                            </Select>
                        </FormItem> 
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="before_add">修改</Button>
                <Button type="ghost" @click="close_rule_detail">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Bus from '../../../../components/bus.js'
export default {
    data(){
        return{
            open_edit_rule:false,
            add:{
                type:"",
                id:"",
                name:"",
                equation:"",
                type:"",	
                check_period:"",	
                tax_type:"",
                base_message:"",	
                sms_message:"",
                send_msg:"",
                security_line:"",
            },
            addrule:{
                name: [{ required: true, message: '必填项！', trigger: 'blur' }],
                equation: [{ required: true, message: '必填项！', trigger: 'blur' }],
                check_period: [{ required: true, message: '必填项！', trigger: 'blur' }],
                tax_type: [{ required: true, message: '必填项！', trigger: 'change' }],
                base_message: [{ required: true, message: '必填项！', trigger: 'blur' }],
                sms_message: [{ required: true, message: '必填项！', trigger: 'blur' }],
                send_msg: [{ required: true, message: '必填项！', trigger: 'change' }],
                security_line: [{ required: true, message: '必填项！', trigger: 'blur' }]
            }
        }
    },
    methods: {
        before_add(){
            let _self = this
            this.$refs["add"].validate((valid) => {
                    if (valid) {
                        _self.edit_rule_company()
                    } else {
                        this.$Message.error('请补全数据！');
                    }
                })
        },
        edit_rule_company(){
            let _self = this
            let url = `api/order/cycle/finance/analysis/update`
            let config = {
                id:_self.add.id,
                name:_self.add.name,
                equation:_self.add.left_equation,
                type:_self.add.type,
                checkPeriod:_self.add.check_period,
                taxType:_self.add.tax_type,
                baseMessage:_self.add.base_message,
                smsMessage:_self.add.sms_message,
                sendMsg:_self.add.send_msg,
                securityLine:_self.add.security_line,
            }
            this.$http.post(url,config).then(function(res){
                // console.log(res.data.msgCode)
                if(res.data.msgCode == 40000){
                    _self.$Message.success('修改成功！')
                    // Bus.$emit('updateauditrule',true)
                    _self.$bus.emit('updateauditrule',true)
                    _self.open_edit_rule = false
                }else{
                    _self.$Message.error('修改失败！')
                }
            }).catch(function(error){
                _self.$Message.error('修改失败！')
                }
            )},
        close_rule_detail(){
            // this.add = ""
            this.open_edit_rule = false
        }
    },
    created () {
        let _self = this
        _self.$bus.on('edit_audit_page',(e)=>{
            // console.log(e)
            _self.open_edit_rule = true
            _self.add = e
        })
        // Bus.$on('edit_audit_page',(e)=>{
        //     console.log(e)
        //     _self.open_edit_rule = true
        //     _self.add = e
        // })
    }
}
</script>
