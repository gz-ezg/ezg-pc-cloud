<template>
    <div>
        <Modal
            v-model="showcompanydetail1"
            title="查看公司"
            width="800"
        >
            <Form ref="task_message" :model="task_message" :label-width="120">
                                <Row :gutter="16">
                                    <Col span="1" style="visibility:hidden">1</Col>
                                    <Col span="10">
                                        <FormItem prop="companyname" label="公司名称：">
                                            <Input type="text" v-model="task_message.companyname" placeholder="" readonly>
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="10">
                                        <FormItem prop="NAME" label="归属客户：">
                                            <Input type="text" v-model="task_message.NAME" placeholder="" readonly>
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <!-- <Col span="2">
                                        <Button type="primary">选择</Button>
                                    </Col> -->
                                </Row>
                                 <Row :gutter="24">
                                    <Col span="1" style="visibility:hidden">1</Col>                                     
                                    <Col span="20">
                                        <FormItem prop="serviceaddress" label="服务地址：">
                                            <Input type="text" v-model="task_message.serviceaddress" placeholder="" readonly>
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                 <Row :gutter="16">
                                    <Col span="1" style="visibility:hidden">1</Col>                                     
                                    <Col span="10">
                                        <FormItem prop="TEL" label="客户电话：">
                                            <Input type="text" v-model="task_message.TEL" placeholder="" readonly>
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="10">
                                        <FormItem prop="cluesource" label="企业来源：">
                                            <Select transfer v-model="task_message.cluesource" readonly transfer>
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
                                        <FormItem prop="enterprisestatus" label="企业状态：">
                                            <Select transfer v-model="task_message.enterprisestatus" readonly transfer> 
                                                <Option value="123">无意向</Option>
                                                <Option value="123133">有意向</Option>
                                                <Option value="1233">减款</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="10">
                                        <FormItem prop="importlevel" label="重要等级：">
                                            <Select transfer v-model="task_message.importlevel" readonly transfer>
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
                                        <FormItem prop="taxtype" label="年度纳税评级：" readonly>
                                            <Select transfer v-model="task_message.taxtype" transfer>
                                                <Option value="A">A</Option>
                                                <Option value="B">B</Option>
                                                <Option value="C">C</Option>
                                                <Option value="D">D</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="10">
                                        <FormItem prop="transactiontype" label="企业交易状态：" readonly>
                                            <Select transfer v-model="task_message.transactiontype" transfer>
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
                                        <FormItem prop="bankcode" label="机构代码：">
                                            <Input type="text" v-model="task_message.bankcode" placeholder="" readonly>
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="10">
                                        <FormItem prop="basicbankcode" label="信用机构代码：">
                                            <Input type="text" v-model="task_message.basicbankcode" placeholder="" readonly>
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="1" style="visibility:hidden">1</Col>                                    
                                    <Col span="10">
                                        <FormItem prop="companyName" label="开户许可证：">
                                            <Input type="text" v-model="task_message.companyName" placeholder="" readonly>
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="10">
                                        <FormItem prop="basicbank" label="基本户开户行：">
                                            <Input type="text" v-model="task_message.basicbank" placeholder="" readonly>
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="1" style="visibility:hidden">1</Col>                                    
                                    <Col span="10">
                                        <FormItem prop="companyName" label="基本户开户行账号：">
                                            <Input type="text" v-model="task_message.companyName" placeholder="" readonly>
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="10">
                                        <FormItem prop="companyName" label="一般开户行：">
                                            <Input type="text" v-model="task_message.companyName" placeholder="" readonly>
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="1" style="visibility:hidden">1</Col>                                    
                                    <Col span="10">
                                        <FormItem prop="companyName" label="企业纳税类型：">
                                            <Input type="text" v-model="task_message.companyName" placeholder="" readonly>
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="1" style="visibility:hidden">1</Col>                                    
                                    <Col span="10">
                                        <FormItem prop="cnumber" label="国税号码：">
                                            <Input type="text" v-model="task_message.cnumber" placeholder="" readonly>
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="10">
                                        <FormItem prop="pnumber" label="地税号码：">
                                            <Input type="text" v-model="task_message.pnumber" placeholder="" readonly>
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row :gutter="16">
                                    <Col span="1" style="visibility:hidden">1</Col>                                    
                                    <Col span="10">
                                        <FormItem prop="cpassword" label="国税密码：">
                                            <Input type="text" v-model="task_message.cpassword" placeholder="" readonly>
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="10">
                                        <FormItem prop="ppassword" label="地税密码：">
                                            <Input type="text" v-model="task_message.ppassword" placeholder="" readonly>
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <!-- <Row>
                                    <Col span="1" style="visibility:hidden">1</Col>                                    
                                    <FormItem prop="companyName">
                                        <div slot="label">相关资料：</div>
                                        <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
                                    </FormItem>
                                </Row>    -->
                            </Form>
            <div slot="footer">
                <Button type="ghost" @click="showcompanydetail1=false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Bus from '../../../../../components/bus'

export default {
    data(){
        return {
            current_row1:'',
            showcompanydetail1:false,
            task_message:{
                companyName:'1111111111'
            }
        }
    },
    created(){
        var _self = this
        Bus.$on('showcompanydetail1',(e)=>{
            _self.showcompanydetail1 = true
            _self.current_row1 = e
        })
    }
}
</script>
