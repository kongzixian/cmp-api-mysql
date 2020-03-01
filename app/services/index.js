'use strict'
const Services = {}

Services.users = require('./users')
Services.topics = require('./topics')
// 文件处理
Services.fileResource = require('./fileResource')
// Services.category = require('./category')
// Services.article = require('./article')

module.exports = Services
