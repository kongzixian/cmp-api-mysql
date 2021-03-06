/* 
* @Author: kongzx
* @Date:   2020-02-17 20:52:51
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-28 16:23:20
*/

const db = require('../models/db')
const md5 = require('blueimp-md5')

const {auth, format, resHandler, paramsHandler} = require('../myutil')
/**
 * 获取会话状态
 */
exports.get = (req, res, next) =>{
  const { user } = req.session
  if( !user ){
    return res.status(401).json({
      error: 'Unauthorized'
    })
  }
  res.status(200).json(user)

}

/**
 * 创建会话 用户登陆
 * @type {[type]}
 */
exports.create = async (req, res, next) =>{
  // 接收表单数据
  // 数据数据库处理登陆请求
  // 发送响应
  
  try{
    const body = req.body
    const password = md5( md5( body.password ) ) 
    // const sqlStr = `
    //   SELECT * FROM users WHERE email='${  body.email }' and password='${  body.password }'
    // `
    const sqlStr = `
      SELECT * FROM users WHERE email='${  body.email }'
    `
    const [user] = await db.query( sqlStr )
    if( !user ){
      const errorMsg = 'USER_NOT_EXITS'
      // const errorRes = resHandler.getErrorRes(errorMsg)
      res.sendErr({
        error_msg: errorMsg
      })
    }

    if( user && user.password != password ){
      const errorMsg = 'USER_PASSWORD_WRONG'
      // const errorRes = resHandler.getErrorRes(errorMsg)
      res.sendErr({
        error_msg: errorMsg
      })
    }
    const result = format.user(user)
    result.token = auth.createToken( result.id ) 
    res.sendOk({
      data: result,
      statusCode: 201,
      msg: '登陆成功'
    })
    
    // 发送响应
    // res.status(201).json(user)

  }catch (err){
    next(err)
  }
  
}

/**
 * 注销登陆
 */
exports.destroy = (req, res, next) =>{
  delete req.session.user
  // 发送响应
  res.status(201).json({})

}