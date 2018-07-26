<template>
    <Row>
        <Modal
            v-model="add_pay"
            title="添加收款记录"
            width="900"
            @on-visible-change="handleReset('payment')"
        >
        <Form ref="formValidate" :model="formValidate" :label-width="90">
                <Row :gutter="16" style="height:60px">
                    <Col span="8" >
                        <FormItem label="归属公司:" prop="companyName">
                            <Input size="small" v-model="formValidate.companyName" disabled/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="归属客户:" prop="customerName">
                            <Input size="small" v-model="formValidate.customerName" disabled/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="余款总额:" prop="totalamount">
                            <Input size="small" v-model="formValidate.totalamount" disabled/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" style="height:60px">
                    <Col span="8">
                        <FormItem label="已补金额:" prop="paynumber">
                            <Input size="small" v-model="formValidate.paynumber" disabled/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="未补金额:" prop="unpaidamount">
                            <Input size="small" v-model="formValidate.unpaidamount" disabled/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="待审批金额:" prop="approvalpendingamount">
                            <Input size="small" v-model="formValidate.approvalpendingamount" disabled/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
                    <Collapse>
                        <Panel name="1">
                            补交明细
                            <div slot="content">
                                <Row>
                                    <Button type="primary" icon="edit" @click="bujiao = true">补交费用</Button>
                                </Row>
                                <Row style="margin-top: 10px;">
                                    <Table border :columns="header" :data="balanceItem" highlight-row></Table>
                                </Row>
                            </div>
                        </Panel>
                    </Collapse>
            <div slot="footer"></div>
        </Modal>
        <Modal
            v-model="bujiao"
            title="添加收款记录"
            width="900"
        >
            <Form ref="payment" :model="payment" :rules="rulepayment" :label-width="80" style="margin-left:280px;margin-bottom:30px">
                <FormItem label="缴费金额" prop="transcationamount" style="margin-bottom:30px">
                    <Input v-model="payment.transcationamount" placeholder="" style="width:200px"></Input>
                </FormItem>
                <FormItem label="缴费方式" prop="paydir" style="margin-bottom:30px">
                    <Select transfer v-model="payment.paydir" placeholder="" style="width:200px">
                        <Option v-for="item in pay_type_label" :key="item.id" :value="item.typecode">{{item.typename}}</Option>
                                                <!-- <Option value="beijing">New York</Option>
                                                <Option value="shanghai">London</Option>
                                                <Option value="shenzhen">Sydney</Option> -->
                    </Select>
                </FormItem>
                <FormItem prop="transcationtime" label="缴费日期" style="margin-bottom:30px">
                    <DatePicker type="date" placeholder="" v-model="payment.transcationtime" style="width:200px"></DatePicker>
                </FormItem>
                <FormItem style="margin-bottom:30px">
                    <Button type="primary" @click="handleSubmit('payment')">新增</Button>
                    <Button type="ghost" @click="handleReset('payment')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
            <div  slot="footer"></div>
        </Modal>
    </Row>
</template>

<script>
import Bus from '../../../components/bus'
import {DateFormat} from './utils'
export default {
    data(){
        //  两位小数的验证实现
        const Num = (rule, value, callback) =>{
            if(!/^[0-9]+(.[0-9]{1,2})?$/.test(value)) {
                callback('请输入规范的数字');
            }else{
                callback()
            };
        }
        return{
            balanceItem:[],
            header:[
                    {
                        title:'序号',
                        type:'index',
                        align:'center',
                        width:60
                    },
                    {
                        title: '补交金额',
                        key: 'transcationamount',
                    },
                    {
                        title: '当前状态',
                        key: 'processtype',
                    },
                    {
                        title: '缴费渠道',
                        key: 'paydir',
                    },
                    {
                        title: '缴费时间',
                        key: 'transcationtime',
                    },
                    {
                        title: '财务确认时间',
                        key: 'confirmtime',
                    },
                    {
                        title: '确认收款人',
                        key: 'userName',
                    }
            ],
            //补交记录弹出框
            bujiao:false,
            //  订单ID
            current_orderId:'',
            //  弹出设置
            add_pay:false,
            //  支付方式下拉列表
            pay_type_label:[],
            //  表单数据
            formValidate:{
                companyName:'',
                customerName:'',
                totalamount:'',
                paynumber:'',
                unpaidamount:'',
                approvalpendingamount:'',
                id:''
            },
            payment:{
                transcationamount:'',
                transcationtime:'',
                paydir:''
            },
            // 表单验证规则
            rulepayment:{
                transcationamount: [
                        { required: true, message: '请输入付款金额', trigger: 'blur' },
                        { validator: Num, trigger: 'blur' }
                ],
                paydir: [
                        { required: true, message: '请选择付款方式', trigger: 'change' }
                ],
                transcationtime: [
                        { required: true, type: 'date', message: '请输入日期', trigger: 'change' }
                ]
            }
        }
    },
    created:function(){
        this.init()
    },
    methods:{
        GetBalanceIdDate(){
            var _that = this
            var url = 'api/order/queryBalanceItem?orderId='+_that.current_orderId
            this.$http.get(url).then(function(res){
                _that.formValidate = res.data.data.balance[0]
                _that.balanceItem = res.data.data.balanceItem
                _that.balanceItem = _that.balanceItem.reverse()
                for(let i = 0; i<_that.balanceItem.length; i++){
                    if(_that.balanceItem[i].transcationtime != null){
                        _that.balanceItem[i].transcationtime = _that.balanceItem[i].transcationtime.slice(0,10)
                    }
                    if(_that.balanceItem[i].confirmtime != null){
                        _that.balanceItem[i].confirmtime = _that.balanceItem[i].confirmtime.slice(0,10)
                    }
                }
            })
        },
        //  初始化
        init(){
            this.GetLabelList()
            Bus.$on('add_money', (e) => {
                this.add_pay = true
                this.current_orderId = e.id
                this.GetBalanceIdDate()
            })     
        },
        //  获取缴费方式列表
        GetLabelList(){
            var _that = this
            // var url = 'api/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=payDirs'
            // this.$http.get(url).then(function(res){
            //     _that.pay_type_label = res.data.data.payDirs
            // })

            let params = "payDirs"

            function finish(res){
                _that.pay_type_label = res.data.data.payDirs
            }

            this.$GetDataCenter(params, finish)
        },
        //  表单提交验证
        handleSubmit (name) {
            var _that = this
            this.$refs[name].validate((valid) => {
                if (valid) {
                    var url = 'api/order/balance/item/create'
                    const params = {
                        'balanceid':_that.formValidate.id,
                        'paydir':_that.payment.paydir,
                        'transcationtime':DateFormat(_that.payment.transcationtime),
                        'transcationamount':_that.payment.transcationamount
                    }
                    this.$http.post(url, params).then(function(res){
                        if(res.data.msgCode==40000){
                            _that.$Message.success('添加成功'); 
                            // console.log('1111111111')
                            
                            _that.bujiao = false
                            _that.GetBalanceIdDate()
                            Bus.$emit('update',true)
                        }else{
                            _that.$Message.error('添加失败，请重新添加')
                        }
                    })     
                } else {
                }
            })
        },
        //  表单清空-弹出框关闭即清空
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        // GetBalanceIdDate(){
        //     var _that = this
        //     var url = 'api/order/queryBalanceItem?orderId='+_that.current_orderId
        //     this.$http.get(url).then(function(res){
        //         console.log(res)
        //         var temp_data = res.data.data
        //         _that.formValidate = res.data.data.balance[0]
        //         console.log(_that.formValidate.id)
        //     })
        // },
    },
}
</script>
