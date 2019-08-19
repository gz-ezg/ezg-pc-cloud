<template>
    <Modal
            v-model="openDetail"
            :title="title"
            width="450"
            :mask-closable="false"
            class-name="vertical-top-modal"
    >
            <Row>
                <Form ref="detail" :model="detail" :label-width="100" :rules="detailRule">
                    <Row>
                        <Col span="12">
                            <FormItem label="地区：" prop="area">
                                <Select v-model="detail.area" size="small" type="text" transfer :disabled="readonly">
                                    <Option v-for="(item,index) in gzbusinessarea" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label="地址属性：" prop="addr_property">
                                <Radio-group v-model="detail.addr_property">
                                    <Radio v-for="(item,index) in addr_property" :key="index" :label="item.typecode" :disabled="readonly" style="margin-left: 20px">
                                        <span>{{item.typename}}</span>
                                    </Radio>
                                </Radio-group>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label="开票类型：" prop="invoice_type">
                                <Radio-group v-model="detail.invoice_type">
                                    <Radio v-for="(item,index) in kp_type" :key="index" :label="item.typecode" style="margin-left: 20px" :disabled="readonly">
                                        <span>{{item.typename}}</span>
                                    </Radio>
                                </Radio-group>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label="可开：" prop="can_invoice">
                                <Radio-group v-model="detail.can_invoice">
                                    <Radio v-for="(item,index) in sf_yn" :key="index" :label="item.typecode" style="margin-left: 20px" :disabled="readonly">
                                        <span>{{item.typename}}</span>
                                    </Radio>
                                </Radio-group>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label="可查：" prop="can_check">
                                <Radio-group v-model="detail.can_check">
                                    <Radio v-for="(item,index) in sf_yn" :key="index" :label="item.typecode" style="margin-left: 20px" :disabled="readonly">
                                        <span>{{item.typename}}</span>
                                    </Radio>
                                </Radio-group>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label="工商情况：" prop="tax_status">
                                <Radio-group v-model="detail.tax_status">
                                    <Radio v-for="(item,index) in business_tax_status" :key="index" :label="item.typecode" style="margin-left: 20px" :disabled="readonly">
                                        <span>{{item.typename}}</span>
                                    </Radio>
                                </Radio-group>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label="税务情况：" prop="business_status">
                                <Radio-group v-model="detail.business_status">
                                    <Radio v-for="(item,index) in business_tax_status" :key="index" :label="item.typecode" style="margin-left: 20px" :disabled="readonly">
                                        <span>{{item.typename}}</span>
                                    </Radio>
                                </Radio-group>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="价格：" prop="price">
                                <Input v-model="detail.price" size="small" type="number" :readonly="readonly"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label="地址：" prop="place">
                                <Input v-model="detail.place" size="small" :readonly="readonly"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label="备注：" prop="memo">
                                <Input v-model="detail.memo" :readonly="readonly"  type="textarea" :autosize="{minRows: 3,maxRows: 7}" placeholder="请输入......"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Row>
        <div slot="footer">
            <Button type="primary" @click="save('detail')" :loading="loading" v-if="showSave">提交</Button>
            <Button type="primary" @click="edit('detail')" :loading="loading" v-if="showEdit">修改</Button>
            <Button @click="openDetail = false">关闭</Button>
        </div>
    </Modal>
</template>

