<style lang="less">
    @import '../../../styles/common.less';
    @import '../../my-components/markdown-editor/markdown-editor.less';
</style>
<style>
    @import '../../databaseManagement/superTables.css';
    /* @import '../../../libs/easyUI/easyui.css';
    @import '../../../libs/easyUI/icon.css'; */
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
                    <Button type="primary" icon="plus" @click="getProductType();addProduct = true">录入</Button>
                    <Button type="primary" icon="plus" @click="getProductType();EditProducts()">编辑</Button>
                    <Button type="primary" icon="plus" @click="getProductType();detailProducts()">查看</Button>
                </ButtonGroup>
                <Poptip
                        style="float: right"
                        placement="bottom-end"
                        @on-popper-show="isSearch(true)"
                        width="400">
                    <Button type="text" icon="funnel" @click="getSelectOptions">筛选</Button>
                    <div slot="content" v-if="issearch" @keydown.enter="Search">
                        <Form ref="SearchValidate" :model="SearchValidate" :label-width="50" style="margin-top: 15px">
                            <Row :gutter="16" style="height:56px">
                                <Col span="20">
                                <FormItem label="产品名称" prop="product">
                                    <Input v-model="SearchValidate.product" size="small"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="16" style="height:56px">
                                <Col span="20">
                                <FormItem label="产品类型" prop="productCode">
                                    <Input v-model="SearchValidate.productCode" size="small"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <center>
                                <FormItem style="margin-top:10px">
                                    <Button type="primary" @click="Search">搜索</Button>
                                    <Button type="ghost" @click="handleReset('SearchValidate')" style="margin-left: 8px">
                                        重置
                                    </Button>
                                </FormItem>
                            </center>
                        </Form>
                    </div>
                </Poptip>
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
                        @on-change="pageChange"
                        @on-page-size-change="pageSizeChange"
                        style="margin-top: 10px"></Page>
            </Row>
        </Card>
        <Modal
                v-model="addProduct"
                title="录入"
                :loading="loading2"
                @on-ok="handleSubmit('formValidate')"
                @on-cancel="cancel2('formValidate')">
            <Tabs value="name1">
                <TabPane label="基本信息" name="name1">
                    <Form ref="formValidate" :model="formValidate" :rules="Addrule" :label-width="120">
                        <FormItem label="产品名称" prop="product">
                            <Input v-model="formValidate.product"></Input>
                        </FormItem>
                        <FormItem label="产品类型" prop="producttypeid">
                            <input class="chanpin" style="width:200px;height: 25px"/>
                        </FormItem>
                        <FormItem label="是否为周期性产品" prop="iscycle">
                            <Select transfer v-model="formValidate.iscycle">
                                <Option value="Y">是</Option>
                                <Option value="N">否</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="默认服务部门" prop="defaultdepartalias">
                            <Select transfer v-model="formValidate.defaultdepartalias">
                                <Option v-for="item in departValue" :value="item.value" :key="item.value">{{ item.label
                                    }}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="服务部门" prop="departalias">
                            <CheckboxGroup v-model="formValidate.departalias">
                                <Checkbox label="MARKET">市场部</Checkbox>
                                <Checkbox label="PLAN">企划部</Checkbox>
                                <Checkbox label="ACCOUNT">会计部</Checkbox>
                                <Checkbox label="BUSSINESS">商事部</Checkbox>
                                <Checkbox label="EXECUTIVE">行政部</Checkbox>
                                <Checkbox label="FINANCE">财务部</Checkbox>
                                <Checkbox label="PERSONNEL">人事部</Checkbox>
                                <Checkbox label="DEVELOP">研发部</Checkbox>
                                <Checkbox label="AUDIT">审计部</Checkbox>
                                <Checkbox label="ACCOUNT_JZ">兼职会计部</Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                        <FormItem label="产品编码" prop="productcode">
                            <Input v-model="formValidate.productcode"></Input>
                        </FormItem>
                        <FormItem label="产品属性">
                            <Button @click="add = true">选择</Button>
                        </FormItem>
                        <FormItem v-for="(item,index) in addPropertyData" :label="item.text" :key=index>
                            <CheckboxGroup v-model="PropertySelectedData" @on-change="PropertyChange(item.id)">
                                <Checkbox v-for="items in item.children" :label="items.id" :key="items.id">{{ items.text }}</Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                    </Form>
                </TabPane>
                <TabPane label="产品详情" name="name2">
                    <textarea id="iview_admin_markdown_editor" style="display:none"></textarea>
                </TabPane>
            </Tabs>
        </Modal>
        <Modal
                v-model="EditProduct"
                title="编辑"
                :loading="loading3"
                @on-ok="handleSubmit2('formValidate2')"
                @on-cancel="cancel('formValidate2')">
            <Tabs value="name1">
                <TabPane label="基本信息" name="name1">
                    <Form ref="formValidate2" :model="formValidate2" :rules="Editrule" :label-width="120">
                        <FormItem label="产品名称" prop="product">
                            <Input v-model="formValidate2.product"></Input>
                        </FormItem>
                        <FormItem label="产品类型" prop="producttypeid">
                            <input class="chanpin2" style="width:200px;height: 25px"/>
                        </FormItem>
                        <FormItem label="是否为周期性产品" prop="iscycle">
                            <Select transfer v-model="formValidate2.iscycle">
                                <Option value="Y">是</Option>
                                <Option value="N">否</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="默认服务部门" prop="defaultdepartalias">
                            <Select transfer v-model="formValidate2.defaultdepartalias">
                                <Option v-for="item in departValue" :value="item.value" :key="item.value">{{ item.label
                                    }}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="服务部门" prop="departalias">
                            <CheckboxGroup v-model="formValidate2.departalias">
                                <Checkbox label="MARKET">市场部</Checkbox>
                                <Checkbox label="PLAN">企划部</Checkbox>
                                <Checkbox label="ACCOUNT">会计部</Checkbox>
                                <Checkbox label="BUSSINESS">商事部</Checkbox>
                                <Checkbox label="EXECUTIVE">行政部</Checkbox>
                                <Checkbox label="FINANCE">财务部</Checkbox>
                                <Checkbox label="PERSONNEL">人事部</Checkbox>
                                <Checkbox label="DEVELOP">研发部</Checkbox>
                                <Checkbox label="AUDIT">审计部</Checkbox>
                                <Checkbox label="ACCOUNT_JZ">兼职会计部</Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                        <FormItem label="产品编码" prop="productcode">
                            <Input v-model="formValidate2.productcode"></Input>
                        </FormItem>
                        <FormItem label="产品属性">
                            <Button @click="add = true">选择</Button>
                        </FormItem>
                        <FormItem v-for="(item,index) in addPropertyData2" :label="item.name" :key=index>
                            <CheckboxGroup v-model="PropertySelectedData3" @on-change="PropertyChange2(item.id)">
                                <Checkbox v-for="items in item.children" :label="items.pvId" :key="items.pvId">{{ items.propertyValue }}
                                </Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                    </Form>
                </TabPane>
                <TabPane label="产品详情" name="name2">
                    <textarea id="iview_admin_markdown_editor2" style="display:none"></textarea>
                </TabPane>
            </Tabs>
        </Modal>
        <Modal
                v-model="detailProduct"
                title="查看">
            <Tabs value="name1">
                <TabPane label="基本信息" name="name1">
                    <Form ref="formValidate3" :model="formValidate3" :label-width="120">
                        <FormItem label="产品名称" prop="product">
                            <Input v-model="formValidate3.product" readonly></Input>
                        </FormItem>
                        <FormItem label="产品类型">
                            <input class="chanpin3" style="width:200px;height: 25px" readonly/>
                        </FormItem>
                        <FormItem label="是否为周期性产品" prop="iscycle" >
                            <Select transfer v-model="formValidate3.iscycle" disabled>
                                <Option value="Y">是</Option>
                                <Option value="N">否</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="默认服务部门" prop="defaultdepartalias">
                            <Select transfer v-model="formValidate3.defaultdepartalias" disabled>
                                <Option v-for="item in departValue" :value="item.value" :key="item.value">{{ item.label
                                    }}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="服务部门" prop="departalias">
                            <CheckboxGroup v-model="formValidate3.departalias">
                                <Checkbox label="MARKET" disabled>市场部</Checkbox>
                                <Checkbox label="PLAN" disabled>企划部</Checkbox>
                                <Checkbox label="ACCOUNT" disabled>会计部</Checkbox>
                                <Checkbox label="BUSSINESS" disabled>商事部</Checkbox>
                                <Checkbox label="EXECUTIVE" disabled>行政部</Checkbox>
                                <Checkbox label="FINANCE" disabled>财务部</Checkbox>
                                <Checkbox label="PERSONNEL" disabled>人事部</Checkbox>
                                <Checkbox label="DEVELOP" disabled>研发部</Checkbox>
                                <Checkbox label="AUDIT" disabled>审计部</Checkbox>
                                <Checkbox label="ACCOUNT_JZ" disabled>兼职会计部</Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                        <FormItem label="产品编码" prop="productcode">
                            <Input v-model="formValidate3.productcode" readonly></Input>
                        </FormItem>
                        <!--                        <FormItem label="产品属性">
                                                    <Button @click="add = true">选择</Button>
                                                </FormItem>-->
                        <FormItem v-for="(item,index) in addPropertyData3" :label="item.name" :key="index">
                            <CheckboxGroup v-model="PropertySelectedData4" @on-change="PropertyChange(item.id)">
                                <Checkbox v-for="items in item.children" :label="items.pvId" :key="items.pvId" disabled>{{ items.propertyValue }}
                                </Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                    </Form>
                </TabPane>
                <TabPane label="产品详情" name="name2">
                    <textarea id="iview_admin_markdown_editor3" style="display:none"></textarea>
                </TabPane>
            </Tabs>
        </Modal>
        <Modal
                v-model="add"
                width="60%"
                title="添加属性"
                @on-ok="addProperty">
            <Button type="primary" icon="plus" @click="propertyAdd = true">添加</Button>
            <Row style="margin-top: 3%">
                <Table
                        border
                        ref="selection"
                        :columns="columns4"
                        :data="data11"
                        @on-selection-change="selectionChange"></Table>
                <Page
                        size="small"
                        :total="pageTotal2"
                        show-total
                        show-sizer
                        show-elevator
                        @on-change="pageChange2"
                        @on-page-size-change="pageSizeChange2"
                        style="margin-top: 10px"></Page>
            </Row>
        </Modal>
        <Modal
                v-model="propertyAdd"
                width="40%"
                title="新增属性"
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
                                    <Input v-model="item.propertyvalue"
                                           @on-change="addCell(item.ruleIndex)"></Input>
                                </td>
                                <td>
                                    <Input v-model="item.propertyvcode"
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
    </div>
