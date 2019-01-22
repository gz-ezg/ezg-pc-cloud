<template>
    <div>
        <Modal
            title="编辑用户"
            width="600"
            v-model="open_edit_user"
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
                        <FormItem label="别名：" prop="aliasName">
                            <Input  size="small"  style="margin-right:5px" v-model="formdata.aliasName">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="工作手机：" prop="officephone">
                            <Input  size="small"  style="margin-right:5px" v-model="formdata.officephone">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="工号：" prop="userAliasId">
                            <Input  size="small"  style="margin-right:5px" v-model="formdata.userAliasId">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="地区权限：" prop="visabled">
                            <Select v-model="formdata.visable" multiple style="margin-right:5px" size="small">
                                <Option v-for="item in area_visable" :value="item.typecode" :key="item.id">{{ item.typename }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="职位：" prop="post">
                            <Cascader :data="companyPost" v-model="formdata.post"></Cascader>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="是否接单：" prop="orderReceiving">
                            <Select v-model="formdata.orderReceiving" style="margin-right:5px" size="small">
                                <Option value="Y">是</Option>
                                <Option value="N">否</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="组织机构：" prop="departName">
                            <Input  size="small"  style="margin-right:5px" v-model="formdata.departName" @on-focus="openOrganize">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="角色：" prop="roleName">
                            <Input type="textarea" size="small"  style="margin-right:5px" v-model="formdata.roleName" @on-focus="openRole" autosize>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                
            </Form>
            <div slot="footer">
                <Button type="primary" @click="submit" :loading="updateLoading">修改</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import * as userApi from '../api/user.js'
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
            companyPost: [],
            area_visable: [],
            updateLoading: false,
            open_edit_user: false,
            formdata:{
                id:"",
                username: "",
                realname: "",
                orgIds: "",
                roleIds: "",
                mobilePhone: "",
                email: "",
                roleName: "",
                departName: "",
                userAliasId: "",
                visable: [],
                officephone: "",
                aliasName: "",
                orderReceiving: '',
                post: []
            },
            formdataRule:{
                username:[
                    { message:"格式错误！",required: true, trigger: 'change' },
                    { message:"格式错误！",validator: validateUsername, trigger: 'blur' }
                ],
                realname:[
                    { message:"格式错误！",required: true, trigger: 'change' },
                    { message:"格式错误！",validator: validateRealname, trigger: 'blur' }
                ],
                mobilePhone:[
                    // { message:"格式错误！",required: true, trigger: 'blur' },
                    { message:"格式错误！", validator:validateTel,  trigger: 'change' },
                ],
                email:[
                    // { message:"格式错误！",required: true, trigger: 'blur' },
                    { message:"格式错误！", validator:validateEmail,  trigger: 'change' }
                ],
                roleName:[
                    { message:"格式错误！",required: true, trigger: 'change' },
                ],
                orgName:[
                    { message:"格式错误！",required: true, trigger: 'change' },
                ],
                officephone: [
                    { message:"格式错误！", validator:validateTel,  trigger: 'change' },
                ]
            }
        }
    },
    methods:{
        //  提交事件
        submit(){
            let _self = this
            _self.updateLoading = true
            try {
                this.$refs['formdata'].validate((valid) => {
                    if (valid) {
                        _self.update_new_user()
                    } else {
                        this.$Message.error('请补全信息！');
                        _self.updateLoading = false
                    }
                })
            } catch (error) {
                this.updateLoading = false
                console.log(error)
            }
        },

        //  提交修改用户
        async update_new_user(){
            let config = {
                id: this.formdata.id,
                username: this.formdata.username,
                realname: this.formdata.realname,
                orgIds: this.formdata.orgIds,
                roleIds: this.formdata.roleIds,
                mobilephone: this.formdata.mobilePhone,
                email: this.formdata.email,
                userAliasId: this.formdata.userAliasId,
                visable: this.formdata.visable.join(","),
                aliasName: this.formdata.aliasName,
                officephone: this.formdata.officephone,
                orderReceiving: this.formdata.orderReceiving,
                post: this.formdata.post.join("-")
            }
            try {
                let {status, data} = await userApi.postUpdateUser(config)
                if(status){
                    this.open_edit_user = false
                    this.$bus.emit('UPDATE_USER_TABLE',true)
                }
            } catch (error) {
                console.log(error)
            }

            this.updateLoading = false
        },

        //  组织结构弹出框
        openOrganize(){
            let _self = this
            this.$bus.emit('OPEN_ORGANIZE_TABLE', _self.formdata.orgIds)
        },
        
        //  角色弹出框
        openRole(){
            let _self = this
            console.log(_self.formdata.roleIds)
            this.$bus.emit('OPEN_ROLE_TABLE',_self.formdata.roleIds)
        },

        //  获取角色信息
        async get_role_detail(e){
            this.$refs["formdata"].resetFields();
            let config = {
                userId:e.id
            }

            let { status, data} = await userApi.getUserDetail(config)
                this.formdata.username = data.data.userName
                this.formdata.realname = data.data.realName
                this.formdata.id = data.data.userId
                this.formdata.roleName = data.data.userKey
                this.formdata.email = data.data.email
                this.formdata.mobilePhone = data.data.mobilePhone
                this.formdata.roleIds = data.data.roleId
                this.formdata.orgIds = data.data.orgId
                this.formdata.departName = data.data.departName
                this.formdata.userAliasId = data.data.userAliasId
                this.formdata.aliasName = data.data.aliasName
                this.formdata.officephone = data.data.officephone
                this.formdata.orderReceiving = data.data.order_receiving
                this.formdata.post = []
                if(data.data.post){
                    this.formdata.post[0] = parseInt(data.data.post.split("-")[0])
                    this.formdata.post[1] = parseInt(data.data.post.split("-")[1])
                    if(isNaN(this.formdata.post[1])){
                        this.formdata.post[1] = ''
                    }
                }
                if(data.data.visable){
                    this.formdata.visable = data.data.visable.split(",")
                }

                console.log(this.formdata)
        },
        async get_data_center(){
            let _self = this
            let params = "area_visable,company_post"
            let { area_visable,company_post } = await userApi.getDictionary(params)
            this.area_visable = area_visable
            this.companyPost = this.$changeCars(company_post)
        }
    },
    mounted(){
        let _self = this
        _self.get_data_center()
        this.$bus.on("UPDATE_USER",(e) => {
            _self.get_role_detail(e)
            _self.open_edit_user = true
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
            _self.formdata.departName = e.departname
            _self.formdata.orgIds = e.id
        })
    }

}
</script>


