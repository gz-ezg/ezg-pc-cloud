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
    <div style="min-width:800px">
        <Tabs value="name1">
            <TabPane label="未领取" name="name1">
                <Card>
                    <Row style="margin-bottom:10px">
                        <Collapse v-model="search_model">
                            <Panel name="1" >
                                <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                                筛选
                                <div slot="content" @keydown.enter="Search">
                                    <Form ref="SearchValidate" :model="SearchValidate" :label-width="80">
                                        <Row :gutter="16">
                                            <Col span="8">
                                            <FormItem label="客户名称：" prop="customerName">
                                                <Input v-model="SearchValidate.customerName" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                            <Col span="8">
                                            <FormItem label="客户电话：" prop="customerTel">
                                                <Input v-model="SearchValidate.customerTel" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                            <Col span="8">
                                            <FormItem label="创建人：" prop="crealname">
                                                <Input v-model="SearchValidate.crealname" size="small"></Input>
                                            </FormItem>
                                            </Col>
                                        </Row>
                                        <Row :gutter="16" style="height:56px">
                                            <Col span="8">
                                            <FormItem label="线索类型：" prop="clueType">                  
                                                <Select transfer v-model="SearchValidate.clueType" size="small">
                                                    <Option value="ybxs">普通</Option>
                                                    <Option value="qdxs">渠道</Option>
                                                    <Option value="kjxs">会计线索</Option>
                                                </Select>
                                            </FormItem>
                                            </Col>
                                            <Col span="8">
                                                <FormItem label="创建时间：" prop="date">
                                                    <DatePicker transfer type="daterange" style="width:100%" size="small" v-model="SearchValidate.date" placement="bottom-end"></DatePicker>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <!-- <Row :gutter="16" style="height:56px">
                                            
                                                                                <Col span="12">
                                            <FormItem label="线索状态：" prop="clueStatus">
                                                <Select transfer v-model="SearchValidate.clueStatus" transfer>
                                                    <Option value="未领取">未领取</Option>
                                                    <Option value="已领取">已领取</Option>
                                                </Select>
                                            </FormItem> 
                                            </Col>
                                        </Row> -->
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
                            </Panel>
                        </Collapse>
                    </Row>
                    <Row>
                        <ButtonGroup>
                            <Button v-permission="['cluesLibraryM.n.add']" type="primary" icon="ios-color-wand-outline" @click="AddClues">新增</Button>
                            <!--<Button type="primary" icon="ios-color-wand-outline" @click="YYAddClues">运营新增</Button>-->
                            <!--<Button type="primary" icon="ios-color-wand-outline" @click="EditClues">编辑</Button>-->
                            <Button v-permission="['cluesLibraryM.n.delete']" type="primary" icon="ios-color-wand-outline" @click="DeleteClues">删除</Button>
                        </ButtonGroup>
                        <!-- <Poptip
                            style="float: right"
                            placement="bottom-end"
                            @on-popper-show="isSearch(true)"
                            width="600">
                        <Button type="text" icon="funnel">筛选</Button>
                        
                    </Poptip> -->
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table
                                highlight-row
                                size="small"
                                :columns="tableColumns"
                                :data="tableData"
                                @on-current-change="selectRow"></Table>
                        <Page
                                size="small"
                                :total="pageTotal"
                                show-total
                                show-sizer
                                show-elevator
                                :current.sync = "paget"
                                @on-change="pageChange"
                                @on-page-size-change="pageSizeChange"
                                style="margin-top: 10px"></Page>
                    </Row>
                </Card>
            </TabPane>
            <TabPane label="已领取" name="name2">
                <Card>
                    <Row style="margin-bottom:10px">
                        <Collapse v-model="search_model2">
                            <Panel name="1">
                                <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                                筛选
                                <div slot="content" @keydown.enter="Search1">
                                    <Form ref="SearchValidate1" :model="SearchValidate1" :label-width="80">
                                        <Row :gutter="16" style="height:56px">
                                            <Col span="8">
                                                <FormItem label="客户名称：" prop="customerName">
                                                    <Input v-model="SearchValidate1.customerName" size="small"></Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="8">
                                                <FormItem label="客户电话：" prop="customerTel">
                                                    <Input v-model="SearchValidate1.customerTel" size="small"></Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="8">
                                                <FormItem label="创建人：" prop="crealname">
                                                    <Input v-model="SearchValidate1.crealname" size="small"></Input>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row :gutter="16" style="height:56px">
                                            <Col span="8">
                                                <FormItem label="线索类型：" prop="clueType">                  
                                                    <Select transfer v-model="SearchValidate1.clueType" size="small" >
                                                        <Option value="ybxs">普通</Option>
                                                        <Option value="qdxs">渠道</Option>
                                                        <Option value="kjxs">会计线索</Option>
                                                    </Select>
                                                </FormItem>
                                            </Col>
                                            <Col span="8">
                                                <FormItem label="领取人：" prop="rrealname">
                                                    <Input v-model="SearchValidate1.rrealname" size="small"></Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="8">
                                                <FormItem label="创建时间：" prop="date">
                                                    <DatePicker placement="bottom-end" transfer type="daterange" style="width:100%"  size="small" v-model="SearchValidate1.date"></DatePicker>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <!-- <Row :gutter="16" style="height:56px">
                                            
                                                                                <Col span="12">
                                            <FormItem label="线索状态：" prop="clueStatus">
                                                <Select transfer v-model="SearchValidate.clueStatus"  transfer>
                                                    <Option value="未领取">未领取</Option>
                                                    <Option value="已领取">已领取</Option>
                                                </Select>
                                            </FormItem> 
                                            </Col>
                                        </Row> -->
                                        <center>
                                            <FormItem style="margin-top:10px">
                                                <Button type="primary" @click="Search1">搜索</Button>
                                                <Button type="ghost" @click="handleReset1('SearchValidate1')" style="margin-left: 8px">
                                                    重置
                                                </Button>
                                            </FormItem>
                                        </center>
                                    </Form>
                                </div>
                            </Panel>
                        </Collapse>
                    </Row>
                    <Row>
                        <ButtonGroup>
                            <Button v-permission="['cluesLibraryM.y.delete']" type="primary" icon="ios-color-wand-outline" @click="DeleteClues">删除</Button>
                        </ButtonGroup>
                        <!-- <Poptip
                            style="float: right"
                            placement="bottom-end"
                            @on-popper-show="isSearch(true)"
                            width="600">
                        <Button type="text" icon="funnel">筛选</Button>
                        
                    </Poptip> -->
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Table
                                highlight-row
                                size="small"
                                :columns="tableColumns2"
                                :data="tableData2"
                                @on-current-change="selectRow"></Table>
                        <Page
                                size="small"
                                :total="pageTotal22"
                                show-total
                                show-sizer
                                show-elevator
                                @on-change="pageChange22"
                                @on-page-size-change="pageSizeChange22"
                                style="margin-top: 10px"></Page>
                    </Row>
                </Card>
            </TabPane>
        </Tabs>
        <Modal
                v-model="modal2"
                title="新增线索"
                class-name="vertical-center-modal"
                ok-text="保存"
                :styles="{top: '10%'}"
                :loading="loading"
                @on-ok="ok22('formValidate')"
                @on-cancel="cancel('formValidate')">
            <Form ref="formValidate" :model="formValidate"  :rules="ruleValidate" :label-width="90">
                <FormItem label="客户名称" prop="customerName">
                    <Input v-model="formValidate.customerName"></Input>
                </FormItem>
                <FormItem label="客户电话" prop="customerTel">
                    <Input v-model="formValidate.customerTel"></Input>
                </FormItem>
                <FormItem label="标签" prop="labels">
                    <Tag v-for="item in customerlabelGroup" :key="item" :name="item" :id="item.id" closable
                         @on-close="handleClose2">
                        {{ item.labelName }}
                    </Tag>
                    <Button icon="ios-plus-empty" type="dashed" size="small" @click="getLabelData();addTag = true">添加</Button>
                </FormItem>
                <FormItem label="线索说明" prop="clueMemo">
                    <Input v-model="formValidate.clueMemo" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="modal22"
                title="运营新增线索"
                class-name="vertical-center-modal"
                ok-text="保存"
                :styles="{top: '10%'}"
                :loading="loading"
                @on-ok="ok222('formValidate22')"
                @on-cancel="cancel('formValidate22')">
            <Form ref="formValidate22" :model="formValidate22"  :rules="ruleValidate22" :label-width="90">
                <FormItem label="客户名称" prop="customerName">
                    <Input v-model="formValidate22.customerName"></Input>
                </FormItem>
                <FormItem label="客户电话" prop="customerTel">
                    <Input v-model="formValidate22.customerTel"></Input>
                </FormItem>
                <FormItem label="运营来源" prop="labels">
                    <Tag v-for="item in customerlabelGroup22" :key="item" :name="item" :id="item.id" closable
                         @on-close="handleClose2">
                        {{ item.labelName }}
                    </Tag>
                    <Button icon="ios-plus-empty" type="dashed" size="small" @click="getLabelData();addTag = true">添加</Button>
                </FormItem>
                <FormItem label="标签" prop="labels">
                    <Tag v-for="item in customerlabelGroup" :key="item" :name="item" :id="item.id" closable
                         @on-close="handleClose2">
                        {{ item.labelName }}
                    </Tag>
                    <Button icon="ios-plus-empty" type="dashed" size="small" @click="getLabelData();addTag = true">添加</Button>
                </FormItem>
                <FormItem label="线索说明" prop="clueMemo">
                    <Input v-model="formValidate22.clueMemo" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="modal3"
                title="编辑线索"
                class-name="vertical-center-modal"
                ok-text="保存"
                :styles="{top: '10%'}"
                :loading="loading2"
                @on-ok="ok('formValidate2')"
                @on-cancel="cancel('formValidate2')">
            <Form ref="formValidate2" :model="formValidate2" :label-width="90">
                <FormItem label="客户名称" prop="customerName">
                    <Input v-model="formValidate2.customerName" disabled></Input>
                </FormItem>
                <FormItem label="客户电话" prop="customerTel">
                    <Input v-model="formValidate2.customerTel" disabled></Input>
                </FormItem>
                <FormItem label="线索状态" prop="cluesstatus">
                    <Input v-model="formValidate2.cluesstatus" disabled></Input>
                </FormItem>
                <FormItem label="线索类型" prop="cluestype">
                    <Input v-model="formValidate2.cluestype" disabled></Input>
                </FormItem>
                <FormItem label="创建人" prop="createby">
                    <Input v-model="formValidate2.createby" disabled></Input>
                </FormItem>
                <FormItem label="创建时间" prop="createdate">
                    <Input v-model="formValidate2.createdate" disabled></Input>
                </FormItem>
                <FormItem label="线索标签" prop="labels">
                    <Tag v-for="item in customerlabelGroup" :key="item" :name="item" :id="item.id" closable
                         @on-close="handleClose2">
                        {{ item.labelName }}
                    </Tag>
                    <Button icon="ios-plus-empty" type="dashed" size="small" @click="getLabelData();addTag = true">添加</Button>
                </FormItem>
                <FormItem label="线索说明" prop="cluescontent">
                    <Input v-model="formValidate2.cluescontent" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="modal4"
                title="查看线索"
                class-name="vertical-center-modal"
                :styles="{top: '10%'}">
            <Form ref="formValidate2" :model="formValidate2" :label-width="90">
                <FormItem label="客户名称" prop="customerName">
                    <Input v-model="formValidate2.customerName" disabled></Input>
                </FormItem>
                <FormItem label="客户电话" prop="customerTel">
                    <Input v-model="formValidate2.customerTel" disabled></Input>
                </FormItem>
                <FormItem label="线索状态" prop="cluesstatus">
                    <Input v-model="formValidate2.cluesstatus" disabled></Input>
                </FormItem>
                <FormItem label="线索类型" prop="cluestype">
                    <Input v-model="formValidate2.cluestype" disabled></Input>
                </FormItem>
                <FormItem label="创建人" prop="createby">
                    <Input v-model="formValidate2.createby" disabled></Input>
                </FormItem>
                <FormItem label="创建时间" prop="createdate">
                    <Input v-model="formValidate2.createdate" disabled></Input>
                </FormItem>
                <FormItem label="线索标签" prop="labels">
                    <Tag v-for="item in customerlabelGroup" :key="item" :name="item" :id="item.id">
                        {{ item.labelName }}
                    </Tag>
                </FormItem>
                <FormItem label="线索说明" prop="cluescontent">
                    <Input v-model="formValidate2.cluescontent" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}" disabled></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="addTag"
                title="添加标签"
                @on-ok="ok2"
                @on-cancel="cancel2">
            <Table
                    border
                    ref="selection"
                    :columns="columns4"
                    :data="data"
                    @on-select-cancel="selectCancel"
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
        </Modal>
    </div>
