<template>
    <div>
        <Tabs value="name1">
            <TabPane label="待分配" name="name1">
                <Card>
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">批量转移</Button>
                            <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">批量已读</Button>
                            <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">批量未读</Button>
                        </ButtonGroup>
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table
                                ref="selection"
                                highlight-row
                                size="small"
                                :columns="columns"
                                :data="data"></Table>
                        <Page
                                size="small"
                                :total="pageTotal"
                                show-total
                                show-sizer
                                show-elevator
                                @on-change="pageChange"
                                @on-page-size-change="pageSizeChange"
                                style="margin-top: 10px"></Page>
                    </Row>
                </Card>
            </TabPane>
            <TabPane label="已分配" name="name2"></TabPane>
        </Tabs>
        <Modal
                v-model="companyDetail"
                title="查看公司"
                width="70%"
                @on-ok="ok"
                @on-cancel="cancel">
            <Form ref="formItem" :model="formItem" :label-width="100">
                <Row>
                    <Col span="12">
                    <FormItem label="公司名称" prop="Input">
                        <Input v-model="formItem.Input" disabled></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="归属客户" prop="Input">
                        <Input v-model="formItem.Input" disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <FormItem label="服务地址" prop="Input">
                        <Input v-model="formItem.Input" disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="客户电话" prop="Input">
                        <Input v-model="formItem.Input" disabled></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="企业来源" prop="Input">
                        <Input v-model="formItem.Input" disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="企业状态" prop="Input">
                        <Input v-model="formItem.Input" disabled></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="企业来源" prop="Input">
                        <Input v-model="重要等级" disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="年度纳税评级" prop="Input">
                        <Input v-model="formItem.Input" disabled></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="企业交易状态" prop="Input">
                        <Input v-model="formItem.Input" disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="机构代码" prop="Input">
                        <Input v-model="formItem.Input" disabled></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="信用机构代码" prop="Input">
                        <Input v-model="formItem.Input" disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="开户许可证" prop="Input">
                        <Input v-model="formItem.Input" disabled></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="基本开户行" prop="Input">
                        <Input v-model="formItem.Input" disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="基本开户行账号" prop="Input">
                        <Input v-model="formItem.Input" disabled></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="一般开户行" prop="Input">
                        <Input v-model="formItem.Input" disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="国税号码" prop="Input">
                        <Input v-model="formItem.Input" disabled></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="国税密码" prop="Input">
                        <Input v-model="formItem.Input" disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="地税号码" prop="Input">
                        <Input v-model="formItem.Input" disabled></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="地税密码" prop="Input">
                        <Input v-model="formItem.Input" disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <FormItem label="企业纳税类型" prop="Input">
                        <Input v-model="formItem.Input" disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <FormItem label="附件" prop="Input">

                    </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                companyDetail: false,
                formItem: [{input: ''}],
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '已读/未读',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '归属公司',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '归属客户',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '产品全称',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '开始服务时间',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '服务终止时间',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '业务经理',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '服务人员',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 70,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.companyDetail = true
                                        }
                                    }
                                }, '查看公司')
                            ]);
                        }
                    }
                ],
                data: []
            }
        },
        methods:{
            //
        },
        mounted() {}
    }
</script>