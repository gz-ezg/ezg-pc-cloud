<template>
  <div>
    <Row>
      <Col span="11">
        <Card>
          <Row>
            <ButtonGroup>
              <Button v-permission="['channelT.add']" type="primary" icon="plus" @click="addT">新增</Button>
              <Button
                v-permission="['channelT.edit']"
                type="primary"
                icon="edit"
                @click="TypeEdit"
              >编辑</Button>
              <Button
                v-permission="['channelT.delete']"
                type="primary"
                icon="edit"
                @click="deleteType"
              >删除</Button>
            </ButtonGroup>
            <!-- <Poptip trigger="click" title="筛选" style="float:right" placement="bottom-end">
                            <Button type="text" icon="funnel">筛选</Button>
                            <div slot="content" @keydown.enter="search_channel">
                                <Form ref="searchformInline" :model="searchformInline" :label-width="60">
                                    <Row>
                                    
                                            <FormItem prop="channelTypeName" label="渠道名称：">
                                                <Input type="text" v-model="searchformInline.channelTypeName" placeholder="" style="width:180px">
                                                </Input>
                                            </FormItem>
                                    </Row>
                                    <FormItem>
                                        <Button type="primary" @click="search_channel">搜索</Button>
                                        <Button type="ghost" style="margin-left:20px;margin-bottom:0" @click="reset_channel">重置</Button>
                                    </FormItem>
                                </Form>
                            </div>
            </Poptip>-->
            <Col span="6" style="float:right">
              <Input
                v-model="searchLabel"
                placeholder="输入标签名称搜索"
                @on-keydown.enter="searchLabelData"
              >
                <Button slot="append" icon="ios-search" @click="searchLabelData"></Button>
              </Input>
            </Col>
          </Row>
          <Row style="margin-top: 10px;">
            <Table
              highlight-row
              size="small"
              :columns="columns"
              :data="data"
              @on-current-change="selectRow"
              @on-row-dblclick="TypeEdit"
            ></Table>
            <Page
              size="small"
              :total="pageTotal"
              show-total
              show-sizer
              show-elevator
              @on-change="pageChange"
              @on-page-size-change="pageSizeChange"
              style="margin-top: 10px"
            ></Page>
          </Row>
        </Card>
      </Col>
      <Col span="11" v-if="channelId != ''">
        <Card>
          <Row style="margin-top: 10px;">
            <Tabs value="name1">
              <TabPane label="渠道用户" name="name1">
                <Row>
                  <ButtonGroup>
                    <Button
                      v-permission="['channelT.cannel.add']"
                      type="primary"
                      icon="plus"
                      @click="addq('qd')"
                    >新增</Button>
                  </ButtonGroup>
                  <!-- <Poptip trigger="click" title="筛选" style="float:right" placement="bottom-end">
                                                <Button type="primary" icon="search">筛选</Button>
                                                <div slot="content" @keydown.enter="search_channel">
                                                    <Form ref="searchformInline" :model="searchformInline" :label-width="60">
                                                        <Row>
                                                        
                                                                <FormItem prop="channelTypeName" label="渠道名称：">
                                                                    <Input type="text" v-model="searchformInline.channelTypeName" placeholder="" style="width:180px">
                                                                    </Input>
                                                                </FormItem>
                                                        </Row>
                                                        <FormItem>
                                                            <Button type="primary" @click="search_channel">搜索</Button>
                                                            <Button type="ghost" style="margin-left:20px;margin-bottom:0" @click="reset_channel">重置</Button>
                                                        </FormItem>
                                                    </Form>
                                                </div>
                  </Poptip>-->
                </Row>
                <Row style="margin-top: 10px;">
                  <Table highlight-row border :columns="columns2" :data="data2" size="small"></Table>
                  <Page
                    size="small"
                    :total="pageTotalq"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="pageChangeq"
                    @on-page-size-change="pageSizeChangeq"
                    style="margin-top: 10px"
                  ></Page>
                </Row>
              </TabPane>
              <TabPane label="销售" name="name2">
                <Row>
                  <ButtonGroup>
                    <Button
                      v-permission="['channelT.sales.add']"
                      type="primary"
                      icon="plus"
                      @click="addq('xs')"
                    >新增</Button>
                  </ButtonGroup>
                </Row>
                <Row style="margin-top: 10px;">
                  <Table highlight-row border :columns="columns4" :data="data4" size="small"></Table>
                  <Page
                    size="small"
                    :total="pageTotalx"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="pageChangex"
                    @on-page-size-change="pageSizeChangex"
                    style="margin-top: 10px"
                  ></Page>
                </Row>
              </TabPane>
            </Tabs>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal
      v-model="addType"
      :title="title"
      :loading="loading"
      @on-ok="postAdd('formValidate')"
      @on-cancel="cancel('formValidate')"
      width="40%"
    >
      <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="90">
        <FormItem label="渠道名称" prop="channelTypeName">
          <Input size="small" v-model="formValidate.channelTypeName"/>
        </FormItem>
        <FormItem label="渠道编码" prop="channelTypeCode">
          <Input size="small" v-model="formValidate.channelTypeCode"/>
        </FormItem>
        <FormItem label="省市区">
          <Cascader :data="provinceData" v-model="province"></Cascader>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="addCannelUser" title="新增" width="40%" @on-cancel="clean">
      <Row>
        <Col span="12">
          <Checkbox v-model="single" v-if="!isQd">
            <Icon type="information-circled"></Icon>
            <span>是否设置该销售为主要负责人</span>
          </Checkbox>
          <div style="visibility:hidden">..</div>
        </Col>
        <Col span="12">
          <Poptip trigger="click" title="筛选" style="float:right" placement="bottom-end">
            <Button type="text" icon="funnel">筛选</Button>
            <div slot="content" @keydown.enter="usersearch">
              <Form ref="UsersearchformInline" :model="UsersearchformInline" :label-width="60">
                <Row>
                  <FormItem prop="realname" label="真实姓名：">
                    <Input
                      type="text"
                      v-model="UsersearchformInline.realname"
                      placeholder
                      style="width:180px"
                    ></Input>
                  </FormItem>
                </Row>
                <Row>
                  <FormItem prop="mobilephone" label="电话：">
                    <Input
                      type="text"
                      v-model="UsersearchformInline.mobilephone"
                      placeholder
                      style="width:180px"
                    ></Input>
                  </FormItem>
                </Row>
                <FormItem>
                  <Button type="primary" @click="usersearch">搜索</Button>
                  <Button
                    type="ghost"
                    style="margin-left:20px;margin-bottom:0"
                    @click="userreset"
                  >重置</Button>
                </FormItem>
              </Form>
            </div>
          </Poptip>
        </Col>
      </Row>
      <Table
        style="margin-top: 10px"
        highlight-row
        :columns="columns3"
        :data="data3"
        size="small"
        @on-row-dblclick="addUserClick"
      ></Table>
      <Page
        size="small"
        :total="pageTotala"
        show-total
        show-sizer
        show-elevator
        @on-change="pageChangea"
        @on-page-size-change="pageSizeChangea"
        :current.sync="pagea"
        style="margin-top: 10px"
      ></Page>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "channelType_index",
  data() {
    return {
      provinceData: [],
      province: [],
      searchLabel: "",
      isSearch: false,
      UsersearchformInline: {
        realname: "",
        mobilephone: ""
      },
      user_search: false,
      loading: true,
      isAdd: false,
      isQd: false,
      isEdit: false,
      addType: false,
      addCannelUser: false,
      page: 1,
      pageSize: 10,
      pageTotal: new Number(),
      pageq: 1,
      pageSizeq: 10,
      pageTotalq: new Number(),
      pagea: 1,
      pageSizea: 10,
      pageTotala: new Number(),
      pagex: 1,
      pageSizex: 10,
      pageTotalx: new Number(),
      title: "",
      channelId: "",
      channelName: "",
      channelCode: "",
      qudao: "",
      single: false,
      data: [],
      data2: [],
      data3: [],
      data4: [],
      formValidate: {
        channelTypeName: "",
        channelTypeCode: ""
      },
      ruleValidate: {
        channelTypeName: [
          { required: true, message: "请填写渠道名称", trigger: "blur" }
        ],
        channelTypeCode: [
          { required: true, message: "请填写渠道编码", trigger: "blur" }
        ]
      },
      columns: [
        {
          title: "渠道编码",
          key: "channel_type_code"
          // width:160
        },
        {
          title: "渠道名称",
          key: "channel_type_name"
          // width:160
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          width: 70,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.getUser(params.row.id);
                    }
                  }
                },
                "用户"
              )
            ]);
          }
        }
      ],
      columns2: [
        {
          title: "用户id",
          key: "user_id"
          // width:160
        },
        {
          title: "真实姓名",
          key: "userRealName"
          // width:160
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          width: 70,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.deleteUser(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      columns3: [
        {
          title: "用户名",
          key: "username"
        },
        {
          title: "真实姓名",
          key: "realname"
        },
        {
          title: "电话",
          key: "mobilephone"
        }
      ],
      columns4: [
        {
          title: "用户id",
          key: "user_id"
        },
        {
          title: "真实姓名",
          key: "userRealName"
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          width: 70,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.deleteUser(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      searchformInline: {
        channelTypeName: ""
      }
    };
  },
  methods: {
    searchLabelData() {
      if (this.searchLabel == "") {
        this.isSearch = false;
      } else {
        this.isSearch = true;
      }
      this.getTableData();
    },
    search_channel() {
      this.page = 1;
      this.getTableData();
    },
    reset_channel() {
      this.searchformInline.channelTypeName = "";
      this.page = 1;
      this.getTableData();
    },
    // 获取表格数据
    getTableData() {
      let _self = this;
      if (_self.searchLabel == "") {
        var url =
          "/channel/type/list?page=" +
          _self.page +
          "&pageSize=" +
          _self.pageSize;
      } else {
        var url =
          "/channel/type/list?page=" +
          _self.page +
          "&pageSize=" +
          _self.pageSize +
          "&channelTypeName=" +
          _self.searchLabel;
      }

      function doSuccess(re) {
        let _data = re.data.data;
        _self.pageTotal = _data.total;
        _self.data = [];
        for (let i = 0; i < _data.rows.length; i++) {
          _self.data.push({
            id: _data.rows[i].id,
            channel_type_code: _data.rows[i].channel_type_code,
            channel_type_name: _data.rows[i].channel_type_name,
            province: _data.rows[i].province,
            city: _data.rows[i].city,
            area: _data.rows[i].area
          });
        }
      }

      this.GetData(url, doSuccess);
    },
    getProvice() {
      if (this.provinceData.length) {
        return;
      }
      let url = "/product/area/getProvinceList";
      let doSuccess = resp => {
        this.provinceData = resp.data.data.map(v => {
          if (!!v.city) {
            v.children = v.city.map(cityItem => {
              if (!!cityItem.areas) {
                cityItem.children = cityItem.areas.map(areasItem => {
                  return {
                    value: areasItem.id,
                    label: areasItem.realname
                  };
                });
              }
              return {
                value: cityItem.id,
                label: cityItem.realname,
                children: cityItem.children
              };
            });
          }
          return {
            value: v.province.id,
            label: v.province.realname,
            children: v.children
          };
        });
      };
      this.PostData(url, doSuccess);
    },

    // 新增渠道类型
    postAdd(name) {
      let _self = this;

      setTimeout(() => {
        _self.loading = false;
        _self.$refs[name].validate(valid => {
          if (valid) {
            let url;
            if (_self.isAdd == true) {
              url = "/channel/type/create";
            } else if (_self.isEdit == true) {
              url = "/channel/type/update";
              _self.formValidate.id = _self.channelId;
            }

            _self.formValidate.province = this.province[0];
            _self.formValidate.city = this.province[1];
            _self.formValidate.area = this.province[2];
            function doSuccess(re) {
              _self.loading = true;
              _self.$Message.success("提交成功");
              _self.addType = false;
              _self.channelId = "";
              _self.province = [];
              _self.cancel("formValidate");
              _self.getTableData();
            }

            function doError(re) {
              _self.$nextTick(() => {
                _self.loading = true;
              });
              _self.$Message.error("提交失败!");
            }

            this.PostData(url, _self.formValidate, doSuccess, doError);
          }
        });
      }, 1000);
    },

    // 模态框取消按钮点击事件
    cancel(name) {
      this.isAdd = false;
      this.isEdit = false;
      this.$refs[name].resetFields();
    },

    // 行选中事件（存储选中行的渠道id）
    selectRow(a) {
      console.log(a);
      let _self = this;
      _self.channelId = a.id;
      _self.channelName = a.channel_type_name;
      _self.channelCode = a.channel_type_code;
      _self.province = [a.province, a.city, a.area];
      _self.getUser(a.id);
    },

    // 点击新增按钮
    addT() {
      let _self = this;

      _self.title = "新增";
      _self.isAdd = true;
      _self.addType = true;
      this.getProvice();
    },
    // 点击编辑获取数据
    TypeEdit() {
      this.getProvice();
      let _self = this;

      if (_self.channelId == "") {
        _self.$Message.warning("请选择要编辑的渠道类型");
      } else {
        _self.title = "编辑";
        _self.isEdit = true;
        _self.formValidate.channelTypeCode = _self.channelCode;
        _self.formValidate.channelTypeName = _self.channelName;
        _self.addType = true;
      }
    },

    // 删除渠道类型
    deleteType() {
      let _self = this;

      if (_self.channelId == "") {
        _self.$Message.warning("请选择要删除的渠道类型");
      } else {
        _self.$Modal.confirm({
          title: "删除",
          content: "<p>是否删除该渠道类型</p>",
          onOk: () => {
            let url = "/channel/type/del";
            let _data = {
              id: _self.channelId
            };

            function doSuccess() {
              _self.getTableData();
              _self.$Message.success("删除成功");
            }

            this.PostData(url, _data, doSuccess);
          }
        });
      }
    },

    // 【渠道类型表格】翻页
    pageChange(a) {
      let _self = this;
      _self.page = a;
      _self.getTableData();
    },

    // 【渠道类型表格】 改变页码
    pageSizeChange(a) {
      let _self = this;
      _self.pageSize = a;
      _self.getTableData();
    },

    // 获取渠道客户列表
    getUser(a) {
      let _self = this;
      let url =
        "/channel/user/list?page=" +
        _self.pageq +
        "&pageSize=" +
        _self.pageSizeq +
        "&channelTypeId=" +
        a +
        "&type=qdyh";
      let url2 =
        "/channel/user/list?page=" +
        _self.pageq +
        "&pageSize=" +
        _self.pageSizeq +
        "&channelTypeId=" +
        a +
        "&type=xs";

      function doSuccess(re) {
        let _data = re.data.data;

        _self.data2 = [];
        _self.pageTotalq = _data.total;
        for (let i = 0; i < _data.rows.length; i++) {
          _self.data2.push({
            id: _data.rows[i].id,
            channel_type_id: _data.rows[i].channel_type_id,
            user_id: _data.rows[i].user_id,
            userRealName: _data.rows[i].userRealName
          });
        }
      }
      function doSuccess2(re) {
        let _data = re.data.data;

        _self.data4 = [];
        _self.pageTotalx = _data.total;
        for (let i = 0; i < _data.rows.length; i++) {
          _self.data4.push({
            id: _data.rows[i].id,
            channel_type_id: _data.rows[i].channel_type_id,
            user_id: _data.rows[i].user_id,
            userRealName: _data.rows[i].userRealName
          });
        }
      }

      this.GetData(url, doSuccess);
      this.GetData(url2, doSuccess2);
    },

    pageChangeq(a) {
      let _self = this;
      _self.pageq = a;
      _self.getUser(_self.channelId);
    },

    pageSizeChangeq(a) {
      let _self = this;
      _self.pageSizeq = a;
      _self.getUser(_self.channelId);
    },

    pageChangex(a) {
      let _self = this;
      _self.pagex = a;
      _self.getUser(_self.channelId);
    },

    pageSizeChangex(a) {
      let _self = this;
      _self.pageSizex = a;
      _self.getUser(_self.channelId);
    },

    // 新增渠道用户按钮点击事件
    addq(a) {
      var _self = this;
      _self.qudao = a;

      if (_self.qudao == "qd") {
        _self.isQd = true;
      } else {
        _self.isQd = false;
      }
      this.getuserlist();
    },
    usersearch() {
      var _self = this;
      if (_self.user_search == false) {
        _self.pagea = 1;
      }
      _self.user_search = true;
      _self.getuserlist();
    },
    userreset() {
      var _self = this;
      _self.UsersearchformInline.realname = "";
      _self.UsersearchformInline.mobilephone = "";
      _self.pagea = 1;
      _self.getuserlist();
      _self.user_search = false;
    },
    clean() {
      var _self = this;
      _self.UsersearchformInline.realname = "";
      _self.UsersearchformInline.mobilephone = "";
    },
    pageChangea(a) {
      let _self = this;
      _self.pagea = a;
      _self.addq(_self.qudao);
    },

    pageSizeChangea(a) {
      let _self = this;
      _self.pageSizea = a;
      _self.addq(_self.qudao);
    },
    //  获取user列表
    getuserlist() {
      let _self = this;
      let url = "api/user/list";
      let _data = "";

      if (_self.isQd == true) {
        _data = "jianzhi";
      } else {
        _data = "salers";
      }

      var keys = [];
      var config = {
        params: {
          rolecode: _data,
          page: _self.pagea,
          pageSize: _self.pageSizea,
          realname: _self.UsersearchformInline.realname,
          mobilephone: _self.UsersearchformInline.mobilephone
        }
      };
      for (var key in _self.UsersearchformInline) {
        if (
          _self.UsersearchformInline[key] == "" ||
          _self.UsersearchformInline[key] == null
        ) {
          delete config.params[key];
        }
      }
      function doSuccess(re) {
        let _data = re.data.data;
        _self.addCannelUser = true;
        _self.pageTotala = _data.total;
        _self.data3 = [];

        for (let i = 0; i < _data.rows.length; i++) {
          _self.data3.push({
            id: _data.rows[i].id,
            mobilephone: _data.rows[i].mobilephone,
            realname: _data.rows[i].realname,
            username: _data.rows[i].username
          });
        }
      }

      this.$http.get(url, config).then(function(res) {
        doSuccess(res);
      });
    },

    // 删除渠道用户
    deleteUser(re) {
      let _self = this;
      let url = "/channel/user/del";
      let _data = {
        id: re.row.id
      };

      function doSuccess() {
        _self.pageq = 1;
        _self.getUser(re.row.channel_type_id);
        _self.$Message.success("删除成功");
      }

      this.PostData(url, _data, doSuccess);
    },

    // 双击确认添加用户
    addUserClick(a) {
      let _self = this;
      let url = "/channel/user/create";
      let _data = {};
      let _data2 = {};

      if (_self.isQd == true) {
        _data = {
          channelTypeId: _self.channelId,
          userId: a.id,
          type: "qdyh"
        };
      } else {
        let _single;
        if (_self.single == true) {
          _single = "Y";
        } else {
          _single = "N";
        }
        _data2 = {
          channelTypeId: _self.channelId,
          userId: a.id,
          type: "xs",
          manager: _single
        };
      }

      function doSuccess(re) {
        _self.getUser(_self.channelId);
        _self.addCannelUser = false;
        _self.single = false;
        _self.$Message.success("添加成功");
      }

      function doError(re) {
        _self.$Message.warning(re.data.msg);
        _self.single = false;
      }

      if (_self.isQd == true) {
        console.log(_data);
        this.PostData(url, _data, doSuccess, doError);
      } else {
        this.PostData(url, _data2, doSuccess, doError);
      }
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>