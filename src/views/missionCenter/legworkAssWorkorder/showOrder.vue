<template>
    <Modal
            title="查看工单协助"
            v-model="openAddMission"
            width="800"
            :mask-closable="false"
    >
        <div  v-if="data.length!==0">
            <Form ref="newMission" :model="newMission" :label-width="80" style="margin-left:50px;margin-right:50px">
                <Input v-model="data[0].apply_content" style="margin-bottom: 25px" type="textarea" placeholder="请输入要修改的协助工单缘由" :autosize="{minRows: 4,maxRows: 6}" readonly></Input>
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
                            <Input v-model="data[0].type" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="外勤名称" prop="cycleTypeId">
                            <Input v-model="data[0].legwork_name" readonly/>
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
                            <Input v-model="data.excutor_name" readonly/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
        <div slot="footer">
            <Button @click="cancel_task" type="primary">关闭</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        name: "showOrder",
        data(){
            return{
                data:[],
                openAddMission:false
            }
        },
        methods:{
            cancel_task(){
                this.openAddMission = false
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
        },
        created() {
            this.$bus.on("OPEN_ORDERLIST_DETAIL", (e)=>{
                this.openAddMission = true
                this.get_data(e)
            })
        }
    }
</script>

<style>

</style>