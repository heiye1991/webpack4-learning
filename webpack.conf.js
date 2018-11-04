/**
 * created by : heiye1991
 * created time: 2018-11-02
 * description:
 */
const path = require('path')
module.exports = {
  mode: 'development',
  entry: {
    index: path.join(__dirname, './src/index.js')
  },
  output: {
    publicPath: './dist/',
    path: path.resolve(__dirname, './dist'), // 打包文件的输出目录
    filename: '[name].bundle.js' // 打包生成的文件
  },
  module: {
    rules: [
      // style-loader 用于创建style标签，载入css内容
      // css-loader 用于js引入css文件
      {
        test: /\.css$/,
        // 通过style标签引入
        /*use: [
          'style-loader',
          'css-loader'
        ]*/
        // 生成css文件并通过link引入，会把每个引入的css都打包成一个css文件，增加了请求，不常用
        /*use: [
          'style-loader/url',
          'file-loader'
        ]*/
        // 可以使用use() 方法，控制style标签的显示和隐藏
        /*use: [
          'style-loader/useable',
          'css-loader'
        ]*/
        // style-loader配置
        use: [
          {
            loader: 'style-loader',
            options: {
              // insertAt: 'bottom', // 把style插入位置,默认情况下bottom，style-loader 将 <style> 元素附加到样式目标(style target)的末尾，即页面的 <head> 标签，可以为其他值或对象 bottom，top，{before: '#id'}等等
              // insertInto: '.demo', // 把style插入到某个元素，默认情况下，样式加载器将 <style> 元素插入到页面的 <head> 标签中，可以为目标元素的选择器
              singleton: true, // 处理为单个style标签
              transform: "./src/css.transform.js" // transform 文件 不在打包的时候执行transform函数，在style标签创建的时候执行，运行的环境是浏览器环境
            }
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true, // css代码压缩
              modules: true, // css模块化 默认情况下，这将启用局部作用域 CSS。
              localIdentName: '[path][name]__[local]--[hash:base64:5]', //使用 localIdentName 查询参数（默认 [hash:base64]）来配置生成的 ident
              // 通过自定义 getLocalIdent 函数来指定绝对路径，以根据不同的模式(schema)生成类名
              /*getLocalIdent: (context, localIdentName, localName, options) => {
                return 'whatever_random_class_name'
              }*/
            }
          //  使用 :local(.className) 可以被用来在局部作用域中声明 className。局部的作用域标识符会以模块形式暴露出去。使用 :local（无括号）可以为此选择器启用局部模式。:global(.className) 可以用来声明一个明确的全局选择器。使用:global（无括号）可以将此选择器切换至全局模式。
          }
        ]
      }
    ]
  }
}