<template>
    <div>
        <Modal
            v-model="openShowOrderDetail"
            title="查看订单"
            :mask-closable="false"                
            width="100"
        >
            <Form ref="orderDetail" :model="orderDetail" :label-width="100">
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="归属公司" prop="CompanyName">
                        <Input size="small" v-model="orderDetail.CompanyName" readonly/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="归属客户" prop="name">
                        <Input size="small" v-model="orderDetail.name" readonly/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="缴费时间"  prop="payTime">
                        <Input size="small" v-model="orderDetail.payTime" readonly/>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="订单总价" prop="paynumber">
                        <Input size="small" v-model="orderDetail.paynumber" readonly/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="已付款" prop="realnumber">
                            <Input size="small" v-model="orderDetail.realnumber" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="缴费渠道" prop="paydir">
                        <Select transfer v-model="orderDetail.paydir" disabled size="small" style="width:100%">
                            <Option v-for="(item, index) in payDirs" :key=index :value="item.typecode">{{item.typename}}</Option>                            
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="国地税报道" prop="gdsreport">
                        <Select transfer v-model="orderDetail.gdsreport" disabled size="small" style="width:100%">
                            <Option value="ybd">已报道</Option>
                            <Option value="wbd">未报道</Option>
                            <Option value="bybd">不用报道</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="是否提供发票" prop="isornotkp">
                        <Select transfer v-model="orderDetail.isornotkp" size="small" style="width:100%" disabled>
                            <Option value="Y">是</Option>
                            <Option value="N">否</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <!-- <Col span="8" v-if="orderDetail.isornotkp=='Y'">
                        <FormItem>
                            <Button @click="open_isornotkp('show')" type="info" size="small">开票信息</Button>
                        </FormItem>
                    </Col> -->
                </Row>
                <Row :gutter="16">
                    <FormItem>
                        <Button type="primary" icon="plus" @click="show_contarct('edit')">查看合同</Button>
                        <Button type="primary" icon="plus" @click="openServiceItem = true" v-if="showAccountHomeItem">查看会计到家服务项</Button>
                        
                        <!-- <Button type="primary" icon="plus" @click="kuaiji()" v-show="kjdj">查看会计到家服务项</Button> -->
                    </FormItem>
                </Row>
                <Row style="margin-top:10px">
                    <Table :columns="orderDetailListHeaderShow" :data="orderItem" :loading="loading" border size="small" id="show-order-item">
                    </Table>
                </Row>
            </Form>
            <div slot="footer">
                <Button @click="openShowOrderDetail = false">关闭</Button>
            </div>
        </Modal>
        <service-item @close="close_item" v-if="openServiceItem" :id="orderDetail.companyid" :readonly="false"></service-item>
    </div>
</template>


<script>
import serviceItem from '../accountHomeTree'
import commonSetting from './comonSetting.js'

export default {
    mixins: [commonSetting],
    components: {
        serviceItem
    },
    data(){
        return {
            orderId: "",
            openServiceItem: false,
            openShowOrderDetail: false,
            orderDetailListHeaderShow: [
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
            dangerOperation:{
                title: "撤回",
                minWidth: 80,
                align: 'center',
                render: (h, params) => {
                    return h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        style: {
                            'marginLeft': '5px'
                        }
                    },[
                        h('Poptip', {
                            props: {
                                transfer: true,
                                confirm: true,
                                title: '您确定要撤回此订单项吗！',
                            },
                            on: {
                                'on-ok': ()=>{
                                    console.log(params.row.itemid)
                                    this.cancel_order(this.orderId, params.row.itemid)
                                },
                            }
                        }, '撤回')
                    ])
                }
            },
        }
    },
    methods: {
        open_service_item(){
            this.openServiceItem = true
        },
        close_item(){
            this.openServiceItem = false
        },
        cancel_order(orderId, orderItemId){
            let url = `api/order/cancelOrder`
            let _self = this
            let config = {
                params: {
                    orderId: orderId,
                    orderItemId: orderItemId
                }
            }

            function success(res){
                _self.$Message.success(res.data.msg)
                _self.get_data(orderId)
            }

            function fail(err){
                _self.$Message.fail("撤回失败！")
                _self.get_data(orderId)
            }

            this.$Get(url, config, success, fail)
        }
    },
    created() {
        let _self = this
        if(localStorage.getItem('id')==10059){
            this.orderDetailListHeaderShow.unshift(this.dangerOperation)
        }
        this.$bus.off("OPEN_ORDERLIST_DETAIL", true)
        this.$bus.on("OPEN_ORDERLIST_DETAIL", (e)=>{
            this.get_data(e)
            this.orderId = e
            this.openShowOrderDetail = true
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
