export default commonSetting = {
    props: {
        payDirs: {
            type: Array
        }
    },
    data: function () {
        return {
            loading: false,
            orderDetail: {
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
                performanceMoney: ""
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
            orderItemHeader: [
                {
                    title: "删除",
                    key: 'action',
                    minWidth: 60,
                    render: (h, params) => {
                        return h('Button',{
                            props:{
                                type:'text',
                                size:'small'
                            },
                            on:{
                                click:()=>{
                                    this.orderItem.splice(params.index, 1)
                                    this.computer_paynumber()
                                }
                            }
                        }, 'x')
                    }
                },
                {
                    title: "序号",
                    type: 'index',
                    minWidth: 80,
                    align: 'center'
                },
                {
                    title: "产品名",
                    key: "product",
                    minWidth: 150,
                },
                {
                    title: "产品属性",
                    key: "propertys",
                    minWidth: 250,
                    render: (h, params) => {
                        return h("div",{
                            domProps:{
                                innerHTML: params.row.propertys
                            }
                        })
                    }
                },
                {
                    title: "产品价格",
                    key: "oaprice",
                    minWidth: 100,
                },
                {
                    title: "产品数量（个/月）",
                    key: "productnumber",
                    minWidth: 150,
                    render: (h, parmas) => {
                        let _self = this
                        return h('div',[
                            h('Input',{
                                domProps: {
                                },
                                props:{
                                    value: this.orderItem[parmas.index].productnumber,
                                    autosize: true,
                                    type: "text",
                                    size: "small",
                                    // number: true
                                },
                                on: {
                                    //  失去焦点触发
                                    "on-blur": function(event){
                                        _self.orderItem[parmas.index].productnumber = event.target.value
                                        _self.orderItem[parmas.index].paynumber = _self.orderItem[parmas.index].productnumber * _self.orderItem[parmas.index].oaprice
                                        _self.computer_paynumber()
                                    },
                                    //  敲回车触发
                                    "on-enter": function(event){
                                        _self.orderItem[parmas.index].productnumber = event.target.value
                                        _self.orderItem[parmas.index].paynumber = _self.orderItem[parmas.index].productnumber * _self.orderItem[parmas.index].oaprice
                                        _self.computer_paynumber()
                                    }
                                },
                                style: {
                                    width: "100%"
                                }
                            })
                        ])
                    }
                },
                {
                    title: "销售价格",
                    key: "paynumber",
                    minWidth: 100,
                    render: (h, parmas) => {
                        let _self = this
                        return h('div',[
                            h('Input',{
                                domProps: {
                                },
                                props:{
                                    value: this.orderItem[parmas.index].paynumber,
                                    autosize: true,
                                    type: "text",
                                    size: "small",
                                    // number: true
                                },
                                on: {
                                    //  失去焦点触发
                                    "on-blur": function(event){
                                        //  此处需要写一个公共的函数，计算总价
                                        _self.orderItem[parmas.index].paynumber = event.target.value
                                        _self.computer_paynumber()
                                    },
                                    //  敲回车触发
                                    "on-enter": function(event){
                                        _self.orderItem[parmas.index].paynumber = event.target.value
                                        _self.computer_paynumber()
                                    }
                                },
                                style: {
                                    width: "100%"
                                }
                            })
                        ])
                    }
                },
                {
                    title: "赠送数量",
                    key: "givethenumber",
                    minWidth: 100,
                    render: (h, parmas) => {
                        let _self = this
                        return h('div',[
                            h('Input',{
                                domProps: {
                                },
                                props:{
                                    value: this.orderItem[parmas.index].givethenumber,
                                    autosize: true,
                                    type: "text",
                                    size: "small",
                                    // number: true
                                },
                                on: {
                                    //  失去焦点触发
                                    "on-blur": function(event){
                                        _self.orderItem[parmas.index].givethenumber = event.target.value
                                    },
                                    //  敲回车触发
                                    "on-enter": function(event){
                                        _self.orderItem[parmas.index].givethenumber = event.target.value
                                    }
                                },
                                style: {
                                    width: "100%"
                                }
                            })
                        ])
                    }
                },
                {
                    title: "服务开始税期",
                    key: "servicestartdate",
                    minWidth: 140,
                    render: (h, parmas) => {
                        let _self = this
                        return h('div',[
                            h('DatePicker',{
                                props:{
                                    value: this.orderItem[parmas.index].servicestartdate,
                                    type: "month",
                                    transfer: false,
                                    size: "small",
                                    disabled: !this.orderItem[parmas.index].hasOwnProperty("servicestartdate"),
                                    readonly: !this.orderItem[parmas.index].hasOwnProperty("servicestartdate")
                                },
                                on: {
                                    "on-change": function(event){
                                        let temp = event.split("-").join("")
                                        _self.orderItem[parmas.index].servicestartdate = temp
                                        // Object.assign(parmas,{value: event})
                                    }
                                },
                                style: {
                                    width: "100%"
                                }
                            })
                        ])
                    }
                },
                {
                    title: "服务部门",
                    key: "departname",
                    minWidth: 140,
                    render: (h, parmas) => {
                        let _self = this
                        return h('div',[
                            h('Select',{
                                props:{
                                    value: this.orderItem[parmas.index].departid.toString(),
                                    transfer: false,
                                    size: "small",
                                    labelInValue: true
                                },
                                on: {
                                    "on-change": function(event){
                                        console.log(event)
                                        _self.orderItem[parmas.index].departname = event.label
                                        _self.orderItem[parmas.index].departid = event.value
                                        
                                    }
                                },
                                style: {
                                    width: "100%"
                                }
                            },  JSON.parse(_self.orderItem[parmas.index].servicedeparts).map(item => [
                                h('Option',{
                                    props:{
                                        value: item.type,
                                        label: item.text,
                                    }
                                })
                            ]))
                        ])
                    }
                },
                {
                    title: "单价/月",
                    key: "unitprice",
                    minWidth: 90
                },
                {
                    title: "备注",
                    key: "memo",
                    minWidth: 300,
                    render: (h, parmas) => {
                        let _self = this
                        let reg = new RegExp("</br>", "g")
                        this.orderItem[parmas.index].memo = this.orderItem[parmas.index].memo.replace(reg ,"\n")
                        //  先转换为textarea能够处理的格式，上传时可能需要处理空格转换为换行符
                        return h('div',[
                            h('Input',{
                                props:{
                                    value: this.orderItem[parmas.index].memo,
                                    autosize: true,
                                    type: "textarea",
                                    size: "small"
                                },
                                on: {
                                    "on-blur": function(event){
                                        // console.log(event)
                                        _self.orderItem[parmas.index].memo = event.target.value
                                    },
                                    // "on-enter":function(event){
                                    //     console.log(event)
                                    //     _self.orderItem[parmas.index].memo = event.target.value
                                    // },
                                },
                                style: {
                                    width: "100%"
                                }
                            })
                        ])
                    }
                }
            ]
            
        }
    },
    methods: {
        //  取订单详情
        get_data(e){
            let _self = this
            let url = `api/order/detail/` + e
            _self.loading = true
            let config = {}

            function success(res){
                _self.orderDetail = res.data.data
                _self.orderItem = res.data.data.items
                _self.loading = false
            }

            this.$Get(url, config, success)
        },
        //  取合同
        show_contarct(e){
            let _self = this
            this.$bus.emit("ORDER_LIST_CONTARCT_PIC_OPEN", {id: _self.orderDetail.id, type: e})
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
                console.log(this.orderItem[i].hasOwnProperty("servicestartdate"))
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
                    console.log("true")
                    return true;
                }
            }
        }
    },
    created(){
        this.$bus.off("ADD_PRODUCT", true)
        this.$bus.on("ADD_PRODUCT", (e) => {
            this.orderItem.push(e)
            this.computer_paynumber()
        })
    }
}