<template>
    <div style="min-width:1300px" @click="close_right_menu">
        <Button v-if="right_click_show" :style="{top: rightTop + 'px', left: rightLeft + 'px'}" style="position:fixed;z-index:9999">新增日程</Button>
        <!-- <Button @click="get_date">下一天</Button> -->
        <Card title="日程表">
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
                    <Col span="18"><span>{{hover_local.task_content}}</span></Col>
                </Row>
                <Row :gutter="20">
                    <Col span="6">
                        <span>执行人：</span>	
                    </Col>
                    <Col span="18"><span>{{hover_local.executor_name}}</span></Col>
                </Row>
                <Row :gutter="20">
                    <Col span="6">
                        <span>创建人：</span>
                    </Col>
                    <Col span="18"><span>{{hover_local.realname}}</span></Col>
                </Row>
            </Card>
            <Row :gutter="20"> 
                <Col span="18">
                    <full-calendar
                        ref="calendar"  
                        :events="events" 
                        :config="config" 
                        @event-selected="eventSelected"
                        :defaultView="defaultView"
                        :editable="false"
                        @day-click="dayClick"
                        @right-click="right_deal"
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
                    <Row style="margin-bottom:10px">
                        <Button @click="add_task" type="primary">新增日程</Button>
                    </Row>
                    <Row>
                        <Row style="margin-bottom:10px"><h3>{{local_date}}</h3></Row>
                        <Row>
                            <Scroll height="300">
                                <Timeline>
                                    <TimelineItem v-for="item in oneData" :key="item.id">
                                        <p class="time">{{item.plan_date.slice(10)}}</p>
                                        <p class="content">{{item.task_name}}</p>
                                    </TimelineItem>
                                </Timeline>
                            </Scroll>
                        </Row>
                    </Row>
                </Col>
            </Row>
        </Card>
        <!-- <create-task></create-task> -->
        <task-detail></task-detail>
    </div>
</template>

<script>
import { zh } from 'vuejs-datepicker/dist/locale/index.js'
import { FullCalendar } from 'vue-full-calendar'
import { DateFormat } from '../../../libs/utils.js'
import Datepicker from 'vuejs-datepicker';
//  引入中文库
import 'fullcalendar/dist/locale/zh-cn'

import CreateTask from './create_task'
import TaskDetail from './detailTask'

export default {
    name: "schedule_index",
    components:{
        FullCalendar,
        Datepicker,
        CreateTask,
        TaskDetail
    },
    data(){
        return{
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
            config:{
                locale: 'zh-cn',
                //  周末不显示
                // weekends: false,  
            },
            events:[

            ],
            events_temp: [],
            //  默认显示月
            defaultView:"month",
            hover_local: "",
            oneData: []
        }
    },
    mounted() {

    },
    methods:{
        eventSelected(event, jsEvent, view){
            //  点击展示事件详情
            // console.log(event)
            // console.log(jsEvent)
            // console.log(view)
            this.$bus.emit("OPEN_SEHEDULE_DETAIL",event)
        },
        eventDrop(event){},
        eventResize(event){},
        eventCreated(event){},
        eventReceive(event){},
        eventrender(event){},
        dayClick(date, jsEvent, view){
            //  可以在此处新增日程
            // this.openRightHover = true
            // this.newCalendar.planDate = date
            let _self = this
            this.date = date._d
            this.get_onedate_data(this.date)
            // _self.$bus.emit("OPEN_CREATE_TASK", date)
            // console.log(date)
            // console.log(jsEvent)
            // console.log(view)
        },
        next() {
            //  通过这个函数调用calendar中的方法，
            //  方法名，参数
            this.$refs.calendar.fireMethod('getEventSources')
        },
        change_date(e){
            let date = DateFormat(e)
            // this.local_date = e.toLocaleDateString().replace(new RegExp("/",'g'),"-")
            this.local_date = date

            // console.log(e.toLocaleDateString().replace(new RegExp("/",'g'),"-"))

            // this.$refs.calendar.fireMethod('changeView', this.$refs.calendar.fireMethod("getView").type, e.toLocaleDateString().replace(new RegExp("/",'g'),"-"))
            this.$refs.calendar.fireMethod('changeView', this.$refs.calendar.fireMethod("getView").type , date)

            // console.log(this.$refs.calendar.fireMethod("getView").type)
            // this.get_onedate_data(e.toLocaleDateString().replace(new RegExp("/",'g'),"-"))
            this.get_onedate_data(date)

        },
        right_deal(e){
            this.right_click_show = true
            this.rightTop = e.y
            this.rightLeft = e.x
            console.log(e)
        },
        //  右键点击，鼠标滑入滑出
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
            // console.log("====== event ======")        
            // console.log(event)
            // console.log("====== jsEvent ======")
            // console.log(jsEvent)
            // console.log("====== view ======")
            // console.log(view)

            this.top = jsEvent.clientY
            this.left = jsEvent.clientX
            this.hover_local = event
            // console.log(this.hover_local)
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
            let url = 'api/task/list'
            let config = {
                page: 1,
                pageSize: 1000,
                day: ""
            }

            function success(res){
                _self.events_temp = res.data.data.rows
                for(let i = 0;i<_self.events_temp.length;i++){
                    _self.events_temp[i].start = _self.events_temp[i].plan_date
                    _self.events_temp[i].title = _self.events_temp[i].task_name
                }

                _self.events = _self.events_temp
            }

            function fail(err){
            }

            this.$Post(url, config, success, fail)
        },
        get_onedate_data(e){
            let _self = this
            let url = 'api/task/list'
            let config = {
                page: 1,
                pageSize: 1000,
                day: e
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

            this.$Post(url, config, success, fail)  
        },
        add_task(){
            
        }
    },
    created() {
        let _self = this
        _self.get_data()
        // _self.get_onedate_data((new Date()).toLocaleDateString().replace(new RegExp("/",'g'),"-"))
        // this.local_date = (new Date()).toLocaleDateString().replace(new RegExp("/",'g'),"-")
        this.local_date = DateFormat(new Date())
        this.get_onedate_data(DateFormat(new Date()))
    },
    //  @event-selected 点击事件触发
    //  @day-click  点击日期触发
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
</style> 
