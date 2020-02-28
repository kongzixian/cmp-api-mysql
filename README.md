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
  const errorRes = resHandler.getCommomErrorRes(error)
  res.sendErr(errorRes)

sql-handler.js
方法都需要修改
