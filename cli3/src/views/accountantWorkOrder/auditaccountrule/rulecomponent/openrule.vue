<template>
    <div>
        <Modal
            title="查看"
            width="800"
            v-model="open_show_rule"
        >
            <Form ref="add" :model="add" :label-width="100" style="width:650px;margin:auto">
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="name" label="规则名称：">
                            <Input type="text" size="small" v-model="add.name" disabled>
                            </Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="equation" label="左边公式：">
                            <Input type="textarea" v-model="add.equation" disabled :rows="5">
                            </Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="security_line" label="警戒值：">
                            <Input type="text" size="small" v-model="add.security_line" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="base_message" label="基础信息：">
                            <Input type="text" size="small" v-model="add.base_message" disabled></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="sms_message" label="短信信息：">
                            <Input type="textarea" v-model="add.sms_message" disabled autosize></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="check_period" label="检查期间：">
                            <Input type="text" size="small" v-model="add.check_period" disabled></Input>
                        </FormItem> 
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="tax_type" label="做账类型：">
                            <Select transfer v-model="add.tax_type" placeholder="" disabled >
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
                            <Select transfer v-model="add.send_msg" placeholder="" disabled >
                                <Option value="Y">是</Option>
                                <Option value="N">否</Option>
                            </Select>
                        </FormItem> 
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <!-- <Button type="primary" @click="edit_rule_company">修改</Button> -->
                <Button type="ghost" @click="open_show_rule=false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
// import Bus from '../../../../components/bus.js'
export default {
    data(){
        return{
            open_show_rule:false,
            add:{
                id:"",
                name:"",
                equation:"",
                symbol:"",	
                type:"",	
                check_period:"",	
                tax_type:"",
                base_message:"",	
                sms_message:"",
                send_msg:"",
                security_line:"",
            }
        }
    },
    methods: {
    },
    created () {
        let _self = this
        // Bus.$on('show_audit_page',(e)=>{
        //     // console.log(e)
        //     _self.open_show_rule = true
        //     _self.add = e
        // })
        this.$bus.on('show_audit_page',(e)=>{
            _self.open_show_rule = true
            _self.add = e
        })
    }
}
</script>
