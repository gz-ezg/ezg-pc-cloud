<template>
    <div>
        <Modal
            title="修改订单"
            v-model="openamendOrderDetail"
            width="100"
        >
            <Form ref="orderDetail" :model="orderDetail" :label-width="100" :rules="orderDetailRule">
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
                    <FormItem label="缴费时间"   prop="payTime">
                        <DatePicker size="small" type="date" style="width: 100%" v-model="orderDetail.payTime"></DatePicker>
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
                    <FormItem label="国地税报道" prop="gdsreport">
                        <Select transfer v-model="orderDetail.gdsreport" size="small" disabled>
                            <Option value="ybd">已报道</Option>
                            <Option value="wbd">未报道</Option>
                            <Option value="bybd">不用报道</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="缴费渠道" prop="paydir">
                        <Select transfer v-model="orderDetail.paydir" style="width:100%" size="small">
                            <Option v-for="(item, index) in payDirs" :key=index :value="item.typecode">{{item.typename}}</Option>                            
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="已付款" prop="realnumber">
                        <Input size="small" v-model="orderDetail.realnumber" readonly/>
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
                            <Button @click="open_isornotkp('amend')" type="info" size="small">开票信息</Button>
                        </FormItem>
                    </Col> -->
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="使用余额" prop="usebalance">
                            <div style="display:inline-block">
                                <Input size="small" v-model="orderDetail.usebalance" style="width:50%" number readonly/>
                                <Button type="info" size="small" @click="get_balance('create', orderDetail.customerid)">查询</Button>
                                <span style="line-height:24px;height:24px;display:inline-block;margin-left:10px">可用余额：</span><span style="line-height:24px;height:24px;display:inline-block">{{allUseBalance}}</span>
                            </div>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <Row>
                <Table
                    id="orderItem"
                    style="margin-top:10px"
                    ref="selection"
                    highlight-row
                    border
                    size="small"
                    :columns="orderItemHeader"
                    :data="orderItem"></Table>
            </Row>
            <div slot="footer">
                <Button type="primary" @click="xiugai" :loading="loading">修改</Button>
                <Button type="ghost" @click="openamendOrderDetail = false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import commonSetting from './comonSetting.js'
import { DateFormat } from '../../../../../libs/utils.js'
export default {
    mixins: [commonSetting],
    data(){
        return {
            openamendOrderDetail: false,
            loading: false
        }
    },
    methods:{
        xiugai(){
            let _self = this
            _self.loading = true
            this.$refs["orderDetail"].validate((valid) => {
                if(valid){
                    let url = `api/order/finishedUpdate`
                    let config = {
                        id: _self.orderDetail.id,
                        paydir: _self.orderDetail.paydir,
                        paytime: DateFormat(_self.orderDetail.payTime),
                        items: JSON.stringify(_self.orderItem)
                    }

                    console.log(config)

                    function success(res){
                        _self.loading = false
                        _self.openamendOrderDetail = false
                        _self.$refs["orderDetail"].resetFields()
                        _self.orderItem = []
                        _self.$bus.emit("UPDATE_ORDER_LIST", true)
                    }

                    function fail(err){
                        _self.loading = true
                    }

                    _self.$Post(url, config, success, fail)
                }else{
                    _self.loading = false
                }
            })
        }
    },
    created(){
        let _self = this
        this.$bus.off("OPEN_ORDERLIST_AMEND", true)
        this.$bus.on("OPEN_ORDERLIST_AMEND", (e) => {
            this.get_data(e)
            this.openamendOrderDetail = true
        })
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
