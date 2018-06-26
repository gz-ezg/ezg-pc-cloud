<template>
    <div>
        <Modal
            title="录入"
            width="800"
            v-model="open_add_rule"
        >
            <Form ref="add" :model="add" :label-width="100" style="margin:auto">
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="name" label="规则名称：">
                            <Input type="text" size="small" v-model="add.name">
                            </Input>
                        </FormItem> 
                    </Col>
                    <Col span="24">
                        <FormItem prop="leftEquation" label="左边公式：">
                            <Input type="textarea" v-model="add.leftEquation">
                            </Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="symbol" label="测算符号：">
                            <Select transfer v-model="add.symbol" placeholder="" >
                                <Option value="==">等于</Option>
                                <Option value=">">大于</Option>
                                <Option value=">=">大于等于</Option>
                                <Option value="<">小于</Option>
                                <Option value="<=">小于等于</Option>
                                <Option value="!=">不等于</Option>
                                <Option value="||">或者</Option>
                                <Option value="&&">并且</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="rightEquation" label="右边公式：">
                            <Input type="textarea" v-model="add.rightEquation">
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
                        <FormItem prop="baseMessage" label="基础信息：">
                            <Input type="textarea" v-model="add.baseMessage"></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="smsMessage" label="短信信息：">
                            <Input type="textarea" v-model="add.smsMessage"></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="checkPeriod" label="检查期间：">
                            <Input type="text" size="small" v-model="add.checkPeriod"></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="taxType" label="做账类型：">
                            <Select transfer v-model="add.taxType" placeholder="" transfer>
                                <Option value="all">全部</Option>
                                <Option value="tax3">小规模</Option>
                                <Option value="tax17">一般纳税人</Option>
                            </Select>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="sendMsg" label="发送短信：">
                            <Select transfer v-model="add.sendMsg" placeholder="" transfer>
                                <Option value="Y">是</Option>
                                <Option value="N">否</Option>
                            </Select>
                        </FormItem> 
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="add_rule_company">新增</Button>
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
            type:'',
            open_add_rule:false,
            add:{
                name:"",
                leftEquation:"",
                rightEquation:"",	
                symbol:"",	
                type:"",	
                checkPeriod:"",	
                taxType:"",
                baseMessage:"",	
                smsMessage:"",
                sendMsg:"",
                security_line:""
            }
        }
    },
    methods: {
        add_rule_company(){
            let _self = this
            let url = `api/order/cycle/finance/analysis/create`
            let config = {
                name:_self.add.name,
                leftEquation:_self.add.leftEquation,
                rightEquation:_self.add.rightEquation,
                symbol:_self.add.symbol,
                type:_self.type,
                checkPeriod:_self.add.checkPeriod,
                taxType:_self.add.taxType,
                baseMessage:_self.add.baseMessage,
                smsMessage:_self.add.smsMessage,
                sendMsg:_self.add.sendMsg,
                security_line:_self.add.security_line
            }
            console.log(config)
            this.$http.post(url,config).then(function(res){
                // console.log(res.data.msgCode)
                if(res.data.msgCode == 40000){
                    _self.$Message.success('添加成功！')
                    Bus.$emit('updateauditrule',true)
                    _self.open_add_rule = false
                    _self.add.name = "",
                    _self.add.leftEquation = "",
                    _self.add.rightEquation = "",
                    _self.add.symbol = "",
                    _self.type = "",
                    _self.add.checkPeriod = "",
                    _self.add.taxType = "",
                    _self.add.baseMessage = "",
                    _self.add.smsMessage = "",
                    _self.add.sendMsg = "",
                    _self.add.security_line = ""
                }else{
                    _self.$Message.error('新增失败！')
                }
            }).catch(function(error){
                _self.$Message.error('新增失败！')
                }
            )},
        close_rule_detail(){
            this.add = ""
            this.open_add_rule = false
        }
    },
    created () {
        let _self = this
        Bus.$on('open_audit_page',(e)=>{
            _self.open_add_rule = true
            _self.type = e
        })
    }
}
</script>
