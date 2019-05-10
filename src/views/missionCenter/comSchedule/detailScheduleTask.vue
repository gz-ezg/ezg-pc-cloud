<template>
    <div>
        <Modal
                v-model="openTaskDetail"
                title="商事任务详情"
                width="450"
                :scrollable="true"
                class-name="vertical-center-modal"
        >
            <div style="min-height:60vh;width:400px" v-if="data.length!==0">
                <Row :gutter="20" style="margin-top:20px">
                    <Col span="6">
                        <span style="line-height:24px">商事任务名称</span>
                    </Col>
                    <Col span="18">
                        <Input v-model="data[0].taskName" size="small" style="width:180px" type="textarea" :row="5" autosize>
                        </Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px">
                    <Col span="6">
                        <span style="line-height:24px">商事任务对象</span>
                    </Col>
                    <Col span="18">
                        <span style="line-height:24px">{{data[0].companyName}}
                            </span>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px">
                    <Col span="6">
                        <span style="line-height:24px">产品</span>
                    </Col>
                    <Col span="18">
                        <span style="line-height:24px">{{data[0].productName}}
                            </span>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px">
                    <Col span="6">
                        <span style="line-height:24px">任务类型</span>
                    </Col>
                    <Col span="18">
                        <span style="line-height:24px">{{data[0].taskKindName}}</span>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px">
                    <Col span="6">
                        <span style="line-height:24px">代办于</span>
                    </Col>
                    <Col span="18">
                        <DatePicker v-model="data[0].planDate" size="small" style="width:180px" type="datetime" @on-change="getPlanTime">
                        </DatePicker>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px">
                    <Col span="6">
                        <span style="line-height:24px">地区</span>
                    </Col>
                    <Col span="18">
                        <Select v-model="data[0].taskArea" size="small" style="width:180px" @on-change="getBusinessArea">
                            <Option v-for="item in businessArea" :value="item.typecode" :key="item.id">{{item.typename}}</Option>
                        </Select>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px">
                    <Col span="6">
                        <span style="line-height:24px">地点</span>
                    </Col>
                    <Col span="18">
                        <Select v-model="data[0].taskPlace" size="small" style="width:180px" @on-change="getBusinessPlace">
                            <Option v-for="item in businessPlace" :value="item.typecode" :key="item.id">{{item.typename}}</Option>
                        </Select>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px">
                    <Col span="6">
                        <span style="line-height:24px">正常节点</span>
                    </Col>
                    <Col span="18">
                            <Select v-model="data[0].workFlowStatus" size="small" style="width:180px" @on-change="getWorkFlowStatus">
                                <Option v-for="(item,index) in nodeList" :key="index" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                    </Col>
                </Row>
                <Row style="margin-top:40px">
                    <Button @click="update_detail" type="primary" style="margin-left:40px" :disabled="openSubmit" :loading="loading">修改</Button>
                    <Button @click="delete_task" type="error" style="margin-left:50px">删除任务</Button>
                </Row>
            </div>
            <div slot="footer"></div>
         </Modal>
     </div>
</template>

