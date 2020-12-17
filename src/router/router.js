/* eslint-disable */
import Main from "@/layouts/Main.vue";
// import 版路由
// test作为测试页面接口，不部署到生产阶段，路径test也只适用于开发阶段
// import Test from '@/views/test/App.vue'
// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: "/login",
  name: "login",
  meta: {},
  component: () =>
    import(/* webpackChunkName: "Login" */ "@/layouts/login.vue"),
};

export const page404 = {
  path: "/*",
  name: "error-404",
  meta: {},
  component: () =>
    import(/* webpackChunkName: "commonIndex" */ "@/layouts/404.vue"),
};

export const page403 = {
  path: "/403",
  meta: {},
  name: "error-403",
  component: () =>
    import(/* webpackChunkName: "commonIndex" */ "@/layouts/403.vue"),
};

export const page500 = {
  path: "/500",
  meta: {},
  name: "error-500",
  component: () =>
    import(/* webpackChunkName: "commonIndex" */ "@/layouts/500.vue"),
};

export const arrearageCenter = {
  path: "/arrearageCenter",
  meta: {},
  name: "arrearageCenter",
  component: () =>
    import(/* webpackChunkName: "commonIndex" */ "@/views/arrearageCenter/index.vue"),
};

export const accountantCenter = {
  path: "/accountantCenter",
  meta: {},
  name: "accountantCenter",
  component: () =>
    import(/* webpackChunkName: "accountantCenter" */ "@/views/accounterManager/proxyAccounterManger/home.vue"),
};
//  暂时不需要使用的页面
//  文章预览
// export const preview = {
//     path: '/preview',
//     name: 'preview',
//     component: resolve => {
//         require(['@/views/form/article-publish/preview.vue'], resolve);
//     }
// };

// //  锁屏
// export const locking = {
//     path: '/locking',
//     name: 'locking',
//     component: resolve => {
//         require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve);
//     }
// };

