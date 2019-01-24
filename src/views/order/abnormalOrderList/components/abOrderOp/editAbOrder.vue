<template>
   <div>
       <Modal
            title="编辑异常工单"
            v-model="openEditAbOrder"
            width="100"
            :mask-closable="false"
            @on-cancel="cancel"
       >
            <Form ref="abnormalOrderDetail" :model="abnormalOrderDetail" :rules="ruleInline" :label-width="100">
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="企业名称" prop="companyName">
                            <Input size="small" v-model="abnormalOrderDetail.companyName" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="联系人" prop="linkname">
                            <Input size="small" v-model="abnormalOrderDetail.linkname" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="联系电话" prop="linkTel">
                            <Input size="small" v-model="abnormalOrderDetail.linkTel" readonly/>
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
                            <Input type="textarea" :rows="2" size="small" v-model="abnormalOrderDetail.productContent" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter='16'>
                    <Col>
                        <FormItem label="审批事由" prop="reason">
                            <Input type="textarea" :rows="4" size="small" v-model="abnormalOrderDetail.reason" />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="edit">编辑</Button>
                <Button type="ghost" @click="openEditAbOrder = false">关闭</Button>
            </div> 
       </Modal>
          
  </div>
</template>

<script>

export default {
    data(){
        return{
            openEditAbOrder: false,
            abnormalOrderDetail: {
                applyId: '',
                companyId: '',
                companyName: '',
                linkname: '',
                linkTel: '',
                type: '',
                productContent: '',
                reason: ''
            }
        }
    },
    methods:{
        get_data(e){
            let _self = this
            let url = `api/order/unusual/workorder/searchWordOrderById`
            let config = {
                params:{
                    applyId : e.applyId
                }
            }

            function success(res){
                console.log(res)
                _self.abnormalOrderDetail.applyId = e.applyId
                _self.abnormalOrderDetail.companyId = res.data.data.companyId
                _self.abnormalOrderDetail.productContent = res.data.data.productContent
                _self.abnormalOrderDetail.reason = res.data.data.applyMemo
                _self.abnormalOrderDetail.type = res.data.data.unusualType
                _self.abnormalOrderDetail.companyName = e.companyname
                _self.abnormalOrderDetail.linkname = e.name
                _self.abnormalOrderDetail.linkTel = e.tel
                console.log(_self.abnormalOrderDetail)
            }

            this.$Get(url,config,success)
        },
        //编辑异常工单
        edit(){
            let _self = this
            let url = `api/order/unusual/workorder/editWorkOrder`
            let config = {
                applyId: _self.abnormalOrderDetail.applyId,
                companyId: _self.abnormalOrderDetail.companyId,
                unusualType: _self.abnormalOrderDetail.type,
                productContent: _self.abnormalOrderDetail.productContent,
                applyMemo: _self.abnormalOrderDetail.reason
            }

            function success(res){
                setTimeout(()=>{
                    _self.$Message.success("编辑成功！")
                    _self.$bus.emit('UPDATE_AB_ORDERLIST',true)
                    _self.openEditAbOrder = false
                }, 500)
            }
            function fail(){

            }

            this.$Post(url,config,success,fail)
        }
    },
    created() {
        this.$bus.off('OPEN_AB_ORDERLIST_EDIT',true)
        this.$bus.on('OPEN_AB_ORDERLIST_EDIT',(e) =>{
            this.get_data(e)
            this.openEditAbOrder = true
        })
    }
}
</script>
