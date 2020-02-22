/* 
* @Author: kongzx
* @Date:   2020-02-19 14:23:50
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-20 00:44:30
*/
 
'use strict'
const {auth, resHandler} = require('../myutil')

module.exports = (req, res, next) => {
  const headers = req.headers
  if (!headers.token) {
    const errorRes = resHandler.getErrorRes('TOKEN_IS_MISSING')
    res.sendErr(errorRes)
    return
  }
  try {
    auth.verifyToken(headers.token)
    next()
  } catch (error) {
    const errorRes = resHandler.getErrorMsg(error)
    res.sendErr(errorRes)
  }
}


