/**
 * created by : heiye1991
 * created time: 2018-11-07
 * description: webpack 生产环境配置
 */
const path = require('path');
const merge = require('webpack-merge');
const PurifyCss = require('purifycss-webpack'); // 引入PurifyCssWebpack插件
const glob = require('glob');  // 引入glob模块,用于扫描全部html文件中所引用的css
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 引入CleanWebpackPlugin插件
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //引入css分离插件
const baseWebpackConfig = require('./webpack.base.conf');

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    // publicPath: '' //上线或者cdn使用，文件前面加上对应的地址
  },
  module: {
    rules: [
      // js 打包
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      // css打包
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
          publicPath: '../'
        })
      },
      // less打包
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:['css-loader', 'postcss-loader', 'less-loader'],
          publicPath: '../'
        })
      },
      // sass/scss 打包
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:['css-loader', 'postcss-loader', 'sass-loader'],
          publicPath: '../'
        })
      },
      // stylus打包
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:['css-loader', 'postcss-loader', 'stylus-loader'],
          publicPath: '../'
        })
      },
      // 图片打包和压缩
      {
        test: /\.(png|jpg|gif)$/,  // 正则匹配图片格式名 没有用到svg图片|svg去掉
        use: [
          // url-loader 打包图片，可以设置图片使用base64
          {
            loader: 'url-loader',
            options: {
              limit: 20000,  // 限制只有小于20kb的图片才转为base64，超过这个大小不会被转化
              outputPath: 'images',  // 设置打包后图片存放的文件夹名称
              name: '[name]-[hash:5].min.[ext]',// 打包后的图片命名
              fallback:'file-loader' //大于limit限制的将转交给指定的loader处理
            }
          },
          // 压缩图片img-loader, image-webpack-loader, imagemin-webpack-plugin等都可以实现
          {
            loader: 'img-loader',
            options: {
              plugins: [
                // 处理jpg
                require('imagemin-mozjpeg')({
                  progressive: true,
                  arithmetic: false
                }),
                // 处理png
                require('imagemin-pngquant')({
                  floyd: 0.5,
                  speed: 2,
                  quality: 80
                })
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new PurifyCss({
      paths: glob.sync(path.join(__dirname, './../*.html')) // 同步扫描所有html文件中所引用的css, 会删除无用的css
    }),
    // css打包生成文件
    new ExtractTextPlugin({
      filename: 'css/[name]-[hash:5].min.css', //生成文件的文件名。可能包含 [name], [id] and [contenthash]
      // allChunks: false // 只包括初始化css, 不包括异步加载的CSS---从所有额外的 chunk(additional chunk) 提取（默认情况下false，它仅从初始chunk(initial chunk) 中提取）当使用 CommonsChunkPlugin 并且在公共 chunk 中有提取的 chunk（来自ExtractTextPlugin.extract）时，allChunks **必须设置为 true
    }),
    // new CleanWebpackPlugin([path.resolve(__dirname, '../dist')])  // 所要清理的文件夹名称，简单配置的时候，会出现dist is outside of the project root，无法删除dist文件夹，需要高级配置
    // 配置自动删除dist文件夹
    new CleanWebpackPlugin(
      ['dist'], // 数组的每一个元素为要删除的路径
      {
        root: path.resolve(__dirname, '../'), // 路径的配置
        verbose: true, // 将log写到 console
        dry: false, // 不要删除任何东西，主要用于测试
        exclude: [''] //排除不删除的目录，主要用于避免删除公用的文件
      }
    )
  ],
  optimization: {
    minimize: true // 默认false不压缩js，true压缩js
  },
  devtool: 'source-map'
});

module.exports = buildWebpackConfig;
