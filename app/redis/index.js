/* 
* @Author: kongzx
* @Date:   2020-02-25 15:29:32
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-25 23:43:55
*/

const redis = require('redis')
const {settings} = require('../../config')

const client = redis.createClient(settings.redisConfig)
client.on("error", function(err) {
  console.log( err );
});

module.exports = client
