<template>
    <Modal
            title="开票管理"
            v-model="openInvoiceMission"
            width="800"
            :mask-closable="false"
            class-name="vertical-top-modal"
    >
        <Card style="border-radius: 0px">
            <Form ref="newMission" :model="data" :label-width="100" style="margin-left:50px;margin-right:50px">
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="公司名称">
                            <Input type="textarea" v-model="companyName" :autosize="true" readonly></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Card>
        <div v-for="item in arr">
        <Card style="border-radius: 0px;border-top: none">
            <Form ref="newMission" :model="item" :label-width="100" style="margin-left:50px;margin-right:50px">
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="发票类型">
                            <Input  v-model="item.invoice_type"  readonly size="small"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="发票位数">
                            <Input  v-model="item.digits"  readonly size="small"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="本月最大可领量">
                            <Input  v-model="item.maximum_available"  readonly size="small"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="本月已领用">
                            <Input  v-model="item.hava_receive"   size="small"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="本月已使用">
                            <Input  v-model="item.hava_used" readonly size="small"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="剩余发票数量">
                            <Input  v-model="item.remaining_amount"  size="small"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Card>
        </div>
        <div style="color: #ff0033;font-size: 10px;font-weight: bold;margin-top: 15px;margin-right: 100px">温馨提示：开票前请与客户再三确认开票内容，包括：发票抬头、税号、产品名称、数量、金额</div>
        <Form ref="newMission"  :label-width="100" style="margin:35px 50px 20px 50px">
            <Row :gutter="12">
                <Col span="24">
                    <Button type="primary" @click="add">新增发票</Button>
                    <Button type="primary" style="margin-left: 15px" @click="open">开票</Button>
                    <Button type="primary" style="margin-left: 15px" @click="detail">历史开票流水</Button>
                </Col>
            </Row>
        </Form>
        <div slot="footer">
            <Button @click="update_invoice" type="primary" :loading="loading">修改</Button>
            <Button @click="cancel_task" type="ghost">取消</Button>
        </div>
        <add :type="type" :digits="digits"></add>
        <detail :type_map="type_map" :digits_map="digits_map"></detail>
    </Modal>
</template>

<script>
    import * as accountApi from '../api'
    import Add from './add'
    import Detail from './detail'
    export default {
        name: "index",
        components:{
            Add,
            Detail
        },
        data(){
            return{
                loading:false,
                openInvoiceMission:false,
                companyId:"",
                companyName:"",
                digits:[],
                type:[],
                digits_map:new Map(),
                type_map:new Map(),
                data:{companyName:"厉害了我的哥"},
                arr:[{companyName:"vnez"},{companyName:"vnez"},{companyName:"vnez"}]
            }
        },
        methods:{
            add(){
                this.$bus.emit("ADD_INVOICE",this.companyId,this.companyName)
            },
            open(){
                this.$bus.emit("OPEN_INVOICE",this.companyId,this.companyName)
            },
            detail(){
                this.$bus.emit("DETAIL_INVOICE",this.companyId,this.companyName)
            },
            update_invoice(){
                let _self = this;
                _self.loading = true;
                let url = `api/order/cycle/service/dljz/updateCompanyInvoice`;
                let config = {
                    rows:JSON.stringify(_self.arr.map(v=>{
                        return{
                            "id":v.id,
                            "havaReceive":v.hava_receive,
                            "remainingAmount":v.remaining_amount
                        }
                    }))
                }
                function success(res){
                    _self.get_data()
                    _self.openInvoiceMission = false
                    _self.loading = false;
                }

                function fail(err){
                    _self.openInvoiceMission = false
                }
                this.$Post(url, config, success, fail)
            },
            cancel_task(){
                this.openInvoiceMission = false
            },
            get_data(){
                let _self = this;
                let url = `api/order/cycle/service/dljz/companyInvoiceListThisMonth`;
                let config = {
                    params: {
                        companyId:_self.companyId
                    }
                }
                function success(res){
                    _self.arr = res.data.data
                    _self.arr = res.data.data.map(item => {
                        item.invoice_type = _self.type_map.get(item.invoice_type);
                        item.digits = _self.digits_map.get(item.digits);
                        if (item.hava_receive==null){
                            item.hava_receive = 0
                        }
                        if (item.maximum_available==null){
                            item.maximum_available = 0
                        }
                        return item;
                    });
                }

                function fail(err){

                }
                this.$Get(url, config, success, fail)
            },
            async get_data_center() {
                let params = 'invoice_digits,invoice_type';
                try {
                    let { invoice_digits, invoice_type } = await accountApi.getDictionary(params);
                    this.digits = invoice_digits;
                    this.digits_map = this.$array2map(this.digits);
                    this.type = invoice_type;
                    this.type_map = this.$array2map(this.type);
                } catch (error) {
                    console.log(error);
                }
                // console.log(this.managestatus_map)
            },
        },
        created() {
            this.$bus.on("OPEN_INVOICE_PAGE",(e)=>{
                this.openInvoiceMission = true
                this.companyId = e.company_id
                if (e.companyname) {
                    this.companyName = e.companyname
                }
                if (e.CompanyName) {
                    this.companyName = e.CompanyName
                }
                this.get_data_center()
                this.get_data()
            })
            this.$bus.on("UPDATE_INVOICE_PAGE",(e)=>{
                this.get_data()
            })
        }
    }
</script>

<style>

</style>