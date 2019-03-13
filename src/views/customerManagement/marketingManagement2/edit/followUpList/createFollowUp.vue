<template>
    <div>
        <Modal
            v-model="openFollowCreate"
            title="新增跟进"
            :mask-closable="false"                
        >
            <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="120">
                <FormItem prop="companyId" label="公司名称">
                    <Select transfer v-model="formValidate.companyId" size="small">
                        <Option v-for="item in companynameArray" :value="item.id" :key="item.id">{{ item.companyname}}</Option>
                    </Select>
                </FormItem>
                <Row :gutter="16" v-if="followupshow">
                    <Col span="12">
                        <FormItem label="跟进结果" prop="followResult">
                            <Select transfer v-model="formValidate.followResult" size="small">
                                <Option v-for="item in market_status" :value="item.typecode" :key="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="跟进类型" prop="followUpType">
                            <Select transfer v-model="formValidate.followUpType" size="small">
                                <Option v-for="item in followUpType" :value="item.typecode" :key="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" v-if="openFinish">
                    <Col span="12">
                        <FormItem label="完成状态" prop="finishFlag">
                            <Select transfer v-model="formValidate.finishFlag" size="small">
                                <Option value="Y" >完成</Option>
                                <Option value="N" >未完成</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col>
                        <FormItem prop="isClue">
                            <Checkbox v-model="isClue">生成线索</Checkbox>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem label="跟进记录" prop="content" style="margin-bottom:20px">
                    <Input size="small" type="textarea" v-model="formValidate.content"/>
                </FormItem>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem label="通知用户" prop="customerTags" style="margin-bottom:10px">
                            <Select v-model="test" filterable multiple @on-change='t' >
                                <Option v-for="item in user" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem label="通知时间" prop="date" style="margin-top:20px;margin-bottom:20px">
                    <Row>
                        <Col span="11">
                            <DatePicker transfer type="date" placeholder="选择日期" v-model="formValidate.followupdate" size="small"></DatePicker>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <TimePicker transfer type="time" format="HH:mm" placeholder="选择时间" hide-disabled-options :disabled-hours="[0,1,2,3,4,5,6,7]" v-model="formValidate.followuptime" size="small"></TimePicker>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem style="margin-bottom:20px">
                    <div slot="label">沟通证据</div>
                    <Upload
                            ref="upload"
                            multiple
                            :before-upload="handleUpload"
                            action="/api/customer/addCustomerContentImg"
                            >
                        <Button name="marketingManagement_index_followUp_selectfile" type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
                    </Upload>
                    <div v-for="(item,index) in showFile" :key=index>{{ item.name }}
                        <Button name="marketingManagement_index_followUp_removefile" type="text" @click="fileRemove(index)">移除</Button>
                    </div>
                </FormItem>
                <!-- <FormItem>
                    <Button name="marketingManagement_index_followUp_submit" type="primary" @click="submit" :loading="loading">提交</Button>
                    <Button type="ghost" @click="cancel" style="margin-left: 8px">重置</Button>
                </FormItem> -->
            </Form>
            <div slot="footer">
                <Button name="marketingManagement_index_followUp_submit" type="primary" @click="submit" :loading="loading" :disabled="loading">提交</Button>
                <Button type="ghost" @click="cancel" style="margin-left: 8px">重置</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { yasuo } from '../../../../../libs/img_beforeUpload'
import { DateFormat } from '../../../../../libs/utils.js'


