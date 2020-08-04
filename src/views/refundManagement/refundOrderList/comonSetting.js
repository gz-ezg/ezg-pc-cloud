import * as orderApi from './api'
export default {
    props: {
        payDirs: {
            type: Array
        }
    },
    data: function () {
        return {
            checkBalance: false,
            showAccountHomeItem: false,
            loading: false,
            allUseBalance: "待查询",
            orderDetail: {
                customerid: "",
                id: "",
                companyid: "",
                isornotkp: "N",
                CompanyName: "",
                tel: "",
                name: "",
                payTime: "",
                payamount: "",
                neednumber: "",
                paynumber: "",
                realnumber: "",
                paydir: "",
                gdsreport: "",
                performanceMoney: "",
                usebalance: 0
            },
            orderDetailRule:{
                isornotkp: [
                    { required: true, message: '请补全！', trigger: 'change' }
                ],
                CompanyName: [
                    { required: true, message: '请补全！', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请补全！', trigger: 'change' }
                ],
                payTime: [
                    { required: true, message: '请补全！', trigger: 'change', type: "date" }
                ],
                paynumber: [
                    { required: true, message: '请补全！', trigger: 'change', type: "number" }
                ],
                realnumber: [
                    { required: true, message: '请补全！', trigger: 'change', type: "number" }
                ],
                paydir: [
                    { required: true, message: '请补全！', trigger: 'change' }
                ],
                // gdsreport: [
                //     { required: true, message: '请补全！', trigger: 'change' }
                // ],
            },
            orderItem: [],
        }
    },
    methods: {
        //  取订单详情
        async get_data(e){
            let _self = this

            this.showAccountHomeItem = false
            this.loading = true
            try {
                let data  = await orderApi.orderDetail(e)
                this.orderDetail = data
                this.orderItem = data.items.map((item)=>{
                    if(item.deleteflag == 5){
                        item.product = item.product.concat("（已退款）")
                    }
                    if(item.deleteflag == 10) {
                        item.product = item.product.concat("（已退款给客户）")
                    }
                    return item
                })
            } catch (error) {
                console.log(error)
            }

            this.loading = false
        },
        //  计算总金额
        computer_paynumber(){
            let _self = this
            let temp = 0
            for(let i = 0; i < _self.orderItem.length; i++){
                temp = parseInt(temp) + parseInt(_self.orderItem[i].paynumber)
            }
            this.orderDetail.paynumber = parseInt(temp)
            this.orderDetail.realnumber = parseInt(temp)
        },
        //  关闭弹窗时调用
        modal_status_change(e){
            if(!e){
                this.$refs["orderDetail"].resetFields()
                this.orderDetail.customerid = ""
                this.orderDetail.companyid = ""
                this.allUseBalance = "待查询"
                this.orderItem = []
            }
        },
        //  检查代理记账税期是否填写
        check_date(){
            if(this.orderItem.length == 0){
                this.$Message.warning("请选择产品！")
                return false;
            }
            for(let i = 0; i<this.orderItem.length; i++){
                // if(this.orderItem[i].product.indexOf("记账") == "-1"){
                // console.log(this.orderItem[i].hasOwnProperty("servicestartdate"))
                //  如果是周期性产品，则拥有服务开始时间字段，；两者均可行
                //  编辑时不可使用该方法，否则所有数据需填写，因为返回给的是全部
                if(!this.orderItem[i].hasOwnProperty("servicestartdate")){
                    
                }else{
                    if(this.orderItem[i].servicestartdate){
                        //  检查通过
                    }else{
                        //  检查不通过
                        this.$Message.error("请输入服务开始税期！")
                        console.log("false")
                        return false;
                    }
                }
                if(i == this.orderItem.length - 1){
                    return true;
                }
            }
        },
        //  账户余额
    },
    created(){
        
    }
}