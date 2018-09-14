<style lang="less">
    @import './login.less';
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
                        <FormItem prop="code" style="display: none" id="code">
                            <Input v-model="form.code" placeholder="验证码" style="width: 60%"/>
                            <Img id="randCodeImage" src="/api/user/createImg" style="float: right;height: 32px"/>
                        </FormItem>
                        <!-- <FormItem prop="isSave" style="margin-bottom:24px">
                            <Checkbox v-model="isSave">七天免登陆</Checkbox>
                        </FormItem> -->
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
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
                        {required: true, message: '账号不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                },
                managestatus:[],
                managestatus_Map: new Map()
            };
        },
        methods: {
            handleSubmit() {
                let _self = this
                let _submit = {}
                _submit.username = _self.form.userName
                _submit.password = _self.form.password
                if (_self.count > 2) {
                    _submit.randomCode = _self.form.code
                }

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        let url = '/user/login/'
                        function doSccess(response) {
                            if(_self.isSave == true){
                                Cookies.set('user', _self.form.userName, { expires: 7 });
                                Cookies.set('password', _self.form.password, { expires: 7 });
                            }else{
                                Cookies.set('user', _self.form.userName);
                                Cookies.set('password', _self.form.password);
                            }
                            localStorage.setItem('realname', response.data.data.user.realname)
                            localStorage.setItem('id', response.data.data.user.id)
                            localStorage.setItem("companyname","")
                            _self.getManagestatus()
                            _self.getAllTSTypeGroups()
                            _self.getInterfaceItem(response.data.data.user.id)
                            _self.getUserRole(response.data.data.user.id)
                        }
                        function otherConditions(response) {
                            _self.count = response.data.errCount
                            if (_self.count > 2) {
                                _self.$Message.error(response.data.msg);
                                _self.getImg()
                                $('#code').show()
                            } else if (_self.count < 3) {
                                _self.$Message.error(response.data.msg);
                                $('#code').hide()
                                _self.getImg()
                            } else {
                                _self.$Message.error(response.data.msg);
                                _self.getImg()
                            }
                        }
                        this.PostData(url, _submit, doSccess, otherConditions)
                    }
                });
            },
            getInterfaceItem(re) {
                let _self = this
                let url = '/menu/getInterfaceItemByUserId?userId=' + re
                // Cookies.set('access', '1,2'); 
                // Cookies.set('operations', '1,2'); 

                function doSuccess(re) {
                    Cookies.set('access', (re.data.data.interfaces).join()); 
                    // alert(JSON.stringify(re.data.data.interfaces))
                    localStorage.setItem("access_array",JSON.stringify(re.data.data.interfaces))
                    Cookies.set('operations', (re.data.data.operations).join());
                    //  确保菜单重新生成，防止菜单组件被缓存
                    window.location.reload();
                    setTimeout(() => {
                        _self.$router.push({
                            name: 'home_index'
                        });
                    }, 1000)
                }

                this.GetData(url, doSuccess)
            },
            getAllTSTypeGroups () {
                // let _self = this
                // this.$http.get('/api/dataCenter/system/queryAllTSTypeGroups/')
                //     .then(function (response) {
                //         let str = JSON.stringify(response.data)
                //         localStorage.setItem('AllTSTypeGroups', str)
                //     })
            },
            getImg() {
                let date = new Date();
                let img = document.getElementById("randCodeImage");
                img.src = '/api/user/createImg?a=' + date.getTime();
            },

            keyDown(e) {
                let _self = this

                if (e.code == 'Enter') {
                    _self.handleSubmit()
                }
            },
            getUserRole(e){
                let _self = this
                this.$http.get('/api/user/checkUserRoleByUserId?userId='+ e).then(function(res){
                    // let str = JSON.stringify(res.data.data)  
                    // localStorage.setItem('Role',str)
                    if(res.data.msgCode == "40000"){
                        let temp = []
                        for(let i = 0;i<res.data.data.length;i++){
                            temp.push(res.data.data[i].rolecode)
                        }
                        for(let j = 0;j<temp.length;j++){
                            if(temp[j] == "salers"){
                                localStorage.setItem('Main_Role',"salers")
                                break
                            }else if(temp[j] == "kj" || temp[j] == "kjbgd"){
                                localStorage.setItem('Main_Role',"kuaiji")
                                break
                            }else if(temp[j] == "servicer" || temp[j] == "ssbgd"){
                                localStorage.setItem('Main_Role',"shangshi")
                                break
                            }else if(temp[j] == "planner" || temp[j] == "qhbgd"){
                                localStorage.setItem('Main_Role',"qihua")
                                break
                            }else if(temp[j] == "auditing" || temp[j] == "sjbgd"){
                                localStorage.setItem('Main_Role',"shenji")
                                break
                            }else if(temp[j] == "jianzhi"){
                                localStorage.setItem('Main_Role',"qudao")
                                break
                            }else if( j == temp.length - 1){
                                localStorage.setItem('Main_Role',"other")
                            }
                        }
                        let str = JSON.stringify(temp)
                        localStorage.setItem('Role',str)
                    }else{
                        _self.$Message.error(res.data.msg)
                    }
                })
            },
            //  获取全局的数据字典
            getManagestatus(){
                let _self = this
                
                function success(res){
                    _self.managestatus = res.data.data.managestatus
                    _self.managestatus_Map = _self.$array2map(_self.managestatus)
                    // console.log(res)
                    // console.log(_self.managestatus)
                    // console.log(_self.managestatus_Map)
                    let temp = JSON.stringify(_self.managestatus_Map)
                    localStorage.setItem("global_datacenter",temp)
                }

                this.$GetDataCenter("managestatus",success)
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
                    console.log(response)
                    Cookies.set('user', userName);
                    Cookies.set('password', "123456");
                    localStorage.setItem('realname', response.data.data.user.realname)
                    localStorage.setItem('id', response.data.data.user.id)
                    localStorage.setItem("companyname","")
                    _self.getManagestatus()
                    _self.getAllTSTypeGroups()
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
                        alert(params)

                    })
                }
                // console.log(config)
            else{
                console.log("正常登录！")
            }
        },
        },
        mounted() {
            $('#randCodeImage').click(function () {
                let date = new Date();
                let img = document.getElementById("randCodeImage");
                img.src = '/api/user/createImg?a=' + date.getTime();
            });
            let _self = this
            let temp = location.href
            //  sso登录
            params = temp.split("?")
            // console.log(params)
                if(params.length>1){
                    let config = params[1].split("&")
                    // _self.get_sso_params(config).then(function(res){
                    //     console.log(res)
                    //     _self.sso_login(res[0], res[1], res[2])
                    // })
                    if(config.length == 3){
                        
                        // try {
                            this.sso = false
                            let userName = config[0].split("=")[1]
                            let timeStamp = config[1].split("=")[1]
                            let token = config[2].split("=")[1]
                            console.log(userName, timeStamp, token)
                            console.log("SSO登录！")
                            // _self.sso_login(userName, timeStamp, token)
                            setTimeout(function(){
                                _self.sso_login(userName, timeStamp, token)
                            },0)
                        // } catch (error) {
                        //     // console.log(error)
                        //     _self.$Message.error(error)
                        // }
                    }
                    console.log(config)
                }else{
                    this.sso = true
                    console.log("正常登录！")
                }
            let user = Cookies.get('user')
            let password = Cookies.get('password')
            // console.log(user)
            // console.log(password)
            if(user == undefined || user == "" || password == undefined || password == ""){
                // console.log('7天免登陆失效！')
            }else{
                _self.form.userName = user
                _self.form.password = password
                _self.handleSubmit()
            }
        },
        created(){
            let _self = this
            // console.log(location.href)
            // let temp = location.href
            // params = temp.split("?")
            // // console.log(params)
            // if(params.length>1){
            //     let config = params[1].split("&")
            //     _self.get_sso_params(config).then(function(res){
            //         console.log(res)
            //         _self.sso_login(res[0], res[1], res[2])
            //     })
            //     // if(config.length == 3){
            //     //     try {
            //     //         let userName = config[0].split("=")[1]
            //     //         let timeStamp = config[1].split("=")[1]
            //     //         let token = config[2].split("=")[1]
            //     //         console.log(userName, timeStamp, token)
            //     //         console.log("SSO登录！")
            //     //         _self.sso_login(userName, timeStamp, token)

            //     //         // setTimeout(function(){
            //     //         //     console.log("1111")
            //     //         // },1000)
            //     //         // setTimeout(function(){
            //     //         //     _self.sso_login(userName, timeStamp, token)
            //     //         // },1000)
            //     //     } catch (error) {
            //     //         // console.log(error)
            //     //         _self.$Message.error(error)
            //     //     }
            //     // }
            //     // console.log(config)
            // }else{
            //     console.log("正常登录！")
            // }
        }
    };
</script>

<style>

</style>
