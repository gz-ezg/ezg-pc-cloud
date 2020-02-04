<template>
  <div>
    <Modal
      title="新建订单"
      v-model="openCreateOrderDetail"
      width="50"
      :mask-closable="false"
      @on-cancel="closeCreateDetail"
      @on-visible-change="modal_status_change"
    >
      <Row>
        <Col span="10">
          <Form ref="orderDetail" :model="orderDetail" :label-width="100" :rules="orderDetailRule">
            <Row span="12">
              <Col>
                <FormItem label="供应商" prop="supplierName">
                  <Input size="small" v-model="orderDetail.supplierName" />
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="联系人" prop="contactName">
                  <Input size="small" v-model="orderDetail.contactName" />
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="电话" prop="tel">
                  <Input size="small" v-model="orderDetail.tel" />
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="结算账号" prop="settlementAccount">
                  <Input size="small" v-model="orderDetail.settlementAccount" />
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="产品" prop="product">
                  <Input
                    size="small"
                    v-model="orderDetail.product"
                    @on-focus="open_company"
                    readonly
                  />
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="结算价" prop="settlementPrice">
                  <Input size="small" v-model="orderDetail.settlementPrice" />
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="销售价" prop="salesPrice">
                  <Input size="small" v-model="orderDetail.salesPrice" />
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="说明" prop="remark">
                  <Input
                    v-model="orderDetail.remark"
                    type="textarea"
                    :autosize="{minRows: 2,maxRows: 5}"
                    size="small"
                  >></Input>
                </FormItem>
              </Col>
            </Row>
            <Row span="12">
              <Col>
                <FormItem label="状态" prop="status">
                  <RadioGroup v-model="orderDetail.status" size="large">
                    <Radio label="Y">启用</Radio>
                    <Radio label="N">禁用</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
          </Form>
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
      orderDetailRule: {
        supplierName: [
          { required: true, message: "请填写供应商", trigger: "change" }
        ],
        product: [{ required: true, message: "请选择产品", trigger: "change" }],
        settlementPrice: [
          { required: true, message: "请填写结算价", trigger: "change" }
        ],
        salesPrice: [
          { required: true, message: "请填写销售价", trigger: "change" }
        ]
      },
      search_model: "0",
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
      orderItemOne: [],
      departJsonArray: [],
      departServerObj: [],
      departChangeCountFlag: 0,
      id: ""
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
    //  打开公司选择
    open_company() {
      this.$bus.emit("ORDER_OPEN_SELECT_COMPANY", true);
    },
    //  选择公司后回调
    setting_company(e) {
      console.log(e.id);
      this.id = e.id;
      this.orderDetail.product = e.product;
      console.log(this.orderDetail.product);
      // this.orderDetail.name = e.customerName;
      // this.orderDetail.tel = e.customerTel;
      // this.orderDetail.gdsreport = e.gdsreport;
      // this.orderDetail.companyid = e.id;
      // this.orderDetail.customerid = e.customerId;
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
        // console.log(this.orderItem)
        this.$bus.emit(
          "OPEN_ORDER_PRODUCT_LIST",
          this.orderDetail.companyid,
          this.orderItem
        );
      } else {
        this.$Message.warning("请先选择公司！");
      }
    },
    create() {
      let _self = this;
      let url = `api/product/supplier/create`;
      let config = {
        supplierName: _self.orderDetail.supplierName,
        contactName: _self.orderDetail.contactName,
        tel: _self.orderDetail.tel,
        settlementAccount: _self.orderDetail.settlementAccount,
        settlementPrice: _self.orderDetail.settlementPrice,
        salesPrice: _self.orderDetail.salesPrice,
        remark: _self.orderDetail.remark,
        status: _self.orderDetail.status,
        productId: _self.id
      };
      function success(res) {
        _self.openCreateOrderDetail = false;
        _self.$emit("get_data")
      }

      this.$Post(url, config, success);
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
      this.orderItemOne = [];
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
    this.$bus.off("REMOVE_ITEM", true);
    this.$bus.on("REMOVE_ITEM", e => {
      // console.log(e)
      if (e.length == 0) {
        this.orderItemOne = [];
      } else {
        let a = [e[0]];
        // console.log(a)
        for (let i = 0; i < e.length; i++) {
          let b = e[i];
          let repeat = false;
          for (let j = 0; j < a.length; j++) {
            if (b.productid == a[j].productid) {
              repeat = true;
              break;
            }
          }
          if (!repeat) {
            a.push(b);
          }
        }
        this.orderItemOne = a;
      }
    });
  }
};
</script>
