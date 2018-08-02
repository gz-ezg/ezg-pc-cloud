//  192.168.0.222
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const package = require('../package.json');

fs.open('./build/env.js', 'w', function(err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
    devServer: {
        disableHostCheck: true,
        port: 8089,
        proxy: {
            '/api': {
                // target:'http://zgcfo.vipgz1.idcfengye.com/api',
                // target: 'http://cloud.zgcfo.com/api',
                // target: 'http://192.168.0.222:9000',
                // target: 'http://cloud.yrl.fun',
                target: 'http://192.168.0.220:9000', 
                // target: 'http://192.168.0.200:9000',
                // target: 'http://192.168.0.67:9000',
                // target: 'http://192.168.0.224:9000',          
                // target: 'http://192.168.0.109:9000',  
                // target: 'http://192.168.0.236:9000',                                                
                pathRewrite: {'^/api' : ''},  
                changeOrigin: true
            }
        }
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
        })
    ]
});