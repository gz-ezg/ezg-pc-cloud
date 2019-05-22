<template>

    <Modal
            v-model="openUpdateOrderItemPlan"
            title="补全企划订单"
            width="400"

    >
        <Form ref="formItem"   :label-width="100" style="width:300px;margin:auto">
            <Row :gutter="16">
                <FormItem label="申报年份：">
                    <DatePicker
                            type="year"
                            format="yyyy"
                            v-model="formItem.declare_year"
                            :disabled="isDisabled"
                            placeholder="选择年份"
                            style="width: 120px"
                    ></DatePicker>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <FormItem label="收款类型：">
                    <RadioGroup  v-model='formItem.receipt_flag' v-on >
                        <Radio label="quota">定额收款</Radio>
                        <Radio label="proportion">比例收款</Radio>
                    </RadioGroup>
                </FormItem>

            </Row>

            <Row :gutter="16" v-if=" formItem.receipt_flag == 'quota'">
                <Col span="24">
                <FormItem label="定额收款：">
                    <Input type="text" v-model="formItem.company_amount" :rows=rows></Input>
                </FormItem>
                </Col>
            </Row>
            <Row :gutter="16" >
                <FormItem  v-if=" formItem.receipt_flag == 'proportion'"  label="收款比例：">
                    <Input type="text" v-model="formItem.receipt_proportion" :rows=rows></Input>%
                </FormItem>

            </Row>

        </Form>
        <div slot="footer">
            <Button type="primary"  :loading="loading" @click="updateOrderItemPlan">确认</Button>
        </div>

    </Modal>

</template>

<script>

    export default {

        data(){

            return{
                loading: false,
                currentRow:{},
                //  新增数据
                formItem:{},
                openUpdateOrderItemPlan:false
            }
        },
        methods:{

            updateOrderItemPlan(){
                let _self = this
                if(!_self.formItem.declare_year ){
                    _self.$Message.warning("请填写申报年份");
                }
                console.log(_self.formItem.declare_year);

                let url = 'api/order/item/plan/update'
                let _data = {
                    itemId: _self.currentRow.itemId,
                    declareYear:_self.formItem.declare_year.getFullYear(),
                    receiptType:_self.formItem.receipt_flag,
                    paynumber: _self.formItem.company_amount,
                    receiptProportion:_self.formItem.receipt_proportion
                }

                function doSuccess(res) {
                    console.log(res);

                }

                function fail(err){


                }

                _self.$Post(url, _data, doSuccess)
            }
        },
        created(){
            let _self =this;
            this.$bus.on("update_order_item_plan",(e)=>{
                _self.openUpdateOrderItemPlan = true
            _self.currentRow = e;
        })
        }
    }
</script>
