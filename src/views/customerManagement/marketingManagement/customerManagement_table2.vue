<template>
    <div>
        <Card>
            <Row>
                <ButtonGroup>
                    <Button type="primary" icon="plus" @click="isAddChange">录入</Button>
                    <Button type="primary" icon="edit" @click="isEditChange">编辑</Button>
                    <!--<Button type="primary" icon="ios-crop">查看</Button>-->
                    <Button type="primary" icon="trash-b" @click="deleteCustomer">删除</Button>
                    <Button type="primary" icon="grid" @click="getQRcode">查看二维码</Button>
                    <!--<Button type="primary" icon="ios-color-filter-outline">导出Excel</Button>-->
                    <!--<Button type="primary" icon="ios-color-filter-outline">Excel批量导入</Button>-->
                    <!--<Button type="primary" icon="ios-color-filter-outline">导出跟进记录</Button>-->
                    <!--<Button type="primary" icon="ios-color-filter-outline">下载模板</Button>-->
                </ButtonGroup>
                <Poptip
                        style="float: right"
                        placement="bottom-end"
                        @on-popper-show="isSearch(true)"
                        width="400">
                    <Button type="text" icon="funnel" @click="getSelectOptions">筛选</Button>
                    <div slot="content" v-if="issearch" @keydown.enter="Search">
                        <Form ref="formValidate" :model="formValidate" :label-width="50" style="margin-top: 15px">
                            <Row :gutter="16" style="height:56px">
                                <Col span="12">
                                <FormItem label="客户名称" prop="name">
                                    <Input v-model="formValidate.name" size="small"></Input>
                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="电话" prop="tel">
                                    <Input v-model="formValidate.tel" size="small"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row :gutter="16" style="height:56px">
                                <Col span="12">
                                <FormItem label="创建人" prop="createbyname">
                                    <Input v-model="formValidate.createbyname" size="small"></Input>
                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="跟进人" prop="followbyname">
                                    <Input v-model="formValidate.followbyname" size="small"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <!--  <Row  :gutter="16">
                                  <Col span="12">
                                  <FormItem label="客户状态" prop="customertype">
                                      <Cascader trigger="hover" :data="customertypeValue" v-model="formValidate.customertype"></Cascader>
                                  </FormItem>
                                  </Col>
                                  <Col span="12">
                                  <FormItem label="渠道名称" prop="name">
                                      <Input v-model="formValidate.name" size="small"></Input>
                                  </FormItem>
                                  </Col>
                              </Row>-->
                            <Row :gutter="16">
                                <Col span="12">
                                <FormItem label="微信绑定" prop="isbound">
                                    <Select transfer v-model="formValidate.isbound" size="small">
                                        <Option value="">     </Option>
                                        <!-- <Option v-for="item in isboundValue" :value="item.value" :key="item.value">
                                            {{ item.label }}
                                        </Option> -->
                                        <Option value="1">是</Option>
                                        <Option value="0">否</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="区域" prop="area" style="margin-bottom:20px">
                                    <Select transfer v-model="formValidate.area" size="small">
                                        <Option v-for="item in areaValue" :value="item.value" :key="item.value">
                                            {{ item.label }}
                                        </Option>
                                    </Select>
                                </FormItem>
                                </Col>
                            </Row>
                            <FormItem label="客户来源" prop="customersource">
                                <Select transfer v-model="formValidate.customersource" size="small">
                                    <Option v-for="item in customersourceValue" :value="item.value" :key="item.value">
                                        {{ item.label }}
                                    </Option>
                                </Select>
                            </FormItem>
                            <center>
                                <FormItem style="margin-top:10px">
                                    <Button type="primary" @click="Search">搜索</Button>
                                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">
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
                        @on-current-change="selectRow"
                        :loading = "customer_loading"
                ></Table>
                <Page
                        size="small"
                        :total="pageTotal"
                        show-total
                        show-sizer
                        show-elevator
                        @on-change="pageChange"
                        @on-page-size-change="pageSizeChange"
                        :current = "currentPage"
                        style="margin-top: 10px"></Page>
            </Row>
        </Card>
        <Modal
                v-model="modal1"
                title="查看二维码"
                @on-ok="ok"
                @on-cancel="cancel">
            <center>
                <div id="qrcode"></div>
            </center>
        </Modal>
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
    </div>
