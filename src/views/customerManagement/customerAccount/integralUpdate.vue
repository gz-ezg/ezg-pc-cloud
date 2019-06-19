<template>
    <div>
        <Modal
            title="消费积分调整"
            v-model="openIntegralUpdate"
            width="1100"
            @on-cancel="close"
        >
            <Form :model="accountData" :label-width="100" :rules="test">
                <Row :gutter="16">
                    <Col span="10">
                        <FormItem label="客户名称" prop="name">
                            <Input size="small" v-model="accountData.name" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="联系方式" prop="tel">
                            <Input size="small" v-model="accountData.tel" readonly/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="10">
                        <FormItem label="原消费积分" prop="integral_amount">
                            <Input size="small" v-model="accountData.integral_amount" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="现增加" prop="now_integral">
                            <Input size="small" type="number" v-model="accountData.now_integral" />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="submit">确定修改</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        props: {
            selectRow: {
                type:[String, Number]
            }
        },
        data() {
            return {
                openIntegralUpdate: true,
                accountData: this.selectRow,
                test:{
                    now_integral:[
                        { required: true, message: '请选择！', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            //确定修改
            submit(){
                let _self = this
                let url = `api/customer/integral/update`
                let config = {
                    id: this.selectRow.id,
                    integral_num: this.accountData.now_integral
                }
                function success(res){
                    console.log(res)
                    _self.close()
                    _self.$emit('update_integral')
                }
                function fail(){

                }
                this.$Post(url,config,success,fail)
            },
            close(){
                this.accountData.now_integral = ""
                this.$emit("close")
            }
           
        }
    }
</script>