<script>
    import {FULLDateFormat} from "../../../libs/utils";

    export default {
        name: "detailScheduleTask",
        data(){
            return{
                id:"",
                openTaskDetail:false,
                businessArea:[],
                businessPlace:[],
                data:[],
                nodeList:[{"typecode":"Y","typename":"是"},{"typecode":"N","typename":"否"}],
                companyList:[],
                productList:[],
                // newTaskLevel: "",
                // oldTaskLevel: "",
                // oldRemindTime: "",
                // newRemindTime: "",
                // oldTaskStage: "",
                // newTaskStage: "",
                oldTaskName: "",
                // oldTaskContent: "",
                newPlanTime: "",
                oldPlanTime: "",
                newBusinessArea:"",
                oldBusinessArea:"",
                newBusinessPlace:"",
                oldBusinessPlace:"",
                newWorkFlowStatus:"",
                oldWorkFlowStatus:"",
                newCompanyId:"",
                oldCompanyId:"",
                newBusinessId:"",
                oldBusinessId:"",

            }
        },
        computed:{
            openSubmit(){
                 if(this.data[0].taskName !== this.oldTaskName ){
                    return false
                } else if(this.newPlanTime && this.newPlanTime !== this.oldPlanTime){
                    return false
                } else if(this.newBusinessPlace && this.newBusinessPlace !== this.oldBusinessPlace){
                    return false
                 }else if(this.newBusinessArea && this.newBusinessArea !== this.oldBusinessArea){
                     return false
                 } else if(this.newWorkFlowStatus && this.newWorkFlowStatus !== this.oldWorkFlowStatus){
                     return false
                 } else if(this.newBusinessId && this.newBusinessId !== this.oldBusinessId){
                     return false
                 }else if(this.newCompanyId && this.newCompanyId !== this.oldCompanyId){
                     return false
                 } else {
                    return true
                }
            }
        },
        methods:{
            getPlanTime(e){
                console.log(e)
                let _self = this
                _self.newPlanTime = e
            },
            getBusinessArea(e){
                console.log(e)
                let _self = this
                _self.newBusinessArea = e
            },
            getWorkFlowStatus(e){
                console.log(e)
                let _self = this
                _self.newWorkFlowStatus = e
            },
            getBusinessPlace(e){
                console.log(e)
                let _self = this
                _self.newBusinessPlace = e
            },
            getBusinessId(e){
                console.log(e)
                let _self = this
                _self.newBusinessId = e
            },
            update_detail(){
                let _self = this
                let url = `api/task/updateLegworkTask`
                let config = {
                    taskId: _self.id,
                    taskName: _self.data[0].taskName,
                    sPlanDate:FULLDateFormat(_self.data[0].planDate),
                    executorId:_self.data[0].executorId,
                    executorName:_self.data[0].executorName,
                    companyId:_self.data[0].companyId,
                    workFlowStatus:_self.data[0].workFlowStatus,
                    taskArea:_self.data[0].taskArea,
                    taskPlace:_self.data[0].taskPlace,
                    businessId:_self.data[0].businessId,
                }
                function success(res){
                    _self.$bus.emit("UPDATE_TASK_LIST",true)
                    _self.get_detail(_self.id)
                    _self.openTaskDetail = false
                }
                function fail(){

                }
                this.$Post(url,config,success,fail)
            },
            get_company(query){
                let _self = this
                _self.companyLoading = true
                let url = "api/legwork/apiQueryCompanyOrCustomerMsg"
                let config = {
                    params:{
                        page: 1,
                        pageSize: 10,
                        companyname: query
                    }
                }

                function success(res){
                    _self.companyLoading = false
                    _self.companyList = res.data.data
                }

                this.$Get(url, config, success)
            },
            get_businessId(id,e){
                let _self = this
                let url = `api/task/getLegWorkOrderByCompanyId`
                _self.userLoading = true

                let config = {
                    params:{
                        companyId:id,
                    }
                }
                function success(res){
                    _self.userLoading = false
                    _self.productList = res.data.data
                    console.log(res.data.data)
                    if (_self.productList.length!==0){
                        _self.data[0].businessId =  _self.productList[0].businessId
                    }else {
                        _self.data[0].businessId = null
                    }

                }

                this.$Get(url, config, success)
                _self.newCompanyId = e
            },
            get_detail(e){
                let _self = this
                let url = 'api/task/getTaskPropertyDetailByTaskId'

                let config = {
                    params:{
                        taskId: e
                    }
                }

                function success(res){
                    _self.data = res.data.data
                    console.log(_self.data[0].taskKindName)
                    // _self.oldTaskLevel = res.data.data.taskData[0].task_level
                    _self.oldRemindTime = res.data.data[0].planDate
                    // _self.oldTaskStage = res.data.data.taskData[0].task_stage
                    _self.oldTaskName = res.data.data[0].taskName
                    // _self.oldTaskContent = res.data.data.taskData[0].task_content
                    _self.oldPlanTime = res.data.data[0].planDate
                    // console.log(Date.parse(res.data.data.taskData[0].expect_start_date))
                    _self.oldBusinessArea = res.data.data[0].taskArea
                    _self.oldBusinessPlace = res.data.data[0].taskPlace
                    _self.oldWorkFlowStatus = res.data.data[0].workFlowStatus
                    _self.oldCompanyId = res.data.data[0].companyId
                    _self.oldBusinessId = res.data.data[0].businessId
                    // if(res.data.data.taskData[0]){
                    //     _self.get_last_follow_up_content(res.data.data.taskData[0].company_id)
                    // }else{
                    //     _self.data = {
                    //         taskData: [
                    //             {
                    //                 task_name: "",
                    //                 id: "",
                    //                 expect_start_date: "",
                    //                 task_stage: "",
                    //                 plan_date: "",
                    //                 company_name: "",
                    //                 task_content: "",
                    //                 company_id: ""
                    //             }
                    //         ],
                    //         log: [],
                    //         discuss: [],
                    //     }
                    // }
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
                let params = "taskLevel,taskDesCode,taskKind,taskStage,market_status,markert_follow_up_type,gzbusinessarea,gzbusinessplace"

                let _self = this

                function success(res){
                    _self.businessArea = res.data.data.gzbusinessarea
                    _self.businessPlace = res.data.data.gzbusinessplace
                    // _self.taskLevel = res.data.data.taskLevel
                    // _self.taskDesCode = res.data.data.taskDesCode
                    // _self.taskKind = res.data.data.taskKind
                    // _self.taskStage = res.data.data.taskStage
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
        },
        created() {
            let _self = this
            this.$bus.off("OPEN_SEHEDULE_DETAIL_TASK",true)
            this.$bus.on("OPEN_SEHEDULE_DETAIL_TASK",(e)=>{
                console.log(e)
                _self.get_data_center()
                _self.id = e.taskId
                console.log(e.taskId)
                _self.get_detail(e.taskId)
                _self.detail = e
                _self.openTaskDetail = true
            })
        }
    }
</script>

<style>
.vertical-center-modal .ivu-modal{
    top: 0;
    float: right;
}
</style>