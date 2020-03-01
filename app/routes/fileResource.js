/* 
* @Author: kongzx
* @Date:   2020-02-18 00:04:46
* @Last Modified by:   kongzx
* @Last Modified time: 2020-03-01 18:44:32
*/

const Controllers = require('../controllers')


module.exports = (router) => {
  /**
   * 文件资源处理
   */
  router
    // 上传文件
    .post('/upload', Controllers.fileResource.upload)
    // 下载文件
    .get('/download', Controllers.fileResource.download)

}