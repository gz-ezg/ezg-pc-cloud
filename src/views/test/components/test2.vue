<template>
    <div style="min-width:1300px">
        <!-- <CheckboxGroup v-model="checkAllGroup">
            <Checkbox v-for="(item, index) in data" :label="item.code" :key="index">{{item.data}}<Input v-model="number[item.code]" v-if="item.number" size="small" style="width:40px"/></Checkbox>
        </CheckboxGroup> -->
        <Card title="日程表">
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
        <Menu active-name="1" v-if="click_show">
            <MenuItem name="1">
                <Icon type="document-text"></Icon>
                文章管理
            </MenuItem>
            <MenuItem name="2">
                <Icon type="chatbubbles"></Icon>
                评论管理
            </MenuItem>
        </Menu>
        <!-- <div id="app" @contextmenu="showMenu" style="width: 100px;height: 100px;background: red;">
            <vue-context-menu :contextMenuData="contextMenuData"
                            @savedata="savedata"
                            @newdata="newdata">
            </vue-context-menu>
        </div> -->
    </div>
</template>

<script>
import zh from 'vuejs-datepicker/dist/locale/translations/zh.js'
import { FullCalendar } from 'vue-full-calendar'
import Datepicker from 'vuejs-datepicker';
import 'vue-contextmenu/style/css/font-awesome.min.css'
import VueContextMenu from 'vue-contextmenu'
//  引入中文库
import 'fullcalendar/dist/locale/zh-cn.js'

export default {
    components:{
        FullCalendar,
        Datepicker,
        VueContextMenu
        // calendar
        // fullCalendar
    },
    data(){
        return{
            click_show: false,
            zh: zh,
            date: new Date(),   
            openAddCalendar: false,
            config:{
                // locale: 'zh-cn',
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
            this.openAddCalendar = true
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
            this.click_show = true
            console.log(e)
            //  e.x e.y e.path[0]
        }
    }
    //  @event-selected 点击事件触发
    //  @day-click  点击日期触发
}
</script>
<style>
    @import '~fullcalendar/dist/fullcalendar.css';
</style> 