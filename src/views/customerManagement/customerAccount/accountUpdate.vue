<template>
    <div>
        <Modal
            title="账户余额调整"
            v-model="openAccountUpdate"
            width="1100"
            @on-cancel="close"
        >
            <Form :model="accountData" :label-width="100" :rules="isNumber" >
                <Row :gutter="16">
                    <Col span="10">
                        <FormItem label="客户名称" prop="name">
                            <Input size="small" v-model="selectRow.name" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="联系方式" prop="tel">
                            <Input size="small" v-model="selectRow.tel" readonly/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="10">
                        <FormItem label="原账户余额" prop="account_amount">
                            <Input size="small" v-model="selectRow.account_amount" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="现增加" prop="now_account">
                            <Input size="small" type="number" v-model="now_account" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    
                    <Col span="16">
                        <FormItem label="调整理由" prop="now_account">
                            <Input v-model="memo" type="textarea" :autosize="{minRows: 5,maxRows: 10}" />
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
            const validateNum = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password again'));
                }else {
                    callback();
                }
            };

            return {
                openAccountUpdate: true,
                now_account: 0,
                isNumber:{
                    now_account:[
                        { validator: validateNum, trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            //确定修改
            submit(){
                let _self = this
                let url = `api/customer/account/update`
                let config = {
                    id: this.selectRow.id,
                    amount_num: this.now_account,
                    memo: this.memo
                }
                function success(res){
                    console.log(res)
                    _self.close()
                    _self.$emit('update_account')
                }
                function fail(){

                }
                this.$Post(url,config,success,fail)
            },
            close(){
                this.$emit("close")
            },

            amount(th) {
                var regStrs = [
                    ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
                    ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
                    ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
                    ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
                ];
                for (var i = 0; i < regStrs.length; i++) {
                    var reg = new RegExp(regStrs[i][0]);
                    th.value = th.value.replace(reg, regStrs[i][1]);
                }
            }
       
            
        }
    }
</script>