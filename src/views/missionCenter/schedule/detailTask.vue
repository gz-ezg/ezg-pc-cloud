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
                        <Input type="text" v-model="data.taskData[0].task_name" style="width:100%" />
                    </Col>
                    <!-- <Col span="6" push="2">
                        <Button type="error" @click="delete_task">删除任务</Button>
                    </Col> -->
                </Row>
                <Row style="margin-top:20px">
                    <Row :gutter="20" style="margin-top:20px">
                        <Col span="4">
                            <span style="line-height:24px">任务对象</span>
                        </Col>
                        <Col span="20">
                            <span style="line-height:24px">{{data.taskData[0].companyname}}
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
                            <Select v-model="data.taskData[0].task_level" size="small" style="width:180px" @on-change="getNewLevel">
                                <Option v-for="item in taskLevel" :value="item.typecode" :key="item.id">{{item.typename}}</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row :gutter="20" style="margin-top:20px">
                        <Col span="4">
                            <span style="line-height:24px">任务类型</span>
                        </Col>
                        <Col span="20">
                            <span style="line-height:24px">{{data.taskData[0].task_kind_name}}</span>
                        </Col>
                    </Row>
                    <Row :gutter="20" style="margin-top:20px">
                        <Col span="4">
                            <span style="line-height:24px">开始时间</span>
                        </Col>
                        <Col span="20">
                            <DatePicker v-model="data.taskData[0].plan_date" size="small" style="width:180px" type="datetime" @on-change="getPlanTime">
                            </DatePicker>
                        </Col>
                    </Row>
                    <Row :gutter="20" style="margin-top:20px">
                        <Col span="4">
                            <span style="line-height:24px">提醒时间</span>
                        </Col>
                        <Col span="20">
                            <DatePicker v-model="data.taskData[0].expect_start_date" size="small" style="width:180px" type="datetime" @on-change="getRemindTime">
                            </DatePicker>
                        </Col>
                    </Row>
                    <Row :gutter="20" style="margin-top:20px">
                        <Col span="4">
                            <span style="line-height:24px">任务详情</span>
                        </Col>
                        <Col span="20">
                            <Input v-model="data.taskData[0].task_content" size="small" style="width:180px" type="textarea" :row="5" autosize>
                            </Input>
                        </Col>
                    </Row>
                    <Row :gutter="20" style="margin-top:20px">
                        <Col span="4">
                            <span style="line-height:24px">任务状态</span>
                        </Col>
                        <Col span="20">
                            <Select v-model="data.taskData[0].task_stage" size="small" style="width:180px" @on-change="getTaskStage">
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
                        <Button @click="before_update_task" type="primary" style="margin-left:40px" :disabled="openSubmit" :loading="loading">修改</Button>
                        <Button @click="delete_task" type="error" style="margin-left:50px">删除任务</Button>
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
                            <Row style="padding-bottom:10px;padding-top:5px">
                                <Input v-model="discuss.content" size="small" style="width:90%;padding-right:20px" placeholder="请输入内容参与讨论！"><Button slot="append" :loading="discussLoading" type="primary" size="small" @click="submit_discuss">发送</Button></Input>
                                <Rate v-model="discuss.rate" size="small" style=""></Rate> 
                            </Row>
                            <Timeline>
                                    <TimelineItem v-for="(item,index) in data.discuss" :key="index">
                                        <Row :gutter="20">
                                            <Col span="12">{{item.creator_name}}</Col>
                                            <Col span="12">{{item.creator_date}}</Col>
                                        </Row>
                                        <Row :gutter="20" style="margin-top:5px">
                                            <Col span="24">{{item.content}}</Col>
                                            <Col span="12"><Rate disabled :value="(item.evaluation)/10" size="small"></Rate></Col>
                                        </Row>
                                    </TimelineItem>
                                </Timeline>
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
        <follow-up-list></follow-up-list>
    </div>
</template>

<script>
import followUpList from '../common/createFollowUp'
import { FULLDateFormat } from '../../../libs/utils.js'

