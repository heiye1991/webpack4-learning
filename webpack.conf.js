/**
 * created by : heiye1991
 * created time: 2018-11-02
 * description:
 */
const path = require('path')
module.exports = {
  mode: 'development',
  entry: {
    index: path.join(__dirname, './index.js')
  },
  output: {
    filename: 'bundle.js', // 打包生成的文件
    path: path.join(__dirname, '/dist'), // 打包文件的输出目录
    publicPath: __dirname + '/dist/' // js引用路径或者CDN地址
  }
}