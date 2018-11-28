export default {
    data(){
        const validateTel = (rule, value, callback) => {
            let re = /^1\d{10}$/;
            if (value == "" || value == null) {
                callback();
            } else {
                if (re.test(value)) {
                    let _self = this
                    let url = "api/customer/findCustomerByTel"
                    let config = {
                        params: {
                            tel: value
                        }
                    }

                    function success(res) {
                        if (res.data.data != null) {
                            callback(new Error("抱歉，电话号码重复"));
                        } else {
                            callback();
                        }
                    }

                    function fail(err){
                        callback(new Error("验证错误"))
                    }
                    _self.$Get(url, config, success, fail);
                } else {
                    callback(new Error("电话格式不正确"));
                }
            }
        };

        const validateQQ = (rule, value, callback) => {
            let re = /^[1-9]\d{4,10}$/;
            if (value == "" || value == null) {
                callback();
            } else {
                if (re.test(value)) {
                    callback();
                } else {
                    callback(new Error("QQ格式不正确"));
                }
            }
        };
        return {
            loading: false,
            formValidate:{
                name: "",
                tel: "",
                qq: "",
                wechat: "",
                email: "",
                jobplace: "",
                sendmsgflag: "0",
                memo: "",
                id: ""
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur'}
                ],
                tel:[
                    { validator: validateTel, trigger: 'blur'}
                ],
                email:[
                    {type:'email',trigger:'blur',message:'邮箱格式不正确'}
                ],
                qq:[
                    {validator:validateQQ, trigger:'blur'}
                ],
            }
        }
    },
    methods: {
        //  校验
        check_data(success){
            let _self = this
            if(this.formValidate.tel || this.formValidate.email || this.formValidate.qq || this.formValidate.weixin){
                _self.loading = true
                _self.$refs["formValidate"].validate((valid) => {
                    if(valid){
                        success()
                    }else{
                        this.loading = false
                        return false
                    }
                })
            }else{
                this.$Message.warning("联系方式需至少填写一项！")
                return false
            }
        }
    }
}