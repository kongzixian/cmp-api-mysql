/* 
* @Author: kongzx
* @Date:   2020-02-19 14:23:50
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-19 22:12:05
*/

'use strict'
const middleware = {}

middleware.resExtend = require('./res-extend')
middleware.verifyToken = require('./verify-token')
// middleware.notFind = require('./not-find')
middleware.log = require('./log.js')

module.exports = middleware

