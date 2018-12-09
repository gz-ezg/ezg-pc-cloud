<template>
    <div>
        
            <Tabs value="name1">
                <TabPane label="我的客户" name="name1">
                    <Card style="min-width:800px">
                    <Row style="margin-bottom:10px;">
                            <Collapse v-model="search_model">
                                    <Panel name="1" >
                                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                                        筛选
                                    
                                    <div slot="content" @keydown.enter="SearchCustomer">
                                        <Form ref="SearchValidateCustomer" :model="SearchValidateCustomer" :label-width="80" style="margin-top: 15px">
                                            <Row :gutter="16" style="height:56px">
                                                <Col span="8">
                                                <FormItem label="客户名称：" prop="customer_name">
                                                    <Input v-model="SearchValidateCustomer.customer_name" size="small"></Input>
                                                </FormItem>
                                                </Col>
                                                <Col span="8">
                                                <FormItem label="联系方式：" prop="customer_mobile_phone">
                                                    <Input v-model="SearchValidateCustomer.customer_mobile_phone" size="small"></Input>
                                                </FormItem>
                                                </Col>
                                            </Row>
                                                    <center>
                                                        <FormItem style="margin-top:5px">
                                                            <Button type="primary" @click="SearchCustomer">搜索</Button>
                                                            <Button type="ghost" @click="handleReset('SearchValidateCustomer')" style="margin-left: 8px">
                                                                重置
                                                            </Button>
                                                        </FormItem>
                                                    </center>
                                        </Form>
                                    </div>
                                </Panel>
                            </Collapse>
                        </Row>
                    <Row style="margin-top: 10px;">
                        <Table
                                highlight-row
                                size="small"
                                :columns="customerColumns"
                                :data="customerData"
                                @on-current-change="selectRow"
                                @on-row-dblclick="examine"
                                :loading="customerLoading"                                            
                                ></Table>
                        <Page
                                size="small"
                                :total="customerTotal"
                                show-total
                                show-elevator
                                :current.sync = "customerPage"
                                @on-change="pageChangeCustomer"
                                style="margin-top: 10px;margin-bottom:10px"></Page>
                        </Row>
                        </Card>
                </TabPane>
                <TabPane label="已领取" name="name2">
                    <Card style="min-width:800px">
                    <Row style="margin-bottom:10px;">
                            <Collapse v-model="search_model">
                                    <Panel name="1" >
                                        <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                                        筛选
                                    
                                    <div slot="content" @keydown.enter="Search">
                                        <Form ref="SearchValidate" :model="SearchValidate" :label-width="80" style="margin-top: 15px">
                                            <Row :gutter="16" style="height:56px">
                                                <Col span="8">
                                                <FormItem label="客户名称：" prop="customer_name">
                                                    <Input v-model="SearchValidate.customer_name" size="small"></Input>
                                                </FormItem>
                                                </Col>
                                                <Col span="8">
                                                <FormItem label="联系方式：" prop="customer_mobile_phone">
                                                    <Input v-model="SearchValidate.customer_mobile_phone" size="small"></Input>
                                                </FormItem>
                                                </Col>
                                                <Col span="8">
                                                <FormItem label="客户状态：" prop="customerStatus">
                                                    <Cascader trigger="hover" transfer :data="customerType" v-model="SearchValidate.customerStatus" size="small" style="margin-top:5px;width:100%"></Cascader>  
                                                </FormItem>
                                                </Col>
                                            </Row>
                                            <Row :gutter="16">
                                                <Col span="8">
                                                    <FormItem label="区域：" prop="customer_area">
                                                        <Select transfer v-model="SearchValidate.customer_area" @on-change="Search" size="small">
                                                            <Option value="gz">广州</Option>
                                                            <Option value="sz">深圳</Option>
                                                            <Option value="dg">东莞</Option>
                                                            <Option value="lz">兰州</Option>
                                                            <Option value="zh">珠海</Option>
                                                            <Option value="zz">郑州</Option>
                                                            <Option value="sh">上海</Option>
                                                            <Option value="zs">中山</Option>
                                                            <Option value="fs">佛山</Option>
                                                            <Option value="qt">其他</Option>
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                                    <center>
                                                        <FormItem style="margin-top:5px">
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
                        <ButtonGroup>
                            <Button v-permission="['channelC.add']" type="primary" icon="plus" @click="getCannelType();modal_add = true">录入</Button>
                            <!-- <Button v-permission="['channelC.export']" type="primary" icon="ios-color-wand-outline" @click="downloadExcel">导出Excel</Button> -->
                        </ButtonGroup>
                    <Row style="margin-top: 10px;">
                        <Table
                                highlight-row
                                size="small"
                                :columns="columns"
                                :data="data2"
                                @on-current-change="selectRow"
                                @on-row-dblclick="examine"
                                :loading="table_loading"
                                @on-sort-change="sort"                                                
                                ></Table>
                        <Page
                                size="small"
                                :total="pageTotal"
                                show-total
                                show-sizer
                                show-elevator
                                :current.sync = "page"
                                @on-change="pageChange"
                                @on-page-size-change="pageSizeChange"
                                style="margin-top: 10px;margin-bottom:10px"></Page>
                        </Row>
                        </Card>
                </TabPane> 
            </Tabs>
        
            <!-- <Row> -->
                
        <Modal
                v-model="modal_add"
                title="录入"
        >
            <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="80">
                <Row :gutter="16" style="height:56px">
                    <Col span="12">
                    <FormItem label="客户名称" prop="customerName">
                        <Input v-model="formValidate.customerName" size="small"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="电话" prop="customerMobilePhone">
                        <Input v-model="formValidate.customerMobilePhone" size="small"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" style="height:56px">
                    <Col span="12">
                    <FormItem label="固话" prop="customerTel">
                        <Input v-model="formValidate.customerTel" size="small"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="QQ" prop="customerQQ">
                        <Input v-model="formValidate.customerQQ" size="small"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" style="height:56px">
                    <Col span="12">
                    <FormItem label="微信" prop="customerWechat">
                        <Input v-model="formValidate.customerWechat" size="small"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="邮箱" prop="customerEmail">
                        <Input v-model="formValidate.customerEmail" size="small"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <FormItem label="标签" prop="customerTags">
                    <Tag v-for="item in customerlabelGroup" :key="item.id" :name="item.id" :id="item.id" closable @on-close="handleClose2(item)">
                        {{ item.labelName }}
                    </Tag>
                    <Button icon="ios-plus-empty" type="dashed" size="small" @click="getLabelData();addTag = true">添加</Button>
                </FormItem>
                <FormItem label="渠道类型" prop="channelTypeId">
                    <RadioGroup v-model="formValidate.channelTypeId" @on-change="radioChange">
                        <Radio :label="items2.id" v-for="items2 in qudaotype" :id="items2.id" :key="items2.id">{{ items2.channel_type_name }}</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="备注" prop="customerMemo">
                    <Input size="small" type="textarea" v-model="formValidate.customerMemo"/>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="handleSubmit('formValidate')" :loading="loading">新增</Button>
                <Button type="ghost" @click="cancel('formValidate')">重置</Button>
            </div>
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
                    :data="data3"
                    @on-select-cancel="selectCancel"
                    @on-selection-change="selectionChange"
                    ></Table>
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
        <Modal
                v-model="followbysTag"
                title="添加跟进人"
                width="40%"
                @on-ok="AddUserClick"
                @on-cancel="cancel2">
            <Table
                    highlight-row
                    :columns="columns3"
                    :data="data33"
                    @on-selection-change="addUserClick"></Table>
            <Page
                    size="small"
                    :total="pageTotala"
                    show-total
                    show-sizer
                    show-elevator
                    @on-change="pageChangea"
                    @on-page-size-change="pageSizeChangea"
                    style="margin-top: 10px"></Page>
        </Modal>
    </div>
