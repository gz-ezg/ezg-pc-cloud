<template>
    <div>
        <Modal
                v-model="show_detail4"
                title="查看详情"
                width="70%"
            >
            <Tabs value="name11">
                <TabPane label="任务信息" name="name11">
                    <Collapse v-model="value1">
                        <Panel name="1">
                            基本信息
                            <div slot="content">
                                <Form ref="task_message" :model="task_message" :label-width="90">
                                    <Row>
                                        <Col span="12">
                                        <FormItem label="公司名称：" prop="Input">
                                            <Input v-model="task_message.companyname" readonly></Input>
                                        </FormItem>
                                        </Col>
                                        <!-- <Col span="12">
                                        <FormItem label="文件编号：" prop="Input">
                                            <Input v-model="task_message.companyName" readonly></Input>
                                        </FormItem>
                                        </Col> -->
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
                        <!-- <Panel name="3">
                            相关资料
                            <p slot="content"></p>
                        </Panel> -->
                    </Collapse>
                </TabPane>
                <!-- <TabPane label="工单流程管理" name="name22">
                    <Row >
                        <Form :label-width="120">
                            <Col span="12">
                                <FormItem label="预计完成时间：">
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="接单时间：">
                                </FormItem>
                            </Col>
                        </Form>
                    </Row>
                    <div v-for="(item,index) in process" :key="index" style="margin:15px 10px;border:1px solid #CFCFCF">
                        <Form :model="item" :label-width="120" style="margin:15px;">
                        <Row>
                            <Col span="24">
                            <FormItem label="当前流程：" prop="Input">
                                <Input v-model="item.process" readonly></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                            <FormItem label="预计开始时间：" prop="Input">
                                <Input v-model="item.prestartdate" readonly></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="实际开始时间：" prop="Input">
                                <Input v-model="item.startdate" readonly></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                            <FormItem label="预计完成时间：" prop="Input">
                                <Input v-model="item.preenddate" readonly></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="实际完成时间：" prop="Input">
                                <Input v-model="item.enddate" readonly></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                            <FormItem label="服务备注：" prop="customerMemo">
                                <Input size="small" type="textarea" v-model="item.backup" readonly></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                            <FormItem label="停滞原因：" prop="Input">
                                <Input v-model="item.outTimeReason" readonly></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                            <FormItem label="解决方案：" prop="Input">
                                <Input v-model="item.resolvePlan" readonly></Input>
                            </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    </div>
                </TabPane> -->
                <!-- <TabPane label="服务记录动态" name="name33">
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="ios-color-wand-outline" @click="huashu = true">话术管理</Button>
                            <Button type="primary" icon="plus" @click="downloadExcel">添加记录</Button>
                        </ButtonGroup>
                    </Row>
                </TabPane>  -->
                <TabPane label="相关在服工单" name="name44">
                    <Form ref="task_message" :model="task_message" :label-width="100" style="margin-top: 10px">
                        <Row>
                            <Col span="1" style="visibility:hidden"></Col>                            
                            <Col span="10">
                            <FormItem label="公司名称：" prop="Input">
                                <Input v-model="task_message.companyName" readonly></Input>
                            </FormItem>
                            </Col>
                            <Col span="10">
                            <FormItem label="所办服务：" prop="Input">
                                <Input v-model="task_message.companyName" readonly></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="1" style="visibility:hidden"></Col>                            
                            <Col span="10">
                            <FormItem label="目前进度：" prop="Input">
                                <Input v-model="task_message.companyName" readonly></Input>
                            </FormItem>
                            </Col>
                            <Col span="10">
                            <FormItem label="服务部门：" prop="Input">
                                <Input v-model="task_message.companyName" readonly></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="1" style="visibility:hidden"></Col>                            
                            <Col span="10">
                            <FormItem label="服务人员：" prop="Input">
                                <Input v-model="task_message.companyName" readonly></Input>
                            </FormItem>
                            </Col>
                            <Col span="10">
                            <FormItem label="联系方式：" prop="Input">
                                <Input v-model="task_message.companyName" readonly></Input>
                            </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </TabPane>
            </Tabs>
            <div slot="footer">
                <Button type="primary" @click="save_detail">确定</Button>
                <Button type="ghost" @click="show_detail4=false">关闭</Button>
            </div>
        </Modal>
        <!-- <Modal
                v-model="huashu"
                title="话术管理"
                @on-ok="ok"
                @on-cancel="cancel">
            <ButtonGroup>
                <Button type="primary" icon="plus" @click="huashu = true">添加</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">删除</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">使用话术</Button>
            </ButtonGroup>
        </Modal> -->
    </div>
</template>

<script>
import Bus from '../../../../../components/bus'

export default {
    data(){
        return {
            value1:[1,2],
            //  当前行
            current_row4:'',
            //  弹出框
            show_detail4:false,
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
            relatedorder:{
                companyName:'1111111111'
            }
        }
    },
    created(){
        var _self = this
        Bus.$on('myCommonTask4',(e)=>{
            _self.current_row4 = e
            // console.log(e)
            _self.show_detail4 = true
            _self.getData()
        })
    },
    methods:{
        getData(){
            let _self = this
            let url = `api/order/workOrderDetail?workOrderId=${_self.current_row.id}`
            this.$http.get(url).then(function(res){
                console.log(res.data.data)
                _self.task_message = res.data.data.taskInfo[0]
                _self.process = res.data.data.process
            })
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
