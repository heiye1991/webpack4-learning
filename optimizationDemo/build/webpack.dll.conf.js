/**
 * created by : heiye1991
 * created time: 2018-11-08
 * description:
 */
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    // 第三方'vue-router'，'axios'等等
    vue: ['vue'],
    ui: ['element-ui']
  },
  output: {
    path: path.join(__dirname, '../src/dll/'),
    filename: '[name].dll.js',
    library: '[name]' // 定义第三方库的引用方式
  },
  plugins: [
    // 第三方打包后不会再打包
    new webpack.DllPlugin({
      path: path.join(__dirname, '../src/dll/', '[name].manifest.json'),
      name: '[name]'
    }),
    // 对[name].manifest.json压缩
    new webpack.optimize.UglifyJsPlugin()
  ]
}
