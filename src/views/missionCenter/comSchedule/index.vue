<template>
    <div>
        <div style="min-width:1300px" @click="close_right_menu">
        <Button v-if="right_click_show" :style="{top: rightTop + 'px', left: rightLeft + 'px'}" style="position:fixed;z-index:9000" type="primary" @click="add_task">新增日程</Button>
        <!-- <Button @click="get_date">下一天</Button> -->
        <Card title="商事排程表">
            <Card style="width:400px;position:fixed;z-index:9999" v-if="click_show" :style="{top: top + 'px', left: left + 'px'}">
                <Row :gutter="20">
                    <Col span="6">
                        <span>任务对象：</span>
                    </Col>
                    <Col span="18"><span>{{hover_local.companyName}}</span></Col>
                </Row>
                <Row :gutter="20">
                    <Col span="6">
                        <span>任务详情：</span>
                    </Col>
                    <Col span="18"><span>{{hover_local.taskContent}}</span></Col>
                </Row>
                <Row :gutter="20">
                    <Col span="6">
                        <span>执行人：</span>
                    </Col>
                    <Col span="18"><span>{{hover_local.executorName}}</span></Col>
                </Row>
                <Row :gutter="20">
                    <Col span="6">
                        <span>地区：</span>
                    </Col>
                    <Col span="18"><span>{{hover_local.Area}}</span></Col>
                </Row>
                <Row :gutter="20">
                    <Col span="6">
                        <span>地点：</span>
                    </Col>
                    <Col span="18"><span>{{hover_local.depart}}</span></Col>
                </Row>
            </Card>
            <Row :gutter="20">
                <Col span="18">
                    <full-calendar
                            ref="calendar"
                            :events="events"
                            :config="config"
                            :header="header"
                            @event-selected="eventSelected"
                            :defaultView="defaultView"
                            :editable="false"
                            @day-click="dayClick"
                            @day-right-click="dayRightClick"
                            @event-mouseover="mouse_over"
                            @event-mouseout="mouse_out"
                    >
                    </full-calendar>
                </Col>
                <Col span="6">
                    <Row style="height:340px">
                        <datepicker
                                v-model="date"
                                :inline="true"
                                :language="zh"
                                @selected="change_date">
                        </datepicker>
                    </Row>
                    <Row>
                        <span>未完成——<span style="color:#00CCFF">蓝色</span><br/></span>
                        <span>成功——<span style="color:#AEDD81">绿色</span><br/></span>
                        <span>失败——<span style="color:#D24D57">红色</span><br/></span>
                    </Row>
                    <Row>
                        <Row style="margin-bottom:10px"><h3>{{local_date}}</h3></Row>
                        <Row>
                            <Scroll height="520">
                                <Timeline>
                                    <TimelineItem v-for="item in oneData" :key="item.id">
                                        <p class="time">{{item.planDate.slice(10)}}</p>
                                        <p class="content">{{item.taskName}}</p>
                                    </TimelineItem>
                                </Timeline>
                            </Scroll>
                        </Row>
                    </Row>
                </Col>
            </Row>
        </Card>
        <create-schedule></create-schedule>
        <detail-schedule-task></detail-schedule-task>
        </div>
        <div v-if="showFilter">
            <div class="filter">
                <Form :label-width="80" style="margin:20px 20px 0 0">
                    <FormItem label="人员：" style="display: inline-block">
                        <div class="d" v-for="(item,index) in personList" :class="{b:currentIndex==index}"  @click="showItem(item,index)">
                            <span>{{item.realname}}</span>
                        </div>
                    </FormItem>
                    <FormItem label="状态：" >
                        <div class="d" v-for="(item,index) in statusList" :class="{b:currentIndexOne==index}" @click="showItemOne(item,index)" >
                            <span>{{item}}</span>
                        </div>
                    </FormItem>
                    <FormItem label="地区：" >
                        <Select v-model="newMission.businessArea" type="text" style="width: 130px" size="small" transfer @on-change="select_area">
                            <Option v-for="(item,index) in businessArea" :key="index" :value="item.typecode">{{item.typename}}</Option>
                        </Select>
                        <Button type="primary" size="small" @click="reset_area">重置地区</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
        <table style="display: none" id="tableExcel" width="100%" border="1" cellspacing="0" cellpadding="0">
            <tr>
                <td style="text-align: center;height: 50px;font-weight: bold;font-size: 20px" :colspan="tableHeader.length" align="center" v-if="flag=='agendaDay'">{{YMD}}商事外勤统计表</td>
                <td style="text-align: center;height: 50px;font-weight: bold;font-size: 20px" :colspan="tableHeader.length" align="center" v-if="flag=='agendaWeek'">{{WEEK[0]}}至{{WEEK[1]}}商事外勤统计表</td>
                <td style="text-align: center;height: 50px;font-weight: bold;font-size: 20px" :colspan="tableHeader.length" align="center" v-if="flag=='month'">{{YM}}商事外勤统计表</td>
            </tr>
            <tr >
                <td style="text-align: center;height: 50px;font-size: 16px" v-for="(item,index) in tableHeader" :key="index">{{item}}</td>
            </tr>
            <tr v-for="(item,index) in data2" :key="index" style="font-size: 14px;height: 30px">
                <td>{{item.executorName}}</td>
                <td>{{item.taskKindName}}</td>
                <td>{{item.workFlowStatus}}</td>
                <td>{{item.Area}}</td>
                <td>{{item.depart}}</td>
                <td>{{item.taskName}}</td>
                <td>{{item.companyName}}</td>
                <td>{{item.planDate}}</td>
                <td v-if="item.taskStage=='tesFinished' && item.mission=='Completed'">成功</td>
                <td v-if="item.taskStage=='tesFinished' && item.mission=='Failed'">失败</td>
                <td v-if="item.taskStage=='tesUnstarted'">未完成</td>
                <td v-if="item.mission=='Failed'">{{item.taskSummary}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    import { zh } from 'vuejs-datepicker/dist/locale/index'
    import Datepicker from 'vuejs-datepicker';
    import { FullCalendar } from 'vue-full-calendar'
    import {DateFormat,DateFormatYearMonth} from "../../../libs/utils";
    import 'fullcalendar/dist/locale/zh-cn'
    import CreateSchedule from './createSchedule'
    import DetailScheduleTask from './detailScheduleTask'
    export default {
        name: "index",
        components:{
            FullCalendar,
            Datepicker,
            CreateSchedule,
            DetailScheduleTask
        },
        data(){
            return{
                load:false,
                idTmr:"",
                flag:"month",
                YMD:"",
                YM:"",
                WEEK:[],
                data2:[],
                tableHeader:["姓名","产品类别","正常节点","区域","地点","事件","企业","执行时间","状态"],
                personList:["全部","符东","张威雄","王碧心","梁宝愿","潘美珊"],
                statusList:["全部","未完成","成功","失败"],
                executor_id:"",
                mission:"",
                newMission:{
                    businessArea:""
                },
                businessArea:[],
                businessPlace:[],
                businessArea_map:new Map(),
                businessPlace_map:new Map(),
                showFilter:false,
                currentIndex:"",
                currentIndexOne:"",
                taskStage:"",
                rightTop:"",
                rightLeft: "",
                right_click_show: false,
                local_date:"",
                //  控制右侧弹出页面
                openRightHover: false,
                //  控制悬浮菜单位置
                top: "",
                left: "",
                //  控制悬浮菜单展示
                click_show: false,
                zh: zh,
                date: new Date(),
                header:{
                    left:   'prev,next today',
                    center: 'title',
                    right:  'downLoad,filter,month,agendaWeek,agendaDay',
                },
                config:{
                    locale: 'zh-cn',
                    //  周末不显示
                    // weekends: false,
                    slotEventOverlap:false,
                    minTime : "08:00:00",
                    maxTime : "20:00:00",
                    contentHeight : 1150,
                    slotDuration : "00:15:00",
                    timezone:"local",
                    aspectRatio : 2,

                    customButtons:{
                        filter:{
                            text:"筛选",
                            click:function () {
                                this.showFilter=!this.showFilter
                                event.stopPropagation()
                            }.bind(this)
                        },
                        downLoad:{
                            text:"导出",
                            click:function () {
                                this.downLoad('tableExcel','商事外勤统计表')
                                event.stopPropagation()
                            }.bind(this)
                        },
                        month:{
                            text:"月",
                            click:function () {
                                this.flag = "month"
                                this.$refs.calendar.fireMethod('changeView','month')
                            }.bind(this)
                        },
                        agendaWeek:{
                            text:"周",
                            click:function () {
                                this.flag = "agendaWeek"
                                this.$refs.calendar.fireMethod('changeView','agendaWeek')
                            }.bind(this)
                        },
                        agendaDay:{
                            text:"日",
                            click:function () {
                                this.flag = "agendaDay"
                                this.$refs.calendar.fireMethod('changeView','agendaDay')
                            }.bind(this)
                        },
                    }
                },
                events:[

                ],
                events_temp: [],
                //  默认显示月
                defaultView:"month",
                // defaultView:{
                //     month: {
                //         eventLimit: 6 // adjust to 6 only for agendaWeek/agendaDay
                //     }
                // },
                hover_local: "",
                oneData: [],
                rightClickDate: "",
            }
        },
        mounted() {

        },
        methods:{
            downLoad(tableid,name){
                this.getDate()
                this.down_data(tableid,name)
            },
            download(tableid,name){

                if(this.getExplorer()=='ie')
                {
                    var curTbl = document.getElementById(tableid);
                    var oXL = new ActiveXObject("Excel.Application");
                    var oWB = oXL.Workbooks.Add();
                    var xlsheet = oWB.Worksheets(1);
                    var sel = document.body.createTextRange();
                    sel.moveToElementText(curTbl);
                    sel.select();
                    sel.execCommand("Copy");
                    xlsheet.Paste();
                    oXL.Visible = true;

                    try {
                        var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
                    } catch (e) {
                        print("Nested catch caught " + e);
                    } finally {
                        oWB.SaveAs(fname);
                        oWB.Close(savechanges = false);
                        oXL.Quit();
                        oXL = null;
                        this.idTmr = window.setInterval("this.Cleanup();", 1);
                    }

                }
                else
                {

                    this.tableToExcel(tableid,name)()
                }
            },
            getExplorer() {
                let explorer = window.navigator.userAgent ;
                //ie
                if (explorer.indexOf("MSIE") >= 0) {
                    return 'ie';
                }
                //firefox
                else if (explorer.indexOf("Firefox") >= 0) {
                    return 'Firefox';
                }
                //Chrome
                else if(explorer.indexOf("Chrome") >= 0){
                    return 'Chrome';
                }
                //Opera
                else if(explorer.indexOf("Opera") >= 0){
                    return 'Opera';
                }
                //Safari
                else if(explorer.indexOf("Safari") >= 0){
                    return 'Safari';
                }
            },
            Cleanup() {
                window.clearInterval(this.idTmr);
                CollectGarbage();
            },
            tableToExcel(tableId,realname) {
                var table = tableId
                var name = realname
                var uri = 'data:application/vnd.ms-excel;base64,',
                    template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"' +
                        'xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
                        + '<x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>'
                        + '</x:ExcelWorkbook></xml><![endif]-->' +
                        ' <style type="text/css">' +
                        'table td {' +
                        ' text-align: left;' +
                        'color: #000000;' +
                        ' }' +
                        '</style>' +
                        '</head><body ><table class="excelTable">{table}</table></body></html>',
                    base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
                    format = function(s, c) {
                        return s.replace(/{(\w+)}/g,
                            function(m, p) { return c[p]; }) }
                return function() {
                    if (!table.nodeType) table = document.getElementById(table)
                    var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
                    var a = document.createElement('a')
                    a.href = uri + base64(format(template, ctx))
                    a.download = name+'.xls';//这里是关键所在,当点击之后,设置a标签的属性,这样就可以更改标签的标题了
                    var evt = document.createEvent("MouseEvents");
                    evt.initEvent("click", false, false);
                    a.dispatchEvent(evt);
                }
            },

            showItem(item,index){
                this.currentIndex = index
                this.executor_id = item.id
                console.log(this.executor_id )
                this.get_data()
            },
            showItemOne(item,index){
                this.currentIndexOne = index
                if (index==0) {
                    this.taskStage = ""
                    this.mission = ""
                    this.get_data()
                }
                if (index==1){
                    this.taskStage = "tesUnstarted"
                    this.mission = ""
                    this.get_data()
                }
                if (index==2){
                    this.taskStage = "tesFinished"
                    this.mission = "Completed"
                    this.get_data()
                }
                if (index==3){
                    this.taskStage = "tesFinished"
                    this.mission = "Failed"
                    this.get_data()
                }
            },
            select_area(){
                this.get_data()
            },
            reset_area(){
                this.newMission.businessArea = ""
                this.get_data()
            },
            eventSelected(event, jsEvent, view){
                //  点击展示事件详情
                this.$bus.emit("OPEN_SEHEDULE_DETAIL_TASK",event)
            },
            dayClick(date, jsEvent, view){
                //  可以在此处新增日程
                console.log(date)
                let _self = this
                this.date = date._d
                console.log(this.date)
                let dateTemp = DateFormat(date)
                this.get_onedate_data(dateTemp)
            },
            change_date(e){
                let date = DateFormat(e)
                console.log(date)
                // this.local_date = e.toLocaleDateString().replace(new RegExp("/",'g'),"-")


                // console.log(e.toLocaleDateString().replace(new RegExp("/",'g'),"-"))

                // this.$refs.calendar.fireMethod('changeView', this.$refs.calendar.fireMethod("getView").type, e.toLocaleDateString().replace(new RegExp("/",'g'),"-"))
                this.$refs.calendar.fireMethod('changeView', this.$refs.calendar.fireMethod("getView").type , date)

                // console.log(this.$refs.calendar.fireMethod("getView").type)
                // this.get_onedate_data(e.toLocaleDateString().replace(new RegExp("/",'g'),"-"))
                this.get_onedate_data(date)

            },
            //  右键点击触发
            dayRightClick(date, jsEvent, view){
                this.right_click_show = true
                // this.rightClickDate = DateFormat(date._d)
                this.rightClickDate = date._d
                this.rightTop = jsEvent.pageY
                this.rightLeft = jsEvent.pageX
                // console.log(date, jsEvent, view)
            },
            add_task(){
                let _self = this
                this.$bus.emit("SCHEDULE_CREATE_BUSINESS_TASK", _self.rightClickDate)
            },
            //  关闭右键菜单
            close_right_menu(){
                this.right_click_show = false
                this.showFilter = false
            },
            mouse_out(){
                // console.log("鼠标离开了！")
                this.click_show = false
                // console.log($(this.$refs["calendar"]).fullCalendar('getDate'))
            },
            mouse_over(event, jsEvent, view){
                this.click_show = true

                this.top = jsEvent.clientY
                this.left = jsEvent.clientX
                this.hover_local = event
            },
            get_date(){
                //  获取当前日期
                // fireMethod 调用内置方法$(this.$el).fullCalendar(...options)
                // console.log(this.$refs.calendar.fireMethod('getDate'))
                // 更改到指定日期
                this.$refs.calendar.fireMethod('changeView', 'agendaDay', '2017-06-01')
            },
            getDate(){
                //  获取当前日期
                // fireMethod 调用内置方法$(this.$el).fullCalendar(...options)
                this.YMD = DateFormat(this.$refs.calendar.fireMethod('getDate')._d)
                let date = new Date(DateFormat(this.$refs.calendar.fireMethod('getDate')._d))
                let bweek = DateFormat(this.$refs.calendar.fireMethod('getDate')._d)
                let a =new Date(date.getTime()+24*60*60*1000*6)
                let eweek = DateFormat(a)
                this.WEEK = []
                this.WEEK.push(bweek,eweek)
                this.YM = DateFormatYearMonth(this.$refs.calendar.fireMethod('getDate')._d)
                console.log(this.WEEK)
                // 更改到指定日期
                // this.$refs.calendar.fireMethod('changeView', 'agendaDay', '2017-06-01')
            },
            get_executor_list(){
                let _self = this
                let url = 'api/user/serviceList'
                let config = {
                    params: {}
                }
                function success(res){
                    _self.personList =res.data.data.rows
                    _self.personList.unshift({"id":null,"realname":"全部"})
                    console.log(_self.personList)
                }
                function fail(err){
                }
                this.$Get(url, config, success, fail)
            },
            remove_data(){
                this.$refs.calendar.fireMethod('removeEvents')
            },
            get_data(){
                let _self = this
                let url = 'api/task/getLegWorklist'
                let config = {
                    params:{
                        page: 1,
                        pageSize: 1000,
                        businessKind:"businessKind",
                        sortField: "plan_date",
                        task_stage:_self.taskStage,
                        executor_id:_self.executor_id,
                        mission:_self.mission,
                        task_area:_self.newMission.businessArea
                    }
                }

                function success(res){
                    _self.events_temp = res.data.data.rows
                    console.log(_self.events_temp )
                    if (_self.events_temp.length==0) {
                        _self.remove_data()
                    }
                    for(let i = 0;i<_self.events_temp.length;i++){
                        _self.events_temp[i].start = _self.events_temp[i].planDate
                        _self.events_temp[i].title = _self.events_temp[i].taskName
                        //  请一一对应！！！！！
                        //  title => 任务名称
                        //  realname => 真实姓名
                        //  CompanyName => 公司名称
                        //  Area => 地区
                        //  depart => 具体地点
                        _self.events_temp[i].realname = _self.events_temp[i].executorName
                        _self.events_temp[i].Area = _self.businessArea_map.get(  _self.events_temp[i].taskArea)
                        _self.events_temp[i].depart = _self.businessPlace_map.get(_self.events_temp[i].taskPlace)
                        _self.events_temp[i].CompanyName = _self.events_temp[i].companyName
                        if (_self.events_temp[i].taskStage=="tesFinished" && _self.events_temp[i].mission=="Completed") {
                            _self.events_temp[i].color = "#AEDD81"
                        }
                        if (_self.events_temp[i].taskStage=="tesUnstarted") {
                            _self.events_temp[i].color = "#00CCFF"
                        }
                        if (_self.events_temp[i].taskStage=="tesFinished" && _self.events_temp[i].mission=="Failed") {
                            _self.events_temp[i].color = "#D24D57"
                        }
                        // if(_self.events_temp[i].plan_date.slice(0,10) == _self.local_date){
                        //     _self.events_temp[i].color = "orange"
                        // }
                        // if(_self.events_temp[i].task_stage == "tesFinished"){
                        //     _self.events_temp[i].color = "#228B22"
                        // }
                        // if(_self.events_temp[i].task_des_code == "tdOverdue"){
                        //     _self.events_temp[i].color = "red"
                        // }
                        // if(_self.events_temp[i].task_kind == "tkClue" && _self.events_temp[i].task_stage != "tesFinished"){
                        //     _self.events_temp[i].color = "#FF7F00"
                        // }
                        // if(_self.events_temp[i].task_kind == "tkClue" && _self.events_temp[i].task_stage == "tesFinished"){
                        //     _self.events_temp[i].color = "#228B22"
                        // }

                    _self.events = _self.events_temp

                    }

                }

                function fail(err){
                }

                this.$Get(url, config, success, fail)
            },
            down_data(tableid,name){
                let _self = this
                if (_self.flag == "month"){
                    let url = 'api/task/getLegWorklist'
                    let config = {
                        params:{
                            page: 1,
                            pageSize: 1000,
                            businessKind:"businessKind",
                            sortField: "plan_date",
                            task_stage:_self.taskStage,
                            executor_id:_self.executor_id,
                            month_date:_self.YM,
                            mission:_self.mission,
                            task_area:_self.newMission.businessArea
                        }
                    }

                    function success(res){
                        _self.data2 = res.data.data.rows
                        console.log(_self.data2 )
                        for(let i = 0;i<_self.data2.length;i++){
                            _self.data2[i].Area = _self.businessArea_map.get(  _self.data2[i].taskArea)
                            _self.data2[i].depart = _self.businessPlace_map.get(_self.data2[i].taskPlace)
                            if(_self.data2[i].workFlowStatus=='Y'){
                                _self.data2[i].workFlowStatus='是'
                            }
                            if(_self.data2[i].workFlowStatus=='N'){
                                _self.data2[i].workFlowStatus='否'
                            }
                        }
                        setTimeout(()=>{
                            _self.download(tableid,name)
                        },1000)


                    }

                    function fail(err){
                    }

                    this.$Get(url, config, success, fail)
                }
                if (_self.flag == "agendaWeek") {
                    let url = 'api/task/getLegWorklist'
                    let config = {
                        params:{
                            page: 1,
                            pageSize: 1000,
                            businessKind:"businessKind",
                            sortField: "plan_date",
                            task_stage:_self.taskStage,
                            executor_id:_self.executor_id,
                            bweek_date:_self.WEEK[0],
                            eweek_date:_self.WEEK[1],
                            mission:_self.mission,
                            task_area:_self.newMission.businessArea
                        }
                    }

                    function success(res){
                        _self.data2 = res.data.data.rows
                        console.log(_self.data2 )
                        for(let i = 0;i<_self.data2.length;i++){
                            _self.data2[i].Area = _self.businessArea_map.get(  _self.data2[i].taskArea)
                            _self.data2[i].depart = _self.businessPlace_map.get(_self.data2[i].taskPlace)
                            if(_self.data2[i].workFlowStatus=='Y'){
                                _self.data2[i].workFlowStatus='是'
                            }
                            if(_self.data2[i].workFlowStatus=='N'){
                                _self.data2[i].workFlowStatus='否'
                            }
                        }
                        setTimeout(()=>{
                            _self.download(tableid,name)
                        },1000)


                    }

                    function fail(err){
                    }

                    this.$Get(url, config, success, fail)
                }
                if (_self.flag == "agendaDay") {
                    let url = 'api/task/getLegWorklist'
                    let config = {
                        params:{
                            page: 1,
                            pageSize: 1000,
                            businessKind:"businessKind",
                            sortField: "plan_date",
                            task_stage:_self.taskStage,
                            executor_id:_self.executor_id,
                            bweek_date:_self.YMD,
                            eweek_date:_self.YMD,
                            mission:_self.mission,
                            task_area:_self.newMission.businessArea
                        }
                    }

                    function success(res){
                        _self.data2 = res.data.data.rows
                        console.log(_self.data2 )
                        for(let i = 0;i<_self.data2.length;i++){
                            _self.data2[i].Area = _self.businessArea_map.get(  _self.data2[i].taskArea)
                            _self.data2[i].depart = _self.businessPlace_map.get(_self.data2[i].taskPlace)
                            if(_self.data2[i].workFlowStatus=='Y'){
                                _self.data2[i].workFlowStatus='是'
                            }
                            if(_self.data2[i].workFlowStatus=='N'){
                                _self.data2[i].workFlowStatus='否'
                            }
                        }
                        setTimeout(()=>{
                            _self.download(tableid,name)
                        },1000)


                    }

                    function fail(err){
                    }

                    this.$Get(url, config, success, fail)
                }

            },
            get_data_center(){
                let params = "gzbusinessarea,gzbusinessplace"
                let _self = this
                function success(res){
                    _self.businessArea = res.data.data.gzbusinessarea
                    _self.businessPlace = res.data.data.gzbusinessplace
                    _self.businessArea_map = _self.$array2map(_self.businessArea)
                    _self.businessPlace_map = _self.$array2map(_self.businessPlace)
                    console.log(_self.businessArea)
                }
                this.$GetDataCenter(params, success)
            },
            get_onedate_data(e){
                let _self = this
                // console.log(e)
                this.local_date = e
                let url = 'api/task/getLegWorklist'
                let config = {
                    params:{
                        page: 1,
                        pageSize: 1000,
                        day: e,
                        sortField: "plan_date",
                        businessKind:"businessKind",
                    }
                }

                function success(res){
                    // _self.events_temp = res.data.data.rows
                    // for(let i = 0;i<_self.events_temp.length;i++){
                    //     _self.events_temp[i].start = _self.events_temp[i].plan_date
                    //     _self.events_temp[i].title = _self.events_temp[i].task_name
                    // }

                    _self.oneData = res.data.data.rows
                    console.log(_self.oneData)
                }

                function fail(err){
                }

                this.$Get(url, config, success, fail)

            },
        },
        created() {
            let _self = this
            _self.get_data_center()
            _self.get_data()
            _self.get_executor_list()
            _self.get_onedate_data((new Date()).toLocaleDateString().replace(new RegExp("/",'g'),"-"))
            this.local_date = (new Date()).toLocaleDateString().replace(new RegExp("/",'g'),"-")
            this.local_date = DateFormat(new Date())
            this.get_onedate_data(DateFormat(new Date()))
            _self.$bus.on("UPDATE_BUSINESS_TASK_LIST_DEMO", (e)=>{
                _self.get_data()
                _self.get_onedate_data(DateFormat(new Date()))
            })
            _self.$bus.on("UPDATE_TASK_LIST",(e)=>{
                _self.get_data()
                _self.load= true
            })
        }
    }
</script>

<style>
    @import '~fullcalendar/dist/fullcalendar.css';
    .fc-unthemed td.fc-today{
        background: #fcf4cd;
    }
    .fc-agendaDay-view .fc-event{
        font-size:14px;
        border: 1px solid #2d8cf0;
        color: #ffffff;
        height: 110px;
    }
    .fc-agendaDay-view  .fc-short{
        height: 20px;
    }
    .fc-content .fc-time{
        /*line-height: 18px;*/
        /*display: inline;*/
    }
    /*.fc-agendaDay-view  .fc-content{*/
        /*text-overflow:ellipsis;*/
        /*white-space:nowrap;*/
    /*}*/
    .fc-agendaDay-view .fc-title{
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
    }
    .fc-event, .fc-event-dot{
        background: #2d8cf0;
    }
    .vdp-datepicker__calendar .cell.selected{
        background:  #2d8cf0;
        color: #ffffff;

    }
    .vdp-datepicker__calendar .cell.selected:hover{
        background:  #2d8cf0;
        color: #ffffff;
    }
    .fc-state-down, .fc-state-active {
        background-color: #2d8cf0;
        background-image: none;
        box-shadow: none;
        color: #ffffff;

    }
    .filter{
        background: white none;
        border: 1px solid #CCC;
        box-shadow: 1px 1px 3px #ccc;
        position: absolute;
        right: 160px;
        top: 120px;
        width: 300px;
        z-index: 1;
    }
    .a{
        display: flex;
        justify-content: flex-start;
    }
    .d{
        display: inline-block;
        height: 22px;
        line-height: 22px;
        margin: 2px 4px 2px 0;
        padding: 0 8px;
        border: 1px solid #e9eaec;
        border-radius: 3px;
        background: #f7f7f7;
        font-size: 12px;
        vertical-align: middle;
        opacity: 1;
        overflow: hidden;
        cursor: pointer;
    }
    .d:hover{
        opacity: 0.8;
        background:  #2d8cf0;
        color: #fff;
    }
    .b{
        opacity: 0.8;
        background:  #2d8cf0;
        color: #fff;
    }
</style>