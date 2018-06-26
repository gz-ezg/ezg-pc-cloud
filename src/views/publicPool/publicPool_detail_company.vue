<template>
    <div>
        <Table
                border
                :columns="columns7"
                :data="data6"
                style="margin-top: 15px"
        ></Table>
        <!--<Modal
                v-model="modal3"
                title="修改"
                :loading="loading"
                @on-ok="ok('formValidate')"
                @on-cancel="cancel('formValidate')">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="公司名称" prop="companyname">
                    <Input v-model="formValidate.companyname"></Input>
                </FormItem>
                <FormItem label="跟进销售" prop="followby">
                    <Input v-model="formValidate.followby" disabled></Input>
                </FormItem>
                <FormItem label="交易状态" prop="enterprisestatus">
                    <Input v-model="formValidate.enterprisestatus" disabled></Input>
                </FormItem>
                <FormItem label="法人" prop="legalrepresentative">
                    <Input v-model="formValidate.legalrepresentative"></Input>
                </FormItem>
                <FormItem label="重要等级" prop="importlevel">
                    <Select transfer v-model="formValidate.importlevel">
                        <Option v-for="item in importlevelValue" :value="item.value" :key="item.value">{{ item.label
                            }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="创建人" prop="createby">
                    <Input v-model="formValidate.createby" disabled></Input>
                </FormItem>
                <FormItem label="企业来源" prop="cluesource">
                    <Select transfer v-model="formValidate.cluesource">
                        <Option v-for="item in customersourceValue" :value="item.value" :key="item.value">{{ item.label
                            }}
                        </Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="modal33"
                title="新增"
                :loading="loading"
                @on-ok="okSubmit('formValidate2')"
                @on-cancel="cancel('formValidate2')">
            <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2" :label-width="100">
                <FormItem label="公司名称" prop="companyname">
                    <Input v-model="formValidate2.companyname"></Input>
                </FormItem>
                <FormItem label="跟进销售" prop="followby">
                    <Input v-model="formValidate2.followby" disabled></Input>
                </FormItem>
                &lt;!&ndash;          <FormItem label="交易状态" prop="qyjyzt">
                              <Input v-model="formValidate2.qyjyzt" disabled></Input>
                          </FormItem>&ndash;&gt;
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
                    <Input v-model="formValidate2.createby" disabled></Input>
                </FormItem>
                <FormItem label="企业来源" prop="cluesource">
                    <Select transfer v-model="formValidate2.cluesource" disabled>
                        <Option v-for="item in customersourceValue" :value="item.value" :key="item.value">{{ item.label
                            }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="企业状态" prop="enterprisestatus">
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
                title="编辑"
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
                    <FormItem label="注册地址" prop="eegaddress">
                        <Input v-model="formValidate3.eegaddress"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="基本户开户行" prop="basicbank">
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
        </Modal>-->
    </div>
</template>

<script>

    export default {
        props: ['customerId2'],
        data() {
            return {
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
                    customerid: this.customerid
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
                        {required: true, trigger: 'blur'}
                    ],
                    legalrepresentative: [
                        {required: true, trigger: 'blur'},
                    ],
                    importlevel: [
                        {required: true, trigger: 'change'}
                    ],
                    cluesource: [
                        {required: true,trigger: 'change'}
                    ],
                    enterprisestatus: [
                        {required: true, trigger: 'change'}
                    ],
                    taxtype: [
                        {required: true,message: '   ', trigger: 'change'}
                    ],
                },
                ruleValidate2: {
                    companyname: [
                        {required: true, trigger: 'blur'}
                    ],
                    legalrepresentative: [
                        {required: true, trigger: 'blur'},
                    ],
                    importlevel: [
                        {required: true, trigger: 'change'}
                    ],
                    cluesource: [
                        {required: true,trigger: 'change'}
                    ],
                    enterprisestatus: [
                        {required: true, trigger: 'change'}
                    ],
                    taxtype: [
                        {required: true,message: '   ', trigger: 'change'}
                    ],
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
                        key: 'companyname',
                        width: 300
                    },
                    {
                        title: '跟进销售',
                        key: 'followby'
                    },
                    {
                        title: '交易状态',
                        key: 'enterprisestatusText'
                    },
                    {
                        title: '法人',
                        key: 'legalrepresentative'
                    },
                    {
                        title: '重要等级',
                        key: 'importlevelText'
                    },
                    {
                        title: '创建人',
                        key: 'createby'
                    },
                    {
                        title: '企业来源',
                        key: 'cluesourceText'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 180,
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
                                            this.amend(params)
                                        }
                                    }
                                }, '修改'),
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

            /*************************初始化企业列表********************************/
            getCompanyData() {
                var _self = this
                _self.data6 = []
                var url = '/api/customer/findCompanysByCustomerId/' + _self.customerId2
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
                            _self.data6.push(a)
                        }
                    })
            },

           /* /!*************************修改企业信息********************************!/
            amend(e) {
                var _self = this

                _self.modal3 = true

                _self.formValidate.companyname = e.row.companyname
                _self.formValidate.followby = e.row.followby
                _self.formValidate.enterprisestatus = e.row.enterprisestatusText
                _self.formValidate.legalrepresentative = e.row.legalrepresentative
                _self.formValidate.importlevel = e.row.importlevel
                _self.formValidate.createby = e.row.createby
                _self.formValidate.cluesource = e.row.cluesource
                _self.formValidate.id = e.row.id

                _self.getSelectOptions()
            },

            /!*************************初始化修改下拉框********************************!/
            getSelectOptions() {
                var _self = this

                this.searchTypegroup('cluesource')
                this.searchTypegroup('importlevel')
                this.searchTypegroup('enterprisestatus')
//                this.searchTypegroup('taxtype')

                let _cluesourceArr = JSON.parse(localStorage.getItem('cluesource'))
                let _importlevelArr = JSON.parse(localStorage.getItem('importlevel'))
                let _enterprisestatusArr = JSON.parse(localStorage.getItem('enterprisestatus'))
//                let _taxtypeArr = JSON.parse(localStorage.getItem('taxtype'))

                // 下拉框-企业来源
                for (var i = 0; i < _cluesourceArr.length; i++) {

                    var customersourceObj = {}

                    customersourceObj.label = _cluesourceArr[i].typename
                    customersourceObj.value = _cluesourceArr[i].typecode
                    _self.customersourceValue.push(customersourceObj)
                }

                // 下拉框-重要等级
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

                /!*        // 下拉框-企业纳税类型
                        for (var i = 0; i < _taxtypeArr.length; i++) {

                            var customersourceObj = {}

                            customersourceObj.label = _taxtypeArr[i].typename
                            customersourceObj.value = _taxtypeArr[i].typecode
                            _self.taxtypeValue.push(customersourceObj)
                        }*!/
            },

            /!*************************提交修改后的企业信息********************************!/
            ok(name) {
                var _self = this
                setTimeout(() => {
                    this.loading = false;
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            delete _self.formValidate.createby
                            delete _self.formValidate.followby
                            delete _self.formValidate.enterprisestatus
                            this.$http({
                                method: 'post',
                                url: '/api/customer/updateCompany',
                                data: _self.formValidate,
                                headers: {'Content-Type': 'application/json'},
                            })
                                .then(function (response) {
                                    if (response.data.msgCode == '40000') {
                                        _self.$Message.success('修改成功!')
                                        _self.modal3 = false
                                        _self.$refs[name].resetFields();
                                        _self.getCompanyData()
                                    } else {
                                        _self.$Message.success('修改失败!')
                                    }
                                })
                        } else {
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                            this.$Message.error('修改失败!');
                        }
                    })
                }, 2000);
            },*/
        },
        mounted() {
            this.getCompanyData()
        }
    }
</script>