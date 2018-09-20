<template>
    <div>
        <!-- <CheckboxGroup v-model="checkAllGroup">
            <Checkbox v-for="(item, index) in data" :label="item.code" :key="index">{{item.data}}<Input v-model="number[item.code]" v-if="item.number" size="small" style="width:40px"/></Checkbox>
        </CheckboxGroup> -->
        <Card title="日程表">
            <full-calendar
            ref="calendar"  
            :events="events" 
            :config="config" 
            @event-selected="eventSelected"
            :defaultView="defaultView"
            :editable="false"
            >
        </full-calendar>
        </Card>
    </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
//  引入中文库
import 'fullcalendar/dist/locale/zh-cn.js'

export default {
    components:{
        FullCalendar,
    },
    data(){
        return{
            config:{
                // locale: 'zh-cn',
                //  周末不显示
                weekends: false,
            },
            events:[
                {
                    title  : 'event1',
                    start  : '2018-09-03T09:00:00',
                    end : '2018-09-03T11:00:00',
                    color: "red"
                },
                {
                    title  : 'event5',
                    start  : '2018-09-03T11:30:00',
                    end : '2018-09-03T12:00:00',
                    color: "green",
                },
                {
                    title  : 'event2',
                    start  : '2018-09-05',
                    end    : '2018-09-07',
                },
                {
                    title  : 'event3',
                    start  : '2018-09-11T12:30:00',
                },
            ],
            //  默认显示月
            defaultView:"month"
        }
    },
    methods:{
        eventSelected(event, jsEvent, view){
            console.log(event)
            console.log(jsEvent)
            console.log(view)
        },
        eventDrop(event){},
        eventResize(event){},
        eventCreated(event){},
        eventReceive(event){},
        eventrender(event){},
        dayClick(date, jsEvent, view){}
    }
}
</script>
<style>
    @import '~fullcalendar/dist/fullcalendar.css';
</style> 