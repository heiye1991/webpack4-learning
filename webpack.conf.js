/**
 * created by : heiye1991
 * created time: 2018-11-02
 * description:
 *    背景图片打包，压缩，base64编码
 *    合成雪碧图没有实现，svg并没有压缩，gif压缩效果并不是很理想，只减少了12kb
 */
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //引入css分离插件
const PurifyCss = require('purifycss-webpack'); // 引入PurifyCssWebpack插件
const glob = require('glob');  // 引入glob模块,用于扫描全部html文件中所引用的css
const SpritesmithPlugin = require('webpack-spritesmith') //雪碧图合成处理位图资源
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
      {
        test: /\.(png|jpg|svg|gif)$/,  // 正则匹配图片格式名
        use: [
          // file-loader打包图片
          /*{
            loader: 'file-loader',
            options: {
              outputPath: 'images',  // 设置打包后图片存放的文件夹名称
              name: "[name]-[hash:5].min.[ext]",
              publicPath: './images'  // 给图片设置一个公共路径
            }
          }*/
          // url-loader 打包图片，可以设置图片使用base64
          {
            loader: 'url-loader',
            options: {
              limit: 20000,  // 限制只有小于20kb的图片才转为base64，超过这个大小不会被转化
              outputPath: 'images',  // 设置打包后图片存放的文件夹名称
              name: "[name]-[hash:5].min.[ext]",// 打包后的图片命名
              publicPath: './images',  // 给图片设置一个公共路径
              fallback:'file-loader',//大于limit限制的将转交给指定的loader处理
            }
          },
          // 压缩图片img-loader, image-webpack-loader, imagemin-webpack-plugin等都可以实现
          {
            loader: 'img-loader',
            options: {
              plugins: [
                // 处理gif
                require('imagemin-gifsicle')({
                  interlaced: false,
                  optimizationLevel: 3
                }),
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
                }),
                // 处理svg
                require('imagemin-svgo')({
                  plugins: [
                    { removeTitle: true },// 去掉 <title>
                    { convertPathData: true }, //将路径数据转换为相对或绝对（以较短者为准），将一个段转换为另一个段，修剪无用的分隔符，智能舍入等等
                    { removeDesc: true }, //去掉 <desc>
                    { minifyStyles: true }, //<style>用CSSO缩小元素内容
                    { removeEmptyText: true }, //删除空文本元素
                    { removeEmptyAttrs: true }, //删除空属性
                  ]
                })
              ]
            }
          }
        ]
      },
      // svg 可以使用inline-svg-loader进行资源嵌入，也可以使用svg-sprite-loader将矢量图资源合并为雪碧图
      {
        test: /\.svg$/,
        use: 'inline-svg-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].min.css', //生成文件的文件名。可能包含 [name], [id] and [contenthash]
      // allChunks: false // 只包括初始化css, 不包括异步加载的CSS---从所有额外的 chunk(additional chunk) 提取（默认情况下false，它仅从初始chunk(initial chunk) 中提取）当使用 CommonsChunkPlugin 并且在公共 chunk 中有提取的 chunk（来自ExtractTextPlugin.extract）时，allChunks **必须设置为 true
    }),
    new PurifyCss({
      paths: glob.sync(path.join(__dirname, './*.html')) // 同步扫描所有html文件中所引用的css
    }),
    // 生成雪碧图，在这里没有实现。。。。。。
    /*new SpritesmithPlugin({
      //设置源icons,即icon的路径，必选项
      src: {
        cwd: __dirname + './src/images/',
        glob: '*.png' //正则匹配，照着填即可
      },
      //设置导出的sprite图及对应的样式文件，必选项
      target: {
        image: __dirname + './dist/images/sprites/sprite.png',
        css: __dirname + './dist/images/sprites/sprite.css'
      },
      //设置sprite.png的引用格式，会自己加入sprite.css的头部
      apiOptions: {
        cssImageRef: './sprite.png' //cssImageRef为必选项
      },
      //配置spritesmith选项，非必选
      spritesmithOptions: {
        algorithm: 'top-down',//设置图标的排列方式
        padding: 4 //每张小图的补白,避免雪碧图中边界部分的bug
      }
    })*/
    // new webpack.optimize.UglifyJsPlugin() //已被移除 用optimization.minimize代替
  ],
  optimization: {
    minimize: true // 默认false不压缩js，true压缩js
  }
}