<template>
    <Modal
        title="新增销售规则"
        v-model="open_create_rule"
        width="800"
    >
        <Row :gutter="20">
            <Col span="15">
            <Form :label-width="90">
                <Row>
                    <Col span="12">
                        <FormItem label="客户状态" prop="customerStatus">
                            <Cascader size="small" v-model="formdata.customerStatus" :data="type" style="width:100%" trigger="hover" transfer >
                            </Cascader >
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="客户等级" prop="customerLevel">
                            <Select transfer size="small" v-model="formdata.customerLevel" style="width:100%">
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="客户地区" prop="customerArea">
                            <Select transfer size="small" v-model="formdata.customerArea" style="width:100%">
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="客户渠道" prop="channelTypeId">
                            <Select transfer size="small" v-model="formdata.channelTypeId" style="width:100%">
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="行为" prop="behavior">
                            <Select transfer size="small" v-model="formdata.behavior" style="width:100%">
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="惩罚" prop="punishment">
                            <Select transfer size="small" v-model="formdata.punishment" style="width:100%">
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="跟进评分" prop="followRanks">
                            <Select transfer size="small" v-model="formdata.followRanks" style="width:100%">
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="产品类型" prop="customersource">
                            <Select transfer size="small" v-model="formdata.customerStatus" style="width:100%">
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormItem label="划入期限" prop="changeTime">
                            <Input  size="small" style="width:80px;margin-right:5px" v-model="formdata.changeTime">
                            </Input>
                            <span>天（有效天数，非工作日）</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormItem label="提前通知时间" prop="notifyTime">
                            <Input  size="small"  style="width:80px;margin-right:5px" v-model="formdata.notifyTime">
                            </Input>
                            <span>天（有效天数，非工作日）</span>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            </Col>
            <Col span="9">
                <Row :gutter="5">
                    <div style="padding-bottom:5px">说明：</div>
                    <Input type="textarea" v-model="formdata.ruleMemo" rows=6></Input>
                </Row>
                <Row :gutter="5">
                    <div style="padding-bottom:1px;padding-top:5px">部门：</div>
                    <!--不使用树形结构，数据太复杂了-->
                    <!-- <Tree :data="depart" show-checkbox multiple></Tree> -->
                    <CheckboxGroup v-model="social">
                        <Checkbox label="twitter">
                            <Icon type="social-twitter"></Icon>
                            <span>Twitter</span>
                        </Checkbox>
                        <Checkbox label="facebook">
                            <Icon type="social-facebook"></Icon>
                            <span>Facebook</span>
                        </Checkbox>
                        <Checkbox label="github">
                            <Icon type="social-github"></Icon>
                            <span>Github</span>
                        </Checkbox>
                        <Checkbox label="snapchat">
                            <Icon type="social-snapchat"></Icon>
                            <span>Snapchat</span>
                        </Checkbox>
                    </CheckboxGroup>
                </Row>
            </Col>
        </Row>
        <div slot="footer">
            <Button type="primary" @click="create_rule" style="margin-bottom:10px">新增</Button>
        </div>
    </Modal>
</template>

<script>
export default {
    props:['type'],
    data(){
        return{
            customerTypes:[],
            open_create_rule:false,
            formdata:{
                customerStatus:[]
            },
            depart: [
                {
                    title: 'parent 1',
                    expand: true,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-1-1'
                                },
                                {
                                    title: 'leaf 1-1-2'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-2',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-2-1'
                                },
                                {
                                    title: 'leaf 1-2-1'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    methods:{
        create_rule(){

        },
    },
    created(){
        // this.getCustomerType()
        let _self = this
        this.$bus.on('open_create_customer_rule',(e)=>{
            _self.open_create_rule = true
        })
    }
}
</script>

