<template>
    <div>
        <gantt-chart
            :closable="true"
            @event-click="eventClick"
            @icon-close="iconClose"
            :row="1"
        >
            <!-- <div slot="eventBox" slot-scope="x" :style="{'background-color':x.event.bg}" style="white-space:nowrap!important;text-overflow: ellipsis;overflow: hidden;outline: 0 !important">
                <p>{{x.event.start}}</p>
                <p>{{x.event.end}}</p>
                <p>{{x.event.value}}</p>
                <p>{{x.event.bg}}</p>
            </div> -->
            <div slot="hover-box" slot-scope="x">
                <p>{{x.event.start}}</p>
                <p>{{x.event.end}}</p>
                <p>{{x.event.value}}</p>
                <p>{{x.event.bg}}</p>
            </div>
        </gantt-chart>

        <!-- <div style="max-height:48px;overflow-y:scroll">
            <p>123</p>
            <p>123</p>
            <p>123</p>
            <p>123</p>
            <p>123</p>
        </div> -->
    </div>
</template>

<script>
import ganttChart from '../../woa-components/ganttChart/index'

export default {
    components: {
        ganttChart
    },
    methods: {
        eventClick(event, jsEvent){
            console.log(event)
            console.log(jsEvent)
        },
        iconClose(event){
            console.log(event)
        }
    }
}
</script>

