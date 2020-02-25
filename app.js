/* 
* @Author: kongzx
* @Date:   2020-02-17 20:52:51 
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-25 14:36:16
*/

const express = require('express')
const path = require('path')
const app = express()
const router = require('./app/routes')
const bodyParser = require('body-parser')
// const session = require('express-session')
const log4js = require('log4js') 
const cors = require('cors')
const {logConfig, settings} = require('./config')

const redis = require('redis')

// 日志配置
log4js.configure(logConfig)
const logger = log4js.getLogger()
global.logger = logger


// 配置静态文件
app.use(express.static(path.join(__dirname, 'app/public')))
// 配置apidoc
app.use('/apidoc', express.static(path.join(__dirname, 'app/public/apidoc/')))

// 请求体解析表单请求体 中间件
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// 配置使用sesiion 中间件 现在已经改用 token
// app.use(session({
//   secret: 'kongzixian',
//   resave: false,
//   saveUninitialized: false
// }))

// var client = redis.createClient(settings.redisConfig.port, settings.redisConfig.host)
// client.auth( settings.redisConfig.PASSWORD );
// const client = redis.createClient(settings.redisConfig)
// client.on("error", function(err) {
//   console.log( err );
// });
 
// 跨域配置
app.use(cors())

// 把路由应用到app中
app.use(router)

// 中间件统一处理异常
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message
  })
})

app.listen(settings.port, () => {
  console.log(`APP is running at port ${settings.port}...`)
  console.log(`Please visit http://127.0.0.1:${settings.port}/`)
})
logger.info(`start:port is ${settings.port}`)
