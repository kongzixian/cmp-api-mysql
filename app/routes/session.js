/* 
* @Author: kongzx
* @Date:   2020-02-18 00:04:46
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-20 15:55:14
*/

const Controller = require('../controllers')


module.exports = (router) => {
  /**
   * 会话资源
   */
  router
    .get('/session', Controller.session.get)
    // .post('/session', Controller.session.create)
    .delete('/session', Controller.session.destory)
}