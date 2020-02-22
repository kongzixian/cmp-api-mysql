'use strict'
module.exports = {
  // offsetFormat: (params, defaultLimt) => {
  //   let result = {}
  //   const pagesize = (params.pagesize !== undefined) ? parseInt(params.pagesize) : parseInt(defaultLimt)
  //   const currentPage = (params.page !== undefined) ? params.page : 1
  //   const sortRule = (params.sortRule !== undefined) ? parseInt(params.sortRule) : parseInt(-1)
  //   result.skipCount = (currentPage - 1) * pagesize
  //   result.pagesize = pagesize
  //   result.sortRule = sortRule
  //   return result
  // }
  offsetFormat: (params, defaultLimt) => {
    let result = {}
    const _limit = (params._limit !== undefined) ? parseInt(params._limit) : parseInt(defaultLimt)
    const _page = (params.page !== undefined) ? params.page : 1
    const sortRule = (params.sortRule !== undefined) ? parseInt(params.sortRule) : parseInt(-1)
    // start
    // 1 0 ,  20
    // 2 20 , 20
    // 1 40 , 20
    // (_page - 1) * _limit , _limit
    result.start = (_page - 1) * _limit
    result._limit = _limit
    result.sortRule = sortRule
    return result
  }
}
