<template>
    <div>
        <Modal
            title="编辑订单"
            v-model="openEditOrderDetail"
            width="100"
        >
            <Form ref="formValidateEadit" :model="formValidateEadit" :label-width="100">
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="归属公司" prop="CompanyName">
                        <Input size="small" v-model="formValidateEadit.CompanyName" readonly/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="归属客户" prop="name">
                        <Input size="small" v-model="formValidateEadit.name" readonly/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="缴费时间"   prop="payTime">
                        <DatePicker size="small" format="yyyy-MM-dd" type="date" style="width: 100%" v-model="formValidateEadit.payTime" readonly></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="订单总价" prop="realnumber">
                        <Input size="small" v-model="formValidateEadit.realnumber" readonly/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="已付款" prop="paynumber">
                        <Input size="small" v-model="formValidateEadit.paynumber"/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="缴费渠道" prop="paydir">
                        <Select transfer v-model="formValidateEadit.paydir" style="width:100%" size="small" filterable>
                            <Option v-for="(item, index) in payDirType" :key=index :value="item.typecode">{{item.typename}}</Option>                            
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="国地税报道" prop="gdsreport">
                        <Select transfer v-model="formValidateEadit.gdsreport" size="small">
                            <Option value="ybd">已报道</Option>
                            <Option value="wbd">未报道</Option>
                            <Option value="bybd">不用报道</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="是否提供发票" prop="isornotkp">
                        <Select transfer v-model="formValidateEadit.isornotkp" size="small" style="width:100%">
                            <Option value="Y">是</Option>
                            <Option value="N">否</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <FormItem label="选择产品">
                        <!-- <Button type="primary" icon="plus" @click="orderAddProducts()">新增</Button>
                        <Button type="primary" icon="plus" @click="removeRows()">删除</Button>
                        <Button type="primary" icon="plus" @click="show_contarct('edit')">查看合同</Button>
                        <Button type="primary" icon="plus" @click="kuaiji()" v-show="kjdj">查看会计到家服务项</Button> -->
                    </FormItem>
                </Row>
                </Form>
                <Row>
                    <Table
                        id="orderItem"
                        style="margin-top:10px"
                        ref="selection"
                        highlight-row
                        size="small"
                        :columns="orderItemHeader"
                        :data="orderItem"></Table>
                </Row>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>

export default {
    data(){
        return {
            payDirType: [],
            openEditOrderDetail: true,
            formValidateEadit: {
                ticheng: 0,
                realnumber: 0,
                paynumber: 0,
                performanceMoney: 0,                    
                CompanyName: '',
                customername: '',
                gdsreport: '',
                paydir: '',
                payTime: '',
                serviceBeginDate: '',
                isornotkp:'',
                name: ""
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
                                }
                            }
                        }, 'x')
                    }
                },
                {
                    title: "序号",
                    type: 'index',
                    minWidth: 60,
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
                                    },
                                    //  敲回车触发
                                    "on-enter": function(event){
                                        _self.orderItem[parmas.index].productnumber = event.target.value
                                        _self.orderItem[parmas.index].paynumber = _self.orderItem[parmas.index].productnumber * _self.orderItem[parmas.index].oaprice
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
                                    },
                                    //  敲回车触发
                                    "on-enter": function(event){
                                        _self.orderItem[parmas.index].paynumber = event.target.value
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
                                        //  此处需要写一个公共的函数，计算总价
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
                                    size: "small"
                                },
                                on: {
                                    "on-change": function(event){
                                        _self.orderItem[parmas.index].servicestartdate = event
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
                                        console.log(event)
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
    methods:{
        get_order_detail(){
            let _self = this
            let url = `api/order/detail/41834`

            let config = {}

            function success(res){
                // console.log(res.data.data.items)
                _self.formValidateEadit = res.data.data
                _self.orderItem = res.data.data.items
            }

            this.$Get(url, config, success)
        }
    },
    created(){
        this.get_order_detail()
    }
}
</script>

<style>
#orderItem .ivu-input{
    border: 0px solid #dddee1
}
#orderItem .ivu-select-selection{
    border: 0px solid #dddee1
}
</style>
