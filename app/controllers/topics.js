/* 
* @Author: kongzx
* @Date:   2020-02-17 20:52:51
* @Last Modified by:   kongzx
* @Last Modified time: 2020-03-10 08:49:14
*/

const moment = require('moment')
const Services = require('../services')
const {auth, resHandler, paramsHandler} = require('../myutil')
const {pageConfig, settings} = require('../../config')

class TopicsController {

  /**
   * 新增话题
   */
  async create (req, res) {
    try {
      const body = req.body
      const userInfo = auth.verifyToken(req.headers.token)
      body.user_id = userInfo.userId
      const result = await Services.topics.create( body )
      res.sendOk({
        data: result,
        statusCode: 201,
        msg: '话题创建成功'
      })
    } catch (error) {
      res.sendErr({
        error_msg: error
      })
    }
  }

  /**
   * 删除话题
   */
  async destroy (req, res) {
    try {
      const params = req.params
      await Services.topics.destroy(params.id)
      res.sendOk({
        data: {},
        statusCode: 201,
        msg: '删除话题成功'
      })
    } catch (error) {
      res.sendErr({
        error_msg: error
      })
    }
  }

  /**
   * 话题更新
   */ 
  async update (req, res ) {
    try {
      const body = req.body
      body.id = req.params.id
      // 更新话题
      await Services.topics.update( body );
      // 查询最新数据 
      const result = await Services.topics.detail( body.id )
      res.sendOk({
        data: result,
        statusCode: 201,
        msg: '用户话题成功'
      })
    } catch (error) {
      res.sendErr({
        error_msg: error
      })
    }
  }

  /**
   * 查询话题列表
   */
  async list (req, res) { 
    try{
      req.query._limit = req.query_limit || req.query.rows
      req.query._page = req.query._page || req.query.page
      // if( req.query._limit == 10){
      //   req.query.qry_all = true
      //   console.log('req', req.query.qry_all)
      // }
      const offset = paramsHandler.offsetFormat(req.query, pageConfig.article)
      let queryObj = {
        // condition: req.query,
        condition: {},
        addCondition: false,
        _limit: offset._limit,
        start: offset.start,
        qry_all: req.query.qry_all
      }
      if( req.query.title ){
        queryObj.condition.title = req.query.title
        queryObj.addCondition = true
      }
      console.log(queryObj)

      const userList = await Services.topics.getList(queryObj)

      res.sendOk({
        data: userList.list,
        statusCode: 201,
        msg: '话题查询成功',
        count: userList.count
      })

    }catch( error ){
      res.sendErr({
        error_msg: error
      })
    }
  }

  /**
   * 话题信息
   */
  async detail (req, res) {
    try {
      const result = await Services.topics.detail(req.params.id)
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
  
}
module.exports = new TopicsController()

