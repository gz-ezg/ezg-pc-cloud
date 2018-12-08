<template>
    <div>
        <Modal
            :closable="false"
            :mask-closable="false"
            @on-cancel="close"
            v-model="openReLogin"
            title="重新登录"
            width="300"
        >
            <Spin size="large" v-if="logining" style="padding-left:45%"></Spin>
            <Form ref="loginForm" :model="form" :rules="rules" v-else>
                <FormItem prop="userName" style="margin-bottom:24px">
                    <Input v-model="form.userName" placeholder="用户名"/>
                    <span slot="prepend">
                        <Icon :size="16" type="person"></Icon>
                    </span>
                </FormItem>
                <FormItem prop="password" style="margin-bottom:24px">
                    <Input type="password" v-model="form.password" placeholder="密码"/>
                        <span slot="prepend">
                            <Icon :size="14" type="locked"></Icon>
                        </span>
                </FormItem>
                <FormItem prop="code" v-if="yzmShow" id="code">
                    <Input v-model="form.code" placeholder="验证码" style="width: 60%"/>
                    <Img id="randCodeImage" :src="yzm_url" style="float: right;height: 32px" @click="change_yzm"/>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="back_login_index">返回登录页</Button>
                <Button @click="handleSubmit" type="primary" :loading="loading">登录</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    data(){
        return {
            loading: false,
            logining: false,
            openReLogin: true,
            form: {
                username: "",
                password: ""
            },
            yzmShow: false,
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur'}
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur'}
                ]
            },
            isSave: false
        }
    },
    methods: {
        close(){
            this.$store.commit("close_gobal_relogin_modal")
            _self.loading = false
            _self.logining = false
        },
        back_login_index(){
            Cookies.set('user', '');
            Cookies.set('password', '');
            this.$Message.warning("正在返回登录页面...")
            setTimeout(()=>{
                this.$router.push({
                    name:'login'
                })
            }, 500)
        },
        handleSubmit(){
            let _self = this
            _self.loading = true
            let _submit = {}
            _submit.username = _self.form.userName
            _submit.password = _self.form.password
            if (_self.count > 2) {
                _submit.randomCode = _self.form.code
            }

            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    let url = 'api/user/login/'
                    function success(response) {
                        if(_self.isSave == true){
                            Cookies.set('7user', _self.form.userName, { expires: 7 });
                            Cookies.set('7password', _self.form.password, { expires: 7 });
                            Cookies.set('7issave', _self.isSave, { expires: 7 });
                        }else{
                            Cookies.set('7user', "");
                            Cookies.set('7password', "");
                            Cookies.set('7issave', "");
                        }
                        Cookies.set('user', _self.form.userName);
                        Cookies.set('password', _self.form.password);
                        localStorage.setItem('realname', response.data.data.user.realname)
                        localStorage.setItem('id', response.data.data.user.id)
                        localStorage.setItem("companyname","")
                        _self.$Notice.info({
                            title: "请重新提交",
                            desc: "尊敬的用户，由于您长时间未操作页面！系统注销了您的登录状态！现已自动为您登录！请重新提交你需要提交的内容！"
                        })
                        setTimeout(()=>{
                            _self.close()
                        },1000)
                    }
                    function fail(response) {
                        _self.$Message.error(response.data.msg);
                        _self.back_login_index()
                        _self.loading = false
                        _self.logining = false
                    }
                    
                    this.$Post(url, _submit, success, fail)
                }
            });
        }
    },
    mounted(){
        let _self = this
        this.isSave = JSON.parse(Cookies.get("7issave"))
        if(Cookies.get("7user") && this.isSave){
            _self.logining = true
            _self.form.userName = Cookies.get("7user")
            _self.form.password = Cookies.get("7password")
            _self.handleSubmit()
        }
    }
}
</script>
