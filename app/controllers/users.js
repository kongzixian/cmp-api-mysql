/* 
* @Author: kongzx
* @Date:   2020-02-17 20:52:51
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-27 17:27:42
*/

const md5 = require('blueimp-md5')
const moment = require('moment')
const db = require('../models/db')

const Services = require('../services')

const {auth, format, resHandler, paramsHandler} = require('../myutil')
const {pageConfig, settings} = require('../../config')

/**
 * 获取用户列表
 * @type {[type]}
 */
exports.list = async (req, res, next) =>{ 
  try{
    const offset = paramsHandler.offsetFormat(req.query, pageConfig.article)
    const queryObj = {
      condition: req.query,
      addCondition: false,
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

  }catch( error ){
    const errorRes = resHandler.getCommomErrorRes(error)
    res.sendErr(errorRes)
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
    result.token = await auth.createToken(result.id)
    res.sendOk({
      data: result,
      statusCode: 201,
      msg: '登陆成功'
    })
  } catch (error) {
    console.log('error', error)
    const errorRes = resHandler.getCommomErrorRes(error)
    res.sendErr(errorRes)
  }
}

/**
 * 注销
 * @type {[type]}
 */
exports.logout = async (req, res, next) =>{
  try{
    const body = req.body
    await auth.clearToken(req.headers.token)
    res.sendOk({
      data: {},
      statusCode: 201,
      msg: '注销成功'
    })
  }catch( error ){
    const errorRes = resHandler.getCommomErrorRes(error)
    res.sendErr(errorRes)
  }
}

/**
 * 创建用户
 * @type {[type]}
 */
// exports.create = async (req, res, next) =>{
//   const body = req.body
//   const sqlStr = `
//         INSERT INTO users (username, password, email, nickname, avatar, gender, creat_time, modify_time) VALUES(
//           '${ body.email }', 
//           '${ md5(md5(body.password)) }', 
//           '${ body.email }',  
//           '${ body.nickname }',
//           'default-avatar.png',
//           0,
//           '${ moment().format('YYYY-MM-DD hh:mm:ss') }',
//           '${ moment().format('YYYY-MM-DD hh:mm:ss') }'
//           )
//         `
//     // const ret = await db.query('SELECT 1 + 1 as solution')
//     // 我们把容易出错的代码放到try-catch 代码块中
//     // try中的代码一旦出错，会立即进入catch 代码块
//     try{
//       const ret = await db.query(sqlStr)
//       if( !ret ){
//         return res.status(400).json({
//           error: 'Email already exists'
//         })
//       }
//       const [users] = await db.query(`SELECT * FROM users WHERE id='${ ret.insertId }'`)
//       res.sendOk({
//         data: users,
//         statusCode: 201,
//         msg: '用户创建成功'
//       })
//     }catch( err){
//       // 中间件统一处理
//       next(err)
//     }
// }

exports.create = async (req, res, next) =>{
  try {
    const body = req.body
    const data = {
      username: body.username ,
      password: body.password ,
      email: body.email ,
      nickname: body.nickname ,
      avatar: body.avatar ,
      gender: body.gender ,
      creat_time: body.creat_time ,
      modify_time: body. modify_time
    }
    const result = await Services.users.addUser( data )
    res.sendOk({
      data: result,
      statusCode: 201,
      msg: '用户创建成功'
    })
  } catch (error) {
    const errorRes = resHandler.getCommomErrorRes(error)
    res.sendErr(errorRes)
  }
}

exports.update = (req, res, next) =>{

}

/**
 * 删除用户
 * @type {[type]}
 */
// kong 已完成
exports.destroy = async (req, res, next) =>{
  try {
    const params = req.params
    await Services.users.destroy(params.id)
    await auth.clearToken(req.headers.token)
    res.sendOk({
      data: {},
      statusCode: 201,
      msg: '删除用户成功'
    })
  } catch (error) {
    const errorRes = resHandler.getCommomErrorRes(error)
    res.sendErr(errorRes)
  }
}