/* 
 * @Author: kongzx
 * @Date:   2020-02-17 20:52:51
 * @Last Modified by:   kongzx
 * @Last Modified time: 2020-03-01 21:51:11
 */

const uuidv1 = require('uuid/v1')
const path = require('path')
const Services = require('../services')
const {
  validator, upload
} = require('../myutil')
const {
  settings
} = require('../../config')

class FileResourceController {

  /**
   * 上传文件
   */
  async upload(req, res) {
    try {
      const fileInfo = await upload.getFileInfo(req)
      let tasks = []
      let result
      if (!settings.qiniuConfig.accessKey) {
        let saveRes = []
        for (let item in fileInfo.files) {
          const uid = uuidv1()
          const filePath = fileInfo.files[item].path
          const fileName = uid + path.extname(fileInfo.files[item].name).toLowerCase()
          const target = path.join(settings.upload.savePath, fileName)
          saveRes.push(await Services.fileResource.saveFile(filePath, target, fileName))
        }
        result = saveRes.map(item => {
          let obj = {
            imageUrl: `${settings.website}${settings.upload.showPath}${item}`,
            imageName: item,
            resource: 'server'
          }
          return obj
        })
      } else {
        for (let item in fileInfo.files) {
          const uid = uuidv1()
          const filePath = fileInfo.files[item].path
          const fileName = uid + path.extname(fileInfo.files[item].name).toLowerCase()
          tasks.push(Services.fileResource.qiniuUpload(filePath, fileName))
        }
        const qiniuRes = await Promise.all(tasks)
        result = qiniuRes.map(item => {
          let obj = {
            imageUrl: `${settings.qiniuConfig.originUrl}${item.key}`,
            imageName: item.key,
            resource: 'qiniu'
          }
          return obj
        })
      }
      res.sendOk({
        data: result,
        statusCode: 201,
        msg: '上传成功'
      })
    } catch (error) {
      res.sendErr({
        error_msg: error
      })
    }
  }

  /**
   * 下载文件
   */
  async download(req, res) {
    try {
      const fileName = req.query.filename
      const target = path.join(settings.upload.savePath, fileName)

      await Services.fileResource.download({
        fileName,
        target,
        res
      })

    } catch (error) {
      res.sendErr({
        error_msg: error
      })
    }
  }


}
module.exports = new FileResourceController()