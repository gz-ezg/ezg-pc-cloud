const webpack = require('webpack');
const config = require('./webpack.jenkins.conf');

webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
        // 在这里处理错误
        console.error(err);
        return;
    }
    // 处理完成
    console.log(stats.toString({
        chunks: true,  // 使构建过程更静默无输出
        colors: true,    // 在控制台展示颜色
        builtAt: true,
        version: true,
        timings: true
    }));
});