/**
 * created by : heiye1991
 * created time: 2018-11-04
 * description: import()懒加载并且自动执行，可以通过注释的方法来指定打包后的 chunk 的名字 需要安装插件@babel/plugin-syntax-dynamic-import，并在.babelrc里面配置
 * 在index.html里面引入打包后的js，发现报错Not allowed to load local resource。。。
 */
import(/* webpackChunkName: 'subPageA'*/ "./subPageA").then(function(subPageA) {
  console.log(subPageA);
});

import(/* webpackChunkName: 'subPageB'*/ "./subPageB").then(function(subPageB) {
  console.log(subPageB);
});

import(/* webpackChunkName: 'lodash'*/ "lodash").then(function(_) {
  console.log(_.join(["1", "2"]));
});
export default "page";