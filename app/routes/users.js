/* 
* @Author: kongzx
* @Date:   2020-02-18 00:04:46
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-26 23:22:11
*/

const Controllers = require('../controllers')


module.exports = (router) => {
  /**
   * 用户资源
   */
  router
    .get('/users', Controllers.users.list)
    // .post('/users', Controllers.users.create)
    .patch('/users/:id', Controllers.users.update)
    .delete('/users/:id', Controllers.users.destroy)

}