</template>

<script>
    import SimpleMDE from 'simplemde';
    import '../../my-components/markdown-editor/simplemde.min.css';
    import combotree from '../../../libs/easyUI/jquery.easyui.min'

    export default {
        data() {
            const validatetypeId = (rule, value, callback) => {
                if (value === '') {
                    callback()
                } else {
                    callback();
                }
            }
            const validatetypropertyValues = (rule, value, callback) => {
                if (value === '') {
                    callback()
                } else {
                    callback();
                }
            }
            return {
                ishandleSubmit:false,
                maxIndex: 1,
                loading: true,
                loading2: true,
                loading3: true,
                add: false,
                addProduct: false,
                EditProduct: false,
                detailProduct: false,
                propertyAdd: false,
                formValidate: {
                    product: '',
                    producttypeid: '',
                    iscycle: '',
                    defaultdepartalias: '',
                    departalias: [],
                    productcode: '',
                },
                Addrule: {
                    product: [
                        { required: true,  message: '请填产品名称', trigger: 'blur'}
                    ],
                    productcode: [
                        { required: true,  message: '请填产品编码', trigger: 'blur'}
                    ],
                },
                Editrule: {
                    product: [
                        { required: true,  message: '请填产品名称', trigger: 'blur'}
                    ],
                    productcode: [
                        { required: true,  message: '请填产品编码', trigger: 'blur'}
                    ],
                },
                formValidate2: {
                    product: '',
                    producttypeid: '',
                    iscycle: '',
                    defaultdepartalias: '',
                    departalias: [],
                    productcode: '',
                },
                formValidate3: {
                    product: '',
                    producttypeid: '',
                    iscycle: '',
                    defaultdepartalias: '',
                    departalias: [],
                    productcode: '',
                },
                propertyAddForm: {},
                addPropertyData: [],
                addPropertyData2: [],
                addPropertyData3: [],
                PropertySelectedData: [],
                PropertySelectedData2: [],
                PropertySelectedData4: [],
                PropertySelectedData3: [],
                PropertySelectedData5: [],
                test: [],
                test2: [],
                propertyAddRlue: {
                    typeId: [{required: true, validator: validatetypeId}],
                    propertyValues: [{required: true, validator: validatetypropertyValues}],
                    name: [
                        {required: true, message: '请填写属性名称', trigger: 'blur'}
                    ],
                },
                pageTotal: '',
                pageTotal2: '',
                pageSize: 10,
                pageSize2: 10,
                productid: '',
                selection: [],
                data: [],
                data11: [],
                departValue: [],
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '分类',
                        key: 'typeName'
                    },
                    {
                        title: '属性名称',
                        key: 'name'
                    }
                ],
                columns: [
                    {
                        title: '产品名称',
                        key: 'product',
                    },
                    /*                    {
                                            title: '产品类型',
                                            key: 'customer_status',
                                        },*/
                    {
                        title: '状态',
                        key: 'status',
                    },
                    {
                        title: '产品编码',
                        key: 'productcode',
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
                                            this.examine(params)
                                        }
                                    }
                                }, '删除'),
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
                                            sessionStorage.setItem('productId', params.row.id)
                                            this.$router.push({
                                                name: 'productPrice'
                                            });
                                        }
                                    }
                                }, '编辑价格'),
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
                                            sessionStorage.setItem('productId', params.row.id)
                                            this.$router.push({
                                                name: 'productAttribute'
                                            });
                                        }
                                    }
                                }, '选择产品'),
                            ]);
                        }
                    }
                ],
                data1: [
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
                ],
                tableData: [{
                    id: '',
                    ruleIndex: 1,
                    propertyvalue: '',
                    propertyvcode: '',
                }],
            }
        },
        methods: {
            Search(){
                var _self = this;
                if (_self.ishandleSubmit == false) {
                    _self.currentPage = 1;
                    console.log("1111s");
                }
                _self.ishandleSubmit = true;
                _self.getSearchData()

            },
            getData() {
                let _self = this

                let url = '/product/list?page=1&pageSize=10'
                let url2 = '/product/property/typeTree'

                function doSuccess(response) {
                    let _data = response.data.data
                    _self.pageTotal = _data.total

                    for (let i = 0; i < _data.rows.length; i++) {
                        _self.data.push({
                            id: _data.rows[i].id,
                            product: _data.rows[i].product,
                            productcode: _data.rows[i].productCode,
                            status: _data.rows[i].status,
                        })
                    }
                }

                function doSuccess2(response) {
                    var str = JSON.stringify(response.data.data)
                    localStorage.setItem('productType', str)
                }

                this.GetData(url, doSuccess)
                this.GetData(url2, doSuccess2)

            },

            getProductType() {
                let _self = this
                let url = '/product/property/findAllPropertyPages/1/10'
                let url2 = '/product/property/typeTree'
                _self.departValue = []

                $('.chanpin').combotree({
                    data: JSON.parse(localStorage.getItem('productType')),
                    required: true
                });

                this.searchTypegroup('departAlias')
                let _departAliasArr = JSON.parse(localStorage.getItem('departAlias'))
                // console.log(_departAliasArr.length)
                for (let i = 0; i < _departAliasArr.length; i++) {
                    
                    let _departAliasObj = {}

                    _departAliasObj.label = _departAliasArr[i].typename
                    _departAliasObj.value = _departAliasArr[i].typecode
                    _self.departValue.push(_departAliasObj)
                }

                function doSuccess(response) {
                    let _data = response.data.data.rows

                    _self.data11 = []
                    _self.pageTotal2 = response.data.data.total

                    for (let i = 0; i < _data.length; i++) {
                        _self.data11.push({
                            id: _data[i].id,
                            typeName: _data[i].typeName,
                            name: _data[i].name,
                        })
                    }
                    console.log(_self.data11)
                }

                function doSuccess2(response) {
                    $('.fenlei').combotree({
                        data: response.data.data,
                        options: function (value) {
                            console.log(value)
                        }
                    });
                }

                this.GetData(url, doSuccess)
                this.GetData(url2, doSuccess2)
            },

            // 改变页码
            pageChange(a) {
                let _self = this
                let url = '/product/list?page=' + a + '&pageSize=' + _self.pageSize

                function doSuccess(response) {
                    let _data = response.data.data
                    _self.pageTotal = _data.total
                    _self.data = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        _self.data.push({
                            id: _data.rows[i].id,
                            product: _data.rows[i].product,
                            productcode: _data.rows[i].productCode,
                            status: _data.rows[i].status,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            // 改变页码（属性查询）
            pageChange2(a) {
                let _self = this
                let url = '/product/property/findAllPropertyPages/' + a + '/' + _self.pageSize2

                function doSuccess(response) {
                    let _data = response.data.data
                    _self.pageTotal2 = _data.total
                    _self.data11 = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        _self.data11.push({
                            id: _data.rows[i].id,
                            name: _data.rows[i].name,
                            typeName: _data.rows[i].typeName,
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

                this.$http.get('/api/product/list?page=1&pageSize=' + a)
                    .then(function (response) {
                        let _data = response.data.data
                        _self.pageTotal = _data.total

                        for (let i = 0; i < _data.rows.length; i++) {
                            _self.data.push({
                                id: _data.rows[i].id,
                                product: _data.rows[i].product,
                                productcode: _data.rows[i].productCode,
                                status: _data.rows[i].status,
                            })
                        }
                    })
            },

            // 改变每页显示的数据条数（属性查询）
            pageSizeChange2(a) {
                let _self = this

                _self.pageSize2 = a
                _self.data11 = []

                this.$http.get('/api/product/list?page=1&pageSize=' + a)
                this.$http.get('/api/product/property/findAllPropertyPages/1/' + a)
                    .then(function (response) {
                        let _data = response.data.data
                        _self.pageTotal2 = _data.total

                        for (let i = 0; i < _data.rows.length; i++) {
                            _self.data11.push({
                                id: _data.rows[i].id,
                                name: _data.rows[i].name,
                                typeName: _data.rows[i].typeName,
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
                _self.productid = a.id
            },
            handleSubmit(name) {
                let _self = this

                setTimeout(() => {
                    this.loading2 = false;
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            if ($(".chanpin").combotree("getValue") == '') {
                                _self.$nextTick(() => {
                                    _self.loading2 = true;
                                });
                                _self.$Message.error('请选择产品类型');
                            }
                            else if (_self.addPropertyData.length == 0) {
                                _self.$nextTick(() => {
                                    _self.loading2 = true;
                                });
                                _self.$Message.error('请选择产品属性');
                            } else {
                                _self.formValidate.producttypeid = $('.chanpin').combotree('tree').tree('getSelected').id
                                _self.formValidate.sortid = 0
                                _self.formValidate.propertys = JSON.stringify(_self.test)
                                _self.formValidate.departalias = _self.formValidate.departalias.toString()
                                _self.formValidate.producttype = 0

                                this.$http({
                                    method: 'post',
                                    url: '/api/product/create',
                                    data: _self.formValidate,
                                })
                                    .then(function (response) {
                                        if (response.data.msgCode == '40000') {
                                            _self.$Message.success('新增成功!')
                                            _self.cancel('formValidate')
                                            _self.data = []
                                            _self.addPropertyData = []
                                            _self.PropertySelectedData = []
                                            _self.PropertySelectedData2 = []
                                            _self.getData()
                                        }
                                    })
                            }
                        } else {
                            _self.$nextTick(() => {
                                _self.loading2 = true;
                            })
                            _self.addPropertyData = []
                            _self.PropertySelectedData = []
                            _self.PropertySelectedData2 = []
                            _self.cancel('formValidate')
                        }
                    })
                }, 2000)
            },

            handleSubmit2(name) {
                let _self = this

                setTimeout(() => {
                    this.loading3 = false;
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            if ($(".chanpin2").combotree("getValue") == '') {
                                _self.$nextTick(() => {
                                    _self.loading3 = true;
                                });
                                _self.$Message.error('请选择产品类型');
                            }
                            else if (_self.addPropertyData2.length == 0) {
                                _self.$nextTick(() => {
                                    _self.loading3 = true;
                                });
                                _self.$Message.error('请选择产品属性');
                            } else {
                                _self.formValidate2.producttypeid = $('.chanpin2').combotree('tree').tree('getSelected').id
                                _self.formValidate2.sortid = 0
                                _self.formValidate2.propertys = JSON.stringify(_self.test2)
                                _self.formValidate2.departalias = _self.formValidate2.departalias.toString()
                                _self.formValidate2.producttype = 0
                                this.$http({
                                    method: 'post',
                                    url: '/api/product/update',
                                    data: _self.formValidate2,
                                })
                                    .then(function (response) {
                                        if (response.data.msgCode == '40000') {
                                            _self.$Message.success('新增成功!')
                                            _self.cancel('formValidate2')
                                            _self.addPropertyData2 = []
                                            _self.PropertySelectedData3 = []
                                            _self.PropertySelectedData5 = []
                                            _self.getData()
                                        }
                                    })
                            }
                        } else {
                            _self.$nextTick(() => {
                                _self.loading3 = true;
                            });
                            _self.addPropertyData2 = []
                            _self.PropertySelectedData3 = []
                            _self.PropertySelectedData5 = []
                            _self.cancel('formValidate2')
                        }
                    })
                }, 2000)
            },

            cancel(name) {
                this.$refs[name].resetFields();
            },

            cancel2(name) {
                let _self = this
                _self.addPropertyData = []
                _self.PropertySelectedData = []
                _self.PropertySelectedData2 = []
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
                        id: '',
                        ruleIndex: e + 1,
                        propertyvcode: '',
                        propertyvalue: '',
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

                if (e.ruleIndex < _self.tableData.length - 1 || e.ruleIndex == _self.tableData.length - 1) {
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

            ok(name) {
                let _self = this
                let _data = {}

                setTimeout(() => {
                    this.loading = false;
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            outer:
                                if ($(".fenlei").combotree("getValue") == '') {
                                    this.$nextTick(() => {
                                        this.loading = true;
                                    });
                                    this.$Message.error('请选择分类');
                                }
                                else if (_self.tableData.length == 1) {
                                    this.$nextTick(() => {
                                        this.loading = true;
                                    });
                                    this.$Message.error('请填写属性值');
                                }
                                else {
                                    _self.tableData.pop()

                                    for (let i = 0; i < _self.tableData.length; i++) {
                                        for (let j in _self.tableData[i]) {
                                            delete _self.tableData[i].ruleIndex
                                            if (_self.tableData[i].propertyvalue == '' || _self.tableData[i].propertyvcode == '') {
                                                this.$nextTick(() => {
                                                    this.loading = true;
                                                });
                                                this.$Message.error('请检查填写的属性值，不允许为空')
                                                break outer;
                                            }
                                        }
                                    }

                                    let _obj = {}
                                    _obj.name = _self.propertyAddForm.name
                                    _data.baseProperty = _obj
                                    _data.typeId = $(".fenlei").combotree("getValue")
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
                                                _self.tableData = []
                                                _self.getProductType()
//                                            _self.getData()
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

            selectionChange(a) {
                let _self = this
                _self.selection = []

                for (let i = 0; i < a.length; i++) {
                    _self.selection.push(a[i].id)
                }
            },

            addProperty() {
                let _self = this
                let _data = _self.selection.toString()

                this.$http({
                    method: 'get',
                    url: '/api/product/property/queryProperty/' + _data,
                })
                    .then(function (response) {
                        _self.addPropertyData = response.data.data
                    })
            },

            PropertyChange(a) {
                let _self = this
                let _length = _self.PropertySelectedData.length
                let _count = 0
                let difference = _self.PropertySelectedData.concat(_self.PropertySelectedData2).filter(v => !_self.PropertySelectedData.includes(v) || !_self.PropertySelectedData2.includes(v))

                if (_self.PropertySelectedData.length > _self.PropertySelectedData2.length) {
                    for (let i = 0; i < _self.test.length; i++) {
                        if (a == _self.test[i].id) {
                            let _arr = []
                            for (let j = 0; j < _self.test[i].cId.length; j++) {
                                _arr.push(_self.test[i].cId[j])
                            }
                            _arr.push(difference[0])
                            _self.test[i].cId = _arr
                            _self.PropertySelectedData2 = _self.PropertySelectedData
                        } else {
                            _count++
                        }
                    }

                    if (_count == _self.test.length) {
                        _self.test.push({
                            id: a,
                            cId: difference
                        })
                        _self.PropertySelectedData2 = _self.PropertySelectedData
                    }
                } else {
                    let difference = _self.PropertySelectedData.concat(_self.PropertySelectedData2).filter(v => !_self.PropertySelectedData.includes(v) || !_self.PropertySelectedData2.includes(v))
                    under:
                        for (let i = 0; i < _self.test.length; i++) {
                            for (let j = 0; j < _self.test[i].cId.length; j++) {
                                if (difference == _self.test[i].cId[j]) {
                                    _self.test[i].cId.splice(j, 1)
                                    _self.PropertySelectedData2 = _self.PropertySelectedData
                                }
                            }
                            if (_self.test[i].cId.length == 0) {
                                _self.test.splice(i, 1)
                                break under
                            }
                        }
                }
            },

            PropertyChange2(a) {
                let _self = this
                let _length = _self.PropertySelectedData3.length
                let _count = 0
                let difference = _self.PropertySelectedData3.concat(_self.PropertySelectedData5).filter(v => !_self.PropertySelectedData3.includes(v) || !_self.PropertySelectedData5.includes(v))

                if (_self.PropertySelectedData3.length > _self.PropertySelectedData5.length) {
                    for (let i = 0; i < _self.test2.length; i++) {
                        if (a == _self.test2[i].id) {
                            let _arr = []
                            for (let j = 0; j < _self.test2[i].cId.length; j++) {
                                _arr.push(_self.test2[i].cId[j])
                            }
                            _arr.push(difference[0])
                            _self.test2[i].cId = _arr
                            _self.PropertySelectedData5 = _self.PropertySelectedData3
                        } else {
                            _count++
                        }
                    }

                    if (_count == _self.test2.length) {
                        _self.test2.push({
                            id: a,
                            cId: difference
                        })
                        _self.PropertySelectedData5 = _self.PropertySelectedData3
                    }
                } else {
                    let difference = _self.PropertySelectedData3.concat(_self.PropertySelectedData5).filter(v => !_self.PropertySelectedData3.includes(v) || !_self.PropertySelectedData5.includes(v))
                    under:
                        for (let i = 0; i < _self.test2.length; i++) {
                            for (let j = 0; j < _self.test2[i].cId.length; j++) {
                                if (difference == _self.test2[i].cId[j]) {
                                    _self.test2[i].cId.splice(j, 1)
                                    _self.PropertySelectedData5 = _self.PropertySelectedData3
                                }
                            }
                            if (_self.test2[i].cId.length == 0) {
                                _self.test2.splice(i, 1)
                                break under
                            }
                        }
                }
            },

            EditProducts() {
                let _self = this
                let url2 = '/product/property/typeTree'
                let _id = ''

                function doSuccess2(response) {
                    var str = JSON.stringify(response.data.data)
                    localStorage.setItem('productType', str)
                    $('.chanpin2').combotree({
                        data: JSON.parse(localStorage.getItem('productType')),
                        onLoadSuccess: function (node, data) {
                            $(".chanpin2").combotree('setValue', _id)
                        }
                    })
                }

                this.$http.get('/api/product/productDetail?id=' + _self.productid)
                    .then(function (response) {
                        _self.EditProduct = true
                        let _departAliasArr = JSON.parse(localStorage.getItem('departAlias'))

                        for (let i = 0; i < _departAliasArr.length; i++) {

                            let _departAliasObj = {}

                            _departAliasObj.label = _departAliasArr[i].typename
                            _departAliasObj.value = _departAliasArr[i].typecode
                            _self.departValue.push(_departAliasObj)
                        }
                        _self.formValidate2.defaultdepartalias = response.data.data.defaultdepartalias
                        _self.formValidate2.departalias = response.data.data.departalias
                        _self.formValidate2.iscycle = response.data.data.iscycle
                        _self.formValidate2.product = response.data.data.product
                        _self.formValidate2.productcode = response.data.data.productCode
                        _self.addPropertyData2 = response.data.data.propertys
                        _self.test2 = response.data.data.propertys
                        _id = response.data.data.productTypeID

                        for (let i = 0; i < response.data.data.propertys.length; i++) {
                            for (let j = 0; j < response.data.data.propertys[i].children.length; j++) {
                                _self.PropertySelectedData3.push(response.data.data.propertys[i].children[j].pvId)
                            }
                        }

                        _self.GetData(url2, doSuccess2)
                    })
            },

            detailProducts() {
                let _self = this
                let url2 = '/product/property/typeTree'
                let _id = ''

                function doSuccess2(response) {
                    var str = JSON.stringify(response.data.data)
                    localStorage.setItem('productType', str)
                    $('.chanpin3').combotree({
                        data: JSON.parse(localStorage.getItem('productType')),
                        onLoadSuccess: function (node, data) {
                            $(".chanpin3").combotree('setValue', _id)
                        }
                    })
                }

                this.$http.get('/api/product/productDetail?id=' + _self.productid)
                    .then(function (response) {
                        _self.detailProduct = true
                        let _departAliasArr = JSON.parse(localStorage.getItem('departAlias'))

                        for (let i = 0; i < _departAliasArr.length; i++) {

                            let _departAliasObj = {}

                            _departAliasObj.label = _departAliasArr[i].typename
                            _departAliasObj.value = _departAliasArr[i].typecode
                            _self.departValue.push(_departAliasObj)
                        }
                        _self.formValidate3.defaultdepartalias = response.data.data.defaultdepartalias
                        _self.formValidate3.departalias = response.data.data.departalias
                        _self.formValidate3.iscycle = response.data.data.iscycle
                        _self.formValidate3.product = response.data.data.product
                        _self.formValidate3.productcode = response.data.data.productCode
                        _self.addPropertyData3 = response.data.data.propertys
                        _id = response.data.data.productTypeID

                        for (let i = 0; i < response.data.data.propertys.length; i++) {
                            for (let j = 0; j < response.data.data.propertys[i].children.length; j++) {
                                _self.PropertySelectedData4.push(response.data.data.propertys[i].children[j].pvId)
                            }
                        }

                        _self.GetData(url2, doSuccess2)
                    })
            }
        },
        mounted() {
            this.getData()

            new SimpleMDE({
                element: document.getElementById('iview_admin_markdown_editor'),
                toolbar: ['bold', 'italic', 'strikethrough', 'heading', 'heading-smaller', 'heading-bigger', 'heading-1', 'heading-2', 'heading-3', '|', 'code', 'quote', 'unordered-list', 'clean-block', '|', 'link', 'image', 'table', 'horizontal-rule', '|', 'preview', 'guide']
            });
            new SimpleMDE({
                element: document.getElementById('iview_admin_markdown_editor2'),
                toolbar: ['bold', 'italic', 'strikethrough', 'heading', 'heading-smaller', 'heading-bigger', 'heading-1', 'heading-2', 'heading-3', '|', 'code', 'quote', 'unordered-list', 'clean-block', '|', 'link', 'image', 'table', 'horizontal-rule', '|', 'preview', 'guide']
            });
            new SimpleMDE({
                element: document.getElementById('iview_admin_markdown_editor3'),
                toolbar: ['bold', 'italic', 'strikethrough', 'heading', 'heading-smaller', 'heading-bigger', 'heading-1', 'heading-2', 'heading-3', '|', 'code', 'quote', 'unordered-list', 'clean-block', '|', 'link', 'image', 'table', 'horizontal-rule', '|', 'preview', 'guide']
            });
        }
    }
</script>
