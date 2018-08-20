const router = require('koa-router')()

// 中间件判断是否登录
async function isLoginUser (ctx, next) {
  if (!ctx.session.user) {
    ctx.body = {
      success: false,
      msg: '请重新登录'
    }
    return
  }
  await next()
}

// 判断是否是管理员 中间件
async function isAdmin (ctx, next) {
  if (!ctx.session.user) {
    ctx.body = {
      success: false,
      msg: '请重新登录'
    }
    return
  }
  if (!ctx.session.user.isAdmin) {
    ctx.body = {
      success: false,
      msg: '该用户无权限'
    }
    return
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
  router.post('/posts/new', isAdmin, require('./posts').create)
  router.post('/posts/detail', isLoginUser, require('./posts').detail)
  router.post('/posts/list', require('./posts').list)
  router.post('/posts/update', isAdmin, require('./posts').update)
  // router.post('/posts/:id/edit', require('./posts').edit)
  // router.post('/posts/:id/delete', require('./posts').destroy)

  app.use(router.routes()).use(router.allowedMethods())
}
