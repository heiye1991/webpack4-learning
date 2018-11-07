/**
 * created by : heiye1991
 * created time: 2018-11-02
 * description:
 *    搭建开发环境
 *    clean-webpack-plugin自动清理打包已生成的dist，避免冗余文件存在
 *    webpack -w 或者webpack -watch 本地监听服务变化自动打包
 *    webpack-dev-server 官方推荐的开发服务器，可以集成多种功能
 *    express+webpack-dev-middleware 第三方搭建开发环境，可以配置自己想要的服务
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
 *
 */
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //引入css分离插件
const PurifyCss = require('purifycss-webpack'); // 引入PurifyCssWebpack插件
const glob = require('glob');  // 引入glob模块,用于扫描全部html文件中所引用的css
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 引入CleanWebpackPlugin插件
module.exports = {
  mode: 'development',
  entry: {
    index: path.join(__dirname, './src/index.js')
  },
  output: {
    path: path.join(__dirname, '/dist'), // 打包文件的输出目录
    filename: 'js/[name].bundle-[hash:5].js', // 打包生成的文件
    // publicPath: '/' //上线或者cdn使用，文件前面加上对应的地址
  },
  module: {
    rules: [
      // js 打包
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "eslint-loader",
            options: {
              formatter: require("eslint-friendly-formatter"), // 报错时使用更友好的格式
              // 默认情况下false，加载程序将根据eslint错误/警告计数自动调整错误报告,可以通过将emitError，emitWarning设为true强制使用
              emitError: true,
              emitWarning: true,
            }
          }
        ],
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'src')]
      },
      // css打包
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              // singleton: true,
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      // less打包
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              // singleton: true,
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      // sass/scss 打包
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              // singleton: true,
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      // stylus打包
      {
        test: /\.styl$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              // singleton: true,
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      // 图片打包
      {
        test: /\.(png|jpg|gif)$/,  // 正则匹配图片格式名 没有用到svg图片|svg去掉
        use: [
          // url-loader 打包图片，可以设置图片使用base64
          {
            loader: 'url-loader',
            options: {
              limit: 20000,  // 限制只有小于20kb的图片才转为base64，超过这个大小不会被转化
              outputPath: 'images',  // 设置打包后图片存放的文件夹名称
              name: "[name]-[hash:5].min.[ext]",// 打包后的图片命名
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
      },
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
    new ExtractTextPlugin({
      filename: 'css/[name]-[hash:5].min.css', //生成文件的文件名。可能包含 [name], [id] and [contenthash]
      // allChunks: false // 只包括初始化css, 不包括异步加载的CSS---从所有额外的 chunk(additional chunk) 提取（默认情况下false，它仅从初始chunk(initial chunk) 中提取）当使用 CommonsChunkPlugin 并且在公共 chunk 中有提取的 chunk（来自ExtractTextPlugin.extract）时，allChunks **必须设置为 true
    }),
    new PurifyCss({
      paths: glob.sync(path.join(__dirname, './*.html')) // 同步扫描所有html文件中所引用的css, 会删除无用的css，但是css代码不能压缩了
    }),
    // 使用第三方js库
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./index.html"),// new一个这个插件的实例，并传入相关的参数
      filename: 'index.html',
      minify: {
        removeComments: true, //删除注释
        collapseWhitespace: true // 去除空格
      },
      // chunks: [], // 指定打包生成的HTML引用的js
      // excludeChunks: [] //排除那些js不打包到生成的js
    }),
    new CleanWebpackPlugin(['dist']),  // 所要清理的文件夹名称
    new webpack.HotModuleReplacementPlugin(), // webpack 内置的 HMR 插件
    new webpack.NamedModulesPlugin() // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境
  ],
  optimization: {
    minimize: true // 默认false不压缩js，true压缩js
  },
  devServer: {
    port: "8088",  // 设置端口号为8088
    // inline: true,  // 在 dev-server 的两种不同模式之间切换。默认情况下true，应用程序启用内联模式(inline mode)。这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台,false 使用 iframe 模式,会在头部显示进度等信息
    // historyApiFallback: true, //当使用 HTML5 History API 时 任意的 404 响应都可能需要被替代为 index.html，简单配置，也可以使用对象配置
    historyApiFallback: {
      rewrites: [
        /*// 确定的页面
        {
          from: '/pages/a',
          to: '/pages/a.html'
        },
        // 正则匹配
        {
          from: /^\/b/,
          to: '/pages/b.html'
        },*/
        // 函数正则匹配
        {
          from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
          to: function (context) {
            return '/' + context.match[1] + context.match[2]+ '.html';
          }
        }
      ]
    },
    // 代理接口
    proxy: {
      // '/api': 'http://localhost:3000' // 简单使用
      '/api': {
        target: 'https://www.thepaper.cn',
        changeOrigin: true, // 允许跨域
        pathRewrite: {'^/api' : ''}, // 重写路径
        logLevel: 'debug', // 日志['debug', 'info', 'warn', 'error', 'silent']. Default: 'info'
        headers: {}, // 可以添加一些请求信息，如cookie等
      }
    },
    hot: true,     // 模块热更新
    hotOnly: true, // js修改不会刷新
    overlay: true // eslint 浏览器展示错误报警信息
  },
  devtool: "source-map"
}
