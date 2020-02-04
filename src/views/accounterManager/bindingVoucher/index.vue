<template>
  <div>
    <Row>
      <Col>
        <Card>
          <Tabs value="name1">
            <TabPane label="2017" name="name1">
              <Row>
                办理状态:
                <span
                  v-for="item in status"
                  :key="item.id"
                  style="margin-right:5px;"
                  @click="chooseStatus(item.id)"
                  :style="item.id == statusIndex?'color:red':'color:black'"
                >{{item.name}}</span>
              </Row>
              <Row style="margin-top: 10px;" v-if="statusIndex == 0">
                <Table highlight-row size="small" :columns="columns" :data="data"></Table>
                <!-- @on-row-dblclick="TypeEdit" -->
                <!-- @on-current-change="selectRow" -->
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
              <Row style="margin-top: 10px;" v-if="statusIndex == 1">
                <Table highlight-row size="small" :columns="columns4" :data="data"></Table>
                <!-- @on-row-dblclick="TypeEdit" -->
                <!-- @on-current-change="selectRow" -->
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
            </TabPane>
            <TabPane label="2018" name="name2"></TabPane>
            <TabPane label="2019" name="name3"></TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
    <!-- <operation :modal1="modal1"></operation> -->

    <!-- 模态框1 -->
    <Modal v-model="modal1" width="1000">
      <p slot="header" style="color:#f60;text-align:center"></p>
      <div style="text-align:center;display:flex;">
        <Table
          :columns="columns1"
          :data="data1"
          style="width:50%;"
          @on-row-click="rowCilck"
          :highlight-row="true"
        ></Table>
        <div style="margin:70px 20px;">
          <p style="font-size:25px" @click="right">>></p>
          <p style="font-size:25px;margin-top:10px;" @click="left"><<</p>
        </div>
        <Table
          :columns="columns2"
          :data="data2"
          style="width:50%;"
          @on-row-click="rowCilck"
          :highlight-row="true"
        ></Table>
      </div>
      <div slot="footer">
        <Button type="primary" @click="Noz">不需要装订</Button>
        <Button type="primary" @click="Z">装订</Button>
      </div>
    </Modal>

    <!-- 不装订模态框 -->
    <Modal v-model="model2" @on-ok="ok" @on-cancel="cancel">
      <p>确定不需要装订吗？</p>
      <div style="display:flex;margin-top:10px;">
        <span style="display:inline-block;width:55px;">理由：</span>
        <Input v-model="value8" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder />
      </div>
    </Modal>

    <!-- 装订模态框 -->
    <Modal v-model="model3" width="500">
      <p slot="header" style="color:#f60;text-align:center"></p>
      <div style>
        <Row style="margin-bottom:5px;">
          <Col span="3">
            <span>企业：</span>
          </Col>
          <Col>
            <span>哈哈哈</span>
          </Col>
        </Row>
        <Row style="margin-bottom:5px;">
          <Col span="3">
            <span>名称：</span>
          </Col>
          <Col>
            <span>12313213</span>
          </Col>
        </Row>
        <Row style="margin-bottom:5px;">
          <Col span="3">
            <span>时间：</span>
          </Col>
          <Col span="10">
            <DatePicker type="date" placeholder="Select date" @on-change="Date1"></DatePicker>
          </Col>
          <Col span="10">
            <DatePicker type="date" placeholder="Select date" @on-change="Date1"></DatePicker>
          </Col>
        </Row>
        <Row style="margin-bottom:5px;">
          <Col span="3">
            <span>数量：</span>
          </Col>
          <Col>
            <InputNumber :max="10" :min="1" v-model="value1"></InputNumber>
          </Col>
        </Row>

        <Row style="margin-bottom:5px;">
          <Col span="3">
            <span>存放地：</span>
          </Col>
          <Col span="10">
            <Select v-model="model1">
              <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>
      <div slot="footer">
        <Button type="primary" @click="zhuang">装订</Button>
      </div>
    </Modal>

    <!-- 已办模态框 -->
    <Modal v-model="modal4" width="1200">
      <p slot="header" style="color:#f60;"></p>
      <div style="display:flex;">
        <div style="width:30%;border-right:1px solid #cccccc;">
          <p style="margin-bottom:5px">已办任务列表</p>
          <Table
            :columns="columns5"
            :data="data5"
            style="width:80%;"
            border
          ></Table>
        </div>
        <div style="width:60%;margin-left:62px;">
          <div style="width:100%;border-bottom:1px solid #cccccc;padding-bottom:30px;">
            <p style="margin-bottom:5px">装订列表</p>
            <Table :columns="columns6" :data="data6" border></Table>
          </div>
          <div style="width:100%;">
            <p style="margin-bottom:5px;margin-top:10px">不需要装订列表</p>
            <Table :columns="columns7" :data="data7" style="width:100%;" border></Table>
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import {getVoucher} from '@/api/bindingVoucher'
export default {
  components: {
    // operation
  },
  data() {
    return {
      status: [
        {
          id: 0,
          name: "待办"
        },
        {
          id: 1,
          name: "已办"
        }
      ],
      columns5: [
        {
          title: "序号",
          key: "index",
          align:"center"
        },
        {
          title: "已办任务",
          key: "renwu",
          className: "demo-table-info-column",
          align:"center"
        }
      ],
      data5: [
        {
          index: 0,
          renwu: "哈哈哈"
        },
        {
          index: 1,
          renwu: "呵呵呵呵呵"
        }
      ],
      columns6: [
        {
          title: "序号",
          key: "index",
          align:"center"
        },
        {
          title: "已办任务",
          key: "renwu",
          className: "demo-table-info-column",
          align:"center"
        },
        {
          title: "凭证名称",
          key: "name",
          align:"center"
        },
        {
          title: "数量",
          key: "num",
          align:"center"
        },
        {
          title: "存放地",
          key: "address",
          align:"center"
        }
      ],
      data6: [
        {
          index: 0,
          renwu: "哈哈哈",
          name: "35654654654",
          num: "0",
          address: "自存"
        },
        {
          index: 1,
          renwu: "呵呵呵呵呵",
          name: "35654654654",
          num: "0",
          address: "自存"
        }
      ],
      columns7: [
        {
          title: "序号",
          key: "index",
          align:"center"
        },
        {
          title: "已办任务",
          key: "renwu",
          className: "demo-table-info-column",
          align:"center"
        },
        {
          title: "备注原因",
          key: "remark",
          align:"center"
        }
      ],
      data7: [
        {
          index: 0,
          renwu: "哈哈哈",
          remark: "阿萨法诉讼费"
        },
        {
          index: 1,
          renwu: "呵呵呵呵呵",
          remark: "阿萨法诉讼费"
        }
      ],
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      columns1: [
        {
          title: "序号",
          key: "index"
        },
        {
          title: "待办任务",
          key: "renwu"
        }
      ],
      data1: [
        {
          index: 0,
          renwu: "哈哈哈"
        },
        {
          index: 1,
          renwu: "呵呵呵呵呵"
        },
        {
          index: 2,
          renwu: "啊啊啊啊啊"
        }
      ],
      columns2: [
        {
          title: "序号",
          key: "index"
        },
        {
          title: "待办任务",
          key: "renwu"
        }
      ],
      data2: [],
      provinceData: [],
      province: [],
      searchLabel: "",
      page: 1,
      pageSize: 10,
      pageTotal:'',
      title: "",
      data: [],
      modal1: false,
      model2: false,
      model3: false,
      shuju: "",
      index: "",
      value8: "",
      value1: "",
      modal4: false,
      statusIndex: 0,
      columns: [
        {
          title: "序号",
          key: "companyId"
        },
        {
          title: "公司名称",
          key: "CompanyName"
        },
        {
          title: "操作",
          key: "amount",
          width: 70,
          align: "center",
          // render: (h, params) => {
          //   return h("div", [
          //     h(
          //       "Button",
          //       {
          //         props: {
          //           type: "text",
          //           size: "small"
          //         },
          //         style: {
          //           marginRight: "5px"
          //         },
          //         on: {
          //           click: () => {
          //             console.log(this.modal1);
          //             this.modal1 = true;
          //           }
          //         }
          //       },
          //       ['']
          //     )
          //   ]);
          // }
        }
      ],
      columns4: [
        {
          title: "序号",
          key: "channel_type_code"
        },
        {
          title: "公司名称",
          key: "channel_type_name"
        },
        {
          title: "操作",
          key: "action",
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
                    color: "red",
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.modal4 = true;
                    }
                  }
                },
                ["1"]
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    chooseStatus(index) {
      this.statusIndex = index;
    },
    right() {
      this.data1.splice(this.index, 1);
      console.log(this.data1);
      if (this.shuju != "") {
        this.data2.push(this.shuju);
      }
      console.log(this.data2);
    },
    left() {
      this.data2.splice(this.index - 1, 1);
      console.log(this.data2);
      if (this.shuju != "") {
        this.data1.push(this.shuju);
      }
    },
    rowCilck(data) {
      this.shuju = data;
      this.index = data.index;
    },
    Noz() {
      this.model2 = true;
    },
    Z() {
      this.model3 = true;
    },
    ok() {
      this.modal1 = false;
      this.model2 = false;
    },
    zhuang() {
      this.modal1 = false;
      this.model3 = false;
    },
    // 获取表格数据
    getTableData() {
        getVoucher({}).then(res=>{
               console.log(res)
               this.data = res
               this.pageTotal = this.data.length;
               for(var i =0;i<this.data.length;i++){
                console.log(this.data[i].CompanyName)
               CompanyName:this.data[i].CompanyName
               companyId:this.data[i].companyId
               amount:this.data[i].amount
               }
           })
      // let _self = this;
      // if (_self.searchLabel == "") {
      //   var url =
      //     "/channel/type/list?page=" +
      //     _self.page +
      //     "&pageSize=" +
      //     _self.pageSize;
      // } else {
      //   var url =
      //     "/channel/type/list?page=" +
      //     _self.page +
      //     "&pageSize=" +
      //     _self.pageSize +
      //     "&channelTypeName=" +
      //     _self.searchLabel;
      // }

      // function doSuccess(re) {
      //   let _data = re.data.data;
      //   _self.pageTotal = _data.total;
      //   _self.data = [];
      //   for (let i = 0; i < _data.rows.length; i++) {
      //     _self.data.push({
      //       id: _data.rows[i].id,
      //       channel_type_code: _data.rows[i].channel_type_code,
      //       channel_type_name: _data.rows[i].channel_type_name,
      //       action: _data.rows[i].action,
      //       pId: _data.rows[i].pId || "",
      //       cId: _data.rows[i].cId || "",
      //       aId: _data.rows[i].aId || ""
      //     });
      //   }
      // }

      // this.GetData(url, doSuccess);
    },
    getProvice() {
      let provinceData = localStorage.getItem("province");
      if (provinceData) {
        return (this.provinceData = JSON.parse(provinceData));
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

        localStorage.setItem("province", JSON.stringify(this.provinceData));
      };
      this.GetData(url, doSuccess);
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
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>



<style>
.ivu-table {
  width: 100%;
}
.ivu-table td.demo-table-info-column {
  color: red;
}
</style>