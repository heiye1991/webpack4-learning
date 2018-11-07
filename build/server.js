/**
 * created by : heiye1991
 * created time: 2018-11-07
 * description:
 */
const webpack = require('webpack');
const express = require('express');
const opn = require('opn');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const httpProxyMiddleware = require('http-proxy-middleware');
const connectHistoryApiFallback = require('connect-history-api-fallback');
const config = require('./webpack.dev.conf');
const historyApiFallback = require('./historyApiFallback');
const proxy = require('./proxy');

const compiler = webpack(config);
const app = new express();
const port = 5000;

for (let key in proxy) {
  app.use(httpProxyMiddleware(key, proxy[key]))
}

app.use(connectHistoryApiFallback(historyApiFallback));
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.listen(port, function () {
  console.log('listen to' + port);
  opn('http://localhost:' + port);
});
