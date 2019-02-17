1.引入dll
    1.dll自动化加载 AutoDllPlugin
    2.dll手动加载，DllPlugin + DllReferencePlugin 生成静态链接库，AddAssetHtmlPlugin 自动注入index.html
2.babel6 => babel7
    1.babel-xxxxx => @babel/xxxx
    2.预留兼容IE8以上（不含，由于iview组件库未涉及ie11以下之版本兼容，故暂时取消）
    3.es2015,stage2,stage3 => @perset-env
    4.transfrom-runtime + runtime 处理转换过程中重复转化问题
3.引入jenkins，修改jenkin配置
    1.测试库jenkins安装及配置
    2.生产库jenkins安装及配置
    3.webpack-jenkins配置
    4.多接口调试环境配置（已优化，根据传入参数值选择）
4.webpack3 => webpack4
    0.webpack-cli install && webpack-dev-server update 各种依赖update packjson=>script update
    1.vue-loader升级 需要引入插件new VueLoaderPlugin()
    2.webpack.IgnorePlugin 处理moment国际化依赖问题
    3.HappyPack4 => 5 升级
    4.修改index.html 生成方式，不在使用webpack3环境下的ejs方案
    5.构建过程更加人性化，progressBarWebpackPlugin
    6.打包过程分析SpeedMeasurePlugin，不兼容自动注入dll自动注入index.html过程
    7.部分CommonsChunkPlugin 迁移至dll，部分CommonsChunkPlugin升级至SplitChunksPlugin（此为破坏性升级）
    8.noParse jquery 对jq包不做解析
    9.ExtractTextWebpackPlugin 替换为 MiniCssExtractPlugin
    10.文件目录优化
    11.uglify-es 压缩js
    12.prerender-spa-plugin 插件，优化首屏体验