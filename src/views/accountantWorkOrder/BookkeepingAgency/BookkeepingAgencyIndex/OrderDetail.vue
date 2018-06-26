<template>
    <div>
        <Modal
                v-model="orderdetail"
                title="订单详情"
                width="80%"
        >
            <Form ref="formValidateDetail" :model="formValidateDetail" :label-width="100">
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="归属公司" prop="CompanyName">
                            <Input size="small" v-model="formValidateDetail.CompanyName" disabled/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="归属客户" prop="NAME">
                            <Input size="small" v-model="formValidateDetail.NAME" disabled/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="缴费时间"  prop="date">
                            <Input size="small" v-model="formValidateDetail.date" disabled/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="订单总价" prop="zongjia">
                            <Input size="small" v-model="formValidateDetail.zongjia" disabled/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="已付款" prop="orderPayNumber">
                            <Input size="small" v-model="formValidateDetail.orderPayNumber" disabled/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="缴费渠道" prop="payDir">
                            <Select transfer v-model="formValidateDetail.payDir" disabled size="small" style="width:100%">
                                <Option v-for="(item, index) in payDirType" :key=index :value="item.typecode">{{item.typename}}</Option>                            
                                
                                <!-- <Option value="gszfb">公司支付宝</Option>
                                <Option value="gh">工行</Option>
                                <Option value="zh">招行</Option>
                                <Option value="wx">微信公众号</Option>
                                <Option value="gw">官网</Option>
                                <Option value="other">其他</Option>
                                <Option value="cash">现金</Option>
                                <Option value="jhang">建行</Option>
                                <Option value="nsh">农商行</Option>
                                <Option value="tb">淘宝</Option>
                                <Option value="zht">中衡通</Option>
                                <Option value="jt">锦涛</Option>
                                <Option value="wjw">魏建伟</Option>
                                <Option value="zgrzh">转个人账户</Option>
                                <Option value="dgzfb">东莞支付宝</Option>
                                <Option value="szgh">深圳工行</Option> -->
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="提成总额" prop="ticheng">
                            <Input size="small" v-model="formValidateDetail.ticheng" disabled/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="业绩" prop="performanceMoney">
                            <Input size="small" v-model="formValidateDetail.performanceMoney" disabled/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="附加流水账" prop="customername">
                            <Input size="small" v-model="formValidateDetail.customername" disabled/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="服务开始税期" prop="serviceBeginDate">
                            <Input size="small" v-model="formValidateDetail.serviceBeginDate" disabled/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="国地税报道" prop="GDSreport">
                            <Select transfer v-model="formValidateDetail.GDSreport" disabled >
                                <Option value="ybd">已报道</Option>
                                <Option value="wbd">未报道</Option>
                                <Option value="bybd">不用报道</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <FormItem>
                        <Button type="primary" icon="plus" @click="kuaiji()" v-show="kjdj">查看会计到家服务项</Button>
                    </FormItem>
                </Row>
                <table width="100%" id="orderItemList3"></table>
            </Form>
        </Modal>
    </div>
</template>


<script>
    import Bus from '../../../../components/bus'

    export default {
        data(){
            return {
                payDirType:"",
                orderdetail:false,
                formValidateDetail: {
                    ticheng: 0,
                    zongjia: 0,
                    orderPayNumber: 0,
                    performanceMoney: 0,
                    CompanyName: '',
                    customername: '',
                    GDSreport: '',
                    payDir: '',
                    date: '',
                    serviceBeginDate: ''
                },
            }
        },
        created(){
            var _self = this
            _self.getPayDirs()
            Bus.$on('orderdetail',(e)=>{
                _self.orderdetail = true
            })
        },
        methods: {
            kjdj(){},
            getPayDirs(){
                let _self = this
                function finsih(res){
                    // console.log(res)
                    _self.payDirType = res.data.data.payDirs
                    // console.log(_self.payDirType)
                }
                this.$GetDataCenter("payDirs",finsih)
            }
        }
    }
</script>