</template>

<script>
import {DateFormat} from '../../../libs/utils'

    export default {
        data() {
            const validateTel = (rule, value, callback) => {
                var re = /^1\d{10}$/
                if (value == '' || value == null) {
                    callback(new Error('电话不能为空'));
                } else {
                    if (re.test(value)) {
                        callback()
                    } else {
                        callback(new Error('电话格式不正确'));
                    }
                }
            };
            return {
                customerlabelGroup22:[],
                search_model2:"",
                search_model:"",
                page:new Number(),
                //  已领取的检索
                ishandleSubmit1:false,
                SearchValidate1:{
                    customerName:'',
                    customerTel:'',
                    crealname:'',
                    clueStatus:'',
                    clueType:'',
                    date:'',
                    rrealname:''
                },
                //  未领取的线索
                ishandleSubmit:false,                
                SearchValidate:{
                    customerName:'',
                    customerTel:'',
                    crealname:'',
                    clueStatus:'',
                    clueType:'',
                    date:''
                },
                addTag: false,
                isEidt: false,
                modal1: false,
                modal2: false,
                modal22: false,
                modal3: false,
                modal4: false,
                selectCompany: false,
                loading: true,
                loading2: true,
                ruleValidate: {
                    customerName: [
                        { required: true, message: '请填写客户名称', trigger: 'blur'}
                    ],
                    customerTel: [
                        { required: true, trigger: 'blur', validator: validateTel}
                    ],
                    clueMemo: [
                        { required: true, message: '请填写线索说明', trigger: 'blur' },
                    ]
                },
                ruleValidate22: {
                    customerName: [
                        { required: true, message: '请填写客户名称', trigger: 'blur'}
                    ],
                    customerTel: [
                        { required: true, trigger: 'blur', validator: validateTel}
                    ],
                    clueMemo: [
                        { required: true, message: '请填写线索说明', trigger: 'blur' },
                    ]
                },
                formValidate: {
                    customerTel: '',
                    clueMemo: '',
                    customerName: '',
                },
                formValidate22: {
                    customerTel: '',
                    clueMemo: '',
                    customerName: '',
                },
                formValidate2: {
                    cluescontent: '',
                    cluestype: '',
                    cluesstatus: '',
                    companyid: '',
                    companyname: '',
                    createby: '',
                    customername: '',
                    id: '',
                    label: '',
                    receiveby: '',
                    tel: '',
                    createdate: ''
                },
                tableColumns: [
                    {
                        title: '客户名称',
                        key: 'customername',
                        width: 130,
                    },
                    {
                        title: '客户电话',
                        key: 'tel',
                        width: 130,
                    },
                    {
                        title: '线索状态',
                        key: 'cluesstatus',
                        width: 100,
                    },
                    {
                        title: '线索创建时间',
                        key: 'createdate',
                        width: 160,
                    },
                    {
                        title: '创建人',
                        key: 'createby',
                        width: 100,
                    },
/*                    {
                        title: '领取人',
                        key: 'receiveby',
                        width: 100,
                    },*/
                    {
                        title: '线索标签',
                        key: 'labelName',
                        width: 300,
                    },
                    {
                        title: '线索类型',
                        key: 'cluestype',
                        width: 100,
                    },
                    {
                        title: '线索说明',
                        key: 'memo',
                        width: 200,
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 60,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                        permission: "['cluesLibraryM.y.cheek']"
                                    },
                                    style: {
                                        marginRight: '2px'
                                    },
                                    on: {
                                        click: () => {
                                            this.lingq(params)
                                        }
                                    }
                                }, '领取')
                            ]);
                        }
                    }
                ],
                tableColumns2: [
                    {
                        title: '客户名称',
                        key: 'customername',
                        width: 130,
                    },
                    {
                        title: '客户电话',
                        key: 'tel',
                        width: 130,
                    },
                    {
                        title: '线索状态',
                        key: 'cluesstatus',
                        width: 100,
                    },
                    {
                        title: '线索创建时间',
                        key: 'createdate',
                        width: 160,
                    },
                    {
                        title: '创建人',
                        key: 'createby',
                        width: 100,
                    },
                    {
                        title: '领取人',
                        key: 'receiptor',
                        width: 100,
                    },
                    {
                        title: '线索标签',
                        key: 'labelName',
                        width: 150,
                    },
                    {
                        title: '线索类型',
                        key: 'cluestype',
                        width: 100,
                    },
                    {
                        title: '线索详情',
                        key: 'memo',
                        width: 200,
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 60,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '2px'
                                    },
                                    on: {
                                        click: () => {
                                            this.detailClue(params)
                                        }
                                    }
                                }, '查看')
                            ]);
                        }
                    }
                ],
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '标签',
                        key: 'labelName'
                    },
                ],
                columns44: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '公司名称',
                        key: 'CompanyName'
                    },
                ],
                data: [],
                data1: [],
                tableData: [],
                tableData2: [],
                data4: [],
                customerlabelGroup: [],
                customerlabelGroup2: [],
                cluesTypeValue: [],
                cluesTypeValue2: [],
                companyDetail: [],
                cluesid: '',
                pageTotal: new Number(),
                pageTotal2: new Number(),
                pageTotal3: new Number(),
                searchCompany: '',
                currentPage: 1,
                pageSize: 10,
                customerid: '',
                isSearch: false,
                paget: 1,
                pageSizet: 10,
                pagey: 1,
                pageSizey: 10,
                selectData: {},
                pageTotal22: new Number(),
                allUser: [],
                cluetype: [],
            }
        },
        methods: {
            ok2(){},
            cancel2(){},
            handleReset(){
                var _self = this
                _self.SearchValidate.customerName = ''
                _self.SearchValidate.customerTel = ''
                _self.SearchValidate.crealname = ''
                _self.SearchValidate.date = '',
                _self.SearchValidate.clueType = ''
                _self.paget = 1
                _self.getTableData()
            },
            handleReset1(){
                var _self = this
                _self.SearchValidate1.customerName = ''
                _self.SearchValidate1.customerTel = ''
                _self.SearchValidate1.crealname = ''
                _self.SearchValidate1.date = '',
                _self.SearchValidate1.clueType = '',
                _self.SearchValidate1.rrealname = ''
                _self.pagey = 1
                _self.getTableData2()
            },
            Search() {
                var _self = this;
                _self.paget = 1
                _self.getTableData();
            },
            Search1() {
                var _self = this;
                _self.pagey = 1;
                _self.getTableData2();
            },
            getDataCenter() {
                var _self = this;
                var url = `api/user/findAllUsers`;
                this.$http.get(url).then(function(res) {
                    var temp = res.data.data;
                    _self.allUser = temp;
                });
                // var url2 = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=cluetype`;
                // this.$http.get(url2).then(function(res) {
                //     var temp = res.data.data;
                //     _self.cluetype = temp.cluetype
                // });

                let params = "cluetype"

                function finish(res){
                    var temp = res.data.data;
                    _self.cluetype = temp.cluetype
                }

                this.$GetDataCenter(params, finish)
            },
            findUserText(temp) {
                var _self = this;
                for (let i = 0; i < _self.allUser.length; i++) {
                    if (_self.allUser[i].id == temp && temp != "") {
                        return _self.allUser[i].realname;
                    }
                }
            },
            findCluetypeText(temp) {
                var _self = this;
                for (let i = 0; i < _self.cluetype.length; i++) {
                    if (_self.cluetype[i].typecode == temp && temp != "") {
                        return _self.cluetype[i].typename;
                    }
                }
            },
            // 表格数据请求
            getTableData() {
                let _self = this
                let url = 'api/clue/list'
                var keys =[]
                    var config = {
                        params:{
                            receipt:'N',
                            isAudit:'Y',
                            sortField:'id',
                            order:'desc',
                            page:_self.paget,
                            pageSize:_self.pageSizet,
                            customerName:_self.SearchValidate.customerName,
                            customerTel:_self.SearchValidate.customerTel,
                            crealname:_self.SearchValidate.crealname,
                            bcreatedate:DateFormat(_self.SearchValidate.date[0]),
                            ecreatedate:DateFormat(_self.SearchValidate.date[1]),
                            // clueStatus:_self.SearchValidate.clueStatus,
                            clueType:_self.SearchValidate.clueType
                        }
                    }
                //     for (var key in _self.SearchValidate) {
                //     if (_self.SearchValidate[key] == "" || _self.SearchValidate[key] == null) {
                //     delete config.params[key];
                //     }
                // }

                function doSuccess(response) {
                    _self.tableData = []
                    _self.pageTotal = response.data.data.total
                    console.log(response)
                    for (let i = 0; i < response.data.data.rows.length; i++) {
                        let _tel
                        if (response.data.data.rows[i].customer_tel == null) {
                            _tel = ''
                        } else {
                            _tel = response.data.data.rows[i].customer_tel
                        }
                        _self.tableData.push({
                            id: response.data.data.rows[i].id,
                            cluestype: _self.findCluetypeText(response.data.data.rows[i].clue_type),
                            memo: response.data.data.rows[i].clue_memo,
                            cluesstatus: '未领取',
                            companyname: response.data.data.rows[i].companyname,
                            tel: _tel,
                            people: [
                                {
                                    tel: _tel,
                                    customername: response.data.data.rows[i].customer_name,
                                }
                            ],
                            customername: response.data.data.rows[i].customer_name,
                            createby: (response.data.data.rows[i].crealname),
                            labelName: response.data.data.rows[i].labelname,
                            createdate: response.data.data.rows[i].createdate,
                        })
                    }
                }

                _self.$http.get(url,config).then(function(res){
                    _self.$backToLogin(res)                    
                    doSuccess(res)
                })
            },

            getTableData2() {
                let _self = this
                let url = 'api/clue/list'

                var keys =[]
                    var config = {
                        params:{
                            receipt:'Y',
                            // isAudit:'Y',
                            sortField:'id',
                            order:'desc',
                            page:_self.pagey,
                            pageSize:_self.pageSizey,
                            customerName:_self.SearchValidate1.customerName,
                            customerTel:_self.SearchValidate1.customerTel,
                            crealname:_self.SearchValidate1.crealname,
                            bcreatedate:DateFormat(_self.SearchValidate1.date[0]),
                            ecreatedate:DateFormat(_self.SearchValidate1.date[1]),
                            // clueStatus:_self.SearchValidate.clueStatus,
                            clueType:_self.SearchValidate1.clueType,
                            rrealname:_self.SearchValidate1.rrealname
                        }
                    }
                //     for (var key in _self.SearchValidate1) {
                //     if (_self.SearchValidate1[key] == "" || _self.SearchValidate1[key] == null) {
                //     delete config.params[key];
                //     }
                // }
                _self.tableData2 = []

                function doSuccess(response) {
                    _self.pageTotal22 = response.data.data.total

                    for (let i = 0; i < response.data.data.rows.length; i++) {
                        let _tel
                        if (response.data.data.rows[i].customer_tel == null) {
                            _tel = ''
                        } else {
                            _tel = response.data.data.rows[i].customer_tel
                        }
                        _self.tableData2.push({
                            id: response.data.data.rows[i].id,
                            cluestype: _self.findCluetypeText(response.data.data.rows[i].clue_type),
                            memo: response.data.data.rows[i].clue_memo,
                            receiptor: response.data.data.rows[i].rrealname,
                            cluesstatus: '已领取',
                            companyname: response.data.data.rows[i].companyname,
                            tel: _tel,
                            people: [
                                {
                                    tel: _tel,
                                    customername: response.data.data.rows[i].customer_name,
                                }
                            ],
                            customername: response.data.data.rows[i].customer_name,
                            createby: response.data.data.rows[i].crealname,
                            labelName: response.data.data.rows[i].labelname,
                            createdate: response.data.data.rows[i].createdate,
                        })
                    }
                }

                _self.$http.get(url, config).then(function(res){
                    _self.$backToLogin(res)                    
                    doSuccess(res)
                })
            },

            // 改变页码
            pageChange(a) {
                let _self = this
                _self.paget = a
                _self.getTableData()
            },

            pageChange22(a) {
                let _self = this
                _self.pagey = a
                _self.getTableData2()
            },

            // 改变每页显示的数据条数
            pageSizeChange(a) {
                let _self = this
                _self.pageSizet = a
                _self.getTableData()
            },

            pageSizeChange22(a) {
                let _self = this
                _self.pageSizey = a
                _self.getTableData2()
            },

            // 表格行选中事件
            selectRow(a) {
                var _self = this
                _self.cluesid = a.id
                _self.selectData = a
            },

            detail(e) {
                let _self = this
                let url = '/order/queryListByCustomer?customerId=' + e.row.oacustomerid + '&page=1&pageSize=10000'

                _self.modal2 = true
                _self.formValidate.companyname = e.row.companyname
                _self.formValidate.name = e.row.name
                _self.formValidate.tel = e.row.tel
                _self.formValidate.updatedate = e.row.updatedate
                _self.formValidate.createby = e.row.createby
                _self.formValidate.realnumber = e.row.realnumber

                function doSuccess(response) {
                    let _rowsData = response.data.data.rows
                    for (let i = 0; i < _rowsData.length; i++) {
                        let url2 = '/order/detail/' + _rowsData[i].id

                        function doSuccess2(response) {
                            let _data = response.data.data.items

                            for (let i = 0; i < _data.length; i++) {
                                _self.data1.push({
                                    product: _data[i].product,
                                    propertys: _data[i].propertys,
                                    productnumber: _data[i].productnumber,
                                    paynumber: _data[i].paynumber,
                                })
                            }
                        }

                        _self.GetData(url2, doSuccess2)
                    }
                }

                this.GetData(url, doSuccess)
            },

            EditClues() {
                let _self = this
                if (_self.cluesid == '') {
                    _self.$Message.warning('请选择要编辑的线索!')
                } else {
                    let a = []
                    _self.modal3 = true
                    _self.customerlabelGroup = []
                    _self.formValidate2.cluescontent = _self.selectData.clue_memo
                    _self.formValidate2.cluestype = _self.selectData.cluestype
                    _self.formValidate2.id = _self.selectData.id
                    _self.formValidate2.cluesstatus = _self.selectData.cluesstatus
                    _self.formValidate2.createby = _self.selectData.createby
                    _self.formValidate2.customerName = _self.selectData.customername
                    _self.formValidate2.labels = _self.selectData.labelName
                    _self.formValidate2.customerTel = _self.selectData.people[0].tel
                    _self.formValidate2.createdate = _self.selectData.createdate
                    if(_self.selectData.labelName != null) {
                        a = _self.selectData.labelName.split(",")
                        for (let i = 0; i < a.length; i++) {
                            let b = {}
                            b.labelName = a[i]
                            _self.customerlabelGroup.push(b)
                        }
                        _self.getLabelData()
                    } else {
                        _self.customerlabelGroup = []
                    }
                }
            },

            DeleteClues() {
                let _self = this
                if (_self.cluesid == '') {
                    _self.$Message.warning('请选择要删除的线索!')
                } else {
                    _self.$Modal.confirm({
                        title: '删除线索',
                        content: '确定要删除此线索吗',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: () => {
                            let url = '/clue/del'
                            let _data = {
                                id: _self.cluesid
                            }

                            function doSuccess(re) {
                                _self.$Message.success('删除成功!')
                                _self.getTableData()
                                _self.getTableData2()
                            }

                            _self.PostData(url, _data, doSuccess)
                        }
                    });
                }
            },

            getLabelData() {
                var _self = this
                _self.data = []
                this.$http.get('/api/system/label/list?page=1&pageSize=10')
                    .then(function (data) {
                        var response = data.data.data
                        _self.pageTotal2 = response.total
                        let _customerlabelGroup = []
                        for (var i = 0; i < response.rows.length; i++) {
                            var reponseObj = {}
                            reponseObj.labelName = response.rows[i].labelName
                            reponseObj.id = response.rows[i].id
                            for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                                if (reponseObj.labelName == _self.customerlabelGroup[i].labelName) {
                                    reponseObj._checked = true
                                    _customerlabelGroup.push(reponseObj)
                                }
                            }
                            _self.data.push(reponseObj)
                        }
//                        _self.customerlabelGroup = _customerlabelGroup
                    })
            },

            pageChange2(a) {
                var _self = this
                this.$http.get('/api/system/label/list?page='+ a +'&pageSize=10')
                    .then(function (data) {
                        _self.data = []
                        var response = data.data.data
                        _self.pageTotal2 = response.total
                        let _customerlabelGroup = []
                        for (var i = 0; i < response.rows.length; i++) {
                            var reponseObj = {}
                            reponseObj.labelName = response.rows[i].labelName
                            reponseObj.id = response.rows[i].id
                            for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                                if (reponseObj.labelName == _self.customerlabelGroup[i].labelName) {
                                    reponseObj._checked = true
                                    _customerlabelGroup.push(reponseObj)
                                }
                            }
                            _self.data.push(reponseObj)
                        }
//                        _self.customerlabelGroup = _customerlabelGroup
                    })
            },

            pageSizeChange2(a) {
                var _self = this
                this.$http.get('/api/system/label/list?page=1&pageSize=' + a)
                    .then(function (data) {
                        _self.data = []
                        var response = data.data.data
                        _self.pageTotal2 = response.total
                        let _customerlabelGroup = []
                        for (var i = 0; i < response.rows.length; i++) {
                            var reponseObj = {}
                            reponseObj.labelName = response.rows[i].labelName
                            reponseObj.id = response.rows[i].id
                            for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                                if (reponseObj.labelName == _self.customerlabelGroup[i].labelName) {
                                    reponseObj._checked = true
                                    _customerlabelGroup.push(reponseObj)
                                }
                            }
                            _self.data.push(reponseObj)
                        }
//                        _self.customerlabelGroup = _customerlabelGroup
                    })
            },

            selectionChange(e) {
                let _self = this
                if (_self.customerlabelGroup.length == 0) {
                    _self.customerlabelGroup = e
                } else {
                    for (let i = 0; i < e.length; i++) {
                        let _count = 0
                        for (let j = 0; j < _self.customerlabelGroup.length; j++) {
                            if (e[i].id == _self.customerlabelGroup[j].id) {
                                break;
                            } else {
                                _count++
                            }
                        }
                        if (_count == _self.customerlabelGroup.length) {
                            _self.customerlabelGroup.push({
                                id: e[i].id,
                                labelName: e[i].labelName,
                            })
                        }
                    }
                }
            },

            /*************************移除标签********************************/
            handleClose2(event, name) {
                let _self = this
                for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                    if (_self.customerlabelGroup[i].labelName == name.labelName) {
                        let index = _self.customerlabelGroup.indexOf(name);
                        if (index > -1) {
                            _self.customerlabelGroup.splice(index, 1);
                        }
                    }
                }
            },

            /*************************录入提交验证********************************/
            ok(name) {
                let _self = this
                setTimeout(() => {
                        this.loading2 = false;
                        this.$refs[name].validate((valid) => {
                            if (valid) {
                                if (_self.customerlabelGroup != undefined) {
                                    let labelIds = []
                                    for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                                        labelIds.push(_self.customerlabelGroup[i].id)
                                    }
                                    _self.formValidate2.labels = labelIds.toString()
                                }

                                let url = '/clue/update'
                                let _data = {}
                                _data.customerTel = _self.formValidate2.customerTel
                                _data.customerName = _self.formValidate2.customerName
                                _data.labels = _self.formValidate2.labels
                                _data.id = _self.formValidate2.id
                                _data.clueStatus = _self.formValidate2.cluesstatus

                                function doSuccess(response) {
                                    _self.$Message.success('更新成功!')
                                    _self.modal3 = false
                                    _self.getTableData()
                                }
                                function otherConditions() {
                                    _self.$nextTick(() => {
                                        _self.loading2 = true;
                                    });
                                    _self.$Message.error('更新失败!');
                                }

                                this.PostData(url, _data, doSuccess, otherConditions)
                            } else {
                                this.$nextTick(() => {
                                    this.loading2 = true;
                                });
                            }
                        })

                }, 2000);
            },

            AddClues() {
                let _self = this
                _self.modal2 = true
                _self.cluesTypeValue = []
            },

            YYAddClues() {
                let _self = this
                _self.modal22 = true
                _self.cluesTypeValue2 = []
            },

            /*************************录入提交验证********************************/
            ok22(name) {
                let _self = this
                setTimeout(() => {
                    this.loading = false;
                        this.$refs[name].validate((valid) => {
                            if (valid) {
                                if (_self.customerlabelGroup != undefined) {
                                    let labelIds = []
                                    for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                                        labelIds.push(_self.customerlabelGroup[i].id)
                                    }
                                    _self.formValidate.labelIds = labelIds.toString()
                                }

                                let url = '/clue/create'

                                function doSuccess(response) {
                                    _self.modal2 = false
                                    _self.$Message.success('新增成功!')
                                    _self.cancel('formValidate')
                                    _self.getTableData()
                                }
                                function otherConditions() {
                                    _self.$nextTick(() => {
                                        _self.loading = true;
                                    });
                                    _self.$Message.error('新增失败!');
                                }

                                this.PostData(url, _self.formValidate, doSuccess, otherConditions)
                            } else {
                                this.$nextTick(() => {
                                    this.loading = true;
                                });
                            }
                        })
                }, 2000);
            },

            getCompany() {
                let _self = this
                let url = ''
                _self.currentPage = 1

                if (_self.isSearch == false) {
                    url = '/cluesLibrary/loadCompany/1/10/1'
                } else {
                    url = '/cluesLibrary/loadCompany/1/10/' + _self.searchCompany
                }

                _self.selectCompany = true

                function doSuccess(response) {
                    let _res = response.data.data

                    _self.data4 = []
                    _self.pageTotal3 = _res.total
                    for (let i = 0; i < _res.rows.length; i++) {
                        _self.data4.push({
                            CompanyName: _res.rows[i].CompanyName,
                            cpid: _res.rows[i].cpid,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            rowSelect(a) {
                let _self = this
                _self.companyDetail = a
            },

            ok3() {
                let _self = this
                _self.formValidate.companyname =  _self.companyDetail.CompanyName
                _self.formValidate.companyid =  _self.companyDetail.cpid
            },

            pageChange3(a) {
                let _self = this
                let url = ''
                if (_self.isSearch == false) {
                    url = '/cluesLibrary/loadCompany/' + a + '/' + _self.pageSize + '/1'
                } else {
                    url = '/cluesLibrary/loadCompany/' + a + '/' + _self.pageSize + '/' + _self.searchCompany
                }

                function doSuccess(response) {
                    let _res = response.data.data

                    _self.data4 = []
                    _self.pageTotal3 = _res.total
                    for (let i = 0; i < _res.rows.length; i++) {
                        _self.data4.push({
                            CompanyName: _res.rows[i].CompanyName,
                            cpid: _res.rows[i].cpid,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            // 改变每页显示的数据条数
            pageSizeChange3(a) {
                let _self = this
                let url = ''
                _self.pageSize = a

                if (_self.isSearch == false) {
                    url = '/cluesLibrary/loadCompany/1/' + _self.pageSize + '/1'
                } else {
                    url = '/cluesLibrary/loadCompany/1/' + _self.pageSize + '/' + _self.searchCompany
                }

                function doSuccess(response) {
                    let _res = response.data.data

                    _self.data4 = []
                    _self.pageTotal3 = _res.total
                    for (let i = 0; i < _res.rows.length; i++) {
                        _self.data4.push({
                            CompanyName: _res.rows[i].CompanyName,
                            cpid: _res.rows[i].cpid,
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            cancel(name) {
                this.customerlabelGroup = []
                this.$refs[name].resetFields();
            },

            searchCompanyData() {
                let _self = this

                if (_self.searchCompany != '') {
                    _self.isSearch = true
                    _self.getCompany()
                } else {
                    _self.isSearch = false
                    _self.getCompany()
                }
            },

            lingq(a) {
                let _self = this
                let url = 'api/clue/receiptClue'
                let _data = {
                    id: a.row.id
                }

                // function doSuccess(re) {
                //     _self.$Message.success('领取成功!')
                //     _self.getTableData()
                //     _self.getTableData2()
                // }
                this.$http.post(url, _data).then(function(res){
                    console.log(res.data)
                    if(res.data.msgCode == 40000){
                        _self.$Message.success('领取成功!')
                        _self.getTableData()
                        _self.getTableData2()
                    }else{
                        if(res.data.msgCode == 50000){
                            _self.$Message.warning("您不在候选人名单，无法领取！")
                        }else{
                            _self.$Message.warning("领取失败！")
                        }
                        
                    }
                })
                // this.PostData(url, _data, doSuccess)
            },

            detailClue(re) {
                let _self = this
                _self.selectData = re.row

                let a = []
                _self.modal4 = true
                _self.customerlabelGroup = []
                _self.formValidate2.cluescontent = _self.selectData.memo
                _self.formValidate2.cluestype = _self.selectData.cluestype
                _self.formValidate2.id = _self.selectData.id
                _self.formValidate2.cluesstatus = _self.selectData.cluesstatus
                _self.formValidate2.createby = _self.selectData.createby
                _self.formValidate2.customerName = _self.selectData.customername
                _self.formValidate2.labels = _self.selectData.labelName
                _self.formValidate2.customerTel = _self.selectData.people[0].tel
                _self.formValidate2.createdate = _self.selectData.createdate
                if(_self.selectData.labelName != null) {
                    a = _self.selectData.labelName.split(",")
                    for (let i = 0; i < a.length; i++) {
                        let b = {}
                        b.labelName = a[i]
                        _self.customerlabelGroup.push(b)
                    }
                    _self.getLabelData()
                } else {
                    _self.customerlabelGroup = []
                }
            },

            selectCancel(selection, row) {
                let _self = this

                outer:
                    for (let i = 0; i <  _self.customerlabelGroup.length; i++) {
                        if (row.id == _self.customerlabelGroup[i].id) {
                            _self.customerlabelGroup.splice(i,1)
                            break outer;
                        }
                    }
            },
        },
        mounted() {
            this.getDataCenter()
            this.getTableData()
            this.getTableData2()
        }
    }
</script>