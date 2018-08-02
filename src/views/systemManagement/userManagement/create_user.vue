<template>
    <div>
        <Modal
            title="新增用户"
            width="600"
            v-model="open_create_user"
        >
            <Form :label-width="100" ref="formdata" :rules="formdataRule" :model="formdata">
                <Row>
                    <Col span="12" >
                        <FormItem label="用户名：" prop="username">
                            <Input  size="small"  style="margin-right:5px" v-model="formdata.username">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="真实姓名：" prop="realname">
                            <Input  size="small"  style="margin-right:5px" v-model="formdata.realname">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="密码：" prop="password">
                            <Input  size="small"  type="password" style="margin-right:5px" v-model="formdata.password">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="重复密码：" prop="password2">
                            <Input  size="small" type="password" style="margin-right:5px" v-model="formdata.password2">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="手机号码：" prop="mobilePhone">
                            <Input  size="small"  style="margin-right:5px" v-model="formdata.mobilePhone">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="邮箱：" prop="email">
                            <Input  size="small"  style="margin-right:5px" v-model="formdata.email">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="组织机构：" prop="orgName">
                            <Input  size="small"  style="margin-right:5px" v-model="formdata.orgName" @on-focus="openOrganize">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="角色：" prop="roleName">
                            <Input type="textarea" size="small"  style="margin-right:5px" v-model="formdata.roleName" @on-focus="openRole">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="submit" :loading="create_loading">新增</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        let _self = this
        const validateUsername = (rule, value, callback) => {
            let re = /^[a-z]+$/
            if (value == '') {
                callback(new Error(' '));
            } else {
                if (re.test(value)) {
                    callback();
                } else {
                    callback(new Error(' '));
                }             
            }
        };
        const validateRealname = (rule, value, callback) => {
            let re = /^[\u4e00-\u9fa5]+$/
            if (value == '') {
                callback(new Error(' '));
            } else {
                if (re.test(value)) {
                    callback();
                } else {
                    callback(new Error('格式错误！'));
                }             
            }
        };
        // const validatePassword = (rule, value, callback) => {
        //     if (value == '') {
        //         callback(new Error(' '));
        //     } else {
        //         if (_self.formdata.password == _self.formdata.password2) {
        //             callback();
        //         } else {
        //             callback(new Error('格式错误！'));
        //         }             
        //     }
        // };
        const validatePassword2 = (rule, value, callback) => {
            if (value == '') {
                callback(new Error(' '));
            } else {
                if (_self.formdata.password == _self.formdata.password2) {
                    callback();
                } else {
                    callback(new Error('格式错误！'));
                }             
            }
        };
        const validateTel = (rule, value, callback) => {
            let re = /^1\d{10}$/
            if (value == '') {
                // callback(new Error(' '));
                callback()
            } else {
                if (re.test(value)) {
                    callback();
                } else {
                    callback(new Error('格式错误！'));
                }             
            }
        };
        const validateEmail= (rule, value, callback) => {
            let re = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
            if (value == '') {
                // callback(new Error(' '));
                callback();
            } else {
                if (re.test(value)) {
                    callback();
                } else {
                    callback(new Error('格式错误！'));
                }             
            }
        };
        return{
            create_loading: false,
            open_create_user: false,
            formdata:{
                username: "",
                realname: "",
                password: "",
                password2: "",
                orgIds: "",
                roleIds: "",
                mobilePhone: "",
                email: "",
                roleName: "",
                orgName: ""
            },
            formdataRule:{
                username:[
                    { message:"格式错误！",required: true, trigger: 'blur' },
                    { message:"格式错误！",validator: validateUsername, trigger: 'blur' }
                ],
                realname:[
                    { message:"格式错误！",required: true, trigger: 'blur' },
                    { message:"格式错误！",validator: validateRealname, trigger: 'blur' }
                ],
                password:{ message:"请输入密码！", required: true,  trigger: 'blur' },
                password2:[
                    { message:"格式错误！",required: true, trigger: 'blur' },                    
                    { message:"两次密码输入不一致！", validator:validatePassword2,  trigger: 'blur' }
                ],
                mobilePhone:[
                    // { message:"格式错误！",required: true, trigger: 'blur' },
                    { message:"格式错误！", validator:validateTel,  trigger: 'blur' },
                ],
                email:[
                    // { message:"格式错误！",required: true, trigger: 'blur' },
                    { message:"格式错误！", validator:validateEmail,  trigger: 'blur' }
                ],
                roleName:[
                    { message:"格式错误！",required: true, trigger: 'change' },
                ],
                orgName:[
                    { message:"格式错误！",required: true, trigger: 'change' },
                ]
            }
        }
    },
    methods:{
        //  提交事件
        submit(){
            let _self = this
            _self.create_loading = true
            this.$refs['formdata'].validate((valid) => {
                console.log(valid)
                if (valid) {
                    _self.create_new_user()
                } else {
                    this.$Message.error('请补全信息！');
                    _self.create_loading = false
                }
            })
        },

        //  提交新增用户
        create_new_user(){
            let _self = this
            let url = `api/user/addUser`
            let config = {
                username: _self.formdata.username,
                realname: _self.formdata.realname,
                password: _self.formdata.password,
                orgIds: _self.formdata.orgIds,
                roleIds: _self.formdata.roleIds,
                mobilePhone: _self.formdata.mobilePhone,
                email: _self.formdata.email
            }

            function success(res){
                _self.create_loading = false
                _self.open_create_user = false
                _self.$refs['formdata'].resetFields()
                _self.$bus.emit('UPDATE_USER_TABLE',true)
                console.log(res)
            }

            function fail(err){
                _self.create_loading = false
                console.log(err)
            }

            this.$Post(url, config, success, fail)
        },

        //  组织结构弹出框
        openOrganize(){
            let _self = this
            this.$bus.emit('OPEN_ORGANIZE_TABLE', _self.formdata.orgIds)
        },
        
        //  角色弹出框
        openRole(){
            let _self = this
            this.$bus.emit('OPEN_ROLE_TABLE',_self.formdata.roleIds)
        }
    },
    created(){
        let _self = this
        this.$bus.on("CREATED_USER",(e) => {
            _self.open_create_user = true
            // _self.formdata.roleIds = ""
            // _self.formdata.orgIds = ""
        })
        this.$bus.on("CREATE_USER_ROLE_DATA",(e) => {
            _self.formdata.roleName = ""
            _self.formdata.roleIds = ""
            let tempID = []
            let tempName = []
            for(let i = 0; i<e.length;i++){
                tempID.push(e[i].ID)
                tempName.push(e[i].rolename)
            }
            _self.formdata.roleName = tempName.join(",")
            _self.formdata.roleIds = tempID.join(",")
        })
        this.$bus.on("CREATE_USER_ORG_DATA",(e) => {
            _self.formdata.orgName = e.departname
            _self.formdata.orgIds = e.id
        })
    }

}
</script>


