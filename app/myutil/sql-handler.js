'use strict'
module.exports = {
  getSelectSQL: ({
    table,
    condition,
    _limit,
    start,
    qry_all
  }) => {
    let conditionstr = ''
    let sqlStr = ''
    for( const key in condition ){
      conditionstr += `${ key }='${ condition[key] }',`
    }
    conditionstr = conditionstr.slice(0, -1)
    if( !qry_all && !start && !_limit){
      sqlStr= `
        SELECT * FROM ${ this.table } LIMIT ${ start },${ _limit } 
      `
    }else{
      const sqlStr = `
        SELECT  * FROM ${ table } WHERE ${ conditionstr } 
    }
    
    return sqlStr 
  }
}
