exports.index = async (ctx, next) => {
  await ctx.render('index', {
    title: 'Koa2-starter'
  })
}

exports.about = async (ctx, next) => {
  ctx.body = 'about'
}
