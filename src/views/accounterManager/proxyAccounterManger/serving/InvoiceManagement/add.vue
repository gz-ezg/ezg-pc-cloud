<template>
    <Modal
            :title="title"
            v-model="openAddMission"
            width="400"
            :mask-closable="false"
            :transfer="false"
    >
        <Card>
            <Form ref="newMission" :model="data" :label-width="100" style="margin-left:10px;margin-right:50px">
                <Row :gutter="12">
                    <Col span="24">
                        <FormItem label="公司名称">
                            <span>{{companyName}}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="24">
                        <FormItem label="发票类型">
                            <Select v-model="invoiceType" type="text" transfer>
                                <Option v-for="(item,index) in type" :key="index" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="24">
                        <FormItem label="发票位数">
                            <Select v-model="invoiceDigits" type="text" transfer @on-change="showNum">
                                <Option v-for="(item,index) in digits" :key="index" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12" v-if="flag==false">
                    <Col span="24">
                        <FormItem label="本次收到发票量">
                            <Input type="number" v-model="amount" @on-change="showNum"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12" v-if="flag==true">
                    <Col span="24">
                        <FormItem label="本次开具发票">
                            <Input v-model="amount" @on-change="showNum"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12" v-if="flag==false">
                    <Col span="24">
                        <FormItem label="最大可开金额">
                            <Input v-model="maxMoney" readonly></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="24">
                        <RadioGroup v-model="isSend">
                            <Radio label="Y">
                                <span>通知客户</span>
                            </Radio>
                            <Radio label="N" style="margin-left: 100px">
                                <span>不通知客户</span>
                            </Radio>
                        </RadioGroup>
                    </Col>
                </Row>
            </Form>
        </Card>
        <div slot="footer">
            <Button @click="add_invoice"  type="primary" :loading="loading">保存</Button>
            <Button @click="cancel_task" type="ghost">取消</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        name: "add",
        props:["digits","type"],
        data(){
            return{
                openAddMission:false,
                loading:false,
                flag:false,
                title:"",
                companyName:"",
                companyId:"",
                isSend:'Y',
                amount:"",
                maxMoney:0,
                invoiceDigits:"thousand",
                invoiceType: "OrdinaryInvoice"
            }
        },
        methods:{
            empty(){
                this.amount = ""
                this.invoiceDigits = "thousand"
                this.invoiceType = "OrdinaryInvoice"
                this.maxMoney = 0
            },
            showNum(){
                if (this.invoiceDigits=='thousand') {
                    this.maxMoney = (this.amount*999.99).toFixed(2)
                }
                if (this.invoiceDigits=='tenThousand') {
                    this.maxMoney = (this.amount*9999.99).toFixed(2)
                }
                if (this.invoiceDigits=='oneHundredThousand') {
                    this.maxMoney = (this.amount*99999.99).toFixed(2)
                }
                if (this.invoiceDigits=='million') {
                    this.maxMoney = (this.amount*999999.99).toFixed(2)
                }
                if (this.invoiceDigits=='tenMillion') {
                    this.maxMoney = (this.amount*9999999.99).toFixed(2)
                }
            },
            cancel_task(){
                this.openAddMission = false
            },
            add_invoice() {
                let _self = this;
                if (_self.amount == "" || _self.amount ==null){
                    _self.$Message.warning("请完善上述内容再进行保存")
                    return
                }
                if (_self.flag) {
                    _self.loading = true;
                    let url = `api/order/cycle/service/dljz/createCompanyInvoice`;
                    let config = {
                        companyId: _self.companyId,
                        invoiceType: _self.invoiceType,
                        invoiceDigits: _self.invoiceDigits,
                        amount: _self.amount,
                        isSend: _self.isSend,
                        type: "kp"
                    }

                    function success(res) {
                        _self.$bus.emit("UPDATE_INVOICE_PAGE", true)
                        _self.empty()
                        _self.openAddMission = false
                        _self.loading = false;
                    }

                    function fail(err) {

                    }

                    this.$Post(url, config, success, fail)
                }else {
                    let _self = this;
                    _self.loading = true;
                    let url = `api/order/cycle/service/dljz/createCompanyInvoice`;
                    let config = {
                        companyId: _self.companyId,
                        invoiceType: _self.invoiceType,
                        invoiceDigits: _self.invoiceDigits,
                        amount: _self.amount,
                        isSend: _self.isSend,
                        type: "xz"
                    }

                    function success(res) {
                        _self.$bus.emit("UPDATE_INVOICE_PAGE", true)
                        _self.empty()
                        _self.openAddMission = false
                        _self.loading = false;
                    }

                    function fail(err) {

                    }

                    this.$Post(url, config, success, fail)
                }
            }
        },
        created() {
            this.$bus.on("ADD_INVOICE",(i,n)=>{
                this.openAddMission = true
                this.companyName = n
                this.companyId = i
                this.flag = false
                this.title = "新增发票（客户提供空白发票）"
            })
            this.$bus.on("OPEN_INVOICE",(i,n)=>{
                this.openAddMission = true
                this.companyName = n
                this.companyId = i
                this.flag = true
                this.title = "开票"
            })
        }
    }
</script>

<style>

</style>