const config = require('../configs')
const Router = require('koa-router')
const router = new Router({prefix: config.app.routerBaseApi})
// const C = require('../controllers/comments.js'),
const A = require('../controller/article.js')
const T = require('../controller/tags.js')
const U = require('../controller/user.js')
const C = require('../controller/comments.js')

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
  router.post('/', U.signup)
  // 用户
  router.post('/signup', U.signup)
  router.post('/signin', U.signin)
  router.post('/signout', U.signout)
  // 文章
  router.post('/article/createArticle', isAdmin, A.createArticle)
  router.post('/article/getArticleById', isLoginUser, A.getArticleById)
  router.post('/article/getAllArticles', A.getAllArticles)
  router.post('/article/updateArticle', isAdmin, A.updateArticle)
  router.post('/article/deleteArticleById', isAdmin, A.deleteArticleById)
  // 评论
  router.post('/comments/createComment', isLoginUser, C.createComment)
  router.post('/comments/deleteComment', isLoginUser, C.deleteComment)
  // 分类
  router.post('/tag/getAllTags', T.getAllTags)
  router.post('/tag/createTag', isAdmin, T.createTag)
  router.post('/tag/deleteTag', isAdmin, T.deleteTag)
  app.use(router.routes()).use(router.allowedMethods())
}
