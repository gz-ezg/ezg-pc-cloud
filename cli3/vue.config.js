const webpack = require('webpack');
const os = require('os');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let handler = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:
  console.info(percentage, message, ...args);
};
module.exports = {
  css: {
    extract: true,
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    //  移除代码重复合并
    // config.optimization.splitChunks({
    //   cacheGroups: {}
    // })
  },
  configureWebpack: {
    plugins: [
      new HappyPack({
        id: 'happybabel',
        loaders: ['babel-loader'],
        threadPool: happyThreadPool,
        verbose: true
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
      new webpack.ProgressPlugin(handler),
      new BundleAnalyzerPlugin(),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./dll/vue-manifest.json')
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./dll/iview-manifest.json')
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./dll/vchart-manifest.json')
      }),
      new CopyWebpackPlugin([{
          from: 'dll/static/',
          to: "dll"
        },
        {
          from: 'WW_verify_z793ZwW9R5YytI0x.txt',
          to: './'
        }
      ]),
      new UglifyJsPlugin({
        parallel: true
      })
    ]
  },
  devServer: {
    disableHostCheck: true,
    // port: 8089,
    port: process.env.NODE_PORT,
    proxy: {
      '/api': {
        target: process.env.NODE_SERVE,
        // target: "http://192.168.0.220:9000",                                               
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    },
    overlay: {
      errors: true,
    },
    quiet: true,
  },

}