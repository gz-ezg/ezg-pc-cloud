<template>
    <div>
        <Card>
            <p slot="title">商事服务进度</p>
            <Table
                    border
                    :columns="columns1"
                    :data="data1"
                    style="margin-top: 15px"
            ></Table>
        </Card>
        <Card style="margin-top: 16px;">
            <p slot="title">会计服务进度</p>
            <Table
                    border
                    :columns="columns2"
                    :data="data2"
                    style="margin-top: 15px"
            ></Table>
        </Card>
        <Card style="margin-top: 16px;">
            <p slot="title">企划服务进度</p>
            <Table
                    border
                    :columns="columns3"
                    :data="data3"
                    style="margin-top: 15px"
            ></Table>
        </Card>
    </div>
</template>

<script>
    import expandRow from './ServiceDynamic_bussines.vue'
    import expandRow2 from './ServiceDynamic_account.vue'
    import expandRow3 from './ServiceDynamic_plan.vue'

    export default {
        components: {
            expandRow,
            expandRow2,
            expandRow3
        },
        props: ['customerId2'],
        data() {
            return {
                columns1: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '公司',
                        key: 'companyname'
                    },
                    {
                        title: '产品名称',
                        key: 'productname'
                    },
                    {
                        title: '当前进度',
                        key: 'currentprocess'
                    }
                ],
                data1: [],
                columns2: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow2, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '公司',
                        key: 'companyname'
                    },
                    {
                        title: '产品名称',
                        key: 'productname'
                    },
                    {
                        title: '截至税期',
                        key: 'workOrderRestDate'
                    }
                ],
                data2: [],
                columns3: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow3, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '公司',
                        key: 'companyname'
                    },
                    {
                        title: '产品名称',
                        key: 'productname'
                    },
                    {
                        title: '当前进度',
                        key: 'currentprocess'
                    }
                ],
                data3: []
            }
        },
        methods: {
            getData() {
                //
                var _self = this
                this.$http.get('/api/customer/findCustomerWorkOrderById/' + _self.customerId2)
                    .then(function (response) {
                        var _customerwork = response.data.data
                        for (var i = 0; i < _customerwork.length; i++) {
                            if (_customerwork[i].alias_code == 'BUSSINESS') {
                                var _bussinessArray = {}
                                var _productsku = ''

                                if (_customerwork[i].productskuname != null) {
                                    _productsku = '【' + _customerwork[i].productskuname + '】'
                                }

                                _bussinessArray.companyname = _customerwork[i].companyname
                                _bussinessArray.productname = _customerwork[i].productname + _productsku
                                _bussinessArray.currentprocess = _customerwork[i].currentprocess
                                _bussinessArray.ordecode = _customerwork[i].ordecode
                                _bussinessArray.servicestart = _customerwork[i].servicestart
                                _bussinessArray.departname = _customerwork[i].departname
                                _bussinessArray.serviceName = _customerwork[i].serviceName
                                _bussinessArray.restPoint = _customerwork[i].restPoint
                                _bussinessArray.workOrderStatus = _customerwork[i].workOrderStatus
                                _bussinessArray.createDate = _customerwork[i].createDate
                                _bussinessArray.updatedate = _customerwork[i].updatedate
                                _self.data1.push(_bussinessArray)
                            } else if (_customerwork[i].alias_code == 'ACCOUNT') {
                                var _accountArray = {}
                                var _productsku = ''
                                if (_customerwork[i].productskuname != null) {
                                    _productsku = '【' + _customerwork[i].productskuname + '】'
                                }
                                _accountArray.companyname = _customerwork[i].companyname
                                _accountArray.productname = _customerwork[i].productname + _productsku
                                _accountArray.workOrderRestDate = _customerwork[i].workOrderRestDate
                                _accountArray.ordecode = _customerwork[i].ordecode
                                _accountArray.servicestart = _customerwork[i].servicestart
                                _accountArray.departname = _customerwork[i].departname
                                _accountArray.serviceName = _customerwork[i].serviceName
                                _accountArray.accserviceName = _customerwork[i].accserviceName
                                _accountArray.workOrderRestTime = _customerwork[i].workOrderRestTime + '个月'
                                _accountArray.createDate = _customerwork[i].createDate
                                _accountArray.updatedate = _customerwork[i].updatedate
                                _self.data2.push(_accountArray)
                            } else if (_customerwork[i].alias_code == 'PLAN') {
                                var _plansArray = {}
                                var _productsku = ''
                                if (_customerwork[i].productskuname != null) {
                                    _productsku = '【' + _customerwork[i].productskuname + '】'
                                }
                                // 
                                _plansArray.companyname = _customerwork[i].companyname
                                _plansArray.productname = _customerwork[i].productname + _productsku
                                _plansArray.currentprocess = _customerwork[i].currentprocess
                                _plansArray.ordecode = _customerwork[i].ordecode
                                _plansArray.servicestart = _customerwork[i].servicestart
                                _plansArray.departname = _customerwork[i].departname
                                _plansArray.serviceName = _customerwork[i].serviceName
                                _plansArray.restPoint = _customerwork[i].restPoint
                                _plansArray.workOrderStatus = _customerwork[i].workOrderStatus
                                _plansArray.createDate = _customerwork[i].createDate
                                _plansArray.updatedate = _customerwork[i].updatedate
                                _self.data3.push(_plansArray)
                            }
                        }
                    })
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>