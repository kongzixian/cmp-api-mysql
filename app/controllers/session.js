/* 
* @Author: kongzx
* @Date:   2020-02-17 20:52:51
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-20 12:16:57
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
      const errorRes = resHandler.getErrorRes(errorMsg)
      res.sendErr(errorRes)
    }

    if( user && user.password != password ){
      const errorMsg = 'USER_PASSWORD_WRONG'
      const errorRes = resHandler.getErrorRes(errorMsg)
      res.sendErr(errorRes)
    }
    const result = format.user(user)
    console.log(result)
    result.token = auth.createToken( result.id ) 
    req.headers.token = result.token
    req.kong = result
    res.sendOk(result, 201)
    
    // 发送响应
    // res.status(201).json(user)

  }catch (err){
    next(err)
  }
  
}

/**
 * 注销登陆
 */
exports.destory = (req, res, next) =>{
  delete req.session.user
  // 发送响应
  res.status(201).json({})

}