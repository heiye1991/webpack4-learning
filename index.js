/**
 * created by : heiye1991
 * created time: 2018-11-02
 * description: es6 语法
 */
import '@babel/polyfill' // 在这里可以设置全局的@babel/polyfill

let func = () => {}
const Num = 10
let arr = [1, 2, 3]
arr.includes(2)
let arr2 = arr.map(item => item * 2)
console.log(new Set(arr2))

