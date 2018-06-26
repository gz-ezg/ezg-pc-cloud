<style lang="less">
    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: 0;
        }
    }
</style>
<template>
    <div>
        <Card>
            <Row>
                <ButtonGroup>
                    <Button v-permission="['cluesL.add']" type="primary" icon="ios-color-wand-outline" @click="modal1 = true">新增</Button>
                </ButtonGroup>
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                        highlight-row
                        size="small"
                        :columns="columns"
                        :data="data"
                        @on-row-dblclick="detail"
            ></Table>
                <Page
                        size="small"
                        :total="pageTotal"
                        :current.sync="currentPage"
                        show-total
                        show-sizer
                        show-elevator
                        @on-change="pageChange"
                        @on-page-size-change="pageSizeChange"
                        style="margin-top: 10px"></Page>
            </Row>
        </Card>
        <Modal
                v-model="modal1"
                title="新增"
                class-name="vertical-center-modal"
                :loading="loading"
                @on-ok="ok('formValidate')"
                @on-cancel="cancel('formValidate')">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="70">
                <FormItem label="标签名称" prop="labelname">
                    <Input v-model="formValidate.labelname"></Input>
                </FormItem>
                <FormItem label="标签编码" prop="labelcode">
                    <Input v-model="formValidate.labelcode"></Input>
                </FormItem>
                <FormItem label="标签类型" prop="labeltype">
                    <Select transfer v-model="formValidate.labeltype" style="width:200px" transfer>
                        <Option value="shangshilei">商事类</Option>
                        <Option value="kuaijilei">会计类</Option>
                        <Option value="qihualei">企划类</Option>
                        <Option value="shenjilei">审计类</Option>
                    </Select>
                </FormItem>
                <FormItem label="类别编码" prop="typecode">
                    <Input v-model="formValidate.typecode"></Input>
                </FormItem>
                <FormItem label="标签说明" prop="labelmemo">
                    <Input size="small" type="textarea" v-model="formValidate.labelmemo"/>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="modal2"
                title="详情"
                class-name="vertical-center-modal">
            <Form ref="formValidate2" :model="formValidate2" :label-width="70">
                <FormItem label="标签名称" prop="labelname">
                    <Input v-model="formValidate2.labelname" disabled></Input>
                </FormItem>
                <FormItem label="标签编码" prop="labelcode">
                    <Input v-model="formValidate2.labelcode" disabled></Input>
                </FormItem>
                <FormItem label="标签类型" prop="labeltype">
                    <Select transfer v-model="formValidate2.labeltype" style="width:200px" disabled transfer>
                        <Option value="shangshilei">商事类</Option>
                        <Option value="kuaijilei">会计类</Option>
                        <Option value="qihualei">企划类</Option>
                        <Option value="shenjilei">审计类</Option>
                    </Select>
                </FormItem>
                <FormItem label="类别编码" prop="typecode">
                    <Input v-model="formValidate2.typecode" disabled></Input>
                </FormItem>
                <FormItem label="标签说明" prop="labelmemo">
                    <Input size="small" type="textarea" v-model="formValidate2.labelmemo" disabled/>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="modal3"
                title="修改"
                class-name="vertical-center-modal"
                :loading="loading"
                @on-ok="ok2('formValidate3')"
                @on-cancel="cancel('formValidate3')">
            <Form ref="formValidate3" :model="formValidate3" :label-width="70">
                <FormItem label="标签名称" prop="labelname">
                    <Input v-model="formValidate3.labelname"></Input>
                </FormItem>
                <FormItem label="标签编码" prop="labelcode">
                    <Input v-model="formValidate3.labelcode"></Input>
                </FormItem>
                <FormItem label="标签类型" prop="labeltype">
                    <Select transfer v-model="formValidate3.labeltype" style="width:200px" transfer>
                        <Option value="shangshilei">商事类</Option>
                        <Option value="kuaijilei">会计类</Option>
                        <Option value="qihualei">企划类</Option>
                        <Option value="shenjilei">审计类</Option>
                    </Select>
                </FormItem>
                <FormItem label="类别编码" prop="typecode">
                    <Input v-model="formValidate3.typecode" disabled></Input>
                </FormItem>
                <FormItem label="标签说明" prop="labelmemo">
                    <Input size="small" type="textarea" v-model="formValidate3.labelmemo"/>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                isEidt: false,
                modal1: false,
                modal2: false,
                modal3: false,
                loading: true,
                issendValue: [],
                formValidate: {
                    labelname: '',
                    labelcode: '',
                    labeltype: '',
                    typecode: '',
                    labelmemo: ''
                },
                formValidate2: {
                    labelname: '',
                    labelcode: '',
                    labeltype: '',
                    typecode: '',
                    labelmemo: ''
                },
                formValidate3: {
                    labelname: '',
                    labelcode: '',
                    labeltype: '',
                    typecode: '',
                    labelmemo: ''
                },
                ruleValidate: {
                    labelname: [
                        {required: true, trigger: 'blur', message: '标签名称不能为空'}
                    ],
                    labelcode: [
                        {required: true, trigger: 'blur', message: '标签编码不能为空'}
                    ],
                    labeltype: [
                        {required: true, trigger: 'change', message: '请选择标签类别'}
                    ],
                },
                columns: [{
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                    {
                        title: '标签类型',
                        key: 'labelType',
                    },
                    {
                        title: '类别编码',
                        key: 'typecode',
                    },
                    {
                        title: '标签名称',
                        key: 'labelName',
                    },
                    {
                        title: '标签编码',
                        key: 'labelCode',
                    },
                    {
                        title: '创建时间',
                        key: 'createDate',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width:180,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                        permission: "['cluesL.detail']"
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.detail(params.row)
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                        permission: "['cluesL.edit']"
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params)
                                        }
                                    }
                                }, '修改')
                            ]);
                        }
                    }
                ],
                data: [],
                pageTotal: new Number(),
                pageSize: 10,
                customerid: '',
                currentPage: 1
            }
        },
        methods: {
            // 表格数据请求
            getTableData() {
                let _self = this
                let url = '/system/label/list?page=1&pageSize=10&sortField=id&order=desc'

                _self.data = []
                _self.currentPage = 1

                function doSuccess(response) {
                    _self.pageTotal = response.data.data.total

                    for (let i = 0; i < response.data.data.rows.length; i++) {
                        _self.data.push({
                            createDate: response.data.data.rows[i].createDate,
                            id: response.data.data.rows[i].id,
                            labelCode: response.data.data.rows[i].labelCode,
                            labelName: response.data.data.rows[i].labelName,
                            labelType: response.data.data.rows[i].labelType,
                            typecode: response.data.data.rows[i].typecode,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },
            // 改变页码
            pageChange(a) {
                let _self = this
                let url = '/system/label/list?page=' + a + '&pageSize=' + _self.pageSize + '&sortField=id&order=desc'

                _self.data = []

                function doSuccess(response) {
                    _self.pageTotal = response.data.data.total

                    for (let i = 0; i < response.data.data.rows.length; i++) {
                        _self.data.push({
                            createDate: response.data.data.rows[i].createDate,
                            id: response.data.data.rows[i].id,
                            labelCode: response.data.data.rows[i].labelCode,
                            labelName: response.data.data.rows[i].labelName,
                            labelType: response.data.data.rows[i].labelType,
                            typecode: response.data.data.rows[i].typecode,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            // 改变每页显示的数据条数
            pageSizeChange(a) {
                let _self = this
                let url = '/system/label/list?page=1&pageSize=' + a + '&sortField=id&order=desc'
                _self.pageSize = a
                _self.data = []

                function doSuccess(response) {
                    _self.pageTotal = response.data.data.total

                    for (let i = 0; i < response.data.data.rows.length; i++) {
                        _self.data.push({
                            createDate: response.data.data.rows[i].createDate,
                            id: response.data.data.rows[i].id,
                            labelCode: response.data.data.rows[i].labelCode,
                            labelName: response.data.data.rows[i].labelName,
                            labelType: response.data.data.rows[i].labelType,
                            typecode: response.data.data.rows[i].typecode,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            detail(e) {
                console.log(e)
                let _self = this
                let url = '/system/label/findLabelById/' + e.id
                _self.modal2 = true

                function doSuccess(response) {
                    let _res = response.data.data

                    _self.formValidate2.id = _res.id
                    _self.formValidate2.labelcode = _res.labelCode
                    _self.formValidate2.labelmemo = _res.labelMemo
                    _self.formValidate2.labelname = _res.labelName
                    _self.formValidate2.labeltype = _res.labelType
                    _self.formValidate2.typecode = _res.typeCode
                }

                this.GetData(url, doSuccess)
            },

            edit(e) {
                let _self = this
                let url = '/system/label/findLabelById/' + e.row.id
                _self.modal3 = true

                function doSuccess(response) {
                    let _res = response.data.data

                    _self.formValidate3.id = _res.id
                    _self.formValidate3.labelcode = _res.labelCode
                    _self.formValidate3.labelmemo = _res.labelMemo
                    _self.formValidate3.labelname = _res.labelName
                    _self.formValidate3.labeltype = _res.labelType
                    _self.formValidate3.typecode = _res.typeCode
                }

                this.GetData(url, doSuccess)
            },

            /*************************录入提交验证********************************/
            ok(name) {
                let _self = this
                setTimeout(() => {
                    this.loading = false;
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            let url = '/system/label/saveLabel'

                            function doSuccess(response) {
                                _self.$Message.success('更新成功!')
                                _self.getTableData()
                                _self.cancel('formValidate')
                                _self.modal1 = false
                            }

                            this.PostData(url, _self.formValidate, doSuccess)
                        } else {
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                        }
                    })
                }, 2000);
            },

            ok2(name) {
                let _self = this
                setTimeout(() => {
                    this.loading = false;
                    let url = '/system/label/updateLabel'

                    function doSuccess(response) {
                        _self.$Message.success('更新成功!')
                        _self.getTableData()
                        _self.cancel('formValidate3')
                        _self.modal3 = false
                    }

                    this.PostData(url, _self.formValidate3, doSuccess)
                }, 2000);
            },

            cancel(name) {
                this.$refs[name].resetFields();
            }
        },
        mounted() {
            this.getTableData()
        }
    }
</script>