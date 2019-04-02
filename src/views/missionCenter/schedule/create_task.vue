<template>
    <div>
        <Modal
            v-model="openTaskDetail"
            title="新增任务"
            width="600"
            :scrollable="true"
            class-name="vertical-center-modal"
        >
            <div style="min-height:90vh;width:550px">
                <Row>
                    <Col span="16">
                        <Input type="text" v-model="data.taskData[0].task_name" style="width:100%" />
                    </Col>
                    <Col span="6" push="2">
                        <Button type="ghost" @click="delete_task">删除任务</Button>
                    </Col>
                </Row>
                <Row style="margin-top:20px">
                    <Row :gutter="20">
                        <Col span="4">
                            <span style="line-height:24px">任务状态</span>
                        </Col>
                        <Col span="20">
                            <Select v-model="data.taskData[0].task_stage" size="small" style="width:180px">
                                <Option v-for="item in taskStage" :value="item.typecode" :key="item.id">{{item.typename}}</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row :gutter="20" style="margin-top:20px">
                        <Col span="4">
                            <span style="line-height:24px">任务对象</span>
                        </Col>
                        <Col span="20">
                            <span style="line-height:24px" readonly>{{data.taskData[0].company_name}}
                            </span>
                        </Col>
                    </Row>
                    <Row :gutter="20" style="margin-top:20px">
                        <Col span="4">
                            <span style="line-height:24px">执行者</span>
                        </Col>
                        <Col span="20">
                            <span style="line-height:24px" >{{data.taskData[0].executor_name}}
                            </span>
                        </Col>
                    </Row>
                    <Row :gutter="20" style="margin-top:20px">
                        <Col span="4">
                            <span style="line-height:24px">任务级别</span>
                        </Col>
                        <Col span="20">
                            <Select v-model="data.taskData[0].task_level" size="small" style="width:180px">
                                <Option v-for="item in taskLevel" :value="item.typecode" :key="item.id">{{item.typename}}</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row :gutter="20" style="margin-top:20px">
                        <Col span="4">
                            <span style="line-height:24px">开始时间</span>
                        </Col>
                        <Col span="20">
                            <DatePicker v-model="data.taskData[0].expect_start_date" size="small" style="width:180px" type="datetime" >
                            </DatePicker>
                        </Col>
                    </Row>
                    <Row :gutter="20" style="margin-top:20px">
                        <Col span="4">
                            <span style="line-height:24px">提醒时间</span>
                        </Col>
                        <Col span="20">
                            <DatePicker v-model="data.taskData[0].plan_date" size="small" style="width:180px" type="datetime">
                            </DatePicker>
                        </Col>
                    </Row>
                    <Row :gutter="20" style="margin-top:20px">
                        <Col span="4">
                            <span style="line-height:24px">任务详情</span>
                        </Col>
                        <Col span="20">
                            <Input v-model="data.taskData[0].task_content" size="small" style="width:180px" type="textarea" :row="5">
                            </Input>
                        </Col>
                    </Row>
                    <Row style="margin-top:40px">
                        <Button @click="update_task" type="primary" style="margin-left:40px">保存</Button>
                    </Row>
                </Row>
                <Row style="margin-top:20px">
                    <Tabs value="1" size="small">
                        <!-- <TabPane label="讨论" name="1">
                            <div></div>
                        </TabPane>
                        <TabPane label="附件" name="2">
                        </TabPane> -->
                        <TabPane label="日志" name="1">
                            <Timeline>
                                <TimelineItem v-for="(item,index) in data.log" :key="index">
                                    <Row :gutter="20">
                                        <Col span="12">{{item.log_content}}</Col>
                                        <Col span="12">{{item.log_date}}</Col>
                                    </Row>
                                </TimelineItem>
                            </Timeline>
                        </TabPane>
                    </Tabs>
                </Row>
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            openTaskDetail: false,
            data:{
                taskData:[
                    {
                        task_name: "",
                        id: "",
                        expect_start_date: "",
                        task_stage: "",
                        plan_date: "",
                        company_name: "",
                        task_content: ""
                    }
                ],
                log:[]
            },
            taskStage: [],
            taskLevel: []
        }
    },
    methods:{
        get_detail(e){
            let _self = this
            let url = 'api/task/findTaskDetail'

            let config = {
                params:{
                    taskId: e
                }
            }
            function success(res){
                _self.data = res.data.data
            }

            this.$Get(url, config, success)
        },
        delete_task(){
            //  功能暂不实现
        },
        get_data_center(){
            let params = "taskLevel,taskDesCode,taskKind,taskStage,market_status,markert_follow_up_type"

            let _self = this

            function success(res){
                _self.taskLevel = res.data.data.taskLevel
                _self.taskStage = res.data.data.taskStage
            }
            this.$GetDataCenter(params, success)
        },
        update_task(){
            //  编辑任务，有点混乱，待理清
        }
    },
    created() {
        let _self = this
        this.$bus.on("OPEN_CREATE_TASK",(e)=>{
            // console.log(e)
            // _self.get_data_center()
            // _self.get_detail(e)
            // _self.detail = e
            // console.log(e._d)
            _self.data.taskData[0].plan_date = e._d
            _self.data.taskData[0].expect_start_date = e._d
            _self.openTaskDetail = true
        })
    },
}
</script>

<style>
/* .vertical-center-modal{
    top: 0px;
    
} */
.vertical-center-modal .ivu-modal{
    top: 0;
    float: right;
}
</style>

