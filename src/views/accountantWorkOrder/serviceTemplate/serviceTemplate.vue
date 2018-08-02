<template>
    <div>
        <Card>
            <Row style="margin-bottom:20px">
                <Collapse v-model="search_model">
                    <Panel name="1" >
                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                        筛选
                        <div  slot="content" @keydown="show">
                            <Form ref="formInline" :model="formInline" :label-width="100">
                                <Row :gutter="12">
                                    <Col span="8">
                                        <FormItem prop="serviceitemname" label="服务项名称：">
                                            <Input size="small" type="text"  v-model="serviceitemname" placeholder="">
                                            </Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <FormItem>
                                    <Button type="primary" @click="search">搜索</Button>
                                    <Button type="ghost" style="margin-left:20px" @click="reset">重置</Button>
                                </FormItem>
                            </Form>
                        </div>
                    </Panel>
                </Collapse>
            </Row>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="ios-color-wand-outline" @click="luru">录入</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="bianji">编辑</Button>
                    <Button type="primary" icon="ios-color-wand-outline" @click="chakan">查看</Button>
                </ButtonGroup>
            </Row>
            <Row style="margin-top: 10px;">
                    <Table
                            ref="selection"
                            highlight-row
                            size="small"
                            @on-row-click="selectRow"
                            :columns="header"
                            :data="data"></Table>
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
                v-model="add"
                :title="title"
                :loading="loading"
                width="800"
                @on-ok="submit('task_message')"
                @on-cancel="cancel('task_message')"
        >
            <Form ref="task_message" :rules="ruleValidate" :model="task_message" :label-width="120">
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="10">
                        <FormItem prop="serviceContractItemId" label="服务项：">
                            <Input size="small" type="text"  v-model="task_message.serviceContractItemId" placeholder="" :disabled="!isCheek">
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="2">
                        <Button type="primary" @click="getData2();xuanz = true" v-show="isCheek">选择</Button>
                    </Col>
                </Row>
                <Row :gutter="24">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="20">
                        <FormItem prop="workreport" label="工作汇报：">
                            <Input v-model="task_message.workreport" type="textarea" :rows="4" :disabled="!isCheek"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="24">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="20">
                        <FormItem prop="remark" label="备注：">
                            <Input v-model="task_message.remark" type="textarea" :rows="4" :disabled="!isCheek"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer" v-if="!isCheek"></div>
        </Modal>
         <Modal
                v-model="xuanz"
                title="服务项列表"
                width="800"
        >
        <Table
            ref="selection"
            highlight-row
            size="small"
            @on-row-dblclick="selectRow2"
            :columns="header2"
            :data="data2"></Table>
        <Page
            size="small"
            :total="pageTotal2"
            show-total
            show-sizer
            show-elevator
            @on-change="pageChange2"
            @on-page-size-change="pageSizeChange2"
            style="margin-top: 10px"></Page>
        </Modal>
    </div>
</template>

