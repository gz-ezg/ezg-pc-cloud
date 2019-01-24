<template>
   <div>
       <Modal
            title="查看异常工单"
            v-model="openShowAbOrderDetail"
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
                                <Radio label="LowPrice" disabled>优惠价格</Radio>
                                <Radio label="Discount" disabled>产品折扣</Radio>
                                <Radio label="Gift" disabled>赠送</Radio>
                                <Radio label="Cancel" disabled>注销</Radio>
                                <Radio label="Other" disabled>其他</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter='16'>
                    <Col>
                        <FormItem label="产品内容" prop="productContent">
                            <Input type="textarea" :rows="2" size="small" v-model="abnormalOrderDetail.productContent" readonly />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter='16'>
                    <Col>
                        <FormItem label="审批事由" prop="reason">
                            <Input type="textarea" :rows="4" size="small" v-model="abnormalOrderDetail.reason" readonly />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="openShowAbOrderDetail = false">关闭</Button>
            </div> 
       </Modal>
          
  </div>
</template>

<script>

export default {
    data(){
        return{
            openShowAbOrderDetail: false,
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
        }
    },
    created() {
        this.$bus.off('OPEN_AB_ORDERLIST_DETAIL',true)
        this.$bus.on('OPEN_AB_ORDERLIST_DETAIL',(e) =>{
            this.get_data(e)
            this.openShowAbOrderDetail = true
        })
    }
}
</script>
