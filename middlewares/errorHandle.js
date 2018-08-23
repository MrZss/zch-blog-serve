// use: 统一错误处理中间件，用来统一捕获其他中间件的错误,在其他中间件使用之前使用
const tracer = require('tracer')
const fs = require('fs')
// 自定义错误输出格式
const logger = tracer.colorConsole({
  level: 'error',
  format: '{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})',
  dateformat: 'HH:MM:ss.L',
  transport: function (data) { // 指定错误输出的文件，存到error.log下
    console.log(data.output)
    fs.appendFile('./error.log', data.output + '\n', {
      encoding: 'utf8'
    }, (err) => {
      if (err) {
        throw err
      };
    })
  }
})
module.exports = async (ctx, next) => {
  console.log(222)
  try {
    await next()
  } catch (err) {
    logger.error(err.stack)
    throw (err)
  }
}
