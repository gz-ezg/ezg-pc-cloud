<template>
    <div>
        <Modal
            v-model="show_detail"
            title="查看详情"
            width="100%"
            >
            <Tabs value="name1">
                <TabPane label="任务信息" name="name1" icon="ios-search">
                        <div style="width:600px;margin:auto">
                            <Form ref="task_message" :model="task_message" :label-width="100">
                                <Row :gutter="16">
                                    <Col span="12">
                                        <FormItem prop="companyName" label="基本信息：">
                                            <Input type="text" v-model="task_message.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem prop="companyName" label="文件编号：">
                                            <Input type="text" v-model="task_message.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                 <Row :gutter="16">
                                    <Col span="12">
                                        <FormItem prop="companyName" label="客户名称：">
                                            <Input type="text" v-model="task_message.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem prop="companyName" label="客户电话：">
                                            <Input type="text" v-model="task_message.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                 <Row :gutter="16">
                                    <Col span="12">
                                        <FormItem prop="companyName" label="产品名称：">
                                            <Input type="text" v-model="task_message.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem prop="companyName" label="服务部门：">
                                            <Input type="text" v-model="task_message.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <FormItem prop="companyName" label="服务备注：">
                                         <Input v-model="task_message.companyName" type="textarea" :rows="4" placeholder="Enter something..."></Input>
                                    </FormItem>
                                </Row>
                                <Row>
                                    <FormItem prop="companyName">
                                        <div slot="label">相关人员<Icon type="chevron-down" style="margin-left:3px"></Icon></div>
                                    </FormItem>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="12">
                                        <FormItem prop="companyName" label="服务人员：">
                                            <Input type="text" v-model="task_message.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem prop="companyName" label="联系方式：">
                                            <Input type="text" v-model="task_message.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                 <Row :gutter="16">
                                    <Col span="12">
                                        <FormItem prop="companyName" label="销售人员：">
                                            <Input type="text" v-model="task_message.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem prop="companyName" label="联系方式：">
                                            <Input type="text" v-model="task_message.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <FormItem prop="companyName">
                                        <div slot="label">相关资料：</div>
                                        <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
                                    </FormItem>
                                </Row>   
                            </Form>
                    </div>
                </TabPane>
                <TabPane label="工单流程管理" name="name2" icon="ios-search">
                    <div style="width:600px;margin:auto;border:1px solid #DBDBDB;padding:10px;">
                            <Form ref="workorder" :model="workorder" :label-width="100" style="margin:5px 0;padding:20px;padding-bottom:10px;">
                                <Row :gutter="16">
                                    <Col span="12">
                                        <FormItem prop="companyName" label="预计完成时间：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem prop="companyName" label="接单时间：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                            <div style="border:1px solid #DBDBDB;padding:20px;margin-top:5px;">
                                <Form ref="workorder" :model="workorder" :label-width="100">
                                <Row :gutter="16">
                                    <Col span="24">
                                        <FormItem prop="companyName" label="当前流程：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="12">
                                        <FormItem prop="companyName" label="预计开始时间：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem prop="companyName" label="实际开始时间：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="12">
                                        <FormItem prop="companyName" label="预计完成时间：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem prop="companyName" label="实际完成时间：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="24">
                                        <FormItem prop="companyName" label="服务备注：">
                                            <Input type="textarea" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="24">
                                        <FormItem prop="companyName" label="停滞原因：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="24">
                                        <FormItem prop="companyName" label="解决方案：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <div style="border:1px solid #DBDBDB;padding:20px;margin-top:5px;">
                                <Form ref="workorder" :model="workorder" :label-width="100">
                                <Row :gutter="16">
                                    <Col span="24">
                                        <FormItem prop="companyName" label="当前流程：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="12">
                                        <FormItem prop="companyName" label="预计开始时间：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem prop="companyName" label="实际开始时间：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="12">
                                        <FormItem prop="companyName" label="预计完成时间：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem prop="companyName" label="实际完成时间：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="24">
                                        <FormItem prop="companyName" label="服务备注：">
                                            <Input type="textarea" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="24">
                                        <FormItem prop="companyName" label="停滞原因：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="24">
                                        <FormItem prop="companyName" label="解决方案：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <div style="border:1px solid #DBDBDB;padding:20px;margin-top:5px;">
                                <Form ref="workorder" :model="workorder" :label-width="100">
                                <Row :gutter="16">
                                    <Col span="24">
                                        <FormItem prop="companyName" label="当前流程：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="12">
                                        <FormItem prop="companyName" label="预计开始时间：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem prop="companyName" label="实际开始时间：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="12">
                                        <FormItem prop="companyName" label="预计完成时间：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem prop="companyName" label="实际完成时间：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="24">
                                        <FormItem prop="companyName" label="服务备注：">
                                            <Input type="textarea" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="24">
                                        <FormItem prop="companyName" label="停滞原因：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="24">
                                        <FormItem prop="companyName" label="解决方案：">
                                            <Input type="text" v-model="workorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </TabPane>
                <TabPane label="服务记录动态" name="name3" icon="ios-search">
                    
                </TabPane>
                <TabPane label="相关在服工单" name="name4" icon="ios-search">
                    <div style="width:600px;margin:auto">
                        <div style="border:1px #dbdbdb solid;padding:10px;margin-top:5px;">
                        <Form ref="relatedorder" :model="relatedorder" :label-width="100" style="margin:5px 0;padding:20px">
                                <Row :gutter="16">
                                    <Col span="12">
                                        <FormItem prop="companyName" label="公司名称：">
                                            <Input type="text" v-model="relatedorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem prop="companyName" label="所办服务：">
                                            <Input type="text" v-model="relatedorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="12">
                                        <FormItem prop="companyName" label="目前进度：">
                                            <Input type="text" v-model="relatedorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem prop="companyName" label="服务部门：">
                                            <Input type="text" v-model="relatedorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="12">
                                        <FormItem prop="companyName" label="服务人员：">
                                            <Input type="text" v-model="relatedorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem prop="companyName" label="联系方式：">
                                            <Input type="text" v-model="relatedorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                    </div>
                    <div style="border:1px #dbdbdb solid;padding:10px;margin-top:5px">
                        <Form ref="relatedorder" :model="relatedorder" :label-width="100" style="margin:5px 0;padding:20px">
                                <Row :gutter="16">
                                    <Col span="12">
                                        <FormItem prop="companyName" label="公司名称：">
                                            <Input type="text" v-model="relatedorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem prop="companyName" label="所办服务：">
                                            <Input type="text" v-model="relatedorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="12">
                                        <FormItem prop="companyName" label="目前进度：">
                                            <Input type="text" v-model="relatedorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem prop="companyName" label="服务部门：">
                                            <Input type="text" v-model="relatedorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="12">
                                        <FormItem prop="companyName" label="服务人员：">
                                            <Input type="text" v-model="relatedorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem prop="companyName" label="联系方式：">
                                            <Input type="text" v-model="relatedorder.companyName" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </TabPane>                
            </Tabs>
            <div slot="footer">
                <Button type="ghost" @click="show_detail=false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Bus from '../../../../components/bus'

export default {
    data(){
        return {
            show_detail:false,
            //  任务信息
            task_message:{
                companyName:'1111111111'
            },
            //  工单流程管理
            workorder:{
                companyName:'1111111111'
            },
            //  服务动态记录
            serivelist:{
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
        Bus.$on('myCommonTask',(e)=>{
            _self.show_detail = true
        })
    }
}
</script>

<style scoped>
    .ivu-modal{
        top:0px;
    }
    .top{
        padding: 10px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
</style>
