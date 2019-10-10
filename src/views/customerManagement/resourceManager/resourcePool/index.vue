<template>
    <Card style="min-height: 500px">
        <Row>
            <Col span="12">
                <Row style="margin-bottom:20px">
                    <Collapse v-model="search_model">
                        <Panel name="1">
                            <Icon type="search" style="margin-left:20px;margin-right:5px"></Icon>
                            筛选
                            <div slot="content" @keydown.enter="Search">
                                <Form ref="SearchValidate" :model="SearchValidate" :label-width="130" style="margin-top: 15px">
                                    <Row  style="height:56px">
                                        <Col>
                                            <FormItem label="名称：" prop="name">
                                                <Input v-model="SearchValidate.name" size="small"></Input>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row  style="height:56px">
                                        <Col>
                                            <FormItem label="号码：" prop="tel">
                                                <Input v-model="SearchValidate.tel" size="small"></Input>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row  style="height:56px">
                                        <Col>
                                            <FormItem label="今日拨打情况：" prop="callSituation">
                                                <RadioGroup v-model="SearchValidate.callSituation" >
                                                    <Radio v-for="(item,index) in callSituationList" :label="item.label" :key="index"><span>{{item.name}}</span></Radio>
                                                </RadioGroup>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row  style="height:56px">
                                        <Col>
                                            <FormItem label="跟进状态：" prop="followSituation">
                                                <RadioGroup v-model="SearchValidate.followSituation" >
                                                    <Radio v-for="(item,index) in followby_status" :label="item.typecode" :key="index"><span>{{item.typename}}</span></Radio>
                                                </RadioGroup>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <center>
                                        <FormItem>
                                            <Button type="primary" @click="Search">搜索</Button>
                                            <Button type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
                                        </FormItem>
                                    </center>
                                </Form>
                            </div>
                        </Panel>
                    </Collapse>
                </Row>
                <Row>
                    <ButtonGroup  shape="circle">
                        <Button type="primary" icon="skip-backward" @click="pre" :disabled="disabled"></Button>
                        <Button type="primary" icon="play" @click="play" v-if="!showPause" style="width: 40px"></Button>
                        <Button type="primary" icon="pause" @click="pause" v-if="showPause" style="width: 40px"></Button>
                        <Button type="primary" icon="skip-forward" @click="next" :disabled="disabled"></Button>
                        <!--<Button type="primary" icon="ios-color-wand-outline" @click="import_execl">批量导入</Button>-->
                    </ButtonGroup>
                    <RadioGroup v-model="second" style="margin-left: 60px">
                        <Radio label="2s" :disabled="disabled">
                            <span>2秒</span>
                        </Radio>
                        <Radio label="4s" :disabled="disabled">
                            <span>4秒</span>
                        </Radio>
                    </RadioGroup>
                    <Button type="primary" icon="ios-color-wand-outline" @click="import_excel" style="margin-left: 158px">批量导入</Button>
                </Row>
                <Row style="margin-top: 10px;">
                    <Table
                            @on-current-change="selectRow"
                            :loading="loading"
                            ref="selection"
                            highlight-row
                            size="small"
                            :columns="header"
                            :show-header="false"
                            :data="data"
                    ></Table>
                    <Page
                            size="small"
                            :total="pageTotal"
                            show-total
                            show-sizer
                            show-elevator
                            @on-change="pageChange"
                            @on-page-size-change="pageSizeChange"
                            :current.sync="page"
                            placement="top"
                            style="margin-top: 10px"
                    ></Page>
                </Row>
                <Row style="margin-top: 50px;margin-left: 30px">
                    <Row style="margin-top: 10px;">
                        <Icon type="xbox"></Icon> — — — —  无意向
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Icon type="pinpoint" style="color: green;"></Icon> — — — —  有意向
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Icon type="android-walk"></Icon>    — — — —  同行
                    </Row>
                    <Row style="margin-top: 10px;">
                        <Icon type="ios-close-outline" style="color: red;"></Icon> — — — —  无效电话
                    </Row>
                </Row>
            </Col>
            <Col span="12" style="padding-left: 20px" v-if="cus_data.length!==0">
                <Row>
                    <Col span="4">
                        <div style="font-weight: bold;font-size: 20px;color: red;">{{cus_data.customer.ctuomerName}}</div>
                    </Col>
                    <Col span="12">
                        <div>{{cus_data.customer.companyname}}</div>
                        <div>{{cus_data.customer.tel}}</div>
                    </Col>
                </Row>
                <Row  class="demo-tabs-style1">
                    <Tabs :value="tabName">
                        <TabPane name="tel" icon="ios-telephone-outline">
                            <tel :ringing="ringing" :link="link" :over="over"></tel>
                        </TabPane>
                        <TabPane  name="message" icon="email">
                            <message :sending="sending" :send-failed="sendFailed" :send-success="sendSuccess" v-show="showSend"></message>
                        </TabPane>
                    </Tabs>
                </Row>
                <Row  style="margin-top: 50px;">
                    <Card title="联系历史">
                        <Row>共有<span style="color: red;padding:0 2px 0 2px">{{cus_data.total}}</span>条沟通记录</Row>
                        <Row style="margin-top: 10px;">
                            <Table
                                    :row-class-name="rowClassName "
                                    :loading="loading1"
                                    ref="selection"
                                    size="small"
                                    :columns="header1"
                                    :data="cus_data.list"
                            ></Table>
                        </Row>
                    </Card>
                </Row>
            </Col>
        </Row>
        <Modal v-model="openImportCustomer" title="导入客户" width="200">
            <Row :gutter="20">
                <Col span="24">
                    <center>
                        <Upload ref="upload" :before-upload="handleUpload" action="/api/customer/private/importInfo">
                            <Button type="ghost" icon="ios-cloud-upload-outline" style="margin-top:20px">选择文件</Button>
                            <Button type="info" icon="ios-cloud-download-outline" style="margin-top:20px;" @click="open">导入模板</Button>
                        </Upload>
                    </center>
                </Col>
            </Row>
            <div slot="footer"></div>
        </Modal>
        <Modal title="发送短信" width="300" v-model="send_email_model" @on-cancel="close_send_email">
            <Form ref="formEmail" :model="formEmail" :rules="ruleValidate">
                <FormItem prop="phone">
                    <Input type="input" disabled v-model="formEmail.phone" placeholder="请输入手机号" />
                </FormItem>
                <FormItem prop="content">
                    <Input type="textarea" :rows="6" v-model="formEmail.content" placeholder="请输入短信内容" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="send_email()" :loading="send_email_loading">发送</Button>
                <Button type="ghost" @click="send_email_model = false">取消</Button>
            </div>
        </Modal>
    </Card>
