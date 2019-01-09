<template>
    <div>
        <Modal
            title="新建订单"
            v-model="openCreateOrderDetail"
            width="100"
            :mask-closable="false"
            @on-visible-change="modal_status_change"
        >
            <Form ref="orderDetail" :model="orderDetail" :label-width="100" :rules="orderDetailRule">
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="归属公司" prop="CompanyName">
                        <Input size="small" v-model="orderDetail.CompanyName" @on-focus="open_company" readonly/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="归属客户" prop="name">
                        <Input size="small" v-model="orderDetail.name" @on-focus="open_company" readonly/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="缴费时间"  prop="payTime">
                        <DatePicker size="small" type="date" style="width: 100%" v-model="orderDetail.payTime"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                    <FormItem label="订单总价" prop="paynumber">
                        <Input size="small" v-model="orderDetail.paynumber" number readonly/>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="国地税报道" prop="gdsreport">
                        <Select transfer v-model="orderDetail.gdsreport" size="small" >
                            <Option value="ybd">已报道</Option>
                            <Option value="wbd">未报道</Option>
                            <Option value="bybd">不用报道</Option>
                        </Select>
                    </FormItem>
                    
                    </Col>
                    <Col span="8">
                    <FormItem label="缴费渠道" prop="paydir">
                        <Select transfer v-model="orderDetail.paydir" style="width:100%" size="small">
                            <Option v-for="(item, index) in payDirs" :key=index :value="item.typecode">{{item.typename}}</Option>                            
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="实付金额" prop="realnumber">
                            <Input size="small" v-model="orderDetail.realnumber" number />
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="是否提供发票" prop="isornotkp">
                            <Select transfer v-model="orderDetail.isornotkp" size="small" style="width:100%" >
                                <Option value="Y">是</Option>
                                <Option value="N">否</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="使用余额" prop="usebalance">
                            <div style="display:inline-block">
                                <Input size="small" v-model="orderDetail.usebalance" style="width:120px" number />
                                <Button type="info" size="small" @click="get_balance('create', this.customerid)">查询余额</Button>
                            </div>
                        </FormItem>
                    </Col>
                </Row>
                <!-- <Row :gutter="16">
                    <Col span="8" v-if="orderDetail.isornotkp=='Y'">
                        <FormItem>
                            <Button @click="open_isornotkp('create')" type="info" size="small">开票信息</Button>
                        </FormItem>
                    </Col>
                    <Col span="8" v-if="orderDetail.isornotkp=='Y'">
                        <FormItem>
                            <Button @click="open_isornotkp('create')" type="info" size="small">开票信息</Button>
                        </FormItem>
                    </Col>
                </Row> -->
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem style="margin-bottom:10px">
                            <!-- class="upload_before" -->
                            <div slot="label">合同</div>
                            <Upload
                                    ref="upload"
                                    multiple
                                    :before-upload="handleUpload"
                                    action=""
                                    >
                                <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
                            </Upload>
                            <span v-for="(item,index) in show_file" :key=index>{{ item.name }}
                                <Button type="text" @click="fileRemove(index)">移除</Button>
                            </span>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem label="选择产品" >
                            <Button type="primary" icon="plus" @click="open_product_list">新增</Button>
                            <!-- <Button type="primary" icon="plus" @click="removeRows()">删除</Button> -->
                            <Button type="primary" icon="plus" @click="open_service_item" v-if="showAccountHomeItem">查看会计到家服务项</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <Row v-if="orderItem.length">
                <Table
                    id="orderItem"
                    style="margin-top:10px"
                    ref="selection"
                    highlight-row
                    border
                    size="small"
                    :columns="orderItemHeader"
                    :data="orderItem"></Table>
            </Row>
            <div slot="footer">
                <Button type="primary" @click="create" :loading="loading">创建</Button>
                <Button type="ghost" @click="openCreateOrderDetail = false">关闭</Button>
            </div>
        </Modal>
        <company-select @company-change="setting_company"></company-select>
        <service-item @close="close_item" v-if="openServiceItem" :id="orderDetail.companyid"></service-item>
    </div>
    </div>
</template>

<script>
import serviceItem from '../accountHomeTree'
import commonSetting from './comonSetting.js'
import companySelect from '../companySelect'
import { DateFormat } from '../../../../../libs/utils.js'

export default {
    mixins: [commonSetting],
    components: {
        companySelect,
        serviceItem
    },
    data(){
        return {
            openServiceItem: false,
            show_file: [],
            openCreateOrderDetail: false,
            loading: false
        }
    },
    methods: {
        //  打开会计到家服务项
        open_service_item(){
            if(this.orderDetail.companyid){
                this.openServiceItem = true
            }
        },
        //  打开公司选择
        open_company(){
            this.$bus.emit("ORDER_OPEN_SELECT_COMPANY", true)
        },
        //  选择公司后回调
        setting_company(e){
            console.log(e)
            this.orderDetail.CompanyName = e.companyname
            this.orderDetail.name = e.customerName
            this.orderDetail.tel = e.customerTel
            this.orderDetail.gdsreport = e.gdsreport
            this.orderDetail.companyid = e.id
        },
        //  ======== 合同文件上传start ========
        handleUpload(file) {
            this.show_file.push(file)
            return false;
        },
        fileRemove(e) {
            // this.file.splice(e, 1);
            this.show_file.splice(e, 1);
        },
        upload_img(e){
            let _self = this
            let formdata = new FormData()
                
            let url = `api/order/contract/upload`
            formdata.append("orderId", e)
            for(let i = 0; i < _self.show_file.length; i++){
                formdata.append("files", _self.show_file[i])
            }
                
            function success(res){
                _self.show_file = []
            }

            function fail(err){

            }
                
            this.$Post(url, formdata, success, fail)
        },
        //  ======== 合同文件上传end ========
        //  ======== 打开产品列表 ========
        open_product_list(){
            if(this.orderDetail.companyid){
                this.$bus.emit("OPEN_ORDER_PRODUCT_LIST", this.orderDetail.companyid)
            }else{
                this.$Message.warning("请先选择公司！")
            }
        },
        create(){
            // this.check_date()
            let _self = this
            this.loading = true
            this.$refs["orderDetail"].validate((valid) => {
                if(valid && this.check_date()){
                    _self.create_order()
                }else{
                    this.loading = false
                }
            })
        },
        create_order(){
            let _self = this
            let url = `api/order/create`

            let config = {
                companyId: _self.orderDetail.companyid,
                payDir: _self.orderDetail.paydir,
                orderPayNumber: _self.orderDetail.realnumber,
                serviceStartDate: "",
                GDSreport: _self.orderDetail.gdsreport,
                payTime: DateFormat(_self.orderDetail.payTime),
                isornotkp: _self.orderDetail.isornotkp,
                usebalance: _self.orderDetail.usebalance,
                orderitems: JSON.stringify(_self.orderItem)
            }

            function success(res){
                if(_self.show_file.length != 0){
                    _self.upload_img(res.data.data)
                }else{
                    _self.$Message.warning("订单创建成功！请及时上传合同！")
                }
                setTimeout(()=>{
                    _self.loading = false
                    _self.$bus.emit("UPDATE_ORDER_LIST", true)
                    _self.openCreateOrderDetail = false
                }, 200)
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        },
        close_item(){
            this.openServiceItem = false
        }
    },
    created(){
        this.$bus.off("OPEN_ORDERLIST_ADD", true)
        this.$bus.on("OPEN_ORDERLIST_ADD", (e) => {
            this.orderItem = []
            this.openCreateOrderDetail = true
        })
    }
}
</script>
