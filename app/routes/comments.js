/* 
* @Author: kongzx
* @Date:   2020-02-18 00:04:46
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-20 15:57:29
*/

const Controller = require('../controllers')


module.exports = (router) => {
  /**
   * 评论资源
   */
  router
    .get('/comments', Controller.comments.list)
    .post('/comments', Controller.comments.create)
    .patch('/comments/:id', Controller.comments.update)
    .delete('/comments/:id', Controller.comments.destory)

}