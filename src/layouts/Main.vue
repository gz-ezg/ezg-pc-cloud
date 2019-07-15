<template>
  <div class="main" :class="{ 'main-hide-text': shrink }">
    <div class="sidebar-menu-con" :style="{ width: shrink ? '60px' : '210px', overflow: shrink ? 'visible' : 'auto' }">
      <shrinkable-menu
        :shrink="shrink"
        @on-change="handleSubmenuChange"
        :theme="menuTheme"
        :before-push="beforePush"
        :open-names="openedSubmenuArr"
        :menu-list="menuList"
      >
        <div slot="top" class="logo-con">
          <img v-show="!shrink" src="../images/LOGO.png" key="max-logo" />
        </div>
      </shrinkable-menu>
    </div>
    <div class="main-header-con" :style="{ paddingLeft: shrink ? '60px' : '200px' }">
      <div class="main-header">
        <div class="navicon-con">
          <Button :style="{ transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)' }" type="text" @click="toggleClick">
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
                    <lock-screen></lock-screen> -->
          <!-- <message-tip v-model="mesCount"></message-tip> -->
          <!-- <theme-switch></theme-switch> -->
          <div @click="handleMsgCenter" class="header-laba">
            <Badge overflow-count="999" :count="unreadNum">
              <img src="../images/laba.png" />
            </Badge>
          </div>
          <div style="height:100%">
            <Button
              size="small"
              type="primary"
              style="margin-top:18px;margin-left:110px"
              @click="
                tip = true;
                tipColse = true;
              "
              >我要反馈</Button
            >
          </div>
          <div class="user-dropdown-menu-con">
            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
              <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                <a href="javascript:void(0)">
                  <span class="main-user-name">{{ userName }}</span>
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="ownSpace">个人中心</DropdownItem>
                  <!-- <DropdownItem>个人中心</DropdownItem> -->
                  <DropdownItem name="stystem_complain" divided>系统反馈</DropdownItem>
                  <DropdownItem name="updatePassWord" divided>修改密码</DropdownItem>
                  <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <!-- <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar> -->
              <Avatar icon="person" style="background: #619fe7;margin-left: 10px;"></Avatar>
            </Row>
          </div>
        </div>
      </div>
      <div class="tags-con">
        <tags-page-opened :pageTagsList="pageTagsList" @update-main-content="updateMainContent"></tags-page-opened>
      </div>
    </div>
    <div class="single-page-con" :style="{ left: shrink ? '60px' : '200px' }">
      <div class="single-page" style="min-width:800px">
        <keep-alive :include="keepPage">
          <router-view v-if="globalRefresh"></router-view>
        </keep-alive>
      </div>
    </div>
    <!--系统反馈，需要优化-->
    <div v-if="show_stystem_complain">
      <Modal title="系统反馈" width="60%" :value="true" @on-cancel="close_stystem_complain">
        <system-complain></system-complain>
        <div slot="footer"></div>
      </Modal>
    </div>

    <!-- 意见收集 -->
    <Modal v-model="tip" title="意见与反馈" width="500" @on-ok="submit" :mask-closable="false">
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
          <Input type="textarea" v-model="rate.content" placeholder="" size="small" :rows="5"> </Input>
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

    <field-list-by-company-id></field-list-by-company-id>
    <aduit-log></aduit-log>

    <customer-detail v-if="gobalCustomerDetailShow" :customer="gobalCustomer"></customer-detail>
    <work-order-detail v-if="gobalWorkorderDetailShow" :workOrderId="gobalworkOrderId"></work-order-detail>
    <company-detail v-if="gobalCompanyDetailShow" :companyId="gobalCompanyId"></company-detail>
    <set-finish-time :worderOrderDetail="gobalWorkorderDetail"></set-finish-time>
    <re-login v-if="gobalReloginShow"></re-login>

    <Modal width="800px" v-model="msgCenterPopus" footer-hide title="消息中心" @on-ok="ok" @on-cancel="cancel">
      <Row>
        <ButtonGroup>
          <Button :type="msgCenterType == 'N' ? 'primary' : ''" @click="getMsgData('N')">
            未读
          </Button>
          <Button :type="msgCenterType == 'Y' ? 'primary' : ''" @click="getMsgData('Y')">
            已读
          </Button>
          <Button :loading="tableloading" @click="handleUpdateStatus" v-if="msgCenterType == 'N'" type="primary">
            批量读取
          </Button>
        </ButtonGroup></Row
      >
      <Row style="margin-top: 10px;">
        <Table
          @on-row-dblclick="handleShowDetail"
          @on-select-all="selectMore"
          highlight-row
          border
          
          @on-select="selectMore"
          size="small"
          @on-row-click="selectRow"
          :loading="tableloading"
          :columns="tableHeader"
          :data="tableData"
        ></Table>
        <Page
          size="small"
          :current="tableConfig.page"
          :total="pageTotal"
          :page-size="tableConfig.pageSize"
          show-total
          show-elevator
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
          style="margin-top: 10px"
        ></Page>
      </Row>
    </Modal>

    <Modal width="800px" v-model="msgDetailPopus" title="消息查看">
      <h3 style="text-align:center">{{ msg.notify_type }}</h3>
      <div class="msg-content" v-html="msg.msgcontent"></div>
      <div slot="footer">
        <div>创建人：{{ msg.realname }}</div>
        <div>创建时间：{{ msg.senddate }}</div>
      </div>
    </Modal>

    <!-- 往期消息回顾 -->
    <Modal width="780px" footer-hide v-model="msgHistoryPopus" title="往期消息回顾" @on-ok="ok" @on-cancel="cancel">
      <div class="msg-history">
        <Button @click="handleNextLog(msg.previous_id)" class="msg-back" shape="circle">
          <Icon type="ios-arrow-back"></Icon>
        </Button>
        <Button @click="handleNextLog(msg.next_id)" class="msg-forward" shape="circle">
          <Icon type="ios-arrow-forward"></Icon>
        </Button>
        <div class="msg-title">{{ msg.notify_type }}</div>
        <div class="msg-content" v-html="msg.msgcontent"></div>
        <div class="msg-footer">创建人：{{ msg.realname }}</div>
        <div class="msg-footer">创建时间：{{ msg.senddate }}</div>
      </div>
    </Modal>
  </div>
