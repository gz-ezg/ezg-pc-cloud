<template>
    <div>
        <Modal
            v-model="pause"
            title="收款明细"
            @on-cancel="close"
            width="600"
        >
            <Row :gutter="20">
                <Col span="12">
                    <Form ref="formValidate" :model="formValidate" :label-width="80">
                        <FormItem label="收款金额" prop="amount">
                            <Input v-model="formValidate.amount" placeholder="输入收款金额">
                                <Button slot="append" icon="plus" @click="submit" :disabled="submitLoading"></Button>
                            </Input>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
            <Row :gutter="20">
                <Col span="24">
                    <Table
                        highlight-row
                        size="small"
                        :columns="header"
                        :data="data"
                        @on-current-change="click_current_row"
                        :loading="loading"
                    ></Table>
                </Col>
            </Row>
            <div slot="footer">
                <Button type="ghost" style="margin-left:20px" @click="close">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: [String, Number],
            default: ""
        }
    },
    data(){
        return {
            formValidate: {
                amount: ""
            },
            submitLoading: false,
            pause: true,
            header: [
                {
                    title: "序号",
                    type: "index",
                    minWidth: 90
                },
                {
                    title: "收款金额",
                    key: "amount",
                    minWidth: 120
                },
                {
                    title: "收款人",
                    key: "realname",
                    minWidth: 90
                },
                {
                    title: "创建时间",
                    key: "createdate",
                    minWidth: 150
                },
            ],
            data: [],
            loading: false
        }
    },
    methods: {
        close(){
            this.$emit("close")
        },
        get_data(){
            let _self = this
            _self.loading = true
            let url = 'api/order/work/order/plan/receipt/item/list'
            let config = {
                params: {
                    workOrderId: _self.id
                }
            }

            function success(res){
                _self.data = res.data.data
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        click_current_row(e){

        },
        submit(){
            if(this.formValidate.amount){
                let _self = this
                _self.submitLoading = true
                let url = `api/order/work/order/plan/receipt/item/create`
                let config = {
                    amount: _self.formValidate.amount,
                    workOrderId: _self.id
                }

                function success(res){
                    _self.submitLoading = false
                    _self.get_data()
                }

                function fail(err){
                    _self.submitLoading = false
                }

                this.$Post(url, config, success, fail)
            }else{
                this.$Message.warning("请输入收款金额！")
            }
        }
    },
    mounted(){
        if(this.id){
            this.get_data()
        }else{
            this.$Message.error("工单信息错误！")
            setTimeout(()=>{
                this.close()
            }, 1500)
        }
    }
}
</script>

