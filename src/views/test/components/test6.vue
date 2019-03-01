<template>
    <div>
        <gantt-chart
            :closable="true"
            @event-click="eventClick"
            @icon-close="iconClose"
        >
            <!-- <div slot="eventBox" slot-scope="x">{{x.event.bg}}</div> -->
        </gantt-chart>
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

