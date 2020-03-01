'use strict'
const qiniu = require('qiniu')
const fs = require('fs')
const BaseService = require('./base')
const mdb = require('../models')
const {resHandler} = require('../myutil')
const {settings} = require('../../config')
class FileResourceService extends BaseService {
  constructor (table, model) {
    super(table, model)
    this.table = table
    this.model = model
  }

  /**
   * 存储文件
   */
  async saveFile (filePath, target, fileName) {
    try {
      const readStream = fs.createReadStream(filePath)
      const writeStream = fs.createWriteStream(target)
      readStream.pipe(writeStream)
      return fileName
    } catch (error) {
      throw error
    }
  }

  /**
   * 上传到七牛
   */
  async qiniuUpload (localFile, key) {
    try {
      const {accessKey, secretKey, bucket} = settings.qiniuConfig
      const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
      const putPolicy = new qiniu.rs.PutPolicy({scope: bucket})
      const uploadToken = putPolicy.uploadToken(mac)
      const config = new qiniu.conf.Config()
      config.zone = qiniu.zone.Zone_z1
      const formUploader = new qiniu.form_up.FormUploader(config)
      const putExtra = new qiniu.form_up.PutExtra()
      return new Promise(function (resolve, reject) {
        formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
          if (respErr) return reject(respErr)
          if (respInfo.statusCode === 200) return resolve(respBody)
          reject(new Error('上传失败:statusCode !== 200'))
        })
      })
    } catch (error) {
      throw error
    }
  }

  /**
   * 下载文件
   */
  async download ({ 
    target,
    fileName,
    res
  }) {
    try {
      res.set({
        //告诉浏览器这是一个二进制文件
        "Content-Type":"application/octet-stream",
        //告诉浏览器这是一个需要下载的文件
        "Content-Disposition":"attachment; filename=" + fileName
      });
      const readStream = fs.createReadStream(target)
      // 捕捉错误
      readStream.on('error', function(error){
        if( error ){
          return res.sendErr({
            error_msg: error.message
          })
        }
      });

      readStream.pipe(res);
    } catch (error) {
      throw error
    }
  }



}

module.exports = new FileResourceService('', '')
