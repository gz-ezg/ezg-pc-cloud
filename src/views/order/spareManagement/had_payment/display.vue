<template>
    <div>
        <Modal
            v-model="display"
            title="查看"
            :width="900"
        >
            <Form ref="hadformValidate" :model="hadformValidate" :label-width="90">
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="归属公司" prop="companyName">
                            <Input size="small" v-model="hadformValidate.companyName" disabled/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="归属客户" prop="customerName">
                            <Input size="small" v-model="hadformValidate.customerName" disabled/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="余款总额" prop="totalamount">
                            <Input size="small" v-model="hadformValidate.totalamount" disabled/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="已补金额" prop="paynumber">
                            <Input size="small" v-model="hadformValidate.paynumber" disabled/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="未补金额" prop="unpaidamount">
                            <Input size="small" v-model="hadformValidate.unpaidamount" disabled/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="待审批金额" prop="approvalpendingamount">
                            <Input size="small" v-model="hadformValidate.approvalpendingamount" disabled/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Collapse v-model="show">
                        <Panel name="1">
                            补交明细
                            <div slot="content">
                                <Row style="margin-top: 10px;">
                                    <Table border :columns="header" :data="balanceItem"></Table>
                                </Row>
                            </div>
                        </Panel>
                    </Collapse>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="close_displayment">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Bus from '../bus'

export default {
    data(){
        return{
            show:'1',
            display:false,
            balanceId:'',
            // 上方表格的模型
            hadformValidate:{
                companyName:'',
                customerName:'',
                totalamount:'',
                paynumber:'',
                unpaidamount:'',
                approvalpendingamount:''
            },
            balanceItem:[],
            // 缴费明细的表头
            header: [
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
                    },
                ]
        }
    },
    methods:{
        init(){
            var _that = this
            this.$bus.on('select_had_pay',(e)=>{
            // Bus.$on('select_had_pay',(e)=>{
                this.show = "1"
                this.display = true
                this.balanceId = e
                this.GetBalanceIdDate()
            })
        },
        GetBalanceIdDate(){
            var _that = this
            var url = 'api/order/balance/detail?balanceId='+_that.balanceId
            this.$http.get(url).then(function(res){
                var temp_data = res.data.data
                _that.hadformValidate = temp_data.balance[0]
                _that.balanceItem = temp_data.balanceItem
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
        close_displayment(){
            this.display = false
        }
    },
    created:function(){
        this.init()   
    }
}
</script>

