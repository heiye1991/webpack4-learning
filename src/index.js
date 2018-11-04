/**
 * created by : heiye1991
 * created time: 2018-11-04
 * description:
 */
import base from './css/base.css'
import common from './css/common.css'
import './less/button.less'
import './scss/close.scss'
import './stylus/small.styl'

var app = document.getElementById('app')
app.innerHTML = '<div class="'+ base.box +'"></div>'

/*
// style-loader/useable
common.use()

let flag = true
setInterval(function () {
  if (flag) {
    base.use()
  }  else {
    base.unuse()
  }
  flag = !flag
}, 1000)*/
