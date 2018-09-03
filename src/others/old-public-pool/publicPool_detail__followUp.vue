<template>
    <div>
        <!--<Button type="ghost" shape="circle" icon="plus" @click="getSelectOptons();modal33 = true">新增</Button>-->
        <Timeline style="margin-top: 15px">
            <TimelineItem color="blue" v-for="(item,index) in items" :key=index>
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
                        <Col span="4">
                        <P style="line-height: 32px;">跟进类型： <span>{{ item.followTypeName }}</span></P>
                        </Col>
                        <Col span="17">
                        <P style="line-height: 32px;text-align: right">{{ item.createDate }}</P>
                        </Col>
                    </Row>
                    <Row>
                        <B style="line-height: 32px;">{{ item.companyName }}</B>
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
                                <Input v-model="pinglun" type="textarea" :autosize="true" placeholder="请输入您要评价的内容"/>
                                </Col>
                                <Col span="2">
                                <Button style="float: right" type="primary" @click="send(item.bussinessId)">评价</Button>
                                </Col>
                            </Row>
                        </Div>
                    </Div>
                    <Row>
                        <div style="float: right">
                            <Button type="primary" shape="circle" v-for="(item2,index) in itemss" :key=index 
                                    v-if="(item2.buttonsZt == '0') && (item.serviceId == item2.serviceId)">
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
        </Timeline>
        <Modal
                v-model="modal33"
                title="新增跟进"
                @on-ok="upload('formValidate')"
                @on-cancel="cancel">
            <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="80">
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="公司名称" prop="companyId">
                        <Select transfer v-model="formValidate.companyId" size="small">
                            <Option v-for="item in companynameArray" :value="item.id" :key="item.id">{{ item.companyname
                                }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="跟进类型" prop="followUpType">
                        <Select transfer v-model="formValidate.followUpType" size="small">
                            <Option value="11">电话</Option>
                            <Option value="12">QQ</Option>
                            <Option value="13">微信</Option>
                            <Option value="14">拜访</Option>
                            <Option value="15">其他</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <FormItem label="跟进记录" prop="content">
                    <Input size="small" type="textarea" v-model="formValidate.content"/>
                </FormItem>
                <FormItem label="沟通证据">
                    <Upload
                            ref="upload"
                            multiple
                            :before-upload="handleUpload"
                            action="//jsonplaceholder.typicode.com/posts/">
                        <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
                    </Upload>
                    <div v-for="(item,index) in file" :key=index>{{ item.name }}
                        <Button type="text" @click="fileRemove(item)">移除</Button>
                    </div>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>

    export default {
        props: ['customerId2'],
        data() {
            return {
                file: [],
                companynameArray: [],
                modal33: false,
                items: [],
                bb: [],
                chats: [],
                itemss: [],
                formValidate: {
                    customerId: this.customerId2,
                    companyId: '',
                    followUpType: '',
                    content: '',
                    attIds: ''
                },
                ruleValidate: {}
            }
        },
        methods: {
            /*************************打开相对应的DIV********************************/
            openEvaluate(a) {
                $('#' + a + '').toggle()
            },

            /*************************提交评价********************************/
            send(a) {
                var _self = this
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
                        html = "<div class='bubbleItem' style='font-size: 10px'><span class='bubble rightBubble'><span>XXX</span>&emsp;&emsp;&emsp;<span style='float: right'>" + myDate.toLocaleString() + "</span><br><span>" + _self.pinglun + "</span><span class='bottomLevel'></span><span class='topLevel'></span></span></div>"
                        $('#' + a + '').append(html)
                    }
                    _self.pinglun = '';
                }

                this.PostData(url, data, doSuccess)
            },

            /*************************初始化数据********************************/
            openEdi() {
                var _self = this
                _self.bb = []
                _self.itemss = []
                _self.chats = []
                _self.items = []
                var url = '/customer/findCustomerContentById/' + _self.customerId2

                function doSuccess(response) {
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
                        a.ranks = ''

                        if (response.data.data[i].imgurls) {
                            var d1 = response.data.data[i].imgurls.split(',')
                            for (var j = 0; j < d1.length; j++) {
                                var d = {}
                                d.serviceId = response.data.data[i].serviceId
                                d.imgurl = 'http://192.168.0.127:9000/assets/' + d1[j].split('``')[1]
                                _self.bb.push(d)
                            }
                        }

                        if (response.data.data[i].buttons) {
                            var a1 = response.data.data[i].buttons.split(',')
                            for (var j = 0; j < a1.length; j++) {
                                var b = {}
                                b.serviceId = response.data.data[i].serviceId
                                b.buttonsZt = a1[j].split('``')[3]
                                b.buttonText = a1[j].split('``')[1]
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
                }
                this.GetData(url, doSuccess)
            },

           /* /!*************************获取下拉框的值********************************!/
            getSelectOptons() {
                var _self = this
                var url = '/customer/findCompanysByCustomerId/' + +_self.customerid

                function doSuccess(response) {
                    for (var i = 0; i < response.data.data.length; i++) {
                        var a = {}
                        a.id = response.data.data[i].id
                        a.companyname = response.data.data[i].companyname
                        _self.companynameArray.push(a)
                    }
                }

                this.GetData(url, doSuccess)
            },
*/
            /*************************移除文件********************************/
            fileRemove(e) {
                this.file.splice(this.file.indexOf(e), 1);
            },

            /*************************添加文件********************************/
            handleUpload(file) {
                this.file.push(file)
                return false;
            },

            /*************************新增跟进********************************/
            upload(name) {
                var _self = this
                var url = '/customer/addCustomerContentImg'
                var formdata = new FormData()
                for (var i = 0; i < this.file.length; i++) {
                    formdata.append('files', this.file[i])
                }

                function doSuccess(response) {
                    var a = []
                    for (var i = 0; i < response.data.data.length; i++) {
                        a.push(response.data.data[i].id)
                    }
                    _self.formValidate.attIds = a.toString()
                    _self.uploadCustomerContentNote(name)
                }
                this.PostData(url, formdata, doSuccess)
                /*this.$http({
                    method: 'post',
                    url: '/api/customer/addCustomerContentImg',
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    data: formdata
                })
                    .then(function (response) {
                        if (response.data.msgCode == '40000') {
                            var a = []
                            for (var i = 0; i < response.data.data.length; i++) {
                                a.push(response.data.data[i].id)
                            }
                            _self.formValidate.attIds = a.toString()
                            _self.uploadCustomerContentNote(name)
                        }
                    })*/
                /*                setTimeout(() => {
                                    this.file = [];
                                    this.$Message.success('上传成功！')
                                    this.$refs.c1.getFileList();
                                }, 1500);*/
            },

            /*************************新增跟进记录********************************/
            uploadCustomerContentNote(name) {
                var _self = this

                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var url = '/customer/addCustomerContentNote'

                        function doSuccess(response) {
                            _self.$Message.success('新增成功!')
                            _self.openEdi()
                        }
                        this.PostData(url, _self.formValidate, doSuccess)
                        /* this.$http({
                             method: 'post',
                             url: '/api/customer/addCustomerContentNote',
                             data: _self.formValidate,
                             headers: {'Content-Type': 'application/json'},
                         })
                             .then(function (response) {
                                 if (response.data.msgCode == '40000') {
                                     _self.$Message.success('新增成功!')
                                     _self.openEdi()
                                 }
                             })*/
                    } else {
                    }
                })
            }
        },
        mounted() {
            this.openEdi()
        }
    }
</script>