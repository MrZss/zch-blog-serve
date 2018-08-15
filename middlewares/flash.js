module.exports = function flash (opts) {
  let key = 'flash'
  return async (ctx, next) => {
    if (ctx.session === undefined) {
      throw new Error('ctx.flash requires sessions')
    }
    let data = ctx.session[key]
    Object.defineProperties(ctx, 'flash', {
      enumerable: true,
      get: () => data,
      set: (val) => {
        ctx.session[key] = val
      }
    })
    await next()
  }
}
