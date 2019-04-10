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
				
				<!-- <product-detail-list v-if="openShowOrderDetail" :productList="orderItem" :isDisabled="isDisabled"></product-detail-list> -->
			</Col>
        </Row>    
			<div slot="footer">
                <Button @click="openShowOrderDetail = false">关闭</Button>
            </div>
        </Modal>
        <service-item @close="close_item" v-if="openServiceItem" :id="orderDetail.companyid" :readonly="false"></service-item>
        <relate-order :id="orderId"></relate-order>
    </div>
</template>


<script>
import relateOrder from '../relateOrder'
import serviceItem from '../accountHomeTree'
import commonSetting from './comonSetting.js'
import * as orderApi from '../../api'
// import productDetailList from './productDetailList'

export default {
    mixins: [commonSetting],
    components: {
        serviceItem,
        relateOrder,
		// productDetailList
    },
    data(){
        return {
			isDisabled:true,
            unusualCode: "",
            orderId: "",
            openServiceItem: false,
            openShowOrderDetail: false,
            orderDetailListHeaderShow: [
                {
                    title: "序号",
                    type: 'index',
                    minWidth: 80,
                    align: 'center'
                },
                {
                    title: "产品名",
                    key: "product",
                    minWidth: 150,
                },
                {
                    title: "产品属性",
                    key: "propertys",
                    minWidth: 250,
                    render: (h, params) => {
                        return h("div",{
                            domProps:{
                                innerHTML: params.row.propertys
                            }
                        })
                    }
                },
                {
                    title: "产品价格",
                    key: "oaprice",
                    minWidth: 100,
                },
                {
                    title: "产品数量（个/月）",
                    key: "productnumber",
                    minWidth: 150,
                },
                {
                    title: "销售价格",
                    key: "paynumber",
                    minWidth: 100,
                },
                {
                    title: "赠送数量",
                    key: "givethenumber",
                    minWidth: 100,
                },
                {
                    title: "服务开始税期",
                    key: "servicestartdate",
                    minWidth: 120
                },
                {
                    title: "服务部门",
                    key: "departname",
                    minWidth: 140
                },
                {
                    title: "单价/月",
                    key: "unitprice",
                    minWidth: 90
                },
                {
                    title: "备注",
                    key: "memo",
                    minWidth: 300,
                    render: (h, params) => {
                        // return h("div",{
                        //     domProps:{
                        //         innerHTML: "<div>"+params.row.memo+"</div>"
                        //     }
                        // })
                        let reg = new RegExp("</br>", "g")
                        let temp = params.row.memo.replace(reg ,"\n")
                        //  先转换为textarea能够处理的格式，上传时可能需要处理空格转换为换行符
                        return h('div',[
                            h('Input',{
                                props:{
                                    value: temp,
                                    autosize: true,
                                    type: "textarea",
                                    size: "small",
                                    readonly: true
                                },
                                style: {
                                    width: "100%"
                                }
                            })
                        ])
                    }
                }
            ],
            dangerOperation:{
                title: "退款",
                minWidth: 80,
                align: 'center',
                render: (h, params) => {
                    return h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        style: {
                            'marginLeft': '5px'
                        }
                    },[
                        h('Poptip', {
                            props: {
                                transfer: true,
                                confirm: true,
                                title: '您确定要退款此订单项吗！',
                            },
                            on: {
                                'on-ok': ()=>{
                                    // console.log(params.row.itemid)
                                    if(params.row.deleteflag != 5){
                                        this.cancel_order(this.orderId, params.row.itemid)
                                    }else{
                                        this.$message.warning("对不起！该订单项已经退款！请确认之后操作!")
                                    }
                                    
                                },
                            }
                        }, '退款')
                    ])
                }
            },
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
        //打开对应的异常工单
        open_relateOrder(){
            this.$bus.emit("RELATE_ABORDER",true)
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
        if(localStorage.getItem('id')==10059 || localStorage.getItem("id") == 10182){
            this.orderDetailListHeaderShow.unshift(this.dangerOperation)
        }
        this.$bus.off("OPEN_ORDERLIST_DETAIL", true)
        this.$bus.on("OPEN_ORDERLIST_DETAIL", (e)=>{
            this.checkBalance = false
            this.get_data(e)
            this.orderId = e
            this.openShowOrderDetail = true
            this.get_ab_worker_id()
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
