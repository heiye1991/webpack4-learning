/**
 * created by : heiye1991
 * created time: 2018-11-02
 * description:
 * @babel/preset-env 针对语法，可以在.babelrc里面配置也可以在package.json里面配置，还可以在babel-loader里面配置
 * @babel/polyfill 针对函数和方法，用于开发应用，全局垫片，引用一次即可
 * @babel/plugin-transform-runtime 针对函数和方法，用于框架开发，局部垫片，不会污染全局，需要同时安装@babel/runtime， 在.babelrc里面配置"plugins": ["@babel/plugin-transform-runtime"]
 */
const path = require('path')
module.exports = {
  mode: 'development',
  entry: {
    // index: ['@babel/polyfill', path.join(__dirname, './index.js')] // 可以在这里设置@babel/polyfill
    index: path.join(__dirname, './index.js')
  },
  output: {
    filename: 'bundle.[hash:5].js', // 打包生成的文件
    path: path.join(__dirname, '/dist'), // 打包文件的输出目录
    publicPath: path.join(__dirname, '/dist/') // js引用路径或者CDN地址
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
          // 引入.babelrc不需要在这里设置
          /*,
          options: {
            presets: [
              ['@babel/preset-env',{
                targets: {
                  browsers: ["last 2 versions", "> 1%"] // 针对浏览器设置，最新两个版本，占有率1% 以上
                  // chrome: '60' // 针对特别浏览器版本
                }
              }]
            ]
          }*/
        },
        exclude: '/node_modules/'
      }
    ]
  }
}