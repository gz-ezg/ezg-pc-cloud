<template>
    <div>
        <Card>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="plus" @click="isAddChange">新增</Button>
                    <Button type="primary" icon="edit" @click="isEditChange">编辑</Button>
                    <Button type="primary" icon="ios-crop" @click="detailCustomer">查看</Button>
                    <Button type="primary" icon="ios-color-filter-outline">客户转移日志</Button>
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
                        placement="top"
                        show-total
                        show-sizer
                        show-elevator
                        @on-change="pageChange"
                        @on-page-size-change="pageSizeChange"
                        style="margin-top: 10px"></Page>
            </Row>
        </Card>
        <Modal v-model="modal2" width="360">
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
        <Modal
                v-model="EditForm"
                title="编辑"
                :loading="loading"
                @on-ok="ok('formValidate')"
                @on-cancel="cancel('formValidate')">
            <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="80">
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="客户名称" prop="customername">
                        <Input size="small" v-model="formValidate.customername"/>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="电话" prop="mobile">
                        <Input size="small" v-model="formValidate.mobile"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="固话" prop="fixedPhone">
                        <Input size="small" v-model="formValidate.fixedPhone"/>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="QQ" prop="qq">
                        <Input size="small" v-model="formValidate.qq"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="微信" prop="weixin">
                        <Input size="small" v-model="formValidate.weixin"/>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="邮箱" prop="email">
                        <Input size="small" v-model="formValidate.email"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="客户状态" prop="customerstatus">
                        <Cascader trigger="hover" :data="customertypeValue"
                                  v-model="formValidate.customerstatus"></Cascader>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="客户来源" prop="customersource">
                        <Select transfer v-model="formValidate.customersource" size="small">
                            <Option v-for="item in customersourceValue" :value="item.value" :key="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="客户等级" prop="importlevel">
                        <Select transfer v-model="formValidate.importlevel" size="small">
                            <Option v-for="item in importlevelValue" :value="item.value" :key="item.value">{{ item.label
                                }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="区域" prop="area">
                        <Select transfer v-model="formValidate.area" size="small">
                            <Option v-for="item in areaValue" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <FormItem label="备注" prop="backup">
                    <Input size="small" type="textarea" v-model="formValidate.memo"/>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="modal1"
                width="100%"
                :styles="{height: '100%', top: '0px'}"
                title="查看"
                @on-ok="cancel2"
                @on-cancel="cancel2">
            <Row>
                <Col span="5">
                <public-pool-form v-if="isExamine" :customerid='customerid'></public-pool-form>
                </Col>
                <Col span="19">
                <Card>
                    <Collapse accordion>
                        <Panel name="Company">
                            企业信息
                            <P slot="content">
                                <public-pool-company v-if="isExamine"
                                                     :customerId2='customerId2'></public-pool-company>
                            </P>
                        </Panel>
                        <Panel name="CustomerContent">
                            客户跟进记录
                            <P slot="content">
                                <public-pool-fllow-up v-if="isExamine"
                                                      :customerId2='customerId2'></public-pool-fllow-up>
                            </P>
                        </Panel>
                        <Panel name="Order">
                            订单详情
                            <P slot="content">
                                <public-pool-order-list v-if="isExamine"
                                                        :customerId2='customerId2'></public-pool-order-list>
                            </P>
                        </Panel>
                        <Panel name="CustomerRelation">
                            客户关系人
                            <P slot="content">
                                <public-pool-relation-person v-if="isExamine"
                                                             :customerId2='customerId2'></public-pool-relation-person>
                            </P>
                        </Panel>
                        <Panel name="CustomerWorkOrder">
                            服务动态
                            <P slot="content">
                                <public-pool-service-dynamic v-if="isExamine"
                                                             :customerId2='customerId2'></public-pool-service-dynamic>
                            </P>
                        </Panel>
                    </Collapse>
                </Card>
                </Col>
            </Row>
        </Modal>
    </div>
</template>

<script>
    import Bus from '../../components/bus'
    import publicPoolForm from './publicPool_detail__from.vue'
    import publicPoolCompany from './publicPool_detail_company.vue'
    import publicPoolFllowUp from './publicPool_detail__followUp.vue'
    import publicPoolOrderList from './publicPool_detail__orderList.vue'
    import publicPoolRelationPerson from './publicPool_detail__relationPerson.vue'
    import publicPoolServiceDynamic from './publicPool_detail__serviceDynamic.vue'

    export default {
        components: {
            publicPoolForm,
            publicPoolCompany,
            publicPoolFllowUp,
            publicPoolOrderList,
            publicPoolRelationPerson,
            publicPoolServiceDynamic
        },
        data() {
            const validateCascader = (rule, value, callback) => {
                if (value == '') {
                    callback(new Error('请选择客户状态'));
                } else {
                    callback();
                }
            };
            const validateTel = (rule, value, callback) => {
                let re = /^1\d{10}$/
                if (value == '' || value == null) {
                    callback();
                } else {
                    if (re.test(value)) {
                        callback();
                    } else {
                        callback(new Error('电话格式不正确'));
                    }
                }
            };
            const validateFixedphone = (rule, value, callback) => {
                let re = /\d{3}-\d{8}|\d{4}-\d{7}/
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
            return {
                ishandleSubmit: false,
                loading: true,
                issearch: false,
                isExamine: false,
                modal1: false,
                modal2: false,
                modal_loading: false,
                AutoCompletedata: [],
                customertypeValue: [],
                customersourceValue: [],
                importlevelValue: [],
                areaValue: [],
                isboundValue: [],
                columns: [
                    {
                        title: '客户名称',
                        width: 100,
                        key: 'customerName',
                    },
//                    {
//                        title: '联系方式',
//                        key: 'people',
//                        render: (h, params) => {
//                            return h('Poptip', {
//                                props: {
//                                    trigger: 'hover',
//                                    title: '联系方式',
//                                    placement: 'right',
////                                    transfer: 'true'
//                                }
//                            }, [
//                                h('Tag', 4),
//                                h('div', {
//                                    slot: 'content'
//                                }, [
//                                    h('ul', this.data[params.index].people.map(item => [
//                                        h('li', {
//                                            style: {
//                                                padding: '4px'
//                                            }
//                                        }, '手机：' + item.mobile),
//                                        h('li', {
//                                            style: {
//                                                padding: '4px'
//                                            }
//                                        }, '固话：' + item.fixedPhone),
//                                        h('li', {
//                                            style: {
//                                                padding: '4px'
//                                            }
//                                        }, 'Q Q：' + item.qq),
//                                        h('li', {
//                                            style: {
//                                                padding: '4px'
//                                            }
//                                        }, '微信：' + item.weixin)
//                                    ]))
//                                ])
//                            ]);
//                        },
//                        width: 90,
//                    },
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
                                h('span', this.data[params.index].mobile + '    '),
                                h('Icon', {
                                    props: {
                                        type: 'arrow-down-b',
                                    }
                                }),
                                h('div', {
                                    slot: 'content'
                                }, [
                                    h('ul', this.data[params.index].people.map(item => [
                                        h('li', {
                                            style: {
                                                padding: '4px'
                                            }
                                        }, '手机：' + item.mobile),
                                        h('li', {
                                            style: {
                                                padding: '4px'
                                            }
                                        }, '固话：' + item.fixedPhone),
                                        h('li', {
                                            style: {
                                                padding: '4px'
                                            }
                                        }, 'Q  Q：' + item.qq),
                                        h('li', {
                                            style: {
                                                padding: '4px'
                                            }
                                        }, '微信：' + item.weixin)
                                    ]))
                                ])
                            ]);
                        },
                        width: 150,
                    },
                    {
                        title: '客户来源',
                        key: 'customerSource',
                        width: 100
                    },
                    {
                        title: '客户状态',
                        key: 'customerstatus',
                        width: 100
                    },
                    {
                        title: '线索类别',
                        key: '',
                        width: 100
                    },
                    /*                    {
                                            title: '来源细分',
                                            key: 'importLevelText',
                                            width: 100
                                        },*/
                    {
                        title: '地区',
                        key: 'area',
                        width: 80
                    },
                    /*                    {
                                            title: '销售',
                                            key: 'createby',
                                            width: 120
                                        },*/
                    {
                        title: '归属部门',
                        key: 'departname',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'createdate',
                        width: 120
                    },
                    {
                        title: '创建人',
                        key: 'username',
                        width: 100
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        fixed: 'right',
                        width: 200,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.customerid = params.row.id
                                            this.modal2 = true
                                        }
                                    }
                                }, '[删除]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params)
                                        }
                                    }
                                }, '[分配]'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params)
                                        }
                                    }
                                }, '[领取]')
                            ]);
                        }
                    }
                ],
                ruleValidate: {
                    customername: [
                        {required: true, trigger: 'blur', message: '姓名不能为空'}
                    ],
                    customerstatus: [
                        {required: true, validator: validateCascader, trigger: 'change'}
                    ],
                    customersource: [
                        {required: true, trigger: 'change', message: '请选择客户来源'}
                    ],
                    mobile: [
                        {validator: validateTel, trigger: 'blur'}
                    ],
                    fixedPhone: [
                        {validator: validateFixedphone, trigger: 'blur'}
                    ],
                    importlevel: [
                        {required: true, trigger: 'change', message: '请选择客户等级'}
                    ],
                    area: [
                        {required: true, trigger: 'change', message: '请选择区域'}
                    ],
                },
                formValidate: {
                    customername: '',
                    mobile: '',
                    fixedPhone: '',
                    qq: '',
                    weixin: '',
                    email: '',
                    customerstatus: [],
                    customersource: '',
                    importlevel: '',
                    area: '',
                    memo: '',
                },
                customerstatus: '',
                data: [],
                pageTotal: '',
                pageSize: 10,
                customerid: '',
                customerId2: '',
                customertypeText: '',
                tel: '',
                customersource: '',
                EditForm: false
            }
        },
        methods: {

            // 表格数据请求
            getTableData() {
                let _self = this
                let url = '/publicPool/findUnallocatedByPages/1/10'

                _self.data = []

                function doSuccess(response) {
                    _self.pageTotal = response.data.data.total

                    for (let i = 0; i < response.data.data.rows.length; i++) {
                        let _tel = ''
                        if(response.data.data.rows[i].fixedphone == null) {
                            _tel = ''
                        } else {
                            _tel = response.data.data.rows[i].fixedphone
                        }
                        _self.data.push({
                            area: response.data.data.rows[i].area,
                            createdate: response.data.data.rows[i].createdate,
                            customerName: response.data.data.rows[i].customerName,
                            customerSource: response.data.data.rows[i].customerSource,
                            customerstatus: response.data.data.rows[i].customerstatus,
                            departname: response.data.data.rows[i].departname,
                            id: response.data.data.rows[i].id,
                            labels: response.data.data.rows[i].labels,
                            username: response.data.data.rows[i].username,
                            mobile: response.data.data.rows[i].mobile,
                            people: [
                                {
                                    mobile: response.data.data.rows[i].mobile,
                                    fixedPhone: _tel,
                                    qq: response.data.data.rows[i].qq,
                                    weixin: response.data.data.rows[i].weixin,
                                }
                            ]
                        })
                    }
                }

                this.GetData(url, doSuccess)
            },

            // 表格行选中事件
            selectRow(a) {
                let _self = this
                _self.customerid = a.id

                this.$http.get('/api/publicPool/findPublicPoolById/' + _self.customerid)
                    .then(function (response) {
                        _self.customerId2 = response.data.data.customerId
                    })
            },

            // 改变页码
            pageChange(a) {
                let _self = this
                let url = '/publicPool/findUnallocatedByPages/' + a + '/' + _self.pageSize

                function doSuccess(response) {
                    _self.data = []

                    for (let i = 0; i < response.data.data.rows.length; i++) {
                        let _tel = ''
                        if(response.data.data.rows[i].fixedphone == null) {
                            _tel = ''
                        } else {
                            _tel = response.data.data.rows[i].fixedphone
                        }
                        _self.data.push({
                            area: response.data.data.rows[i].area,
                            createdate: response.data.data.rows[i].createdate,
                            customerName: response.data.data.rows[i].customerName,
                            customerSource: response.data.data.rows[i].customerSource,
                            customerstatus: response.data.data.rows[i].customerstatus,
                            departname: response.data.data.rows[i].departname,
                            id: response.data.data.rows[i].id,
                            labels: response.data.data.rows[i].labels,
                            username: response.data.data.rows[i].username,
                            mobile: response.data.data.rows[i].mobile,
                            people: [
                                {
                                    mobile: response.data.data.rows[i].mobile,
                                    fixedPhone: _tel,
                                    qq: response.data.data.rows[i].qq,
                                    weixin: response.data.data.rows[i].weixin,
                                }
                            ]
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

                this.$http.get('/api/publicPool/findUnallocatedByPages/1/' + a)
                    .then(function (response) {
                        for (let i = 0; i < response.data.data.rows.length; i++) {
                            let _tel = ''
                            if(response.data.data.rows[i].fixedphone == null) {
                                _tel = ''
                            } else {
                                _tel = response.data.data.rows[i].fixedphone
                            }
                            _self.data.push({
                                area: response.data.data.rows[i].area,
                                createdate: response.data.data.rows[i].createdate,
                                customerName: response.data.data.rows[i].customerName,
                                customerSource: response.data.data.rows[i].customerSource,
                                customerstatus: response.data.data.rows[i].customerstatus,
                                departname: response.data.data.rows[i].departname,
                                id: response.data.data.rows[i].id,
                                labels: response.data.data.rows[i].labels,
                                username: response.data.data.rows[i].username,
                                mobile: response.data.data.rows[i].mobile,
                                people: [
                                    {
                                        mobile: response.data.data.rows[i].mobile,
                                        fixedPhone: _tel,
                                        qq: response.data.data.rows[i].qq,
                                        weixin: response.data.data.rows[i].weixin,
                                    }
                                ]
                            })
                        }
                    })
            },

            isEditChange() {
                let _self = this

                if (_self.customerid != '') {
                    let url = '/publicPool/findPublicPoolById/' + _self.customerid

                    _self.EditForm = true

                    function doSuccess(response) {
                        let _res = response.data.data
                        _self.formValidate.id = _res.id
                        _self.formValidate.customername = _res.customerName
                        _self.formValidate.mobile = _res.mobile
                        _self.formValidate.fixedPhone = _res.fixedPhone
                        _self.formValidate.qq = _res.qq
                        _self.formValidate.weixin = _res.weixin
                        _self.formValidate.email = _res.email
                        _self.formValidate.customersource = _res.customerSource
                        _self.formValidate.importlevel = _res.importlevel.toString()
                        _self.formValidate.area = _res.area
                        _self.formValidate.memo = _res.memo
                        _self.customerstatus = _res.customerstatus

                        _self.getSelectOptions()
                    }

                    this.GetData(url, doSuccess)
                } else {
                    this.$Message.warning('抱歉，您还没有选择客户');
                }
            },

            isAddChange() {
                let _self = this

                this.$emit('isAdd', '')
            },

            deleteCustomer2() {
                let _self = this
                let url = '/publicPool/delPublicPool'

                function doSuccess(response) {
                    _self.modal2 = false;
                    _self.$Message.success('删除成功！');
                    _self.getTableData()
                }

                function otherConditions(response) {
                    _self.$Message.error('删除失败！');
                }

                this.PostData(url, {id: _self.customerid}, doSuccess, otherConditions)

            },

            isSearch(e) {
                let _self = this
                _self.issearch = e
            },

            getSelectOptions() {
                let _self = this

                this.searchTypegroup('customerType')
                this.searchTypegroup('cluesource')
                this.searchTypegroup('area')
                this.searchTypegroup('custImport')

                let _customerTypeArr = JSON.parse(localStorage.getItem('customerType'))
                let _cluesourceArr = JSON.parse(localStorage.getItem('cluesource'))
                let _areaArr = JSON.parse(localStorage.getItem('area'))
                let _custImportArr = JSON.parse(localStorage.getItem('custImport'))

                // 级联下拉框-客户状态
                let mapdata = new Map()  //用作临时转换
                let subIdToParentMap = new Map()
                let sourceData = _customerTypeArr  //结果集
                let finalArrayData = new Array()   //vue要求的数据格式

                for (let i = 0; i < sourceData.length; i++) {
                    let _sub = new Object()

                    _sub.value = sourceData[i].subid.toString()
                    _sub.label = sourceData[i].subtypename

                    subIdToParentMap.set(_sub.value, sourceData[i].id)

                    let _value = mapdata.get(sourceData[i].id)

                    if (_value) {
                        let _valueArray = _value.children

                        _valueArray.push(_sub)

                        let _valueObject = new Object()

                        _valueObject.value = _value.value.toString()
                        _valueObject.label = _value.label
                        _valueObject.children = _valueArray

                        mapdata.set(sourceData[i].id, _valueObject)
                    } else {
                        let _child = new Array()

                        _child.push(_sub)

                        let _main = new Object()

                        _main.value = sourceData[i].id.toString()
                        _main.label = sourceData[i].typename
                        _main.children = _child

                        mapdata.set(sourceData[i].id, _main)
                    }
                }

                mapdata.forEach((value, key) => {
                    finalArrayData.push(value)
                });

                for (let i = 0; i < finalArrayData.length; i++) {

                    for (let j = 0; j < finalArrayData[i].children.length; j++) {

                        if ((finalArrayData[i].children[j].value) == (_self.customerstatus)) {
                            _self.formValidate.customerstatus[0] = finalArrayData[i].value
                            _self.formValidate.customerstatus[1] = _self.customerstatus
                        }
                    }
                }

                _self.customertypeValue = finalArrayData

                // 下拉框-客户来源
                for (let i = 0; i < _cluesourceArr.length; i++) {

                    let customersourceObj = {}

                    customersourceObj.label = _cluesourceArr[i].typename
                    customersourceObj.value = _cluesourceArr[i].typecode
                    _self.customersourceValue.push(customersourceObj)
                }

                // 下拉框-区域
                for (let i = 0; i < _areaArr.length; i++) {

                    let areaObj = {}

                    areaObj.label = _areaArr[i].typename
                    areaObj.value = _areaArr[i].typecode

                    _self.areaValue.push(areaObj)
                }

                // 下拉框-客户等级
                for (let i = 0; i < _custImportArr.length; i++) {

                    let importlevelObj = {}

                    importlevelObj.label = _custImportArr[i].typename
                    importlevelObj.value = _custImportArr[i].typecode
                    _self.importlevelValue.push(importlevelObj)
                }
            },

            /*************************录入提交验证********************************/
            ok(name) {
                let _self = this
                setTimeout(() => {
                    this.loading = false;
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            let _customertypeStr = _self.formValidate.customerstatus[1]
                            _self.formValidate.customerstatus = _customertypeStr

                            if (_self.formValidate.mobile == '' && _self.formValidate.fixedPhone == '' && _self.formValidate.qq == '' && _self.formValidate.weixin == '') {
                                this.$nextTick(() => {
                                    this.loading = true;
                                });
                                this.$Message.error('电话、固话、QQ、微信必须填写一个');
                            } else {
                                let url = '/publicPool/updatePublicPool'

                                function doSuccess(response) {
                                    _self.$Message.success('更新成功!')
                                    _self.EditForm = false
                                    _self.$emit('hideAddPanel', 'false');
                                    _self.getTableData()
                                }

                                this.PostData(url, _self.formValidate, doSuccess)
                            }
                        } else {
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                        }
                    })
                }, 2000);
            },
            /*************************取消录入，重置表单********************************/
            cancel() {
                let _self = this
                this.$emit('hideAddPanel', 'false');
            },

            cancel2() {
                let _self = this

                _self.customerId2 = ''
                _self.customerid = ''
                _self.isExamine = false
            },

            detailCustomer() {
                let _self = this

                _self.modal1 = true
                _self.isExamine = true
            }
        },
        mounted() {
            this.getTableData()
            Bus.$on('msg', (e) => {
                this.getTableData()
            })
        }
    }
</script>