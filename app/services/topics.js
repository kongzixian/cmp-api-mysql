'use strict'
const BaseService = require('./base')
const db = require('../models/db')
const {crypto, format, resHandler, sqlHandler} = require('../myutil')
const md5 = require('blueimp-md5')
const {settings} = require('../../config')
const moment = require('moment')
class UserService extends BaseService {
  constructor (table, model) {
    super(table, model)
    this.table = table
    this.model = model
  }

  /**
   * 新增话题
   */
  async create (data) {
    try {
      const sqlStr = sqlHandler.getInsertSQL({
        model: this.model,
        table: this.table,
        addCondition: true,
        condition: {
          title: data.title,
          content: data.content,
          user_id: data.user_id,
          create_time: moment().format('YYYY-MM-DD hh:mm:ss'),
          modify_time: moment().format('YYYY-MM-DD hh:mm:ss')
        },
      })
      const ret = await db.query(sqlStr)
      if( !ret ){
        const errorMsg = '话题新增失败'
        throw errorMsg
      }
      const [ query_ret ] = await db.query(`SELECT * FROM ${ this.table } WHERE id='${ ret.insertId }'`)
      return query_ret
    } catch (error) {
      throw error
    }
  }

  /**
   * 删除话题
   */
  async destroy (id) {
    try {
      const findRes = await super.findById(id)
      if (!findRes) {
        const errorMsg = 'TOPIC_NOT_EXITS'
        throw errorMsg
      }
      // 获取删除语句sql
      const sqlStr = sqlHandler.getDeleteSQL({
        model: this.model,
        table: this.table,
        addCondition: true,
        condition: {
          id: id,
        },
      })
      const result = await db.query(sqlStr)
      // 判断是否删除成功 预测是看 affectedRows 等于0 为失败 有待确认
      if ( !sqlHandler.deleteOrUpdateRet(result) ) {
        const errorMsg = 'TOPIC_DELECT_FAILED'
        throw errorMsg
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * 话题更新
   */
  async update (params) {
    try {
      // await super.findById(params.id)
      const findRes = await super.findById(params.id)
      if (!findRes) {
        const errorMsg = 'TOPIC_NOT_EXITS'
        throw errorMsg
      }
      const setArr = ['title', 'content']
      let setParams = sqlHandler.getSqlSetParams({
        params: params,
        setArr: setArr
      })
      setParams.modify_time = moment().format('YYYY-MM-DD hh:mm:ss')
      // 获取刷新语句sql
      const sqlStr = sqlHandler.getUpdateSQL({
        model: this.model,
        table: this.table,
        addCondition: true,
        set: setParams,
        condition: {
          id: params.id,
        },
      })
      const result = await db.query(sqlStr)
      // 判断是否更新成功 预测是看 affectedRows 等于0 为失败 有待确认
      if ( !sqlHandler.deleteOrUpdateRet(result) ) {
        const errorMsg = 'TOPIC_UPDATE_FAILED'
        throw errorMsg
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * 查询话题列表
   */
  async getList (params) {
    try {
      const result = super.list(params)
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * 话题信息
   */
  async detail (params) {
    try {
      const result = await super.findById(params)
      return result
    } catch (error) {
      const errorMsg = 'TOPIC_NOT_EXITS'
      throw errorMsg
    }
  }

}

module.exports = new UserService('topics', 'Topic')
