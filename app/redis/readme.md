

const redis = require('redis')
const client = redis.createClient(settings.redisConfig)


赋值
  await client.set(key, value)

获取
  await client.get(key, value)

删除
  await client.del(token)

