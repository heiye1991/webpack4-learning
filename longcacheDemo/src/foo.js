/**
 * created by : heiye1991
 * created time: 2018-11-08
 * description:
 */
import react from 'react'
import module from './module'

import(/* webpackChunkName: 'async' */'./async').then(function (res) {
  console.log(res)
})

console.log('default')
console.log('hash')
console.log('chunkhash')
console.log('manifest')
console.log('manifest test')
console.log('NamedChunksPlugin test')
console.log('NamedModulesPlugin test')
