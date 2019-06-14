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
    </div>
</template>

<script>
    import { zh } from 'vuejs-datepicker/dist/locale/index'
    import Datepicker from 'vuejs-datepicker';
    import { FullCalendar } from 'vue-full-calendar'
    import {DateFormat} from "../../../libs/utils";
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
                    right:  'filter,month,agendaDay',
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
                        }
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
            next() {
                //  通过这个函数调用calendar中的方法，
                //  方法名，参数
                this.$refs.calendar.fireMethod('getEventSources')
            },
            change_date(e){
                let date = DateFormat(e)
                // console.log(date)
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
                console.log(this.hover_local)
            },
            get_date(){
                //  获取当前日期
                // fireMethod 调用内置方法$(this.$el).fullCalendar(...options)
                // console.log(this.$refs.calendar.fireMethod('getDate'))
                // 更改到指定日期
                this.$refs.calendar.fireMethod('changeView', 'agendaDay', '2017-06-01')
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
                        task_kind:"tkLegBus"
                    }
                }

                function success(res){
                    // _self.events_temp = res.data.data.rows
                    // for(let i = 0;i<_self.events_temp.length;i++){
                    //     _self.events_temp[i].start = _self.events_temp[i].plan_date
                    //     _self.events_temp[i].title = _self.events_temp[i].task_name
                    // }

                    _self.oneData = res.data.data.rows
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
    .fc-content{
        /*overflow: hidden;*/
    }
    .fc-title{
        /*margin-left: 3px;*/
        /*display: inline;*/
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