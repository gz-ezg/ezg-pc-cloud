<template>
    <div>
        <Row>
            <center>
                服务税期：<DatePicker type="month" placeholder="选择日期" style="width: 150px" v-model="current_year" @on-change="date_change"></DatePicker>
            </center>
        </Row>
        <Row style="margin-top:20px">
            <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
        </Row>
        <Row style="margin-top:5px">
            <Table
                :columns="tableHeader"
                :data="tableData"
                :loading="tableLoading"
                @on-row-dblclick="open_detail"
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
    </div>
</template>

<script>
export default {
    props:{
        month:{
            type:String
        }
    },
    data(){
        this.chartSettings = {
            level: [
                ['未完成','已完成'],
                ['未联系客户', '未报税', '未扣款','未社保','未公积金','未做账','未扫票']
            ]
        }
        return{
            tableLoading:false,
            tableHeader:[
                {
                    title: "服务人员",
                    key: "realname",
                    width: 100
                },
                {
                    title: "总客户数",
                    key: "amount",
                    width: 100
                },
                {
                    title: "联系客户",
                    key: "lianxikehu",
                    width: 100
                },
                {
                    title: "报税",
                    key: "baoshui",
                    width: 80
                },
                {
                    title: "扣款",
                    key: "koukuan",
                    width: 80
                },
                {
                    title: "社保",
                    key: "shebao",
                    width: 80
                },
                {
                    title: "公积金",
                    key: "gongjijin",
                    width: 80
                },
                {
                    title: "做账",
                    key: "zuozhang",
                    width: 80
                },
                {
                    title: "扫票",
                    key: "saopiao",
                    width: 80
                }
            ],
            tableData:[],
            chartData:{
                columns:['name','value'],
                rows:[
                ]
            },  
            current_year:"",
            page:1,
            pageSize:10,
            pageTotal:new Number()
        }
    },
    methods:{
        date_change(e){
            this.current_year = e
            this.getTableData()
            this.getChartData()
        },
        getChartData(){
            let _self = this
            let url = `api/order/accounter/index/job/schedule/report`
            let config = {
                params: {
                    // period: _self.current_year
                }
            }

            function success(res){
                // console.log(res.data.data)
                _self.chartData.rows = res.data.data.itemReport
                _self.chartData.rows.push(res.data.data.finishedReport[0])
            }

            this.$Get(url, config, success)
        },
        getTableData(){
            let _self = this
            _self.tableLoading = true
            let url = `api/order/accounter/index/job/schedule/list`
            let config = {
                params: {
                    page: _self.page,
                    pageSize: _self.pageSize,
                    // period: _self.current_year
                }
            }

            function success(res){
                // console.log(res.data.data)
                _self.pageTotal = res.data.data.total
                _self.tableData = res.data.data.rows
                _self.tableLoading = false
            }

            this.$Get(url, config, success)
        },
        pageChange(e){
            this.page = e
            this.getTableData()
        },
        //  打开详情，使用代理记账管理服务中模块
        open_detail(e){
            console.log(e)
            let _self = this
            _self.$bus.emit("OPEN_COMMON_COMPANY_MODULE",e.realname)
        }
    },
    created(){
        this.current_year = this.month
        this.getChartData()
        this.getTableData()
        console.log(this.month)
    }
}
</script>

