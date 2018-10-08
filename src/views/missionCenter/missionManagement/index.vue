<template>
    <Card>
        <Row style="margin-bottom:10px">
            <ButtonGroup>
                <Button type="primary" @click="open_add_mission">新增任务</Button>
            </ButtonGroup>
        </Row>
        <div>
            <Tabs value="6">
                <TabPane label="全部任务" name="6">
                    <all></all>
                </TabPane>
                <TabPane label="重要且紧急" name="1">
                </TabPane>
                <TabPane label="重要但不紧急" name="2">
                </TabPane>
                <TabPane label="紧急但不重要" name="3">
                </TabPane>
                <TabPane label="不重要也不紧急" name="4">
                </TabPane>
                <TabPane label="本周任务" name="5">
                </TabPane>
            </Tabs>
        </div>
        <Modal
            title="新增任务"
            v-model="openAddMission"
            width="800"
            :mask-closable="false"
        >
            <Form ref="newMission" :model="newMission" :label-width="80" style="margin-left:50px;margin-right:50px">
                <FormItem label="任务名称">
                    <Input v-model="newMission.taskName"></Input>
                </FormItem>
                <FormItem label="任务对象">
                    <Select v-model="newMission.companyId" placeholder="输入公司名称搜索"
                        filterable
                        remote
                        :remote-method="get_company"
                        :loading="companyLoading"
                    >
                        <Option v-for="item in companyList" :value="item.id" :key="item.id">{{item.companyname}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="执行者">
                    <Select 
                        v-model="newMission.executorId" 
                        placeholder="执行者" 
                        filterable
                        remote
                        :remote-method="get_user"
                        :loading="userLoading"
                    >
                        <Option v-for="item in userList" :key="item.id" :value="item.id" :label="item.realname">
                            <span>{{item.realname}}</span>
                            <span style="float:right;color:#ccc">{{item.departname}}</span>
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="任务详情">
                    <Input v-model="newMission.taskContent" type="textarea" :rows="3"></Input>
                </FormItem>
                    <Row :gutter="12">
                        <Col span="12">
                            <FormItem label="执行时间">
                                <DatePicker type="datetime" v-model="newMission.planDate" style="width:100%"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="提醒时间">
                                <DatePicker type="datetime" v-model="newMission.noticeDate" style="width:100%"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="任务级别">
                            <Select v-model="newMission.taskLevel" type="text" transfer>
                                <Option v-for="(item,index) in taskLevel" :key="index" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="任务状态">
                            <Select v-model="newMission.taskDesCode">
                                <Option v-for="(item,index) in taskDesCode" :key="index" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="任务类型">
                            <Select v-model="newMission.taskKind">
                                <Option v-for="(item,index) in taskKind" :key="index" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12"> 
                        <FormItem label="任务阶段">
                            <Select v-model="newMission.taskStage">
                                <Option v-for="(item,index) in taskStage" :key="index" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="跟进结果">
                            <Select v-model="newMission.followResult">
                                <Option v-for="(item,index) in market_status" :key="index" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12"> 
                        <FormItem label="跟进方式">
                            <Select v-model="newMission.followUpType">
                                <Option v-for="(item,index) in markert_follow_up_type" :key="index" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem label="任务标签">
                    <CheckboxGroup v-model="newMission.taskLable">
                        <Checkbox v-for="(item, index) in label" :key="index" :label="item"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="create_task" type="primary" :loading="createLoading">新增</Button>
                <Button @click="cancel_task" type="ghost">清空</Button>
            </div>
        </Modal>
    </Card>
</template>

<script>
import all from './typeOfMission/all'

export default {
    name: "missionManagement_index",
    components: {
        all,
    },
    data(){
        return{
            createLoading: false,
            label: [
                "领导","领导2","领导3"
            ],
            companyLoading: false,
            userLoading: false,
            newMission: {
                taskName: "",
                taskContent: "",
                planDate: new Date(),
                taskLevel: "",
                taskDesCode: "",
                taskKind: "",
                taskStage: "",
                followResult: "",
                followUpType: "",
                companyId: "",
                executorId: ""
            },
            openAddMission: false,
            taskLevel: [],
            taskDesCode: [],
            taskKind: [],
            taskStage: [],
            market_status: [],
            markert_follow_up_type: [],
            taskLevel_map: new Map(),
            taskDesCode_map: new Map(),
            taskKind_map: new Map(),
            taskStage_map: new Map(),
            market_status_map: new Map(),
            markert_follow_up_type_map: new Map(),
            companyList: [],
            userList: []
            
        }
    },
    methods:{
        open_add_mission(){
            // let _self = this
            this.openAddMission = true
        },

        get_data_center(){
            let params = "taskLevel,taskDesCode,taskKind,taskStage,market_status,markert_follow_up_type"

            let _self = this

            function success(res){
                _self.taskLevel = res.data.data.taskLevel
                _self.taskDesCode = res.data.data.taskDesCode
                _self.taskKind = res.data.data.taskKind
                _self.taskStage = res.data.data.taskStage
                _self.market_status = res.data.data.market_status
                _self.markert_follow_up_type = res.data.data.markert_follow_up_type
                _self.taskLevel_map = _self.$array2map(_self.taskLevel)
                _self.taskDesCode_map = _self.$array2map(_self.taskDesCode)
                _self.taskKind_map = _self.$array2map(_self.taskKind)
                _self.taskStage_map = _self.$array2map(_self.taskStage)
                _self.market_status_map = _self.$array2map(_self.market_status)
                _self.markert_follow_up_type_map = _self.$array2map(_self.markert_follow_up_type)
            }
            this.$GetDataCenter(params, success)
        },

        get_company(query){
            let _self = this
            _self.companyLoading = true
            let url = "api/customer/company/list"
            let config = {
                params:{
                    page: 1,
                    pageSize: 10,
                    companyname: query
                }
            }

            function success(res){
                _self.companyLoading = false
                _self.companyList = res.data.data.rows
            }

            this.$Get(url, config, success)
        },
        get_user(query){
            let _self = this
            let url = `api/user/list`
            _self.userLoading = true

            let config = {
                params: {
                    page: 1,
                    pageSize: 5,
                    realname: query
                }
            }

            function success(res){
                _self.userLoading = false
                _self.userList = res.data.data.rows
            }

            this.$Get(url, config, success)
        },
        create_task(){
            let _self = this
            _self.createLoading = true
            let url = `api/task/addTask`
            let config = {
                taskName: _self.newMission.taskName,
                companyId: _self.newMission.companyId,
                executorId: _self.newMission.executorId,
                taskContent: _self.newMission.taskContent,
                taskLevel: _self.newMission.taskLevel,
                taskDesCode: _self.newMission.taskDesCode,
                taskKind: _self.newMission.taskKind,
                taskStage: _self.newMission.taskStage,
                followResult: _self.newMission.followResult,
                followUpType: _self.newMission.followUpType,
                taskLable: _self.newMission.taskLable.join(","),
                taskLevelName: _self.taskLevel_map.get(_self.newMission.taskLevel),
                taskDescription: _self.taskDesCode_map.get(_self.newMission.taskDesCode),
                taskKindName: _self.taskKind_map.get(_self.newMission.taskKind),
                taskStageName: _self.taskStage_map.get(_self.newMission.taskStage),
                followResultName: _self.market_status_map.get(_self.newMission.followResult),
                followUpTypeName: _self.markert_follow_up_type_map.get(_self.newMission.followUpType),
            }

            function success(res){
                _self.createLoading = false
                _self.$refs['newMission'].resetFields();
            }

            function fail(err){
                _self.createLoading = false

            }

            this.$Post(url, config, success, fail)
        },
        cancel_task(){
            _self.$refs['newMission'].resetFields();
        }
    },
    created() {
        let _self = this
        this.get_data_center()
    },
}
</script>

