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
                
                <FormItem label="跟进记录" prop="content" style="margin-bottom:20px">
                    <Input size="small" type="textarea" v-model="formValidate.content"/>
                </FormItem>
                <!-- <FormItem label="事件通知时间" prop="date" style="margin-top:20px;margin-bottom:20px">
                    <Row>
                        <Col span="11">
                            <DatePicker transfer type="date" placeholder="选择日期" v-model="formValidate.followupdate"></DatePicker>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <TimePicker  transfer type="time" placeholder="选择时间" hide-disabled-options :disabled-hours="[0,1,2,3,4,5,6,7]" v-model="formValidate.followuptime"></TimePicker>
                        </Col>
                    </Row>
                </FormItem> -->
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
                <FormItem>
                    <Button name="marketingManagement_index_followUp_submit" type="primary" @click="submit" :loading="loading">提交</Button>
                    <Button type="ghost" @click="cancel" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import { yasuo } from '../../../../../libs/img_beforeUpload'

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
            openFollowCreate: false,
            formValidate: {
                companyId: "",
                followResult: "",
                followUpType: "",
                content: "",
                attIds: "",
                customerId: this.customer.ID
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
            companynameArray: []
        }
    },
    methods: {
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
                customerId: _self.formValidate.customerId
            }

            function success(res){
                _self.loading = false
                _self.openFollowCreate = false
                _self.$emit("update", _self.customer.ID)
            }

            function fail(err){
                _self.loading = false
            }

            this.$Post(url, config, success, fail)
        }
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
