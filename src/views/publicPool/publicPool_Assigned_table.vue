<template>
    <div>
        <Card>
            <Row>
                <ButtonGroup>
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
            return {
                isExamine: false,
                ishandleSubmit: false,
                issearch: false,
                modal1: false,
                modal2: false,
                modal_loading: false,
                AutoCompletedata: [],
                customertypeValue: [],
                customersourceValue: [],
                areaValue: [],
                isboundValue: [],
                columns: [
                    {
                        title: '客户名称',
                        width: 100,
                        key: 'customerName',
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
                        key: 'customerType',
                        width: 100
                    },
                    {
                        title: '线索类别',
                        key: 'labels',
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
                    {
                        title: '销售',
                        key: 'salesman',
                        width: 120
                    },
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
                        width: 120
                    },
                ],
                data: [],
                pageTotal: '',
                pageSize: 10,
                customerid: '',
                customerId2: '',
                customertypeText: '',
                tel: '',
                customersource: ''
            }
        },
        methods: {

            // 表格数据请求
            getTableData() {
                let _self = this
                let url = '/publicPool/findAssignedByPages/1/10'

                _self.data = []

                function doSuccess(response) {
                    _self.pageTotal = response.data.data.total

                    for (let i = 0; i < response.data.data.rows.length; i++) {
                        _self.data.push({
                            area: response.data.data.rows[i].area,
                            createdate: response.data.data.rows[i].createdate,
                            customerName: response.data.data.rows[i].customerName,
                            customerSource: response.data.data.rows[i].customerSource,
                            customerType: response.data.data.rows[i].customerType,
                            departname: response.data.data.rows[i].departname,
                            id: response.data.data.rows[i].id,
                            labels: response.data.data.rows[i].labels,
                            username: response.data.data.rows[i].username,
                            salesman: response.data.data.rows[i].salesman,
                            mobile: response.data.data.rows[i].mobile,
                            people: [
                                {
                                    mobile: response.data.data.rows[i].mobile,
                                    fixedPhone: response.data.data.rows[i].fixedphone,
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
                let url = '/publicPool/findAssignedByPages/' + a + '/' + _self.pageSize

                function doSuccess(response) {
                    _self.data = []

                    for (let i = 0; i < response.data.data.rows.length; i++) {
                        _self.data.push({
                            area: response.data.data.rows[i].area,
                            createdate: response.data.data.rows[i].createdate,
                            customerName: response.data.data.rows[i].customerName,
                            customerSource: response.data.data.rows[i].customerSource,
                            customerType: response.data.data.rows[i].customerType,
                            departname: response.data.data.rows[i].departname,
                            id: response.data.data.rows[i].id,
                            labels: response.data.data.rows[i].labels,
                            username: response.data.data.rows[i].username,
                            salesman: response.data.data.rows[i].salesman,
                            mobile: response.data.data.rows[i].mobile,
                            people: [
                                {
                                    mobile: response.data.data.rows[i].mobile,
                                    fixedPhone: response.data.data.rows[i].fixedphone,
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

                this.$http.get('/api/publicPool/findAssignedByPages/1/' + a)
                    .then(function (response) {
                        for (let i = 0; i < response.data.data.rows.length; i++) {
                            _self.data.push({
                                area: response.data.data.rows[i].area,
                                createdate: response.data.data.rows[i].createdate,
                                customerName: response.data.data.rows[i].customerName,
                                customerSource: response.data.data.rows[i].customerSource,
                                customerType: response.data.data.rows[i].customerType,
                                departname: response.data.data.rows[i].departname,
                                id: response.data.data.rows[i].id,
                                labels: response.data.data.rows[i].labels,
                                username: response.data.data.rows[i].username,
                                salesman: response.data.data.rows[i].salesman,
                                mobile: response.data.data.rows[i].mobile,
                                people: [
                                    {
                                        mobile: response.data.data.rows[i].mobile,
                                        fixedPhone: response.data.data.rows[i].fixedphone,
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
                    this.$emit('isEdit',
                        {
                            customerid: _self.customerid,
                            customertypeText: _self.customertypeText,
                            tel: _self.tel,
                            customersource: _self.customersource
                        });
                } else {
                    this.$Message.warning('抱歉，您还没有选择客户');
                }
            },

            isAddChange() {
                let _self = this

                this.$emit('isAdd', '')
            },

            deleteCustomer() {
                let _self = this

                if (_self.customerid != '') {
                    _self.modal2 = true
                } else {
                    this.$Message.warning('抱歉，您还没有选择客户');
                }

            },

            deleteCustomer2() {
                let _self = this

                this.$http.get('/api/customer/deleteCustomerById/' + _self.customerid)
                    .then(function (response) {

                        if (response.data.msgCode == '40000') {
                            _self.modal2 = false;
                            _self.$Message.success('删除成功！');
                            _self.getTableData()
                        } else {
                            _self.$Message.error('删除失败！');
                        }

                    })
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
                this.searchTypegroup('sf_yn')

                let _customerTypeArr = JSON.parse(localStorage.getItem('customerType'))
                let _cluesourceArr = JSON.parse(localStorage.getItem('cluesource'))
                let _areaArr = JSON.parse(localStorage.getItem('area'))
                let _sf_ynArr = JSON.parse(localStorage.getItem('sf_yn'))

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

                        if ((finalArrayData[i].children[j].value) == (_self.customertype)) {
                            _self.formValidate.customertype[0] = finalArrayData[i].value
                            _self.formValidate.customertype[1] = _self.customertype
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

                // 下拉框-发送短信
                for (let i = 0; i < _sf_ynArr.length; i++) {

                    let issendObj = {}

                    issendObj.label = _sf_ynArr[i].typename
                    issendObj.value = _sf_ynArr[i].typecode
                    _self.issendValue.push(issendObj)
                }

                this.$http.all([
                    this.$http.get('/api/user/findAllUsers'),
                ])
                    .then(this.$http.spread(function (allUserRes) {
                        for (let i = 0; i < allUserRes.data.data.length; i++) {
                            let allUserObj = {}

                            allUserObj.label = allUserRes.data.data[i].realname
                            allUserObj.value = allUserRes.data.data[i].id.toString()

                            _self.AutoCompletedata.push(allUserObj)
                        }
                    }))
            },
            detailCustomer() {
                let _self = this

                _self.modal1 = true
                _self.isExamine = true
            }
        },
        mounted() {
            this.getTableData()
        }
    }
</script>