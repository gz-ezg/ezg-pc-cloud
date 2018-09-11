<template>
    <div>
        <Card title="个人考勤">
            <DatePicker type="month" placeholder="请选择月份" style="width: 150px" v-model="yearmonth" size="small" @on-change="get_data"></DatePicker>
            <Row style="margin-top:10px">
                <!-- <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="header"
                    :data="data"></Table> -->
                    <h3>姓名：{{user_alias_name}}</h3>
            </Row>
            <Table
                style="margin-top:10px"
                ref="selection"
                highlight-row
                size="small"
                :columns="header2"
                :data="data2"></Table>
        </Card>

    </div>
</template>

<script>
import { DateFormatYearMonth } from '../../../libs/utils.js'

export default {
    name: "attendance_index",
    data(){
        return{
            user_alias_name:"",
            yearmonth:"2018-06",
            data2:[],
            header2:[
                {
                    title:"日期",
                    key:'data',
                    // sortable:true,
                    sortType:"asc"
                },
                {
                    title:"初次打卡时间",
                    key:'am'
                },
                {
                    title:"初次打卡类型",
                    key:'am_type'
                },
                {
                    title:"离开打卡时间",
                    key:'pm'
                },
                {
                    title:"离开打卡类型",
                    key:'pm_type'
                }
            ]
        }
    },
    methods:{
        get_data(){
            let _self = this

            let url = "api/legwork/exportLegworkMsg"
            let config = {
                params:{
                    page: 1,
                    pageSize: 10,
                    // yearmonth: DateFormatYearMonth(_self.yearmonth),
                    yearmonth: _self.yearmonth,
                    buserId: localStorage.getItem("id")
                }  
            }

            function success(res){
                _self.data = res.data.data.rows
                _self.user_alias_name = res.data.data.rows[0]['user_alias_name']
                let temp = res.data.data.rows[0]
                // console.log(temp)
                for(x in temp){
                    // console.log(x)
                    if(x == "userId" || x == "user_alias_name" || x == "yearmonth"){
                    }else{
                        let tempData = {
                            data: "",
                            am: "",
                            am_type: "",
                            pm: "",
                            pm_type: ""
                        }
                        if(temp[x]){
                            // console.log(temp[x])
                            tempData.data = x
                            tempData.am = temp[x].slice(0,5)
                            if(temp[x].slice(5,6) == "内"){
                                tempData.am_type = "公司"
                            }else if(temp[x].slice(5,6) == "外"){
                                tempData.am_type = "外勤"
                            }else{
                                tempData.am_type = ""
                            }
                            
                            tempData.pm = temp[x].slice(6,11)
                            if(temp[x].slice(11,12) == "内"){
                                tempData.pm_type = "公司"
                            }else if(temp[x].slice(11,12) == "外"){
                                tempData.pm_type = "外勤"
                            }else{
                                tempData.pm_type = ""
                            }
                            // console.log(tempData)
                        }else{
                            tempData.data = x
                            tempData.am = ""
                            tempData.am_type = ""
                            tempData.pm = ""
                            tempData.pm_type = ""
                            // console.log(tempData)
                        }
                        _self.data2.push(tempData)
                    }
                }
                console.log(_self.data2)
            }

            this.$Get(url, config, success)
        }
    },
    created() {
        this.get_data()
    },

}
</script>
