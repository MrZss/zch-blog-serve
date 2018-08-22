const config = require('../configs')
const Router = require('koa-router')
const router = new Router({prefix: config.app.routerBaseApi})
// const C = require('../controllers/comments.js'),
//   T = require('../controllers/tags.js'),
//   U = require('../controllers/user.js'),
//   M = require('../controllers/posts.js')
const A = require('../controller/article.js')

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
  router.post('/', require('./user').signup)
  // 用户
  router.post('/signup', require('./user').signup)
  router.post('/signin', require('./user').signin)
  router.post('/signout', require('./user').signout)
  // 文章
  router.post('/article/createArticle', isAdmin, A.createArticle)
  router.post('/article/getArticleById', isLoginUser, A.getArticleById)
  router.post('/article/getAllArticles', A.getAllArticles)
  router.post('/article/updateArticle', isAdmin, A.updateArticle)
  router.post('/article/deleteArticleById', isAdmin, A.deleteArticleById)
  // 评论
  router.post('/comments/new', isLoginUser, require('./comments').create)
  router.post('/comments/delete', isLoginUser, require('./comments').delete)
  // 分类
  router.post('/category', require('./tags').list)
  router.post('/category/new', isAdmin, require('./tags').create)
  router.post('/category/:id/delete', isAdmin, require('./tags').delete)
  app.use(router.routes()).use(router.allowedMethods())
}
