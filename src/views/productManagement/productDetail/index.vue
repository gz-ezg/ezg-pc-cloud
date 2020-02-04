<template>
  <div>
    <Card title="产品详情" style="min-width:1000px">
      <Row :gutter="20">
        <Col span="12">
          <Form ref="data" :model="data" :rules="ruleValidate" :label-width="120">
            <FormItem label="产品名称：" prop="product">
              <Input v-model="data.product"></Input>
            </FormItem>
            <FormItem label="产品类型：" prop="productTypeName">
              <Input v-model="data.productTypeName" @on-focus="open_type_tree"></Input>
            </FormItem>
            <FormItem label="周期性产品：" prop="iscycle">
              <Select v-model="data.iscycle">
                <Option value="Y">是</Option>
                <Option value="N">否</Option>
              </Select>
            </FormItem>
            <FormItem label="默认服务部门：" prop="defaultdepartalias">
              <Select v-model="data.defaultdepartalias">
                <Option
                  v-for="(item, index) in departAlias"
                  :value="item.typecode"
                  :key="index"
                >{{item.typename}}</Option>
                <Option value="N">否</Option>
              </Select>
            </FormItem>
            <FormItem label="服务部门：" prop="departalias">
              <CheckboxGroup v-model="data.departalias" size="large">
                <Row>
                  <Col v-for="(item, index) in departAlias" :span="8" :key="index">
                    <Checkbox :label="item.typecode" size="large">{{item.typename}}</Checkbox>
                  </Col>
                </Row>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="产品编码：" prop="productCode">
              <Input v-model="data.productCode" :readonly="readonly"></Input>
            </FormItem>
            <FormItem label="产品状态：" prop="status">
              <!-- <Input v-model="data.status" :readonly="readonly"></Input> -->
              <Select style="width:100%" v-model="data.status" :disabled="readonly">
                <Option :value="0">未上架</Option>
                <Option :value="1">销售中</Option>
              </Select>
            </FormItem>
            <FormItem label="产品排序：" prop="ordernumber">
              <Input v-model="data.ordernumber" :readonly="readonly"></Input>
            </FormItem>
            <FormItem label="产品服务类型" prop="product_type">
              <RadioGroup v-model="data.product_type" size="large">
                <Radio label="zycp">自营产品</Radio>
                <Radio label="gyscp">供应商产品</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem v-if="$route.query.id">
              <Button type="primary" @click="before_update_product">修改</Button>
              <Button type="ghost" @click="cancel" style="margin-left: 8px">重置</Button>
            </FormItem>
            <FormItem v-else>
              <Button type="primary" @click="before_update_product">创建</Button>
              <Button type="ghost" @click="cancel" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
        </Col>
        <Col span="12">
          <!-- {{propertys}} -->
          <Row>
            <Button type="primary" @click="open_product_attr">添加产品属性</Button>
          </Row>
          <Row v-for="(item, index) in propertys" :key="index" style="margin-top:10px">
            <Row>
              <h3 style="display:inline-block;float:left">属性值 - {{index+1}}：{{item.name}}</h3>
              <Button
                style="display:inline-block;float:right"
                type="warning"
                size="small"
                @click="delete_product_type(index)"
              >删除</Button>
            </Row>
            <CheckboxGroup v-model="checkTypeArray[index]" size="large">
              <Row style="margin-top:5px">
                <Col span="8" v-for="(item2, index2) in item.children" :key="index2">
                  <Checkbox :label="item2.pvId" size="large">{{item2.propertyValue}}</Checkbox>
                </Col>
              </Row>
            </CheckboxGroup>
          </Row>
          <!-- {{checkTypeArray}} -->
        </Col>
      </Row>
    </Card>
    <type-tree :id="data.productTypeID" v-if="openTypeTree" @close="close_type_tree"></type-tree>
    <attr-list v-if="openAttrList" @close="openAttrList = false" @add-attr="add_attr"></attr-list>
  </div>
</template>

