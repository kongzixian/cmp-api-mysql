/* 
* @Author: kongzx
* @Date:   2020-02-27 22:05:38
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-27 22:32:27
*/
/**
 *
 * 评论表
 *  CREATE TABLE comments(
      id INT PRIMARY KEY auto_increment,
      content TEXT NOT NULL, -- 评论内容
      create_time DATETIME NOT NULL, -- 创建时间
      modify_time DATE NOT NULL, -- 修改时间
      artticle_id INT NOT NULL, -- 所属文章
      user_id INT NOT NULL, -- 所属用户
      reply_id INT NULL -- 所属回复人
    );
 */
module.exports = {
  id: {
    name: 'id'
    type: 'INT'
  },
  content: {
    name: '评论内容'
    type: 'TEXT'
  },
  create_time: {
    name: '创建时间'
    type: 'DATETIME'
  },      
  modify_time: {
    name: '修改时间'
    type: 'DATE'
  },  
  artticle_id: {
    name: '所属文章'
    type: 'INT'
  }, 
  user_id: {
    name: '所属用户'
    type: 'INT'
  },
  reply_id: {
    name: '所属回复人'
    type: 'INT'
  },
}