<template>
    <Modal
            title="审核工单协助"
            v-model="openAddMission"
            width="800"
            :mask-closable="false"
    >
        <div  v-if="data.length!==0">
            <Form ref="newMission" :model="newMission" :label-width="80" style="margin-left:50px;margin-right:50px">
                <div class="spz">
                    <Input v-model="data[0].apply_content" type="textarea" placeholder="请输入要修改的协助工单缘由" :autosize="{minRows: 4,maxRows: 6}" disabled/>
                </div>
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="企业" prop="companyId">
                            <Input v-model="data[0].companyname" disabled/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="产品" prop="companyId">
                            <Input v-model="data[0].productName" disabled/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12" v-if="data[0].business_id===-1">
                    <Col span="12">
                        <FormItem label="外勤类型" prop="cycleType">
                            <Input v-model="data[0].type" type="text" disabled/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="外勤名称" prop="cycleTypeId">
                            <Input v-model="data[0].legwork_name" type="text" disabled/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="区域" prop="businessArea">
                            <Select v-model="newMission.businessArea" type="text" transfer>
                                <Option v-for="(item,index) in taskArea" :key="index" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="地点" prop="businessPlace">
                            <Select v-model="newMission.businessPlace" type="text" transfer>
                                <Option v-for="(item,index) in taskPlace" :key="index" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="预期服务人" prop="planDate">
                            <Input type="text" v-model="data[0].excutor_name" disabled/>
                        </FormItem>
                    </Col>
                    <!-- <Col span="12">
                        <FormItem label="提醒时间">
                            <DatePicker type="datetime" v-model="newMission.specificDate" style="width:100%"></DatePicker>
                        </FormItem>
                    </Col> -->
                    <Col span="12">
                        <FormItem label="执行人" prop="executorId">
                            <Select v-model="newMission.userId" type="text" transfer>
                                <Option v-for="(item,index) in userList" :key="index" :value="item.id">{{item.realname}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="截至时间" prop="planDate">
                            <DatePicker type="datetime" v-model="data[0].expect_date" style="width:100%"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <FormItem label="备注" prop="planDate">
                    <Input v-model="newMission.checkMemo" type="textarea" placeholder="请输入核实备注" :autosize="{minRows: 4,maxRows: 6}"/>
                    </FormItem>
                </Row>
            </Form>
        </div>
        <div slot="footer">
            <Button @click="update_task" type="primary" :loading="createLoading">同意</Button>
            <Button @click="overrule_task" type="ghost" :loading="backLoading">驳回</Button>
        </div>
    </Modal>
</template>

<script>
    import {FULLDateFormat} from "../../../libs/utils";

    export default {
        name: "createOrder",
        data(){
            return{
                newMission:{
                    businessPlace:"shuiju",
                    businessArea:"tianhe",
                    userId:"",
                    checkMemo:""
                },
                userList:[],
                allUserList:[],
                allUserList_map:new Map(),
                openAddMission:false,
                loading:false,
                createLoading:false,
                backLoading:false,
                data:[],
                taskArea:[],
                taskPlace:[],
                cycleTypeList:[{"typecode":"A","typename":"A类"},{"typecode":"B","typename":"B类"}],
                cycleTypeNameList:[],
                taskArea_map:new Map(),
                taskPlace_map:new Map()
            }
        },
        methods:{
            update_task(){
                let _self = this
                _self.createLoading = true
                let executorNameArray = []
                for(let i = 0; i < _self.newMission.userId.length; i++){
                    executorNameArray.push(_self.allUserList_map.get(_self.newMission.userId[i].toString()))
                }
                let url = `api/task/checkBusAssApply`
                let config = {
                    applyId:_self.data[0].id,
                    applyStatus:"tesFinished",
                    checkMemo:_self.newMission.checkMemo,
                    excutorId:_self.newMission.userId,
                    excutorName:executorNameArray,
                    checkDate:FULLDateFormat(_self.data[0].expect_date),
                    taskArea:_self.newMission.businessArea,
                    taskPlace:_self.newMission.businessPlace
                }
                function success(res){
                    _self.$bus.emit("UPDATE_ORDER_LIST",true)
                    _self.$bus.emit("UPDATE_APPROVE_LIST",true)
                    _self.get_data(_self.data[0].id)
                    _self.createLoading = false
                    _self.openAddMission = false
                }
                function fail(){

                }
                this.$Post(url,config,success,fail)
            },
            overrule_task(){
                let _self = this
                if (_self.newMission.checkMemo===""){
                    _self.$Message.warning("请写驳回备注")
                    return
                }
                _self.backLoading = true
                let executorNameArray = []
                for(let i = 0; i < _self.newMission.userId.length; i++){
                    executorNameArray.push(_self.allUserList_map.get(_self.newMission.userId[i].toString()))
                }
                let url = `api/task/checkBusAssApply`
                let config = {
                    applyId:_self.data[0].id,
                    applyStatus:"tesReturned",
                    checkMemo:_self.newMission.checkMemo,
                    excutorId:_self.newMission.userId,
                    excutorName:executorNameArray,
                    checkDate:FULLDateFormat(_self.data[0].expect_date),
                    taskArea:_self.newMission.businessArea,
                    taskPlace:_self.newMission.businessPlace
                }
                function success(res){
                    _self.$bus.emit("UPDATE_ORDER_LIST",true)
                    _self.$bus.emit("UPDATE_APPROVE_LIST",true)
                    _self.get_data(_self.data[0].id)
                    _self.backLoading = false
                    _self.openAddMission = false
                }
                function fail(){

                }
                this.$Post(url,config,success,fail)
            },
            get_data(e){
                let _self = this
                let url =`api/task/findBusAssApplyById`
                _self.loading = true
                let config = {
                    params: {
                        applyId:e
                    }
                }
                function success(res){
                    console.log(res.data.data)
                    _self.data = res.data.data
                    _self.loading = false
                }
                this.$Get(url, config, success)
            },
            get_user(){
                let _self = this
                let url = `api/user/list`
                let config = {
                    params: {
                        page: 1,
                        pageSize: 10,
                        alias_code:"BUSSINESS",
                        tdaffiliation_area:"guangzhou"
                    }
                }
                function success(res){
                    _self.userLoading = false
                    _self.userList = res.data.data.rows
                    if (_self.userList.length!==0){
                        _self.newMission.userId =  _self.userList[0].id
                    }
                }

                this.$Get(url, config, success)
            },
            get_all_user(){
                let _self = this
                let url = `api/user/list`

                let config = {
                    params: {
                        page: 1,
                        pageSize: 1000,
                    }
                }

                function success(res){
                    _self.userList = res.data.data.rows
                    _self.allUserList = res.data.data.rows
                    for(let i = 0;i<_self.allUserList.length;i++){
                        _self.allUserList_map.set(_self.allUserList[i].id.toString(),_self.allUserList[i].realname)
                    }

                    console.log(_self.allUserList_map)
                }

                this.$Get(url, config, success)
            },
            get_data_center(){
                let _self = this
                return new Promise((resolve,reject) => {
                    let params ="gzbusinessarea,gzbusinessplace"

                    function success(res){
                        _self.taskArea = res.data.data.gzbusinessarea
                        _self.taskPlace = res.data.data.gzbusinessplace
                        _self.taskArea_map = _self.$array2map(_self.taskArea)
                        _self.taskPlace_map = _self.$array2map(_self.taskPlace)
                        resolve()
                    }
                    this.$GetDataCenter(params, success)
                })
            }
        },
        created() {
            this.$bus.on("OPEN_ORDERLIST_EDIT", (e)=>{
                this.openAddMission=true
                this.get_data_center().then(
                    this.get_data(e)
                ).then(
                    this.get_user
                ).then(
                    this.get_all_user
                )
            })
        }
    }
</script>

<style>
    .spz{
        margin-bottom: 25px;
    }
</style>