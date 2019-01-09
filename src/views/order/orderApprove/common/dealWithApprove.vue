<template>
    <div>
        <Modal
            v-model="openApproveDealWith"
            title="办理审批"
            width="100%"
            :styles="{height: '100%', top: '0px'}">
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
                        <FormItem label="国地税报道" prop="GDSreport">
                            <Select transfer v-model="formValidateDetail.gdsreport" disabled size="small">
                                <Option value="ybd">已报道</Option>
                                <Option value="wbd">未报道</Option>
                                <Option value="bybd">不用报道</Option>
                            </Select>
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
                        <FormItem label="已付款" prop="realnumber">
                            <Input size="small" v-model="formValidateDetail.realnumber" readonly/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="使用余额" prop="usebalance">
                            <Input size="small" v-model="formValidateDetail.usebalance" number readonly />
                        </FormItem>
                    </Col>
                </Row>
                <!-- <Row :gutter="16">
                    <FormItem>
                        <Button type="primary" icon="plus" @click="kuaiji()" v-show="kjdj">查看会计到家服务项</Button>
                    </FormItem>
                </Row> -->
                <!-- 订单项 -->
                <Table 
                    border
                    :columns="orderItemHeader" 
                    :data="orderItem" 
                    size="small">
                </Table>
            </Form>
            <Tabs>
                <TabPane label="任务处理" icon="clipboard">
                    <!-- 已无返回值 -->
                    <!-- <Steps style="margin-top: 3%" size="small">
                        <Step v-if="item.activityType == 'userTask'" :title="item.activityName" :content="item.assignee" :key=index v-for="(item,index) in ApproveFlow" ></Step>
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
    </div>
</template>

<script>
export default {
    props: ['payDirs'],
    data(){
        return {
            //  账期异常提示
            accoutError: false,
            //  打开弹窗
            openApproveDealWith: false,
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
            // payDirs: [],
            errMsg: "",
            //  订单项
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
                        return h("div",{
                            domProps:{
                                innerHTML: params.row.memo
                            }
                        })
                    }
                }
            ]
        }
    },
    methods:{
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

        }
    },
    created() {
        let _self = this
        // this.get_data_center()
        this.$bus.on("ORDER_APPROVE_DEALWITH", (e)=>{
            _self.check_order(e)
            _self.openApproveDealWith = true
        })
    },
}
</script>
