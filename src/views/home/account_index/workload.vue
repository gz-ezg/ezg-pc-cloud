<template>
    <div>
        <Row>
            <center>
                日期：<DatePicker type="month" placeholder="选择日期" style="width: 150px" value="selectDate" @on-change="date_change"></DatePicker>
            </center>
        </Row>
        <Row style="margin-top:10px">
            <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
        </Row>
        <Row style="margin-top:10px">
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
            legendName: {
                'value': '工作量'
            },
            opacity:0.5
        }
        return{
            selectDate:"",
            chartData:{
                columns:['name','value'],
                rows:[]
            },
            tableLoading:false,
            page:1,
            tableData:[],
            tableHeader:[
                {
                    title:"会计",
                    key:'realname',
                    // width: 120
                },
                {
                    title:"财务问题数量",
                    key:'accounter_accord_number',
                    // width: 120
                },
                {
                    title:"得分",
                    key:'points',
                    // width: 120
                }
            ],
            pageTotal: new Number()
        }
    },
    methods:{
        date_change(e){
            // console.log(e)
            let temp = e.split("-").join("")

            this.selectDate = temp
            this.get_chart_data()
        },
        get_chart_data(){
            let _self = this
            _self.tableLoading = true
            let url = `api/order/accounter/index/job/workload/detail`
            let config = {
                params: {
                    page: _self.page,
                    pageSize: 10,
                    period: _self.selectDate
                }
            }

            function success(res){
                _self.chartData.rows = res.data.data.report
                _self.tableLoading = false
                _self.tableData = res.data.data.list.rows
                _self.pageTotal = res.data.data.list.total
            }

            this.$Get(url, config, success)
        },
        pageChange(e){
            this.page = e
            this.get_chart_data()
        },
        open_detail(e){
            // console.log(e)
            let _self = this
            _self.$bus.emit("OPEN_COMMON_COMPANY_MODULE",e.realname)
        }
    },
    created(){
        // console.log(this.month)
        this.selectDate = this.month
        this.get_chart_data()
    }
}
</script>

