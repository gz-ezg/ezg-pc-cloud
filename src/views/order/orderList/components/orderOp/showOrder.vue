<template>
    <div>
        <Modal
            v-model="openShowOrderDetail"
            title="查看订单"
            :mask-closable="false"                
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
						    <DatePicker size="small" type="date" style="width: 100%" v-model="orderDetail.payTime"  readonly></DatePicker>
						</FormItem>
						</Col>
				        
				        
				        <Col span="10">
				        <FormItem label="缴费渠道" prop="paydir">

                            <Input size="small"   v-model="orderDetail.paydirText" readonly/>
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
				                <Input size="small" v-model="orderDetail.realnumber" number  readonly />
				            </FormItem>
				        </Col>
				    </Row>
					
					<Row :gutter="16">
						<Col span="10">
						    <FormItem label="是否提供发票" prop="isornotkp">
                                <Input size="small" v-model="orderDetail.isornotkpText"   readonly />

						    </FormItem>
						</Col>
						<Col span="10">
						    <FormItem label="国地税报道" prop="gdsreport">
                                <Input size="small" v-model="orderDetail.gdsreportText"   readonly />
						    </FormItem>
						</Col>
					</Row>
					
					<Row :gutter="16">
						<Col span="24">
						    <FormItem label="异常工单号">
						        <div style="display:inline-block">
						            <Input size="small" v-model="unusualCode" readonly style="width:60%"/>
						            <Button type="info" size="small" @click="open_relateOrder">查看</Button>
						        </div>
						    </FormItem>
						</Col>
					</Row>
					
				    <Row :gutter="16">
				        <Col span="24">
				            <FormItem label="使用余额" prop="usebalance">
				                <div style="display:inline-block">
				                    <Input size="small" v-model="orderDetail.usebalance" style="width:40%" number />
				                    <!--<Button type="info" size="small" @click="get_balance('create', orderDetail.customerid)" :disabled="checkBalance">查询</Button>-->
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
					
				    <!--<Row :gutter="16">
				        <Col span="10">
				            <FormItem label="新增产品" >
				               &lt;!&ndash; <Button type="primary" icon="plus" @click="open_product_list">新增</Button>&ndash;&gt;
				                &lt;!&ndash; <Button type="primary" icon="plus" @click="removeRows()">删除</Button> &ndash;&gt;
				                <Button type="primary" icon="plus" @click="open_service_item" v-if="showAccountHomeItem">查看会计到家服务项</Button>
				            </FormItem>
				        </Col>
				    </Row>-->
				
					<Row :gutter="16">

                    <div v-for="item of orderDetail.departJson">
                        <Row>
                            <Col span="8">
                            <FormItem label="部门:">
                                {{item.departName}}
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="人员:">
                                {{item.realname}}
                            </FormItem>
                            </Col>
                        </Row>
                    </div>

                </Row>
				</Form>
			</Col>
			<Col span="16">
				<h3 style="margin-bottom: 10px;">
					产品详情
				</h3>
				
				 <product-detail-list v-if="openShowOrderDetail" :productList="orderItem" :pageFlag="pageFlag" :isDisabled="isDisabled" :orderDetail="orderDetail"></product-detail-list>
			</Col>
        </Row>    
			<div slot="footer">
                <Button @click="openShowOrderDetail = false">关闭</Button>
            </div>
        </Modal>
        <service-item @close="close_item" v-if="openServiceItem" :id="orderDetail.companyid" :readonly="false"></service-item>
        <relate-order :id="orderId" :pageFlag="pageFlag"></relate-order>
    </div>
</template>


<script>
import relateOrder from '../relateOrder'
import serviceItem from '../accountHomeTree'
import commonSetting from './comonSetting.js'
import * as orderApi from '../../api'
import productDetailList from './productDetailList'
import {simpleCodeToText} from '../../../../../libs/utils.js'

export default {
    mixins: [commonSetting],
    inject:['simpleCodeToText'],
    components: {
        serviceItem,
        relateOrder,
		productDetailList
    },
    watch:{
        orderDetail(val){
            console.log(val);
            this.orderDetail.paydirText =  this.pSimpleCodeToText(this.orderDetail.paydir,this.payDirs);
            if(this.orderDetail.isornotkp == 'Y'){
                this.orderDetail.isornotkpText = '是'
            }else{
                this.orderDetail.isornotkpText = '否'
            }
            if(this.orderDetail.gdsreport == 'ybd'){
                this.orderDetail.gdsreportText = "已报道"
            }else if(this.orderDetail.gdsreport == 'wbd'){
                this.orderDetail.gdsreportText = "未报道"
            }else if(this.orderDetail.gdsreport == 'bybd'){
                this.orderDetail.gdsreportText = "不用报道"
            }else{
                this.orderDetail.gdsreportText = "未选择"
            }
        }
    },
    data(){
        return {
            pageFlag:"showOrder",
			isDisabled:true,
            unusualCode: "",
            orderId: "",
            openServiceItem: false,
            openShowOrderDetail: false,
            }

    },
    methods: {
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
                }
            }
            this.$Get(url,config,success)
        },
        pSimpleCodeToText(code,textList){
            return simpleCodeToText(code,textList)
        },
        //打开对应的异常工单
        open_relateOrder(){
            this.$bus.emit("RELATE_ABORDER_"+this.pageFlag,true)
        },
        open_service_item(){
            this.openServiceItem = true
        },
        close_item(){
            this.openServiceItem = false
        },
        async cancel_order(orderId, orderItemId){
            let config = {
                itemId: orderItemId
            }

            try {
                let { status, data} = await orderApi.orderItemRefund(config)
                // if( status ){
                this.get_data(orderId)
                this.$bus.emit("UPDATE_ORDER_LIST")
                // }
            } catch (error) {
                console.log(error)
            }
        },
        row_class_name(row){
            if(row.deleteflag == 5){
                return 'demo-table-refund-row'
            }
        }
    },
    created() {
        let _self = this

        this.$bus.off("OPEN_ORDERLIST_DETAIL", true)
        this.$bus.on("OPEN_ORDERLIST_DETAIL", (e)=>{
            this.checkBalance = false
            this.get_data(e)
            console.log(this.orderDetail);
            this.orderId = e
            this.openShowOrderDetail = true
            this.get_ab_worker_id()
        })

        this.$bus.on("CANCEL_ORDER", (e)=>{
                console.log(e);
            _self.cancel_order(e.id,e.itemid);
        })

    },
}
</script>

<style>
#show-order-item textarea.ivu-input{
    border: 0px;
    overflow-y: hidden;
    background-color: rgba(0, 0, 0, 0);
}

.demo-table-refund-row{
    color: red
}
</style>
