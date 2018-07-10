<template>
    <div>
        <Card>
            <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="80">
                <FormItem label="姓名" prop="name" style="margin-bottom:0px">
                    <Input size="small" v-model="formValidate.name"/>
                </FormItem>
                <FormItem label="电话" prop="tel" style="margin-bottom:0px">
                    <Input size="small" v-model="formValidate.tel"/>
                </FormItem>
                <FormItem label="固话" prop="fixedphone" style="margin-bottom:0px">
                    <Input size="small" v-model="formValidate.fixedphone"/>
                </FormItem>
                <FormItem label="QQ" prop="qq" style="margin-bottom:0px">
                    <Input size="small" v-model="formValidate.qq"/>
                </FormItem>
                <FormItem label="微信" prop="weixin" style="margin-bottom:0px"> 
                    <Input size="small" v-model="formValidate.weixin"/>
                </FormItem>
                <FormItem label="邮箱" prop="email" style="margin-bottom:0px">
                    <Input size="small" v-model="formValidate.email"/>
                </FormItem>
                <FormItem label="服务地址" prop="address" style="margin-bottom:0px">
                    <Input size="small" v-model="formValidate.address"/>
                </FormItem>
                <FormItem label="客户状态" prop="customertype" style="margin-bottom:0px">
                    <Cascader trigger="hover" :data="customerType" v-model="formValidate.customertype" @on-change="show"></Cascader>
                </FormItem>
                <FormItem label="客户来源" prop="customersource" style="margin-bottom:0px">
                    <Select transfer v-model="formValidate.customersource" size="small" @on-change="isxzqd">
                        <Option v-for="item in cluesource" :value="item.typecode" :key="item.id">{{ item.typename
                            }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="渠道名称" prop="channelTypeId" v-if="channel_show" style="margin-bottom:0px">
                    <Select transfer v-model="formValidate.channelTypeId" size="small">
                        <Option v-for="item in ChannelType" :value="item.id" :key="item.id">{{ item.channel_type_name }}
                        </Option>
                    </Select>
                </FormItem>
                <!-- <FormItem label="推荐领导" prop="TJleader" v-if="leader_show" style="margin-bottom:0px">
                    <Select transfer v-model="formValidate.TJleader" size="small">
                        <Option  value="why">王海云</Option>
                        <Option  value="czm">陈志明</Option>
                        <Option  value="ycz">杨楚州</Option>
                        <Option  value="wsx">吴穗湘</Option>
                        <Option  value="czl">陈志玲</Option>
                        <Option  value="wjl">王敬龙</Option>                        
                    </Select>
                </FormItem> -->
                <FormItem label="推荐客户" prop="recCustomer" v-if="customer_show" style="margin-bottom:0px">
                    <Input size="small" v-model="formValidate.recCustomer" @on-focus="getCustomer" readonly />                    
                </FormItem>
                <FormItem label="客户等级" prop="importlevel" style="margin-bottom:0px">
                    <Select transfer v-model="formValidate.importlevel" size="small" :disabled="isOpenEdit">
                        <Option v-for="item in impLevel" :value="item.typecode" :key="item.id">{{ item.typename
                            }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="区域" prop="area" style="margin-bottom:0px">
                    <Select transfer v-model="formValidate.area" size="small" >
                        <Option v-for="item in area" :value="item.typecode" :key="item.id">{{ item.typename }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="发送短信" prop="issend" style="margin-bottom:0px">
                    <Select transfer v-model="formValidate.issend" size="small" >
                        <Option v-for="item in sf_yn" :value="item.typecode" :key="item.id">{{ item.typename }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="标签" prop="customerlabelTags" style="margin-bottom:0px">
                    <Tag v-for="item in customerlabel" :key="item.id" :name="item.labelname" closable @on-close="handleClose2">
                        {{ item.labelname }}
                    </Tag>
                    <Button icon="ios-plus-empty" type="dashed" size="small" @click="addTag">添加</Button>
                    <!--<Poptip placement="right" width="400">
                        <Button icon="ios-plus-empty" type="dashed" size="small">添加</Button>
                        <div class="api" slot="content">
                            <CheckboxGroup v-model="formValidate.customerlabel" @on-change="checkboxChange">
                                <Checkbox v-for="item in customerlabelGroup" :label="item.label">{{ item.value }}
                                </Checkbox>
                            </CheckboxGroup>
                        </div>
                    </Poptip>-->
                </FormItem>
                <FormItem label="创建时间" prop="createdate" style="margin-bottom:0px">
                    <Input disabled size="small" v-model="formValidate.createdate"/>
                </FormItem>
                <FormItem label="更新时间" prop="updatedate" style="margin-bottom:0px">
                    <Input disabled size="small" v-model="formValidate.updatedate"/>
                </FormItem>
                <!-- <FormItem label="更新人" prop="gxr">
                    <Input disabled size="small" v-model="formValidate.gxr"/>
                </FormItem> -->
                <FormItem label="备注" prop="backup" style="margin-bottom:0px">
                    <Input size="small" type="textarea" v-model="formValidate.backup"/>
                </FormItem>
                <!-- <FormItem label="服务梯队" prop="backup">
                    <Input size="small" type="textarea" disabled v-model="formValidate.backup"/>
                </FormItem> -->
                <!-- 数据获取未知-->
                <FormItem style="margin-bottom:0px">
                    <Button type="ghost" style="visibility:hidden;">关闭</Button>
                    <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 20px">保存</Button>                  
                </FormItem>
            </Form>
        </Card>
        <Modal
                v-model="modal1"
                title="标签选择"
                @on-ok="ok"
                >
            <Table
                    height="300"
                    border ref="selection"
                    @on-selection-change="selectionChange"
                    :columns="columns4"
                    :data="data1"></Table>
        </Modal>
        <Modal
            v-model="showCustomer"
            title="推荐客户"
            witdh="300"
        >
            <Row :gutter="16">
                <Col span="10">
                    <Input v-model="searchCustomer" placeholder="输入客户名称搜索" @on-keydown="keydown3">
                        <!-- <Button slot="append" icon="ios-search" @click="getCustomer">搜索</Button> -->
                    </Input>
                </Col>
                <Col span="10">
                    <Input v-model="searchCustomerTEL" placeholder="输入客户电话搜索" @on-keydown="keydown3">
                        <!-- <Button slot="append" icon="ios-search" @click="getCustomer">搜索</Button> -->
                    </Input>
                </Col>
                <Col span="4">
                    <Button icon="ios-search" @click="getCustomer">搜索</Button>
                </Col>
            </Row>
            <Table
                style="margin-top: 10px"
                highlight-row
                :columns="customerColumns"
                @on-row-dblclick="rowSelectCustomer"
                :loading="customerLoading"
                :data="customerData"></Table>
            <Page
                size="small"
                :total="pageTotalCustomer"
                show-total
                show-elevator
                @on-change="pageChangeCustomer"
                style="margin-top: 10px"></Page>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    import Bus from '../../../components/bus'

    export default {
        props: ['customerid'],
        data() {
            const validateCascader = (rule, value, callback) => {
                if (value == '') {
                    callback(new Error(' '));
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
                        callback(new Error(' '));
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
                        callback(new Error(' '));
                    }
                }
            };
            const validateWX = (rule, value, callback) =>{
                let re = /^[a-z_\d]+$/
                if (value == '' || value == null) {
                    callback();
                } else {
                    if (1) {
                        callback();
                    } else {
                        callback(new Error(''));
                    }
                }
            };
            const validateQQ = (rule, value, callback) => {
                let re = /^[1-9][0-9]{4,14}$/
                if (value == '' || value == null) {
                    callback();
                } else {
                    if (re.test(value)) {
                        callback();
                    } else {
                        callback(new Error(''));
                    }
                }
            };
            // const validateQQ = (rule, value, callback) =>{
            //     let re =/[1-9][0-9]{4,14}/
            //     if (value == '' || value == null) {
            //         callback();
            //     } else {
            //         if (re.test(value)) {
            //             callback();
            //         } else {
            //             callback(new Error(' '));
            //         }
            //     }
            // };
            // const validateWX = (rule, value, callback) =>{
            //     let re =/[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}+/
            //     if (value == '' || value == null) {
            //         callback();
            //     } else {
            //         if (re.test(value)) {
            //             callback();
            //         } else {
            //             callback(new Error(' '));
            //         }
            //     }
            // };
            return {
                isOpenEdit:false,
                searchCustomerTEL:"",
                searchCustomer:"",
                pageCustomer:1,
                pageTotalCustomer:new Number(),
                customerLoading:false,
                customerData:[],
                showCustomer:false,
                customerColumns:[
                    {
                        title: '客户名称',
                        key: 'NAME'
                    },
                    {
                        title: '客户电话',
                        key: 'TEL'
                    }
                ],

                //  以上为顾客推荐相关
                edit_loading:false,
                channel_show:false,
                leader_show:false,
                customer_show:false,
                modal1: false,
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '标签名',
                        key: 'labelname'
                    },
                    {
                        title: '编码',
                        key: 'labelcode'
                    },
                    {
                        title: '是否为渠道商标签',
                        key: 'channelflag',
                        width: 150
                    },
                    {
                        title: '说明',
                        key: 'labelmemo'
                    }
                ],
                data1: [],
                customerlabelGroup: [],
                importlevelValue: [],
                issendValue: [],
                areaValue: [],
                customertypeValue: [],
                customersourceValue: [],
                ruleValidate: {
                    name: [
                        {required: true, trigger: 'blur'}
                    ],
                    customertype: [
                        {required: true, validator: validateCascader, trigger: 'change'}
                    ],
                    tel: [
                        {validator: validateTel, trigger: 'blur'}
                    ],
                    qq: [
                        {validator: validateQQ, trigger: 'blur'}
                    ],
                    weixin: [
                        {validator: validateWX, trigger: 'blur'}
                    ],
                    email: [
                        {type:'email', trigger: 'blur'}
                    ],
                    fixedphone: [
                        {validator: validateFixedphone, trigger: 'blur'}
                    ],
                    customersource: [
                        {required: true, trigger: 'change'}
                    ],
                    importlevel: [
                        {required: true, trigger: 'change'}
                    ],
                    area: [
                        {required: true, trigger: 'change'}
                    ],
                },
                channelTypeId:'',
                formValidate: {
                    id: '',
                    name: '',
                    tel: '',
                    fixedphone: '',
                    qq: '',
                    weixin: '',
                    address: '',
                    customertype: [],
                    customersource: '',
                    importlevel: '',
                    area: '',
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
                    channelTypeId:'',
                    TJleader:'',
                    recCustomer:'',
                    // customertuijianId:''
                },
                customerlabel: [],
                customertype_list:[],
                ChannelType:[],
                area: [],
                cluesource: [],
                customerType: [],
                impLevel: [],
                sf_yn: [],
                customerTypeArr:[]
            }
        },
        methods: {
            show(e){
                // console.log(e)
                if(e[0] == "10919"){
                    // console.log("1")
                    this.isOpenEdit = true
                }else{
                    this.isOpenEdit = false
                }
            },
            getDataCenter() {
                var _self = this;
                var url = `api/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=customerTypes,cluesources,customerrating,area,sf_yn`;
                this.$http.get(url).then(function(res) {
                    // //console.log(res.data.data)
                    var temp = res.data.data;
                    _self.area = temp.area;
                    _self.cluesource = temp.cluesources;
                    // console.log(temp.customerType)
                    _self.customerType = temp.customerTypes;
                    _self.impLevel = temp.customerrating;
                    _self.sf_yn = temp.sf_yn;
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
            getAllLabel(){
                //  获取标签菜单
                let _self = this
                _self.edit_loading = true
                this.$http.get('/api/system/label/list?page=1&pageSize=1000').then(function(LabelsAllRes){
                    for (let i = 0; i < LabelsAllRes.data.data.rows.length; i++) {
                            let areaObj = {}
                            areaObj.id = LabelsAllRes.data.data.rows[i].id
                            areaObj.labelname = LabelsAllRes.data.data.rows[i].labelName
                            areaObj.labelcode = LabelsAllRes.data.data.rows[i].labelCode
                            areaObj.labelmemo = LabelsAllRes.data.data.rows[i].labelMemo
                            areaObj.channelflag = (LabelsAllRes.data.data.rows[i].channelFlag == '0' ? '否' : '是')
                            areaObj._checked = ''
                            _self.data1.push(areaObj)
                        }
                    _self.getChannelType()
                    _self.getDataCenter()
                    _self.getData()
                })
                
            },
            getData() {
                var _self = this
                this.$http.all([
                    this.$http.get('/api/customer/detail?id=' + _self.customerid),
                    // this.$http.get('/api/customer/findCustomer/' + _self.customerid),
                    this.$http.get('/api/customer/findAllCustomerLabelsByCustomerId/' + _self.customerid),
                ])
                    .then(this.$http.spread(function (customerdetailResp,LabelsRes) {
                        // //console.log(res)
                        _self.$backToLogin(customerdetailResp)
                        let data = customerdetailResp.data.data
                        // var LabelsRes = []
                        if(data.customersource == 'xzqd'){
                            _self.channel_show = true
                        }else{
                            _self.channel_show = false
                        }
                        if(data.customersource == 'khtj'){
                            _self.customer_show = true
                        }else{
                            _self.customer_show = false
                        }
                        if(data.customersource == 'ldtj'){
                            _self.leader_show = true
                        }else{
                            _self.leader_show = false
                        }
                        // LabelsRes = data.labels
                        // //console.log(LabelsRes)
                        // //console.log(LabelsRes.length)
                        _self.formValidate.id = data.ID
                        _self.formValidate.channelsource = data.channelsource
                        _self.formValidate.email = data.email
                        _self.formValidate.sourcesubdivision = data.sourcesubdivision
                        _self.formValidate.isbound = data.isbound
                        _self.formValidate.name = data.NAME
                        _self.formValidate.channelTypeId = data.channel_type_id
                        _self.formValidate.tel = data.TEL
                        _self.formValidate.fixedphone = data.fixedPhone
                        _self.formValidate.qq = data.qq
                        _self.formValidate.weixin = data.weixin
                        _self.formValidate.address = data.ADDRESS
                        _self.formValidate.area = data.AREA
                        _self.formValidate.labels = data.labels
                        _self.formValidate.recCustomer = data.rec_customer
                        
                        _self.formValidate.customersource = data.customersource
                        if(data.importlevel != null){
                            _self.formValidate.importlevel = data.importlevel.toString()
                        }

                        if(data.issend == ''){
                            _self.formValidate.issend = "Y"
                        }else{
                            _self.formValidate.issend = data.issend
                        }
                        _self.formValidate.createdate = data.CREATEDATE
                        _self.formValidate.updatedate = data.updatedate
                        _self.formValidate.backup = data.backup

                        if(data.customerType!=""&&data.customerType!=null){
                            var temp = data.customerType.split('-')
                            // console.log(temp)
                            if(temp[0] == "10919"){
                                // console.log('1')
                                _self.isOpenEdit = true
                            }

                        for(let i = 0; i<_self.customerTypeArr.length;i++){
                            if(temp[1]==""||temp[1]==null){
                                if(temp[0] == _self.customerTypeArr[i].id){
                                if(_self.customerTypeArr[i].pid == 0){
                                    _self.formValidate.customertype.push(_self.customerTypeArr[i].id)
                                }else{
                                    _self.formValidate.customertype.push(_self.customerTypeArr[i].pid,_self.customerTypeArr[i].id)
                                }
                            }
                            }else{
                                if(temp[1] == _self.customerTypeArr[i].id){
                                if(_self.customerTypeArr[i].pid == 0){
                                    _self.formValidate.customertype.push(_self.customerTypeArr[i].id)
                                }else{
                                    _self.formValidate.customertype.push(_self.customerTypeArr[i].pid,_self.customerTypeArr[i].id)
                                }
                                
                            }
                            }

                        }
                        }
                        
                        // 通过客户ID查找客户标签
                        _self.customerlabel = []
                        // console.log(data.labels)
                        if(data.labels == "" || data.labels == null){
                            _self.$emit('editStopLoading',true)                        
                        }else{
                            var temp = data.labels.split(',')
                            for (let i = 0; i < temp.length; i++) {
                                    _self.formValidate.customerlabel.push(temp[i])
                                    let a = {}
                                    a.id = temp[i]
                                    //  标签显示为空的问题，因为获取到的长度为0，所以标签显示内容为空，原因未知，待查，部分有长度，部分无长度
                                    // console.log(_self.data1)
                                    for(let j = 0;j<_self.data1.length;j++){
                                        if(temp[i] == _self.data1[j].id){
                                            a.labelname = _self.data1[j].labelname
                                            // console.log(a)
                                        }
                                    }
                                    _self.customerlabel.push(a)
                                }
                            
                        }
                        

                        // 标签
                        _self.$emit('editStopLoading',true)
                    }))
            },

            checkboxChange(e) {
                let _self = this
                _self.customerlabel = []
                for (let i = 0; i < e.length; i++) {
                    for (let j = 0; j < _self.customerlabelGroup.length; j++) {
                        if (e[i] == _self.customerlabelGroup[j].label) {
                            _self.customerlabel.push(_self.customerlabelGroup[j].value)
                        }
                    }
                }
                _self.formValidate.customerlabel.push(_Obj)
            },

            handleSubmit(name) {
                // //console.log(this.formValidate)
                var _self = this
                this.$refs[name].validate((valid) => {
                    var labelIds = []
                    // //console.log(_self.customerlabel.length)
                    for (let i = 0; i < _self.customerlabel.length; i++) {
                        labelIds.push(_self.customerlabel[i].id)

                    }
                    if (valid) {
                        let _customertypeStr = _self.formValidate.customertype.join('-')
                        if ((_self.formValidate.tel == '' || _self.formValidate.tel == null) && (_self.formValidate.fixedphone == '' || _self.formValidate.fixedphone == null) && (_self.formValidate.qq == '' || _self.formValidate.qq == null) && (_self.formValidate.weixin == '' || _self.formValidate.weixin == null)) {
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                            this.$Message.error('电话、固话、QQ、微信必须填写一个');
                        } else {

                            const config = {
                            'id':_self.formValidate.id,
                            'name':_self.formValidate.name,
                            'tel':_self.formValidate.tel,
                            'fixedphone':_self.formValidate.fixedphone,
                            'qq':_self.formValidate.qq,
                            'weixin':_self.formValidate.weixin,
                            'address':_self.formValidate.address,
                            'customertype':_self.formValidate.customertype.join('-'),
                            // 'customertype':_customertypeStr,
                            'customersource':_self.formValidate.customersource,
                            'importlevel':_self.formValidate.importlevel,
                            'area':_self.formValidate.area,
                            'issend':_self.formValidate.issend,
                            'labels':labelIds.toString(),
                            // 'CREATEDATE':_self.formValidate.createdate,
                            // 'updatedate':_self.formValidate.updatedate,
                            'backup':_self.formValidate.backup,
                            'sourcesubdivision':_self.formValidate.sourcesubdivision,
                            'isbound':_self.formValidate.isbound,
                            'email':_self.formValidate.email,
                            // 'channelsource':_self.formValidate.channelsource,
                            'channelTypeId':_self.formValidate.channelTypeId,
                            'recCustomer':_self.formValidate.recCustomer
                            }
                            //console.log(config)
                            _self.$http({
                                method: 'post',
                                url: '/api/customer/updateCustomer',
                                data: config,
                                headers: {'Content-Type': 'application/json'},
                            })
                                .then(function (response) {
                                    if (response.data.msgCode == '40000') {
                                        _self.$Message.success('更新成功!')
                                        Bus.$emit('msg', '')
                                        _self.getData()
                                    }
                                })
                        }
                    } else {
                        this.$Message.error('请完善客户信息');
                    }
                })
            },

            handleClose2(event, name) {
                let _self = this
                for (let i = 0; i < _self.customerlabel.length; i++) {
                    // //console.log(name)
                    if (_self.customerlabel[i] == name) {
                        let index = _self.customerlabel.indexOf(name);
                        if (index > -1) {
                            _self.customerlabel.splice(index, 1);
                        }
                        for(let i = 0; i<this.data1.length;i++){
                                if(this.data1[i].id == name.id){
                                    this.data1[i]._checked = false
                                
                        }
                    }
                    }
                }
            },

            selectionChange (e) {
                // //console.log(e)
                let _self = this
                _self.customerlabel = []
                for (let i = 0; i < e.length; i++) {
                    let a = {}
                    a.id = e[i].id
                    a.labelname = e[i].labelname
                    _self.customerlabel.push(a)
                }
            },
            // cancel(name) {
            //     this.$refs['formValidate'].resetFields();
            // },
            ok(){},
            addTag(){
                this.modal1 = true
                // //console.log(this.data1)
                // //console.log(this.customerlabel)
                for(let i = 0; i<this.data1.length;i++){
                    for(let j = 0;j<this.customerlabel.length;j++){
                        if(this.data1[i].id == this.customerlabel[j].id){
                            this.data1[i]._checked = true
                        }
                        }
                    }
            },
            getChannelType(){
                var _self = this
                _self.ChannelType=[]
                this.$http.get('api/channel/type/queryUserChannel?type=xs').then(function(data){
                    //console.log(data.data.data)
                    for(let i = 0; i<data.data.data.length;i++){
                        var temp={}
                        temp.channel_type_name = data.data.data[i].channel_type_name
                        temp.channel_type_code = data.data.data[i].channel_type_code
                        temp.id = data.data.data[i].id
                        _self.ChannelType.push(temp)
                    }
                    //console.log(_self.ChannelType)
                })
            },
            //  是否显示新增渠道的判断
            isxzqd(e){
                // this.getChannelType()
                // //console.log(e)
                if(e == 'xzqd'){
                    this.channel_show = true
                }else{
                    this.channel_show = false
                    this.formValidate.channelTypeId = ""
                }
                if(e == 'khtj'){
                    this.customer_show = true
                    // this.formValidate.recCustomer = ""                    
                }else{
                    this.customer_show = false
                }
                if(e == 'ldtj'){
                    this.leader_show = true
                }else{
                    this.leader_show = false
                    this.formValidate.TJleader = ""                                        
                }
            },
            //  顾客推荐搜索表
            getCustomer(){
                let _self = this
                this.showCustomer = true
                this.customerLoading = true
                let url = `api/customer/list`
                let config = {
                    params:{
                        page: _self.pageCustomer,
                        name: _self.searchCustomer,
                        tel: _self.searchCustomerTEL,
                        pageSize: 10
                    }
                }
                this.$http.get(url, config).then(function(res){
                    _self.pageTotalCustomer = res.data.data.total
                    _self.customerData = res.data.data.rows
                    _self.customerLoading = false
                })
            },
            keydown3(e){
                if(e.key == 'Enter'){
                    this.pageCustomer = 1
                    this.getCustomer()
                }
            },
            pageChangeCustomer(e){
                this.pageCustomer = e
                this.getCustomer()
            },
            rowSelectCustomer(e){
                this.formValidate.recCustomer = e.NAME,
                this.formValidate.customertuijianId = e.id,
                this.showCustomer = false
            }
        },
        mounted() {
            this.getAllLabel()
            // this.getChannelType()
            // this.getDataCenter()
            // setInterval(this.getData(),1000)
        },
        created () {
            let _self = this
            Bus.$on('add_follow_up_data_to_edit',(e)=>{
                console.log('1111111')
                _self.getAllLabel()
            })
        }
    }
</script>

<style scoped>
    /* .ivu-form-item {
        margin-bottom: 2px
    } */
</style>