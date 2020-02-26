'use strict'

const {errorMsg, successMsg, errorSystem} = require('../../config')

module.exports = {
  // 返回字符串 
  getSuccessMsg (succMsg) {
    const successRes = successMsg[succMsg] ? successMsg[succMsg] : successMsg['OPTION_SUCCESS']
    return successRes
  },
  // 返回对象 获取错误返回体( 系统错误 )
  getErrorMsg (error) {
    const errorMessage = error.message ? error.message : 'serverError'
    const finalError = errorSystem[errorMessage] ? errorSystem[errorMessage] : 'SERVER_ERROR'
    const result = errorMsg[finalError]
    return result
  },
  // 返回对象 获取错误返回体 ( 一般错误 )
  getErrorRes (error) {
    const result = errorMsg[error] ? errorMsg[error] : errorMsg['SERVER_ERROR']
    return result
  },
  // 返回字符串 
  getModelError (model) {
    const result = errorSystem[model] ? errorSystem[model] : 'SERVER_ERROR'
    return result
  },
  // 通用返回错误体
  getCommomErrorRes ( errorObj ) {
    const body = {
      // 待写
    }
    const head = {
      // 错误信息
      error_msg: errorObj.error_msg,
      // 会计日
      tr_acdt: '20181201',
      // 状态码
      ret_code: errorObj.ret_code,
      // 交易日期
      tr_time: '20181201',
      // 交易码
      tr_code: '',
      // 用户
      user: '',
    }
    const result = {
      body,
      head
    }
    return result
  },
  
}
