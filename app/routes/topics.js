/* 
* @Author: kongzx
* @Date:   2020-02-18 00:04:46
* @Last Modified by:   kongzx
* @Last Modified time: 2020-03-01 17:24:30
*/

const Controllers = require('../controllers')


module.exports = (router) => {
  /**
   * 话题资源
   */
  router
    // 新增话题
    .post('/topics', Controllers.topics.create)
    // 删除话题
    .delete('/topics/:id', Controllers.topics.destroy)
    // 话题更新
    .patch('/topics/:id', Controllers.topics.update)
    // 查询话题列表
    .get('/topics', Controllers.topics.list)
    // 话题信息
    .get('/topics/:id', Controllers.topics.detail)
    

}