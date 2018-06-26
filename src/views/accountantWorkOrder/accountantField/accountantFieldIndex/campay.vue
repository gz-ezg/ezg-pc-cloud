<template>
    <div>
        <Modal
                v-model="showcompanydetail"
                title="查看公司"
                width="800"
        >
            <Form ref="task_message" :model="task_message" :label-width="120">
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="公司名称：">
                            <Input type="text" v-model="task_message.companyName" placeholder="" size="small">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="归属客户：">
                            <Input type="text" v-model="task_message.companyName" placeholder="" size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="24">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="20">
                        <FormItem prop="companyName" label="服务地址：">
                            <Input type="text" v-model="task_message.companyName" placeholder="" size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="客户电话：">
                            <Input type="text" v-model="task_message.companyName" placeholder="" size="small">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="企业来源：">
                            <Select transfer v-model="task_message.companyName" size="small"> 
                                <!--    使用何种方式渲染这个选择队列呢  -->
                                <Option value="person">个人拓展</Option>
                                <Option value="market">市场活动</Option>
                                <Option value="leader">领导推荐</Option>
                            </Select>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="企业状态：">
                            <Select transfer v-model="task_message.companyName" size="small">
                                <Option value="123">无意向</Option>
                                <Option value="123133">有意向</Option>
                                <Option value="1233">减款</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="重要等级：">
                            <Select transfer v-model="task_message.companyName" size="small">
                                <Option value="highest">最高</Option>
                                <Option value="higher">较高</Option>
                                <Option value="normal">一般</Option>
                                <Option value="less">普通</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="年度纳税评级：">
                            <Select transfer v-model="task_message.companyName" size="small">
                                <Option value="A">A</Option>
                                <Option value="B">B</Option>
                                <Option value="C">C</Option>
                                <Option value="D">D</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="企业交易状态：">
                            <Select transfer v-model="task_message.companyName" size="small">
                                <Option value="normal">正常</Option>
                                <Option value="charge">可交易</Option>
                                <Option value="post">已预购</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="机构代码：">
                            <Input type="text" v-model="task_message.companyName" placeholder="" size="small">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="信用机构代码：">
                            <Input type="text" v-model="task_message.companyName" placeholder="" size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="开户许可证：">
                            <Input type="text" v-model="task_message.companyName" placeholder="" size="small">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="基本户开户行：">
                            <Input type="text" v-model="task_message.companyName" placeholder="" size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="基本户开户行账号：">
                            <Input type="text" v-model="task_message.companyName" placeholder="" size="small">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="一般开户行：">
                            <Input type="text" v-model="task_message.companyName" placeholder="" size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="企业纳税类型：">
                            <Input type="text" v-model="task_message.companyName" placeholder="" size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="国税号码：">
                            <Input type="text" v-model="task_message.companyName" placeholder="" size="small">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="地税号码：">
                            <Input type="text" v-model="task_message.companyName" placeholder="" size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="国税密码：">
                            <Input type="text" v-model="task_message.companyName" placeholder="" size="small">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem prop="companyName" label="地税密码：">
                            <Input type="text" v-model="task_message.companyName" placeholder="" size="small">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="1" style="visibility:hidden">1</Col>
                    <FormItem prop="companyName">
                        <div slot="label">相关资料：</div>
                    </FormItem>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="showcompanydetail=false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Bus from '../../../../components/bus'

    export default {
        data(){
            return {
                showcompanydetail:false,
                task_message:{
                    companyName:''
                }
            }
        },
        created(){
            var _self = this
            Bus.$on('showcompanydetail',(e)=>{
                _self.showcompanydetail = true
            })
        }
    }
</script>
