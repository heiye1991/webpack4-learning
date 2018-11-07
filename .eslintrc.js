// https://eslint.org/docs/user-guide/configuring

module.exports = {
  // 默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。如果你想要你所有项目都遵循一个特定的约定时，这将会很有用，但有时候会导致意想不到的结果。为了将 ESLint 限制到一个特定的项目，在你项目根目录下的 package.json 文件或者 .eslintrc.* 文件里的 eslintConfig 字段下设置 "root": true。ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  root: true,
  // 设置解析器选项
  parserOptions: {
    parser: 'babel-eslint'
  },
  // 指定你想启用的环境
  env: {
    browser: true, //浏览器环境
    node: true
  },
  // 开启推荐配置信息
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // 设置插件
  // required to lint type files
  plugins: [
    'html'
  ],
  // 启用的规则及各自的错误级别
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions 箭头函数是否用小括号括起来
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 文件是否以单一的换行符结束
    'eol-last': 0,
    // 函数定义时括号前面要不要有空格
    'space-before-function-paren': 0,
    // eslint默认不认可，Tab会报错，关闭
    'no-tabs': 'off',
    // eslint校验时期望script下的首行不要缩进，缩进报错，关闭
    'indent': 'off',
    // 'semi': 'off',
    'semi': [2, 'always'],//语句强制分号结尾
  },
  // 脚本在执行期间访问的额外的全局变量
  // 当访问未定义的变量时，no-undef 规则将发出警告。如果你想在一个文件里使用全局变量，推荐你定义这些全局变量，这样 ESLint 就不会发出警告了。你可以使用注释或在配置文件中定义全局变量。
  globals: {
    window: true,
    document: true,
    $: true,
    jQuery: true
  }
}
