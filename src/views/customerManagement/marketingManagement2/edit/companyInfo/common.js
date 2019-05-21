export default {
    props: {
        customer: {
            type: [Array, Object, String]
        },
        taxtype:{
            type: Array
        },
        companyarea: {
            type: Array
        },
        importance: {
            type: Array
        },
        cluesources: {
            type: Array
        }
    },
    data(){
        let re = /^[\u4e00-\u9fa5()()]+|$/;
        const companynamecheck = (rule, value, callback)=>{
            if (value == '' || value == null) {
                callback(new Error('企业名称不能为空'));
            }else if(!re.test(value)){
                callback(new Error('企业名称必须为汉字'))
            } else {
                value = encodeURI(value)
                let url = 'api/customer/findCompanyByName'
                let config = {
                    params:{
                        companyName: value
                    }
                }
                function success(response) {
                    if (response.data.data != null) {
                        callback(new Error('抱歉，公司名重复'));
                    } else {
                        callback();    
                    }
                }
                function fail(err){
                    callback(new Error("系统异常！"))
                }
                this.$Get(url, config, success, fail)
            }
        };
        return {
            loading: false,
            formValidate:{
                taxtype: 'tax13',
                tel: this.customer.TEL,
                companyname: '',
                followby: localStorage.getItem('realname'),
                legalrepresentative: '',
                importlevel: '',
                createby: localStorage.getItem('realname'),
                cluesource: this.customer.customersourceCode,
                customerid: this.customer.ID,
                companyarea: [],
                companyarea_temp: []
            },
            ruleValidate: {
                companyname: [
                    {required: true, trigger: 'blur', validator: companynamecheck}
                ],
                legalrepresentative: [
                    {required: true, trigger: 'change',message:'法人名称不能为空'},
                ],
                importlevel: [
                    {required: true, trigger: 'change',message:'重要等级不能为空'}
                ],
                cluesource: [
                    {required: true,trigger: 'change',message: '企业来源不能为空'}
                ],
                taxtype: [
                    {required: true,message: '企业纳税类型不能为空', trigger: 'change'}
                ],
                companyarea:[
                    {required: true,message: '企业注册地不能为空', trigger: 'change', type:'array'}
                ]
            }
        }
    },
    methods: {
        //  校验
        check_data(success){
                this.$refs["formValidate"].validate((valid) => {
                    if(valid){
                        success()
                    }else{
                        this.loading = false
                        return false
                    }
                })
        }
    },
    created(){
        // console.log(this.importance)
        // console.log(this.taxtype)
        // console.log(this.companyarea)
        // console.log(this.cluesources)
    }
}