<template>
<div>
    <card>

         <Row style="margin-bottom:10px;">
        <Collapse v-model="search_model">
          <Panel name="1">
            <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>筛选
            <div slot="content" @keydown.enter="search">
              <Form
                ref="formValidate"
                :model="formValidate"
                :label-width="120"
                style="margin-top: -10px"
              >
                <Row>
                  <Col span="6">
                    <FormItem label="客户名称：" prop="name">
                      <Input v-model="formValidate.name" size="small"></Input>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="电话：" prop="tel">
                      <Input v-model="formValidate.tel" size="small"></Input>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="归属公司：" prop="companyname">
                      <Input v-model="formValidate.companyname" size="small"></Input>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="跟进人：" prop="followbyname">
                      <Input v-model="formValidate.followbyname" size="small"></Input>
                    </FormItem>
                  </Col>
                </Row>
                
                <Row>
                  
                  <Col span="6">
                    <FormItem label="创建时间：" prop="credate">
                      <DatePicker
                        type="daterange"
                        transfer
                        v-model="formValidate.credate"
                        placement="bottom-end"
                        size="small"
                        style="width:100%"
                      ></DatePicker>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="回滚时间：" prop="upddate">
                      <DatePicker
                        type="daterange"
                        transfer
                        v-model="formValidate.upddate"
                        placement="bottom-start"
                        size="small"
                        style="width:100%"
                      ></DatePicker>
                    </FormItem>
                  </Col>

                  <Col span="6">
                    <FormItem>
                      <Button
                        size="small"
                        type="primary"
                        name="marketingManagement_index_edit_search"
                        @click="search"
                      >搜索</Button>
                      <Button
                        size="small"
                        type="ghost"
                        name="marketingManagement_index_edit_reset"
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

            

        <Button
            type="primary"
            icon="plus"
            @click="hanldeSelectMore"
          >{{ canSelectMore ? '隐藏' : '多选' }}
          </Button>

          <!-- <Button
            type="primary"
            icon="ios-color-wand-outline"
            @click="batch_receipt"
            v-permission="['returnVisitN-edit']"
            :loading="receiptLoading"
          >资源领取</Button> -->

          <Button
            type="primary"
            name="marketingManagement_index_edit_change"
            icon="ios-crop"
            @click="check_select('CUSTOMER_CHANGE_MARKETER')"
            v-permission="['privatePool2.change']"
          >客户变更</Button>


          <Dropdown >
            <Button 
              type="primary"
              v-permission="['privatePool2.shift']"
              >
                转移公海
                <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list">
                
                <Dropdown placement="right-start" 
                @on-click="transferPool">
                    <DropdownItem name="-1">
                        精准公海池
                        <Icon type="ios-arrow-right"></Icon>
                    </DropdownItem>
                    <DropdownMenu slot="list">
                        <DropdownItem name="4-41">财税</DropdownItem>
                        <DropdownItem name="4-42">项目</DropdownItem>
                        <DropdownItem name="4-43">IP</DropdownItem>
                        <DropdownItem name="4-44">报告</DropdownItem>
                        <DropdownItem name="4-45">商事服务</DropdownItem>
                        <DropdownItem name="4-49">其他</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <Dropdown placement="right-start" 
                @on-click="transferPool">
                     
                      <DropdownItem name="-1">
                          市场公海池
                          <Icon type="ios-arrow-right"></Icon>
                      </DropdownItem>
                      <DropdownMenu slot="list">
                          <DropdownItem name="2-21" :disabled="true">自动转入</DropdownItem>
                          <DropdownItem name="2-22" :disabled="true">二次落入</DropdownItem>
                          <DropdownItem name="2-23">公海池转入</DropdownItem>
                      </DropdownMenu>
                </Dropdown>

            </DropdownMenu>
        </Dropdown>


          <Button
            type="primary"
            icon="refresh"
            @click="refresh"
          >刷新
          </Button>

        </ButtonGroup>


      </Row>

      

      <Row style="margin-top: 10px;">
        <Table
          ref="table"
          size="small"
          :columns="header"
          :data="data"
          highlight-row
          @on-selection-change="select_change"
          @on-current-change="select_row"
          :loading="tableLoading"
          @on-row-dblclick="open_edit"
          @on-sort-change="sort"
        ></Table>
        <Page
          size="small"
          :total="total"
          :current.sync="page"
          show-total
          show-sizer
          show-elevator
          @on-change="page_change"
          @on-page-size-change="page_size_change"
          style="margin-top: 10px"
        ></Page>
      </Row>

    </card>

    <change-marker></change-marker>