</template>

<script>
    import QRCode from 'qrcodejs2'
    import Bus from '../../../components/bus'

    export default {
        data() {
            return {
                customer_loading:false,
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
                issendValue:[],
                formValidate: {
                    name: '',
                    tel: '',
                    createbyname: '',
                    followbyname: '',
                    isbound: '',
                    customersource: '',         
                    area: '',
                },
                columns: [{
                    title: '姓名',
                    key: 'name',
                    width: 130
                },
                    {
                        title: '电话',
                        key: 'tel',
                        width: 120
                    },
                    {
                        title: '客户状态',
                        key: 'customertypeText',
                        width: 150
                    },
                    {
                        title: '客户来源',
                        key: 'customersourceText',
                        width: 100
                    },
                    {
                        title: '客户等级',
                        key: 'importLevelText',
                        width: 100
                    },
                    {
                        title: '区域',
                        key: 'areaText',
                        width: 80
                    },
                    {
                        title: '渠道名称',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '跟进人',
                        key: 'followby',
                        width: 120
                    },
                    {
                        title: '创建时间',
                        key: 'createdate',
                        width: 120
                    },
                    {
                        title: '更新时间',
                        key: 'updatedate',
                        width: 120
                    },
                    {
                        title: '微信绑定',
                        key: 'isbound',
                        width: 100
                    },
                    {
                        title: '跟进剩余期限',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '商事',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '会计',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '企划',
                        key: 'createby',
                        width: 120
                    },
                    {
                        title: '审计',
                        key: 'createby',
                        width: 120
                    },
                ],
                data: [],
                pageTotal: '',
                //  当前页码
                currentPage: 1,
                //  当前每页显示数
                pageSize: 10,
                customerid: '',
                customertypeText: '',
                tel: '',
                customersource: '',
                //  数据字典类型
                area:{},
                cluesource:{},
                customerType:{},
                impLevel:{},
                sf_yn:{}
            }
        },
        methods: {
            ok(){

            },

            cancel(){

            },

            // 表格数据请求
            getTableData() {
                var _self = this
                _self.customer_loading = true
                var url =`api/customer/list`

                var keys = [];//定义一个数组用来接受key
                var config ={
                    params:{
                        page:_self.currentPage,
                        pageSize:_self.pageSize,
                        sortField:'updatedate',
                        name: _self.formValidate.name,
                        tel: _self.formValidate.tel,
                        createbyname: _self.formValidate.createbyname,
                        followbyname: _self.formValidate.followbyname,
                        isbound: _self.formValidate.isbound,
                        customersource: _self.formValidate.customersource,         
                        area: _self.formValidate.area
                    }
                }
                for (var key in _self.formValidate) {
                    if (_self.formValidate[key] == '' || _self.formValidate[key]==null) {
                        delete config.params[key]
                    }
                }
                this.$http.get(url,config)
                    .then(function (res) {
                        _self.pageTotal = res.data.data.total
                        var response = res.data.data.rows
                        _self.data = []
                        for (var i = 0; i < response.length; i++) {
                            var a = {}
                            a.name = response[i].NAME
                            a.tel = response[i].TEL
                            // 第一个是数据字典，第二个是数据字符串
                            a.customertype = response[i].customerType
                            a.customertypeText = _self.findCustomerType(a.customertype)

                            a.customersource = response[i].customersource
                            a.customersourceText = _self.findCluesoure(a.customersource)

                            a.importLevel = response[i].importlevel
                            a.importLevelText = _self.findImpLevel(a.importLevel)
                            
                            a.area = response[i].AREA
                            a.areaText = _self.findAreaText(a.area)

                            a.createby = response[i].createbyname
                            a.followby = response[i].followbyname
                            if(response[i].CREATEDATE == null){
                                a.updatedate = null
                            }else{
                                a.createdate = response[i].CREATEDATE.slice(0,10)
                            }
                            
                            a.updatedate = response[i].updatedate.slice(0,10)
                            a.isbound = _self.findYN(response[i].isbound)
                            a.customerId = response[i].ID
                            a.fixedphone = response[i].fixedPhone
                            a.qq = response[i].qq
                            a.weixin = response[i].weixin
                            a.email = response[i].email
                            a.address = response[i].ADDRESS
                            a.backup = response[i].backup
                            _self.data.push(a)
                        }
                        window.scrollTo(0,0)
                        _self.customer_loading = false
                        _self.customerid = ''

                    })
            },

            // 表格行选中事件
            selectRow(a) {
                var _self = this
                _self.customerid = a.customerId
                _self.customertypeText = a.customertypeText
                _self.tel = a.tel
                _self.customersource = a.customersource
            },

            //  改变页码
            pageChange(e){
                var _self = this
                _self.currentPage = e
                _self.customerid = ''
                _self.getTableData()
            },
            pageSizeChange(e){
                // console.log('pagesize')
                var _self = this
                _self.pageSize = e
                _self.currentPage = 1
                _self.customerid = ''
                _self.pageChange(1)
            },

            //    formValidate: {
            //         name: '',
            //         tel: '',
            //         createbyname: '',
            //         followbyname: '',
            //         isbound: '',
            //         customersource: '',         
            //         area: '',
            //     },
            Search(){
                var _self = this
                if(_self.ishandleSubmit == false){
                    _self.currentPage = 1
                    console.log('1')
                }
                _self.getTableData()
                
            },
            // // 改变页码
            // pageChange(a) {
            //     var _self = this
            //     _self.currentPage = a
            //     var url
            //     if (_self.ishandleSubmit == true) {
            //         url = '/api/customer/findCustomersByPage'
            //         /*          var _customertypeStr = _self.formValidate.customertype[1]
            //                   _self.formValidate.customertype = _customertypeStr
            //                   if (_customertypeStr == undefined) {
            //                       delete _self.formValidate.customertype
            //                   }*/
            //         _self.formValidate.startIndex = a
            //         _self.formValidate.pageSize = _self.pageSize
            //         this.$http({
            //             method: 'post',
            //             url: '/api/customer/findCustomersByPage',
            //             data: _self.formValidate,
            //             headers: {'Content-Type': 'application/json'},
            //         })
            //             .then(function (data) {
            //                 var response = data.data.data.rows
            //                 _self.data = []
            //                 for (var i = 0; i < response.length; i++) {
            //                     var a = {}
            //                     a.name = response[i].name
            //                     a.tel = response[i].tel
            //                     a.customertype = response[i].customertype
            //                     a.customertypeText = response[i].customertypeText
            //                     a.customersource = response[i].customersource
            //                     a.customersourceText = response[i].customersourceText
            //                     a.importLevel = response[i].importLevel
            //                     a.importLevelText = response[i].importLevelText
            //                     a.area = response[i].area
            //                     a.areaText = response[i].areaText
            //                     a.createby = response[i].createby
            //                     a.followby = response[i].followby
            //                     a.createdate = response[i].createdate
            //                     a.updatedate = response[i].updatedate
            //                     a.isbound = response[i].isbound
            //                     a.customerId = response[i].id
            //                     a.fixedphone = response[i].fixedphone
            //                     a.qq = response[i].qq
            //                     a.weixin = response[i].weixin
            //                     a.email = response[i].email
            //                     a.address = response[i].address
            //                     a.backup = response[i].backup
            //                     _self.data.push(a)
            //                 }
            //             })
            //     } else {
            //         url = '/api/customer/findAllMapByPages/' + a + '/' + _self.pageSize
            //         this.$http.get(url)
            //             .then(function (response) {
            //                 _self.data = []
            //                 for (var i = 0; i < response.data.data.length; i++) {
            //                     var a = {}
            //                     a.name = response.data.data[i].name
            //                     a.tel = response.data.data[i].tel
            //                     a.customertype = response.data.data[i].customertype
            //                     a.customertypeText = response.data.data[i].customertypeText
            //                     a.customersource = response.data.data[i].customersource
            //                     a.customersourceText = response.data.data[i].customersourceText
            //                     a.importLevel = response.data.data[i].importLevel
            //                     a.importLevelText = response.data.data[i].importLevelText
            //                     a.area = response.data.data[i].area
            //                     a.areaText = response.data.data[i].areaText
            //                     a.createby = response.data.data[i].createby
            //                     a.followby = response.data.data[i].followby
            //                     a.createdate = response.data.data[i].createdate
            //                     a.updatedate = response.data.data[i].updatedate
            //                     a.isbound = response.data.data[i].isbound
            //                     a.customerId = response.data.data[i].id
            //                     a.fixedphone = response.data.data[i].fixedphone
            //                     a.qq = response.data.data[i].qq
            //                     a.weixin = response.data.data[i].weixin
            //                     a.email = response.data.data[i].email
            //                     a.address = response.data.data[i].address
            //                     a.backup = response.data.data[i].backup
            //                     _self.data.push(a)
            //                 }
            //             })
            //     }
            // },

            // // 改变每页显示的数据条数
            // pageSizeChange(a) {
            //     var _self = this
            //     _self.pageSize = a
            //     _self.pageChange(1)
            //     // _self.data = []
            //     // this.$http.get('/api/customer/findAllMapByPages/1/' + a)
            //     //     .then(function (data) {
            //     //         var response = data.data.data
            //     //         for (var i = 0; i < response.length; i++) {
            //     //             var a = {}
            //     //             a.name = response[i].name
            //     //             a.tel = response[i].tel
            //     //             a.customertype = response[i].customertype
            //     //             a.customertypeText = response[i].customertypeText
            //     //             a.customersource = response[i].customersource
            //     //             a.customersourceText = response[i].customersourceText
            //     //             a.importLevel = response[i].importLevel
            //     //             a.importLevelText = response[i].importLevelText
            //     //             a.area = response[i].area
            //     //             a.areaText = response[i].areaText
            //     //             a.createby = response[i].createby
            //     //             a.followby = response[i].followby
            //     //             a.createdate = response[i].createdate
            //     //             a.updatedate = response[i].updatedate
            //     //             a.isbound = response[i].isbound
            //     //             a.customerId = response[i].id
            //     //             a.fixedphone = response[i].fixedphone
            //     //             a.qq = response[i].qq
            //     //             a.weixin = response[i].weixin
            //     //             a.email = response[i].email
            //     //             a.address = response[i].address
            //     //             a.backup = response[i].backup
            //     //             _self.data.push(a)
            //     //         }
            //     //     })
            // },

            isEditChange() {
                var _self = this
                if (_self.customerid != '') {
                    console.log("iseditchange+"+_self.customerid)
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
                var _self = this
                this.$emit('isAdd', '')
            },

            //生成二维码 
            getQRcode() {
                var _self = this

                if (_self.tel != '') {
                    _self.modal1 = true

                    document.getElementById('qrcode').innerHTML = ''

                    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1daf95d4275b0be1&redirect_uri='
                    url += 'http%3a%2f%2fm.zgcfo.com%2fservice100gonghost%2foAuthLogin%2foAuthBindAndLogin%2f' + _self.tel
                    url += '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'

                    var qr = new QRCode('qrcode', {
                        text: url,
                        width: 200,
                        height: 200,
                        colorDark: '#000000',
                        colorLight: '#ffffff',
                        correctLevel: QRCode.CorrectLevel.H
                    })
                } else {
                    this.$Message.warning('抱歉，您还没有选择客户');
                }
            },

            deleteCustomer() {
                var _self = this

                if (_self.customerid != '') {
                    _self.modal2 = true
                } else {
                    this.$Message.warning('抱歉，您还没有选择客户');
                }
            },

            deleteCustomer2() {
                var _self = this

                this.$http.get('/api/customer/deleteCustomerById/' + _self.customerid)
                    .then(function (response) {
                        if (response.data.msgCode == '40000') {
                            _self.modal2 = false;
                            _self.$Message.success('删除成功！');
                            _self.currentPage = 1;
                            _self.getTableData()
                        } else {
                            _self.$Message.error('删除失败！');
                        }
                    })
            },

            isSearch(e) {
                var _self = this
                _self.issearch = e
            },

            getSelectOptions() {
                var _self = this

                this.searchTypegroup('customerType')
                this.searchTypegroup('cluesource')
                this.searchTypegroup('area')
                this.searchTypegroup('sf_yn')

                let _customerTypeArr = JSON.parse(localStorage.getItem('customerType'))
                let _cluesourceArr = JSON.parse(localStorage.getItem('cluesource'))
                let _areaArr = JSON.parse(localStorage.getItem('area'))
                let _sf_ynArr = JSON.parse(localStorage.getItem('sf_yn'))

                // 级联下拉框-客户状态
                var mapdata = new Map()  //用作临时转换
                var subIdToParentMap = new Map()
                var sourceData = _customerTypeArr  //结果集
                var finalArrayData = new Array()   //vue要求的数据格式

                for (var i = 0; i < sourceData.length; i++) {

                    var _sub = new Object()
                    _sub.value = sourceData[i].subid.toString()
                    _sub.label = sourceData[i].subtypename

                    subIdToParentMap.set(_sub.value, sourceData[i].id)

                    var _value = mapdata.get(sourceData[i].id)

                    if (_value) {
                        var _valueArray = _value.children
                        _valueArray.push(_sub)
                        var _valueObject = new Object()
                        _valueObject.value = _value.value.toString()
                        _valueObject.label = _value.label
                        _valueObject.children = _valueArray
                        mapdata.set(sourceData[i].id, _valueObject)
                    } else {
                        var _child = new Array()
                        _child.push(_sub)
                        var _main = new Object()
                        _main.value = sourceData[i].id.toString()
                        _main.label = sourceData[i].typename
                        _main.children = _child
                        mapdata.set(sourceData[i].id, _main)
                    }
                }

                mapdata.forEach((value, key) => {
                    finalArrayData.push(value)
                });

                for (var i = 0; i < finalArrayData.length; i++) {
                    for (var j = 0; j < finalArrayData[i].children.length; j++) {
                        if ((finalArrayData[i].children[j].value) == (_self.customertype)) {
                            _self.formValidate.customertype[0] = finalArrayData[i].value
                            _self.formValidate.customertype[1] = _self.customertype
                        }
                    }
                }
                _self.customertypeValue = []
                _self.customertypeValue = finalArrayData

                _self.customersourceValue = []
                // 下拉框-客户来源
                for (var i = 0; i < _cluesourceArr.length; i++) {

                    var customersourceObj = {}

                    customersourceObj.label = _cluesourceArr[i].typename
                    customersourceObj.value = _cluesourceArr[i].typecode
                    _self.customersourceValue.push(customersourceObj)
                }

                _self.areaValue = []
                // 下拉框-区域
                for (var i = 0; i < _areaArr.length; i++) {

                    var areaObj = {}

                    areaObj.label = _areaArr[i].typename
                    areaObj.value = _areaArr[i].typecode
                    _self.areaValue.push(areaObj)
                }

                _self.issendValue = []
                // 下拉框-发送短信
                for (var i = 0; i < _sf_ynArr.length; i++) {

                    var issendObj = {}

                    issendObj.label = _sf_ynArr[i].typename
                    issendObj.value = _sf_ynArr[i].typecode
                    _self.issendValue.push(issendObj)
                }

                _self.AutoCompletedata = []
                this.$http.all([
                    this.$http.get('/api/user/findAllUsers'),
                ])
                    .then(this.$http.spread(function ( allUserRes) {
                        for (var i = 0; i < allUserRes.data.data.length; i++) {
                            var allUserObj = {}

                            allUserObj.label = allUserRes.data.data[i].realname
                            allUserObj.value = allUserRes.data.data[i].id.toString()

                            _self.AutoCompletedata.push(allUserObj)
                        }
                    }))
            },
            isEmptyObject(obj) {
                for (var key in obj) {
                    return true;
                }
                return false;
            },
            // handleSubmit() {
            //     var _self = this
            //     var keys = [];//定义一个数组用来接受key

            //     for (var key in _self.formValidate) {
            //         if (_self.formValidate[key] == '' || _self.formValidate[key] == null) {
            //             delete _self.formValidate[key]
            //         }
            //     }
            //     _self.ishandleSubmit = _self.isEmptyObject(_self.formValidate)
            //     if (_self.ishandleSubmit == true) {
            //         _self.formValidate.startIndex = '1'
            //         _self.formValidate.pageSize = '10'
            //         /*    var _customertypeStr = _self.formValidate.customertype[1]
            //             _self.formValidate.customertype = _customertypeStr*/
            //         this.$http({
            //             method: 'post',
            //             url: '/api/customer/findCustomersByPage',
            //             data: _self.formValidate,
            //             headers: {'Content-Type': 'application/json'},
            //         })
            //             .then(function (data) {
            //                 var response = data.data.data.rows
            //                 console.log(response)
            //                 _self.data = []
            //                 for (var i = 0; i < response.length; i++) {
            //                     var a = {}
            //                     a.name = response[i].name
            //                     a.tel = response[i].tel
            //                     a.customertype = response[i].customertype
            //                     a.customertypeText = response[i].customertypeText
            //                     a.customersource = response[i].customersource
            //                     a.customersourceText = response[i].customersourceText
            //                     a.importLevel = response[i].importLevel
            //                     a.importLevelText = response[i].importLevelText
            //                     a.area = response[i].area
            //                     a.areaText = response[i].areaText
            //                     a.createby = response[i].createby
            //                     a.followby = response[i].followby
            //                     a.createdate = response[i].createdate
            //                     a.updatedate = response[i].updatedate
            //                     a.isbound = response[i].isbound
            //                     a.customerId = response[i].id
            //                     a.fixedphone = response[i].fixedphone
            //                     a.qq = response[i].qq
            //                     a.weixin = response[i].weixin
            //                     a.email = response[i].email
            //                     a.address = response[i].address
            //                     a.backup = response[i].backup
            //                     _self.data.push(a)
            //                 }
            //                 console.log(_self.data)
            //                 _self.searchPageTotal()
            //             })
            //     } else {
            //         _self.getTableData()
            //     }
            // },
            handleReset(name) {
                var _self = this
                
                _self.ishandleSubmit = false
                this.$refs[name].resetFields();
                _self.getTableData()
            },
            // searchPageTotal() {
            //     var _self = this
            //     var _formValidate = _self.formValidate
            //     delete _formValidate.startIndex
            //     delete _formValidate.pageSize
            //     this.$http({
            //         method: 'post',
            //         url: '/api/customer/findPostCustomerCount',
            //         data: _formValidate,
            //         headers: {'Content-Type': 'application/json'},
            //     })
            //         .then(function (response) {
            //             _self.pageTotal = response.data.data
            //         })
            // },
            ok(){},
            cancel(){},
            /**********************数据字典相关start*********************/
            //  获取数据字典
            getDataCenter(){
                var _self = this
                var url = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=customerTypes,cluesources,customerrating,area,sf_yn`
                this.$http.get(url).then(function(res){
                    // console.log(res.data.data)
                    var temp = res.data.data
                    _self.area = temp.area
                    _self.cluesource = temp.cluesources
                    _self.customerType = temp.customerTypes
                    _self.impLevel = temp.customerrating
                    _self.sf_yn = temp.sf_yn
                    console.log(temp.customerType)
                })
            },
            findImpLevel(temp){
                var _self = this
                for(let i = 0;i<_self.impLevel.length;i++){
                    if(_self.impLevel[i].typecode == temp && temp != ''){
                        return _self.impLevel[i].typename
                    }
                    }
            },
            findCustomerType(temp){
                var _self = this
                // console.log(temp)
                for(let i = 0;i<_self.customerType.length;i++){
                    if(_self.customerType[i].typecode == temp && temp != ''){
                        return _self.customerType[i].typename
                        //  
                    }
                }
            },

            findCluesoure(temp){
                var _self = this
                for(let i = 0; i<_self.cluesource.length;i++){
                        if(_self.cluesource[i].typecode == temp && temp != ''){
                            return _self.cluesource[i].typename
                        }
                    }
            },

            findAreaText(temp){
                var _self = this
                for(let i = 0; i<_self.area.length; i++){
                    if(_self.area[i].typecode == temp && temp != ''){
                        return _self.area[i].typename
                    }
                }
            },

            findYN(temp){
                var _self = this
                for(let i =0;i<_self.sf_yn.length;i++){
                    if(_self.sf_yn[i].typecode == temp && temp != ''){
                        return _self.sf_yn[i].typename
                    }
                }
            }
            /**********************数据字典相关end*********************/
            
        },
        mounted() {
            this.getDataCenter()
            this.getTableData()
            Bus.$on('msg', (e) => {
                this.getTableData()
                this.currentPage = 1
            })
            Bus.$on('addsuccess',(e) => {
                this.getTableData()
                this.currentPage = 1
            })
        }
    }
</script>