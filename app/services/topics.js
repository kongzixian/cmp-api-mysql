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
          id: id
        },
      })
      const result = await db.query(sqlStr)
    } catch (error) {
      throw error
    }
  }

  /**
   * 话题更新
   */
  async update (params) {
    try {
      await super.findById(params.id)
      // 获取刷新语句sql
      const sqlStr = sqlHandler.getUpdateSQL({
        model: this.model,
        table: this.table,
        addCondition: true,
        set: params,
        condition: {
          id: params.id
        },
      })
      await db.query(sqlStr)
      const [user] = await db.query(`SELECT * FROM users WHERE id='${ params.id }'`)
      return format.user(user)
      return result
    } catch (error) {
      const errorMsg = 'TOPIC_UPDATE_FAILED'
      throw errorMsg
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
      const findRes = await super.findById(params)
      const result = format.user(findRes)
      return result
    } catch (error) {
      const errorMsg = 'TOPIC_NOT_EXITS'
      throw errorMsg
    }
  }

}

module.exports = new UserService('topics', 'Topic')
