/**
 * created by : heiye1991
 * created time: 2018-11-04
 * description:
 */
module.exports = {
  // 可以使用数组写法，也可以使用对象写法
  plugins: {
    // 使用postcss-sprites报错，版本要求postcss5.2.18，但是项目使用了高版本7.0.5
    /*'postcss-sprites': {
      spritePath: "./dist/images/sprites",//雪碧图合成路径
      retina: true // retina屏幕 还需要把需要处理的对应图片改为@2x等
    },*/
    // 'autoprefixer': {}
    'postcss-cssnext': {}, // 未来的css属性，使用这个就不需要autoprefixer了
    'cssnano': {}, //cssnano是PostCSS的CSS优化和分解插件。cssnano采用格式很好的CSS，并通过许多优化，以确保最终的生产环境尽可能小
  }
  /*plugins: [
    require('autoprefixer'),
    require('postcss-cssnext'),
    require('cssnano'),
    require('postcss-sprites')({
      spritePath: "./dist/images/sprites"
    })
  ]*/
}