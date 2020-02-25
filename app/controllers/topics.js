/* 
* @Author: kongzx
* @Date:   2020-02-17 20:52:51
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-25 22:38:18
*/
const moment = require('moment')
const db = require('../models/db')
const {auth, resHandler, paramsHandler, validator, upload} = require('../myutil')
const {pageConfig, settings} = require('../../config')

/**
 * 分页话题列表
 * @type {[type]}
 */
exports.list = async (req, res, next) =>{ 
  try{
    const offset = paramsHandler.offsetFormat(req.query, pageConfig.article)
    const queryObj = {
      _page: offset._page,
      _limit: offset._limit,
      start: offset.start
    }
    let sqlStr
    if( !req.query.qry_all ){
      sqlStr= `
        SELECT * FROM topics LIMIT ${ queryObj.start },${ +queryObj._limit } 
      `
    }else{
      sqlStr = `
        SELECT * FROM topics 
      `
    }
    const topics = await db.query(sqlStr)
    res.sendOk(topics)
  }catch( err ){
    next(err)
  }
}

/**
 * 创建话题
 * @type {[type]}
 */
exports.create = async (req, res, next) =>{
  try{
    const body = req.body
    const userInfo = auth.verifyToken(req.headers.token)
    body.user_id = userInfo.userId
    body.create_time = moment().format('YYYY-MM-DD hh:mm:ss')
    body.modify_time = moment().format('YYYY-MM-DD hh:mm:ss')
    const sqlStr = `
      INSERT INTO topics(title, content, user_id, create_time, modify_time)
      VALUES (
        '${ body.title }',
        '${ body.content }',
        '${ body.user_id }',
        '${ body.create_time }',
        '${ body.modify_time }'
      )
    `
    const ret = await db.query(sqlStr)
    const [ topics ] = await db.query(`SELECT * FROM topics WHERE id='${ ret.insertId }'`)
    res.sendOk(topics, 201)
  }catch( err ){
    next(err)
  }
}

exports.update = (req, res, next) =>{
  
}

exports.destory = (req, res, next) =>{
  
}

