<template>
    <div>
        <Modal
                v-bind:value="modal5"
                title="录入"
                ok-text="保存"
                :styles="{top: '10%'}"
                :mask-closable="false"
                :loading="loading"
                @on-ok="ok('formValidate')"
                @on-cancel="cancel('formValidate')">
            <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="80">
                <Row :gutter="16" style="height:56px">
                    <Col span="12">
                    <FormItem label="姓名" prop="name">
                        <Input size="small" v-model="formValidate.name"/>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="电话" prop="tel">
                        <Input size="small" v-model="formValidate.tel"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" style="height:56px">
                    <Col span="12">
                    <FormItem label="固话" prop="fixedphone">
                        <Input size="small" v-model="formValidate.fixedphone"/>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="QQ" prop="qq">
                        <Input size="small" v-model="formValidate.qq"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" style="height:56px">
                    <Col span="12">
                    <FormItem label="微信" prop="weixin">
                        <Input size="small" v-model="formValidate.weixin"/>
                    </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="邮箱" prop="email">
                            <Input size="small" v-model="formValidate.email"/>
                        </FormItem>
                    </Col>
                    </Col>
                </Row>
                <Row :gutter="16" style="height:56px">
                    <Col span="12">
                        <FormItem label="服务地址" prop="address">
                            <Input size="small" v-model="formValidate.address"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="客户状态" prop="customertype">
                            <Cascader trigger="hover" :data="customerType"
                                    v-model="formValidate.customertype" size="small"></Cascader>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" style="height:56px">
                    <Col span="12">
                    <FormItem label="客户来源" prop="customersource">
                        <Select transfer v-model="formValidate.customersource" size="small" @on-change="checkchannel">
                            <Option v-for="item in cluesource" :value="item.typecode" :key="item.id">
                                {{ item.typename }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="客户等级" prop="importlevel">
                        <Select transfer v-model="formValidate.importlevel" size="small" placement="bottom">
                            <Option v-for="item in impLevel" :value="item.typecode" :key="item.id">{{ item.typename
                                }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row style="height:56px" :gutter="16" v-if="isshowchannel">
                    <Col span="12">
                    <FormItem label="选择渠道" prop="channelTypeId">
                        <Select transfer v-model="formValidate.channelTypeId" size="small">
                            <Option v-for="item in ChannelType" :value="item.id" :key="item.id">
                                {{ item.channel_type_name }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12" style="opacity:0">....</Col>
                </Row>
                <!-- <Row style="height:56px" :gutter="16" v-if="leader_show">
                    <Col span="12">
                    <FormItem label="推荐领导" prop="TJleader"  style="margin-bottom:0px">
                        <Select transfer v-model="formValidate.TJleader" size="small">
                            <Option  value="why">王海云</Option>
                            <Option  value="czm">陈志明</Option>
                            <Option  value="ycz">杨楚州</Option>
                            <Option  value="wsx">吴穗湘</Option>
                            <Option  value="czl">陈志玲</Option>
                            <Option  value="wjl">王敬龙</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12" style="opacity:0">....</Col>
                </Row> -->
                <Row style="height:56px" :gutter="16" v-if="customer_show">
                    <Col span="12">
                    <FormItem label="推荐客户" prop="recCustomer"  style="margin-bottom:0px">
                        <Input size="small" v-model="formValidate.recCustomer" @on-focus="getCustomer" readonly />                    
                    </FormItem>
                    </Col>
                    <Col span="12" style="opacity:0">....</Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="区域" prop="area">
                        <Select transfer v-model="formValidate.area" size="small">
                            <Option v-for="item in area" :value="item.typecode" :key="item.id">{{ item.typename }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="发送短信" prop="issend">
                        <Select transfer v-model="formValidate.issend" size="small">
                            <Option v-for="item in sf_yn" :value="item.typecode" :key="item.id">{{ item.typename
                                }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="客户重要性" prop="importance">
                        <Select transfer v-model="formValidate.importance" size="small">
                            <Option v-for="item in importance" :value="item.typecode" :key="item.id">{{ item.typename }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                    <FormItem label="标签" prop="customerTags" style="margin-top:5px;margin-bottom:10px">
                        <Tag v-for="item in customerlabelGroup" :key="item" :name="item" :id="item.id" closable
                            @on-close="handleClose2">
                            {{ item.labelName }}
                        </Tag>
                        <Button name="marketingManagement_index_entry_add" icon="ios-plus-empty" type="dashed" size="small" @click="getLabelData();addTag = true">添加</Button>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <FormItem label="备注" prop="backup" style="marin-top:40px">
                        <Input size="small" type="textarea" v-model="formValidate.backup"/>
                    </FormItem>
                </Row>
                <!--  <FormItem>
                      <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                      <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                  </FormItem>-->
            </Form>
        </Modal>
        <Modal
                v-model="addTag"
                title="添加标签"
                @on-ok="ok2"
                @on-cancel="cancel2">
                        <Table
                                border
                                ref="selection"
                                :columns="columns4"
                                :data="data3"
                                @on-select-cancel="selectCancel"
                                @on-selection-change="selectionChange"></Table>
                        <Page
                                size="small"
                                :total="pageTotal2"
                                show-total
                                show-sizer
                                show-elevator
                                @on-change="pageChange2"
                                @on-page-size-change="pageSizeChange2"
                                style="margin-top: 10px"></Page>
        </Modal>
        <Modal
            v-model="showCustomer"
            title="推荐客户"
            witdh="300"
        >
            <Row :gutter="16">
                <Col span="10">
                    <Input v-model="searchCustomer" placeholder="输入客户名称搜索" @on-keydown="keydown3">
                        <!-- <Button slot="append" icon="ios-search" @click="getCustomer">搜索</Button> -->
                    </Input>
                </Col>
                <Col span="10">
                    <Input v-model="searchCustomerTEL" placeholder="输入客户电话搜索" @on-keydown="keydown3">
                        <!-- <Button slot="append" icon="ios-search" @click="getCustomer">搜索</Button> -->
                    </Input>
                </Col>
                <Col span="4">
                    <Button name="marketingManagement_index_entry_recommend_client" icon="ios-search" @click="getCustomer">搜索</Button>
                </Col>
            </Row>
            <Table
                style="margin-top: 10px"
                highlight-row
                :columns="customerColumns"
                @on-row-dblclick="rowSelectCustomer"
                :loading="customerLoading"
                :data="customerData"></Table>
            <Page
                size="small"
                :total="pageTotalCustomer"
                show-total
                show-elevator
                @on-change="pageChangeCustomer"
                style="margin-top: 10px"></Page>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import Bus from "../../../components/bus";
export default {
  props: ["modal5"],
  data() {
    const validateCascader = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请选择客户状态"));
      } else {
        callback();
      }
    };
    // 电话号码校验
    const validateTel = (rule, value, callback) => {
      let re = /^1\d{10}$/;
      if (value == "" || value == null) {
        callback();
      } else {
        if (re.test(value)) {
          let url = "/customer/findCustomerByTel?tel=" + value;

          function doSuccess(response) {
            console.log(response.data);
            if (response.data.data != null) {
              callback(new Error("抱歉，电话号码重复"));
            } else {
              callback();
            }
          }
          this.GetData(url, doSuccess);
        } else {
          callback(new Error("电话格式不正确"));
        }
      }
    };
    const validateFixedphone = (rule, value, callback) => {
      let re = /\d{3}-\d{8}|\d{4}-\d{7}/;
      if (value == "" || value == null) {
        callback();
      } else {
        if (re.test(value)) {
          callback();
        } else {
          callback(new Error("固话格式不正确"));
        }
      }
    };
    const validateChannel = (rule, value, callback) => {
      if (this.formValidate.customersource == "xzqd") {
        if (value == "" || value == null) {
          callback("请输入来源渠道");
        } else {
          callback();
        }
      }
    };
    const validateQQ = (rule, value, callback) => {
      let re = /^[1-9]\d{4,10}$/;
      if (value == "" || value == null) {
        callback();
      } else {
        if (re.test(value)) {
          callback();
        } else {
          callback(new Error("QQ格式不正确"));
        }
      }
    };
    // const validateWX = (rule, value, callback) => {
    //     let re = /[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}+/
    //     if (value == '' || value == null) {
    //         callback();
    //     } else {
    //         if (re.test(value)) {
    //             callback();
    //         } else {
    //             callback(new Error('QQ格式不正确'));
    //         }
    //     }
    // };
    const validateWX = (rule, value, callback) => {
      // let re = /^[a-z_\d]+$/
      if (value == "" || value == null) {
        callback();
      } else {
        if (1) {
          callback();
        } else {
          callback(new Error("微信格式不正确"));
        }
      }
    };
    return {
      importance:[],
      pageCustomer: 1,
      customerColumns: [
        {
          title: "客户名称",
          key: "NAME"
        },
        {
          title: "客户电话",
          key: "TEL"
        }
      ],
      customerLoading: false,
      customerData: [],
      pageTotalCustomer: new Number(),
      showCustomer: false,
      searchCustomer: "",
      searchCustomerTEL: "",
      labelRow: [],
      isshowchannel: false,
      ChannelType: [],
      addTag: false,
      loading: true,
      customerlabelGroup: [],
      importlevelValue: [],
      issendValue: [],
      areaValue: [],
      customertypeValue: [],
      customersourceValue: [],
      data3: [],
      page2: 1,
      page2size: 10,
      pageTotal2: new Number(),
      formValidate: {
        id: "",
        name: "",
        tel: "",
        fixedphone: "",
        qq: "",
        weixin: "",
        address: "",
        customertype: [],
        customersource: "",
        importlevel: "",
        area: "",
        issend: "Y",
        customerlabel: [],
        createdate: "",
        updatedate: "",
        gxr: "",
        backup: "",
        sourcesubdivision: "",
        isbound: "",
        email: "",
        channelsource: "",
        channelTypeId: "",
        TJleader: "",
        recCustomer: ""
        // customertuijianId:''
      },
      area: [],
      cluesource: [],
      // console.log(temp.customerType)
      customerType: [],
      impLevel: [],
      sf_yn: [],
      customerTypeArr: [],

      ruleValidate: {
        name: [{ required: true, trigger: "blur", message: "姓名不能为空" }],
        customertype: [
          { required: true, validator: validateCascader, trigger: "change" }
        ],
        customersource: [
          { required: true, trigger: "change", message: "请选择客户来源" }
        ],
        tel: [{ validator: validateTel, trigger: "blur" }],
        fixedphone: [{ validator: validateFixedphone, trigger: "blur" }],
        importlevel: [
          { required: true, trigger: "change", message: "请选择客户等级" }
        ],
        area: [{ required: true, trigger: "change", message: "请选择区域" }],
        /*  channelTypeId:[
                        {required: true, trigger: 'blur', message:'请选择渠道来源'}
                    ],*/
        email: [{ type: "email", trigger: "blur", message: "邮箱格式不正确" }],
        qq: [{ validator: validateQQ, trigger: "blur" }],
        weixin: [{ validator: validateWX, trigger: "blur" }]
      },
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "标签",
          key: "labelName"
        }
      ],
      leader_show: false,
      customer_show: false
    };
  },
  methods: {
    keydown3(e) {
      if (e.key == "Enter") {
        this.pageCustomer = 1;
        this.getCustomer();
      }
    },
    getCustomer() {
      let _self = this;
      _self.$ButtonCollect("marketingManagement_index_entry_recommend_client");
      this.showCustomer = true;
      this.customerLoading = true;
      let url = `api/customer/list`;
      let config = {
        params: {
          page: _self.pageCustomer,
          name: _self.searchCustomer,
          tel: _self.searchCustomerTEL,
          pageSize: 10
        }
      };
      this.$http.get(url, config).then(function(res) {
        _self.pageTotalCustomer = res.data.data.total;
        _self.customerData = res.data.data.rows;
        _self.customerLoading = false;
      });
    },
    pageChangeCustomer(e) {
      this.pageCustomer = e;
      this.getCustomer();
    },
    rowSelectCustomer(e) {
      (this.formValidate.recCustomer = e.NAME),
        // this.formValidate.customertuijianId = e.id,
        (this.showCustomer = false);
    },
    ok2() {
      this.$ButtonCollect("marketingManagement_index_entry_addtag_save");
    },
    cancel2() {
      this.$ButtonCollect("marketingManagement_index_entry_addtag_cancel");
    },

    /*************************录入提交验证********************************/
    ok(name) {
      let _self = this;
      _self.$ButtonCollect("marketingManagement_index_entry_save");
      setTimeout(() => {
        console.log(_self.formValidate);
        this.loading = false;
        this.$refs[name].validate(valid => {
          if (valid) {
            if (_self.customerlabelGroup != undefined) {
              let labelIds = [];
              for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                labelIds.push(_self.customerlabelGroup[i].id);
              }
              _self.formValidate.labels = labelIds.toString();
            }
            let _customertypeStr = _self.formValidate.customertype.join("-");
            // let _customertypeStr = _self.formValidate.customertype[1]
            // console.log(_customertypeStr)
            _self.formValidate.customertype = _customertypeStr;

            if (
              _self.formValidate.tel == "" &&
              _self.formValidate.fixedphone == "" &&
              _self.formValidate.qq == "" &&
              _self.formValidate.weixin == ""
            ) {
              this.$nextTick(() => {
                this.loading = true;
              });
              this.$Message.error("电话、固话、QQ、微信必须填写一个");
              console.log(_self.formValidate);
            } else {
              let url = "/customer/saveCustomer";
              function doSuccess(response) {
                _self.$Message.success("更新成功!");
                _self.$emit("hideAddPanel", "false");
                Bus.$emit("addsuccess", true);
                // console.log(response.data.data)
                _self.$bus.emit("ADD_NEW_CUMSTOMER", response.data.data.id);
              }
              this.PostData(url, _self.formValidate, doSuccess);
            }
          } else {
            this.$nextTick(() => {
              this.loading = true;
            });
          }
        });
      }, 2000);
    },

    /*************************取消录入，重置表单********************************/
    cancel() {
      let _self = this;
      _self.$ButtonCollect("marketingManagement_index_entry_addtag_cancel");
      _self.$emit("hideAddPanel", "false");
    },

    /*************************移除标签********************************/
    handleClose2(event, name) {
      let _self = this;
      for (let i = 0; i < _self.customerlabelGroup.length; i++) {
        if (_self.customerlabelGroup[i] == name) {
          let index = _self.customerlabelGroup.indexOf(name);
          if (index > -1) {
            _self.customerlabelGroup.splice(index, 1);
          }
        }
      }
    },

    /*************************初始化下拉框********************************/
    getDataCenter() {
      var _self = this;

      let params = "customerTypes,cluesources,customerrating,area,sf_yn,importance";

      function finish(res) {
        var temp = res.data.data;
        _self.area = temp.area;
        _self.cluesource = temp.cluesources;
        // console.log(temp.customerType)
        _self.customerType = temp.customerTypes;
        _self.impLevel = temp.customerrating;
        _self.sf_yn = temp.sf_yn;
        _self.importance = temp.importance;
        _self.area.reverse();
        let temp2 = _self.$changeCars(_self.customerType);
        console.log(temp2);
        // 二级联动改一级
        _self.customerTypeArr = [];
        for (let i = 0; i < _self.customerType.length; i++) {
          var temp = {};
          if (_self.customerType[i].children != null) {
            for (let j = 0; j < _self.customerType[i].children.length; j++) {
              temp = {};
              temp.id = _self.customerType[i].children[j].id;
              temp.typecode = _self.customerType[i].children[j].typecode;
              temp.typename = _self.customerType[i].children[j].typename;
              temp.pid = _self.customerType[i].children[j].pid;
              temp.ptypename = _self.customerType[i].typename;
              temp.ptypecode = _self.customerType[i].typecode;
              _self.customerTypeArr.push(temp);
            }
          } else {
            temp = {};
            temp.id = _self.customerType[i].id;
            temp.typecode = _self.customerType[i].typecode;
            temp.ptypename = _self.customerType[i].typename;
            temp.typename = "";
            temp.pid = 0;
            _self.customerTypeArr.push(temp);
          }
          //  修改成规定的模型
          _self.customerType[i].value = _self.customerType[i].id;
          _self.customerType[i].label = _self.customerType[i].typename;
          if (_self.customerType[i].children != null) {
            for (let j = 0; j < _self.customerType[i].children.length; j++) {
              _self.customerType[i].children[j].value =
                _self.customerType[i].children[j].id;
              _self.customerType[i].children[j].label =
                _self.customerType[i].children[j].typename;
            }
          }
        }
      }

      this.$GetDataCenter(params, finish);
      // var url = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=customerTypes,cluesources,customerrating,area,sf_yn`;
      // this.$http.get(url).then(function(res) {
      //     // console.log(res.data.data)
      //     var temp = res.data.data;
      //     _self.area = temp.area;
      //     _self.cluesource = temp.cluesources;
      //     // console.log(temp.customerType)
      //     _self.customerType = temp.customerTypes;
      //     _self.impLevel = temp.customerrating;
      //     _self.sf_yn = temp.sf_yn;
      //     _self.area.reverse()
      //     let temp2 = _self.$changeCars(_self.customerType)
      //     console.log(temp2)
      //     // 二级联动改一级
      //     _self.customerTypeArr = []
      //     for(let i = 0;i<_self.customerType.length;i++){
      //         var temp = {}
      //         if(_self.customerType[i].children != null){
      //             for(let j = 0;j<_self.customerType[i].children.length; j++ ){
      //             temp = {}
      //             temp.id = _self.customerType[i].children[j].id
      //             temp.typecode = _self.customerType[i].children[j].typecode
      //             temp.typename = _self.customerType[i].children[j].typename
      //             temp.pid = _self.customerType[i].children[j].pid
      //             temp.ptypename = _self.customerType[i].typename
      //             temp.ptypecode = _self.customerType[i].typecode
      //             _self.customerTypeArr.push(temp)
      //             }
      //         }else{
      //             temp = {}
      //             temp.id = _self.customerType[i].id
      //             temp.typecode = _self.customerType[i].typecode
      //             temp.ptypename = _self.customerType[i].typename
      //             temp.typename = ''
      //             temp.pid = 0
      //             _self.customerTypeArr.push(temp)
      //         }
      //         //  修改成规定的模型
      //         _self.customerType[i].value = _self.customerType[i].id
      //         _self.customerType[i].label = _self.customerType[i].typename
      //         if(_self.customerType[i].children != null){

      //             for(let j = 0;j<_self.customerType[i].children.length; j++ ){

      //             _self.customerType[i].children[j].value= _self.customerType[i].children[j].id
      //             _self.customerType[i].children[j].label = _self.customerType[i].children[j].typename

      //             }
      //         }
      //     }
      //     console.log(_self.customerType)
      // })
    },

    getLabelData() {
      var _self = this;
      _self.$ButtonCollect("marketingManagement_index_entry_add");
      _self.data3 = [];
      this.$http
        .get("/api/system/label/list?page=1&pageSize=10")
        .then(function(data) {
          var response = data.data.data.rows;

          var length = response.length;
          _self.pageTotal2 = data.data.data.total;

          let _customerlabelGroup = [];
          for (var i = 0; i < length; i++) {
            var reponseObj = {};
            reponseObj.labelName = response[i].labelName;
            reponseObj.id = response[i].id;
            for (let i = 0; i < _self.customerlabelGroup.length; i++) {
              if (
                reponseObj.labelName == _self.customerlabelGroup[i].labelName
              ) {
                reponseObj._checked = true;
                _customerlabelGroup.push(reponseObj);
              }
            }
            _self.data3.push(reponseObj);
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    selectionChange(e) {
      let _self = this;
      if (_self.customerlabelGroup.length == 0) {
        _self.customerlabelGroup = e;
      } else {
        for (let i = 0; i < e.length; i++) {
          let _count = 0;
          for (let j = 0; j < _self.customerlabelGroup.length; j++) {
            if (e[i].id == _self.customerlabelGroup[j].id) {
              break;
            } else {
              _count++;
            }
          }
          if (_count == _self.customerlabelGroup.length) {
            _self.customerlabelGroup.push({
              id: e[i].id,
              labelName: e[i].labelName
            });
          }
        }
      }
    },

    selectCancel(selection, row) {
      let _self = this;

      outer: for (let i = 0; i < _self.customerlabelGroup.length; i++) {
        if (row.id == _self.customerlabelGroup[i].id) {
          _self.customerlabelGroup.splice(i, 1);
          break outer;
        }
      }
    },

    /*************************标签选择改变********************************/
    checkboxChange(e) {
      let _self = this;
      _self.customerlabel = [];
      // console.log(e)
      for (let i = 0; i < e.length; i++) {
        for (let j = 0; j < _self.customerlabelGroup.length; j++) {
          if (e[i] == _self.customerlabelGroup[j].label) {
            _self.customerlabel.push(_self.customerlabelGroup[j].value);
          }
        }
      }
      _self.formValidate.customerlabel.push(_Obj);
      console.log(_self.formValidate.customerlabel);
    },

    pageChange2(index) {
      var _self = this;
      _self.page2 = index;
      _self.data3 = [];
      var url = `/api/system/label/list?page=${_self.page2}&pageSize=${
        _self.page2size
      }`;
      this.$http.get(url).then(function(data) {
        var response = data.data.data;
        // console.log('11111111111111111111111111')
        // console.log(response)
        var length = response.rows.length;
        _self.pageTotal2 = response.total;
        let _customerlabelGroup = [];
        for (var i = 0; i < length; i++) {
          var reponseObj = {};
          reponseObj.labelName = response.rows[i].labelName;
          reponseObj.id = response.rows[i].id;
          for (let i = 0; i < _self.customerlabelGroup.length; i++) {
            if (reponseObj.labelName == _self.customerlabelGroup[i].labelName) {
              reponseObj._checked = true;
              _customerlabelGroup.push(reponseObj);
            }
          }
          _self.data3.push(reponseObj);
        }
        //    _self.customerlabelGroup = _customerlabelGroup
      });
    },
    pageSizeChange2(index) {
      var _self = this;
      _self.page2size = index;
      _self.data3 = [];
      var url = `/api/system/label/list?page=${_self.page2}&pageSize=${
        _self.page2size
      }`;
      this.$http.get(url).then(function(data) {
        var response = data.data.data;
        var length = response.rows.length;
        _self.pageTotal2 = response.total;
        let _customerlabelGroup = [];
        for (var i = 0; i < length; i++) {
          var reponseObj = {};
          reponseObj.labelName = response.rows[i].labelName;
          reponseObj.id = response.rows[i].id;
          for (let i = 0; i < _self.customerlabelGroup.length; i++) {
            if (reponseObj.labelName == _self.customerlabelGroup[i].labelName) {
              reponseObj._checked = true;
              _customerlabelGroup.push(reponseObj);
            }
          }
          _self.data3.push(reponseObj);
        }
        //    _self.customerlabelGroup = _customerlabelGroup
      });
    },
    //  新增渠道第二选项
    // checkchannel(e){
    //         var _self = this
    //         if(e == 'xzqd'){
    //             // _self.getChannelType()
    //         _self.isshowchannel = true
    //         }else{
    //             _self.isshowchannel = false
    //         }
    // },
    checkchannel(e) {
      // this.getChannelType()
      // //console.log(e)
      if (e == "xzqd") {
        this.channel_show = true;
      } else {
        this.channel_show = false;
        this.formValidate.channelTypeId = "";
      }
      if (e == "khtj") {
        this.customer_show = true;
      } else {
        this.customer_show = false;
      }
      if (e == "ldtj") {
        this.leader_show = true;
      } else {
        this.leader_show = false;
      }
    },
    //  获取渠道类型
    getChannelType() {
      var _self = this;
      _self.ChannelType = [];
      this.$http
        .get("api/channel/type/queryUserChannel?type=xs")
        .then(function(data) {
          // console.log(data.data.data)
          for (let i = 0; i < data.data.data.length; i++) {
            var temp = {};
            temp.channel_type_name = data.data.data[i].channel_type_name;
            temp.channel_type_code = data.data.data[i].channel_type_code;
            temp.id = data.data.data[i].id;
            _self.ChannelType.push(temp);
          }
        });
    }
  },
  mounted() {
    this.getChannelType();
    this.getLabelData();
    this.getDataCenter();
  },
  created() {}
};
</script>


