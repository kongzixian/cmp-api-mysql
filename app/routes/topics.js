/* 
* @Author: kongzx
* @Date:   2020-02-18 00:04:46
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-25 22:57:51
*/

const Controllers = require('../controllers')


module.exports = (router) => {
  /**
   * 话题资源
   */
  router
    .get('/topics', Controllers.topics.list)
    .post('/topics', Controllers.topics.create)
    .patch('/topics/:id', Controllers.topics.update)
    .delete('/topics/:id', Controllers.topics.destory)

}