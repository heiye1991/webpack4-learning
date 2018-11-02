/**
 * created by : heiye1991
 * created time: 2018-11-02
 * description: webpack支持ES6 Module、CommonJs和AMD规范
 * AMD 实现浏览器报错 Not allowed to load local resource:bundle不能加载amd打包的js
 */
// es module
import sum from './sum'
console.log('+', sum(1, 2))

// commonjs
var minus = require('./minus')
console.log('-', minus(3, 2))

// amd
/*require(["./multi"], function(multi) {
  console.log("*", multi(1, 2));
});*/
