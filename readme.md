# 项目首次使用指引
1. npm install
2. cnpm install prerender-spa-plugin (非必要操作，需要首页预渲染时启用，暂时废弃)
3. npm run copy:package (首次必要操作！因为变更过部分package代码)
4. npm run dev:dll (首次操作，变更过dll文件操作，其他时候无需操作，主要是生成常用不会变更的文件)
4. npm run dev / npm run build


##  开发需知
1. master为生产库运行版本( 默认分支 )
2. dev为测试运行版本，已另附文件说明( 提测分支 )
3. 以上分支理论上只准提交线上发布版本代码
4. 如需修复生产环境下存在之问题，请自行创建master-fixed分支，修复完毕后合并至master分支删除之
5. 开发新功能请自行创建分支:
    5.1 如果上全新功能，推荐新开功能分支;
    5.2 已有内容小修小改，可在自己的分支下做操作;
    5.3 功能分支完成后可以删除之,本地个人分支默认不删除
6. 推荐合并顺序：本地功能分支=> 本地个人分支 => dev分支 => master分支


## changelog
1. babel6 update babel7
2. autodll 变更 手动控制
3. 支持ie11
4. 支持首页预渲染(需翻墙)
5. 一级路由移入layout文件夹，更名为布局
6. node_module覆盖自动化
7. npm run 命令变更
8. 缓存压缩js文件，提升二次build速度
9. 删除不必要文件

#### 详解：
1. 不涉及业务，不介绍
2. 即 npm run dev:dll 命令，打包dll文件，主要功能优化打包速度
3. iview最低可以支持ie11，需要开启@babel/polyfill, 同时启用.babelrc 及 main.js 中相关注释，按照相关注释指引操作即可
4. 相关需要使用命令 cnpm install prerender-spa-plugin 这样会在首页注入login页面标签，优化首页体验，默认只引入login页面；如果执行此命令，请执行npm run build:history 即可
5. 将main.vue, 403 404 500 error-page login 等第一层路由页面转入layouts文件夹中，参考ant-design-pro项目
6. 即执行 npm run copy:package 可以直接覆盖node_modules中修改之文件，属于自动化操作流程
7. 由于简化build文件夹中的文件，将多个功能相同之文件合并，改为由参数决定执行内容，所以对原相关命令形式作出变更，取消npm run dev-xxx形式，改用npm run dev:xxx，具体变更可以参考packjson文件
8. 不涉及业务，不介绍
9. 删除部分无用冗余文件

### 部分已废弃方法（未迁移）
使用场景 | 原方法 | 现方法
---|---|---
跨组件通信 | 文件引用components下的Bus | 多个调用一个使用vuex，单对单使用this.$bus.xxxx 定义于plugins下vue-bus.js
接口请求 | `$Get,$Post,GetData,PostData` | 使用api/index.js 中定义的方法，结合async和await，并发请求使用 await [] = promise.all([])
modal组件交互 | | 不常用弹出框使用v-if;常用可以选用vue-bus
