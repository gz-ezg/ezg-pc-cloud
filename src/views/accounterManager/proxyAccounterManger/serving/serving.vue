<template>
  <Card>
    <Row style="margin-bottom:20px">
      <Collapse v-model="search_model">
        <Panel name="1">
          <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>筛选
          <div slot="content" @keydown.enter="Search">
            <Form
              ref="SearchValidate"
              :model="SearchValidate"
              :label-width="130"
              style="margin-top: -10px"
            >
              <Row>
                <Col span="6">
                  <FormItem label="企业名称：" prop="CompanyName">
                    <Input v-model="SearchValidate.CompanyName" size="small"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="服务人员：" prop="server_realname">
                    <Input v-model="SearchValidate.server_realname" size="small"></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="结束账期：" prop="followby_realname">
                    <Input
                      v-model="SearchValidate.begin_end_period"
                      size="small"
                      style="width:40%"
                      placeholder="201807"
                    ></Input>-
                    <Input
                      v-model="SearchValidate.end_end_period"
                      size="small"
                      style="width:40%"
                      placeholder="201807"
                    ></Input>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem label="客户跟进：" prop="note_kj_flag">
                    <Select v-model="SearchValidate.note_kj_flag" size="small" style="width:100%">
                      <Option value="Y">完成</Option>
                      <Option value="N">未完成</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6">
                  <FormItem label="电子税务局状态：" prop="etaxStatus">
                    <Select v-model="SearchValidate.etaxStatus" size="small" style="width:100%">
                      <Option :value="1">账号正常</Option>
                      <Option :value="2">账号异常</Option>
                      <Option :value="3">无账号</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem>
                    <Button size="small" type="primary" @click="Search">搜索</Button>
                    <Button
                      size="small"
                      type="ghost"
                      @click="handleReset"
                      style="margin-left: 8px"
                    >重置</Button>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </Panel>
      </Collapse>
    </Row>
    <Row>
      <ButtonGroup>
        <Button type="primary" :size="small" icon="ios-color-wand-outline" @click="add_important_reminder">新增重要提醒</Button>
        <Button type="primary" :size="small" icon="information-circled" @click="add_account_note">新增做账备注</Button>
        <Button type="primary" :size="small"  icon="ios-color-wand-outline" @click="add_unfinished_things">新增未完事项</Button>
        <Button type="primary"  :size="small" icon="ios-color-wand-outline" @click="change_accounting" v-permission="['proxyAccounterManger.share']">变更会计</Button>
        <Button type="primary" :size="small" icon="ios-color-wand-outline" @click="service_detail">服务详情</Button>
        <Button type="primary"  :size="small" icon="ios-color-wand-outline" @click="open_acc_change_log">会计变更日志</Button>
        <Button type="primary" :size="small" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
        <Button type="primary" :size="small" icon="ios-color-wand-outline" @click="service_offline" v-permission="['proxyAccounterManger.stop']">服务下线</Button>
        <Button type="primary"  :size="small" icon="ios-color-wand-outline" @click="service_paused" v-permission="['proxyAccounterManger.pause']">暂停服务</Button>
        <Button
          type="primary"
          icon="ios-color-wand-outline"
          @click="turn_offincal"
          :loading="comLoading"
          :size="small"
        >跳转税务局</Button>
        <Button
          type="primary"
          name="marketingManagement_index_field_log"
          :size="small"
          icon="edit"
          @click="showHeaderCheckBox = true"
        >自定义表头</Button>
      </ButtonGroup>
    </Row>
    <Row style="margin-top: 10px;">
      <Table
        @on-current-change="selectRow"
        id="d3"
        :loading="loading"
        ref="selection"
        highlight-row
        size="small"
        :columns="header"
        :data="data"
      ></Table>
      <Page
        size="small"
        :total="pageTotal"
        show-total
        show-sizer
        show-elevator
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"
        :current.sync="page"
        placement="top"
        style="margin-top: 10px"
      ></Page>
    </Row>
    <invoice></invoice>
    <level></level>
    <Creat></Creat>
    <creat-memo></creat-memo>
    <creat-undo></creat-undo>
    <change></change>
    <log></log>
    <field></field>
    <list></list>
    <account-list></account-list>
    <undo-list></undo-list>
    <data-management></data-management>
    <follow-up :company="current_row" v-if="openFollowUp" @close="openFollowUp = false"></follow-up>
    <follow-record></follow-record>

    <Modal v-model="showHeaderCheckBox" width="600" title="自定义表头">
      <template v-for="(item, index) in headerTemp">
        <div v-if="index !== 0" style="display:inline-block;margin:10px;width:100px" :key="index">
          <Checkbox v-model="headerCheckBox[index]" :label="item.title">{{ item.title }}</Checkbox>
        </div>
      </template>
      <div slot="footer">
        <Button type="primary" @click="onChangeHeaderCheckBox">确定</Button>
        <Button type="primary" @click="showHeaderCheckBox = false">关闭</Button>
      </div>
    </Modal>
  </Card>
</template>

