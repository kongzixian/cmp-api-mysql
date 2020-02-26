'use strict'
const BaseService = require('./base')
const db = require('../models/db')
const {crypto, format, resHandler} = require('../myutil')
const md5 = require('blueimp-md5')
const {settings} = require('../../config')
class UserService extends BaseService {
  constructor (table) {
    super(table)
    this.table = 'users'
  }
  async addUser (data) {
    try {
      const findRes = await db.User.findOne({name: data.name})
      if (findRes) {
        const errorMsg = 'USER_HAS_EXITS'
        throw errorMsg
      }
      data.password = crypto.encrypted(data.password, settings.saltKey)
      const result = await db.User.create(data)
      return format.user(result.toObject())
    } catch (error) {
      throw error
    }
  }
  async getUserByName (name) {
    try {
      const user = await db.User.findOne({name: name}, null, {lean: true})
      return user
    } catch (error) {
      const errorMsg = 'SERVER_ERROR'
      throw errorMsg
    }
  }
  async getUserById (id) {
    try {
      const user = await db.User.findById(id)
      return user
    } catch (error) {
      const errorMsg = 'SERVER_ERROR'
      throw errorMsg
    }
  }
  async destroy (params) {
    try {
      const findRes = await db.User.findById(params)
      if (!findRes) {
        const errorMsg = 'USER_NOT_EXITS'
        throw errorMsg
      }
      await db.User.remove({_id: params})
      const result = resHandler.getSuccessMsg('USER_DELETE_SUCCESS')
      return result
    } catch (error) {
      throw error
    }
  }
  async update (params) {
    try {
      await db.User.findById(params._id)
      await db.User.update({_id: params._id}, {$set: params})
      const result = resHandler.getSuccessMsg('USER_UPDATE_SUCCESS')
      return result
    } catch (error) {
      const errorMsg = 'USER_UPDATE_FAILED'
      throw errorMsg
    }
  }
  // kong
  async getUserList (params) {
    try {
      const result = super.list(params)
      return result
    } catch (error) {
      throw error
    }
  }
  async detail (params) {
    try {
      const findRes = await db.User.findById(params)
      const result = format.user(findRes.toObject())
      return result
    } catch (error) {
      const errorMsg = 'USER_NOT_EXITS'
      throw errorMsg
    }
  }
  // kong 已完成
  async login (params) {
    try {
      const findRes = await super.getUserByName( params.email )

      if (!findRes) {
        const errorMsg = 'USER_NOT_EXITS'
        throw errorMsg
      }
      const password = md5( md5( params.password ) ) 
      
      if( findRes.password != password ){
        const errorMsg = 'USER_PASSWORD_WRONG'
        throw errorMsg
      }

      const result = format.user(findRes)
      return result
    } catch (error) {
      const errorMsg = 'USER_LOGIN_FAILED'
      throw errorMsg
    }
  }
  async test (params) {
    this.body = 2
    const result = super.getUserByName(params)
    return result
  }
}

module.exports = new UserService()