</template>
<script>
import util from '@/libs/util.js';
import Cookies from 'js-cookie';
const companyDetail = () =>
  import(/* webpackChunkName: "CompanyDetail" */ '@views/woa-components/companyDetail/CompanyDetail.vue');
const customerDetail = () => import(/* webpackChunkName: "CompanyDetail" */ '@views/woa-components/customerDetail2/index.vue');
import changePassword from '@views/woa-components/updatePassword/index.vue';
import shrinkableMenu from '@views/main-components/shrinkable-menu/shrinkable-menu.vue';
import tagsPageOpened from '@views/main-components/tags-page-opened.vue';
import breadcrumbNav from '@views/main-components/breadcrumb-nav.vue';
import fullScreen from '@views/main-components/fullscreen.vue';
import lockScreen from '@views/main-components/lockscreen/lockscreen.vue';
import messageTip from '@views/main-components/message-tip.vue';
import themeSwitch from '@views/main-components/theme-switch/theme-switch.vue';
import systemComplain from '@views/stystemComplain/complainReply/complainReply';
import next from '@views/woa-components/next/flow.vue';
import setFinishTime from '@views/woa-components/setFinishTime/setFinishTime';
import fieldListByCompanyId from '@views/woa-components/fieldListByCompanyId/index.vue';
import aduitLog from '@views/order/orderApprove/common/aduitLog.vue';
//  新版全局性客户详情
import workOrderDetail from '@views/woa-components/workOrderDetail/index.vue';
import reLogin from '@views/woa-components/relogin/index.vue';
// 以下两个文件由于过大，单独打包
// import customerDetail from '@views/woa-components/customerDetail2/index.vue'
// import companyDetail from '@views/woa-components/companyDetail/CompanyDetail.vue'

