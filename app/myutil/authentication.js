'use strict'
const jwt = require('jsonwebtoken')
const {settings} = require('../../config')
const redisClient = require('../redis')

module.exports = {
  async createToken (uuid) {
    const expiresIn =  settings.expiresConfig.expiresIn
    const token = jwt.sign(
      {userId: uuid},
      settings.jwtSecret,
      // {expiresIn: expiresIn}
    )
    const redistoken = await redisClient.set(token, token)
    redisClient.expire(token, expiresIn)
    return token
  },
  verifyToken (token) {
    const result = jwt.verify(token, settings.jwtSecret)
    return result
  },
  async clearToken (token) {
    const redistoken = await redisClient.del(token)
    console.log(redistoken)
  },
}
