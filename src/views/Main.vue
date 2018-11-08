<style lang="less">
    @import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'210px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu 
                :shrink="shrink"
                @on-change="handleSubmenuChange"
                :theme="menuTheme" 
                :before-push="beforePush"
                :open-names="openedSubmenuArr"
                :menu-list="menuList">
                <div slot="top" class="logo-con">
                    <img v-show="!shrink"  src="../images/LOGO.png" key="max-logo" />
                    <!--<img v-show="shrink" src="../images/td_icon.ico" key="min-logo" />-->
                </div>
            </shrinkable-menu>
        </div>
        <!-- <div>{{keepPage}}</div> -->
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-avator-con">
                    <!-- <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
                    <lock-screen></lock-screen>
                    <message-tip v-model="mesCount"></message-tip> -->
                    <!-- <theme-switch></theme-switch> -->
                    <div style="height:100%">
                        <Button size="small" type="primary" style="margin-top:18px;margin-left:110px" @click="tip=true;tipColse=true">我要反馈</Button>
                    </div>
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <!--<DropdownItem name="ownSpace">个人中心</DropdownItem>-->
                                    <DropdownItem>个人中心</DropdownItem>
                                    <DropdownItem name="stystem_complain" divided>系统反馈</DropdownItem>
                                    <DropdownItem name="updatePassWord" divided>修改密码</DropdownItem>
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page" style="min-width:800px">
                <keep-alive :include="keepPage">
                    <!-- <Spin size="large" fix v-if="spin_loading"></Spin> -->
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
        <!--系统反馈，需要优化-->
            <Modal
                title="系统反馈"
                width="60%"
                v-model="show_stystem_complain"
                @cancel="close_stystem_complain"
            >

                <system-complain></system-complain>
                <div slot="footer"></div>
            </Modal>
        <!-- 意见收集 -->
        <Modal
                v-model="tip"
                title="意见与反馈"
                width="500"
                @on-ok="submit"
                :mask-closable="false"
                :closable="tipColse"
            >
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="8"><span style="line-height:30px">请您对当前系统进行评分：</span></Col>
                    <Col span="14"><Rate v-model="rate.star" show-text></Rate></Col>
                </Row>
                <Row :gutter="16">
                    <Col span="1" style="visibility:hidden">1</Col>
                    <Col span="8">
                        <div>评价内容：</div>
                    </Col>
                </Row>
                <Row :gutter="24" style="margin-top:5px">
                    <Col span="1" style="visibility:hidden">1</Col>                    
                    <Col span="22">
                        <Input type="textarea" v-model="rate.content" placeholder="" size="small" :rows="5">
                        </Input>
                    </Col>
                </Row>
                <div slot="footer">
                    <Button type="primary" @click="submit_index" :loading="submit_button">提交</Button>
                    <Button type="ghost" @click="reset">重置</Button>
                </div>
            </Modal>
        <!--
            引入的弹出层界面，全局化
        -->
        <!-- 意见收集 -->
        <change-password></change-password>
        <!-- 工单相关 -->
        <next></next>
        <set-finish-time></set-finish-time>
        <field-list-by-company-id></field-list-by-company-id>
        <aduit-log></aduit-log>

        <customer-detail v-if="gobalCustomerDetailShow" :customer="gobalCustomer"></customer-detail>
        <work-order-detail v-if="gobalWorkorderDetailShow" :workOrderId="gobalworkOrderId"></work-order-detail>
        <company-detail v-if="gobalCompanyDetailShow" :companyId="gobalCompanyId"></company-detail>
    </div>