<script>
import typeTree from "./typeTree";
import attrList from "./typeAttrList";
export default {
  name: "productDetail",
  components: {
    typeTree,
    attrList
  },
  computed: {
    readonly() {
      if (this.$route.query.id) {
        return true;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      openAttrList: false,
      openTypeTree: false,
      data: {
        // product: "",
        iscycle: "N"
        // productTypeID: ""
      },
      propertys: [],
      departAlias: [],
      ruleValidate: {
        product: [
          { required: true, message: "产品名称不能为空！", trigger: "blur" }
        ],
        productTypeName: [
          { required: true, message: "产品类型不能为空！", trigger: "change" }
        ],
        iscycle: [
          { required: true, message: "周期性属性不能为空！", trigger: "blur" }
        ],
        defaultdepartalias: [
          { required: true, message: "默认服务部门不能为空！", trigger: "blur" }
        ],
        departalias: [
          {
            required: true,
            message: "服务部门不能为空！",
            trigger: "change",
            type: "array",
            min: 1
          }
        ],
        productCode: [
          { required: true, message: "产品编码不能为空！", trigger: "change" }
        ]
      },
      checkTypeArray: []
    };
  },
  methods: {
    get_product_detail(to) {
      if (to.query.id) {
        let _self = this;
        let url = `api/product/productDetail`;
        let config = {
          params: {
            id: _self.$route.query.id
          }
        };

        function success(res) {
          _self.data = res.data.data;
          _self.propertys = res.data.data.propertys;
          _self.checkTypeArray = [];
          for (let i = 0; i < _self.propertys.length; i++) {
            let temp = [];
            for (let j = 0; j < _self.propertys[i].children.length; j++) {
              if (_self.propertys[i].children[j].selected) {
                temp.push(_self.propertys[i].children[j].pvId);
              }
            }
            _self.$nextTick(() => {
              _self.checkTypeArray.push(temp);
            });
          }
          _self.data.departalias = _self.data.departalias.split(",");
        }

        this.$Get(url, config, success);
      } else {
      }
    },
    get_data_center() {
      let _self = this;
      let params = "departAlias,product_type";

      function success(res) {
        _self.departAlias = res.data.data.departAlias;
        _self.productType = res.data.data.product_type;
      }

      this.$GetDataCenter(params, success);
    },
    open_type_tree() {
      this.openTypeTree = true;
    },
    close_type_tree(e) {
      if (e) {
        (this.data.productTypeName = e.typeName),
          (this.data.productTypeID = e.id);
      }
      this.openTypeTree = false;
    },
    open_product_attr() {
      this.openAttrList = true;
      // this.propertys.push(12)
      // this.checkTypeArray.push([12])
    },
    add_attr(e) {
      for (let i = 0; i < this.propertys.length; i++) {
        if (this.propertys[i].propertyId == e) {
          this.$Message.warning("此属性已添加！请勿重复添加！");
          return false;
        }
      }
      let _self = this;
      _self.sideLoading = true;
      _self.loading = true;
      let url = `api/product/property/findPropertyById/` + e;

      let config = {};

      function success(res) {
        let detail = res.data.data;

        let temp = {};
        temp.name = detail.property[0].name;
        temp.propertyId = detail.property[0].id;
        temp.children = [];
        let checkTemp = [];
        for (let j = 0; j < detail.propertyV.length; j++) {
          let attr = {};
          attr.pvId = detail.propertyV[j].id;
          attr.propertyValue = detail.propertyV[j].propertyValue;
          attr.selected = 1;
          temp.children.push(attr);
          checkTemp.push(detail.propertyV[j].id);
        }
        _self.propertys.push(temp);
        _self.checkTypeArray.push(checkTemp);
      }

      this.$Get(url, config, success);
    },
    delete_product_type(e) {
      this.propertys.splice(e, 1);
      //  在下一轮循环才删除类型子数组，减少复用之后造成的数据不一致
      this.$nextTick(() => {
        this.checkTypeArray.splice(e, 1);
      });
    },
    //  创建及修改之逻辑
    before_update_product() {
      let _self = this;
      this.$refs["data"].validate(valid => {
        if (valid) {
          if (_self.$route.query.id) {
            //  调用更新逻辑
            _self.update_product();
          } else {
            //  调用创建逻辑
            _self.create_product();
          }
        } else {
          this.$Message.error("请补全信息！");
        }
      });
    },
    cancel() {
      this.$refs.data.resetFields();
      this.data.productTypeID = "";
      this.propertys = [];
      this.checkTypeArray = [];
    },
    create_product() {
      let _self = this;
      let url = `api/product/create`;

      let attrList = this.tranform();
      let config = {
        productcode: _self.data.productCode,
        product: _self.data.product,
        iscycle: _self.data.iscycle,
        defaultdepartalias: _self.data.defaultdepartalias,
        departalias: _self.data.departalias.join(","),
        producttypeid: _self.data.productTypeID,
        propertys: JSON.stringify(attrList),
        sortid: _self.data.ordernumber,
        status: _self.data.status,
        ordernumber: _self.data.ordernumber,
        productType:__self.data.product_type
      };

      function success(res) {
        //  关闭新增页面
        _self.$store.commit("closePage", "productDetail");
        _self.$store.commit("removeTag", "productDetail");
        _self.$bus.emit("UPDATE_PRODUCT_LIST");
        _self.$router.push({
          name: "productList_index"
        });
      }

      function fail(err) {}

      this.$Post(url, config, success, fail);
    },
    update_product() {
      let _self = this;
      let url = `api/product/update`;

      let attrList = this.tranform();
      let config = {
        id: _self.$route.query.id,
        product: _self.data.product,
        iscycle: _self.data.iscycle,
        defaultdepartalias: _self.data.defaultdepartalias,
        departalias: _self.data.departalias.join(","),
        productTypeId: _self.data.productTypeID,
        propertyIds: JSON.stringify(attrList),
        productType:_self.data.product_type
        // sortid: _self.data.ordernumber,
        // status: _self.data.status,
        // ordernumber: _self.data.ordernumber
      };

      function success(res) {
        _self.$store.commit("closePage", "productDetail");
        _self.$store.commit("removeTag", "productDetail");
        _self.$bus.emit("UPDATE_PRODUCT_LIST");
        _self.$router.push({
          name: "productList_index"
        });
      }

      function fail(err) {}

      this.$Post(url, config, success, fail);
    },
    //  格式化属性值
    tranform() {
      let res = [];
      let _self = this;
      for (let i = 0; i < _self.propertys.length; i++) {
        let temp = {};
        temp.id = _self.propertys[i].propertyId;
        temp.cId = _self.checkTypeArray[i];
        res.push(temp);
      }

      return res;
    }
  },
  watch: {
    $route(to, from) {
      if (to) {
        this.get_product_detail(to);
      }
    }
  },
  created() {
    this.get_data_center();
    this.get_product_detail(this.$route);
  }
};
</script>

