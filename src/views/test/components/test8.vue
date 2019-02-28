<template>
    <div>
        <full-calendar
            class="test-fc"
            :events="fcEvents"
            first-day="1"
            locale="zh-cn"
            @changeMonth="changeMonth"
            @eventClick="eventClick"
            @dayClick="dayClick"
            @dayRightClick="dayRightClick"
            @moreClick="moreClick"
        >
            <div slot="fc-header-left">
                <Button type="primary">新增日程</Button>
            </div>
            <template slot="fc-event-card" slot-scope="p">
                <div :class="p.event.cssClass">{{ p.event.title }}</div>
                <div :class="p.event.cssClass">{{ p.event.start }}</div>
                <div :class="p.event.cssClass">{{ p.event.end }}</div>
            </template>
            <template slot="hover-box" slot-scope="p">
                <!-- <p>{{p.event}}</p> -->
                <Card>
                    <Row :gutter="20">
                        <Col span="6">
                            <span>任务对象：</span>
                        </Col>
                        <Col span="18">
                            <span>{{p.event.title}}</span>
                        </Col>
                    </Row>
                    <Row :gutter="20">
                        <Col span="6">
                            <span>任务详情：</span>
                        </Col>
                        <Col span="18">
                            <span>{{p.event.start}}</span>
                        </Col>
                    </Row>
                    <Row :gutter="20">
                        <Col span="6">
                            <span>执行人：</span>
                        </Col>
                        <Col span="18">
                            <span>{{p.event.end}}</span>
                        </Col>
                    </Row>
                    <Row :gutter="20">
                        <Col span="6">
                            <span>创建人：</span>
                        </Col>
                        <Col span="18">
                            <span>{{p.event.cssClass}}</span>
                        </Col>
                    </Row>
                </Card>
            </template>
            <template slot="right-click" slot-scope="p">
                <Button @click="right_click_date(p.time)" type="primary">新增日程</Button>
            </template>
        </full-calendar>
    </div>
</template>
<script>
import fullCalendar from '../../woa-components/full-calendar/index'
let demoEvents = [
    {
        title: 'Sunny 725-727',
        start: '2019-02-01',
        end: '2019-02-01',
        cssClass: 'family'
    },
    {
        title: 'Lunfel 726-727',
        start: '2019-02-26',
        end: '2019-02-26',
        cssClass: ['home', 'work']
    },
    {
        title: 'Lunfel 2/27-2/28',
        start: '2019-02-27',
        end: '2019-02-27'
    },
    {
        title: 'Lunfel 2/27-2/28',
        start: '2019-02-28',
        end: '2019-02-28'
    },
    {
        title: 'Lunfel 2/27-2/28',
        start: '2019-02-27',
        end: '2019-02-27'
    },
    {
        title: 'Lunfel 2/26-3/05',
        start: '2019-02-26',
        end: '2019-02-26'
    },
    {
        title: 'Lunfel 1/27-1/28',
        start: '2019-01-27',
        end: '2019-01-27'
    },
    {
        title: 'Lunfel 1/27-2/2',
        start: '2019-01-27',
        end: '2019-01-27'
    },
    {
        title: 'Lunfel 3/27-3/28',
        start: '2019-03-28',
        end: '2019-03-28'
    },
];

export default {
    data() {
        return {
            fcEvents: demoEvents
        }
    },
    methods: {
        //  当前日期，首次会在created自动调用，可以用于生成首页日程
        'changeMonth'(start, end, current) {
            console.log('changeMonth', start.format(), end.format(), current.format())
        },
        //  点击事件
        'eventClick'(event, jsEvent, pos) {
            console.log('eventClick', event, jsEvent, pos)
        },
        //  点击日期
        'dayClick'(day, jsEvent) {
            console.log('dayClick', day, jsEvent)
        },
        //  右键点击日期
        'dayRightClick'(day, jsEvent) {
            console.log('dayRightClick', day, jsEvent)
        },
        //  点击更多
        'moreClick'(day, events, jsEvent) {
            console.log('moreCLick', day, events, jsEvent)
        },
        'right_click_date'(time){
            console.log(time)
        }
    },
    components: {
        'full-calendar': fullCalendar
    }
}
</script>
<style lang='scss'>
.app {
  color: green;
}
</style>