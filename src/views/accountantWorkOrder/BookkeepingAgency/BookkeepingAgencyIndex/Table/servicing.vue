<template>
  <Card>
    <Row style="margin-bottom:20px">
      <Collapse v-model="search_model">
        <Panel name="1">
          <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
          筛选
          <div slot="content" @keydown.enter="Search">
            <Form ref="SearchValidate" :model="SearchValidate" :label-width="130" style="margin-top: 15px">
              <Row :gutter="8" style="height:56px">
                <Col span="8">
                  <FormItem label="企业名称：" prop="CompanyName">
                    <Input v-model="SearchValidate.CompanyName" size="small"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="服务人员：" prop="server_realname">
                    <Input v-model="SearchValidate.server_realname" size="small"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="结束账期：" prop="followby_realname">
                    <Input v-model="SearchValidate.begin_end_period" size="small" style="width:40%" placeholder="201807"></Input>
                    -
                    <Input v-model="SearchValidate.end_end_period" size="small" style="width:40%" placeholder="201807"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row :gutter="8" style="height:56px">
                <Col span="8">
                  <FormItem label="客户跟进：" prop="note_kj_flag">
                    <Select v-model="SearchValidate.note_kj_flag" size="small" style="width:100%">
                      <Option value="Y">完成</Option>
                      <Option value="N">未完成</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="电子税务局状态：" prop="etaxStatus">
                    <Select v-model="SearchValidate.etaxStatus" size="small" style="width:100%">
                      <Option :value="1">账号正常</Option>
                      <Option :value="2">账号异常</Option>
                      <Option :value="3">无账号</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <center>
                <FormItem>
                  <Button type="primary" @click="Search">搜索</Button>
                  <Button type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
                </FormItem>
              </center>
            </Form>
          </div>
        </Panel>
      </Collapse>
    </Row>
    <Row>
      <ButtonGroup>
        <Button type="primary" icon="ios-color-wand-outline" @click="stop_service" v-permission="['bookkeepingAgency.stop']"
          >停止服务</Button
        >
        <Button type="primary" icon="information-circled" @click="fpkj">变更会计</Button>
        <Button type="primary" icon="ios-color-wand-outline" @click="setLevel">设置财务等级</Button>
        <Button type="primary" icon="ios-color-wand-outline" @click="openFollow">服务详情</Button>
        <Button type="primary" icon="ios-color-wand-outline" @click="openFieldByCompanyId">外勤详情</Button>
        <Button type="primary" icon="ios-color-wand-outline" @click="open_change_log">变更日志</Button>
        <Button type="primary" icon="ios-color-wand-outline" @click="update_service">同步月服务记录</Button>
        <Button type="primary" icon="ios-color-wand-outline" @click="update_etax_info">更新税务信息</Button>
        <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button>
        <Button type="primary" icon="ios-color-wand-outline" @click="open_bill">票据属性</Button>
        <Button type="primary" icon="ios-color-wand-outline" @click="open_bill_histroy">历史票据</Button>
      </ButtonGroup>
    </Row>
    <Row style="margin-top: 10px;">
      <Table
        @on-current-change="selectRow"
        :loading="loading"
        ref="selection"
        highlight-row
        size="small"
        :columns="header"
        :row-class-name="rowClassName"
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
    <Modal v-model="accout_level_open" title="设置账务等级" width="300">
      <Row>
        <center>{{ current_row.companyname }}</center>
      </Row>
      <Row style="margin-top:20px">
        <center>
          <Select v-model="current_row.accountgrade" type="size" style="width:150px">
            <Option v-for="item in financialLevel" :key="item.id" :value="item.typecode">{{ item.typename }}</Option>
          </Select>
        </center>
      </Row>
      <div slot="footer">
        <Button @click="set_account_level" type="primary">设置</Button>
      </div>
    </Modal>
    <Modal v-model="finsih_work" title="完成节点" width="500">
      <Row>
        <div v-for="(item, index) in show_img" :key="index">
          <Row>
            <center>
              <img :src="item.src" alt="节点" style="width: 300px;height:300px;" />
            </center>
          </Row>
          <center>
            <Button type="text" @click="fileRemove(item)">移除</Button>
          </center>
        </div>
        <Upload ref="upload" :before-upload="handleUpload" action="">
          <Button type="ghost" icon="ios-cloud-upload-outline" style="margin:auto">选择文件</Button>
        </Upload>
      </Row>
      <div slot="footer">
        <Button type="primary" style="margin:auto" @click="finsih_upload" :loading="finsih_loading">提交</Button>
      </div>
    </Modal>
    <Modal title="无效账号企业" width="500" v-model="openInvalidCompany">
      <Table size="small" :columns="inValidHeader" :data="detailList"></Table>
      <div slot="footer"></div>
    </Modal>
    <follow-up :company="current_row" v-if="openFollowUp" @close="openFollowUp = false"></follow-up>
    <bill :status="status"></bill>
    <bill-histroy :status="status"></bill-histroy>
  </Card>
