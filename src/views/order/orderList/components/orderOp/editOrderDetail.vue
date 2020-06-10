<template>
  <div>
    <Modal title="编辑订单" v-model="openEditOrderDetail" width="100" @on-visible-change="modal_status_change">
      <Row>
        <Col span="10">
          <Form ref="orderDetail" :model="orderDetail" :label-width="100" :rules="orderDetailRule">
            <Row :gutter="16">
              <Col span="12">
                <FormItem label="归属公司" prop="CompanyName">
                  <Input size="small" v-model="orderDetail.CompanyName" @on-focus="open_company" readonly />
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="归属客户" prop="name">
                  <Input size="small" v-model="orderDetail.name" @on-focus="open_company" readonly />
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="16">
              <Col span="12">
                <FormItem label="缴费时间" prop="payTime">
                  <DatePicker size="small" type="date" style="width: 100%" v-model="orderDetail.payTime"></DatePicker>
                </FormItem>
              </Col>

              <Col span="11">
                <FormItem label="缴费渠道" prop="paydir">
                  <Select transfer v-model="orderDetail.paydir" style="width:100%" size="small">
                    <Option v-for="(item, index) in payDirs" :key="index" :value="item.typecode">{{ item.typename }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>

            <Row :gutter="16">
              <Col span="12">
                <FormItem label="订单总价" prop="paynumber">
                  <Input size="small" v-model="orderDetail.paynumber" number readonly />
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="已付款" prop="realnumber">
                  <Input size="small" v-model="orderDetail.realnumber" number />
                </FormItem>
              </Col>
            </Row>

            <Row :gutter="16">
              <Col span="12">
                <FormItem label="是否提供发票" prop="isornotkp">
                  <Select transfer v-model="orderDetail.isornotkp" size="small" style="width:100%">
                    <Option value="Y">是</Option>
                    <Option value="N">否</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="国地税报道" prop="gdsreport">
                  <Select transfer v-model="orderDetail.gdsreport" size="small">
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
                    <Input size="small" v-model="unusualCode" readonly style="width:60%" />
                    <Button type="info" size="small" v-if="unusualCode.trim() == ''" @click="open_abOrder">选择</Button>
                    <Button type="info" size="small" v-if="unusualCode.trim() != ''" @click="open_relateOrder">查看</Button>
                  </div>
                </FormItem>
              </Col>
            </Row>

            <Row :gutter="16">
              <Col span="24">
                <FormItem label="使用余额" prop="usebalance">
                  <div style="display:inline-block">
                    <Input size="small" v-model="orderDetail.usebalance" style="width:40%" number />
                    <Button
                      type="info"
                      size="small"
                      @click="get_balance('create', orderDetail.customerid)"
                      :disabled="checkBalance"
                      >查询</Button
                    >
                    <span style="line-height:24px;height:24px;display:inline-block;margin-left:10px">可用余额：</span>
                    <span style="line-height:24px;height:24px;display:inline-block">{{ allUseBalance }}</span>
                  </div>
                </FormItem>
              </Col>
            </Row>
            <!--
				    <Row :gutter="16">
				        <Col span="24">
				            <FormItem style="margin-bottom:10px">
				                &lt;!&ndash; class="upload_before" &ndash;&gt;
				                <div slot="label">合同</div>
				                <Upload
				                        ref="upload"
				                        multiple
				                        :before-upload="handleUpload"
				                        action=""
				                        >
				                    <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
				                </Upload>
				                <span v-for="(item,index.vue) in show_file" :key=index.vue>{{ item.name }}
				                    <Button type="text" @click="fileRemove(index.vue)">移除</Button>
				                </span>
				            </FormItem>
				        </Col>
            </Row>-->

            <Row :gutter="16">
              <Col span="10">
                <FormItem label="新增产品">
                  <Button type="primary" icon="plus" @click="open_product_list">新增</Button>
                  <!-- <Button type="primary" icon="plus" @click="removeRows()">删除</Button> -->
                  <Button type="primary" icon="plus" @click="open_service_item" v-if="showAccountHomeItem"
                    >查看会计到家服务项</Button
                  >
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="16">
              <div v-for="(depart, index) of departServerObj">
                <Col span="8">
                  <FormItem label="服务部门:">{{ depart.departName }}</FormItem>
                </Col>
                <Col span="15">
                  <FormItem label="服务人员:">
                    <Select v-model="depart.serverId">
                      <Option v-for="item of depart.serverList" :key="item.userId" :value="item.userId">{{
                        item.realname + '【' + item.flag + '】'
                      }}</Option>
                    </Select>
                  </FormItem>
                </Col>
              </div>
            </Row>
          </Form>
        </Col>
        <Col span="14">
          <h3 style="margin-bottom: 10px;">产品详情</h3>

          <product-detail-list
            v-if="openEditOrderDetail"
            :productList="orderItem"
            :isDisabled="isDisabled"
            :pageFlag="pageFlag"
            :createdate="orderDetail.createdate"
            :id="orderDetail.companyid"
          ></product-detail-list>
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
        :data="orderItem"></Table>-->
      </Row>
      <div slot="footer">
        <Button type="primary" @click="edit" name="order_edit" :loading="loading">编辑</Button>
        <Button type="ghost" @click="openEditOrderDetail = false">关闭</Button>
      </div>
    </Modal>
    <service-item @close="close_item" v-if="openServiceItem" :id="orderDetail.companyid"></service-item>
    <ab-order-change @aborder-change="setting_aborder" :id="orderDetail.companyid"></ab-order-change>
    <relate-order :id="orderId" :pageFlag="pageFlag"></relate-order>
  </div>
</template>

<script>
import relateOrder from '../relateOrder';
import abOrderChange from '../abOrderChange';
import serviceItem from '../accountHomeTree';
import commonSetting from './comonSetting.js';
import { DateFormat } from '../../../../../libs/utils.js';
import * as orderApi from '../../api';
import productDetailList from './productDetailList';
import { constants } from 'crypto';

export default {
  mixins: [commonSetting],
  components: {
    serviceItem,
    abOrderChange,
    productDetailList,
    relateOrder
  },

  data() {
    return {
      isDisabled: false,
      applyId: '',
      orderId: '',
      unusualCode: '',
      openEditOrderDetail: false,
      loading: false,
      openServiceItem: false,
      pageFlag: 'editOrder',
      departServerObj: [],
      departChangeCountFlag: 0
    };
  },
  methods: {
    //关联异常工单
    relate() {
      let _self = this;
      let url = `api/order/unusual/workorder/linkUnusualWorkOrder`;
      let config = {
        applyId: _self.applyId,
        orderId: _self.orderId
      };
      function success(res) {
        console.log(res);
      }
      function fail() {}
      _self.$Post(url, config, success, fail);
      _self.orderId = '';
      _self.applyId = '';
      _self.orderCode = '';
    },
    //打开对应的异常工单列表
    open_abOrder() {
      this.$bus.emit('CHANGE_ABORDER', true);
    },
    open_relateOrder() {
      this.$bus.emit('RELATE_ABORDER_' + this.pageFlag);
    },
    //  选择对应异常工单后回调
    setting_aborder(e) {
      this.applyId = e.id;
      // this.orderCode = e.unusual_code
      this.unusualCode = e.unusual_code;
    },
    //获取异常工单号
    get_ab_worker_id() {
      let _self = this;
      let url = `api/order/unusual/workorder/findUnusualWorkOrderByOrderId`;
      let config = {
        params: {
          orderId: this.orderId
        }
      };
      function success(res) {
        console.log(res.data.data);
        _self.unusualCode = '';
        if (res.data.data) {
          if (res.data.data.unusual_code) {
            _self.unusualCode = res.data.data.unusual_code;
          }
          if (res.data.data.id) {
            _self.applyId = res.data.data.id;
          }
        }
      }
      this.$Get(url, config, success);
    },
    open_service_item() {
      this.openServiceItem = true;
    },
    close_item() {
      this.openServiceItem = false;
      this.departServerObj = [];
    },
    edit() {
      // this.open_product_list();
      let _self = this;
      _self.$ButtonCollect('order_edit');
      _self.loading = true;
      this.$refs['orderDetail'].validate(async valid => {
        if (valid) {
          // let url = `api/order/update`
          // console.log(_self.orderDetail.payTime)
          let departParamObj = [];
          console.log('_self', _self);
          // for (let j = 0; j < _self.departServerObj.length; j++) {
          //   departParamObj.push({
          //     departId: _self.departServerObj[j].departId,
          //     serverId: _self.departServerObj[j].serverId
          //   });
          // }

          for (let j = 0; j < _self.orderItem.length; j++) {
            departParamObj.push({
              departId: _self.orderItem[j].departid,
              serverId: (_self.orderItem[j].selectServer && _self.orderItem[j].selectServer.userId) || ''
            });
          }
          let order = JSON.parse(JSON.stringify(_self.orderItem));
          for (let i = 0; i < order.length; i++) {
            order[i].servicedeparts = '';
            // order[i].servicestartdate = DateFormat(order[i].servicestartdate);
            order[i].serverId = (order[i].selectServer && order[i].selectServer.userId) || '';
            order[i].realname = (order[i].selectServer && order[i].selectServer.realname) || '';

            if (order[i].servicestartdate) {
							order[i].servicestartdate = DateFormat(order[i].servicestartdate);
						}

            if (order[i].declare_year) {
              order[i].declare_year = new Date(order[i].declare_year).getFullYear();
            }

            if (order[i].serviceyear) {
              order[i].serviceyear = new Date(order[i].serviceyear).getFullYear();
            }
          }
          let config = {
            id: _self.orderDetail.id,
            payDir: _self.orderDetail.paydir,
            payTime: DateFormat(_self.orderDetail.payTime),
            GDSreport: _self.orderDetail.gdsreport,
            companyId: _self.orderDetail.companyid,
            isornotkp: _self.orderDetail.isornotkp,
            orderPayNumber: _self.orderDetail.realnumber,
            orderitems: JSON.stringify(order),
            usebalance: _self.orderDetail.usebalance,
            serviceStartDate: ''
          };
          try {
            let { status, data } = await orderApi.orderUpdate(config);
            if (status) {
              if (_self.applyId) {
                _self.relate();
              }
              setTimeout(() => {
                _self.loading = false;
                _self.openEditOrderDetail = false;
                _self.$bus.emit('UPDATE_ORDER_LIST', true);
                this.departServerObj = [];
              }, 500);
            }
          } catch (error) {
            console.log(error);
          }
          // _self.loading = false
          // function fail(err){
          //     _self.loading = true
          // }

          // _self.$Post(url, config, success, fail)
        } else {
          // _self.loading = false
        }
        _self.loading = false;
      });
      //   this.$bus.emit("OPEN_ORDER_PRODUCT_LIST", this.orderDetail.companyid);
    },
    open_product_list() {
      if (this.orderDetail.companyid) {
        this.$bus.emit('OPEN_ORDER_PRODUCT_LIST', this.orderDetail.companyid, this.orderItem);
      } else {
        this.$Message.warning('请先选择公司！');
      }
    }
  },

  created() {
    let _self = this;
    this.$bus.on('SET_PAYNUMBER', e => {
      _self.orderDetail.paynumber = e.paynumber;
      _self.orderDetail.realnumber = e.realnumber;
    });
    this.$bus.off('OPEN_ORDERLIST_EDIT', true);
    this.$bus.on('OPEN_ORDERLIST_EDIT', e => {
      this.checkBalance = false;
      this.get_data(e, callback);
      this.orderId = e;
      this.get_ab_worker_id();
      this.openEditOrderDetail = true;
      function callback() {
        console.log('callback');
        _self.$bus.emit('PRODUCT_LIST_EDIT', _self);
        _self.departServerObj = _self.orderDetail.departJson;
      }
    });
    this.$bus.off('DEPART_CHANGE_' + this.pageFlag, true);
    this.$bus.on('DEPART_CHANGE_' + this.pageFlag, e => {
      _self.departChangeCountFlag += 1;
      let countFlag = _self.departChangeCountFlag;
      let newRows = [];
      let idObj = e;
      for (let departId in idObj) {
        let row = idObj[departId];
        for (let i = 0; i < _self.departServerObj.length; i++) {
          if (_self.departServerObj[i].departId == row.departId) {
            row.oldProductSkuId = _self.departServerObj[i].productSkuId;
            row.serverId = _self.departServerObj[i].serverId;
            row.serverList = _self.departServerObj[i].serverList;
          }
        }
        newRows.push(row);
      }

      // for (let j = 0; j < newRows.length; j++) {
      //   if (newRows[j].productSkuId != newRows[j].oldProductSkuId) {
      //     //表示需要重置服务人员

      //     let url = `api/product/server/list`;

      //     let config = {
      //       params: {
      //         productSkuId: newRows[j].productSkuId,
      //         serviceDepartId: newRows[j].departId,
      //         companyId: _self.orderDetail.companyid
      //       }
      //     };

      //     var oAjax = new XMLHttpRequest();

      //     oAjax.open(
      //       "GET",
      //       url +
      //         "?" +
      //         "productSkuId=" +
      //         newRows[j].productSkuId +
      //         "&serviceDepartId=" +
      //         newRows[j].departId +
      //         "&companyId=" +
      //         _self.orderDetail.companyid,
      //       false
      //     ); //false表示同步请求

      //     oAjax.onreadystatechange = function() {
      //       //6,通过状态确认完成
      //       if (oAjax.readyState == 4 && oAjax.status == 200) {
      //         //7,获取返回值，解析json格式字符串为对象
      //         var data = JSON.parse(oAjax.responseText);
      //         if (data.msgCode == 40000) {
      //           if (data.data.length == 0) {
      //             newRows[j].serverId = "";
      //           } else {
      //             let serverChangeFlag = true;
      //             for (let k = 0; k < data.data.length; k++) {
      //               if (
      //                 data.data[k].userId == newRows[j].serverId &&
      //                 newRows[j].serverId != null &&
      //                 newRows[j].serverId != ""
      //               ) {
      //                 serverChangeFlag = false;
      //               }
      //             }

      //             if (serverChangeFlag) {
      //               console.log(data);
      //               newRows[j].serverId = parseInt(data.data[0].userId);
      //             }
      //           }
      //           newRows[j].serverList = data.data;
      //         } else {
      //           newRows[j].serverId = "";
      //           newRows[j].serverList = [];
      //         }
      //       } else {
      //         console.log(oAjax);
      //         newRows[j].serverId = "";
      //         newRows[j].serverList = [];
      //       }
      //     };
      //     oAjax.send();
      //   }
      // }

      // if (countFlag == _self.departChangeCountFlag) {
      //   _self.departServerObj = [];
      //   _self.departServerObj = newRows;
      // }

      // console.log(_self.departServerObj);
    });
    this.$bus.emit('OPEN_ORDER_PRODUCT_LIST', this.orderDetail.companyid);
  }
};
</script>

<style>
#orderItem .ivu-input {
  border: 0px solid #dddee1;
}
#orderItem .ivu-select-selection {
  border: 0px solid #dddee1;
}
</style>
