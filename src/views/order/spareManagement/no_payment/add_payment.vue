<template>
    <div>
        <Modal
            v-model="add_pay"
            title="添加收款记录"
            width="360"
            @on-visible-change="handleReset('payment')"
        >
            <Form ref="payment" :model="payment" :rules="rulepayment" :label-width="80">
                <FormItem label="缴费方式" prop="paydir">
                    <Select transfer v-model="payment.paydir" placeholder="" @on-change="reset_money">
                        <Option v-for="item in pay_type_label" :key="item.id" :value="item.typecode">{{item.typename}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="缴费金额" prop="transcationamount" v-if="payment.paydir!=='zhye'">
                    <Input type="number" v-model="payment.transcationamount" placeholder="" ></Input>
                </FormItem>
                <Row v-if="payment.paydir=='zhye'">
                    <Col span="14">
                        <FormItem label="缴费金额" prop="money">
                            <Input type="number" v-model="payment.money" placeholder="" ></Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="剩余余额：">
                            {{formValidate.account_amount}}
                        </FormItem>
                    </Col>
                </Row>
                <FormItem prop="transcationtime" label="缴费日期">
                        <DatePicker type="date" placeholder="" v-model="payment.transcationtime"></DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('payment')">新增</Button>
                    <Button type="ghost" @click="handleReset('payment')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import Bus from '../bus'
import {DateFormat} from '../utils'
export default {
    props:["formValidate"],
    data(){
        //  两位小数的验证实现
        const Num = (rule, value, callback) =>{
            if(!/^[0-9]+(.[0-9]{1,2})?$/.test(value)) {
                callback('请输入规范的数字');
            }else{
                callback()
            };
        }
        const compare = (rule, value, callback) =>{
            if(value>this.formValidate.account_amount) {
                callback('所交余款超出余额！');
            }else{
                callback()
            };
        }
        return{
            //  订单ID
            current_orderId:'',
            //  弹出设置
            add_pay:false,
            //  支付方式下拉列表
            pay_type_label:[],
            //  表单数据
            payment:{
                transcationamount:'',
                transcationtime:'',
                paydir:'',
                money:''
            },
            // 表单验证规则
            rulepayment:{
                transcationamount: [
                        { required: true, message: '请输入付款金额', trigger: 'blur' },
                ],
                paydir: [
                        { required: true, message: '请选择付款方式', trigger: 'change' }
                ],
                money: [
                    { required: true, message: '请输入付款金额', trigger: 'blur' },
                    { validator: compare, message: '所交余款超出余额！', trigger: 'blur' }
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
        //  初始化
        reset_money(){
            this.payment.money=""
            this.payment.transcationamount=""
        },
        init(){
            this.GetLabelList()
            this.$bus.on('add_pay', (e) => {
            // Bus.$on('add_pay', (e) => {
                this.add_pay = true
                // console.log(e)
                this.current_orderId = e
                // console.log('1')
                // console.log(this.current_orderId)
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
                        'balanceid':_that.current_orderId,
                        'paydir':_that.payment.paydir,
                        'transcationtime':DateFormat(_that.payment.transcationtime),
                        'transcationamount':_that.payment.transcationamount?_that.payment.transcationamount:0,
                        'accountBalance':_that.payment.money?_that.payment.money:0
                    }
                    console.log(params)
                    this.$http.post(url, params).then(function(res){
                        if(res.data.msgCode==40000){
                            _that.$Message.success('添加成功');
                            _that.add_pay = false
                            _that.$bus.emit('update',true)
                            // Bus.$emit('update',true)
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
        }
    },
}
</script>
