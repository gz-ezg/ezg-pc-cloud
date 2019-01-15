<template>
    <div>
        <Modal
                v-model="show_allot_detail"
                title="查看详情"
                width="70%"
                @on-cancel="close"
            >
            <div v-if="loading" style="height:300px">
                <Spin fix></Spin>
            </div>
            <Tabs v-model="tabshow" v-else>
                <TabPane label="任务信息" name="name11">
                    <Collapse v-model="value1">
                        <Panel name="1">
                            基本信息
                            <div slot="content">
                                <Form ref="task_message" :model="task_message" :label-width="90">
                                    <Row>
                                        <Col span="24">
                                        <FormItem label="公司名称：" prop="Input">
                                            <Input v-model="task_message.companyname" readonly></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                        <FormItem label="客户名称：" prop="Input">
                                            <Input v-model="task_message.name" readonly></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="12">
                                        <FormItem label="客户电话：" prop="Input">
                                            <Input v-model="task_message.tel" readonly></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                        <FormItem label="产品名称：" prop="Input">
                                            <Input v-model="task_message.product" readonly></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="12">
                                        <FormItem label="服务部门：" prop="Input">
                                            <Input v-model="task_message.departname" readonly></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="24">
                                        <FormItem label="服务备注：" prop="customerMemo">
                                            <Input size="small" type="textarea" v-model="task_message.backup"/>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Panel>
                        <Panel name="2">
                            相关联系人
                            <div slot="content">
                                <Form ref="task_message" :model="task_message" :label-width="90">
                                    <Row>
                                        <Col span="12">
                                        <FormItem label="服务人员：" prop="Input">
                                            <Input v-model="task_message.servername" readonly></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="12">
                                        <FormItem label="联系方式：" prop="Input">
                                            <Input v-model="task_message.servertel" readonly></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                        <FormItem label="销售人员：" prop="Input">
                                            <Input v-model="task_message.followbyrealname" readonly></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="12">
                                        <FormItem label="联系方式：" prop="Input">
                                            <Input v-model="task_message.followbytel" readonly></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Panel>
                    </Collapse>
                </TabPane>
                <TabPane label="相关在服工单" name="name44">
                    <Row>
                        <Scroll height="500">
                                <div v-if="!correlation.length"><center>暂无数据</center></div>
                                <div v-for="(item, index) in correlation" :key=index >
                                    <Form ref="item" :model="item" :label-width="100" style="margin:10px;padding:5px;padding-top:10px;border:1px solid #EEE9E9">
                                        <Row>
                                            <Col span="1" style="visibility:hidden"></Col>                            
                                            <Col span="10">
                                            <FormItem label="公司名称：">
                                                <Input v-model="item.companyname" readonly></Input>
                                            </FormItem>
                                            </Col>
                                            <Col span="10">
                                            <FormItem label="所办服务：">
                                                <Input v-model="item.product" readonly></Input>
                                            </FormItem>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span="1" style="visibility:hidden"></Col>                            
                                            <Col span="10">
                                            <FormItem label="目前进度：">
                                                <Input v-model="item.CurrentProcess" readonly></Input>
                                            </FormItem>
                                            </Col>
                                            <Col span="10">
                                            <FormItem label="服务部门：">
                                                <Input v-model="item.departname" readonly></Input>
                                            </FormItem>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span="1" style="visibility:hidden"></Col>                            
                                            <Col span="10">
                                            <FormItem label="服务人员：">
                                                <Input v-model="item.servername" readonly></Input>
                                            </FormItem>
                                            </Col>
                                            <Col span="10">
                                            <FormItem label="联系方式：">
                                                <Input v-model="item.servertel" readonly></Input>
                                            </FormItem>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            <!-- </div>
                        </div> -->
                        </Scroll>
                    </Row>
                </TabPane>
            </Tabs>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>

<script>

export default {
    props: {
        workOrderId: {
            type: [String, Number],
            default: ""
        }
    },
    data(){
        return {
            loading: true,
            show_allot_detail: true,
            tabshow:"name11",
            //  当前行
            value1:[1,2],
            current_row:'',
            huashu:false,
            //  任务信息
            task_message:{
                id:'',
                companyname:'',
                name:'',
                tel:'',
                product:'',
                departname:'',
                servername:'',
                servertel:'',
                followbyrealname:'',
                followbytel:'',
                backup:''
            },
            //  工单流程管理
            process:{
                companyName:'1111111111'
            },
            //  相关在服工单
            correlation:{
            }
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            let _self = this

            let url = `api/order/workOrderDetail`

            let config = {
                params: {
                    workOrderId: _self.workOrderId
                }
            }

            function success(res){
                _self.task_message = res.data.data.taskInfo.length?res.data.data.taskInfo[0]:{}
                _self.process = res.data.data.process
                _self.correlation = res.data.data.correlation
                _self.loading = false
            }
            
            function fail(err){
                _self.$Message.error("对不起，当前查询的工单有误！请确认后重试！窗口将在2秒后关闭！")
            }

            this.$Get(url, config, success, fail)
        },
        close(){
            this.$store.commit("close_gobal_work_order_detail_modal")
        }       
    }
}
</script>

<style>
    /* .ivu-modal{
        top:0px;
    } */
    .top{
        padding: 10px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
</style>