</template>

<script>
    import {Service1,Service} from "../../../../api/Service";
    let serviceApi = new Service('socket');
    let serviceApi1 = new Service1('socket');
    import Tel from './telAnimate'
    import Message from  './messageAnimate'
    export default {
        name: "index",
        components:{
            Tel,
            Message
        },
        data(){
            return{
                status:"",
                search_model: '',
                loading: false,
                loading1:false,
                pageTotal: 0,
                page: 1,
                pageSize: 10,
                tabName:'tel',
                current_row:"",
                tel:'',
                second:'2s',
                showPause:false,
                openImportCustomer:false,
                tf:false,
                tf1:false,
                ringing:false,
                link:false,
                over:false,
                sending:false,
                sendFailed:false,
                sendSuccess:false,
                showSend:false,
                flag:false,
                disabled:false,
                currentIndex:'',
                currentIndex1:'',
                cus_data:[],
                send_email_model:false,
                formEmail:{},
                send_email_loading:false,
                header1:[{title:"创建时间",key:"createdate",minWidth:140},{title:"通话时间",key:"diff",minWidth:100},{title:"处理结果",key:"state",minWidth:100,render:(h,params)=>{return h('div',{},this.call_status_map.get(params.row.state))}}],
                // data1:[{date:'今天 18:09',callTime:'2:30',status:'已接听'},{date:'昨天 18:09',callTime:'0:30',status:'未接听'}],
                followby_status:[{type:'1',name:'有意向'},{type:'2',name:'无意向'},{type:'3',name:'同行'},{type:'4',name:'无效电话'}],
                followby_status_map:new Map(),
                call_status:[],
                call_status_map:new Map(),
                callSituationList:[{label:'Y',name:'已拨打'},{label:'N',name:'未拨打'}],
                SearchValidate: {
                    name:"",
                    tel:"",
                    callSituation:"",
                    followSituation:""
                },
                data:[{name:"流川枫",situation:'wyx'},{name:"樱木花道",situation:'yyx'},{name:"薇恩",situation:'tx'},{name:"伊泽瑞尔",situation:'wxdh'}],
                header: [
                    {
                        title: '名称',
                        fixed: 'left',
                        key: 'ctuomer_name',
                        minWidth: 100,
                        render: (h, params) => {
                            if(params.row.status=='wyx'){
                                return h('div', [
                                    h(
                                        'Icon',
                                        {
                                            props: {
                                                type: 'xbox',
                                                size:'18'
                                            },
                                            style:{
                                                marginRight:'30px',
                                            }
                                        }
                                    ),
                                    h(
                                        'span',
                                        {
                                            style:{
                                                lineHeight: '34px',
                                                fontSize: '18px'
                                            }
                                        },params.row.ctuomer_name
                                    )
                                ])
                            } else if (params.row.status=='yyx'){
                                return h('div', [
                                    h(
                                        'Icon',
                                        {
                                            props: {
                                                type: 'pinpoint',
                                                size:'18'
                                            },
                                            style:{
                                                marginRight:'30px',
                                                color:'green'
                                            }
                                        }
                                    ),
                                    h(
                                        'span',
                                        {
                                            style:{
                                                lineHeight: '34px',
                                                fontSize:'18px'
                                            }
                                        },params.row.ctuomer_name
                                    )
                                ])
                            } else if (params.row.status=='th'){
                                return h('div', [
                                    h(
                                        'Icon',
                                        {
                                            props: {
                                                type: 'android-walk',
                                                size:'18'
                                            },
                                            style:{
                                                marginRight:'35px',
                                            }
                                        }
                                    ),
                                    h(
                                        'span',
                                        {
                                            style:{
                                                lineHeight: '34px',
                                                fontSize:'18px'
                                            }
                                        },params.row.ctuomer_name
                                    )
                                ])
                            } else if (params.row.status=='wxdh'){
                                return h('div', [
                                    h(
                                        'Icon',
                                        {
                                            props: {
                                                type: 'ios-close-outline',
                                                size:'18'
                                            },
                                            style:{
                                                marginRight:'30px',
                                                color:'red'
                                            }
                                        }
                                    ),
                                    h(
                                        'span',
                                        {
                                            style:{
                                                lineHeight: '34px',
                                                fontSize:'18px'
                                            }
                                        },params.row.ctuomer_name
                                    )
                                ])
                            } else if (!params.row.status){
                                return h('div', [
                                    h(
                                        'span',
                                        {
                                            style:{
                                                lineHeight: '34px',
                                                fontSize:'18px'
                                            }
                                        },params.row.ctuomer_name
                                    )
                                ])
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Icon',
                                    {
                                        props: {
                                            type: 'ios-telephone-outline',
                                            size:'24'
                                        },
                                        class:{
                                            'a':true,
                                            'c':params.row.is_call==='Y'
                                        },
                                        style:{
                                            marginRight:'30px',
                                            lineHeight: '30px'
                                        },
                                        on: {
                                            click: () => {
                                                this.tabName = 'tel'
                                                this.dialout(params.row.tel,params.row.id)
                                            }
                                        }
                                    }
                                ),
                                h(
                                    'Icon',
                                    {
                                        props: {
                                            type: 'email',
                                            size:'24'
                                        },
                                        class:{
                                            'b':true,
                                            'd':params.row.is_send==='Y'
                                        },
                                        style:{
                                            marginRight:'30px',
                                            lineHeight: '30px'
                                        },
                                        on: {
                                            click: () => {
                                                this.getLoginerMessage(params.row.tel)
                                                // this.tabName = 'message'

                                            }
                                        }
                                    },
                                )
                            ])
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 140,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'Select',
                                    {
                                        props: {
                                            value: params.row.status,
                                        },
                                        on: {
                                            'on-change':(event) => {
                                                this.change_status(params,event)
                                            }
                                        }
                                    },
                                    [
                                        this.followby_status.map(function(i){
                                            return h('Option', {
                                                props: {value: i.typecode}
                                            }, i.typename);
                                        })
                                    ]
                                )
                            ])
                        }
                    },
                ]
            }
        },
        methods:{
            selectRow(e) {
                this.current_row = e;
                this.get_customer_data()
                if (this.result==='ringing' && this.tel == this.current_row.tel ){
                    this.ringing = true
                    this.link = false
                    this.over = false
                } else if (this.result==='link' && this.tel == this.current_row.tel){
                    this.ringing = false
                    this.link = true
                    this.over = false
                } else if (this.result==='over' && this.tel == this.current_row.tel){
                    this.ringing = false
                    this.link = false
                    this.over = true
                } else {
                    this.ringing = false
                    this.link = false
                    this.over = false
                }
                if (this.current_row.tel == this.formEmail.phone){
                    this.showSend = true
                } else {
                    this.showSend = false
                }
            },
            pageChange(a) {
                let _self = this;
                _self.page = a;
                _self.get_data()
            },
            pageSizeChange(a) {
                let _self = this;
                _self.pageSize = a;
                _self.get_data()
            },
            rowClassName(row,index){
                if (row) {
                    return 'demo-table-info-row'
                }
            },
            Search() {
                this.page = 1;
                this.get_data()
            },
            pre(){
                let a = this.current_row.id
                let b = this.data.map(value => {
                    return value.id
                })
                let c =  b.findIndex(v=>{return v == a})
                if (c==0){
                    if(this.page==1){
                        this.$Message.warning("已经是第一条了")
                    } else {
                        this.page = this.page-1
                        this.get_data2()
                    }
                } else {
                    this.current_row = this.data[c-1]
                    this.get_customer_data()
                }

            },
            next(){
                let a = this.current_row.id
                let b = this.data.map(value => {
                    return value.id
                })
                let c =  b.findIndex(v=>{return v == a})
                if (c== b.length-1){
                    let d = this.total(this.pageTotal,this.pageSize)
                    if(this.page==d){
                        this.$Message.warning("已经是最后一条了")
                    } else {
                        this.page = this.page+1
                        this.get_data()
                    }
                } else {
                    this.current_row = this.data[c+1]
                    this.get_customer_data()
                }

            },
            next1(){
                let a = this.current_row.id
                let b = this.data.map(value => {
                    return value.id
                })
                let c =  b.findIndex(v=>{return v == a})
                if (c== b.length-1){
                    let d = this.total(this.pageTotal,this.pageSize)
                    if(this.page==d){
                        this.$Message.warning("已经是最后一条了")
                    } else {
                        this.page = this.page+1
                        this.get_data3()
                    }
                } else {
                    this.current_row = this.data[c+1]
                    this.get_customer_data1()
                }

            },
            total(a,b){
                if ( (a/b) < 0 ){
                    return 1
                } else {
                    return Math.ceil(a/b)
                }
            },
            play(){
                this.showPause = true
                this.flag = true
                this.disabled = true
            },
            pause(){
                this.showPause = false
                this.flag = false
                this.disabled = false
            },
            change_status(p,e){
                let _self = this;
                let url = 'api/customer/private/changeStatus';
                let config = {
                    params:{
                        status:e,
                        id:p.row.id
                    }
                }

                function success(res) {
                    _self.get_data1()
                }

                function fail(err) {
                }
                this.$Get(url, config, success, fail);
            },
            import_excel(){
                this.openImportCustomer = true;
            },
            handleUpload(file) {
                let _self = this;
                _self.$Spin.show();
                let formdata = new FormData();
                let url = 'api/customer/private/importInfo';

                formdata.append('file', file);

                function success(res) {
                    _self.get_data();
                    _self.openImportCustomer = false;
                    _self.$Spin.hide();
                    return false;
                }

                function fail(err) {
                    _self.$Spin.hide();
                    return false;
                }

                this.$Post(url, formdata, success, fail);
                return false;
            },
            handleReset() {
                this.SearchValidate = {
                        name:"",
                        tel:"",
                        callSituation:"",
                        followSituation:""
                }
                this.Search();
            },
            get_data1(){
                let _self = this;
                _self.loading = true
                let url = 'api/customer/private/list';
                let config = {
                    params:{
                        ctuomer_name:_self.SearchValidate.name,
                        tel:_self.SearchValidate.tel,
                        sortField:'createdate',
                        status:_self.SearchValidate.followSituation,
                        isCall:_self.SearchValidate.callSituation,
                        page:_self.page,
                        pageSize:_self.pageSize
                    }
                }

                function success(res) {
                    _self.data = res.data.data.rows
                    _self.pageTotal = res.data.data.total
                    _self.loading = false
                }

                function fail(err) {
                }
                this.$Get(url, config, success, fail);
            },
            get_data(){
                let _self = this;
                _self.loading = true
                let url = 'api/customer/private/list';
                let config = {
                    params:{
                        sortField:'createdate',
                        ctuomer_name:_self.SearchValidate.name,
                        tel:_self.SearchValidate.tel,
                        status:_self.SearchValidate.followSituation,
                        isCall:_self.SearchValidate.callSituation,
                        page:_self.page,
                        pageSize:_self.pageSize
                    }
                }

                function success(res) {
                    _self.data = res.data.data.rows
                    _self.pageTotal = res.data.data.total
                    _self.loading = false
                    _self.current_row = _self.data[0]
                    _self.get_customer_data()
                }

                function fail(err) {
                }
                this.$Get(url, config, success, fail);
            },
            get_data2(){
                let _self = this;
                _self.loading = true
                let url = 'api/customer/private/list';
                let config = {
                    params:{
                        sortField:'createdate',
                        ctuomer_name:_self.SearchValidate.name,
                        tel:_self.SearchValidate.tel,
                        status:_self.SearchValidate.followSituation,
                        isCall:_self.SearchValidate.callSituation,
                        page:_self.page,
                        pageSize:_self.pageSize
                    }
                }

                function success(res) {
                    _self.data = res.data.data.rows
                    _self.pageTotal = res.data.data.total
                    _self.loading = false
                    _self.current_row = _self.data[_self.data.length-1]
                    _self.get_customer_data()
                }

                function fail(err) {
                }
                this.$Get(url, config, success, fail);
            },
            get_data3(){
                let _self = this;
                _self.loading = true
                let url = 'api/customer/private/list';
                let config = {
                    params:{
                        sortField:'createdate',
                        ctuomer_name:_self.SearchValidate.name,
                        tel:_self.SearchValidate.tel,
                        status:_self.SearchValidate.followSituation,
                        isCall:_self.SearchValidate.callSituation,
                        page:_self.page,
                        pageSize:_self.pageSize
                    }
                }

                function success(res) {
                    _self.data = res.data.data.rows
                    _self.pageTotal = res.data.data.total
                    _self.loading = false
                    _self.current_row = _self.data[0]
                    _self.get_customer_data1()
                }

                function fail(err) {
                }
                this.$Get(url, config, success, fail);
            },
            get_customer_data(){
                let _self = this;
                _self.loading1 = true
                let url = 'api/customer/private/detail';
                let config = {
                    params:{
                        customerId:_self.current_row.id
                    }
                }

                function success(res) {
                    _self.cus_data = res.data.data
                    _self.loading1 = false
                }

                function fail(err) {
                }
                this.$Get(url, config, success, fail);
            },
            get_customer_data1(){
                let _self = this;
                _self.loading1 = true
                let url = 'api/customer/private/detail';
                let config = {
                    params:{
                        customerId:_self.current_row.id
                    }
                }

                function success(res) {
                    _self.cus_data = res.data.data
                    _self.loading1 = false
                    _self.dialout(_self.current_row.tel,_self.current_row.id)
                }

                function fail(err) {
                }
                this.$Get(url, config, success, fail);
            },
            get_data_center(){
                let params = "followby_status,call_status"
                let _self = this
                function success(res){
                    _self.followby_status = res.data.data.followby_status
                    _self.followby_status_map = _self.$array2map(_self.followby_status)
                    _self.call_status = res.data.data.call_status
                    _self.call_status_map = _self.$array2map(_self.call_status)
                }
                this.$GetDataCenter(params, success)
            },
            dialout(t,i){
                let _self = this;
                let url = `api/customer/sevenmoor/dialout`;
                let config = {
                    params:{
                        mobile:t
                    }
                };

                function success(res) {
                    if (res.data.msgCode=='40000'){
                        _self.$Message.success(res.data.msg)
                        _self.isCall(i)
                        _self.get_data1()
                    }
                }

                function fail(err) {

                }

                this.$Get(url, config, success, fail);
            },
            isCall(i){
                let _self = this;
                let url = `api/customer/private/isCall`;
                let config = {
                    params:{
                        customerId:i
                    }
                };

                function success(res) {
                    if (res.data.msgCode=='40000'){
                        _self.$Message.success(res.data.msg)
                    }
                }

                function fail(err) {

                }

                this.$Get(url, config, success, fail);
            },
            getLoginerMessage(phone) {
                let url = 'api/user/login/detail';
                let success = resp => {
                    const { mobilephone = '', realname = '' } = resp.data.data.user;
                    this.formEmail.phone = phone;
                    this.formEmail.content = `东家你好，我是刚刚联系您的财税管家${realname}经理(联系电话: ${mobilephone}), 极致财税，用心服务`;
                    // this.send_email(mobilephone, realname);
                    this.send_email_model = true;
                };
                this.$Get(url, '', success);
            },
            send_email(){
                let _self = this;
                let url = 'api/system/message/sendMessage';
                _self.showSend = true
                _self.tabName = 'message'
                if (_self.current_row.tel == _self.formEmail.phone){
                    _self.sending = true
                    _self.sendSuccess = false
                    _self.sendFailed = false
                } else {
                    _self.sending = false
                    _self.sendSuccess = false
                    _self.sendFailed = false
                }

                const { phone, content } = this.formEmail;
                let params = {
                    phone,
                    content
                };
                const formData = new FormData();

                Object.keys(params).forEach(key => {
                    formData.append(key, params[key]);
                });
                function success(res) {
                    _self.isSend()
                    _self.get_data1()
                    if (_self.current_row.tel == _self.formEmail.phone){
                        _self.sending = false
                        _self.sendSuccess = true
                        _self.sendFailed = false
                    } else {
                        _self.sending = false
                        _self.sendSuccess = false
                        _self.sendFailed = false
                    }
                    _self.send_email_model = false;

                }

                function fail(res) {
                    if (_self.current_row.tel == _self.formEmail.phone){
                        _self.sending = false
                        _self.sendSuccess = false
                        _self.sendFailed = true
                    } else {
                        _self.sending = false
                        _self.sendSuccess = false
                        _self.sendFailed = false
                    }

                }

                this.$Post(url, formData, success,fail);
            },
            isSend(){
                let _self = this;
                let url = `api/customer/private/isSend`;
                let config = {
                    params:{
                        customerId:_self.current_row.id
                    }
                };

                function success(res) {
                    if (res.data.msgCode=='40000'){
                        _self.$Message.success(res.data.msg)
                    }
                }

                function fail(err) {

                }

                this.$Get(url, config, success, fail);
            },
            open_send_email(){
                this.send_email_model = true;
            },
            close_send_email(){
                this.send_email_model = false
            },
            async initWebSocket() {
                const { port } = await serviceApi.auth();
                const { sevenmoorAccount } = await serviceApi1.auth1();
                console.log({ sevenmoorAccount })
                const wsuri = `ws://cloud.zgcfo.com:${port}/callback/websocket/${sevenmoorAccount}`;
                // const wsuri = `ws://192.168.0.220:${port}/callback/websocket/${sevenmoorAccount}`;
                // const wsuri = `ws://192.168.2.89:${port}/callback/websocket/${sevenmoorAccount}`;
                this.websock = new WebSocket(wsuri);
                console.log(this.websock)
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onopen = this.websocketonopen;
                this.websock.onerror = this.websocketonerror;
                this.websock.onclose = this.websocketclose;
            },
            async websocketonmessage(e) {
                let a = JSON.parse(e.data)
                this.tel = a.tel
                this.result = a.result
                console.log(a.result)
                console.log(a.tel)
                try {
                    if (a.result==='ringing' && a.tel == this.cus_data.customer.tel ){
                        this.ringing = true
                        this.link = false
                        this.over = false
                    } else if (a.result==='link' && a.tel == this.cus_data.customer.tel){
                        this.ringing = false
                        this.link = true
                        this.over = false
                    } else if (a.result==='over'){
                        if(a.tel == this.cus_data.customer.tel){
                            this.ringing = false
                            this.link = false
                            this.over = true
                        }
                        if (this.flag){
                            if (this.second=='2s') {
                                let tel = a.tel
                                let data = this.data.map(v=>{return v.tel})
                                let num =  data.findIndex(v=>{return v == tel})
                                this.current_row = this.data[num]
                                setTimeout(()=>{
                                    this.next1()
                                },2000)
                            }
                            if (this.second=='4s') {
                                let tel = a.tel
                                let data = this.data.map(v=>{return v.tel})
                                let num =  data.findIndex(v=>{return v == tel})
                                this.current_row = this.data[num]
                                setTimeout(()=>{
                                    this.next1()
                                },4000)
                            }
                        } else {
                            if(a.tel == this.cus_data.customer.tel){
                                this.ringing = false
                                this.link = false
                                this.over = true
                            }
                        }
                    } else {
                        this.ringing = false
                        this.link = false
                        this.over = false
                    }
                } catch (error) {}


            },
            websocketonopen() {
                this.websocketsend('打开链接');
            },
            websocketsend(Data) {
                //数据发送
                this.websock.send(Data);
            },
            websocketonerror() {
                setTimeout(() => {
                    this.initWebSocket();
                }, 300000);
            },
            websocketclose(e) {
                console.log('断开连接', e);
            }
        },
        created() {
            this.get_data()
            this.get_data_center()
            this.initWebSocket()
        }
    }
</script>

<style>
    .demo-tabs-style1 .ivu-tabs-nav .ivu-tabs-tab {
        font-size: 24px;
    }
    .ivu-table .demo-table-info-row td{
        border-bottom: none;
    }
    .a:hover{
        color: green;
        font-weight: bold;
    }
    .b:hover{
        color: green;
    }
    .c{
        color: green;
        font-weight: bold;
    }
    .d{
        color: green;
    }
</style>