</div>
    
</template>

<script>
import commonVue from "./commonVue";
import { DateFormat } from "../../../../libs/utils";
import changeMarker from "./op/change";
import { getLabelList } from "@A/systemManage";
    export default {
        name:'allPool',
        mixins: [commonVue],
        components:{
            changeMarker
        },
        data(){
            return{
                data:[],
                labelList: [],
                canSelectMore: false,
                search_model: 0,
                receiptLoading: false,
                tableLoading: true,
                header: [
                    
                    {
                    title: "姓名",
                    key: "NAME",
                    sortable: "custom",
                    width: 80
                    },
                    {
                    title: "归属公司",
                    key: "companynames",
                    width: 240,
                    render: (h, params) => {
                        if (
                        params.row.companynames == "" ||
                        params.row.companynames == null
                        ) {
                        return "";
                        } else {
                        // console.log(params.row.companynames)
                        let temp = params.row.companynames.split(",");
                        if (temp[0].length > 13) {
                            return h(
                            "Poptip",
                            {
                                props: {
                                trigger: "hover",
                                title: "归属公司",
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
                                        "公司名：" + item
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
                                title: "归属公司",
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
                                        "公司名：" + item
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
                      title: "客户状态",
                      key: "customerType",
                      width: 140,
                      sortable: "custom"
                    },
                    {
                    title: "公海池来源",
                    key: "srcPool",
                    width: 100
                    },
                    {
                    title: "备注",
                    key: "backup",
                    width: 100
                    },
                   
                    {
                    title: "跟进人",
                    key: "followbyname",
                    width: 120,
                    sortable: "custom"
                    },
                    {
                    title: "创建时间",
                    key: "CREATEDATE",
                    width: 120,
                    sortable: "custom"
                    },
                    {
                    title: "回滚时间",
                    key: "updatedate",
                    width: 120,
                    sortable: "custom"
                    
                    }
                ],
                data: [],
                page: 1,
                pageSize: 10,
                total: 0,
                tableLoading: true,
                formValidate: {                    
                    name: "",
                    tel:"",
                    companyname: "",
                    followbyname: "",
                    credate: [],
                    upddate: [],
                    order: "desc",
                    sortField: "clue_ranks"
                }
                
            }
        },
        methods:{

                getBatchIds(that){
                  let _self = that;
                  let ids = [];
                    
                    // if (this.canSelectMore) {
                    //     this.hanldeSelectMore();
                    // } 
                    if (_self.selectRow) {
                        //this.openEdit = true;
                         
                        if (_self.selectRowArray.length === 0) {
                            if (_self.canSelectMore) {
                                _self.hanldeSelectMore();
                            } 
                        } else {
                             for (let i = 0; i < _self.selectRowArray.length; i++) {
                                ids.push(_self.selectRowArray[i].ID);
                            }
                            
                        }
                        if (ids.length === 0){
                            ids.push(_self.selectRow.ID);
                        }
                    } 
                    return ids;
                },

                transferPool(name){
                  if(name === "-1"){return;}
                  let that = this;
                  let ids = that.getBatchIds(that);
                  if (ids.length === 0){
                      that.$Message.warning("请先选择！");
                      return;
                  }
                  
                  let url = `api/customer/public/pool/transferPool`;

                  let config = {
                    poolIds: ids.join(","),
                    poolTypeStr: name
                  };
                  function success(res) {
                    that.get_data();
                  }

                  function fail(err) {console.log(err)}

                  this.$Post(url, config, success, fail);
                  
                },

                batch_receipt(){
                  let that = this;
                  let ids = that.getBatchIds(that);
                  if (ids.length === 0){
                      that.$Message.warning("请先选择！");
                      return;
                  }
                  that.receiptLoading = true;
                  console.log(ids);
                 let url = `api/customer/receipt`;

                  let config = {
                    customerId: ids.join(",")
                  };
                  function success(res) {
                    that.get_data();
                    that.receiptLoading = false;
                  }

                  function fail(err) {
                    that.receiptLoading = false;
                  }

                  this.$Post(url, config, success, fail);

                },

                async getLabel() {
                  const resp = await getLabelList({ page: 1, pageSize: 100 });
                  this.labelList = resp.rows;
                },
                sort(e) {
                  if (e.order == "normal") {
                      this.order = "";
                      this.sortName = "updatedate";
                  } else {
                      this.sortName = e.key;
                      this.order = e.order;
                  }
                  this.get_data();
                },
                search() {
                  this.page = 1;
                  this.get_data();
                },
                hanldeSelectMore() {
                    if (this.canSelectMore) {
                        this.header.shift();
                        this.$refs["table"].selectAll(false);
                        // this.selectRow = [];
                        // this.select_Row(this.selectRow);
                    } else {
                        this.header.unshift({
                        title: "#",
                        type: "selection",
                        width: 60
                        });
                    }
                    this.canSelectMore = !this.canSelectMore;
                },
                handleReset() {
                this.page = 1;
                this.$refs["formValidate"].resetFields();
                this.formValidate.name = '';
                this.formValidate.tel = '';
                this.formValidate.followbyname = '';
                this.formValidate.credate = [];
                this.formValidate.upddate = [];
                this.get_data();
                },
                get_data() {
                let _self = this;
                let url = `api/customer/private/pool/list`;
                this.selectRow = "";
                _self.tableLoading = true;

                var config = {
                    params: {
                    deleteflag: "3",
                    poolType:1,
                    order: _self.order,
                    page: _self.page,
                    pageSize: _self.pageSize,
                    sortField: _self.sortName,
                    name: _self.formValidate.name,
                    tel: _self.formValidate.tel,
                    followbyname: _self.formValidate.followbyname,
                    companyName: _self.formValidate.companyname,
                    bcreatedate: DateFormat(_self.formValidate.credate[0]),
                    ecreatedate: DateFormat(_self.formValidate.credate[1]),
                    bupdatedate: DateFormat(_self.formValidate.upddate[0]),
                    eupdatedate: DateFormat(_self.formValidate.upddate[1])
                    }
                };

                function success(res) {
                    _self.data = res.data.data.rows;
                    _self.total = res.data.data.total;
                    for (let i = 0; i < _self.data.length; i++) {
                    
                    
                    _self.data[i].customerType = _self.findCustomerType(
                      _self.data[i].customerType
                    );
                   _self.data[i].poolType = _self.pool_type_map.get(
                      _self.data[i].poolType.toString()
                    );

                    _self.data[i].srcPool = _self.pool_type_map.get(
                      _self.data[i].srcPool.toString()
                    );

                   if (_self.data[i].CREATEDATE) {
                        _self.data[i].CREATEDATE = _self.data[i].CREATEDATE.slice(0, 10);
                    }
                    if (_self.data[i].updatedate) {
                        _self.data[i].updatedate = _self.data[i].updatedate.slice(0, 10);
                    }

                    }

                    _self.tableLoading = false;
                }

                this.$Get(url, config, success);
                },
                page_change(e) {
                this.page = e;
                this.get_data();
                },
                page_size_change(e) {
                this.pageSize = e;
                this.page = 1;
                this.get_data();
                },
                select_change(e) {
                this.selectRowArray = e;
                },
                select_row(e) {
                this.selectRow = e;
                // this.$store.commit("set_gobal_customer_id", e)
                },
                open_edit() {
                  if (this.selectRow) {
                    this.$store.commit("open_gobal_customer_detail_modal", this.selectRow);
                  } else {
                    this.$Message.warning("请选择一行!");
                  }
                },
                //  转换客户状态
                findCustomerType(temp) {
                  if (temp == "" || temp == null) {
                    return "";
                  } else {
                    let temp2 = temp.split("-");
                    let _self = this;
                    for (let i = 0; i < _self.customerTypes_array.length; i++) {
                      if (_self.customerTypes_array[i].id == temp2[1] && temp2[1] != "") {
                        return (
                          _self.customerTypes_array[i].ptypename +
                          " - " +
                          _self.customerTypes_array[i].typename
                        );
                      }
                    }
                  }
                }
        },
        created(){
            this.getLabel();
            let _self = this;
            
            this.get_data_center()
            .then(() => {
                _self.get_data();
            })
            .catch(() => {
                _self.get_data();
                _self.$Message.error("属性转换失败！");
            });

            this.$bus.off("Refresh_Private_Pool", true);
            this.$bus.on("Refresh_Private_Pool", e => {
              _self.get_data();
            });
        },
		computed:{
		}

    }
</script>

<style>
.ivu-table .demo-table-followdate-warning-row {
  color: #ff6600;
}
.ivu-col-span-6 {
  height: 28px;
}
</style>