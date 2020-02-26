git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/kongzixian/cmp-api-mysql.git
git push -u origin master

<!-- 成功返回 -->
  res.sendOk({
    data: result,
    statusCode: 201,
    msg: '登陆成功'
  })

<!-- 失败返回 -->
  const errorObj = {
    error_msg: error.message,
    ret_code: 10000,
  }
  const errorRes = resHandler.getCommomErrorRes(errorObj)
  res.sendErr(errorRes)

  用户登陆
  用户查询
  已修复
