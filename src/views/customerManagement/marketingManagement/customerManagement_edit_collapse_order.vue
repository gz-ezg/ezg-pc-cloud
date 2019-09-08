<template>
    <div>
        <Modal
                width="70%"
                v-bind:value="modal1"
                title="新增订单"
                @on-ok="ok"
                @on-cancel="cancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Card>
                    <Row :gutter="16">
                        <Col span="16">
                        <FormItem label="公司名称" prop="city">
                            <Select transfer v-model="formValidate.city" placeholder="Select your city">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="订单总价" prop="name">
                            <Input v-model="formValidate.name" disabled></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="8">
                        <FormItem label="已付款" prop="name">
                            <Input v-model="formValidate.name"></Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="缴费渠道" prop="city">
                            <Select transfer v-model="formValidate.city" placeholder="Select your city">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="线索源" prop="city">
                            <Select transfer v-model="formValidate.city" placeholder="Select your city">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="8">
                        <FormItem label="不计提成" prop="name">
                            <Input v-model="formValidate.name" disabled></Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="业绩" prop="name">
                            <Input v-model="formValidate.name" disabled></Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="附加流水" prop="name">
                            <Input v-model="formValidate.name"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="8">
                        <FormItem label="服务开始" prop="date">
                            <DatePicker type="datetime" placeholder="Select date" v-model="formValidate.date"
                                        style="width: 100%"></DatePicker>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="缴费时间" prop="date">
                            <DatePicker type="datetime" placeholder="Select date" v-model="formValidate.date"
                                        style="width: 100%"></DatePicker>
                        </FormItem>
                        </Col>
                    </Row>
                </Card>
                <Card>
                    <Button type="ghost" shape="circle" icon="plus" @click="modal2 = true">新增</Button>
                    <Button type="ghost" shape="circle" icon="trash-b">删除</Button>
                    <Table
                            style="margin-top: 10px;"
                            highlight-row
                            size="small"
                            :columns="columns"
                            :data="data1"
                            @on-current-change="selectRow"></Table>
                </Card>
            </Form>
        </Modal>
        <Modal
                v-model="modal2"
                title="Common Modal dialog box title">
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </Modal>
    </div>
</template>

<script>

    export default {
        props: ['modal1', 'customerid'],
        data() {
            return {
                columns: [{
                    title: '产品名称',
                    key: 'name',
                    width: 100
                },
                    {
                        title: '产品属性',
                        key: 'tel',
                        width: 120
                    },
                    {
                        title: '产品价格',
                        key: 'customertype',
                        width: 100
                    },
                    {
                        title: '产品数量',
                        key: 'customersource',
                        width: 100
                    },
                    {
                        title: '销售价格',
                        key: 'importLevel',
                        width: 100
                    },
                    {
                        title: '是否不计提成',
                        key: 'area',
                        width: 120
                    },
                    {
                        title: '服务部门',
                        key: 'createby',
                    },
                    {
                        title: '备注',
                        key: 'followby',
                    },
                ],
                data1:[],

                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        {required: true, message: 'The name cannot be empty', trigger: 'blur'}
                    ],
                    mail: [
                        {required: true, message: 'Mailbox cannot be empty', trigger: 'blur'},
                        {type: 'email', message: 'Incorrect email format', trigger: 'blur'}
                    ],
                    city: [
                        {required: true, message: 'Please select the city', trigger: 'change'}
                    ],
                    gender: [
                        {required: true, message: 'Please select gender', trigger: 'change'}
                    ],
                    interest: [
                        {
                            required: true,
                            type: 'array',
                            min: 1,
                            message: 'Choose at least one hobby',
                            trigger: 'change'
                        },
                        {type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change'}
                    ],
                    date: [
                        {required: true, type: 'date', message: 'Please select the date', trigger: 'change'}
                    ],
                    time: [
                        {required: true, type: 'date', message: 'Please select time', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: 'Please enter a personal introduction', trigger: 'blur'},
                        {type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur'}
                    ]
                },
                modal2: false
            }
        },
        methods: {
            selectRow(){

            },

            ok() {
                this.$Message.info('Clicked ok');
            },
            cancel() {
                var _self = this
//                this.$Message.info('Clicked cancel');
                this.$emit('hidePanel', 'false');
            },
        }
    }
</script>