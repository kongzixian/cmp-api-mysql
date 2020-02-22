/* 
* @Author: kongzx
* @Date:   2020-02-18 00:04:46
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-20 15:57:41
*/

const Controller = require('../controllers')


module.exports = (router) => {
  /**
   * 话题资源
   */
  router
    .get('/topics', Controller.topics.list)
    .post('/topics', Controller.topics.create)
    .patch('/topics/:id', Controller.topics.update)
    .delete('/topics/:id', Controller.topics.destory)

}