'use strict'
const db = require('../models/db')
const {sqlHandler} = require('../myutil')
class BaseService {
  constructor (table, model) {
    this.model = model
    this.table = table
    this.adventures = null // 相当于select,选择返回的属性
    this.commonErrorMsg = `${ table }LIST_FIND_FAILED`
  }
  // kong 已完成
  async findOne (params) {
    try {
      // 获取查询语句sql
      const sqlStr = sqlHandler.getSelectSQL({
        model: this.model,
        table: this.table,
        addCondition: true,
        condition: params,
      })
      const [result] = await db.query(sqlStr)
      return result
    } catch (error) {
      throw this.commonErrorMsg
    }
  }
  // kong 已完成
  async findById (id) {
    try {
      // 获取查询语句sql
      const sqlStr = sqlHandler.getSelectSQL({
        model: this.model,
        table: this.table,
        addCondition: true,
        condition: {
          id: id,
        },
      })
      const [result] = await db.query(sqlStr)
      return result
    } catch (error) {
      throw this.commonErrorMsg
    }
  }
  async save (params) {
    try {
      const result = await mdb[this.model].create(params)
      return result
    } catch (error) {
      throw this.commonErrorMsg
    }
  }
  async updateById (id, params) {
    try {
      const result = await mdb[this.model].update({_id: id}, {$set: params})
      return result
    } catch (error) {
      throw this.commonErrorMsg
    }
  }
  // kong 已完成
  async list (params) {
    try {
      // 获取查询语句sql
      const sqlStr = sqlHandler.getSelectSQL({
        model: this.model,
        table: this.table,
        addCondition: params.addCondition,
        condition: params.condition,
        start: params.start,
        _limit: params._limit
      })

      const dataCount = await db.query( ` SELECT count(*) FROM ${ this.table } ` )
      const count = dataCount[0] &&  dataCount[0]['count(*)']
      const list = await db.query(sqlStr)
      return {
        count: count,
        list: list
      }
    } catch (error) {
      throw this.commonErrorMsg
    }
  }
  // kong 已完成
  async getUserByName (name) {
    const sqlStr = `
      SELECT  * FROM ${ this.table } WHERE email='${ name }'
    `
    const [result] = await db.query( sqlStr )
    return result
  }
}

module.exports = BaseService