<script>
    import {deepCopy} from "../../../../libs/utils";

    export default {
        name: "detail",
        props:["gzbusinessarea","addr_property","kp_type","business_tax_status","sf_yn"],
        data(){
            return{
                title:"",
                loading:false,
                openDetail:false,
                readonly:false,
                showSave:false,
                showEdit:false,
                detail:{
                    area:"",
                    addr_property:"",
                    invoice_type :"",
                    can_invoice:"",
                    can_check :"",
                    tax_status :"",
                    business_status:"" ,
                    price:"",
                    place:"",
                    memo:"",
                },
                detailRule: {
                    price: [
                        { required: true, message: '请输入金额！', trigger: 'blur' },
                    ],
                    place: [
                        {  required: true, message: '请输入地址！', trigger: 'blur' }
                    ]
                },

            }
        },
        methods:{
            save(name){
                let _self = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                            _self.create()
                    }else {
                        this.$Message.error('请正确填写选项!');
                    }
                })
            },
            edit(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                            this.modify()
                    }else {
                        this.$Message.error('请正确填写选项!');
                    }
                })
            },
            create(){
                let _self = this
                _self.loading = true;
                let url = `api/system/addrPrice/create`;
                let config = {
                    area: _self.detail.area,
                    place:_self.detail.place,
                    price:_self.detail.price,
                    invoiceType:_self.detail.invoice_type,
                    addrProperty:_self.detail.addr_property,
                    canInvoice:_self.detail.can_invoice,
                    canCheck:_self.detail.can_check,
                    taxStatus:_self.detail.tax_status,
                    businessStatus:_self.detail.business_status,
                    memo:_self.detail.memo
                }
                function success(res){
                    _self.$bus.emit("UPDATE_MANAGER_INFO",true)
                    _self.clear()
                    _self.openDetail = false
                    _self.loading = false
                }

                function fail(err){

                }
                this.$Post(url, config, success, fail)
            },
            modify(){
                let _self = this;
                _self.loading = true;
                let url = `api/system/addrPrice/update`;
                let config = {
                    id:_self.detail.id,
                    area: _self.detail.area,
                    place:_self.detail.place,
                    price:_self.detail.price,
                    invoiceType:_self.detail.invoice_type,
                    addrProperty:_self.detail.addr_property,
                    canInvoice:_self.detail.can_invoice,
                    canCheck:_self.detail.can_check,
                    taxStatus:_self.detail.tax_status,
                    businessStatus:_self.detail.business_status,
                    memo:_self.detail.memo
                }
                function success(res){
                    _self.$bus.emit("UPDATE_MANAGER_INFO",true)
                    _self.clear()
                    _self.openDetail = false
                    _self.loading = false
                }

                function fail(err){

                }
                this.$Post(url, config, success, fail)
            },
            clear(){
                this.detail={
                    area:"",
                    addr_property:"",
                    invoice_type :"",
                    can_invoice:"",
                    can_check :"",
                    tax_status :"",
                    business_status:"" ,
                    price:"",
                    place:"",
                    memo:"",
                }
            }
        },
        created() {
            this.$bus.off("ADD_MANAGER_INFO",true)
            this.$bus.on("ADD_MANAGER_INFO",e=>{
                this.openDetail = true
                this.showSave = true
                this.showEdit = false
                this.title = "新增"
                this.readonly = false
                this.detail = {
                    area:"tianhe",
                    place:"",
                    addr_property:"business_change",
                    invoice_type :"xgm_addr",
                    can_invoice:"N",
                    can_check :"N",
                    tax_status :"normal",
                    business_status:"normal" ,
                    price:"",
                    memo:"",
                }
            })
            this.$bus.off("SHOW_MANAGER_INFO",true)
            this.$bus.on("SHOW_MANAGER_INFO",e=>{
                this.detail = deepCopy(e)
                console.log(this.detail)
                this.detail.price = this.detail.price.toString()
                this.showSave = false
                this.showEdit = false
                this.openDetail = true
                this.title = "查看"
                this.readonly = true
                this.detailRule={}
                this.detailRule={
                    price: [
                        { required: true, message: '请输入金额！', trigger: 'blur' },
                    ],
                    place: [
                        {  required: true, message: '请输入地址！', trigger: 'blur' }
                    ]
                }
            })
            this.$bus.off("EDIT_MANAGER_INFO",true)
            this.$bus.on("EDIT_MANAGER_INFO",e=>{
                this.detail = deepCopy(e)
                this.detail.price = this.detail.price.toString()
                this.openDetail = true
                this.showSave = false
                this.showEdit = true
                this.title = "修改"
                this.readonly = false
                this.detailRule={}
                this.detailRule={
                    price: [
                        { required: true, message: '请输入金额！', trigger: 'blur' },
                    ],
                    place: [
                        {  required: true, message: '请输入地址！', trigger: 'blur' }
                    ]
                }
            })
        }
    }
</script>

<style>
    .vertical-top-modal .ivu-modal{
        top: 0;
    }
</style>