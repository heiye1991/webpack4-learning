/**
 * created by : heiye1991
 * created time: 2018-11-07
 * description: webpack 公共配置
 *    cross-env插件可以在package.json里面配置开发环境如cross-env ENV=development，或者生产环境cross-env ENV=production，这样可以在js里面通过process.env.ENV得到配置的值
 *    搭建开发环境
 *    clean-webpack-plugin自动清理打包已生成的dist，避免冗余文件存在
 *    1.webpack -w 或者webpack -watch 本地监听服务变化自动打包
 *    2.webpack-dev-server 官方推荐的开发服务器，可以集成多种功能
 *    3.express+webpack-dev-middleware 第三方搭建开发环境，可以配置自己想要的服务
 *
 *    webpack-dev-server 可以实现live-reload 不能打包文件，可以路径重定向，可以使用https，可以在浏览器中显示编译错误，可以接口代理，可以模块热更新
 *    historyApiFallback 路径重定向设置
 *    proxy 代理设置
 *    模块热更新浏览器不会刷新加载，可以保持应用的数据状态，节省调试时间，样式调试很快 必须有 webpack.HotModuleReplacementPlugin 才能完全启用 HMR，通过--hot命令启动不需要
 *    热加载样式时，不能把样式用extract-text-webpack-plugin分离，通过style-loader实现热更新
 *    热加载js需要设置hotOnly为true，还要在js里面加入 if (module.hot) {module.hot.accept()}接受热更新， 里面可以配置参数
 *    source map配置 选择一种 source map 格式来增强调试过程。不同的值会明显影响到构建(build)和重新构建(rebuild)的速度，通过devtool配置
 *    也可以直接使用 SourceMapDevToolPlugin/EvalSourceMapDevToolPlugin 来替代使用 devtool 选项
 *    source map开发环境值：eval，cheap-eval-source-map，cheap-module-eval-source-map，eval-source-map
 *    source map生产环境值：none，source-map，hidden-source-map，nosources-source-map
 *    各类型css使用source map需要设置options.sourceMap,style-loader里的options.singleton不能喝sourcemap一起用，不然都注入到style标签里了，没法调试
 *
 *    eslint 语法检查
 *    浏览器显示报警错误信息，在devtool里面配置overlay为true
 *    .eslintrc.js配置相关eslint设置
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件

module.exports = {
  entry: {
    index: path.join(__dirname, '../src/index.js')
  },
  output: {
    path: path.join(__dirname, '../dist'), // 打包文件的输出目录
    filename: 'js/[name].bundle-[hash:5].js' // 打包生成的文件
    // publicPath: '/' //上线或者cdn使用，文件前面加上对应的地址
  },
  module: {
    rules: [
      // 字体打包
      {
        test: /\.(woff2?|eot|ttf|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100,
              name: '[name].[hash:7].[ext]',
              outputPath: 'fonts', // 设置打包后字体存放的文件夹名称
              publicPath: '../fonts' // 给字体设置一个公共路径
            }
          }
        ]
      },
      // HTML里的图片打包
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'img:data-src']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // html打包生成文件
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../index.html'),// new一个这个插件的实例，并传入相关的参数
      filename: 'index.html',
      minify: {
        removeComments: true, //删除注释
        collapseWhitespace: true // 去除空格
      },
      // chunks: [], // 指定打包生成的HTML引用的js
      // excludeChunks: [] //排除那些js不打包到生成的js
    }),
    // 使用第三方js库
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};