import {
  queryCodes,
  queryWechatCompanyLog,
  updateLogStatus,
  logDetail,
  getUnreadNum,
  getNewLogDetail,
  listNotify
} from '@/api/logManagement';
import { Service } from '@/api/Service.js';
let typeMap = {};
let serviceApi = new Service('socket');
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
    workOrderDetail,
    reLogin,
    customerDetail,
    companyDetail
    //  需要使用时引入，并且只引入一次
    // customerDetail: () => import( /* webpackChunkName: "customer&companyDetail" */ './woa-components/customerDetail2/index.vue'),
    // companyDetail: ()=> import( /* webpackChunkName: "customer&companyDetail" */ './woa-components/companyDetail/CompanyDetail.vue'),
  },
  data() {
    return {
      msg: {
        title: 'ceshi',
        detail: '<img />'
      },
      selectData: [],
      msgCenterType: 'Y',
      unreadNum: 0,
      msgHistoryPopus: false,
      msgCenterPopus: false,
      websock: null,
      systemComplainStatus: true,
      globalRefresh: true,
      tipColse: false,
      spin_loading: true,
      show_stystem_complain: false,
      submit_button: false,
      rate: {
        content: '',
        star: 5
      },
      msgDetailPopus: false,
      file: [],
      // 是否弹出系统反馈框
      tip: false,
      shrink: false,
      userName: '',
      isFullScreen: false,
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
      tableHeader: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '模板名称',
          width: 180,
          key: 'msgtname',
          minWidth: 90
        },
        {
          title: '消息内容',
          width: 180,
          key: 'msg',
          minWidth: 90
        },
        {
          title: '手机',
          key: 'mobile',
          minWidth: 180
        },
        {
          title: '发送时间',
          width: 180,
          key: 'sendDate',
          minWidth: 90
        },
        {
          title: '接受人',
          width: 180,
          key: 'wechatname',
          minWidth: 90
        }
      ],
      tableData: [],
      tableConfig: {
        page: 1,
        pageSize: 5
      },
      pageTotal: '',
      tableloading: false
    };
  },
  computed: {
    menuList() {
      return this.$store.state.app.menuList;
    },
    pageTagsList() {
      return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
    },

    currentPath() {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    },
    avatorPath() {
      return localStorage.avatorImgPath;
    },
    cachePage() {
      return this.$store.state.app.cachePage;
    },
    lang() {
      return this.$store.state.app.lang;
    },
    menuTheme() {
      return this.$store.state.app.menuTheme;
    },
    mesCount() {
      return this.$store.state.app.messageCount;
    },
    //  页面缓存数组
    keepPage() {
      //  作为keep-alive 的include数组
      let temp = [];
      for (let i = 0; i < this.$store.state.app.pageOpenedList.length; i++) {
        temp.push(this.$store.state.app.pageOpenedList[i].name);
      }
      return temp;
    },
    //  业务相关-全局性变量
    gobalCustomerDetailShow() {
      return this.$store.state.gobal.gobalCustomerDetailShow;
    },
    gobalCustomer() {
      return this.$store.state.gobal.gobalCustomer;
    },
    gobalWorkorderDetailShow() {
      return this.$store.state.gobal.gobalWorkorderDetailShow;
    },
    gobalworkOrderId() {
      return this.$store.state.gobal.gobalworkOrderId;
    },
    gobalCompanyDetailShow() {
      return this.$store.state.gobal.gobalCompanyDetailShow;
    },
    gobalCompanyId() {
      return this.$store.state.gobal.gobalCompanyId;
    },
    //  设置完成时间存在莫名bug...激活取消事件之后窗口不消失，待确认
    gobalSetFinishTime() {
      return this.$store.state.gobal.gobalSetFinishTime;
    },
    gobalWorkorderDetail() {
      return this.$store.state.gobal.gobalWorkorderDetail;
    },
    gobalReloginShow() {
      return this.$store.state.gobal.gobalReloginShow;
    }
  },
  methods: {
    async getMsgData(type) {
      if (type) {
        this.tableConfig.page = 1;
        this.msgCenterType = type;
        this.tableConfig.read_flag = type;
      }
      try {
        this.tableloading = true;
        const resp = await queryWechatCompanyLog(this.tableConfig);
        this.tableData = resp.rows;
        this.pageTotal = resp.total;
      } catch (error) {
      } finally {
        this.tableloading = false;
      }
    },
    selectMore(value) {
      console.log(value)
      this.selectData = value;
    },
    handleShowDetail(e) {
      // this.msg.senddate = e.createdate;
      // this.msg.realname = e.createby_realname;
      // this.msg.msgcontent = e.notify_content;
      // this.msg.notify_type = typeMap[e.notify_type];
      // this.msgDetailPopus = true;
    },
    async handleUpdateStatus() {
      if (!this.selectData.length) {
        return this.$Message.info('请选择消息');
      }
      try {
        this.tableloading = true;
        let config = this.selectData.map(v => v.id).join(',');
        let resp = await updateLogStatus({ ids: config, read_flag: 'Y' });
        this.tableConfig.page = 1;
        this.getMsgData();
      } catch (error) {
      } finally {
        this.tableloading = false;
        this.selectData = [];
      }
    },

    pageChange(e) {
      this.tableConfig.page = e;
      this.getMsgData();
    },
    handleMsgCenter() {
      this.msgCenterPopus = true;
      this.getMsgData('N');
    },
    close_stystem_complain(e) {
      this.show_stystem_complain = false;
    },
    open_stystem_complain() {
      let _self = this;
      this.show_stystem_complain = true;
    },
    init() {
      let pathArr = util.setCurrentPath(this, this.$route.name);
      this.$store.commit('updateMenulist');
      if (pathArr.length >= 2) {
        this.$store.commit('addOpenSubmenu', pathArr[1].name);
      }
      this.userName = localStorage.getItem('realname');
      // this.userName = Cookies.get('user');
      let messageCount = 0;
      this.messageCount = messageCount.toString();
      this.checkTag(this.$route.name);
      this.$store.commit('setMessageCount', messageCount);
    },
    toggleClick() {
      this.shrink = !this.shrink;
    },
    handleClickUserDropdown(name) {
      var _self = this;

      if (name === 'ownSpace') {
        util.openNewPage(this, 'ownspace_index');
        this.$router.push({
          name: 'ownspace_index'
        });
      } else if (name === 'loginout') {
        // 退出登录
        this.$store.commit('logout', this);
        this.$store.commit('clearOpenedSubmenu');
        this.$store.commit('clearAllTags');
        this.$http.get('/api/user/logOut').then(function(response) {
          if (response.data.msgCode == '40000') {
            _self.$Message.success('注销成功!');
            Cookies.set('user', '');
            Cookies.set('password', '');
            Cookies.set('7password', '');
            Cookies.set('7user', '');
            Cookies.set('7issave', 'false');
            Cookies.set('feedback', '');
            setTimeout(() => {
              _self.$router.push({
                name: 'login'
              });
            }, 300);
          }
        });
      } else if (name === 'stystem_complain') {
        _self.open_stystem_complain();
      } else if (name === 'updatePassWord') {
        this.$bus.emit('CHANGE_PASSWORD', { realname: localStorage.getItem('realname'), id: localStorage.getItem('id') });
      }
    },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name === name) {
          return true;
        }
      });
      if (!openpageHasTag) {
        //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
      }
    },
    handleSubmenuChange(val) {
      // console.log(val)
    },
    async handleNextLog(id) {
      let resp = await logDetail({ id });
      this.msg = resp;
    },
    beforePush(name) {
      // if (name === 'accesstest_index') {
      //     return false;
      // } else {
      //     return true;
      // }
      return true;
    },
    fullscreenChange(isFullScreen) {
      // console.log(isFullScreen);
    },
    //  意见收集
    rate_start() {
      if (new Date().getDay() == 1) {
        Cookies.set('feedback', '');
      }
      if (localStorage.getItem('id') == 10059) {
        return;
      }

      if (Cookies.get('feedback') == 'finished') {
        console.log(Cookies.get('feedback'));
        return;
      }
      let _self = this;
      let url = `api/system/checkSystemFeedbackStatusByUserId`;
      let config = {
        params: {
          userid: localStorage.getItem('id')
        }
      };

      function success(res) {
        if (res.data.data.isNeedFeedback == 'N') {
          // if(localStorage.getItem('id')==10059){
          // _self.tip = false
          // }else{
          // _self.tip = true
          // }
        } else {
          _self.tip = false;
          Cookies.set('feedback', 'finished', { expires: 7 });
        }
      }

      function fail(res) {}

      this.$Get(url, config, success, fail);
    },
    submit_index() {
      let _self = this;
      if (this.rate.star == '' || this.rate.content == '') {
        this.$Message.warning('请您填写评价项目，谢谢合作！');
      } else {
        this.submit();
      }
    },
    submit() {
      // localStorage.setItem('isTip',"Y")
      // this.tip = false
      let _self = this;
      let url = `api/system/createSystemFeedback`;
      _self.submit_button = true;
      let config = {
        score: _self.rate.star,
        suggestion: _self.rate.content
      };
      function success(res) {
        _self.tip = false;
        _self.submit_button = false;
      }
      function fail(res) {
        _self.submit_button = false;
      }

      this.$Post(url, config, success, fail);
    },
    reset() {
      this.rate.star = '';
      this.rate.content = '';
    },
    handleUpload(file) {
      this.file.push(file);
      return false;
    },
    //  双击标签更新页面
    updateMainContent(e) {
      this.globalRefresh = false;
      // console.log(e)
      setTimeout(() => {
        this.$store.commit('increateTagOnIndex', { tagObj: e.tag, index: e.id });
        this.globalRefresh = true;
      }, 0);
    },
    async initWebSocket() {
      const { port, key } = await serviceApi.auth();
      const wsuri = `ws://192.168.0.220:${port}/wechat/company/notify/${key}`;
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonmessage(e) {
      console.log(e);
      try {
        let msg = JSON.parse(e.data) || {};
        this.$Notice.info({
          title: typeMap[msg.notifyType],
          render: h => {
            return h('span', [
              `${msg.msgContent}`,
              h(
                'a',
                {
                  on: {
                    click: async e => {
                      try {
                        let resp = await logDetail({ id: msg.companyWechatLogId });
                        this.msg = resp;
                        this.msgDetailPopus = true;
                      } catch (error) {}
                    }
                  }
                },
                '...查看消息'
              )
            ]);
          },
          name: msg.companyWechatLogId,
          onClose(e) {}
        });
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
      }, 3000);
    },
    websocketclose(e) {
      console.log('断开连接', e);
    }
  },
  watch: {
    $route(to) {
      this.$store.commit('setCurrentPageName', to.name);
      let pathArr = util.setCurrentPath(this, to.name);
      if (pathArr.length > 2) {
        this.$store.commit('addOpenSubmenu', pathArr[1].name);
      }
      this.checkTag(to.name);
    },
    lang() {
      util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
    }
  },
  mounted() {
    this.initWebSocket();

    // setInterval(() => {
    //   this.websocketsend('定时任务');
    //   console.log('策划师');
    // }, 2000);
    this.init();
    this.rate_start();
    this.spin_loading = false;
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
  async created() {
    // 显示打开的页面的列表
    this.$store.commit('setOpenedList');
    typeMap = await queryCodes('notify_template_type', true);
    this.unreadNum = await getUnreadNum();
    if (this.unreadNum > 0) {
      this.msg = await getNewLogDetail();
      this.msgHistoryPopus = true;
    }
  }
};
</script>

