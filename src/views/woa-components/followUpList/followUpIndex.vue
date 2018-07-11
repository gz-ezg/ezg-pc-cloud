<template>
    <div>
        <Modal
            title="客户跟进记录"
            v-model="open_follow_list"
            width="850"
            >
            <Row>
                <Row style="margin-top:10px;margin-bottom:10px;font-size:16px;margin-left:30px">
                    <span>公司名称：{{companyInfo.companyname}}</span>
                    <span style="margin-left:20px">归属客户：{{companyInfo.NAME}}</span>                        
                </Row>
                <Row>
                    <Button type="primary" @click="create_new_followup" style="margin-left:10px">新增跟进记录</Button>
                </Row>
                <Row>
                    <div style="margin-top: 10px;margin-left:10px;margin-right:10px;max-height:450px;overflow:hidden" class="wrapper" ref="wrapper">
                        <div class="content">
                            <Table
                                ref="selection"
                                highlight-row
                                :loading="loading"
                                size="small"
                                :columns="followUpHeader"
                                :data="followUpData">
                            </Table>
                            <Row>
                                <center style="padding-bottom:30px;padding-top:30px">--没有更多记录！--</center>
                            </Row>
                        </div>
                    </div>
                </Row>
            </Row>
        </Modal>
        <Modal
                v-model="contentdetail"
                title="跟进详情"
                width="700"
                @on-cancel="cancelContent">
                <Form ref="detailContent" :model="detailContent" :label-width="120">
                    <Row :gutter="16">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="20">
                            <FormItem prop="typename" label="跟进类型：" style="margin-bottom:5px">
                                {{detailContent.typename}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="20">
                            <FormItem prop="service_content" label="跟进内容：" style="margin-bottom:5px">
                                <div v-html="detailContent.service_content"></div>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="20">
                            <FormItem prop="realname" label="跟进人：" style="margin-bottom:5px">
                                {{detailContent.realname}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="1" style="visibility:hidden">1</Col>
                        <Col span="20">
                            <FormItem prop="createdate" label="跟进时间：" style="margin-bottom:5px">
                                {{detailContent.createdate}}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
        </Modal>
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
import Bscroll from 'better-scroll'
import { yasuo } from '../../../libs/img_beforeUpload'

export default {
    data(){
        return{
            followupshow:false,
            followUp_loading:false,
            show_file:[],
            loading:false,
            open_follow_list:false,
            contentdetail:false,
            addcontentdetail:false,
            followTypeText:[],
            companyInfo:{
                companyname:"",
                NAME:""
            },
            followUpData:[],
            followUpHeader:[
                {
                    title:'跟进时间',
                    key:'createdate',
                    width:160
                },
                {
                    title:'跟进类型',
                    key: 'typename',
                    width:120
                },
                {
                    title:'跟进内容',
                    key:'service_content',
                    width: 300,
                    render:(h, params) => {
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
                    width:100
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
            detailContent:{
                createdate:"",
                realname:"",
                service_content:"",
                typename:"",
            },
            addDetailContent:{
                followUpType:"",
                content:"",
                customerId:"",
                companyId:""
            },
            companyid:"",
            file_array:[]
        }
    },
    methods:{
        create_new_followup(){
                this.addcontentdetail = true
        },
        cancelContent(){
                this.contentdetail = false
        },
        getData(){
            let _self = this
            _self.loading = true
            let url = 'api/customer/company/detail'
            let config = {
                params:{
                    id:_self.companyid,
                    detailTypes:"customerRecord"
                }
            }
            function success(res){
                _self.followUpData = res.data.data.customerRecord
                _self.loading = false
                _self.$nextTick(() => {
                    _self.scroll = new Bscroll(_self.$refs.wrapper, {
                        scrollbar:{
                            fade: false
                        },
                        mouseWheel:{
                            speed: 20,
                            invert: false,
                            easeTime: 300
                        }
                    })
                })
            }
            this.$Get(url,config,success)
        },

        openContent(e){
            this.detailContent.createdate = e.row.createdate
            this.detailContent.realname = e.row.realname                
            this.detailContent.service_content = e.row.service_content
            this.detailContent.typename = e.row.typename
            this.contentdetail = true
        },
        canceladdContent(){
            this.addDetailContent.followUpType = ""
            this.addDetailContent.content = ""
            this.addcontentdetail = false
        },
        add_workorder_followup(){
            let url =  `api/customer/addCustomerContentNote`
            let _self = this
            let config = {
                content: _self.addDetailContent.content,
                customerId: _self.companyInfo.customerid,
                companyId:_self.companyInfo.id,
                followUpType: _self.addDetailContent.followUpType,
                attIds:_self.attIds
            }
            function success(res){
                _self.getData()
                _self.cancel_workorder_followup()
                _self.addcontentdetail = false
                _self.followUp_loading = false
            }
            function fail(res){                    
                _self.followUp_loading = false
            }
            this.$Post(url, config, success, fail)
            },
        cancel_workorder_followup(){
            this.addDetailContent.content = ""
            this.addDetailContent.followUpType = ""
            this.show_file = []
            this.file_array = []
        },
        GetFollowUpType(){
            var _self = this
            _self.followTypeText = []
            let params = "markert_follow_up_type"
                
                function success(res){
                    for(let i = 0;i<res.data.data.markert_follow_up_type.length;i++){
                        var temp={}
                        if(res.data.data.markert_follow_up_type[i].typecode == 21||res.data.data.markert_follow_up_type[i].typecode == 22){
                        }else{
                            temp.typecode=res.data.data.markert_follow_up_type[i].typecode
                            temp.typename=res.data.data.markert_follow_up_type[i].typename
                            temp.id=res.data.data.markert_follow_up_type[i].id
                            _self.followTypeText.push(temp)
                        }
                    }
                }
                this.$GetDataCenter(params, success)
                
            },
            //  新增跟进记录
            handleUpload(file) {
                this.show_file.push(file)
                var _self = this
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
                            // console.log(res.data.data[])

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
            getRole(){
                let _self = this
                let temp = localStorage.getItem("Main_Role")
                if(temp == "kuaiji" || temp == "shangshi" || temp == "qihua" || temp == "shenji"){
                    _self.followupshow = false
                    switch(temp){
                        case "kuaiji":
                            _self.addDetailContent.followUpType = "18"
                            break;
                        case "shangshi":
                            _self.addDetailContent.followUpType = "17"
                            break;
                        case "qihua":
                            _self.addDetailContent.followUpType = "19"
                            break;
                        case "shenji":
                            _self.addDetailContent.followUpType = "23"
                            break;
                    }
                }else{
                    _self.followupshow = true
                }
            }
    },
    created(){
        let _self = this
        this.getRole()
        this.GetFollowUpType()
        this.$bus.on("global_follow_up_list",(e)=>{
            //  接受方式，公司id，公司名，客户名，客户id
            _self.companyid = e[0]
            _self.companyInfo.companyname = e[1]
            _self.companyInfo.NAME = e[2]
            _self.open_follow_list = true
            _self.companyInfo.id = e[0]
            _self.companyInfo.customerid = e[3]
            _self.getData()
            console.log(e)
        })
    }
}
</script>

