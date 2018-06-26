<template>
    <div>
        <Card>
            <Form ref="formValidate" :model="formValidate" :label-width="80" >
                <FormItem label="姓名" prop="name" style="margin-bottom:0px">
                    <Input disabled size="small" v-model="formValidate.name"/>
                </FormItem>
                <FormItem label="电话" prop="tel" style="margin-bottom:0px">
                    <Input disabled size="small" v-model="formValidate.tel"/>
                </FormItem>
                <FormItem label="固话" prop="fixedphone" style="margin-bottom:0px">
                    <Input disabled size="small" v-model="formValidate.fixedphone"/>
                </FormItem>
                <FormItem label="QQ" prop="qq" style="margin-bottom:0px">
                    <Input disabled size="small" v-model="formValidate.qq"/>
                </FormItem>
                <FormItem label="微信" prop="weixin" style="margin-bottom:0px">
                    <Input disabled size="small" v-model="formValidate.weixin"/>
                </FormItem>
                <FormItem label="邮箱" prop="email" style="margin-bottom:0px">
                    <Input disabled size="small" v-model="formValidate.email"/>
                </FormItem>
                <FormItem label="服务地址" prop="address" style="margin-bottom:0px">
                    <Input disabled size="small" v-model="formValidate.address"/>
                </FormItem>
                <FormItem label="客户状态" prop="customertype" style="margin-bottom:0px">
                    <Input disabled size="small" v-model="formValidate.customertype"/>
                </FormItem>
                <FormItem label="客户来源" prop="customersource" style="margin-bottom:0px">
                    <Select transfer v-model="formValidate.customersource" size="small" disabled >
                        <Option v-for="item in cluesource" :value="item.typecode" :key="item.id">
                            {{ item.typename }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="客户等级" prop="importlevel" style="margin-bottom:0px">
                    <Select transfer v-model="formValidate.importlevel" size="small" disabled >
                        <Option v-for="item in impLevel" :value="item.typecode" :key="item.id">
                            {{ item.typename }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="区域" prop="area" style="margin-bottom:0px">
                    <Select transfer v-model="formValidate.area" size="small" disabled >
                        <Option v-for="item in area" :value="item.typecode" :key="item.id">{{ item.typename }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="标签" prop="customerlabel" style="margin-bottom:0px">
                    <Tag v-for="item in customerlabel" :key="item.id" :name="item.id">
                        {{ item.labelname }}
                    </Tag>
                </FormItem>
                <FormItem label="创建时间" prop="createdate" style="margin-bottom:0px">
                    <Input disabled size="small" v-model="formValidate.createdate"/>
                </FormItem>
                <FormItem label="更新时间" prop="updatedate" style="margin-bottom:0px">
                    <Input disabled size="small" v-model="formValidate.updatedate"/>
                </FormItem>
                <!-- <FormItem label="服务梯队" prop="backup">
                    <Input size="small" type="textarea" v-model="formValidate.backup" disabled/>
                </FormItem> -->
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
                    name: '',
                    tel: '',
                    fixedphone: '',
                    qq: '',
                    weixin: '',
                    address: '',
                    customertype: '',
                    customersource: '',
                    importlevel: '',
                    area:'',
                    issend: '',
                    customerlabel: [],
                    createdate: '',
                    updatedate: '',
                    gxr: '',
                    backup: '',
                    sourcesubdivision: '',
                    isbound: '',
                    email: '',
                    channelsource: '',
                    notes:''
                },
                customertype: '',
                customerlabel: [],
                area: [],
                cluesource: [],
                customerType: [],
                impLevel: [],
                customerTypeArr: [],
            }
        },
        methods: {
            getDataCenter() {
                var _self = this;
                var url = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=customerTypes,cluesources,customerrating,area`;
                this.$http.get(url).then(function(res) {
                    var temp = res.data.data;
                    _self.area = temp.area;
                    _self.cluesource = temp.cluesources;
                    _self.customerType = temp.customerTypes;
                    _self.impLevel = temp.customerrating;
                    _self.area.reverse()

                    // 二级联动改一级
                    _self.customerTypeArr = []
                    for(let i = 0;i<_self.customerType.length;i++){
                        var temp = {}
                        if(_self.customerType[i].children != null){
                            for(let j = 0;j<_self.customerType[i].children.length; j++ ){
                                temp = {}
                                temp.id = _self.customerType[i].children[j].id
                                temp.typecode = _self.customerType[i].children[j].typecode
                                temp.typename = _self.customerType[i].children[j].typename
                                temp.pid = _self.customerType[i].children[j].pid
                                temp.ptypename = _self.customerType[i].typename
                                temp.ptypecode = _self.customerType[i].typecode
                                _self.customerTypeArr.push(temp)
                            }
                        }else{
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
                })
            },
            getData() {
                var _self = this

                this.$http.all([
                    this.$http.get('/api/customer/findCustomer/' + _self.customerid),
                    this.$http.get('/api/system/label/list?page=1&pageSize=1000'),
                ])
                    .then(this.$http.spread(function (customerdetailResp, LabelsRes,) {
                        // console.log(customerdetailResp)
                        // console.log(LabelsRes)
                        // 客户详情数据
                        var data = customerdetailResp.data.data

                        _self.formValidate.id = data.id
                        _self.formValidate.channelsource = data.channelsource
                        _self.formValidate.email = data.email
                        _self.formValidate.sourcesubdivision = data.sourcesubdivision
                        _self.formValidate.isbound = data.isbound
                        _self.formValidate.name = data.name
                        _self.formValidate.tel = data.tel
                        _self.formValidate.fixedphone = data.fixedphone
                        _self.formValidate.qq = data.qq
                        _self.formValidate.weixin = data.weixin
                        _self.formValidate.address = data.address
                        _self.formValidate.customertype = _self.customerid[1]
                        _self.formValidate.customersource = data.customersource
                        if (data.importlevel != null && data.importlevel != '') {
                            _self.formValidate.importlevel = data.importlevel.toString()
                        } else {
                            _self.formValidate.importlevel = data.importlevel
                        }
                        _self.formValidate.area = data.area
                        _self.formValidate.issend = data.issend
                        _self.formValidate.createdate = data.createdate
                        _self.formValidate.updatedate = data.updatedate
                        _self.formValidate.backup = data.backup

                        // 通过客户ID查找客户标签
                        // let _arrData = localStorage.getItem('customerTag').split(',')
                        // for (let j = 0; j < LabelsRes.data.data.rows.length; j++) {
                        //     for (var i = 0; i < _arrData.length; i++) {
                        //         if (_arrData[i] == LabelsRes.data.data.rows[j].id) {
                        //             var a = {}
                        //             a.id = LabelsRes.data.data.rows[j].id
                        //             a.labelname = LabelsRes.data.data.rows[j].labelName
                        //             _self.customerlabel.push(a)
                        //         }
                        //     }
                        // }
                        _self.$emit('editStopLoading',true)
                    }))
            },
        },
        mounted() {
            this.getDataCenter()
            this.getData()
        },
        // watch:{
        //     'customerid':'getData'
        // },
        created(){
            console.log(this.customerid)
        }
    }
</script>

<style scoped>
    /* .ivu-form-item {
        margin-bottom: 2px
    } */
</style>