const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const baseConfig = require('./webpack.base.conf');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const progressBarWebpackPlugin  = require("progress-bar-webpack-plugin")
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');


const env = require('../config/prod.env')

  console.log("processEnv:" + process.env.OWN_SPACE)
const webpackConfig = merge(baseConfig, {
  mode: 'production',
  // devtool: 'source-map',
  module: {
    rules:[
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: [
            MiniCssExtractPlugin.loader,
            // 'MiniCssExtractPlugin.loader', // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  optimization: {
    //  存在部分es6代码，无法执行压缩，可以选择另外一个压缩工具
    minimizer: [
        new ParallelUglifyPlugin({ // 多进程压缩
            cacheDir: '.cache/',
            uglifyES: {
                output: {
                    comments: false,
                    beautify: false
                },
                compress: {
                    warnings: false,
                    drop_console: true,
                    collapse_vars: true,
                    reduce_vars: true
                }
            }
        }),
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/'], {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false
    }),
    //  单独打包css
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[name].[hash].css"
    }),
    //  压缩css
    new OptimizeCSSAssetsPlugin({}),
    //  打包分析
    // new BundleAnalyzerPlugin(),
    //  进度条
    new progressBarWebpackPlugin()
  ]
  //  不提示超过240kb
  // performance: {
    // hints: false
  // }
});

//  首页预渲染，但是无法使用history模式，node环境的问题感觉
if(process.env.OWN_SPACE == "build:history"){
  const PrerenderSPAPlugin = require('prerender-spa-plugin')
  const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
  webpackConfig.plugins.push(
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, '../dist'),
      routes: [ '/' ],
      renderer: new Renderer({
        inject: {
            foo: 'bar'
        },
        headless: false,
        // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
        renderAfterDocumentEvent: 'render-event'
    })
    })
  )
}

if(process.env.OWN_SPACE != "jenkins"){
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(
    new BundleAnalyzerPlugin()
  )
}

const smp = new SpeedMeasurePlugin();
//  使用该方法会导致dll文件无法注入index中
//  该方法会是add-assert-html-webpack-plgin报错，目测插件兼容性错误
// module.exports = smp.wrap(webpackConfig);
module.exports = webpackConfig
