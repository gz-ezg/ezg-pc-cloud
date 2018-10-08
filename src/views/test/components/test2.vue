<template>
    <div style="min-width:1300px" @click="close_right_menu">
        <!-- <Button @click="get_date">下一天</Button> -->
        <Card title="日程表">
            <Card style="width:100px;position:fixed;z-index:9999" v-if="click_show" :style="{top: top + 'px', left: left + 'px'}">
                        <Row :gutter="20">
                            <Col><span style="padding:5px;" @click="dayClick">新增任务</span></Col>
                            <Col style="padding-top:10px"><span style="padding:5px">新增计划</span></Col>
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
                    <Row style="height:350px">
                        <datepicker 
                        v-model="date"
                        :inline="true"
                        :language="zh"
                        @selected="change_date">
                        </datepicker>
                    </Row>
                    <Row>
                        <Row>2018年9月27日</Row>
                        <Row>
                            <Timeline>
                                <TimelineItem>
                                    <p class="time">8:00</p>
                                    <p class="content">Apple I 问世</p>
                                </TimelineItem>
                                <TimelineItem>
                                    <p class="time">9:00</p>
                                    <p class="content">发布 Macintosh</p>
                                </TimelineItem>
                                <TimelineItem>
                                    <p class="time">12:00</p>
                                    <p class="content">发布 iPhone</p>
                                </TimelineItem>
                                <TimelineItem>
                                    <p class="time">14:00</p>
                                    <p class="content">发布 iPad</p>
                                </TimelineItem>
                                <TimelineItem>
                                    <p class="time">16:00</p>
                                    <p class="content">史蒂夫·乔布斯去世</p>
                                </TimelineItem>
                            </Timeline>
                        </Row>
                    </Row>
                </Col>
            </Row>
        <!-- <full-calendar :events="events" lang="zh"></full-calendar> -->
        </Card>
        <Modal
            title="添加日程"
            v-model="openAddCalendar"
            width="400"
        >
            <Row>
                添加日程
            </Row>
            <div slot="footer"></div>
        </Modal>
        <Button @click="next">下一个</Button>
        
        <!-- <div id="app" @contextmenu="showMenu" style="width: 705px;height: 307px;background: red;">
            <vue-context-menu :contextMenuData="contextMenuData"
                            @savedata="savedata"
                            @newdata="newdata">
            </vue-context-menu>
        </div> -->
        <Card style="position:fixed;right:0px;top:100px;width:30vw;height:100vh;z-index:9999" title="新建日程" v-if="openRightHover">
            <div slot="extra">
                <Icon type="close-round" @click="openRightHover = false"></Icon>
            </div>
            <Row>
                <Scroll height="800">
                    <div style="1000px">
                        <Row><span>日程信息</span></Row>
                        <Row>
                            <Form :model="newCalendar" label-position="left" :label-width="100">
                                <FormItem label="主题">
                                    <Input v-model="newCalendar.taskName"></Input>
                                </FormItem>
                                <FormItem label="起止时间">
                                    <Input v-model="newCalendar.planDate"></Input>
                                </FormItem>
                                <FormItem label="重复">
                                    <Input v-model="newCalendar.input3"></Input>
                                </FormItem>
                                <FormItem label="提醒">
                                    <Input v-model="newCalendar.input3"></Input>
                                </FormItem>
                            </Form>
                        </Row>
                    </div>
                </Scroll>
            </Row>
        </Card>
    </div>
</template>

<script>
import { zh } from 'vuejs-datepicker/dist/locale/index.js'
import { FullCalendar } from 'vue-full-calendar'
import Datepicker from 'vuejs-datepicker';
//  引入中文库
import 'fullcalendar/dist/locale/zh-cn'

export default {
    components:{
        FullCalendar,
        Datepicker,
    },
    data(){
        return{
            newCalendar:{

            },
            openRightHover: false,
            top: "",
            left: "",
            click_show: false,
            zh: zh,
            date: new Date(),   
            openAddCalendar: false,
            config:{
                locale: 'zh-cn',
                //  周末不显示
                // weekends: false,
                
            },
            events:[
                {
                    title  : 'event1',
                    start  : '2018-09-03T09:00:00',
                    end : '2018-09-03T11:00:00',
                    color: "red",
                    description: "这是标题"
                },
                {
                    title  : 'event5',
                    start  : '2018-09-03T11:30:00',
                    end : '2018-09-03T12:00:00',
                    color: "green",
                    description: "这是标2"
                },
                {
                    title  : 'event2',
                    start  : '2018-09-05',
                    end    : '2018-09-07',
                    description: "这是标题3"
                },
                {
                    title  : 'event3',
                    start  : '2018-09-11T12:30:00',
                    description: "这是标题4"
                },
            ],
            //  默认显示月
            defaultView:"month",
        }
    },
    mounted() {

    },
    methods:{
        eventSelected(event, jsEvent, view){
            //  点击展示事件详情
            console.log(event)
            console.log(jsEvent)
            console.log(view)
        },
        eventDrop(event){},
        eventResize(event){},
        eventCreated(event){},
        eventReceive(event){},
        eventrender(event){},
        dayClick(date, jsEvent, view){
            //  可以在此处新增日程
            this.openRightHover = true
            console.log(date)
            console.log(jsEvent)
            console.log(view)
        },
        next() {
            //  通过这个函数调用calendar中的方法，
            //  方法名，参数
            this.$refs.calendar.fireMethod('getEventSources')
        },
        change_date(e){
            console.log(e)
        },
        right_deal(e){
            // this.click_show = true
            // console.log(e)
            //  e.x e.y e.path[0]
        },
        //  右键点击，鼠标滑入滑出
        close_right_menu(){
            this.click_show = false
            
        },
        mouse_out(){
            console.log("鼠标离开了！")
            this.click_show = false
            // console.log($(this.$refs["calendar"]).fullCalendar('getDate'))
        },
        mouse_over(event, jsEvent, view){
            this.click_show = true
            console.log("====== event ======")        
            console.log(event)
            console.log("====== jsEvent ======")
            console.log(jsEvent)
            console.log("====== view ======")
            console.log(view)

            this.top = jsEvent.clientY
            this.left = jsEvent.clientX
        },
        get_date(){
            //  获取当前日期
            // fireMethod 调用内置方法$(this.$el).fullCalendar(...options)
            console.log(this.$refs.calendar.fireMethod('getDate'))
            // 更改到指定日期
            this.$refs.calendar.fireMethod('changeView', 'agendaDay', '2017-06-01')
        }
    }
    //  @event-selected 点击事件触发
    //  @day-click  点击日期触发
}
</script>
<style>
    @import '~fullcalendar/dist/fullcalendar.css';
</style> 