</template>

<script>
import Bus from '../../../../../components/bus';
import { yasuo } from '../../../../../libs/img_beforeUpload';
import * as accountApi from '../../api';
import followUp from './followUp';
import bill from './bill';
import billHistroy from './billHistroy';

export default {
  components: {
    followUp,
    bill,
    billHistroy
  },
  data() {
    return {
      //  异常信息
      openFollowUp: false,
      openInvalidCompany: false,
      countList: [],
      detailList: [],
      inValidHeader: [
        {
          title: '企业名称',
          key: 'companyname'
        },
        {
          title: '服务状态',
          key: 'service_status',
          width: 90
        },
        {
          title: '操作',
          width: 120,
          render: (h, params) => {
            return h(
              'Button',
              {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$store.commit('open_gobal_company_detail_modal', params.row.companyid);
                  }
                }
              },
              '[查看公司]'
            );
          }
        }
      ],
      time: '',
      managestatus: [],
      managestatus_map: new Map(),
      finsih_loading: false,
      upload_id: '',
      finsih_work: false,
      img_array: [],
      show_img: [],
      financialLevel: '',
      accout_level_open: false,
      cservicest: '',
      cservicest_map: new Map(),
      loading: false,
      search_model: '',
      SearchValidate: {
        CompanyName: '',
        server_realname: '',
        followby_realname: '',
        begin_end_period: '',
        end_end_period: '',
        note_kj_flag: '',
        etaxStatus: ''
      },
      current_row: '',
      page: 1,
      pageSize: 10,
      tiaozheng: false,
      zl: false,
      zz: false,
      bs: false,
      zlid: '',
      zzid: '',
      bsid: '',
      search_model: '',
      id: {},
      pageTotal: 0,
      task_message: {
        companyName: '1111111111'
      },
      data: [],
      currentIndex: -1,
      header: [
        {
          title: '对应企业',
          key: 'companyname',
          minWidth: 250
        },
        {
          title: '企业经营状态',
          key: 'managestatusName',
          width: 120
        },
        {
          title: '产品名称',
          key: 'product',
          minWidth: 180
        },
        {
          title: '服务人员',
          key: 'realname',
          minWidth: 120
        },
        {
          title: '服务状态',
          key: 'service_status',
          minWidth: 120
        },
        {
          title: '结束税期',
          key: 'end_period',
          minWidth: 120
        },
        {
          title: '单价',
          key: 'unit_price',
          minWidth: 160,
          render: (h, params) => {
            let _self = this;
            if (params.index != this.currentIndex) {
              return h('div', [
                h(
                  'span',
                  {
                    style: {
                      display: 'inline-block',
                      lineHeight: '24px',
                      height: '24px',
                      width: '40px'
                    }
                  },
                  params.row.unit_price
                ),
                h(
                  'Button',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: function() {
                        _self.handle_edit_unit_price(params.row, params.index);
                      }
                    }
                  },
                  '修改'
                )
              ]);
            } else {
              return h('div', [
                h('Input', {
                  props: {
                    value: this.data[params.index].unit_price,
                    size: 'small'
                  },
                  style: {
                    display: 'inline-block',
                    width: '60px'
                  },
                  on: {
                    'on-blur': function(event) {
                      _self.data[params.index].unit_price = event.target.value;
                    }
                  }
                }),
                h(
                  'Button',
                  {
                    props: {
                      type: 'info',
                      size: 'small'
                    },
                    style: {
                      display: 'inline-block'
                    },
                    on: {
                      click: () => {
                        console.log('123');
                        _self.update_unit_price(params.index);
                      }
                    }
                  },
                  '保存'
                )
              ]);
            }
          }
        },
        {
          title: '备注',
          key: 'memo',
          minWidth: 200,
          render: (h, params) => {
            return h('div', {
              domProps: {
                innerHTML: params.row.memo
              }
            });
          }
          // render:(h,params) => {
          //     if(params.row.memo == ''||params.row.memo == null){
          //         return ''
          //     }else if(params.row.memo.length>12){
          //         return h('Poptip',{
          //             props:{
          //                 trigger:'hover',
          //                 placement:'bottom'
          //             }
          //         },[
          //             h('span',params.row.memo.slice(0,12)+'...'),
          //             h('Icon', {
          //                 props: {
          //                     type: 'arrow-down-b',
          //                 }
          //             }),
          //             h('div',{
          //                 slot:'content',

          //             },[
          //                 h('span',params.row.memo)
          //             ])
          //         ])
          //     }else{
          //         return h('span',params.row.memo)
          //     }
          // }
        },
        {
          title: '报税',
          key: 'baoshui',
          width: 120,
          align: 'center',
          render: (h, params) => {
            let reg = /^[-+]?\d*$/;
            if (params.row.baoshui.confirm_date == undefined) {
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.zlwc(params.row.baoshui);
                      }
                    }
                  },
                  '[ 完成 ]'
                )
              ]);
            } else {
              return h('div', params.row.baoshui.confirm_date.slice(0, 10));
            }
          }
        },
        {
          title: '做账',
          key: 'zuozhang',
          align: 'center',
          width: 120,
          render: (h, params) => {
            let reg = /^[-+]?\d*$/;
            if (params.row.zuozhang.confirm_date == undefined) {
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.zlwc(params.row.zuozhang);
                      }
                    }
                  },
                  '[ 完成 ]'
                )
              ]);
            } else {
              return h('div', params.row.zuozhang.confirm_date.slice(0, 10));
            }
          }
        },
        {
          title: '客户跟进',
          key: 'note_kj_flag',
          minWidth: 120
        },
        {
          title: '警戒值',
          key: 'accounter_security_line',
          minWidth: 120
        },
        {
          title: '账务等级',
          key: 'accountgrade',
          minWidth: 120
        },
        {
          title: '累计外勤',
          key: 'dljz_legwork',
          minWidth: 100
        },
        {
          title: '实名账号',
          key: 'has_account',
          minWidth: 120
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.$store.commit('open_gobal_company_detail_modal', params.row.company_id);
                    }
                  }
                },
                '[查看公司]'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      if (params.row.batchBookId != null) {
                        Bus.$emit('open_yichang_detail', params.row.batchBookId);
                      } else {
                        this.$Message.warning('未绑定账本');
                      }
                    }
                  }
                },
                '[查看异常]'
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    downloadExcel() {
      let field = [
        {
          field: 'service_status',
          title: '服务状态',
          format: 'cservicest'
        },
        {
          field: 'customername',
          title: '客户名称'
        },
        {
          field: 'companyname',
          title: '对应企业'
        },
        {
          field: 'product',
          title: '产品名称'
        },
        {
          field: 'realname',
          title: '服务人员'
        },
        {
          field: 'followbyrealname',
          title: '市场'
        },
        {
          field: 'unitprice',
          title: '单价'
        },
        {
          field: 'end_period',
          title: '结束期间'
        },
        {
          field: 'memo',
          title: '备注'
        },
        {
          field: 'unit_price',
          title: '单价'
        }
      ];
      let _self = this;
      let url = `api/order/cycle/month/service/list`;
      let config = {
        page: '1',
        pageSize: '1000000',
        period: _self.time,
        companyname: _self.SearchValidate.CompanyName,
        realname: _self.SearchValidate.server_realname,
        sortField: 'updatedate',
        followbyrealname: _self.SearchValidate.followby_realname,
        begin_end_period: _self.SearchValidate.begin_end_period,
        end_end_period: _self.SearchValidate.end_end_period,
        note_kj_flag: _self.SearchValidate.note_kj_flag,
        hasEAccount: _self.SearchValidate.etaxStatus == 1 ? 1 : '',
        hasEAccountAndWrong: _self.SearchValidate.etaxStatus == 2 ? 1 : '',
        hasNotEAccount: _self.SearchValidate.etaxStatus == 3 ? 1 : '',
        export: 'Y',
        exportField: encodeURI(JSON.stringify(field))
      };
      let toExcel = this.$MergeURL(url, config);
      window.open(toExcel);
    },
    handleReset() {
      this.SearchValidate.CompanyName = '';
      this.SearchValidate.server_realname = '';
      this.SearchValidate.followby_realname = '';
      this.SearchValidate.begin_end_period = '';
      this.SearchValidate.end_end_period = '';
      this.SearchValidate.note_kj_flag = '';
      this.SearchValidate.etaxStatus = '';
      this.Search();
    },
    Search() {
      this.page = 1;
      this.getData();
    },
    show(e) {
      if (e.key == 'Enter') {
        this.Search();
      }
    },
    async getData() {
      let _self = this;
      _self.loading = true;
      let config = {
        params: {
          page: _self.page,
          pageSize: _self.pageSize,
          period: _self.time,
          sortField: 'updatedate',
          companyname: _self.SearchValidate.CompanyName,
          realname: _self.SearchValidate.server_realname,
          followbyrealname: _self.SearchValidate.followby_realname,
          begin_end_period: _self.SearchValidate.begin_end_period,
          end_end_period: _self.SearchValidate.end_end_period,
          note_kj_flag: _self.SearchValidate.note_kj_flag,
          hasEAccount: _self.SearchValidate.etaxStatus == 1 ? 1 : '',
          hasEAccountAndWrong: _self.SearchValidate.etaxStatus == 2 ? 1 : '',
          hasNotEAccount: _self.SearchValidate.etaxStatus == 3 ? 1 : ''
        }
      };

      try {
        let { total, rows } = await accountApi.getOrderCycleMonthServiceList(config);
        this.pageTotal = total;
        this.data = rows.map(item => {
          item.service_status = this.cservicest_map.get(item.service_status);
          item.managestatusName = this.managestatus_map.get(item.managestatus);
          item.note_kj_flag = item.note_kj_flag == 'Y' ? '完成' : '未完成';
          return item;
        });
      } catch (error) {
        console.log(error);
      }

      this.loading = false;
    },
    pageChange(a) {
      let _self = this;
      _self.page = a;
      _self.getData();
    },

    pageSizeChange(a) {
      let _self = this;
      _self.pageSize = a;
      _self.getData();
    },

    // 分配会计
    fpkj() {
      let _self = this;

      if (_self.current_row == '' || _self.current_row == undefined) {
        this.$Message.warning('请选择要变更会计的项目');
      } else {
        _self.current_row.workordermemo = _self.current_row.memo;
        _self.current_row.followby_realname = _self.current_row.followbyrealname;
        _self.current_row.CompanyName = _self.current_row.companyname;
        Bus.$emit('fenpei', _self.current_row);
      }
    },

    stop_service() {
      let _self = this;

      if (_self.current_row) {
        this.$Modal.confirm({
          title: '提示信息',
          content: '<p>您确定停止服务吗</p>',
          onOk: async () => {
            let config = {
              id: _self.current_row.cycle_service_record_id,
              serviceStatus: 'stop'
            };
            try {
              let { status, data } = await accountApi.cycleServiceRecordUpdate(config);
              if (status) {
                _self.page = 1;
                _self.getData();
              }
            } catch (error) {
              console.log(error);
            }
          },
          onCancel: () => {}
        });
      } else {
        _self.$Message.warning('请选择要停止服务的工单！');
      }
    },

    selectRow(e) {
      this.current_row = e;
      // 				console.log("eeee")
      // 				console.log(e)
    },
    fileRemove(e) {
      this.img_array.splice(this.img_array.indexOf(e), 1);
      this.show_img.splice(this.show_img.indexOf(e), 1);
    },

    handleUpload(file) {
      let _self = this;
      this.img_array.push(file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let filename = file.name;
      reader.onload = function(file) {
        var imgMsg = {
          name: filename,
          src: this.result
        };
        _self.show_img.push(imgMsg);
      };
      return false;
    },
    zlwc(e) {
      let _self = this;
      this.finsih_work = true;
      this.img_array = [];
      this.show_img = [];
      this.upload_id = e;
    },

    async finsih_upload() {
      let _self = this;
      if (_self.img_array.length == 1) {
        _self.finsih_loading = true;

        let formdata = new FormData();
        formdata.append('monthServiceItemId', _self.upload_id);
        formdata.append('file', _self.img_array[0]);

        try {
          let { status, data } = await accountApi.cycleMonthServiceItemFinish(formdata);

          if (status) {
            this.finsih_work = false;
            this.img_array = [];
            this.show_img = [];
            this.getData();
          }
        } catch (error) {
          console.log(error);
        }

        this.finsih_loading = false;
      } else {
        this.$Message.warning('请上传图片！(最多上传一张图片)');
      }
    },

    rowClassName(row, index) {
      let _self = this;
      if (row.balance_count <= 2) {
        return 'demo-table-error-row2';
      }
    },
    async get_data_center() {
      let params = 'cservicest,managestatus,financialLevel';
      try {
        let { cservicest, managestatus, financialLevel } = await accountApi.getDictionary(params);
        this.cservicest = cservicest;
        this.cservicest_map = this.$array2map(this.cservicest);
        this.managestatus = managestatus;
        this.managestatus_map = this.$array2map(managestatus);
        this.financialLevel = financialLevel;
      } catch (error) {
        console.log(error);
      }
      // console.log(this.managestatus_map)
    },
    setLevel() {
      let _self = this;
      if (_self.current_row == '' || _self.current_row == null) {
        _self.$Message.warning('请选择要设置的记录！');
      } else {
        _self.accout_level_open = true;
      }
    },
    async set_account_level() {
      let config = {
        companyid: this.current_row.company_id,
        accountgrade: this.current_row.accountgrade
      };

      try {
        let { status, data } = await accountApi.saveAccountGradeMsg(config);
        if (status) {
          this.accout_level_open = false;
          this.getData();
        }
      } catch (error) {
        console.log(error);
      }
    },
    openFollow() {
      let _self = this;
      if (_self.current_row == '' || _self.current_row == null) {
        _self.$Message.warning('请选择要设置的记录！');
      } else {
        // _self.$bus.emit('open_booking_follow',_self.current_row)
        this.openFollowUp = true;
      }
    },
    //  打开会计变更日志（由于接口问题，暂时关闭，等接口修复完成后发布）
    open_change_log() {
      let _self = this;

      if (!_self.current_row) {
        this.$Message.warning('请选择要查看的项目！');
      } else {
        _self.$bus.emit('rizhi', _self.current_row.cycle_service_record_id);
      }
    },
    //  打开外勤信息
    openFieldByCompanyId() {
      let _self = this;
      if (!_self.current_row) {
        this.$Message.warning('请选择要查看的项目！');
      } else {
        _self.$bus.emit('OPEN_FIELD_LIST_BY_COMPANYID', [_self.current_row.company_id, _self.current_row.companyname]);
      }
    },
    //  获取电子税务局账号异常的信息
    async get_etax_error() {
      let _self = this;
      try {
        let { countList, detailList } = await accountApi.getNotRecordTaxAccountCompanyInfos();
        _self.countList = countList;
        _self.detailList = detailList;
        if (_self.detailList.length) {
          _self.$Notice.info({
            name: 'etax',
            title: '账号异常通知',
            duration: 0,
            render: (h, params) => {
              return h('div', [
                '部分企业电子税务局账号无效！',
                h(
                  'Button',
                  {
                    props: {
                      type: 'info',
                      size: 'small'
                    },
                    class: 'ivu-btn ivu-btn-info',
                    on: {
                      click: () => {
                        _self.$Notice.close('etax');
                        _self.openInvalidCompany = true;
                      }
                    }
                  },
                  '查看详情'
                )
              ]);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    handle_edit_unit_price(row, index) {
      this.currentIndex = index;
    },
    async update_unit_price(index) {
      let config = {
        workOrderId: this.data[index].cycle_work_order_id,
        unitprice: this.data[index].unit_price
      };

      try {
        let { status, data } = await accountApi.workOrderCycleUnitPriceUpdate(config);
        if (status) {
          (this.currentIndex = -1), this.getData();
        }
      } catch (error) {
        console.log(error);
      }
    },
    //  更新电子税务局信息
    async update_etax_info() {
      if (!this.current_row) {
        this.$Message.warning('请选择要查看的企业！');
      } else {
        // let config = {
        //     companyId: this.current_row.company_id,
        //     yearAndMonth: this.time
        // }

        try {
          let config = new FormData();
          let now = new Date();
          let currentYear = now.getFullYear();
          let currentTime = currentYear + (now.getMonth() < 9 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1);
          config.append('companyId', this.current_row.company_id);
          config.append('yearAndMonth', currentTime);

          let { status, data } = await accountApi.orderSpiderETaxDeclare(config);
          if (status) {
            this.getData();
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    //  更新服务动态
    async update_service() {
      if (!this.current_row) {
        this.$Message.warning('请选择要查看的企业！');
      } else {
        // let config = {
        //     companyId: this.current_row.company_id,
        //     yearAndMonth: this.time
        // }

        try {
          let config = new FormData();
          let now = new Date();
          let currentYear = now.getFullYear();
          let currentTime = currentYear + (now.getMonth() < 9 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1);
          config.append('companyId', this.current_row.company_id);
          config.append('yearAndMonth', currentTime);

          let { status, data } = await accountApi.orderETaxSynchronizeCycleMonthServiceItemFinish(config);
          if (status) {
            this.getData();
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    open_bill() {
      let _self = this;
      if (_self.current_row) {
        _self.$bus.emit('OPEN_bill', _self.current_row);
      } else {
        _self.$Message.warning('请选择一行查看');
      }
    },
    open_bill_histroy() {
      let _self = this;
      if (_self.current_row) {
        _self.$bus.emit('OPEN_bill_History', _self.current_row);
      } else {
        _self.$Message.warning('请选择一行查看');
      }
    }
  },
  async created() {
    let _self = this;
    this.get_etax_error();
    await this.get_data_center();
    let now = new Date();
    let year = '';
    let month = '';
    if (now.getMonth() == 0) {
      year = now.getFullYear() - 1;
      month = '12';
    } else {
      year = now.getFullYear();
      if (now.getMonth() <= 9) {
        month = '0' + now.getMonth();
      } else {
        month = now.getMonth();
      }
    }
    _self.time = year.toString() + month.toString();
    await this.getData();
    Bus.$on('UPDATE_ALL_ACCOUNT_PAGE', e => {
      _self.getData();
    });
    Bus.$on('update_auditlist_detail', e => {
      _self.getData();
    });
  }
};
</script>

<style>
.demo-table-error-row2 {
  color: red;
}
</style>
