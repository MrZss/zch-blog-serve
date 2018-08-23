module.exports = async (ctx, next) => {
  // 请求成功时
  ctx.success = ({data, msg, total, success}) => {
    ctx.body = {
      code: 200,
      data,
      msg,
      total,
      success
    }
  }

  await next()
}
