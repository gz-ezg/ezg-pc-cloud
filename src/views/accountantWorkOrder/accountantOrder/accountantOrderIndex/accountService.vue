<template>
    <div>
        <Modal
                v-model="kjfuwu"
                title="会计到家服务流水"
                width="100%">
        <Row :gutter="16">
            <Col span="10">
                <Row>
                    <Card>
                        <p slot="title">企业详情</p>
                        <Row>
                            <Col><p>公司名称:{{detail.companyname}}</p></Col>
                        </Row>
                        <Row>
                            <Col span="12"><p>客户名称:	{{detail.NAME}}</p></Col>
                            <Col span="12"><p>联系电话:	{{detail.TEL}}</p></Col>
                        </Row>
                        <Row>
                            <Col span="12"><p>服务内容:	{{detail.product}}</p></Col>
                            <Col span="12"><p>服务时长:	{{detail.serviceTime}}小时</p></Col>
                        </Row>
                        <Row>
                            <Col span="12"><p>剩余总时长:	{{detail.residueTime}}小时</p></Col>
                            <Col span="12"><p>当月剩余时长:	{{detail.currentMonthResidueTime}}小时</p></Col>
                        </Row>
                        <Row>
                            <Col span="12"><p>服务开始时间:	{{detail.service_begin_time}}</p></Col>
                            <Col span="12"><p>预计完成时间:	</p></Col>
                        </Row>
                        <Row>
                            <Col span="12"><p>创建人:	{{detail.crealname}}</p></Col>
                            <Col span="12"><p>创建时间:	{{detail.createdate}}</p></Col>
                        </Row>
                        <Row>
                            <Col span="12"><p>更新人:	{{detail.urealname}}</p></Col>
                            <Col span="12"><p>更新时间:	{{detail.updatedate}}</p></Col>
                        </Row>
                    </Card>
                </Row>
                <Row style="margin-top: 10px">
                    <Card>
                        <p slot="title">初访信息备注</p>
                        <Row><Input size="small" v-model="detail.service_memo" type="textarea" :rows="4" :disabled="isShow"></Input></Row>
                        <Row style="margin-top: 15px"><Button type="success" long v-show="!isShow" @click="saveMemo">保存</Button></Row>
                    </Card>
                </Row>
                <Row style="margin-top: 10px">
                    <Card>
                        <p slot="title">当前服务梯队</p>
                        <Row>
                            <Col span="8"><Icon type="person"></Icon>销售人员：{{serviceEchelon.followbyname}}</Col>
                            <Col span="8"><Icon type="person"></Icon>服务会计：{{serviceEchelon.servername}}</Col>
                            <Col span="8"><Icon type="person"></Icon>主管会计：{{serviceEchelon.managername}}</Col>
                        </Row>
                        <!-- <Row style="margin-top:10px" type="flex" justify="center" class="code-row-bg">
                            <Timeline pending>
                                <TimelineItem>
                                    <b class="time">2018-01-03</b>
                                    <p class="content">
                                        <p>服务会计：胡小红</p>
                                        <p>主管会计：蔡闻正</p>
                                    </p>
                                </TimelineItem>
                            </Timeline>
                        </Row> -->
                    </Card>
                </Row>
            </Col>
            <Col span="14">
                <Card>
                    <p slot="title">服务详情</p>
                    <Row>
                        <Col span="12">服务外勤总数/计划外勤总数:	{{serviceCount.service_count}}/{{serviceCount.plan_service_item_count}}次</Col>
                        <Col span="12">	客户投诉量:	个</Col>
                    </Row>
                    <Row>
                        <Col span="12">平均服务时长/计划服务时长:	{{serviceCount.avg_service_time}} /小时</Col>
                    </Row>
                    <Row>
                        <Col span="12">计划完成总数:	{{serviceCount.planServiceCount}}次</Col>
                        <Col span="12">计划流产总数:	{{serviceCount.lc}}次</Col>
                    </Row>
                    <Row>
                        <Col span="8">超计划总数:	{{serviceCount.overtop_service_count_sum}}次</Col>
                    </Row>
                    <Row style="margin-top:10px">
                        <ButtonGroup>
                            <Button type="primary" icon="information-circled" @click="addGZ">新增业务跟踪</Button>
                        </ButtonGroup>
                    </Row>
                    <!-- <Row style="margin-top: 10px">
                    <Card style="margin-top:15px">
                    <Row justify="center">
                        <Col span="4"><p style="text-align:center">全部</p><p style="text-align:center">{{serviceCount.service_count}}</p></Col>
                        <Col span="4"><p style="text-align:center">同意</p><p style="text-align:center">{{serviceCount.agree_count}}</p></Col>
                        <Col span="4"><p style="text-align:center">完成</p><p style="text-align:center">{{serviceCount.finished_count}}</p></Col>
                        <Col span="4"><p style="text-align:center">不同意</p><p style="text-align:center">{{serviceCount.disagree_count}}</p></Col>
                        <Col span="4"><p style="text-align:center">未完成</p><p style="text-align:center">{{serviceCount.unfinished_count}}</p></Col>
                        <Col span="4"><p style="text-align:center">超服务</p><p style="text-align:center">{{serviceCount.overtop_service_count}}</p></Col>
                    </Row> -->

                    <Row :gutter="10" style="margin-top:5px">
                       <!--  <Col span="8">
                            <Select transfer v-model="status" placeholder="服务状态" transfer>
                                <Option v-for="(item,index) in serviceres" :value="item.typecode" :key=index>{{item.typename}}</Option>                             
                            </Select>
                        </Col> -->
                        <Col span="8">
                            <Select transfer v-model="type" placeholder="服务类型" transfer>
                                <Option v-for="(item,index) in accountdrrt" :value="item.typecode" :key=index>{{item.typename}}</Option>                               
                            </Select>  
                        </Col>
                        <Col span="8">
                            <DatePicker type="daterange" placement="bottom-end" v-model="selectdate"></DatePicker>
                        </Col>                        
                    </Row>
                    <Row :gutter="10" style="margin-top:10px">
                        <Col style="">
                            <Button type="primary" @click="search">筛选</Button>
                            <Button type="ghost" @click="reset">重置</Button>
                        </Col>
                    </Row>
                    <Row style="margin-top: 15px">
                        <Col>
                            <Table
                                    ref="selection"
                                    highlight-row
                                    size="small"
                                    :columns="header"
                                    :data="data"></Table>
                                <Page
                                    size="small"
                                    :total="pageTotal"
                                    show-total
                                    show-sizer
                                    show-elevator
                                    @on-change="pageChange"
                                    @on-page-size-change="pageSizeChange"
                                    style="margin-top: 10px"></Page>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        </Modal>
    </div>
