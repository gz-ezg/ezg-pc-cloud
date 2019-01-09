const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const AutoDllPlugin = require('autodll-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        // main: ['babel-polyfill', path.resolve(__dirname, '../src/main.js')]
        main: path.resolve(__dirname, '../src/main.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash].js',
        publicPath: "/"
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: [{
                        loader: 'vue-loader',
                        options: {

                        }
                    },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: false
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit:1024,
                            name:"img/[name].[ext]",
                            // outputPath: "dist/"
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit:10000,
                            //  开启此项，可以减小main.css体积，但需要手动将文件挪至css文件夹中
                            name:"fonts/[name].[ext]",
                        //     outputPath: "css/"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HappyPack({
            id: 'happybabel',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool,
            verbose: true
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, '../index.html'),
            title: "亿账柜信息管理平台",
            favicon: path.resolve(__dirname, '../src/images/td_icon.ico'),
            meta: {
                'renderer': 'webkit',
                'http-equiv': {
                    'http-equiv':"cache-control", 'content':"no-cache"
                },
                'copyright': '@亿账柜信息科技有限公司'
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new AutoDllPlugin({
            inject: true, // will inject the DLL bundle to index.html
            debug: true,
            filename: '[name]_[hash].js',
            path: './dll',
            entry: {
                vue: [
                    'vue/dist/vue.runtime.common', 
                    'vue-router/dist/vue-router.common', 
                    'vuex/dist/vuex.common'
                ],
                iview: ['iview/dist/iview.min','iview-area'],
                vchart: [
                    'v-charts/lib/line.common',
                    'v-charts/lib/bar.common',
                    'v-charts/lib/histogram.common',
                    'v-charts/lib/pie.common',
                    'v-charts/lib/funnel.common',
                ]
            }
        }),
        new webpack.optimize.SplitChunksPlugin(),
        new CopyWebpackPlugin(
            [
                {
                    from: 'src/styles/fonts',
                    to: 'fonts'
                },
                {
                    from: 'src/views/my-components/text-editor/tinymce',
                    to: 'js'
                },
                {
                    from:'WW_verify_z793ZwW9R5YytI0x.txt',
                    to: path.resolve(__dirname, '../dist/')
                }
            ], {
                ignore: [
                    'text-editor.vue'
                ]
            }
        )
    ],
    resolve: {
        mainFields: ['main'],
        extensions: ['*', '.js', '.json', '.vue'],
        alias: {
            // 'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src'),
        }
    }
};