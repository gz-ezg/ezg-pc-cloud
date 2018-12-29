const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base.conf');
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  // rule: [
  //   {
  //     test: /\.css$/,
  //     use: ['vue-style-loader', 'css-loader']
  //   },
  // ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    open: false,
    disableHostCheck: true,
    port: 8089,
    inline: false,
    proxy: {
      '/api': {
        // target: 'http://cloud.zgcfo.com/api/',
        target: 'http://192.168.0.220:9000',
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
  }
});