</template>

<script>
import Bus from "../../../../components/bus";
import { DateFormat } from '../../../../libs/utils.js'
export default {
  data() {
    return {
        accountdrrt:'',
        serviceres:"",
        //检索相关
        status:"",
        type:"",
        selectdate:[],
        id: {},
        serviceCount: {},
        detail: {
            service_memo: ''
        },
        serviceEchelon: {},
        page: 1,
        pageSize: 10,
        pageTotal: new Number(),
        isShow: false,
        genzong: false,
        data:[],
        header: [
            {
                title: '类型',
                key: 'type',
                width: 120
            },
            {
                title: '服务会计',
                key: 'serverrealname',
                width: 100
            },
            {
                title: '上门',
                key: 'begin_time',
                width: 160
            },
            {
                title: '离开',
                key: 'end_time',
                width: 160
            },
            {
                title: '服务时长',
                key: 'service_timestamp',
                width: 120
            },
            {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.detailGZ(params)
                                        }
                                    }
                                }, '[详情]'),
                            ]);
                        }
                    }
        ],
        kjfuwu: false
    };
  },
  methods: {
      search(){
          this.page = 1
          this.getData()
      },
      reset(){
          this.status = ""
          this.type = ""
          this.selectdate = []
          this.getData()
},
      getData() {
          let _self = this
        //   console.log(DateFormat(_self.selectdate[0]))
          let url = '/order/cycle/service/account/door/record/list?sortField=createdate&page=' + _self.page + '&pageSize=' + _self.pageSize + '&cycleServiceRecordId=' + _self.id.id +'&service_record_status='+_self.status +'&type='+ _self.type +'&bbegintime=' + DateFormat(_self.selectdate[0]) +'&ebegintime=' + DateFormat(_self.selectdate[1])

          let url2 = '/order/cycle/service/account/door/record/detail?id=' + _self.id.id + '&types=detail,serviceCount,serviceEchelon'

          function doSuccess(res) {
              let _data = res.data.data
              _self.data = []
              _self.pageTotal = _data.total

              for (let i = 0; i < _data.rows.length; i++) {
                  if (_data.rows[i].type == 'manager') {
                      _data.rows[i].type = '主管回访'
                  } else if (_data.rows[i].type == 'accountdoor') {
                      _data.rows[i].type = '服务会计服务'
                  }
                  _data.rows[i].service_timestamp = new Date(_data.rows[i].service_timestamp * 1000).getHours()
                  _self.data.push(_data.rows[i])
              }
          }

          function doSuccess2(res) {
              let _data = res.data.data
              _self.serviceEchelon = _data.serviceEchelon
              _self.serviceCount = _data.serviceCount
              _data.detail.service_begin_time = _data.detail.service_begin_time!=null ? _data.detail.service_begin_time.substr(0,10) : ''
              _data.detail.createdate = _data.detail.createdate!=null ? _data.detail.createdate.substr(0,10) : ''
              _data.detail.updatedate = _data.detail.updatedate!=null ? _data.detail.updatedate.substr(0,10) : ''
              _self.detail = _data.detail
              _self.serviceCount.lc = _self.serviceCount.plan_service_item_count - _self.serviceCount.finished_service_item_count
              _self.serviceCount.avg_service_time = new Date(_data.serviceCount.avg_service_time * 1000).getHours()
              _self.detail.serviceTime = new Date(_data.detail.serviceTime * 1000).getHours()
              _self.detail.residueTime = new Date(_data.detail.residueTime * 1000).getHours()
              _self.detail.currentMonthResidueTime = new Date(_data.detail.currentMonthResidueTime * 1000).getHours()
              _self.detail.zhuguan = _self.serviceEchelon.managername

              if (_self.detail.service_memo == '' || _self.detail.service_memo == null) {
                  _self.isShow = false
              } else {
                  _self.isShow = true
              }
          }

          this.GetData(url, doSuccess)
          this.GetData(url2, doSuccess2)
      },

      pageChange(a) {
          let _self = this
          _self.page = a
          _self.getData()
      },

      pageSizeChange(a) {
          let _self = this
          _self.pageSize = a
          _self.getData()
      },
      
      detailGZ(a) {
          if (a.row.type == '主管回访') {
              Bus.$emit('addGC2',a.row.id)
          } else {
              Bus.$emit('genzong',a.row.id)
          }
      },

      addGZ() {
          let _self = this
          Bus.$emit('addGC', _self.detail)
      },

      saveMemo() {
          let _self = this
          let url = '/order/cycle/service/record/update'
          let _data = {
              id:  _self.id.id,
              serviceMemo: _self.detail.service_memo
          }

          function doSuccess() {
              _self.$Message.success('保存成功')
              _self.getData()
          }

          this.PostData(url, _data, doSuccess)
      },
      getDateCenter(){
          let _self = this
          let url = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes`
          let config = {
              params:{
                  groupCodes:'accountdrrt,serviceres'
              }
          }
          this.$http.get(url,config).then(function(res){
              _self.$backToLogin(res)
              console.log(res.data.data)
              _self.accountdrrt = res.data.data.accountdrrt
              _self.serviceres = res.data.data.serviceres
          })
      }
  },
  created() {
    var _self = this;
    this.getDateCenter()
    Bus.$on("kjfuwu", e => {
        _self.kjfuwu = true;
        _self.id = e
        _self.getData()
    });

  }
};
</script>