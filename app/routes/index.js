/* 
* @Author: kongzx
* @Date:   2020-02-18 00:04:46
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-20 15:34:15
*/

const express = require('express')
const router = express.Router()
const Controllers = require('../controllers')
const middleware = require('../middlewares')
const middlewaresArr = [middleware.verifyToken, middleware.log]

router.use(middleware.resExtend)
router.post('/login', Controllers.users.login)
router.use(middlewaresArr)
require('./session')(router)

require('./users')(router)
require('./topics')(router)
require('./comments')(router)


// session(router)
// users(router)
// topics(router)
// comments(router)

module.exports = router