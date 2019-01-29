<template>
    <div>
        <Modal
            v-model="openOrderDetail"
            title="查看"
            width="100%"
        >
            <Form ref="formValidateDetail" :model="formValidateDetail" :label-width="100">
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="归属公司" prop="CompanyName">
                            <Input size="small" v-model="formValidateDetail.CompanyName" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="归属客户" prop="name">
                            <Input size="small" v-model="formValidateDetail.name" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="缴费时间" prop="payTime">
                            <Input size="small" v-model="formValidateDetail.payTime" readonly/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="订单总价" prop="paynumber">
                            <Input size="small" v-model="formValidateDetail.paynumber" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="已付款" prop="realnumber">
                            <Input size="small" v-model="formValidateDetail.realnumber" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="缴费渠道" prop="payDir">
                            <Select transfer v-model="formValidateDetail.paydir" disabled size="small">
                                <Option v-for="(item, index) in payDirs" :key=index :value="item.typecode">{{item.typename}}</Option>                            
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="国地税报道" prop="GDSreport">
                            <Select transfer v-model="formValidateDetail.gdsreport" disabled size="small">
                                <Option value="ybd">已报道</Option>
                                <Option value="wbd">未报道</Option>
                                <Option value="bybd">不用报道</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="异常工单">
                            <Button type="info" size="small" @click="open_relateOrder">点击查看</Button>
                        </FormItem>
                    </Col>
                </Row>
                <Table 
                    id="show-order-item"
                    border
                    :columns="orderItemHeader" 
                    :data="orderItem" 
                    size="small">
                </Table>
            </Form>
            <div slot="footer"></div>
        </Modal>
        <relate-order-two :id="orderId"></relate-order-two>
    </div>
</template>

<script>
import relateOrderTwo from "./relateOrderTwo"

export default {
    components:{
        relateOrderTwo
    },
    props: ['payDirs'],
    data(){
        return{
            openOrderDetail: false,
            formValidateDetail: {
                CompanyName: "",
                name: "",
                payTime: "",
                paynumber: "",
                realnumber: "",
                paydir: "",
                gdsreport: ""
            },
            orderItem: [],
            orderItemHeader: [
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
                },
                {
                    title: "销售价格",
                    key: "paynumber",
                    minWidth: 100,
                },
                {
                    title: "赠送数量",
                    key: "givethenumber",
                    minWidth: 100,
                },
                {
                    title: "服务开始税期",
                    key: "servicestartdate",
                    minWidth: 120
                },
                {
                    title: "服务部门",
                    key: "departname",
                    minWidth: 140
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
                    render: (h, params) => {
                        // return h("div",{
                        //     domProps:{
                        //         innerHTML: "<div>"+params.row.memo+"</div>"
                        //     }
                        // })
                        let reg = new RegExp("</br>", "g")
                        let temp = params.row.memo.replace(reg ,"\n")
                        //  先转换为textarea能够处理的格式，上传时可能需要处理空格转换为换行符
                        return h('div',[
                            h('Input',{
                                props:{
                                    value: temp,
                                    autosize: true,
                                    type: "textarea",
                                    size: "small",
                                    readonly: true
                                },
                                style: {
                                    width: "100%"
                                }
                            })
                        ])
                    }
                }
            ],
            orderId: ''
        }
    },
    methods: {
        get_data(e){
            let _self = this
            let url = `api/order/detail/` + e

            let config = {

            }

            function success(res){
                _self.formValidateDetail = res.data.data
                _self.orderItem = _self.formValidateDetail.items
                for (let i = 0; i < _self.orderItem.length; i++) {
                    if (_self.orderItem[i].product == '会计到家') {
                         _self.kjdj = true
                        break
                    }
                }
            }

            this.$Get(url, config, success)
        },
        //打开对应的异常工单
        open_relateOrder(){
            this.$bus.emit("RELATE_ORDER_TWO",true)
        }
    },
    created() {
        let _self = this
        this.$bus.on("OPEN_ORDER_DETAIL",(e)=>{
            this.orderId = e
            _self.get_data(e)
            _self.openOrderDetail = true
        })
    },
}
</script>

<style>
#show-order-item textarea.ivu-input{
    border: 0px;
    overflow-y: hidden;
    background-color: rgba(0, 0, 0, 0);
}
</style>
