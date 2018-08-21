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
  // 用户
  router.post('/signup', require('./user').signup)
  router.post('/signin', require('./user').signin)
  router.post('/signout', require('./user').signout)
  // 文章
  router.post('/posts/new', isAdmin, require('./posts').create)
  router.post('/posts/detail', isLoginUser, require('./posts').detail)
  router.post('/posts/list', require('./posts').list)
  router.post('/posts/update', isAdmin, require('./posts').update)
  // 评论
  router.post('/comments/new', isLoginUser, require('./comments').create)
  router.post('/comments/delete', isLoginUser, require('./comments').delete)
  // 分类
  router.post('/category', require('./category').list)
  router.post('/category/new', isAdmin, require('./category').create)
  router.post('/category/:id/delete', isAdmin, require('./category').delete)
  app.use(router.routes()).use(router.allowedMethods())
}
