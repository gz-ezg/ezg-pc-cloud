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
            @day-click="dayClick"
            >
        </full-calendar>
        <!-- <full-calendar :events="events" lang="zh"></full-calendar> -->
        </Card>
        <Button @click="next">下一个</Button>
        
    </div>
</template>

<script>
// import fullCalendar from 'vue-fullcalendar'
import { FullCalendar } from 'vue-full-calendar'
//  引入中文库
import 'fullcalendar/dist/locale/zh-cn.js'

export default {
    components:{
        FullCalendar,
        // fullCalendar
    },
    data(){
        return{
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
            defaultView:"month"
        }
    },
    mounted() {

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
        dayClick(date, jsEvent, view){
            console.log(date)
            console.log(jsEvent)
            console.log(view)
        },
        next() {
            //  通过这个函数调用calendar中的方法，
            //  方法名，参数
            this.$refs.calendar.fireMethod('getEventSources')
        },
    }
    //  @event-selected 点击事件触发
    //  @day-click  点击日期触发
}
</script>
<style>
    @import '~fullcalendar/dist/fullcalendar.css';
</style> 