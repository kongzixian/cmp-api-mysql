'use strict'
const mds = require('../models')
const setting = {
  CHAR: true,
  VARCHAR: true,
  TEXT: true,
  DATE: true,
  DATETIME: true,
  TIMESTAMP: true,
  YEAR: true,
  TIME: true,
}
const utils = {
  formatEqualForm: function( params, dbName ){
    let conditionstr = ''
    const md = mds[dbName] || {}
    for( const key in params ){
      if( md[key] && setting[ md[key]['type'] ]  ){
        conditionstr += `${ key }='${ params[key] }',`
      }else{
        conditionstr += `${ key }=${ params[key] },`
      }
    }
    conditionstr = conditionstr.slice(0, -1)
    return conditionstr
  },
  getFieldsAndValus: function( params, dbName ){
    let fields = ''
    let values = ''
    const md = mds[dbName] || {}
    for( const key in params ){
      fields +=`${ key },` 
      if( md[key] && setting[ md[key]['type'] ]  ){
        values += `'${ params[key] }',`
      }else{
        values += `${ params[key] },`
      }
    }
    fields = fields.slice(0, -1)
    values = values.slice(0, -1)
    return {
      fields,
      values
    }
  },
}
module.exports = { 
  // 获取查询语句 ok
  getSelectSQL: ({
    model,
    // 表名
    table,
    // 开始where语句 标识
    addCondition = false,
    // where语句
    condition = {},
    // 分页
    _limit,
    start,
    // 判断是否查询全部标识
    qry_all
  }) => {
    const conditionstr = utils.formatEqualForm(condition, model)
    let sqlStr = ''
    // 判断是否有筛选
    if( addCondition ){
      sqlStr += `SELECT  * FROM ${ table } WHERE ${ conditionstr }  `
    }else{
      sqlStr += ` SELECT  * FROM ${ table } `
    }
    if( !qry_all &&  _limit){
      sqlStr += ` LIMIT ${ start },${ _limit } `
    }

    return sqlStr 
  },
  // 获取删除语句 ok
  getDeleteSQL: ({
    model,
    // 表名
    table,
    // 开始where语句 标识
    addCondition = false,
    // where语句
    condition,
  }) => {
    const conditionstr = utils.formatEqualForm(condition, model)
    let sqlStr = ''
    // 判断是否有筛选
    if( addCondition ){
      sqlStr += `DELETE FROM  ${ table } WHERE ${ conditionstr }  `
    }
    
    return sqlStr 
  },
  // 获取新增语句 待改
  getInsertSQL: ({
    model,
    // 表名
    table,
    // 开始where语句 标识
    addCondition = false,
    // where语句
    condition = {},
  }) => {
    const fieldsAndValus = utils.getFieldsAndValus(condition, model)
    const fields = fieldsAndValus.fields
    const values = fieldsAndValus.values
    let sqlStr = ''
    // 判断是否有筛选
    if( addCondition ){
      sqlStr += `INSERT INTO  ${ table } ( ${ fields } ) values( ${ values } ) `
    }
    
    return sqlStr 
  },
  // 获取更新语句 ok
  getUpdateSQL: ({
    model,
    // 表名
    table,
    // 开始where语句 标识
    addCondition = false,
    // where语句
    condition = {},
    set = {},
  }) => {
    const conditionstr = utils.formatEqualForm(condition, model)
    // get setValue
    const setStr = utils.formatEqualForm(set, model)
    let sqlStr = ''

    // 判断是否有筛选
    if( addCondition ){
      sqlStr += `UPDATE  ${ table } SET ${ setStr } WHERE ${ conditionstr }  `
    }
    return sqlStr 
  },
  
}
