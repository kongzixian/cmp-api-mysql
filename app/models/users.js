/* 
* @Author: kongzx
* @Date:   2020-02-27 22:05:38
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-28 00:46:20
*/
/**
 * 用户表
 *  CREATE TABLE users(
      id INT PRIMARY KEY auto_increment,
      username VARCHAR(50) NOT NULL, -- 用户名
      password VARCHAR(50) NOT NULL, -- 密码
      email VARCHAR(50) NOT NULL, -- 邮箱
      nickname VARCHAR(50) NOT NULL, -- 昵称
      avatar VARCHAR(100) NULL, -- 头像
      gender bit NULL, -- 性别
      create_time DATETIME NOT NULL, -- 创建时间
      modify_time DATETIME NOT NULL -- 修改时间
    );
 */
module.exports = {
  id: {
    name: 'id',
    type: 'INT'
  },
  username: {
    name: '用户名',
    type: 'VARCHAR'
  },
  password: {
    name: '密码',
    type: 'VARCHAR'
  },
  email: {
    name: '邮箱',
    type: 'VARCHAR'
  },
  nickname: {
    name: '昵称',
    type: 'VARCHAR'
  },  
  avatar: {
    name: '头像',
    type: 'VARCHAR'
  }, 
  gender: {
    name: '性别',
    type: 'bit'
  },
  create_time: {
    name: '创建时间',
    type: 'DATETIME'
  },      
  modify_time: {
    name: '修改时间',
    type: 'DATETIME'
  },  
}