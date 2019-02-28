<template>
    <div style="min-width:1300px">
        <Card title="商事排程表">
            <Row :gutter="20">
                <Col span="18">
                    <div>
                        <full-calendar
                            ref="calendar"
                            :events="events"
                            :config="config"
                            :defaultView="defaultView"
                            :editable="false"
                        >
                        </full-calendar>
                    </div>
                </Col>
                <Col span="6">
                    <Row style="height:340px">
                        <datepicker
                            v-model="date"
                            :inline="true"
                            :language="zh"
                            >
                        </datepicker>
                    </Row>
                    <Row>
                        <span>执行中的任务--蓝色<br/></span>
                        <span>当天需要完结的任务--黄色<br/></span>
                        <span>完结任务--绿色<br/></span>
                        <span>逾期任务--红色<br/></span>
                        <span>线索未完成--橙色<br/></span>
                        <span>线索完成--绿色<br/></span>
                    </Row>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
import { DateFormat } from '../../../libs/utils.js'
import { FullCalendar } from 'vue-full-calendar'
import Datepicker from 'vuejs-datepicker';
//  引入中文库
import 'fullcalendar/dist/locale/zh-cn'
import { zh } from 'vuejs-datepicker/dist/locale/index.js'

export default {
    name: "newSchedule",
    components:{
        Datepicker,
        FullCalendar
    },
    data() {
        return {
            //Datepicker
            zh: zh,
            date: new Date(),
            //FullCalendar
            config:{
                locale: 'zh-cn',
                //  周末不显示
                // weekends: false,  
            },
            events: [],
            defaultView: "agendaDay"
        }
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
</style>