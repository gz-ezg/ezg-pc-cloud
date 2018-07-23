<template>
    <div>
        <Modal
            title="录入"
            width="800"
            v-model="open_add_rule"
        >
            <Form ref="add" :model="add" :label-width="100" style="margin:auto" :rules="addrule">
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
                            <Input type="textarea" v-model="add.equation" size="small" placeholder="[余额表:应交税金-应交个人所得税:本年借方]>0">
                            </Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row>
                    <Poptip trigger="hover" title="公式说明" content="content" style="margin-left:100px;margin-bottom:5px" placement="bottom">
                            <Button>公式说明</Button>
                            <div slot="content" style="width:700px">
                                <Row>示例1：[余额表:应交税金-应交个人所得税:本年借方]>0</Row>
                                <Row>示例2：([余额表:应交税金-应交增值税:本期贷方]!=[余额表:主营业务收入:本期贷方]*0.03||[余额表:应交税金-应交增值税:本期借方]!=</Row>
                                <Row>[余额表:主营业务收入:本期借方]*0.03)&&[余额表:应交税金-应交增值税:本期借方]!=[余额表:主营业务收入:本期借方]/0.01</Row>
                                <Row>公式规则：[{ 表名 }：{ 科目名 }：{ 可用值 } { 公式符号 } { 判断值 }]</Row>
                                <Row>参数说明:</Row>
                                <Row>表名：余额表，资产负债表</Row>
                                <Row>科目名：自行填写</Row>
                                <Row>可用值：</Row>
                                <Row style="margin-left:40px">余额表 => { 期初借方，期初贷方，本期借方，本期贷方，本年借方，本年贷方，期末借方，期末贷方 }</Row>
                                <Row style="margin-left:40px">资产负债表 => { 年初数，期末数 }</Row>
                                <Row>公式符号：>,=,<,!=......</Row>
                            </div> 
                        </Poptip>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="securityLine" label="警戒值：">
                            <Input type="textarea" size="small" v-model="add.securityLine">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="baseMessage" label="基础信息：">
                            <Input type="textarea" size="small" v-model="add.baseMessage"></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="smsMessage" label="短信信息：">
                            <Input type="textarea" size="small" v-model="add.smsMessage"></Input>
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
                            <Select transfer v-model="add.taxType" placeholder=""  size="small">
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
                            <Select transfer v-model="add.sendMsg" placeholder="" size="small">
                                <Option value="Y">是</Option>
                                <Option value="N">否</Option>
                            </Select>
                        </FormItem> 
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="before_add">新增</Button>
                <Button type="ghost" @click="close_rule_detail">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
// import Bus from '../../../../components/bus.js'
export default {
    data(){
        return{
            type:'',
            open_add_rule:false,
            add:{
                name:"",
                type:"",
                equation:"",
                checkPeriod:"",	
                taxType:"",
                baseMessage:"",	
                smsMessage:"",
                sendMsg:"",
                securityLine:"",
            },
            addrule:{
                name: [{ required: true, message: '必填项！', trigger: 'blur' }],
                equation: [{ required: true, message: '必填项！', trigger: 'blur' }],
                checkPeriod: [{ required: true, message: '必填项！', trigger: 'blur' }],
                taxType: [{ required: true, message: '必填项！', trigger: 'change' }],
                baseMessage: [{ required: true, message: '必填项！', trigger: 'blur' }],
                smsMessage: [{ required: true, message: '必填项！', trigger: 'blur' }],
                sendMsg: [{ required: true, message: '必填项！', trigger: 'change' }],
                securityLine: [{ required: true, message: '必填项！', trigger: 'blur' }]
            }
        }
    },
    methods: {
        before_add(){
            let _self = this
            this.$refs["add"].validate((valid) => {
                    if (valid) {
                        _self.add_rule_company()
                    } else {
                        this.$Message.error('请补全数据!');
                    }
                })
        },
        add_rule_company(){
            let _self = this
            let url = `api/order/cycle/finance/analysis/create`
            let config = {
                name:_self.add.name,
                equation:_self.add.equation,
                type:_self.type,
                checkPeriod:_self.add.checkPeriod,
                taxType:_self.add.taxType,
                baseMessage:_self.add.baseMessage,
                smsMessage:_self.add.smsMessage,
                sendMsg:_self.add.sendMsg,
                securityLine:_self.add.securityLine,
            }
            console.log(config)
            this.$http.post(url,config).then(function(res){
                // console.log(res.data.msgCode)
                if(res.data.msgCode == 40000){
                    _self.$Message.success('添加成功！')
                    _self.$bus.emit('updateauditrule',true)
                    // Bus.$emit('updateauditrule',true)
                    _self.open_add_rule = false
                    _self.add.name = "",
                    _self.add.equation = "",
                    _self.type = "",
                    _self.add.checkPeriod = "",
                    _self.add.taxType = "",
                    _self.add.baseMessage = "",
                    _self.add.smsMessage = "",
                    _self.add.sendMsg = "",
                    _self.add.securityLine = ""
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
        // Bus.$on('open_audit_page',(e)=>{
        //     _self.open_add_rule = true
        //     _self.type = e
        // })
        _self.$bus.on('open_audit_page',(e)=>{
            _self.open_add_rule = true
            _self.type = e
        })
    }
}
</script>
