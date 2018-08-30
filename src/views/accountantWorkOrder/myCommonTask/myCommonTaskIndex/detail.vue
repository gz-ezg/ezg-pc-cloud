<template>
    <div>
        <Modal
                v-model="show_detail"
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
                                        <Col span="24">
                                        <FormItem label="公司名称：" prop="Input">
                                            <Input size="small" v-model="task_message.companyname" readonly></Input>
                                        </FormItem>
                                        </Col>
                                        <!-- <Col span="12">
                                        <FormItem label="文件编号：" prop="Input">
                                            <Input size="small" v-model="task_message.companyName" readonly></Input>
                                        </FormItem>
                                        </Col> -->
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                        <FormItem label="客户名称：" prop="Input">
                                            <Input size="small" v-model="task_message.name" readonly></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="12">
                                        <FormItem label="客户电话：" prop="Input">
                                            <Input size="small" v-model="task_message.tel" readonly></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                        <FormItem label="产品名称：" prop="Input">
                                            <Input size="small" v-model="task_message.product" readonly></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="12">
                                        <FormItem label="服务部门：" prop="Input">
                                            <Input size="small" v-model="task_message.departname" readonly></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="24">
                                        <FormItem label="服务备注：" prop="backup">
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
                                            <Input size="small" v-model="task_message.servername" readonly></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="12">
                                        <FormItem label="联系方式：" prop="Input">
                                            <Input size="small" v-model="task_message.servertel" readonly></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                        <FormItem label="销售人员：" prop="Input">
                                            <Input size="small" v-model="task_message.followbyrealname" readonly></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="12">
                                        <FormItem label="联系方式：" prop="Input">
                                            <Input size="small" v-model="task_message.followbytel" readonly></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Panel>
                    </Collapse>
                </TabPane>
                <TabPane label="相关在服工单" name="name44" >
                        <Scroll height="500">
                        <div v-if="!correlation.length"><center>暂无数据</center></div>
                            <div v-for="(item, index) in correlation" :key=index>
                                <Form ref="item" :model="item" :label-width="100" style="margin:10px;padding:5px;padding-top:10px;border:1px solid #EEE9E9" >
                                    <Row>
                                        <Col span="1" style="visibility:hidden"></Col>                            
                                        <Col span="10">
                                        <FormItem label="公司名称：">
                                            <Input size="small" v-model="item.companyname" readonly></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="10">
                                        <FormItem label="所办服务：">
                                            <Input size="small" v-model="item.product" readonly></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="1" style="visibility:hidden"></Col>                            
                                        <Col span="10">
                                        <FormItem label="目前进度：">
                                            <Input size="small" v-model="item.CurrentProcess" readonly></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="10">
                                        <FormItem label="服务部门：">
                                            <Input size="small" v-model="item.departname" readonly></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="1" style="visibility:hidden"></Col>                            
                                        <Col span="10">
                                        <FormItem label="服务人员：">
                                            <Input size="small" v-model="item.servername" readonly></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="10">
                                        <FormItem label="联系方式：">
                                            <Input size="small" v-model="item.servertel" readonly></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                            <div v-if="correlation.length" style="padding-bottom:10px"><center>没有更多数据了！</center></div>
                    </Scroll>
                </TabPane>
            </Tabs>
            <div slot="footer">
                <!-- <Button type="primary" @click="show_detail=false">确定</Button> -->
                <Button type="ghost" @click="show_detail=false">关闭</Button>
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
import Bus from '../../../../components/bus'
// import Bscroll   from 'better-scroll'

export default {
    data(){
        return {
            value1:[1,2],
            //  当前行
            current_row:'',
            //  弹出框
            show_detail:false,
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
    created(){
        var _self = this
        Bus.$on('myCommonTask',(e)=>{
            _self.current_row = e
            _self.show_detail = true
            _self.getData()
        })
    },
    methods:{
        getData(){
            let _self = this
            let url = `api/order/workOrderDetail?workOrderId=${_self.current_row.id}`
            this.$http.get(url).then(function(res){
                _self.$backToLogin(res)  
                _self.task_message = res.data.data.taskInfo[0]
                _self.process = res.data.data.process
                _self.correlation = res.data.data.correlation
                // _self.$nextTick(() => {
                //     _self.scroll = new Bscroll(_self.$refs.wrapper, {
                //         // scrollbar:{
                //         //     fade: false
                //         // },
                //         mouseWheel:{
                //             speed: 20,
                //             invert: false,
                //             easeTime: 300
                //         }
                //     })
                // })
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
