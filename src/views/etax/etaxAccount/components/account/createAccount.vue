<template>
    <div>
        <Modal
            title="新增账号"
            width="500"
            v-model="openCreateAccount"
            @on-cancel="close"
        >
            <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="120" label-position="right">
                <Row :gutter="16" >
                    <Col span="24">
                        <FormItem label="账号：" prop="userName">
                            <Input size="small" v-model="formValidate.userName"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" >
                    <Col span="24">
                        <FormItem label="密码：" prop="passWord">
                            <Input size="small" v-model="formValidate.passWord"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" >
                    <Col span="24">
                        <FormItem label="会计名称：" prop="realName">
                            <Input size="small" v-model="formValidate.realName"/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="valid" :loading="loading">新增</Button>
                <Button type="ghost" @click="close" style="margin-left: 8px">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return {
            openCreateAccount: true,
            formValidate: {
                userName: "",
                passWord: "",
                realName: ""
            },
            ruleValidate:{
                userName: [
                    { required: true, trigger: "change", message: "账号不能为空" }
                ],
                passWord: [
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
            let url = `api/customer/company/gdetax/addEtaxAccounter`
            
            _self.loading = true
            let config = {
                userName: _self.formValidate.userName,
                passWord: _self.formValidate.passWord,
                realName: _self.formValidate.realName
            }

            function success(res){
                _self.loading = false
                _self.close()
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        },
        close(){
            this.$emit("close")
        }
    }
}
</script>
