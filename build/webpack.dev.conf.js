const merge = require('webpack-merge');
const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseConfig = require('./webpack.base.conf');
const config = require('../config/config')

console.log(process.argv[6].split("=")[1])

const env = process.argv[6].split("=")[1]

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'vue-style-loader','css-hot-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['vue-style-loader','css-hot-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          'css-hot-loader',
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    open: false,
    disableHostCheck: true,
    port: config[env].port,
    inline: false,
    proxy: config[env].proxyTable,
    overlay: {
      errors: true,
    },
    quiet: true,
  },
  plugins: [
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
          messages: [config[env].message],
      },
      clearConsole: true
    })
  ]
});