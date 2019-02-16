<style lang="less">
.login{
    width: 100%;
    height: 100%;
    background-image: url('https://file.iviewui.com/iview-admin/login_bg.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    &-con{
        position: absolute;
        right: 160px;
        top: 50%;
        transform: translateY(-60%);
        width: 300px;
        &-header{
            font-size: 16px;
            font-weight: 300;
            text-align: center;
            padding: 30px 0;
        }
        .form-con{
            padding: 10px 0 0;
        }
        .login-tip{
            font-size: 10px;
            text-align: center;
            color: #c3c3c3;
        }
    }
}
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit" >
        <Spin size="large" v-if="!sso" fix>
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>正在登录中...</div>
        </Spin>
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    亿账柜信息管理平台
                </p>
                <div class="form-con" @on-keydown="keyDown">
                    <Form ref="loginForm" :model="form" :rules="rules">
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
                        <FormItem prop="isSave" style="margin-bottom:6px">
                            <Checkbox v-model="isSave">七天免登陆</Checkbox>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long :loading="loading">登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">© 亿账柜版权所有woa3.0</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';

    export default {
        data() {
            return {
                sso: true,
                isSave:false,
                form: {
                    userName: '',
                    password: '',
                    code: '',
                    count: ''
                },
                rules: {
                    userName: [
                        { required: true, message: '账号不能为空', trigger: 'blur'}
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                },
                yzm_url: "/api/user/createImg",
                yzmShow: false,
                loading: false
            };
        },
        methods: {
            handleSubmit() {
                let _self = this
                let _submit = {}
                this.loading = true
                _submit.username = _self.form.userName
                _submit.password = _self.form.password
                if (_self.count > 2) {
                    _submit.randomCode = _self.form.code
                }

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        let url = 'api/user/login/'
                        function success(response) {
                            _self.loading = true
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
                            _self.getUserRole(response.data.data.user.id)
                            //  此处需要写一个promise.all
                        }
                        function fail(response) {
                            _self.loading = false
                            _self.count = response.data.errCount
                            if (_self.count > 2) {
                                // _self.$Message.error(response.data.msg);
                                _self.yzmShow = true
                                _self.getImg()
                                // $('#code').show()
                            } else if (_self.count < 3) {
                                // _self.$Message.error(response.data.msg);
                                // $('#code').hide()
                                _self.yzmShow = false
                                _self.getImg()
                            } else {
                                // _self.$Message.error(response.data.msg);
                                _self.getImg()
                            }
                        }
                        this.$Post(url, _submit, success, fail)
                    }
                });
            },
            getInterfaceItem(re) {
                let _self = this
                let url = 'api/menu/getInterfaceItemByUserId'

                let config = {
                    params: {
                        userId: re
                    }
                }
                // 跳过登录校验
                // Cookies.set('access', '1,2'); 
                // Cookies.set('operations', '1,2'); 

                function success(re) {
                    Cookies.set('access', (re.data.data.interfaces).join()); 
                    // alert(JSON.stringify(re.data.data.interfaces))
                    localStorage.setItem("access_array",JSON.stringify(re.data.data.interfaces))
                    Cookies.set('operations', (re.data.data.operations).join());
                    //  确保菜单重新生成，防止菜单组件被缓存 ====>
                    window.location.reload();
                    setTimeout(() => {
                        _self.$router.push({
                            name: 'home_index'
                        });
                    }, 300)
                }

                this.$Get(url, config, success)
            },
            getImg() {
                let date = new Date();
                // let img = document.getElementById("randCodeImage");
                // img.src = '/api/user/createImg?a=' + date.getTime();
                this.yzm_url = '/api/user/createImg?a=' + date.getTime();
            },

            keyDown(e) {
                let _self = this

                if (e.code == 'Enter') {
                    _self.handleSubmit()
                }
            },
            getUserRole(e){
                let _self = this

                let url = `api/user/checkUserRoleByUserId`

                let config = {
                    params: {
                        userId: e
                    }
                }
                
                function success(res){
                    _self.getInterfaceItem(e)
                    let temp = []
                    for(let i = 0;i<res.data.data.length;i++){
                        temp.push(res.data.data[i].rolecode)
                    }

                    //  主要角色map对象 或者可以写成一个枚举对象，使用对象实现
                    let roleMap = new Map([
                        ["salers", "salers"],
                        ["kj", "kuaiji"],
                        ["kjbgd", "kuaiji"],
                        ["jzkj","kuaiji"],
                        ["servicer", "shangshi"],
                        ["ssbgd", "shangshi"],
                        ["planner", "qihua"],
                        ["qhbgd", "qihua"],
                        ["auditing", "shenji"],
                        ["sjbgd", "shenji"],
                        ["jianzhi", "qudao"],

                    ])
                        
                    for(let j = 0; j< temp.length; j++){
                        if(roleMap.get(temp[j])){
                            localStorage.setItem('Main_Role', roleMap.get(temp[j]))
                            break;
                        }else if (j== temp.length - 1){
                            localStorage.setItem('Main_Role', "other")
                        }
                    }

                    let str = JSON.stringify(temp)
                    localStorage.setItem('Role',str)
                }

                this.$Get(url, config, success)
            },
            sso_login(userName, timeStamp, token){
                console.log(userName, timeStamp, token)
                let _self = this
                let url = 'api/user/ssoLogin'

                config = {
                    params:{
                        userName: userName,
                        timeStamp: timeStamp,
                        token: token
                    }
                }

                function success(response){
                    // console.log(response)
                    Cookies.set('user', userName);
                    Cookies.set('password', "123456");
                    localStorage.setItem('realname', response.data.data.user.realname)
                    localStorage.setItem('id', response.data.data.user.id)
                    localStorage.setItem("companyname","")
                    // _self.getAllTSTypeGroups()
                    _self.getInterfaceItem(response.data.data.user.id)
                    _self.getUserRole(response.data.data.user.id)
                }

                function fail(err){
                    _self.$Message.error("请输入账号密码登录！")
                    _self.sso = true
                    // window.location.reload()
                }
                
                this.$Get(url, config, success, fail)
            },
            get_sso_params(config){
                let _self = this

                if(config.length == 3){
                    return new Promise(function(resolve, reject){
                        let params = []
                            for(let i = 0;i<config.length;i++){
                                params[i] = config[i].split("=")[1]
                                console.log(params)
                            }
                            resolve(params)
                        })
                    }
                else{
                    console.log("正常登录！")
                }
            },
            //  修改验证码
            change_yzm(){
                this.getImg()
            }
        },
        mounted() {
            let _self = this
            if(Cookies.get("7issave")){
                this.isSave = JSON.parse(Cookies.get("7issave"))
                if(Cookies.get("7user") && this.isSave){
                    _self.form.userName = Cookies.get("7user")
                    _self.form.password = Cookies.get("7password")
                    _self.handleSubmit()
                }
            }
            
            // $('#randCodeImage').click(function () {
            //     let date = new Date();
            //     let img = document.getElementById("randCodeImage");
            //     img.src = '/api/user/createImg?a=' + date.getTime();
            // });
            
            // let _self = this
            // let temp = location.href
            // //  sso登录（已注释）
            // params = temp.split("?")
            // // console.log(params)
            //     if(params.length>1){
            //         let config = params[1].split("&")
            //         // _self.get_sso_params(config).then(function(res){
            //         //     console.log(res)
            //         //     _self.sso_login(res[0], res[1], res[2])
            //         // })
            //         if(config.length == 3){
                        
            //             // try {
            //                 this.sso = false
            //                 let userName = config[0].split("=")[1]
            //                 let timeStamp = config[1].split("=")[1]
            //                 let token = config[2].split("=")[1]
            //                 console.log(userName, timeStamp, token)
            //                 console.log("SSO登录！")
            //                 // _self.sso_login(userName, timeStamp, token)
            //                 setTimeout(function(){
            //                     _self.sso_login(userName, timeStamp, token)
            //                 },0)
            //             // } catch (error) {
            //             //     // console.log(error)
            //             //     _self.$Message.error(error)
            //             // }
            //         }
            //         console.log(config)
            //     }else{
            //         this.sso = true
            //         console.log("正常登录！")
            //     }
            // let user = Cookies.get('user')
            // let password = Cookies.get('password')
            // // console.log(user)
            // // console.log(password)
            // if(user == undefined || user == "" || password == undefined || password == ""){
            //     // console.log('7天免登陆失效！')
            // }else{
            //     _self.form.userName = user
            //     _self.form.password = password
            //     _self.handleSubmit()
            // }
        },
        created(){
            let _self = this

        }
    };
</script>

<style>

</style>
