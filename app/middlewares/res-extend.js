'use strict'
module.exports = (req, res, next) => {
  res.sendOk = ({
    data,
    statusCode = 200,
    msg = '交易成功',
    count
  }) => {
    const res_body = {
      // 待写
    }
    const res_head = {
      // 信息
      msg: msg,
      // 会计日
      tr_acdt: '20181201',
      // 状态码 代表成功
      ret_code: '0000',
      // 交易日期
      tr_time: '20181201',
      // 交易码
      tr_code: '',
      // 用户
      user: '',
      // 流水号
      serial_no: req.headers.traceId
    }
    const rst = {
      count,
      body: res_body,
      head: res_head,
      // status: statusCode,
      // errorCode: 0,
      data: data
    }
    logger.info(`traceId:${req.headers.traceId}`)
    logger.info(`method: [${req.method}] req-url: ${req.url}`)
    logger.info(`req-query:${JSON.stringify(req.query)}`)
    logger.info(`req-params:${JSON.stringify(req.params)}`)
    if (req.url !== '/user/login') {
      logger.info(`req-body:${JSON.stringify(req.body)}`)
    }
    logger.info(`sendOk:${JSON.stringify(data)}`)
    res.status(statusCode).send(rst)
  }
  res.sendErr = ({
    error_msg,
    ret_code = 10000,
    statusCode = 200
  }) => {
    const body = {
      // 待写
    }
    const head = {
      // 错误信息
      error_msg: error_msg,
      // 会计日
      tr_acdt: '20181201',
      // 状态码
      ret_code: ret_code,
      // 交易日期
      tr_time: '20181201',
      // 交易码
      tr_code: '',
      // 用户
      user: '',
    }
    const errorInfo = {
      body,
      head
    }
    logger.info(`traceId:${req.headers.traceId}`)
    logger.error(`method: [${req.method}] req-url: ${req.url}`)
    logger.error(`req-query:${JSON.stringify(req.query)}`)
    logger.error(`req-params:${JSON.stringify(req.params)}`)
    logger.error(`req-body:${JSON.stringify(req.body)}`)
    logger.error(`sendErr:${JSON.stringify(errorInfo)}`)
    res.status(statusCode).send(errorInfo)
  }
  next()
}
