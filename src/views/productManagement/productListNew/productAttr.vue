<template>
  <div>
    <Spin size="large" fix v-if="sideLoading"></Spin>
    <Card dis-hover>
      <div slot="title">
        <span style="padding-right:10px">产品详情</span>
        <Tag color="yellow" type="border">点击左侧产品即可查看价格！</Tag>
      </div>
      <Row class="productDetail-title" style="margin-bottom:20px">
        <p id="product_name">{{product.product}}</p>
        <p class="productDetail-title-price">
          <span>￥
            <strong id="product_price">{{productPrice}}</strong>
          </span>
          <!-- <InputNumber style="margin-left:20px;width:120px" :min="0" v-model="newPrice" v-if="isAdmin"></InputNumber><Button style="margin-left:10px" v-if="isAdmin" type="warning">修改价格</Button>  -->
        </p>
        <div class="productDetail-title-content"></div>
      </Row>
      <Row class="type-select" v-if="selectProduct.id == 100 && changeArea">
        <!-- <Row v-for="(item, index) in queryProperty" :key="index" class="type-select"> -->
        <p>{{queryProperty[0].name}}</p>
        <RadioGroup
          v-model="selectProperty[0]"
          type="button"
          size="large"
          @on-change="property_change;selectProperty[1]='';productPrice=0;SKU=''"
        >
          <Radio
            v-for="(type, index2) in queryProperty[0].children"
            :label="type.pvId"
            :key="index2"
          >{{type.propertyValue}}</Radio>
        </RadioGroup>
        <p v-if="selectProperty[0]==310">{{queryProperty[2].name}}</p>
        <RadioGroup
          v-model="selectProperty[1]"
          type="button"
          size="large"
          v-if="selectProperty[0]==310"
          @on-change="property_change"
        >
          <Radio
            v-for="(type, index) in queryProperty[2].children"
            :label="type.pvId"
            :key="index"
          >{{type.propertyValue}}</Radio>
        </RadioGroup>
        <p v-if="selectProperty[0]!=310">{{queryProperty[1].name}}</p>
        <RadioGroup
          v-model="selectProperty[1]"
          type="button"
          size="large"
          @on-change="property_change"
          v-if="selectProperty[0]!=310"
        >
          <Radio
            v-for="(type, index) in queryProperty[1].children"
            :label="type.pvId"
            :key="index"
          >{{type.propertyValue}}</Radio>
        </RadioGroup>
        <!-- </Row> -->
      </Row>
      <Row
        v-if="selectProduct.id != 100"
        v-for="(item, index) in queryProperty"
        :key="index"
        class="type-select"
      >
        <p>{{item.name}}</p>
        <RadioGroup
          v-model="selectProperty[index]"
          type="button"
          size="large"
          @on-change="property_change"
        >
          <Radio
            v-for="(type, index2) in item.children"
            :label="type.pvId"
            :key="index2"
          >{{type.propertyValue}}</Radio>
        </RadioGroup>
      </Row>
      <Row style="margin-top:20px">
        <p style="font-size:16px;padding-bottom:16px">地区</p>
        <Col span="10">
          <al-cascader v-model="areaCode" data-type="code" level="2" @on-change="area_change"/>
        </Col>
      </Row>
      <Row>
        <Button
          type="error"
          icon="bag"
          size="large"
          style="margin-top: 20px"
          @click="open_flow_img"
        >查看流程图</Button>
        <Button
          type="error"
          icon="bag"
          size="large"
          style="margin-top: 20px"
          @click="openUpdateLink = true"
        >修改流程图</Button>
				<Button
				  type="error"
				  icon="bag"
				  size="large"
				  style="margin-top: 20px"
					v-if="iscycle==='Y'?true:false"
				  @click="openCycleProperty = true"
				>修改周期性属性</Button>
        <Button
                type="warning"
                icon="bag"
                size="large"
                style="margin-top: 20px"
                @click="analysis"
        >分析</Button>
      </Row>
    </Card>
    <update-link v-if="openUpdateLink" :skuId="SKU" :product="product" @update="openUpdateLink= false"></update-link>
		<update-cycle-property v-if="openCycleProperty" :skuId="SKU" @update="openCycleProperty= false"></update-cycle-property>
  </div>
