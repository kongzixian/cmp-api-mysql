'use strict'
const BaseService = require('./base')
const db = require('../models/db')
const {crypto, format, resHandler, sqlHandler} = require('../myutil')
const md5 = require('blueimp-md5')
const {settings} = require('../../config')
const moment = require('moment')
class UserService extends BaseService {
  constructor (table, model) {
    super(table, model)
    this.table = table
    this.model = model
  }
  /**
   * 创建用户
   */
  async addUser (data) {
    try {
      const findRes = await super.findOne({email: data.email})
      if (findRes) {
        const errorMsg = 'USER_HAS_EXITS'
        throw errorMsg
      }
      data.password = crypto.encrypted(data.password, settings.saltKey)
      // const sqlStr = `
      //       INSERT INTO users (username, password, email, nickname, avatar, gender, create_time, modify_time) VALUES(
      //         '${ data.email }', 
      //         '${ data.password }', 
      //         '${ data.email }',  
      //         '${ data.nickname }',
      //         'default-avatar.png',
      //         0,
      //         '${ moment().format('YYYY-MM-DD hh:mm:ss') }',
      //         '${ moment().format('YYYY-MM-DD hh:mm:ss') }'
      //         )
      //       `
      const sqlStr = sqlHandler.getInsertSQL({
        model: this.model,
        table: this.table,
        addCondition: true,
        condition: {
          username: data.email,
          password: data.password,
          email: data.email,
          nickname: data.nickname,
          avatar: 'default-avatar.png',
          gender: 0,
          create_time: moment().format('YYYY-MM-DD hh:mm:ss'),
          modify_time: moment().format('YYYY-MM-DD hh:mm:ss')
        },
      })
      const ret = await db.query(sqlStr)
      const [user] = await db.query(`SELECT * FROM users WHERE id='${ ret.insertId }'`)
      return format.user(user)

    } catch (error) {
      throw error
    }
  }
  // async getUserByName (name) {
  //   try {
  //     const user = await db.User.findOne({name: name}, null, {lean: true})
  //     return user
  //   } catch (error) {
  //     const errorMsg = 'SERVER_ERROR'
  //     throw errorMsg
  //   }
  // }
  // async getUserById (id) {
  //   try {
  //     const user = await db.User.findById(id)
  //     return user
  //   } catch (error) {
  //     const errorMsg = 'SERVER_ERROR'
  //     throw errorMsg
  //   }
  // }
  /**
   * 删除用户
   */
  async destroy (id) {
    try {
      const findRes = await super.findById(id)
      if (!findRes) {
        const errorMsg = 'USER_NOT_EXITS'
        throw errorMsg
      }
      // 获取删除语句sql
      const sqlStr = sqlHandler.getDeleteSQL({
        model: this.model,
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
  /**
   * 更新用户信息
   */
  async update (params) {
    try {
      await super.findById(params.id)
      // 获取刷新语句sql
      const sqlStr = sqlHandler.getUpdateSQL({
        model: this.model,
        table: this.table,
        addCondition: true,
        set: params,
        condition: {
          id: params.id
        },
      })
      await db.query(sqlStr)
      const [user] = await db.query(`SELECT * FROM users WHERE id='${ params.id }'`)
      return format.user(user)
      return result
    } catch (error) {
      const errorMsg = 'USER_UPDATE_FAILED'
      throw errorMsg
    }
  }
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
      const findRes = await super.findById(params)
      const result = format.user(findRes)
      return result
    } catch (error) {
      const errorMsg = 'USER_NOT_EXITS'
      throw errorMsg
    }
  }

  /**
   * 登陆
   */
  async login (params) {
    try {
      const findRes = await super.getUserByName( params.email )

      if ( !findRes ) {
        const errorMsg = 'USER_NOT_EXITS'
        throw errorMsg
      }
      const inputPasswd = crypto.encrypted(params.password, settings.saltKey)
      const equal = await crypto.checkPasswd(inputPasswd, findRes.password)
      if (!equal) {
        const errorMsg = 'USER_PASSWORD_WRONG'
        throw errorMsg
      }

      const result = format.user(findRes)
      return result
    } catch (error) {
      throw error
    }
  }
  async test (params) {
    this.body = 2
    const result = super.getUserByName(params)
    return result
  }
}

module.exports = new UserService('users', 'User')
