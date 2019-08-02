<template>
    <div>
        <Modal
                v-model="openDetail"
                :title="title"
                :mask-closable="false"
                width="100"
        >
            <Row>
                <Form ref="detail" :model="detail" :label-width="100" :rules="detailRule">
                    <Row>
                        <Col span="4">
                            <FormItem label="姓名：" prop="name">
                                <Input size="small" v-model="detail.name" :readonly="readonly"/>
                            </FormItem>
                        </Col>
                        <Col span="5">
                            <FormItem label="电子邮件：" prop="email">
                                <Input size="small" v-model="detail.email"  :readonly="readonly"/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="入职时间：" prop="induction_date">
                                <DatePicker type="date" v-model="detail.induction_date" size="small" style="width:100%" :readonly="readonly"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="3">
                            <FormItem label="是否劳动合同：" prop="if_labor_contract">
                                <Select v-model="detail.if_labor_contract"   size="small" style="width:100%" :disabled="readonly">
                                    <Option v-for="(item,index) in sf01" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="试用底薪：" prop="trial_salary">
                                <Input size="small" type="number" v-model="detail.trial_salary" :readonly="readonly"/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="联系方式：" prop="tel">
                                <Input size="small" v-model="detail.tel" :readonly="readonly"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="3">
                            <FormItem label="婚姻状况：" prop="marital_status">
                                <!--<Select v-model="detail.marital_status"  size="small" style="width:100%" :readonly="readonly">-->
                                    <!--<Option :value="0">已婚</Option>-->
                                    <!--<Option :value="1">未婚</Option>-->
                                <!--</Select>-->
                                <Select v-model="detail.marital_status" type="text" transfer :disabled="readonly">
                                    <Option v-for="(item,index) in maritalStatus" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="毕业年份：" prop="graduation_date">
                                <DatePicker type="date" v-model="detail.graduation_date" size="small" style="width:100%" :readonly="readonly"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="3">
                            <FormItem label="是否试用：" prop="if_trial">
                                <Select v-model="detail.if_trial"  size="small" style="width:100%" :disabled="readonly">
                                    <Option v-for="(item,index) in sf01" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="5">
                            <FormItem label="工行账号：" prop="bank_account">
                                <Input size="small" v-model="detail.bank_account" :readonly="readonly"/>
                            </FormItem>
                        </Col>
                        <Col span="9">
                            <FormItem label="开户行地址：" prop="bank_address">
                                <Input size="small" v-model="detail.bank_address" :readonly="readonly"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="4">
                            <FormItem label="员工状态：" prop="employees_status">
                                <!--<Input size="small" v-model="detail.employees_status" :readonly="readonly"/>-->
                                <Select v-model="detail.employees_status"  size="small" style="width:100%" :disabled="readonly">
                                    <Option v-for="(item,index) in employeesStatus" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="最高学历：" prop="highest_education">
                                <Input size="small" v-model="detail.highest_education" :readonly="readonly"/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="所在省份：" prop="province_id">
                                <!--<Input size="small" v-model="detail.province_id" :readonly="readonly"/>-->
                                <Cascader :data="provinceData" v-model="detail.province_id" change-on-select :disabled="readonly"></Cascader>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="部门：" prop="depart_id">
                                <!--<Input size="small" v-model="detail.depart_id" :readonly="readonly"/>-->
                                <Cascader :render-format="format" :data="departData" v-model="detail.depart_id" change-on-select :disabled="readonly"></Cascader>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="合同期限：" prop="contract_period">
                                <Input size="small" v-model="detail.contract_period" :readonly="readonly"/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="转正时间：" prop="positive_date">
                                <DatePicker type="date" v-model="detail.positive_date" size="small" style="width:100%" :readonly="readonly"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="4">
                            <FormItem label="转正底薪：" prop="positive_salary">
                                <Input size="small" type="number" v-model="detail.positive_salary" :readonly="readonly"/>
                            </FormItem>
                        </Col>
                        <Col span="5">
                            <FormItem label="身份证号：" prop="id_card">
                                <Input size="small" v-model="detail.id_card" :readonly="readonly"/>
                            </FormItem>
                        </Col>
                        <Col span="5">
                            <FormItem label="专业：" prop="profession">
                                <Input size="small" v-model="detail.profession" :readonly="readonly"/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="职位：" prop="position">
                                <Select v-model="detail.position"  size="small" style="width:100%" :disabled="readonly">
                                    <Option v-for="(item,index) in applyPosition" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="3">
                            <FormItem label="性别：" prop="sex">
                                <Select v-model="detail.sex"  size="small" style="width:100%" :disabled="readonly">
                                    <Option value="男">男</Option>
                                    <Option value="女">女</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="3">
                            <FormItem label="是否员工手册：" prop="if_employee_handbook">
                                <Select v-model="detail.if_employee_handbook"  size="small" style="width:100%" :disabled="readonly">
                                    <Option v-for="(item,index) in sf01" :key="index" :value="item.typecode">{{item.typename}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="4">
                            <FormItem label="试用绩效：" prop="trial_performance">
                                <Input size="small" v-model="detail.trial_performance" :readonly="readonly"/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="转正绩效：" prop="positive_performance">
                                <Input size="small" v-model="detail.positive_performance" :readonly="readonly"/>
                            </FormItem>
                        </Col>
                        <Col span="4">
                            <FormItem label="出生年月：" prop="birthday">
                                <DatePicker type="date" v-model="detail.birthday" size="small" style="width:100%" :readonly="readonly"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="5">
                            <FormItem label="毕业院校：" prop="graduated_school">
                                <Input size="small" v-model="detail.graduated_school" :readonly="readonly"/>
                            </FormItem>
                        </Col>
                        <Col span="7">
                            <FormItem label="备注：" prop="remark">
                                <Input size="small" v-model="detail.remark" :readonly="readonly"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row v-if="readonly">
                        <Col>
                            <FormItem label="证明材料：">
                                <span v-for="(item,index) in beginImgList " :key="index" v-if="beginImgList">
                                    <a target="_blank" :href="'/api/assets/' + item" style="margin-right: 15px">
                                        <img :src="'/api/assets/' +item" alt=""  width="148" height="148" onerror="this.src='/api/assets/upload/commonImg/error.jpg';this.onerror=null">
                                    </a>
                                </span>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row v-if="showSave">
                        <Col>
                            <FormItem label="上传图片">
                                <center>
                                    <Upload
                                            Upload
                                            multiple
                                            type="drag"
                                            ref="upload"
                                            :before-upload="handleUpload"
                                            action="/api/zuul/system/simple/img/upload"
                                    >
                                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                                    </Upload>
                                </center>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row v-if="showSave">
                        <Col>
                            <FormItem label="证明材料：">
                                <span v-for="(item,index) in srcList" :key="index">
                                    <img :src="item" class="common">
                                    <!--{{ item.name }}-->
                                    <Button type="text" @click="fileRemove(item)">移除</Button>
                                </span>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row v-if="showEdit">
                        <Col>
                            <FormItem label="上传图片">
                                <center>
                                    <Upload
                                            Upload
                                            multiple
                                            type="drag"
                                            ref="upload"
                                            :before-upload="handleUpload"
                                            action="/api/zuul/system/simple/img/upload"
                                    >
                                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                                    </Upload>
                                </center>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row v-if="showEdit">
                        <Col>
                            <FormItem label="证明材料：">
                                <span v-for="(item,index) in srcList" :key="index">
                                    <img :src="item" class="common">
                                    <!--{{ item.name }}-->
                                    <Button type="text" @click="fileRemove(item)">移除</Button>
                                </span>
                                <span v-for="(item,index) in beginImgList " :key="index" v-if="beginImgList">
                                    <a target="_blank" :href="'/api/assets/' + item" style="margin-right: 15px">
                                        <img :src="'/api/assets/' +item" alt=""  class="common" onerror="this.src='/api/assets/upload/commonImg/error.jpg';this.onerror=null">
                                    </a>
                                    <Button type="text" @click="remove(item)">移除</Button>
                                </span>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Row>
            <div slot="footer">
                <Button type="primary" @click="save('detail')" :loading="loading" v-if="showSave">保存</Button>
                <Button type="primary" @click="edit('detail')" :loading="loading" v-if="showEdit">修改</Button>
                <Button @click="openDetail = false">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {DateFormat} from "../../../../libs/utils";

    export default {
        name: "detail",
        props:["applyPosition","employeesStatus","maritalStatus","sf01","departData","provinceData"],
        data(){
            const validateTel = (rule, value, callback) => {
                let re = /^1\d{10}$/;
                if (value == '' || value == null) {
                    callback();
                } else {
                    if (!re.test(value)) {
                        callback(new Error('电话格式不正确'));
                    }else {
                        callback()
                    }
                }
            }

            const validateBank = (rule, value, callback) => {
                let re = /^([1-9]{1})(\d{15}|\d{16}|\d{17}|\d{18})$/;
                if (value == '' || value == null) {
                    callback();
                } else {
                    if (!re.test(value)) {
                        callback(new Error('银行卡号格式不正确'));
                    }else {
                        callback()
                    }
                }
            }

            const validateIdCard = (rule, value, callback) => {
                let re = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                if (value == '' || value == null) {
                    callback();
                } else {
                    if (!re.test(value)) {
                        callback(new Error('身份证号格式不正确'));
                    }else {
                        callback()
                    }
                }
            }
            return{
                file:[],
                openDetail:false,
                readonly:false,
                loading:false,
                showSave:false,
                showEdit:false,
                title:"",
                srcList:[],
                imgList:[],
                beginImgList:[],
                detail:{
                    name:"",
                    email:"",
                    induction_date:"",
                    if_labor_contract:"",
                    trial_salary:"",
                    tel:"",
                    marital_status:"",
                    bank_account:"",
                    bank_address:"",
                    induction_year_month:"",
                    if_trial:0,
                    trial_performance:"",
                    employees_status:"",
                    highest_education:"",
                    province_id:"",
                    city_id:"",
                    depart_id:"",
                    contract_period:"",
                    positive_date:"",
                    positive_salary:"",
                    id_card:"",
                    profession:"",
                    position:"",
                    sex:"",
                    if_employee_handbook:"",
                    positive_performance:"",
                    birthday:"",
                    graduated_school:"",
                    graduation_date:"",
                    remark:"",
                    files:""
                },
                detailRule: {
                    name: [
                        { required: true, message: '请输入姓名！', trigger: 'blur' },
                    ],
                    email: [
                        { type: 'email', message: '邮箱格斯不对！', trigger: 'blur' }
                    ],
                    tel: [
                        {  validator: validateTel, message: '电话号码格式不对！', trigger: 'blur' },
                    ],
                    id_card: [
                        { validator: validateIdCard, message: '身份证格式不对！', trigger: 'blur' }
                    ],
                    bank_account: [
                        { validator: validateBank, message: '银行卡号格式不对', trigger: 'blur' }
                    ]
                },
            }
        },
        methods:{
            format(labels, selectedData){
                const index = labels.length - 1;
                // const data = selectedData[index] || false;
                // if (data && data.departname) {
                //     return labels[index] + ' - ' + data.code;
                // }
                return labels[index];
            },
            getNodeParent(data, id) {
                for (let i in data) {
                    if (data[i].value == id) {
                        return [data[i].value];
                    }
                    if (data[i].children) {
                        let ro = this.getNodeParent(data[i].children, id);
                        if (ro !== undefined) {
                            return [data[i].value, ...ro];
                        }
                    }
                }
            },
            save(name){
                let _self = this;
                this.$refs[name].validate( async (valid) => {
                    if (valid) {
                        if (_self.file.length) {
                            let arr = []
                            for (let i=0;i<_self.file.length;i++) {
                                arr.push(_self.uploadImg(i))
                            }
                           const resp = await Promise.all(arr)
                            _self.detail.files = resp.toString()
                            console.log(_self.detail.files)
                            _self.create()
                        }else {
                            _self.create()
                        }
                    }else {
                        this.$Message.error('请正确填写选项!');
                    }
                })
            },
            create(){
                let _self = this
                _self.loading = true;
                let url = `api/system/employee/create`;
                let config = {
                    name: _self.detail.name,
                    email:_self.detail.email,
                    inductionDate: DateFormat(_self.detail.induction_date),
                    ifLaborContract:_self.detail.if_labor_contract,
                    trialSalary:_self.detail.trial_salary,
                    tel:_self.detail.tel,
                    maritalStatus: _self.detail.marital_status,
                    bankAccount:_self.detail.bank_account,
                    bankAddress:_self.detail.bank_address,
                    ifTrial: _self.detail.if_trial,
                    trialPerformance: _self.detail.trial_performance,
                    employeesStatus: _self.detail.employees_status,
                    highestEducation: _self.detail.highest_education,
                    provinceId: _self.detail.province_id[0],
                    cityId: _self.detail.province_id[1],
                    departId: _self.detail.depart_id[(_self.detail.depart_id.length)-1],
                    position: _self.detail.position,
                    contractPeriod: _self.detail.contract_period,
                    positiveDate: DateFormat(_self.detail.positive_date),
                    positiveSalary: _self.detail.positive_salary,
                    idCard: _self.detail.id_card,
                    profession: _self.detail.profession,
                    ifEmployeeHandbook: _self.detail.if_employee_handbook,
                    positivePerformance: _self.detail.positive_performance,
                    sex: _self.detail.sex,
                    birthday: DateFormat(_self.detail.birthday),
                    graduatedSchool: _self.detail.graduated_school,
                    graduationDate: DateFormat(_self.detail.graduation_date),
                    remark: _self.detail.remark,
                    files: _self.detail.files,
                }
                function success(res){
                    _self.$bus.emit("UPDATE_INFO",true)
                    _self.clear()
                    _self.openDetail = false
                    _self.loading = false
                }

                function fail(err){

                }
                this.$Post(url, config, success, fail)
            },
            modify(){
                let _self = this;
                _self.loading = true;
                let url = `api/system/employee/update`;
                let config = {
                    id:_self.detail.id,
                    name: _self.detail.name,
                    email:_self.detail.email,
                    inductionDate: DateFormat(_self.detail.induction_date),
                    ifLaborContract:parseInt(_self.detail.if_labor_contract),
                    trialSalary:_self.detail.trial_salary,
                    tel:_self.detail.tel,
                    maritalStatus: parseInt(_self.detail.marital_status),
                    bankAccount:_self.detail.bank_account,
                    bankAddress:_self.detail.bank_address,
                    ifTrial: parseInt(_self.detail.if_trial),
                    trialPerformance: _self.detail.trial_performance,
                    employeesStatus: parseInt(_self.detail.employees_status),
                    highestEducation: _self.detail.highest_education,
                    provinceId: _self.detail.province_id[0],
                    cityId: _self.detail.province_id[1],
                    departId: _self.detail.depart_id[(_self.detail.depart_id.length)-1],
                    position: _self.detail.position,
                    contractPeriod: _self.detail.contract_period,
                    positiveDate: DateFormat(_self.detail.positive_date),
                    positiveSalary: _self.detail.positive_salary,
                    idCard: _self.detail.id_card,
                    profession: _self.detail.profession,
                    ifEmployeeHandbook: parseInt(_self.detail.if_employee_handbook),
                    positivePerformance: _self.detail.positive_performance,
                    sex: _self.detail.sex,
                    birthday: DateFormat(_self.detail.birthday),
                    graduatedSchool: _self.detail.graduated_school,
                    graduationDate: DateFormat(_self.detail.graduation_date),
                    remark: _self.detail.remark,
                    files: _self.detail.files,
                }
                function success(res){
                    _self.$bus.emit("UPDATE_INFO",true)
                    _self.clear()
                    _self.openDetail = false
                    _self.loading = false
                }

                function fail(err){

                }
                this.$Post(url, config, success, fail)
            },
            edit(name){
                this.$refs[name].validate( async (valid) => {
                    if (valid) {
                        if (this.file.length) {
                            let arr = []
                            for (let i=0;i<this.file.length;i++) {
                                arr.push(this.uploadImg(i))
                            }
                            const resp = await Promise.all(arr)
                            this.detail.files = resp.concat(this.beginImgList).toString()
                            console.log(this.detail.files)
                            this.modify()
                        }else {
                            this.detail.files = this.beginImgList.toString()
                            this.modify()
                        }
                    }else {
                        this.$Message.error('请正确填写选项!');
                    }
                })
            },
            clear(){
                this.detail = {
                    name:"",
                        email:"",
                        induction_date:"",
                        if_labor_contract:"0",
                        trial_salary:"",
                        tel:"",
                        marital_status:"1",
                        bank_account:"",
                        bank_address:"",
                        induction_year_month:"",
                        if_trial:"0",
                        trial_performance:"",
                        employees_status:"0",
                        highest_education:"",
                        province_id:"",
                        city_id:"",
                        depart_id:"",
                        contract_period:"",
                        positive_date:"",
                        positive_salary:"",
                        id_card:"",
                        profession:"",
                        position:"",
                        sex:"",
                        if_employee_handbook:"0",
                        positive_performance:"",
                        birthday:"",
                        graduated_school:"",
                        graduation_date:"",
                        remark:"",
                        files:""
                }
                this.file = []
                this.srcList = []
            },
            handleUpload(file) {
                let self = this
                self.file.push(file);
                console.log(self.file)
                self.srcList = []
                for (let i=0;i<self.file.length;i++){
                    let files = self.file[i]
                    if (!event || !window.FileReader) return
                    let reader = new FileReader();
                    reader.readAsDataURL(files)
                    reader.onloadend = function () {
                        self.srcList.push(this.result);
                    }
                }

                return false;
            },
             uploadImg(i) {
                return new Promise((resolve,reject)=>{
                    let url = "/api/zuul/system/simple/img/upload";

                    let formdata = new FormData();
                    // formdata.append('files', _self.fileArray[i],"file_"+Date.parse(new Date())+".jpg")
                    formdata.append("file", this.file[i]);

                    const success = (res) => {
                        resolve(JSON.parse(res.data.data).realpath)
                    }

                    const fail= (err)=> {
                        this.loading = false;
                        reject()
                    }

                    this.$Post(url, formdata, success, fail);
                })

                _self.loading = true;
                //   _self.$ButtonCollect("marketingManagement_index_followUp_submit");

            },
            fileRemove(e) {
                this.file.splice(this.file.indexOf(e), 1);
                this.srcList.splice(this.srcList.indexOf(e), 1);
            },
            remove(e){
                this.beginImgList.splice(this.beginImgList.indexOf(e), 1)
            }
        },
        created() {
            this.$bus.off("ADD_EMPLOY_INFO",true)
            this.$bus.on("ADD_EMPLOY_INFO",e=>{
                this.openDetail = true
                this.showEdit = false
                this.showSave = true
                this.readonly = false
                this.title = "新增员工"
                this.clear()
            })
            this.$bus.off("SHOW_EMPLOY_INFO",true)
            this.$bus.on("SHOW_EMPLOY_INFO",e=>{
                console.log(e)
                this.openDetail = true
                this.showEdit = false
                this.showSave = false
                this.readonly = true
                this.title = "查看"
                this.detail = JSON.parse(JSON.stringify(e))
                let arr = []
                arr.push(e.province_id,e.city_id)
                this.detail.province_id = arr
                this.detail.depart_id = this.getNodeParent(this.departData,e.depart_id)
                console.log(this.detail.depart_id)
                this.beginImgList = e.files.split(",")
                if (!this.beginImgList[0]) {
                    this.beginImgList = []
                }
                this.detailRule = {}
                this.detailRule = {
                    name: [
                        { required: true, message: '请输入姓名！', trigger: 'blur' },
                    ],
                    email: [
                        { type: 'email', message: '邮箱格斯不对！', trigger: 'blur' }
                    ],
                    tel: [
                        {  validator: this.validateTel, message: '电话号码格式不对！', trigger: 'blur' },
                    ],
                    id_card: [
                        { validator: this.validateIdCard, message: '身份证格式不对！', trigger: 'blur' }
                    ],
                    bank_account: [
                        { validator: this.validateBank, message: '银行卡号格式不对', trigger: 'blur' }
                    ]
                }
            })
            this.$bus.off("EDIT_EMPLOY_INFO",true)
            this.$bus.on("EDIT_EMPLOY_INFO",e=>{
                this.openDetail = true
                this.showEdit = true
                this.showSave = false
                this.readonly = false
                this.title = "修改信息"
                this.detail = JSON.parse(JSON.stringify(e))
                let arr = []
                arr.push(e.province_id,e.city_id)
                this.detail.province_id = arr
                this.detail.depart_id = this.getNodeParent(this.departData,e.depart_id)
                this.beginImgList = e.files.split(",")
                if (!this.beginImgList[0]) {
                    this.beginImgList = []
                }
                console.log(this.beginImgList)
                this.detailRule = {}
                this.detailRule = {
                    name: [
                        { required: true, message: '请输入姓名！', trigger: 'blur' },
                    ],
                    email: [
                        { type: 'email', message: '邮箱格斯不对！', trigger: 'blur' }
                    ],
                    tel: [
                        {  validator: this.validateTel, message: '电话号码格式不对！', trigger: 'blur' },
                    ],
                    id_card: [
                        { validator: this.validateIdCard, message: '身份证格式不对！', trigger: 'blur' }
                    ],
                    bank_account: [
                        { validator: this.validateBank, message: '银行卡号格式不对', trigger: 'blur' }
                    ]
                }
            })
        }
    }
</script>

<style>
.common{
    width: 148px;
    height: 148px;
    border: 1px solid #d8d8d9;
}
</style>