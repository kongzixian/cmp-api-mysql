/* 
* @Author: kongzx
* @Date:   2020-02-18 19:43:11
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-19 15:07:51
*/

const mysql = require('mysql');
const pool  = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'kong168',
  database: 'cms'
});
 
// query方法 查询返回数组 增删改 返回对象
exports.query = function(sqlStr){
  return new Promise((resolve, reject) => {
    // 从连接池中拿一个连接
    pool.getConnection(function(err, connection) {
      if(err){
        return reject(err)
      }
      //                        error, results, fields
      connection.query(sqlStr, (error, ...args) => {
        // 释放连接 操作结束，尽早的释放连接
        connection.release()
        if(err){
          return reject(err)
        }
        resolve(...args)
      })
    });
  })
}