export default {
    props:{
        customer: {
            type: [Object, Array, String]
        },
        followUpType: {
            type: [Array]
        }
    },
    data(){
        return {
            openFinish: true,
            openFollowCreate: false,
            formValidate: {
                companyId: "",
                followResult: "",
                followUpType: "",
                content: "",
                attIds: "",
                customerId: this.customer.ID,
                followupdate: "",
                followuptime: "",
                finishFlag: ""
            },
            ruleValidate: {
                content:[
                    {required: true, trigger: 'change',message:'跟进内容必填！'},
                ]
            },
            loading: false,
            followupshow: true,
            showFile: [],
            fileArray: [],
            market_status: [],
            companynameArray: [],
            isClue: false,
            test: [],
            userData: [],
            user: [],
            notify_ids:''
        }
    },
    methods: {
        t(e){
            console.log(e)
            this.notify_ids = ''
            for(let i =0;i<e.length;i++){
                this.notify_ids += e[i] + ','
            }
            this.notify_ids = this.notify_ids.substring(0,this.notify_ids.length-1)
            console.log(this.notify_ids)
        },
        getUserData(){
            let _self = this
            let url = `api/user/list`
            let config = {
                params: {
                    page: 1,
                    pageSize: 1000
                }
            }
            function success(res){
                // console.log(res.data.data.rows)
                _self.userData = res.data.data.rows
                for(let i=0;i<res.data.data.rows.length;i++){
                    _self.user.push({
                        'value': _self.userData[i].id,
                        'label': _self.userData[i].realname
                    })
                }
            }
            this.$Get(url,config,success)
        },
        handleUpload(file) {
            // this.showFile.push(file)
            var _self = this
            // yasuo(file, _self.fileArray)
            // return false;
            console.log(file)
            _self.fileArray.push(file)
            _self.showFile.push(file)
            return false;
        },
        fileRemove(e) {
            this.fileArray.splice(e, 1);
            this.showFile.splice(e, 1);
        },
        get_company_array(e){
            let _self = this
            let url = 'api/customer/findCompanysByCustomerId/' + e
            let config = {}
            function success(res) {
                if(res.data.data.length){
                    _self.formValidate.companyId = res.data.data[0].id
                }
                _self.companynameArray = res.data.data
            }

            this.$Get(url, config, success)
        },
        get_role(){
            let _self = this
            let temp = localStorage.getItem("Main_Role")
            if(temp == "kuaiji" || temp == "shangshi" || temp == "qihua" || temp == "shenji"){
                _self.followupshow = false
                switch(temp){
                    case "kuaiji":
                        _self.formValidate.followUpType = "18"
                        // _self.openFinish = true
                        _self.formValidate.finishFlag = 'N'
                        break;
                    case "shangshi":
                        _self.formValidate.followUpType = "17"
                        break;
                    case "qihua":
                        _self.formValidate.followUpType = "19"
                        break;
                    case "shenji":
                        _self.formValidate.followUpType = "23"
                        break;
                }
            }else{
                _self.followupshow = true
                // _self.openFinish = false
            }
        },
        get_data_center(){
            let _self = this
            let params = "market_status"

            function success(res){
                _self.market_status = res.data.data.market_status
            }
            this.$GetDataCenter(params, success)
        },
        cancel(){
            this.showFile = []
            this.fileArray = []
            this.formValidate.content = ""
        },
        submit(){
            this.loading = true
            this.$refs["formValidate"].validate((valid) => {
                if(valid){
                    if(this.fileArray.length){
                        this.uploadImg()
                    }else{
                        this.uploadNote()
                    }
                }else{
                    this.loading = false
                    return false
                }
            })
        },
        //  可以改写成promise
        uploadImg(){
            let _self = this
            _self.loading = true
            _self.$ButtonCollect("marketingManagement_index_followUp_submit");
            let url = "/api/customer/addCustomerContentImg"

            let formdata = new FormData()

            for(let i = 0;i<_self.fileArray.length;i++){
                // formdata.append('files', _self.fileArray[i],"file_"+Date.parse(new Date())+".jpg")
                formdata.append('files', _self.fileArray[i])
            }

            function success(res){
                let imgCode = []
                for(let j = 0; j<res.data.data.length; j++){
                    imgCode.push(res.data.data[j].id)
                }
                _self.formValidate.attIds = imgCode.toString()
                _self.uploadNote()
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, formdata, success, fail)
        },
        uploadNote(){
            let _self = this
            let url = `api/customer/addCustomerContentNote`

            let config = {
                companyId: _self.formValidate.companyId,
                followResult: _self.formValidate.followResult,
                followUpType: _self.formValidate.followUpType,
                content: _self.formValidate.content,
                attIds: _self.formValidate.attIds,
                customerId: _self.formValidate.customerId,
                finishFlag: _self.formValidate.finishFlag,
                notifyDate: (DateFormat(_self.formValidate.followupdate) + ' ' + _self.formValidate.followuptime),
                // notifyDate: "2018-10-24 13:00"
                notify_ids: _self.notify_ids
            }

            function success(res){
                console.log(res)
                if(_self.isClue){
                    _self.CreateClue()
                }else{
                    setTimeout(()=>{
                        _self.loading = false
                    },300)
                    _self.openFollowCreate = false
                    _self.$emit("update", _self.customer.ID)
                }
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        },
        CreateClue(){
            let _self = this
            let url = `api/customer/addCustomerContentNote`

            let config = {
                companyId: _self.formValidate.companyId,
                followUpType: "20",
                content: _self.formValidate.content,
                attIds: _self.formValidate.attIds,
                customerId: _self.formValidate.customerId,
            }

            function success(res){
                setTimeout(()=>{
                    _self.loading = false
                },300)
                _self.openFollowCreate = false
                _self.$emit("update", _self.customer.ID)
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        }
    },
    created(){
        this.getUserData()
    },
    mounted(){
        let _self = this
        this.get_data_center()
        this.$bus.on("OPEN_CUSTOMER_CREATE_FOLLOW_UP", (e)=>{
            _self.formValidate.content = ""
            _self.get_company_array(this.customer.ID)
            _self.get_role()
            _self.openFollowCreate = true
        })
    }
}
</script>
