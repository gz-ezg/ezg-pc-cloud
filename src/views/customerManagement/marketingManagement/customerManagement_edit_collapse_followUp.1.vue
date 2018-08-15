<template>
    <div @click="show11111">
        <Spin size="small" fix v-if="spinShow"></Spin>
        <!-- <div style="width:100%;height:30px;background-color:yellow;margin-top:-10px"></div> -->
        <Button type="ghost" shape="circle" icon="plus" @click="getSelectOptons();modal33 = true">新增</Button>
        <Checkbox v-model="single" style="float:right" @on-change="single_check_change">只看市场跟进</Checkbox>


            <div  style="max-height:500px;overflow:hidden" class="wrapper" ref="wrapper">
                <Timeline style="margin-top: 15px">
                    <div class="content">
                        <TimelineItem color="blue" v-for="(item,index) in items" :key="index" >
                        <Icon v-if="item.followType == '11'" type="ios-telephone" slot="dot"></Icon>
                        <Icon v-if="item.followType == '12'" type="ios-chatbubble" slot="dot"></Icon>
                        <Icon v-if="item.followType == '13'" type="chatbubbles" slot="dot"></Icon>
                        <Icon v-if="item.followType == '14'" type="android-contacts" slot="dot"></Icon>
                        <Icon v-if="item.followType == '15'" type="gear-b" slot="dot"></Icon>
                        <Icon v-if="item.followType == '16'" type="android-hangout" slot="dot"></Icon>
                        <Icon v-if="item.followType == '17'" type="social-buffer" slot="dot"></Icon>
                        <Icon v-if="item.followType == '18'" type="social-bitcoin" slot="dot"></Icon>
                        <Icon v-if="item.followType == '19'" type="ios-lightbulb" slot="dot"></Icon>
                        <Icon v-if="item.followType == '20'" type="android-wifi" slot="dot"></Icon>
                        <Card>
                            <Row>
                                <Col span="1">
                                <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
                                </Col>
                                <Col span="2">
                                <B style="line-height: 32px;">{{ item.userName }}</B>
                                </Col>
                                <Col span="6">
                                <P style="line-height: 32px;">跟进类型： <span>{{ item.followTypeName }}</span></P>
                                </Col>
                                <Col span="15">
                                <P style="line-height: 32px;text-align: right">{{ item.createDate }}</P>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12"><B style="line-height: 32px;"><span style="visibility:hidden">-</span>{{ item.companyName }}</B></Col>
                                <Col span="12"><P style="text-align:right;line-height: 32px;">通知时间：{{item.createDate}}</P></Col>
                            </Row>
                            <Row>
                                <P>{{ item.serviceContent }}</P>
                            </Row>
                            <Row v-if="(item.imgurls) &amp;&amp; (item.serviceId == b.serviceId)" v-for="(b,index) in bb" :key=index>
                                <A target="_blank" :href="b.imgurl"> <img :src="b.imgurl" alt="Ballade" style="width: 100px"/>
                                </A>
                            </Row>
                            <Div v-if="(item.followType == '11') || (item.followType == '12') || (item.followType == '13')">
                                <Row>
                                    <Button type="ghost" @click="openEvaluate(item.serviceId)">评价（{{ item.num }}）</Button>
                                    <Rate style="float: right" allow-half v-model="item.ranks"></Rate>
                                </Row>
                                <Div style="display: none" :id="item.serviceId">
                                    <Div :id="item.bussinessId">
                                        <Row>
                                            <Div class="bubbleItem" style="font-size: 10px" v-for="(chat,index) in chats" :key=index
                                                v-if="(item.serviceId == chat.serviceId)">
                                                <!-- 左尖角对话框 -->
                                                <Img src=""
                                                    style="width: 35px;border-radius: 45px;margin-top: 20px;margin-bottom: 25px"/>
                                                <Span class="bubble leftBubble"> <span>{{ chat.name }}</span>    <span
                                                        style="float: right">{{ chat.date }}</span><br/> <span>{{ chat.content
                                                    }}</span> <span class="bottomLevel"></span> <span class="topLevel"></span> </Span>
                                            </Div>
                                        </Row>
                                    </Div>
                                    <Row style="margin-top: 1%">
                                        <Col span="22">
                                        <Input v-model="pinglun" type="textarea" :autosize="true" placeholder="请输入您要评价的内容" :key="index"/>
                                        </Col>
                                        <Col span="2">
                                        <Button style="float: right" type="primary" @click="send(item.bussinessId,index)">评价</Button>
                                        </Col>
                                    </Row>
                                </Div>
                            </Div>
                            <Row>
                                <div style="float: right">
                                    <Button type="primary" shape="circle" v-for="(item2,index) in itemss" :key=index
                                            v-if="(item2.buttonsZt == '0') && (item.serviceId == item2.serviceId)" @click="detail_show(item2)">
                                        {{ item2.buttonText }}
                                    </Button>
                                    <Button disabled shape="circle" v-for="(item2,index) in itemss" :key=index
                                            v-if="(item2.buttonsZt == '1') && (item.serviceId == item2.serviceId)">
                                        {{ item2.buttonText }}
                                    </Button>
                                </div>
                            </Row>
                        </Card>
                    </TimelineItem>
                    <div><center style="padding-bottom:30px">没有更多数据了！</center></div>
                    </div>
                    
                </Timeline>
            
        </div>
        <Modal
                v-model="modal33"
                title="新增跟进"
                :loading="loading"
                @on-visible-change="cancel"
                :mask-closable="false"                
        >
            <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="120">
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem prop="companyId" >
                        <div slot="label" >公司名称</div>
                        <Select transfer v-model="formValidate.companyId" size="small">
                            <Option v-for="item in companynameArray" :value="item.id" :key="item.id">
                                {{ item.companyname}}
                            </Option>
                        </Select>
                        <!-- <div v-show="warning2" style="color:#ed3f14;height:18px;line-height:18px;font-size:12px;vertical-align:bottom">
                            <div style="height:12px;padding-top:4px">请输入公司名称</div>
                        </div> -->
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="跟进类型" prop="followUpType">
                        <Select transfer v-model="formValidate.followUpType" size="small">
                            <Option v-for="item in followTypeText" :value="item.typecode" :key="item.typecode">{{item.typename}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <FormItem label="跟进记录" prop="content" style="margin-top:20px;margin-bottom:20px">
                    <Input size="small" type="textarea" v-model="formValidate.content"/>
                </FormItem>
                <FormItem label="事件通知时间" prop="date" style="margin-top:20px;margin-bottom:20px">
                    <Row>
                        <Col span="11">
                            <DatePicker transfer type="date" placeholder="选择日期" v-model="formValidate.followupdate"></DatePicker>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <TimePicker  transfer type="time" placeholder="选择时间" hide-disabled-options :disabled-hours="[0,1,2,3,4,5,6,7]" v-model="formValidate.followuptime"></TimePicker>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem style="margin-bottom:20px">
                    <!-- class="upload_before" -->
                    <div slot="label">沟通证据</div>
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
                <FormItem>
                    <Button type="primary" @click="upload('formValidate')" :loading="image_loading">提交</Button>
                    <Button type="ghost" @click="cancel('formValidate')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>
        <Modal
                v-model="huifang_detail"
                title="回访详情"
                width="600"
            >
                <Form ref="huifangValidate" :model="huifangValidate" :label-width="110" style="margin:20px">
                    <Row>
                        <Col :span="12">
                            <FormItem label="责任部门：" prop="depart" style="margin-bottom:10px">
                                <Input v-model="huifangValidate.depart" readonly></Input>
                            </FormItem>
                        </Col>
                        <Col :span="12">
                            <FormItem label="责任人：" prop="marketer" style="margin-bottom:10px">
                                <Input v-model="huifangValidate.marketer" readonly></Input>
                            </FormItem>
                        </Col>
                    </Row>          
                    <Row>
                        <Col :span="12">
                            <FormItem label="服务评分：" prop="companyname" style="margin-bottom:10px">
                                <Input v-model="huifangValidate.companyname" readonly></Input>
                            </FormItem>
                        </Col>
                        <Col :span="12">
                            <FormItem label="服务产品:" prop="productid" style="margin-bottom:15px">
                                <Input v-model="huifangValidate.productid" readonly></Input>
                            </FormItem>
                        </Col>
                    </Row> 
                    <FormItem label="服务评价：" prop="legalrepresentative" style="margin-bottom:15px">
                        <Input v-model="huifangValidate.legalrepresentative" type="textarea" readonly :rows="4" ></Input>
                    </FormItem>
                    <FormItem label="原因及措施：" prop="importlevel" style="margin-bottom:15px">
                        <Input v-model="huifangValidate.createby" readonly type="textarea" :rows="4" ></Input>
                    </FormItem>
                </Form>
                <div slot="footer"></div>
            </Modal>
        
    </div>
</template>

<script>
import {FULLDateFormat} from './utils'
import Bus from '../../../components/bus'
import Bscroll from 'better-scroll'

    export default {
        

        props: ['customerid'],
        data() {
            return {
                spinShow:false,
                onlymarket:false,
                warning2:false,
                huifang_detail:false,
                single:'',
                image_loading:false,
                pinglun:'',
                warning:false,
                file: [],
                show_file:[],
                companynameArray: [],
                modal33: false,
                loading: true,
                items: [],
                bb: [],
                chats: [],
                itemss: [],
                followTypeText:[],
                formValidate: {
                    customerId: this.customerid,
                    companyId: '',
                    followUpType: '',
                    content: '',
                    attIds: '',
                    // followupdate:"",
                    // followuptime:""
                },
                huifangValidate:{

                },
                ruleValidate: {
                    // companyId:[
                    //     {  required: true, trigger: 'change', message: '公司名为必须' }
                    // ],
                    content:[
                        {   required:true,trigger:'blur',message:'跟进记录内容为必须'}
                    ],
                    followUpType:[{
                        required:true,trigger:'blur',message:'跟进类型为必须'
                    }]
            }
        }},
        methods: {
            show11111(){
                this.scroll.refresh()
            },
            detail_show(e){
                var _self = this
                if(e.buttonText == "查看详情"){
                    this.huifang_detail = true;
                    var url = 'api'+ e.buttonsdetail
                    _self.$http.get(url).then(function(res){
                    // console.log(res)
                })
                }else{
                    var url = 'api' + e.buttonsdetail
                    _self.$http.get(url).then(function(res){
                        // console.log(res)
                        if(res.data.msgCode==40000){
                            _self.$Message.success('接收成功')
                            _self.openEdi()
                        }else{
                            _self.$Message.error('接收失败')
                        }

                    })
                }
                

            },
            /*************************打开相对应的DIV********************************/
            openEvaluate(a) {
                $('#' + a + '').toggle()
            },

            /*************************提交评价********************************/
            send(a,index) {
                var _self = this
                // console.log(a)
                // console.log(index)
                for (var i = 0; i < _self.items.length; i++) {
                    if (_self.items[i].bussinessId == a) {
                        ranks = _self.items[i].ranks * 10

                    }
                }
                var url = '/customer/addErevaluate'
                var data = {
                    bussinessid: a,
                    evaluatecontent: _self.pinglun,
                    serviceranks: ranks
                }
                var ranks = ''
                var html = ''
                var myDate = new Date();
                var mytime = myDate.toLocaleTimeString()

                function doSuccess(response) {
                    if (_self.pinglun != '') {
                        // console.log('11111')
                        html = "<div class='bubbleItem' style='font-size: 10px'><span class='bubble rightBubble'><span>" + localStorage.getItem('realname') + "</span>&emsp;&emsp;&emsp;<span style='float: right'>" + FULLDateFormat(myDate) + "</span><br><span>" + _self.pinglun + "</span><span class='bottomLevel'></span><span class='topLevel'></span></span></div>"
                        $('#' + a + '').append(html)
                        // console.log('2222')
                    }
                    _self.items[index].num = _self.items[index].num + 1
                    _self.pinglun = '';
                }

                this.PostData(url, data, doSuccess)
            },

            /*************************初始化数据********************************/
            openEdi() {
                var _self = this
                _self.spinShow = true
                _self.bb = []
                _self.itemss = []
                _self.chats = []
                _self.items = []
                if(_self.onlymarket == false){
                    var url = 'api/customer/findCustomerContentById?customerId=' + _self.customerid
                }else{
                    var url = 'api/customer/findCustomerContentById?customerId=' + _self.customerid + '&followUpType=11,12,13,14'
                }
                
                this.$http.get(url).then(function(response){
                    console.log(response)
                    for (var i = 0; i < response.data.data.length; i++) {
                        var a = {}
                        a.createDate = response.data.data[i].createDate
                        a.followType = response.data.data[i].followType
                        a.userName = response.data.data[i].userName
                        a.followTypeName = response.data.data[i].followTypeName
                        a.companyName = response.data.data[i].companyName
                        a.serviceContent = response.data.data[i].serviceContent
                        a.imgurls = response.data.data[i].imgurls
                        a.serviceId = response.data.data[i].serviceId
                        a.bussinessId = response.data.data[i].bussinessId
                        // a.ranks = ''

                        if (response.data.data[i].imgurls) {
                            var d1 = response.data.data[i].imgurls.split(',')
                            for (var j = 0; j < d1.length; j++) {
                                var d = {}
                                d.serviceId = response.data.data[i].serviceId
                                d.imgurl = 'api/assets/' + d1[j].split('``')[1]
                                _self.bb.push(d)
                            }
                        }

                        if (response.data.data[i].buttons) {
                            var a1 = response.data.data[i].buttons.split(',')
                            for (var j = 0; j < a1.length; j++) {
                                var b = {}
                                b.serviceId = response.data.data[i].serviceId
                                b.buttonsZt = a1[j].split('``')[3]
                                b.buttonsdetail = a1[j].split('``')[2]
                                b.buttonText = a1[j].split('``')[1]
                                // console.log(b)
                                _self.itemss.push(b)
                            }
                        }

                        if (response.data.data[i].evaluatecontents != null) {
                            var b1 = response.data.data[i].evaluatecontents.split(',')
                            a.num = b1.length
                            for (var j = 0; j < b1.length; j++) {
                                var c = {}
                                c.length = b1.length
                                c.serviceId = response.data.data[i].serviceId
                                c.content = b1[j].split('``')[3]
                                c.date = b1[j].split('``')[2]
                                c.name = b1[j].split('``')[1]
                                _self.chats.push(c)
                            }
                        } else {
                            a.num = 0
                        }
                        _self.items.push(a)
                    }
                    _self.loading_end()
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
                    _self.$nextTick(() => {
                        // console.log('start')
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
                        _self.scroll.refresh()
                })
                // setTimeout(console.log('11111'),20)
                // setTimeout(_self.scroll.refresh(),100)
                })
            },
                //  32734 可用数据id
                // function doSuccess(response) {

                //     // console.log(response)
                //     for (var i = 0; i < response.data.data.length; i++) {
                //         var a = {}
                //         a.createDate = response.data.data[i].createDate
                //         a.followType = response.data.data[i].followType
                //         a.userName = response.data.data[i].userName
                //         a.followTypeName = response.data.data[i].followTypeName
                //         a.companyName = response.data.data[i].companyName
                //         a.serviceContent = response.data.data[i].serviceContent
                //         a.imgurls = response.data.data[i].imgurls
                //         a.serviceId = response.data.data[i].serviceId
                //         a.bussinessId = response.data.data[i].bussinessId
                //         a.ranks = ''

                //         if (response.data.data[i].imgurls) {
                //             var d1 = response.data.data[i].imgurls.split(',')
                //             for (var j = 0; j < d1.length; j++) {
                //                 var d = {}
                //                 d.serviceId = response.data.data[i].serviceId
                //                 d.imgurl = 'api/assets/' + d1[j].split('``')[1]
                //                 _self.bb.push(d)
                //             }
                //         }

                //         if (response.data.data[i].buttons) {
                //             var a1 = response.data.data[i].buttons.split(',')
                //             for (var j = 0; j < a1.length; j++) {
                //                 var b = {}
                //                 b.serviceId = response.data.data[i].serviceId
                //                 b.buttonsZt = a1[j].split('``')[3]
                //                 b.buttonsdetail = a1[j].split('``')[2]
                //                 b.buttonText = a1[j].split('``')[1]
                //                 // console.log(b)
                //                 _self.itemss.push(b)
                //             }
                //         }

                //         if (response.data.data[i].evaluatecontents != null) {
                //             var b1 = response.data.data[i].evaluatecontents.split(',')
                //             a.num = b1.length
                //             for (var j = 0; j < b1.length; j++) {
                //                 var c = {}
                //                 c.length = b1.length
                //                 c.serviceId = response.data.data[i].serviceId
                //                 c.content = b1[j].split('``')[3]
                //                 c.date = b1[j].split('``')[2]
                //                 c.name = b1[j].split('``')[1]
                //                 _self.chats.push(c)
                //             }
                //         } else {
                //             a.num = 0
                //         }
                //         _self.items.push(a)
                //     }
                //     _self.loading_end()
                //     _self.$nextTick(() => {
                //         console.log('start')
                //         _self.scroll = new Bscroll(_self.$refs.wrapper, {
                //             scrollbar:{
                //                 fade: false
                //             },
                //             mouseWheel:{
                //                 speed: 20,
                //                 invert: false,
                //                 easeTime: 300
                //             }
                //         })
                //         // _self.scroll.hasVerticalScroll = true
                //         // _self.scroll.scrollerHeight = 1000
                //         console.log(_self.scroll)
                //     })
                    
                //     // _self.spinShow = false
                //     // setTimeout(_self.scroll = new Bscroll(_self.$refs.wrapper, {
                //     //         scrollbar:{
                //     //             fade: false
                //     //         },
                //     //         mouseWheel:{
                //     //             speed: 20,
                //     //             invert: false,
                //     //             easeTime: 300
                //     //         }
                //     //     }),1000)
                // }

                // this.GetData(url, doSuccess)
                // console.log(_self.chats)
                
                
            // },
            loading_end(){
                let _self = this
                _self.spinShow = false  
                //     setTimeout(_self.scroll = new Bscroll(_self.$refs.wrapper, {
                //             scrollbar:{
                //                 fade: false
                //             },
                //             mouseWheel:{
                //                 speed: 20,
                //                 invert: false,
                //                 easeTime: 300
                //             }
                //         }),console.log(_self.scroll),2000)
            },
            /*************************获取下拉框的值********************************/
            getSelectOptons() {
                var _self = this
                var url = '/customer/findCompanysByCustomerId/' + +_self.customerid
                _self.companynameArray = []
                function doSuccess(response) {
                    // console.log(response)
                    for (var i = 0; i < response.data.data.length; i++) {
                        var a = {}
                        a.id = response.data.data[i].id
                        a.companyname = response.data.data[i].companyname
                        _self.companynameArray.push(a)
                    }
                }

                this.GetData(url, doSuccess)
            },

            /*************************移除文件********************************/
            //@augments移除没有实现
            fileRemove(e) {
                // console.log(e)
                this.file.splice(this.file.indexOf(e), 1);
                this.show_file.splice(this.show_file.indexOf(e), 1);
            },

            /*************************添加文件********************************/
            handleUpload(file) {
                this.show_file.push(file)
                // console.log(file)
                var that = this
                this.yasuo(file,{quality:0.2},function(base64code){
                    var b1 = that.convertBase64UrlToBlob(base64code)
                    that.file.push(b1)

                })
                // console.log(that.file)
                return false;
            },

            convertBase64UrlToBlob(urlData){
            var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type:mime});
            },

            yasuo(file,w,objDiv){
                var that = this
                var ready = new FileReader()
                ready.readAsDataURL(file)
                ready.onload = function(){
                    var re = this.result
                    that.canvasDataURL(re, w, objDiv)
                }
            },

            canvasDataURL(path, obj, callback){
                var that = this
                var img = new Image()
                img.src = path;
                img.onload = function(){
                    var canvas = document.createElement('canvas')
                    var ctx = canvas.getContext('2d')
                    canvas.width = 800
                    canvas.height = 600
                    ctx.drawImage(this,0,0,800,600)
                    var base64 = canvas.toDataURL('image/jpeg',0.7)
                    callback(base64)
                }
            },

            /*************************新增跟进********************************/
            upload(name) {
                this.image_loading = true

                var _self = this
                
                // var formdata = new FormData()
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(_self.file.length == 0){
                            // if(_self.file.length == 0){
                            //     _self.warning = true;
                            // }else{
                            //     _self.warning = false
                            // }
                            // if(_self.formValidate.companyId ==''){
                            //     _self.warning2 = true
                            // }else{
                            //     _self.warning2 = false
                                _self.uploadCustomerContentNote(name)
                            // }
                            
                            _self.loading = false;
                            
                        }else{
                            
                    var formdata = new FormData()
                            
                            for (var i = 0; i < _self.file.length; i++) {
                                // console.log(_self.file[i])
                                // console.log(_self.show_file[i])
                                formdata.append('files', _self.file[i],"file_"+Date.parse(new Date())+".jpg")
                                // console.log(formdata.getAll('files'))
                            }
                                
                                        _self.$http({
                                            method: 'post',
                                            url: '/api/customer/addCustomerContentImg',
                                            // dataType: 'json',
                                            processData: false,
                                            contentType: false,
                                            data: formdata
                                    }).then(function (response) {
                                        // console.log(response)
                                            if (response.data.msgCode == '40000') {
                                                var a = []
                                                for (var i = 0; i < response.data.data.length; i++) {
                                                    a.push(response.data.data[i].id)
                                                }
                                                // console.log('1111')
                                                _self.uploadCustomerContentNote(name)
                                                // _self.$Message.success('上传成功！')
                                                // _self.$refs.formValidate.getFileList();
                                                // console.log(a)
                                                // _self.$refs['formValidate'].resetFields();
                                                _self.formValidate.attIds = a.toString()
                                                // console.log(_self.formValidate.attIds)
                                                
                                            } else {
                                                _self.loading = false;
                                                _self.$Message.error('更新失败!');
                                            }
                                        })
                        }
                    }else {
                        if(this.file.length == 0 || this.formValidate.companyId == ''){
                            // _self.warning = true;
                            _self.loading = false;
                        }
                    }
                   
            

            })
            this.image_loading = false
        },

            /*************************新增跟进记录********************************/
            uploadCustomerContentNote(name) {
                // console.log(name)
                let _self = this
                setTimeout(() => {
                    this.loading = false;
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            // console.log('123')
                            let url = '/customer/addCustomerContentNote'

                            function doSuccess(response) {
                                // console.log(response)
                                _self.$Message.success('新增成功!')
                                _self.openEdi()
                                _self.formValidate.followupdate = ""
                                _self.formValidate.followuptime = ""                              
                                _self.file = []
                                _self.show_file = []
                                _self.modal33 = false
                            }
                            this.PostData(url, _self.formValidate, doSuccess)

                        } else {
                            this.$nextTick(() => {
                                this.loading = true;
                            });
                        }
                    })
                }, 2000);
            },

            /*************************关闭弹窗，重置表单********************************/
            cancel() {
                let _self = this
                this.$refs['formValidate'].resetFields();
                this.warning = false
                this.warning2 = false;
                _self.formValidate.followupdate = ""
                _self.formValidate.followuptime = ""
                // this.formValidate.companyId= ''
                // this.formValidate.followUpType= ''
                // this.formValidate.content= ''
                // this.formValidate.attIds= ''
            },
            isWarn(){
                if(this.formValidate.companyId == ''){
                    this.warning2 = true
                }else{
                    this.warning2 = false
                }
            },
            GetFollowUpType(){
                var _self = this
                _self.followTypeText = []
                // var url  = '/api/dataCenter/system/tsType/queryTsTypeByGroupCodes?groupCodes=follow_up_type'
                // this.$http.get(url).then(function(res){
                //     // _self.followTypeText=res.data.data.follow_up_type
                //     // console.log(_self.followTypeText)
                //     for(let i = 0;i<res.data.data.follow_up_type.length;i++){
                //         var temp={}
                //         if(res.data.data.follow_up_type[i].typecode == 21||res.data.data.follow_up_type[i].typecode == 22){
                //         }else{
                //             temp.typecode=res.data.data.follow_up_type[i].typecode
                //             temp.typename=res.data.data.follow_up_type[i].typename
                //             temp.id=res.data.data.follow_up_type[i].id
                //             _self.followTypeText.push(temp)
                //         }
                //     }
                //     // console.log(_self.followTypeText)
                // })

                function finish(res){
                    for(let i = 0;i<res.data.data.follow_up_type.length;i++){
                        var temp={}
                        if(res.data.data.follow_up_type[i].typecode == 21||res.data.data.follow_up_type[i].typecode == 22){
                        }else{
                            temp.typecode=res.data.data.follow_up_type[i].typecode
                            temp.typename=res.data.data.follow_up_type[i].typename
                            temp.id=res.data.data.follow_up_type[i].id
                            _self.followTypeText.push(temp)
                        }
                    }
                }

                let params = "follow_up_type"

                this.$GetDataCenter(params, finish)
            },
            //  只看市场跟进
            single_check_change(e){
                this.onlymarket = e
                this.openEdi()
            }
        },
        mounted() {
            var _self = this
                       
        },
        created(){
            var _self = this
            this.openEdi()
            this.GetFollowUpType()
            // this.single_check_change()
            
            Bus.$on('followupupdate',(e)=>{
                _self.openEdi()
            })
            Bus.$on('updateorderlist',(e)=>{
                _self.openEdi()
            })
            // _self.scroll.refresh()
        }
    }
</script>

<style>
.input_warning{
    border: 1px solid red
}
.input_warning2{
    border: 1px solid red
}
.upload_before:before{
    content: "*";
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #ed3f14;
}
</style>
