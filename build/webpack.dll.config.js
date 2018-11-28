const path = require('path')
const webpack = require('webpack')
module.exports = {
    entry: {
        vue: ['vue','vue-router','vuex','axios','js-cookie','clipboard','html2canvas','rasterizehtml'],
        iview: ['iview/dist/iview.min','iview-area'],
        vchart: [
            'v-charts/lib/line.common',
            'v-charts/lib/bar.common',
            'v-charts/lib/histogram.common',
            'v-charts/lib/pie.common',
            'v-charts/lib/funnel.common',
        ],

    },
    output: {
        path: path.join(__dirname, '../dll/static'),
        filename: 'dll.[name].js',
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../dll', '[name]-manifest.json'),
            name: '[name]',
            context: __dirname,
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        }),
    ]
}