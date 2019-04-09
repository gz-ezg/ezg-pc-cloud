<template>
    <div>
        <Modal
            title="编辑订单"
            v-model="openEditOrderDetail"
            width="100"
            @on-visible-change="modal_status_change"
        >
		<Row>
			<Col span="8">
				<Form ref="orderDetail" :model="orderDetail" :label-width="100" :rules="orderDetailRule">
				    <Row :gutter="16">
				        <Col span="10">
				        <FormItem label="归属公司" prop="CompanyName">
				            <Input size="small" v-model="orderDetail.CompanyName" @on-focus="open_company" readonly/>
				        </FormItem>
				        </Col>
				        <Col span="10">
				        <FormItem label="归属客户" prop="name">
				            <Input size="small" v-model="orderDetail.name" @on-focus="open_company" readonly/>
				        </FormItem>
				        </Col>
				       
				    </Row>
				    <Row :gutter="16">
						 <Col span="10">
						<FormItem label="缴费时间"  prop="payTime">
						    <DatePicker size="small" type="date" style="width: 100%" v-model="orderDetail.payTime"></DatePicker>
						</FormItem>
						</Col>
				        
				        
				        <Col span="10">
				        <FormItem label="缴费渠道" prop="paydir">
				            <Select transfer v-model="orderDetail.paydir" style="width:100%" size="small">
				                <Option v-for="(item, index) in payDirs" :key=index :value="item.typecode">{{item.typename}}</Option>                            
				            </Select>
				        </FormItem>
				        </Col>
				    </Row>
					
				    <Row :gutter="16">
						<Col span="10">
						<FormItem label="订单总价" prop="paynumber">
						    <Input size="small" v-model="orderDetail.paynumber" number readonly/>
						</FormItem>
						</Col>
				        <Col span="10">
				            <FormItem label="已付款" prop="realnumber">
				                <Input size="small" v-model="orderDetail.realnumber" number />
				            </FormItem>
				        </Col>
				    </Row>
					
					<Row :gutter="16">
						<Col span="10">
						    <FormItem label="是否提供发票" prop="isornotkp">
						        <Select transfer v-model="orderDetail.isornotkp" size="small" style="width:100%" >
						            <Option value="Y">是</Option>
						            <Option value="N">否</Option>
						        </Select>
						    </FormItem>
						</Col>
						<Col span="10">
						    <FormItem label="国地税报道" prop="gdsreport">
						        <Select transfer v-model="orderDetail.gdsreport" size="small" >
						            <Option value="ybd">已报道</Option>
						            <Option value="wbd">未报道</Option>
						            <Option value="bybd">不用报道</Option>
						        </Select>
						    </FormItem>
						</Col>
					</Row>
					
					<Row :gutter="16">
						<Col span="24">
						    <FormItem label="异常工单号">
						        <div style="display:inline-block">
						            <Input size="small" v-model="orderCode" @on-focus="open_abOrder" readonly style="width:60%"/>
						            <Button type="info" size="small" @click="open_abOrder">选择</Button>
						        </div>
						    </FormItem>
						</Col>
					</Row>
					
				    <Row :gutter="16">
				        <Col span="24">
				            <FormItem label="使用余额" prop="usebalance">
				                <div style="display:inline-block">
				                    <Input size="small" v-model="orderDetail.usebalance" style="width:40%" number />
				                    <Button type="info" size="small" @click="get_balance('create', orderDetail.customerid)" :disabled="checkBalance">查询</Button>
				                    <span style="line-height:24px;height:24px;display:inline-block;margin-left:10px">可用余额：</span><span style="line-height:24px;height:24px;display:inline-block">{{allUseBalance}}</span>
				                </div>
				            </FormItem>
				        </Col>
				    </Row>
					
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
				        <Col span="10">
				            <FormItem label="新增产品" >
				                <Button type="primary" icon="plus" @click="open_product_list">新增</Button>
				                <!-- <Button type="primary" icon="plus" @click="removeRows()">删除</Button> -->
				                <Button type="primary" icon="plus" @click="open_service_item" v-if="showAccountHomeItem">查看会计到家服务项</Button>
				            </FormItem>
				        </Col>
				    </Row>
				</Form>
			</Col>
			<Col span="16">
				<h3 style="margin-bottom: 10px;">
					产品详情
				</h3>
				
				<product-detail-list v-if="openEditOrderDetail" :productList="orderItem" :isDisabled="isDisabled"></product-detail-list>
			</Col>
		</Row>
            <Row>
                <!-- <Table
                    id="orderItem"
                    style="margin-top:10px"
                    ref="selection"
                    highlight-row
                    border
                    size="small"
                    :columns="orderItemHeader"
                    :data="orderItem"></Table> -->
            </Row>
            <div slot="footer">
                <Button type="primary" @click="edit" name="order_edit" :loading="loading">编辑</Button>
                <Button type="ghost" @click="openEditOrderDetail = false">关闭</Button>
            </div>
        </Modal>
        <service-item @close="close_item" v-if="openServiceItem" :id="orderDetail.companyid"></service-item>
        <ab-order-change @aborder-change="setting_aborder" :id="orderDetail.companyid"></ab-order-change>
    </div>
