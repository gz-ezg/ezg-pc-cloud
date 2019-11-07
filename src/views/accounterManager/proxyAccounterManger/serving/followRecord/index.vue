<template>
    <Modal
            title="客户跟进记录"
            v-model="openFollowRecord"
            width="1000"
            @on-cancel="cancel"
            :mask-closable="false"
            class-name="vertical-top-modal"
    >
        <Row>
            <Form ref="addDetailContent" :model="addDetailContent" :label-width="120">
                <Row :gutter="16">
                    <Col span="20">
                        <FormItem prop="followUpType" label="公司名称：" style="margin-bottom:5px">
                            {{companyInfo.companyname}}
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="20">
                        <FormItem prop="followUpType" label="归属客户：" style="margin-bottom:5px">
                            {{companyInfo.NAME}}
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" v-if="followupshow">
                    <Col span="12">
                        <FormItem prop="followUpType" label="跟进类型：" style="margin-bottom:5px">
                            <!-- <Select transfer v-model="addDetailContent.followUpType" size="small" :disabled="followupshow"> -->
                            <Select transfer v-model="addDetailContent.followUpType" size="small">
                                <Option v-for="item in followTypeText" :value="item.typecode" :key="item.typecode">{{item.typename}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="isClue">
                            <Checkbox v-model="isClue">生成线索</Checkbox>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16" v-if="openFinish">
                    <Col span="12">
                        <FormItem label="完成状态" prop="finishFlag">
                            <Select transfer v-model="addDetailContent.finishFlag" size="small">
                                <Option value="Y" >完成</Option>
                                <Option value="N" >未完成</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="20">
                        <FormItem label="通知时间：" prop="date">
                            <Col span="8">
                                <DatePicker transfer type="date" placeholder="选择日期" v-model="addDetailContent.followupdate" size="small"></DatePicker>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="8">
                                <TimePicker transfer type="time" format="HH:mm" placeholder="选择时间" hide-disabled-options :disabled-hours="[0,1,2,3,4,5,6,7]" v-model="addDetailContent.followuptime" size="small"></TimePicker>
                            </Col>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="20">
                        <FormItem prop="content" label="跟进内容：" style="margin-bottom:5px">
                            <Input v-model="addDetailContent.content" type="textarea"></Input>
                        </FormItem>
                    </Col>
                </Row>

                <Row :gutter="16">
                    <Col span="20">
                        <FormItem style="margin-bottom:5px" label="沟通证据：">
                            <!-- class="upload_before" -->
                            <Upload
                                    ref="upload"
                                    multiple
                                    :before-upload="handleUpload"
                                    action="/api/customer/addCustomerContentImg"
                            >
                                <Button type="ghost" icon="ios-cloud-upload-outline" :class="{input_warning:warning}">选择文件</Button>
                            </Upload>
                            <!-- <div v-show="warning" style="color:#ed3f14;height:20px;margin-bottom:5px;line-height:20px">请上传附件</div> -->
                            <div v-for="(item,index) in show_file" :key=index>{{ item.name }}
                                <Button type="text" @click="fileRemove(item)">移除</Button>
                            </div>

                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                        <FormItem label="通知用户" prop="customerTags" style="margin-bottom:10px">
                            <Select v-model="test" filterable multiple @on-change='t' >
                                <Option v-for="item in user" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <Row>
                <Col :push="3"><Button type="primary" @click="upload" :loading="followUp_loading">新增跟进</Button></Col>
            </Row>
        </Row>
        <Row>
            <Table
                    style="margin-top:15px"
                    height="300"
                    ref="selection"
                    highlight-row
                    size="small"
                    :columns="followUpHeader"
                    :data="followUpData">
            </Table>
        </Row>
    </Modal>
</template>

<script>
    import {yasuo} from "../../../../../libs/img_beforeUpload";

    export default {
        name: "index",
        data(){
            return{
                openFollowRecord:false,
                followupshow:false,
                followUp_loading:false,
                isClue: false,
                openFinish: true,
                warning:false,
                companyId:'',
                show_file:[],
                file_array:[],
                test: [],
                addDetailContent:{
                    followUpType:"",
                    content:"",
                    customerId:"",
                    companyId:"",
                    finishFlag: "",
                    followupdate: "",
                    followuptime: ""
                },
                companyInfo:{
                    companyname: '',
                    NAME: '',
                    serviceaddress: '',
                    TEL: '',
                    cluesource: '',
                    enterprisestatus: '',
                    importlevel: '',
                    financelevel: '',
                    transactiontype: '',
                    bankcode: '',
                    basicbank: '',
                    basicbankcode: '',
                    simplebank: '',
                    type: '',
                    cnumber: '',
                    pnumber: '',
                    cpassword: '',
                    ppassword: ''
                },
                followUpHeader:[
                    {
                        title:'跟进时间',
                        key:'createdate',
                        minWidth:160
                    },
                    {
                        title:'跟进类型',
                        key: 'typename',
                        minWidth:120
                    },
                    {
                        title:'跟进内容',
                        key:'service_content',
                        minWidth: 300,
                        render:(h, params) => {
                            // console.log(params)
                            if(params.row.service_content == ''||params.row.service_content == null){
                                return ''
                            }else if(params.row.service_content.length>20){
                                return h('Poptip',{
                                    props:{
                                        trigger:'hover',
                                        placement:'bottom'
                                    }
                                },[

                                    h('span',params.row.service_content.slice(0,20)+'...'),
                                    h('Icon', {
                                        props: {
                                            type: 'arrow-down-b',
                                        }
                                    }),
                                    h('div',{
                                        slot:'content',
                                        style:{
                                            width:'250px',
                                        }
                                    },[
                                        h('span', params.row.service_content)
                                    ])
                                ])
                            }else{
                                return h('span', params.row.service_content)
                            }
                        }
                    },
                    {
                        title:'跟进人',
                        key:'realname',
                        minWidth:100
                    },
                    {
                        title:'完成状态',
                        key:'realname',
                        minWidth:100,
                        render: (h, params) => {
                            if(params.row.finish_flag == 'N'){
                                return h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    on: {
                                        click: ()=>{
                                            this.update_customer_flag(params.row, 'Y')
                                        }
                                    }
                                },"完成")
                            }else if(params.row.finish_flag == 'Y'){
                                return h('div',"完成")
                            }else{
                                return h('div')
                            }
                        }
                    },
                    {
                        title:'操作',
                        key: 'action',
                        fixed: 'right',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.openContent(params)
                                            }
                                        }
                                    }, '[详情]')
                                ]
                            )
                        }
                    }
                ],
                followUpData:[],
            }
        },
        methods:{
            handleUpload(file) {
                this.show_file.push(file)
                let _self = this
                yasuo(file,_self.file_array)
                return false;
            },
            fileRemove(e){
                this.file_array.splice(this.file_array.indexOf(e), 1);
                this.show_file.splice(this.show_file.indexOf(e), 1);
            },
            upload(){
                let _self = this
                _self.followUp_loading = true
                if(_self.file_array.length == 0){
                    _self.add_workorder_followup()
                }else{
                    let formdata = new FormData()
                    for(let i = 0;i<_self.file_array.length;i++){
                        // console.log(_self.file_array[i])
                        formdata.append('files',_self.file_array[i],"file_" + Date.parse(new Date()) + ".jpg")
                    }

                    let url = `/api/customer/addCustomerContentImg`

                    _self.$http.post(url,formdata).then(function(res){
                        // console.log(res.data.msgCode)
                        if(res.data.msgCode == "40000"){
                            let temp = []
                            for(let j = 0;j<res.data.data.length;j++){
                                temp.push(res.data.data[j].id)
                            }
                            _self.attIds = temp.toString()
                            _self.add_workorder_followup()
                        }else{
                            _self.followUp_loading = false
                            _self.$Message.error("新增错误！")
                        }
                    }).catch(function(err){
                        _self.followUp_loading = false
                        _self.$Message.error("网络异常！")

                    })
                }
            },
            add_workorder_followup(){
                let url =  `api/customer/addCustomerContentNote`
                let _self = this
                let config = {
                    content: _self.addDetailContent.content,
                    customerId: _self.companyInfo.customerid,
                    companyId:_self.companyInfo.id,
                    followUpType: _self.addDetailContent.followUpType,
                    attIds:_self.attIds,
                    finishFlag: _self.addDetailContent.finishFlag,
                    notifyDate: (DateFormat(_self.addDetailContent.followupdate) + ' ' + _self.addDetailContent.followuptime),
                    notify_ids: _self.notify_ids
                }
                function success(res){
                    if(_self.isClue){
                        _self.create_clue()
                    }else{
                        _self.getData()
                        _self.cancel_workorder_followup()
                        _self.addcontentdetail = false
                        _self.followUp_loading = false
                    }
                }
                function fail(res){
                    _self.followUp_loading = false
                }
                this.$Post(url, config, success, fail)
            },
            create_clue(){
                let url =  `api/customer/addCustomerContentNote`
                let _self = this
                let config = {
                    content: _self.addDetailContent.content,
                    customerId: _self.companyInfo.customerid,
                    companyId:_self.companyInfo.id,
                    followUpType: "20",
                }
                function success(res){
                    _self.getData()
                    _self.cancel_workorder_followup()
                    _self.addcontentdetail = false
                    _self.followUp_loading = false
                    _self.isClue = false
                }
                function fail(res){
                    _self.followUp_loading = false
                }
                this.$Post(url, config, success, fail)
            },
            cancel_workorder_followup(){
                this.addDetailContent.content = ""
                this.addDetailContent.followUpType = ""
                this.show_file = ""
                this.file_array = ""
            },
            getData() {
                let _self = this
                let url = 'api/customer/company/detail'
                let config = {
                    params:{
                        id:_self.companyId,
                        detailTypes:"basic,customerRecord"
                    }
                }
                function success(res) {
                    _self.companyInfo = res.data.data.basic.length != 0 ? res.data.data.basic[0] : {}
                    _self.followUpData = res.data.data.customerRecord
                    _self.openFollowRecord=true
                }

                function fail(err){
                    _self.$Message.error("对不起，当前查询的公司有误！请确认后重试！窗口将在2秒后关闭！")
                    _self.cancel()
                }
                this.$Get(url, config, success, fail)
                // this.GetData(url, doSuccess)
            },
            cancel(){
                this.openFollowRecord = false
            }
        },
        created() {
            this.$bus.off("OPEN_FOLLOW_RECORD",true)
            this.$bus.on("OPEN_FOLLOW_RECORD",(e)=>{
                this.companyId = e.company_id
                this.getData()
            })
        }
    }
</script>

<style lang="less">
.vertical-top-modal{
    .ivu-modal{
        top: 0;
    }
}
</style>