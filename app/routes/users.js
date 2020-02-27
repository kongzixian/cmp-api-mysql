/* 
* @Author: kongzx
* @Date:   2020-02-18 00:04:46
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-27 23:07:04
*/

const Controllers = require('../controllers')


module.exports = (router) => {
  /**
   * 用户资源
   */
  router
    // 获取用户列表
    .get('/users', Controllers.users.list)
    .get('/users/:id', Controllers.users.detail)
    // .post('/users', Controllers.users.create)
    // 更新用户信息
    .patch('/users/:id', Controllers.users.update)
    // 删除用户
    .delete('/users/:id', Controllers.users.destroy)

}