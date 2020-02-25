'use strict'

module.exports = {
  // 密码盐
  saltKey: 'express_frame',
  // jwt实现token认证的secret
  jwtSecret: 'express_jwt',
  port: process.env.PORT || 1315,
  website: '127.0.0.1:4000',
  // mongodb数据库配置
  dbConfig: {
    URL: 'mongodb://127.0.0.1:27017/express-blog',
    DB: 'express-blog',
    HOST: '127.0.0.1',
    PORT: 27017,
    USERNAME: 'morehao',
    PASSWORD: 'morehao'
  },
  mongooseDebug: false,
  adminConfig: {
    name: 'admin',
    password: '123456',
    role: 'ordinary users'
  },
  qiniuConfig: {
    accessKey: '',
    secretKey: '',
    bucket: 'express-blog',
    originUrl: ''
  },
  upload: {
    savePath: 'app/public/upload',
    showPath: '/upload/'
  },
  // redis数据库配置
  redisConfig: {
    HOST: "127.0.0.1",
    PORT: 6379,
    PASSWORD: '123456'
  },
  expiresConfig: {
    expiresIn: 3600 * 24
  }
}
