<style lang="less">
    @import './own-space.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <div>
                <div style="display:inline-block;width:200px;height:200px;border-radius:100px;margin-left:60px;border:1px solid #ccc">
                    <Upload
                        ref="upload"
                        :before-upload="handleUpload"
                        action=""
                    >
                        <!-- <img src="../../images/LOGO.png" width="200" height="200" style="border-radius:100px;"> -->
                        <img :src="img" width="200" height="200" style="border-radius:105px;" >
                        <div style="position:relative;top:-40px;font-size:16px;"><center>点击更换</center></div>
                    </Upload>
                </div>
                <Form 
                    ref="userForm"
                    :model="userForm" 
                    :label-width="100" 
                    label-position="right"
                    :rules="inforValidate"
                >
                    <FormItem label="真实姓名" prop="realName">
                        <div style="display:inline-block;width:200px;">
                            <Input v-model="userForm.realName" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="用户别名" prop="aliasName">
                        <div style="display:inline-block;width:200px;">
                            <Input v-model="userForm.aliasName" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="个人电话" prop="mobilephone">
                        <div style="display:inline-block;width:200px;">
                            <Input v-model="userForm.mobilephone" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="工作电话" prop="officephone" >
                        <div style="display:inline-block;width:200px;">
                            <Input v-model="userForm.officephone"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="邮箱" prop="email" >
                        <div style="display:inline-block;width:200px;">
                            <Input v-model="userForm.email"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="拨打方式：" prop="callType" >
                        <Select style="display:inline-block;width:200px;" transfer v-model="userForm.callType"  @on-change="call_change">
                            <Option v-for="(item, index) in callTypeArray" :key=index :value="item.typecode">{{item.typename}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="呼叫中心账号" prop="sevenmoorAccount" >
                        <div style="display:inline-block;width:200px;">
                            <Input v-model="userForm.sevenmoorAccount"></Input>
                        </div>
                    </FormItem>
                    <FormItem label="呼叫中心手机" prop="sevenmoorMobile" >
                        <div style="display:inline-block;width:200px;">
                            <Input v-model="userForm.sevenmoorMobile" type="number"></Input>
                        </div>
                    </FormItem>
                    <div>
                        <Button type="primary" style="width: 100px;margin-left:60px" :loading="save_loading" @click="saveEdit">保存</Button>
                        <Button type="ghost" style="width: 100px;" @click="cancelEditUserInfor">取消</Button>
                    </div>
                </Form>
            </div>
        </Card>
    </div>
</template>

<script>
import {yasuo} from '../../libs/img_beforeUpload.js'
export default {
    name: 'index',
    data () {
        const validePhone = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if(!value && rule.field == "mobilephone"){
                callback(new Error("请输入手机号码！"))
            }
            if(!value){
                callback()
            }
            if (!re.test(value)) {
                callback(new Error('请输入正确格式的手机号！'));
            } else {
                callback();
            }
        };
        const valideName = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if(value){
                callback()
            }else{
                callback(new Error("请输入真实姓名！"))
            }
            
        };
        const valideNum = (rule, value, callback) => {
            var re = /^[0-9]*$/;
            if (!re.test(value)) {
                callback(new Error('请输入数字！'));
            } else {
                callback();
            }

        };
        return {
            userForm: {
                realName: "",
                mobilephone: "",
                officephone: "",
                aliasName: "",
                email: "",
                callType:'',
                userId: localStorage.id,
                sevenmoorAccount:'',
                sevenmoorMobile:''
            },
            callTypeArray:[{typecode:'gateway',typename:'座机'},{typecode:'Local',typename:'手机'},{typecode:'',typename:'--'}],
            inforValidate: {
                realName: [
                    { required: true, message: '请输入姓名！', trigger: 'change', type: "string" },
                    { validator: valideName}
                ],
                mobilephone: [
                    { required: true, message: '请输入手机号码！' },
                    { validator: validePhone }
                ],
                // sevenmoorMobile: [
                //     { validator: valideNum }
                // ],
                // email: [
                //     { message: '请输入姓名！', trigger: 'change', type: "email"}
                // ]
            },
            img:"",
            save_loading: false,
            uploadImg: ""
        };
    },
    methods: {
        cancelEditUserInfor () {
            this.$store.commit('removeTag', 'ownspace_index');
            localStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList);
            let lastPageName = '';
            if (this.$store.state.app.pageOpenedList.length > 1) {
                lastPageName = this.$store.state.app.pageOpenedList[1].name;
            } else {
                lastPageName = this.$store.state.app.pageOpenedList[0].name;
            }
            this.$router.push({
                name: lastPageName
            });
        },
        saveEdit () {
            this.save_loading = true
            try {
                this.$refs['userForm'].validate((valid) => {
                    if (valid) {
                        this.save_info();
                    } else {
                        this.save_loading = false
                    }
                });
            } catch (error) {
                this.save_loading = false
            }
        },
        save_info(){
            let _self = this
            let url = `api/user/modyfiyPerson`
            let formdata = new FormData()

            for(let x in this.userForm){
                formdata.append(x, _self.userForm[x])
            }
            if(!this.img.includes("api/assets/upload/files")){
                formdata.append("files", _self.uploadImg)
            }
            function success(res){
                _self.get_user_data()
                _self.save_loading = false
            }

            function fail(err){
                _self.save_loading = false
            }

            this.$Post(url, formdata, success, fail)

        },
        call_change(){
            if (this.userForm.callType=='gateway') {
                this.inforValidate.sevenmoorAccount = [{required: true, message: '请输入呼叫中心账号！'}]
                this.inforValidate.sevenmoorMobile = []
            } else if (this.userForm.callType=='Local') {
                this.inforValidate.sevenmoorMobile = [{required: true, message: '请输入呼叫中心手机！'}]
                this.inforValidate.sevenmoorAccount = [{required: true, message: '请输入呼叫中心账号！'}]
            } else {
                this.inforValidate.sevenmoorMobile = []
                this.inforValidate.sevenmoorAccount = []
            }

        },
        // change_icon(){
        //     console.log("点击了头像！")
        // },
        //  上传头像
        handleUpload(file) {
            // console.log(file)
            let _self = this
            this.uploadImg = file
            let reader = new FileReader()
            reader.readAsDataURL(file)
            let filename = file.name
            reader.onload = function(file){
                var imgMsg = {
                    name:filename,
                    src:this.result
                }
                _self.img = imgMsg.src
            }
            return false
            // let _self = this
            // let formdata = new FormData()
                
            // let url = `api/order/contract/upload`
            // formdata.append("orderId", _self.orderId)
            // formdata.append("files", file)

                
            // function success(res){
            //     _self.get_contarct_data()
            // }

            // function fail(err){

            // }
            // this.$Post(url, formdata, success, fail)
        },
        get_user_data(){
            let _self = this
            let url = `api/user/findUserDetail`
            let config = {}
            function success(res){
                let { realname, mobilephone, officephone, email,callType , aliasName,sevenmoorAccount,sevenmoorMobile,portrait} = res.data.data
                _self.userForm.realName = realname
                _self.userForm.mobilephone = mobilephone
                _self.userForm.officephone = officephone
                _self.userForm.email = email
                _self.userForm.callType = callType
                _self.userForm.aliasName = aliasName
                _self.userForm.sevenmoorAccount = sevenmoorAccount
                _self.userForm.sevenmoorMobile = sevenmoorMobile
                _self.img = "/api/assets/" + portrait
            }

            this.$Get(url, config, success)
        }
    },
    mounted () {
        this.get_user_data();
    }
};
</script>
