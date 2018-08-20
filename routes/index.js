const router = require('koa-router')()

// 中间件判断是否登录
async function isLoginUser (ctx, next) {
  if (!ctx.session.user) {
    return ctx.redirect('/signin')
  }
  await next()
}
module.exports = (app) => {
  router.get('/', require('./home').index)
  // 定义用户 路由分配
  router.post('/signup', require('./user').signup)
  router.post('/signin', require('./user').signin)
  router.post('/signout', require('./user').signout)
  // 定义文章 路由分配
  // 获取文章列表
  // router.post('/posts', require('./posts').list)
  router.post('/posts/new', isLoginUser, require('./posts').create)
  router.post('/posts/detail', isLoginUser, require('./posts').detail)
  router.post('/posts/list', require('./posts').list)
  router.post('/posts/update', isLoginUser, require('./posts').update)
  // router.post('/posts/:id/edit', require('./posts').edit)
  // router.post('/posts/:id/delete', require('./posts').destroy)

  app.use(router.routes()).use(router.allowedMethods())
}
