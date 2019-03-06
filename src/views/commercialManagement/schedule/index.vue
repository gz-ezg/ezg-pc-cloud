<template>
    <Card>
        <center style="margin-bottom:20px;">
            <DatePicker type="date" placeholder="选择日期" style="width: 200px" @on-change="getData" :value="date"></DatePicker>
            <Button @click="drawerStatus=true" type="primary">新增排程</Button>
        </center>
        <gannt-chart
            :closable="true"
            :row="2"
            :data="list"
            :loading="loading"
        >
            <div slot="eventBox" slot-scope="x" :style="{'background-color':x.event.bg}" style="white-space:nowrap!important;text-overflow: ellipsis;overflow: hidden;outline: 0 !important">
                <p style="white-space:nowrap;overflow-x: hidden;text-overflow: ellipsis">{{x.event.value}}</p>
                <p style="white-space:nowrap;overflow-x: hidden;text-overflow: ellipsis">{{x.event.bg}}</p>
            </div>
            <div slot="hover-box" slot-scope="x">
                <p><span style="width:80px;display:inline-block">开始时间:</span>{{x.event.start}}</p>
                <p><span style="width:80px;display:inline-block">事件名称:</span>{{x.event.value}}</p>
                <p><span style="width:80px;display:inline-block">地点:</span>{{x.event.bg}}</p>
            </div>
        </gannt-chart>
        <drawer
            title="新增日程"
            :width="400"
            @close="close"
            v-if="drawerStatus"
        >
            <div>
                1234455
            </div>
        </drawer>
    </Card>
</template>

<script>
import ganntChart from '../../woa-components/ganttChart/index'
import drawer from '../../woa-components/drawer/index'
import { DateFormat } from '../../../libs/utils'
import * as api from './api'

export default {
    components: {
        ganntChart,
        drawer
    },
    data() {
        return {
            list: [],
            loading: false,
            date: '',
            drawerStatus: false
        }
    },
    methods: {
        async getData(date) {
            this.date = date
            console.log(date)
            this.loading = true
            let config = {
                params: {
                    // page: 1,
                    // pageSize: 10,
                    task_kind: "tkScheduleB"
                }
            }

            try {
                let { rows } = await api.getTaskList(config)
                console.log(rows)
                this.list = []
                for (let i = 0; i < rows.length; i++) {
                    let flag = 0;
                    for (let j = 0; j < this.list.length; j++) {
                        if (rows[i].executor_id == this.list[j].userId) {
                            let eventItem = {
                                start: rows[i].plan_date,
                                end: '',
                                value: rows[i].task_content,
                                bg: '#fff'
                            }
                            this.list[j].innerData.push(eventItem)
                            break;
                        } else {
                            flag++;
                        }
                    }
                    if (this.list.length == flag) {
                        let temp = {
                            carNum: rows[i].executor_name,
                            userId: rows[i].executor_id,
                            innerData: []
                        }
                        let eventItem = {
                            start: rows[i].plan_date,
                            end: '',
                            value: rows[i].task_content,
                            bg: '#fff'
                        }
                        temp.innerData.push(eventItem)
                        this.list.push(temp)
                    } else {

                    }
                }
                this.loading = false
                console.log(this.list)
            } catch (error) {
                console.log(error)
            }
        },
        close(){
            this.drawerStatus = false
        }
    },
    created() {
        this.getData(DateFormat(new Date()))
    }
}
</script>