<script>
import Clipboard from "clipboard";
import Invoice from "../serving/InvoiceManagement/index";
import { DateFormatYearMonth2 } from "../../../../libs/utils";
import * as accountApi from "./api";
import Level from "./level/index";
import DataManagement from "./DataManagement/index";
import Creat from "./ButtonComponents/creat";
import CreatMemo from "./ButtonComponents/accountNote/creat";
import CreatUndo from "./ButtonComponents/unfinishedThings/creat";
import Change from "./ButtonComponents/changeAccounting/index";
import Bus from "../../../../components/bus";
import FollowUp from "./ButtonComponents/serviceDetails/index";
import Log from "./ButtonComponents/changeLog/index";
import Field from "./fieldDetail/index";
import List from "./importRemindList/index";
import AccountList from "./accountRemindList/index";
import UndoList from "./undoRemindList/index";
import FollowRecord from "./followRecord/index";
export default {
  name: "serving",
  components: {
    Invoice,
    Level,
    DataManagement,
    Creat,
    CreatMemo,
    CreatUndo,
    Change,
    FollowUp,
    Log,
    Field,
    List,
    AccountList,
    UndoList,
    FollowRecord
  },
  data() {
    return {
      showHeaderCheckBox: false,
      headerTemp: [],
      headerCheckBox: [
        true,
        false,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
        false,
        true,
        true,
        true,
        true,
        true,
        true,
        false,
        true
      ],
      search_model: 1,
      loading: false,
      comLoading: false,
      pageTotal: 0,
      page: 1,
      pageSize: 10,
      period: "",
      taskSummary: "",
      openFollowUp: false,
      current_row: "",
      currentIndex: -1,
      currentIndexx: -2,
      currentIndexxx: -3,
      currentIndexxxx: -4,
      l: -5,
      cservicest: [],
      TaxDeclareStatus: [],
      TaxCompleteStatus: [],
      cservicest_map: new Map(),
      TaxDeclareStatus_map: new Map(),
      TaxCompleteStatus_map: new Map(),
      SearchValidate: {
        CompanyName: "",
        server_realname: "",
        followby_realname: "",
        begin_end_period: "",
        end_end_period: "",
        note_kj_flag: "",
        etaxStatus: ""
      },
      data: [],
      header: [
        {
          title: "公司名称",
          fixed: "left",
          key: "companyname",
          minWidth: 220
        },
        {
          title: "申报税种",
          key: "tax_type",
          width: 100,
          render: (h, params) => {
            if (params.row.tax_type == "" || params.row.tax_type == null) {
              return "";
            } else {
              // console.log(params.row.companynames)
              let temp = params.row.tax_type.split(",");
              if (temp[0].length > 13) {
                return h(
                  "Poptip",
                  {
                    props: {
                      trigger: "hover",
                      title: "申报税种",
                      placement: "bottom"
                    }
                  },
                  [
                    h("span", temp[0].slice(0, 13) + "..."),
                    h("Icon", {
                      props: {
                        type: "arrow-down-b"
                      }
                    }),
                    h(
                      "div",
                      {
                        slot: "content"
                      },
                      [
                        h(
                          "ul",
                          temp.map(item => [
                            h(
                              "li",
                              {
                                style: {
                                  padding: "4px"
                                }
                              },
                              "税种：" + item
                            )
                          ])
                        )
                      ]
                    )
                  ]
                );
              } else {
                return h(
                  "Poptip",
                  {
                    props: {
                      trigger: "hover",
                      title: "申报税种",
                      placement: "bottom"
                    }
                  },
                  [
                    h("span", temp[0]),
                    h("Icon", {
                      props: {
                        type: "arrow-down-b"
                      }
                    }),
                    h(
                      "div",
                      {
                        slot: "content"
                      },
                      [
                        h(
                          "ul",
                          temp.map(item => [
                            h(
                              "li",
                              {
                                style: {
                                  padding: "4px"
                                }
                              },
                              "税种：" + item
                            )
                          ])
                        )
                      ]
                    )
                  ]
                );
              }
            }
          }
        },
         {
          title: "代账类型",
          key: "product",
          minWidth: 230
        },
        {
          title: "剩余外勤",
          key: "remainder",
          minWidth: 170,
          render: (h, params) => {
            let _self = this;
            return h("div", [
              h(
                "span",
                {
                  style: {
                    display: "inline-block",
                    lineHeight: "24px",
                    height: "24px",
                    cursor: "pointer",
                    color: "#0162f4"
                  },
                  on: {
                    click: function() {
                      _self.field(params.row);
                    }
                  }
                },
                params.row.remainder
              )
            ]);
          }
        },
        {
          title: "重要提醒",
          key: "importantList",
          minWidth: 100,
          render: (h, params) => {
            let _self = this;
            if (
              params.row.importantList == "" ||
              params.row.importantList == null
            ) {
              return h(
                "div",
                {
                  style: {
                    //     display: 'inline-block',
                    //     lineHeight: '24px',
                    //     height: '24px',
                    cursor: "pointer",
                    width: "33px"
                    //     color:'#0162f4'
                  },
                  on: {
                    click: function() {
                      _self.open_import_list(params.row);
                    }
                  }
                },
                "无"
              );
            } else {
              let temp = JSON.parse(params.row.importantList);
              if (temp[0].taskContent.length > 13) {
                return h(
                  "Poptip",
                  {
                    props: {
                      trigger: "hover",
                      title: "提醒项",
                      placement: "bottom"
                    }
                  },
                  [
                    h(
                      "span",
                      {
                        style: {
                          //     display: 'inline-block',
                          //     lineHeight: '24px',
                          //     height: '24px',
                          cursor: "pointer"
                          //     color:'#0162f4'
                        },
                        on: {
                          click: function() {
                            _self.open_import_list(params.row);
                          }
                        }
                      },
                      temp[0].taskContent.slice(0, 13) + "..."
                    ),
                    h("Icon", {
                      props: {
                        type: "arrow-down-b"
                      }
                    }),
                    h(
                      "div",
                      {
                        slot: "content"
                      },
                      [
                        h(
                          "ul",
                          temp.map(item => [
                            h(
                              "li",
                              {
                                style: {
                                  padding: "4px"
                                }
                              },
                              "重要提醒：" + item.taskContent
                            )
                          ])
                        )
                      ]
                    )
                  ]
                );
              } else {
                return h(
                  "Poptip",
                  {
                    props: {
                      trigger: "hover",
                      title: "提醒项",
                      placement: "bottom"
                    }
                  },
                  [
                    h(
                      "span",
                      {
                        style: {
                          //     display: 'inline-block',
                          //     lineHeight: '24px',
                          //     height: '24px',
                          cursor: "pointer"
                          //     color:'#0162f4'
                        },
                        on: {
                          click: function() {
                            _self.open_import_list(params.row);
                          }
                        }
                      },
                      temp[0].taskContent
                    ),
                    h("Icon", {
                      props: {
                        type: "arrow-down-b"
                      }
                    }),
                    h(
                      "div",
                      {
                        slot: "content"
                      },
                      [
                        h(
                          "ul",
                          temp.map(item => [
                            h(
                              "li",
                              {
                                style: {
                                  padding: "4px"
                                }
                              },
                              "重要提醒：" + item.taskContent
                            )
                          ])
                        )
                      ]
                    )
                  ]
                );
              }
            }
          }
        },
        {
          title: "实名账号",
          key: "nationalnum",
          minWidth: 120,
          render: (h, params) => {
            let _self = this;
            if (params.index != _self.currentIndex) {
              return h("div", [
                h(
                  "span",
                  {
                    class: {
                      foo: true,
                      bar: false
                    },
                    style: {
                      display: "inline-block",
                      lineHeight: "24px",
                      height: "24px",
                      width: "60px",
                      cursor: "pointer"
                    },
                    on: {
                      click: function() {
                        _self.copy(params.row.nationalnum);
                      }
                    }
                  },
                  params.row.nationalnum
                ),
                h("Icon", {
                  props: {
                    type: "edit",
                    size: "small"
                  },
                  on: {
                    click: function() {
                      _self.handle_edit_unit_price(params.row, params.index);
                    }
                  }
                })
              ]);
            } else {
              return h("div", [
                h("Input", {
                  props: {
                    value: this.data[params.index].nationalnum,
                    size: "small"
                  },
                  style: {
                    display: "inline-block",
                    width: "60px"
                  },
                  on: {
                    "on-blur": function(event) {
                      _self.data[params.index].nationalnum = event.target.value;
                    }
                  }
                }),
                h(
                  "Button",
                  {
                    props: {
                      type: "info",
                      size: "small"
                    },
                    style: {
                      display: "inline-block"
                    },
                    on: {
                      click: () => {
                        _self.update_nationalnum(params.index);
                      }
                    }
                  },
                  "保存"
                )
              ]);
            }
          }
        },
        {
          title: "密码",
          key: "nationalpsw",
          minWidth: 120,
          render: (h, params) => {
            let _self = this;
            if (params.index != this.currentIndexx) {
              return h("div", [
                h(
                  "span",
                  {
                    class: {
                      foo: true,
                      bar: false
                    },
                    style: {
                      display: "inline-block",
                      lineHeight: "24px",
                      height: "24px",
                      width: "60px",
                      cursor: "pointer"
                    },
                    on: {
                      click: function() {
                        _self.copy(params.row.nationalpsw);
                      }
                    }
                  },
                  params.row.nationalpsw
                ),
                h("Icon", {
                  props: {
                    type: "edit",
                    size: "small"
                  },
                  on: {
                    click: function() {
                      _self.handle_edit_unit_pricex(params.row, params.index);
                    }
                  }
                })
              ]);
            } else {
              return h("div", [
                h("Input", {
                  props: {
                    value: this.data[params.index].nationalpsw,
                    size: "small"
                  },
                  style: {
                    display: "inline-block",
                    width: "60px"
                  },
                  on: {
                    "on-blur": function(event) {
                      _self.data[params.index].nationalpsw = event.target.value;
                    }
                  }
                }),
                h(
                  "Button",
                  {
                    props: {
                      type: "info",
                      size: "small"
                    },
                    style: {
                      display: "inline-block"
                    },
                    on: {
                      click: () => {
                        _self.update_nationalpsw(params.index);
                      }
                    }
                  },
                  "保存"
                )
              ]);
            }
          }
        },
        {
          title: "税号",
          key: "tax_number",
          minWidth: 150,
          render: (h, params) => {
            let _self = this;
            if (params.index != this.currentIndexxx) {
              return h("div", [
                h(
                  "span",
                  {
                    class: {
                      foo: true,
                      bar: false
                    },
                    style: {
                      display: "inline-block",
                      lineHeight: "24px",
                      height: "24px",
                      width: "60px",
                      cursor: "pointer"
                    },
                    on: {
                      click: function() {
                        _self.copy(params.row.tax_number);
                      }
                    }
                  },
                  params.row.tax_number
                ),
                h("Icon", {
                  props: {
                    type: "edit",
                    size: "small"
                  },
                  on: {
                    click: function() {
                      _self.handle_edit_unit_pricexx(params.row, params.index);
                    }
                  }
                })
              ]);
            } else {
              return h("div", [
                h("Input", {
                  props: {
                    value: this.data[params.index].tax_number,
                    size: "small"
                  },
                  style: {
                    display: "inline-block",
                    width: "60px"
                  },
                  on: {
                    "on-blur": function(event) {
                      _self.data[params.index].tax_number = event.target.value;
                    }
                  }
                }),
                h(
                  "Button",
                  {
                    props: {
                      type: "info",
                      size: "small"
                    },
                    style: {
                      display: "inline-block"
                    },
                    on: {
                      click: () => {
                        _self.update_taxnumber(params.index);
                      }
                    }
                  },
                  "保存"
                )
              ]);
            }
          }
        },
        {
          title: "个税密码",
          key: "tax_password",
          minWidth: 150,
          render: (h, params) => {
            let _self = this;
            if (params.index != this.currentIndexxxx) {
              return h("div", [
                h(
                  "span",
                  {
                    class: {
                      foo: true,
                      bar: false
                    },
                    style: {
                      display: "inline-block",
                      lineHeight: "24px",
                      height: "24px",
                      width: "60px",
                      cursor: "pointer"
                    },
                    on: {
                      click: function() {
                        _self.copy(params.row.tax_password);
                      }
                    }
                  },
                  params.row.tax_password
                ),
                h("Icon", {
                  props: {
                    type: "edit",
                    size: "small"
                  },
                  on: {
                    click: function() {
                      _self.handle_edit_unit_pricexxx(params.row, params.index);
                    }
                  }
                })
              ]);
            } else {
              return h("div", [
                h("Input", {
                  props: {
                    value: this.data[params.index].tax_password,
                    size: "small"
                  },
                  style: {
                    display: "inline-block",
                    width: "60px"
                  },
                  on: {
                    "on-blur": function(event) {
                      _self.data[params.index].tax_password =
                        event.target.value;
                    }
                  }
                }),
                h(
                  "Button",
                  {
                    props: {
                      type: "info",
                      size: "small"
                    },
                    style: {
                      display: "inline-block"
                    },
                    on: {
                      click: () => {
                        _self.update_taxpassword(params.index);
                      }
                    }
                  },
                  "保存"
                )
              ]);
            }
          }
        },
        // {
        //   title: "代账类型",
        //   key: "product",
        //   minWidth: 230
        // },
        {
          title: "社保",
          key: "shebao",
          minWidth: 150,
          render: (h, params) => {
            if (!params.row.shebao) {
              return "";
            }
            if (params.row.shebao.confirm_date == undefined) {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      display: "inline-block",
                      lineHeight: "24px",
                      height: "24px",
                      width: "40px"
                    }
                  },
                  "未完成"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "small"
                    },
                    style: {
                      marginTop: "-3px",
                      marginLeft: "5px"
                    },
                    on: {
                      click: () => {
                        this.sb(params.row.shebao);
                      }
                    }
                  },
                  "[ 完成 ]"
                )
              ]);
            } else {
              return h("div", params.row.shebao.confirm_date.slice(0, 10));
            }
          }
        },
        {
          title: "做账备注",
          key: "accountList",
          minWidth: 120,
          render: (h, params) => {
            let _self = this;
            if (
              params.row.accountList == "" ||
              params.row.accountList == null
            ) {
              return h(
                "div",
                {
                  style: {
                    //     display: 'inline-block',
                    //     lineHeight: '24px',
                    //     height: '24px',
                    cursor: "pointer",
                    width: "33px"
                    //     color:'#0162f4'
                  },
                  on: {
                    click: function() {
                      _self.open_account_list(params.row);
                    }
                  }
                },
                "--"
              );
            } else {
              let temp = JSON.parse(params.row.accountList);
              if (temp[0].taskContent.length > 13) {
                {
                  return h(
                    "Poptip",
                    {
                      props: {
                        trigger: "hover",
                        title: "备注项",
                        placement: "bottom"
                      }
                    },
                    [
                      h(
                        "span",
                        {
                          style: {
                            //     display: 'inline-block',
                            //     lineHeight: '24px',
                            //     height: '24px',
                            cursor: "pointer"
                            //     color:'#0162f4'
                          },
                          on: {
                            click: function() {
                              _self.open_account_list(params.row);
                            }
                          }
                        },
                        temp[0].taskContent.slice(0, 13) + "..."
                      ),
                      h("Icon", {
                        props: {
                          type: "arrow-down-b"
                        }
                      }),
                      h(
                        "div",
                        {
                          slot: "content"
                        },
                        [
                          h(
                            "ul",
                            temp.map(item => {
                              if (temp[i].taskStage == "tesUnstarted") {
                                return [
                                  h(
                                    "li",
                                    {
                                      style: {
                                        padding: "4px"
                                      }
                                    },
                                    [
                                      h(
                                        "span",
                                        {},
                                        "备注名：" + item.taskContent
                                      ),
                                      h(
                                        "Button",
                                        {
                                          props: {
                                            type: "primary",
                                            size: "small"
                                          },
                                          style: {
                                            marginTop: "-3px",
                                            marginLeft: "15px"
                                          },
                                          on: {
                                            click: function() {
                                              _self.completed(item.taskId);
                                            }
                                          }
                                        },
                                        "完成"
                                      )
                                    ]
                                  )
                                ];
                              }
                              if (item.taskStage == "tesFinished") {
                                return [
                                  h(
                                    "li",
                                    {
                                      style: {
                                        padding: "4px"
                                      }
                                    },
                                    [
                                      h(
                                        "span",
                                        {},
                                        "备注名：" + item.taskContent
                                      ),
                                      h(
                                        "span",
                                        {
                                          // props: {
                                          //     type: 'primary',
                                          //     size: 'small',
                                          // },
                                          style: {
                                            // marginTop:'-3px',
                                            marginLeft: "15px",
                                            color: "rgb(160 191 124)"
                                          }
                                          // on: {
                                          //     click: function() {
                                          //         _self.completed(item.taskId);
                                          //     }
                                          // },
                                        },
                                        "已完成"
                                      )
                                    ]
                                  )
                                ];
                              }
                            })
                          )
                        ]
                      )
                    ]
                  );
                }
              } else {
                return h(
                  "Poptip",
                  {
                    props: {
                      trigger: "hover",
                      title: "备注项",
                      placement: "bottom"
                    }
                  },
                  [
                    h(
                      "span",
                      {
                        style: {
                          //     display: 'inline-block',
                          //     lineHeight: '24px',
                          //     height: '24px',
                          cursor: "pointer"
                          //     color:'#0162f4'
                        },
                        on: {
                          click: function() {
                            _self.open_account_list(params.row);
                          }
                        }
                      },
                      temp[0].taskContent
                    ),
                    h("Icon", {
                      props: {
                        type: "arrow-down-b"
                      }
                    }),
                    h(
                      "div",
                      {
                        slot: "content"
                      },
                      [
                        h(
                          "ul",
                          temp.map(item => {
                            if (item.taskStage == "tesUnstarted") {
                              return [
                                h(
                                  "li",
                                  {
                                    style: {
                                      padding: "4px"
                                    }
                                  },
                                  [
                                    h(
                                      "span",
                                      {},
                                      "备注名：" + item.taskContent
                                    ),
                                    h(
                                      "Button",
                                      {
                                        props: {
                                          type: "primary",
                                          size: "small"
                                        },
                                        style: {
                                          marginTop: "-3px",
                                          marginLeft: "15px"
                                        },
                                        on: {
                                          click: function() {
                                            _self.completed(item.taskId);
                                          }
                                        }
                                      },
                                      "完成"
                                    )
                                  ]
                                )
                              ];
                            }
                            if (item.taskStage == "tesFinished") {
                              return [
                                h(
                                  "li",
                                  {
                                    style: {
                                      padding: "4px"
                                    }
                                  },
                                  [
                                    h(
                                      "span",
                                      {},
                                      "备注名：" + item.taskContent
                                    ),
                                    h(
                                      "span",
                                      {
                                        // props: {
                                        //     type: 'primary',
                                        //     size: 'small',
                                        // },
                                        style: {
                                          // marginTop:'-3px',
                                          marginLeft: "15px",
                                          color: "rgb(160 191 124)"
                                        }
                                        // on: {
                                        //     click: function() {
                                        //         _self.completed(item.taskId);
                                        //     }
                                        // },
                                      },
                                      "已完成"
                                    )
                                  ]
                                )
                              ];
                            }
                          })
                        )
                      ]
                    )
                  ]
                );
              }
            }
          }
        },
        {
          title: "产品金额",
          key: "unit_price",
          minWidth: 180,
          render: (h, params) => {
            let _self = this;
            if (params.index != this.l) {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      display: "inline-block",
                      lineHeight: "24px",
                      height: "24px",
                      width: "40px"
                    }
                  },
                  params.row.unit_price
                ),
                h(
                  "Button",
                  {
                    style: {
                      display: "inline-block",
                      marginTop: "-3px"
                    },
                    props: {
                      type: "text",
                      size: "small"
                    },
                    on: {
                      click: function() {
                        _self.level(params.row);
                      }
                    }
                  },
                  "[升级]"
                ),
                h("Icon", {
                  props: {
                    type: "edit",
                    size: "small"
                  },
                  on: {
                    click: function() {
                      _self.handle_edit_unit_pricel(params.row, params.index);
                    }
                  }
                })
              ]);
            } else {
              return h("div", [
                h("Input", {
                  props: {
                    value: this.data[params.index].unit_price,
                    size: "small",
                    type: "number"
                  },
                  style: {
                    display: "inline-block",
                    width: "100px"
                  },
                  on: {
                    "on-blur": function(event) {
                      _self.data[params.index].unit_price = event.target.value;
                    }
                  }
                }),
                h(
                  "Button",
                  {
                    props: {
                      type: "info",
                      size: "small"
                    },
                    style: {
                      display: "inline-block"
                    },
                    on: {
                      click: () => {
                        console.log("123");
                        _self.update_unit_price(params.index);
                      }
                    }
                  },
                  "保存"
                )
              ]);
            }
          }
        },
        {
          title: "未完事项",
          key: "undoList",
          minWidth: 120,
          render: (h, params) => {
            let _self = this;
            if (params.row.undoList == "" || params.row.undoList == null) {
              return h(
                "div",
                {
                  style: {
                    //     display: 'inline-block',
                    //     lineHeight: '24px',
                    //     height: '24px',
                    cursor: "pointer"
                    // width:'33px'
                    //     color:'#0162f4'
                  },
                  on: {
                    click: function() {
                      _self.open_undo_list(params.row);
                    }
                  }
                },
                "--"
              );
            } else {
              let temp = JSON.parse(params.row.undoList);
              if (temp[0].taskContent.length > 13) {
                {
                  return h(
                    "Poptip",
                    {
                      props: {
                        trigger: "hover",
                        title: "备注项",
                        placement: "bottom"
                      }
                    },
                    [
                      h(
                        "span",
                        {
                          style: {
                            cursor: "pointer"
                          },
                          on: {
                            style: {
                              cursor: "pointer"
                            },
                            click: function() {
                              _self.open_undo_list(params.row);
                            }
                          }
                        },
                        temp[0].taskContent.slice(0, 13) + "..."
                      ),
                      h("Icon", {
                        props: {
                          type: "arrow-down-b"
                        }
                      }),
                      h(
                        "div",
                        {
                          slot: "content"
                        },
                        [
                          h(
                            "ul",
                            temp.map(item => {
                              if (temp[i].taskStage == "tesUnstarted") {
                                return [
                                  h(
                                    "li",
                                    {
                                      style: {
                                        padding: "4px"
                                      }
                                    },
                                    [
                                      h(
                                        "span",
                                        {},
                                        "备注名：" + item.taskContent
                                      ),
                                      h(
                                        "Button",
                                        {
                                          props: {
                                            type: "primary",
                                            size: "small"
                                          },
                                          style: {
                                            marginTop: "-3px",
                                            marginLeft: "15px"
                                          },
                                          on: {
                                            click: function() {
                                              _self.completed(item.taskId);
                                            }
                                          }
                                        },
                                        "完成"
                                      )
                                    ]
                                  )
                                ];
                              }
                              if (item.taskStage == "tesFinished") {
                                return [
                                  h(
                                    "li",
                                    {
                                      style: {
                                        padding: "4px"
                                      }
                                    },
                                    [
                                      h(
                                        "span",
                                        {},
                                        "备注名：" + item.taskContent
                                      ),
                                      h(
                                        "span",
                                        {
                                          // props: {
                                          //     type: 'primary',
                                          //     size: 'small',
                                          // },
                                          style: {
                                            // marginTop:'-3px',
                                            marginLeft: "15px",
                                            color: "rgb(160 191 124)"
                                          }
                                          // on: {
                                          //     click: function() {
                                          //         _self.completed(item.taskId);
                                          //     }
                                          // },
                                        },
                                        "已完成"
                                      )
                                    ]
                                  )
                                ];
                              }
                            })
                          )
                        ]
                      )
                    ]
                  );
                }
              } else {
                return h(
                  "Poptip",
                  {
                    props: {
                      trigger: "hover",
                      title: "备注项",
                      placement: "bottom"
                    }
                  },
                  [
                    h(
                      "span",
                      {
                        style: {
                          cursor: "pointer"
                        },
                        on: {
                          click: function() {
                            _self.open_undo_list(params.row);
                          }
                        }
                      },
                      temp[0].taskContent
                    ),
                    h("Icon", {
                      props: {
                        type: "arrow-down-b"
                      }
                    }),
                    h(
                      "div",
                      {
                        slot: "content"
                      },
                      [
                        h(
                          "ul",
                          temp.map(item => {
                            if (item.taskStage == "tesUnstarted") {
                              return [
                                h(
                                  "li",
                                  {
                                    style: {
                                      padding: "4px"
                                    }
                                  },
                                  [
                                    h(
                                      "span",
                                      {},
                                      "备注名：" + item.taskContent
                                    ),
                                    h(
                                      "Button",
                                      {
                                        props: {
                                          type: "primary",
                                          size: "small"
                                        },
                                        style: {
                                          marginTop: "-3px",
                                          marginLeft: "15px"
                                        },
                                        on: {
                                          click: function() {
                                            _self.completed(item.taskId);
                                          }
                                        }
                                      },
                                      "完成"
                                    )
                                  ]
                                )
                              ];
                            }
                            if (item.taskStage == "tesFinished") {
                              return [
                                h(
                                  "li",
                                  {
                                    style: {
                                      padding: "4px"
                                    }
                                  },
                                  [
                                    h(
                                      "span",
                                      {},
                                      "备注名：" + item.taskContent
                                    ),
                                    h(
                                      "span",
                                      {
                                        // props: {
                                        //     type: 'primary',
                                        //     size: 'small',
                                        // },
                                        style: {
                                          // marginTop:'-3px',
                                          marginLeft: "15px",
                                          color: "rgb(160 191 124)"
                                        }
                                        // on: {
                                        //     click: function() {
                                        //         _self.completed(item.taskId);
                                        //     }
                                        // },
                                      },
                                      "已完成"
                                    )
                                  ]
                                )
                              ];
                            }
                          })
                        )
                      ]
                    )
                  ]
                );
              }
            }
          }
        },
          {
          title: "下单时间",
          key: "createdate",
          minWidth: 170
        },
        {
          title: "税种状态",
          key: "tax_status",
          minWidth: 120
        },
        {
          title: "市场",
          key: "followbyrealname",
          minWidth: 120
        },
        {
          title: "服务会计",
          key: "realname",
          minWidth: 120
        },
        {
          title: "服务状态",
          key: "service_status",
          minWidth: 120
        },
        {
          title: "本月税报结果",
          key: "tax_result",
          minWidth: 120
        },
        {
          title: "操作",
          key: "action",
          fixed: "left",
          width: 200,
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
                  on: {
                    click: () => {
                      this.invoice(params.row);
                    }
                  }
                },
                "[发票管理]"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$store.commit(
                        "open_gobal_company_detail_modal",
                        params.row.company_id
                      );
                      this.$store.commit("hide_recoord");
                    }
                  }
                },
                "[公司详情]"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.data_management(params.row);
                    }
                  }
                },
                "[资料管理]"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.follow_record(params.row);
                    }
                  }
                },
                "[跟进记录]"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    onChangeHeaderCheckBox() {
      let headerValue = [];
      this.headerCheckBox.forEach((value, i) => {
        headerValue[i] = value ? this.headerTemp[i] : "";
      });
      this.header = headerValue.filter(v => !!v);
      this.showHeaderCheckBox = false;
    },
    selectRow(e) {
      this.current_row = e;
    },
    pageChange(a) {
      let _self = this;
      _self.page = a;
      _self.get_data();
    },
    pageSizeChange(a) {
      let _self = this;
      _self.pageSize = a;
      _self.get_data();
    },
    row_class_name(row, index) {
      if (row.balance_count <= 3) {
        return "demo-table-followdate-warning-row";
      } else {
        return "";
      }
    },
    turn_offincal() {
      let _self = this;
      if (!_self.current_row) {
        _self.$Message.warning("请选择一行进行操作！");
      } else {
        if (!_self.current_row.nationalnum || !_self.current_row.nationalpsw) {
          _self.$Message.warning("要跳转税务局前需要填写实名账号及密码");
        } else {
          _self.comLoading = true;
          let url = `http://yjgcs.zgcfo.com/getETaxWebSingleSignOnSucessUrl`;
          let config = {
            taxnumber: _self.current_row.tax_number,
            nationalnum: _self.current_row.nationalnum,
            nationalpsw: _self.current_row.nationalpsw,
            accounttype: _self.current_row.accounttype
          };
          function success(res) {
            let a = res.data;
            window.open(a);
            _self.comLoading = false;
          }

          function fail(err) {}
          this.$post(url, config, success, fail);
        }
      }
    },
    invoice(e) {
      this.$bus.emit("OPEN_INVOICE_PAGE", e);
    },
    follow_record(e) {
      this.$bus.emit("OPEN_FOLLOW_RECORD", e);
    },
    level(e) {
      this.$bus.emit("OPEN_LEVEL_PAGE", e);
    },
    data_management(e) {
      this.$bus.emit("OPEN_DATA_MANAGEMENT", e);
    },
    Search() {
      this.page = 1;
      this.get_data();
    },
    handleReset() {
      this.SearchValidate.CompanyName = "";
      this.SearchValidate.server_realname = "";
      this.SearchValidate.followby_realname = "";
      this.SearchValidate.begin_end_period = "";
      this.SearchValidate.end_end_period = "";
      this.SearchValidate.note_kj_flag = "";
      this.SearchValidate.etaxStatus = "";
      this.Search();
    },
    handle_edit_unit_price(row, index) {
      this.currentIndex = index;
    },
    handle_edit_unit_pricex(row, index) {
      this.currentIndexx = index;
    },
    handle_edit_unit_pricexx(row, index) {
      this.currentIndexxx = index;
    },
    handle_edit_unit_pricexxx(row, index) {
      this.currentIndexxxx = index;
    },
    handle_edit_unit_pricel(row, index) {
      this.l = index;
    },
    field(e) {
      this.$bus.emit("OPEN_FIELD_DETAIL", e);
    },
    open_import_list(e) {
      this.$bus.emit("OPEN_IMPORT_LIST", e);
    },
    open_account_list(e) {
      this.$bus.emit("OPEN_ACCOUNT_LIST", e);
    },
    open_undo_list(e) {
      this.$bus.emit("OPEN_UNDO_LIST", e);
    },
    copy(prx) {
      let clipboard = new Clipboard(".foo", {
        text: () => {
          return prx;
        }
      });
      console.log(clipboard);
      clipboard.on("success", e => {
        this.$Message.success("复制成功");
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        this.$Message.error("该网页不允许复制");
        clipboard.destroy();
      });
    },
    sb(sb) {
      let _self = this;
      let url = `api/order/cycle/month/service/item/finish`;
      let formdata = new FormData();
      formdata.append("monthServiceItemId", sb);
      function success(res) {
        _self.get_data();
      }

      function fail(err) {}
      this.$Post(url, formdata, success, fail);
    },
    completed(id) {
      let _self = this;
      let url = `api/order/cycle/service/dljz/fininshTask`;
      let config = {
        params: {
          taskId: id,
          taskSummary: _self.taskSummary,
          mission: "Completed"
        }
      };
      function success(res) {
        _self.get_data();
      }

      function fail(err) {}
      this.$Get(url, config, success, fail);
    },
    add_important_reminder() {
      if (this.current_row == "" || this.current_row == null) {
        this.$Message.warning("请选择一行进行操作");
      } else {
        this.$bus.emit("OPEN_ADD_IMPORTANT_REMINDER", this.current_row);
      }
    },
    add_account_note() {
      if (this.current_row == "" || this.current_row == null) {
        this.$Message.warning("请选择一行进行操作");
      } else {
        this.$bus.emit("OPEN_ADD_ACCOUNT_NOTE", this.current_row);
      }
    },
    add_unfinished_things() {
      if (this.current_row == "" || this.current_row == null) {
        this.$Message.warning("请选择一行进行操作");
      } else {
        this.$bus.emit("OPEN_ADD_UNFINISHED_THINGS", this.current_row);
      }
    },
    change_accounting() {
      let _self = this;

      if (_self.current_row == "" || _self.current_row == undefined) {
        this.$Message.warning("请选择要变更会计的项目");
      } else {
        _self.current_row.workordermemo = _self.current_row.memo;
        _self.current_row.followby_realname =
          _self.current_row.followbyrealname;
        _self.current_row.CompanyName = _self.current_row.companyname;
        Bus.$emit("CHANGE_ACCOUNTING", _self.current_row);
      }
    },
    service_detail() {
      let _self = this;
      if (_self.current_row == "" || _self.current_row == null) {
        _self.$Message.warning("请选择要查看的服务详情！");
      } else {
        // _self.$bus.emit('open_booking_follow',_self.current_row)
        this.openFollowUp = true;
      }
    },
    open_acc_change_log() {
      let _self = this;

      if (!_self.current_row) {
        this.$Message.warning("请选择要查看的项目！");
      } else {
        _self.$bus.emit(
          "OPEN_ACC_CHANGE_LOG",
          _self.current_row.cycle_service_record_id
        );
      }
    },
    downloadExcel() {
      let field = [
        {
          field: "companyname",
          title: "公司名称"
        },
        {
          field: "tax_type",
          title: "申报税种"
        },
        {
          field: "importEx",
          title: "重要提醒"
        },
        {
          field: "nationalnum",
          title: "实名账号"
        },
        {
          field: "nationalpsw",
          title: "密码"
        },
        {
          field: "tax_number",
          title: "税号"
        },
        {
          field: "tax_password",
          title: "个税密码"
        },
        {
          field: "product",
          title: "代账类型"
        },
        {
          field: "begin_period",
          title: "开始税期"
        },
        {
          field: "end_period",
          title: "结束税期"
        },
        {
          field: "shebao",
          title: "社保"
        },
        {
          field: "accountEx",
          title: "做账备注"
        },
        {
          field: "unit_price",
          title: "产品金额"
        },
        {
          field: "undoEx",
          title: "未完事项"
        },
        {
          field: "remainder",
          title: "剩余外勤"
        },
        {
          field: "tax_status",
          title: "税种状态",
          format: "TaxCompleteStatus"
        },
        {
          field: "followbyrealname",
          title: "市场"
        },
        {
          field: "realname",
          title: "服务会计"
        },
        {
          field: "service_status",
          title: "服务状态",
          format: "cservicest"
        },
        {
          field: "tax_result",
          title: "本月税报结果",
          format: "TaxDeclareStatus"
        }
      ];
      let _self = this;
      let url = `api/order/cycle/service/dljz/cycleMothList`;
      let config = {
        page: "1",
        pageSize: "100000",
        period: _self.period,
        companyname: _self.SearchValidate.CompanyName,
        realname: _self.SearchValidate.server_realname,
        sortField: "unit_price",
        followbyrealname: _self.SearchValidate.followby_realname,
        begin_end_period: _self.SearchValidate.begin_end_period,
        end_end_period: _self.SearchValidate.end_end_period,
        note_kj_flag: _self.SearchValidate.note_kj_flag,
        hasEAccount: _self.SearchValidate.etaxStatus == 1 ? 1 : "",
        hasEAccountAndWrong: _self.SearchValidate.etaxStatus == 2 ? 1 : "",
        hasNotEAccount: _self.SearchValidate.etaxStatus == 3 ? 1 : "",
        export: "Y",
        exportField: encodeURI(JSON.stringify(field))
      };
      let toExcel = this.$MergeURL(url, config);
      window.open(toExcel);
    },
    service_offline() {
      let _self = this;
      console.log(_self.current_row);
      if (_self.current_row.service_status == "已终止") {
        _self.$Message.warning("服务已下线");
        return;
      }
      if (_self.current_row) {
        this.$Modal.confirm({
          title: "提示信息",
          content: "<p>您确定下线服务吗</p>",
          onOk: async () => {
            let config = {
              id: _self.current_row.cycle_service_record_id,
              serviceStatus: "stop"
            };
            try {
              let { status, data } = await accountApi.cycleServiceRecordUpdate(
                config
              );
              if (status) {
                _self.page = 1;
                _self.get_data();
              }
            } catch (error) {
              console.log(error);
            }
          },
          onCancel: () => {}
        });
      } else {
        _self.$Message.warning("请选择要下线服务的工单！");
      }
    },
    service_paused() {
      let _self = this;
      if (_self.current_row.service_status == "异常") {
        _self.$Message.warning("服务已暂停");
        return;
      }
      if (_self.current_row) {
        this.$Modal.confirm({
          title: "提示信息",
          content: "<p>您确定暂停服务吗</p>",
          onOk: async () => {
            let config = {
              id: _self.current_row.cycle_service_record_id,
              serviceStatus: "exception"
            };
            try {
              let { status, data } = await accountApi.cycleServiceRecordUpdate(
                config
              );
              if (status) {
                _self.page = 1;
                _self.get_data();
              }
            } catch (error) {
              console.log(error);
            }
          },
          onCancel: () => {}
        });
      } else {
        _self.$Message.warning("请选择要暂停服务的工单！");
      }
    },
    update_nationalnum(index) {
      let _self = this;
      _self.loading = true;
      let url = `api/order/cycle/service/dljz/updateTaxmanagement`;
      let config = {
        companyId: _self.data[index].company_id,
        type: "nationalnum",
        text: _self.data[index].nationalnum
      };
      function success(res) {
        _self.currentIndex = -1;
        _self.get_data();
      }

      function fail(err) {}
      this.$Post(url, config, success, fail);
    },
    update_nationalpsw(index) {
      let _self = this;
      _self.loading = true;
      let url = `api/order/cycle/service/dljz/updateTaxmanagement`;
      let config = {
        companyId: _self.data[index].company_id,
        type: "nationalpsw",
        text: _self.data[index].nationalpsw
      };
      function success(res) {
        _self.currentIndexx = -1;
        _self.get_data();
      }

      function fail(err) {}
      this.$Post(url, config, success, fail);
    },
    update_taxnumber(index) {
      let _self = this;
      _self.loading = true;
      let url = `api/order/cycle/service/dljz/updateTaxmanagement`;
      let config = {
        companyId: _self.data[index].company_id,
        type: "taxNumber",
        text: _self.data[index].tax_number
      };
      function success(res) {
        _self.currentIndexxx = -1;
        _self.get_data();
      }

      function fail(err) {}
      this.$Post(url, config, success, fail);
    },
    update_taxpassword(index) {
      let _self = this;
      _self.loading = true;
      let url = `api/order/cycle/service/dljz/updateTaxmanagement`;
      let config = {
        companyId: _self.data[index].company_id,
        type: "taxPassword",
        text: _self.data[index].tax_password
      };
      function success(res) {
        _self.currentIndexxxx = -1;
        _self.get_data();
      }

      function fail(err) {}
      this.$Post(url, config, success, fail);
    },
    async update_unit_price(index) {
      let config = {
        workOrderId: this.data[index].cycle_work_order_id,
        unitprice: this.data[index].unit_price
      };

      try {
        let { status, data } = await accountApi.workOrderCycleUnitPriceUpdate(
          config
        );
        if (status) {
          (this.l = -5), this.get_data();
        }
      } catch (error) {
        console.log(error);
      }
    },
    get_data() {
      let _self = this;
      _self.loading = true;
      let url = `api/order/cycle/service/dljz/cycleMothList`;
      let config = {
        params: {
          page: _self.page,
          pageSize: _self.pageSize,
          period: _self.period,
          sortField: "unit_price",
          companyname: _self.SearchValidate.CompanyName,
          realname: _self.SearchValidate.server_realname,
          followbyrealname: _self.SearchValidate.followby_realname,
          begin_end_period: _self.SearchValidate.begin_end_period,
          end_end_period: _self.SearchValidate.end_end_period,
          note_kj_flag: _self.SearchValidate.note_kj_flag,
          hasEAccount: _self.SearchValidate.etaxStatus == 1 ? 1 : "",
          hasEAccountAndWrong: _self.SearchValidate.etaxStatus == 2 ? 1 : "",
          hasNotEAccount: _self.SearchValidate.etaxStatus == 3 ? 1 : ""
        }
      };
      function success(res) {
        _self.data = res.data.data.rows;
        _self.data = res.data.data.rows.map(item => {
          item.service_status = _self.cservicest_map.get(item.service_status);
          item.tax_status = _self.TaxCompleteStatus_map.get(item.tax_status);
          item.tax_result = _self.TaxDeclareStatus_map.get(item.tax_result);
          item.remainder = item.remainder == null ? "0" : item.remainder;
          // item.managestatusName = this.managestatus_map.get(item.managestatus);
          // item.note_kj_flag = item.note_kj_flag == 'Y' ? '完成' : '未完成';
          return item;
        });
        _self.pageTotal = res.data.data.total;
        _self.loading = false;
      }

      function fail(err) {}
      this.$Get(url, config, success, fail);
    },
    async get_data_center() {
      let params =
        "cservicest,managestatus,financialLevel,TaxDeclareStatus,TaxCompleteStatus";
      try {
        let {
          cservicest,
          managestatus,
          financialLevel,
          TaxDeclareStatus,
          TaxCompleteStatus
        } = await accountApi.getDictionary(params);
        this.cservicest = cservicest;
        this.cservicest_map = this.$array2map(this.cservicest);
        this.managestatus = managestatus;
        this.managestatus_map = this.$array2map(managestatus);
        this.financialLevel = financialLevel;
        this.TaxDeclareStatus = TaxDeclareStatus;
        this.TaxDeclareStatus_map = this.$array2map(TaxDeclareStatus);
        this.TaxCompleteStatus = TaxCompleteStatus;
        this.TaxCompleteStatus_map = this.$array2map(TaxCompleteStatus);
      } catch (error) {
        console.log(error);
      }
      // console.log(this.managestatus_map)
    }
  },
  created() {
    let _self = this;
    // this.headerTemp = this.headerTemp;
    this.headerTemp = this.header;
    let date = new Date();
    _self.period = DateFormatYearMonth2(date);
    _self.get_data();
    _self.get_data_center();
    _self.$bus.off("UPDATE_INDEX", true);
    _self.$bus.on("UPDATE_INDEX", e => {
      _self.get_data();
      _self.current_row = "";
    });
    
    Bus.$on("UPDATE_INDEX", e => {
      _self.get_data();
      _self.current_row = "";
    });
    this.onChangeHeaderCheckBox()
  }
};
</script>

<style>

.ivu-col-span-6 {
  height: 28px;
}

.ivu-table .demo-table-followdate-warning-row {
  color: rgb(226 17 0);
}
/* .ivu-table-wrapper {
  height: 100%;
}
.ivu-table-fixed,
.ivu-table-fixed-right {
  height: 70%;
}
.ivu-table-tbody {
  height: 70%;
} */
</style>