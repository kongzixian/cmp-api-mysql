/* 
* @Author: kongzx
* @Date:   2020-02-18 00:04:46
* @Last Modified by:   kongzx
* @Last Modified time: 2020-03-01 19:07:04
*/

const express = require('express')
const router = express.Router()
const Controllers = require('../controllers')
const middleware = require('../middlewares')
const middlewaresArr = [middleware.verifyToken, middleware.log]

router.use(middleware.resExtend)
// 登陆
router.post('/login', Controllers.users.login)
// 创建用户
router.post('/users', Controllers.users.create)
router.use(middlewaresArr)
// 注销
router.delete('/logout', Controllers.users.logout)
require('./session')(router)

require('./fileResource')(router)
// 用户
require('./users')(router)
// 话题
require('./topics')(router)
// 评论
require('./comments')(router)


// session(router)
// users(router)
// topics(router)
// comments(router)

module.exports = router