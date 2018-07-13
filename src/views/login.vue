<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
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
                        <FormItem prop="isSave" style="margin-bottom:24px">
                            <Checkbox v-model="isSave">七天免登陆</Checkbox>
                        </FormItem>
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
                }
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
                let _self = this
                this.$http.get('/api/dataCenter/system/queryAllTSTypeGroups/')
                    .then(function (response) {
                        let str = JSON.stringify(response.data)
                        localStorage.setItem('AllTSTypeGroups', str)
                    })
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
            }
        },
        mounted() {
            $('#randCodeImage').click(function () {
                let date = new Date();
                let img = document.getElementById("randCodeImage");
                img.src = '/api/user/createImg?a=' + date.getTime();
            });
            let _self = this
            let user = Cookies.get('user')
            let password = Cookies.get('password')
            console.log(user)
            console.log(password)
            if(user == undefined || user == "" || password == undefined || password == ""){
                console.log('7天免登陆失效！')
            }else{
                _self.form.userName = user
                _self.form.password = password
                _self.handleSubmit()
            }
        },
        created(){
            
        }
    };
</script>

<style>

</style>
