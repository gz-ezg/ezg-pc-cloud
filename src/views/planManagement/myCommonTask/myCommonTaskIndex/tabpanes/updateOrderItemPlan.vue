<template>

    <Modal
            v-model="openUpdateOrderItemPlan"
            title="补全企划订单"
            width="400"

    >
        <Form ref="formItem"   :label-width="100" style="width:300px;margin:auto">
            <Row :gutter="16">
                <FormItem prop="finish_status" label="完成情况：">
                    <Select transfer v-model="formItem.finish_status" placeholder="">
                        <Option value="Y">完成</Option>
                        <Option value="N">未完成</Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col span="24">
                <FormItem prop="record" label="预估企业收款：">
                    <Input type="text" v-model="formItem.company_amount" :rows=rows></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <FormItem  prop="departid"  label="收款比例：">
                    <Input type="text" v-model="formItem.receipt_proportion" :rows=rows></Input>
                </FormItem>

                <FormItem  prop="departid"  label="总收款:">
                    <Input type="text" v-model="formItem.receipt_amount" :rows=rows></Input>
                </FormItem>

            </Row>
            <Row>
                <FormItem  prop="departid"  label="定额收款：">
                    <Input type="text" v-model="formItem.record" :rows=rows></Input>
                </FormItem>
            </Row>
            <Row>
                <FormItem  prop="departid" >
                    <Input type="textarea" v-model="formItem.record" :rows=rows></Input>
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
                formItem:{},
                openUpdateOrderItemPlan:false
            }
        },
        methods:{
        },
        created(){
            let _self =this;
            this.$bus.on("update_order_item_plan",(e)=>{
                _self.openUpdateOrderItemPlan = true
        })
        }
    }
</script>
