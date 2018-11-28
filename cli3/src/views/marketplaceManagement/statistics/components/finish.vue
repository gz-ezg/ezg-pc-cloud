<template>
    <div>
        <Card
            title="销售排行榜"
            v-model="open_team_rank"
            width="588"
        >
            <Row :gutter="16">
                <center>
                    <DatePicker type="daterange" v-model="dateRange" placement="bottom" placeholder="选择日期" style="width: 200px" size="small" @on-change="getRankData()"></DatePicker>
                </center>
            </Row>
            <Row :gutter="16" style = "margin-top:10px">
                <Table
                    :columns = "teamRankHeader" 
                    :data = "teamRankData"
                    :loading = "tableLoading"
                >
                </Table>
                <Page
                    size = "small"
                    :total = "pageTotal"
                    show-total
                    show-elevator
                    :current.sync = "page"
                    @on-change = "pageChange"
                    style = "margin-top: 10px"></Page>
            </Row>
        </Card>
    </div>
</template>

<script>
import { DateFormat } from '../../../../libs/utils.js'

export default {
    data(){
        return{
            dateRange:[],
            tableLoading:false,
            open_team_rank:false,
            teamRankHeader: [
                {
                    title: "销售排名",
                    key: "row_no",
                    // width: 90,
                    align: 'center'
                },
                {
                    title: "销售人员",
                    key: "realname",
                    // width: 120,
                    align: 'center'
                },
                {
                    title: "销售金额",
                    key: "sumrealnumber",
                    // width: 120,
                    align: 'center'
                },
                {
                    title: "新增客户数",
                    key: "new_customer",
                    // width: 120,
                    align: 'center'
                },
                {
                    title: "团队名",
                    key: "departname",
                    // width: 120,
                    align: 'center'
                }
            ],
            teamRankData: [],
            pageTotal: new Number(),
            page: 1,
            pageSize: 10
        }
    },
    methods:{
        pageChange(e){
            this.page = e
            this.getRankData()
        },
        getRankData(){
            let _self = this
            _self.tableLoading = true
            let url = `api/crm/sale/index/team/performance/ranking`

            let config = {
                params:{
                    begin_createdate: DateFormat(_self.dateRange[0]),
                    end_createdate: DateFormat(_self.dateRange[1]),
                    page: _self.page,
                    pageSize: _self.pageSize
                }
            }

            function success(res){
                _self.pageTotal = res.data.data.total
                _self.teamRankData = res.data.data.rows
                _self.tableLoading = false
            }

            this.$Get(url, config, success)
        }
    },
    created(){
        let _self = this
        _self.getRankData()
    }
}
</script>
