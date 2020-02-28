/* 
* @Author: kongzx
* @Date:   2020-02-19 14:23:50
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-28 16:40:31
*/
 
'use strict'
const {auth, resHandler} = require('../myutil')
const redisClient = require('../redis')
const {settings} = require('../../config')

const errorObj = {
  'TOKEN_IS_MISSING': 'token缺失',
  'invalid signature': 'token无效',
  'TOKEN_HAS_EXPIRED': 'token已经过期',
}

module.exports = (req, res, next) => {
  const headers = req.headers
  const token = headers.token
  if (!token) {
    res.sendErr({
      error_msg: errorObj['TOKEN_IS_MISSING']
    })
    return
  }
  try {
    // 先使用jwt做简单校验
    auth.verifyToken(headers.token)
    redisClient.exists(token, function(err, ret){
      if( ret === 0 ){
        return res.sendErr({
          error_msg: errorObj['TOKEN_HAS_EXPIRED']
        }) 
      }
			//该token有效，重置token过期时间
			redisClient.expire(token, settings.expiresConfig.expiresIn);
			next();
		});
  } catch (error) {
    res.sendErr({
      error_msg: errorObj[ error.message ] || error.message ,
    })
  }
}