</template>

<script>
import updateLink from './updateLink'
import updateCycleProperty from './updateCycleProperty'
export default {
  props: {
    product: {
      type: [Object, String]
    }
  },
  components: {
    updateLink,
		updateCycleProperty
  },
  data() {
    return {
      openUpdateLink: false,
			openCycleProperty:false,
      changeArea: false,
      sideLoading: false,
      productPrice: 0,
      areaCode: ["440000", "440100", "440103"],
      SKU: "",
      orderAddProduct: false,
      selectProduct: "",
      //  产品的相关属性
      queryProperty: [],
      producSku: [],
      selectProperty: [],
      newPrice: 0,
			iscycle:""
    };
  },
  watch: {
    product: {
      handler() {
        this.select_product();
      },
      deep: true
    }
  },
  methods: {
    analysis(event){
      if (this.SKU) {
      this.$router.push({
        path: '/productAnalysis?skuid=' + this.SKU
      })
      } else {
        this.$Message.error("请先选择要分析的选项！");
      }
      event.stopPropagation()
    },
    //  生成产品详情
    select_product() {
      if (this.product.id == "14") {
        this.$Message.error("对不起，该产品已经不允许操作！");
        return false;
      }
      this.SKU = "";
      this.sideLoading = true;
      this.selectProduct = this.product;
      this.productPrice = 0;
      this.queryProperty = [];
      this.selectProperty = [];
      this.get_queryProperty();
      this.get_product_sku();
			this.iscycle = this.product.iscycle
    },
    //  获取产品子属性
    get_queryProperty() {
      let _self = this;
      let url = `api/product/queryPropertyByProductId`;
      let config = {
        params: {
          productId: this.product.id
        }
      };

      function success(res) {
        _self.queryProperty = res.data.data;
        if (_self.product.id == 100) {
          console.log(_self.queryProperty);
          let temp = [];
          for (let i = 0; i < _self.queryProperty.length; i++) {
            if (_self.queryProperty[i].propertyId == 95) {
              temp[0] = _self.queryProperty[i];
            }
            if (_self.queryProperty[i].propertyId == 23) {
              temp[1] = _self.queryProperty[i];
            }
            if (_self.queryProperty[i].propertyId == 16) {
              temp[2] = _self.queryProperty[i];
            }
          }
          _self.queryProperty = temp;
          _self.changeArea = true;
        } else {
          _self.changeArea = false;
        }
      }

      this.$Get(url, config, success);
    },
    //  获取产品所有sku
    get_product_sku() {
      let _self = this;
      let url = `api/product/getSKUListByProductId`;
      let config = {
        params: {
          productId: this.product.id
        }
      };

      function success(res) {
        _self.producSku = res.data.data;
        try {
          let temp = _self.producSku[0].linkPropertys.split(",");
          if (temp.length == 1) {
            _self.selectProperty.push(parseInt(temp[0]));
            _self.property_change();
          }

          setTimeout(() => {
            _self.sideLoading = false;
          }, 200);
        } catch (error) {
          setTimeout(() => {
            _self.sideLoading = false;
          }, 200);
        }
      }

      this.$Get(url, config, success);
    },
    //  通过属性值获取sku
    find_sku() {
      let _self = this;
      return new Promise(function(resolve, reject) {
        _self.SKU = "";
        let len = _self.producSku[0].linkPropertys.split(",").length;
        if (_self.selectProperty.length == len) {
          let arr = [];
          let total = _self.selectProperty.join(",");
          for (let i = 0; i < _self.producSku.length; i++) {
            arr = _self.producSku[i].linkPropertys.split(",");
            let flag = _self.find_array(arr, total);
            if (flag) {
              _self.SKU = _self.producSku[i].id;
              resolve();
            }
          }
        } else {
        }
      });
    },
    //  数组比较
    find_array(cur, params) {
      params = params.split(",");
      if (cur.length == params.length) {
        let len = cur.length;
        let flag = 0;
        cur = cur.sort();
        params = params.sort();
        for (let i = 0; i < len; i++) {
          if (cur[i] == params[i]) {
            flag++;
          } else {
            return false;
          }
        }
        if (flag == len) {
          return true;
        }
      } else {
        return false;
      }
    },
    //  获取产品价格
    get_product_price_by_sku() {
      let url = `api/product/getPriceByAreaAndSKU`;

      let _self = this;

      let config = {
        params: {
          skuId: _self.SKU,
          areaId: _self.areaCode[2]
        }
      };

      function success(res) {
        _self.productPrice = res.data.data[0].oaprice;
      }

      this.$Get(url, config, success);
    },
    area_change(e) {
      this.property_change();
    },
    property_change(e) {
      let _self = this;
      this.productPrice = 0;
      if (this.selectProperty.length) {
        this.find_sku()
          .then(() => {
            _self.get_product_price_by_sku();
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
      }
    },
    //  产品操作
    add_product() {
      let _self = this;
      let url = "/api/order/queryItemDetail";

      let config = {
        params: {
          productSkuIds: _self.SKU,
          areaId: _self.areaCode[2]
        }
      };

      function success(res) {
        _self.detail = res.data.data[0];
        // console.log(_self.detail)
        if (res.data.data[0].iscycle == "Y") {
          let url2 = "api/order/cycle/service/record/budget/period";
          let config2 = {
            params: {
              productId: _self.selectProduct.id,
              companyId: _self.companyId
            }
          };

          function success2(re) {
            _self.detail.servicestartdate = re.data.data;
            _self.$bus.emit("ADD_PRODUCT", _self.detail);
            _self.productListShow = false;
          }

          _self.$Get(url2, config2, success2);
        } else {
          _self.$bus.emit("ADD_PRODUCT", _self.detail);
          _self.productListShow = false;
        }
      }

      this.$Get(url, config, success);
    },
    //  产品流程图
    open_flow_img() {
      window.open(
        "/api/dataCenter/activiti/getInputStreamBySkuId?skuId=" + this.SKU
      );
    },
    //  限制某项产品
    rowClassName(row, index) {
      if (row.id == "14") {
        return "disabled-row";
      }
    },
    //  修改流程图
    // update_flow_img(){

    // },
    edit_product_price() {
      let _self = this;
      this.$router.push({
        name: "updateProductPrice",
        params: {
          skuId: _self.SKU
        },
        // query: {
        //     name: "1234",
        //     children: 12345
        // }
      });
    }
  },
  computed: {
    isAdmin() {
      if (localStorage.getItem("id") == "10059") {
        return true;
      } else {
        return false;
      }
    },
    disabled() {
      if (!this.SKU) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style>
.type-select .ivu-radio-group-button.ivu-radio-group-large .ivu-radio-wrapper {
  margin: 10px;
  border-radius: 8px;
  border-left: 1px solid #dddee1;
}
.type-select .ivu-radio-group-button .ivu-radio-wrapper:after,
.ivu-radio-group-button .ivu-radio-wrapper:before {
  content: none;
}
.type-select .ivu-radio-group-button .ivu-radio-wrapper-checked {
  background: #2d8cf0;
  color: #fff;
  border-left: none !important;
}
.productDetail-title {
  border-bottom: 1px solid #d9d9d9;
  padding: 1rem;
  background: #fff;
  position: relative;
}
.productDetail-title > p {
  line-height: 2;
  color: #742323;
  font-size: 1.2rem;
}
.productDetail-title-price > span {
  color: #ed3f14;
  font-weight: 400;
}
.productDetail-title-price > span > strong {
  font-size: 1.5rem;
}
.disabled-row {
  color: #eaeaea;
}
</style>
