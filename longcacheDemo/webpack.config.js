/**
 * created by : heiye1991
 * created time: 2018-11-08
 * description: 长缓存优化
 *    长缓存：长时间缓存可以让浏览器不加载没有变化的文件，只加载用户改变的代码
 *    场景一：改变app代码，vendor变化
 *        解决：提取vendor，hash改为chunkHash，提取webpack runtime
 *        webpack4使用optimization.splitChunks
 *    场景二：引入新模块，模块顺序变化，vendor hash变化，原因在于每个模块id，id变化hash会变化
 *        解决：NamedChunksPlugin NamedModulesPlugin
 *    场景三：动态引入新模块，vendor hash变化
 *        解决：定义动态模块下的chunkname
 *
 */
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    main: path.join(__dirname, './src/foo'),
    vendor: ['react']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    // optimization.splitChunks代替
    /*new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    })*/
    new webpack.NamedChunksPlugin(),
    new webpack.NamedModulesPlugin()
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
          name:"vendor",
          minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
          maxInitialRequests: 5,
          minSize: 0,
          priority:100,//优先级
        },
        /*default: {
          test: /[\\/]src[\\/]js[\\/]/
          minChunks: 2,//一般为非第三方公共模块
          priority: -20,
          reuseExistingChunk: true
        }*/
      }
    },
    runtimeChunk:{
      name:'manifest'
    }
  }
}
