'use strict'
module.exports = {
  getSelectSQL: ({
    // 表名
    table,
    // 开始where语句 标识
    addCondition = false,
    // where语句
    condition,
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
  getDeleteSQL: ({
    // 表名
    table,
    // 开始where语句 标识
    addCondition = false,
    // where语句
    condition,
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
      sqlStr += `DELETE FROM  ${ table } WHERE ${ conditionstr }  `
    }else{
      sqlStr += ` DELETE FROM  ${ table } `
    }
    if( !qry_all &&  _limit){
      sqlStr += ` LIMIT ${ start },${ _limit } `
    }
    
    return sqlStr 
  },
  getInsertSQL: ({
    // 表名
    table,
    // 开始where语句 标识
    addCondition = false,
    // where语句
    condition,
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
      sqlStr += `INSERT INTO  ${ table } WHERE ${ conditionstr }  `
    }else{
      sqlStr += ` INSERT INTO  ${ table } `
    }
    if( !qry_all &&  _limit){
      sqlStr += ` LIMIT ${ start },${ _limit } `
    }
    
    return sqlStr 
  },
}
