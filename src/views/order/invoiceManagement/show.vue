<template>
    <div>
        <Modal
            v-model="openUpdateTemplate"
            width="700"
            title="查看"
        >
            <Form 
                ref="invoiceTemplate"
                :model="invoiceTemplate"
                :label-width="120"
            >
                
                <Row>
                    <Col span="12">
                        <FormItem label="客户名称" prop="customerName">
                            <Input v-model="invoiceTemplate.customerName" placeholder="" readonly></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="单位名称" prop="enterprise_name" >
                        <Input v-model="invoiceTemplate.enterprise_name" placeholder="" ></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="发票类型" prop="invoice_type">
                            <Input v-model="invoiceTemplate.invoice_type" placeholder="" ></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="纳税人识别号" prop="tax_num">
                        <Input v-model="invoiceTemplate.tax_num" placeholder="" ></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="发票内容" prop="invoice_content">
                            <Input v-model="invoiceTemplate.invoice_content" placeholder="" ></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="开票金额" prop="tax_money">
                            <Input v-model="invoiceTemplate.tax_money" placeholder="" ></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row v-if="invoiceTemplate.invoice_type == '增值税专用发票' || invoiceTemplate.invoice_type == '专用发票'">
                    <FormItem label="注册地址" prop="register_address">
                        <Input v-model="invoiceTemplate.register_address" placeholder="" ></Input>
                    </FormItem>
                    <FormItem label="注册电话" prop="register_tel">
                        <Input v-model="invoiceTemplate.register_tel" placeholder="" ></Input>
                    </FormItem>
                    <FormItem label="开户银行" prop="bank">
                        <Input v-model="invoiceTemplate.bank" placeholder="" ></Input>
                    </FormItem>
                    <FormItem label="银行账户" prop="bank_account">
                        <Input v-model="invoiceTemplate.bank_account" placeholder="" ></Input>
                    </FormItem>
                </Row>
                <FormItem label="领取方式" prop="express_type">
                    <Input v-model="invoiceTemplate.express_type" placeholder="" ></Input>
                </FormItem>
                <Row v-if="invoiceTemplate.express_type == '快递'">
                    <FormItem label="接收人" prop="receiver">
                        <Input v-model="invoiceTemplate.receiver" placeholder="" ></Input>
                    </FormItem>
                    <FormItem label="联系方式" prop="receiver_mobile">
                        <Input v-model="invoiceTemplate.receiver_mobile" placeholder="" ></Input>
                    </FormItem>
                    <FormItem label="收件地址" prop="receiver_address">
                        <Input v-model="invoiceTemplate.receiver_address" placeholder="" ></Input>
                    </FormItem>
                </Row>
                <FormItem label="邮箱" prop="email" v-if="invoiceTemplate.express_type == '邮箱'">
                    <Input v-model="invoiceTemplate.email" placeholder="" ></Input>
                </FormItem>
                <FormItem label="备注" prop="tax_memo">
                    <Input v-model="invoiceTemplate.tax_memo" placeholder="" type="textarea" row="5"></Input>
                </FormItem>
                <FormItem label="创建时间" prop="create_date">
                    <Input v-model="invoiceTemplate.create_date" placeholder="" readonly></Input>
                </FormItem>
                <FormItem label="状态" prop="invoice_status">
                    <Select v-model="invoiceTemplate.invoice_status" placeholder="">
                        <Option v-for="item in invoiceStatus" :key="item.id" :value="item.typecode">{{item.typename}}</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="update_templ" :loading="loading">修改</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    props: ["invoiceStatus"],
    data(){
        return{
            openUpdateTemplate: false,
            loading: false,
            invoiceTemplate: {

            },
        }
    },
    methods:{
        update_templ(){
            let _self = this
            _self.loading = true
            let url = `api/customer/updateCustomerInvoice`

            let config = {
                id: _self.invoiceTemplate.id,
                invoiceStatus: _self.invoiceTemplate.invoice_status,
                taxMemo: _self.invoiceTemplate.tax_memo,
                enterpriseName: _self.invoiceTemplate.enterprise_name,
                invoiceType: _self.invoiceTemplate.invoice_type,
                taxNum: _self.invoiceTemplate.tax_num,
                invoiceContent: _self.invoiceTemplate.invoice_content,
                taxMoney: _self.invoiceTemplate.tax_money,
                registerAddress: _self.invoiceTemplate.register_address,
                register_tel: _self.invoiceTemplate.registerTel,
                bank: _self.invoiceTemplate.bank,
                bankAccount: _self.invoiceTemplate.bank_account,
                receiver: _self.invoiceTemplate.receiver,
                receiverMobile: _self.invoiceTemplate.receiver_mobile,
                receiverAddress: _self.invoiceTemplate.receiver_address,
                email: _self.invoiceTemplate.email
            }
            
            function success(res){
                _self.loading = false
                _self.openUpdateTemplate = false
                _self.$bus.emit("UPDATE_INVOICE_LIST",true)
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        }
    },
    created() {
        let _self = this
        this.$bus.off("OPEN_EDIT_INVOICE_TEMPLATE", true)
        this.$bus.on("OPEN_EDIT_INVOICE_TEMPLATE",(e)=>{
            // console.log(e)
            _self.invoiceTemplate = e
            _self.openUpdateTemplate = true
        })
    },
}
</script>

