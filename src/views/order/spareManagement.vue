<template>
    <div>
        <Tabs value="name1">
            <TabPane label="待补交" name="name1">
                <Card>
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="ios-crop" @click="pay = true">补交/审批</Button>
                            <Button type="primary" icon="ios-color-filter-outline">导出Excel</Button>
                        </ButtonGroup>
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table border :columns="columns2" :data="data3"></Table>
                    </Row>
                </Card>
                <Modal
                        v-model="pay"
                        title="补交/审批"
                        :width="1300"
                        @on-ok="ok"
                        @on-cancel="cancel">
                    <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="90">
                        <Row :gutter="16">
                            <Col span="8">
                            <FormItem label="归属公司" prop="customername">
                                <Input size="small" v-model="formValidate.customername"/>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="归属客户" prop="customername">
                                <Input size="small" v-model="formValidate.customername"/>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="余款总额" prop="customername">
                                <Input size="small" v-model="formValidate.customername"/>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="16">
                            <Col span="8">
                            <FormItem label="已补金额" prop="customername">
                                <Input size="small" v-model="formValidate.customername"/>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="未补金额" prop="customername">
                                <Input size="small" v-model="formValidate.customername"/>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="待审批金额" prop="customername">
                                <Input size="small" v-model="formValidate.customername"/>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Collapse v-model="value1">
                                <Panel name="1">
                                    补交明细
                                    <div slot="content">
                                        <Row>
                                            <ButtonGroup>
                                                <Button type="primary" icon="plus" @click="orderAdd2()">确认收款</Button>
                                                <Button type="primary" icon="edit" @click="modal1 = true">补交费用</Button>
                                            </ButtonGroup>
                                        </Row>
                                        <Row style="margin-top: 10px;">
                                            <Table border :columns="columns1" :data="data3"></Table>
                                        </Row>
                                    </div>
                                </Panel>
                            </Collapse>
                        </Row>
                    </Form>
                </Modal>
                <Modal
                        v-model="modal1"
                        title="补交费用"
                        @on-ok="ok"
                        @on-cancel="cancel">
                    <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="90">
                        <FormItem label="补交金额" prop="customername">
                            <Input size="small" v-model="formValidate.customername"/>
                        </FormItem>
                        <FormItem label="缴费渠道" prop="customername">
                            <Select transfer v-model="formValidate.customername" placeholder="Select your city">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="缴费时间" prop="customername">
                            <DatePicker type="datetime" style="width: 200px" v-model="formValidate.date"></DatePicker>
                        </FormItem>
                    </Form>
                </Modal>
            </TabPane>
            <TabPane label="已补交" name="name2">
                <Card>
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="ios-crop" @click="">查看</Button>
                            <Button type="primary" icon="ios-color-filter-outline">导出Excel</Button>
                        </ButtonGroup>
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table border :columns="columns2" :data="data3"></Table>
                    </Row>
                </Card>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>

    export default {
        data() {
            return{
                value1: 1,
                pay: false,
                modal1: false,
                formValidate: {
                    customername: '',
                    date: new Date()
                },
                ruleValidate: {},
                columns1: [
                    {
                        title: '补交金额',
                        key: 'age',
                    },
                    {
                        title: '当前状态',
                        key: 'age',
                    },
                    {
                        title: '缴费渠道',
                        key: 'age',
                    },
                    {
                        title: '缴费时间',
                        key: 'age',
                    },
                    {
                        title: '财务确认时间',
                        key: 'age',
                    },
                    {
                        title: '确认收款人',
                        key: 'age',
                    },
                ],
                columns2: [
                    {
                        title: '订单编号',
                        key: 'age',
                        width: 120
                    },
                    {
                        title: '产品名称',
                        key: 'province',
                        width: 150
                    },
                    {
                        title: '公司名称',
                        key: 'city',
                        width: 300
                    },
                    {
                        title: '余款总额',
                        key: 'address',
                        width: 120
                    },
                    {
                        title: '已补余款',
                        key: 'zip',
                        width: 100
                    },
                    {
                        title: '剩余余款',
                        key: 'zip',
                        width: 100
                    },
                    {
                        title: '待审批金额',
                        key: 'zip',
                        width: 100
                    },
                    {
                        title: '销售人员',
                        key: 'zip',
                        width: 100
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 120,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, '[催费]'),
                            ]);
                        }
                    }
                ],
            }
        }
    }
</script>