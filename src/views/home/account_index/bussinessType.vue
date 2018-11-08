<template>
    <div>
        <Row>
            <center>
                服务税期：<DatePicker type="year" placeholder="选择日期" style="width: 100px" v-model="current_year" @on-change="date_change"></DatePicker>
            </center>
        </Row>
        <Row style="margin-top:20px">
            <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
        </Row>
        <Row style="margin-top:5px">
            <Table
                :columns="tableHeader"
                :data="tableData"
                :loading="tableLoading"
                @on-row-dblclick="open_detail"
                height=400
            >
            </Table>
            <!-- <Page
                size="small"
                :total="pageTotal"
                show-total
                show-elevator
                :current.sync = "page"
                @on-change = "pageChange"
                style="margin-top: 10px"></Page> -->
        </Row>
    </div>
</template>

<script>
import VeHistogram from 'v-charts/lib/histogram.common'
export default {
    components: {
        VeHistogram
    },
    props:{
        year:{
            type: Number
        }
    },
    data(){
        this.chartSettings = {
            // legendName: {
            //     'period': '月份',
            //     'lsb': '零申报',
            //     'xgm': '小规模',
            //     'xgmgx': '小规模高新',
            //     'ybnsr': '一般纳税人'
            // },
            //  数据别名
            labelMap: {
                'period': '月份',
                'lsb': '零申报',
                'xgm': '小规模',
                'xgmgx': '小规模高新',
                'ybnsr': '一般纳税人'
            },
            opacity:0.5
        }
        return{
            tableLoading:false,
            tableHeader:[
                {
                    title: "月份",
                    key: "period",
                    width: 100
                },
                {
                    title: "零申报",
                    key: "lsb",
                    width: 90
                },
                {
                    title: "小规模",
                    key: "xgm",
                    width: 90
                },
                {
                    title: "小规模高新",
                    key: "xgmgx",
                    width: 110
                },
                {
                    title: "一般纳税人零申报",
                    key: "ybnsrlsb",
                    width: 140
                },
                {
                    title: "一般纳税人",
                    key: "ybnsr",
                    width: 110
                },
                {
                    title: "一般纳税人高新",
                    key: "ybnsrgx",
                    width: 120
                },
                {
                    title: "会计到家",
                    key: "kjdj",
                    width: 90
                }
            ],
            tableData:[],
            chartData:{
                columns:['period','lsb','xgm','xgmgx','ybnsr'],
                rows:[
                ]
            },  
            current_year:"2018",
            page:1,
            pageSize:10,
            pageTotal:new Number()
        }
    },
    methods:{
        getChartData(){
            let _self = this
            let url = `api/order/accounter/index/bussiness/detail`
            let config = {
                params: {
                    year: _self.current_year
                }
            }

            function success(res){
                // console.log(res.data.data)
                _self.chartData.rows = res.data.data
                _self.tableData = res.data.data
            }

            this.$Get(url, config, success)
        },
        date_change(e){
            console.log(e)
            this.current_year = e
            this.getChartData()
        },
        pageChange(e){
            this.page = e
            this.getChartData()
        },
        //  打开详情，使用代理记账管理服务中模块
        open_detail(e){
            console.log(e)
        },
        open_detail(e){
            console.log(e)
            let _self = this
            _self.$bus.emit("OPEN_COMMON_COMPANY_MODULE","")
        }
    },
    created(){
        console.log(this.year)
        // this.current_year = this.year
        this.getChartData()
    }
}
</script>

