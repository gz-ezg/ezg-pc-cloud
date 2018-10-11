<template>
    <div>
        <Modal
            v-model="openTaskDetail"
            title="任务详情"
            width="450"
            :scrollable="true"
            class-name="vertical-center-modal"
        >
            <div style="min-height:90vh;width:400px">
                <Row>
                    <Col span="16">
                        <Input type="text" v-model="data.taskData[0].task_name" style="width:100%" readonly/>
                    </Col>
                    <Col span="6" push="2">
                        <Button type="error" @click="delete_task">删除任务</Button>
                    </Col>
                </Row>
                <Row style="margin-top:20px">
                    <Row :gutter="20" style="margin-top:20px">
                        <Col span="4">
                            <span style="line-height:24px">任务对象</span>
                        </Col>
                        <Col span="20">
                            <span style="line-height:24px">{{data.taskData[0].company_name}}
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
                            <Select v-model="data.taskData[0].task_level" size="small" style="width:180px" disabled>
                                <Option v-for="item in taskLevel" :value="item.typecode" :key="item.id">{{item.typename}}</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row :gutter="20" style="margin-top:20px">
                        <Col span="4">
                            <span style="line-height:24px">开始时间</span>
                        </Col>
                        <Col span="20">
                            <DatePicker v-model="data.taskData[0].expect_start_date" size="small" style="width:180px" type="datetime" disabled>
                            </DatePicker>
                        </Col>
                    </Row>
                    <Row :gutter="20" style="margin-top:20px">
                        <Col span="4">
                            <span style="line-height:24px">提醒时间</span>
                        </Col>
                        <Col span="20">
                            <DatePicker v-model="data.taskData[0].plan_date" size="small" style="width:180px" type="datetime" disabled>
                            </DatePicker>
                        </Col>
                    </Row>
                    <Row :gutter="20" style="margin-top:20px">
                        <Col span="4">
                            <span style="line-height:24px">任务详情</span>
                        </Col>
                        <Col span="20">
                            <Input v-model="data.taskData[0].task_content" size="small" style="width:180px" type="textarea" :row="5" readonly autosize>
                            </Input>
                        </Col>
                    </Row>
                    <Row :gutter="20" style="margin-top:20px">
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
                            <span style="line-height:24px">任务总结</span>
                        </Col>
                        <Col span="20">
                            <Input v-model="task_memo" size="small" style="width:180px" type="textarea" :row=5 placeholder="变更状态时，需要填写！（完成时填写总结，取消或终止时请输入原因！）">
                            </Input>
                        </Col>
                    </Row>
                    <Row style="margin-top:40px">
                        <Button @click="update_task" type="primary" style="margin-left:40px" :disabled="openSubmit" :loading="loading">修改</Button>
                    </Row>
                </Row>
                <Row style="margin-top:20px">
                    <Tabs value="1" size="small">
                        <TabPane label="日志" name="1">
                            <Timeline>
                                <TimelineItem v-for="(item,index) in data.log" :key="index">
                                    <Row :gutter="20">
                                        <Col span="12">{{item.log_content}}</Col>
                                        <Col span="12">{{item.log_date}}</Col>
                                    </Row>
                                    <Row :gutter="20" v-if="item.change_reason">
                                        <Col>备注：{{item.change_reason}}</Col>
                                    </Row>
                                </TimelineItem>
                            </Timeline>
                        </TabPane>                        
                        <TabPane label="讨论" name="2">
                            <div></div>
                        </TabPane>
                        <TabPane label="最近跟进" name="3">
                            <div>
                                <Timeline>
                                    <TimelineItem>
                                        <Row :gutter="20">
                                            <Col span="12">{{followUpContent.userName}}</Col>
                                            <Col span="12">{{followUpContent.createdate}}</Col>
                                        </Row>
                                        <Row :gutter="20">
                                            <Col span="12">{{followUpContent.followTypeName}}</Col>
                                            <Col span="12">{{followUpContent.serviceContent}}</Col>
                                        </Row>
                                    </TimelineItem>
                                </Timeline>
                            </div>
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
            loading: false,
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
                        task_content: "",
                        company_id: ""
                    }
                ],
                log:[]
            },
            taskStage: [],
            taskLevel: [],
            taskDesCode: [],
            task_memo: "",
            followUpContent: [
                {
                    userName: "",
                    createdate: "",
                    followTypeName: "",
                    serviceContent: ""
                }
            ]
        }
    },
    computed:{
        openSubmit(){
            if(!this.task_memo){
                return true
            }else{
                return false
            }
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
                if(res.data.data.taskData[0].company_id){
                    _self.get_last_follow_up_content(res.data.data.taskData[0].company_id)
                }
                
            }

            this.$Get(url, config, success)
        },
        delete_task(){
            let _self = this

            let url = `api/task/deleteTask`
            let config = {
                params: {
                    taskId: _self.data.taskData.id
                }
            }

            function success(res){
                _self.openTaskDetail = false
            }

            this.$Get(url, config, success)
        },
        get_data_center(){
            let params = "taskLevel,taskDesCode,taskKind,taskStage,market_status,markert_follow_up_type"

            let _self = this

            function success(res){
                _self.taskLevel = res.data.data.taskLevel
                _self.taskDesCode = res.data.data.taskDesCode
                // _self.taskKind = res.data.data.taskKind
                _self.taskStage = res.data.data.taskStage
                // _self.market_status = res.data.data.market_status
                // _self.markert_follow_up_type = res.data.data.markert_follow_up_type
                // _self.taskLevel_map = _self.$array2map(_self.taskLevel)
                // _self.taskDesCode_map = _self.$array2map(_self.taskDesCode)
                // _self.taskKind_map = _self.$array2map(_self.taskKind)
                // _self.taskStage_map = _self.$array2map(_self.taskStage)
                // _self.market_status_map = _self.$array2map(_self.market_status)
                // _self.markert_follow_up_type_map = _self.$array2map(_self.markert_follow_up_type)
            }
            this.$GetDataCenter(params, success)
        },
        update_task(){
            //  编辑任务，有点混乱，待理清
            let _self = this
            let url = `api/task/updateTaskStage`
            let fromdata = new FormData()
            fromdata.append("taskId", _self.data.taskData[0].id)
            fromdata.append("taskStage", _self.data.taskData[0].task_stage)
            fromdata.append("changeReason", _self.task_memo)

            let config = {
                taskId: _self.data.taskData[0].id,
                taskStage: _self.data.taskData[0].task_stage
            }

            console.log(config)
            function success(res){
                _self.update_content()
            }

            function fail(err){
                _self.openTaskDetail = false
            }

            this.$Post(url, fromdata, success, fail)
        },
        update_content(){
            let _self = this
            let url = `api/task/addTaskDiscuss`

            let config = {
                taskId: _self.data.taskData[0].id,
                content: _self.task_memo,
                creatorId: localStorage.getItem("id"),
                creatorName: localStorage.getItem("realname")
            }

            function success(res){
                _self.loading = false
                _self.openTaskDetail = false
                _self.data = {
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
                }
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        },
        get_last_follow_up_content(e){
            let _self = this
            let url = `api/customer/findLastCustomerContentByCompanyId`

            let config = {
                params: {
                    companyId: e
                }
            }

            function success(res){
                if(res.data.data){
                    _self.followUpContent = res.data.data
                }
                console.log(_self.followUpContent)
            }

            this.$Get(url, config, success)
        }
    },
    created() {
        let _self = this
        this.$bus.on("OPEN_SEHEDULE_DETAIL",(e)=>{
            _self.data = {
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
                }
            // console.log(e)
            _self.get_data_center()
            _self.get_detail(e.id)
            _self.detail = e
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

