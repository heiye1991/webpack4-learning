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
    pageA: path.join(__dirname, './src/pageA.js'),
    pageB: path.join(__dirname, './src/pageB.js')
  },
  output: {
    publicPath: "./dist/", //用于线上或者cdn
    path: path.join(__dirname, './dist'), // 打包文件的输出目录
    filename: '[name].bundle.js', // 打包生成的文件
    chunkFilename: '[name].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      }
    ]
  },
  /*optimization: {
    runtimeChunk: {
      name: "common"
    },
    splitChunks: {
      chunks: "initial",         // 必须三选一： "initial" | "all"(默认就是all) | "async"
      minSize: 0,                // 最小尺寸，默认0
      minChunks: 1,              // 最小 chunk ，默认1
      maxAsyncRequests: 1,       // 最大异步请求数， 默认1
      maxInitialRequests: 1,    // 最大初始化请求书，默认1
      name: () => {},              // 名称，此选项课接收 function
      cacheGroups: {                 // 这里开始设置缓存的 chunks
        priority: "0",                // 缓存组优先级 false | object |
        vendor: {                   // key 为entry中定义的 入口名称
          chunks: "initial",        // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          test: /react|lodash/,     // 正则规则验证，如果符合就提取 chunk
          name: "vendor",           // 要缓存的 分隔出来的 chunk 名称
          minSize: 0,
          minChunks: 1,
          enforce: true,
          maxAsyncRequests: 1,       // 最大异步请求数， 默认1
          maxInitialRequests: 1,    // 最大初始化请求书，默认1
          reuseExistingChunk: true   // 可设置是否重用该chunk（查看源码没有发现默认值）
        }
      }
    }
  }*/
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 注意: priority属性
        // 其次: 打包业务中公共代码
        common: {
          name: "common",
          chunks: "all",
          minSize: 1,
          priority: 0
        },
        // 首先: 打包node_modules中的文件
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
        }
      }
    }
  }
}