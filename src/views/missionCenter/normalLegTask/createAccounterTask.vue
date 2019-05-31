<template>
    <Modal
            title="新建普通外勤任务"
            v-model="openAddMission"
            width="800"
            :mask-closable="false"
    >
        <Form ref="newMission" :model="newMission" :label-width="80" style="margin-left:50px;margin-right:50px">
            <div class="sp">
                <new-edit-div v-model="newMission.taskName"></new-edit-div>
                <div class="spz">
                    <div class="spzz" @click="showPhrase"><Icon type="android-chat" ></Icon></div>
                </div>
            </div>
            <div v-show="phraseShow" class="ssz">
                <Card>
                    <div class="sszz" v-for="(item,index) in phraseList" @click="giveData(item)" :loading="phraseLoading">
                        <div class="ssz1">{{item.quick_content}}</div>
                        <div class="ssz2" @click.stop="editable(item.quick_content,item.id)"><Icon type="edit" ></Icon></div>
                        <div class="ssz3" @click.stop="selectArr(item.id)"><Icon type="close" ></Icon></div>
                    </div>
                    <div class="sszz1" @click="add_schtask"><h4>+添加</h4></div>
                </Card>
            </div>
            <Row :gutter="12">
                <Col span="12">
                    <FormItem label="企业" prop="company">
                        <Input  v-model="newMission.companyName" placeholder="点击搜索企业名称" @on-focus="search_company" readonly/>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="客户" prop="customer">
                        <Input v-model="newMission.customerName" placeholder="点击搜索客户名称或电话" @on-focus="search_company" readonly/>
                    </FormItem>
                </Col>
                <!--<FormItem label="客户" prop="companyId">-->
                <!--<Select ref="sel"-->
                <!--v-model="newMission.customerId"-->
                <!--placeholder="请输入客户名称搜索"-->
                <!--filterable-->
                <!--remote-->
                <!--:remote-method="get_customer"-->
                <!--:loading="companyLoading"-->
                <!--&gt;-->
                <!--<Option v-if="rendering"  v-for="item in productList" :value="item.customerid" :key="item.customerid" :label="item.name">-->
                <!--<span>{{item.name}}</span>-->
                <!--<span style="float:right;color:#ccc">{{item.tel}}</span>-->
                <!--</Option>-->
                <!--</Select>-->
                <!--</FormItem>-->
            </Row>
            <Row :gutter="12">
                <Col span="12">
                    <FormItem label="代办于" prop="planDate">
                        <DatePicker type="datetime" v-model="newMission.planDate" style="width:100%"></DatePicker>
                    </FormItem>
                </Col>
                <!-- <Col span="12">
                    <FormItem label="提醒时间">
                        <DatePicker type="datetime" v-model="newMission.specificDate" style="width:100%"></DatePicker>
                    </FormItem>
                </Col> -->
                <Col span="12">
                    <FormItem label="执行者" prop="executorId">
                        <Select
                                v-model="newMission.executorId"
                                placeholder="执行者"
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
            <!-- <FormItem label="执行部门">
                <Select
                    v-model="newMission.executorId"
                    placeholder="执行部门"
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
            </FormItem> -->
            <Row :gutter="12">

            </Row>
            <Row :gutter="12">

                <!-- <Col span="12">
                    <FormItem label="任务阶段">
                        <Select v-model="newMission.taskStage">
                            <Option v-for="(item,index.vue) in taskStage" :key="index.vue" :value="item.typecode">{{item.typename}}</Option>
                        </Select>
                    </FormItem>
                </Col> -->
            </Row>
            <!-- <Row :gutter="12">
                <Col span="12">
                    <FormItem label="跟进结果">
                        <Select v-model="newMission.followResult">
                            <Option v-for="(item,index.vue) in market_status" :key="index.vue" :value="item.typecode">{{item.typename}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="跟进方式">
                        <Select v-model="newMission.followUpType">
                            <Option v-for="(item,index.vue) in markert_follow_up_type" :key="index.vue" :value="item.typecode">{{item.typename}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row> -->
            <!-- <FormItem label="任务标签">
                <CheckboxGroup v-model="newMission.taskLable">
                    <Checkbox v-for="(item, index.vue) in label" :key="index.vue" :label="item"></Checkbox>
                </CheckboxGroup>
            </FormItem> -->
        </Form>
        <div slot="footer">
            <Button @click="create_task" type="primary" :loading="createLoading">发布</Button>
            <Button @click="cancel_task" type="ghost">清空</Button>
        </div>
        <add></add>
        <amend></amend>
        <search-company @company-change="setting_company"></search-company>
    </Modal>

</template>

<script>
    import { FULLDateFormat } from '../../../libs/utils.js'
    import Add from './add'
    import NewEditDiv from './newEditDiv'
    import Amend from './amend'
    import searchCompany from './searchCompany'
    export default {
        components:{
            Amend,
            Add,
            NewEditDiv,
            searchCompany
        },
        data(){
            return {
                text:"",
                disabled:false,
                showSelect:true,
                showSelecte:false,
                readonly:true,
                rendering:false,
                phraseShow:false,
                currentId:null,
                newMission: {
                    taskName: "",
                    taskContent: "",
                    planDate: new Date(),
                    specificDate: "",
                    taskLevel: "importance",
                    taskDesCode: "",
                    taskKind: "",
                    businessPlace:"shuiju",
                    businessArea:"tianhe",
                    followResult:"EarlyContact",
                    cycleType:"A",
                    node:"Y",
                    taskStage: "",
                    followUpType: "",
                    companyId: "",
                    executorId: [],
                    customerId:"",
                    cycleTypeId:"",
                    cycleTypeName:"",
                    companyName:""
                },
                phraseLoading: false,
                createLoading: false,
                openAddMission: false,
                companyLoading: false,
                phraseList:[],
                companyList: [],
                cIdList: [],
                userList: [

                ],
                productList:[],
                pproductList:[],
                nodeList:[{"typecode":"Y","typename":"是"},{"typecode":"N","typename":"否"}],
                cycleTypeList:[{"typecode":"A","typename":"A类"},{"typecode":"B","typename":"B类"}],
                cycleTypeNameList:[],
                allUserList: [],
                allUserList_map: new Map(),
                businessArea:[],
                businessPlace:[],
                followResult:[],
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
                businessArea_map:new Map(),
                businessPlace_map:new Map(),
                followResult_map:new Map(),
                userLoading: false,
                user: "",
                useropen: false

            }
        },
        methods:{
            search_company(){
                this.$bus.emit("OPEN_COMPANY_LIST_NORMAL",true)
            },
            giveData(item){
                this.newMission.taskName=this.newMission.taskName+item.quick_content
                this.phraseShow = false
            },
            editable(content,id){
                let _self = this
                _self.$bus.$emit("AMEND_NORMAL_PHRASE_DATA",content,id)
            },
            selectArr(id){
                this.delete_phrase_list(id)
                // this.addArr.splice(index.vue,1)
            },
            add_schtask(){
                this.$bus.emit("ADD_NORMAL_TASK",true)
            },
            showPhrase(){
                if (this.phraseShow===true){
                    this.phraseShow=false
                } else {
                    this.phraseShow=true
                }
                this.get_phrase_list()
            },
            get_phrase_list(){
                let _self = this
                _self.phraseLoading = true
                let url = 'api/task/findTaskQuickList'
                let config = {
                    params:{
                        quickType: "normal"
                    }
                }
                function success(res){
                    _self.phraseLoading = false
                    _self.phraseList = res.data.data
                }
                this.$Get(url, config, success)
            },
            // add_phrase_list(e){
            //     let _self = this
            //     _self.phraseLoading = true
            //     let url = 'api/task/addTaskQuick'
            //     let config={
            //         quickType:"normal",
            //         quickContent:e,
            //         quickIndex:1,
            //     }
            //     function success(res){
            //         _self.phraseLoading = false
            //         _self.$bus.emit("UPDATE_NORMAL_PHRASE_LIST", true)
            //     }
            //     function fail(err){
            //         _self.phraseLoading = true
            //     }
            //     this.$Post(url, config, success, fail)
            // },
            setting_company(e){
                console.log(e)
                this.newMission.companyName=e.companyname
                this.newMission.customerName=e.customerName
                this.newMission.customerId=e.customerId
                this.newMission.companyId=e.id
                console.log(this.newMission.customerId)
                console.log(this.newMission.companyId)
                // this.orderDetail.CompanyName = e.companyname
                // this.orderDetail.name = e.customerName
                // this.orderDetail.tel = e.customerTel
                // this.orderDetail.gdsreport = e.gdsreport
                // this.orderDetail.companyid = e.id
                // this.orderDetail.customerid = e.customerId
            },
            delete_phrase_list(id){
                let _self = this
                _self.phraseLoading = true
                let url = 'api/task/deleteTaskQuick'
                let config = {
                    params:{
                        taskQuickId: id
                    }
                }
                function success(res){
                    _self.phraseLoading = false
                    _self.$bus.emit("UPDATE_NORMAL_PHRASE_LIST", true)
                }
                this.$Get(url, config, success)
            },
            create_task() {
                let _self = this
                if (_self.newMission.taskName ==null || _self.newMission.taskName =="") {
                    this.$Message.warning('请把上述信息填写完整')
                    return
                }
                _self.createLoading = true
                // let url = `api/task/addLegworkTask`
                let executorNameArray = []
                for (let i = 0; i < _self.newMission.executorId.length; i++) {
                    executorNameArray.push(_self.allUserList_map.get(_self.newMission.executorId[i].toString()))
                }
                // let config = {
                //     taskKind: "tkLegBus",
                //     taskName: _self.newMission.taskName,
                //     companyId: _self.newMission.companyId,
                //     taskArea:_self.newMission.businessArea,
                //     taskPlace:_self.newMission.businessPlace,
                //     executorId: _self.newMission.executorId.join(","),
                //     businessId:_self.newMission.businessId,
                //     workFlowStatus:_self.newMission.node,
                //     executorName: executorNameArray.join(","),
                //     sPlanDate: FULLDateFormat(_self.newMission.planDate),
                //
                // }
                //
                //
                // function success(res){
                //     _self.createLoading = false
                //     _self.openAddMission = false
                //     _self.$bus.emit("UPDATE_BUSINESS_TASK_LIST_DEMO", res.data.data.id)
                //     _self.cancel_task()
                // }
                //
                // function fail(err){
                //     _self.createLoading = false
                //
                // }
                //
                // this.$Post(url, config, success, fail)
                let url = `api/task/addNoramlLegworkTask`
                let config = {
                    taskName: _self.newMission.taskName,
                    companyId: _self.newMission.companyId,
                    executorId: _self.newMission.executorId.join(","),
                    customerId: _self.newMission.customerId,
                    executorName: executorNameArray.join(","),
                    sPlanDate: FULLDateFormat(_self.newMission.planDate),
                }

                function success(res) {
                    _self.createLoading = false
                    _self.openAddMission = false
                    _self.$bus.emit("UPDATE_NORMAL_TASK_LIST_DEMO", true)
                    _self.newMission.taskName=null
                    _self.cancel_task()
                }

                function fail(err) {
                    _self.createLoading = false
                }

                this.$Post(url, config, success, fail)

            },
            cancel_task(){
                this.$refs.select.setQuery(null)
                this.$refs.sel.setQuery(null)
                this.newMission.taskName = null
                this.$refs['newMission'].resetFields();
                this.newMission.companyId = null
                this.newMission.customerId = null
                this.rendering = false
                this.companyList = []
                this.productList = []
                this.pproductList = []
                this.cIdList = []
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
                    _self.rendering = true
                }
                this.$Get(url, config, success)
            },
            get_customer(query){
                let _self = this
                _self.productList=[]
                _self.companyLoading = true
                let url = "api/legwork/apiQueryCompanyOrCustomerMsg"
                if (isNaN(query)) {
                let config = {
                    params:{
                        page: 1,
                        pageSize: 10,
                        name: query
                    }
                }

                function success(res){
                    _self.companyLoading = false
                    _self.productList = res.data.data
                    console.log(_self.productList)
                }

                this.$Get(url, config, success)
                }
                if (!isNaN(query)){
                    let config = {
                        params:{
                            page: 1,
                            pageSize: 10,
                            tel: query
                        }
                    }

                    function success(res){
                        _self.companyLoading = false
                        _self.productList = res.data.data
                        console.log(_self.productList)
                    }

                    this.$Get(url, config, success)
                }
            },
            get_companyId(){
                let _self = this
                let url = `api/legwork/apiQueryCompanyOrCustomerMsg`
                _self.userLoading = true
                let config = {
                    params:{
                        customerId:_self.newMission.customerId,
                    }
                }
                function success(res){
                    _self.userLoading = false
                    _self.cIdList = res.data.data
                    console.log(res.data.data)
                    if (_self.newMission.customerId==null){
                        _self.cIdList= []
                    }
                    if (_self.cIdList.length!==0){
                        _self.newMission.companyId =  _self.cIdList[0].companyid
                    }else {
                        _self.newMission.companyId = null
                    }
                    _self.rendering=true
                }

                this.$Get(url, config, success)
            },
            get_customerId(){
                let _self = this
                let url = `api/legwork/apiQueryCompanyOrCustomerMsg`
                _self.userLoading = true
                let config = {
                    params:{
                    companyId:_self.newMission.companyId,
                    }
                }
                function success(res){
                    _self.rendering =true
                    if (_self.newMission.companyId==null){
                        _self.pproductList = []
                    } else {
                    _self.userLoading = false
                    _self.pproductList = res.data.data
                    console.log(res.data.data)
                    if (_self.pproductList.length!==0){
                        _self.newMission.customerId =  _self.pproductList[0].customerid
                    }else {
                        _self.newMission.customerId = null
                    }
                    }
                }

                this.$Get(url, config, success)
            },
            // name_change(){
            //     let _self = this
            //     let obj = {}
            //     let arr = _self.companyList
            //
            //     for (let i=0;i<arr.length;i++){
            //         let name= arr[i].companyname
            //         let id = arr[i].companyid
            //         obj[id] = name
            //     }
            //     _self.newMission.companyName = obj[_self.newMission.companyId]
            //     console.log(_self.newMission.companyName)
            // },
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
            get_data_center(){
                let params = "taskLevel,taskDesCode,taskKind,taskStage,market_status,markert_follow_up_type,gzbusinessarea,gzbusinessplace,followStage"

                let _self = this

                function success(res){
                    _self.taskLevel = res.data.data.taskLevel
                    _self.taskDesCode = res.data.data.taskDesCode
                    _self.taskKind = res.data.data.taskKind
                    _self.taskStage = res.data.data.taskStage
                    _self.market_status = res.data.data.market_status
                    _self.markert_follow_up_type = res.data.data.markert_follow_up_type
                    _self.businessArea = res.data.data.gzbusinessarea
                    _self.businessPlace = res.data.data.gzbusinessplace
                    _self.followResult= res.data.data.followStage
                    _self.taskLevel_map = _self.$array2map(_self.taskLevel)
                    _self.taskDesCode_map = _self.$array2map(_self.taskDesCode)
                    _self.taskKind_map = _self.$array2map(_self.taskKind)
                    _self.taskStage_map = _self.$array2map(_self.taskStage)
                    _self.market_status_map = _self.$array2map(_self.market_status)
                    _self.markert_follow_up_type_map = _self.$array2map(_self.markert_follow_up_type)
                    _self.businessArea_map = _self.$array2map(_self.businessArea)
                    _self.businessPlace_map = _self.$array2map(_self.businessPlace)
                    _self.followResult_map = _self.$array2map(_self.followResult)
                }
                this.$GetDataCenter(params, success)
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
        },
        mounted(){
            // this.get_type_list()
        },
        created() {
            let _self = this
            this.get_data_center()
            this.get_all_user()
            this.$bus.on("SCHEDULE_CREATE_NORMAL_TASK",(e)=>{
                console.log(e)
                _self.user = localStorage.getItem("id")
                _self.newMission.executorId = []
                _self.newMission.executorId.push(parseInt(_self.user))

                _self.openAddMission = true
                _self.newMission.planDate = e
            })
            // this.$bus.on("ADD_NORMAL_PHRASE",(e)=>{
            //     console.log(e)
            //     this.add_phrase_list(e)
            // })
            this.$bus.on("UPDATE_NORMAL_PHRASE_LIST",(e)=>{
                this.get_phrase_list()
            })
        },


    }
</script>

<style>
.spz{
    height: 25px;
    width: 100%;
    border: 1px solid #dddee1;
    border-top: none;
    background-color: #fff;
    cursor: text;
}
.sp{
    margin-bottom: 25px;
}
.spzz{
    width: 20px;
    margin-left: 10px;
    cursor: pointer;
    text-align: center;
}
.spzz:hover{
    color: #2d8cf0;
}
.ssz{
    width: 200px;
    position: absolute;
    left: 68px;
    top: 228px;
    z-index: 100;
    background: #dddee1;
}
.ssz1{
    width: 100px;
    word-break: break-all;
}
.ssz1,.ssz2,.ssz3{
    display: inline-block;
}
.sszz{
    padding: 5px 0;
}
.sszz:hover{
    background: #fff5e6;
}
.ssz2:hover{
    color: #2d8cf0;
    cursor: pointer;
    font-size: 16px;
}
.ssz3:hover{
    cursor: pointer;
    font-size: 16px;
    color: #ed3f14;
}
.ssz2{
    margin-left: 30px;
}

.sszz1{
    padding: 10px 10px 0 10px;
    text-align: center;
    color: #2d8cf0;
}
.sszz1:hover{
    font-size: 16px;
    cursor: pointer;
}

</style>