<template>
    <div>
        <Modal
            v-model="edit_pay"
            title="修改"
            width="340"
        >
            <Form ref="editment" :model="editment" :rules="ruleeditment" :label-width="80">
                <FormItem label="缴费金额" prop="transcationamount" >
                    <Input v-model="editment.transcationamount" placeholder="" style="width:200px" ></Input>
                </FormItem>
                <FormItem label="缴费方式" prop="paydir">
                    <Select transfer v-model="editment.paydir" placeholder="" style="width:200px">
                        <Option v-for="item in pay_type_label" :key="item.typecode" :value="item.typecode">{{item.typename}}</Option>
                        <!-- <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen"  select="selected">Sydney</Option> -->
                    </Select>
                </FormItem>
                <FormItem prop="transcationtime" label="缴费日期">
                        <DatePicker type="date" placeholder="" v-model="editment.transcationtime" style="width:200px"></DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('editment')" :loading="edit_loading">修改</Button>
                    <Button type="ghost" @click="edit_pay=false" style="margin-left: 8px">取消</Button>
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
    data(){
        //  两位小数的验证实现
        const Num = (rule, value, callback) =>{
            if(!/^[0-9]+(.[0-9]{1,2})?$/.test(value)) {
                callback('请输入带两位小数的整数');
            }else{
                callback()
            };
        }
        return{
            // transcationamount:'',
            //  订单ID
            edit_loading:false,
            current_orderRow:'',
            current_orderId:'',
            //  弹出设置
            edit_pay:false,
            //  支付方式下拉列表
            pay_type_label:[],
            //  表单数据
            editment:{
                transcationamount:'',
                transcationtime:'',
                paydir:''
            },
            // 表单验证规则
            ruleeditment:{
                // transcationamount: [
                //         { required: true, message: '请输入付款金额', trigger: 'blur' },
                //         { validator: Num, trigger: 'blur' }
                // ],
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
        //  初始化
        init(){
            this.GetLabelList()
            this.$bus.on('edit_pay', (e) => {
            // Bus.$on('edit_pay', (e) => {
                console.log(e)
                this.edit_pay = true
                this.current_orderId = e.id
                this.current_orderRow = e
                this.editment.transcationamount = e.transcationamount
                this.editment.transcationtime = e.transcationtime
                this.editment.paydir = e.paydircode
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
        // handleSubmit (name) {
        //     var _that = this
        //     console.log(_that.current_orderId)
        //     console.log(DateFormat(_that.editment.transcationtime))
        //     this.$refs[name].validate((valid) => {
        //         if (valid) {
        //             var url = 'api/order/balance/item/update'
        //             const params = {
        //                 'itemId':_that.current_orderId,
        //                 'paydir':_that.editment.paydir,
        //                 'transcationtime':DateFormat(_that.editment.transcationtime)
        //             }
        //             console.log(params)
        //             this.$http.post(url, params).then(function(res){
        //                 if(res.data.msgCode==40000){
        //                     _that.$Message.success('修改成功');
        //                     _that.edit_pay = false
        //                     Bus.$emit('update',true)
        //                 }else{
        //                     _that.$Message.error('修改失败，请重新添加!')
        //                 }
        //             })     
        //         } else {
        //         }
        //     })
        // },
        handleSubmit (name) {
            var _self = this
            console.log(_self.current_orderId)
            console.log(DateFormat(_self.editment.transcationtime))
            this.$refs[name].validate((valid) => {
                if (valid) {
                    var url = 'api/order/balance/updateOaBalanceItem'
                    _self.edit_loading = true
                    let params = {
                        id:_self.current_orderId,
                        transcationamount:_self.editment.transcationamount,
                        transcationtime:DateFormat(_self.editment.transcationtime),
                        itemmemo:"",
                        memo:""
                    }
                    console.log(params)

                    // this.$http.post(url, params).then(function(res){
                    //     if(res.data.msgCode==40000){
                    //         _self.$Message.success('修改成功');
                    //         _self.edit_pay = false
                    //         Bus.$emit('update',true)
                    //     }else{
                    //         _self.$Message.error('修改失败，请重新添加!')
                    //     }
                    // })
                    
                    function success(res){
                        _self.$Message.success('修改成功');
                        _self.edit_pay = false
                        // Bus.$emit('update',true)
                        _self.$bus.emit('update',true)
                        _self.edit_loading = false
                    }

                    function fail(err){
                        _self.edit_loading = false
                    }

                    _self.$Post(url, params, success, fail)
                    
                } else {
                }
            })
        },
        //  表单清空-弹出框关闭即清空
        // handleReset (name) {
        //     // this.$refs[name].resetFields();
        // }
    },
}
</script>
