<template>
    <div>
        <Modal
            title="修改账号"
            width="500"
            v-model="openCreateAccount"
            @on-cancel="close"
        >
            <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="120" label-position="right">
                <Row :gutter="16" >
                    <Col span="24">
                        <FormItem label="账号：" prop="user_name">
                            <Input size="small" v-model="formValidate.user_name" readonly/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" >
                    <Col span="24">
                        <FormItem label="密码：" prop="pass_word">
                            <Input size="small" v-model="formValidate.pass_word"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" >
                    <Col span="24">
                        <FormItem label="会计名称：" prop="real_name">
                            <Input size="small" v-model="formValidate.real_name"/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="valid" :loading="loading">修改</Button>
                <Button type="ghost" @click="close" style="margin-left: 8px">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    props: {
        formValidate: {
            type: [Object, String],
            default: {
                user_name: "",
                pass_word: "",
                real_name: ""
            }
        },
    },
    data(){
        return {
            openCreateAccount: true,
            ruleValidate:{
                user_name: [
                    { required: true, trigger: "change", message: "账号不能为空" }
                ],
                pass_word: [
                    { required: true, message: "密码不能为空", trigger: "change" }
                ]
            },
            loading: false
        }
    },
    methods: {
        valid(){
            let _self = this
            this.$refs["formValidate"].validate((valid) => {
                if(valid){
                    this.create_account()
                }else{
                    this.loading = false
                }
            })
        },
        create_account(){
            let _self = this
            let url = `api/customer/company/gdetax/updateEtaxAccounter`
            
            _self.loading = true
            let config = {
                userName: _self.formValidate.user_name,
                passWord: _self.formValidate.pass_word,
                realName: _self.formValidate.real_name
            }

            function success(res){
                _self.loading = false
                _self.close(true)
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        },
        close(e){
            this.$emit("close",e)
        }
    }
}
</script>
