<template>
    <Modal
            title="新建排程"
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
                    <FormItem label="企业" prop="companyId">
                        <Select ref="select"
                                v-model="newMission.companyId"
                                placeholder="请输入客户名称搜索"
                                filterable
                                remote
                                :remote-method="get_company"
                                @on-change="get_businessId(newMission.companyId)"
                                :loading="companyLoading"
                        >
                            <Option v-for="item in companyList" :value="item.companyid" :key="item.companyid">{{item.companyname}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="产品" prop="companyId">
                        <Select v-model="newMission.businessId" placeholder="请先输入客户名称搜索"
                                :loading="companyLoading" @on-change="get_product_name"
                        >
                            <Option v-for="item in productList" :value="item.businessId" :key="item.businessId">{{item.product}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="12">
                <Col span="12">
                    <FormItem label="区域" prop="businessArea">
                        <Select v-model="newMission.businessArea" type="text" transfer>
                            <Option v-for="(item,index) in businessArea" :key="index" :value="item.typecode">{{item.typename}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="地点" prop="businessPlace">
                        <Select v-model="newMission.businessPlace" type="text" transfer>
                            <Option v-for="(item,index) in businessPlace" :key="index" :value="item.typecode">{{item.typename}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="12">
                <Col span="12">
                    <FormItem label="正常节点" prop="node">
                        <Select v-model="newMission.node" type="text" transfer>
                            <Option v-for="(item,index) in nodeList" :key="index" :value="item.typecode">{{item.typename}}</Option>
                        </Select>
                    </FormItem>
                </Col>
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
    </Modal>

</template>

<script>
    import { FULLDateFormat } from '../../../libs/utils.js'
    import Add from './add'
    import NewEditDiv from './newEditDiv'
    import Amend from './amend'
    export default {
        components:{
            Amend,
            Add,
            NewEditDiv,
        },
        data(){
            return {
                text:"",
                phraseShow:false,
                currentId:null,
                newMission: {
                    taskName: "",
                    taskContent: "",
                    planDate: new Date(),
                    specificDate: "",
                    taskLevel: "importance",
                    taskDesCode: "",
                    taskKind: "tkFollow",
                    businessPlace:"shuiju",
                    businessArea:"tianhe",
                    node:"Y",
                    taskStage: "",
                    followResult: "",
                    followUpType: "",
                    companyId: "",
                    companyName:"",
                    businessId:"",
                    nodeName:"",
                    businessName:"",
                    executorId: [],
                },
                phraseLoading: false,
                createLoading: false,
                openAddMission: false,
                companyLoading: false,
                phraseList:[],
                companyList: [],
                companyNameList:[],
                userList: [

                ],
                productList:[],
                productListName:[],
                nodeNameList:[],
                nodeList:[{"typecode":"Y","typename":"是"},{"typecode":"N","typename":"否"}],
                allUserList: [],
                allUserList_map: new Map(),
                businessArea:[],
                businessPlace:[],
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
                userLoading: false,
                user: "",
                useropen: false

            }
        },
        methods:{
            giveData(item){
                this.newMission.taskName=this.newMission.taskName+item.quick_content
                this.phraseShow = false
            },
            editable(content,id){
                let _self = this
                _self.$bus.$emit("AMEND_PHRASE_DATA",content,id)
            },
            selectArr(id){
                this.delete_phrase_list(id)
                // this.addArr.splice(index.vue,1)
            },
            add_schtask(){
                this.$bus.emit("ADD_SCHTASK")
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
                        quickType: "business"
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
            //         quickType:"business",
            //         quickContent:e,
            //         quickIndex:1,
            //     }
            //     function success(res){
            //         _self.phraseLoading = false
            //         _self.$bus.emit("UPDATE_PHRASE_LIST", true)
            //     }
            //     function fail(err){
            //         _self.phraseLoading = true
            //
            //     }
            //     this.$Post(url, config, success, fail)
            // },
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
                    _self.$bus.emit("UPDATE_PHRASE_LIST", true)
                }
                this.$Get(url, config, success)
            },
            create_task(){
                let _self = this
                if (_self.newMission.taskName==="" ||
                    _self.newMission.companyId==="" ||
                    _self.newMission.businessId ===null){
                    this.$Message.warning('请把上述信息填写完整')
                    return
                }
                _self.createLoading = true
                let url = `api/task/addLegworkTask`
                let executorNameArray = []
                for(let i = 0; i < _self.newMission.executorId.length; i++){
                    executorNameArray.push(_self.allUserList_map.get(_self.newMission.executorId[i].toString()))
                }
                let config = {
                    taskKind: "tkLegBus",
                    taskName: _self.newMission.taskName,
                    companyId: _self.newMission.companyId,
                    taskArea:_self.newMission.businessArea,
                    taskPlace:_self.newMission.businessPlace,
                    executorId: _self.newMission.executorId.join(","),
                    businessId:_self.newMission.businessId,
                    workFlowStatus:_self.newMission.node,
                    // executorName: _self.allUserList_map.get(_self.newMission.executorId.toString()),
                    executorName: executorNameArray.join(","),
                    // taskContent: _self.newMission.taskContent,
                    // taskLevel: _self.newMission.taskLevel,
                    // specificDate: FULLDateFormat(_self.newMission.specificDate),
                    sPlanDate: FULLDateFormat(_self.newMission.planDate),
                    // taskDesCode: _self.newMission.taskDesCode,
                    // taskKind: _self.newMission.taskKind,
                    // taskStage: "tesUnstarted",
                    // followResult: _self.newMission.followResult,
                    // followUpType: _self.newMission.followUpType,
                    // taskLable: _self.newMission.taskLable.join(","),
                    // taskLevelName: _self.taskLevel_map.get(_self.newMission.taskLevel),
                    // taskDescription: _self.taskDesCode_map.get(_self.newMission.taskDesCode),
                    // taskKindName: _self.taskKind_map.get(_self.newMission.taskKind),
                    // taskStageName: "未开始",
                    // creatorName:localStorage.getItem("realname")
                    // followResultName: _self.market_status_map.get(_self.newMission.followResult),
                    // followUpTypeName: _self.markert_follow_up_type_map.get(_self.newMission.followUpType),
                }

                // console.log(config)
                function success(res){
                    _self.createLoading = false
                    _self.openAddMission = false
                    _self.$bus.emit("UPDATE_BUSINESS_TASK_LIST_DEMO", res.data.data.id)
                    _self.$bus.emit("RESET_INNERTEXT",true)
                    _self.cancel_task()
                }

                function fail(err){
                    _self.createLoading = false

                }

                this.$Post(url, config, success, fail)

            },
            cancel_task(){
                this.$refs.select.setQuery(null)
                this.newMission.taskName ="";
                this.newMission.companyId ="";
                this.newMission.businessId ="";
                this.$refs['newMission'].resetFields();
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
                    _self.companyNameList = res.data.data
                }

                this.$Get(url, config, success)
            },
            get_company_name(){
                let _self = this
                let obj = {}
                let arr = _self.companyNameList

                for (let i=0;i<arr.length;i++){
                    let companyname = arr[i].companyname
                    let companyid = arr[i].companyid
                    obj[companyid] = companyname
                }
                _self.newMission.companyName = obj[_self.newMission.companyId]
                console.log(_self.newMission.companyName)
            },
            get_product_name(){
                let _self = this
                let obj = {}
                let arr = _self.productListName

                for (let i=0;i<arr.length;i++){
                    let product = arr[i].product
                    let businessId = arr[i].businessId
                    obj[businessId] = product
                }
                _self.newMission.businessName = obj[_self.newMission.businessId]
                console.log(_self.newMission.businessName)
                _self._self.get_node_name()
            },
            get_node_name(){
                let _self = this
                let obj = {}
                let arr = _self.nodeNameList

                for (let i=0;i<arr.length;i++){
                    let currentProcess = arr[i].currentProcess
                    let businessId = arr[i].businessId
                    obj[businessId] = currentProcess
                }
                _self.newMission.nodeName = obj[_self.newMission.businessId]
                console.log(_self.newMission.nodeName)
                if (_self.newMission.businessName &&  _self.newMission.nodeName) {
                    _self.newMission.taskName=_self.newMission.companyName+"--"+_self.newMission.businessName+"--"+_self.newMission.nodeName
                } else {
                    _self.newMission.taskName=_self.newMission.companyName
                }

            },
            get_businessId(id){
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
                    _self.productListName = res.data.data
                    _self.nodeNameList = res.data.data
                    console.log(res.data.data)
                    if (_self.productList.length!==0){
                        _self.newMission.businessId =  _self.productList[0].businessId
                    }else {
                        _self.newMission.businessId = null
                    }
                    _self.get_company_name()
                    _self.get_product_name()
                    _self.get_node_name()
                }

                this.$Get(url, config, success)
            },
            get_data_center(){
                let params = "taskLevel,taskDesCode,taskKind,taskStage,market_status,markert_follow_up_type,gzbusinessarea,gzbusinessplace"

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
                    _self.taskLevel_map = _self.$array2map(_self.taskLevel)
                    _self.taskDesCode_map = _self.$array2map(_self.taskDesCode)
                    _self.taskKind_map = _self.$array2map(_self.taskKind)
                    _self.taskStage_map = _self.$array2map(_self.taskStage)
                    _self.market_status_map = _self.$array2map(_self.market_status)
                    _self.markert_follow_up_type_map = _self.$array2map(_self.markert_follow_up_type)
                    _self.businessArea_map = _self.$array2map(_self.businessArea)
                    _self.businessPlace_map = _self.$array2map(_self.businessPlace)
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
        created() {
            let _self = this
            this.get_data_center()
            this.get_all_user()
            this.$bus.on("SCHEDULE_CREATE_BUSINESS_TASK",(e)=>{
                console.log(e)
                _self.user = localStorage.getItem("id")
                _self.newMission.executorId = []
                _self.newMission.executorId.push(parseInt(_self.user))

                _self.openAddMission = true
                _self.newMission.planDate = e
            })
            // this.$bus.on("ADD_PHRASE",(e)=>{
            //     console.log(e)
            //     this.add_phrase_list(e)
            // })
            this.$bus.on("UPDATE_PHRASE_LIST",(e)=>{
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