</template>

<script>
    import { DateFormat } from './utils'
    export default {
        data() {
            const validateCascader = (rule, value, callback) => {
                if (value == '' || value == null) {
                    callback(new Error('请选择客户状态'));
                } else {
                    callback();
                }
            };
            const validateTel = (rule, value, callback) => {
                var re = /^1\d{10}$/
                if (value == '' || value == null) {
                    callback(new Error('电话不能为空'));
                } else {
                    if (re.test(value)) {
                        let url = '/channel/customer/phoneIsExist?customerMobilePhone=' + value
                        function doSuccess(response) {
                            if (response.data.data == true) {
                                callback(new Error('抱歉，该号码已经存在'));
                            } else {
                                callback();
                            }
                        }
                        this.GetData(url, doSuccess)
                    } else {
                        callback(new Error('电话格式不正确'));
                    }
                }
            };
            const validateFixedphone = (rule, value, callback) => {
                var re = /\d{3}-\d{8}|\d{4}-\d{7}/
                if (value == '' || value == null) {
                    callback();
                } else {
                    if (re.test(value)) {
                        callback();
                    } else {
                        callback(new Error('固话格式不正确'));
                    }
                }
            };
            const validateQQ = (rule, value, callback) => {
                var re = RegExp(/^[1-9][0-9]{4,9}$/);
                if (value == '' || value == null) {
                    callback();
                } else {
                    if (re.test(value)) {
                        callback();
                    } else {
                        callback(new Error('QQ格式不正确'));
                    }
                }
            };
            const validateWechat = (rule, value, callback) => {
                var re = /^[a-zA-Z\d_]{5,}$/;
                if (value == '' || value == null) {
                    callback();
                } else {
                    if (re.test(value)) {
                        callback();
                    } else {
                        callback(new Error('微信格式不正确'));
                    }
                }
            };
            const validateEmail = (rule, value, callback) => {
                var re = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
                if (value == '' || value == null) {
                    callback();
                } else {
                    if (re.test(value)) {
                        callback();
                    } else {
                        callback(new Error('邮箱格式不正确'));
                    }
                }
            };
            return {
                customerPage:1,
                SearchValidateCustomer:{
                    customer_name:'',
                    customer_mobile_phone:'',
                },
                customerLoading: false,
                sortField:"updatedate",
                order:"desc",
                search_model:"",
                table_loading:false,
                SearchValidate:{
                    date:[],
                    customer_name:'',
                    customer_mobile_phone:'',
                    customerStatus:[],
                    customer_area:''
                },
                ishandleSubmit:false,
                isXiaoshou: false,
                modal_add: false,
                addTag: false,
                followbysTag: false,
                loading: false,
                pageTotal: new Number(),
                pageTotal2: new Number(),
                customerTotal: new Number(),
                customerid: '',
                //  使用者列表？
                pagea: 1,
                pageSizea: 10,
                pageTotala: new Number(),
                data2: [],
                data3: [],
                data33: [],
                qudaotype: [],
                customerlabelGroup: [],
                followbysGroup: [],
                followbysGroup2: [],
                areaValue: [],
                xiaoshou: [],
                customertypeValue: [],
                importlevelValue: [],
                //  渠道用户
                page:1,
                pageSize: '10',
                //  标签页
                labelpagesize: '10',
                labelpage:'1',
                formValidate: {
                    customerName: '',
                    customerTel: '',
                    customerMobilePhone: '',
                    customerWechat: '',
                    customerEmail: '',
                    customerQQ: '',
                    customerArea: '',
                    customerLevel: '',
                    customerTags: '',
                    customerMemo: '',
                    channelTypeId: '',
                    // customerStatus: []
                },
                columns3: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '用户名',
                        key: 'username',
                    },
                    {
                        title: '真实姓名',
                        key: 'realname',
                    },
                    {
                        title: '电话',
                        key: 'mobilephone',
                    },
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
                ruleValidate: {
                    customerTel: [
                        {validator: validateFixedphone, trigger: 'change'}
                    ],
                    customerQQ: [
                        {validator: validateQQ, trigger: 'change'}
                    ],
                    customerWechat: [
                        {validator: validateWechat, trigger: 'change'}
                    ],
                    customerEmail: [
                        {validator: validateEmail, trigger: 'change'}
                    ],
                    customerName: [
                        {required: true, trigger: 'change', message: '客户名称不能为空'}
                    ],
                    customerArea: [
                        {required: true, trigger: 'change', message: '请选择区域'}
                    ],
                    customerStatus: [
                        {required: true, validator: validateCascader, trigger: 'change'}
                    ],
                    customerMobilePhone: [
                        {required: true, validator: validateTel, trigger: 'change'}
                    ],
                },
                customerColumns:[
                    {
                        title: '客户名称',
                        key: 'customer_name',
                        minWidth: 120,
                    },
                    {
                        title: '联系方式',
                        key: 'people',
                        render: (h, params) => {
                            return h('Poptip', {
                                props: {
                                    trigger: 'hover',
                                    title: '联系方式',
                                    placement: 'bottom'
                                }
                            }, [
                                h('span', this.customerData[params.index].customer_mobile_phone + '    '),
                                h('Icon', {
                                    props: {
                                        type: 'arrow-down-b',
                                    }
                                }),
                                h('div', {
                                    slot: 'content'
                                }, [
                                    h('ul', this.customerData[params.index].people.map(item => [
                                        h('li', {
                                            style: {
                                                padding: '4px'
                                            }
                                        }, '手机：' + item.customer_mobile_phone),
                                        h('li', {
                                            style: {
                                                padding: '4px'
                                            }
                                        }, '固话：' + item.customer_tel),
                                        h('li', {
                                            style: {
                                                padding: '4px'
                                            }
                                        }, 'Q  Q：' + item.customerqq),
                                        h('li', {
                                            style: {
                                                padding: '4px'
                                            }
                                        }, '微信：' + item.customer_wechat)
                                    ]))
                                ])
                            ]);
                        },
                        minWidth: 150,
                    },
                    {
                        title: '客户状态',
                        key: 'customer_status',
                        minWidth: 150,                 
                    },
                    {
                        title: '地区',
                        key: 'customer_area',
                        minWidth: 80,                     
                    },
                    {
                        title: '跟进人',
                        key: 'followbyname',
                        minWidth: 120,                
                    },
                    {
                        title: '创建人',
                        key: 'createrealname',
                        minWidth: 120,                     
                    },
                    {
                        title: '更新时间',
                        key: 'updatedate',
                        minWidth: 150,                   
                    },
                    {
                        title: '创建时间',
                        key: 'createdate',
                        minWidth: 150,                    
                    },
/*                    {
                        title: '线索变化剩余时长',
                        key: 'isbound',
                        width: 140
                    },*/
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
                                        size: 'small',
                                        // permission: "['channelC.cheek']"
                                    },
                                    directives: [
                                        {
                                            name: "permission",
                                            value: "channelC.cheek"
                                        }
                                    ],
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            console.log(params.row)
                                            // this.examine(params.row)
                                            this.$store.commit('open_gobal_customer_detail_modal', {ID:params.row.customer_id});
                                        }
                                    }
                                }, '查看')
                            ]);
                        }
                    }
                ],
                columns: [
                    {
                        title: '客户名称',
                        key: 'customer_name',
                        minWidth: 120,
                        sortable: true
                    },
                    {
                        title: '联系方式',
                        key: 'people',
                        render: (h, params) => {
                            return h('Poptip', {
                                props: {
                                    trigger: 'hover',
                                    title: '联系方式',
                                    placement: 'bottom'
                                }
                            }, [
                                h('span', this.data2[params.index].customer_mobile_phone + '    '),
                                h('Icon', {
                                    props: {
                                        type: 'arrow-down-b',
                                    }
                                }),
                                h('div', {
                                    slot: 'content'
                                }, [
                                    h('ul', this.data2[params.index].people.map(item => [
                                        h('li', {
                                            style: {
                                                padding: '4px'
                                            }
                                        }, '手机：' + item.customer_mobile_phone),
                                        h('li', {
                                            style: {
                                                padding: '4px'
                                            }
                                        }, '固话：' + item.customer_tel),
                                        h('li', {
                                            style: {
                                                padding: '4px'
                                            }
                                        }, 'Q  Q：' + item.customerqq),
                                        h('li', {
                                            style: {
                                                padding: '4px'
                                            }
                                        }, '微信：' + item.customer_wechat)
                                    ]))
                                ])
                            ]);
                        },
                        minWidth: 150,
                    },
                    {
                        title: '客户状态',
                        key: 'customer_status',
                        minWidth: 150,
                        sortable: true                        
                    },
                    {
                        title: '线索状态',
                        key: 'clue_status',
                        minWidth: 120,
                        sortable: true                        
                    },
                    {
                        title: '地区',
                        key: 'customer_area',
                        minWidth: 80,
                        sortable: true                        
                    },
                    {
                        title: '销售',
                        key: 'followbyname',
                        minWidth: 120,
                        sortable: true                        
                    },
                    {
                        title: '创建人',
                        key: 'createrealname',
                        minWidth: 120,
                        sortable: true                        
                    },
                    {
                        title: '更新时间',
                        key: 'updatedate',
                        minWidth: 150,
                        sortable: true                        
                    },
                    {
                        title: '创建时间',
                        key: 'createdate',
                        minWidth: 150,
                        sortable: true                        
                    },
/*                    {
                        title: '线索变化剩余时长',
                        key: 'isbound',
                        width: 140
                    },*/
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
                                        size: 'small',
                                        // ssion: "['channelC.cheek']"
                                    },
                                    directives: [
                                        {
                                            name: "permission",
                                            value: "channelC.cheek"
                                        }
                                    ],
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            // console.log(params.row)
                                            // this.examine(params.row)
                                            this.$store.commit('open_gobal_customer_detail_modal', {ID:params.row.customer_id});
                                        }
                                    }
                                }, '查看')
                            ]);
                        }
                    }
                ],
                customerTypeArr:[],
                area:[],
                customerType:[],
                customerData:[]
            }
        },
        methods: {
            sort(e){
                if(e.key == ""){
                    this.sortField = 'updatedate'   
                }else{
                    if(e.key == 'customer_area'){
                        this.sortField = 'area'
                    }else if(e.key == 'customer_status'){
                        this.sortField = 'customertype'
                    }else{
                        this.sortField = e.key
                    }
                }
                if(e.order == "normal"){
                    this.order = ""
                    this.sortField = "updatedate"
                }else{
                    this.order = e.order
                }
                this.getData()
            },
            handleReset(){
                var _self = this
                _self.SearchValidate.customer_name = ''
                _self.SearchValidate.customer_mobile_phone = ''
                _self.SearchValidate.customerStatus = ''
                _self.SearchValidate.date = '',
                _self.SearchValidate.customer_area = ''
                _self.getData()
                _self.SearchValidateCustomer.customer_name = ""
                _self.SearchValidateCustomer.customer_mobile_phone = ""
                _self.get_customer_data()
                _self.ishandleSubmit = false
            },
            Search() {
                let _self = this
                _self.page = 1;
                _self.getData();
            },
            getDataCenter() {
                let _self = this;

                let params = "area,customerTypes"

                function success(res){
                    _self.area = res.data.data.area;
                    _self.customerType = res.data.data.customerTypes;
                    // 二级联动改一级
                    _self.customerTypeArr = []
                    for(let i = 0;i<_self.customerType.length;i++) {
                        var temp = {}
                        if (_self.customerType[i].children != null) {
                            for (let j = 0; j < _self.customerType[i].children.length; j++) {
                                temp = {}
                                temp.id = _self.customerType[i].children[j].id
                                temp.typecode = _self.customerType[i].children[j].typecode
                                temp.typename = _self.customerType[i].children[j].typename
                                temp.pid = _self.customerType[i].children[j].pid
                                temp.ptypename = _self.customerType[i].typename
                                temp.ptypecode = _self.customerType[i].typecode

                                _self.customerTypeArr.push(temp)
                            }
                        } else {
                            temp = {}
                            temp.id = _self.customerType[i].id
                            temp.typecode = _self.customerType[i].typecode
                            temp.ptypename = _self.customerType[i].typename
                            temp.typename = ''
                            temp.pid = 0
                            _self.customerTypeArr.push(temp)
                        }
                        //  修改成规定的模型
                    _self.customerType[i].value = _self.customerType[i].id
                    _self.customerType[i].label = _self.customerType[i].typename
                    if(_self.customerType[i].children != null){

                        for(let j = 0;j<_self.customerType[i].children.length; j++ ){

                        _self.customerType[i].children[j].value= _self.customerType[i].children[j].id
                        _self.customerType[i].children[j].label = _self.customerType[i].children[j].typename

                        }
                    }
                    }
                }

                this.$GetDataCenter(params, success)
            },
            findAreaText(temp) {
                var _self = this;
                for (let i = 0; i < _self.area.length; i++) {
                    if (_self.area[i].typecode == temp && temp != "") {
                        return _self.area[i].typename;
                    }
                }
            },
            findCustomerType(temp) {
                // console.log(temp)
                if(temp=='' || temp == null){
                    return ''
                }else{
                    var temp2 = temp.split('-')
                    var _self = this;
                    if(temp2[1]==''||temp2[1]==null){
                        // console.log(temp2[1])
                        for (let i = 0; i < _self.customerTypeArr.length; i++) {
                        if (_self.customerTypeArr[i].id == temp2[0] && temp2[0] != "") {
                            return _self.customerTypeArr[i].ptypename + ' - ' +_self.customerTypeArr[i].typename
                        }
                    }
                    }else{
                        for (let i = 0; i < _self.customerTypeArr.length; i++) {
                        if (_self.customerTypeArr[i].id == temp2[1] && temp2[1] != "") {
                            return _self.customerTypeArr[i].ptypename + ' - ' +_self.customerTypeArr[i].typename
                        }
                    }
                    }
                }



            },
            getCannelType() {
                let _self = this
                let url2 = 'api/channel/type/queryUserChannel'

                let config = {
                    params:{
                        type: "qdyh"
                    }
                }
                function success(re){
                    _self.formValidate.channelTypeId = re.data.data[0].id
                    _self.qudaotype = []
                    for (let i = 0; i < re.data.data.length; i++) {
                        _self.qudaotype.push(re.data.data[i])
                    }
                }

                this.$Get(url2, config, success)
            },
            downloadExcel(){
                let field = [
                    {field:'customer_name',title:'客户名称'},
                    {field:'customertype',title:'客户状态',format:'customerType'},
                    {field:'clue_status',title:'线索状态',format:'channelcluet'},
                    {field:'area',title:'地区',format:'area'},
                    {field:'followbyname',title:'销售'},
                    {field:'createrealname',title:'创建人'},
                    {field:'createdate',title:'创建时间'},
                    {field:'updatedate',title:'更新时间'}
                    ]
                let _self = this
                let url = `api/channel/customer/list`
                let config = {
                        page: '1',
                        pageSize: '1000000',
                        customer_name:_self.SearchValidate.customer_name,
                        customer_mobile_phone:_self.SearchValidate.customer_mobile_phone,
                        // bUpdatedate:DateFormat(_self.SearchValidate.date[0]),
                        // eUpdatedate:DateFormat(_self.SearchValidate.date[1]),
                        customer_area:_self.SearchValidate.customer_area,
                        // companyName: _self.formInline.companyName,
                        // server_realname: _self.formInline.server_realname,
                        // accmanager_realname: _self.formInline.accmanager_realname,
                        // followby_realname: _self.formInline.followby_realname,
                        export: 'Y',
                        exportField: encodeURI(JSON.stringify(field))
                }
                let toExcel = this.$MergeURL(url, config)
                window.open(toExcel)

            },
            getData() {
                let _self = this
                _self.table_loading = true
                let url = 'api/channel/customer/list'
                // let url3 = '/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=channelcluet'
                let params = "channelcluet"

                let _group = []
                var keys =[]
                var temp_status = ''
                if(_self.SearchValidate.customerStatus==''||_self.SearchValidate.customerStatus==null){
                    temp_status = ''
                }else{
                    temp_status = _self.SearchValidate.customerStatus.join('-')
                }
                    var config = {
                        params:{
                            sortField:_self.sortField,
                            order:_self.order,
                            page:_self.page,
                            pageSize:_self.pageSize,
                            customer_name:_self.SearchValidate.customer_name,
                            customer_mobile_phone:_self.SearchValidate.customer_mobile_phone,
                            customerStatus:temp_status,
                            bUpdatedate:DateFormat(_self.SearchValidate.date[0]),
                            eUpdatedate:DateFormat(_self.SearchValidate.date[1]),
                            customer_area:_self.SearchValidate.customer_area
                        }
                    }

                function doSuccess(response) {
                    let _data = response.data.data

                    _self.pageTotal = _data.total
                    _self.data2 = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        let a = ''
                        for (let k = 0; k < _group.length; k++) {
                            if (_data.rows[i].clue_status == _group[k].typecode) {
                                a = _group[k].typename
                            }
                        }
                        _self.data2.push({
                            cluestatus: _data.rows[i].cluestatus,
                            followbyname: _data.rows[i].followbyname,
                            customer_name: _data.rows[i].customer_name,
                            channel_name: _data.rows[i].channel_name,
                            clue_status: a,
                            createdate: (_data.rows[i].createdate).substr(0,10),
                            customer_area: _self.findAreaText(_data.rows[i].area),
                            customer_email: _data.rows[i].customer_email,
                            customer_level: _data.rows[i].customer_level,
                            customer_memo: _data.rows[i].customer_memo,
                            customer_status: _self.findCustomerType(_data.rows[i].customertype),
                            customer_tags: _data.rows[i].customer_tags,
                            customer_id: _data.rows[i].customer_id,
                            updatedate:  (_data.rows[i].updatedate).substr(0,10),
                            createrealname: _data.rows[i].createrealname,
                            customer_mobile_phone: _data.rows[i].customer_mobile_phone,
                            people: [
                                {
                                    customer_mobile_phone: _data.rows[i].customer_mobile_phone,
                                    customer_tel: _data.rows[i].customer_tel,
                                    customer_wechat: _data.rows[i].customer_wechat,
                                    customerqq: _data.rows[i].customerqq,
                                }
                            ]
                        })
                    }
                    _self.table_loading = false
                }

                function doSuccess3(re) {
                    _group = re.data.data.channelcluet
                }

                this.$GetDataCenter(params, doSuccess3)

                _self.$http.get(url,config).then(function(res){
                    doSuccess(res)
                })
            },

            get_customer_data(){
                let _self = this
                _self.customerLoading = true
                let url = 'api/customer/list'
                let params = "channelcluet"

                let _group = []
                var keys =[]
                var temp_status = ''
                if(_self.SearchValidate.customerStatus==''||_self.SearchValidate.customerStatus==null){
                    temp_status = ''
                }else{
                    temp_status = _self.SearchValidate.customerStatus.join('-')
                }
                    var config = {
                        params:{
                            // sortField:_self.sortField,
                            // order:_self.order,
                            page:_self.customerPage,
                            pageSize: 10,
                            // customer_name:_self.SearchValidate.customer_name,
                            // customer_mobile_phone:_self.SearchValidate.customer_mobile_phone,
                            // customerStatus:temp_status,
                            // bUpdatedate:DateFormat(_self.SearchValidate.date[0]),
                            // eUpdatedate:DateFormat(_self.SearchValidate.date[1]),
                            // customer_area:_self.SearchValidate.customer_area
                        }
                    }

                function doSuccess(response) {
                    let _data = response.data.data

                    _self.customerTotal = _data.total
                    _self.customerData = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        let a = ''
                        // for (let k = 0; k < _group.length; k++) {
                        //     if (_data.rows[i].clue_status == _group[k].typecode) {
                        //         a = _group[k].typename
                        //     }
                        // }
                        _self.customerData.push({
                            // cluestatus: _data.rows[i].cluestatus,
                            followbyname: _data.rows[i].followbyname,
                            customer_name: _data.rows[i].NAME,
                            // channel_name: _data.rows[i].channel_name,
                            // clue_status: a,
                            createdate: (_data.rows[i].CREATEDATE).substr(0,10),
                            customer_area: _self.findAreaText(_data.rows[i].AREA),
                            customer_email: _data.rows[i].email,
                            // customer_level: _data.rows[i].customer_level,
                            customer_memo: _data.rows[i].backup,
                            customer_status: _self.findCustomerType(_data.rows[i].customerType),
                            // customer_tags: _data.rows[i].customer_tags,
                            customer_id: _data.rows[i].ID,
                            updatedate:  (_data.rows[i].updatedate).substr(0,10),
                            createrealname: _data.rows[i].createbyname,
                            customer_mobile_phone: _data.rows[i].TEL,
                            people: [
                                {
                                    customer_mobile_phone: _data.rows[i].TEL,
                                    customer_wechat: _data.rows[i].weixin,
                                    customerqq: _data.rows[i].qq,
                                }
                            ]
                        })
                    }
                    _self.customerLoading = false
                }

                // function doSuccess3(re) {
                //     _group = re.data.data.channelcluet
                // }

                // this.$GetDataCenter(params, doSuccess3)

                _self.$http.get(url,config).then(function(res){
                    doSuccess(res)
                })
            },

            SearchCustomer(){
                this.customerPage = 1
                this.get_customer_data()
            },

            pageChangeCustomer(e){
                this.customerPage = e
                this.get_customer_data()
            },
            // 改变页码
            pageChange(a) {
                let _self = this
                _self.page = a
                this.getData()
            },

            // 改变每页显示的数据条数
            pageSizeChange(a) {
                let _self = this
                _self.pageSize = a
                _self.getData()
            },

            examine(e) {
                console.log(e)
                localStorage.setItem('customerTag', e.customer_tags)
                this.$store.commit('open_gobal_customer_detail_modal', {ID:e.customer_id});
                // this.$emit('isExamine', [e.customer_id, e.customer_status])
            },
            // 表格行选中事件
            selectRow(a) {
                var _self = this
                console.log(a)
                _self.customerid = a.customer_id
            },
            handleSubmit(name) {
                let _self = this
                this.loading = true;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (_self.customerlabelGroup != undefined) {
                            let labelIds = []
                            for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                                labelIds.push(_self.customerlabelGroup[i].id)
                            }
                            _self.formValidate.customerTags = labelIds.toString()
                        }
                        // let _customertypeStr = _self.formValidate.customerStatus[1]
                        // _self.formValidate.customerStatus = _customertypeStr
                        if ((_self.formValidate.customerTel == '' || _self.formValidate.customerTel == null) && (_self.formValidate.customerMobilePhone == '' || _self.formValidate.customerMobilePhone == null) && (_self.formValidate.customerWechat == '' || _self.formValidate.customerWechat == null) && (_self.formValidate.customerQQ == '' || _self.formValidate.weixin == null)) {
                            this.loading = false;
                            this.$Message.error('电话、固话、QQ、微信必须填写一个');
                        } else {
                            _self.$Post(url, _self.formValidate, success, fail)
                        }
                    } else {
                        this.loading = false;
                    }
                })

                let url = "/api/channel/customer/create"
                function success(res){
                    _self.getData()
                    _self.modal_add = false
                    _self.loading = false
                    _self.cancel('formValidate')

                }

                function fail(err){
                    _self.loading = false
                }
            },
            cancel(name) {
                this.customerlabelGroup = []
                this.followbysGroup = []
                this.$refs[name].resetFields();
            },
            //  获取标签信息
            getLabelData() {
                var _self = this
                _self.data3 = []
                this.$http.get('/api/system/label/list?page=1&pageSize=10')
                    .then(function (data) {
                        var response = data.data.data
                        var length = response.rows.length
                        _self.pageTotal2 = response.total
                        let _customerlabelGroup = []
                        for (var i = 0; i < length; i++) {
                            var reponseObj = {}
                            reponseObj.labelName = response.rows[i].labelName
                            reponseObj.id = response.rows[i].id
                            for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                                if (reponseObj.labelName == _self.customerlabelGroup[i].labelName) {
                                    reponseObj._checked = true
                                    _customerlabelGroup.push(reponseObj)
                                }
                            }
                            _self.data3.push(reponseObj)
                        }
                    //    _self.customerlabelGroup = _customerlabelGroup
                    }).catch(function(e){
                    })

            },

            getfollowbysData() {
                let _self = this
                let url = '/user/list?page='+ _self.pagea +'&pageSize='+ _self.pageSizea

                function doSuccess(re) {
                    let _data = re.data.data
                    _self.addCannelUser = true
                    _self.pageTotala = _data.total
                    _self.data33 = []

                    for (let i = 0; i < _data.rows.length; i++) {
                        var reponseObj = {}
                        for (let j = 0; j < _self.followbysGroup.length; j++) {
                            if (_self.followbysGroup[j].id == _data.rows[i].id) {
                                reponseObj._checked = true
                                break;
                            }
                        }
                        reponseObj.id = _data.rows[i].id,
                        reponseObj.mobilephone = _data.rows[i].mobilephone,
                        reponseObj.realname = _data.rows[i].realname,
                        reponseObj.username = _data.rows[i].username,
                        _self.data33.push(reponseObj)
                    }
                }

                this.GetData(url, doSuccess)
            },

            pageChangea(a) {
                let _self = this
                _self.pagea = a
                // _self.followbysGroup2 = _self.followbysGroup

                for (let i = 0; i < _self.followbysGroup.length; i++) {
                    _self.followbysGroup2.push( _self.followbysGroup[i])
                }
                _self.followbysGroup = []
                _self.getfollowbysData()
            },

            pageSizeChangea(a) {
                let _self = this
                _self.pageSizea = a
                _self.getfollowbysData()
            },

            selectionChange(e) {
                let _self = this
                let _data = []

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

            addUserClick(e) {
                let _self = this
                _self.followbysGroup = []

                for (let i = 0; i < e.length; i++) {
                    let _labels = {}
                    _labels.id = e[i].id
                    _labels.realname = e[i].realname
                    _self.followbysGroup.push(_labels)
                }
            },

            ok2(){

            },
            cancel2(){

            },
            pageChange2(index){
                var _self = this
                _self.labelpage = index
                var url = '/api/system/label/list?page='+_self.labelpage +'&pageSize=' + _self.labelpagesize
                this.$http.get(url)
                    .then(function (data) {
                    _self.$backToLogin(data)                        
                        _self.data3 = []
                        var response = data.data.data
                        var length = response.rows.length
                        _self.pageTotal2 = response.total
                        let _customerlabelGroup = []
                        for (var i = 0; i < length; i++) {
                            var reponseObj = {}
                            reponseObj.labelName = response.rows[i].labelName
                            reponseObj.id = response.rows[i].id
                            for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                                if (reponseObj.labelName == _self.customerlabelGroup[i].labelName) {
                                    reponseObj._checked = true
                                    _customerlabelGroup.push(reponseObj)
                                }
                            }
                            _self.data3.push(reponseObj)
                        }
                    //    _self.customerlabelGroup = _customerlabelGroup
                    })
            },
            pageSizeChange2(index){
                var _self = this
                _self.labelpagesize = index
                var url = '/api/system/label/list?page='+_self.labelpage +'&pageSize=' + _self.labelpagesize
                this.$http.get(url)
                    .then(function (data) {
                    _self.$backToLogin(data)
                        
                        _self.data3 = []
                        var response = data.data.data
                        var length = response.rows.length
                        _self.pageTotal2 = response.total
                        let _customerlabelGroup = []
                        for (var i = 0; i < length; i++) {
                            var reponseObj = {}
                            reponseObj.labelName = response.rows[i].labelName
                            reponseObj.id = response.rows[i].id
                            for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                                if (reponseObj.labelName == _self.customerlabelGroup[i].labelName) {
                                    reponseObj._checked = true
                                    _customerlabelGroup.push(reponseObj)
                                }
                            }
                            _self.data3.push(reponseObj)
                        }
                    //    _self.customerlabelGroup = _customerlabelGroup
                    })

            },

            AddUserClick() {
                let _self = this
                for (let i = 0; i < _self.followbysGroup.length; i++) {
                    _self.followbysGroup2.push( _self.followbysGroup[i])
                }
                _self.followbysGroup = []
            },

            radioChange(a) {
                let _self = this
                let url = 'api/channel/user/queryChannelUser'

                let config = {
                    params:{
                        channelTypeId: a,
                        type: "xs"
                    }
                }

                function success(re){
                    for (let i = 0; i < re.data.data.length; i++) {
                        _self.isXiaoshou = true
                        _self.xiaoshou.push(re.data.data[i])
                    }
                }

                this.$Get(url, config, success)
            },

            /*************************移除标签********************************/
            handleClose2(item) {
                let _self = this
                for (let i = 0; i < _self.customerlabelGroup.length; i++) {
                    // if (_self.customerlabelGroup[i].labelname == name.labelname) {
                    if (_self.customerlabelGroup[i].labelname == item.name) {
                        let index = _self.customerlabelGroup.indexOf(item);
                        if (index > -1) {
                            _self.customerlabelGroup.splice(index, 1);
                        }
                    }
                }
            },
        },
        mounted() {
            this.getDataCenter()
            this.getData()
            this.get_customer_data()
        },
    }
</script>