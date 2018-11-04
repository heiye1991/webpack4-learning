/**
 * created by : heiye1991
 * created time: 2018-11-02
 * description: webpack4的mode设为production，optimization.minimize为true自动会删除不用的js代码
 */
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //引入css分离插件
module.exports = {
  mode: 'production',
  entry: {
    index: path.join(__dirname, './src/index.js')
  },
  output: {
    publicPath: './dist/',
    path: path.resolve(__dirname, './dist'), // 打包文件的输出目录
    filename: '[name].bundle.js', // 打包生成的文件
    chunkFilename: "[name].chunk.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback:"style-loader",
          use:['css-loader', 'postcss-loader', 'less-loader']
        })
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback:"style-loader",
          use:['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:['css-loader', 'postcss-loader', 'stylus-loader']
        })
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css', //生成文件的文件名。可能包含 [name], [id] and [contenthash]
      allChunks: false // 只包括初始化css, 不包括异步加载的CSS---从所有额外的 chunk(additional chunk) 提取（默认情况下false，它仅从初始chunk(initial chunk) 中提取）当使用 CommonsChunkPlugin 并且在公共 chunk 中有提取的 chunk（来自ExtractTextPlugin.extract）时，allChunks **必须设置为 true
    })
    // new webpack.optimize.UglifyJsPlugin() //已被移除 用optimization.minimize代替
  ],
  optimization: {
    minimize: true // 默认false不压缩，true压缩
  }
}