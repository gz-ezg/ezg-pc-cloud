<template>
    <div>
        <Modal
                v-model="addcontentdetail"
                title="新增跟进"
                width="700"
                @on-cancel="canceladdContent">                 
                </Row>
                <Form ref="addDetailContent" :model="addDetailContent" :label-width="120">
                    <Row :gutter="16">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="20">
                            <FormItem prop="followUpType" label="公司名称：" style="margin-bottom:5px">
                                {{companyInfo.companyname}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="20">
                            <FormItem prop="followUpType" label="归属客户：" style="margin-bottom:5px">
                                {{companyInfo.NAME}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16" v-if="followupshow">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="20">
                            <FormItem prop="followUpType" label="跟进类型：" style="margin-bottom:5px">
                                <Select transfer v-model="addDetailContent.followUpType" size="small">
                                    <Option v-for="item in followTypeText" :value="item.typecode" :key="item.typecode">{{item.typename}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="20">
                            <FormItem prop="content" label="跟进内容：" style="margin-bottom:5px">
                                <Input v-model="addDetailContent.content" type="textarea"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="1" style="visibility:hidden">1</Col>
                            <Col span="20">
                            <FormItem style="margin-bottom:5px" label="沟通证据：">
                                <!-- class="upload_before" -->
                            
                                <Upload
                                        ref="upload"
                                        multiple
                                        :before-upload="handleUpload"
                                        action="/api/customer/addCustomerContentImg"
                                        >
                                    <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
                                </Upload>
                                <!-- <div v-show="warning" style="color:#ed3f14;height:20px;margin-bottom:5px;line-height:20px">请上传附件</div> -->
                                <div v-for="(item,index) in show_file" :key=index>{{ item.name }}
                                    <Button type="text" @click="fileRemove(item)">移除</Button>
                                </div>
                                
                            </FormItem>
                        </Col>
                    </Row>

                </Form>
                <div slot="footer">
                    <!-- <Button type="primary" @click="add_workorder_followup" :loading="followUp_loading">新增</Button> -->
                    <Button type="primary" @click="upload" :loading="followUp_loading">新增</Button>
                    <Button type="ghost" @click="cancel_workorder_followup">重置</Button>                    
                </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            addcontentdetail:{

            },
            
        }
    }
}
</script>
