<template>
    <div>
        <Modal
                v-model="detail"
                title="客户详情"
                width="90%"
        >
            <Form ref="task_message" :model="task_message" :label-width="120">
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="姓名：">
                            <Input size="small" type="text" v-model="task_message.companyName"  />
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="电话：">
                            <Input size="small" type="text" v-model="task_message.companyName"  />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="区域：">
                            <Input size="small" type="text" v-model="task_message.companyName"  />
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="地址：">
                            <Input size="small" type="text" v-model="task_message.companyName"  />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="客户状态：">
                            <Input size="small" type="text" v-model="task_message.companyName" />
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="是否发送短信：">
                            <Input size="small" type="text" v-model="task_message.companyName"  />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="固定电话：">
                            <Input size="small" type="text" v-model="task_message.companyName"  />
                        </FormItem>
                    </Col>
                    <Col span="10">
                            <FormItem prop="companyName" label="QQ：">
                            <Input size="small" type="text" v-model="task_message.companyName"  />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="微信：">
                            <Input size="small" type="text" v-model="task_message.companyName" />
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="客户重要等级：">
                            <Input size="small" type="text" v-model="task_message.companyName" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="客户来源：">
                            <Input size="small" type="text" v-model="task_message.companyName"  />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="20">
                        <FormItem label="备注" prop="desc">
                            <Input size="small" v-model="task_message.companyName" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <Row style="margin-top: 10px">
                <Tabs value="name1">
                    <TabPane label="客户记录" name="name1">
                        <customer-records></customer-records>
                    </TabPane>
                    <TabPane label="公司明细" name="name2">
                        <campany-detail></campany-detail>
                    </TabPane>
                    <TabPane label="工单明细" name="name3">
                        <work-order-detail></work-order-detail>
                    </TabPane>
                    <TabPane label="客户关系人" name="name4">
                        <client-relation></client-relation>
                    </TabPane>
                    <TabPane label="客户回访" name="name5">
                        <customers-pay-return-visit></customers-pay-return-visit>
                    </TabPane>
                    <TabPane label="下线客户" name="name6">
                        <offline-customer></offline-customer>
                    </TabPane>
                </Tabs>
            </Row>
        </Modal>
    </div>
</template>

<script>
    import Bus from '../../../../components/bus'
    import CustomerRecords from './customerRecords'
    import CampanyDetail from './campanyDetail'
    import WorkOrderDetail from './workOrderDetail'
    import ClientRelation from './clientRelation'
    import CustomersPayReturnVisit from './customersPayReturnVisit'
    import OfflineCustomer from './offlineCustomer'

    export default {
        components:{
            OfflineCustomer,
            WorkOrderDetail,
            CampanyDetail,
            ClientRelation,
            CustomersPayReturnVisit,
            CustomerRecords,
        },
        data(){
            return {
                detail:false,
                task_message:{
                    companyName:''
                },
            }
        },
        created(){
            var _self = this
            Bus.$on('detail',(e)=>{
                _self.detail = true
            })
        }
    }
</script>