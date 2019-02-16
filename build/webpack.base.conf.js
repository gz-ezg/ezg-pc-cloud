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
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

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
        // 不去解析jquery的依赖关系
        noParse: /jquery/,
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
                            //  开启此项，可以减小main.css体积，但需要手动将文件挪至css文件夹中(作废)
                            name:"fonts/[name].[ext]",
                        //     outputPath: "css/"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        //  处理moment本地化策略
        new webpack.IgnorePlugin(/\.\/local/, /moment/),
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
        // new AutoDllPlugin({
        //     inject: true, // will inject the DLL bundle to index.html
        //     debug: true,
        //     filename: '[name]_[hash].js',
        //     path: './dll',
        //     entry: {
        //         vue: [
        //             'vue/dist/vue.runtime.common', 
        //             'vue-router/dist/vue-router.common', 
        //             'vuex/dist/vuex.common'
        //         ],
        //         iview: ['iview','iview-area'],
        //         vchart: [
        //             'v-charts/lib/line.common',
        //             'v-charts/lib/bar.common',
        //             'v-charts/lib/histogram.common',
        //             'v-charts/lib/pie.common',
        //             'v-charts/lib/funnel.common',
        //         ]
        //     }
        // }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: path.resolve(__dirname, "../public/dll", "vue-manifest.json"),
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: path.resolve(__dirname, "../public/dll", "vchart-manifest.json"),
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: path.resolve(__dirname, "../public/dll", "iview-manifest.json"),
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
                },
                // {
                //     from: 'public/dll',
                //     to: path.resolve(__dirname, '../dist/dll/')
                // }
            ], {
                ignore: [
                    'text-editor.vue'
                ]
            }
        ),
        new AddAssetHtmlPlugin([
            {
                // 要添加到编译中的文件的绝对路径，以及生成的HTML文件。支持globby字符串
                filepath: require.resolve(path.resolve(__dirname, '../public/dll/_dll_iview.js')),
                // 文件输出目录
                outputPath: 'dll',
                // 脚本或链接标记的公共路径
                publicPath: 'dll'
            },
            {
                filepath: require.resolve(path.resolve(__dirname, '../public/dll/_dll_vchart.js')),
                outputPath: 'dll',
                publicPath: 'dll'
            },
            {
                filepath: require.resolve(path.resolve(__dirname, '../public/dll/_dll_vue.js')),
                outputPath: 'dll',
                publicPath: 'dll'
            }
        ])
    ],
    resolve: {
        mainFields: ['main'],
        extensions: ['*', '.js', '.json', '.vue'],
        alias: {
            // 'vue$': 'vue/dist/vue.esm.js',
            '@views': path.resolve(__dirname, '../src/views'),
            '@': path.resolve(__dirname, '../src')
        }
    }
};