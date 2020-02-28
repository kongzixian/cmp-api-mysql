/* 
* @Author: kongzx
* @Date:   2020-02-17 20:52:51
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-28 16:24:25
*/

const Services = require('../services')
const {auth, format, resHandler, paramsHandler} = require('../myutil')
const {pageConfig, settings} = require('../../config')

/**
 * 查询用户列表
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
    res.sendErr({
      error_msg: error
    })
  }
}

/**
 * 查询指定用户
 */
exports.detail = async (req, res, next) =>{
  try {
    const result = await Services.users.detail(req.params.id)
    res.sendOk({
      data: result,
      statusCode: 201,
      msg: '查询成功'
    })
  } catch (error) {
    res.sendErr({
      error_msg: error
    })
  }
}

/**
 * 创建会话 用户登陆
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
    res.sendErr({
      error_msg: error
    })
  }
}

/**
 * 注销
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
    res.sendErr({
      error_msg: error
    })
  }
}

/**
 * 创建用户
 */
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
    res.sendErr({
      error_msg: error
    })
  }
}

/**
 * 更新用户信息
 */
exports.update = async (req, res, next) =>{
  try {
    const params = req.body
    params.id = req.params.id
    const result = await Services.users.update(req.body)
    res.sendOk({
      data: result,
      statusCode: 201,
      msg: '用户更新成功'
    })
  } catch (error) {
    res.sendErr({
      error_msg: error
    })
  }
}

/**
 * 删除用户
 */
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
    res.sendErr({
      error_msg: error
    })
  }
}