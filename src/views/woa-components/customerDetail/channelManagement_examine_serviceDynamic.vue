<template>
    <div>
        <Card>
            <p slot="title">商事服务进度</p>
            <Table
                    border
                    :columns="columns1"
                    :data="data1"
                    @on-row-click="display1"
                    style="margin-top: 15px"
            ></Table>
        </Card>
        <Card style="margin-top: 16px;">
            <p slot="title">会计服务进度</p>
            <!-- 会计周期性产品-->
            <Table
                    border
                    :columns="columns4"
                    :data="data4"
                    @on-row-click="display4"                    
                    style="margin-top: 15px"
            ></Table>
            <!--会计非周期性产品-->
            <Table
                    border
                    :columns="columns2"
                    :data="data2"
                    @on-row-click="display2"                    
                    style="margin-top: 15px"
            ></Table>
        </Card>
        <Card style="margin-top: 16px;">
            <p slot="title">企划服务进度</p>
            <Table
                    border
                    :columns="columns3"
                    :data="data3"
                    @on-row-click="display3"                    
                    style="margin-top: 15px"
            ></Table>
        </Card>
    </div>
</template>

<script>
    import expandRow from './ServiceDynamic_bussines.vue'
    import expandRow2 from './ServiceDynamic_account.vue'
    import expandRow3 from './ServiceDynamic_plan.vue'
    import {arrayToMap} from '../../../libs/utils.js'

    export default {
        components: {
            expandRow,
            expandRow2,
            expandRow3
        },
        props: ['customerid'],
        data() {
            return {
                workOrderStatus:'',
                workOrderStatus_map:new Map(),
                columns1: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            // console.log(params)
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
                        key: 'product'
                    },
                    {
                        title: '当前进度',
                        key: 'CurrentProcess'
                    },
                    // {
                    //     title:'创建时间',
                    //     key:'createDate'
                    // }
                ],
                data1: [],
                columns2: [
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
                        key: 'product'
                    },
                    {
                        title: '当前进度',
                        key: 'CurrentProcess'
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
                        key: 'product'
                    },
                    {
                        title: '当前进度',
                        key: 'CurrentProcess'
                    }
                ],
                data3: [],
                columns4: [
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
                        key: 'CompanyName'
                    },
                    {
                        title: '产品名称',
                        key: 'product'
                    },
                    {
                        title: '截止税期',
                        key: 'end_period'
                    }
                ],
                data4: []
            }
        },
        methods: {
            display1(e){
                let _self = this
                // console.log(e)
                // console.log(_self.data1)
                for(let i = 0;i<_self.data1.length;i++){
                    if(e.id == _self.data1[i].id){
                        if(_self.data1[i]._expanded == true){
                            _self.data1[i]._expanded = false
                        }else{
                            _self.data1[i]._expanded = true
                        }
                    }
                }
            },
            display2(e){
                let _self = this
                // console.log(e)
                // console.log(_self.data1)
                for(let i = 0;i<_self.data2.length;i++){
                    if(e.id == _self.data2[i].id){
                        if(_self.data2[i]._expanded == true){
                            _self.data2[i]._expanded = false
                        }else{
                            _self.data2[i]._expanded = true
                        }
                    }
                }
            },
            display3(e){
                let _self = this
                // console.log(e)
                // console.log(_self.data1)
                for(let i = 0;i<_self.data3.length;i++){
                    if(e.id == _self.data3[i].id){
                        if(_self.data3[i]._expanded == true){
                            _self.data3[i]._expanded = false
                        }else{
                            _self.data3[i]._expanded = true
                        }
                    }
                }
            },
            display4(e){
                let _self = this
                // console.log(e)
                // console.log(_self.data1)
                for(let i = 0;i<_self.data4.length;i++){
                    if(e.id == _self.data4[i].id){
                        if(_self.data4[i]._expanded == true){
                            _self.data4[i]._expanded = false
                        }else{
                            _self.data4[i]._expanded = true
                        }
                    }
                }
            },
            getData() {
                var _self = this
                // this.$http.get('/api/customer/findCustomerWorkOrderById/' + _self.customerid)
                // this.$http.get('api/order/workOrderList?page=1&pageSize=1000&sortField=UpdateDate&customerId=' + _self.customerid)
                //     .then(function (response) {
                //         var _customerwork = response.data.data
                //         // console.log(_customerwork)
                //         for (var i = 0; i < _customerwork.length; i++) {
                //             if (_customerwork[i].alias_code == 'BUSSINESS') {
                //                 var _bussinessArray = {}
                //                 var _productsku = ''
                //                 if (_customerwork[i].productskuname != null) {
                //                     _productsku = '【' + _customerwork[i].productskuname + '】'
                //                 }
                //                 _bussinessArray.companyname = _customerwork[i].companyname
                //                 _bussinessArray.productname = _customerwork[i].productname + _productsku
                //                 _bussinessArray.currentprocess = _customerwork[i].currentprocess
                //                 _bussinessArray.ordecode = _customerwork[i].ordecode
                //                 _bussinessArray.servicestart = _customerwork[i].servicestart
                //                 _bussinessArray.departname = _customerwork[i].departname
                //                 _bussinessArray.serviceName = _customerwork[i].serviceName
                //                 _bussinessArray.restPoint = _customerwork[i].restPoint
                //                 _bussinessArray.workOrderStatus = _customerwork[i].workOrderStatus
                //                 _bussinessArray.createDate = _customerwork[i].createDate
                //                 _bussinessArray.updatedate = _customerwork[i].updatedate
                //                 _bussinessArray.id = _customerwork[i].id
                //                 _bussinessArray._expanded = false
                //                 // _bussinessArray._expanded = true
                //                 _self.data1.push(_bussinessArray)
                //             } else if (_customerwork[i].alias_code == 'ACCOUNT') {
                //                 // console.log(_customerwork[i].alias_code)
                //                 var _accountArray = {}
                //                 var _productsku = ''
                //                 if (_customerwork[i].productskuname != null) {
                //                     _productsku = '【' + _customerwork[i].productskuname + '】'
                //                 }
                //                 _accountArray.companyname = _customerwork[i].companyname
                //                 _accountArray.productname = _customerwork[i].productname + _productsku
                //                 _accountArray.workOrderRestDate = _customerwork[i].workOrderRestDate.slice(0,7)
                //                 _accountArray.ordecode = _customerwork[i].ordecode
                //                 _accountArray.servicestart = _customerwork[i].servicestart
                //                 _accountArray.departname = _customerwork[i].departname
                //                 _accountArray.serviceName = _customerwork[i].serviceName
                //                 _accountArray.accserviceName = _customerwork[i].accserviceName
                //                 _accountArray.workOrderRestTime = _customerwork[i].workOrderRestTime + '个月'
                //                 _accountArray.createDate = _customerwork[i].createDate
                //                 _accountArray.updatedate = _customerwork[i].updatedate
                //                 _accountArray.id = _customerwork[i].id
                //                 _accountArray._expanded = false                                
                //                 _self.data2.push(_accountArray)
                //             } else if (_customerwork[i].alias_code == 'PLAN') {
                //                 var _plansArray = {}
                //                 var _productsku = ''
                //                 if (_customerwork[i].productskuname != null) {
                //                     _productsku = '【' + _customerwork[i].productskuname + '】'
                //                 }
                //                 _plansArray.companyname = _customerwork[i].companyname
                //                 _plansArray.productname = _customerwork[i].productname + _productsku
                //                 _plansArray.currentprocess = _customerwork[i].currentprocess
                //                 _plansArray.ordecode = _customerwork[i].ordecode
                //                 _plansArray.servicestart = _customerwork[i].servicestart
                //                 _plansArray.departname = _customerwork[i].departname
                //                 _plansArray.serviceName = _customerwork[i].serviceName
                //                 _plansArray.restPoint = _customerwork[i].restPoint
                //                 _plansArray.workOrderStatus = _customerwork[i].workOrderStatus
                //                 _plansArray.createDate = _customerwork[i].createDate
                //                 _plansArray.updatedate = _customerwork[i].updatedate
                //                 _plansArray.id = _customerwork[i].id
                //                 _plansArray._expanded = false                              
                //                 _self.data3.push(_plansArray)
                //             }
                //         }
                //     })

                //  会计周期性产品
                var url = 'api/order/cycle/service/record/list?page=1&pageSize=1000&un_service_status=stop&customerid='+_self.customerid
                this.$http.get(url).then(function(res){
                    // console.log(res.data.data.rows)  
                    var data = res.data.data.rows
                    // console.log(data)
                    // var _data_total = res.data.data.total
                    // _self.data4 = data
                    _self.data4 = []
                    for(let i = 0;i<res.data.data.rows.length;i++){
                        let temp ={}
                        temp.id = res.data.data.rows[i].id
                        temp.CompanyName = res.data.data.rows[i].CompanyName
                        temp.product = res.data.data.rows[i].product
                        temp.end_period = res.data.data.rows[i].end_period
                        temp.ordercode = res.data.data.rows[i].ordercode
                        temp.account_begin_time = res.data.data.rows[i].account_begin_time
                        temp.departname = res.data.data.rows[i].departname
                        temp.server_realname = res.data.data.rows[i].server_realname
                        temp.accmanager_realname = res.data.data.rows[i].accmanager_realname
                        temp.balance_count = res.data.data.rows[i].balance_count
                        temp.createdate = res.data.data.rows[i].createdate
                        temp.updatedate = res.data.data.rows[i].updatedate
                        temp._expanded = false
                        _self.data4.push(temp)
                    }
                    console.log(_self.data4)
                })
            //  获取商事部工单
            let url1 = 'api/order/workOrderList?page=1&pageSize=1000&sortField=UpdateDate&nonWorkOrderStatus=60'
            let config1 =  {
                params:{
                    customerId: _self.customerid,
                    serviceDept:"'BUSSINESS'"
                }
            }
            this.$http.get(url1,config1).then(function(res){
                // console.log(res.data.data.rows.length)
                _self.data1 = []
                for(let i = 0;i<res.data.data.rows.length; i++){
                    let temp = {}
                    temp.CreateDate = res.data.data.rows[i].CreateDate
                    temp.CurrentProcess = res.data.data.rows[i].CurrentProcess
                    temp.IsOver = res.data.data.rows[i].IsOver
                    temp.IsShared = res.data.data.rows[i].IsShared
                    temp.IsWork = res.data.data.rows[i].IsWork
                    temp.ServiceDeptID = res.data.data.rows[i].ServiceDeptID
                    temp.ServiceEnd = res.data.data.rows[i].ServiceEnd
                    temp.ServiceStart = res.data.data.rows[i].ServiceStart
                    temp.UpdateDate = res.data.data.rows[i].UpdateDate
                    temp.companyname = res.data.data.rows[i].companyname
                    temp.followname = res.data.data.rows[i].followname
                    temp.id = res.data.data.rows[i].id
                    temp.name = res.data.data.rows[i].name
                    temp.ordercode = res.data.data.rows[i].ordercode
                    temp.product = res.data.data.rows[i].product
                    temp.resumeFlag = res.data.data.rows[i].resumeFlag
                    temp.resumeMsg = res.data.data.rows[i].resumeMsg
                    temp.servername = res.data.data.rows[i].servername
                    temp.tel = res.data.data.rows[i].tel
                    temp.departname = res.data.data.rows[i].departname
                    temp.workOrderStatus = _self.workOrderStatus_map.get(res.data.data.rows[i].workOrderStatus.toString())
                    temp._expanded = false
                    // temp.workOrderStatus = _self.workOrderStatus_map.get("" + _self.workOrderStatus )
                    _self.data1.push(temp)
                }

                console.log(_self.data1)
            })
            //  获取企划部工单
            let url2 = 'api/order/workOrderList?page=1&pageSize=1000&sortField=UpdateDate&nonWorkOrderStatus=60'
            let config2 =  {
                params:{
                    customerId: _self.customerid,
                    serviceDept:"'PLAN'"
                }
            }
            this.$http.get(url2,config2).then(function(res){
                // console.log(res.data.data.rows)
                _self.data3 = []
                for(let i = 0;i<res.data.data.rows.length; i++){
                    let temp = {}
                    temp.CreateDate = res.data.data.rows[i].CreateDate
                    temp.CurrentProcess = res.data.data.rows[i].CurrentProcess
                    temp.IsOver = res.data.data.rows[i].IsOver
                    temp.IsShared = res.data.data.rows[i].IsShared
                    temp.IsWork = res.data.data.rows[i].IsWork
                    temp.ServiceDeptID = res.data.data.rows[i].ServiceDeptID
                    temp.ServiceEnd = res.data.data.rows[i].ServiceEnd
                    temp.ServiceStart = res.data.data.rows[i].ServiceStart
                    temp.UpdateDate = res.data.data.rows[i].UpdateDate
                    temp.companyname = res.data.data.rows[i].companyname
                    temp.departname = res.data.data.rows[i].departname
                    temp.followname = res.data.data.rows[i].followname
                    temp.id = res.data.data.rows[i].id
                    temp.name = res.data.data.rows[i].name
                    temp.ordercode = res.data.data.rows[i].ordercode
                    temp.product = res.data.data.rows[i].product
                    temp.resumeFlag = res.data.data.rows[i].resumeFlag
                    temp.resumeMsg = res.data.data.rows[i].resumeMsg
                    temp.servername = res.data.data.rows[i].servername
                    temp.tel = res.data.data.rows[i].tel
                    temp.workOrderStatus = _self.workOrderStatus_map.get(res.data.data.rows[i].workOrderStatus.toString())
                    temp._expanded = false
                    // temp.workOrderStatus = _self.workOrderStatus_map.get("" + _self.workOrderStatus )
                    _self.data3.push(temp)
                }

                console.log(_self.data3)
            })
            //  获取会计审计部非周期性工单
            let url3 = 'api/order/workOrderList?page=1&pageSize=1000&sortField=UpdateDate&nonWorkOrderStatus=60'
            let config3 =  {
                params:{
                    customerId: _self.customerid,
                    serviceDept:"'ACCOUNT','AUDIT'",
                    iscycle:'N'
                }
            }
            this.$http.get(url3,config3).then(function(res){
                // console.log(res.data.data.rows)
                _self.data2 = []
                for(let i = 0;i<res.data.data.rows.length; i++){
                    let temp = {}
                    temp.CreateDate = res.data.data.rows[i].CreateDate
                    temp.CurrentProcess = res.data.data.rows[i].CurrentProcess
                    temp.IsOver = res.data.data.rows[i].IsOver
                    temp.IsShared = res.data.data.rows[i].IsShared
                    temp.IsWork = res.data.data.rows[i].IsWork
                    temp.ServiceDeptID = res.data.data.rows[i].ServiceDeptID
                    temp.ServiceEnd = res.data.data.rows[i].ServiceEnd
                    temp.ServiceStart = res.data.data.rows[i].ServiceStart
                    temp.UpdateDate = res.data.data.rows[i].UpdateDate
                    temp.companyname = res.data.data.rows[i].companyname
                    temp.followname = res.data.data.rows[i].followname
                    temp.id = res.data.data.rows[i].id
                    temp.departname = res.data.data.rows[i].departname
                    temp.name = res.data.data.rows[i].name
                    temp.ordercode = res.data.data.rows[i].ordercode
                    temp.product = res.data.data.rows[i].product
                    temp.resumeFlag = res.data.data.rows[i].resumeFlag
                    temp.resumeMsg = res.data.data.rows[i].resumeMsg
                    temp.servername = res.data.data.rows[i].servername
                    temp.tel = res.data.data.rows[i].tel
                    temp.workOrderStatus = _self.workOrderStatus_map.get(res.data.data.rows[i].workOrderStatus.toString())
                    temp._expanded = false
                    // temp.workOrderStatus = _self.workOrderStatus_map.get("" + _self.workOrderStatus )
                    _self.data2.push(temp)
                }

                // console.log(_self.data2)
            })

            },
            getDataCenter(){
                let _self = this
                let url = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=workOrderStatus`
                this.$http.get(url).then(function(res){
                    // console.log(res.data.data.workOrderStatus)
                    _self.workOrderStatus_map = arrayToMap(res.data.data.workOrderStatus)
                    // console.log(_self.workOrderStatus_map)
                    // console.log(_self.workOrderStatus_map.get(60+""))
                })
            }
        },
        mounted() {
            this.getDataCenter()
            this.getData()
        }
    }
</script>