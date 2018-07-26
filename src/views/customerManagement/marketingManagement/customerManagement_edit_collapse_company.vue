<template>
    <div>
        <Button type="ghost" shape="circle" icon="plus" @click="modal33 = true">新增</Button>
        <Table
                border
                :columns="columns7"
                :data="data6"
                style="margin-top: 15px"
        ></Table>
        <Modal
                v-model="modal3"
                title="修改"
                :mask-closable="false"                
                :loading="loading"
                @on-ok="ok('formValidate')"
                @on-cancel="cancel('formValidate')">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="公司名称" prop="companyname">
                    <Input v-model="formValidate.companyname"></Input>
                </FormItem>
                <FormItem label="公司注册地" prop="companyarea">
                    <Cascader :data="companyareadata" v-model="formValidate.companyarea"></Cascader>
                </FormItem>
                <FormItem label="跟进销售" prop="followby">
                    <Input v-model="formValidate.followby" disabled></Input>
                </FormItem>
                <FormItem label="交易状态" prop="enterprisestatus">
                    <!-- 暂时注销，后期不允许修改 -->
                    <!-- <Input v-model="formValidate.enterprisestatus" disabled></Input> -->
                    <Select transfer v-model="formValidate.enterprisestatus">
                        <Option v-for="item in enterprisestatusValue" :value="item.value" :key="item.value">
                            {{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="法人" prop="legalrepresentative">
                    <Input v-model="formValidate.legalrepresentative"></Input>
                </FormItem>
                <FormItem label="重要等级" prop="importlevel">
                    <Select transfer v-model="formValidate.importlevel">
                        <Option v-for="(item, index) in importlevelValue" :value="item.value" :key=index>{{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="账务等级" prop="accountgrade">
                    <Select transfer v-model="formValidate.accountgrade" disabled>
                        <Option v-for="item in financialLevel" :value="item.typecode" :key="item.id">{{item.typename}}</Option>                                   
                    </Select>
                </FormItem>
                <FormItem label="创建人" prop="createby">
                    <!-- <Input v-model="formValidate.createby" disabled></Input> -->
                    <Select transfer v-model="formValidate.createby" disabled>
                        <Option value="老板">老板</Option>
                        <Option value="高层">高层</Option>                            
                        <Option value="中层">中层</Option>                            
                        <Option value="基层">基层</Option>                            
                    </Select>
                </FormItem>
                <FormItem label="企业来源" prop="cluesource">
                    <Select transfer v-model="formValidate.cluesource" placement="top">
                        <Option v-for="(item,index) in customersourceValue" :value="item.value" :key="index" >{{item.label}}
                        </Option>
                    </Select>
                </FormItem>
                
            </Form>
        </Modal>
        <Modal
                v-model="modal33"
                title="新增"
                :mask-closable="false"                
                :loading="loading"
                @on-ok="okSubmit('formValidate2')"
                @on-cancel="cancel('formValidate2')">
            <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2" :label-width="100">
                <FormItem label="公司名称" prop="companyname">
                    <Input v-model="formValidate2.companyname"></Input>
                </FormItem>
                <FormItem label="公司注册地" prop="companyarea">
                    <Cascader :data="companyareadata" v-model="formValidate2.companyarea"></Cascader>
                </FormItem>
                <FormItem label="跟进销售" prop="followby">
                    <Input v-model="formValidate2.followby" disabled></Input>
                </FormItem>
                <!--          <FormItem label="交易状态" prop="qyjyzt">
                              <Input v-model="formValidate2.qyjyzt" disabled></Input>
                          </FormItem>-->
                <FormItem label="法人" prop="legalrepresentative">
                    <Input v-model="formValidate2.legalrepresentative"></Input>
                </FormItem>
                <FormItem label="电话" prop="tel">
                    <Input v-model="formValidate2.tel"></Input>
                </FormItem>
                <FormItem label="重要等级" prop="importlevel">
                    <Select transfer v-model="formValidate2.importlevel">
                        <Option v-for="item in importlevelValue" :value="item.value" :key="item.value">{{ item.label
                            }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="创建人" prop="createby">
                    <Select transfer v-model="formValidate2.createby">
                        <Option value="老板">老板</Option>
                        <Option value="高层">高层</Option>                            
                        <Option value="中层">中层</Option>                            
                        <Option value="基层">基层</Option>                            
                    </Select>
                </FormItem>
                <FormItem label="企业来源" prop="cluesource">
                    <Select transfer v-model="formValidate2.cluesource" placement="top">
                        <Option v-for="item in customersourceValue" :value="item.value" :key="item.value">{{ item.label
                            }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="交易状态" prop="enterprisestatus">
                    <Select transfer v-model="formValidate2.enterprisestatus">
                        <Option v-for="item in enterprisestatusValue" :value="item.value" :key="item.value">
                            {{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="企业纳税类型" prop="taxtype">
                    <Select transfer v-model="formValidate2.taxtype">
                        <Option v-for="item in taxtypeValue" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="modal8"
                title="工商信息"
                :mask-closable="false"                
                @on-ok="EditCompany"
                @on-cancel="cancel('formValidate3')">
            <Form ref="formValidate3" :model="formValidate3" :label-width="100">
                <FormItem label="公司名称" prop="companyname">
                    <Input v-model="formValidate3.companyname" disabled></Input>
                </FormItem>
                <Row>
                    <Col span="12">
                    <FormItem label="信息机构代码" prop="creditcode">
                        <Input v-model="formValidate3.creditcode"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="机构代码" prop="orgcode">
                        <Input v-model="formValidate3.orgcode"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="主营项目" prop="mainproduct">
                        <Input v-model="formValidate3.mainproduct"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="所属行业" prop="industry">
                        <Input v-model="formValidate3.industry"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="公司性质" prop="companytype">
                        <Input v-model="formValidate3.companytype"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="注册地址" prop="eegaddress" >
                        <Input v-model="formValidate3.eegaddress"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="基本户开户行" prop="basicbank" >
                        <Input v-model="formValidate3.basicbank"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="基本户账号" prop="basicbankcode">
                        <Input v-model="formValidate3.basicbankcode"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="一般户开户行" prop="simplebank">
                        <Input v-model="formValidate3.simplebank"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="国税号码" prop="cnumber">
                        <Input v-model="formValidate3.cnumber"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="国税密码" prop="cpassword">
                        <Input v-model="formValidate3.cpassword"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="开户许可证" prop="bankcode">
                        <Input v-model="formValidate3.bankcode"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="地税号码" prop="pnumber">
                        <Input v-model="formValidate3.pnumber"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="地税密码" prop="ppassword">
                        <Input v-model="formValidate3.ppassword"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="工商注册号" prop="regnumber">
                        <Input v-model="formValidate3.regnumber"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="纳税等级" prop="financelevel">
                        <Select transfer v-model="formValidate3.financelevel">
                            <Option v-for="item in financelevelValue" :value="item.value" :key="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
        <Modal
            v-model="openComNameLog"
            width = "680"
            title = "公司名称变更日志"             
            >
            <Row style="margin-top: 10px;">
                <Table
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="changeHeader"
                    :loading="changeLoading"
                    :data="changeData"></Table>
                <Page
                    size="small"
                    :total="pageTotal"
                    :current.sync="changePage"
                    show-total
                    show-elevator
                    @on-change="change_page_change"
                    style="margin-top: 10px">
                </Page>
            </Row>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import Bus from '../../../components/bus.js'

    export default {
        props: ['customerid', 'customertypeText', 'tel', 'customersource'],
        data() {
            // 企业名称校验
            // let re = /^[\u4e00-\u9fa5]+|$/;
            let re = /^[\u4e00-\u9fa5()()]+|$/;
            const companynamecheck = (rule, value, callback)=>{
                    console.log(re.test(value))

                if (value == '' || value == null) {
                    callback(new Error('企业名称不能为空'));
                }else if(!re.test(value)){
                    callback(new Error('企业名称必须为汉字'))
                } else {
                        value = encodeURI(value)
                        // console.log(value)
                        let url = '/customer/findCompanyByName?companyName=' + value
                        function doSuccess(response) {
                            console.log(response.data);
                            if (response.data.data != null) {
                                callback(new Error('抱歉，公司名重复'));
                            } else {
                                callback();    
                            }
                        }
                        this.GetData(url, doSuccess)
                    }
                };
            return {
                openComNameLog:false,
                pageTotal: new Number(),
                changeHeader: [
                    {
                        title:"变更前公司名称",
                        key: 'oldValue',
                        width: 160
                    },
                    {
                        title: "变更后公司名称",
                        key: 'newValue',
                        width: 160
                    },
                    {
                        title: "修改时间",
                        key: 'updateDate',
                        width: 160
                    },
                    {
                        title: "操作人员",
                        key: 'realname',
                        width: 160
                    }
                ],
                changeLoading:false,
                changeData:[],
                changePage:1,

                financialLevel:"",
                companyareadata:[],
                loading: true,
                financelevelValue: [],
                taxtypeValue: [],
                enterprisestatusValue: [],
                customersourceValue: [],
                importlevelValue: [],
                formValidate: {
                    companyname: '',
                    followby: '',
                    legalrepresentative: '',
                    importlevel: '',
                    createby: '',
                    cluesource: '',
                    companyarea:[]              
                },
                formValidate2: {
                    taxtype: '',
                    tel: this.tel,
                    companyname: '',
                    followby: localStorage.getItem('realname'),
                    legalrepresentative: '',
                    importlevel: '',
                    createby: localStorage.getItem('realname'),
                    cluesource: this.customersource,
                    customerid: this.customerid,
                    companyarea:[]
                },
                formValidate3: {
                    companyname: '',
                    regnumber: '',
                    creditcode: '',
                    orgcode: '',
                    mainproduct: '',
                    industry: '',
                    companytype: '',
                    regaddress: '',
                    basicbank: '',
                    basicbankcode: '',
                    simplebank: '',
                    cnumber: '',
                    cpassword: '',
                    bankcode: '',
                    pnumber: '',
                    ppassword: '',
                    financelevel: '',
                },
                ruleValidate: {
                    companyname: [
                        {required: true, trigger: 'blur',message:'修改失败，公司名称已存在!'}
                    ],
                    legalrepresentative: [
                        {required: true, trigger: 'blur',message:'法人名称不能为空'},
                    ],
                    importlevel: [
                        {required: true, trigger: 'change',message:'重要等级不能为空'}
                    ],
                    cluesource: [
                        {required: true,trigger: 'change',message:'企业来源不能为空'}
                    ],
                    enterprisestatus: [
                        {required: true, trigger: 'change',message:'企业状态不能为空'}
                    ],
                    taxtype: [
                        {required: true,message: '企业纳税类型不能为空', trigger: 'change'}
                    ],
                    companyarea:[
                        {required: true,message: '企业注册地不能为空', trigger: 'change',type:'array'}
                    ]
                },
                ruleValidate2: {
                    companyname: [
                        {required: true, trigger: 'blur',validator: companynamecheck}
                    ],
                    legalrepresentative: [
                        {required: true, trigger: 'blur',message:'法人名称不能为空'},
                    ],
                    importlevel: [
                        {required: true, trigger: 'change',message:'重要等级不能为空'}
                    ],
                    cluesource: [
                        {required: true,trigger: 'change',message: '企业来源不能为空'}
                    ],
                    enterprisestatus: [
                        {required: true, trigger: 'change',message: '企业状态不能为空'}
                    ],
                    taxtype: [
                        {required: true,message: '企业纳税类型不能为空', trigger: 'change'}
                    ],
                    companyarea:[
                        {required: true,message: '企业注册地不能为空', trigger: 'change',type:'array'}
                    ]
                },
                modal3: false,
                modal33: false,
                modal8: false,
                columns7: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '公司名称',
                        // key: 'showcompanyname',
                        width: 200,
                        render:(h, params) => {
                            // console.log(params)
                            if(params.row.companyname == ''||params.row.companyname == null){
                                return ''
                            }else if(params.row.companyname.length>12){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.companyname.slice(0,12)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        
                                    },[
                                        h('span',params.row.companyname)
                                    ])
                                ])
                            }else{
                                return h('span',params.row.companyname)
                            }
                        }
                    },
                    {
                        title: '跟进销售',
                        key: 'followby',
                        width:100
                    },
                    {
                        title: '交易状态',
                        key: 'enterprisestatusText',
                        width:100                        
                    },
                    {
                        title: '法人',
                        key: 'legalrepresentative',
                        width:100                        
                    },
                    {
                        title: '重要等级',
                        key: 'importlevelText',
                        width:100                        
                    },
                    {
                        title: '创建人',
                        key: 'createby',
                        width:100                        
                    },
                    {
                        title: '企业来源',
                        key: 'cluesourceText',
                        width:150                                                    
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
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
                                            // console.log(params)
                                            this.amend(params)
                                        }
                                    }
                                }, '修改'),
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
                                            this.edit(params)
                                        }
                                    }
                                }, '工商信息'),
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
                                            this.get_company_name_change_log(params)
                                        }
                                    }
                                }, '名称变更日志'),
                                // h('Button', {
                                //     props: {
                                //         type: 'text',
                                //         size: 'small'
                                //     }
                                // }, 
                                // [
                                //     h('Poptip', {
                                //         props: {
                                //             confirm: true,
                                //             title: '您确定要删除此企业信息吗！',
                                //         },
                                //         on: {
                                //             'on-ok': () => {
                                //                 this.companyDelete(params)
                                //             },
                                //             'on-cancel': function () {
                                //             }
                                //         }
                                //     }, '删除')
                                // ]
                                // )
                            ]);
                        }
                    }
                ],
                data6: [],
                index: 1,
                formDynamic: {
                    items: []
                },
                ruleInline: {
                    user: [
                        {required: true, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, trigger: 'blur'},
                        {
                            type: 'string',
                            min: 6,
                            trigger: 'blur'
                        }
                    ]
                },
            }
        },
        methods: {
            /*****获取公司名称变更日志*****/
            get_company_name_change_log(e){
                let _self = this
                _self.openComNameLog = true
                _self.changeLoading = true
                let url = `api/customer/company/companyNameChangeLogList`

                let config = {
                    params:{
                        companyid:e.row.id,
                        page:_self.changePage,
                        pageSize: 10,
                        sortField: "updateDate"
                    }
                }

                function success(res){
                        _self.pageTotal = res.data.data.total
                        _self.changeData = res.data.data.rows
                        _self.changeLoading = false
                }

                this.$Get(url,config,success)
            },
            /*************************初始化企业列表********************************/
            getCompanyData() {
                var _self = this
                _self.data6 = []
                var url = '/api/customer/findCompanysByCustomerId/' + _self.customerid
                this.$http.get(url)
                    .then(function (response) {
                        for (var i = 0; i < response.data.data.length; i++) {
                            var a = {}
                            a.RegNumber = response.data.data[i].RegNumber
                            a.CNumber = response.data.data[i].CNumber
                            a.CPassword = response.data.data[i].CPassword
                            a.PNumber = response.data.data[i].PNumber
                            a.PPassword = response.data.data[i].PPassword
                            a.OrgCode = response.data.data[i].OrgCode
                            a.CreditCode = response.data.data[i].CreditCode
                            a.BankCode = response.data.data[i].BankCode
                            a.BasicBank = response.data.data[i].BasicBank
                            a.BasicBankCode = response.data.data[i].BasicBankCode
                            a.SimpleBank = response.data.data[i].SimpleBank
                            a.MainProduct = response.data.data[i].MainProduct
                            a.CompanyType = response.data.data[i].CompanyType
                            a.RegAddress = response.data.data[i].RegAddress
                            a.financelevel = response.data.data[i].financelevel
                            a.accountgrade = response.data.data[i].accountgrade
                            if(response.data.data[i].companyname == null || response.data.data[i].companyname == ""){
                                a.showcompanyname = ""
                            }else{
                                if(response.data.data[i].companyname.length>10){
                                    a.showcompanyname = response.data.data[i].companyname.slice(0,10)+'...'
                                }else{
                                    a.showcompanyname = response.data.data[i].companyname
                                }
                            }
                            a.companyname = response.data.data[i].companyname
                            a.followby = response.data.data[i].followby
                            a.enterprisestatusText = response.data.data[i].enterprisestatusText
                            a.enterprisestatus = response.data.data[i].enterprisestatus
                            a.legalrepresentative = response.data.data[i].legalrepresentative
                            a.importlevelText = response.data.data[i].importlevelText
                            a.importlevel = response.data.data[i].importlevel
                            a.createby = response.data.data[i].createby
                            a.cluesourceText = response.data.data[i].cluesourceText
                            a.cluesource = response.data.data[i].cluesource
                            a.id = response.data.data[i].id
                            a.companyarea = response.data.data[i].companyarea
                            _self.data6.push(a)
                        }
                    })
            },

            /*************************修改企业信息********************************/
            amend(e) {
                var _self = this
                // console.log(e)
                _self.modal3 = true
                _self.formValidate.id = e.row.id
                _self.formValidate.companyname = e.row.companyname
                _self.formValidate.followby = e.row.followby
                // _self.formValidate.enterprisestatus = e.row.enterprisestatusText
                _self.formValidate.enterprisestatus = e.row.enterprisestatus
                _self.formValidate.legalrepresentative = e.row.legalrepresentative
                _self.formValidate.importlevel = e.row.importlevel
                _self.formValidate.createby = e.row.createby
                _self.formValidate.cluesource = e.row.cluesource
                _self.formValidate.id = e.row.id
                _self.formValidate.accountgrade = e.row.accountgrade
                // _self.formValidate.companyarea = e.row.companyarea.split('-')
                // _self.formValidate.companyarea[0] = parseInt(_self.formValidate.companyarea[0])
                // _self.formValidate.companyarea[1] = parseInt(_self.formValidate.companyarea[1])                
                // console.log(_self.formValidate)
                let temp = e.row.companyarea.split('-')
                temp[0] = parseInt(temp[0])
                temp[1] = parseInt(temp[1])    
                // console.log(temp)   
                _self.formValidate.companyarea = [] 
                _self.formValidate.companyarea.push(temp[0],temp[1])
                // delete _self.formValidate.companyarea.__ob__
                // console.log(_self.formValidate.companyarea)   
                            
                
            },

            /*************************编辑企业信息********************************/
            edit(e) {
                var _self = this

                _self.modal8 = true

                _self.formValidate3.companyname = e.row.companyname
                _self.formValidate3.regnumber = e.row.RegNumber
                _self.formValidate3.creditcode = e.row.CreditCode
                _self.formValidate3.orgcode = e.row.OrgCode
                _self.formValidate3.mainproduct = e.row.MainProduct
                _self.formValidate3.industry = e.row.Industry
                _self.formValidate3.companytype = e.row.CompanyType
                _self.formValidate3.regaddress = e.row.RegAddress
                _self.formValidate3.basicbank = e.row.BasicBank
                _self.formValidate3.basicbankcode = e.row.BasicBankCode
                _self.formValidate3.simplebank = e.row.SimpleBank
                _self.formValidate3.cnumber = e.row.CNumber
                _self.formValidate3.cpassword = e.row.CPassword
                _self.formValidate3.bankcode = e.row.BankCode
                _self.formValidate3.pnumber = e.row.PNumber
                _self.formValidate3.ppassword = e.row.PPassword
                _self.formValidate3.id = e.row.id

                _self.getEditSelect()
            },

            /*************************初始化编辑下拉框********************************/
            getEditSelect() {
                var _self = this
                _self.financelevelValue = []

                this.searchTypegroup('financelevel')

                let _financelevelArr = JSON.parse(localStorage.getItem('financelevel'))

                for (var i = 0; i < _financelevelArr.length; i++) {

                    var customersourceObj = {}

                    customersourceObj.label = _financelevelArr[i].typename
                    customersourceObj.value = _financelevelArr[i].typecode
                    _self.financelevelValue.push(customersourceObj)
                }
            },

            /*************************初始化修改下拉框********************************/
            getSelectOptions() {
                var _self = this
                _self.importlevelValue = []
                _self.customersourceValue = []
                _self.enterprisestatusValue = []
                _self.taxtypeValue = []

                // this.searchTypegroup('cluesource')
                // this.searchTypegroup('importlevel')
                // this.searchTypegroup('enterprisestatus')
                // this.searchTypegroup('taxtype')
                
                // let url2 = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=cluesources`

                let params = "cluesources,importlevel,enterprisestatus,taxtype,financialLevel"

                function finish(res){

                    let _cluesourceArr = res.data.data.cluesources
                    let _importlevelArr = res.data.data.importlevel
                    let _enterprisestatusArr = res.data.data.enterprisestatus
                    let _taxtypeArr = res.data.data.taxtype
                    
                    _self.financialLevel = res.data.data.financialLevel

                    for (var i = 0; i < _cluesourceArr.length; i++) {
                        var customersourceObj = {}

                        customersourceObj.label = _cluesourceArr[i].typename
                        customersourceObj.value = _cluesourceArr[i].typecode
                        _self.customersourceValue.push(customersourceObj)
                    }

                    for (var i = 0; i < _importlevelArr.length; i++) {

                        var customersourceObj = {}

                        customersourceObj.label = _importlevelArr[i].typename
                        customersourceObj.value = _importlevelArr[i].typecode
                        _self.importlevelValue.push(customersourceObj)
                    }

                    // 下拉框-企业状态
                    for (var i = 0; i < _enterprisestatusArr.length; i++) {

                        var customersourceObj = {}

                        customersourceObj.label = _enterprisestatusArr[i].typename
                        customersourceObj.value = _enterprisestatusArr[i].typecode
                        _self.enterprisestatusValue.push(customersourceObj)
                    }

                    // 下拉框-企业纳税类型
                    for (var i = 0; i < _taxtypeArr.length; i++) {

                        var customersourceObj = {}

                        customersourceObj.label = _taxtypeArr[i].typename
                        customersourceObj.value = _taxtypeArr[i].typecode
                        _self.taxtypeValue.push(customersourceObj)
                    }
                }

                this.$GetDataCenter(params, finish)
                // this.$http.get(url2).then(function(res){
                //     // console.log(res.data.data.cluesources)
                //     _cluesourceArr = res.data.data.cluesources
                //     // console.log(_cluesourceArr.length)
                //     for (var i = 0; i < _cluesourceArr.length; i++) {
                //         var customersourceObj = {}

                //         customersourceObj.label = _cluesourceArr[i].typename
                //         customersourceObj.value = _cluesourceArr[i].typecode
                //         _self.customersourceValue.push(customersourceObj)
                //     }
                // })
                // let _cluesourceArr = JSON.parse(localStorage.getItem('cluesource'))
                
                    
                
                // 下拉框-企业来源
                

                // 下拉框-重要等级
                // for (var i = 0; i < _importlevelArr.length; i++) {

                //     var customersourceObj = {}

                //     customersourceObj.label = _importlevelArr[i].typename
                //     customersourceObj.value = _importlevelArr[i].typecode
                //     _self.importlevelValue.push(customersourceObj)
                // }

                // // 下拉框-企业状态
                // for (var i = 0; i < _enterprisestatusArr.length; i++) {

                //     var customersourceObj = {}

                //     customersourceObj.label = _enterprisestatusArr[i].typename
                //     customersourceObj.value = _enterprisestatusArr[i].typecode
                //     _self.enterprisestatusValue.push(customersourceObj)
                // }

                // // 下拉框-企业纳税类型
                // for (var i = 0; i < _taxtypeArr.length; i++) {

                //     var customersourceObj = {}

                //     customersourceObj.label = _taxtypeArr[i].typename
                //     customersourceObj.value = _taxtypeArr[i].typecode
                //     _self.taxtypeValue.push(customersourceObj)
                // }
            },

            /*************************提交修改后的企业信息********************************/
            ok(name) {
                var _self = this
                setTimeout(() => {
                    this.loading = false;
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            delete _self.formValidate.createby
                            delete _self.formValidate.followby
                            // console.log(_self.formValidate)
                            let config = {
                                id: _self.formValidate.id,
                                companyname: _self.formValidate.companyname,
                                importlevel: _self.formValidate.importlevel,
                                cluesource: _self.formValidate.cluesource,
                                companyarea: _self.formValidate.companyarea.join('-'),
                                //  暂时启用，后期注销
                                enterprisestatus:_self.formValidate.enterprisestatus,
                                accountgrade: _self.formValidate.accountgrade

                            }
                            this.$http({
                                method: 'post',
                                url: '/api/customer/updateCompany',
                                data: config,
                                headers: {'Content-Type': 'application/json'},
                            })
                                .then(function (response) {
                                    if (response.data.msgCode == '40000') {
                                        _self.$Message.success('修改成功!')
                                        _self.modal3 = false
                                        _self.$refs[name].resetFields();
                                        Bus.$emit('msg',true)
                                        _self.getCompanyData()
                                    } else {
                                        _self.$Message.warning('修改失败!')
                                    }
                                })
                        } else {
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                        }
                    })
                }, 2000);
            },

            /*************************提交新增的企业信息********************************/
            okSubmit(name) {
                var _self = this
                console.log(_self.formValidate2)
                setTimeout(() => {
                    this.loading = false;
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            var _self = this
                            let config = {
                                companyname: _self.formValidate2.companyname,
                                legalrepresentative: _self.formValidate2.legalrepresentative,
                                importlevel: _self.formValidate2.importlevel,
                                cluesource: _self.formValidate2.cluesource,
                                enterprisestatus: _self.formValidate2.enterprisestatus,
                                taxtype: _self.formValidate2.taxtype,
                                companyarea:_self.formValidate2.companyarea.join('-'),
                                tel: _self.formValidate2.tel,
                                // cluesource: _self.formValidate2.customersource,
                                customerid: _self.formValidate2.customerid,
                            }
                            console.log(config)
                            delete _self.formValidate2.createby
                            delete _self.formValidate2.followby
                            this.$http({
                                method: 'post',
                                url: '/api/customer/saveCompany',
                                data: config,
                                headers: {'Content-Type': 'application/json'},
                            })
                                .then(function (response) {
                                    if (response.data.msgCode == '40000') {
                                        _self.$Message.success('新增成功!')
                                        _self.modal33 = false
                                        _self.$refs[name].resetFields();
                                        Bus.$emit('msg',true)                                        
                                        _self.getCompanyData()
                                    } else {
                                        _self.$Message.success('新增失败!')
                                    }
                                })
                        } else {
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                        }
                    })
                }, 2000);
            },

            /*************************提交编辑后的企业信息********************************/
            EditCompany() {
                var _self = this
                this.$http({
                    method: 'post',
                    url: '/api/customer/updateCompany',
                    data: _self.formValidate3,
                    headers: {'Content-Type': 'application/json'},
                })
                    .then(function (response) {
                        if (response.data.msgCode == '40000') {
                            _self.$Message.success('编辑成功!')
                            _self.getCompanyData()
                        } else {
                            _self.$Message.success('编辑失败!')
                        }
                    })
            },

            /*************************删除企业信息********************************/
            companyDelete(e) {
                var _self = this
                this.$http.get('/api/customer/delCompany/' + e.row.id)
                    .then(function (response) {
                        if (response.data.msgCode == '40000') {
                            _self.$Message.success('删除成功!')
                            _self.getCompanyData()
                        } else {
                            _self.$Message.success('删除失败!')
                        }
                    })
            },

            /*************************关闭弹窗，重置表单********************************/
            cancel(name) {
                this.$refs[name].resetFields();
            },
            GetDataAREA(){
                let _self = this
                // let url = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=companyarea`
                // this.$http.get(url).then(function(res){
                //     // console.log(res.data.data.companyarea)
                //     let temp = res.data.data.companyarea
                //     for(let i = 0;i<res.data.data.companyarea.length;i++){
                //         let com = {}
                //         com.value = res.data.data.companyarea[i].id
                //         com.typecode = res.data.data.companyarea[i].typecode
                //         com.label = res.data.data.companyarea[i].typename
                //         com.children = []
                //         for(let j = 0;j<res.data.data.companyarea[i].children.length;j++){
                //             let com_child = {}
                //             com_child.value = res.data.data.companyarea[i].children[j].id
                //             com_child.typecode = res.data.data.companyarea[i].children[j].typecode
                //             com_child.label = res.data.data.companyarea[i].children[j].typename
                //             com.children.push(com_child)
                //         }
                //         _self.companyareadata.push(com)
                //     }
                //     // console.log(_self.companyareadata)
                // })
                let params = "companyarea"

                function finish(res){
                    let temp = res.data.data.companyarea
                    for(let i = 0;i<res.data.data.companyarea.length;i++){
                        let com = {}
                        com.value = res.data.data.companyarea[i].id
                        com.typecode = res.data.data.companyarea[i].typecode
                        com.label = res.data.data.companyarea[i].typename
                        com.children = []
                        for(let j = 0;j<res.data.data.companyarea[i].children.length;j++){
                            let com_child = {}
                            com_child.value = res.data.data.companyarea[i].children[j].id
                            com_child.typecode = res.data.data.companyarea[i].children[j].typecode
                            com_child.label = res.data.data.companyarea[i].children[j].typename
                            com.children.push(com_child)
                        }
                        _self.companyareadata.push(com)
                    }
                }

                this.$GetDataCenter(params, finish)

            },
            // GetDataCenter(){
            //     let params = `financialLevel`

            //     let _self = this

            //     function success(res){
            //         console.log(res.data.data.financialLevel)
            //         _self.financialLevel = res.data.data.financialLevel
            //     }

            //     this.$GetDataCenter(params, success)
            // },
            change_page_change(e){

            }
        },
        mounted() {
            // this.GetDataCenter()
            this.getSelectOptions()
            this.GetDataAREA()
            this.getCompanyData()
        }
    }
</script>

<style>
/* .ivu-form-item{
    margin-bottom: 0px
} */
</style>