</template>

<script>
import abOrderChange from '../abOrderChange'
import serviceItem from '../accountHomeTree'
import commonSetting from './comonSetting.js'
import { DateFormat } from '../../../../../libs/utils.js'
import * as orderApi from '../../api'
import productDetailList from './productDetailList'

export default {
    mixins: [commonSetting],
    components: {
        serviceItem,
        abOrderChange,
		productDetailList
    },
    data(){
        return {
			isDisabled:false,
            applyId: "",
            orderId: "",
            unusualCode: "",
            openEditOrderDetail: false,
            loading: false,
            openServiceItem: false
        }
    },
    methods:{
        //关联异常工单
        relate(){
            let _self = this 
            let url = `api/order/unusual/workorder/linkUnusualWorkOrder`
            let config = {
                applyId: _self.applyId,
                orderId: _self.orderId
            }
            function success(res){
                console.log(res)
            }
            function fail(){

            }
            _self.$Post(url,config,success,fail)
            _self.orderId = ''
            _self.applyId = ''
            _self.orderCode = ''
        },
        //打开对应的异常工单列表
        open_abOrder(){
            this.$bus.emit("CHANGE_ABORDER", true)
        },
        //  选择对应异常工单后回调
        setting_aborder(e){
            this.applyId = e.id
            // this.orderCode = e.unusual_code
            this.unusualCode = e.unusual_code
        },
        //获取异常工单号
        get_ab_worker_id(){
            let _self = this
            let url = `api/order/unusual/workorder/findUnusualWorkOrderByOrderId`
            let config ={
                params:{
                    orderId: this.orderId
                }
            }
            function success(res){
                console.log(res.data.data)
                _self.unusualCode = ""
                if(res.data.data){
                    _self.unusualCode = res.data.data.unusual_code
					_self.applyId = res.data.data.id
                }
            }
            this.$Get(url,config,success)
        },
        open_service_item(){
            this.openServiceItem = true
        },
        close_item(){
            this.openServiceItem = false
        },
        edit(){
            let _self = this
            _self.$ButtonCollect("order_edit")
            _self.loading = true
            this.$refs["orderDetail"].validate(async (valid) => {
                if(valid){
                    // let url = `api/order/update`
                    // console.log(_self.orderDetail.payTime)
                    let config = {
                        id: _self.orderDetail.id,
                        payDir: _self.orderDetail.paydir,
                        payTime: DateFormat(_self.orderDetail.payTime),
                        GDSreport: _self.orderDetail.gdsreport,
                        companyId: _self.orderDetail.companyid,
                        isornotkp: _self.orderDetail.isornotkp,
                        orderPayNumber: _self.orderDetail.realnumber,
                        orderitems: JSON.stringify(_self.orderItem),
                        usebalance: _self.orderDetail.usebalance,
                        serviceStartDate: ""
                    }

                    console.log(config)

                    // function success(res){
                    //     setTimeout(()=>{
                    //         _self.loading = false
                    //         _self.openEditOrderDetail = false
                    //         _self.$bus.emit("UPDATE_ORDER_LIST", true)
                    //     }, 500)
                    //     // _self.$refs["orderDetail"].resetFields()
                    //     // _self.orderItem = []
                    // }
                    try {
                        let {status, data} = await orderApi.orderUpdate(config)
                        if(status){
                            _self.relate()
                            setTimeout(()=>{
                                _self.loading = false
                                _self.openEditOrderDetail = false
                                _self.$bus.emit("UPDATE_ORDER_LIST", true)
                            }, 500)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                    // _self.loading = false
                    // function fail(err){
                    //     _self.loading = true
                    // }

                    // _self.$Post(url, config, success, fail)
                }else{
                    // _self.loading = false
                }
                _self.loading = false
            })
        },
        open_product_list(){
            if(this.orderDetail.companyid){
                this.$bus.emit("OPEN_ORDER_PRODUCT_LIST", this.orderDetail.companyid)
            }else{
                this.$Message.warning("请先选择公司！")
            }
        },
    },
    created(){
        let _self = this
        this.$bus.off("OPEN_ORDERLIST_EDIT", true)
        this.$bus.on("OPEN_ORDERLIST_EDIT", (e) => {
            this.checkBalance = false
            this.get_data(e)
            this.orderId = e
            this.get_ab_worker_id()
            this.openEditOrderDetail = true
        })
// 		this.$bus.on("SET_ORDER_DETAIL",(e)=>{
// 			_self.orderItem = e
// 			console.log("_self.orderItem")
// 			console.log(_self.orderItem)
// 		})
// 		this.$bus.on("SET_PAYNUMBER",(e)=>{
// 			_self.orderDetail.paynumber = e.paynumber
// 			_self.orderDetail.realnumber = e.realnumber
// 		})
    }
}
</script>

<style>
#orderItem .ivu-input{
    border: 0px solid #dddee1
}
#orderItem .ivu-select-selection{
    border: 0px solid #dddee1
}
</style>
