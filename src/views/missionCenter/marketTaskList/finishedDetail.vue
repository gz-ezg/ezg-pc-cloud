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
                        <FormItem label="任务名称">
                            <Input type="textarea" v-model="data.taskName" :autosize="true" readonly></Input>
                        </FormItem>
                    </Col>

                </Row>
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="公司名称">
                            <Input v-model="data.companyName" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="客户">
                            <Input v-model="data.customerName" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="执行人">
                            <Input v-model="data.executorName" size="small" disabled></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="任务类型">
                            <Input v-model="data.taskKind" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="代办于">
                            <Input v-model="data.planDate" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="跟进阶段">
                            <Input v-model="data.follow_result_name" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12" v-if="data.taskKindName=='普通任务'">
                    <Col span="12">
                        <FormItem label="任务结果">
                            <Input v-model="data.mission_name" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12" v-if="data.taskKindName=='普通任务'">
                    <Col span="12">
                        <FormItem label="结束时间">
                            <Input v-model="data.expectEndDate" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="任务总结">
                            <Input type="textarea" v-model="data.taskSummary" :autosize="true" readonly></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12" v-if="data.taskKindName=='市场外勤'">
                    <Col span="12">
                        <FormItem label="外勤开始时间">
                            <Input v-model="fieldDetail.begin_time" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="开始打卡地点">
                            <Input v-model="fieldDetail.begin_address" size="small" disabled></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12" v-if="data.taskKindName=='市场外勤'">
                    <Col span="12">
                        <FormItem label="外勤结束时间">
                            <Input v-model="fieldDetail.end_time" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="结束打卡地点">
                            <Input v-model="fieldDetail.end_address" size="small" disabled></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12" v-if="data.taskKindName=='市场外勤'">
                    <Col span="12">
                        <FormItem label="外勤结果">
                            <Input v-model="fieldDetail.finish_status" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="开始打卡备注">
                            <Input v-model="fieldDetail.begin_memo" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12" v-if="data.taskKindName=='市场外勤'">
                    <Col span="12">
                        <FormItem label="外勤总结">
                            <Input v-model="fieldDetail.finish_memo" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                    <Col span="12" v-if="data.follow_result==='Party' || data.follow_result==='Visit'">
                        <FormItem>
                            <Button size="small" type="primary" @click="add_customer">新增客户</Button>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" v-if="data.taskKindName=='市场外勤'">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="11">
                        <FormItem prop="Providentfund" label="开始打卡照片：" style="margin:5px" disabled >
                            <Row v-for="(item,index) in beginImgList " :key="index">
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
                <Row :gutter="16" v-if="data.taskKindName=='市场外勤'">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="11">
                        <FormItem prop="Providentfund" label="结束打卡照片：" style="margin:5px" disabled >
                            <Row v-for="(item,index) in endImgList " :key="index">
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
        <create></create>
    </Modal>
</template>

<script>
    import {DateDifference} from "../../../libs/utils";
    import create from './create'
    export default {
        name: "finishedDetail",
        components:{
            create
        },
        data(){
            return{
                openAddMission:false,
                data:[],
                fieldDetail:[],
                beginImgList:[],
                endImgList:[]
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
                        _self.fieldDetail.finish_status = "完成"
                    }
                    if (_self.fieldDetail.finish_status=="wuxiao"){
                        _self.fieldDetail.finish_status = "未完成"
                    }
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
            }
        },
        created() {
            this.$bus.on("SHOW_FINISHED_DETAILS",(e)=>{
                this.openAddMission = true
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