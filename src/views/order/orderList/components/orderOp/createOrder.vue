<template>
  <div>
    <Modal
      title="新建订单"
      v-model="openCreateOrderDetail"
      width="100"
      :mask-closable="false"
      @on-cancel="closeCreateDetail"
      @on-visible-change="modal_status_change"
    >
      <Row>
        <Col span="10">
          <Form ref="orderDetail" :model="orderDetail" :label-width="100" :rules="orderDetailRule">
            <Row :gutter="16">
              <Col span="12">
                <FormItem label="归属公司" prop="CompanyName">
                  <Input
                    size="small"
                    v-model="orderDetail.CompanyName"
                    @on-focus="open_company"
                    readonly
                  />
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="归属客户" prop="name">
                  <Input size="small" v-model="orderDetail.name" @on-focus="open_company" readonly/>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="16">
              <Col span="12">
                <FormItem label="缴费时间" prop="payTime">
                  <DatePicker
                    size="small"
                    type="date"
                    style="width: 100%"
                    v-model="orderDetail.payTime"
                  ></DatePicker>
                </FormItem>
              </Col>

              <Col span="11">
                <FormItem label="缴费渠道" prop="paydir">
                  <Select transfer v-model="orderDetail.paydir" style="width:100%" size="small">
                    <Option
                      v-for="(item, index) in payDirs"
                      :key="index"
                      :value="item.typecode"
                    >{{item.typename}}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>

            <Row :gutter="16">
              <Col span="12">
                <FormItem label="订单总价" prop="paynumber">
                  <Input size="small" v-model="orderDetail.paynumber" number readonly/>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="已付款" prop="realnumber">
                  <Input size="small" v-model="orderDetail.realnumber" number/>
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
                    <Input
                      size="small"
                      v-model="orderCode"
                      @on-focus="open_abOrder"
                      readonly
                      style="width:60%"
                    />
                    <Button type="info" size="small" @click="open_abOrder">选择</Button>
                  </div>
                </FormItem>
              </Col>
            </Row>

            <Row :gutter="16">
              <Col span="24">
                <FormItem label="使用余额" prop="usebalance">
                  <div style="display:inline-block">
                    <Input size="small" v-model="orderDetail.usebalance" style="width:40%" number/>
                    <Button
                      type="info"
                      size="small"
                      @click="get_balance('create', orderDetail.customerid)"
                      :disabled="checkBalance"
                    >查询</Button>
                    <span
                      style="line-height:24px;height:24px;display:inline-block;margin-left:10px"
                    >可用余额：</span>
                    <span
                      style="line-height:24px;height:24px;display:inline-block"
                    >{{allUseBalance}}</span>
                  </div>
                </FormItem>
              </Col>
            </Row>

            <Row :gutter="16">
              <Col span="24">
                <FormItem style="margin-bottom:10px">
                  <!-- class="upload_before" -->
                  <div slot="label">合同</div>
                  <Upload ref="upload" multiple :before-upload="handleUpload" action>
                    <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
                  </Upload>
                  <span v-for="(item,index) in show_file" :key="index">
                    {{ item.name }}
                    <Button type="text" @click="fileRemove(index)">移除</Button>
                  </span>
                </FormItem>
              </Col>
            </Row>

            <Row :gutter="16">
              <Col span="10">
                <FormItem label="新增产品">
                  <Button type="primary" icon="plus" @click="open_product_list">新增</Button>
                  <!-- <Button type="primary" icon="plus" @click="removeRows()">删除</Button> -->
                  <Button
                    type="primary"
                    icon="plus"
                    @click="open_service_item"
                    v-if="showAccountHomeItem"
                  >查看会计到家服务项</Button>
                </FormItem>
              </Col>
            </Row>

            <Row :gutter="16" v-if="orderItemOne.length!==0">
              <Col span="23">
              <Row><h3 style="margin-bottom: 10px;margin-left: 10px">下单一点通</h3></Row>
              <Row>
                  <Collapse v-model="search_model">
                      <Panel  v-for="(item,index) in orderItemOne" :key="index" style="font-weight: bold">
                      <Icon type="ios-analytics" style="margin-left:20px;margin-right:5px"></Icon>
                      {{item.product}}
                      <div slot="content">
                        <Form ref="SearchValidate"  :label-width="0" style="margin-top: 15px">
                          <center>
                            <FormItem>
                              {{item.remark}}
                            </FormItem>
                          </center>
                        </Form>
                      </div>
                    </Panel>
                  </Collapse>
              </Row>
              </Col>
            </Row>
            <!--<Row :gutter="16">-->
              <!--<div v-for="(depart,index) of departServerObj">-->
                <!--<Col span="8">-->
                  <!--<FormItem label="服务部门:">{{depart.departName}}</FormItem>-->
                <!--</Col>-->
                <!--<Col span="15">-->
                  <!--<FormItem label="服务人员:">-->
                    <!--<Select v-model="depart.serverId">-->
                      <!--<Option-->
                        <!--v-for="item of depart.serverList"-->
                        <!--:key="item.userId"-->
                        <!--:value="item.userId"-->
                      <!--&gt;{{item.realname +"【"+item.flag+"】"}}</Option>-->
                    <!--</Select>-->
                  <!--</FormItem>-->
                <!--</Col>-->
              <!--</div>-->
            <!--</Row>-->
          </Form>
          <!-- <Row v-if="orderItem.length">
					    <Table
					        id="orderItem"
					        style="margin-top:10px"
					        ref="selection"
					        highlight-row
					        border
					        size="small"
					        :columns="orderItemHeader"
					        :data="orderItem"></Table>
          </Row>-->
        </Col>
        <Col span="14">
          <h3 style="margin-bottom: 10px;">产品详情</h3>

          <product-detail-list
            v-if="openCreateOrderDetail"
            :productList="orderItem"
            :productListOne="orderItemOne"
            :isDisabled="isDisabled"
            :pageFlag="pageFlag"
          ></product-detail-list>
        </Col>
      </Row>
      <div slot="footer">
        <Button type="primary" @click="create" :loading="loading">创建</Button>
        <Button type="ghost" @click="closeCreateDetail">关闭</Button>
      </div>
    </Modal>
    <company-select @company-change="setting_company"></company-select>
    <service-item @close="close_item" v-if="openServiceItem" :id="orderDetail.companyid"></service-item>
    <ab-order-select @aborder-change="setting_aborder" :id="orderDetail.companyid"></ab-order-select>
  </div>
