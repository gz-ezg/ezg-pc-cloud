const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const baseConfig = require('./webpack.base.conf');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const progressBarWebpackPlugin  = require("progress-bar-webpack-plugin")
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');


const env = require('../config/prod.env')


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
    //  存在部分es6代码，无法执行压缩
    // minimizer: [
    //     new ParallelUglifyPlugin({ // 多进程压缩
    //         cacheDir: '.cache/',
    //         uglifyJS: {
    //             output: {
    //                 comments: false,
    //                 beautify: false
    //             },
    //             compress: {
    //                 warnings: false,
    //                 drop_console: true,
    //                 collapse_vars: true,
    //                 reduce_vars: true
    //             }
    //         }
    //     }),
    // ]
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
    new BundleAnalyzerPlugin(),
    //  进度条
    new progressBarWebpackPlugin()
  ],
  //  不提示超过240kb
  // performance: {
    // hints: false
  // }
});

const smp = new SpeedMeasurePlugin();
//  使用该方法会导致dll文件无法注入index中
// module.exports = smp.wrap(webpackConfig);
module.exports = webpackConfig
