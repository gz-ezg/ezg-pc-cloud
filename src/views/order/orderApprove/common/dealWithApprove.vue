<template>
    <div>
        <Modal
            v-model="openApproveDealWith"
            title="办理审批"
            width="100%"
            :styles="{height: '100%', top: '0px'}">
            <Row>
                <Col span="10">
                <Form ref="orderDetail" :model="orderDetail" :label-width="100" >
                    <Row :gutter="16">
                        <Col span="12">
                        <FormItem label="归属公司" prop="CompanyName">
                            <Input size="small" v-model="orderDetail.CompanyName" readonly/>
                        </FormItem>
                        </Col>
                        <Col span="11">
                        <FormItem label="归属客户" prop="name">
                            <Input size="small" v-model="orderDetail.name" readonly/>
                        </FormItem>
                        </Col>

                    </Row>
                    <Row :gutter="16">
                        <Col span="12">
                        <FormItem label="缴费时间"  prop="payTime">
                            <DatePicker size="small" type="date" style="width: 100%" v-model="orderDetail.payTime"  readonly></DatePicker>
                        </FormItem>
                        </Col>


                        <Col span="11">
                        <FormItem label="缴费渠道" prop="paydir">

                            <Input size="small"   v-model="orderDetail.paydirText" readonly/>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row :gutter="16">
                        <Col span="12">
                        <FormItem label="订单总价" prop="paynumber">
                            <Input size="small" v-model="orderDetail.paynumber" number readonly/>
                        </FormItem>
                        </Col>
                        <Col span="11">
                        <FormItem label="已付款" prop="realnumber">
                            <Input size="small" v-model="orderDetail.realnumber" number  readonly />
                        </FormItem>
                        </Col>
                    </Row>

                    <Row :gutter="16">
                        <Col span="12">
                        <FormItem label="是否提供发票" prop="isornotkp">
                            <Input size="small" v-model="orderDetail.isornotkpText"   readonly />

                        </FormItem>
                        </Col>
                        <Col span="11">
                        <FormItem label="国地税报道" prop="gdsreport">
                            <Input size="small" v-model="orderDetail.gdsreportText"   readonly />
                        </FormItem>
                        </Col>
                    </Row>

                    <Row :gutter="16">
                        <Col span="24">
                        <FormItem label="异常工单号">
                            <div style="display:inline-block">
                                <Input size="small" v-model="unusualCode" readonly style="width:60%"/>
                                <Button type="info" size="small" @click="open_relateOrder">查看</Button>
                            </div>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row :gutter="16">
                        <Col span="24">
                        <FormItem label="使用余额" prop="usebalance">
                            <div style="display:inline-block">
                                <Input size="small" v-model="orderDetail.usebalance" style="width:40%" readonly number />
                                <!--<Button type="info" size="small" @click="get_balance('create', orderDetail.customerid)" :disabled="checkBalance">查询</Button>-->

                            </div>
                        </FormItem>
                        </Col>
                    </Row>


                    <Row :gutter="16">

                        <div v-for="item of orderDetail.departJson">
                            <Row>
                                <Col span="8">
                                <FormItem label="部门:">
                                    {{item.departName}}
                                </FormItem>
                                </Col>
                                <Col span="15">
                                <FormItem label="人员:">
                                    {{item.realname}}
                                </FormItem>
                                </Col>
                            </Row>
                        </div>

                    </Row>
                </Form>
                </Col>
                <Col span="14">
                <h3 style="margin-bottom: 10px;">
                    产品详情
                </h3>

                <product-detail-list  :productList="orderItem" :pageFlag="pageFlag" :isDisabled="isDisabled" :orderDetail="orderDetail"></product-detail-list>
                </Col>
            </Row>

            <Tabs>
                <TabPane label="任务处理" icon="clipboard">
                    <!-- 已无返回值 -->
                    <!-- <Steps style="margin-top: 3%" size="small">
                        <Step v-if="item.activityType == 'userTask'" :title="item.activityName" :content="item.assignee" :key=index.vue v-for="(item,index.vue) in ApproveFlow" ></Step>
                    </Steps> -->
                    <Form ref="banlishenpi" :model="banlishenpi" :label-width="120" style="margin-top: 5px">
                        <FormItem label="审批备注" prop="desc">
                            <Input v-model="banlishenpi.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                        </FormItem>
                        <FormItem label="是否同意审批" prop="agree">
                            <RadioGroup v-model="banlishenpi.agree">
                                <Radio label="1">同意</Radio>
                                <Radio label="0">驳回</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Form>
                </TabPane>
            </Tabs>
            <div slot="footer">
                <Button type="primary" @click="submit" :loading="submitLoading">提交</Button>
            </div>
        </Modal>
        <Modal
            v-model="accoutError"
            title="账期异常警示"
            width="500"
            :mask-closable="false"
            :closable="false"
        >
            <Row>
                <center><Icon type="alert" style="color:red;font-size:40px"></Icon></center>
                <center><h2 style="color:red;margin-top:20px">该订单账期存在异常，请修正！</h2>
                    
                </center>
                <h3 v-html="errMsg"></h3>
            </Row>
            <div slot="footer">
                <Button type="primary" @click="accoutError = false">确认</Button>
            </div>
        </Modal>
        <relate-order :id="orderId"></relate-order>
    </div>
