/* 
* @Author: kongzx
* @Date:   2020-02-17 20:52:51
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-25 23:06:20
*/

const md5 = require('blueimp-md5')
const moment = require('moment')
const db = require('../models/db')
const {auth, format, resHandler, paramsHandler} = require('../myutil')

exports.list = (req, res, next) =>{

}

/**
 * 创建会话 用户登陆
 * @type {[type]}
 */
exports.login = async (req, res, next) =>{
  // 接收表单数据
  // 数据数据库处理登陆请求
  // 发送响应
  try{
    const body = req.body
    const password = md5( md5( body.password ) ) 
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
    result.token = await auth.createToken( result.id ) 
    res.sendOk(result, 201)
    
    // 发送响应
    // res.status(201).json(user)
  }catch (err){
    next(err)
  }
}

exports.logout = async (req, res, next) =>{
  try{
    const body = req.body
    const userInfo = await auth.clearToken(req.headers.token)
    res.sendOk({}, 201)
  }catch( err ){
    next(err)
  }
}


/**
 * 创建用户
 * @type {[type]}
 */
exports.create = async (req, res, next) =>{
  const body = req.body
  const sqlStr = `
        INSERT INTO users (username, password, email, nickname, avatar, gender, creat_time, modify_time) VALUES(
          '${ body.email }', 
          '${ md5(md5(body.password)) }', 
          '${ body.email }',  
          '${ body.nickname }',
          'default-avatar.png',
          0,
          '${ moment().format('YYYY-MM-DD hh:mm:ss') }',
          '${ moment().format('YYYY-MM-DD hh:mm:ss') }'
          )
        `
    // const ret = await db.query('SELECT 1 + 1 as solution')
    // 我们把容易出错的代码放到try-catch 代码块中
    // try中的代码一旦出错，会立即进入catch 代码块
    try{
      const ret = await db.query(sqlStr)
      if( !ret ){
        return res.status(400).json({
          error: 'Email already exists'
        })
      }
      const [users] = await db.query(`SELECT * FROM users WHERE id='${ ret.insertId }'`)
      res.status(201).json(users)
    }catch( err){
      // 中间件统一处理
      next(err)
    }
    
}

exports.update = (req, res, next) =>{

}

exports.destory = (req, res, next) =>{

}