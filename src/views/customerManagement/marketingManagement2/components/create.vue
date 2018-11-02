<template>
    <div>
        <Modal
            title="新增客户"
            v-model="openCustomerCreate"
            width="700"
            :mask-closable="false"
            @on-visible-change="modal_status_change"
        >
            <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="80">
                <Row :gutter="16" >
                    <Col span="12">
                    <FormItem label="姓名" prop="name">
                        <Input size="small" v-model="formValidate.name"/>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="电话" prop="tel">
                        <Input size="small" v-model="formValidate.tel"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" >
                    <Col span="12">
                    <FormItem label="固话" prop="fixedphone">
                        <Input size="small" v-model="formValidate.fixedphone"/>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="QQ" prop="qq">
                        <Input size="small" v-model="formValidate.qq"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" >
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
                    </Col>
                </Row>
                <Row :gutter="16" >
                    <Col span="12">
                        <FormItem label="服务地址" prop="address">
                            <Input size="small" v-model="formValidate.address"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="客户状态" prop="customertype">
                            <Cascader trigger="hover" :data="customerTypes_Casr" v-model="formValidate.customertype" size="small"></Cascader>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" >
                    <Col span="12">
                    <FormItem label="客户来源" prop="customersource">
                        <Select transfer v-model="formValidate.customersource" size="small" @on-change="check_channel">
                            <Option v-for="item in cluesources" :value="item.typecode" :key="item.id">{{ item.typename }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="客户等级" prop="importlevel">
                        <Select transfer v-model="formValidate.importlevel" size="small" placement="bottom">
                            <Option v-for="item in customerrating" :value="item.typecode" :key="item.id">{{ item.typename}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" v-if="channelShow">
                    <Col span="12">
                        <FormItem label="选择渠道" prop="channelTypeId">
                            <Select transfer v-model="formValidate.channelTypeId" size="small">
                                <Option v-for="item in ChannelType" :value="item.id" :key="item.id">{{ item.channel_type_name }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" v-if="customerShow">
                    <Col span="12">
                        <FormItem label="推荐客户" prop="recCustomer" >
                            <Input size="small" v-model="formValidate.recCustomer" @on-focus="getCustomer" readonly />                    
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="区域" prop="area">
                            <Select transfer v-model="formValidate.area" size="small">
                                <Option v-for="item in area" :value="item.typecode" :key="item.id">{{ item.typename }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="发送短信" prop="issend">
                            <Select transfer v-model="formValidate.issend" size="small">
                                <Option v-for="item in sf_yn" :value="item.typecode" :key="item.id">{{ item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="客户重要性" prop="importance">
                            <Select transfer v-model="formValidate.importance" size="small">
                                <Option v-for="item in importance" :value="item.typecode" :key="item.id">{{ item.typename }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem label="标签" prop="customerTags" style="margin-bottom:10px">
                            <Tag v-for="(item, index) in LabelArray" :key="index" :name="index" closable @on-close="close_tag(index)">{{ item.labelName }}</Tag>
                            <Button name="marketingManagement_index_entry_add" icon="ios-plus-empty" type="dashed" size="small" @click="open_tag">添加</Button>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <FormItem label="备注" prop="backup" style="marin-top:20px">
                        <Input size="small" type="textarea" v-model="formValidate.backup"/>
                    </FormItem>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="create">新增</Button>
                <Button type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    props: {
        cluesources: {
            type: Array
        },
        customerrating: {
            type: Array
        },
        area: {
            type: Array
        },
        sf_yn: {
            type: Array
        },
        importance: {
            type: Array
        },
        customerTypes_Casr: {
            type: Array
        },
    },
    data(){
        //  自定义规则
        const validateTel = (rule, value, callback) => {
            let re = /^1\d{10}$/;
            if (value == "" || value == null) {
                callback();
            } else {
                if (re.test(value)) {
                    let _self = this
                    let url = "api/customer/findCustomerByTel"
                    let config = {
                        params: {
                            tel: value
                        }
                    }

                    function success(res) {
                        if (res.data.data != null) {
                            callback(new Error("抱歉，电话号码重复"));
                        } else {
                            callback();
                        }
                    }

                    function fail(err){
                        callback(new Error("验证错误"))
                    }
                    _self.$Get(url, config, success, fail);
                } else {
                    callback(new Error("电话格式不正确"));
                }
            }
        };

        const validateFixedphone = (rule, value, callback) => {
            let re = /\d{3}-\d{8}|\d{4}-\d{7}/;
            if (value == "" || value == null) {
                callback();
            } else {
                if (re.test(value)) {
                    callback();
                } else {
                    callback(new Error("固话格式不正确"));
                }
            }
        };

        const validateQQ = (rule, value, callback) => {
            let re = /^[1-9]\d{4,10}$/;
            if (value == "" || value == null) {
                callback();
            } else {
                if (re.test(value)) {
                    callback();
                } else {
                    callback(new Error("QQ格式不正确"));
                }
            }
        };

        const validateChannel = (rule, value, callback) => {
            if(this.formValidate.customersource == "xzqd"){
                if(value == "" || value == null){
                    callback(new Error("请选择渠道类型"))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        }
        return {
            //  可选项
            channelShow: false,
            ChannelType: [],

            //  标签
            allLabel: [],
            LabelArray: [],
            customerShow: false,    
            openCustomerCreate: false,
            formValidate: {
                id: "",
                name: "",
                tel: "",
                fixedphone: "",
                qq: "",
                weixin: "",
                address: "",
                customertype: [10917,10822],
                customersource: "",
                importlevel: "3",
                area: "",
                issend: "Y",
                customerlabel: [],
                createdate: "",
                updatedate: "",
                gxr: "",
                backup: "",
                sourcesubdivision: "",
                isbound: "",
                email: "",
                channelsource: "",
                channelTypeId: "",
                recCustomer: "",
                importance: "ordinary",
                labels: []
            },
            ruleValidate:{
                name: [
                    { required: true, trigger: "change", message: "姓名不能为空" }
                ],
                customertype: [
                    { required: true, message: "客户状态不能为空", trigger: "change", type:"array" }
                ],
                customersource: [
                    { required: true, trigger: "change", message: "请选择客户来源" }
                ],
                tel: [
                    { validator: validateTel, trigger: "blur", type: "number" }
                ],
                fixedphone: [
                    { validator: validateFixedphone, trigger: "change", type: "number" }
                ],
                importlevel: [
                    { required: true, trigger: "change", message: "请选择客户等级" }
                ],
                area: [
                    { required: true, trigger: "change", message: "请选择区域" }
                ],
                channelTypeId:[
                    { validator: validateChannel, trigger: 'change', message:'请选择渠道来源' }
                ],
                email: [
                    { type: "email", trigger: "change", message: "邮箱格式不正确" }
                ],
                qq: [
                    { validator: validateQQ, trigger: "change" }
                ]
            },
        }
    },
    methods:{
        //  清楚模态框内容
        modal_status_change(e){
            if(!e){
                this.$refs["formValidate"].resetFields()
                this.formValidate.customertype = [10917,10822]
                this.formValidate.importlevel = "3"
                this.formValidate.issend = "Y"
                this.formValidate.importance = "ordinary"
            }
        },
        //  新增客户
        create(){
            this.$ButtonCollect("marketingManagement_index_entry_save");
            if(this.formValidate.tel || this.formValidate.email || this.formValidate.fixedphone || this.formValidate.weixin){
                this.loading = true
                this.$refs["formValidate"].validate((valid) => {
                    if(valid){
                        this.create_customer()
                    }else{
                        this.loading = false
                    }
                })
            }else{
                this.$Message.warning("联系方式需至少填写一项！")
            }
        },

        //  新增客户具体方法
        create_customer(){
            let _self = this
            let url = `api/customer/saveCustomer`

            //  标签处理
            // let labels = []
            // for(let i = 0;i<_self.formValidate.labels.length;i++){
            //     console.log(_self.formValidate.labels[i])
            //     labels.push(_self.formValidate.labels[i])
            //     // labels.push(_self.formValidate.labels[i].id)
            // }

            let config = {
                address: _self.formValidate.address,
                area: _self.formValidate.area,
                name: _self.formValidate.name,
                tel: _self.formValidate.tel,
                backup: _self.formValidate.backup,
                customertype: _self.formValidate.customertype.join("-"),
                issend: _self.formValidate.issend,
                fixedphone: _self.formValidate.fixedphone,
                qq: _self.formValidate.qq,
                weixin: _self.formValidate.weixin,
                email: _self.formValidate.email,
                customersource: _self.formValidate.customersource,
                sourcesubdivision: _self.formValidate.sourcesubdivision,
                importlevel: _self.formValidate.importlevel,
                channelTypeId: _self.formValidate.channelTypeId,
                recCustomer: _self.formValidate.recCustomer,
                labels: _self.formValidate.labels.join(","),
                importance: _self.formValidate.importance
            }

            function success(res){
                _self.openCustomerCreate = false
                _self.loading = false
                setTimeout(()=>{
                    _self.$bus.emit("UPDATE_CUSTOMER", true)
                },300)
                _self.$bus.emit("CREATE_AFTER_EDIT", res.data.data)
                
            }

            function fail(err){
                _self.loading = false
            }

            _self.$Post(url, config, success, fail)
        },
        handleReset(){
            this.$refs["formValidate"].resetFields()
        },
        //  检查客户来源类型
        check_channel(e) {
            //  渠道推荐
            if (e == "xzqd") {
                this.channelShow = true;
                this.get_channel_type()
            } else {
                this.channelShow = false;
                this.formValidate.channelTypeId = "";
            }
            //  客户推荐
            if (e == "khtj") {
                this.customerShow = true;
            } else {
                this.customerShow = false;
            }
            //  领导推荐
            // if (e == "ldtj") {
            //     this.leaderShow = true;
            // } else {
            //     this.leaderShow = false;
            // }
        },
        get_channel_type(){
            let _self = this
            let url = `api/channel/type/queryUserChannel?type=xs`

            let config = {}

            function success(res){
                _self.ChannelType = res.data.data
            }

            this.$Get(url, config, success)
        },
        open_tag(){
            let _self = this
            //  传过去的必须为一个id数组
            //  再写一个关联数组，用于显示
            this.$bus.emit("OPEN_TAG", _self.formValidate.labels)
        },
        close_tag(e){
            this.formValidate.labels.splice(e,1)
        },
        get_all_label(){
            let _self = this
            let url = `api/system/label/list?page=1&pageSize=100`

            let config = {}

            function success(res){
                _self.allLabel = res.data.data.rows
            }

            this.$Get(url, config, success)
        }
    },
    created(){
        this.get_all_label()
    },
    mounted(){
        let _self = this
        this.$bus.on("CREATE_CUSTOMER", (e)=>{
            _self.formValidate.labels = []
            _self.openCustomerCreate = true
        })
    },
    watch:{
        'formValidate.labels': function(){
            //  用于计算展示的标签数组
            //  formValidate.labels id数组
            //  LabelName 所有值数组
            this.LabelArray = []
            for(let i = 0; i< this.formValidate.labels.length; i++){
                for(let j = 0; j < this.allLabel.length; j++){
                    if(this.formValidate.labels[i] == this.allLabel[j].id){
                        this.LabelArray.push(this.allLabel[j])
                        break;
                    }
                }
            }
        }
    }
}
</script>
