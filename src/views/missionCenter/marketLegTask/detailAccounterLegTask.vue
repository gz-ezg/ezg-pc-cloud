<template>
    <div>
        <Modal
                v-model="openTaskDetail"
                title="市场外勤任务详情"
                width="450"
                class-name="vertical-center-modal"
        >
            <div style="min-height:60vh;width:400px" v-if="data.length!==0">
                <Row :gutter="20" style="margin-top:20px">
                    <Col span="6">
                        <span style="line-height:24px">任务名称</span>
                    </Col>
                    <Col span="18">
                        <Input v-model="data[0].taskName" size="small" style="width:180px" type="textarea" :row="5" autosize>
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
                        <span style="line-height:24px">客户</span>
                    </Col>
                    <Col span="18">
                        <span style="line-height:24px">{{data[0].customerName}}<span style="margin-left: 10px"><Button v-if="data[0].customerName!==null" type="primary" size="small" @click="open_customer_detail">客户详情</Button></span></span>
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
                        <span style="line-height:24px">跟进阶段</span>
                    </Col>
                    <Col span="18">
                        <Select v-model="data[0].followResult" size="small" style="width:180px" @on-change="getFollowResult">
                            <Option v-for="item in followResult" :value="item.typecode" :key="item.id">{{item.typename}}</Option>
                        </Select>
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
                        <span style="line-height:24px">任务结果</span>
                    </Col>
                    <Col span="18" v-if="taskStage=='tesUnstarted'">
                        <Select v-model="mission" size="small" style="width:180px">
                            <Option v-for="item in missionList" :value="item.typecode" :key="item.typecode">{{item.typename}}</Option>
                        </Select>
                    </Col>
                    <Col span="18" v-if="taskStage=='tesFinished'">
                        <Input size="small" v-model="norMission" style="width:180px" disabled></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="taskStage=='tesFinished'">
                    <Col span="6">
                        <span style="line-height:24px">结束时间</span>
                    </Col>
                    <Col span="18">
                        <Input size="small" v-model="expectEndDate" style="width:180px" disabled></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" >
                    <Col span="6">
                        <span style="line-height:24px">任务总结</span>
                    </Col>
                    <Col span="18" v-if="taskStage=='tesUnstarted'">
                        <Input v-model="taskSummary" size="small" style="width:180px" type="textarea" :row="5" autosize>
                        </Input>
                    </Col>
                    <Col span="18" v-if="taskStage=='tesFinished'">
                        <Input v-model="norTaskSummary" size="small" style="width:180px" type="textarea" :row="5" autosize disabled>
                        </Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="taskKindName=='市场外勤'">
                    <Col span="6">
                        <span style="line-height:24px">外勤开始时间</span>
                    </Col>
                    <Col span="18">
                        <Input size="small" v-model="fieldDetail.begin_time" style="width:180px" disabled></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="taskKindName=='市场外勤'">
                    <Col span="6">
                        <span style="line-height:24px">开始打卡地点</span>
                    </Col>
                    <Col span="18">
                        <Input size="small" v-model="fieldDetail.begin_address" style="width:180px" disabled></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="taskKindName=='市场外勤'">
                    <Col span="6">
                        <span style="line-height:24px">外勤结束时间</span>
                    </Col>
                    <Col span="18">
                        <Input size="small" v-model="fieldDetail.end_time" style="width:180px" disabled></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="taskKindName=='市场外勤'">
                    <Col span="6">
                        <span style="line-height:24px">结束打卡地点</span>
                    </Col>
                    <Col span="18">
                        <Input size="small" v-model="fieldDetail.end_address" style="width:180px" disabled></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="taskKindName=='市场外勤'">
                    <Col span="6">
                        <span style="line-height:24px">外勤结果</span>
                    </Col>
                    <Col span="18">
                        <Input size="small" v-model="fieldDetail.finish_status" style="width:180px" disabled></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="taskKindName=='市场外勤'">
                    <Col span="6">
                        <span style="line-height:24px">开始打卡备注</span>
                    </Col>
                    <Col span="18">
                        <Input size="small" v-model="fieldDetail.begin_memo" style="width:180px" disabled></Input>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="taskKindName=='市场外勤'">
                    <Col span="6">
                        <span style="line-height:24px">外勤总结</span>
                    </Col>
                    <Col span="18">
                        <Input size="small" v-model="fieldDetail.finish_memo" style="width:180px" disabled></Input><span style="margin-left: 20px"><Button v-if="data[0].followResult=='Party' || data[0].followResult=='Visit'" type="primary" size="small" @click="add_customer">新增客户</Button></span>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="taskKindName=='市场外勤'">
                    <Col span="6">
                        <span style="line-height:24px">开始打卡照片</span>
                    </Col>
                    <Col span="18" v-for="(item,index) in beginImgList " :key="index">
                        <a target="_blank" :href="'/api/assets/' + item" >
                            <img :src="'/api/assets/' +item" alt=""  width="100" height="100" onerror="this.src='/api/assets/upload/commonImg/error.jpg';this.onerror=null">
                        </a>
                    </Col>
                </Row>
                <Row :gutter="20" style="margin-top:20px" v-if="taskKindName=='市场外勤'">
                    <Col span="6">
                        <span style="line-height:24px">结束打卡照片</span>
                    </Col>
                    <Col span="18" v-for="(item,index) in endImgList " :key="index">
                        <a target="_blank" :href="'/api/assets/' + item" >
                            <img :src="'/api/assets/' +item" alt=""  width="100" height="100" onerror="this.src='/api/assets/upload/commonImg/error.jpg';this.onerror=null">
                        </a>
                    </Col>
                </Row>
                <Row style="margin-top:40px">
                    <Button @click="update_detail" type="primary" :disabled="openSubmit" style="margin-left:40px"  :loading="loading" v-if="taskStage=='tesUnstarted'">提交</Button>
                    <Button @click="delete_task" type="error" style="margin-left:50px" v-if="taskStage=='tesUnstarted'">作废</Button>
                </Row>
            </div>
            <div slot="footer">
                <Button @click="openTaskDetail = false" type="primary"  style="margin-left:40px"  :loading="loading" v-if="taskStage=='tesFinished'">关闭</Button>
            </div>
        </Modal>
        <create></create>
    </div>
