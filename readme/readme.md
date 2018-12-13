## 项目结构

```shell
.
├── build  项目构建配置
│   ├── webpack-xxx.dev.config.js => 配置不同后台服务器（cloud为正式库，慎用）
└── src
    ├── components  公用bus组件（后期全部替换）
    ├── directive   自定义组件及指令
    ├── images  图片文件
    ├── libs  工具方法
    ├── locale  多语言文件
    ├── my-theme  主题配置文件
    ├── others  未使用及多余组件(后期可删除)
    ├── router  路由配置
    ├── store  状态管理
    ├── styles  样式文件
    ├── template  模板文件(build时index模板)
    ├── vendors  公共库文件(build时vendors配置)
    ├── app.vue  项目入口
    ├── main.js  挂载js及Vue原型链
    └── views
        ├── accountantWorkOrder  会计管理
        ├── administrationManagement  行政管理
        ├── auditManagement  审计管理
        ├── channelManagement  渠道管理
        ├── cluesLibrary  线索库
        ├── commercialManagement  商事管理
        ├── companyManagement  企业管理
        ├── customerManagement  客户管理
        ├── customerService  客服管理
        ├── error-page  错误页面
        ├── etax  电子税务局
        ├── fieldManagement  外勤管理
        ├── form  表单组件
        ├── home  首页
        ├── logManagement  日志管理
        ├── main-components  主页面组件
        ├── marketplaceManagement  市场管理
        ├── material-house  资源库
        ├── message  消息中心
        ├── missionCenter  任务中心
        ├── my-components  iview-admin封装组件
        ├── order  订单管理
        ├── own-space  个人中心
        ├── planManagement  企划管理
        ├── productManagement  产品管理
        ├── publicPool  公海池
        ├── solutionTool   方案工具
        ├── stystemComplain  系统反馈
        ├── systemManagement  系统管理
        ├── test  测试页面
        ├── woa-components  系统自定义组件
        ├── login.vue  登录组件
        ├── Main.vue  主页面组件
        
```

项目调试：npm run dev(dev-xxx xxx值参见packjson配置)

打包项目：npm run build