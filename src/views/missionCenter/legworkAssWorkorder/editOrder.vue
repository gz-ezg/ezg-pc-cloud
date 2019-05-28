<template>
    <Modal
            title="修改工单协助"
            v-model="openAddMission"
            width="800"
            :mask-closable="false"
    >
        <div  v-if="data.length!==0">
            <Form ref="newMission" :model="newMission" :label-width="80" style="margin-left:50px;margin-right:50px">
                <Input v-model="data[0].apply_content" style="margin-bottom: 25px" type="textarea" placeholder="请输入要修改的协助工单缘由" :autosize="{minRows: 4,maxRows: 6}" ></Input>
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="企业" prop="companyId">
                            <Input v-model="data[0].companyname" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="产品" prop="companyId">
                            <Input v-model="data[0].productName" readonly/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12" v-if="data[0].business_id===-1">
                    <Col span="12">
                        <FormItem label="外勤类型" prop="cycleType">
                            <Select v-model="data[0].type" type="text" transfer @on-change="get_type_list">
                                <Option v-for="(item,index) in cycleTypeList" :key="index" :value="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="外勤名称" prop="cycleTypeId">
                            <Select v-model="data[0].apply_type_id" type="text" transfer>
                                <Option v-for="(item,index) in cycleTypeNameList" :key="index" :value="item.id">{{item.legwork_name}}</Option>
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
                    <!-- <Col span="12">
                        <FormItem label="提醒时间">
                            <DatePicker type="datetime" v-model="newMission.specificDate" style="width:100%"></DatePicker>
                        </FormItem>
                    </Col> -->
                    <Col span="12">
                        <FormItem label="负责人" prop="executorId">
                            <Input v-model="data[0].excutor_name" readonly/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
        <div slot="footer">
            <Button @click="update_task" type="primary" :loading="createLoading">修改</Button>
            <Button @click="cancel_task" type="ghost">清空</Button>
        </div>
    </Modal>
</template>

<script>
    import {FULLDateFormat} from "../../../libs/utils";

    export default {
        name: "editOrder",
        data(){
            return{
                openAddMission:false,
                loading:false,
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
                    for(let i = 0; i < _self.data.length; i++){
                        _self.data[i].task_area = _self.taskArea_map.get(_self.data[i].task_area)
                        _self.data[i].task_place = _self.taskPlace_map.get(_self.data[i].task_place)
                    }
                    _self.loading = false
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
            },
            get_type_list(){
                let _self = this
                let url = `api/user/legwork/cycle/type/list`
                _self.userLoading = true

                let config = {
                    params: {
                        type:_self.data[0].type
                    }
                }

                function success(res){
                    _self.userLoading = false
                    _self.cycleTypeNameList = res.data.data
                    if (_self.cycleTypeNameList.length!==0){
                        _self.data[0].apply_type_id = _self.cycleTypeNameList[0].id
                    }else {
                        _self.data[0].apply_type_id = null
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
                    _self.cycleTypeNameList = res.data.data
                }
                this.$Get(url, config, success)
            },
            cancel_task(){
                this.data[0].apply_content = null
                this.data[0].expect_date = null
            },
            update_task(){
                let _self = this
                let url = `api/task/updateBusAssApply`
                let config = {
                    applyId:_self.data[0].id,
                    companyId:_self.data[0].company_id,
                    applyTypeId:_self.data[0].apply_type_id,
                    businessId:_self.data[0].business_id,
                    applyContent:_self.data[0].apply_content,
                    expectDate:FULLDateFormat(_self.data[0].expect_date),
                    excutorId:_self.data[0].excutor_id,
                    excutorName:_self.data[0].excutor_name
                }
                function success(res){
                    _self.$bus.emit("UPDATE_ORDER_LIST",true)
                    _self.get_data(_self.data[0].id)
                    _self.openAddMission = false
                }
                function fail(){

                }
                this.$Post(url,config,success,fail)
            }
        },
        created() {
            this.$bus.on("OPEN_ORDERLIST_EDIT",(e)=>{
                this.openAddMission = true
                this.loading = true
                this.get_data_center().then(
                    this.get_data(e)
                )
                this.get_type_list_start(e.type)
            })
        }
    }
</script>

<style>

</style>