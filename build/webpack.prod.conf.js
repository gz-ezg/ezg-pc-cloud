const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const baseConfig = require('./webpack.base.conf');
const AutoDllPlugin = require('autodll-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: []
  },
  plugins: [
    new CleanWebpackPlugin(['dist/'], {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false
    }),
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
    }),
    new BundleAnalyzerPlugin(),
    new AutoDllPlugin({
      inject: true, // will inject the DLL bundle to index.html
      debug: true,
      filename: '[name]_[hash].js',
      path: './dll',
      entry: {
          vue: ['vue', 'vue-router', 'vuex'],
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
  ]
});