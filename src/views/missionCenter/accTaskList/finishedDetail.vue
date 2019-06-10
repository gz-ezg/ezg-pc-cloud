<template>
    <Modal
            title="查看详情"
            v-model="openAddMission"
            width="800"
            :mask-closable="false"
            class-name="vertical-top-modal"
    >
        <Card>
            <Form ref="newMission" :model="data" :label-width="100" style="margin-left:50px;margin-right:50px">
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="公司名称">
                            <Input type="textarea" v-model="fieldDetail.CompanyName" :autosize="true" readonly></Input>
                        </FormItem>
                    </Col>

                </Row>
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="上门时间">
                            <Input v-model="fieldDetail.begin_time" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="离开时间">
                            <Input v-model="fieldDetail.end_time" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="外勤时长">
                            <Input v-model="dateLength" size="small" disabled></Input>
                        </FormItem>
                    </Col>
                    <Col span="12" v-if="fieldDetail.task_kind=='会计代账'">
                        <FormItem label="外勤类型">
                            <Input v-model="fieldDetail.type" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="外勤类型" v-if="fieldDetail.task_kind!=='会计代账'">
                            <Input v-model="fieldDetail.task_kind" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="服务内容">
                            <Input v-model="fieldDetail.service_content" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                    <Col span="12" v-if="fieldDetail.task_kind=='商事外勤'">
                        <FormItem label="服务节点">
                            <Input v-model="fieldDetail.process" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="24">
                        <FormItem label="第一次打卡地址">
                            <Input v-model="fieldDetail.begin_address" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="24">
                        <FormItem label="第一次打卡说明">
                            <Input v-model="fieldDetail.begin_memo" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="24">
                        <FormItem label="第二次打卡地址">
                            <Input v-model="fieldDetail.end_address" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="24">
                        <FormItem label="备注总结">
                            <Input v-model="fieldDetail.finish_memo" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="18">
                        <FormItem label="外勤结果">
                            <Input v-model="fieldDetail.finish_status" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="23">
                        <FormItem prop="Providentfund" label="开始打卡照片：" style="margin:5px" disabled >
                            <Row  v-if="beginImgList" v-for="(item,index) in beginImgList " :key="index">
                                <!-- <a target="_blank" :href="'api/assets/' + item.realpath" >
                                    <img :src="'api/assets/' + item.realpath" alt=""  width="100" height="100">
                                </a> -->
                                <a target="_blank" :href="'/api/assets/' + item" >
                                    <img :src="'/api/assets/' +item" alt=""  width="100" height="100" onerror="this.src='/api/assets/upload/commonImg/error.jpg';this.onerror=null">
                                </a>
                            </Row>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="23">
                        <FormItem prop="Providentfund" label="结束打卡照片：" style="margin:5px" disabled >
                            <Row v-if="endImgList" v-for="(item,index) in endImgList " :key="index">
                                <!-- <a target="_blank" :href="'api/assets/' + item.realpath" >
                                    <img :src="'api/assets/' + item.realpath" alt=""  width="100" height="100">
                                </a> -->
                                <a target="_blank" :href="'/api/assets/' + item" >
                                    <img :src="'/api/assets/' +item" alt=""  width="100" height="100" onerror="this.src='/api/assets/upload/commonImg/error.jpg';this.onerror=null">
                                </a>
                            </Row>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Card>
        <!--<Row :gutter="20" style="margin-top:20px">-->
        <!--<Col span="6">-->
        <!--<span style="line-height:24px">商事任务对象</span>-->
        <!--</Col>-->
        <!--<Col span="18">-->
        <!--<span style="line-height:24px">{{data.companyName}}</span>-->
        <!--</Col>-->
        <!--</Row>-->
        <div slot="footer">
            <Button @click="cancel_task" type="primary">关闭</Button>
        </div>
    </Modal>
</template>

<script>
    import {DateDifference} from "../../../libs/utils";
    export default {
        name: "finishedDetail",
        data(){
            return{
                openAddMission:false,
                data:[],
                fieldDetail:[],
                beginImgList:[],
                endImgList:[],
                dateLength:"",
                taskKind:"",
                taskKind_map:new Map()
                // taskKind:[],
                // taskKind_map:new Map(),
                // taskArea:[],
                // taskArea_map:new Map(),
                // taskPlace:[],
                // taskPlace_map:new Map()
            }
        },
        methods:{
            cancel_task(){
                this.openAddMission = false
            },
            add_customer(){
                this.$bus.emit('OPEN_CREATE_MODAL',true);
            },
            get_data(e){
                let _self = this
                let url = `api/user/legwork/task/detail`
                let config = {
                    params:{
                        legworkTaskId: e.row.legId,
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
                    if (_self.fieldDetail.type=="A"){
                    _self.fieldDetail.type = "A类外勤"
                    }
                    if (_self.fieldDetail.type=="B"){
                        _self.fieldDetail.type = "B类外勤"
                    }
                    _self.fieldDetail.task_kind = _self.taskKind_map.get(_self.fieldDetail.task_kind)
                    console.log(_self.fieldDetail.task_kind)

                    _self.beginImgList = res.data.data.begin_realpath.split(",")
                    _self.endImgList = res.data.data.end_realpath.split(",")
                    _self.dateLength = DateDifference(res.data.data.begin_time,res.data.data.end_time)
                    console.log(_self.dateLength)
                    console.log(_self.beginImgList)
                    console.log(_self.endImgList)
                    console.log(_self.fieldDetail)
                }

                function fail(err){

                }

                this.$Get(url, config, success, fail)
            },
            get_data_center(){
                let _self = this
                return new Promise((resolve, reject)=>{
                    let _self = this
                    let params = "taskKind";

                    function success(res){
                        _self.taskKind = res.data.data.taskKind

                        _self.taskKind_map = _self.$array2map(_self.taskKind)
                        resolve()
                    }
                    this.$GetDataCenter(params, success)
                })
            },
        },
        created() {
            this.$bus.on("SHOW_FINISHED_DETAILS",(e)=>{
                this.openAddMission = true
                this.get_data_center()
                this.get_data(e)
                this.data = e.row
            })

        }
    }
</script>

<style>
    .vertical-top-modal .ivu-modal{
        top: 0;
    }
</style>