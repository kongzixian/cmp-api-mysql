git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/kongzixian/cmp-api-mysql.git
git push -u origin master

启动服务
nodemon app

<!-- 成功返回 -->
  res.sendOk({
    data: result,
    statusCode: 201,
    msg: '登陆成功'
  })

<!-- 失败返回 -->
  res.sendErr({
    error_msg: error
  })

  res.sendErr({
    error_msg: error,
    ret_code: 10000,
    statusCode: 200
  })

/*************** 简单sql语句 ***********************/
  sql-handler.js
  <!-- 查询 -->
  const sqlStr = sqlHandler.getSelectSQL({
    model: this.model,
    table: this.table,
    addCondition: true,
    condition: params,
  })
  <!-- 分页 -->
  const sqlStr = sqlHandler.getSelectSQL({
    model: this.model,
    table: this.table,
    addCondition: params.addCondition,
    condition: params.condition,
    start: params.start,
    _limit: params._limit
  })

  <!-- 删除 -->
  const sqlStr = sqlHandler.getDeleteSQL({
    model: this.model,
    table: this.table,
    addCondition: true,
    condition: {
      id: id
    },
  })

  <!-- 插入 -->
  const sqlStr = sqlHandler.getInsertSQL({
    model: this.model,
    table: this.table,
    addCondition: true,
    condition: {
      title: data.title,
      content: data.content,
      user_id: data.user_id,
      create_time: moment().format('YYYY-MM-DD hh:mm:ss'),
      modify_time: moment().format('YYYY-MM-DD hh:mm:ss')
    },
  })

  <!-- 更新 -->
  let setParams = sqlHandler.getSqlSetParams({
    params: params,
    setArr: setArr
  })
  const sqlStr = sqlHandler.getUpdateSQL({
    model: this.model,
    table: this.table,
    addCondition: true,
    set: setParams,
    condition: {
      id: params.id
    },
  })
/*************** 简单sql语句 ***********************/

const sqlStr = `
  INSERT INTO users (username, password, email, nickname, avatar, gender, create_time, modify_time) VALUES(
     '${ data.email }', 
     '${ data.password }', 
     '${ data.email }',  
     '${ data.nickname }',
     'default-avatar.png',
     0,
     '${ moment().format('YYYY-MM-DD hh:mm:ss') }',
     '${ moment().format('YYYY-MM-DD hh:mm:ss') }'
     )
`