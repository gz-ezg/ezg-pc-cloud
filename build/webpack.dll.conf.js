let path = require("path");
let webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    vue: [
        'vue/dist/vue.runtime.common', 
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
    filename: "_dll_[name]_[hash:6].js", // 产生的文件名
    path: path.resolve(__dirname, "../dll"),
    library: "_dll_[name]_[hash:6]"
  },
  plugins: [
    // name要等于library里的name
    new webpack.DllPlugin({
      name: "_dll_[name]_[hash:6]",
      path: path.resolve(__dirname, "../dll", "[name]-manifest.json"),
      context: __dirname
    }),
    // new AssetsPlugin({
    //     filename: 'bundle-config.json',
    //     path: './'
    // })
  ]
};