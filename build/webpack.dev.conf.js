/**
 * created by : heiye1991
 * created time: 2018-11-07
 * description: webpack 开发环境配置
 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const historyApiFallback = require('./historyApiFallback');
const proxy = require('./proxy');
const styleLoader = [
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
];

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      // js 打包以及eslint检查
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter'), // 报错时使用更友好的格式
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
        use: styleLoader
      },
      // less打包
      {
        test: /\.less$/,
        use: styleLoader.concat({
          loader: 'less-loader',
          options: {
            sourceMap: true
          }
        })
      },
      // sass/scss 打包
      {
        test: /\.(scss|sass)$/,
        use: styleLoader.concat({
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        })
      },
      // stylus打包
      {
        test: /\.styl$/,
        use: styleLoader.concat({
          loader: 'stylus-loader',
          options: {
            sourceMap: true
          }
        })
      },
      // 图片打包
      {
        test: /\.(png|jpg|gif)$/,  // 正则匹配图片格式名 没有用到svg图片|svg去掉
        use: [
          // file-loader打包图片
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',  // 设置打包后图片存放的文件夹名称
              name: '[name]-[hash:5].min.[ext]'// 打包后的图片命名
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // webpack 内置的 HMR 插件
    new webpack.NamedModulesPlugin() // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境
  ],
  devServer: {
    port: '8088',  // 设置端口号为8088
    // inline: true,  // 在 dev-server 的两种不同模式之间切换。默认情况下true，应用程序启用内联模式(inline mode)。这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台,false 使用 iframe 模式,会在头部显示进度等信息
    // historyApiFallback: true, //当使用 HTML5 History API 时 任意的 404 响应都可能需要被替代为 index.html，简单配置，也可以使用对象配置
    historyApiFallback: historyApiFallback,
    // 代理接口
    proxy: proxy,
    hot: true,     // 模块热更新
    hotOnly: true, // js修改不会刷新
    overlay: true // eslint 浏览器展示错误报警信息
  },
  devtool: 'cheap-module-eval-source-map'
});

module.exports = devWebpackConfig;
