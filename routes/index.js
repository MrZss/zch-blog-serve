const router = require('koa-router')()

module.exports = (app) => {
  router.get('/', require('./home').index)
  // 定义用户 路由分配
  router.post('/signup', require('./user').signup)
  router.post('/signin', require('./user').signin)
  router.post('/signout', require('./user').signout)
  // 定义文章 路由分配
  // 获取文章列表
  // router.post('/posts', require('./posts').list)
  router.post('/posts/new', require('./posts').create)
  router.post('/posts/detail', require('./posts').detail)
  router.post('/posts/list', require('./posts').list)
  // router.post('/posts/:id/edit', require('./posts').edit)
  // router.post('/posts/:id/delete', require('./posts').destroy)

  app
    .use(router.routes())
    .use(router.allowedMethods())
}
