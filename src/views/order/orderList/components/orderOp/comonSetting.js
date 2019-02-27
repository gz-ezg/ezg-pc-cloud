import * as orderApi from '../../api'
import productAttr from './productAttr'

export default {
    props: {
        payDirs: {
            type: Array
        }
    },
    components: {
        productAttr
    },
    data: function () {
        return {
            currentRow: {},
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
                                    if(params.row.product == "会计到家"){
                                        this.showAccountHomeItem = false
                                    }
                                    this.orderItem.splice(params.index, 1)
                                    this.computer_paynumber()
                                    this.currentRow = {}
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
                        // let isTrue = false
                        // if(this.orderItem[parmas.index].skuid =='1051'||this.orderItem[parmas.index].skuid =='1052'||this.orderItem[parmas.index].skuid =='1053'||this.orderItem[parmas.index].skuid =='1054'){
                        //     isTrue = true
                        // }
                        return h('div',[
                            h('Input',{
                                domProps: {
                                },
                                props:{
                                    value: this.orderItem[parmas.index].productnumber,
                                    autosize: true,
                                    type: "text",
                                    size: "small",
                                    readonly: [1051,1052,1053,1054].includes(parseInt(parmas.row.skuid))
                                    // number: true
                                },
                                on: {
                                    //  失去焦点触发
                                    "on-blur": function(event){
                                        // if(!isTrue){
                                            _self.orderItem[parmas.index].productnumber = event.target.value
                                            _self.orderItem[parmas.index].paynumber = _self.orderItem[parmas.index].productnumber * _self.orderItem[parmas.index].oaprice
                                            _self.computer_paynumber()
                                        // }
                                    },
                                    //  敲回车触发
                                    "on-enter": function(event){
                                        // if(!isTrue){
                                            _self.orderItem[parmas.index].productnumber = event.target.value
                                            _self.orderItem[parmas.index].paynumber = _self.orderItem[parmas.index].productnumber * _self.orderItem[parmas.index].oaprice
                                            _self.computer_paynumber()
                                        // }
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
                        // let isTrue = false
                        let iscycle = false
                        // if(this.orderItem[parmas.index].skuid =='1051'||this.orderItem[parmas.index].skuid =='1052'||this.orderItem[parmas.index].skuid =='1053'||this.orderItem[parmas.index].skuid =='1054'){
                        //     isTrue = true
                        // }
                        // if(this.orderItem[parmas.index].iscycle =='Y'){
                        //     iscycle = true
                        // }
                        return h('div',[
                            h('Input',{
                                domProps: {
                                },
                                props:{
                                    value: this.orderItem[parmas.index].paynumber,
                                    autosize: true,
                                    type: "text",
                                    size: "small",
                                    readonly: [1051,1052,1053,1054].includes(parseInt(parmas.row.skuid))
                                    // number: true
                                },
                                on: {
                                    //  失去焦点触发
                                    "on-blur": function(event){
                                        _self.orderItem[parmas.index].paynumber = event.target.value
                                        // if(iscycle){
                                            //iscycle为Y时，单独处理价格
                                        _self.iscycleY(_self.orderItem[parmas.index], parmas.index)
                                        // }
                                        //  此处需要写一个公共的函数，计算总价
                                        _self.computer_paynumber()
                                    },
                                    //  敲回车触发
                                    "on-enter": function(event){
                                        _self.orderItem[parmas.index].paynumber = event.target.value
                                        // if(iscycle){
                                        _self.iscycleY(_self.orderItem[parmas.index], parmas.index)
                                        // }
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
                    title: "单价/月",
                    key: "unitprice",
                    minWidth: 90
                },
                {
                    title: "详情",
                    minWidth: 120,
                    render: (h, params) => {
                        return h('Button', {
                            props: {
                                size: 'small',
                                type: 'info'
                            },
                            on: {
                                click: () => {
                                    console.log(params)
                                    this.currentRow = params;
                                }
                            }
                        }, '选项')
                    }
                }
                // {
                //     title: "赠送数量",
                //     key: "givethenumber",
                //     minWidth: 100,
                //     render: (h, parmas) => {
                //         let _self = this
                //         let isTrue = false
                //         let iscycle = false
                //         if(this.orderItem[parmas.index].skuid =='1051'||this.orderItem[parmas.index].skuid =='1052'||this.orderItem[parmas.index].skuid =='1053'||this.orderItem[parmas.index].skuid =='1054'){
                //             isTrue = true
                //         }
                //         if(this.orderItem[parmas.index].iscycle =='Y'){
                //             iscycle = true
                //         }
                //         console.log(this.orderItem[parmas.index])
                //         return h('div',[
                //             h('Input',{
                //                 domProps: {
                //                 },
                //                 props:{
                //                     value: this.orderItem[parmas.index].givethenumber,
                //                     autosize: true,
                //                     type: "text",
                //                     size: "small",
                //                     // number: true
                //                 },
                //                 on: {
                //                     //  失去焦点触发
                //                     "on-blur": function(event){
                //                         _self.orderItem[parmas.index].givethenumber = event.target.value
                //                         if(iscycle){
                //                             _self.priceCycleY(_self.orderItem[parmas.index])
                //                         }
                //                         if(isTrue){
                //                             _self.price2000(_self.orderItem[parmas.index])
                //                         }
                //                     },
                //                     //  敲回车触发
                //                     "on-enter": function(event){
                //                         _self.orderItem[parmas.index].givethenumber = event.target.value
                //                         if(iscycle){
                //                             _self.priceCycleY(_self.orderItem[parmas.index])
                //                         }
                //                         if(isTrue){
                //                             _self.price2000(_self.orderItem[parmas.index])
                //                         }
                //                     }
                //                 },
                //                 style: {
                //                     width: "100%"
                //                 }
                //             })
                //         ])
                //     }
                // },
                // {
                //     title: "服务开始税期",
                //     key: "servicestartdate",
                //     minWidth: 140,
                //     render: (h, parmas) => {
                //         let _self = this
                //         return h('div',[
                //             h('DatePicker',{
                //                 props:{
                //                     value: this.orderItem[parmas.index].servicestartdate,
                //                     type: "month",
                //                     transfer: false,
                //                     size: "small",
                //                     // disabled: !this.orderItem[parmas.index].hasOwnProperty("servicestartdate"),
                //                     // readonly: !this.orderItem[parmas.index].hasOwnProperty("servicestartdate")
                //                     disabled: this.orderItem[parmas.index].iscycle == 'N',
                //                     readonly: this.orderItem[parmas.index].iscycle == 'N',
                //                 },
                //                 on: {
                //                     "on-change": function(event){
                //                         let temp = event.split("-").join("")
                //                         _self.orderItem[parmas.index].servicestartdate = temp
                //                         // Object.assign(parmas,{value: event})
                //                     }
                //                 },
                //                 style: {
                //                     width: "100%"
                //                 }
                //             })
                //         ])
                //     }
                // },
                // {
                //     title: "服务部门",
                //     key: "departname",
                //     minWidth: 140,
                //     render: (h, parmas) => {
                //         let _self = this
                //         return h('div',[
                //             h('Select',{
                //                 props:{
                //                     value: this.orderItem[parmas.index].departid.toString(),
                //                     transfer: false,
                //                     size: "small",
                //                     labelInValue: true
                //                 },
                //                 on: {
                //                     "on-change": function(event){
                //                         console.log(event)
                //                         _self.orderItem[parmas.index].departname = event.label
                //                         _self.orderItem[parmas.index].departid = event.value
                                        
                //                     }
                //                 },
                //                 style: {
                //                     width: "100%"
                //                 }
                //             },  JSON.parse(_self.orderItem[parmas.index].servicedeparts).map(item => [
                //                 h('Option',{
                //                     props:{
                //                         value: item.type,
                //                         label: item.text,
                //                     }
                //                 })
                //             ]))
                //         ])
                //     }
                // },
                // {
                //     title: "单价/月",
                //     key: "unitprice",
                //     minWidth: 90
                // },
                // {
                //     title: "业务内容",
                //     key: "workorder",
                //     type: 'expand',
                //     minWidth: 90,
                //     render: (h, params) => {
                //         console.log(params.row)
                //         return h(productAttr,{
                //             props:{
                //                 row: params
                //             },
                //             on: {
                //                 'change': (e)=>{
                //                     console.log(e)
                //                 }
                //             }
                //         })
                //     }
                // },
                // {
                //     title: "备注",
                //     key: "memo",
                //     minWidth: 300,
                //     render: (h, parmas) => {
                //         let _self = this
                //         let reg = new RegExp("</br>", "g")
                //         this.orderItem[parmas.index].memo = this.orderItem[parmas.index].memo.replace(reg ,"\n")
                //         //  先转换为textarea能够处理的格式，上传时可能需要处理空格转换为换行符
                //         return h('div',[
                //             h('Input',{
                //                 props:{
                //                     value: this.orderItem[parmas.index].memo,
                //                     autosize: true,
                //                     type: "textarea",
                //                     size: "small"
                //                 },
                //                 on: {
                //                     "on-blur": function(event){
                //                         // console.log(event)
                //                         _self.orderItem[parmas.index].memo = event.target.value
                //                     },
                //                     // "on-enter":function(event){
                //                     //     console.log(event)
                //                     //     _self.orderItem[parmas.index].memo = event.target.value
                //                     // },
                //                 },
                //                 style: {
                //                     width: "100%"
                //                 }
                //             })
                //         ])
                //     }
                // }
            ]
            
        }
    },
    methods: {
        //  取订单详情
        async get_data(e){
            let _self = this
            this.showAccountHomeItem = false
            this.loading = true
            // let config = {}

            try {
                let data  = await orderApi.orderDetail(e)
                this.orderDetail = data
                this.orderItem = data.items.map((item)=>{
                    if(item.product == "会计到家"){
                        this.showAccountHomeItem = true
                    }
                    if(item.deleteflag == 5){
                        item.product = item.product.concat("（已退款）")
                    }
                    return item
                })
            } catch (error) {
                console.log(error)
            }

            this.loading = false
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
        //  一下代码移动至productAttr
        //小规模特定2000单价计算
        // price2000(target){
        //     let month = parseInt(target.givethenumber) + parseInt(target.productnumber)
        //     console.log(month)
        //     target.unitprice=parseInt(target.oaprice/month)
        // },
        // priceCycleY(target){
        //     let month = parseInt(target.givethenumber) + parseInt(target.productnumber)
        //     console.log(month)
        //     target.unitprice=parseInt(target.paynumber/month)
        // },
        //当iscycleY为Y时改变价格
        iscycleY(target, index){
            if(target.iscycle === 'Y' && target.productnumber == 1){
                let month = parseInt(target.givethenumber) + parseInt(target.productnumber)
                target.unitprice = parseInt(target.paynumber/month)
                target.oaprice = target.unitprice
            }
            //  推送新的价格至组件
            if(this.currentRow.row.skuid == target.skuid){
                this.currentRow = {
                    index: index,
                    row: target
                }
            }
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
                    // console.log("true")
                    return true;
                }
            }
        },
        //  开票选项
        open_isornotkp(e){
            this.$bus.emit("OPEN_ORDER_INVOICE", {
                customerId: this.orderDetail.customerid,
                companyId: this.orderDetail.companyid,
                orderId: this.orderDetail.id,
                type: e
            })
        },
        //  账户余额
        async get_balance(type, id){
            // let _self = this
            console.log(type, id)
            if(!id){
                this.$Message.warning("请选择归属公司！")
                return false
            }
            
            let config = {
                params: {
                    customerId: id
                }                
            }

            try {
                let data = await orderApi.customerAccountDetail(config)
                if(type == "create"){
                    this.allUseBalance = (data.accountAmount - data.lockAmount).toFixed(2)
                }else if(type == "update"){
                    this.allUseBalance = (data.accountAmount - data.lockAmount + this.orderDetail.usebalance).toFixed(2)
                    this.checkBalance = true
                }else{
                    return false
                }
            } catch (error) {
                console.log(error)
            }
        },
        change_item(e){
            console.log(e)
        }
    },
    created(){
        this.$bus.off("ADD_PRODUCT", true)
        this.$bus.on("ADD_PRODUCT", (e) => {
            if(e.product == "会计到家"){
                this.showAccountHomeItem = true
            }
            this.orderItem.push(e)
            this.computer_paynumber()
        })
        
    }
}