</template>

<script>
    import {FULLDateFormat} from "../../../libs/utils";
    import create from './create'
    export default {
        name: "detailAccounterLegTask",
        components:{
            create
        },
        computed:{
            openSubmit(){
                if(this.taskStage === "tesUnstarted" ){
                    return false
                }
                if(this.taskStage === "tesFinished" ){
                    return true
                }
            }
        },
        data(){
            return{
                id:"",
                openTaskDetail:false,
                taskStage:"",
                expectEndDate:"",
                missionList:[{"typecode":"Completed","typename":"完成"},{"typecode":"Failed","typename":"失败"}],
                businessArea:[],
                businessPlace:[],
                followResult:[],
                data:[],
                mission:"Completed",
                norMission:"",
                norTaskSummary:"",
                abtypeList:[{"typecode":"A","typename":"A类"},{"typecode":"B","typename":"B类"}],
                typeList:[],
                companyList:[],
                productList:[],
                fieldDetail:[],
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
                newLegType:"",
                oldLegType:"",
                newLegName:"",
                oldLegName:"",
                nowName:"",
                newFollowResult:"",
                oldFollowResult:"",
                taskSummary:"",
                beginImgList:"",
                endImgList:"",
                dateLength:""
            }
        },
        methods:{
            add_customer(){
                this.$bus.emit('OPEN_ADD_CUSTOMER_MODAL',true);
            },
            open_customer_detail(){
                this.$store.commit('open_gobal_customer_detail_modal', {ID: this.data[0].customerId});
            },
            getPlanTime(e){
                console.log(e)
                let _self = this
                _self.newPlanTime = e
            },
            getFollowResult(e){
                console.log(e)
                let _self = this
                _self.newFollowResult = e
            },
            getLegType(e){
                console.log(e)
                let _self = this
                _self.newLegType = e
                _self.name_change()
            },
            getLegName(e){
                console.log(e)
                let _self = this
                _self.newLegName = e
                _self.name_change()
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
            name_change(){
                let _self = this
                let obj = {}
                let arr = _self.typeList

                for (let i=0;i<arr.length;i++){
                    let id = arr[i].id
                    let legwork_name = arr[i].legwork_name
                    obj[id] = legwork_name
                }
                _self.nowName = obj[_self.data[0].legTypeId]
                console.log(_self.nowName)
            },
            get_type_list(){
                let _self = this
                let url = `api/user/legwork/cycle/type/list`
                _self.userLoading = true

                let config = {
                    params: {
                        type:_self.data[0].legType
                    }
                }

                function success(res){
                    _self.userLoading = false
                    _self.typeList = res.data.data
                    if (_self.typeList.length!==0){
                        _self.data[0].legTypeId = _self.typeList[0].id
                        _self.nowName = _self.typeList[0].legwork_name
                        console.log(_self.nowName)
                    }else {
                        _self.data[0].legTypeId = null
                    }
                }
                this.$Get(url, config, success)
            },
            get_type_list_start(e){
                let _self = this
                let url = `api/user/legwork/cycle/type/list`
                _self.userLoading = true

                let config = {
                    params: {
                        type:e
                    }
                }

                function success(res){
                    _self.userLoading = false
                    _self.typeList = res.data.data
                }
                this.$Get(url, config, success)
            },
            update_detail(){
                let _self = this
                    let url = `api/task/updateMarketLegworkTask`
                    let config = {
                            taskId: _self.id,
                            taskName: _self.data[0].taskName,
                            sPlanDate:FULLDateFormat(_self.data[0].planDate),
                            executorId:_self.data[0].executorId,
                            executorName:_self.data[0].executorName,
                            companyId:_self.data[0].companyId,
                            customerId:_self.data[0].customerId,
                            followResult:_self.data[0].	followResult,
                            taskSummary:_self.taskSummary,
                            mission:_self.mission
                        }
                    function success(res){
                            _self.$bus.emit("UPDATE_MARKET_TASK_LIST",true)
                            _self.get_detail(_self.id)
                            _self.openTaskDetail = false
                            _self.taskSummary = ""
                        }
                    function fail(){

                        }
                        this.$Post(url,config,success,fail)
                // let url = `api/task/updateLegworkTask`
                // let config = {
                //     taskId: _self.id,
                //     taskName: _self.data[0].taskName,
                //     sPlanDate:FULLDateFormat(_self.data[0].planDate),
                //     executorId:_self.data[0].executorId,
                //     executorName:_self.data[0].executorName,
                //     companyId:_self.data[0].companyId,
                //     workFlowStatus:_self.data[0].workFlowStatus,
                //     taskArea:_self.data[0].taskArea,
                //     taskPlace:_self.data[0].taskPlace,
                //     businessId:_self.data[0].businessId,
                // }
                // function success(res){
                //     _self.$bus.emit("UPDATE_TASK_LIST",true)
                //     _self.get_detail(_self.id)
                //     _self.openTaskDetail = false
                // }
                // function fail(){
                //
                // }
                // this.$Post(url,config,success,fail)
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
                    console.log(_self.data[0])
                    console.log(_self.data[0].taskStageName)
                    // _self.oldTaskLevel = res.data.data.taskData[0].task_level
                    _self.oldRemindTime = res.data.data[0].planDate
                    // _self.oldTaskStage = res.data.data.taskData[0].task_stage
                    _self.oldTaskName = res.data.data[0].taskName
                    // _self.oldTaskContent = res.data.data.taskData[0].task_content
                    _self.oldPlanTime = res.data.data[0].planDate
                    // console.log(Date.parse(res.data.data.taskData[0].expect_start_date))
                    _self.oldBusinessArea = res.data.data[0].taskArea
                    _self.oldBusinessPlace = res.data.data[0].taskPlace
                    _self.oldLegType = res.data.data[0].legType
                    _self.oldLegName = res.data.data[0].legName
                    _self.nowName = res.data.data[0].legName
                    _self.oldCompanyId = res.data.data[0].companyId
                    _self.oldBusinessId = res.data.data[0].businessId
                    _self.oldFollowResult = res.data.data[0].followResult
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
                    _self.$bus.emit("UPDATE_MARKET_TASK_LIST",true)
                }

                this.$Get(url, config, success)
            },
            get_data_center(){
                let params = "taskLevel,taskDesCode,taskKind,taskStage,market_status,markert_follow_up_type,gzbusinessarea,gzbusinessplace,followStage"

                let _self = this

                function success(res){
                    _self.businessArea = res.data.data.gzbusinessarea
                    _self.businessPlace = res.data.data.gzbusinessplace
                    _self.followResult = res.data.data.followStage
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
            this.$bus.off("OPEN_MARKET_DETAIL_TASK",true)
            this.$bus.on("OPEN_MARKET_DETAIL_TASK",(e)=>{
                console.log(e)
                _self.get_data_center()
                _self.id = e.taskId
                _self.taskStage = e.taskStage
                _self.norTaskSummary = e.taskSummary
                _self.expectEndDate = FULLDateFormat(e.expectEndDate)
                _self.taskKindName = e.taskKindName
                if (e.legId){
                    _self.get_field_detail(e.legId)
                }
                if (e.mission=="Completed") {
                    _self.norMission = "完成"
                }
                if (e.mission=="Failed") {
                    _self.norMission = "失败"
                }
                console.log(e.taskId)
                _self.get_detail(e.taskId)
                _self.detail = e
                e = null
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