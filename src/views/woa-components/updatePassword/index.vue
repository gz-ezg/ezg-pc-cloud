<template>
    <div>
        <Modal
            title="修改密码"
            v-model="change_password"
            width="350"
        >
            <Row :gutter="20" style="margin-bottom:10px"><h2><center>当前选择用户:{{username}}</center></h2></Row>
            <Form :label-width="100" ref="formdata" :rules="formdataRule" :model="formdata">
                <Row :gutter="20">
                    <Col span="24">
                        <FormItem label="密码：" prop="password">
                            <Input  size="small"  type="password" style="margin-right:5px" v-model="formdata.password">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="重复密码：" prop="password2">
                            <Input  size="small" type="password" style="margin-right:5px" v-model="formdata.password2">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="warning" @click="submit" long :loading="loading" :disabled="disabled">修改密码</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        let _self = this
        const validatePassword2 = (rule, value, callback) => {
            if (value == '') {
                callback(new Error(' '));
            } else {
                if (_self.formdata.password == _self.formdata.password2) {
                    _self.disabled = false
                    callback();
                } else {
                    callback(new Error('格式错误！'));
                }             
            }
        };
        return{
            disabled:true,
            loading:false,
            change_password: false,
            username:"",
            userID:"",
            formdata:{
                password:"",
                password2:""
            },
            formdataRule:{
                password:{ message:"请输入密码！", required: true,  trigger: 'blur' },
                password2:[
                    { message:"请输入密码！", required: true,  trigger: 'blur' },
                    { message:"两次密码输入不一致！", validator:validatePassword2,  trigger: 'blur' },
                ],
            }
        }
    },
    methods:{
        submit(){
            let _self = this
            _self.loading = true
            this.$refs['formdata'].validate((valid) => {
                if (valid) {
                    _self.updatePassword()
                } else {
                    this.$Message.error('请补全信息！');
                    _self.loading = false
                }
            })
        },
        updatePassword(){
            let _self = this
            let url = `api/user/updatePasswordByUserId`
            config = {
                id: _self.userID,
                password: _self.formdata.password
            }

            function success(res){
                _self.loading = false
                _self.change_password = false
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        }
    },
    created(){
        let _self = this
        this.$bus.on('CHANGE_PASSWORD', (e) => {
            _self.change_password = true
            _self.username = e.realname
            _self.userID = e.id
        })
    }
}
</script>
