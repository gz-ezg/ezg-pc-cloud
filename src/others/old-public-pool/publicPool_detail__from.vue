<template>
    <div>
        <Card>
            <Form ref="formValidate" :model="formValidate" :label-width="80">
                <FormItem label="姓名" prop="customerName" >
                    <Input disabled size="small" v-model="formValidate.customerName"/>
                </FormItem>
                <FormItem label="电话" prop="mobile">
                    <Input disabled size="small" v-model="formValidate.mobile"/>
                </FormItem>
                <FormItem label="固话" prop="fixedPhone">
                    <Input disabled size="small" v-model="formValidate.fixedPhone"/>
                </FormItem>
                <FormItem label="QQ" prop="qq">
                    <Input disabled size="small" v-model="formValidate.qq"/>
                </FormItem>
                <FormItem label="微信" prop="weixin">
                    <Input disabled size="small" v-model="formValidate.weixin"/>
                </FormItem>
                <FormItem label="客户状态" prop="customerstatus">
                    <Cascader disabled trigger="hover" :data="customertypeValue" v-model="formValidate.customerstatus"></Cascader>
                </FormItem>
                <FormItem label="客户来源" prop="customerSource">
                    <Select transfer v-model="formValidate.customerSource" size="small" disabled>
                        <Option v-for="item in customersourceValue" :value="item.value" :key="item.value">
                            {{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="客户等级" prop="importlevel">
                    <Select transfer v-model="formValidate.importlevel" size="small" disabled>
                        <Option v-for="item in importlevelValue" :value="item.value" :key="item.value">
                            {{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="区域" prop="area">
                    <Select transfer v-model="formValidate.area" size="small" disabled>
                        <Option v-for="item in areaValue" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="创建时间" prop="createdate">
                    <Input disabled size="small" v-model="formValidate.createdate"/>
                </FormItem>
                <FormItem label="更新时间" prop="updateDate">
                    <Input disabled size="small" v-model="formValidate.updateDate"/>
                </FormItem>
                <FormItem label="更新人" prop="updateby">
                    <Input disabled size="small" v-model="formValidate.updateby"/>
                </FormItem>
                <FormItem label="服务梯队" prop="backup">
                    <Input size="small" type="textarea" v-model="formValidate.backup" disabled/>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>

    export default {
        props: ['customerid'],
        data() {
            return {
                data1: [],
                customerlabelGroup: [],
                importlevelValue: [],
                areaValue: [],
                customertypeValue: [],
                customersourceValue: [],
                formValidate: {
                    id: '',
                    customerName: '',
                    mobile: '',
                    fixedPhone: '',
                    qq: '',
                    weixin: '',
                    customerstatus: [],
                    customerSource: '',
                    importlevel: '',
                    area: '',
                    createdate: '',
                    updateDate: '',
                    updateby: '',
                    backup: '',
                    email: '',
                },
                customertype: '',
                customerlabel: []
            }
        },
        methods: {
            getData() {
                var _self = this
                this.searchTypegroup('cluesource')
                this.searchTypegroup('custImport')
                this.searchTypegroup('customerType')
                this.searchTypegroup('area')

                let _cluesourceArr = JSON.parse(localStorage.getItem('cluesource'))
                let _custImportArr = JSON.parse(localStorage.getItem('custImport'))
                let _customerTypeArr = JSON.parse(localStorage.getItem('customerType'))
                let _areaArr = JSON.parse(localStorage.getItem('area'))

                // 下拉框-客户来源
                for (var i = 0; i < _cluesourceArr.length; i++) {

                    var customersourceObj = {}

                    customersourceObj.label = _cluesourceArr[i].typename
                    customersourceObj.value = _cluesourceArr[i].typecode
                    _self.customersourceValue.push(customersourceObj)
                }

                // 下拉框-客户等级
                for (var i = 0; i < _custImportArr.length; i++) {

                    var importlevelObj = {}

                    importlevelObj.label = _custImportArr[i].typename
                    importlevelObj.value = _custImportArr[i].typecode
                    _self.importlevelValue.push(importlevelObj)
                }

                // 级联下拉框-客户状态
                var mapdata = new Map()  //用作临时转换
                var subIdToParentMap = new Map()
                var sourceData = _customerTypeArr //结果集
                var finalArrayData = new Array()   //级联下拉框要求的数据格式

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

                _self.customertypeValue = finalArrayData

                // 下拉框-区域
                for (var i = 0; i < _areaArr.length; i++) {

                    var areaObj = {}

                    areaObj.label = _areaArr[i].typename
                    areaObj.value = _areaArr[i].typecode
                    _self.areaValue.push(areaObj)
                }

                this.$http.all([
                    this.$http.get('/api/publicPool/findPublicPoolById/' + _self.customerid),
                ])
                    .then(this.$http.spread(function (customerdetailResp) {

                        // 客户详情数据
                        var data = customerdetailResp.data.data

                        _self.formValidate.id = data.id
                        _self.formValidate.email = data.email
                        _self.formValidate.customerName = data.customerName
                        _self.formValidate.mobile = data.mobile
                        _self.formValidate.fixedPhone = data.fixedPhone
                        _self.formValidate.qq = data.qq
                        _self.formValidate.weixin = data.weixin
                        _self.customertype = data.customertype
                        _self.formValidate.customerSource = data.customerSource
                        _self.formValidate.importlevel = data.importlevel.toString()
                        _self.formValidate.area = data.area
                        _self.formValidate.createdate = data.createdate
                        _self.formValidate.updateDate = data.updateDate
                        _self.formValidate.updateby = data.updateby
                        _self.formValidate.backup = data.backup
                    }))
            },
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style scoped>
    /* .ivu-form-item {
        margin-bottom: 2px
    } */
</style>