// //  文件预览
// export const previewFile = {
//     path: '/previewFile/:id',
//     name: 'previewFile',
//     component: resolve => {
//         require(['@/views/woa-components/filePreview/index.vue'], resolve);
//     }
// }

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: "/",
  name: "otherRouter",
  redirect: "/home",
  component: Main,
  children: [
    {
      path: "home",
      title: "首页",
      name: "home_index",
      component: () =>
        import(/* webpackChunkName: "commonIndex" */ "@/views/home/common_index/home.vue"),
    },
    {
      path: "cannelIndex",
      title: "渠道首页",
      name: "cannelIndex_index",
      component: () =>
        import(/* webpackChunkName: "cannelIndex" */ "@/views/home/cannel_index/cannelIndex.vue"),
    },
    {
      path: "commercialIndex",
      title: "商事首页",
      name: "commercialIndex_index",
      component: () =>
        import(/* webpackChunkName: "commercialIndex" */ "@/views/home/commercial_index/commercialIndex.vue"),
    },
    {
      path: "accountIndex",
      title: "会计首页",
      name: "accountIndex_index",
      component: () =>
        import(/* webpackChunkName: "accountIndex" */ "@/views/home/account_index/accountIndex.vue"),
    },
    {
      path: "marketIndex",
      title: "市场首页",
      name: "marketIndex_index",
      component: () =>
        import(/* webpackChunkName: "marketIndex" */ "@/views/home/market_index/marketIndex.vue"),
    },
    // 待开发，无原型
    // {
    //     path: 'auditIndex',
    //     title: '审计首页',
    //     name: 'auditIndex_index',
    //     component: () => import(/* webpackChunkName: "auditIndex" */ '@/views/home/audit_index/auditIndex.vue')
    // },
    // {
    //     path: 'planIndex',
    //     title: '企划首页',
    //     name: 'planIndex_index',
    //     component: () => import(/* webpackChunkName: "planIndex" */ '@/views/home/plan_index/planIndex.vue')
    // },
    {
      path: "ownspace",
      title: "个人中心",
      name: "ownspace_index",
      component: () =>
        import(/* webpackChunkName: "ownspace" */ "@/views/own-space/own-space.vue"),
    },
    {
      path: "message",
      title: "消息中心",
      name: "message_index",
      component: () =>
        import(/* webpackChunkName: "commonIndex" */ "@/views/message/message.vue"),
    },
    {
      path: "allot/:depart",
      title: "工单分配",
      name: "allot",
      component: () =>
        import(/* webpackChunkName: "workorderAllot" */ "@/views/woa-components/allot-task/allotCommonTask/index.vue"),
    },
    {
      path: "productPrice/:id",
      title: "修改产品价格",
      access: 6013,
      name: "updateProductPrice",
      component: () =>
        import(/* webpackChunkName: "productList" */ "@/views/productManagement/updateProductPrice/index.vue"),
    },
    {
      path: "productDetail/:id",
      title: "产品详情",
      access: 6013,
      name: "productDetail",
      component: () =>
        import(/* webpackChunkName: "productDetail" */ "@/views/productManagement/productDetail/index.vue"),
    },
    {
      path: "productAnalysis",
      title: "产品数据分析",
      access: 6013,
      name: "productAnalysis",
      component: () =>
        import("@/views/productManagement/productAnalysis/index.vue"),
    },
    {
      path: "customerList",
      title: "客户列表",
      name: "customerList",
      component: () =>
        import(/* webpackChunkName: "customerList" */ "@/views/home/market_index/customerList/index.vue"),
    },
  ],
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  // 测试分支
  // {
  //     path: '/test',
  //     icon: 'alert-circled',
  //     name: 'test',
  //     title: 'Test',
  //     component: Main,
  //     children: [
  //         // {
  //         //     path: 'test',
  //         //     title: '测试页面',
  //         //     name: '富文本编辑器测试',
  //         //     component: () => import(/* webpackChunkName: "test" */ '@/views/test/components/main.vue')
  //         //     // component: () => import(/* webpackChunkName: "test" */ '@/views/woa-components/filePreview/index.vue')
  //         // },
  //         // {
  //         //     path: 'test2',
  //         //     title: '日程测试',
  //         //     name: 'test2_index',
  //         //     component: () => import(/* webpackChunkName: "test" */ '@/views/test/components/test2.vue')
  //         // },
  //         // {
  //         //     path: 'test3',
  //         //     title: '滑动验证码',
  //         //     name: 'test3_index',
  //         //     component: () => import( /* webpackChunkName: "test" */ '@/views/test/components/test3.vue')
  //         // },
  //         {
  //             path: 'test4',
  //             title: 'canvas个人页制作',
  //             name: 'test4_index',
  //             component: () => import( /* webpackChunkName: "test" */ '@/views/test/components/test4.vue')
  //         },
  //         // {
  //         //     path: 'test5',
  //         //     title: 'html2canvas',
  //         //     name: 'test05_index',
  //         //     component: () => import( /* webpackChunkName: "test" */ '@/views/test/components/test5.vue')
  //         // }
  //         {
  //             path: 'test6',
  //             title: 'iviewTest',
  //             name: 'test6_index',
  //             component: () => import('@/views/test/components/test6.vue')
  //         },
  //         {
  //             path: 'test7',
  //             title: '异常工单审批表',
  //             name: 'test07_index',
  //             component: () => import( /* webpackChunkName: "test" */ '@/views/test/components/abnormalWorkOrder.vue')
  //         }
  //     ]
  // },
  {
    access: 6001,
    meta: 6001,
    path: "/customerManagement",
    icon: "social-windows",
    name: "customerManagement",
    title: "客户管理",
    component: Main,
    children: [
      {
        access: 6002,
        meta: 6002,
        path: "marketingManagement",
        title: "营销管理",
        name: "marketingManagement_index",
        component: () =>
          import(/* webpackChunkName: "marketingManagement_index" */ "@/views/customerManagement/marketingManagement2"),
      },
      {
        access: 11617,
        meta: 11617,
        path: "customerAccount",
        title: "账户管理",
        name: "customerAccount_index",
        component: () =>
          import(/* webpackChunkName: "customerAccount_index" */ "@/views/customerManagement/customerAccount/index.vue"),
      },
      {
        access: 6003,
        meta: 6003,
        path: "customerTabManagement",
        title: "客户标签管理",
        name: "customerTabManagement_index",
        component: () =>
          import(/* webpackChunkName: "customerTabManagement_index" */ "@/views/customerManagement/customerTabManagement/customerTabManagement.vue"),
      },
      {
        access: 6114,
        meta: 6114,
        path: "customerLog",
        title: "客户日志",
        name: "customerLog_index",
        component: () =>
          import(/* webpackChunkName: "customerLog_index" */ "@/views/customerManagement/customerLog/index.vue"),
      },
      {
        access: 11659,
        meta: 11659,
        path: "customerBelong",
        title: "客户归属",
        name: "customerBelong_index",
        component: () =>
          import(/* webpackChunkName: "customerLog_index" */ "@/views/customerManagement/customerBelong/customerBelong.vue"),
      },
      {
        access: 11657,
        meta: 11657,
        path: "resourceManager",
        title: "资源池管理",
        name: "resourceManager_index",
        component: () =>
          import(/* webpackChunkName: "resourceManager_index" */ "@/views/customerManagement/resourceManager/index.vue"),
      },
      // {
      //   access: 11657,
      //   meta: 11657,
      //   path: 'testPackage',
      //   title: '测试包管理',
      //   name: 'testPackage_index',
      //   component: () =>
      //     import(/* webpackChunkName: "testPackage_index" */ '@/views/testPackage/test.vue')
      // },
    ],
  },
  {
    access: 6200,
    meta: 6200,
    path: "/missionCenter",
    icon: "calendar",
    name: "missionCenter",
    title: "任务中心",
    component: Main,
    children: [
      {
        access: 6201,
        meta: 6201,
        path: "schedule",
        title: "日程",
        name: "schedule_index",
        component: () =>
          import(/* webpackChunkName: "schedule_index" */ "@/views/missionCenter/schedule/index.vue"),
      },
      {
        access: 11631,
        meta: 11631,
        path: "comSchedule",
        title: "商事排程",
        name: "business_schedule_index",
        component: () =>
          import(/* webpackChunkName: "business_schedule_index" */ "@/views/missionCenter/comSchedule/index.vue"),
      },
      {
        access: 11632,
        meta: 11632,
        path: "accounterLegTask",
        title: "会计任务",
        name: "accounterLegTask_index",
        component: () =>
          import(/* webpackChunkName: "accounterLegTask_index" */ "@/views/missionCenter/accounterLegTask/index.vue"),
      },
      {
        access: 11633,
        meta: 11633,
        path: "marketLegTask",
        title: "市场外勤任务",
        name: "marketLegTask_index",
        component: () =>
          import(/* webpackChunkName: "marketLegTask_index" */ "@/views/missionCenter/marketLegTask/index.vue"),
      },
      {
        access: 11634,
        meta: 11634,
        path: "normalLegTask",
        title: "普通外勤任务",
        name: "normalLegTask_index",
        component: () =>
          import(/* webpackChunkName: "normalLegTask_index" */ "@/views/missionCenter/normalLegTask/index.vue"),
      },
      {
        access: 11643,
        meta: 11643,
        path: "remindTask",
        title: "提醒任务",
        name: "remindTask_index",
        component: () =>
          import(/* webpackChunkName: "remindTask_index" */ "@/views/missionCenter/remindTask/index.vue"),
      },
      {
        access: 11644,
        meta: 11644,
        path: "customerService",
        title: "客服任务",
        name: "customerServiceIndex",
        component: () =>
          import(/* webpackChunkName: "customerServiceIndex" */ "@/views/missionCenter/customerService/index.vue"),
      },
      {
        access: 11635,
        meta: 11635,
        path: "legworkAssWorkorder",
        title: "外勤协助工单",
        name: "legworkAssWorkorder_index",
        component: () =>
          import(/* webpackChunkName: "legworkAssWorkorder_index" */ "@/views/missionCenter/legworkAssWorkorder/index.vue"),
      },
      {
        access: 11636,
        meta: 11636,
        path: "legworkAssWorkorderAudit",
        title: "外勤协助审核 ",
        name: "legworkAssWorkorderAudit_index",
        component: () =>
          import(/* webpackChunkName: "legworkAssWorkorderAudit_index" */ "@/views/missionCenter/legworkAssWorkorderAudit/index1.vue"),
      },
      {
        access: 6202,
        meta: 6202,
        path: "missionManagement",
        title: "任务管理",
        name: "missionManagement_index",
        component: () =>
          import(/* webpackChunkName: "missionManagement_index" */ "@/views/missionCenter/missionManagement/index.vue"),
      },
      {
        access: 11639,
        meta: 11639,
        path: "marketTaskList",
        title: "市场任务管理",
        name: "marketTaskList_index",
        component: () =>
          import(/* webpackChunkName: "marketTaskList_index" */ "@/views/missionCenter/marketTaskList/index.vue"),
      },
      {
        access: 11640,
        meta: 11640,
        path: "busiTaskList",
        title: "商事任务管理",
        name: "busiTaskList_index",
        component: () =>
          import(/* webpackChunkName: "busiTaskList_index" */ "@/views/missionCenter/busiTaskList/index.vue"),
      },
      {
        access: 11641,
        meta: 11641,
        path: "accTaskList",
        title: "会计任务管理",
        name: "accTaskList_index",
        component: () =>
          import(/* webpackChunkName: "accTaskList_index" */ "@/views/missionCenter/accTaskList/index.vue"),
      },
    ],
  },
  // 计划删除菜单，开发终止
  // {
  //     access: 6004,
  //     path: '/companyManagement',
  //     icon: 'social-windows',
  //     name: 'companyManagement',
  //     title: '企业管理',
  //     component:Main,
  //     children:[
  //         {
  //             access: 6004,
  //             path: 'companyManagement',
  //             title: '企业管理',
  //             name: 'companyManagement_index',
  //             component: () => import(/* webpackChunkName: "companyManagement_index" */ '@/views/companyManagement/components/main.vue')
  //         }
  //     ]
  // },
  {
    access: 6110,
    meta: 6110,
    path: "/marketplaceManagement",
    icon: "home",
    name: "marketplaceManagement",
    title: "市场管理",
    component: Main,
    children: [
      {
        access: 6111,
        meta: 6111,
        path: "customerFollowUp",
        title: "跟进记录管理",
        name: "customerFollowUp_index",
        component: () =>
          import(/* webpackChunkName: "customerFollowUp_index" */ "@/views/marketplaceManagement/followUpData/followUpdata.vue"),
      },
      {
        access: 6112,
        meta: 6112,
        path: "market_rule_index",
        title: "销售规则管理",
        name: "market_rule_index",
        component: () =>
          import(/* webpackChunkName: "market_rule_index" */ "@/views/marketplaceManagement/rule/index.vue"),
      },
      {
        access: 6113,
        meta: 6113,
        path: "person_target_index",
        title: "销售目标管理",
        name: "person_target_index",
        component: () =>
          import(/* webpackChunkName: "person_target_index" */ "@/views/marketplaceManagement/personTarget/index.vue"),
      },
      {
        access: 6115,
        meta: 6115,
        path: "statistics",
        title: "销售统计",
        name: "statistics_index",
        component: () =>
          import(/* webpackChunkName: "statistics_index" */ "@/views/marketplaceManagement/statistics/index.vue"),
      },
      {
        access: 11609,
        meta: 11609,
        path: "clueControl",
        title: "公海池控制",
        name: "clueControl_index",
        component: () =>
          import(/* webpackChunkName: "clueControl_index" */ "@/views/marketplaceManagement/clueControl/index.vue"),
      },
    ],
  },
  {
    access: 6005,
    meta: 6005,
    path: "/channelManagement",
    icon: "social-windows",
    name: "channelManagement",
    title: "渠道管理",
    component: Main,
    children: [
      {
        access: 6006,
        meta: 6006,
        path: "channelCustomer",
        title: "渠道客户管理",
        name: "channelCustomer_index",
        component: () =>
          import(/* webpackChunkName: "channelCustomer_index" */ "@/views/channelManagement/channelCustomer/channelCustomer.vue"),
      },
      {
        access: 6007,
        meta: 6007,
        path: "channelType",
        title: "渠道类型管理",
        name: "channelType_index",
        component: () =>
          import(/* webpackChunkName: "channelType_index" */ "@/views/channelManagement/channelType/channelType_index.vue"),
      },
      {
        access: 6008,
        meta: 6008,
        path: "transactionRecord",
        title: "交易查询",
        name: "transactionRecord_index",
        component: () =>
          import(/* webpackChunkName: "transactionRecord_index" */ "@/views/channelManagement/transactionRecord/transactionRecord.vue"),
      },
      {
        access: 11642,
        meta: 11642,
        path: "parkManagement",
        title: "园区内容管理",
        name: "parkManagement_index",
        component: () =>
          import(/* webpackChunkName: "parkManagement_index" */ "@/views/channelManagement/parkManagement/parkManagement.vue"),
      },
    ],
  },
  {
    access: 6009,
    meta: 6009,
    path: "/cluesLibrary",
    icon: "android-share-alt",
    name: "cluesLibrary",
    title: "线索库",
    component: Main,
    children: [
      {
        access: 6010,
        meta: 6010,
        path: "cluesLibraryM",
        title: "线索库管理",
        name: "cluesLibrary_index",
        component: () =>
          import(/* webpackChunkName: "cluesLibrary_index" */ "@/views/cluesLibrary/cluesLibraryTable/cluesLibrary_table.vue"),
      },
      {
        access: 6011,
        meta: 6011,
        path: "cluesLabels",
        title: "线索标签管理",
        name: "cluesLabels_index",
        component: () =>
          import(/* webpackChunkName: "cluesLabels_index" */ "@/views/cluesLibrary/cluesLabelManagement/cluesLabels.vue"),
      },
      {
        access: 6099,
        meta: 6099,
        path: "cluelibrarytemplate",
        title: "线索模板",
        name: "clueLibraryTemplate_index",
        component: () =>
          import(/* webpackChunkName: "clueLibraryTemplate_index" */ "@/views/cluesLibrary/clueLibraryTemplate/index.vue"),
      },
    ],
  },
  {
    path: "/customerService",
    icon: "person",
    name: "customerService",
    meta: 6060,
    access: 6060,
    title: "客服管理",
    component: Main,
    children: [
      {
        access: 6048,
        path: "complaintcenter",
        title: "投诉管理",
        meta: 6048,
        name: "complaintcenter_index",
        component: () =>
          import(/* webpackChunkName: "complaintcenter_index" */ "@/views/customerService/complaintCenter/complaintcenter_index.vue"),
      },
      {
        path: "returnVisit",
        access: 6061,
        meta: 6061,
        title: "客户回访",
        name: "returnVisit_index",
        component: () =>
          import(/* webpackChunkName: "complaintcenter" */ "@/views/customerService/returnVisit/table/returnVisit_table.vue"),
      },
      {
        path: "returnWorkOrder",
        access: 6100,
        meta: 6100,
        title: "完结工单回访",
        name: "returnWorkOrder_index",
        component: () =>
          import(/* webpackChunkName: "complaintcenter" */ "@/views/customerService/returnWorkOrder/table/returnVisit_table.vue"),
      },
      {
        path: "ordercallback",
        access: 11645,
        meta: 11645,
        title: "下单回访",
        name: "ordercallback_index",
        component: () =>
          import(/* webpackChunkName: "ordercallback" */ "@/views/customerService/ordercallback/table/returnVisit_table.vue"),
      },
      {
        path: "offlineCustomer",
        access: 6062,
        meta: 6062,
        title: "下线客户",
        name: "offlineCustomer_index",
        component: () =>
          import(/* webpackChunkName: "complaintcenter" */ "@/views/customerService/offlineCustomer/table/offline_index.vue"),
      },
      {
        path: "offlineCustomerApproval",
        access: 11625,
        meta: 11625,
        title: "下线客户审批",
        name: "offlineCustomerApproval_index",
        component: () =>
          import(/* webpackChunkName: "complaintcenter" */ "@/views/customerService/offlineCustomerApproval/index.vue"),
      },
      {
        access: 11613,
        path: "customerRate",
        title: "客户评价",
        meta: 11613,
        name: "customerRate_index",
        component: () =>
          import(/* webpackChunkName: "complaintcenter_index" */ "@/views/customerService/customerRate/index.vue"),
      },
    ],
  },
  {
    access: 6012,
    path: "/product",
    icon: "social-windows",
    name: "product",
    title: "产品管理",
    component: Main,
    children: [
      {
        access: 6013,
        path: "productList",
        title: "产品列表",
        name: "productList_index",
        component: () =>
          import(/* webpackChunkName: "productList" */ "@/views/productManagement/productListNew/index.vue"),
      },
      {
        access: 6014,
        path: "productType",
        title: "产品类型",
        name: "productType_index",
        component: () =>
          import(/* webpackChunkName: "productList" */ "@/views/productManagement/productTypeNew/index.vue"),
      },
      {
        access: 6015,
        path: "productAttrList",
        title: "属性管理",
        name: "productAttrList_index",
        component: () =>
          import(/* webpackChunkName: "productList" */ "@/views/productManagement/productAttrList/index.vue"),
      },
      {
        access: 11618,
        path: "productProcess",
        title: "产品流程",
        name: "productProcess_index",
        component: () =>
          import(/* webpackChunkName: "productList" */ "@/views/productManagement/productProcess/index.vue"),
      },
      {
        access: 11619,
        path: "flowChart",
        title: "流程图",
        name: "flowChart_index",
        component: () =>
          import(/* webpackChunkName: "productList" */ "@/views/productManagement/flowChart/index.vue"),
      },
      // 此部分已由iview-area代替
      // {
      //     access: 6016,
      //     path: 'areaManagement',
      //     title: '地区管理',
      //     name: 'areaManagement_index',
      //     component: () => import(/* webpackChunkName: "productList" */ '@/views/productManagement/productType/areaManagement.vue')
    ],
  },
  {
    access: 6017,
    meta: 6017,
    path: "/orderManagement",
    icon: "social-windows",
    name: "orderManagement",
    title: "订单管理",
    component: Main,
    children: [
      {
        meta: 6018,
        access: 6018,
        path: "orderList",
        title: "订单列表",
        name: "orderList_index",
        component: () =>
          import(/* webpackChunkName: "orderList_index" */ "@/views/order/orderList/orderListIndex.vue"),
      },
      {
        access: 6019,
        meta: 6019,
        path: "orderApprove",
        title: "订单审批",
        name: "orderApprove_index",
        component: () =>
          import(/* webpackChunkName: "orderApprove_index" */ "@/views/order/orderApprove/index.vue"),
      },
      // 重构版异常工单（已废弃，可以参考；不推荐项目现有写法）
      // {
      //     access: 6019,
      //     meta: 6019,
      //     path: 'errorWorkOrder',
      //     title: '异常工单',
      //     name: 'errorWorkOrder_index',
      //     component: () => import( /* webpackChunkName: "errorWorkOrder_index" */ '@/views/order/errorWorkOrder/index.vue')
      // },
      // {
      //     access: 6019,
      //     meta: 6019,
      //     path: 'errorWorkOrderApprove',
      //     title: '异常审批',
      //     name: 'errorWorkOrderApprove_index',
      //     component: () => import( /* webpackChunkName: "errorWorkOrder_index" */ '@/views/order/errorWorkOrderApprove/index.vue')
      // },
      {
        access: 6020,
        meta: 6020,
        path: "spareManagement",
        title: "余款管理",
        name: "spareManagement",
        component: () =>
          import(/* webpackChunkName: "spareManagement_index" */ "@/views/order/spareManagement/spareManagement"),
      },
      {
        access: 11602,
        meta: 11602,
        path: "invoiceManagement",
        title: "发票管理",
        name: "invoicelist_index",
        component: () =>
          import(/* webpackChunkName: "invoicelist_index" */ "@/views/order/invoiceManagement/index.vue"),
      },
      {
        access: 11622,
        meta: 11622,
        path: "abnormalOrderList",
        title: "异常工单",
        name: "abnormalOrderList_index",
        component: () =>
          import(/* webpackChunkName: "abnormalOrderList_index" */ "@/views/order/abnormalOrderList/index.vue"),
      },
      {
        access: 11623,
        meta: 11623,
        path: "abOrderApprove",
        title: "异常审批",
        name: "abOrderApprove_index",
        component: () =>
          import(/* webpackChunkName: "abOrderApprove_index" */ "@/views/order/abOrderApprove/index.vue"),
      },
      {
        access: 11652,
        meta: 11652,
        path: "arrearsOrder",
        title: "欠费单",
        name: "arrearsOrder_index",
        component: () =>
          import(/* webpackChunkName: "arrearsOrder_index" */ "@/views/order/arrearsOrder/index.vue"),
      },
      {
        access: 11653,
        meta: 11653,
        path: "arrearsOrderApprove",
        title: "欠费单审批",
        name: "arrearsOrderApprove_index",
        component: () =>
          import(/* webpackChunkName: "arrearsOrderApprove_index" */ "@/views/order/arrearsOrderApprove/index.vue"),
      },
      // {
      //     access:6020,
      //     path: 'orderLog',
      //     title: '订单变更日志',
      //     name: 'orderLog_index',
      //     component: () => import(/* webpackChunkName: "orderLog_index" */ '@/views/order/orderLog/index.vue')
    ],
  },
  {
    access: 11614,
    meta: 11614,
    path: "/refundmanagement",
    icon: "social-windows",
    title: "退款管理",
    name: "refundManagement",
    component: Main,
    children: [
      {
        access: 11615,
        meta: 11615,
        path: "refundOrderList",
        title: "退款订单",
        name: "refundOrderList_index",
        component: () =>
          import(/* webpackChunkName: "refundOrderList_index" */ "@/views/refundManagement/refundOrderList/index.vue"),
      },
      {
        access: 11616,
        meta: 11616,
        path: "refundWorkOrderList",
        title: "退款工单",
        name: "refundWorkOrderList_index",
        component: () =>
          import(/* webpackChunkName: "refundWorkOrderList_index" */ "@/views/refundManagement/refundWorkOrderList/index.vue"),
      },
    ],
  },
  {
    access: 11663,
    meta: 11663,
    path: "/customerRefundManagement",
    icon: "social-windows",
    title: "客户退款管理",
    name: "customerRefundManagement",
    component: Main,
    children: [
      {
        access: 11664,
        meta: 11664,
        path: "customerRefundOrderList",
        title: "客户退款订单",
        name: "customerRefundOrderList",
        component: () =>
          import(/* webpackChunkName: "customerRefundOrderList" */ "@/views/customerRefundManagement/customerRefundOrderList/index.vue"),
      },
      {
        access: 11665,
        meta: 11665,
        path: "customerRefundWorkOrderList",
        title: "客户退款工单",
        name: "customerRefundWorkOrderList",
        component: () =>
          import(/* webpackChunkName: "customerRefundWorkOrderList" */ "@/views/customerRefundManagement/customerRefundWorkOrderList/index.vue"),
      },
    ],
  },
  {
    access: 6035,
    meta: 6035,
    path: "/commercialmanagement",
    icon: "social-windows",
    title: "商事管理",
    name: "commercialManagement",
    component: Main,
    children: [
      {
        access: 6049,
        meta: 6049,
        path: "bussiness/allot",
        redirect: {
          name: "allot",
          params: {
            depart: "BUSSINESS",
          },
        },
        title: "工单分配",
        name: "allotBussinessWorkOrder",
      },
      {
        access: 6038,
        meta: 6038,
        path: "mycommontaskmanagement",
        title: "工单管理",
        name: "commercialTaskManagement",
        component: () =>
          import(/* webpackChunkName: "commercialTaskManagement" */ "@/views/commercialManagement/myCommonTask/myCommonTask_table.vue"),
      },
      {
        access: 6037,
        meta: 6037,
        path: "schedule",
        title: "商事排程表",
        name: "newSchedule",
        component: () =>
          import(/* webpackChunkName: "newSchedule" */ "@/views/commercialManagement/newSchedule/index.vue"),
      },
      {
        access: 11666,
        meta: 11666,
        path: "commercialPerformanceManagement",
        title: "商事绩效管理",
        name: "commercialPerformanceManagement",
        component: () =>
          import(/* webpackChunkName: "commercialPerformanceManagement" */ "@/views/commercialManagement/commercialPerformanceManagement/index.vue"),
      },
    ],
  },
  {
    access: 6040,
    meta: 6040,
    path: "/planmanagement",
    icon: "social-windows",
    title: "企划管理",
    name: "planManagement",
    component: Main,
    children: [
      {
        access: 6051,
        meta: 6051,
        path: "plan/allot",
        redirect: {
          name: "allot",
          params: {
            depart: "PLAN",
          },
        },
        title: "工单分配",
        name: "allotPlanWorkOrder",
      },
      {
        access: 6052,
        meta: 6052,
        path: "plantaskmanagement",
        title: "工单管理",
        name: "plantaskmanagement",
        component: () =>
          import(/* webpackChunkName: "plantaskmanagement" */ "@/views/planManagement/myCommonTask/myCommonTask_table.vue"),
      },
      {
        access: 11637,
        meta: 11637,
        path: "planreceiptdetail",
        title: "收款明细",
        name: "planreceiptdetail",
        component: () =>
          import(/* webpackChunkName: "plantaskmanagement" */ "@/views/planManagement/receiptDetail/receipt_detail_index.vue"),
      },
    ],
  },
  {
    access: 6042,
    meta: 6042,
    path: "/accountantWorkOrder",
    icon: "social-windows",
    name: "accountantWorkOrder",
    title: "会计管理",
    component: Main,
    children: [
      {
        access: 6050,
        meta: 6050,
        path: "plan/allot",
        redirect: {
          name: "allot",
          params: {
            depart: "ACCOUNT",
          },
        },
        title: "工单分配",
        name: "allotAccountWorkOrder",
      },
      {
        access: 6043,
        meta: 6043,
        path: "accounttaskmanagement",
        title: "工单管理",
        name: "accounttaskmanagement_index",
        component: () =>
          import(/* webpackChunkName: "accounttaskmanagement_index" */ "@/views/accountantWorkOrder/myCommonTask/myCommonTask_table.vue"),
      },
      {
        access: 6044,
        meta: 6044,
        path: "BookkeepingAgency",
        title: "代理记账管理",
        name: "BookkeepingAgency_index",
        component: () =>
          import(/* webpackChunkName: "BookkeepingAgency_index" */ "@/views/accountantWorkOrder/BookkeepingAgency/BookkeepingAgency.vue"),
      },
      {
        access: 11629,
        meta: 11629,
        path: "expireCustomer",
        title: "到期客户管理",
        name: "expireCustomer_index",
        component: () =>
          import(/* webpackChunkName: "BookkeepingAgency_index" */ "@/views/accountantWorkOrder/expireCustomer/expireCustomer.vue"),
      },
      {
        access: 6046,
        meta: 6046,
        path: "accountantOrder",
        title: "会计到家工单管理",
        name: "accountantOrder_index",
        component: () =>
          import(/* webpackChunkName: "accountantOrder_index" */ "@/views/accountantWorkOrder/accountantOrder/accountantOrder.vue"),
      },
      {
        access: 6047,
        meta: 6047,
        path: "serviceTemplate",
        title: "服务总结模板",
        name: "serviceTemplate_index",
        component: () =>
          import(/* webpackChunkName: "serviceTemplate_index" */ "@/views/accountantWorkOrder/serviceTemplate/serviceTemplate.vue"),
      },
      {
        access: 6053,
        meta: 6053,
        path: "auditaccount",
        title: "审账",
        name: "auditaccount_index",
        component: () =>
          import(/* webpackChunkName: "auditaccount_index" */ "@/views/accountantWorkOrder/auditaccount/auditaccount.vue"),
      },
      {
        access: 6054,
        meta: 6054,
        path: "auditaccountrule",
        title: "审账规则",
        name: "auditaccount_rule",
        component: () =>
          import(/* webpackChunkName: "auditaccount_rule" */ "@/views/accountantWorkOrder/auditaccountrule/auditaccount_rule.vue"),
      },
      {
        access: 11630,
        meta: 11630,
        path: "cancelWorkOrder_index",
        title: "注销工单",
        name: "cancelWorkOrder",
        component: () =>
          import(/* webpackChunkName: "auditaccount_rule" */ "@/views/accountantWorkOrder/cancelWorkOrder/cancelWorkOrder.vue"),
      },
    ],
  },
  // {
  //   access: 11647,
  //   meta: 11647,
  //   path: '/accounterManager',
  //   icon: 'connection-bars',
  //   name: 'accounterManager_index',
  //   title: '会计管理（新）',
  //   component: Main,
  //   children: [
  //     {
  //       access: 11648,
  //       meta: 11648,
  //       path: 'proxyAccounterManger',
  //       title: '代理记账管理（新）',
  //       name: 'proxyAccounterManger_index',
  //       component: () =>
  //           import(/* webpackChunkName: "proxyAccounterManger" */ '@/views/accounterManager/proxyAccounterManger/index.vue')
  //     },
  //   ]
  // },
  {
    access: 11647,
    meta: 11647,
    path: "/accounterManager",
    icon: "connection-bars",
    name: "accounterManager_index",
    title: "会计管理（新）",
    component: Main,
    children: [
      {
        access: 11648,
        meta: 11648,
        path: "proxyAccounterManger",
        title: "代理记账管理（新）",
        name: "proxyAccounterManger_index",
        component: () =>
          import(/* webpackChunkName: "proxyAccounterManger" */ "@/views/accounterManager/proxyAccounterManger/index.vue"),
      },
      {
        access: 11649,
        meta: 11649,
        path: "serviceUpgradeSuggestion",
        title: "服务升级意见管理",
        name: "serviceUpgradeSuggestion_index",
        component: () =>
          import(/* webpackChunkName: "serviceUpgradeSuggestion" */ "@/views/accounterManager/serviceUpgradeSuggestion/index.vue"),
      },
      {
        access: 11658,
        meta: 11658,
        path: "accounterAutoShareSettingManager",
        title: "会计分单管理",
        name: "accounterAutoShareSettingManager_index",
        component: () =>
          import(/* webpackChunkName: "accounterAutoShareSettingManager" */ "@/views/accounterManager/accounterAutoShareSettingManager/index.vue"),
      },
      {
        access: 11660,
        meta: 11660,
        path: "bindingVoucher",
        title: "凭证装订任务",
        name: "bindingVoucher_index",
        component: () =>
          import(/* webpackChunkName: "accounterAutoShareSettingManager" */ "@/views/accounterManager/bindingVoucher/index.vue"),
      },
    ],
  },
  {
    access: 11610,
    meta: 11610,
    path: "/etax",
    icon: "connection-bars",
    name: "etax",
    title: "电子税务局",
    component: Main,
    children: [
      {
        access: 11611,
        meta: 11611,
        path: "taxResult",
        title: "申报情况",
        name: "taxResult",
        component: () =>
          import(/* webpackChunkName: "taxResult" */ "@/views/etax/etaxResult/index.vue"),
      },
      {
        access: 11612,
        meta: 11612,
        path: "etaxAccount",
        title: "账号管理",
        name: "etaxAccount",
        component: () =>
          import(/* webpackChunkName: "etaxAccount" */ "@/views/etax/etaxAccount/index.vue"),
      },
    ],
  },
  {
    access: 6071,
    meta: 6071,
    path: "/auditWorkOrder",
    icon: "social-windows",
    name: "auditWorkOrder",
    title: "审计管理",
    component: Main,
    children: [
      {
        access: 6072,
        meta: 6072,
        path: "plan/allot",
        redirect: {
          name: "allot",
          params: {
            depart: "AUDIT",
          },
        },
        title: "工单分配",
        name: "allotAuditWorkOrder",
      },
      {
        access: 6073,
        meta: 6073,
        path: "audittaskmanagement",
        title: "工单管理",
        name: "audittaskmanagement_index",
        component: () =>
          import(/* webpackChunkName: "audittaskmanagement_index" */ "@/views/auditManagement/myCommonTask/myCommonTask_table.vue"),
      },
    ],
  },
  {
    path: "/administrationWorkOrder",
    icon: "social-windows",
    name: "administrationWorkOrder",
    title: "行政管理",
    access: 6091,
    meta: 6091,
    component: Main,
    children: [
      {
        access: 6092,
        meta: 6092,
        path: "plan/allot",
        redirect: {
          name: "allot",
          params: {
            depart: "EXECUTIVE",
          },
        },
        title: "工单分配",
        name: "allotExecutiveWorkOrder",
      },
      {
        access: 6093,
        meta: 6093,
        path: "purchasingtaskmanagement",
        title: "采购类工单",
        name: "purchasingtaskmanagement",
        component: () =>
          import(/* webpackChunkName: "purchasingtaskmanagement" */ "@/views/administrationManagement/myCommonTask/index.vue"),
      },
      {
        access: 11662, //11662
        meta: 11662,
        path: "administratiotaskmanagement",
        title: "行政部工单管理",
        name: "administratiotaskmanagement",
        component: () =>
          import(/* webpackChunkName: "administrativework" */ "@/views/administrationManagement/administrativework/index.vue"),
      },
      {
        access: 6094,
        meta: 6094,
        path: "clockin",
        title: "考勤管理",
        name: "clockin_index",
        component: () =>
          import(/* webpackChunkName: "clockin_index" */ "@/views/administrationManagement/clockIn/index.vue"),
      },
      // 待开发
      // {
      //     access: 6095,
      //     meta: 6095,
      //     path: 'marketPerformance',
      //     title: '市场绩效',
      //     name:"marketPerformance_index",
      //     component: resolve => {
      //         require(['@/views/administrationManagement/marketPerformance/index.vue'], resolve);
      //     }
      // },
      {
        access: 6096,
        meta: 6096,
        path: "resumeManagement",
        title: "简历管理",
        name: "resumeManagement_index",
        component: () =>
          import(/* webpackChunkName: "resumeManagement_index" */ "@/views/administrationManagement/resumeManagement/index.vue"),
      },
      {
        access: 11650,
        meta: 11650,
        path: "employeeInfo",
        title: "员工信息",
        name: "employeeInfo_index",
        component: () =>
          import(/* webpackChunkName: "employeeInfo_index" */ "@/views/administrationManagement/employeeInfo/index.vue"),
      },
      {
        access: 11651,
        meta: 11651,
        path: "addManager",
        title: "地址报价单",
        name: "addManager_index",
        component: () =>
          import(/* webpackChunkName: "addManager_index" */ "@/views/administrationManagement/addManager/index.vue"),
      },
      {
        access: 11656,
        meta: 11656,
        path: "accountworks",
        title: "会计工作量",
        name: "accountworks_index",
        component: () =>
          import(/* webpackChunkName: "accountworks_index" */ "@/views/administrationManagement/accountworks/index.vue"),
      },
      {
        access: 11661,
        meta: 11661,
        path: "supplyManage",
        title: "供应商管理",
        name: "supplyManage ",
        component: () =>
          import(/* webpackChunkName: "supplyManage" */ "@/views/administrationManagement/supplyManage/index.vue"),
      },
    ],
  },
  {
    access: 6130,
    meta: 6130,
    path: "/handoverresource",
    icon: "filing",
    name: "handoverresource",
    title: "资料管理",
    component: Main,
    children: [
      {
        access: 6131,
        meta: 6131,
        path: "handovermanagement",
        title: "交接管理",
        name: "handovermanagement_index",
        component: () =>
          import(/* webpackChunkName: "handovermanagement_index" */ "@/views/handoverResource/handoverManagement/index.vue"),
      },
      {
        access: 6132,
        meta: 6132,
        path: "resourelist",
        title: "资料管理",
        name: "resourelist_index",
        component: () =>
          import(/* webpackChunkName: "resourelist_index" */ "@/views/handoverResource/resoureList/index.vue"),
      },
      {
        access: 6133,
        meta: 6133,
        path: "resourename",
        title: "资料参数",
        name: "resourename_index",
        component: () =>
          import(/* webpackChunkName: "resourename_index" */ "@/views/handoverResource/resoureName/index.vue"),
      },
    ],
  },
  {
    access: 6075,
    meta: 6075,
    path: "/fieldManagement",
    icon: "navigate",
    name: "fieldManagement",
    title: "外勤管理",
    component: Main,
    children: [
      {
        access: 6076,
        meta: 6076,
        path: "commonfieldmanagement",
        title: "外勤管理",
        name: "commonfieldmanagement_index",
        component: () =>
          import(/* webpackChunkName: "commonfieldmanagement_index" */ "@/views/fieldManagement/commonfield/commonFieldIndex.vue"),
      },
      {
        access: 11638,
        meta: 11638,
        path: "v2/legwork",
        title: "外勤管理v2",
        name: "legwork",
        component: () =>
          import(/* webpackChunkName: "commonfieldmanagement_index" */ "@/views/fieldManagement/v2/legwork.vue"),
      },
      {
        access: 11627,
        meta: 11627,
        path: "accountingCommonfieldManagement",
        title: "会计外勤类型管理",
        name: "accountingCommonfieldManagement_index",
        component: () =>
          import(/* webpackChunkName: "commonfieldmanagement_index" */ "@/views/fieldManagement/commonfield/accountingCommonfieldManagement_index.vue"),
      },
    ],
  },
  {
    access: 6080,
    meta: 6080,
    path: "/stystemcomplaint",
    icon: "help-circled",
    name: "stystemcomplaint",
    title: "系统反馈",
    component: Main,
    children: [
      {
        access: 6081,
        meta: 6081,
        path: "complainAndAdvice",
        title: "意见管理",
        name: "complainAndAdvice_index",
        component: () =>
          import(/* webpackChunkName: "complainAndAdvice_index" */ "@/views/stystemComplain/complainAndAdvice/complainAndAdvice.vue"),
      },
      {
        access: 6082,
        meta: 6082,
        path: "complainReply",
        title: "反馈回复",
        name: "complainReply_index",
        component: () =>
          import(/* webpackChunkName: "complainReply_index" */ "@/views/stystemComplain/complainReply/complainReply.vue"),
      },
    ],
  },
  {
    access: 6027,
    meta: 6027,
    path: "/publicPool",
    icon: "search",
    title: "公海池",
    name: "publicPool",
    component: Main,
    children: [
      {
        access: 6089,
        meta: 6089,
        path: "index",
        title: "公海池",
        name: "publicPool_index",
        component: () =>
          import(/* webpackChunkName: "publicPool_index" */ "@/views/publicPool/publicPool"),
      },
      {
        access: 11654,
        meta: 11654,
        path: "gamesetting",
        title: "活动设置",
        name: "gamesetting_index",
        component: () =>
          import(/* webpackChunkName: "gamesetting_index" */ "@/views/publicPool/gamesetting/index"),
      },
      {
        access: 11655,
        meta: 11655,
        path: "publicgame",
        title: "公海池活动",
        name: "publicgame_index",
        component: () =>
          import(/* webpackChunkName: "publicgame_index" */ "@/views/publicPool/publicgame/index"),
      },
    ],
  },
  {
    access: 6140,
    meta: 6140,
    path: "/solutionTool",
    icon: "document-text",
    title: "方案工具",
    name: "solutionTool",
    component: Main,
    children: [
      {
        access: 6141,
        meta: 6141,
        path: "useRecord",
        title: "使用记录",
        name: "useRecord_index",
        component: () =>
          import(/* webpackChunkName: "useRecord_index" */ "@/views/solutionTool/useRecord/index.vue"),
      },
      {
        access: 11601,
        meta: 11601,
        path: "product",
        title: "方案产品",
        name: "tool_product_index",
        component: () =>
          import(/* webpackChunkName: "tool_product_index" */ "@/views/solutionTool/tools/index.vue"),
      },
    ],
  },
  /**
   *
   *  以下页面未做缓存
   */
  {
    access: 6028,
    meta: 6028,
    path: "/systemManagement",
    icon: "gear-b",
    name: "systemManagement",
    title: "系统管理",
    component: Main,
    children: [
      {
        access: 6029,
        meta: 6029,
        path: "menuMangement",
        title: "菜单管理",
        name: "menuMangement_index",
        component: () =>
          import(/* webpackChunkName: "systemManagement" */ "@/views/systemManagement/menuManagement/index.vue"),
      },
      {
        access: 11628,
        meta: 11628,
        path: "serveMangement",
        title: "服务管理",
        name: "serveMangement_index",
        component: () =>
          import(/* webpackChunkName: "systemManagement" */ "@/views/systemManagement/serveManagement/index.vue"),
      },
      {
        access: 6030,
        meta: 6030,
        path: "roleMangement",
        title: "角色管理",
        name: "roleMangement_index",
        component: () =>
          import(/* webpackChunkName: "systemManagement" */ "@/views/systemManagement/roleManagement/roleM_index.vue"),
      },
      {
        access: 6031,
        meta: 6031,
        path: "userManagement",
        title: "用户管理",
        name: "userManagement_index",
        component: () =>
          import(/* webpackChunkName: "systemManagement" */ "@/views/systemManagement/userManagement/userM_index.vue"),
      },
      {
        access: 6031,
        meta: 6031,
        path: "departManagement",
        title: "部门管理",
        name: "departManagement_index",
        component: () =>
          import(/* webpackChunkName: "systemManagement" */ "@/views/systemManagement/departManagement/index.vue"),
      },
      {
        access: 6032,
        meta: 6032,
        path: "sqlDeal",
        title: "SQL管理",
        name: "admin_sql_deal",
        component: () =>
          import(/* webpackChunkName: "systemManagement" */ "@/views/systemManagement/sql_admin/main.vue"),
      },
      {
        access: 11620,
        meta: 11620,
        path: "wechatTemplate",
        title: "信息模板",
        name: "wechatTemplate_index",
        component: () =>
          import(/* webpackChunkName: "systemManagement" */ "@/views/systemManagement/wechatTemplate/index.vue"),
      },
      {
        access: 11621,
        meta: 11621,
        path: "smsRuleManagement",
        title: "短信规则",
        name: "smsRuleManagement_index",
        component: () =>
          import(/* webpackChunkName: "systemManagement" */ "@/views/systemManagement/smsRuleManagement/index.vue"),
      },
      {
        access: 6085,
        meta: 6085,
        path: "datacenterManagement",
        title: "数据字典",
        name: "datacenterManagement_index",
        component: () =>
          import(/* webpackChunkName: "systemManagement" */ "@/views/systemManagement/dataCenterManagement/dataCenterManagement_index.vue"),
      },
      {
        access: 6033,
        meta: 6033,
        path: "systemparamsManagement",
        title: "系统参数",
        name: "systemparamsManagement_index",
        component: () =>
          import(/* webpackChunkName: "systemManagement" */ "@/views/systemManagement/systemparamsManagement/systemparamsManagement_index.vue"),
      },
      {
        access: 6034,
        meta: 6034,
        path: "timetaskManagement",
        title: "定时任务",
        name: "timetaskManagement",
        component: () =>
          import(/* webpackChunkName: "systemManagement" */ "@/views/systemManagement/timetaskManagement/timetaskManagement_index.vue"),
      },
      {
        access: 6086,
        meta: 6086,
        path: "attributeManagement",
        title: "属性管理",
        name: "attributeManagement",
        component: () =>
          import(/* webpackChunkName: "systemManagement" */ "@/views/systemManagement/attributeManagement/attributeManagement_index.vue"),
      },
    ],
  },
  //修改完成
  {
    access: 11603,
    meta: 11603,
    path: "/notificationPush",
    icon: "chatbubble-working",
    name: "notificationPush",
    title: "消息推送",
    component: Main,
    children: [
      {
        access: 11605,
        path: "smsSendLog",
        title: "短信发送日志",
        name: "smsSendLog",
        component: () =>
          import(/* webpackChunkName: "smsSendLog" */ "@/views/notificationPush/smsSendLog/index.vue"),
      },
      {
        access: 11604,
        path: "WeChatPushLog",
        title: "微信推送客户日志",
        name: "WeChatPushLog",
        component: () =>
          import(/* webpackChunkName: "WeChatPushLog" */ "@/views/notificationPush/weChatPushLog/index.vue"),
      },
      {
        access: 11606,
        path: "internalPushLog",
        title: "微信内部推送日志",
        name: "internalPushLog",
        component: () =>
          import(/* webpackChunkName: "internalPushLog" */ "@/views/notificationPush/internalPushLog/index.vue"),
      },
      {
        access: 11607,
        path: "smsTemplate",
        title: "营销短信模板",
        name: "smsTemplate",
        component: () =>
          import(/* webpackChunkName: "smsTemplate" */ "@/views/notificationPush/smsTemplate/index.vue"),
      },
      {
        access: 11607,
        path: "messagPops",
        title: "消息弹窗",
        name: "messagPops",
        component: () =>
          import(/* webpackChunkName: "messagPops" */ "@/views/notificationPush/messagPops/index.vue"),
      },
    ],
  },
  {
    access: 6103,
    meta: 6103,
    path: "/allindex",
    icon: "pie-graph",
    name: "allindex",
    title: "数据中心",
    component: Main,
    children: [
      {
        access: 6104,
        meta: 6104,
        path: "cannelIndex",
        title: "渠道首页",
        name: "datacannelIndex_index",
        component: () =>
          import(/* webpackChunkName: "allindex" */ "@/views/home/cannel_index/cannelIndex.vue"),
      },
      {
        access: 6105,
        meta: 6105,
        path: "commercialIndex",
        title: "商事首页",
        name: "datacommercialIndex_index",
        component: () =>
          import(/* webpackChunkName: "allindex" */ "@/views/home/commercial_index/commercialIndex.vue"),
      },
      {
        access: 6106,
        meta: 6106,
        path: "accountIndex",
        title: "会计首页",
        name: "dataaccountIndex_index",
        component: () =>
          import(/* webpackChunkName: "allindex" */ "@/views/home/account_index/accountIndex.vue"),
      },
      {
        access: 6107,
        meta: 6107,
        path: "marketIndex",
        title: "市场首页",
        name: "datamarketIndex_index",
        component: () =>
          import(/* webpackChunkName: "allindex" */ "@/views/home/market_index/marketIndex.vue"),
      },
    ],
  },
  {
    access: 6065,
    meta: 6065,
    path: "/materialHouse",
    icon: "folder",
    name: "materialHouse",
    title: "资源库",
    component: Main,
    children: [
      {
        access: 6066,
        meta: 6066,
        path: "CompanyInformation",
        title: "公司资料",
        name: "CompanyInformation_index",
        component: () =>
          import(/* webpackChunkName: "CompanyInformation_index" */ "@/views/material-house/companyMaterial/index.vue"),
      },
      {
        access: 6068,
        meta: 6068,
        path: "DepartmentInformation",
        title: "部门资料",
        name: "DepartmentInformation_index",
        component: () =>
          import(/* webpackChunkName: "DepartmentInformation_index" */ "@/views/material-house/departMaterial/index.vue"),
      },
    ],
  },
  {
    access: 6120,
    meta: 6120,
    path: "/logManagement",
    icon: "information-circled",
    name: "logManagement",
    title: "日志管理",
    component: Main,
    children: [
      {
        access: 11607,
        meta: 11607,
        path: "stystemLog",
        title: "系统日志",
        name: "stystemLog",
        component: () =>
          import(/* webpackChunkName: "logManagement" */ "@/views/logManagement/stystemlog/stystemLog.vue"),
      },
      {
        access: 6121,
        meta: 6122,
        path: "MQLog",
        title: "消息队列日志",
        name: "MQ_index",
        component: () =>
          import(/* webpackChunkName: "logManagement" */ "@/views/logManagement/MQlog/index.vue"),
      },
      {
        access: 6122,
        meta: 6122,
        path: "opLog",
        title: "操作统计",
        name: "OP_index",
        component: () =>
          import(/* webpackChunkName: "logManagement" */ "@/views/logManagement/opLog/index.vue"),
      },
      {
        access: 6123,
        meta: 6123,
        path: "frontErrLog",
        title: "异常统计",
        name: "frontErrLog_index",
        component: () =>
          import(/* webpackChunkName: "logManagement" */ "@/views/logManagement/frontErrLog/index.vue"),
      },
      {
        access: 11608,
        path: "systemLog2",
        title: "日志",
        name: "systemLog2",
        component: () =>
          import(/* webpackChunkName: "logManagement" */ "@/views/logManagement/systemLog.vue"),
      },
    ],
  },
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  otherRouter,
  // preview,
  // locking,
  ...appRouter,
  // previewFile,
  arrearageCenter,
  accountantCenter,
  page500,
  page403,
  page404,
];
