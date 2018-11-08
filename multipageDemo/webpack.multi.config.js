/**
 * created by : heiye1991
 * created time: 2018-11-08
 * description: 多页面应用
 *    特点：多入口，多页面，每个页面不同的chunk，每个页面不同的参数等
 *    可以使用多配置，也可以使用单配置
 *    多配置  webpack支持，或者使用parallel-webpack并行处理
 *        优点：可以使用parallel-webpack来提升打包速度，配置更加独立灵活等
 *        缺点：不同页面之间不能共享代码，不能提取公共代码，不能共用缓存等等
*     单配置
 *        优点：可以共享公共代码，共用缓存等
 *        缺点：打包速度慢，输出内容复杂
 *
*     多配置实现
 *
 */

const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const baseConfig = {
  mode: 'development',
  entry: {
    react: ['react']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin({
      filename: 'css/[name].[hash].css'
    }),
    new CleanWebpackPlugin(path.resolve(__dirname, 'dist'))
  ],
  optimization: {
    splitChunks: {
      // chunks: "async", //默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
      // minSize: 30000,//合并前模块文件的体积
      minChunks: 1,//最少被引用次数
      name: true,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',//自动命名连接符
      cacheGroups: {
        vendor:{//node_modules内的依赖库
          chunks:"all",
          test: /[\\/]node_modules[\\/]/,
          name:"react",
          minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
          maxInitialRequests: 5,
          minSize: 0,
          priority:100,//优先级
        }
      }
    },
    runtimeChunk:{
      name:'manifest'
    }
  }
}

// 生成每个页面的配置
const generatePage = function ({
  title='',
  entry='',
  template= path.join(__dirname, './src/index.html'),
  name='',
  chunks=[]
} = {}) {
  return {
    entry,
    plugins: [
      new HtmlWebpackPlugin({
        chunks,
        template,
        title,
        filename: name+ '.html'
      })
    ]
  }
}

const pages = [
  generatePage({
    title: 'page A',
    entry: {
      a: path.join(__dirname, './src/js/a')
    },
    name: 'a',
    chunks: ['react', 'a']
  }),
  generatePage({
    title: 'page B',
    entry: {
      b: path.join(__dirname, './src/js/b')
    },
    name: 'b',
    chunks: ['react', 'b']
  }),
  generatePage({
    title: 'page C',
    entry: {
      c: path.join(__dirname, './src/js/c')
    },
    name: 'c',
    chunks: ['react', 'c']
  })
]

console.log(pages.map(page => merge(baseConfig, page)))
module.exports = pages.map(page => merge(baseConfig, page))
