<template>
    <div>
        <Row style="height:56px">
            <Row>
                <Button name="marketingManagement_index_followUp_add" type="primary" shape="circle" icon="plus" @click="open_create_followUp">新增</Button>
                <Checkbox v-model="single" style="float:right" @on-change="get_data(customer.ID)">只看市场跟进</Checkbox>
            </Row>
        </Row>
        <Scroll height="500">
            <Spin fix v-if="spinShow">
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>加载跟进记录中...</div>
            </Spin>
            <Timeline style="margin-top: 15px;margin-right:10px">
                <div class="content">
                    <TimelineItem color="blue" v-for="(item, index) in followList" :key="index" >
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
                                <Col span="2">
                                <!-- <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"/> -->
                                    <Avatar icon="person"/>
                                </Col>
                                <Col span="2">
                                    <B style="line-height: 32px;">{{ item.userName }}</B>
                                </Col>
                                <Col span="5">
                                    <P style="line-height: 32px;">跟进类型： <span>{{ item.followTypeName }}</span></P>
                                </Col>
                                <Col span="15">
                                    <P style="line-height: 32px;text-align: right">{{ item.createDate }}</P>
                                </Col>
                            </Row>
                            <!---->
                            <!-- <Row>
                                <Col span="12"><B style="line-height: 32px;"><span style="visibility:hidden">-</span>{{ item.companyName }}</B></Col>
                                <Col span="12"><P style="text-align:right;line-height: 32px;">通知时间：{{item.createDate}}</P></Col>
                            </Row> -->
                            <!-- 外勤详情 -->
                            <Row style="margin-top:5px;margin-bottom:5px">
                                <Col span="20">
                                    <P>{{ item.serviceContent }}</P>
                                </Col>
                                <Col span="4" v-if="item.followType=='22'">
                                    <Button type="primary" @click="open_detail(item.id)" style="float:right">查看详情</Button>
                                </Col>
                                <!-- 跟进内容根据类型新增class类，待客服跟进内容录入 -->
                                <!-- <P :class="{warn:item.followType <= 18 && item.userName== '胡小红', error:item.followType == 18 && item.userName == '管理员' }" >{{ item.serviceContent }}</P> -->
                            </Row>
                            <!-- 图片 -->
                            <Row :gutter="12" v-if="item.imgs">
                                <Row><Tag type="border" color="blue" style='margin-bottom:5px'>点击图标可预览</Tag></Row>
                                <Col v-for="(url_img, imgIndex) in item.imgs" :key=imgIndex span="8" style="max-width:200px">
                                    <Row>
                                        <a target="_blank" :href="url_img.url" v-if="url_img.type == 'doc' || url_img.type == 'docx'">
                                            <img :src="'/api/assets/upload/commonImg/word.png'" alt="word" width="95%"/>
                                        </a>
                                        <a target="_blank" :href="url_img.url" v-else-if="url_img.type == 'xls' || url_img.type == 'xlsx'">
                                            <img :src="'/api/assets/upload/commonImg/excel.png'" alt="excel" width="95%"/>
                                        </a>
                                        <a target="_blank" :href="url_img.url" v-else-if="url_img.type == 'pptx' || url_img.type == 'ppt'">
                                            <img :src="'/api/assets/upload/commonImg/ppt.png'" alt="ppt" width="95%"/>
                                        </a>
                                        <a target="_blank" :href="url_img.url" v-else-if="url_img.type == 'txt'">
                                            <img :src="'/api/assets/upload/commonImg/txt.png'" alt="txt" width="95%"/>
                                        </a>
                                        <a target="_blank" :href="url_img.url" v-else-if="url_img.type == 'pdf'">
                                            <img :src="'/api/assets/upload/commonImg/pdf.jpg'" alt="txt" width="95%"/>
                                        </a>
                                        <a target="_blank" :href="url_img.url" v-else>
                                            <img :src="url_img.url" alt="图片" width="95%" onerror="this.src='/api/assets/upload/commonImg/error.jpg';this.onerror=null"/>
                                        </a>
                                    </Row>
                                    <Row style="margin-bottom:5px"><center><Button type="text" size="small" @click="download(url_img)">下载</Button></center></Row>
                                </Col>
                            </Row>
                            
                            <!-- 评价 -->
                             <Div v-if="(item.followType == '11') || (item.followType == '12') || (item.followType == '13')">
                                <Row>
                                    <Col span="18">
                                        <Button type="ghost" @click="open_evaluate(item.serviceId, index)">评价（{{ item.evaluateNum }}）</Button>
                                    </Col>
                                    <Col span="6">
                                        <Rate style="float: right" allow-half v-model="item.ranks"></Rate>
                                    </Col>
                                </Row>
                                <Div v-if="currentIndex == index" style="margin-top:10px">
                                    <Row>
                                        <Col span="22">
                                            <Input v-model="pinglun[index]" type="textarea" :autosize="true" placeholder="请输入您要评价的内容" :key="index" style="width:99%"/>
                                        </Col>
                                        <Col span="2">
                                            <Button style="float: right" type="primary" @click="send(item.bussinessId,index,item.ranks)">评价</Button>
                                        </Col>
                                    </Row>
                                    <Div>
                                        <Row style="margin-top: 5px">
                                            <Div class="bubbleItem" style="font-size: 10px" v-for="(chat, chatIndex) in item.chat" :key="chatIndex" v-if="(currentIndex == index)">
                                                <!-- 左尖角对话框 -->
                                                <!-- <Img src=""
                                                    style="width: 35px;border-radius: 45px;margin-top: 20px;margin-bottom: 25px"/> -->
                                                <Span class="bubble" :class="[ chat.name == currentName ? 'leftBubble':'rightBubble' ]"> <span>{{ chat.name }}</span>    
                                                <span style="float: right">{{ chat.date }}</span><br/> 
                                                <span>{{ chat.content }}</span> 
                                                <span class="bottomLevel"></span> <span class="topLevel"></span> </Span>
                                            </Div>
                                        </Row>
                                    </Div>
                                </Div>
                            </Div>
                            <!-- 线索按钮 -->
                            <Row v-if="item.buttonDetail">
                                <div style="float: right">
                                    <Button type="primary" shape="circle" v-for="(button, index) in item.buttonDetail" :key=index
                                            :disabled="button.buttonsZt == '1'" @click="lingqu(button)" style="margin-left:5px">
                                        {{ button.buttonText }}
                                    </Button>
                                    <!-- <Button  shape="circle" v-for="(item2,index) in itemss" :key=index
                                            v-if="(item2.buttonsZt == '1') && (item.serviceId == item2.serviceId)">
                                        {{ item2.buttonText }}
                                    </Button> -->
                                </div>
                            </Row>
                        </Card>
                    </TimelineItem>
                    <div><center style="padding-bottom:30px" v-if="footer">没有更多数据了！</center></div>
                    </div>
                </Timeline>
            </Scroll>
            <follow-field></follow-field>
            <follow-create :followUpType="markert_follow_up_type" :customer="customer" @update="get_data"></follow-create>
    </div>
