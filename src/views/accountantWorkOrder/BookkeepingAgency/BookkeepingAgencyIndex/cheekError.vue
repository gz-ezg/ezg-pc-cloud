<template>
    <div>
        <Modal
                v-model="yichang"
                title="异常详情"
                width="800"
        >
            <Form ref="task_message" :model="task_message" :label-width="120">
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="公司名称">
                            <Input type="text" size="small" v-model="task_message.companyName" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="服务内容">
                            <Input type="text" size="small" v-model="task_message.companyName" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="服务人员">
                            <Input type="text" size="small" v-model="task_message.companyName" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="市场人员">
                            <Input type="text" size="small" v-model="task_message.companyName" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="异常情况（企业）">
                            <Input type="text" size="small" v-model="task_message.companyName" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="异常情况（财务）">
                            <Input type="text" size="small" v-model="task_message.companyName" disabled>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="是否处理">
                            <Select transfer v-model="task_message.companyName" transfer>
                                <Option value="beijing">已处理</Option>
                                <Option value="shanghai">等待处理</Option>
                                <Option value="shenzhen">未处理</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="fenpei=false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Bus from '../../../../components/bus'

    export default {
        data(){
            return {
                yichang:false,
                task_message:{
                    companyName:''
                }
            }
        },
        created(){
            var _self = this
            Bus.$on('yichang',(e)=>{
                _self.yichang = true
            })
        }
    }
</script>