</template>
<script>
    import changePassword from './woa-components/updatePassword/index.vue'
    import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
    import tagsPageOpened from './main-components/tags-page-opened.vue';
    import breadcrumbNav from './main-components/breadcrumb-nav.vue';
    import fullScreen from './main-components/fullscreen.vue';
    import lockScreen from './main-components/lockscreen/lockscreen.vue';
    import messageTip from './main-components/message-tip.vue';
    import themeSwitch from './main-components/theme-switch/theme-switch.vue';
    import systemComplain from './stystemComplain/complainReply/complainReply'
    import Cookies from 'js-cookie';
    import util from '@/libs/util.js';
    import next from './woa-components/next/flow.vue';
    import setFinishTime from './woa-components/setFinishTime/setFinishTime'
    import fieldListByCompanyId from './woa-components/fieldListByCompanyId/index.vue'
    import aduitLog from './order/orderApprove/common/aduitLog.vue'
    //  新版全局性客户详情
    import customerDetail from './woa-components/customerDetail2/index'
    import workOrderDetail from './woa-components/workOrderDetail/index.vue';
    import companyDetail from './woa-components/companyDetail/CompanyDetail.vue'

    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav,
            fullScreen,
            lockScreen,
            messageTip,
            themeSwitch,
            systemComplain,
            changePassword,
            next,
            setFinishTime,
            fieldListByCompanyId,
            aduitLog,
            customerDetail,
            workOrderDetail,
            companyDetail
        },
        data () {
            return {
                tipColse:false,
                spin_loading:true,
                show_stystem_complain:false,
                submit_button:false,
                rate:{
                    content:"",
                    star:5
                },
                file:[],
                // 是否弹出系统反馈框
                tip:false,
                shrink: false,
                userName: '',
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr
            };
        },
        computed: {
            menuList () {
                // console.log(this.$store.state.app.menuList)
                return this.$store.state.app.menuList;
            },
            pageTagsList () {
                // console.log(this.$store.state.app.pageOpenedList)
                return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
            },
            currentPath () {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            },
            avatorPath () {
                return localStorage.avatorImgPath;
            },
            cachePage () {
                return this.$store.state.app.cachePage;
            },
            lang () {
                return this.$store.state.app.lang;
            },
            menuTheme () {
                return this.$store.state.app.menuTheme;
            },
            mesCount () {
                return this.$store.state.app.messageCount;
            },
            keepPage () {
                //  作为keep-alive 的include数组
                let temp = []
                for(let i = 0;i<this.$store.state.app.pageOpenedList.length;i++){
                    temp.push(this.$store.state.app.pageOpenedList[i].name)
                }
                // console.log(this.$store.state.app.pageOpenedList)
                // console.log(temp)
                return temp
            },
            //  业务相关-全局性变量
            gobalCustomerDetailShow() {
                return this.$store.state.gobal.gobalCustomerDetailShow;
            },
            gobalCustomer() {
                return this.$store.state.gobal.gobalCustomer;
            },
            gobalWorkorderDetailShow(){
                return this.$store.state.gobal.gobalWorkorderDetailShow
            },
            gobalworkOrderId(){
                return this.$store.state.gobal.gobalworkOrderId
            },
            gobalCompanyDetailShow(){
                return this.$store.state.gobal.gobalCompanyDetailShow
            },
            gobalCompanyId(){
                return this.$store.state.gobal.gobalCompanyId
            },
        },
        methods: {
            close_stystem_complain(){
                this.show_stystem_complain = false
            },
            open_stystem_complain(){
                let _self = this
                this.show_stystem_complain = true
            },
            init () {
                let pathArr = util.setCurrentPath(this, this.$route.name);
                this.$store.commit('updateMenulist');
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.userName = localStorage.getItem("realname")
                // this.userName = Cookies.get('user');
                let messageCount = 0;
                this.messageCount = messageCount.toString();
                this.checkTag(this.$route.name);
                this.$store.commit('setMessageCount', messageCount);
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown (name) {
                var _self = this

                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                } else if (name === 'loginout') {
                    // 退出登录
                    this.$store.commit('logout', this);
                    this.$store.commit('clearOpenedSubmenu');
                    this.$store.commit('clearAllTags')
                    this.$http.get('/api/user/logOut')
                        .then(function (response) {
                            if (response.data.msgCode == '40000') {
                                // _self.winReload()
                                // localStorage.setItem('isTip',"N")
                                _self.$Message.success('注销成功!') 
                                Cookies.set('user', '');
                                Cookies.set('password', '');                                                            
                                _self.$router.push({
                                    name: 'login'
                                });
                                
                            }
                        })
                }else if( name ==='stystem_complain'){
                    _self.open_stystem_complain()
                }else if( name === 'updatePassWord'){
                    this.$bus.emit('CHANGE_PASSWORD',{realname:localStorage.getItem("realname"),id:localStorage.getItem("id")})                    
                }
            },
            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange (val) {
                // console.log(val)
            },
            beforePush (name) {
                // if (name === 'accesstest_index') {
                //     return false;
                // } else {
                //     return true;
                // }
                return true;
            },
            fullscreenChange (isFullScreen) {
                // console.log(isFullScreen);
            },
            //  意见收集
            rate_start(){
                let _self = this
                let url = `api/system/checkSystemFeedbackStatusByUserId`
                let config = {
                    params:{
                        userid:localStorage.getItem('id')
                    }
                }

                function success(res){
                    // console.log(res.data.data.isNeedFeedback)
                    if(res.data.data.isNeedFeedback == "N"){
                        if(localStorage.getItem('id')==10059){
                            _self.tip = false
                        }else{
                            _self.tip = true
                        }
                    }else{
                        _self.tip = false
                    }
                }

                function fail(res){
                }

                this.$Get(url, config, success, fail)
            },
            submit_index(){
                let _self = this
                if(this.rate.star == "" || this.rate.content == ""){
                    this.$Message.warning('请您填写评价项目，谢谢合作！')
                }else{
                    this.submit()
                }
            },
            submit(){
                // localStorage.setItem('isTip',"Y")
                // this.tip = false
                let _self = this
                let url = `api/system/createSystemFeedback`
                _self.submit_button = true
                let config = {
                    score:_self.rate.star,
                    suggestion:_self.rate.content
                }
                function success(res){
                    _self.tip = false
                    _self.submit_button = false
                }
                function fail(res){
                    _self.submit_button = false
                }

                this.$Post(url,config,success,fail)
            },
            reset(){
                this.rate.star = ""
                this.rate.content = ""
            },
            handleUpload(file) {
                this.file.push(file)
                return false;
            },
        },
        watch: {
            '$route' (to) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(to.name);
                // 页面重新初始化
                // this.init()
                // localStorage.currentPageName = to.name;
            },
            lang () {
                util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
            }
        },
        mounted () {
            this.init();
            this.rate_start()
            this.spin_loading = false
            console.log("dom_mounted")
            // this.wx_init()
            //  全局监听click事件，并获取dom元素
            // document.addEventListener("click",function(e){
            //     console.log(e.path)
            // })
            // if(Date.now()<1541474969029 + 3600000*24){
            //     this.$Notice.info({
            //         title: '更新提示:',
            //         desc: `
            //         1.新增菜单：新增消息推送，产品管理菜单（目前仅可以查看价格），仅开放给部分用户；</br>
            //         2.重构订单列表：修复了其中已知存在的问题，删除了部分消息提示及功能；</br>
            //         3.资料管理优化：现在可以修改存在位置地点和资料名称等信息，交还客户时可以选择税局工商等部门；</br>
            //         4.公海池优化：增加领取数量限制,具体规则由市场部负责人制定；</br>
            //         5.消息推送优化：优化数条客户微信推送通知；</br>
            //         6.其他：修复部分已知bug；</br>`,
            //         duration: 8,
            //         name: "updateNotice"
            //     });
            // }
        },
        created () {
            // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
        },
        
    };
</script>
