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
                                <Option v-for="item in market_field_type" :value="item.typecode" :key="item.typecode">{{item.typename}}</Option>
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
                        <Button name="marketingManagement_index_followUp_selectfile" type="ghost" icon="ios-cloud-upload-outline" :class="{input_warning:warning}">选择文件</Button>
                    </Upload>
                    <div v-for="(item,index) in show_file" :key=index>{{ item.name }}
                        <Button name="marketingManagement_index_followUp_removefile" type="text" @click="fileRemove(index)">移除</Button>
                    </div>
                </FormItem>
                <FormItem>
                    <Button name="marketingManagement_index_followUp_submit" type="primary" @click="upload" :loading="loading">提交</Button>
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
                content: ""
            },
            ruleValidate: {

            },
            loading: false
        }
    },
    created(){
        let _self = this
        this.$bus.on("OPEN_CUSTOMER_CREATE_FOLLOW_UP", (e)=>{
            _self.openFollowCreate = true
        })
    }
}
</script>
