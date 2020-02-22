/* 
* @Author: kongzx
* @Date:   2020-02-18 00:04:46
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-20 15:57:08
*/

const Controller = require('../controllers')


module.exports = (router) => {
  /**
   * 用户资源
   */
  router
    .get('/users', Controller.users.list)
    .post('/users', Controller.users.create)
    .patch('/users/:id', Controller.users.update)
    .delete('/users/:id', Controller.users.destory)

}