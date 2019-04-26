<template>
    <div style="min-width:1300px" @click="close_right_menu">
        <Button v-if="right_click_show" :style="{top: rightTop + 'px', left: rightLeft + 'px'}" style="position:fixed;z-index:9000" type="primary" @click="add_task">新增日程</Button>
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
                        <span>执行中的任务——<span style="color:blue">蓝色</span><br/></span>
                        <span>当天需要完结的任务——<span style="color:orange">黄色</span><br/></span>
                        <span>完结任务——<span style="color:#228B22">绿色</span><br/></span>
                        <span>逾期任务——<span style="color:red">红色</span><br/></span>
                        <span>线索未完成——<span style="color:#FF7F00">橙色</span><br/></span>
                        <span>线索完成——<span style="color:#228B22">绿色</span><br/></span>
                    </Row>
                    <Row>
                        <Row style="margin-bottom:10px"><h3>{{local_date}}</h3></Row>
                        <Row>
                            <Scroll height="520">
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
        <create-task></create-task>
        <task-detail></task-detail>
        <div v-show="showFilter">
            <div class="filter">
                <Form :label-width="80" style="margin:20px 20px 0 0">
                    <FormItem label="客户" >
                        <Input placeholder="搜索相关的客户/人员">
                            <Button slot="append" icon="ios-search"  style="background: #2d8cf0;color: #fff;border-radius: 0px;font-weight: 700"></Button>
                        </Input>
                    </FormItem>
                    <FormItem label="状态" >
                        <Tag>全部</Tag>
                        <Tag>已完成</Tag>
                        <Tag>未完成</Tag>
                        <Tag>已终止</Tag>
                    </FormItem>
                    <FormItem label="类型" >
                        <Tag>全部</Tag>
                        <Tag>微信</Tag>
                        <Tag>电话</Tag>
                        <Tag>QQ</Tag>
                        <Tag>拜访</Tag>
                        <Tag>商事</Tag>
                        <Tag>会计</Tag>
                        <Tag>线索</Tag>
                        <Tag>客服</Tag>
                        <Tag>其他</Tag>
                    </FormItem>
                    <FormItem label="包含任务" >
                        <Tag>全部</Tag>
                        <Tag>是</Tag>
                        <Tag>否</Tag>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import { zh } from 'vuejs-datepicker/dist/locale/index.js'
import { FullCalendar } from 'vue-full-calendar'
import { DateFormat } from '../../../libs/utils.js'
import Datepicker from 'vuejs-datepicker';
//  引入中文库
import 'fullcalendar/dist/locale/zh-cn'

import CreateTask from '../common/createTask'
import TaskDetail from './detailTask'


export default {
    name: "schedule_index",
    components:{
        FullCalendar,
        Datepicker,
        CreateTask,
        TaskDetail,

    },
    data(){
        return{
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
                right:  'filter,month,agendaWeek,agendaDay'
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
                            console.log("sss")
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
    mounted() {

    },
    methods:{
        eventSelected(event, jsEvent, view){
            //  点击展示事件详情
            this.$bus.emit("OPEN_SEHEDULE_DETAIL",event)
        },
        eventDrop(event){},
        eventResize(event){},
        eventCreated(event){},
        eventReceive(event){},
        eventrender(event){},
        //  左键点击触发
        dayClick(date, jsEvent, view){
            //  可以在此处新增日程
            let _self = this
            this.date = date._d
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
            this.$bus.emit("SCHEDULE_CREATE_TASK", _self.rightClickDate)
        },
        //  关闭右键菜单
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
                params:{
                    page: 1,
                    pageSize: 1000,
                    day: ""
                }
            }

            function success(res){
                _self.events_temp = res.data.data.rows
                console.log(_self.events_temp)
                for(let i = 0;i<_self.events_temp.length;i++){
                    _self.events_temp[i].start = _self.events_temp[i].plan_date
                    _self.events_temp[i].title = _self.events_temp[i].task_name

                    if(_self.events_temp[i].task_stage == "tesExecuting"){
                        _self.events_temp[i].color = "blue"
                    }
                    if(_self.events_temp[i].plan_date.slice(0,10) == _self.local_date){
                        _self.events_temp[i].color = "orange"
                    }
                    if(_self.events_temp[i].task_stage == "tesFinished"){
                        _self.events_temp[i].color = "#228B22"
                    }
                    if(_self.events_temp[i].task_des_code == "tdOverdue"){
                        _self.events_temp[i].color = "red"
                    }
                    if(_self.events_temp[i].task_kind == "tkClue" && _self.events_temp[i].task_stage != "tesFinished"){
                        _self.events_temp[i].color = "#FF7F00"
                    }
                    if(_self.events_temp[i].task_kind == "tkClue" && _self.events_temp[i].task_stage == "tesFinished"){
                        _self.events_temp[i].color = "#228B22"
                    }
                }

                _self.events = _self.events_temp
            }

            function fail(err){
            }

            this.$Get(url, config, success, fail)
        },
        get_onedate_data(e){
            let _self = this
            // console.log(e)
            this.local_date = e
            let url = 'api/task/list'
            let config = {
                params:{
                    page: 1,
                    pageSize: 1000,
                    day: e,
                    sortField: "plan_date"
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
        _self.get_data()
        // _self.get_onedate_data((new Date()).toLocaleDateString().replace(new RegExp("/",'g'),"-"))
        // this.local_date = (new Date()).toLocaleDateString().replace(new RegExp("/",'g'),"-")
        this.local_date = DateFormat(new Date())
        this.get_onedate_data(DateFormat(new Date()))
        _self.$bus.on("UPDATE_TASK_LIST_DEMO", (e)=>{
            _self.get_data()
            _self.get_onedate_data(DateFormat(new Date()))
        })
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
        font-size:6px;
        border: 1px solid #2d8cf0;
        color: #ffffff;

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
</style> 
