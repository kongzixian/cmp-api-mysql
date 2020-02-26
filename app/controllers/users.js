/* 
* @Author: kongzx
* @Date:   2020-02-17 20:52:51
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-26 22:32:11
*/

const md5 = require('blueimp-md5')
const moment = require('moment')
const db = require('../models/db')

const Services = require('../services')

const {auth, format, resHandler, paramsHandler} = require('../myutil')
const {pageConfig, settings} = require('../../config')

exports.list = async (req, res, next) =>{ 
  try{
    const offset = paramsHandler.offsetFormat(req.query, pageConfig.article)
    const queryObj = {
      condition: req.query,
      _page: offset._page,
      _limit: offset._limit,
      start: offset.start
    }

    const userList = await Services.users.getUserList(queryObj)
    userList.list = userList.list.map(data => {
      return format.user(data)
    })

    res.sendOk({
      data: userList.list,
      statusCode: 201,
      msg: '用户查询成功',
      count: userList.count
    })
  }catch( err ){
    next(err)
  }
}

/**
 * 创建会话 用户登陆
 * @type {[type]}
 */
exports.login = async (req, res, next) =>{
  // 接收表单数据
  // 数据数据库处理登陆请求
  // 发送响应
  try {
    const result = await Services.users.login(req.body)
    result.token = auth.createToken(result.id)
    res.sendOk({
      data: result,
      statusCode: 201,
      msg: '登陆成功'
    })
  } catch (error) {
    const errorObj = {
      error_msg: error,
      ret_code: 10000,
    }
    const errorRes = resHandler.getCommomErrorRes(errorObj)
    res.sendErr(errorRes)
  }
  // try{
  //   const body = req.body
  //   const password = md5( md5( body.password ) ) 
  //   const sqlStr = `
  //     SELECT * FROM users WHERE email='${  body.email }'
  //   `
  //   const [user] = await db.query( sqlStr )
  //   if( !user ){
  //     const errorMsg = 'USER_NOT_EXITS'
  //     const errorRes = resHandler.getErrorRes(errorMsg)
  //     res.sendErr(errorRes)
  //   }

  //   if( user && user.password != password ){
  //     const errorMsg = 'USER_PASSWORD_WRONG'
  //     const errorRes = resHandler.getErrorRes(errorMsg)
  //     res.sendErr(errorRes)
  //   }
  //   const result = format.user(user)
  //   result.token = await auth.createToken( result.id ) 
  //   res.sendOk({
  //     data: result,
  //     statusCode: 201,
  //     msg: '登陆成功'
  //   })
    
  //   // 发送响应
  //   // res.status(201).json(user)
  // }catch (err){
  //   next(err)
  // }
}

exports.logout = async (req, res, next) =>{
  try{
    const body = req.body
    const userInfo = await auth.clearToken(req.headers.token)
    res.sendOk({
      data: {},
      statusCode: 201,
      msg: '注销成功'
    })
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
      res.sendOk({
        data: users,
        statusCode: 201,
        msg: '用户创建成功'
      })
    }catch( err){
      // 中间件统一处理
      next(err)
    }
    
}

exports.update = (req, res, next) =>{

}

/**
 * 删除用户
 * @type {[type]}
 */
exports.destory = async (req, res, next) =>{
  try{
    const params = req.params
    const sqlStr = `
      DELETE FROM users WHERE id=${ params.id }
    `

    const ret = await db.query(sqlStr)
    if( !ret ){
      return res.status(400).json({
        error: 'delete failed'
      })
    }
    res.sendOk({
      data: {},
      statusCode: 200,
      msg: '用户删除成功'
    })
  }catch( err ){

  }
}