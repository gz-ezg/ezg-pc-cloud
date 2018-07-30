<template>
    <div>
        <Row>
            <Col :span="showwidth">
                <Card v-if="groupDataCenter">
                    <Row style="margin-bottom:10px">
                        <Collapse v-model="search_model">
                            <Panel name="1">
                                <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                                筛选
                                <div slot="content" @keydown.enter="search">
                                    <Form ref="searchModel" :model="searchModel" :label-width="100">
                                        <Row :gutter="16">
                                            <Col span="6">
                                                <FormItem prop="msgrulename" label="规则名称：">
                                                    <Input size="small" type="text" v-model="searchModel.msgrulename" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="6">
                                                <FormItem prop="msgruledetail" label="规则详情：">
                                                    <Input size="small" type="text" v-model="searchModel.msgruledetail" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="6">
                                                <FormItem prop="msgrulecode" label="规则编码：">
                                                    <Input size="small" type="text" v-model="searchModel.msgrulecode" placeholder="">
                                                    </Input>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <FormItem>
                                            <Button type="primary" @click="search">查看</Button>
                                            <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </Panel>
                        </Collapse>
                    </Row>
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="plus" @click="dataAdd">录入</Button>
                            <Button type="primary" icon="edit" @click="dataEdit">编辑</Button>
                            <Button type="primary" icon="search" @click="dataCheck">查看</Button>
                        </ButtonGroup>
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table
                                highlight-row 
                                border
                                size="small"
                                :columns="fatherDataHeader"
                                @on-current-change="selectFatherRow"
                                :data="fatherData"></Table>
                        <Page
                                size="small"
                                :total="pageTotal"
                                :page-size = "pageSize"
                                show-total
                                show-sizer
                                show-elevator
                                :current.sync="page"
                                @on-change="pageChange"
                                @on-page-size-change="pageSizeChange"
                                style="margin-top: 10px"></Page>
                    </Row>
                </Card>
            </Col>
        </Row>
        <!-- 模态框 -->
        <Modal
            :title="father_detail_title"
            width="600"
            v-model="open_father_data"
            @on-cancel="close_father_data">
            <Form ref="dataModel" :model="dataModel" :rules="dataModelRule" :label-width="100">
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="msgrulename" label="规则名称：">
                            <Input size="small" type="text" v-model="dataModel.msgrulename" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="msgruledetail" label="规则详情：">
                            <Input size="small" type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="dataModel.msgruledetail" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="msgrulecode" label="规则编码：">
                            <Input size="small" type="text" v-model="dataModel.msgrulecode" placeholder="">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row long style="margin-bottom: 10px">短信规则联系人</Row>
                <Button size="small" type="primary" icon="plus" @click="addUser">添加</Button>
                <Button size="small" type="primary" icon="edit" @click="deleteUser">删除</Button>
                <Row style="margin-top: 10px;">
                        <Table 
                                highlight-row
                                :columns="childDataHeader"
                                :data="childData"
                                @on-current-change="selectChildRow"></Table>
                        <Page
                                size="small"
                                :total="childTotal"
                                show-total
                                show-elevator
                                :current.sync="childPage"
                                @on-change="childPageChange"
                                style="margin-top: 10px"></Page>
                    </Row>
            </Form>
            <div slot="footer">
                    <Button size="small" type="primary" v-if="isADD" :loading="button_loading" @click="save">确定</Button>
                    <Button size="small" type="ghost" style="margin-left:20px" @click="close">关闭</Button>
                </div>
        </Modal>
        <!-- 添加用户 -->
        <Modal
            title="添加用户"
            width="600"
            v-model="open_add_user"
            @on-cancel="close_add_user">
            <Form ref="addModel" :model="addModel" :rules="addModelRule" :label-width="100">
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="realname" label="选择用户：">
                            <Input size="small" readonly v-model="addModel.realname" placeholder=""  style="width: 180px">
                            </Input>
                            <Button  size="small" type="error" icon="search" @click="selectUserData">选择用户</Button>
                            
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem prop="departname" label="选择组织：">
                            <Input size="small" readonly v-model="addModel.departname" placeholder=""  style="width: 180px">
                            </Input>
                            <Button size="small" type="error" icon="search" @click="selectGroupData">选择部门</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                    <Button size="small" type="primary" v-if="isADD" :loading="button_loading" @click="saveUserData">确定</Button>
                    <Button size="small" type="ghost" style="margin-left:20px" @click="closeAdd">关闭</Button>
                </div>
        </Modal>
        <!-- 选择用户 -->
        <Modal
            title="选择用户"
            width="1000"
            v-model="open_select_user"
            @on-cancel="close_select_user">
            <Row style="margin-top: 10px;">
              <Col span="5">
                 <Tree :data="departTree" show-checkbox @on-check-change="getCheckedNodes" ></Tree>
              </Col>
              <Col span="19">
                <Form ref="searchUserModel" :model="searchUserModel" :label-width="100">
                      <Row :gutter="16">
                          <Col span="10">
                              <FormItem prop="msgusername" label="用户名：">
                                  <Input size="small" type="text" v-model="searchUserModel.msgusername" placeholder="">
                                  </Input>
                              </FormItem>
                          </Col>
                          <Col span="10">
                              <FormItem prop="realusername" label="真实姓名：">
                                  <Input size="small" type="text" v-model="searchUserModel.realusername" placeholder="">
                                  </Input>
                              </FormItem>
                          </Col>
                      </Row>
                      <FormItem>
                          <Button type="primary" @click="userSearch">查询</Button>
                          <Button type="ghost" style="margin-left:20px" @click="userReset">重置</Button>
                      </FormItem>
                </Form>
                  <Table 
                        highlight-row
                        border
                        :columns="userDataHeader"
                        :data="userData"
                        height="400"
                        @on-current-change="selectUserRow"></Table>
                  <Page
                        size="small"
                        :total="userTotal"
                        show-total
                        show-elevator
                        :current.sync="userPage"
                        @on-change="userPageChange"
                        style="margin-top: 10px"></Page>

              </Col>
            </Row>
            <div slot="footer">
                    <Button size="small" type="primary" v-if="isADD" :loading="button_loading" @click="addsSelectUser">确定</Button>
                    <Button size="small" type="ghost" style="margin-left:20px" @click="closeUser">关闭</Button>
                </div>
        </Modal>
        <!-- 选择组织 -->
        <Modal
            title="选择组织"
            width="400"
            v-model="open_select_group"
            @on-cancel="close_select_group">
            <Row :gutter="16" style="margin-top: 10px;">
                 <Tree :data="groupTree" show-checkbox  @on-check-change="getGroupCheckedNodes"></Tree>
            </Row>
            <div slot="footer">
                    <Button size="small" type="primary" v-if="isADD" :loading="button_loading" @click="addGroup">确定</Button>
                    <Button size="small" type="ghost" style="margin-left:20px" @click="closeGroup">关闭</Button>
                </div>
        </Modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
      groupDataCenter: true,
      button_loading: false,
      //  页面展示方式相关
      showwidth: 24,
      //   isOpenDetail: false,
      //  筛选相关
      search_model: "",
      searchModel: {
        msgrulename: "",
        msgruledetail: "",
        msgrulecode: ""
      },
      // 用户选择查询
      searchUserModel: {
        msgusername: "",
        realusername: ""
      },
      //  一级字典表格相关
      current_father_row: [],
      page: 1,
      pageSize: 10,
      pageTotal: new Number(),
      fatherDataHeader: [
        {
          title: "规则名称",
          key: "msgrulename"
        },
        {
          title: "规则详情",
          key: "msgruledetail"
        },
        {
          title: "规则编码",
          key: "msgrulecode"
        }
      ],
      fatherData: [],
      //  新增
      open_father_data: false,
      dataModel: {
        id: "",
        msgrulename: "",
        msgruledetail: "",
        msgrulecode: ""
      },
      dataModelRule: {
        msgrulename: [
          { required: true, trigger: "blur", message: "规则名称不能为空！" }
        ],
        msgruledetail: [
          { required: true, trigger: "blur", message: "规则详情不能为空！" }
        ],
        msgrulecode: [
          { required: true, trigger: "blur", message: "规则编码不能为空！" }
        ]
      },
      //  一级短信规则弹出框相关
      father_detail_title: "",
      isADD: true,
      childTotal: new Number(),
      childPage: 1,

      childDataHeader: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "关联用户名称",
          key: "realname"
        },
        {
          title: "关联部门",
          key: "departname"
        }
      ],
      childData: [],
      // 添加用户
      open_add_user: false,
      addModel: {
        id: "",
        realname: "",
        departname: ""
      },
      addModelRule: {
        realname: [
          { required: true, trigger: "blur", message: "选择用户不能为空！" }
        ],
        departname: [
          { required: true, trigger: "blur", message: "选择组织不能为空！" }
        ]
      },
      // 选中用户表格
      current_child_row: [],
      // 选择用户
      // selectionUserName: [],
      current_user_row: [],
      userTotal: new Number(),
      userPage: 1,
      departTree: [],
      groupTree: [],
      check_depart_id: "",
      open_select_user: false,
      userDataHeader: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "用户名",
          key: "username"
        },
        {
          title: "组织机构",
          key: "departname",
          width: 230,
          ellipsis: true
        },
        {
          title: "真实姓名",
          key: "realname"
        },
        {
          title: "角色",
          key: "userkey",
          width: 230,
          ellipsis: true
        },
        {
          title: "状态",
          key: "status"
        }
      ],
      userData: [],
      // 选择组织
      open_select_group: false,
      close_select_grop: false,
      groupNameArr: []
    };
  },
  methods: {
    search() {
      this.page = 1;
      // this.pageSize = 10;
      this.getData();
    },
    reset() {
      this.$refs["searchModel"].resetFields();
      this.page = 1;
      this.pageSize = 10;
      this.getData();
    },
    pageChange(e) {
      this.page = e;
      this.getData();
    },
    childPageChange(e) {
      console.log("1111111111");
    },
    userPageChange(e) {
      this.userPage = e;
      this.getUserData();
    },
    pageSizeChange(e) {
      this.pageSize = e;
      this.getData();
    },
   
    getData() {
      let _self = this;
      let url = "api/system/queryMsgrule/list";
      let config = {
        params: {
          page: _self.page,
          pageSize: _self.pageSize,
          msgruleName: _self.searchModel.msgrulename,
          msgruleDetail: _self.searchModel.msgruledetail,
          msgruleCode: _self.searchModel.msgrulecode
        }
      };
      this.$http.get(url, config).then(function(res) {
        _self.$backToLogin(res);
        if (res.data.msgCode == "40000") {
          _self.fatherData = res.data.data.rows;
          _self.pageTotal = res.data.data.total;
        } else {
          _self.$Message.error(res.data.msg);
        }
      });
    },
    //  获取当前点击行
    selectFatherRow(e) {
      this.current_father_row = e;
    },
    selectChildRow(e){
      this.current_child_row = e;
      console.log(this.current_child_row);
    },
    dataAdd() {
      this.open_father_data = true;
      this.father_detail_title = "录入";
      this.isADD = true;
      this.$refs["dataModel"].resetFields();
    },
    dataEdit() {
      if (this.current_father_row == "" || this.current_father_row == null) {
        this.$Message.warning("请选择一行进行编辑！");
      } else {
        this.open_father_data = true;
        this.dataModel = this.current_father_row;
        this.father_detail_title = "编辑";
        this.isADD = true;
      }
    },
    dataCheck() {
      if (this.current_father_row == "" || this.current_father_row == null) {
        this.$Message.warning("请选择一行进行查看！");
      } else {
        this.open_father_data = true;
        this.dataModel = this.current_father_row;
        this.father_detail_title = "查看";
        this.isADD = false;
      }
    },
    // 确定
     save() {
      let _self = this;
      // console.log(this.dataModel)
      this.$refs["dataModel"].validate(valid => {
        if (valid) {
          _self.button_loading = true;
          let url = "";
          let config = "";
          if (_self.isADD) {
            //  录入
            url = `api/system/saveTSTypeGroup`;
            config = {
              typegroupcode: _self.dataModel.typegroupcode,
              typegroupname: _self.dataModel.typegroupname
            };
          } else {
            //  编辑
            url = `api/system/updateTSTypeGroup`;
            config = {
              id: _self.dataModel.ID,
              typegroupcode: _self.dataModel.typegroupcode,
              typegroupname: _self.dataModel.typegroupname
            };
          }
          _self.$http
            .post(url, config)
            .then(function(res) {
              _self.$backToLogin(res);
              if (res.data.msgCode == "40000") {
                _self.$Message.success(res.data.msg);
                _self.button_loading = false;
                _self.open_father_data = false;
                _self.current_father_row = "";
                _self.getData();
              } else {
                _self.$Message.error(res.data.msg);
                _self.button_loading = false;
              }
            })
            .catch(function(res) {
              _self.$Message.error("网络错误！");
              _self.button_loading = false;
            });
        } else {
          _self.$Message.warning("请输入信息！");
        }
      });
    },
    // save() {
    //   let _self = this;
    //   // console.log(this.dataModel)
    //   this.$refs["dataModel"].validate(valid => {
    //     if (valid) {
    //       _self.button_loading = true;
    //       let url = "";
    //       let config = "";
    //       if (_self.isADD) {
    //         //  录入
    //         url = `api/system/saveTSTypeGroup`;
    //         config = {
    //           typegroupcode: _self.dataModel.typegroupcode,
    //           typegroupname: _self.dataModel.typegroupname
    //         };
    //       } else {
    //         //  编辑
    //         url = `api/system/updateTSTypeGroup`;
    //         config = {
    //           id: _self.dataModel.ID,
    //           typegroupcode: _self.dataModel.typegroupcode,
    //           typegroupname: _self.dataModel.typegroupname
    //         };
    //       }
    //       _self.$http
    //         .post(url, config)
    //         .then(function(res) {
    //           _self.$backToLogin(res);
    //           if (res.data.msgCode == "40000") {
    //             _self.$Message.success(res.data.msg);
    //             _self.button_loading = false;
    //             _self.open_father_data = false;
    //             _self.current_father_row = "";
    //             _self.getData();
    //           } else {
    //             _self.$Message.error(res.data.msg);
    //             _self.button_loading = false;
    //           }
    //         })
    //         .catch(function(res) {
    //           _self.$Message.error("网络错误！");
    //           _self.button_loading = false;
    //         });
    //     } else {
    //       _self.$Message.warning("请输入信息！");
    //     }
    //   });
    // },
    // 关闭
    close() {
      this.open_father_data = false;
    },
    close_father_data() {
      this.open_father_data = false;
    },

    addUser() {
      this.open_add_user = true;
      this.$refs["addModel"].resetFields();
    },
    // 删除短信联系人
    deleteUser(){
      console.log("删除");

      

    },
    // 添加用户确定按钮
    saveUserData() {
      // console.log("添加用户确定按钮");
      let _self = this;
      _self.open_add_user = false;
      console.log(_self.childData);
      
      // console.log(_self.addModel);
      
      _self.childData.push(_self.addModel);
      
    },
    close_add_user() {
      this.open_add_user = false;
    },
    closeAdd() {
      this.open_add_user = false;
    },
    // 选择用户
    selectUserData() {
      this.open_select_user = true;
      // this.getUserData();
    },
    selectUserRow(e) {
      this.current_user_row = e;
    },
    
    // userSelection(e){
    //   // let _self = this;
    //   // _self.selectionUserName = [];
    //   // for (let i = 0; i < e.length; i++) {
    //   //   let _group = {};
    //   //   _group.realname = e[i].realname;
    //   //   _group.id = e[i].id;
    //   //   _self.selectionUserName.push(_group);
    //   // }
    // },
    addsSelectUser() {
      console.log(this.current_user_row);
      this.open_select_user = false;
      this.addModel.realname = this.current_user_row.realname;
    },
    // 查询用户
    userSearch() {
      this.page = 1;
      this.pageSize = 10;
      this.getUserData();
    },
    userReset() {
      this.$refs["searchUserModel"].resetFields();
      this.userPage = 1;
      this.getUserData();
    },
    close_select_user() {
      this.open_select_user = false;
    },
    closeUser() {
      this.open_select_user = false;
    },
    //按部门查询用户信息
    getUserData() {
      let _self = this;
      let url = "api/user/list";
      let config = {
        params: {
          page: _self.userPage,
          pageSize: 10,
          realname: _self.searchUserModel.realusername,
          mobilephone: "",
          username: _self.searchUserModel.msgusername,
          roleid: "",
          rolecode: "",
          rolename: "",
          departid: _self.check_depart_id
        }
      };
      this.$http.get(url, config).then(function(res) {
        _self.$backToLogin(res);
        if (res.data.msgCode == "40000") {
          let userArray = res.data.data.rows;
          for (let i = 0; i < userArray.length; i++) {
            const element = userArray[i];
            if (element.status == "1") {
              element.status = "激活";
            } else {
              element.status = "未激活";
            }
          }
          _self.userData = userArray;
          _self.userTotal = res.data.data.total;
        } else {
          _self.$Message.error(res.data.msg);
        }
      });
    },

    getCheckedNodes(e) {
      let _self = this;
      if (e.length == 0) {
        _self.check_depart_id = "";
      } else {
        _self.check_depart_id = e[0].ID;
      }
      this.getUserData();
    },
    getGroupCheckedNodes(e) {
      let _self = this;
      if (e.length == 0) {
        console.log("部门为空");
        _self.groupNameArr = [];
      } else {
        _self.groupNameArr = [];
        for (let i = 0; i < e.length; i++) {
          let _group = {};
          _group.departname = e[i].departname;
          _group.ID = e[i].ID;
          _self.groupNameArr.push(_group);
        }
      }
    },
    getAllDepartTree() {
      let _self = this;
      let url = `api/system/depart/tree/list`;
      let config = {};

      function success(res) {
        _self.departTree = res.data.data;
        // console.log(_self.allDepart)
        for (let i = 0; i < _self.departTree.length; i++) {
          _self.departTree[i].title = _self.departTree[i].departname;
          if (_self.departTree[i].children) {
            for (let j = 0; j < _self.departTree[i].children.length; j++) {
              _self.departTree[i].children[j].title =
                _self.departTree[i].children[j].departname;
              if (_self.departTree[i].children[j].children) {
                for (
                  let k = 0;
                  k < _self.departTree[i].children[j].children.length;
                  k++
                ) {
                  _self.departTree[i].children[j].children[k].title =
                    _self.departTree[i].children[j].children[k].departname;
                  if (_self.departTree[i].children[j].children[k].children) {
                    for (
                      let t = 0;
                      t <
                      _self.departTree[i].children[j].children[k].children
                        .length;
                      t++
                    ) {
                      _self.departTree[i].children[j].children[k].children[
                        t
                      ].title =
                        _self.departTree[i].children[j].children[k].children[
                          t
                        ].departname;
                    }
                  }
                }
              }
            }
          }
        }
      }

      this.$Get(url, config, success);
    },
    getAllGroupTree() {
      let _self = this;
      let url = `api/system/depart/tree/list`;
      let config = {};

      function success(res) {
        _self.groupTree = res.data.data;
        // console.log(_self.allDepart)
        for (let i = 0; i < _self.groupTree.length; i++) {
          _self.groupTree[i].title = _self.groupTree[i].departname;
          if (_self.groupTree[i].children) {
            for (let j = 0; j < _self.groupTree[i].children.length; j++) {
              _self.groupTree[i].children[j].title =
                _self.groupTree[i].children[j].departname;
              if (_self.groupTree[i].children[j].children) {
                for (
                  let k = 0;
                  k < _self.groupTree[i].children[j].children.length;
                  k++
                ) {
                  _self.groupTree[i].children[j].children[k].title =
                    _self.groupTree[i].children[j].children[k].departname;
                  if (_self.groupTree[i].children[j].children[k].children) {
                    for (
                      let t = 0;
                      t <
                      _self.groupTree[i].children[j].children[k].children
                        .length;
                      t++
                    ) {
                      _self.groupTree[i].children[j].children[k].children[
                        t
                      ].title =
                        _self.groupTree[i].children[j].children[k].children[
                          t
                        ].departname;
                    }
                  }
                }
              }
            }
          }
        }
      }

      this.$Get(url, config, success);
    },
    // 选择组织
    selectGroupData() {
      this.open_select_group = true;
    },
    close_select_group() {
      this.open_select_group = false;
    },
    closeGroup(){
      this.open_select_group = false;
    },
    addGroup(){
      this.open_select_group = false;
      console.log(this.groupNameArr);
      this.addModel.departname = this.groupNameArr[0].departname;
    }
  },
  mounted() {
    this.getAllDepartTree();
    this.getAllGroupTree();
    // this.getTableData()
  },
  created() {
    this.getData();
    this.getUserData();
    let _self = this;
    this.$bus.on("open_groups_data", e => {
      _self.groupDataCenter = true;
    });
  }
};
</script>
