'use strict'
const BaseService = require('./base')
const db = require('../models/db')
const {crypto, format, resHandler, sqlHandler} = require('../myutil')
const md5 = require('blueimp-md5')
const {settings} = require('../../config')
const moment = require('moment')
class UserService extends BaseService {
  constructor (table) {
    super(table)
    this.table = 'users'
  }
  async addUser (data) {
    try {
      const findRes = await super.findOne({email: data.email})
      if (findRes) {
        const errorMsg = 'USER_HAS_EXITS'
        throw errorMsg
      }
      data.password = crypto.encrypted(data.password, settings.saltKey)
      const sqlStr = `
            INSERT INTO users (username, password, email, nickname, avatar, gender, creat_time, modify_time) VALUES(
              '${ data.email }', 
              '${ data.password }', 
              '${ data.email }',  
              '${ data.nickname }',
              'default-avatar.png',
              0,
              '${ moment().format('YYYY-MM-DD hh:mm:ss') }',
              '${ moment().format('YYYY-MM-DD hh:mm:ss') }'
              )
            `
      const ret = await db.query(sqlStr)
      const [user] = await db.query(`SELECT * FROM users WHERE id='${ ret.insertId }'`)
      return format.user(user)

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
  // kong 已完成
  async destroy (id) {
    try {
      const findRes = await super.findById(id)
      if (!findRes) {
        const errorMsg = 'USER_NOT_EXITS'
        throw errorMsg
      }
      // 获取删除语句sql
      const sqlStr = sqlHandler.getDeleteSQL({
        table: this.table,
        addCondition: true,
        condition: {
          id: id
        },
      })
      const result = await db.query(sqlStr)
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
  // kong 已完成
  /**
   * 获取用户列表
   */
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
  /**
   * 登陆
   */
  async login (params) {
    try {
      const findRes = await super.getUserByName( params.email )

      if ( !findRes ) {
        console.log('zixian', findRes)
        const errorMsg = 'USER_NOT_EXITS'
        throw errorMsg
      }
      const inputPasswd = crypto.encrypted(params.password, settings.saltKey)
      console.log( 'inputPasswd', inputPasswd )
      const equal = await crypto.checkPasswd(inputPasswd, findRes.password)
      if (!equal) {
        console.log('kong2')
        const errorMsg = 'USER_PASSWORD_WRONG'
        throw errorMsg
      }
      
      // if( findRes.password != password ){
      //   const errorMsg = 'USER_PASSWORD_WRONG'
      //   throw errorMsg
      // }

      const result = format.user(findRes)
      return result
    } catch (error) {
      throw error
      // const errorMsg = 'USER_LOGIN_FAILED'
      // throw errorMsg
    }
  }
  async test (params) {
    this.body = 2
    const result = super.getUserByName(params)
    return result
  }
}

module.exports = new UserService('users')
