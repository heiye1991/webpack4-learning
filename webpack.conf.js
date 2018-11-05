/**
 * created by : heiye1991
 * created time: 2018-11-02
 * description: webpack4的mode设为production，optimization.minimize为true自动会删除不用的js代码
 */
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //引入css分离插件
const PurifyCss = require('purifycss-webpack'); // 引入PurifyCssWebpack插件
const glob = require('glob');  // 引入glob模块,用于扫描全部html文件中所引用的css
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
      filename: '[name].min.css', //生成文件的文件名。可能包含 [name], [id] and [contenthash]
      // allChunks: false // 只包括初始化css, 不包括异步加载的CSS---从所有额外的 chunk(additional chunk) 提取（默认情况下false，它仅从初始chunk(initial chunk) 中提取）当使用 CommonsChunkPlugin 并且在公共 chunk 中有提取的 chunk（来自ExtractTextPlugin.extract）时，allChunks **必须设置为 true
    }),
    new PurifyCss({
      paths: glob.sync(path.join(__dirname, './*.html')) // 同步扫描所有html文件中所引用的css
    })
    // new webpack.optimize.UglifyJsPlugin() //已被移除 用optimization.minimize代替
  ],
  optimization: {
    minimize: true // 默认false不压缩，true压缩
  }
}