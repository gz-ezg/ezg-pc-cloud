<template>

        <Modal
                v-model="openDeclareResult"
                title="申报结果"
                width="400"

        >
           <Form ref="formItem"   :label-width="100" style="width:340px;margin:auto">
                <Row :gutter="12">
                    <FormItem prop="finish_status" label="完成情况：">
                        <Select transfer v-model="formItem.finish_status" placeholder="">
                            <Option value="Y">成功</Option>
                            <Option value="N">失败</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <div v-if="formItem.finish_status=='Y'">
                <Row  :gutter="12">
                    <Col span="24">
                    <FormItem prop="record" label="预估企业收款：">
                        <Row :gutter="10">
                            <Col span="18">
                                <Input type="text" v-model="formItem.predictReceipt"></Input>
                            </Col>
                            <Col span="4">
                                元
                            </Col>
                        </Row>
                    </FormItem>
                    </Col>
                </Row>
                <Row v-if="currentRow.receipt_type=='proportion'">
                    <Col span="12">
                        <FormItem  prop="departid"  label="收款比例：">
                            {{currentRow.receipt_proportion}} %
                        </FormItem>
                    </Col>
                    <Col span="12">
                         <FormItem  prop="departid"  label="总收款:">
                             {{currentRow.receipt_proportion * formItem.predictReceipt/100 || 0}} 元
                        </FormItem>
                    </Col>
       
                </Row>

                <Row v-if="currentRow.receipt_type=='quota'">
                     <FormItem  prop="departid"  label="定额收款：">
                        {{currentRow.paynumber}} 元
                    </FormItem>
                </Row>  
                </div>



                <Row :gutter="12" v-if="formItem.finish_status=='N'">
                    <FormItem  prop="departid" label="失败说明： " >
                        <Input placeholder="失败说明" type="textarea" v-model="formItem.memo"></Input>
                    </FormItem>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="handleDeclareResult"  :loading="loading">确认</Button>
            </div>

        </Modal>

</template>

<script>

    export default {
        data(){

            return{
                loading: false,
                //  新增数据
                formItem:{
                    finish_status: 'Y'
                },
                openDeclareResult:false
            }
        },
        methods:{
            handleDeclareResult() {

                // if(!this.formItem.declare_year ){
                //     return this.$Message.warning("请填写申报年份");
                // }
                
                let url = 'api/order/work/order/plan/declare/result'
                let data = {}
                if(this.formItem.finish_status == 'Y') {
                    data = {
                        workOrderId: this.currentRow.work_order_id,
                        finish_status:'Y',
                        predictReceipt:this.formItem.predictReceipt
                    }
                } else {
                    data = {
                        workOrderId: this.currentRow.work_order_id,
                        finish_status: 'N',
                        memo: this.formItem.memo
                    }
                }
              

                function doSuccess(res) {
                    console.log(res);
                    this.formItem= Object.assign({},this.formItem,{predictReceipt: 0})
                }

                function fail(err){
                }

                this.$Post(url, data, doSuccess,fail)
            }
        },
        created(){
            this.$bus.on("open_declare_result",(e)=>{
                this.openDeclareResult = true
                this.currentRow = e;
                console.log('receipt_type', e.receipt_type)
                console.log('receipt_proportion', e.receipt_proportion)
            })
        }
    }
</script>
