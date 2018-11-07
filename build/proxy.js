/**
 * created by : heiye1991
 * created time: 2018-11-07
 * description:
 */
module.exports = {
  // '/api': 'http://localhost:3000' // 简单使用
  '/api': { // 可以在接口后面加上/.+控制接口后面有内容，避免跳转到target
    target: 'https://www.thepaper.cn',
    changeOrigin: true, // 允许跨域
    pathRewrite: {'^/api' : ''}, // 重写路径
    logLevel: 'debug', // 日志['debug', 'info', 'warn', 'error', 'silent']. Default: 'info'
    headers: {} // 可以添加一些请求信息，如cookie等
  }
}
