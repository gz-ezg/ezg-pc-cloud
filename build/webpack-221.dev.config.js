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


fs.open('./build/env.js', 'w', function(err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
    devServer: {
        disableHostCheck: true,
        port: 9996,
        proxy: {
            '/api': {
                target: 'http://192.168.0.221:9000',                                           
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
            }
        ], {
            ignore: [
                'text-editor.vue'
            ]
        }),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: ['Now Proxy in 221; You application is running here http://localhost:9996'],
              },
            clearConsole: true
        }
        )
    ]
});