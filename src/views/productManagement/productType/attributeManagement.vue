<style lang="less">
    @import '../../../styles/common.less';
    @import '../../my-components/markdown-editor/markdown-editor.less';
    @import '../../../libs/easyUI/easyui.css';
    @import '../../../libs/easyUI/icon.css';
</style>
<style>
    @import '../../databaseManagement/superTables.css';
</style>
<style lang="scss">
    .edit-table {
        border: 1px solid gray;
        border-collapse: collapse;
        th {
            border: 1px solid gray;
        }
        tbody {

            tr {
                td {
                    border: 1px solid gray;
                    input {
                        border: none;
                    }
                }
            }
        }
    }
</style>
<style>
    .CodeMirror {
        min-height: 305px !important;
    }
</style>

<template>
    <div>
        <Card>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="plus" @click="getCombotree();propertyAdd = true">录入</Button>
                    <!--<Button type="primary" icon="plus" @click="EditProduct = true">编辑</Button>-->
                    <!--<Button type="primary" icon="plus" @click="detailProduct = true">查看</Button>-->
                </ButtonGroup>
            </Row>
            <Row style="margin-top: 10px;">
                <Table
                        highlight-row
                        size="small"
                        :columns="columns"
                        :data="data"
                        @on-current-change="selectRow"></Table>
                <Page
                        size="small"
                        :total="pageTotal"
                        show-total
                        show-sizer
                        show-elevator
                        :current.sync="currentPage"
                        @on-change="pageChange"
                        @on-page-size-change="pageSizeChange"
                        style="margin-top: 10px"></Page>
            </Row>
        </Card>
        <Modal
                v-model="propertyAdd"
                width="40%"
                title="录入"
                :loading="loading"
                @on-ok="ok('propertyAddForm')"
                @on-cancel="cancel('propertyAddForm')">
            <Form ref="propertyAddForm" :model="propertyAddForm" :rules="propertyAddRlue" :label-width="120">
                <FormItem label="分类" prop="typeId">
                    <input class="fenlei" style="width:200px;height: 25px"/>
                </FormItem>
                <FormItem label="属性名称" prop="name">
                    <Input v-model="propertyAddForm.name"></Input>
                </FormItem>
                <FormItem label="属性值" prop="propertyValues">
                    <Row>
                        <Col span="24">
                        <table class="edit-table">
                            <thead>
                            <!--<th>#</th>-->
                            <th>属性值</th>
                            <th>属性名</th>
                            <th>操作</th>
                            </thead>
                            <tbody>
                            <tr v-for="item in tableData">
                                <!--<td>-->
                                <!--{{ item.ruleIndex }}-->
                                <!--</td>-->
                                <td>
                                    <Input v-model="item.propertyvcode"
                                           @on-change="addCell(item.ruleIndex)"></Input>
                                </td>
                                <td>
                                    <Input v-model="item.propertyvalue"
                                           @on-change="addCell(item.ruleIndex)"></Input>
                                </td>
                                <td>
                                    <ButtonGroup>
                                        <Button type="ghost" icon="android-arrow-up" @click="upRow(item)"></Button>
                                        <Button type="ghost" icon="android-arrow-down" @click="downRow(item)"></Button>
                                        <Button type="ghost" icon="trash-b" @click="deleteRow(item)"></Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="EditProduct"
                title="编辑"
                :width="1300"
                @on-ok="handleSubmit('formValidate')"
                @on-cancel="cancel('formValidate')">
            <Form ref="formValidate" :model="formValidate" :label-width="120">
                <FormItem label="分类">
                    <input class="fenlei2" style="width:200px;height: 25px"/>
                </FormItem>
                <Row :gutter="16">
                    <Col span="6">
                    <FormItem label="属性名称" prop="name">
                        <Input size="small" v-model="formValidate.name"/>
                    </FormItem>
                    </Col>
                </Row>
                <FormItem label="属性值">
                    <Row>
                        <Col span="24">
                        <table class="edit-table">
                            <thead>
                            <!--<th>#</th>-->
                            <th>属性值</th>
                            <th>属性名</th>
                            <th>操作</th>
                            </thead>
                            <tbody>
                            <tr v-for="item in tableData2">
                                <!--<td>-->
                                <!--{{ item.ruleIndex }}-->
                                <!--</td>-->
                                <td>
                                    <Input v-model="item.propertyvcode"
                                           @on-change="addCell(item.ruleIndex)"></Input>
                                </td>
                                <td>
                                    <Input v-model="item.propertyvalue"
                                           @on-change="addCell(item.ruleIndex)"></Input>
                                </td>
                                <td>
                                    <ButtonGroup>
                                        <!--<Button type="ghost" icon="android-arrow-up" @click="upRow(item)"></Button>-->
                                        <!--<Button type="ghost" icon="android-arrow-down" @click="downRow(item)"></Button>-->
                                        <Button type="ghost" icon="trash-b" @click="deleteRow2(item)"></Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="detailProduct"
                title="查看"
                :width="1300">
            <Form ref="formValidate2" :model="formValidate2" :label-width="120">
                <FormItem label="分类">
                    <input class="fenlei3" style="width:200px;height: 25px" readonly="readonly"/>
                </FormItem>
                <Row :gutter="16">
                    <Col span="6">
                    <FormItem label="属性名称" prop="name">
                        <Input size="small" v-model="formValidate2.name" readonly="readonly"/>
                    </FormItem>
                    </Col>
                </Row>
                <FormItem label="属性值">
                    <Row>
                        <Col span="24">
                        <table class="edit-table">
                            <thead>
                            <!--<th>#</th>-->
                            <th>属性值</th>
                            <th>属性名</th>
                            <!--<th>操作</th>-->
                            </thead>
                            <tbody>
                            <tr v-for="item in tableData2">
                                <!--<td>-->
                                <!--{{ item.ruleIndex }}-->
                                <!--</td>-->
                                <td>
                                    <Input v-model="item.propertyVCode"
                                           @on-change="addCell(item.ruleIndex)" readonly="readonly"></Input>
                                </td>
                                <td>
                                    <Input v-model="item.propertyValue"
                                           @on-change="addCell(item.ruleIndex)" readonly="readonly"></Input>
                                </td>
                                <!--<td>-->
                                    <!--<ButtonGroup>-->
                                        <!--&lt;!&ndash;<Button type="ghost" icon="android-arrow-up" @click="upRow(item)"></Button>&ndash;&gt;-->
                                        <!--&lt;!&ndash;<Button type="ghost" icon="android-arrow-down" @click="downRow(item)"></Button>&ndash;&gt;-->
                                        <!--&lt;!&ndash;<Button type="ghost" icon="trash-b" @click="deleteRow2(item)"></Button>&ndash;&gt;-->
                                    <!--</ButtonGroup>-->
                                <!--</td>-->
                            </tr>
                            </tbody>
                        </table>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="deleteProduct" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除客户</span>
            </p>
            <div style="text-align:center">
                <p>客户信息删除无法恢复</p>
                <p>确定删除吗？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="deleteCustomer2">删除</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import SimpleMDE from 'simplemde';
    import '../../my-components/markdown-editor/simplemde.min.css';
    import combotree from '../../../libs/easyUI/jquery.easyui.min'

    export default {
        data() {
            return {
                currentPage: 1,
                deleteProduct: false,
                loading: true,
                propertyAdd: false,
                EditProduct: false,
                detailProduct: false,
                propertyAddForm: {},
                formValidate: {
                    name: '',
                },
                formValidate2: {
                    name: '',
                },
                tableData: [{
                    ruleIndex: 1,
                    propertyvcode: '',
                    propertyvalue: '',
                }],
                propertyAddRlue: {
                    name: [
                        { required: true, message: '请填写属性名', trigger: 'blur' }
                    ],
                },
                tableData2: [],
                pageTotal: '',
                pageSize: 10,
                customerid: '',
                data: [],
                areaValue: [],
                customertypeValue: [],
                importlevelValue: [],
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '分类',
                        key: 'name'
                    },
                    {
                        title: '属性名称',
                        key: 'age'
                    }
                ],
                columns: [
                    {
                        title: '分类',
                        key: 'typeName',
                    },
                    {
                        title: '属性名称',
                        key: 'name',
                    },
                    {
                        title: '是否关键属性',
                        key: 'isKey',
                    },
                    {
                        title: '状态',
                        key: 'status',
                    },
                    {
                        title: '操作',
                        key: 'action',
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
                                            this.detailAttribute(params)
                                        }
                                    }
                                }, '查看'),
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
                                            this.editAttribute(params)
                                        }
                                    }
                                }, '编辑'),
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
                                            this.deleteAttribute(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
            }
        },
        methods: {
            getData() {
                let _self = this
                let url = '/product/property/list?page=1&pageSize=10'

                function doSuccess(response) {
                    let _data = response.data.data.rows

                    _self.data = []
                    _self.pageTotal = response.data.data.total
                    _self.currentPage = 1

                    for (let i = 0; i < _data.length; i++) {
                        _self.data.push({
                            id: _data[i].id,
                            typeName: _data[i].typeName,
                            name: _data[i].name,
                            status: _data[i].status,
                            isKey: _data[i].isKey,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            pageChange(a) {
                let _self = this
                let url = '/product/property/list?page=' + a + '&pageSize=' + _self.pageSize

                function doSuccess(response) {
                    let _data = response.data.data.rows

                    _self.data = []
                    _self.pageTotal = response.data.data.total

                    for (let i = 0; i < _data.length; i++) {
                        _self.data.push({
                            id: _data[i].id,
                            typeName: _data[i].typeName,
                            name: _data[i].name,
                            status: _data[i].status,
                            isKey: _data[i].isKey,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            // 改变每页显示的数据条数  
            pageSizeChange(a) {
                let _self = this

                _self.pageSize = a
                _self.data = []

                this.$http.get('/api/product/property/list?page=1&pageSize=' + a)
                    .then(function (response) {
                        _self.$backToLogin(response)
                        
                        let _data = response.data.data.rows

                        _self.data = []
                        _self.pageTotal = response.data.data.total

                        for (let i = 0; i < _data.length; i++) {
                            _self.data.push({
                                id: _data[i].id,
                                typeName: _data[i].typeName,
                                name: _data[i].name,
                                status: _data[i].status,
                                isKey: _data[i].isKey,
                            })
                        }
                    })
            },

            examine(e) {
                this.$emit('isExamine', e.row.customer_id)
            },
            // 表格行选中事件
            selectRow(a) {
                var _self = this
                _self.customerid = a.customer_id
            },
            handleSubmit(name) {
                let _self = this
                let _data = {}
                setTimeout(() => {
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            outer:
                                if ($(".fenlei2").combotree("getValue") == '') {
                                    this.$Message.error('请选择分类');
                                }
                            /*    else if (_self.tableData2.length == 1) {
                                    this.$Message.error('请填写属性值');
                                }*/
                                else {
                                    for (let i = 0; i < _self.tableData2.length; i++) {
                                        for (let j in _self.tableData2[i]) {
                                            if (_self.tableData2[i].propertyValue == '' || _self.tableData2[i].propertyVCode == '') {
                                                this.$Message.error('请检查填写的属性值，不允许为空')
                                                break outer;
                                            }
                                        }
                                    }

                                    let _obj = {}
                                    _obj.name = _self.formValidate.name
                                    _obj.id = _self.formValidate.id
                                    _data.baseProperty = _obj
                                    _data.typeId = $(".fenlei2").combotree("getValue")
                                    _data.propertyValues = JSON.stringify(_self.tableData2)
//                                    _data.id = _self.formValidate.id

                                    this.$http({
                                        method: 'post',
                                        url: '/api/product/property/updateProperty',
                                        data: _data,
                                    })
                                        .then(function (response) {
                                            if (response.data.msgCode == '40000') {
                                                _self.$Message.success('编辑成功!')
                                                _self.propertyAdd = false
                                                _self.cancel('propertyAddForm')
                                                _self.tableData = []
                                                _self.getData()
                                            }
                                        })
                                }
                        } else {
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                        }
                    })
                }, 2000)
            },
            cancel(name) {
                let _self = this
                _self.tableData=[{
                    ruleIndex: 1,
                    propertyvcode: '',
                    propertyvalue: '',
                }]
                this.$refs[name].resetFields();
            },
            downloadExcel() {
                let url = '/channel/customer/channel/1/9999999/list'
                let _objdata = {}
                let _response = JSON.parse(localStorage.getItem('area'))

                this.searchTypegroup('area')

                for (let i = 0; i < _response.length; i++) {
                    _objdata[_response[i].typecode] = _response[i].typename
                }

                let arrdata = [
                    {
                        field: 'customer_name', title: '客户名称'
                    },
                    {
                        field: 'customer_mobile_phone', title: '客户手机号'
                    },
                    {
                        field: 'followbyname', title: '跟进人'
                    },
                    {
                        field: 'customer_area', title: '客户区域', format: _objdata
                    }
                ]

                this.DownloadExcel(url, JSON.stringify(arrdata))
            },

            addCell(e) {
                let _self = this
                let _isMax

                _self._isMax = _self.maxIndex > e ? false : true
                _self.maxIndex = _self.maxIndex > e ? _self.maxIndex : e + 1

                if (_self._isMax) {
                    _self.tableData.push({
                        ruleIndex: e + 1,
                        propertyvalue: '',
                        propertyvCode: '',
                    })
                }
            },

            upRow(e) {
                let _self = this
                let _rowData = {}
                let _tableData = []
                _tableData = _self.tableData
                if (e.ruleIndex > 1) {
                    _rowData = e
                    _tableData[e.ruleIndex - 1] = _tableData[e.ruleIndex - 2]
                    _tableData[e.ruleIndex - 1].ruleIndex = e.ruleIndex
                    _tableData[e.ruleIndex - 2] = _rowData
                    _tableData[e.ruleIndex - 2].ruleIndex = e.ruleIndex - 1

                    _self.tableData = []
                    _self.tableData = _tableData
                }
            },
            downRow(e) {
                let _self = this
                let _rowData = {}
                let _tableData = []

                _tableData = _self.tableData

                if (e.ruleIndex < _self.tableData.length - 1) {
                    _rowData = e
                    _tableData[e.ruleIndex - 1] = _tableData[e.ruleIndex]
                    _tableData[e.ruleIndex - 1].ruleIndex = e.ruleIndex
                    _tableData[e.ruleIndex] = _rowData
                    _tableData[e.ruleIndex].ruleIndex = e.ruleIndex + 1

                    _self.tableData = []
                    _self.tableData = _tableData
                }
            },
            deleteRow(e) {
                let _self = this
                let _tableData = []

                if (e.ruleIndex < _self.tableData.length - 1) {
                    _tableData = _self.tableData

                    _tableData.splice(e.ruleIndex - 1, 1)

                    _self.tableData = []
                    _self.maxIndex = _tableData.length

                    for (let i = 0; i < _tableData.length; i++) {
                        _tableData[i].ruleIndex = i + 1
                        _self.tableData.push(_tableData[i])
                    }

                }
            },

            deleteRow2(e) {
                let _self = this
                for (let i = 0; i < _self.tableData2.length; i++) {
                    if (e.id == _self.tableData2[i].id) {
                        _self.tableData2.splice(i,1)
                    }
                }
            },

            getCombotree() {
                let url2 = '/product/property/typeTree'

                function doSuccess2(response) {
                    $('.fenlei').combotree({
                        data: response.data.data,
                        required:true,
                        options: function (value) {
                        }
                    });
                }

                this.GetData(url2, doSuccess2)
            },

            ok(name) {
                let _self = this
                let _data = {}

                setTimeout(() => {
                    this.loading = false;
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            outer:
                                if ($(".fenlei").combotree("getValue") == '') {
                                    _self.$nextTick(() => {
                                        _self.loading = true;
                                    });
                                    _self.$Message.error('请选择分类');
                                }
                                else if (_self.tableData.length == 1) {
                                    _self.$nextTick(() => {
                                        _self.loading = true;
                                    });
                                    _self.$Message.error('请填写属性值');
                                }
                                else {
                                    for (let i = 0; i < _self.tableData.length - 1; i++) {
//                                        for (let j in _self.tableData[i]) {
//                                            delete _self.tableData[i].ruleIndex
                                            if (_self.tableData[i].propertyvalue == '' || _self.tableData[i].propertyvcode == '') {
                                                _self.$nextTick(() => {
                                                    _self.loading = true;
                                                });
                                                _self.$Message.error('请检查填写的属性值，不允许为空')
                                                break outer;
                                            }
//                                        }
                                    }

                                    let _obj = {}
                                    _obj.name = _self.propertyAddForm.name
                                    _data.baseProperty = _obj
                                    _data.typeId = $(".fenlei").combotree("getValue")
                                    _self.tableData.pop()
                                    _data.propertyValues = JSON.stringify(_self.tableData)

                                    this.$http({
                                        method: 'post',
                                        url: '/api/product/property/createProperty',
                                        data: _data,
                                    })
                                        .then(function (response) {
                                            if (response.data.msgCode == '40000') {
                                                _self.$Message.success('新增成功!')
                                                _self.propertyAdd = false
                                                _self.cancel('propertyAddForm')
                                                _self.tableData=[{
                                                    ruleIndex: 1,
                                                    propertyvcode: '',
                                                    propertyvalue: '',
                                                }]
                                                _self.getData()
                                            }
                                        })
                                }
                        } else {
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                        }
                    })
                }, 2000)
            },

            editAttribute(a) {
                let _self = this
                let _id = ''
                let url = '/product/property/findPropertyById/' + a.row.id
                let url2 = '/product/property/typeTree'

                function doSuccess(response) {
                    _self.EditProduct = true
                    _id = response.data.data.property[0].typeId
                    _self.formValidate.name = response.data.data.property[0].name
                    _self.formValidate.id = response.data.data.property[0].id
                    _self.tableData2 = response.data.data.propertyV
                    _self.GetData(url2, doSuccess2)
                }

                function doSuccess2(response) {
                    $('.fenlei2').combotree({
                        data: response.data.data,
                        options: function (value) {
                        },
                        onLoadSuccess:function(node,data){
                            $(".fenlei2").combotree('setValue', _id)
                        }
                    });
                }

                this.GetData(url, doSuccess)
            },

            detailAttribute(a) {
                let _self = this
                let _id = ''
                let url = '/product/property/findPropertyById/' + a.row.id
                let url2 = '/product/property/typeTree'

                function doSuccess(response) {
                    _self.detailProduct = true
                    _id = response.data.data.property[0].typeId
                    _self.formValidate2.name = response.data.data.property[0].name
                    _self.tableData2 = response.data.data.propertyV
                    _self.GetData(url2, doSuccess2)
                }

                function doSuccess2(response) {
                    $('.fenlei3').combotree({
                        data: response.data.data,
                        options: function (value) {
                        },
                        onLoadSuccess:function(node,data){
                            $(".fenlei3").combotree('setValue', _id)
                        }
                    });
                }

                this.GetData(url, doSuccess)
            },

            deleteAttribute(a) {
                let _self = this
                let url = '/product/property/delProperty'

                function doSuccess(response) {
                    _self.getData()
                    _self.$Message.success('删除成功!')
                }

                this.PostData(url, {id:a.row.id }, doSuccess)
            }
        },
        mounted() {
            let _self = this
            this.getData()
            new SimpleMDE({
                element: document.getElementsByClassName('iview_admin_markdown_editor'),
                toolbar: ['bold', 'italic', 'strikethrough', 'heading', 'heading-smaller', 'heading-bigger', 'heading-1', 'heading-2', 'heading-3', '|', 'code', 'quote', 'unordered-list', 'clean-block', '|', 'link', 'image', 'table', 'horizontal-rule', '|', 'preview', 'guide']
            });
        }
    }
</script>