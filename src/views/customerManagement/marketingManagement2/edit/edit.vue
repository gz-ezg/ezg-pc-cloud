<template>
    <div>
        <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="80">
            <FormItem label="姓名" prop="NAME" style="margin-bottom:0px">
                <Input size="small" v-model="formValidate.NAME"/>
            </FormItem>
            <FormItem label="电话" prop="TEL" style="margin-bottom:0px">
                <Input size="small" v-model="formValidate.TEL"/>
            </FormItem>
            <FormItem label="固话" prop="fixedPhone" style="margin-bottom:0px">
                <Input size="small" v-model="formValidate.fixedPhone"/>
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
            <FormItem label="服务地址" prop="ADDRESS" style="margin-bottom:0px">
                <Input size="small" v-model="formValidate.ADDRESS"/>
            </FormItem>
            <FormItem label="客户状态" prop="customerType" style="margin-bottom:0px">
                <Cascader trigger="hover" :data="customerTypes_Casr" v-model="formValidate.customerType"></Cascader>
            </FormItem>
            <FormItem label="客户来源" prop="customersource" style="margin-bottom:0px">
                <Select transfer v-model="formValidate.customersource" size="small" >
                    <Option v-for="item in cluesources" :value="item.typecode" :key="item.id">{{ item.typename}}</Option>
                </Select>
            </FormItem>
            <FormItem label="渠道名称" prop="channel_type_id" v-if="formValidate.customersource == 'xzqd'" style="margin-bottom:0px">
                <Select transfer v-model="formValidate.channel_type_id" size="small">
                    <Option v-for="item in ChannelType" :value="item.id" :key="item.id">{{ item.channel_type_name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="推荐客户" prop="rec_customer" v-if="formValidate.customersource == 'khtj'" style="margin-bottom:0px">
                <!-- <Input size="small" v-model="formValidate.rec_customer" @on-focus="getCustomer" readonly />                     -->
                <Input size="small" v-model="formValidate.rec_customer" readonly />                    
            </FormItem>
            <FormItem label="客户等级" prop="importlevel" style="margin-bottom:0px">
                <Select transfer v-model="formValidate.importlevel" size="small" :disabled="formValidate.customerType[0] == 10919">
                    <Option v-for="item in customerrating" :value="item.typecode" :key="item.id">{{ item.typename }}</Option>
                </Select>
            </FormItem>
            <FormItem label="重要性" prop="importance" style="margin-bottom:0px">
                <Select transfer v-model="formValidate.importance" size="small">
                    <Option v-for="item in importance" :value="item.typecode" :key="item.id">{{ item.typename}}</Option>
                </Select>
            </FormItem>
            <FormItem label="区域" prop="AREA" style="margin-bottom:0px">
                <Select transfer v-model="formValidate.AREA" size="small" >
                    <Option v-for="item in area" :value="item.typecode" :key="item.id">{{ item.typename }}</Option>
                </Select>
            </FormItem>
            <FormItem label="发送短信" prop="issend" style="margin-bottom:0px">
                <Select transfer v-model="formValidate.issend" size="small" >
                    <Option v-for="item in sf_yn" :value="item.typecode" :key="item.id">{{ item.typename }}</Option>
                </Select>
            </FormItem>
            <FormItem label="标签" prop="customerlabelTags" style="margin-bottom:0px">
                <Tag v-for="(item, index) in LabelArray" :key="index" :name="index" closable @on-close="close_tag(index)">{{ item.labelName }}</Tag>
                <Button name="marketingManagement_index_edit_addtag" icon="ios-plus-empty" type="dashed" size="small" @click="open_tag">添加</Button>
            </FormItem>
            <FormItem label="创建时间" prop="CREATEDATE" style="margin-bottom:0px">
                <Input readonly size="small" v-model="formValidate.CREATEDATE"/>
            </FormItem>
            <FormItem label="更新时间" prop="updatedate" style="margin-bottom:0px">
                <Input readonly size="small" v-model="formValidate.updatedate"/>
            </FormItem>
            <FormItem label="备注" prop="backup" style="margin-bottom:10px">
                <Input size="small" type="textarea" v-model="formValidate.backup"/>
            </FormItem>
            <FormItem style="margin-bottom:0px">
                <!-- <Button type="ghost" style="visibility:hidden;">关闭</Button> -->
                <Button type="primary" name="marketingManagement_index_edit_save" @click="update" style="margin-left: 20px" :loading="loading">保存</Button>                  
            </FormItem>
        </Form>
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
        customer:{
            type: [Array, Object, String]
        }
    },
    data(){
                //  自定义规则
        const validateTel = (rule, value, callback) => {
            let re = /^1\d{10}$/;
            if (value == "" || value == null) {
                callback();
            } else {
                if (re.test(value)) {
                    callback();
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
            loading: false,
            LabelArray: [],
            allLabel: [],
            ChannelType: [],
            isOpenEdit: false,
            formValidate:{
                id: "",
                NAME: "",
                TEL: "",
                fixedPhone: "",
                qq: "",
                weixin: "",
                ADDRESS: "",
                customerType: [],
                customersource: "",
                importlevel: "",
                AREA: "",
                issend: "",
                customerlabel: [],
                createdate: "",
                updatedate: "",
                gxr: "",
                backup: "",
                sourcesubdivision: "",
                isbound: "",
                email: "",
                channelsource: "",
                channel_type_id: "",
                rec_customer: "",
                importance: "",
                labels: []
            },
            ruleValidate:{
                NAME: [
                    { required: true, trigger: "change", message: "姓名不能为空" }
                ],
                customerType: [
                    { required: true, message: "客户状态不能为空", trigger: "change", type:"array" }
                ],
                customersource: [
                    { required: true, trigger: "change", message: "请选择客户来源" }
                ],
                TEL: [
                    { validator: validateTel, trigger: "blur", type: "number" }
                ],
                fixedPhone: [
                    { validator: validateFixedphone, trigger: "change", type: "number" }
                ],
                importlevel: [
                    { required: true, trigger: "change", message: "请选择客户等级" }
                ],
                area: [
                    { required: true, trigger: "change", message: "请选择区域" }
                ],
                channel_type_id:[
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
    methods: {
        get_data(e){
            let _self = this
            let url = `/api/customer/detail`

            let config = {
                params: {
                    id: e
                }
            }

            function success(res){
                _self.formValidate = res.data.data
                if(_self.formValidate.customerType){
                    _self.formValidate.customerType = _self.formValidate.customerType.split("-")
                    _self.formValidate.customerType[0] = parseInt(_self.formValidate.customerType[0])
                    _self.formValidate.customerType[1] = parseInt(_self.formValidate.customerType[1])
                }
                if(_self.formValidate.importlevel){
                    _self.formValidate.importlevel = ''+_self.formValidate.importlevel
                }
                if(_self.formValidate.labels){
                    _self.formValidate.labels = _self.formValidate.labels.split(",")
                    for(let j = 0;j<_self.formValidate.labels.length;j++){
                        _self.formValidate.labels[j] = parseInt(_self.formValidate.labels[j])
                    }
                }
                _self.$emit("cancel-loading",true)
            }

            this.$Get(url, config, success)
        },
        get_channel_type(){
            let _self = this
            let url = `api/channel/type/queryUserChannel?type=xs`

            let config = {}

            return new Promise((resolve, reject)=>{
                function success(res){
                    _self.ChannelType = res.data.data
                    resolve()
                }

                this.$Get(url, config, success)
            })
        },
        get_all_label(){
            let _self = this
            let url = `api/system/label/list?page=1&pageSize=100`

            let config = {}

            

            return new Promise((resolve, reject)=>{
                function success(res){
                    _self.allLabel = res.data.data.rows
                    resolve()
                }
                this.$Get(url, config, success)
            })
        },
        open_tag(){
            let _self = this
            //  传过去的必须为一个id数组
            //  再写一个关联数组，用于显示
            if(!_self.formValidate.labels){
                _self.formValidate.labels = []
            }
            this.$bus.emit("OPEN_TAG", _self.formValidate.labels)
        },
        close_tag(e){
            this.formValidate.labels.splice(e,1)
        },
        update(){
            if(this.formValidate.TEL || this.formValidate.email || this.formValidate.fixedPhone || this.formValidate.weixin){
                this.loading = true
                this.$refs["formValidate"].validate((valid) => {
                    if(valid){
                        this.submit()
                    }else{
                        this.loading = false
                    }
                })
            }else{
                this.$Message.warning("联系方式需至少填写一项！")
            }
        },
        submit(){
            let _self = this
            let url = `api/customer/updateCustomer`
                    console.log("123456")

            // if(_self.formValidate.customerType.length>2){
            //     console.log("1111")
            //     for(let i = 2; i < _self.formValidate.customerType.length; i++){
            //         _self.formValidate.customerType[i] = null
            //     }
            // }

            // console.log(_self.formValidate.labels)
            console.log(_self.formValidate.labels.join(","))
            let config = {
                id: _self.formValidate.ID,
                address: _self.formValidate.ADDRESS,
                area: _self.formValidate.AREA,
                name: _self.formValidate.NAME,
                tel: _self.formValidate.TEL,
                backup: _self.formValidate.backup,
                customertype: _self.formValidate.customerType[0] + "-" + _self.formValidate.customerType[1],
                issend: _self.formValidate.issend,
                fixedphone: _self.formValidate.fixedPhone,
                qq: _self.formValidate.qq,
                weixin: _self.formValidate.weixin,
                email: _self.formValidate.email,
                customersource: _self.formValidate.customersource,
                sourcesubdivision: _self.formValidate.sourcesubdivision,
                importlevel: _self.formValidate.importlevel,
                channelTypeId: _self.formValidate.channel_type_id,
                recCustomer: _self.formValidate.rec_customer,
                labels: _self.formValidate.labels.join(","),
                importance: _self.formValidate.importance
            }

            function success(res){
                _self.loading = false
                setTimeout(()=>{
                    _self.$bus.emit("UPDATE_CUSTOMER", true)
                },300)
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        }
    },
    created(){
        let _self = this
        //  等待两个任务都完成再请求数据，确保绝对渲染
        Promise.all([
            _self.get_channel_type(),
            _self.get_all_label()
        ]).then(()=>{
            this.get_data(this.customer.ID)
        })
    },
    watch:{
        'formValidate.labels': function(){
            //  用于计算展示的标签数组
            //  formValidate.labels id数组
            //  LabelName 所有值数组
            this.LabelArray = []
            if(this.formValidate.labels){
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
}
</script>