<style lang="less">
.lock-screen-back {
  border-radius: 50%;
  z-index: -1;
  box-shadow: 0 0 0 0 #667aa6 inset;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: all 3s;
}
.msg-content {
  position: relative;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  img {
    max-height: 800px;
    max-width: 800px;
  }
}
.msg-title {
  text-align: center;
  font-size: 18px;
}
.msg-footer {
  text-align: right;
  font-size: 14px;
  padding-right: 20px;
}
.msg-back {
  position: absolute;
  top: 50%;
  opacity: 0.3;
  width: 40px;
  height: 40px;
  left: 20px;
  z-index: 1;
}
.msg-forward {
  position: absolute;
  opacity: 0.3;
  top: 50%;
  width: 40px;
  height: 40px;
  right: 20px;
  z-index: 1;
}
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  .unlock-con {
    width: 0px;
    height: 0px;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 11000;
  }
  .sidebar-menu-con {
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 21;
    transition: width 0.3s;
  }
  .layout-text {
    display: inline-block;
    white-space: nowrap;
    position: absolute;
  }
  .main-hide-text .layout-text {
    display: none;
  }
  &-content-container {
    position: relative;
  }
  .header-laba {
    position: absolute;
    top: 20px;
    left: 50px;
    img {
      width: 40px;
      height: 40px;
    }
  }
  &-header-con {
    box-sizing: border-box;
    position: fixed;
    display: block;
    padding-left: 200px;
    width: 100%;
    height: 100px;
    z-index: 20;
    box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
    transition: padding 0.3s;
  }
  &-breadcrumb {
    padding: 8px 15px 0;
  }
  &-menu-left {
    background: #464c5b;
    height: 100%;
  }
  .tags-con {
    height: 40px;
    z-index: -1;
    overflow: hidden;
    background: #f0f0f0;
    .tags-outer-scroll-con {
      position: relative;
      box-sizing: border-box;
      padding-right: 120px;
      width: 100%;
      height: 100%;
      .tags-inner-scroll-body {
        position: absolute;
        padding: 2px 10px;
        overflow: visible;
        white-space: nowrap;
        transition: left 0.3s ease;
      }
      .close-all-tag-con {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 8px;
        text-align: center;
        width: 110px;
        height: 100%;
        background: white;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
        z-index: 10;
      }
    }
  }
  .header-laba {
    position: absolute;
    top: 10px;
    left: 60px;
    cursor: pointer;

    img {
      height: 40px;
      width: 40px;
    }
  }

  &-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
    position: relative;
    z-index: 11;
    .navicon-con {
      margin: 6px;
      display: inline-block;
    }
    .header-middle-con {
      position: absolute;
      left: 60px;
      top: 0;
      right: 340px;
      bottom: 0;
      padding: 10px;
      overflow: hidden;
    }
    .header-avator-con {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 300px;
      .switch-theme-con {
        display: inline-block;
        width: 40px;
        height: 100%;
      }
      .message-con {
        display: inline-block;
        width: 30px;
        padding: 18px 0;
        text-align: center;
        cursor: pointer;
        i {
          vertical-align: middle;
        }
      }
      .change-skin {
        font-size: 14px;
        font-weight: 500;
        padding-right: 5px;
      }
      .switch-theme {
        height: 100%;
      }
      .user-dropdown {
        &-menu-con {
          position: absolute;
          right: 0;
          top: 0;
          width: 150px;
          height: 100%;
          .main-user-name {
            display: inline-block;
            width: 80px;
            word-break: keep-all;
            white-space: nowrap;
            vertical-align: middle;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: right;
          }
        }
        &-innercon {
          height: 100%;
          padding-right: 14px;
        }
      }
      .full-screen-btn-con {
        display: inline-block;
        width: 30px;
        padding: 18px 0;
        text-align: center;
        cursor: pointer;
        i {
          vertical-align: middle;
        }
      }
      .lock-screen-btn-con {
        display: inline-block;
        width: 30px;
        padding: 18px 0;
        text-align: center;
        cursor: pointer;
        i {
          vertical-align: middle;
        }
      }
    }
  }
  .single-page-con {
    position: absolute;
    top: 100px;
    right: 0;
    bottom: 0;
    overflow: auto;
    background-color: #f0f0f0;
    z-index: 1;
    transition: left 0.3s;
    .single-page {
      margin: 10px;
    }
  }
  &-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
}
.taglist-moving-animation-move {
  transition: transform 0.3s;
}

.logo-con {
  padding: 8px;
  text-align: center;
  img {
    height: 44px;
    width: auto;
  }
}
</style>