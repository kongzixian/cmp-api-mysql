/* 
* @Author: kongzx
* @Date:   2020-02-27 22:05:38
* @Last Modified by:   kongzx
* @Last Modified time: 2020-02-27 22:35:21
*/
/**
 * 话题表
 *  CREATE TABLE topics(
      id INT PRIMARY KEY auto_increment,
      title VARCHAR(100) NOT NULL, -- 文章标题
      content TEXT NOT NULL, -- 文章内容
      user_id INT NOT NULL, -- 所属用户
      create_time DATETIME NOT NULL, -- 创建时间
      modify_time DATE NOT NULL -- 修改时间
    );
 */
module.exports = {
  id: {
    name: 'id'
    type: 'INT'
  },
  title: {
    name: '文章标题'
    type: 'VARCHAR'
  },
  content: {
    name: '文章内容'
    type: 'TEXT'
  },
  user_id: {
    name: '所属用户'
    type: 'INT'
  },
  create_time: {
    name: '创建时间'
    type: 'DATETIME'
  },      
  modify_time: {
    name: '修改时间'
    type: 'DATE'
  },  
}