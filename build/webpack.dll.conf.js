let path = require("path");
let webpack = require("webpack");
let CleanWebpaclPlugin = require('clean-webpack-plugin');
let FirendlyErrorePlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  // mode: "development",
  mode: "production",
  entry: {
    vue: [
        // 'vue/dist/vue.runtime.common', 
        'vue-router/dist/vue-router.common', 
        'vuex/dist/vuex.common'
    ],
    iview: ['iview','iview-area'],
    vchart: [
        'v-charts/lib/line.common',
        'v-charts/lib/bar.common',
        'v-charts/lib/histogram.common',
        'v-charts/lib/pie.common',
        'v-charts/lib/funnel.common',
    ]
  },
  output: {
    filename: "_dll_[name].js", // 产生的文件名
    path: path.resolve(__dirname, "../public/dll"),
    library: "_dll_[name]",
    // publicPath: "http://cloud.roderickt1an.cn/"
  },
  plugins: [
    // name要等于library里的name
    new CleanWebpaclPlugin(['dll'], {
      root: path.resolve(__dirname, '../public')
    }),
    new webpack.DllPlugin({
      name: "_dll_[name]",
      path: path.resolve(__dirname, "../public/dll", "[name]-manifest.json"),
      context: __dirname
    }),
    new FirendlyErrorePlugin()
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
};