</template>

<script>
import relateOrder from "./relateOrder"
import productDetailList from "../../orderList/components/orderOp/productDetailList"
import {simpleCodeToText} from "../../../../libs/utils"
export default {
    components:{
        relateOrder,
        productDetailList
    },
    watch:{
        orderDetail(val){
            console.log(val);
           this.orderDetail.paydirText =  simpleCodeToText(this.orderDetail.paydir,this.payDirs);
            if(this.orderDetail.isornotkp == 'Y'){
                this.orderDetail.isornotkpText = '是'
            }else{
                this.orderDetail.isornotkpText = '否'
            }
            if(this.orderDetail.gdsreport == 'ybd'){
                this.orderDetail.gdsreportText = "已报道"
            }else if(this.orderDetail.gdsreport == 'wbd'){
                this.orderDetail.gdsreportText = "未报道"
            }else if(this.orderDetail.gdsreport == 'bybd'){
                this.orderDetail.gdsreportText = "不用报道"
            }else{
                this.orderDetail.gdsreportText = "未选择"
            }
        }
    },
    props: ['payDirs'],
    data(){
        return {
			//异常工单号
			unusualCode:"",
            //  账期异常提示
            accoutError: false,
            isDisabled: true,
            //  打开弹窗
            openApproveDealWith: false,
            pageFlag:"showOrder",
            //  会计到家服务项
            kjdj: false,
            formValidateDetail: {
                CompanyName: "",
                name: "",
                payTime: "",
                paynumber: "",
                realnumber: "",
                paydir: "",
                gdsreport: "",
                usebalance: ""
            },
            submitLoading: false,
            banlishenpi: {
                agree: "1",
                desc: ""
            },
            errMsg: "",

            orderItem: [],
            orderDetail:[],
            orderId:''
        }
    },
    methods:{
		//获取异常工单号
		get_ab_worker_id(){
		    let _self = this
		    let url = `api/order/unusual/workorder/findUnusualWorkOrderByOrderId`
		    let config ={
		        params:{
		            orderId: this.orderId
		        }
		    }
		    function success(res){
				console.log("res.data.data")
		        console.log(res.data.data)
		        _self.unusualCode = ""
		        if(res.data.data){
		            _self.unusualCode = res.data.data.unusual_code
		        }
		    }
		    this.$Get(url,config,success)
		},
        //  检查账期是否异常
        check_order(e){
            let _self = this
            let url = `api/order/cycle/check/order/exception`
            let config = {
                params:{
                    orderId: e
                }
            }

            function success(res){
                if(res.data.data.hasException == true){
                    _self.accoutError = true
                    _self.errMsg = res.data.data.msg
                    _self.banlishenpi.agree = "0"                
                }
                _self.get_data(e)
            }

            function fail(err){
                _self.accoutError = false
            }

            _self.$Get(url,config,success,fail)
        },
        //  数据项
        get_data(e){
            let _self = this
            let url = `api/order/detail/` + e

            let config = {

            }

            function success(res){
                console.log(res.data.data)
                _self.formValidateDetail = res.data.data
                _self.orderDetail = res.data.data
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
        //  办理审批
        submit(){
            let _self = this
            _self.submitLoading = true
            _self.$ButtonCollect("order_approve_submit")
            let url = 'api/activiti/toDoWorkFlowByBid'
            
            let config = {
                params: {
                    bId: _self.formValidateDetail.id,
                    bType: 10,
                    auditFlag: _self.banlishenpi.agree,
                    auditMemo: _self.banlishenpi.desc
                }
            }

            function success(res) {
                _self.openApproveDealWith = false
                // _self.$Message.success('提交成功');
                _self.$Message.success(res.data.msg)
		        _self.banlishenpi.agree = '1'
                _self.banlishenpi.desc = ''
                _self.submitLoading = false
                _self.$bus.emit("UPDATE_ORDER_DATA", true)
            }

            function fail(err) {
                _self.$Message.error(err);
                _self.submitLoading = false
            }

            this.$Get(url, config, success, fail)
        },
        // get_data_center(){
        //     let _self = this
        //     let params = "payDirs"

        //     function success(res){
        //         _self.payDirs = res.data.data.payDirs
        //     }

        //     this.$GetDataCenter(params, success)
        // },
        kuaiji(){

        },
        //打开对应的异常工单
        open_relateOrder(){
            this.$bus.emit("RELATE_ORDER",true)
        }
    },
    created() {
        let _self = this
        // this.get_data_center()
        this.$bus.on("ORDER_APPROVE_DEALWITH", (e)=>{
            _self.orderId = e
            console.log(e)
            _self.check_order(e)
            _self.openApproveDealWith = true
			_self.get_ab_worker_id()
        })
    },
}
</script>
