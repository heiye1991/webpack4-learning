/**
 * created by : heiye1991
 * created time: 2018-11-04
 * description:
 */
// transform 是一个函数，可以在通过 style-loader 加载到页面之前修改 css。 该函数将在即将加载的 css 上调用，函数的返回值将被加载到页面，而不是原始的 css 中。 如果 transform 函数的返回值是 falsy 值，那么 css 根本就不会加载到页面中。
module.exports = function (css) {
  console.log(css); // 查看css
  console.log(window.innerWidth);
  return window.innerWidth < 1000 ? css.replace("red", "green") : css; // 如果屏幕宽度 < 1000, 替换背景颜色
}