<script>

    export default {
        name:'serviceTemplate_index',
        data() {
            return{
                search_model:"",
                //  筛选，服务模板服务项
                serviceitemname:'',
                isCheek: true,
                typename: '',
                loading: true,
                serviceitemid: '',
                currentPage: 1,
                page: 1,
                pageSize: 10,
                page2: 1,
                pageSize2: 10,
                pageTotal: '',
                pageTotal2: '',
                add: false,
                xuanz: false,
                title: '',
                task_message:{
                    id: '',
                    serviceContractItemId:'',
                    remark:'',
                    workreport:'',
                },
                ruleValidate: {
                    serviceContractItemId: [
                        {required: true, message: '请选择服务项'}
                    ],
                    workreport: [
                        {required: true, message: '请选择工作汇报'}
                    ],
                },
                data:[],
                data2:[],
                header: [
                    {
                        title: '服务项',
                        key: 'serviceitemname',
                        width: 250
                    },
                    {
                        title: '工作汇报',
                        key: 'workreport',
                        ellipsis: true,
                        width:300,
                    },
                    {
                        title: '创建人',
                        key: 'createbyrealname',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'createdate',
                        width: 120
                    },
                    {
                        title: '修改人',
                        key: 'updatebyrealname',
                        width: 120
                    },
                    {
                        title: '修改时间',
                        key: 'updatedate',
                        width: 120
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.delete(params.row.id)
                                        }
                                    }
                                }, '[删除]'),
                            ]);
                        }
                    }
                ],
                header2: [
                    {
                        title: '服务项名称',
                        key: 'serviceitemname'
                    },
                    {
                        title: '创建人',
                        key: 'updateby'
                    },
                    {
                        title: '创建时间',
                        key: 'updatedate'
                    },
                ]
            }
        },
        methods: {
            show(e){
                if(e.key=='Enter'){
                this.search()
                }
            },            
            search(){
                this.getData()
            },
            reset(){
                this.serviceitemname = ''
                this.getData()
            },
            getData() {
                let _self = this
                let url = '/order/cycle/service/kjdj/summary/template/list?page=' + _self.page + '&pageSize=' + _self.pageSize +'&serviceitemname=' + _self.serviceitemname

                function doSuccess(res) {
                    let _data = res.data.data
                    _self.pageTotal = _data.total
                    _self.data = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        _self.data.push({
                            id: _data.rows[i].id,
                            createbyrealname: _data.rows[i].createbyrealname,
                            updatebyrealname: _data.rows[i].updatebyrealname,
                            createdate: _data.rows[i].createdate != null ?(_data.rows[i].createdate).substr(0,10) : '',
                            serviceitemname: _data.rows[i].serviceitemname,
                            updatedate: _data.rows[i].updatedate != null ? (_data.rows[i].updatedate).substr(0,10) : '',
                            workreport: _data.rows[i].workreport,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            getData2() {
                let _self = this
                let url = '/system/serviceContract/item/list?page=' + _self.page2 + '&pageSize=' + _self.pageSize2 + '&templatecode=kjdafwxy'

                function doSuccess(res) {
                    let _data = res.data.data
                    _self.pageTotal2 = _data.total
                    _self.data2 = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        _self.data2.push({
                            updateby: _data.rows[i].updateby,
                            id: _data.rows[i].id,
                            updatedate: _data.rows[i].updatedate,
                            serviceitemname: _data.rows[i].serviceitemname
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            pageChange(a) {
                let _self = this
                _self.page = a
                _self.getData()
            },

            pageChange2(a) {
                let _self = this
                _self.page2 = a
                _self.getData2()
            },

            pageSizeChange(a) {
                let _self = this
                _self.pageSize = a
                _self.getData()
            },

            pageSizeChange2(a) {
                let _self = this
                _self.pageSize2 = a
                _self.getData2()
            },

            luru() {
                let _self = this
                _self.add = true
                _self.title = '录入'
                _self.typename = 'add'
            },

            bianji() {
                let _self = this
                let url = '/order/cycle/service/kjdj/summary/template/detail?id=' + _self.serviceitemid
                let url2 = '/system/serviceContract/item/list?page=1&pageSize=10000&templatecode=kjdafwxy'

                if (_self.serviceitemid == '') {
                    this.$Message.warning('请选择查看的模板')
                } else {
                    _self.add = true
                    _self.title = '编辑'
                    _self.typename = 'edit'

                    function doSuccess(res) {
                        let _data = res.data.data
                        _self.task_message.remark = _data.remark
                        _self.task_message.id = _data.serviceContractItemId
                        _self.task_message.workreport = _data.workreport
                    }

                    function doSuccess2(res) {
                        let _data = res.data.data.rows

                        for (let i = 0; i < _data.length; i++) {
                            if ( _self.task_message.id == _data[i].id) {
                                _self.task_message.serviceContractItemId = _data[i].serviceitemname
                            }
                        }
                    }

                    _self.GetData(url, doSuccess)
                    _self.GetData(url2, doSuccess2)
                }
            },

            chakan() {
                let _self = this
                let url = '/order/cycle/service/kjdj/summary/template/detail?id=' + _self.serviceitemid
                let url2 = '/system/serviceContract/item/list?page=1&pageSize=10000&templatecode=kjdafwxy'
                _self.isCheek = false

                if (_self.serviceitemid == '') {
                    this.$Message.warning('请选择查看的模板')
                } else {
                    _self.add = true
                    _self.title = '查看'
                    _self.typename = 'check'

                    function doSuccess(res) {
                        let _data = res.data.data
                        _self.task_message.remark = _data.remark
                        _self.task_message.id = _data.serviceContractItemId
                        _self.task_message.workreport = _data.workreport
                    }

                    function doSuccess2(res) {
                        let _data = res.data.data.rows

                        for (let i = 0; i < _data.length; i++) {
                            if ( _self.task_message.id == _data[i].id) {
                                _self.task_message.serviceContractItemId = _data[i].serviceitemname
                            }
                        }
                    }

                    _self.GetData(url, doSuccess)
                    _self.GetData(url2, doSuccess2)
                }
            },

            cancel(name) {
                let _self = this
                _self.add = false
                _self.isCheek = true
                // _self.task_message = {
                //     id: '',
                //     serviceContractItemId:'',
                //     remark:'',
                //     workreport:'',
                // }
                this.$refs[name].resetFields();
            },

            selectRow(a) {
                let _self = this
                _self.serviceitemid = a.id
            },

            selectRow2(a) {
                let _self = this
                _self.task_message.id = a.id
                _self.task_message.serviceContractItemId = a.serviceitemname
                _self.xuanz = false
            },

            submit(name) {
                let _self = this

                setTimeout(() => {
                    this.loading = false
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            let url = ''
                            let _msg = ''
                            let _data = {
                               workreport:  _self.task_message.workreport,
                               servicecontractitemid:  _self.task_message.id,
                               remark:  _self.task_message.remark,
                            }

                            if (_self.typename == 'add') {
                                url = '/order/cycle/service/kjdj/summary/template/create'
                                _msg = '录入成功'
                            } else if (_self.typename == 'edit') {
                                url = '/order/cycle/service/kjdj/summary/template/update'
                                _msg = '编辑成功'
                                _data.id = _self.serviceitemid
                            }

                            function doSuccess(res) {
                                _self.cancel('task_message')
                                _self.$Message.success(_msg)
                                _self.currentPage = 1
                                _self.page = 1
                                _self.getData()
                            }

                            function otherConditions(res) {
                                _self.$nextTick(() => {
                                    _self.loading = true
                                })
                                _self.$Message.error(res.data.msg)
                            }

                            _self.PostData(url, _data, doSuccess, otherConditions)
                        } else {
                            this.$nextTick(() => {
                                this.loading = true
                            })
                        }
                    })
                }, 2000)
            },

            delete(a) {
                let _self = this

                this.$Modal.confirm({
                    title: '删除确认',
                    content: '<p>确认删除该记录吗</p>',
                    onOk: () => {
                        let url = '/order/cycle/service/kjdj/summary/template/del'
                        let _data = {
                            id: a
                        }

                        function doSuccess() {
                            _self.currentPage = 1
                            _self.page = 1
                            _self.getData()
                        }

                        _self.PostData(url, _data, doSuccess)
                    }
                });
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>
