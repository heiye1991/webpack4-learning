/**
 * created by : heiye1991
 * created time: 2018-11-02
 * description:
 */
const path = require('path')
const webpack = require('webpack')
module.exports = {
  mode: 'development',
  entry: {
    // 单页面打包公共代码没用，适用懒加载
    // import()
    // page: path.join(__dirname, './src/page.js'),
    // require.ensure()
    page: path.join(__dirname, './src/page2.js')
  },
  output: {
    publicPath: "./dist/", //用于线上或者cdn
    path: path.resolve(__dirname, './dist'), // 打包文件的输出目录
    filename: '[name].bundle.js', // 打包生成的文件
    chunkFilename: '[name].chunk.js'
  }
}