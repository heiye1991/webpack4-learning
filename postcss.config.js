/**
 * created by : heiye1991
 * created time: 2018-11-04
 * description:
 */
module.exports = {
  plugins: [
    // require('autoprefixer'),
    require('postcss-cssnext'), // 未来的css属性，使用这个就不需要autoprefixer了
    require('cssnano') //压缩css
  ]
}