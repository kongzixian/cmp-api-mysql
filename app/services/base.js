'use strict'
const db = require('../models/db')
const {sqlHandler} = require('../myutil')
class BaseService {
  constructor (table) {
    // this.model = model
    this.table = table
    this.adventures = null // 相当于select,选择返回的属性
    this.commonErrorMsg = 'USERLIST_FIND_FAILED'
  }
  // kong 已完成
  async findOne (params) {
    try {
      let condition = ''
      for( const key in params ){
        condition += `${ key }='${ params[key] }',`
      }
      condition = condition.slice(0, -1)
      const sqlStr = `
        SELECT  * FROM ${ this.table } WHERE ${condition} 
      `
      const [result] = await db.query(sqlStr)
      return result
    } catch (error) {
      throw this.commonErrorMsg
    }
  }
  async findById (id) {
    try {
      const result = await mdb[this.model].findById(id, {lean: true})
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
      let condition = ''
      for( const key in params.condition ){
        condition += `${ key }=${ params.condition[key] },`
      }
      condition = condition.slice(0, -1)

      let sqlStr
      if( !params.qry_all ){
        sqlStr= `
          SELECT * FROM ${ this.table } LIMIT ${ params.start },${ +params._limit } 
        `
      }else{
        sqlStr = `
          SELECT * FROM ${ this.table }  
        `
      }

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
    // const query = mdb[this.model].findOne({name: name}, this.adventures, {blen: true})
    // if (this.model === 'User') {
    //   query.select('-password')
    // }
    const [result] = await db.query( sqlStr )
    return result
  }
}

module.exports = BaseService
