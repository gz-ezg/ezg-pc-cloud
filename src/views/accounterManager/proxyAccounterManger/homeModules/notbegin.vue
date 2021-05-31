<template>
  <Card>
    <Row style="margin-top: 10px;">
      <Table
        height="400"
        @on-current-change="selectRow"
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
  </Card>
</template>

<script>
import Clipboard from "clipboard";
import * as accountApi from "../serving/api";
import Bus from "../../../../components/bus";
export default {
  name: "notbegins",
  data() {
    return {
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
      cservicest_map: new Map(),
      SearchValidate: {
        CompanyName: "",
        server_realname: "",
        followby_realname: "",
        begin_end_period: "",
        end_end_period: "",
        departname: ""
        // note_kj_flag: '',
        // etaxStatus: ''
      },
      data: [],
      // 眼睛哥tip：修改配置成你想要得字段
      header: [
        {
          title: "操作",
          key: "action",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.start_serve(params.row);
                    }
                  }
                },
                "开始服务"
              )
            ]);
          }
        },
        {
          title: "企业",
          key: "CompanyName",
          minWidth: 180
        },

        {
          title: "产品",
          key: "product",
          minWidth: 200
        },
        {
          title: "开始税期",
          key: "begin_period",
          minWidth: 80
        },
        {
          title: "结束税期",
          key: "end_period",
          minWidth: 80
        },
        {
          title: "市场",
          key: "followby_realname",
          minWidth: 80
        },
        {
          title: "会计",
          key: "server_realname",
          minWidth: 80
        }
      ]
    };
  },
  methods: {
    follow_record(e) {
      this.$bus.emit("OPEN_FOLLOW_RECORD", e);
    },
    selectRow(e) {
      this.current_row = e;
    },
    pageChange(a) {
      let _self = this;
      _self.page = a;
      _self.current_row = "";
      _self.get_data();
    },

    pageSizeChange(a) {
      let _self = this;
      _self.pageSize = a;
      _self.current_row = "";
      _self.get_data();
    },
    Search() {
      this.page = 1;
      this.current_row = "";
      this.get_data();
    },
    handleReset() {
      this.SearchValidate.CompanyName = "";
      this.SearchValidate.server_realname = "";
      this.SearchValidate.followby_realname = "";
      this.SearchValidate.begin_end_period = "";
      this.SearchValidate.end_end_period = "";
      this.SearchValidate.departname = "";
      this.current_row = "";
      // this.SearchValidate.note_kj_flag = '';
      // this.SearchValidate.etaxStatus = '';
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
    open_account_list(e) {
      this.$bus.emit("OPEN_ACCOUNT_LIST", e);
    },
    open_undo_list(e) {
      this.$bus.emit("OPEN_UNDO_LIST", e);
    },
    invoice(e) {
      this.$bus.emit("OPEN_INVOICE_PAGE", e);
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
    data_management(e) {
      this.$bus.emit("OPEN_DATA_MANAGEMENT", e);
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
    completed(id) {
      let _self = this;
      _self.comLoading = true;
      let url = `api/order/cycle/service/dljz/fininshTask`;
      let config = {
        params: {
          taskId: id,
          taskSummary: _self.taskSummary,
          mission: "Completed"
        }
      };
      function success(res) {
        _self.comLoading = false;
        _self.get_data();
      }

      function fail(err) {}
      this.$Get(url, config, success, fail);
    },
    field(e) {
      this.$bus.emit("OPEN_FIELD_DETAIL", e);
    },
    open_import_list(e) {
      this.$bus.emit("OPEN_IMPORT_LIST", e);
    },
    level(e) {
      this.$bus.emit("OPEN_LEVEL_PAGE", e);
    },
    start_serve(row) {
      this.current_row = row;
      console.log("ceshi", this.current_row);
      if (this.current_row == "" || this.current_row == null) {
        this.$Message.warning("请选择一行进行操作");
      } else {
        if (
          this.current_row.gdsreport == "ybd" ||
          this.current_row.gdsreport == "bybd"
        ) {
          this.$store.commit("setPageId", this.current_row.id);
          this.$store.commit(
            "open_gobal_company_detail_modal",
            this.current_row.company_id
          );
          let begin_period = this.current_row.begin_period;
          begin_period = begin_period.substring(0,4) + "-" + begin_period.substring(4,6);
          this.$store.commit("setIfMatch", this.current_row.if_match);
          this.$store.commit("setServiceDemo", this.current_row.service_memo);
          this.$store.commit('setProductId', this.current_row.product_id)
          this.$store.commit('setServicestartdate', begin_period)
        } else {
          this.$Message.warning("国地税未报到，无法开始服务！");
        }
      }
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
      let url = `api/order/cycle/service/dljz/cycleRecordList`;
      let config = {
        params: {
          page: _self.page,
          pageSize: _self.pageSize,
          service_status: "notStarted",
          sortField: "unit_price",
          //service_type: "dljz",
          CompanyName: _self.SearchValidate.CompanyName,
          server_realname: _self.SearchValidate.server_realname,
          followby_realname: _self.SearchValidate.followby_realname,
          begin_end_period: _self.SearchValidate.begin_end_period,
          end_end_period: _self.SearchValidate.end_end_period,
          departname: _self.SearchValidate.departname
          // note_kj_flag: _self.SearchValidate.note_kj_flag,
          // hasEAccount: _self.SearchValidate.etaxStatus == 1 ? 1 : '',
          // hasEAccountAndWrong: _self.SearchValidate.etaxStatus == 2 ? 1 : '',
          // hasNotEAccount: _self.SearchValidate.etaxStatus == 3 ? 1 : ''
        }
      };
      function success(res) {
        _self.data = res.data.data.rows;
        _self.$emit("change", "notbeginTotal", res.data.data.total);
        _self.data = res.data.data.rows.map(item => {
          item.service_status = _self.cservicest_map.get(item.service_status);
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
      let params = "cservicest,managestatus,financialLevel";
      try {
        let {
          cservicest,
          managestatus,
          financialLevel
        } = await accountApi.getDictionary(params);
        this.cservicest = cservicest;
        this.cservicest_map = this.$array2map(this.cservicest);
        this.managestatus = managestatus;
        this.managestatus_map = this.$array2map(managestatus);
        this.financialLevel = financialLevel;
      } catch (error) {
        console.log(error);
      }
      // console.log(this.managestatus_map)
    }
  },
  created() {
    let _self = this;
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
  }
};
</script>

<style>
.ivu-col-span-6 {
  height: 28px;
}
</style>