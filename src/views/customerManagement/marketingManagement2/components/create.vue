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
                <Row :gutter="16" style="height:56px">
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
                <Row :gutter="16" style="height:56px">
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
                <Row :gutter="16" style="height:56px">
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
                <Row :gutter="16" style="height:56px">
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
                <Row :gutter="16" style="height:56px">
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
                <Row style="height:56px" :gutter="16" v-if="channelShow">
                    <Col span="12">
                        <FormItem label="选择渠道" prop="channelTypeId">
                            <Select transfer v-model="formValidate.channelTypeId" size="small">
                                <Option v-for="item in ChannelType" :value="item.id" :key="item.id">{{ item.channel_type_name }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row style="height:56px" :gutter="16" v-if="customerShow">
                    <Col span="12">
                        <FormItem label="推荐客户" prop="recCustomer"  style="margin-bottom:0px">
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
                    <FormItem label="标签" prop="customerTags" style="margin-top:5px;margin-bottom:10px">
                        <Tag v-for="item in customerlabelGroup" :key="item" :name="item" :id="item.id" closable @on-close="handleClose2">{{ item.labelName }}</Tag>
                        <Button name="marketingManagement_index_entry_add" icon="ios-plus-empty" type="dashed" size="small" @click="getLabelData();addTag = true">添加</Button>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <FormItem label="备注" prop="backup" style="marin-top:40px">
                        <Input size="small" type="textarea" v-model="formValidate.backup"/>
                    </FormItem>
                </Row>
                 <FormItem>
                      <Button type="primary" @click="create">新增</Button>
                      <Button type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
                  </FormItem>
            </Form>
            <div slot="footer"></div>
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
                    _self.$Get(url, config, success);
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
                importance: "ordinary"
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
            customerlabelGroup: []
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
            this.$refs["formValidate"].validate((valid) => {
                // if(valid && this.check_date()){
                //     _self.create_order()
                //     this.loading = false
                // }else{
                //     this.loading = false
                // }
            })
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
            var _self = this
            let url = `api/channel/type/queryUserChannel?type=xs`

            let config = {}

            function success(res){
                _self.ChannelType = res.data.data
            }

            this.$Get(url, config, success)
        }
    },
    mounted(){
        let _self = this
        this.$bus.on("CREATE_CUSTOMER", (e)=>{
            _self.openCustomerCreate = true
        })
    }
}
</script>
