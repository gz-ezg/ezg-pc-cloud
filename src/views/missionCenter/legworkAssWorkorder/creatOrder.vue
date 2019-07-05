<template>
    <Modal
            title="新建工单协助"
            v-model="openAddMission"
            width="800"
            :mask-closable="false"
    >
        <Form ref="newMission" :model="newMission" :label-width="80" style="margin-left:50px;margin-right:50px">
            <Input v-model="newMission.applyContent" style="margin-bottom: 25px" type="textarea" placeholder="请输入协助工单缘由" :autosize="{minRows: 4,maxRows: 6}" ></Input>
            <Row :gutter="12">
                <Col span="12">
                    <FormItem label="企业" prop="companyId">
                        <Select ref="select"
                                v-model="newMission.companyId" placeholder="请输入企业名称搜索"
                                filterable
                                remote
                                :remote-method="get_company"
                                @on-change="get_businessId(newMission.companyId)"
                                :loading="companyLoading"
                        >
                            <Option v-for="item in companyList" :value="item.companyid" :key="item.companyid" >{{item.companyname}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="产品" prop="companyId">
                        <Select v-model="newMission.businessId" placeholder="请先输入企业名称搜索"
                                :loading="companyLoading"
                        >
                            <Option v-for="item in productList" :value="item.businessId" :key="item.businessId">{{item.product}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="12" v-if="newMission.businessId==-999">
                <Col span="12">
                    <FormItem label="外勤类型" prop="cycleType">
                        <Select v-model="newMission.cycleType" type="text" transfer @on-change="get_type_list">
                            <Option v-for="(item,index) in cycleTypeList" :key="index" :value="item.typecode">{{item.typename}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="外勤名称" prop="cycleTypeId">
                        <Select v-model="newMission.cycleTypeId" type="text" transfer>
                            <Option v-for="(item,index) in cycleTypeNameList" :key="index" :value="item.id">{{item.legwork_name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="12">
                <Col span="12">
                    <FormItem label="截至时间" prop="planDate">
                        <DatePicker type="datetime" v-model="newMission.planDate" style="width:100%"></DatePicker>
                    </FormItem>
                </Col>
                <!-- <Col span="12">
                    <FormItem label="提醒时间">
                        <DatePicker type="datetime" v-model="newMission.specificDate" style="width:100%"></DatePicker>
                    </FormItem>
                </Col> -->
                <Col span="12">
                    <FormItem label="负责人" prop="executorId">
                        <Select
                                v-model="newMission.executorId"
                                placeholder="请输入名称进行搜索"
                                filterable
                                multiple
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
                </Col>
            </Row>
        </Form>
        <div slot="footer">
            <Button @click="create_task" type="primary" :loading="createLoading">提交申请</Button>
            <Button @click="cancel_task" type="ghost">清空</Button>
        </div>
    </Modal>
</template>

<script>
    import {FULLDateFormat} from "../../../libs/utils";

    export default {
        name: "creatOrder",
        data(){
            return{
                openAddMission:false,
                companyList:[],
                companyLoading:false,
                productList:[],
                userList:[],
                allUserList:[],
                allUserList_map:new Map(),
                createLoading:false,
                cycleTypeList:[{"typecode":"A","typename":"A类"},{"typecode":"B","typename":"B类"},{"typecode":"其他","typename":"其他"}],
                cycleTypeNameList:[],
                userLoading:false,
                newMission: {
                    applyContent: "",
                    taskContent: "",
                    planDate: new Date(),
                    specificDate: "",
                    taskLevel: "importance",
                    taskDesCode: "",
                    taskKind: "",
                    businessPlace:"shuiju",
                    businessArea:"tianhe",
                    cycleType:"A",
                    node:"Y",
                    taskStage: "",
                    followResult: "",
                    followUpType: "",
                    companyId: "",
                    executorId: [],
                    businessId:"",
                    cycleTypeId:"",
                    cycleTypeName:""
                },
            }
        },
        methods:{
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
            get_businessId(id){
                let _self = this
                let url = `api/task/getLegWorkOrderByCompanyId`
                _self.userLoading = true

                let config = {
                    params:{
                        companyId:id,
                        aliasCode:"ACCOUNT"
                    }
                }
                function success(res){
                    _self.userLoading = false
                    _self.productList = res.data.data
                    console.log(res.data.data)
                    if (_self.productList.length!==0){
                        _self.newMission.businessId =  _self.productList[0].businessId
                    }
                    if (_self.productList.length===0){
                        _self.productList = []
                        _self.newMission.businessId =  null
                    }
                    _self.get_type_list()
                }

                this.$Get(url, config, success)
            },
            get_type_list(){
                let _self = this
                let url = `api/user/legwork/cycle/type/list`
                _self.userLoading = true

                let config = {
                    params: {
                        type:_self.newMission.cycleType
                    }
                }

                function success(res){
                    _self.userLoading = false
                    _self.cycleTypeNameList = res.data.data
                    if (_self.cycleTypeNameList.length!==0){
                        _self.newMission.cycleTypeId = _self.cycleTypeNameList[0].id
                        _self.newMission.cycleTypeName = _self.cycleTypeNameList[0].legwork_name
                        console.log(_self.newMission.cycleTypeName)
                    }else {
                        _self.newMission.cycleTypeId = null
                    }
                }
                this.$Get(url, config, success)
            },
            cancel_task(){
                this.$refs.select.setQuery(null)
                this.newMission.applyContent ="";
                this.newMission.companyId ="";
                this.newMission.businessId ="";
                this.$refs['newMission'].resetFields();
            },
            create_task(){
                let _self = this
                if (_self.newMission.applyContent==="" ||
                    _self.newMission.companyId===""){
                    this.$Message.warning('请把上述信息填写完整')
                    return
                }
                _self.createLoading = true
                let executorNameArray = []
                for(let i = 0; i < _self.newMission.executorId.length; i++){
                    executorNameArray.push(_self.allUserList_map.get(_self.newMission.executorId[i].toString()))
                }
                if (_self.newMission.businessId===-999){
                    let url = `api/task/addBusAssApply`
                    let config = {
                        companyId:_self.newMission.companyId,
                        applyTypeId: _self.newMission.cycleTypeId,
                        applyContent:_self.newMission.applyContent,
                        expectDate:FULLDateFormat(_self.newMission.planDate),
                        excutorId:_self.newMission.executorId.join(","),
                        excutorName:executorNameArray.join(","),
                    }
                    function success(res){
                        _self.createLoading = false
                        _self.openAddMission = false
                        _self.$bus.emit("UPDATE_ORDER_LIST", true)
                        _self.cancel_task()
                    }
                    function fail(err){
                        _self.createLoading = false
                    }
                    this.$Post(url, config, success, fail)
                }
                if (_self.newMission.businessId){
                    let url = `api/task/addBusAssApply`
                    let config = {
                        companyId:_self.newMission.companyId,
                        businessId:_self.newMission.businessId,
                        applyContent:_self.newMission.applyContent,
                        expectDate:FULLDateFormat(_self.newMission.planDate),
                        excutorId:_self.newMission.executorId.join(","),
                        excutorName:executorNameArray.join(","),
                    }
                    function success(res){
                        _self.createLoading = false
                        _self.openAddMission = false
                        _self.$bus.emit("UPDATE_ORDER_LIST", true)
                        _self.cancel_task()
                    }
                    function fail(err){
                        _self.createLoading = false
                    }
                    this.$Post(url, config, success, fail)
                }

            }
        },
        created() {
            let _self = this
            _self.get_all_user()
            _self.$bus.on("OPEN_ORDERLIST_ADD", (e)=>{
                _self.openAddMission = true
            })
        }
    }
</script>

<style>
.spz{
    margin-bottom: 25px;
}
</style>