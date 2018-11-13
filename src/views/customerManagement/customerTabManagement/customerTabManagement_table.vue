<template>
    <div>
        <Card>
            <Row>
                <ButtonGroup>
                    <Button v-permission="['customerTabM.add']" type="primary" icon="plus" @click="modal1 = true">录入</Button>
                </ButtonGroup>
                <!-- <Poptip trigger="click" title="筛选" style="float:right" placement="bottom-end">
                    <Button type="text" icon="funnel">筛选</Button>
                    <div slot="content" @keydown.enter="search">
                        <Form ref="searchformInline" :model="searchformInline" :label-width="60">
                            <Row>
                            
                                    <FormItem prop="labelName" label="标签：">
                                        <Input type="text" v-model="searchformInline.labelName" placeholder="" style="width:180px">
                                        </Input>
                                    </FormItem>
                            </Row>
                            <FormItem>
                                <Button type="primary" @click="search">搜索</Button>
                                <Button type="ghost" style="margin-left:20px;margin-bottom:0" @click="reset">重置</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Poptip> -->
                <Col span="6" style="float:right">
                <Input v-model="searchLabel" placeholder="输入标签名称搜索" @on-keydown.enter="searchLabelData">
                <Button slot="append" icon="ios-search" @click="searchLabelData"></Button>
                </Input>
                </Col>
            </Row>
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                        highlight-row
                        size="small"
                        :columns="columns"
                        :data="data"
                        @on-current-change="selectRow"
                        :loading="loading_table"
                        @on-row-dblclick="edit"
                        ></Table>
                <Page
                        size="small"
                        :total="pageTotal"
                        :current.sync= "page"
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
                title="录入"
                
        >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="标签名" prop="labelname">
                    <Input v-model="formValidate.labelname"></Input>
                </FormItem>
                <FormItem label="编码" prop="labelcode">
                    <Input v-model="formValidate.labelcode"></Input>
                </FormItem>
                <FormItem label="是否为渠道商标签" prop="channelflag">
                    <Select transfer v-model="formValidate.channelflag">
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                    </Select>
                </FormItem>
                <FormItem label="说明" prop="labelmemo">
                    <Input v-model="formValidate.labelmemo" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="addTag('formValidate')" :loading="loading">新增</Button>
                    <Button type="ghost" @click="cancel('formValidate')" style="margin-left: 8px">重置</Button>
            </div>
        </Modal>
        <Modal
            v-model="modal2"
            title="编辑"
        >
            <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate" :label-width="120">
                <FormItem label="标签名" prop="labelName">
                    <Input v-model="formValidate2.labelName"></Input>
                </FormItem>
                <FormItem label="编码" prop="labelCode">
                    <Input v-model="formValidate2.labelCode"></Input>
                </FormItem>
                <FormItem label="是否为渠道商标签" prop="channelFlag">
                    <Select transfer v-model="formValidate2.channelFlag">
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                    </Select>
                </FormItem>
                <FormItem label="说明" prop="labelMemo">
                    <Input v-model="formValidate2.labelMemo" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="editTag" :loading="edit_loading">编辑</Button>
                <!-- <Button type="ghost" @click="cancel" style="margin-left: 8px">重置</Button> -->
            </div>
        </Modal>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                loading_table:false,
                searchLabel:'',
                isSearch:false,
                modal2:false,
                title: '录入',
                isEidt: false,
                modal1: false,
                loading: false,
                edit_loading:false,
                issendValue: [],
                searchformInline:{
                    labelName:''
                },
                formValidate: {
                    labelname: '',
                    labelcode: '',
                    channelFlag: '',
                    labelMemo: ''
                },
                formValidate2: {
                    id: '',
                    labelName: '',
                    labelCode: '',
                    channelFlag: '',
                    labelMemo: ''
                },
                ruleValidate: {
                    labelname: [
                        {required: true, message: '请填写标签名', trigger: 'blur'}
                    ],
                    labelcode: [
                        {required: true, message: '请填写标签编码', trigger: 'blur'},
                    ],
                    channelFlag: [
                        {required: true, message: '请选择是否为渠道商标签', trigger: 'change'}
                    ],
                },
                columns: [{
                    type: 'index',
                    minWidth: 60,
                    align: 'center'
                },
                    {
                        title: '标签名称',
                        key: 'labelName',
                        minWidth: 120
                    },
                    {
                        title: '编码',
                        key: 'labelCode',
                        minWidth: 120
                    },
                    {
                        title: '是否为渠道商标签',
                        key: 'channelFlag',
                        minWidth: 150
                    },
                    {
                        title: '说明',
                        key: 'labelMemo',
                        minWidth: 200
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        permission: "['customerTabM.edit']"
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.row)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        permission: "['customerTabM.delete']"
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data: [],
                pageTotal: new Number(),
                pageSize: 10,
                customerid: '',
                page:1
            }
        },
        methods: {
            searchLabelData(){
                if(this.searchLabel==''){
                    this.isSearch = false
                }else{
                    this.isSearch = true
                }
                this.getTableData()
            },

            reset(){
                var _self = this
                _self.isSearch = false
                _self.searchformInline.labelName = ''
                _self.page = 1
                _self.getTableData()
            },
            // 表格数据请求
            getTableData() {
                var _self = this
                
                this.loading_table = true
                _self.data = []
                if(_self.isSearch = true){
                    var url = '/api/system/label/list?page='+ _self.page +'&pageSize=' + _self.pageSize + '&labelName=' + _self.searchLabel
                }else{
                    var url = '/api/system/label/list?page='+ _self.page +'&pageSize=' + _self.pageSize    
                }             
                this.$http.get(url)
                    .then(function (data) {
                        _self.$backToLogin(data)
                        
                        // console.log(data)
                        _self.pageTotal = data.data.data.total
                        var response = data.data.data.rows
                        // console.log(_self.pageTotal)
                        for (var i = 0; i < response.length; i++) {
                            var reponseObj = {}
                            reponseObj.labelName = response[i].labelName
                            reponseObj.labelCode = response[i].labelCode
                            reponseObj.labelMemo = response[i].labelMemo
                            reponseObj.id = response[i].id
                            if (response[i].channelFlag == 0) {
                                reponseObj.channelFlag = '否'
                            } else {
                                reponseObj.channelFlag = '是'
                            }
                            _self.data.push(reponseObj)
                        }
                        _self.loading_table = false

                    })
            },
            // 表格行选中事件
            selectRow(a) {
                var _self = this
                _self.customerid = a.customerId
            },
            // 改变页码
            pageChange(a) {
                var _self = this
                _self.page = a
                _self.getTableData()
            },
            // 改变每页显示的数据条数
            pageSizeChange(a) {
                var _self = this
                _self.pageSize = a
                _self.data = []
                _self.getTableData()
            },

            //  新增标签
            addTag(name) {
                let _self = this
                _self.loading = true;
                setTimeout(() => {
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            _self.loading = true;
                            let url = `width:160`
                            // _self.$http.post()
                            this.$http({
                                method: 'post',
                                url: 'api/system/label/saveLabel',
                                data: _self.formValidate,
                                headers: {'Content-Type': 'application/json'},
                            }).then(function (response) {
                                console.log(response)
                                    if (response.data.msgCode == 40000) {
                                        _self.$Message.success('录入成功!')
                                        _self.getTableData()
                                        _self.modal1 = false
                                        _self.formValidate.id = ''
                                        _self.formValidate.labelname = ''
                                        _self.formValidate.labelCode = ''
                                        _self.formValidate.channelFlag = ''
                                        _self.formValidate.labelMemo = ''
                                        _self.loading = false;
                                    }
                                }).catch(function(error){
                                    _self.$Message.error('录入失败！')
                                    _self.loading = false;
                                })
                        } else {
                            _self.loading = false;
                        }
                    })
                }, 2000)
            },

            //  编辑标签
            edit(e) {
                var _self = this
                _self.modal2 = true
                // console.log(e)
                if (e.channelFlag == '否') {
                    _self.formValidate2.channelFlag = '0'
                } else {
                    _self.formValidate2.channelFlag = '1'
                }
                _self.formValidate2.labelName = e.labelName
                _self.formValidate2.labelCode = e.labelCode
                _self.formValidate2.labelMemo = e.labelMemo
                _self.formValidate2.id = e.id
            },
            editTag() {
                var _self = this
                _self.edit_loading = true
                const data = {
                    labelname:_self.formValidate2.labelName,
                    labelcode:_self.formValidate2.labelCode,
                    labelmemo:_self.formValidate2.labelMemo,
                    id:_self.formValidate2.id
                }
                this.$http({
                    method: 'post',
                    url: '/api/system/label/updateLabel',
                    data: data,
                    headers: {'Content-Type': 'application/json'},
                }).then(function (response) {
                    if (response.data.msgCode == '40000') {
                        _self.$Message.success('修改成功')
                        _self.modal2 = false
                        _self.page = 1
                        _self.getTableData()
                    }else{
                        _self.$Message.error('修改失败')
                        _self.modal2 = true                                      
                    }
                    _self.edit_loading = false
                }).catch(function(res){
                    _self.$Message.error('修改失败')
                    _self.edit_loading = false
                    _self.modal2 = true                                      
                })
            },
            //  删除标签
            remove(e) {
                var _self = this
                let url = `/api/system/label/delLabelById`
                let config = {
                    id: e.id
                }
                this.$http.post(url,config)
                    .then(function (response) {
                        if (response.data.msgCode == '40000') {
                            _self.getTableData()
                            _self.$Message.success('删除成功')  
                        }else{
                            _self.$Message.error('删除失败')
                        }
                    }).catch(function(res){
                        _self.$Message.error('删除失败')
                    })
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