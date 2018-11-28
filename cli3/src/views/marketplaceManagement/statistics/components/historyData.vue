<template>
    <div>
        <Card
            title="个人计划"
        >
            <Row :gutter="16" type="flex" justify="space-around">
                <Col span="6">
                    <Select v-model="saler" size="small" @on-change="getHistoryData()" placeholder="请选择人员">
                        <Option v-for="item in allSaler" :key=item.id :value=item.id >{{item.realname}}</Option>
                    </Select>
                </Col>
                <Col span="8">
                    <DatePicker type="daterange" v-model="dateRange" placement="bottom" placeholder="选择日期" style="width:100%" size="small" @on-change="date_change" transfer></DatePicker>
                </Col>
                <Col span="6">
                    <Select v-model="type" size="small" @on-change="getHistoryData()">
                        <Option value="week">周计划</Option>
                        <Option value="day">日计划</Option>
                    </Select>
                </Col>
            </Row>
            <Row :gutter="16" style = "margin-top:10px">
                <Table
                    :columns = "historyHeader" 
                    :data = "historyData"
                    :loading = "tableLoading"
                >
                </Table>
                <Page
                    size="small"
                    :total="pageTotal"
                    show-total
                    show-elevator
                    :current.sync = "page"
                    @on-change = "pageChange"
                    style="margin-top: 10px"></Page>
            </Row>
            <div slot="footer">

            </div>
        </Card>
    </div>
</template>

<script>
import { DateFormat2 } from '../../../../libs/utils.js'

export default {
    data(){
        return{
            type:"day",
            // dateRange:[new Date(),new Date()],
            dateRange:[],
            tableLoading:false,
            open_person_history:false,
            historyHeader: [
                {
                    title: "销售人员",
                    key: "realname",
                    // width: 120,
                    align: 'center'
                },
                 {
                    title: "创建时间",
                    key: "begin_period",
                    // width: 150,
                    align: 'center'
                },
                // {
                //     title: "计划周期",
                //     key: "type",
                //     align: 'center'
                // },
                {
                    title: "是否完成",
                    key: "statusName",
                    // width: 120,
                    align: 'center'
                },
                {
                    title: "计划销售额",
                    key: "saleroom",
                    // width: 120,
                    align: 'center'
                },
                {
                    title: "实际销售额",
                    key: "finish_saleroom",
                    // width: 120,
                    align: 'center'
                },
                {
                    title: "计划新增客户数",
                    key: "new_customer_num",
                    // width: 150,
                    align: 'center'
                },
                {
                    title: "实际新增客户数",
                    key: "finish_new_customer_num",
                    // width: 150,
                    align: 'center'
                }
            ],
            historyData: [],
            pageTotal: new Number(),
            page: 1,
            pageSize: 10,
            CommonresultType:"",
            CommonresultType_Map:new Map(),
            saler:"",
            allSaler:[]
        }
    },
    methods:{
        date_change(e){
            // console.log(e)
            this.dateRange[0] = e[0]
            this.dateRange[1] = e[1]
            this.getHistoryData()
        },
        pageChange(e){
            this.page = e
            this.getHistoryData()
        },
        getHistoryData(){
            // console.log(e)
            let _self = this
            _self.tableLoading = true
            let url = `api/crm/sale/index/person/plan/list`

            let config = {
                params:{
                    begin_period: DateFormat2(_self.dateRange[0]),
                    end_period: DateFormat2(_self.dateRange[1]),
                    page: _self.page,
                    pageSize: _self.pageSize,
                    type: _self.type,
                    saler: _self.saler,
                    sortField:"begin_period"
                }
            }

            function success(res){
                _self.pageTotal = res.data.data.total
                _self.historyData = res.data.data.rows
                for(let i = 0;i<_self.historyData.length;i++){
                    if(_self.historyData[i].status){
                        _self.historyData[i].statusName = _self.CommonresultType_Map.get(_self.historyData[i].status)
                    }
                }
                _self.tableLoading = false

            }

            this.$Get(url, config, success)
        },
        getDataCenter(){
            let _self = this
            let config = "CommonresultType"

            function success(res){
                _self.CommonresultType = res.data.data.CommonresultType
                _self.CommonresultType_Map = _self.$array2map(_self.CommonresultType)
            }

            this.$GetDataCenter(config, success)
        },
        get_all_saler(){
            let _self = this

            let url = `api/user/getAllUserListByDepartId`
            let config = {
                params:{
                    departId:11532
                }
            }

            function success(res){
                _self.allSaler = res.data.data
                _self.allSaler.push({
                    id:"",
                    realname:""
                })
                // console.log(_self.allSaler)
            }

            this.$Get(url, config, success)
        }
    },
    created(){
        let _self = this
        _self.getDataCenter()
        _self.get_all_saler()
        _self.getHistoryData()
    }
}
</script>
