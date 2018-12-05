const path = require('path');
const os = require('os');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    //  开启缓存
    cache: true,
    entry: {
        main: '@/main',
        'vender-base': '@/vendors/vendors.base.js',
        'vender-exten': '@/vendors/vendors.exten.js',
        'vender-exten2': '@/vendors/vendors.exten2.js',
        'vender-vchart': '@/vendors/vendors.vchart.js',
        //  兼容IE9
        // // main: ["@babel/polyfill",'@/main'],
        // // 'vender-base': ["@babel/polyfill",'@/vendors/vendors.base.js'],
        // // 'vender-exten': ["@babel/polyfill",'@/vendors/vendors.exten.js'],
    },
    output: {
        path: path.resolve(__dirname, '../dist/static'),
        filename: 'js/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: 'vue-style-loader!css-loader',
                        less: 'vue-style-loader!css-loader!less-loader'
                    },
                    postLoaders: {
                        html: 'babel-loader'
                    },
                    use: [
                        {
                            loader: 'cache-loader'
                        },
                        {
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
                }
            },
            {
                test: /iview\/.*?js$/,
                loader: 'happypack/loader?id=happybabel',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=happybabel',
                exclude: /node_modules/
            },
            {
                test: /\.js[x]?$/,
                include: [resolve('src')],
                exclude: /node_modules/,
                loader: 'happypack/loader?id=happybabel'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'autoprefixer-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize','autoprefixer-loader', 'less-loader'],
                    fallback: 'style-loader'
                }),
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        // new HardSourceWebpackPlugin({
        //     // Either an absolute path or relative to webpack's options.context.
        //     cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
        //     // Either a string of object hash function given a webpack config.
        //     configHash: function(webpackConfig) {
        //         // node-object-hash on npm can be used to build this.
        //         return require('node-object-hash')({sort: false}).hash(webpackConfig);
        //     },
        //     // Either false, a string, an object, or a project hashing function.
        //     environmentHash: {
        //         root: process.cwd(),
        //         directories: [],
        //         files: ['package-lock.json', 'yarn.lock'],
        //     },
        //     // An object.
        //     info: {
        //         // 'none' or 'test'.
        //         mode: 'none',
        //         // 'debug', 'log', 'info', 'warn', or 'error'.
        //         level: 'debug',
        //     },
        //     // Clean up large, old caches automatically.
        //     cachePrune: {
        //         // Caches younger than `maxAge` are not considered for deletion. They must
        //         // be at least this (default: 2 days) old in milliseconds.
        //         maxAge: 2 * 24 * 60 * 60 * 1000,
        //         // All caches together must be larger than `sizeThreshold` before any
        //         // caches will be deleted. Together they must be at least this
        //         // (default: 50 MB) big in bytes.
        //         sizeThreshold: 50 * 1024 * 1024
        //     },
        // }),
        new HappyPack({
            id: 'happybabel',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool,
            verbose: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        //  减少闭包函数
        // new webpack.optimize.ModuleConcatenationPlugin()
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: require('../dll/vue-manifest.json')
        // }),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: require('../dll/iview-manifest.json')
        // }),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: require('../dll/vchart-manifest.json')
        // }),
        // new PrerenderSPAPlugin({
        //     // Required - The path to the webpack-outputted app to prerender.
        //     staticDir: path.join(__dirname, '../dist'),
        //     // Required - Routes to render.
        //     routes: [ '/login' ],
        //   })

        

    ],
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            // 'vue': 'vue/dist/vue.esm.js',
            '@': resolve('../src'),
        }
    }
};