</template>

<script>
import serviceItem from "../accountHomeTree";
import commonSetting from "./comonSetting.js";
import companySelect from "../companySelect";
import abOrderSelect from "../abOrderSelect";
import { DateFormat, DateFormatYearMonth } from "../../../../../libs/utils.js";
import * as orderApi from "../../api";
import productDetailList from "./productDetailList";

export default {
  mixins: [commonSetting],
  components: {
    companySelect,
    serviceItem,
    abOrderSelect,
    productDetailList
  },
  computed: {},
  data() {
    return {
      search_model:"0",
      pageFlag: "createOrder",
      isDisabled: false,
      openServiceItem: false,
      show_file: [],
      openCreateOrderDetail: false,
      loading: false,
      orderId: "",
      applyId: "",
      orderCode: "",
      productItem: "",
      orderItem: [],
      orderItemOne:[],
      departJsonArray: [],
      departServerObj: [],
      departChangeCountFlag: 0
    };
  },
  methods: {
    //打开对应的异常工单列表
    open_abOrder() {
      this.$bus.emit("SELECT_ABORDER", true);
    },
    //  选择对应异常工单后回调
    setting_aborder(e) {
      console.log(e);
      this.applyId = e.id;
      this.orderCode = e.unusual_code;
    },

    //  打开会计到家服务项
    open_service_item() {
      if (this.orderDetail.companyid) {
        this.openServiceItem = true;
      }
    },
    //  打开公司选择
    open_company() {
      this.$bus.emit("ORDER_OPEN_SELECT_COMPANY", true);
    },
    //  选择公司后回调
    setting_company(e) {
      console.log(e);
      this.orderDetail.CompanyName = e.companyname;
      this.orderDetail.name = e.customerName;
      this.orderDetail.tel = e.customerTel;
      this.orderDetail.gdsreport = e.gdsreport;
      this.orderDetail.companyid = e.id;
      this.orderDetail.customerid = e.customerId;
    },
    //  ======== 合同文件上传start ========
    handleUpload(file) {
      this.show_file.push(file);
      return false;
    },
    fileRemove(e) {
      // this.file.splice(e, 1);
      this.show_file.splice(e, 1);
    },
    async upload_img(e) {
      let _self = this;
      let formdata = new FormData();

      let url = `api/order/contract/upload`;
      formdata.append("orderId", e);
      for (let i = 0; i < _self.show_file.length; i++) {
        formdata.append("files", _self.show_file[i]);
      }

      try {
        let { status, data } = await orderApi.orderContractUpload(formdata);
        this.show_file = [];
      } catch (error) {
        console.log(error);
      }
    },
    //  ======== 合同文件上传end ========
    //  ======== 打开产品列表 ========
    open_product_list() {
      if (this.orderDetail.companyid) {
        console.log(this.orderItem)
        this.$bus.emit("OPEN_ORDER_PRODUCT_LIST", this.orderDetail.companyid,this.orderItem);
      } else {
        this.$Message.warning("请先选择公司！");
      }
    },
    create() {
      if (!this.check_date()) {
        return;
      }
      let _self = this;
      this.loading = true;
      this.$refs["orderDetail"].validate(valid => {
        _self.create_order();
      });
    },
    async create_order() {
      let _self = this;

      let order = JSON.parse(JSON.stringify(_self.orderItem));

      console.log("order", order);

      for (let i = 0; i < order.length; i++) {
        order[i].servicedeparts = "";
		order[i].servicestartdate = DateFormat(order[i].servicestartdate);
        if(order[i].selectServer){
          order[i].serverId = order[i].selectServer.userId
        }
      }

    //   for (let j = 0; j < _self.departServerObj.length; j++) {
    //     departParamObj.push({
    //       departId: _self.departServerObj[j].departId,
    //       serverId: _self.departServerObj[j].serverId
    //     });
    //   }

      let config = {
        companyId: _self.orderDetail.companyid,
        payDir: _self.orderDetail.paydir,
        orderPayNumber: _self.orderDetail.realnumber,
        serviceStartDate: "",
        GDSreport: _self.orderDetail.gdsreport,
        payTime: DateFormat(_self.orderDetail.payTime),
        isornotkp: _self.orderDetail.isornotkp,
        usebalance: _self.orderDetail.usebalance,
        orderitems: JSON.stringify(order)

      };

      try {
        let { status, data } = await orderApi.orderCreate(config);

        this.orderId = data.data;
        if (status) {
          if (this.show_file.length != 0) {
            this.upload_img(data.data);
          } else {
            if (this.applyId) {
              _self.relate();
            }
            _self.$Message.warning("订单创建成功！请及时上传合同！");
          }

          setTimeout(() => {
            _self.loading = false;
            _self.$bus.emit("UPDATE_ORDER_LIST", true);
            _self.closeCreateDetail();
          }, 200);
        }
      } catch (error) {
        console.log(error);
      }

      this.loading = false;
    },
    close_item() {
      this.openServiceItem = false;
    },
    //关联异常工单
    relate() {
      let _self = this;
      let url = `api/order/unusual/workorder/linkUnusualWorkOrder`;
      let config = {
        applyId: this.applyId,
        orderId: this.orderId
      };
      function success(res) {
        console.log(res);
      }
      function fail() {}
      this.$Post(url, config, success, fail);
      this.orderId = "";
      this.applyId = "";
      this.orderCode = "";
    },
    closeCreateDetail() {
      this.openCreateOrderDetail = false;
      this.applyId = "";
      this.orderCode = "";
      this.departServerObj = [];
      this.departChangeCountFlag = 0;
    }
  },
  created() {
    let _self = this;
    this.$bus.off("OPEN_ORDERLIST_ADD", true);
    this.$bus.on("OPEN_ORDERLIST_ADD", e => {
      this.orderItem = [];
      this.orderItemOne = []
      this.openCreateOrderDetail = true;
    });
    this.$bus.on("SET_ORDER_DETAIL", e => {
      _self.orderItem = e;
    });
    this.$bus.on("SET_PAYNUMBER", e => {
      _self.orderDetail.paynumber = e.paynumber;
      _self.orderDetail.realnumber = e.realnumber;
    });
    this.$bus.on("DEFAULT_REALNAME", e => {
      _self.$set(_self.orderItem[e.index], "current", e.id);

      for (let i = 0; i < _self.orderItem.length; i++) {
        // _self.$set(_self.orderItem[i],"current",e)

        _self.optionSelect(e);
      }
    });
    this.$bus.off("DEPART_CHANGE_" + this.pageFlag, true);
    this.$bus.on("DEPART_CHANGE_" + this.pageFlag, e => {
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

      for (let j = 0; j < newRows.length; j++) {
        if (newRows[j].productSkuId != newRows[j].oldProductSkuId) {
          //表示需要重置服务人员

          let url = `api/product/server/list`;

          let config = {
            params: {
              productSkuId: newRows[j].productSkuId,
              serviceDepartId: newRows[j].departId,
              companyId: _self.orderDetail.companyid
            }
          };

          var oAjax = new XMLHttpRequest();

          oAjax.open(
            "GET",
            url +
              "?" +
              "productSkuId=" +
              newRows[j].productSkuId +
              "&serviceDepartId=" +
              newRows[j].departId +
              "&companyId=" +
              _self.orderDetail.companyid,
            false
          ); //false表示同步请求

          oAjax.onreadystatechange = function() {
            //6,通过状态确认完成
            if (oAjax.readyState == 4 && oAjax.status == 200) {
              //7,获取返回值，解析json格式字符串为对象
              var data = JSON.parse(oAjax.responseText);
              if (data.msgCode == 40000) {
                if (data.data.length == 0) {
                  newRows[j].serverId = "";
                } else {
                  let serverChangeFlag = true;
                  for (let k = 0; k < data.data.length; k++) {
                    if (
                      data.data[k].userId == newRows[j].serverId &&
                      newRows[j].serverId != null &&
                      newRows[j].serverId != ""
                    ) {
                      serverChangeFlag = false;
                    }
                  }

                  if (serverChangeFlag) {
                    newRows[j].serverId = parseInt(data.data[0].userId);
                  }
                }
                newRows[j].serverList = data.data;
              } else {
                newRows[j].serverId = "";
                newRows[j].serverList = [];
              }
            } else {
              console.log(oAjax);
              newRows[j].serverId = "";
              newRows[j].serverList = [];
            }
          };
          oAjax.send();

          /*	function success(res){

						if(res.data.data.length == 0){
							newRows[j].serverId = "";


						}else{
							let serverChangeFlag = true;
							for(let k=0;k<res.data.data.length;k++){
								if(res.data.data[k].userId == newRows[j].serverId  && newRows[j].serverId != null && newRows[j].serverId != ""){
									serverChangeFlag = false;
								}
							}

							if(serverChangeFlag){
								newRows[j].serverId = res.data.data[0].userId;
							}

						}
						newRows[j].serverList = res.data.data;
						requestFlag --;
						console.log(requestFlag+"---rquestEnd");
					}
					function fail(){
						_self.loading = false;
						newRows[j].serverId = "";
						newRows[j].serverList = [];
						requestFlag --;
						console.log(requestFlag+"---rquestEnd");
					}
					this.$Get(url, config, success,fail);*/
        }
      }

      if (countFlag == _self.departChangeCountFlag) {
        _self.departServerObj = [];
        _self.departServerObj = newRows;
      }

      console.log(_self.departServerObj);
    });
    this.$bus.off("REMOVE_ITEM",true)
    this.$bus.on("REMOVE_ITEM",e => {
      console.log(e)
      if (e.length==0){
        this.orderItemOne = []
      } else {
        let a = [e[0]]
        console.log(a)
        for (let i=0;i<e.length;i++) {
          let b = e[i]
          let repeat =false;
          for (let j=0;j<a.length;j++) {
            if (b.productid == a[j].productid){
              repeat = true
              break
            }
          }
          if (!repeat){
            a.push(b)
          }
        }
        this.orderItemOne = a
      }
    })
  }
};
</script>
