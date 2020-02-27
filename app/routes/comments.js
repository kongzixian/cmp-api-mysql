/* 
* @Author: kongzx
* @Date:   2020-02-18 00:04:46
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-26 23:22:50
*/

const Controllers = require('../controllers')


module.exports = (router) => {
  /**
   * 评论资源
   */
  router
    .get('/comments', Controllers.comments.list)
    .post('/comments', Controllers.comments.create)
    .patch('/comments/:id', Controllers.comments.update)
    .delete('/comments/:id', Controllers.comments.destroy)

}