/* 
* @Author: kongzx
* @Date:   2020-02-18 00:04:46
* @Last Modified by:   kongzx
* @Last Modified time: 2020-03-01 17:45:11
*/

const Controllers = require('../controllers')


module.exports = (router) => {
  /**
   * 用户资源
   */
  router
    // 删除用户
    .post('/upload', Controllers.fileResource.upload)

}