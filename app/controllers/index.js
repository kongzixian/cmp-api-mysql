
'use strict'
const controllers = {}
controllers.users = require('./users')
controllers.session = require('./session')
controllers.comments = require('./comments')
controllers.topics = require('./topics')

module.exports = controllers
