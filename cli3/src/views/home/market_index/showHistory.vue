<template>
    <div>
        <Modal
            title="个人历史计划"
            v-model="open_person_history"
            width="858"
        >
            <Row :gutter="16" type="flex" justify="space-around">
                <Col span="10">
                    <DatePicker type="daterange" v-model="dateRange" placement="bottom" placeholder="选择日期" style="width: 200px" size="small" @on-change="date_change"></DatePicker>
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
        </Modal>
    </div>
</template>

<script>
import { DateFormat2 } from '../../../libs/utils.js'

export default {
    data(){
        return{
            type:"day",
            dateRange:[],
            tableLoading:false,
            open_person_history:false,
            historyHeader: [
                {
                    title: "销售人员",
                    key: "realname",
                    width: 120,
                    align: 'center'
                },
                {
                    title: "计划销售额",
                    key: "saleroom",
                    width: 120,
                    align: 'center'
                },
                {
                    title: "实际销售额",
                    key: "finish_saleroom",
                    width: 120,
                    align: 'center'
                },
                {
                    title: "计划新增客户数",
                    key: "new_customer_num",
                    width: 150,
                    align: 'center'
                },
                {
                    title: "实际新增客户数",
                    key: "finish_new_customer_num",
                    width: 150,
                    align: 'center'
                },
                {
                    title: "创建时间",
                    key: "begin_period",
                    width: 150,
                    align: 'center'
                },
                {
                    title: "是否完成",
                    key: "statusName",
                    width: 150,
                    align: 'center'
                }
            ],
            historyData: [],
            pageTotal: new Number(),
            page: 1,
            pageSize: 10,
            CommonresultType:"",
            CommonresultType_Map:new Map(),
            saler:""
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
                    saler: _self.saler
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
        }
    },
    created(){
        let _self = this
        _self.getDataCenter()
        this.$bus.on('OPEN_HISTORY_FUNCTION',(e)=>{
            // console.log(e)
            _self.saler = e
            _self.open_person_history = true
            _self.getHistoryData()
        })
    }
}
</script>
