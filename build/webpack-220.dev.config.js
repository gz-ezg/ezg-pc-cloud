//  192.168.0.222
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const package = require('../package.json');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
// const portfinder = require('portfinder')

fs.open('./build/env.js', 'w', function(err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

// const devWebpackConfig = merge(webpackBaseConfig, {
module.exports = merge(webpackBaseConfig, {

    devServer: {
        // inline: true,
        // hot: true,
        disableHostCheck: true,
        port: 8089,
        proxy: {
            '/api': {
                target: 'http://192.168.0.220:9000',                                               
                pathRewrite: {'^/api' : ''},  
                changeOrigin: true
            }
        },
        overlay: {
            errors: true,
        },
        // stats:{
        //     timings: true,
        //     version: true,
        //     errors: true,
        //     colors: true
        // },
        quiet: true,
    },
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vender-exten', 'vender-base'],
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            title: 'iView admin v' + package.version,
            filename: '../index.html',
            template: './src/template/index.ejs',
            inject: false
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/views/main-components/theme-switch/theme'
            },
            {
                from: 'src/views/my-components/text-editor/tinymce'
            },
            {
                from:'/WW_verify_z793ZwW9R5YytI0x.txt',
                to: "../"
            }
        ], {
            ignore: [
                'text-editor.vue'
            ]
        }),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: ['Now Proxy in 220; You application is running here http://localhost:8089'],
              },
            clearConsole: true
        }
        )
    ]
});

// module.exports = new Promise((resolve, reject) => {
//     portfinder.basePort = devWebpackConfig.devServer.port
//     portfinder.getPort((err, port) => {
//       if (err) {
//         reject(err)
//       } else {
//         // publish the new Port, necessary for e2e tests
//         process.env.PORT = port
//         // add port to devServer config
//         devWebpackConfig.devServer.port = port
  
//         // Add FriendlyErrorsPlugin
//         devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
//           compilationSuccessInfo: {
//             messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
//           },
//         //   onErrors: config.dev.notifyOnErrors
//         //   ? utils.createNotifierCallback()
//         //   : undefined
//         }))
  
//         resolve(devWebpackConfig)
//       }
//     })
//   })