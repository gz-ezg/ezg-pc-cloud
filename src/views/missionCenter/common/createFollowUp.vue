<template>
            <Modal
                v-model="openFollowUp"
                title="新增跟进"
                width="700"
            >                 
                </Row>
                <Form ref="addDetailContent" :model="addDetailContent" :label-width="120" :rule="addDetailContentRule">
                    <Row :gutter="16">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="20">
                            <FormItem label="公司名称：" style="margin-bottom:5px">
                                {{companyInfo.companyname}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="20">
                            <FormItem label="归属客户：" style="margin-bottom:5px">
                                {{companyInfo.NAME}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="20">
                            <FormItem prop="followUpType" label="跟进类型：" style="margin-bottom:5px">
                                <Select transfer v-model="addDetailContent.followUpType" size="small">
                                    <Option v-for="item in followTypeText" :value="item.typecode" :key="item.typecode">{{item.typename}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="20">
                            <FormItem prop="content" label="跟进内容：" style="margin-bottom:5px">
                                <Input v-model="addDetailContent.content" type="textarea"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div slot="footer">
                    <!-- <Button type="primary" @click="add_workorder_followup" :loading="followUp_loading">新增</Button> -->
                    <Button type="primary" @click="upload" :loading="followUp_loading">新增</Button>
                    <Button type="ghost" @click="cancel_workorder_followup">重置</Button>                    
                </div>
        </Modal>
</template>

<script>
export default {
    data(){
        return{
            openFollowUp: false,
            addDetailContent:{
                content: "",
                followUpType: ""
            },
            companyInfo:{
                companyname: "",
                NAME: ""
            },
            followTypeText: [],
            followUp_loading: false,
            addDetailContentRule:{
                followUpType:[{ required: true, message: '必选项！', trigger: 'change', type:'string' }],
                content:[{ required: true, message: '必填项！', trigger: 'change', type:'string' }],
            }
        }
    },
    methods:{
        GetFollowUpType(){
            var _self = this
            _self.followTypeText = []
            let params = "markert_follow_up_type"
                
            function success(res){
                for(let i = 0;i<res.data.data.markert_follow_up_type.length;i++){
                    var temp={}
                    if(res.data.data.markert_follow_up_type[i].typecode == 21||res.data.data.markert_follow_up_type[i].typecode == 22){
                    }else{
                        temp.typecode=res.data.data.markert_follow_up_type[i].typecode
                        temp.typename=res.data.data.markert_follow_up_type[i].typename
                        temp.id=res.data.data.markert_follow_up_type[i].id
                        _self.followTypeText.push(temp)
                    }
                }
            }
            this.$GetDataCenter(params, success)
        },
        cancel_workorder_followup(){
            let _self = this
            _self.$refs["addDetailContent"].resetFields()
        },
        upload(){
            // let _self = this
            // console.log("1222222222")
            // this.$refs["addDetailContent"].validate((valid) => {
            //     if (valid) {
            //         // console.log("111")
            //         _self.submit()
            //     } else {

            //     }
            // })
            if(this.addDetailContent.content && this.addDetailContent.followUpType){
                this.submit()
            }else{
                this.$Message.fail("请补全信息！")
            }
        },
        submit(){
            let url =  `api/customer/addCustomerContentNote`
            let _self = this
            _self.followUp_loading = true

            let config = {
                content: _self.addDetailContent.content,
                customerId: _self.companyInfo.custId,
                companyId: _self.companyInfo.company_id,
                followUpType: _self.addDetailContent.followUpType
            }
            function success(res){
                _self.cancel_workorder_followup()
                _self.openFollowUp = false
                _self.followUp_loading = false
                _self.$bus.emit("FINISH_DEAL_WITH_SCHELCE",true)
            }
            function fail(res){                    
                _self.followUp_loading = false
            }
            this.$Post(url, config, success, fail)
        }
    },
    created() {
        let _self = this
        this.GetFollowUpType()
        _self.$bus.off("OPEN_SCHEDULE_FOLLOWUP",true)
        _self.$bus.on("OPEN_SCHEDULE_FOLLOWUP",(e)=>{
            _self.companyInfo = e
            _self.openFollowUp = true
        })
    },
}
</script>

