<template>
    <div>
        <Modal
            title="修改订单"
            v-model="openamendOrderDetail"
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
				
				<!-- <product-detail-list v-if="openamendOrderDetail" :productList="orderItem" :isDisabled="isDisabled"></product-detail-list> -->
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
                    :row-class-name="row_class_name"
                    :data="orderItem"></Table> -->
            </Row>
            <div slot="footer">
                <Button type="primary" @click="xiugai" :loading="loading">修改</Button>
                <Button type="ghost" @click="openamendOrderDetail = false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import commonSetting from './comonSetting.js'
import { DateFormat } from '../../../../../libs/utils.js'
import * as orderApi from '../../api.js'
// import productDetailList from './productDetailList'
export default {
    mixins: [commonSetting],
    data(){
        return {
			isDisabled:false,
            openamendOrderDetail: false,
            loading: false
        }
    },
	components:{
		// productDetailList
	},
    methods:{
        xiugai(){
            let _self = this
            _self.loading = true
            this.$refs["orderDetail"].validate(async (valid) => {
                if(valid){
                    // let url = `api/order/finishedUpdate`
                    let config = {
                        id: _self.orderDetail.id,
                        paydir: _self.orderDetail.paydir,
                        paytime: DateFormat(_self.orderDetail.payTime),
                        realnumber: _self.orderDetail.realnumber,
                        usebalance: _self.orderDetail.usebalance,
                        items: JSON.stringify(_self.orderItem)
                    }

                    console.log(config)

                    try {
                        let {status, data} = await orderApi.orderFinishUpdate(config)
                        if(status){
                            _self.$refs["orderDetail"].resetFields()
                            _self.orderItem = []
                            _self.$bus.emit("UPDATE_ORDER_LIST", true)
                            _self.openamendOrderDetail = false
                        }
                        // console.log("1234")
                        } catch (error) {
                            console.log(error)
                        }
                    _self.loading = false
                    // _self.loading = false
                }else{
                    // _self.loading = false
                }
                _self.loading = false
            })
        }
    },
    created(){
        let _self = this
        this.orderItemHeader.shift()
        this.$bus.off("OPEN_ORDERLIST_AMEND", true)
        this.$bus.on("OPEN_ORDERLIST_AMEND", (e) => {
            this.checkBalance = false
            this.get_data(e)
            this.openamendOrderDetail = true
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
.demo-table-refund-row{
    color: red
}
</style>
