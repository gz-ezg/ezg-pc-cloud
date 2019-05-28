<template>
    <Modal
            title="查看详情"
            v-model="openAddMission"
            width="800"
            :mask-closable="false"
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
                        <FormItem label="执行人">
                            <Input v-model="data.executorName" size="small" disabled></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="客户">
                            <Input v-model="data.customerName" size="small" readonly></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem>
                            <Button size="small" type="primary" @click="customer_detail">客户详情</Button>
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
                <!--<Row :gutter="12">-->
                    <!--<Col span="12">-->
                        <!--<FormItem label="任务结果">-->
                            <!--<Input v-model="data.mission_name" size="small" readonly></Input>-->
                        <!--</FormItem>-->
                    <!--</Col>-->
                    <!--<Col span="12">-->
                        <!--<FormItem label="任务类型">-->
                            <!--<Input v-model="data.taskKind" size="small" readonly></Input>-->
                        <!--</FormItem>-->
                    <!--</Col>-->
                <!--</Row>-->
                <Row :gutter="12">
                    <Col span="12">
                        <FormItem label="任务总结">
                            <Input type="textarea" v-model="data.taskContent" :autosize="true" readonly></Input>
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
    export default {
        name: "detail",
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
            customer_detail(){
                this.$store.commit('open_gobal_customer_detail_modal', {ID: this.data.customer_id});
            }
        },
        created() {
            this.$bus.on("SHOW_DETAILS",(e)=>{
                this.openAddMission = true
                this.data = e.row
            })
            this.$bus.on("SHOW_OBSOLETE_DETAILS",(e)=>{
                this.openAddMission = true
                this.data = e.row
            })
        }
    }
</script>

<style>

</style>