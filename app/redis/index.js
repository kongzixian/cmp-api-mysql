/* 
* @Author: kongzx
* @Date:   2020-02-25 15:29:32
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-25 18:56:04
*/

const redis = require('redis')
// const { promisify } = require("util");
const {settings} = require('../../config')

const client = redis.createClient(settings.redisConfig)
client.on("error", function(err) {
  console.log( err );
});

module.exports = client
