const merge = require('webpack-merge');
const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseConfig = require('./webpack.base.conf');

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
    port: 8089,
    inline: false,
    proxy: {
      '/api': {
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
  },
  plugins: [
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
          messages: ['Now Proxy in 220(test); You application is running here http://localhost:8089'],
      },
      clearConsole: true
    })
  ]
});