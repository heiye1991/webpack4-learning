/**
 * created by : heiye1991
 * created time: 2018-11-04
 * description: 对经常使用的第三方库（如lodash 等等），实现Tree Shaking，js tree shaking 利用的是 es 的模块系统。而 lodash.js 没有使用 CommonJS 或者 ES6 的写法。所以，安装库对应的模块系统即可。
 */
import './stylus/icon.styl'
import './css/base.css'
import './css/common.css'
import './less/button.less'
import './scss/close.scss'
import './stylus/small.styl'

import { a } from "./common/util";
console.log(a());

import { chunk } from "lodash-es";
console.log(chunk([1, 2, 3], 2));

$('div').addClass('new')//验证npm安装的jquery
jQuery("div").addClass("old");//验证本地jquery