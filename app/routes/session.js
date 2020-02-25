/* 
* @Author: kongzx
* @Date:   2020-02-18 00:04:46
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-25 22:57:55
*/

const Controllers = require('../controllers')


module.exports = (router) => {
  /**
   * 会话资源
   */
  router
    .get('/session', Controllers.session.get)
    // .post('/session', Controllers.session.create)
    .delete('/session', Controllers.session.destory)
}