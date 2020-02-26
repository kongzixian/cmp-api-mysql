/* 
* @Author: kongzx
* @Date:   2020-02-19 14:23:50
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-26 22:16:55
*/
 
'use strict'
const {auth, resHandler} = require('../myutil')
const redisClient = require('../redis')
const {settings} = require('../../config')

module.exports = (req, res, next) => {
  const headers = req.headers
  const token = headers.token
  if (!token) {
    const errorRes = resHandler.getErrorRes('TOKEN_IS_MISSING')
    res.sendErr(errorRes)
    return
  }
  try {
    // 先使用jwt做简单校验
    auth.verifyToken(headers.token)
    redisClient.exists(token, function(err, ret){
      if( ret === 0 ){
        const errorMsg = 'TOKEN_HAS_EXPIRED'
        const errorRes = resHandler.getErrorRes(errorMsg)
        return res.sendErr(errorRes) 
      }
			//该token有效，重置token过期时间
			redisClient.expire(token, settings.expiresConfig.expiresIn);
			next();
		});
  } catch (error) {
    const errorObj = {
      error_msg: error.message,
      ret_code: 10000,
    }
    const errorRes = resHandler.getCommomErrorRes(errorObj)
    res.sendErr(errorRes)
    // const errorRes = resHandler.getErrorMsg(error)
    // res.sendErr(errorRes)
  }
}


