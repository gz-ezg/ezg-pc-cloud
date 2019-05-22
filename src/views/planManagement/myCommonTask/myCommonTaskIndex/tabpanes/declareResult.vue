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
                                <Input type="text" v-model="formItem.company_amount" :rows=rows></Input>
                            </Col>
                            <Col span="4">
                                元
                            </Col>
                        </Row>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem  prop="departid"  label="收款比例：">
                            <Input disabled type="text" v-model="formItem.receipt_proportion" :rows=rows></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                         <FormItem  prop="departid"  label="总收款:">
                            <Input disabled type="text" v-model="formItem.receipt_amount" :rows=rows></Input>
                        </FormItem>
                    </Col>
       
                </Row>

                <Row>
                     <FormItem  prop="departid"  label="定额收款：">
                        <Input disabled type="text" v-model="formItem.record" :rows=rows></Input>
                    </FormItem>
                </Row>
                </div>



                <Row :gutter="12" v-if="formItem.finish_status=='N'">
                    <FormItem  prop="departid" label="失败说明： " >
                        <Input placeholder="失败说明" type="textarea" v-model="formItem.record" :rows=rows></Input>
                    </FormItem>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary"  :loading="loading">确认</Button>
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
        },
        created(){
            let _self =this;
            this.$bus.on("open_declare_result",(e)=>{
                _self.openDeclareResult = true
            })
        }
    }
</script>
