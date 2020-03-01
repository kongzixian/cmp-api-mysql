
'use strict'
const controllers = {}
controllers.users = require('./users')
controllers.session = require('./session')
controllers.comments = require('./comments')
controllers.topics = require('./topics')
// 文件处理
controllers.fileResource = require('./fileResource')

module.exports = controllers