export default {
    components:{
        followUpList
    },
    data(){
        return{
            id: "",
            discussLoading: false,
            discuss:{
                rate: 5,
                content: ""
            },
            loading: false,
            openTaskDetail: false,
            data:{
                taskData: [
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
                log: [],
                discuss: [],
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
            ],
            newTaskLevel: "",
            oldTaskLevel: "",
            oldRemindTime: "",
            newRemindTime: "",
            oldTaskStage: "",
            newTaskStage: "",
            oldTaskName: "",
            oldTaskContent: "",
            newPlanTime: "",
            oldPlanTime: ""
        }
    },
    computed:{

        openSubmit(){
            if(this.newTaskLevel && this.newTaskLevel != this.oldTaskLevel){
                return false
            } else if(this.newRemindTime && this.newRemindTime != this.oldRemindTime){
                return false
            }  else if(this.newTaskStage && this.newTaskStage != this.oldTaskStage){
                return false
            } else if(this.data.taskData[0].task_name != this.oldTaskName || this.data.taskData[0].task_content != this.oldTaskContent){
                return false
            } else if(this.newPlanTime && this.newPlanTime != this.oldPlanTime){
                return false
            } else {
                return true
            }
        }
    },
    methods:{
        //更改任务名称或详情
        changeTaskName(){
            let _self = this
            let url = `api/task/updateTaskName`
            let config = {
                taskId: _self.id,
                taskName: _self.data.taskData[0].task_name,
                taskContent: _self.data.taskData[0].task_content
            }
            function success(res){
                _self.get_detail(_self.id)
            }
            function fail(){

            }
            this.$Post(url,config,success,fail)
        },
        //更改任务状态
        changeTaskStage(){
            let _self = this
            let url = `api/task/updateTaskStage`
            // let fromdata = new FormData()
            // fromdata.append("taskId", _self.id)
            // fromdata.append("taskStage", _self.data.taskData[0].task_stage)
            // fromdata.append("changeReason", _self.task_memo)

            let config = {
                taskId: _self.data.taskData[0].id,
                taskStage: _self.data.taskData[0].task_stage,
                changeReason: _self.task_memo
            }
			console.log("config")
			console.log(config)
			
			const formData = new FormData();
			  Object.keys(config).forEach((key) => {
				formData.append(key, config[key]);
			  });
			
            function success(res){
                // _self.update_content()
                console.log(res)
                _self.task_memo = ""
                _self.get_detail(_self.id)
            }
            function fail(err){
                console.log(err)
            }

            this.$Post(url, formData, success, fail)
        },
        getTaskStage(e){
            console.log(e)
            this.newTaskStage = e
        },
        //更改计划时间
        changePlanTime(){
            let _self = this
            let url = `api/task/updateTaskPlanDate`
            let config = {
                taskId: _self.id,
                planDate: FULLDateFormat(_self.newPlanTime)
            }
            function success(res){
                _self.get_detail(_self.id)
            }
            function fail(){

            }
            this.$Post(url,config,success,fail)
        },
        getPlanTime(e){
            this.newPlanTime = e
        },
        //更改提醒时间
        changeRemindTime(){
            let _self = this
            let url = `api/task/updateTaskRemindDate`
            let config = {
                taskId: _self.id,
                taskRemindDate: FULLDateFormat(_self.newRemindTime)
            }
            function success(res){
                console.log(res)
                _self.get_detail(_self.id)
            }
            function fail(){

            }
            this.$Post(url,config,success,fail)
        },
        getRemindTime(e){
            console.log(FULLDateFormat(e))
            console.log(e)
            this.newRemindTime = e
        },
        //更改任务级别
        changTaskLevel(){
            let _self = this
            let url = `api/task/updateTaskImportantLevel`
            let config = {
                taskId: _self.id,
                taskImportantLevel: _self.newTaskLevel
            }
            function success(res){
                console.log(res)
                _self.get_detail(_self.id)
            }
            function fail(){

            }
            this.$Post(url,config,success,fail)
        },
        getNewLevel(e){
            console.log(e)
            this.newTaskLevel = e
        },
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
                console.log(res.data.data)
                _self.oldTaskLevel = res.data.data.taskData[0].task_level
                _self.oldRemindTime = res.data.data.taskData[0].expect_start_date
                _self.oldTaskStage = res.data.data.taskData[0].task_stage
                _self.oldTaskName = res.data.data.taskData[0].task_name
                _self.oldTaskContent = res.data.data.taskData[0].task_content
                _self.oldPlanTime = res.data.data.taskData[0].plan_date
                // console.log(Date.parse(res.data.data.taskData[0].expect_start_date))
                
                if(res.data.data.taskData[0]){
                    _self.get_last_follow_up_content(res.data.data.taskData[0].company_id)
                }else{
                    _self.data = {
                        taskData: [
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
                        log: [],
                        discuss: [],
                    }
                }
                
            }

            this.$Get(url, config, success)
        },
        delete_task(){
            let _self = this

            let url = `api/task/deleteTask`
            let config = {
                params: {
                    taskId: _self.id
                }
            }

            function success(res){
                console.log(res)
                _self.$Message.success("删除任务成功")
                _self.openTaskDetail = false
                _self.$bus.emit("UPDATE_TASK_LIST",true)
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
        before_update_task(){
            let _self = this
            // console.log(_self.data.taskData[0].companyname)
            if(_self.data.taskData[0].task_kind == "tkFollow" && _self.data.taskData[0].task_stage == "tesFinished" && _self.data.taskData[0].companyname != null){
                
                _self.$bus.emit("OPEN_SCHEDULE_FOLLOWUP",{
                    companyname: _self.data.taskData[0].companyname,
                    NAME: _self.data.taskData[0].custName,
                    company_id: _self.data.taskData[0].company_id,
                    custId: _self.data.taskData[0].custId,
                })
            }else{
                console.log(_self.newTaskLevel)
                // this.update_task()
                this.test()
            }
        },
        test(){
            var _self = this
            var timer
            if(this.data.taskData[0].task_name != this.oldTaskName || this.data.taskData[0].task_content != this.oldTaskContent){
                _self.changeTaskName()
            }
            if(_self.newTaskStage && _self.newTaskStage != _self.oldTaskStage){
                console.log(0)
                _self.changeTaskStage()
            }
            if(_self.newPlanTime && _self.newPlanTime != _self.oldPlanTime){
                _self.changePlanTime()
            }
            if(_self.newRemindTime && _self.newRemindTime != _self.oldRemindTime){
                console.log(1)
                _self.changeRemindTime()
            }
            if(_self.newTaskLevel && _self.newTaskLevel != _self.oldTaskLevel){
                timer = setTimeout(function(){
                    console.log(2)
                    _self.changTaskLevel()
                },1000)
            }
            _self.$bus.emit("UPDATE_TASK_LIST",true)
        },
        update_task(){
            //  编辑任务，有点混乱，待理清
            let _self = this
            let url = `api/task/updateTaskStage`
            let fromdata = new FormData()
            fromdata.append("taskId", _self.id)
            fromdata.append("taskStage", _self.data.taskData[0].task_stage)
            fromdata.append("changeReason", _self.task_memo)

            let config = {
                taskId: _self.data.taskData[0].id,
                taskStage: _self.data.taskData[0].task_stage
            }
			
			
			
            function success(res){
                _self.update_content()
                _self.task_memo = ""
                var timer
                if(_self.newRemindTime && _self.newRemindTime != _self.oldRemindTime){
                    console.log(1)
                    _self.changeRemindTime()
                }
                if(_self.newTaskLevel && _self.newTaskLevel != _self.oldTaskLevel){
                    timer = setTimeout(function(){
                        console.log(2)
                        _self.changTaskLevel()
                    },1000)
                    // setTimeout(_self.changTaskLevel(),5000)
                }
            }

            function fail(err){
                console.log(err)
            }

            this.$Post(url, fromdata, success, fail)
        },
        update_content(){
            let _self = this
            let url = `api/task/addTaskDiscuss`

            let config = {
                taskId: _self.id,
                content: _self.task_memo,
                creatorId: localStorage.getItem("id"),
                creatorName: localStorage.getItem("realname")
            }

            function success(res){
                _self.loading = false
                // _self.openTaskDetail = false
                _self.get_detail(_self.id)
                // _self.data = {
                //     taskData:[
                //         {
                //             task_name: "",
                //             id: "",
                //             expect_start_date: "",
                //             task_stage: "",
                //             plan_date: "",
                //             company_name: "",
                //             task_content: ""
                //         }
                //     ],
                //     log:[]
                // }
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
                // console.log(_self.followUpContent)
            }

            this.$Get(url, config, success)
        },
        submit_discuss(){
            let _self = this
            _self.discussLoading = true
            let url = 'api/task/addTaskDiscuss'

            let config = {
                taskId: _self.id,
                content: _self.discuss.content,
                evaluation: _self.discuss.rate*10,
                creatorId: localStorage.getItem("id"),
                creatorName: localStorage.getItem("realname")
            }

            function success(res){
                _self.discussLoading = false

                _self.get_detail(_self.id)
            }

            function fail(err){
                _self.discussLoading = false

            }

            this.$Post(url, config, success, fail)
        }
    },
    created() {
        let _self = this
        this.$bus.off("OPEN_SEHEDULE_DETAIL",true)
        this.$bus.on("OPEN_SEHEDULE_DETAIL",(e)=>{
            _self.get_data_center()
            _self.id = e.id
            console.log(_self.id)
            _self.get_detail(e.id)
            _self.detail = e
            _self.openTaskDetail = true
        })
        this.$bus.off("FINISH_DEAL_WITH_SCHELCE",true)
        this.$bus.on("FINISH_DEAL_WITH_SCHELCE",(e)=>{
            _self.update_task()
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