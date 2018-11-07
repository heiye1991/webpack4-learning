/**
 * created by : heiye1991
 * created time: 2018-11-04
 * description: 对经常使用的第三方库（如lodash 等等），实现Tree Shaking，js tree shaking 利用的是 es 的模块系统。而 lodash.js 没有使用 CommonJS 或者 ES6 的写法。所以，安装库对应的模块系统即可。
 */
import './stylus/icon.styl';
import './css/base.css';
import './css/common.css';
import './less/button.less';
import './scss/close.scss';
import './stylus/small.styl';
import { renderA, composeA } from './js/a';
import { a } from './common/util';
import { chunk } from 'lodash-es';

console.log(a());

console.log(chunk([1, 2, 3], 2));

renderA('hello world vue');

let oneEl = document.getElementById('one');
let list = composeA();
oneEl.appendChild(list);

$('div').addClass('new'); // 验证npm安装的jquery
jQuery('div').addClass('old'); // 验证本地jquery

$.get('/api/cont_vote_json.jsp', {
  contid: 2605609
}, function (data) {
  console.log(data);
});

if (module.hot) {
  module.hot.accept();
  // 通过删除已有的元素,避免每次热更新都重新多加载一份元素，然后重新加载一份元素
  module.hot.accept('./js/a', function () {
    oneEl.removeChild(list);
    let newList = require('./js/a').composeA();
    oneEl.appendChild(newList);
    list = newList;
  });
}
