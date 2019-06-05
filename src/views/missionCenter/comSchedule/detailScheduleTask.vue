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
                        <Input v-model="data[0].taskName" size="small" style="width:180px" type="textarea" :row="5" autosize readonly>
                        </Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px">
                    <Col span="6">
                        <span style="line-height:24px">公司名称</span>
                    </Col>
                    <Col span="18">
                        <span style="line-height:24px">{{data[0].companyName}}
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
                        <span style="line-height:24px">地区</span>
                    </Col>
                    <Col span="18">
                        <Input v-model="data[0].taskArea" size="small" style="width:180px" readonly></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px">
                    <Col span="6">
                        <span style="line-height:24px">地点</span>
                    </Col>
                    <Col span="18">
                        <Input v-model="data[0].taskPlace" size="small" style="width:180px" readonly></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="data[0].taskKindName=='商事外勤'">
                    <Col span="6">
                        <span style="line-height:24px">服务内容</span>
                    </Col>
                    <Col span="18">
                        <Input v-model="data[0].productName" size="small" style="width:180px" readonly></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="data[0].taskKindName!=='商事外勤'">
                    <Col span="6">
                        <span style="line-height:24px">服务内容</span>
                    </Col>
                    <Col span="18">
                        <Input v-model="data[0].legName" size="small" style="width:180px" readonly></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="data[0].taskKindName=='商事外勤'">
                    <Col span="6">
                        <span style="line-height:24px">服务节点</span>
                    </Col>
                    <Col span="18">
                        <Input v-model="data[0].currentProcess" size="small" style="width:180px" readonly></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px">
                    <Col span="6">
                        <span style="line-height:24px">代办于</span>
                    </Col>
                    <Col span="18">
                        <DatePicker v-model="data[0].planDate" size="small" style="width:180px" type="datetime" @on-change="getPlanTime" disabled>
                        </DatePicker>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="legId">
                    <Col span="6">
                        <span style="line-height:24px">外勤开始时间</span>
                    </Col>
                    <Col span="18">
                        <Input v-model="fieldDetail.begin_time" size="small" style="width:180px" disabled></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="legId">
                    <Col span="6">
                        <span style="line-height:24px">打卡地点</span>
                    </Col>
                    <Col span="18">
                        <Input v-model="fieldDetail.begin_address" size="small" style="width:180px" readonly></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="legId">
                    <Col span="6">
                        <span style="line-height:24px">外勤结束时间</span>
                    </Col>
                    <Col span="18">
                        <Input v-model="fieldDetail.end_time" size="small" style="width:180px" disabled></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="legId">
                    <Col span="6">
                        <span style="line-height:24px">打卡地点</span>
                    </Col>
                    <Col span="18">
                        <Input v-model="fieldDetail.end_address" size="small" style="width:180px" readonly></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="legId">
                    <Col span="6">
                        <span style="line-height:24px">外勤结果</span>
                    </Col>
                    <Col span="18">
                        <Input v-model="fieldDetail.finish_status" size="small" style="width:180px" disabled></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="legId">
                    <Col span="6">
                        <span style="line-height:24px">开始打卡备注</span>
                    </Col>
                    <Col span="18">
                        <Input v-model="fieldDetail.begin_memo" size="small" style="width:180px" readonly></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="legId">
                    <Col span="6">
                        <span style="line-height:24px">外勤总结</span>
                    </Col>
                    <Col span="18">
                        <Input v-model="fieldDetail.finish_memo" size="small" style="width:180px" readonly></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="legId">
                    <Col span="6">
                        <span style="line-height:24px">开始打卡照片</span>
                    </Col>
                    <Col span="18" v-for="(item,index) in beginImgList " :key="index">
                        <a target="_blank" :href="'/api/assets/' + item" >
                            <img :src="'/api/assets/' +item" alt=""  width="100" height="100" onerror="this.src='/api/assets/upload/commonImg/error.jpg';this.onerror=null">
                        </a>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="legId">
                    <Col span="6">
                        <span style="line-height:24px">结束打卡照片</span>
                    </Col>
                    <Col span="18" v-for="(item,index) in endImgList " :key="index">
                        <a target="_blank" :href="'/api/assets/' + item" >
                            <img :src="'/api/assets/' +item" alt=""  width="100" height="100" onerror="this.src='/api/assets/upload/commonImg/error.jpg';this.onerror=null">
                        </a>
                    </Col>
                </Row>

            </div>
            <div slot="footer">
                <Row>
                    <Button @click="delete_task" type="error"  :loading="loading" v-if="!legId">作废</Button>
                    <Button @click="cancel_task"  type="primary" >关闭</Button>
                </Row>
            </div>
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
                beginImgList:[],
                endImgList:[],
                fieldDetail:[],
                legId:"",
                businessArea_map:new Map(),
                businessPlace_map:new Map(),
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
        // computed:{
        //     openSubmit(){
        //          if(this.data[0].taskName !== this.oldTaskName ){
        //             return false
        //         } else if(this.newPlanTime && this.newPlanTime !== this.oldPlanTime){
        //             return false
        //         } else if(this.newBusinessPlace && this.newBusinessPlace !== this.oldBusinessPlace){
        //             return false
        //          }else if(this.newBusinessArea && this.newBusinessArea !== this.oldBusinessArea){
        //              return false
        //          } else if(this.newWorkFlowStatus && this.newWorkFlowStatus !== this.oldWorkFlowStatus){
        //              return false
        //          } else if(this.newBusinessId && this.newBusinessId !== this.oldBusinessId){
        //              return false
        //          }else if(this.newCompanyId && this.newCompanyId !== this.oldCompanyId){
        //              return false
        //          } else {
        //             return true
        //         }
        //     }
        // },
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
            get_field_detail(e){
                let _self = this
                let url = `api/user/legwork/task/detail`
                let config = {
                    params:{
                        legworkTaskId: e,
                    }
                }

                function success(res){
                    _self.fieldDetail = res.data.data
                    if (_self.fieldDetail.finish_status=="youxiao"){
                        _self.fieldDetail.finish_status = "有效"
                    }
                    if (_self.fieldDetail.finish_status=="wuxiao"){
                        _self.fieldDetail.finish_status = "无效"
                    }
                    if (_self.fieldDetail.finish_status=="mingzhong"){
                        _self.fieldDetail.finish_status = "命中"
                    }
                    _self.beginImgList = res.data.data.begin_realpath.split(",")
                    _self.endImgList = res.data.data.end_realpath.split(",")
                    // _self.dateLength = DateDifference(res.data.data.begin_time,res.data.data.end_time)
                    console.log(_self.beginImgList)
                    console.log(_self.endImgList)
                    console.log(_self.fieldDetail)
                }

                function fail(err){

                }

                this.$Get(url, config, success, fail)
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
                    _self.data[0].taskPlace = _self.businessPlace_map.get(res.data.data[0].taskPlace)
                    _self.data[0].taskArea = _self.businessArea_map.get(res.data.data[0].taskArea)
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
            cancel_task(){
                this.openTaskDetail = false
            },
            get_data_center(){
                let params = "gzbusinessarea,gzbusinessplace"

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
                    _self.businessArea_map = _self.$array2map(_self.businessArea)
                    _self.businessPlace_map = _self.$array2map(_self.businessPlace)
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
                _self.taskKindName = e.taskKindName
                _self.legId= e.legId
                if (e.legId){
                    _self.get_field_detail(e.legId)
                }
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