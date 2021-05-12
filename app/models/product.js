/* 
* @Author: kongzx
* @Date:   2020-02-27 22:05:38
* @Last Modified by:   kongzx
* @Last Modified time: 2021-05-13 01:17:48
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

CREATE TABLE product ( 
  id INT PRIMARY KEY auto_increment, 
  parent_id INT NOT NULL, -- 上级分类的编号：0表示一级分类
  name VARCHAR(64) NOT NULL, -- 名称 
  level INT(1) NOT NULL, -- 分类级别：0->1级；1->2级  
  product_count INT NOT NULL, -- 商品数量 
  product_unit VARCHAR(64) NOT NULL, -- 商品单位 
  nav_status INT(1) NOT NULL, -- 是否显示在导航栏：0->不显示；1->显示
  show_status INT(1) NOT NULL, -- 显示状态：0->不显示；1->显示
  sort INT NOT NULL, -- 排序
  icon VARCHAR(255) NOT NULL, -- 图标  
  keywords VARCHAR(255) NOT NULL, -- 关键字
  description TEXT NOT NULL,  -- 描述 
  img_path TEXT NOT NULL  -- 图片地址
);

CREATE TABLE product ( 
  id INT PRIMARY KEY auto_increment, 
  parent_id INT,
  product_name VARCHAR(64),
  product_level INT(1),
  product_count INT, 
  product_unit VARCHAR(64), 
  nav_status INT(1),
  show_status INT(1),
  sort INT,
  icon VARCHAR(255), 
  keywords VARCHAR(255),
  description text
);


CREATE TABLE topics(
  id INT PRIMARY KEY auto_increment,
  title VARCHAR(100) NOT NULL, -- 文章标题
  content TEXT NOT NULL, -- 文章内容
  user_id INT NOT NULL, -- 所属用户
  create_time DATETIME NOT NULL, -- 创建时间
  modify_time DATE NOT NULL -- 修改时间
);

CREATE TABLE product ( 
  id INT PRIMARY KEY auto_increment, 
);

module.exports = {
  id: {
    name: 'id',
    type: 'INT'
  },
  title: {
    name: '文章标题',
    type: 'VARCHAR'
  },
  content: {
    name: '文章内容',
    type: 'TEXT'
  },
  user_id: {
    name: '所属用户',
    type: 'INT'
  },
  create_time: {
    name: '创建时间',
    type: 'DATETIME'
  },      
  modify_time: {
    name: '修改时间',
    type: 'DATE'
  },  
}