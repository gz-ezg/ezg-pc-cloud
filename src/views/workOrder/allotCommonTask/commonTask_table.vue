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
            <TabPane label="已分配" name="name2">
            </TabPane>
        </Tabs>
        <Modal
                v-model="detailModal"
                title="查看详情"
                width="50%"
                @on-ok="ok"
                @on-cancel="cancel">
            <Tabs value="name1">
                <TabPane label="任务信息" name="name11">
                    <Collapse v-model="value1">
                        <Panel name="1">
                            基本信息
                            <div slot="content">
                                <Form ref="formItem" :model="formItem" :label-width="70">
                                    <Row>
                                        <Col span="12">
                                        <FormItem label="公司名称" prop="Input">
                                            <Input v-model="formItem.Input" disabled></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="12">
                                        <FormItem label="文件编号" prop="Input">
                                            <Input v-model="formItem.Input" disabled></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                        <FormItem label="客户名称" prop="Input">
                                            <Input v-model="formItem.Input" disabled></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="12">
                                        <FormItem label="客户电话" prop="Input">
                                            <Input v-model="formItem.Input" disabled></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                        <FormItem label="产品名称" prop="Input">
                                            <Input v-model="formItem.Input" disabled></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="12">
                                        <FormItem label="服务部门" prop="Input">
                                            <Input v-model="formItem.Input" disabled></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="24">
                                        <FormItem label="服务备注" prop="customerMemo">
                                            <Input size="small" type="textarea" v-model="formItem.Input"/>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Panel>
                        <Panel name="2">
                            相关联系人
                            <div slot="content">
                                <Form ref="formItem" :model="formItem" :label-width="70">
                                    <Row>
                                        <Col span="12">
                                        <FormItem label="服务人员" prop="Input">
                                            <Input v-model="formItem.Input" disabled></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="12">
                                        <FormItem label="联系方式" prop="Input">
                                            <Input v-model="formItem.Input" disabled></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="12">
                                        <FormItem label="销售人员" prop="Input">
                                            <Input v-model="formItem.Input" disabled></Input>
                                        </FormItem>
                                        </Col>
                                        <Col span="12">
                                        <FormItem label="联系方式" prop="Input">
                                            <Input v-model="formItem.Input" disabled></Input>
                                        </FormItem>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Panel>
                        <Panel name="3">
                            相关资料
                            <p slot="content"></p>
                        </Panel>
                    </Collapse>
                </TabPane>
                <TabPane label="工单流程管理" name="name22">
                    <Row>
                        <Col span="12">
                        预计完成时间：
                        </Col>
                        <Col span="12">
                        接单时间：
                        </Col>
                    </Row>
                    <Form ref="formItem" :model="formItem" :label-width="90" style="margin-top: 10px">
                        <Row>
                            <Col span="24">
                            <FormItem label="当前流程" prop="Input">
                                <Input v-model="formItem.Input" disabled></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                            <FormItem label="预计开始时间" prop="Input">
                                <Input v-model="formItem.Input" disabled></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="实际开始时间" prop="Input">
                                <Input v-model="formItem.Input" disabled></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                            <FormItem label="预计完成时间" prop="Input">
                                <Input v-model="formItem.Input" disabled></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="实际完成时间" prop="Input">
                                <Input v-model="formItem.Input" disabled></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                            <FormItem label="服务备注" prop="customerMemo">
                                <Input size="small" type="textarea" v-model="formItem.Input"/>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                            <FormItem label="停滞原因" prop="Input">
                                <Input v-model="formItem.Input" disabled></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                            <FormItem label="解决方案" prop="Input">
                                <Input v-model="formItem.Input" disabled></Input>
                            </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </TabPane>
                <TabPane label="服务记录动态" name="name33">
                    <Row>
                        <ButtonGroup>
                            <Button type="primary" icon="ios-color-wand-outline" @click="huashu = true">话术管理</Button>
                            <Button type="primary" icon="plus" @click="downloadExcel">添加记录</Button>
                        </ButtonGroup>
                    </Row>
                </TabPane>
                <TabPane label="相关在服工单" name="name44">
                    <Form ref="formItem" :model="formItem" :label-width="90" style="margin-top: 10px">
                        <Row>
                            <Col span="12">
                            <FormItem label="公司名称" prop="Input">
                                <Input v-model="formItem.Input" disabled></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="所办服务" prop="Input">
                                <Input v-model="formItem.Input" disabled></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                            <FormItem label="目前进度" prop="Input">
                                <Input v-model="formItem.Input" disabled></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="服务部门" prop="Input">
                                <Input v-model="formItem.Input" disabled></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                            <FormItem label="服务人员" prop="Input">
                                <Input v-model="formItem.Input" disabled></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="联系方式" prop="Input">
                                <Input v-model="formItem.Input" disabled></Input>
                            </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </TabPane>
            </Tabs>
        </Modal>
        <Modal
                v-model="huashu"
                title="话术管理"
                @on-ok="ok"
                @on-cancel="cancel">
            <ButtonGroup>
                <Button type="primary" icon="plus" @click="huashu = true">添加</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">删除</Button>
                <Button type="primary" icon="ios-color-wand-outline" @click="downloadExcel">使用话术</Button>
            </ButtonGroup>
        </Modal>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                detailModal: false,
                huashu: false,
                value1: '1',
                formItem: [{
                    input: ''
                }],
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '归属公司',
                        key: 'baseorderid',
                        width: 120
                    },
                    {
                        title: '归属客户',
                        key: 'companyname',
                        width: 250
                    },
                    {
                        title: '产品全称',
                        key: 'name',
                        width: 100
                    },
                    {
                        title: '订单号',
                        key: 'tel',
                        width: 120
                    },
                    {
                        title: '服务人员',
                        key: 'realnumber',
                        width: 120
                    },
                    {
                        title: '开始服务时间',
                        key: 'updatedate',
                        width: 150
                    },
                    {
                        title: '当前流程',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '服务起始时间',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '是否开始执行',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '已读/未读',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '服务部门',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '服务是否完成',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '更新时间',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '创建人',
                        key: 'createby',
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
                                            this.detailModal = true
                                        }
                                    }
                                }, '详情')
                            ]);
                        }
                    }
                ],
                data: []
            }
        },
        methods: {

        }
    }
</script>