</template>

<script>
import { FULLDateFormat } from '../../../../../libs/utils'

import followField from './fieldDetail'
import followCreate from './createFollowUp'

export default {
    props: {
        customer: {
            type: [Object, Array, String]
        }
    },
    components: {
        followField,
        followCreate
    },
    data(){
        return{
            //  当前打开的评论
            currentIndex: -1,
            pinglun: [],
            markert_follow_up_type: [],
            market_status: [],
            footer: false,
            followList: [],
            spinShow: false,
            //  当前登录人
            currentName: "",
            onlyMarket: "",
            single: false
        }
    },
    methods: {
        get_data_center(){
            let parmas = "markert_follow_up_type,market_status"
            let _self = this

            return new Promise((resolve, reject) => {
                function success(res){
                    _self.markert_follow_up_type = res.data.data.markert_follow_up_type
                    _self.market_status = res.data.data.market_status
                    resolve()
                }

                this.$GetDataCenter(parmas, success)
            })

        },
        get_data(e){
            let _self = this
            let url = `api/customer/findCustomerContentById`
            let config = {}
            if(_self.single){
                config = {
                    params :{
                        customerId: e,
                        followUpType: "11,12,13,14,15"
                    }
                }
            }else{
                config = {
                    params :{
                        customerId: e,
                    }
                }
            }
            
            _self.spinShow = true
            function success(res){
                _self.followList = res.data.data
                for(let i = 0; i<_self.followList.length; i++){
                    //  图片转格式
                    if(_self.followList[i].imgurls != null){
                        let urls = []
                        let temp = _self.followList[i].imgurls.split(",")
                        
                        for(let j = 0; j < temp.length; j++){
                            let tempUrl = {
                                url: "",
                                type: ""
                            }
                            tempUrl.url = 'api/assets/' + temp[j].split("``")[1]
                            tempUrl.realpath = 'api/assets/' + temp[j].split("``")[1]
                            tempUrl.type = tempUrl.url.split(".")[1]
                            if(tempUrl.type == 'doc' || tempUrl.type == "docx" || tempUrl.type == "xls" || tempUrl.type == "xlxs" || tempUrl.type == "pptx" || tempUrl.type == "ppt"){
                                //  必须是外网能够访问到的文件
                                //  详情参见微软官网
                            //     tempUrl.url = "http://view.officeapps.live.com/op/view.aspx?src="+encodeURI("http://cloud.zgcfo.com/" + tempUrl.url)
                            // }else if(tempUrl.type == "xls" || tempUrl.type == "xlxs"){
                            //     tempUrl.url = "http://view.officeapps.live.com/op/view.aspx?src="+encodeURI("http://cloud.zgcfo.com/" + tempUrl.url)
                            // }else if(tempUrl.type == "pptx" || tempUrl.type == "ppt"){
                            //     tempUrl.url = "http://view.officeapps.live.com/op/view.aspx?src="+encodeURI("http://cloud.zgcfo.com/" + tempUrl.url)
                            }else{

                            }
                            urls.push(tempUrl)
                            // console.log(tempUrl)
                        }
                        // console.log(urls)
                        _self.followList[i].imgs = urls
                    }
                    //  线索
                    if(_self.followList[i].buttons){
                        let tempButton = _self.followList[i].buttons.split(",")
                        _self.followList[i].buttonDetail = []
                        for(let j = 0; j < tempButton.length; j++){
                            let buttonDetail = {}
                            buttonDetail.buttonsZt = tempButton[j].split("``")[3]
                            buttonDetail.buttonsdetail = tempButton[j].split("``")[2]
                            buttonDetail.buttonText = tempButton[j].split("``")[1]
                            _self.followList[i].buttonDetail.push(buttonDetail)
                        }
                    }

                    if(_self.followList[i].evaluatecontents){
                        let tempEvaluate = _self.followList[i].evaluatecontents.split(",")
                        _self.followList[i].evaluateNum = tempEvaluate.length
                        _self.followList[i].chat = []
                        for(let j = 0; j < tempEvaluate.length; j++){
                            let tempChat = {}
                            tempChat.content = tempEvaluate[j].split('``')[3]
                            tempChat.date = tempEvaluate[j].split('``')[2]
                            tempChat.name = tempEvaluate[j].split('``')[1]
                            _self.followList[i].chat.push(tempChat)
                        }
                    }else{
                        _self.followList[i].evaluateNum = 0
                        _self.followList[i].chat = []
                    }
                }
                _self.spinShow = false
                _self.footer = true
            }

            this.$Get(url, config, success)
        },
        //线索领取
        lingqu(item){
            let _self = this
            let url = 'api' + item.buttonsdetail

            let config = {}

            function success(res){
                _self.$Message.success("领取成功！")
                _self.get_data(_self.customer.ID)
            }

            function fail(err){
                _self.$Message.error("领取失败！")
            }

            this.$Get(url, config, success)
        },
        //  打开评论
        open_evaluate(id, index){
            // console.log(index)
            if(this.currentIndex == index){
                this.currentIndex = -1
            }else{
                this.currentIndex = index
            }
        },
        //  提交评论
        send(bid, index, ranks){
            let _self = this
            /**
             * 设想一个方法，不重新更新页面便可以实现评论挂载，然而set函数无法实现，暂时使用v-if强制重渲染
             */

            let url = `api/customer/addErevaluate`

            let config = {
                bussinessid: bid,
                evaluatecontent: _self.pinglun[index],
                serviceranks: ranks
            }

            function success(res){
                // _self.get_data(_self.customer.ID)
                let evaluateTemp = {
                    content: _self.pinglun[index],
                    date: FULLDateFormat(new Date()),
                    name: localStorage.getItem("realname")
                }
                let temp = _self.followList[index].chat
                let len = temp.unshift(evaluateTemp)
                // let len = parseInt(_self.followList[index].length) + 1
                _self.$set(_self.followList[index], "evaluateNum", len)
                // _self.followList[index].chat.unshift(evaluateTemp)
                _self.$set(_self.followList[index],"chat",temp)
                _self.currentIndex = -1
                _self.currentIndex = index
                _self.pinglun[index] = ""
            }
            
            function fail(err){

            }

            this.$Post(url, config, success, fail)
        },
        open_create_followUp(){
            this.$bus.emit("OPEN_CUSTOMER_CREATE_FOLLOW_UP", true)
        },
        open_detail(e){
            this.$bus.emit("OPEN_CUSTOMER_FOLLOW_FIELD", e)
        },
        download(url_img){
            window.open(url_img.realpath)
        }
    },
    created(){
        let _self = this
        this.currentName = localStorage.getItem("realname")
        this.get_data_center().then(()=>{
            // console.log(_self.customer.ID)
            _self.get_data(_self.customer.ID)
        })
    }
}
</script>

<style>
    @import '../../../../../styles/component.css';
</style>