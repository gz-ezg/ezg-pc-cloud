<template>
    <div style="min-width:1300px" @click="close_right_menu">
        <Button v-if="right_click_show" :style="{top: rightTop + 'px', left: rightLeft + 'px'}" style="position:fixed;z-index:9000" type="primary" @click="add_task">新增市场外勤任务</Button>
        <Card title="市场外勤任务">
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
                        <span>创建人：</span>
                    </Col>
                    <Col span="18"><span>{{hover_local.creatorName}}</span></Col>
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
                        <span>执行中的任务——<span style="color:#00CCFF">蓝色</span><br/></span>
                        <span>完结任务成功——<span style="color:#AEDD81">绿色</span><br/></span>
                        <span>完结任务失败——<span style="color:#D24D57">红色</span><br/></span>
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
        <create-accounter-task></create-accounter-task>
        <detail-accounter-task></detail-accounter-task>
        <div v-show="showFilter">
            <div class="filter">
                <Form :label-width="80" style="margin:20px 20px 0 0">
                    <FormItem label="客户：" >
                        <Input placeholder="搜索相关的客户/人员">
                            <Button  slot="append" icon="ios-search"  style="background: #2d8cf0;color: #fff;border-radius: 0px;font-weight: 700"></Button>
                        </Input>
                    </FormItem>
                    <FormItem label="状态：" >
                        <div class="d" >全部</div>
                        <div class="d" >已完成</div>
                        <div class="d" >正在处理</div>
                        <div class="d" >已终止</div>
                    </FormItem>
                    <FormItem label="类型：" >
                        <div class="d" >全部</div>
                        <div class="d" >微信</div>
                        <div class="d" >电话</div>
                        <div class="d" >QQ</div>
                        <div class="d" >拜访</div>
                        <div class="d" >商事</div>
                        <div class="d" >会计</div>
                        <div class="d" >线索</div>
                        <div class="d" >客服</div>
                        <div class="d" >其他</div>
                    </FormItem>
                    <FormItem label="包含任务：" >
                        <div class="d">全部</div>
                        <div class="d">是</div>
                        <div class="d">否</div>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
    import { zh } from 'vuejs-datepicker/dist/locale/index'
    import Datepicker from 'vuejs-datepicker'
    import {FullCalendar} from 'vue-full-calendar'
    import {DateFormat} from "../../../libs/utils";
    import 'fullcalendar/dist/locale/zh-cn'
    import CreateAccounterTask from './createAccounterTask'
    import DetailAccounterTask from './detailAccounterLegTask'
    export default {
        name: "index",
        components:{
            FullCalendar,
            Datepicker,
            CreateAccounterTask,
            DetailAccounterTask
        },
        data(){
            return{
                load:false,
                businessArea:[],
                businessPlace:[],
                businessArea_map:new Map(),
                businessPlace_map:new Map(),
                showFilter:false,
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
                    right:  'month,agendaWeek,agendaDay'
                },
                config:{
                    locale: 'zh-cn',
                    //  周末不显示
                    // weekends: false,
                    slotEventOverlap:false,
                    customButtons:{
                        filter:{
                            text:"筛选",
                            click:function () {
                                this.showFilter=!this.showFilter
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
                rightClickDate: ""
            }
        },
        methods:{
            close_right_menu(){
                this.right_click_show = false
            },
            eventSelected(event, jsEvent, view){
                //  点击展示事件详情
                this.$bus.emit("OPEN_MARKET_DETAIL_TASK",event)
            },
            dayClick(date, jsEvent, view){
                //  可以在此处新增日程
                console.log(date)
                let _self = this
                this.date = date._d
                let dateTemp = DateFormat(date)
                this.get_onedate_data(dateTemp)
            },
            add_task(){
                let _self = this
                this.$bus.emit("SCHEDULE_CREATE_MARKET_TASK", _self.rightClickDate)
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
            close_right_menu(){
                this.right_click_show = false
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
            get_data(){
                let _self = this
                let url = 'api/task/getLegWorklist'
                let config = {
                    params:{
                        page: 1,
                        pageSize: 1000,
                        marketKind:"tkLegMar"
                    }
                }

                function success(res){
                    _self.events_temp = res.data.data.rows
                    console.log(_self.events_temp )
                    if (_self.events_temp.length===0 && _self.load) {
                        window.location.reload()
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
                    console.log(_self.businessPlace_map)
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
                        marketKind:"marketKind"
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
            _self.get_onedate_data((new Date()).toLocaleDateString().replace(new RegExp("/",'g'),"-"))
            this.local_date = (new Date()).toLocaleDateString().replace(new RegExp("/",'g'),"-")
            this.local_date = DateFormat(new Date())
            this.get_onedate_data(DateFormat(new Date()))
            _self.$bus.on("UPDATE_MARKET_TASK_LIST_DEMO", (e)=>{
                _self.get_data()
                _self.get_onedate_data(DateFormat(new Date()))
            })
            _self.$bus.on("UPDATE_MARKET_TASK_LIST",(e)=>{
                _self.get_data()
                _self.load=true
            })
        }
    }
</script>

<style>
    @import '~fullcalendar/dist/fullcalendar.css';
    .fc-unthemed td.fc-today{
        background: #fcf4cd;
    }
    .fc-event{
        font-size:14px;
        border: 1px solid #2d8cf0;
        color: #ffffff
    }
    .fc-event, .fc-event-dot{
        background: #2d8cf0
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
        color: #ffffff
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
</style>