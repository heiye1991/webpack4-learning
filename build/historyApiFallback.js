/**
 * created by : heiye1991
 * created time: 2018-11-07
 * description:
 */
module.exports = {
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'], //只有html才会重定向
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
};
