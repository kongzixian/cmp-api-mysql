'use strict'
module.exports = {
  // 获取查询语句
  getSelectSQL: ({
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
    let conditionstr = ''
    let sqlStr = ''
    for( const key in condition ){
      conditionstr += `${ key }='${ condition[key] }',`
    }
    conditionstr = conditionstr.slice(0, -1)
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
  // 获取删除语句
  getDeleteSQL: ({
    // 表名
    table,
    // 开始where语句 标识
    addCondition = false,
    // where语句
    condition,
  }) => {
    let conditionstr = ''
    let sqlStr = ''
    for( const key in condition ){
      conditionstr += `${ key }='${ condition[key] }',`
    }
    conditionstr = conditionstr.slice(0, -1)
    // 判断是否有筛选
    if( addCondition ){
      sqlStr += `DELETE FROM  ${ table } WHERE ${ conditionstr }  `
    }else{
      sqlStr += ` DELETE FROM  ${ table } `
    }
    if( !qry_all &&  _limit){
      sqlStr += ` LIMIT ${ start },${ _limit } `
    }
    
    return sqlStr 
  },
  // 获取新增语句 待改
  getInsertSQL: ({
    // 表名
    table,
    // 开始where语句 标识
    addCondition = false,
    // where语句
    condition = {},
  }) => {
    let conditionstr = ''
    let sqlStr = ''
    for( const key in condition ){
      conditionstr += `${ key }='${ condition[key] }',`
    }
    conditionstr = conditionstr.slice(0, -1)
    // 判断是否有筛选
    if( addCondition ){
      sqlStr += `INSERT INTO  ${ table } WHERE ${ conditionstr }  `
    }else{
      sqlStr += ` INSERT INTO  ${ table } `
    }
    if( !qry_all &&  _limit){
      sqlStr += ` LIMIT ${ start },${ _limit } `
    }
    
    return sqlStr 
  },
  getUpdateSQL: ({
    // 表名
    table,
    // 开始where语句 标识
    addCondition = false,
    // where语句
    condition = {},
    set = {},
  }) => {
    let conditionstr = ''
    let sqlStr = ''
    for( const key in condition ){
      conditionstr += `${ key }='${ condition[key] }',`
    }
    conditionstr = conditionstr.slice(0, -1)
    // get setValue
    let setStr = '';
    for( const key in set ){
      if( key !== 'id'){
        setStr += `${ key }='${ set[key] }',`
      }
    }
    setStr = setStr.slice(0, -1)

    // 判断是否有筛选
    if( addCondition ){
      sqlStr += `UPDATE  ${ table } SET ${ setStr } WHERE ${ conditionstr }  `
    }
    return sqlStr 
  },
}
